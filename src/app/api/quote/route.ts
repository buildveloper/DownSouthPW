import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import { services } from "@/lib/site";

/**
 * Quote endpoint.
 *
 * Delivery is layered so the form works the day it is deployed and gets better
 * as the owner adds credentials (see README > "Turning the quote form on"):
 *
 *   1. Resend        — used when RESEND_API_KEY is set. Sends a formatted email
 *                      with the uploaded photos attached.
 *   2. FormSubmit    — the default. No account and no API key: it forwards the
 *                      lead (photos included) to the shop's Yahoo inbox.
 *   3. SMS (Twilio)  — optional, used when Twilio credentials are present, so a
 *                      lead can also land as a text.
 *   4. Local record  — every lead that passes validation is also written to
 *                      data/leads.jsonl and the server log, so nothing is lost
 *                      even if every mail path is down.
 *
 * The endpoint only reports success when at least one channel accepted the lead.
 * Otherwise it fails loudly and the form falls back to call / text / email.
 */

export const runtime = "nodejs";

const MAX_FILES = 3;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_FIELD_CHARS = 2000;

const TO_EMAIL =
  process.env.QUOTE_TO_EMAIL ?? "downsouthpressurewashing@yahoo.com";

type Lead = {
  name: string;
  phone: string;
  email: string;
  service: string;
  serviceLabel: string;
  town: string;
  message: string;
  subject: string;
  html: string;
  text: string;
};

/** Strips header-injection sequences out of anything bound for an email header. */
function oneLine(value: string, max = 120): string {
  return value.replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char] as string,
  );
}

const rateLog = new Map<string, number[]>();

/** Best-effort per-instance throttle. Deliberately fails open. */
function rateLimited(key: string): boolean {
  const windowMs = 10 * 60 * 1000;
  const now = Date.now();
  const recent = (rateLog.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  rateLog.set(key, recent);
  return recent.length > 6;
}

function buildLead(fields: {
  name: string;
  phone: string;
  email: string;
  service: string;
  serviceLabel: string;
  town: string;
  message: string;
}): Lead {
  const subject = oneLine(
    `New quote request — ${fields.serviceLabel} — ${fields.name}${
      fields.town ? ` (${fields.town})` : ""
    }`,
  );

  const rows: Array<[string, string]> = [
    ["Name", fields.name],
    ["Phone", fields.phone],
    ["Email", fields.email || "—"],
    ["Service", fields.serviceLabel],
    ["Town / area", fields.town || "—"],
    ["Details", fields.message || "—"],
  ];

  const html = `<h2 style="font-family:Arial,sans-serif">New quote request</h2>
<table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="border:1px solid #ddd;background:#f6f6f6"><b>${escapeHtml(
        label,
      )}</b></td><td style="border:1px solid #ddd">${escapeHtml(value).replace(
        /\n/g,
        "<br>",
      )}</td></tr>`,
  )
  .join("")}
</table>
<p style="font-family:Arial,sans-serif;font-size:13px;color:#666">
  Sent from the Down South Pressure Washing website.
</p>`;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  return { ...fields, subject, html, text };
}
function reason(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/** Channel 1: Resend. Used when an API key is configured. */
async function sendViaResend(lead: Lead, files: File[]): Promise<string> {
  const attachments = await Promise.all(
    files.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
    })),
  );

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.QUOTE_FROM_EMAIL ??
        "Down South Website <onboarding@resend.dev>",
      to: [TO_EMAIL],
      reply_to: lead.email || undefined,
      subject: lead.subject,
      html: lead.html,
      text: lead.text,
      attachments: attachments.length ? attachments : undefined,
    }),
  });

  if (!response.ok) {
    throw new Error(`resend ${response.status}`);
  }

  return "resend";
}

/** Channel 2: FormSubmit. The zero-configuration default. */
async function sendViaFormSubmit(lead: Lead, files: File[]): Promise<string> {
  const body = new FormData();
  body.append("_subject", lead.subject);
  body.append("_template", "table");
  body.append("_captcha", "false");
  if (lead.email) body.append("_replyto", lead.email);
  body.append("Name", lead.name);
  body.append("Phone", lead.phone);
  body.append("Email", lead.email || "—");
  body.append("Service", lead.serviceLabel);
  body.append("Town or area", lead.town || "—");
  body.append("Details", lead.message || "—");
  body.append("Photos attached", String(files.length));
  for (const file of files) body.append("attachment", file, file.name);

  const response = await fetch(`https://formsubmit.co/ajax/${TO_EMAIL}`, {
    method: "POST",
    body,
  });

  if (!response.ok) {
    throw new Error(`formsubmit ${response.status}`);
  }

  return "formsubmit";
}
/** Channel 3: optional SMS notification, only when fully configured. */
async function sendViaTwilio(lead: Lead): Promise<string | null> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.QUOTE_SMS_TO;
  if (!sid || !token || !from || !to) return null;

  const body = [
    `New quote request: ${lead.serviceLabel}`,
    `${lead.name} — ${lead.phone}`,
    lead.town ? `Area: ${lead.town}` : "",
  ]
    .filter(Boolean)
    .join("\n")
    .slice(0, 300);

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: to, From: from, Body: body }).toString(),
    },
  );

  if (!response.ok) throw new Error(`twilio ${response.status}`);
  return "sms";
}

/**
 * Channel 4: a local record plus a server log line.
 *
 * On a serverless host the filesystem is read-only, which is why this is
 * best-effort — the log line always lands, and it is enough to recover a lead
 * from the host's logs.
 */
async function recordLocally(lead: Lead, fileCount: number, ip: string) {
  const record = {
    at: new Date().toISOString(),
    service: lead.serviceLabel,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    town: lead.town,
    message: lead.message,
    photos: fileCount,
    ip,
  };

  console.log("[quote] new lead", JSON.stringify(record));

  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(
    path.join(dir, "leads.jsonl"),
    `${JSON.stringify(record)}\n`,
    "utf8",
  );
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Could not read that submission." },
      { status: 400 },
    );
  }

  const read = (key: string) =>
    String(form.get(key) ?? "")
      .slice(0, MAX_FIELD_CHARS)
      .trim();

  const values = {
    name: read("name"),
    phone: read("phone"),
    email: read("email"),
    service: read("service"),
    town: read("town"),
    message: read("message"),
  };

  // Honeypot: answer cheerfully, deliver nothing.
  if (read("company")) {
    return NextResponse.json({ ok: true, delivered: [] });
  }

  const errors: Record<string, string> = {};
  if (values.name.length < 2) errors.name = "Name is required.";
  if (values.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "A reachable 10-digit phone number is required.";
  }
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
    errors.email = "That email address does not look right.";
  }
  if (!values.service) errors.service = "Please choose a service.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, message: "Please check the highlighted fields.", errors },
      { status: 422 },
    );
  }

  const files = form
    .getAll("photos")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0)
    .slice(0, MAX_FILES);

  for (const file of files) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { ok: false, message: "Photos need to be under 5MB each." },
        { status: 413 },
      );
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { ok: false, message: "Photos only, please — JPEG, PNG or HEIC." },
        { status: 415 },
      );
    }
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Too many requests in a row. Give it a few minutes, or just call instead.",
      },
      { status: 429 },
    );
  }

  const serviceLabel =
    services.find((service) => service.id === values.service)?.title ??
    (values.service === "not-sure" ? "Not sure yet" : "General enquiry");

  const lead = buildLead({ ...values, serviceLabel });

  const delivered: string[] = [];
  const problems: string[] = [];

  try {
    await recordLocally(lead, files.length, ip);
    delivered.push("log");
  } catch (error) {
    problems.push(`log: ${reason(error)}`);
  }

  if (process.env.RESEND_API_KEY) {
    try {
      delivered.push(await sendViaResend(lead, files));
    } catch (error) {
      problems.push(reason(error));
    }
  } else {
    try {
      delivered.push(await sendViaFormSubmit(lead, files));
    } catch (error) {
      problems.push(reason(error));
    }
  }

  try {
    const sms = await sendViaTwilio(lead);
    if (sms) delivered.push(sms);
  } catch (error) {
    problems.push(`sms: ${reason(error)}`);
  }

  const emailed =
    delivered.includes("resend") || delivered.includes("formsubmit");

  if (!emailed) {
    console.error("[quote] no email channel delivered", {
      problems,
      lead: lead.text,
    });
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not get that emailed through. Call or text and it will get handled straight away.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered });
}