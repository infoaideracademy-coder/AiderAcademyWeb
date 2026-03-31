import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!process.env.SANITY_WRITE_TOKEN) {
      console.error("SANITY_WRITE_TOKEN is not defined");
      return NextResponse.json(
        { message: "Configuration error" },
        { status: 500 }
      );
    }

    const doc = {
      _type: "contactSubmission",
      name,
      email,
      phone,
      message,
      submittedAt: new Date().toISOString(),
    };

    const result = await writeClient.create(doc);

    return NextResponse.json(
      { message: "Submission successful", id: result._id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting to Sanity:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
