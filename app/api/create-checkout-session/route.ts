import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      cartItems,
      customerName,
      email,
      phone,
      projectNote,
    } = body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: "Cart items are required" },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const lineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: "aud",
        product_data: { 
          name: item.name,
          metadata: {
            original_id: item.id || item._id
          }
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Generate a unique order ID for reference
    const orderId = `CS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      client_reference_id: orderId,
      payment_method_types: ["card"],
      customer_email: email,
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      metadata: {
        source: "Website-Orders",
        customerName: customerName || "",
        phone: phone || "",
        projectNote: projectNote || "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe session creation failed:", err);
    return NextResponse.json(
      { error: "Stripe session creation failed" },
      { status: 500 }
    );
  }
}
