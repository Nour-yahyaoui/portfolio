import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { skillGroups } from "@/lib/skills";

/**
 * About, set like a printed document: portrait in the left rail, prose at a
 * readable measure, and the full skill inventory as a spec table.
 * No client JavaScript needed — this is a server component.
 */


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
                src="/nour-portrait.jpg"
                alt="Portrait of Nour Yahyaoui against a black background"
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
              { term: "Focus", detail: "Web products, local AI, Linux, Rust systems" },
              { term: "Languages", detail: "Arabic · French · English (working languages; UIs shipped in all three)" },
              { term: "Works", detail: "Remotely, from Tunisia (Africa/Tunis)" },
              { term: "Learning", detail: "Deeper Rust — Actix Web & axum in production" },
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
              What drives the work is simple: secure, dependable software
              that solves a real problem for a real person — and stays
              understandable after it ships.
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

      <section className="pt-16" aria-labelledby="journey-title">
        <div className="border-b-2 border-ink pb-4">
          <p className="label-mono">Chronology</p>
          <h2 id="journey-title" className="h-title mt-3 text-ink">
            The journey, in four lines of the ledger.
          </h2>
        </div>
        <div>
          {[
            {
              period: "2023",
              title: "First principles",
              body: "Started with Python and web fundamentals — HTML, CSS, JavaScript — and the habit that never left: finish things and put them in front of people.",
            },
            {
              period: "2024",
              title: "In public, with React",
              body: "Joined GitHub (July 2024) and shipped a first public project — a vanilla-JS button gallery. Moved into React, then Next.js and React Native, and first freelance client work.",
            },
            {
              period: "2025",
              title: "Full-stack products",
              body: "Production platforms end to end on Next.js, PostgreSQL, and serverless deploys: store management, client workflows, and open-source tools.",
            },
            {
              period: "2026",
              title: "Systems: Rust, local AI, Linux",
              body: "Went down the stack: nour-code (a guarded local AI agent, v1.4.0), VexOS (a bootable Debian-based distro), Rust APIs with Actix Web and axum (Campus). The web craft stayed; the systems ambition arrived.",
            },
          ].map((entry) => (
            <article key={entry.period} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[7rem_1fr] sm:gap-4">
              <p className="tnum font-display text-3xl leading-none text-ink">
                {entry.period}
                <span className="text-accent">.</span>
              </p>
              <div>
                <h3 className="text-base font-semibold leading-snug text-ink">{entry.title}</h3>
                <p className="mt-1.5 max-w-[68ch] text-[15px] leading-7 text-mute">{entry.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pt-16" aria-labelledby="skills-title">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b-2 border-ink pb-4">
          <div>
            <p className="label-mono">Inventory</p>
            <h2 id="skills-title" className="h-title mt-3 text-ink">
              Skills, itemised.
            </h2>
          </div>
          <p className="tnum font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
            {String(skillGroups.length).padStart(2, "0")} groups
          </p>
        </div>
        <p className="mt-5 max-w-2xl text-[15px] leading-7 text-mute">
          Prefer it in motion? The same skills scroll past as an animated
          showcase — 30 of them, each linked to the project that proves it.{" "}
          <Link href="/skills" className="inline-flex items-center gap-1.5 whitespace-nowrap font-semibold text-accent underline decoration-accent underline-offset-4">
            See the skills showcase <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </p>

        <div>
          {skillGroups.map((skill, i) => (
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

      <section className="mt-16" aria-labelledby="working-title">
        <div className="border-b-2 border-ink pb-4">
          <p className="label-mono">Engagement</p>
          <h2 id="working-title" className="h-title mt-3 text-ink">
            Working with me.
          </h2>
        </div>
        <div>
          {[
            {
              step: "01",
              title: "Discover, in plain words",
              body: "We define what you're building, who it's for, and what \"done\" looks like — before any stack is chosen. If I'm not the right person, I say so here, not after your deposit.",
            },
            {
              step: "02",
              title: "Build in working slices",
              body: "You see real, usable increments early — a till that can sell before it can report, a storefront that can take an order before it has offers. Feedback lands on software, not mockups.",
            },
            {
              step: "03",
              title: "Harden before handover",
              body: "Validation, rate limits, secret hygiene, backups of decisions in writing. The checklist runs before launch, while fixes are still cheap.",
            },
            {
              step: "04",
              title: "Ship — and write it down",
              body: "Deployed, documented, and understandable without me. My READMEs are written for the person who maintains the system in two years. That person might be you.",
            },
          ].map((item) => (
            <article key={item.step} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-4">
              <p className="tnum font-display text-2xl leading-none text-mute" aria-hidden="true">
                {item.step}
              </p>
              <div>
                <h3 className="text-base font-semibold leading-snug text-ink">{item.title}</h3>
                <p className="mt-1.5 max-w-[68ch] text-[15px] leading-7 text-mute">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-[68ch] text-[15px] leading-7 text-mute">
          I work remotely from Tunisia, in Arabic, French, or English — the
          three languages my shipped interfaces already speak.
        </p>
      </section>

    </main>
  );
}
