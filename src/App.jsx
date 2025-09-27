import React, { useState, useEffect } from "react";
import {
  Home,
  User,
  Award,
  Briefcase,
  BookOpen,
  FileText,
  Mail,
  Database,
} from "lucide-react";

// Sidebar items
const MENU_ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills & Certifications", icon: Award },
  { id: "services", label: "What I do?", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FileText },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "research", label: "Research Publication", icon: BookOpen },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function App() {
  const [active, setActive] = useState("home");

  // Scroll spy logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    MENU_ITEMS.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll to section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white flex flex-col items-center py-8 space-y-6 fixed left-0 top-0 bottom-0">
        <img
          src="/profile.jpg"
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover"
        />
        <h1 className="text-2xl font-bold">Rohan Verma</h1>
        <p className="text-center text-sm text-gray-300 px-4">
          Professional and enthusiastic master's student with a strong blend of
          analytics and engineering.
        </p>

        <div className="space-y-2 w-full px-6">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
                active === item.id
                  ? "bg-blue-500 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        {/* Home */}
        <section
          id="home"
          className="min-h-screen snap-start flex flex-col justify-center items-center text-center relative"
        >
          <div className="absolute inset-0">
            <img
              src="/bg-home.gif"
              alt="Background Animation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          </div>
          <div className="relative z-10">
            <h1 className="text-6xl font-bold text-white mb-4">Rohan Verma</h1>
            <p className="text-2xl text-blue-300 mb-6">
              I’m a Data/Analytics Engineer
            </p>
            <p className="max-w-xl mx-auto text-gray-200">
              Professional and enthusiastic master's student with a strong blend
              of analytics and engineering.
            </p>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="min-h-screen snap-start flex flex-col justify-center items-center px-8 py-16"
        >
          <h2 className="text-3xl font-bold mb-6">About</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
              src="/gif1.gif"
              alt="About GIF"
              className="w-64 h-64 object-cover rounded-xl shadow-lg"
            />
            <div className="max-w-xl text-left">
              <p className="text-lg mb-4">
                <strong>Degree:</strong> Master
              </p>
              <p className="text-lg mb-4">
                <strong>City:</strong> Beacon St, Boston, MA, USA
              </p>
              <p className="text-lg mb-4">
                <strong>Email:</strong> verma.rohan@northeastern.edu
              </p>
              <p className="text-lg">
                Professional and enthusiastic master's student with a strong
                blend of analytics and engineering. Committed to continuous
                learning in modern data technologies and product thinking.
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section
          id="skills"
          className="min-h-screen snap-start flex flex-col justify-center items-center px-8 py-16"
        >
          <h2 className="text-3xl font-bold mb-6">Skills & Certifications</h2>
          {/* Skills as colorful pills */}
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
            {[
              { name: "Python", color: "bg-yellow-500", logo: "python" },
              { name: "SQL", color: "bg-blue-600", logo: "mysql" },
              { name: "Power BI", color: "bg-yellow-400", logo: "powerbi" },
              { name: "Tableau", color: "bg-indigo-600", logo: "tableau" },
              { name: "AWS", color: "bg-orange-500", logo: "amazonaws" },
              { name: "Snowflake", color: "bg-blue-400", logo: "snowflake" },
            ].map((skill) => (
              <span
                key={skill.name}
                className={`${skill.color} text-white px-4 py-2 rounded-full flex items-center gap-2`}
              >
                <img
                  src={`https://cdn.simpleicons.org/${skill.logo}/ffffff`}
                  alt={skill.name}
                  className="w-5 h-5"
                />
                {skill.name}
              </span>
            ))}
          </div>
        </section>

        {/* Services */}
        <section
          id="services"
          className="min-h-screen snap-start flex flex-col justify-center items-center px-8 py-16"
        >
          <h2 className="text-3xl font-bold mb-6">What I Do?</h2>
          <p className="max-w-2xl text-center text-lg">
            Services include project scoping, data visualization, ETL pipelines,
            automation, and cloud deployment.
          </p>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="min-h-screen snap-start flex flex-col justify-center items-center px-8 py-16"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-4">
            Projects
            <img
              src="/gif-projects.gif"
              alt="Projects GIF"
              className="w-16 h-16 rounded-lg"
            />
          </h2>
          <p className="max-w-2xl text-center text-lg">
            Showcase of analytics and dashboarding projects.
          </p>
        </section>

        {/* Resume */}
        <section
          id="resume"
          className="min-h-screen snap-start flex flex-col justify-center items-center px-8 py-16"
        >
          <h2 className="text-3xl font-bold mb-6">Resume</h2>
          <p className="text-lg">Professional experience details here.</p>
        </section>

        {/* Research Publication */}
        <section
          id="research"
          className="min-h-screen snap-start flex flex-col justify-center items-center px-8 py-16"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-4">
            Research Publication
            <img
              src="/gif-research.gif"
              alt="Research GIF"
              className="w-16 h-16 rounded-lg"
            />
          </h2>
          <p className="max-w-2xl text-center text-lg">
            P. Gupta, R. Verma, D. Verma and P. S. Rathore, "Building a Stronger
            Grid: How Blockchain Can Improve Smart Grid Resilience," 2023 IEEE
            Renewable Energy and Sustainable E-Mobility Conference (RESEM),
            Bhopal, India, 2023, pp. 1-7, doi:
            10.1109/RESEM57584.2023.10236304.
          </p>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="min-h-screen snap-start flex flex-col justify-center items-center px-8 py-16"
        >
          <h2 className="text-3xl font-bold mb-6">Contact</h2>
          <p>Email me at: verma.rohan@northeastern.edu</p>
          <p>Location: Beacon St, Boston, MA, USA</p>
        </section>
      </main>
    </div>
  );
}

