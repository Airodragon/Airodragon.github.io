import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 6;

const requestStore = new Map<string, { count: number; resetAt: number }>();

function getRequesterKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return realIp?.trim() || "anonymous";
}

function exceedsRateLimit(key: string) {
  const now = Date.now();
  const existing = requestStore.get(key);

  if (!existing || now > existing.resetAt) {
    requestStore.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  existing.count += 1;
  requestStore.set(key, existing);
  return false;
}

async function sendToWebhook(payload: unknown) {
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    console.info("CONTACT_FORM_SUBMISSION", payload);
    return;
  }

  const response = await fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to forward message to webhook");
  }
}

export async function POST(request: Request) {
  const requesterKey = getRequesterKey(request);

  if (exceedsRateLimit(requesterKey)) {
    return NextResponse.json(
      { message: "Too many requests. Please try again in a little while." },
      {
        status: 429
      }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Please review your details and try again.",
        errors: parsed.error.flatten().fieldErrors
      },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    // Honeypot field filled by bots: silently accept.
    return NextResponse.json({ message: "Thanks, your message is received." });
  }

  try {
    await sendToWebhook({
      ...parsed.data,
      submittedAt: new Date().toISOString()
    });
  } catch {
    return NextResponse.json(
      {
        message: "Your message could not be processed right now. Please email hello@revify.studio."
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Thanks for reaching out. I will reply within 24 hours."
  });
}
