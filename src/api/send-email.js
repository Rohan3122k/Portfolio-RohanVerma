
import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      ok: false,
      error: "Method not allowed",
    });
  }

  let body = req.body;

  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({
        ok: false,
        error: "Invalid JSON",
      });
    }
  }

  const { name, email, message } = body || {};

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !message.trim() ||
    name.length > 100 ||
    email.length > 254 ||
    message.length > 5000
  ) {
    return res.status(400).json({
      ok: false,
      error: "Please enter valid contact details.",
    });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is missing");

    return res.status(500).json({
      ok: false,
      error: "Email service is not configured.",
    });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ||
        "Rohan Portfolio <onboarding@resend.dev>",

      to: ["verma.rohan@northeastern.edu"],

      replyTo: email.trim(),

      subject: `Portfolio Contact from ${name.trim()}`,

      text: `
Name: ${name.trim()}
Email: ${email.trim()}

Message:
${message.trim()}
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return res.status(502).json({
        ok: false,
        error: "Email delivery failed. Please try again.",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Message sent successfully!",
      id: data?.id,
    });

  } catch (err) {
    console.error("Server error:", err);

    return res.status(500).json({
      ok: false,
      error: "Something went wrong.",
    });
  }
}
