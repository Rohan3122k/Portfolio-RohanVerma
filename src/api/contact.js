// /api/contact.js
import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // TIP: Use a verified domain in production, e.g. "Rohan <hello@your-domain.com>"
    // For trial, "onboarding@resend.dev" works to verified recipients.
    const from = "Rohan Portfolio <onboarding@resend.dev>";
    const to = process.env.CONTACT_TO_EMAIL || "verma.rohan@northeastern.edu";

    await resend.emails.send({
      from,
      to,
      subject: `New portfolio message from ${name}`,
      reply_to: email,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.5;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
        </div>
      `,
      text: `New message from ${name} (${email})\n\n${message}`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({ ok: false, error: "Email send failed" });
  }
}

/** very small HTML escaper */
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
