import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase-server";

type ContactMessageInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function optionalValue(value: string) {
  return value ? escapeHtml(value) : "Ej angivet";
}

function createContactEmailHtml({
  name,
  email,
  phone,
  message,
}: ContactMessageInput) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111827;">
      <h1 style="font-size: 20px; margin: 0 0 16px;">Nytt kontaktmeddelande</h1>

      <p style="margin: 0 0 8px;"><strong>Namn:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 0 0 8px;"><strong>E-post:</strong> ${optionalValue(email)}</p>
      <p style="margin: 0 0 16px;"><strong>Telefon:</strong> ${optionalValue(phone)}</p>

      <p style="margin: 0 0 8px;"><strong>Meddelande:</strong></p>
      <div style="white-space: pre-wrap; border-top: 1px solid #e5e7eb; padding-top: 12px;">
        ${escapeHtml(message)}
      </div>
    </div>
  `;
}

async function sendContactEmail(messageInput: ContactMessageInput) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;
  const resendFrom = process.env.RESEND_FROM;

  if (!resendApiKey || !contactEmail || !resendFrom) {
    console.error("Missing Resend contact email environment variables.");
    return;
  }

  const resend = new Resend(resendApiKey);

  const { error } = await resend.emails.send({
    from: resendFrom,
    to: contactEmail,
    subject: "Nytt kontaktmeddelande",
    html: createContactEmailHtml(messageInput),
    replyTo: messageInput.email || undefined,
  });

  if (error) {
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !message) {
      return NextResponse.json(
        {
          error: "Namn och meddelande kr\u00e4vs.",
        },
        { status: 400 },
      );
    }

    const messageInput = {
      name,
      email,
      phone,
      message,
    };

    const supabase = await createClient();

    const { error } = await supabase.from("contact_messages").insert([
      messageInput,
    ]);

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          error: "Kunde inte spara meddelandet.",
        },
        {
          status: 500,
        },
      );
    }

    try {
      await sendContactEmail(messageInput);
    } catch (error) {
      console.error("Could not send contact email notification.", error);
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "N\u00e5got gick fel.",
      },
      {
        status: 500,
      },
    );
  }
}
