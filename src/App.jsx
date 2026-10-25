  <div>
    <h3 className="font-semibold">Tableau Public</h3>
    <a
      href="https://public.tableau.com/app/profile/rohan.verma7748/vizzes"
      target="_blank"
      rel="noreferrer"
      className="text-sm text-sky-600 hover:underline break-all"
    >
      public.tableau.com/app/profile/rohan.verma7748/vizzes
    </a>
  </div>
</div>

        <div className="rounded-xl overflow-hidden border">
          <iframe
            title="Beacon St Map"
            className="w-full h-64"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              CONTACT.address
            )}&output=embed`}
          />
        </div>
      </div>
    </Card>

    {/* Contact Form */}
    <Card>
      <h3 className="font-semibold mb-3">Leave a message</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const name = data.get("name");
          const email = data.get("email");
          const message = data.get("message");

          try {
            const res = await fetch("/api/send-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, email, message }),
            });

            if (res.ok) {
              alert(" Your message has been sent!");
              e.currentTarget.reset();
            } else {
              alert(" Failed to send message. Try again.");
            }
          } catch (err) {
            alert(" Error: " + err.message);
          }
        }}
        className="space-y-3"
      >
        <input
          name="name"
          required
          placeholder="Your Name"
          className="w-full rounded-xl border px-3 py-2"
        />
        <input
          name="email"
          required
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border px-3 py-2"
        />
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Message"
          className="w-full rounded-xl border px-3 py-2"
        />
        <button
          type="submit"
          className="rounded-2xl bg-sky-500 text-white px-4 py-2 font-medium hover:bg-sky-600"
        >
          Submit
        </button>
      </form>
      {/* Developer tests intentionally hidden from the public portfolio. */}
    </Card>
  </div>
</Shell>


          <div className="px-8 md:px-12 lg:px-16">
            <footer className="pb-10 text-center text-xs text-slate-500">
              © {new Date().getFullYear()} {PROFILE.name}. Built with React + Vite
              + Tailwind.
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
