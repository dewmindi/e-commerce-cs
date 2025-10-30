import { NextResponse } from "next/server";
import OrderModel from '@/models/Order';
import { connectDB } from '@/lib/db';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json({ success: false, error: "Missing data" }, { status: 400 });
    }

    const updatedOrder = await OrderModel.findOneAndUpdate(
      { orderId },
      { fulfillmentStatus: status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedOrder });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
