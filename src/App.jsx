import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

// --- Utility Components ---
const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24 py-16 md:py-24">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-12 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
        {title}
      </h2>
      {children}
    </div>
  </section>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300">
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div className={`group rounded-2xl bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-6 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const Pill = ({ children }) => (
  <span className="rounded-full bg-gray-700/50 border border-gray-600/50 px-3 py-1 text-xs font-medium text-gray-300 hover:bg-gray-600/50 hover:text-white transition-colors">
    {children}
  </span>
);

const NavLink = ({ href, children }) => (
  <a href={href} className="text-sm md:text-base text-gray-300 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-purple-400 after:to-blue-400 hover:after:w-full after:transition-all">
    {children}
  </a>
);

// --- Data (edit this to customize) ---
const profile = {
  name: "Bernard Wambua",
  role: "Backend & Python Developer",
  blurb:
    "Experienced Backend Developer with 7+ years designing scalable APIs, automating workflows, and building secure data pipelines. Strong with Python, Django, REST, SQL, and ETL.",
  location: "Nairobi, Kenya",
  email: "bernardmwambua12@gmail.com",
  phone: "+254 715 064 194",
  github: "https://github.com/BernardWambua",
  linkedin: "https://linkedin.com/in/bernard-wambua-261590103",
};

const skills = {
  Languages: ["Python", "SQL", "C#", "JavaScript", "KDB/Q"],
  Frameworks: ["Django", "DRF", "Channels", "Flask", "ASP.NET"],
  "Backend Dev": ["REST APIs", "Auth", "WebSockets", "Scheduling"],
  Data: ["ETL", "Pipelines", "Warehousing"],
  Tools: ["Git", "Bash", "Crontab", "Docker"],
  Platforms: ["Ubuntu", "Windows", "macOS"],
  Other: ["API Integrations", "Odoo", "SAP HCM"],
};

const projects = [
  {
    title: "Real-Time Question Management Platform",
    period: "2024",
    stack: ["Python", "Django", "PostgreSQL", "WebSocket", "React", "JavaScript"],
    impact:
      "Developed a full-stack, real-time question management system using Django REST Framework and React with WebSockets for live synchronization. Designed admin dashboard to manage question batches with configurable response/wait times. Built user-facing interface for timed participation, dynamic hint display, and secure wallet-based fee/reward functionality. Integrated secure authentication and role-based access control.",
    metrics: ["Real-time sync", "Wallet rewards", "High-concurrency"],
    links: { repo: "#", demo: "#" },
  },
  {
    title: "KenGen Tender Tracking System",
    period: "2025",
    stack: ["Python", "Django", "PostgreSQL", "Bootstrap 5", "Nginx", "Gunicorn"],
    impact:
      "Developed comprehensive web-based procurement management system with complete tender lifecycle management, role-based access, CSV/Excel bulk import, multi-level organizational structure, committee management, and analytics dashboard. Production deployment with systemd, Nginx reverse proxy, and Gunicorn.",
    metrics: ["-80% manual paperwork", "10+ departments", "Real-time metrics"],
    links: { repo: "https://github.com/BernardWambua/KenGen-Tender-Tracking-System" },
  },
  {
    title: "Learning and Skill Management System",
    period: "2025",
    stack: ["Python", "Django", "React", "JavaScript", "SQL"],
    impact:
      "Developed web-based platform for managing courses, skills, and learning progress. Implemented modules for course creation, skill tagging, progress tracking, and automated certificate generation. Built admin dashboard with role-based access and RESTful APIs for scalable data handling.",
    metrics: ["Certificate automation", "Role-based access", "Modular architecture"],
    links: { repo: "https://github.com/BernardWambua/TrainingGapSurveyAndAnalysis" },
  },
  {
    title: "Redesign of Variable Allowances Request System",
    period: "2024",
    stack: ["C#", "ASP.NET", "SAP/ABAP", "SOAP", "Workflows"],
    impact:
      "Led team of 4 developers to redesign company's variable allowances request process with full SAP ERP integration. Built ABAP-based logic and SOAP Web Services for real-time employee data validation. Integrated WorkflowGen for automated routing and approval.",
    metrics: ["Prevented policy violations", "Real-time SAP validation", "Team of 4"],
    links: { repo: "#" },
  },
  {
    title: "Trade Data Ingestion (RBC via Prospect 33)",
    period: "Mar 2022  Apr 2024",
    stack: ["Python", "KDB/Q", "Crontab", "SFTP"],
    impact:
      "Scheduled ingestion of XML/TXT/CSV to KDB, improving uptime and reliability with monitoring tools.",
    metrics: ["-70% manual ops", "Monitored APIs"],
    links: { repo: "#" },
  },
];

const experience = [
  {
    role: "Backend Developer / Systems Analyst",
    org: "KenGen Plc",
    location: "Nairobi, Kenya",
    period: "Oct 2017  Present",
    bullets: [
      "Designed and implemented RESTful services using Django for internal integrations.",
      "Automated vehicle insurance renewals via Python scripting (1+ week saved per cycle).",
      "Built backend for BI platform (ASP.NET) reducing data acquisition time by 95%.",
      "Automated P&L reporting and ETL workflows (300+ hours saved annually).",
      "Developed secure pipelines for data warehouses, improving report generation by 1+ hour daily.",
      "Created Odoo-based committee management and decision tracking solution.",
      "Collaborated on SAP HCM customizations for HR analytics.",
      "Built a learning management solution to track skills and training gaps.",
    ],
  },
  {
    role: "Python Developer / Data Science Contractor",
    org: "Prospect 33 / Royal Bank of Canada",
    location: "New York, USA (remote)",
    period: "Mar 2022  Apr 2024",
    bullets: [
      "Developed modules for trade data ingestion and transformation.",
      "Automated SFTP ingestion of XML, TXT, CSV to KDB via scheduled scripts.",
      "Reduced manual ops by 70% using Crontab-driven workflows.",
      "Built API monitoring tools improving service uptime.",
      "Supported Agile model development and preprocessing.",
    ],
  },
  {
    role: "Freelance Backend Projects",
    org: "Nairobi, Kenya",
    location: "",
    period: "Nov 2020  Present",
    bullets: [
      "Delivered Django/React applications with real-time features and secure auth.",
      "Designed wallet transaction logic and automated reward distribution.",
    ],
  },
];

const education = [
  {
    degree: "MSc Mathematical Sciences",
    school: "University of the Western Cape  South Africa",
    year: "Jun 2017",
    courses: ["Data Science", "Statistics", "Applied Mathematics"],
  },
  {
    degree: "BSc Mathematical Sciences with IT",
    school: "Maseno University  Kenya",
    year: "Dec 2015",
    courses: ["Programming", "Databases", "Information Systems"],
  },
];

// --- Main App ---
export default function PortfolioApp() {
  const [query, setQuery] = useState("");
  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.stack.join(" ").toLowerCase().includes(q) ||
        p.impact.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"></div>
        <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: "1s"}}></div>
      </div>

      {/* Header / Nav */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-gray-900/70 border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#home" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-blue-300 transition-all">
            {profile.name}
          </a>
          <nav className="hidden md:flex gap-8">
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#education">Education</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>
          <div className="flex items-center gap-4">
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
              GitHub 
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
              LinkedIn 
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <motion.section
        id="home"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-24 md:py-32"
      >
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20"
            >
              <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Available for hire
              </span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                {profile.role}
              </span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-gray-400 leading-relaxed">{profile.blurb}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Badge>Python</Badge>
              <Badge>Django REST</Badge>
              <Badge>ETL</Badge>
              <Badge>SQL</Badge>
              <Badge>WebSockets</Badge>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
              >
                View Projects
                <span className="ml-2 group-hover:translate-x-1 transition-transform"></span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-center rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur px-8 py-4 text-sm font-semibold text-white hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>
          </div>
          <Card className="md:justify-self-end relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl"></div>
            <div className="relative flex flex-col gap-4">
              <div className="text-sm flex items-center gap-2">
                <span className="text-purple-400"></span>
                <span className="text-gray-300">{profile.location}</span>
              </div>
              <div className="text-sm flex items-center gap-2">
                <span className="text-purple-400"></span>
                <a className="text-gray-300 hover:text-white transition-colors" href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
              <div className="text-sm flex items-center gap-2">
                <span className="text-purple-400"></span>
                <span className="text-gray-300">{profile.phone}</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700/50">
                <Pill>7+ years</Pill>
                <Pill>APIs</Pill>
                <Pill>Automation</Pill>
                <Pill>Data Pipelines</Pill>
              </div>
            </div>
          </Card>
        </div>
      </motion.section>

      {/* Projects */}
      <Section id="projects" title="Featured Projects">
        <div className="mb-8">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects by title, stack, or keywords..."
              className="w-full md:w-2/3 rounded-xl bg-gray-800/50 border border-gray-700/50 px-5 py-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"></span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Card className="h-full flex flex-col">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors leading-tight">{p.title}</h3>
                      <p className="text-xs text-gray-500 mt-2">{p.period}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {p.stack.map((s) => (
                      <Pill key={s}>{s}</Pill>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{p.impact}</p>
                  {p.metrics?.length > 0 && (
                    <div className="mt-5 flex gap-2 flex-wrap">
                      {p.metrics.map((m) => (
                        <Badge key={m}>{m}</Badge>
                      ))}
                    </div>
                  )}
                </div>
                {(p.links?.repo || p.links?.demo) && (
                  <div className="mt-6 pt-4 border-t border-gray-700/50 flex gap-4">
                    {p.links?.repo && (
                      <a className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1" href={p.links.repo} target="_blank" rel="noreferrer">
                        <span>View Source</span>
                        <span></span>
                      </a>
                    )}
                    {p.links?.demo && (
                      <a className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1" href={p.links.demo} target="_blank" rel="noreferrer">
                        <span>Live Demo</span>
                        <span></span>
                      </a>
                    )}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Technical Skills">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([cat, items]) => (
            <Card key={cat}>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"></span>
                {cat}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((i) => (
                  <Pill key={i}>{i}</Pill>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Work Experience">
        <div className="space-y-6">
          {experience.map((e) => (
            <Card key={e.role + e.period}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">{e.role}</h3>
                  <p className="text-sm text-gray-400 mt-1">{e.org}{e.location ? `  ${e.location}` : ""}</p>
                </div>
                <div className="text-sm text-purple-400 font-medium shrink-0">{e.period}</div>
              </div>
              <ul className="space-y-3 text-sm text-gray-400">
                {e.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-purple-400 shrink-0 mt-1"></span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section id="education" title="Education">
        <div className="grid md:grid-cols-2 gap-6">
          {education.map((ed) => (
            <Card key={ed.degree}>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center shrink-0">
                  <span className="text-2xl"></span>
                </div>
                <div>
                  <h3 className="font-bold text-white leading-tight">{ed.degree}</h3>
                  <p className="text-sm text-gray-400 mt-1">{ed.school}</p>
                  <p className="text-xs text-gray-500 mt-1">{ed.year}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {ed.courses.map((c) => (
                  <Pill key={c}>{c}</Pill>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Let us Connect">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white">Ready to build something great?</h3>
              <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                I am open to backend-focused roles, contract work, and collaborations. Send me a note and I will get back to you soon.
              </p>
              <form
                className="mt-6 grid gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.currentTarget);
                  const subject = encodeURIComponent("Portfolio contact - "+ data.get("name"));
                  const body = encodeURIComponent(
                    `From: ${data.get("name")} <${data.get("email")}>\n\n\n${data.get("message")}`
                  );
                  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
                }}
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <input name="name" required placeholder="Your name" className="rounded-xl bg-gray-800/50 border border-gray-700/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
                  <input name="email" required type="email" placeholder="Your email" className="rounded-xl bg-gray-800/50 border border-gray-700/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
                </div>
                <textarea name="message" required rows={5} placeholder="Your message" className="rounded-xl bg-gray-800/50 border border-gray-700/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
                <button className="group justify-self-start inline-flex items-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition-all" type="submit">
                  Send Message
                  <span className="ml-2 group-hover:translate-x-1 transition-transform"></span>
                </button>
              </form>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
                <div className="text-xs text-gray-500 mb-1">Email</div>
                <a className="text-sm text-purple-400 hover:text-purple-300 transition-colors" href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
              <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
                <div className="text-xs text-gray-500 mb-1">GitHub</div>
                <a className="text-sm text-purple-400 hover:text-purple-300 transition-colors" href={profile.github} target="_blank" rel="noreferrer">View Profile </a>
              </div>
              <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
                <div className="text-xs text-gray-500 mb-1">LinkedIn</div>
                <a className="text-sm text-purple-400 hover:text-purple-300 transition-colors" href={profile.linkedin} target="_blank" rel="noreferrer">Connect </a>
              </div>
              <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
                <div className="text-xs text-gray-500 mb-1">Location</div>
                <div className="text-sm text-gray-300">{profile.location}</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
                <div className="text-xs text-gray-500 mb-1">Phone</div>
                <div className="text-sm text-gray-300">{profile.phone}</div>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </div>
            <div className="text-sm text-gray-500">
              Built with <span className="text-purple-400">React</span>, <span className="text-blue-400">Tailwind CSS</span> & <span className="text-pink-400">Framer Motion</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
