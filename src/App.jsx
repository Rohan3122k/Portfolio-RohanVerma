import React from "react";
import "./App.css";

// Helper hook for reduced motion preference
function usePrefersReducedMotion() {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduce(m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);
  return reduce;
}

// Gif component
const Gif = ({ src, alt, className = "" }) => {
  const reduce = usePrefersReducedMotion();
  if (reduce) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`rounded-2xl border shadow-sm ${className}`}
    />
  );
};

export default function App() {
  return (
    <div className="app">
      {/* Home Section with background gif */}
      <section
        id="home"
        className="h-screen flex flex-col justify-center items-center text-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/gif-home.gif')",
        }}
      >
        <h1 className="text-5xl font-bold">Rohan Verma</h1>
        <p className="mt-4 text-xl">
          Professional and enthusiastic master's student with a strong blend of
          analytics and engineering.
        </p>
      </section>

      {/* About Section with gif instead of photo */}
      <section id="about" className="h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-6">About</h2>
        <Gif src="/gif1.gif" alt="About Gif" className="w-80 h-auto" />
        <p className="mt-6 max-w-2xl text-center">
          Degree: Master <br />
          City: Beacon St, Boston, MA, USA <br />
          Email: verma.rohan@northeastern.edu <br />
          Open to: Data/Analytics/DE roles <br />
          Availability: Immediate <br />
          <br />
          Professional and enthusiastic master's student with a strong blend of
          analytics and engineering. Committed to continuous learning in modern
          data technologies and product thinking.
        </p>
      </section>

      {/* What I do Section with gif */}
      <section id="what-i-do" className="h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-6">What I do?</h2>
        <div className="grid grid-cols-2 gap-6 max-w-4xl">
          <div className="p-4 border rounded-lg shadow">
            <h3 className="font-semibold">Project Scoping & Data Discovery</h3>
            <p>Translate business requirements into technical solutions with clear scope and success criteria.</p>
          </div>
          <div className="p-4 border rounded-lg shadow">
            <h3 className="font-semibold">Data Analysis & Reporting</h3>
            <p>Advanced analytics with SQL + Python. Build reports and dashboards to drive decisions.</p>
          </div>
          <div className="p-4 border rounded-lg shadow">
            <h3 className="font-semibold">Data Visualization</h3>
            <p>Interactive dashboards in Tableau/Power BI. Convert complex data into clear insights.</p>
          </div>
          <div className="p-4 border rounded-lg shadow">
            <h3 className="font-semibold">ELT & ETL Pipelines</h3>
            <p>Design robust pipelines with dbt, Airflow, and cloud warehouses with observability in mind.</p>
          </div>
          <div className="p-4 border rounded-lg shadow">
            <h3 className="font-semibold">Automation</h3>
            <p>Automate workflows to save time and reduce errors.</p>
          </div>
          <div className="p-4 border rounded-lg shadow">
            <h3 className="font-semibold">Cloud Deployment</h3>
            <p>Deploy and operate data solutions on AWS.</p>
          </div>
        </div>
        {/* Gif at bottom of section */}
        <Gif src="/gif-projects.gif" alt="What I Do Gif" className="mt-6 w-80 h-auto" />
      </section>

      {/* Projects Section */}
      <section id="projects" className="h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        <p>Projects divided into Analytics & Dashboards.</p>
        <Gif src="/gif-research.gif" alt="Projects Gif" className="mt-6 w-80 h-auto" />
      </section>

      {/* Research Publication Section */}
      <section id="research" className="h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-6">Research Publication</h2>
        <p className="max-w-2xl text-center">
          P. Gupta, R. Verma, D. Verma and P. S. Rathore. Building a Stronger Grid: How Blockchain Can Improve Smart Grid Resilience.
          <br />
          <i>2023 IEEE Renewable Energy and Sustainable E-Mobility Conference (RESEM), Bhopal, India, 2023, pp. 1-7.</i>
        </p>
        <Gif src="/gif-research.gif" alt="Research Gif" className="mt-6 w-80 h-auto" />
      </section>

      {/* Contact Section */}
      <section id="contact" className="h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-6">Contact</h2>
        <p>Email: verma.rohan@northeastern.edu</p>
      </section>
    </div>
  );
}
