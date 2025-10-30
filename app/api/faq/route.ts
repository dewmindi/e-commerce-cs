// /app/api/faq/route.ts
import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const data = await req.json();
        const { name, email, message } = data;

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `Cs Grapphic <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_ADMIN_EMAIL,
            subject: `FAQ from CS Graphic Meta: ${name}`,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong><br>${message}</p>
            `,
        });

        if (data.email) {
            try {
                await transporter.sendMail({
                    from: `Cs Grapphic Meta <${process.env.SMTP_USER}>`,
                    to: data.email,
                    subject: `We received your Question`,
                    html: `
                    <p>Hello ${name}</P>
                    <p>Thank you for contacting CS Graphic Meta. We will get back to you soon!</p>
                    `,
                });
            } catch (err: any) {

            }
        }

        return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), { status: 200 });
    } catch (error) {
        console.error("Email sending error:", error);
        return new Response(
            JSON.stringify({
                error: "Failed to send email",
                details: String(error),
                raw: JSON.stringify(error, Object.getOwnPropertyNames(error))
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }



}
