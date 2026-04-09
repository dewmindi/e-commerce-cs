import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { buildPaymentSlipPDF } from "@/lib/pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    const sessionId = searchParams.get("sessionId");

    if (!orderId && !sessionId) return NextResponse.json({ error: "Missing orderId or sessionId" }, { status: 400 });

    let order = null;
    if (orderId) {
      order = await prisma.stripeOrder.findFirst({ where: { orderId } });
    }

    if (!order && sessionId) {
      // Fallback: try finding by Stripe Session ID
      order = await prisma.stripeOrder.findFirst({ where: { stripeSessionId: sessionId } });
    }

    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    // Map Prisma field names so buildPaymentSlipPDF receives what it expects
    const orderData = {
      ...order,
      customerEmail: order.email,
      amount: Number(order.amount),
    };

    const pdf = await buildPaymentSlipPDF(orderData);

    return new Response(pdf as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="PaymentSlip_${order.orderId}.pdf"`,
      },
    });
  } catch (err: any) {
    console.error("payment-slip error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
