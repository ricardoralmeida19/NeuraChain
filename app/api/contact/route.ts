import { NextResponse } from "next/server";

// Sends form submissions to your inbox through Resend (resend.com).
// Set these in Vercel > Project > Settings > Environment Variables:
//   RESEND_API_KEY      your Resend API key
//   CONTACT_TO_EMAIL    where submissions go
//   CONTACT_FROM_EMAIL  a sender on a domain you've verified in Resend

const FIELDS: Record<string, string> = {
  name: "Name",
  company: "Company",
  email: "Email",
  phone: "Phone",
  employees: "Employees",
  focus: "Biggest cost",
  message: "Message",
};

function clean(v: unknown, max = 2000) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "The request wasn't readable." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this in.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const kind = clean(body.kind, 40) === "early-access" ? "early-access" : "assessment";
  const email = clean(body.email, 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That email address doesn't look complete." }, { status: 400 });
  }
  if (kind === "assessment" && (!clean(body.name) || !clean(body.company))) {
    return NextResponse.json({ error: "Name and company are required." }, { status: 400 });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("Contact form is not configured: missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL");
    return NextResponse.json({ error: "The form isn't connected yet." }, { status: 503 });
  }

  const rows = Object.entries(FIELDS)
    .map(([k, label]) => [label, clean(body[k])] as const)
    .filter(([, v]) => v);

  const subject =
    kind === "early-access"
      ? `Platform early access: ${email}`
      : `Assessment request: ${clean(body.company, 120)}`;

  const html = `<h2>${escapeHtml(subject)}</h2><table cellpadding="6">${rows
    .map(([l, v]) => `<tr><td><b>${l}</b></td><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;
  const text = rows.map(([l, v]) => `${l}: ${v}`).join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: email,
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return NextResponse.json({ error: "The message couldn't be sent." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
