import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.PLUNK_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!apiKey) {
      console.error("PLUNK_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Send email via Plunk API
    const plunkResponse = await fetch("https://next-api.useplunk.com/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        to: contactEmail || "simukhurana@email.com",
        from: { name: "Portfolio Contact Form", email: "noreply@yourdomain.com" },
        subject: `New message from ${name} — Portfolio Contact`,
        body: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
              New Portfolio Message
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 12px; font-weight: bold; color: #94a3b8; width: 120px;">Name</td>
                <td style="padding: 12px; color: #f8fafc; background: #1e293b; border-radius: 8px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; color: #94a3b8;">Email</td>
                <td style="padding: 12px; color: #f8fafc; background: #1e293b; border-radius: 8px;">
                  <a href="mailto:${email}" style="color: #818cf8;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; color: #94a3b8; vertical-align: top;">Message</td>
                <td style="padding: 12px; color: #f8fafc; background: #1e293b; border-radius: 8px; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
            <p style="color: #64748b; font-size: 12px; margin-top: 20px;">
              Sent from your portfolio contact form
            </p>
          </div>
        `,
        reply: email,
      }),
    });

    const result = await plunkResponse.json();

    if (!result.success) {
      console.error("Plunk error:", result);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
