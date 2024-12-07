import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Form data received:", data);

    const GOOGLE_APPS_SCRIPT_URL = `https://script.google.com/macros/s/AKfycbzszIrXuWQ0dswNLmpeyapql_wMp9708jIk4eFbhSdNW3_VG-3jrrIuTSAFLSWhKf0LfQ/exec`;

    console.log("Attempting to fetch from Google Apps Script URL:", GOOGLE_APPS_SCRIPT_URL);

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Fetch response:", response);

    const result = await response.text();
    console.log("Response body:", result);

    return NextResponse.json({ message: "Form submitted successfully", result });

  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { message: "Failed to submit form", error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

