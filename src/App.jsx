import React, { useEffect, useRef, useState } from "react";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";

/**
 * Rohan Verma – Stanley-style Interactive Portfolio (Fullpage Snap)
 * - Dark sticky left sidebar with active nav highlight
 * - **Full-screen sections** with CSS scroll-snap (Home → About → ...)
 * - Smooth scroll within the main pane via scrollIntoView
 * - Typewriter hero, blue accents, cards, Projects, Research, Contact
 * - Vite-safe asset paths + icon fallbacks
 */

// ---- Icons (with Database fallback) ----
const DatabaseIcon = typeof Icons.Database === "function" ? Icons.Database : Icons.Code2;
const {
  Mail,
  MapPin,
  Github,
  Linkedin,
  FileText,
  ChevronRight,
  Award,
  Briefcase,
  Calendar,
  Code2,
  PieChart,
  Cloud,
  Layers,
  Settings,
  Server,
  Sparkles,
  BookOpen,
} = Icons;

// ---- Profile & content ----
const PROFILE = {
  name: "Rohan Verma",
  titleWords: ["Data Analyst", "Data Engineer", "Consultant"],
  avatar: "/profile.jpg", // put your photo in /public/profile.jpg
  tagline:
    "Professional and enthusiastic master's student with a strong blend of analytics and engineering.",
  location: "Beacon St, Boston, MA, USA",
  email: "verma.rohan@northeastern.edu",
  socials: {
    github: "https://github.com/Rohan3122k",
    linkedin: "https://www.linkedin.com/in/r3122k",
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
  { name: "Microsoft Power BI Data Analyst Associate (PL-300)" },
  { name: "IBM Data Science Certificate" },
  { name: "AWS Certified Cloud Practitioner (In Progress)" },
];

const SERVICES = [
  {
    title: "Project Scoping & Data Discovery",
    desc:
      "Translate business requirements into technical solutions with clear scope and success criteria.",
  },
  {
    title: "Data Analysis & Reporting",
    desc:
      "Advanced analytics with SQL + Python. Build reports and dashboards to drive decisions.",
  },
  {
    title: "Data Visualization",
    desc:
      "Interactive dashboards in Tableau/Power BI. Convert complex data into clear insights.",
  },
  {
    title: "ELT & ETL Pipelines",
    desc:
      "Design robust pipelines with dbt, Airflow, and cloud warehouses with observability in mind.",
  },
  { title: "Automation", desc: "Automate workflows to save time and reduce errors." },
  { title: "Cloud Deployment", desc: "Deploy and operate data solutions on AWS." },
];

const TIMELINE = {
  education: [
    {
      degree: "M.S. in Data Analytics Engineering",
      org: "Northeastern University",
      time: "2024 – 2026",
      details: [
        "Relevant courses: DB Management, Data Mining & Visualization, Machine Learning, Economic Decision Making",
      ],
    },
    {
      degree: "B.Tech in Electrical & Electronics Engineering",
      org: "BIT Mesra",
      time: "2019 – 2023",
      details: [
        "Coursework: C/Python, DSA, IoT, OOP, Software Engineering, Power Systems, Control Systems, Probability & Statistics",
      ],
    },
  ],
  work: [
    {
      role: "Research Assistant",
      org: "Department of EEE, BIT Mesra, India",
      time: "Jan 2023 – May 2023",
      bullets: [
        "Analyzed probability distributions and energy demand datasets using Python/MATLAB, identifying efficiency gaps.",
        "Built forecasting simulations for varying scenarios and presented structured reports to faculty.",
        "Documented processes and created dashboards translating technical results into actionable insights.",
      ],
    },
    {
      role: "Data Engineering Intern",
      org: "Rajasthan State Electricity Board, Jaipur, India",
      time: "May 2022 – Dec 2022",
      bullets: [
        "Collected, cleaned, and structured ERP/SCADA datasets improving data quality and governance.",
        "Wrote SQL and built Excel/Tableau dashboards to track outages and utilization.",
      ],
    },
    {
      role: "Data Science Intern",
      org: "Independent Media, Jaipur, India",
      time: "Dec 2021 – May 2022",
      bullets: [
        "Analyzed web traffic & engagement with Python and SQL to identify audience behavior.",
        "Built Power BI dashboards and marketing performance reports.",
        "Delivered competitive insights and audience analysis for content & branding decisions.",
      ],
    },
  ],
};

const PROJECTS = {
  analytics: [
    {
      title: "Predicting Energy Consumption of Europe using ANN",
      tech: ["Python", "PCA", "ANN", "TensorFlow", "Keras", "Power BI", "Streamlit"],
      blurb:
        "Processed 228k+ rows, applied PCA, trained ANN to forecast energy demand (R²≈0.98); deployed a realtime app.",
    },
    {
      title: "Social Media Sentiment Analysis (Finance/Defense/Healthcare)",
      tech: ["Python", "NLP", "TextBlob", "Visualization"],
      blurb:
        "Classified sentiment on 10.5k+ items across sectors for two U.S. administrations; compared macro indicators.",
    },
    {
      title: "Detecting Mental Health Conditions from Social Posts",
      tech: ["Python", "TensorFlow", "Keras", "ETL"],
      blurb:
        "Built ETL + deep learning pipeline on 90k+ Reddit posts to flag potential mental-health signals.",
    },
    {
      title: "Predicting Player Online Gaming Behavior",
      tech: ["scikit-learn", "LogReg", "RandomForest", "KNN", "EDA"],
      blurb:
        "Modeled engagement/retention on 20k+ game records with robust ML baselines.",
    },
    {
      title: "Superconductor Critical Temperature Prediction",
      tech: ["RandomForest", "LinearReg", "PCA", "Python"],
      blurb:
        "Predicted critical temperatures for superconductor materials; RF model achieved ~92% accuracy.",
    },
    {
      title: "Analyzing EV Charging Infrastructure (U.S.)",
      tech: ["SQL", "MongoDB", "Python", "GeoPandas", "Folium"],
      blurb:
        "Modeled schemas and pipelines; analyzed station coverage, energy use, and CO₂ impact with geo-visuals.",
    },
  ],
  dashboards: [
    {
      title: "Walmart Superstore DataFlow: End-to-End ETL Project",
      tech: ["PostgreSQL", "Python", "SQLAlchemy", "Power BI"],
      blurb:
        "Automated ingestion to Postgres; transformed KPIs; delivered interactive Power BI dashboard.",
    },
    {
      title: "NYC MTA Subway Delay Insights (2020–2025)",
      tech: ["Power BI", "Time-series", "Ops Analytics"],
      blurb:
        "Visualized 5-year delay trends, passenger time lost, and line/borough impacts.",
    },
    {
      title: "Electronic Medical Record Dashboard",
      tech: ["Healthcare", "Python", "PostgreSQL", "Streamlit"],
      blurb:
        "Predicted no-show probability on 110k+ appointments and surfaced insights for clinicians.",
    },
  ],
};

const PUBLICATION = {
  title: "Research Publication",
  papers: [
    {
      authors: "P. Gupta, R. Verma, D. Verma and P. S. Rathore",
      text:
        "Building a Stronger Grid: How Blockchain Can Improve Smart Grid Resilience",
      conf:
        "2023 IEEE Renewable Energy and Sustainable E-Mobility Conference (RESEM), Bhopal, India, 2023, pp. 1-7",
      doi: "10.1109/RESEM57584.2023.10236304",
      doiUrl: "https://doi.org/10.1109/RESEM57584.2023.10236304",
    },
  ],
};

const CONTACT = {
  address: "Beacon St, Boston, MA, USA",
};

// ---- Helpers ----
const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills & Certifications" },
  { id: "services", label: "What I do?" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
  { id: "research", label: "Research Publication" },
  { id: "contact", label: "Contact" },
];

function useTypewriter(words, speed = 120, pause = 1200) {
  const [i, setI] = useState(0);
  const [sub, setSub] = useState(0);
  const [dir, setDir] = useState("fwd");
  useEffect(() => {
    const w = words[i % words.length] || "";
    if (dir === "fwd") {
      if (sub < w.length) {
        const t = setTimeout(() => setSub((s) => s + 1), speed);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setDir("bwd"), pause);
      return () => clearTimeout(t);
    } else {
      if (sub > 0) {
        const t = setTimeout(() => setSub((s) => s - 1), speed / 2);
        return () => clearTimeout(t);
      }
      setDir("fwd");
      setI((x) => (x + 1) % words.length);
    }
  }, [sub, dir, i, words, speed, pause]);
  const text = (words[i % words.length] || "").slice(0, sub);
  return text + (dir === "fwd" ? "|" : "");
}

function useScrollSpy(ids, rootRef) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const rootEl = rootRef?.current || null;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { root: rootEl, rootMargin: "0px 0px -40% 0px", threshold: 0.1 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids, rootRef]);
  return active;
}

const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium shadow-sm">
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border bg-white p-5 shadow-sm ${className}`}>{children}</div>
);

const Section = ({ id, title, children }) => (
  <section id={id} className="min-h-screen snap-start flex flex-col justify-start py-16">
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="text-3xl font-extrabold mb-6 text-slate-800"
    >
      {title}
      <span className="block h-1 w-16 bg-sky-500 rounded mt-2" />
    </motion.h2>
    {children}
  </section>
);

// ---- Dev tests ----
function runDevTests() {
  const out = [];
  const ok = (n) => out.push({ n, pass: true });
  const bad = (n, d) => out.push({ n, pass: false, d });

  try {
    if (!Array.isArray(SKILLS) || SKILLS.length === 0) throw new Error("empty");
    const badIcon = SKILLS.find((s) => typeof s.icon !== "function");
    if (badIcon) throw new Error(`icon not component: ${badIcon.name}`);
    ok("SKILLS icons");
  } catch (e) {
    bad("SKILLS icons", String(e.message || e));
  }

  try {
    if (!/@/.test(PROFILE.email) || !/\./.test(PROFILE.email)) throw new Error("format");
    ok("Email format");
  } catch (e) {
    bad("Email format", String(e.message || e));
  }

  try {
    if (!PROJECTS.analytics?.length || !PROJECTS.dashboards?.length) throw new Error("missing");
    ok("Projects populated");
  } catch (e) {
    bad("Projects populated", String(e.message || e));
  }

  return out;
}

const DevTests = () => {
  const [r, setR] = useState([]);
  useEffect(() => setR(runDevTests()), []);
  return (
    <details className="mt-6 text-xs text-slate-500">
      <summary>Developer Tests</summary>
      <ul className="mt-2 list-disc pl-5">
        {r.map((x) => (
          <li key={x.n} className={x.pass ? "text-green-700" : "text-red-700"}>
            {x.pass ? "✔" : "✖"} {x.n} {x.d ? `— ${x.d}` : ""}
          </li>
        ))}
      </ul>
    </details>
  );
};

// ---- App ----
export default function App() {
  const typed = useTypewriter(PROFILE.titleWords);
  const scrollerRef = useRef(null);
  const active = useScrollSpy(sections.map((s) => s.id), scrollerRef);

  const handleNav = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-6">
        {/* Sidebar */}
        <aside className="sticky top-6 self-start">
          <div className="rounded-2xl bg-slate-900 text-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <img src={PROFILE.avatar} alt="Avatar" className="w-28 h-28 rounded-full object-cover shadow-md" />
              <h1 className="mt-4 text-2xl font-bold">{PROFILE.name}</h1>
              <p className="text-sm text-slate-300 mt-1">{PROFILE.tagline}</p>

              <div className="mt-4 flex items-center gap-3">
                <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-slate-800 hover:bg-slate-700">
                  <Github className="w-5 h-5" />
                </a>
                <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-slate-800 hover:bg-slate-700">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={`mailto:${PROFILE.email}`} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700">
                  <Mail className="w-5 h-5" />
                </a>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Badge><MapPin className="w-4 h-4" /> {PROFILE.location}</Badge>
                <Badge><Mail className="w-4 h-4" /> {PROFILE.email}</Badge>
              </div>

              <nav className="mt-6 w-full">
                <ul className="space-y-1">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        onClick={(e) => handleNav(e, s.id)}
                        className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
                          active === s.id ? "bg-sky-500 text-white" : "hover:bg-slate-800"
                        }`}
                      >
                        {s.label}
                        <ChevronRight className="w-4 h-4 opacity-80" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <a href="#resume" onClick={(e) => handleNav(e, "resume")} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-white hover:bg-sky-600">
                <FileText className="w-4 h-4" /> View Resume
              </a>
            </div>
          </div>
        </aside>

        {/* Main scroller with fullpage snapping */}
        <main>
          <div
            ref={scrollerRef}
            className="h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory pr-1"
          >
            {/* Hero */}
            <section
              id="home"
              className="relative overflow-hidden rounded-3xl border bg-white p-10 min-h-screen snap-start flex items-center"
            >
              <div
                className="absolute inset-0 -z-10 opacity-25"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="w-full">
                <motion.h2
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl md:text-6xl font-extrabold text-slate-900"
                >
                  {PROFILE.name}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  className="mt-3 text-xl font-medium text-slate-700"
                >
                  I’m a <span className="font-bold text-slate-900">{useTypewriter(PROFILE.titleWords)}</span>
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="mt-4 max-w-3xl text-slate-600"
                >
                  {PROFILE.tagline}
                </motion.p>
              </div>
            </section>

            <Section id="about" title="About">
              <div className="grid md:grid-cols-[220px_minmax(0,1fr)] gap-6 items-start">
                <img src={PROFILE.avatar} alt="About avatar" className="rounded-2xl w-full h-56 object-cover border" />
                <Card>
                  <div className="grid sm:grid-cols-2 gap-6 text-sm">
                    <div>
                      <p className="mb-2"><span className="font-semibold">Degree:</span> Master</p>
                      <p className="mb-2"><span className="font-semibold">City:</span> {PROFILE.location}</p>
                      <p className="mb-2"><span className="font-semibold">Email:</span> {PROFILE.email}</p>
                    </div>
                    <div>
                      <p className="mb-2"><span className="font-semibold">Open to:</span> Data/Analytics/DE roles</p>
                      <p className="mb-2"><span className="font-semibold">Availability:</span> Immediate</p>
                    </div>
                  </div>
                  <p className="mt-4 text-slate-700">
                    {PROFILE.tagline} Committed to continuous learning in modern data technologies and product thinking.
                  </p>
                </Card>
              </div>
            </Section>

            <Section id="skills" title="Skills & Certifications">
              <Card>
                <p className="text-slate-700 mb-4 text-sm">My tech stack includes:</p>
                <div className="flex flex-wrap gap-3">
                  {SKILLS.map((s) => (
                    <span key={s.name} className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm bg-white">
                      {React.createElement(s.icon, { className: "w-5 h-5" })}
                      {s.name}
                    </span>
                  ))}
                </div>
                <h3 className="mt-6 mb-3 text-lg font-semibold">Certifications</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {CERTS.map((c) => (
                    <div key={c.name} className="flex items-center gap-3 rounded-xl border bg-white p-4">
                      <Award className="w-5 h-5 text-sky-600" />
                      <span className="text-sm font-medium">{c.name}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </Section>

            <Section id="services" title="What I do?">
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {SERVICES.map((srv) => (
                  <Card key={srv.title}>
                    <h4 className="text-lg font-semibold">{srv.title}</h4>
                    <p className="mt-2 text-sm text-slate-700">{srv.desc}</p>
                  </Card>
                ))}
              </div>
            </Section>

            <Section id="projects" title="Projects">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">1. Analytics</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {PROJECTS.analytics.map((p) => (
                      <Card key={p.title}>
                        <h4 className="font-semibold">{p.title}</h4>
                        <p className="mt-2 text-sm text-slate-700">{p.blurb}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {p.tech.map((t) => (
                            <span key={t} className="text-xs border rounded-full px-2 py-1 bg-slate-50">{t}</span>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">2. Dashboards</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {PROJECTS.dashboards.map((p) => (
                      <Card key={p.title}>
                        <h4 className="font-semibold">{p.title}</h4>
                        <p className="mt-2 text-sm text-slate-700">{p.blurb}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {p.tech.map((t) => (
                            <span key={t} className="text-xs border rounded-full px-2 py-1 bg-slate-50">{t}</span>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            <Section id="resume" title="Resume (excerpted)">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <h3 className="text-xl font-semibold mb-4">Education</h3>
                  <div className="space-y-6">
                    {TIMELINE.education.map((e) => (
                      <div key={e.degree} className="relative pl-6">
                        <Calendar className="w-4 h-4 absolute left-0 top-1 text-slate-500" />
                        <p className="font-semibold">{e.degree}</p>
                        <p className="text-sm text-slate-600">{e.org}</p>
                        <p className="text-xs text-slate-500 mt-1">{e.time}</p>
                        <ul className="list-disc pl-5 mt-2 text-sm text-slate-700">
                          {e.details.map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h3 className="text-xl font-semibold mb-4">Professional Experience</h3>
                  <div className="space-y-6">
                    {TIMELINE.work.map((w) => (
                      <div key={w.role} className="relative pl-6">
                        <Briefcase className="w-4 h-4 absolute left-0 top-1 text-slate-500" />
                        <p className="font-semibold">{w.role}</p>
                        <p className="text-sm text-slate-600">{w.org}</p>
                        <p className="text-xs text-slate-500 mt-1">{w.time}</p>
                        <ul className="list-disc pl-5 mt-2 text-sm text-slate-700">
                          {w.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </Section>

            <Section id="research" title={PUBLICATION.title}>
              <Card>
                <div className="space-y-4">
                  {PUBLICATION.papers.map((p) => (
                    <div key={p.doi} className="flex gap-3 items-start">
                      <BookOpen className="w-5 h-5 mt-1 text-sky-600" />
                      <div>
                        <p className="text-sm text-slate-700">
                          <span className="font-semibold">{p.authors}.</span> {p.text}. <em>{p.conf}</em>. DOI:{" "}
                          <a className="underline" href={p.doiUrl} target="_blank" rel="noreferrer">
                            {p.doi}
                          </a>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Section>

            <Section id="contact" title="Contact">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 border">
                        <MapPin className="w-6 h-6 text-sky-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Address</h3>
                        <p className="text-sm text-slate-700">{CONTACT.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 border">
                        <Mail className="w-6 h-6 text-sky-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Email Me</h3>
                        <p className="text-sm text-slate-700">{PROFILE.email}</p>
                      </div>
                    </div>

                    <div className="rounded-xl overflow-hidden border">
                      <iframe
                        title="Beacon St Map"
                        className="w-full h-64"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.address)}&output=embed`}
                      />
                    </div>
                    <p className="text-xs text-slate-500">
                      If the embedded map doesn’t load,{" "}
                      <a
                        className="underline"
                        target="_blank"
                        rel="noreferrer"
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`}
                      >
                        open in Google Maps
                      </a>.
                    </p>
                  </div>
                </Card>

                <Card>
                  <h3 className="font-semibold mb-3">Your Name</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const data = new FormData(e.currentTarget);
                      const name = data.get("name");
                      const email = data.get("email");
                      const msg = data.get("message");
                      const mailto = `mailto:${PROFILE.email}?subject=Portfolio%20contact%20from%20${encodeURIComponent(
                        String(name || "")
                      )}&body=${encodeURIComponent(String(msg || ""))}%0D%0A%0D%0AContact:%20${encodeURIComponent(
                        String(email || "")
                      )}`;
                      window.location.href = mailto;
                    }}
                    className="space-y-3"
                  >
                    <input name="name" required placeholder="Your Name" className="w-full rounded-xl border px-3 py-2" />
                    <input name="email" required type="email" placeholder="Email" className="w-full rounded-xl border px-3 py-2" />
                    <p className="text-xs text-slate-500">This will help me respond to your query via an email.</p>
                    <textarea name="message" required rows={5} placeholder="Message" className="w-full rounded-xl border px-3 py-2" />
                    <button type="submit" className="rounded-2xl bg-sky-500 text-white px-4 py-2 font-medium hover:bg-sky-600">Submit</button>
                  </form>
                  <DevTests />
                </Card>
              </div>
            </Section>

            <footer className="pb-10 text-center text-xs text-slate-500">
              © {new Date().getFullYear()} {PROFILE.name}. Built with React + Vite + Tailwind.
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

