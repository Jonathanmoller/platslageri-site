import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        {
          error: "Namn och meddelande krävs.",
        },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    const { error } = await supabase.from("contact_messages").insert([
      {
        name,
        email,
        phone,
        message,
      },
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

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Något gick fel.",
      },
      {
        status: 500,
      },
    );
  }
}
