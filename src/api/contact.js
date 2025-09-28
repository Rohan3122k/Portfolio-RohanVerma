// /api/contact.js
import { Resend } from "@resend/node";

/**
 * Vercel Serverless Function
 * Expects JSON: { name, email, message }
 * Env vars required:
 *   - RESEND_API_KEY
 *   - CONTACT_TO (your inbox email)
 *   - CONTACT_FROM (a verified sender, e.g. "portfolio@yourdomain.com")
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, email, message } = req.body || {};
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const subject = `Portfolio contact from ${name}`;
    const html = `
      <div style="font-family:system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height:1.6;">
        <h2 style="margin:0 0 12px">New portfolio message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;background:#f6f7f9;padding:12px;border-radius:8px;border:1px solid #e5e7eb;">${escapeHtml(message)}</pre>
      </div>
    `;

    await resend.emails.send({
      from: process.env.CONTACT_FROM, // e.g. "Rohan Portfolio <hello@yourdomain.com>"
      to: process.env.CONTACT_TO,     // your inbox
      reply_to: email,                // lets you reply straight to sender
      subject,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Email send failed:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}

// Small HTML escape helper
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
