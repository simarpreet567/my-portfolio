import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Return success response for Littlebloom boutique contact inquiries
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out to Littlebloom Boutique. Our care team has received your message.",
        data: { name, email, subject, message, receivedAt: new Date().toISOString() },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
