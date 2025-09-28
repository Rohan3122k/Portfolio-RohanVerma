import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    try {
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>", // you can customize this
        to: "verma.rohan@northeastern.edu", // your email
        subject: `New message from ${name}`,
        reply_to: email,
        text: message,
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
