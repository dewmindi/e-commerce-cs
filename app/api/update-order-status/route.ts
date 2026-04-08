import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json({ success: false, error: "Missing data" }, { status: 400 });
    }

    const updatedOrder = await prisma.stripeOrder.update({
      where: { orderId },
      data: { fulfillmentStatus: status },
    });

    return NextResponse.json({ success: true, data: updatedOrder });
  } catch (err: any) {
    if (err?.code === "P2025") {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
