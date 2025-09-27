import React, { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";

// Defensive icon mapping (SQL fallback if Database is missing in lucide-react)
const DatabaseIcon =
  typeof Icons.Database === "function" ? Icons.Database : Icons.Code2;
const Code2 = Icons.Code2;
const PieChart = Icons.PieChart;
const Cloud = Icons.Cloud;
const Layers = Icons.Layers;
const Settings = Icons.Settings;
const Server = Icons.Server;
const Sparkles = Icons.Sparkles;
const Github = Icons.Github;
const Linkedin = Icons.Linkedin;
const Mail = Icons.Mail;
const MapPin = Icons.MapPin;
const FileText = Icons.FileText;
const ChevronRight = Icons.ChevronRight;
const Award = Icons.Award;
const Briefcase = Icons.Briefcase;
const Calendar = Icons.Calendar;
const BookOpen = Icons.BookOpen;

// ------------------------------
// Content
// ------------------------------
const PROFILE = {
  name: "Rohan Verma",
  titleWords: ["Data Analyst", "Data Engineer", "Consultant"],
  avatar: "/profile.jpg", // ✅ your photo in public folder
  tagline:
    "Professional and enthusiastic masters student with a strong blend of analytics and engineering.",
  location: "Boston, MA, Beacon St, USA",
  email: "verma.rohan@northeastern.edu",
  socials: {
    github: "https://github.com/Rohan3122k",
    linkedin: "http://www.linkedin.com/in/r3122k",
  },
};

const SKILLS = [
  { name: "SQL", icon: DatabaseIcon },
  { name: "Python", icon: Code2 },
  { name: "dbt", icon: Layers },
  { name: "Tableau", icon: PieChart },
  { name: "Power BI", icon: PieChart },
  { name: "Airflow", icon: Server },
  { name: "Spark", icon: Sparkles },
  { name: "AWS", icon: Cloud },
  { name: "Git", icon: Settings },
];

const CERTS = [
  { name: "Microsoft PowerBI Data Analyst Associate (PL300)" },
  { name: "IBM Data Science Certificate" },
  { name: "AWS Certified Cloud Practitioner (In Progress)" },
];

const SERVICES = [
  {
    title: "Project Scoping & Data Discovery",
    desc: "Understand business requirements and translate them into technical solutions.",
  },
  {
    title: "Data Analysis & Reporting",
    desc: "Advanced analytics with SQL + Python. Build reports and dashboards.",
  },
  {
    title: "Data Visualization",
    desc: "Interactive dashboards with Tableau/Power BI. Convert data into insights.",
  },
  {
    title: "ELT & ETL Pipelines",
    desc: "Design pipelines with dbt, Airflow, and cloud warehouses.",
  },
  { title: "Automation", desc: "Automate workflows to save time and improve consistency." },
  { title: "Cloud Deployment", desc: "Deploy data solutions in the cloud (AWS)." },
];

const TIMELINE = {
  education: [
    {
      degree: "M.S. in Data Analytics Engineering",
      org: "Northeastern University",
      time: "2024 – 2026",
      details: [
        "Relevant courses: Database Management, Data Mining, Machine Learning, Economic Decision Making",
      ],
    },
    {
      degree: "B.Tech in Electrical & Electronics Engineering",
      org: "BIT Mesra",
      time: "2019 – 2023",
      details: [
        "Coursework: Programming Languages, IoT, OOP, Software Engineering, Control Systems, Probability",
      ],
    },
  ],
  work: [
    {
      role: "Research Assistant",
      org: "Department of EEE, BIT Mesra, India",
      time: "Jan 2023 – May 2023",
      bullets: [
        "Analyzed probability distributions and demand in energy datasets.",
        "Built forecasting models with Python/MATLAB.",
        "Created dashboards translating technical results into insights.",
      ],
    },
    {
      role: "Data Engineering Intern",
      org: "Rajasthan State Electricity Board, Jaipur, India",
      time: "May 2022 – Dec 2022",
      bullets: [
        "Cleaned and structured ERP/SCADA datasets.",
        "Wrote SQL queries and built Tableau/Excel dashboards.",
      ],
    },
    {
      role: "Data Science Intern",
      org: "Independent Media, Jaipur, India",
      time: "Dec 2021 – May 2022",
      bullets: [
        "Analyzed web traffic and engagement data with Python + SQL.",
        "Built Power BI dashboards and marketing reports.",
        "Delivered insights for content and branding strategy.",
      ],
    },
  ],
};

const PROJECTS = {
  analytics: [
    "Predicting Energy Consumption of Europe using ANN",
    "Social Media Sentiment Analysis (Finance/Defense/Healthcare)",
    "Detecting Mental Health Conditions from Social Media Posts",
    "Predicting Player Online Gaming Behavior",
    "Superconductor Critical Temperature Prediction",
    "Analyzing EV Charging Infrastructure across the U.S.",
  ],
  dashboards: [
    "Walmart Superstore DataFlow: End-to-End ETL Project",
    "NYC MTA Subway Delay Insights Dashboard (2020–2025)",
    "Electronic Medical Record Dashboard",
  ],
};

const PUBLICATION = {
  title: "Research Publication",
  papers: [
    {
      authors: "P. Gupta, R. Verma, D. Verma and P. S. Rathore",
      text: "Building a Stronger Grid: How Blockchain Can Improve Smart Grid Resilience",
      conf:
        "2023 IEEE Renewable Energy and Sustainable E-Mobility Conference (RESEM), Bhopal, India",
      doi: "10.1109/RESEM57584.2023.10236304",
      doiUrl: "https://doi.org/10.1109/RESEM57584.2023.10236304",
    },
  ],
};

const CONTACT = {
  mapLabel: "Beacon St, Boston",
  address: "Beacon St, Boston, MA, USA",
};

// ------------------------------
// Helpers
// ------------------------------
const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "What I Do" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
];

function useTypewriter(words, speed = 120, pause = 1200) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [dir, setDir] = useState("fwd");

  useEffect(() => {
    const word = words[index % words.length] || "";
    if (dir === "fwd") {
      if (sub < word.length) {
        const t = setTimeout(() => setSub((s) => s + 1), speed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setDir("bwd"), pause);
        return () => clearTimeout(t);
      }
    } else {
      if (sub > 0) {
        const t = setTimeout(() => setSub((s) => s - 1), speed / 2);
        return () => clearTimeout(t);
      } else {
        setDir("fwd");
        setIndex((i) => (i + 1) % words.length);
      }
    }
  }, [sub, dir, index, words, speed, pause]);

  const text = (words[index % words.length] || "").slice(0, sub);
  return text + (dir === "fwd" ? "|" : "");
}

const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24 py-16">
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="text-3xl font-bold mb-6"
    >
      {title}
    </motion.h2>
    {children}
  </section>
);

// ------------------------------
// App
// ------------------------------
export default function App() {
  const typed = useTypewriter(PROFILE.titleWords);

  return (
    <div className="min-h-screen text-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 p-6">
        {/* Sidebar */}
        <aside className="bg-white/90 rounded-2xl p-6 text-center shadow">
          <img
            src={PROFILE.avatar}
            alt="Avatar"
            className="w-28 h-28 mx-auto rounded-full object-cover shadow-md"
          />
          <h1 className="mt-4 text-2xl font-bold">{PROFILE.name}</h1>
          <p className="text-sm text-slate-600 mt-1">{PROFILE.tagline}</p>
          <div className="mt-4 flex justify-center gap-3">
            <a href={PROFILE.socials.github} target="_blank">
              <Github className="w-5 h-5" />
            </a>
            <a href={PROFILE.socials.linkedin} target="_blank">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={`mailto:${PROFILE.email}`}>
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </aside>

        {/* Main */}
        <main className="space-y-12">
          <Section id="home" title="Welcome">
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-extrabold text-white"
            >
              {PROFILE.name}
            </motion.h2>
            <p className="mt-3 text-xl text-white">
              I’m a <span className="font-bold">{typed}</span>
            </p>
          </Section>

          <Section id="about" title="About">
            <p className="text-white">{PROFILE.tagline}</p>
          </Section>

          <Section id="skills" title="Skills & Certifications">
            <div className="flex flex-wrap gap-3">
              {SKILLS.map((s) => (
                <span
                  key={s.name}
                  className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm"
                >
                  {React.createElement(s.icon, { className: "w-5 h-5" })}
                  {s.name}
                </span>
              ))}
            </div>
            <h3 className="mt-6 mb-3 text-lg font-semibold text-white">
              Certifications
            </h3>
            <ul className="list-disc ml-6 text-white">
              {CERTS.map((c) => (
                <li key={c.name}>{c.name}</li>
              ))}
            </ul>
          </Section>

          <Section id="services" title="What I Do">
            <div className="grid md:grid-cols-2 gap-4">
              {SERVICES.map((srv) => (
                <div key={srv.title} className="bg-white p-4 rounded-xl">
                  <h4 className="font-semibold">{srv.title}</h4>
                  <p className="text-sm text-slate-700 mt-2">{srv.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="projects" title="Projects">
            <h3 className="font-semibold text-white mb-2">Analytics</h3>
            <ul className="list-disc ml-6 text-white">
              {PROJECTS.analytics.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <h3 className="font-semibold text-white mt-6 mb-2">Dashboards</h3>
            <ul className="list-disc ml-6 text-white">
              {PROJECTS.dashboards.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Section>

          <Section id="resume" title="Resume">
            <h3 className="text-xl font-semibold text-white mb-4">Education</h3>
            {TIMELINE.education.map((e) => (
              <div key={e.degree} className="mb-4">
                <p className="font-semibold text-white">{e.degree}</p>
                <p className="text-slate-300">{e.org}</p>
                <p className="text-slate-400 text-sm">{e.time}</p>
              </div>
            ))}
            <h3 className="text-xl font-semibold text-white mt-6 mb-4">
              Experience
            </h3>
            {TIMELINE.work.map((w) => (
              <div key={w.role} className="mb-4">
                <p className="font-semibold text-white">{w.role}</p>
                <p className="text-slate-300">{w.org}</p>
                <p className="text-slate-400 text-sm">{w.time}</p>
                <ul className="list-disc ml-6 text-slate-200 text-sm">
                  {w.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>

          <Section id="research" title={PUBLICATION.title}>
            {PUBLICATION.papers.map((p) => (
              <div key={p.doi} className="bg-white/10 p-4 rounded-xl">
                <BookOpen className="w-5 h-5 text-white mb-2" />
                <p className="text-white text-sm">
                  <strong>{p.authors}.</strong> {p.text}.{" "}
                  <em>{p.conf}</em>. DOI:{" "}
                  <a
                    href={p.doiUrl}
                    className="underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {p.doi}
                  </a>
                </p>
              </div>
            ))}
          </Section>

          <Section id="contact" title="Contact">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-xl">
                <h3 className="font-semibold">Address</h3>
                <p className="text-sm text-slate-700">{CONTACT.address}</p>
                <a
                  href="https://www.google.com/maps?q=Beacon+St,+Boston,+MA"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-600 underline mt-2 block"
                >
                  Open in Google Maps
                </a>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <h3 className="font-semibold mb-2">Leave a Message</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const data = new FormData(form);
                    const name = data.get("name");
                    const email = data.get("email");
                    const msg = data.get("message");
                    const mailto = `mailto:${PROFILE.email}?subject=Portfolio%20contact%20from%20${encodeURIComponent(
                      name
                    )}&body=${encodeURIComponent(
                      msg
                    )}%0D%0A%0D%0AContact:%20${encodeURIComponent(email)}`;
                    window.location.href = mailto;
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
                    placeholder="What would you like to discuss?"
                    className="w-full rounded-xl border px-3 py-2"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-slate-900 text-white px-4 py-2"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </Section>
        </main>
      </div>
      <footer className="text-center text-xs text-slate-400 py-6">
        © {new Date().getFullYear()} {PROFILE.name}. Built with React + Vite +
        Tailwind.
      </footer>
    </div>
  );
}
