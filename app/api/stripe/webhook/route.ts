import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  sendCustomerEmail,
  sendAdminEmail,
  sendPaymentFailedEmail,
  sendAdminPaymentFailedEmail,
  sendAdminSystemErrorEmail,
} from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20" as any,
});

export async function POST(req: Request) {
  const body = await req.text();
  // const sig = (await headers()).get("stripe-signature");
  const sig = req.headers.get("stripe-signature");

  if (!sig) return new NextResponse("Missing signature", { status: 400 });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentSuccess(event);
        break;

      case "payment_intent.payment_failed":
        await handlePaymentFailure(event);
        break;

      default:
        return NextResponse.json({ ignored: true });
    }
  } catch (err) {
    console.error("Webhook handler failed:", err);
    return new NextResponse("Webhook error", { status: 500 });
  }

  return NextResponse.json({ received: true });
}

/* ======================================================= */
/* ================== SUCCESS HANDLER ==================== */
/* ======================================================= */

async function handlePaymentSuccess(event: Stripe.Event) {
  const intent = event.data.object as Stripe.PaymentIntent;

  // Idempotency check
  const existing = await prisma.stripeOrder.findUnique({
    where: { stripePaymentIntentId: intent.id },
  });

  if (existing) {
    console.log(`Duplicate success webhook: ${intent.id}`);
    return;
  }

  // Fetch checkout session
  const sessions = await stripe.checkout.sessions.list({
    payment_intent: intent.id,
  });

  const session = sessions.data[0];

  if (!session || session.metadata?.source !== "Website-Orders") return;

  // Fetch line items
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    expand: ["data.price.product"],
  });

  const items = lineItems.data.map((item) => {
    const product = item.price?.product as Stripe.Product;
    return {
      name: item.description || product.name,
      price: (item.price?.unit_amount || 0) / 100,
      quantity: item.quantity || 1,
      id: product?.metadata?.original_id,
    };
  });

  const orderData = {
    orderId: session.client_reference_id || `ORD-${Date.now()}`,
    stripeSessionId: session.id,
    stripePaymentIntentId: intent.id,
    customerName: session.metadata?.customerName || "Customer",
    email: session.customer_email || session.metadata?.email,
    phone: session.metadata?.phone,
    projectNote: session.metadata?.projectNote,
    items,
    amount: intent.amount / 100,
    currency: intent.currency,
    status: "paid",
    fulfillmentStatus: "Pending",
    createdAt: new Date(),
  };

  let dbError = null;

  try {
    await prisma.stripeOrder.create({ data: orderData });
  } catch (err: any) {
    // P2002 = unique constraint violation (duplicate webhook delivery)
    if (err?.code !== "P2002") dbError = err;
  }

  // Always send emails after successful payment
  try {
    await Promise.all([
      sendCustomerEmail(orderData),
      sendAdminEmail(orderData),
    ]);
  } catch (emailErr: any) {
    await sendAdminSystemErrorEmail(
      "EMAIL_FAILURE_AFTER_PAYMENT",
      emailErr.message,
      orderData
    );
  }

  if (dbError) {
    await sendAdminSystemErrorEmail(
      "DB_SAVE_FAILED_AFTER_PAYMENT",
      dbError.message,
      orderData
    );
  }
}

/* ======================================================= */
/* ================== FAILURE HANDLER ==================== */
/* ======================================================= */

async function handlePaymentFailure(event: Stripe.Event) {
  const intent = event.data.object as Stripe.PaymentIntent;

  const existing = await prisma.stripeOrder.findFirst({
    where: { stripePaymentIntentId: intent.id, status: "failed" },
  });

  if (existing) return;

  const sessions = await stripe.checkout.sessions.list({
    payment_intent: intent.id,
  });

  const session = sessions.data[0];

  if (!session || session.metadata?.source !== "Website-Orders") return;

  const customerEmail =
    intent.receipt_email || session.customer_email;

  const failedOrder = {
    orderId: `FAILED-${Date.now()}`,
    stripePaymentIntentId: intent.id,
    email: customerEmail,
    amount: intent.amount / 100,
    currency: intent.currency,
    status: "failed",
    failureReason:
      intent.last_payment_error?.message || "Payment failed",
    createdAt: new Date(),
  };

  let dbError = null;

  try {
    await prisma.stripeOrder.create({ data: failedOrder });
  } catch (err: any) {
    if (err?.code !== "P2002") dbError = err;
  }

  try {
    if (customerEmail) {
      await sendPaymentFailedEmail(customerEmail);
    }
    // Always send admin email for failed payments
    await sendAdminPaymentFailedEmail(failedOrder);
  } catch (emailErr: any) {
    await sendAdminSystemErrorEmail(
      "FAILED_PAYMENT_EMAIL_ERROR",
      emailErr.message,
      failedOrder
    );
  }

  if (dbError) {
    await sendAdminSystemErrorEmail(
      "DB_SAVE_FAILED_ON_PAYMENT_FAILURE",
      dbError.message,
      failedOrder
    );
  }
}
