import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { sendCustomerEmail, sendAdminEmail, sendPaymentFailedEmail } from "@/lib/email";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20" as any,
});

export async function POST(req: Request) {
  console.log("Webhook received: Starting processing...");
  
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");

  if (!sig) {
    console.error("Missing stripe-signature header");
    return new NextResponse("Missing signature", { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  // Debug log (do not log the actual secret in production, but for now just check existence)
  console.log("Webhook Secret exists:", !!webhookSecret);

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set in environment variables");
    return new NextResponse("Webhook secret not configured", { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Signature Error: ${err.message}`, { status: 400 });
  }

  console.log(`Event constructed successfully: ${event.type}`);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Filter by source to ensure we only handle our own checkouts
    if (session.metadata?.source !== "Website-Orders") {
      console.log("Ignoring event from different source:", session.metadata?.source);
      return NextResponse.json({ ignored: true });
    }

    // 1. Prepare Order Data
    let orderData: any = {};

    try {
      // Fetch line items from Stripe
      const lineItemsList = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      });

      const items = lineItemsList.data.map((item) => {
          const product = item.price?.product as Stripe.Product;
          return {
              name: item.description || product.name,
              price: (item.price?.unit_amount || 0) / 100, 
              quantity: item.quantity || 1,
              id: product?.metadata?.original_id
          };
      });

      const orderId = `ORD-${Date.now()}`;
      
      orderData = {
        orderId,
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent as string,
        customerName: session.metadata?.customerName || "Unknown Customer",
        email: session.customer_email || session.metadata?.email,
        phone: session.metadata?.phone,
        projectNote: session.metadata?.projectNote,
        items,
        amount: session.amount_total, // Store in cents
        currency: session.currency,
        status: "paid",
        fulfillmentStatus: "Pending", // Default value
        createdAt: new Date(),
      };

      console.log(`Prepared order data for ${orderId}`);

    } catch (prepErr: any) {
        console.error("Error preparing order data:", prepErr);
        // If we can't even get the data, we probably can't send a meaningful email or save to DB.
        // We should try to at least notify admin if possible, but basic data is missing.
        return new NextResponse(`Data Preparation Error: ${prepErr.message}`, { status: 500 });
    }

    // 2. Send Emails (Prioritized)
    // We wrap this in its own try/catch so it doesn't crash the whole process, 
    // but the user wanted this FIRST.
    try {
        console.log("Attempting to send emails first...");
        // Send in parallel to save time
        await Promise.all([
            sendCustomerEmail(orderData),
            sendAdminEmail(orderData)
        ]);
        console.log("Emails sent successfully.");
    } catch (emailErr: any) {
        console.error("Critical: Failed to send confirmation emails:", emailErr);
        // We continue to save DB, but log this loudly. 
        // User asked: "If something happens that is affected to data storing... notification mails will not be sent"
        // Here we ensure we TRIED emails before even touching DB.
    }

    // 3. Save to Database
    try {
      await connectDB();
      console.log(`Saving order ${orderData.orderId} to database...`);
      
      await Order.create(orderData);
      console.log("Order saved to database successfully.");

    } catch (dbErr: any) {
      console.error("Critical: Failed to save order to database:", dbErr);
      // At this point, emails are sent (step 2), so customer is happy.
      // But we have a data consistency issue. 
      // TODO: Maybe send a specific "System Error" email to admin?
      return new NextResponse(`Database Save Error: ${dbErr.message}`, { status: 500 });
    }

    return NextResponse.json({ received: true });
  }

  if (event.type === "payment_intent.payment_failed") {
    const intent = event.data.object as Stripe.PaymentIntent;

    try {
      // Find checkout session
      const sessions = await stripe.checkout.sessions.list({
        payment_intent: intent.id,
      });

      const session = sessions.data[0];

      // Ignore non-website payments
      if (!session || session.metadata?.source !== "Website-Orders") {
        return NextResponse.json({ ignored: true });
      }
      
      const customerEmail = intent.receipt_email || session.customer_email;

      // 1. Send Email First
      if (customerEmail) {
        try {
          console.log(`Sending failure email to ${customerEmail}`);
          await sendPaymentFailedEmail(customerEmail);
        } catch (emailErr) {
          console.error("Failed payment email error:", emailErr);
        }
      }

      // 2. Save to DB
      await connectDB();
      console.log(`Recording failed payment for intent ${intent.id}`);

      await Order.create({
        orderId: `FAILED-${Date.now()}`,
        stripePaymentIntentId: intent.id,
        email: customerEmail,
        amount: intent.amount,
        currency: intent.currency,
        status: "failed",
        failureReason: intent.last_payment_error?.message || "Payment failed",
      });

    } catch (err) {
      console.error("Error handling payment failure:", err);
    }
  }

  return NextResponse.json({ received: true });
}
