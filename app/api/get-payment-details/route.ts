// app/api/get-payment-details/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const session_id = url.searchParams.get("session_id");

    if (!session_id) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent", "customer"],
    });

    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id || null;

    const items = (session.line_items?.data || []).map((li) => ({
      id: li.id,
      name: li.description || li.price?.product?.toString() || "Item",
      price: (li.price?.unit_amount || 0) / 100,
      quantity: li.quantity || 1,
    }));

    return NextResponse.json({
      success: true,
      data: {
        sessionId: session.id,
        orderId: session.client_reference_id || session.id,
        paymentStatus: session.payment_status,
        amountTotal: (session.amount_total || 0) / 100,
        amountSubtotal: (session.amount_subtotal || 0) / 100,
        currency: session.currency,
        customerEmail: session.customer_details?.email || undefined,
        customerName: session.customer_details?.name || undefined,
        paymentMethodType: session.payment_method_types?.[0] || "card",
        created: session.created,
        paymentIntentId,
        itemsPurchased: items,
        fee: 0,
      },
    });
  } catch (err: any) {
    console.error("get-payment-details error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
