// /api/send-email.js  (ESM)
import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  // Handle both parsed and raw bodies
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch {}
  }

  const { name, email, message } = body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing fields' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Rohan <onboarding@resend.dev>', // sandbox sender
      to: 'verma.rohan@northeastern.edu',    // your inbox
      reply_to: email,
      subject: `Portfolio contact from ${name}`,
      text: `${message}\n\nReply to: ${email}`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ ok: false, error: 'Email failed' });
  }
}
