import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import OrderModel from '@/models/Order';
import { getTransporter } from '@/lib/email';
import type { Order } from '@/types/order';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as Order;

    if (!payload?.sessionId || !payload?.orderId) {
      return NextResponse.json({ error: 'Missing sessionId or orderId' }, { status: 400 });
    }

    await connectDB();

    // Upsert order safely and get info if it was newly inserted
    const result = await OrderModel.findOneAndUpdate(
      { sessionId: payload.sessionId },
      { $set: payload,
        $setOnInsert: { fulfillmentStatus: "pending" },
       },
      { upsert: true, new: true, setDefaultsOnInsert: true, rawResult: true }
    );

    const isNewOrder = !!result.lastErrorObject?.upserted;

    if (isNewOrder) {
      const transporter = getTransporter();
      const from = process.env.EMAIL_FROM!;
      const admin = process.env.ADMIN_EMAIL!;
      const base = process.env.NEXT_PUBLIC_BASE_URL!;

      const summaryHtml = `
        <h2>Order Confirmation</h2>
        <p><b>Order ID:</b> ${payload.orderId}</p>
        <p><b>Status:</b> ${payload.paymentStatus}</p>
        <p><b>Total:</b> ${payload.amountTotal} ${payload.currency?.toUpperCase()}</p>
        <p><b>Customer:</b> ${payload.customerName || ''} (${payload.customerEmail || ''})</p>
        <hr/>
        <h3>Items</h3>
        <ul>${payload.items.map(i => `<li>${i.name} × ${i.quantity} — ${i.price}</li>`).join('')}</ul>
      `;

      // Send customer email
      if (payload.customerEmail) {
        await transporter.sendMail({
          from,
          to: payload.customerEmail,
          subject: `Your order ${payload.orderId} receipt`,
          html: `${summaryHtml}<p>Download your payment slip: <a href="${base}/api/payment-slip?orderId=${encodeURIComponent(payload.orderId)}" target="_blank">Payment Slip (PDF)</a></p>`,
        });
      }

      // Send admin email
      await transporter.sendMail({
        from,
        to: admin,
        subject: `[New Order] ${payload.orderId}`,
        html: summaryHtml,
      });
    }

    return NextResponse.json({ success: true, isNewOrder });
  } catch (err: any) {
    console.error('save-order error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
