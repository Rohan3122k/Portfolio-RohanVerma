import React, { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";

/**
 * Rohan Verma – Stanley-style Interactive Portfolio (Full Bleed)
 * - Full-width layout like the reference
 * - Left fixed/sticky sidebar
 * - Edge-to-edge hero (no rounded box)
 * - Single window scrollbar + fullpage snap
 */

const DatabaseIcon =
  typeof Icons.Database === "function" ? Icons.Database : Icons.Code2;

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
  Sun, Moon, Menu, X, ExternalLink, ChevronDown,
} = Icons;

// ---- Profile & content ----
const PROFILE = {
  name: "Rohan Verma",
  titleWords: ["Data Analyst", "Data Engineer", "Data Scientist", "Automation Engineer"],
  avatar: "/profile.jpg",
  tagline:
    "Translating messy datasets into clean insights bosses can nod at.",
  location: "Greater Boston, MA",
  email: "verma.rohan@northeastern.edu",
  socials: {
    github: "https://github.com/Rohan3122k",
    linkedin: "https://www.linkedin.com/in/r3122k",
  },
};

// Brand colors + logos
const BRAND = {
  SQL: { color: "#336791", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  Python: { color: "#3776AB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  dbt: { color: "#FF694B" },
  Tableau: { color: "#E97627" },
  "Power BI": { color: "#F2C811" },
  Airflow: { color: "#017CEE" },
  Spark: { color: "#E25A1C" },
  AWS: { color: "#FF9900" },
  Git: { color: "#F05032", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  GraphQL: { color: "#E10098", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
  Grafana: { color: "#F46800", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg" },
  PostgreSQL: { color: "#4169E1", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  "Node-RED": { color: "#8F0000", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodered/nodered-original.svg" },
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
  { name: "GraphQL", icon: DatabaseIcon },
  { name: "Grafana", icon: PieChart },
  { name: "PostgreSQL", icon: DatabaseIcon },
  { name: "Node-RED", icon: Server },
];

const CERTS = [
  { name: "Google Data Analytics Certificate" },
  { name: "Harvard Online – Data Science and AI Principles" },
  { name: "AWS Certified Data Engineer – Associate (In Progress)" },
  { name: "IBM Data Science Certificate" },
];

const SERVICES = [
  {
    title: "Project Scoping & Data Discovery",
    desc: "Translate business requirements into technical solutions with clear scope and success criteria.",
  },
  {
    title: "Data Analysis & Reporting",
    desc: "Advanced analytics with SQL + Python. Build reports and dashboards to drive decisions.",
  },
  {
    title: "Data Visualization",
    desc: "Interactive dashboards in Tableau/Power BI. Convert complex data into clear insights.",
  },
  {
    title: "ELT & ETL Pipelines",
    desc: "Design robust pipelines with dbt, Airflow, and cloud warehouses with observability in mind.",
  },
  { title: "Automation", desc: "Automate workflows to save time and reduce errors." },
  { title: "Cloud Deployment", desc: "Deploy and operate data solutions on AWS." },
];

// Logos load from the institution/company website favicon. If unavailable, initials display instead.
const ORGANIZATION_LOGOS = {
  moderna: "https://www.google.com/s2/favicons?domain=modernatx.com&sz=128",
  northeastern: "https://www.google.com/s2/favicons?domain=northeastern.edu&sz=128",
  bitmesra: "https://www.google.com/s2/favicons?domain=bitmesra.ac.in&sz=128",
};

function OrganizationLogo({ src, initials, name }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-white text-xs font-bold text-slate-700">
      {src && !failed ? (
        <img src={src} alt={`${name} logo`} className="h-8 w-8 object-contain" loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <span aria-label={name}>{initials}</span>
      )}
    </span>
  );
}

const TIMELINE = {
  education: [
    {
      degree: "M.S. in Data Analytics Engineering",
      org: "Northeastern University",
      logo: ORGANIZATION_LOGOS.northeastern,
      initials: "NEU",
      time: "2024 – 2026",
      details: [
        "Relevant courses: DB Management, Data Mining & Visualization, Machine Learning, Economic Decision Making, Integrated Automation",
      ],
    },
    {
      degree: "B.Tech in Electrical & Electronics Engineering",
      org: "BIT Mesra",
      logo: ORGANIZATION_LOGOS.bitmesra,
      initials: "BIT",
      time: "2019 – 2023",
      details: [
        "Coursework: C/Python, DSA, IoT, OOP, Software Engineering, Power Systems, Control Systems, Probability & Statistics",
      ],
    },
  ],
  work: [
    {
  role: "Industrial Data Operations Co-Op",
  org: "Moderna, Norwood, MA, USA",
  logo: ORGANIZATION_LOGOS.moderna,
  initials: "M",
  time: "Jan 2026 – Jul 2026",
  bullets: [
    "Designed and deployed scalable ETL/data pipelines and real-time Grafana dashboards for an enterprise alarm monitoring platform supporting five global sites, reducing alarm investigation time by 20%.",
    "Built ETL pipelines using SQL, GraphQL, REST APIs, JSON, and FlowFuse Node-RED to integrate enterprise data from the ODH (Rhize) warehouse, processing data across 5 global sites and 3-4 upstream systems daily.",
    "Developed end-to-end data pipelines for alarm lifecycle analytics, improving data validation accuracy by 15% and reducing manual reporting turnaround from hours to minutes.",
    "Collaborated across engineering teams to troubleshoot PostgreSQL, PCS, MES, DeltaV, and AVEVA PI data issues, reducing recurring data discrepancies by 13%.",
    "Developed an XGBoost model using AVEVA PI Historian and Emerson DeltaV data to predict potential equipment alarm conditions.",
  ],
},
    {
      role: "Research Assistant",
      org: "Department of EEE, BIT Mesra, India",
      logo: ORGANIZATION_LOGOS.bitmesra,
      initials: "BIT",
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
      initials: "RSEB",
      time: "May 2022 – Dec 2022",
      bullets: [
        "Collected, cleaned, and structured ERP/SCADA datasets improving data quality and governance.",
        "Wrote SQL and built Excel/Tableau dashboards to track outages and utilization.",
      ],
    },
    {
      role: "Data Science Intern",
      org: "Independent Media, Jaipur, India",
      initials: "IM",
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
      blurb: "Modeled engagement and player behavior on 40k+ game records using machine learning baselines.",
    },
    {
      title: "Superconductor Critical Temperature Prediction",
      tech: ["RandomForest", "LinearReg", "PCA", "Python"],
      blurb:
        "Predicted critical temperatures for superconductors; Random Forest achieved R² ≈ 0.92.",
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
  title: "Superstore Profit & Discount Optimization Dashboard",
  tech: ["Tableau", "ETL", "Data Visualization"],
  blurb:
    "Analyzed sales and profitability patterns across discount tiers; includes KPIs, scatter plots, and loss-making product insights.",
  link: "https://public.tableau.com/views/SuperstoreETLProfitDiscountOptimizationDashboard/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
},

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
      text: "Building a Stronger Grid: How Blockchain Can Improve Smart Grid Resilience",
      conf:
        "2023 IEEE Renewable Energy and Sustainable E-Mobility Conference (RESEM), Bhopal, India, 2023, pp. 1-7",
      doi: "10.1109/RESEM57584.2023.10236304",
      doiUrl: "https://doi.org/10.1109/RESEM57584.2023.10236304",
    },
  ],
};

const CONTACT = { address: "Greater Boston, MA" };

// ---- Helpers ----
const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "highlights", label: "Highlights" },
  { id: "skills", label: "Skills & Certifications" },
  { id: "services", label: "Expertise" },
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

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { root: null, rootMargin: "0px 0px -40% 0px", threshold: 0.1 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium shadow-sm">
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border bg-white p-5 shadow-sm ${className}`}>
    {children}
  </div>
);

// Click-to-expand project cards. Existing titles, descriptions and URLs are preserved.
function ProjectCard({ project: p }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.article layout whileHover={{ y: -4 }} transition={{ duration: 0.2 }}
      className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-lg transition-shadow">
      <h4 className="font-semibold">{p.title}</h4>
      <p className="mt-2 text-sm text-slate-700">{p.blurb}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {p.tech.map(t => <span key={t} className="text-xs border rounded-full px-2 py-1 bg-slate-50">{t}</span>)}
      </div>
      <button type="button" aria-expanded={expanded} onClick={() => setExpanded(v => !v)}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-600 hover:underline">
        {expanded ? "Hide details" : "Explore project"}<ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
        className="mt-3 border-t pt-3 text-sm text-slate-600">
        <p><strong>Technology:</strong> {p.tech.join(" · ")}</p>
        <p className="mt-2">{p.blurb}</p>
        {p.link && <a className="mt-3 inline-flex items-center gap-1 font-semibold text-sky-600 hover:underline"
          href={p.link} target="_blank" rel="noopener noreferrer">View live dashboard <ExternalLink className="w-4 h-4" /></a>}
      </motion.div>}
    </motion.article>
  );
}

// ⭐️ Small helper to render a centered, responsive GIF block
const GifBox = ({ src, alt, className = "" }) => (
  <div className="mt-10 flex justify-center">
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`rounded-2xl border shadow-sm max-h-[340px] w-auto ${className}`}
    />
  </div>
);

// Full-bleed section wrapper with consistent inner padding
const Shell = ({ id, title, children }) => (
  <section id={id} className="min-h-screen snap-start flex flex-col justify-start">
    <div className="px-5 sm:px-8 md:px-12 lg:px-16 py-12 md:py-16 w-full">
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
    </div>
  </section>
);

// ---- App ----
export default function App() {
  const typed = useTypewriter(PROFILE.titleWords);
  const [activeTab, setActiveTab] = useState("analytics");
  const [darkMode, setDarkMode] = useState(() => typeof window !== "undefined" && window.localStorage.getItem("portfolioTheme") === "dark");
  const [mobileMenu, setMobileMenu] = useState(false);
  useEffect(() => { window.localStorage.setItem("portfolioTheme", darkMode ? "dark" : "light"); }, [darkMode]);
  const active = useScrollSpy(sections.map((s) => s.id));

  // Smooth page scroll + fullpage snap
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollBehavior = "smooth";
    html.classList.add("scroll-smooth");
    if (window.innerWidth >= 768) document.body.classList.add("snap-y", "snap-proximity");
    return () => {
      html.style.scrollBehavior = "auto";
      document.body.classList.remove("snap-y", "snap-proximity");
    };
  }, []);

  const handleNav = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={`portfolio-root min-h-screen bg-slate-50 text-slate-800 ${darkMode ? "portfolio-dark" : ""}`}>
      <style>{`
        .portfolio-dark { background:#0b1220; color:#e2e8f0; }
        .portfolio-dark .bg-white { background-color:#172338!important; }
        .portfolio-dark .bg-slate-50 { background-color:#0b1220!important; }
        .portfolio-dark .text-slate-900, .portfolio-dark .text-slate-800, .portfolio-dark .text-slate-700 { color:#e2e8f0!important; }
        .portfolio-dark .text-slate-600, .portfolio-dark .text-slate-500 { color:#a9b8ce!important; }
        .portfolio-dark .border, .portfolio-dark .border-b, .portfolio-dark .border-t { border-color:#334155!important; }
        .portfolio-dark input, .portfolio-dark textarea { background-color:#172338; color:#e2e8f0; }
        .portfolio-root section { scroll-margin-top: 3.5rem; }
        @media (max-width: 767px) { .portfolio-root .snap-start { scroll-snap-align: none; } }
        @media (prefers-reduced-motion: reduce) { .portfolio-root *, .portfolio-root *::before, .portfolio-root *::after { animation-duration:0.01ms!important; transition-duration:0.01ms!important; scroll-behavior:auto!important; } }
      `}</style>
      <div className="md:hidden sticky top-0 z-50 flex justify-between items-center bg-slate-900 text-white px-4 py-3 shadow-lg">
        <strong>{PROFILE.name}</strong>
        <div className="flex items-center gap-3">
          <button aria-label="Toggle dark mode" onClick={() => setDarkMode(v => !v)}>{darkMode ? <Sun size={20}/> : <Moon size={20}/>}</button>
          <button aria-label="Toggle menu" aria-expanded={mobileMenu} onClick={() => setMobileMenu(v => !v)}>{mobileMenu ? <X size={22}/> : <Menu size={22}/>}</button>
        </div>
      </div>
      {/* FULL-BLEED GRID: sidebar + content (no max-width wrapper) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)] gap-0">
        {/* Sidebar */}
        <aside className={`${mobileMenu ? "block" : "hidden"} md:block md:h-screen md:sticky md:top-0 md:self-start`}>
          <div className="h-full rounded-none bg-slate-900 text-white px-6 py-6 overflow-auto">
            <div className="flex flex-col items-center text-center">
              <img
                src={PROFILE.avatar}
                alt="Avatar"
                className="w-28 h-28 rounded-full object-cover shadow-md"
              />
              <h1 className="mt-4 text-2xl font-bold">{PROFILE.name}</h1>
              

              <div className="mt-4 flex items-center gap-3">
                <a
                  href={PROFILE.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={PROFILE.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
  href="https://public.tableau.com/app/profile/rohan.verma7748/vizzes"
  target="_blank"
  rel="noreferrer"
  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700"
>
  <PieChart className="w-5 h-5" />
</a>

              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Badge>
                  <MapPin className="w-4 h-4" /> {PROFILE.location}
                </Badge>
                
              </div>

              <nav className="mt-6 w-full">
                <ul className="space-y-1">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        onClick={(e) => { handleNav(e, s.id); setMobileMenu(false); }}
                        className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
                          active === s.id
                            ? "bg-sky-500 text-white"
                            : "hover:bg-slate-800"
                        }`}
                      >
                        {s.label}
                        <ChevronRight className="w-4 h-4 opacity-80" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <button type="button" onClick={() => setDarkMode(v => !v)}
                className="hidden md:inline-flex mt-5 items-center gap-2 rounded-xl border border-slate-600 px-4 py-2 text-sm hover:bg-slate-800">
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {darkMode ? "Light mode" : "Dark mode"}
              </button>
              <a
                href="#resume"
                onClick={(e) => handleNav(e, "resume")}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-white hover:bg-sky-600"
              >
                <FileText className="w-4 h-4" /> View Resume
              </a>
            </div>
          </div>
        </aside>

        {/* Main: full-bleed sections */}
        <main className="min-h-screen">
          {/* HERO — edge to edge */}
          <section
            id="home"
            className="relative min-h-screen snap-start flex items-center"
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
            <div className="px-5 sm:px-8 md:px-12 lg:px-16 w-full">
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900"
              >
                {PROFILE.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="mt-3 text-xl font-medium text-slate-700"
              >
                I’m a <span className="font-bold text-slate-900">{typed}</span>
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

       {/* Highlights: research, experience, and engineering work */}
       <section id="highlights" aria-label="Highlights" className="px-8 md:px-12 lg:px-16 py-12 snap-start">
         <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-bold mb-6">Highlights</motion.h2>
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
           {[
             { value: "IEEE", label: "Published research on smart grid resilience" },
             { value: "3", label: "Industry data roles across pharma, energy, and media" },
             { value: "ETL → Cloud", label: "Pipelines built for global manufacturing data" },
           ].map((item, index) => (
             <motion.div
               key={item.value}
               initial={{ opacity: 0, y: 18 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, amount: 0.25 }}
               transition={{ duration: 0.45, delay: index * 0.1 }}
               className="rounded-2xl border bg-white p-5 text-center shadow-sm"
             >
               <div className="text-2xl sm:text-3xl font-extrabold text-sky-600">{item.value}</div>
               <p className="mt-2 text-sm text-slate-600">{item.label}</p>
             </motion.div>
           ))}
         </div>
       </section>
       {/* ABOUT */}
<Shell id="about" title="About">
  <div className="grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)] gap-8 items-start">
    {/* Profile Image */}
    <img
      src={PROFILE.avatar}
      alt="About avatar"
      className="rounded-full w-64 h-64 object-cover border shadow-md mx-auto md:mx-0"
    />

    {/* Details */}
    <div>
      <h3 className="text-xl font-bold mb-4">Data Analyst / Engineer / Scientist</h3>
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
        <p>
          <span className="font-semibold">Degree:</span> M.S. Data Analytics Engineering (Expected Dec 2026)
        </p>
        <p>
          <span className="font-semibold">City:</span> {PROFILE.location}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {PROFILE.email}
        </p>
        <p>
          <span className="font-semibold">Open to:</span> Data Engineering, Analytics, ML & Automation roles
        </p>
        <p>
          <span className="font-semibold">Availability:</span> January 2027 (subject to EAD start date)
        </p>
        <p>
          <span className="font-semibold">Right-to-work:</span> F-1 OPT | STEM OPT Eligible | Future Sponsorship Required
        </p>
      </div>

      {/* Summary */}
      <div className="mt-6 space-y-4 text-slate-700 text-sm leading-relaxed">
        <p>I grew up in Jaipur, India, and chose science early on, which led me to study Electrical Engineering at BIT Mesra. Working with power systems got me curious about the data behind them, and that curiosity turned into a research paper on blockchain and smart grid resilience, published by IEEE. That paper was my pivot from circuits to data.</p>
        <p>I’m now finishing my MS in Data Analytics Engineering at Northeastern University in Boston. During my co-op at Moderna, I built data pipelines across global manufacturing sites, automated their scheduling, and deployed monitoring dashboards. Alongside Python, SQL, GraphQL, and REST APIs, I’ve learned that reliable data comes from understanding the systems that produce it. I’m looking for data engineering, analytics, and ML roles starting January 2027.</p>
      </div>
    </div>
  </div>
</Shell>



        {/* SKILLS (original look, larger size) */}
<Shell id="skills" title="Skills & Certifications">
  <Card>
    <p className="text-slate-700 mb-4 text-sm">My tech stack includes:</p>

    {/* Same brand-colored pills with reliable inline SVG icons */}
    <div className="flex flex-wrap gap-4">
      {SKILLS.map((s) => {
        const b = BRAND[s.name];
        return (
          <button
            key={s.name}
            type="button"
            className="group inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-base text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500" title={`${s.name} — part of my technology stack`}
            style={{ backgroundColor: b?.color || "#0ea5e9" }}
          >
            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-125" aria-hidden="true">
              {React.createElement(s.icon, { className: "w-5 h-5" })}
            </span>
            {s.name}
          </button>
        );
      })}
    </div>

    {/* Same simple white cards, just bigger */}
    <h3 className="mt-8 mb-4 text-lg font-semibold">Certifications</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {CERTS.map((c) => (
        <div
          key={c.name}
          className="flex items-center gap-4 rounded-2xl border bg-white p-6 min-h-[88px] shadow-sm"
        >
          <Award className="w-6 h-6 text-sky-600" />
          <span className="text-base font-medium leading-snug text-slate-800">
            {c.name}
          </span>
        </div>
      ))}
    </div>
  </Card>
</Shell>



          {/* WHAT I DO + GIF  */}
          <Shell id="services" title="Areas of Expertise">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {SERVICES.map((srv) => (
                <Card key={srv.title}>
                  <h4 className="text-lg font-semibold">{srv.title}</h4>
                  <p className="mt-2 text-sm text-slate-700">{srv.desc}</p>
                </Card>
              ))}
            </div>

            {/* Projects GIF (centered, responsive) */}
            <GifBox src="/gif-projects.gif" alt="Projects animation" />
          </Shell>

        {/* PROJECTS */}
<Shell id="projects" title="Projects">
  {/* Tabs */}
  <div className="mb-8 border-b border-slate-200 flex gap-6">
    <button
      onClick={() => setActiveTab("analytics")}
      className={`pb-2 text-lg font-semibold transition-colors ${
        activeTab === "analytics"
          ? "text-sky-600 border-b-2 border-sky-600"
          : "text-slate-600 hover:text-sky-600"
      }`}
    >
      Analytics
    </button>
    <button
      onClick={() => setActiveTab("dashboards")}
      className={`pb-2 text-lg font-semibold transition-colors ${
        activeTab === "dashboards"
          ? "text-sky-600 border-b-2 border-sky-600"
          : "text-slate-600 hover:text-sky-600"
      }`}
    >
      Dashboards
    </button>
  </div>

  {/* Interactive project cards — no fabricated links */}
  <div className="grid md:grid-cols-2 gap-4">
    {PROJECTS[activeTab].map(p => <ProjectCard key={p.title} project={p} />)}
  </div>
</Shell>



          {/* RESUME */}
          <Shell id="resume" title="Resume (excerpted)">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-xl font-semibold mb-4">Education</h3>
                <div className="space-y-6">
                  {TIMELINE.education.map((e) => (
                    <motion.div key={e.degree} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="relative pl-6 border-l-2 border-sky-200">
                      <div className="flex items-start gap-3">
                        <OrganizationLogo src={e.logo} initials={e.initials} name={e.org} />
                        <div>
                          <p className="font-semibold">{e.degree}</p>
                          <p className="text-sm text-slate-600">{e.org}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{e.time}</p>
                      <ul className="list-disc pl-5 mt-2 text-sm text-slate-700">
                        {e.details.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-xl font-semibold mb-4">Professional Experience</h3>
                <div className="space-y-6">
                  {TIMELINE.work.map((w) => (
                    <motion.div key={w.role} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="relative pl-6 border-l-2 border-sky-200">
                      <div className="flex items-start gap-3">
                        <OrganizationLogo src={w.logo} initials={w.initials} name={w.org} />
                        <div>
                          <p className="font-semibold">{w.role}</p>
                          <p className="text-sm text-slate-600">{w.org}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{w.time}</p>
                      <ul className="list-disc pl-5 mt-2 text-sm text-slate-700">
                        {w.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>
          </Shell>

          {/* RESEARCH + GIF */}
          <Shell id="research" title={PUBLICATION.title}>
            <Card>
              <div className="space-y-4">
                {PUBLICATION.papers.map((p) => (
                  <div key={p.doi} className="flex gap-3 items-start">
                    <BookOpen className="w-5 h-5 mt-1 text-sky-600" />
                    <div>
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold">{p.authors}.</span>{" "}
                        {p.text}. <em>{p.conf}</em>. DOI:{" "}
                        <a
                          className="underline"
                          href={p.doiUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {p.doi}
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Research GIF (centered, responsive) */}
            <GifBox src="/gif-data.jpg" alt="Research and data visualization illustration" />
          </Shell>

          {/* CONTACT */}
<Shell id="contact" title="Contact">
  <div className="max-w-3xl">
    {/* Contact Info */}
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
        <div className="flex items-start gap-4">
  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 border">
    <PieChart className="w-6 h-6 text-sky-600" />
  </div>
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
