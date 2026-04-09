import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { buildQuotationHtml, QuotationEmailData } from "@/lib/quotation-email-template";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body: QuotationEmailData = await req.json();
    const { email, customerName, quoteRef } = body;

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (!customerName || !quoteRef) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const html = buildQuotationHtml(body);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `CS Graphic Meta <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Your Quotation from CS Graphic Meta – Ref: ${quoteRef}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("❌ Quotation email error:", error);
    return NextResponse.json(
      { error: "Failed to send quotation email.", details: String(error) },
      { status: 500 }
    );
  }
}
