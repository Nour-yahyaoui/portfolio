import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * About, set like a printed document: portrait in the left rail, prose at a
 * readable measure, and the full skill inventory as a spec table.
 * No client JavaScript needed — this is a server component.
 */

const skills: { name: string; description: string; technologies: string[] }[] = [
  {
    name: "Frontend",
    description: "Responsive, interactive interfaces with modern frameworks",
    technologies: ["React 19", "Next.js", "Vite", "Tailwind CSS", "TypeScript", "Framer Motion", "React Native"],
  },
  {
    name: "Backend",
    description: "Scalable APIs and database architecture",
    technologies: ["Next.js Serverless", "Node.js", "Express", "Rust (Actix Web / Axum)", "Python", "PHP", "Neon DB", "PostgreSQL"],
  },
  {
    name: "AI & Agents",
    description: "Local inference, tool-using agents, and the guardrails around them",
    technologies: ["Ollama", "Qwen3 8B", "FastAPI", "SSE Streaming", "Prometheus", "pytest"],
  },
  {
    name: "Mobile",
    description: "Native and cross-platform mobile applications",
    technologies: ["React Native", "Expo", "Android (Java)", "iOS Swift", "Cross-Platform"],
  },
  {
    name: "Desktop & Systems",
    description: "Linux images and cross-platform desktop applications",
    technologies: ["Linux (Debian)", "live-build", "XFCE", "VexOS DevStudio", "Python (Tkinter/PyQt)", "Java (Swing/JavaFX)"],
  },
  {
    name: "State Management",
    description: "Efficient state for complex applications",
    technologies: ["Zustand", "Redux Toolkit", "React Context", "TanStack Query"],
  },
  {
    name: "Security & Architecture",
    description: "Secure, scalable, and maintainable system design",
    technologies: ["Rate Limiting", "XSS Prevention", "CSRF Protection", "SQL Injection Prevention", "JWT Auth", "RBAC", "Clean Architecture", "SOLID Principles"],
  },
  {
    name: "Design",
    description: "User-centered design, done with restraint",
    technologies: ["UI/UX Design", "Figma", "Responsive Design", "Accessibility", "Micro-interactions"],
  },
  {
    name: "DevOps & Tools",
    description: "Development and deployment workflows",
    technologies: ["Git/GitHub", "Docker", "Debian", "live-build", "Vercel", "CI/CD", "Postman", "VS Code"],
  },
];

const securityControls = [
  "Rate limiting",
  "XSS prevention",
  "CSRF protection",
  "SQL injection prevention",
  "JWT authentication",
  "Path traversal protection",
  "Sandboxed shell execution",
  "Secret scanning",
];

export default function AboutClient() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-8">
      <header className="border-b-2 border-ink pb-8">
        <p className="label-mono">About</p>
        <h1 className="h-display mt-5 text-ink">Hi, I&apos;m Nour.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-mute">
          A 19-year-old full-stack developer from Tunisia, three years into
          building software for clients — and lately, building the tools I
          always wanted to exist.
        </p>
      </header>

      <div className="grid gap-10 pt-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <figure>
            <div className="relative aspect-square w-full max-w-sm overflow-hidden border border-line bg-subtle">
              <Image
                src="/port.png"
                alt="Portrait of Nour Yahyaoui"
                fill
                sizes="(max-width: 1024px) 384px, 33vw"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
              Nour Yahyaoui — Tunisia
            </figcaption>
          </figure>

          <dl className="mt-8 border-t border-line">
            {[
              { term: "Role", detail: "Full-stack developer" },
              { term: "Focus", detail: "Web products, local AI, Linux" },
              { term: "Learning", detail: "Rust — Actix Web and Axum" },
            ].map((row) => (
              <div key={row.term} className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-linesoft py-3">
                <dt className="font-mono text-[11px] uppercase leading-6 tracking-[0.12em] text-mute">{row.term}</dt>
                <dd className="text-sm leading-6 text-ink">{row.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-8">
          <h2 className="h-section text-ink">The short version</h2>
          <div className="mt-4 max-w-[68ch] space-y-5 text-[17px] leading-8 text-mute">
            <p>
              I began with Python and web fundamentals, then worked through
              JavaScript and React into modern full-stack development —
              Next.js, React Native, and serverless architectures backed by
              PostgreSQL. For three years I&apos;ve shipped production
              applications end to end for clients: frontend, backend, and the
              deployment that makes it real.
            </p>
            <p>
              Recently I&apos;ve been building my own systems.{" "}
              <strong className="font-semibold text-ink">nour-code</strong>{" "}
              (now at v1.4.0) is a local AI coding agent: Qwen3 8B on Ollama,
              behind FastAPI, with audited, permission-checked access to real
              tools — nothing leaves your machine unless you allow it.{" "}
              <strong className="font-semibold text-ink">VexOS</strong> is my
              Debian-based Linux distribution: boot one ISO and you get a
              ready-to-code desktop with a browser-based IDE, and a reboot
              restores it to a clean state.
            </p>
            <p>
              What drives the work is simple: secure, dependable software
              that solves a real problem for a real person — and stays
              understandable after it ships. I&apos;m currently expanding
              into Rust for performance-critical backend services.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className="btn btn-primary">
              See the work
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Contact me
            </Link>
          </div>
        </div>
      </div>

      <section className="pt-16" aria-labelledby="skills-title">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b-2 border-ink pb-4">
          <div>
            <p className="label-mono">Inventory</p>
            <h2 id="skills-title" className="h-title mt-3 text-ink">
              Skills, itemised.
            </h2>
          </div>
          <p className="tnum font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
            {String(skills.length).padStart(2, "0")} groups
          </p>
        </div>

        <div>
          {skills.map((skill, i) => (
            <article
              key={skill.name}
              className="grid gap-2 border-b border-line py-6 sm:grid-cols-[3.5rem_16rem_1fr] sm:gap-4"
            >
              <p className="tnum font-display text-2xl leading-none text-mute" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="text-base font-semibold leading-snug text-ink">{skill.name}</h3>
                <p className="mt-1 text-sm leading-6 text-mute">{skill.description}</p>
              </div>
              <ul className="flex flex-wrap content-start gap-1.5" aria-label={`${skill.name} technologies`}>
                {skill.technologies.map((tech) => (
                  <li key={tech} className="tag">
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 border border-line bg-surface p-6 sm:p-8" aria-labelledby="security-title">
        <p className="label-mono">Standing policy</p>
        <h2 id="security-title" className="h-section mt-3 text-ink">
          Security-first development
        </h2>
        <p className="mt-3 max-w-[68ch] text-[15px] leading-7 text-mute">
          Security is part of the first version, not a later patch: rate
          limiting, CSRF protection, and input validation on the web side;
          path checks, shell allowlists, and audit logs in local developer
          tools. Paired with clean architecture, so applications stay
          maintainable as they scale.
        </p>
        <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {securityControls.map((control) => (
            <li key={control} className="flex items-baseline gap-2.5 border-t border-linesoft py-2.5 text-sm text-ink">
              <span className="font-mono text-accent" aria-hidden="true">
                —
              </span>
              {control}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
