// import { NextResponse } from 'next/server';
// import { connectDB } from '@/lib/db';
// import OrderModel from '@/models/Order';
// import { buildPaymentSlipPDF } from '@/lib/pdf';

// export const runtime = 'nodejs';
// export const dynamic = 'force-dynamic';

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const orderId = searchParams.get('orderId');
//     if (!orderId) return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });

//     await connectDB();
//     const order = await OrderModel.findOne({ orderId }).lean();
//     if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

//     const pdf = buildPaymentSlipPDF(order);
//     return new Response(pdf, {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/pdf',
//         'Content-Disposition': `attachment; filename="PaymentSlip_${orderId}.pdf"`,
//       },
//     });
//   } catch (err: any) {
//     console.error('payment-slip error:', err);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import OrderModel from "@/models/Order";
import { buildPaymentSlipPDF } from "@/lib/pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    if (!orderId) return NextResponse.json({ error: "Missing orderId" }, { status: 400 });

    await connectDB();
    const order = await OrderModel.findOne({ orderId }).lean();
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    // const pdf = buildPaymentSlipPDF(order);
    const pdf = await buildPaymentSlipPDF(order); // <-- await here

    return new Response(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="PaymentSlip_${orderId}.pdf"`,
      },
    });
  } catch (err: any) {
    console.error("payment-slip error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
