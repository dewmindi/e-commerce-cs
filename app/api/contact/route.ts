import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, subject, message, company, token } = data;

    // 3. Basic validations
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const phoneRegex = /^[0-9+\-() ]{7,20}$/;
    if (phone && !phoneRegex.test(phone)) {
      return new Response(JSON.stringify({ error: "Invalid phone number" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 4. Setup nodemailer with better error handling
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log("SMTP transporter verified successfully");
    } catch (error) {
      console.error("SMTP transporter verification failed:", error);
      return new Response(JSON.stringify({ error: "Email service configuration error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 5. Send email to admin
    await transporter.sendMail({
      from: `CS Graphic <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_ADMIN_EMAIL,
      subject: `New Contact Form from CS Graphic: ${subject || 'No Subject'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #007cba;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p><small>Sent via CS Graphic contact form</small></p>
        </div>
      `,
    });

    // 6. Send confirmation to user
    try {
      await transporter.sendMail({
        from: `CS Graphic Meta <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Thank you for contacting CS Graphic",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Thank you for your message!</h2>
            <p>Hello ${name},</p>
            <p>Thank you for contacting CS Graphic. We have received your message and will get back to you as soon as possible.</p>
            <p>Here's a copy of what you sent:</p>
            <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #007cba;">
              <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
              <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p>Best regards,<br>CS Graphic Team</p>
          </div>
        `,
      });
      console.log("Confirmation email sent successfully");
    } catch (err) {
      console.warn("Failed to send confirmation email:", err);
      // Don't fail the entire request if confirmation email fails
    }

    return new Response(JSON.stringify({
      success: true,
      message: "Email sent successfully"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    console.error("Email sending error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to send email",
        details: String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}