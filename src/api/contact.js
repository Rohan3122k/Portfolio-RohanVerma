// /api/contact.js
const { Resend } = require('resend');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing fields' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      // Use Resend’s sandbox sender so you don’t need a verified domain yet
      from: 'Rohan <onboarding@resend.dev>',
      // your inbox:
      to: 'verma.rohan@northeastern.edu',
      reply_to: email,
      subject: `Portfolio contact from ${name}`,
      text: `${message}\n\nReply to: ${email}`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ ok: false, error: 'Email failed' });
  }
};
