type ContactPayload = {
  name: string;
  email: string;
  country: string;
  phone: string;
  subject: string;
  eventName: string;
  eventVenue: string;
  eventDate: string;
  eventDetails: string;
};

const REQUIRED_FIELDS: Array<keyof ContactPayload> = [
  "name",
  "email",
  "country",
  "phone",
  "subject",
  "eventName",
  "eventVenue",
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
        error: "The enquiry sheet isn't configured yet. Set GOOGLE_SHEETS_WEBHOOK_URL.",
      },
      { status: 500 },
    );
  }

  let payload: Partial<ContactPayload>;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ success: false, error: "Invalid request body." }, { status: 400 });
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
    return Response.json({ success: false, error: "Invalid email address." }, { status: 400 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return Response.json(
        { success: false, error: "Could not reach the enquiry sheet." },
        { status: 502 },
      );
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { success: false, error: "Could not reach the enquiry sheet." },
      { status: 502 },
    );
  }
}
