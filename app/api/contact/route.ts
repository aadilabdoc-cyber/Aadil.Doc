type ContactPayload = {
  name: string;
  email: string;
  country: string;
  phone: string;
  eventLocation: string;
  eventDate: string;
  eventDetails: string;
};

const REQUIRED_FIELDS: Array<keyof ContactPayload> = [
  "name",
  "email",
  "country",
  "phone",
  "eventLocation",
  "eventDate",
  "eventDetails",
];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return Response.json(
      {
        success: false,
        error:
          "The enquiry sheet isn't configured yet. Set GOOGLE_SHEETS_WEBHOOK_URL.",
      },
      { status: 500 },
    );
  }

  let payload: Partial<ContactPayload>;
  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  for (const field of REQUIRED_FIELDS) {
    if (!isNonEmptyString(payload[field])) {
      return Response.json(
        { success: false, error: `Missing or empty field: ${field}` },
        { status: 400 },
      );
    }
  }

  if (!isValidEmail(payload.email as string)) {
    return Response.json(
      { success: false, error: "Invalid email address." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const bodyText = await response.text();
    let sheetResult: { success?: boolean } | null = null;
    try {
      sheetResult = JSON.parse(bodyText);
    } catch {
      sheetResult = null;
    }
    if (!response.ok) {
      // Log the raw response so misconfigured Apps Script deployments
      // (wrong "Execute as" / "Who has access", or a /dev instead of /exec
      // URL) are easy to diagnose from the server logs.
      console.error(
        "Google Sheets webhook did not confirm success:",
        response.status,
        bodyText.slice(0, 500),
      );
      return Response.json(
        { success: false, error: "Could not reach the enquiry sheet." },
        { status: 502 },
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Google Sheets webhook request failed:", error);
    return Response.json(
      { success: false, error: "Could not reach the enquiry sheet." },
      { status: 502 },
    );
  }
}
