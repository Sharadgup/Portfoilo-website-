import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the JSON data received in the request
    const data = await request.json();
    console.log("Form data received:", data);

    // Replace with your Google Apps Script Web App URL (using Script ID-based URL format)
    const GOOGLE_APPS_SCRIPT_URL = `https://script.google.com/macros/s/AKfycbw7vDFl1dNfbSkgg1AZIng3x01zwChtFs_P7Ql3Np5uV-AXzFuMXsDnH5XQekPKK6c_1A/exec`; // Use your script ID here

    // Send the data to the Google Apps Script Web App
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Log the response status and body for better debugging
    const responseBody = await response.text();
    console.log("Google Apps Script response:", responseBody);
    console.log("Google Apps Script response status:", response.status);

    // Check if the response from Google Apps Script is successful
    if (!response.ok) {
      console.error("Google Apps Script returned an error:", responseBody);
      throw new Error(
        `Failed to submit data to Google Apps Script: ${responseBody}`
      );
    }

    // Parse the response as JSON if needed (if Apps Script returns JSON)
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseBody);
    } catch (e) {
      console.error("Error parsing Google Apps Script response:", e);
      parsedResponse = responseBody; // If parsing fails, return raw response
    }

    // Return success response to the client
    return NextResponse.json({
      message: "Form submitted successfully to Google Apps Script",
      response: parsedResponse,
    });
  } catch (error) {
    // Ensure 'error' is treated as an instance of Error
    const typedError = error as Error;

    // Log the error and return an error response to the client
    console.error("Error processing form data:", typedError);
    return NextResponse.json(
      { message: "Failed to submit form", error: typedError.message },
      { status: 500 }
    );
  }
}
