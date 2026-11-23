import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, Sparkles } from "lucide-react";
import EmeraldHero from "@/components/emerald/EmeraldHero";
import VoyageLoader from "@/components/emerald/VoyageLoader";
import ArtifactLab from "@/components/emerald/ArtifactLab";
import WorkGrid from "@/components/emerald/WorkGrid";
import Metrics from "@/components/emerald/Metrics";
import StackOrbit from "@/components/emerald/StackOrbit";
import Reveal from "@/components/emerald/Reveal";
import {
  capabilities,
  deepDives,
  faqs,
  processSteps,
  timeline,
} from "@/lib/emerald";
import {
  AUTHOR_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Nour Yahyaoui — Emerald edition",
  description:
    "Full-stack developer in Tunisia: secure web products, local AI agents that keep data on your machine, Rust systems that work offline, and a 3D lab explaining how it all holds together.",
};

function Section({
  id,
  index,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span className="em-index">{index}</span>
            <span className="em-eyebrow">{eyebrow}</span>
          </div>
          <h2 className="em-h2 mt-3 max-w-3xl text-ink">{title}</h2>
          {lead ? <p className="em-lead mt-4 max-w-2xl">{lead}</p> : null}
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

const principles = [
  {
    title: "Full-stack, actually",
    copy: "Interface, API, database, deployment. Nothing lost between handoffs, because there are none — one person is accountable for the whole path.",
  },
  {
    title: "Local AI, with guardrails",
    copy: "Agents that do real work on your own machine: permission-checked tools, shell allowlists, and an audit trail for every call. Useful first, contained always.",
  },
  {
    title: "Secure by default",
    copy: "Rate limits, validation and secret scanning are part of the first version, not a later patch. If a control matters, it ships on day one.",
  },
];

export default function EmeraldPage() {
  return (
    <>
      <EmeraldHero />

      {/* 01 — The Voyage: the flight itself. Owns the viewport while you
          scroll through it, then hands you back to the page. */}
      <VoyageLoader />

      {/* 02 — Intro */}
      <Section
        id="intro"
        index="02"
        eyebrow="The short version"
        title={
          <>
            Twenty-one projects, one rule: if the code can&apos;t show it, the page
            doesn&apos;t claim it.
          </>
        }
      >
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="space-y-5 text-[16px] leading-8 text-mute">
              <p>
                I&apos;m Nour — a full-stack developer in Tunisia, three years
                into building software for clients. I started with Python, moved
                through JavaScript and React into Next.js and React Native, then
                went down the stack: Rust for tills and desktop tools that run
                with the internet unplugged, Actix Web for APIs, and a
                Debian-based Linux distribution built with live-build.
              </p>
              <p>
                The pattern across all of it is containment. An AI agent that
                keeps your code on your machine. A till that keeps its books in
                integer millimes. A document studio that fits in 3.9 MB and
                never opens a socket. Software that refuses to fail in ways you
                can&apos;t see coming.
              </p>
              <p>
                This edition is the same portfolio the classic site holds —
                expanded, with three systems written out in full, a lab of five
                3D objects that stand in for how the work is built, and the
                questions clients actually ask me, answered plainly.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-3 lg:col-span-5">
            {principles.map((principle, i) => (
              <Reveal key={principle.title} delay={0.06 * (i + 1)}>
                <div className="em-panel em-panel--hover p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    Rule 0{i + 1}
                  </p>
                  <h3 className="em-h3 mt-2 text-ink">{principle.title}</h3>
                  <p className="mt-2 text-[14px] leading-6 text-mute">{principle.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 02 — Capabilities */}
      <Section
        id="capabilities"
        index="03"
        eyebrow="What I build"
        title="Six kinds of work, all with receipts."
        lead="Each card names the proof: a repository, a live product, or a binary you can download and run."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, i) => (
            <Reveal key={capability.id} delay={Math.min(i * 0.05, 0.25)}>
              <article className="em-panel em-panel--hover flex h-full flex-col p-6">
                <h3 className="em-h3 text-ink">{capability.title}</h3>
                <p className="mt-3 text-[14px] leading-6 text-mute">{capability.summary}</p>
                <ul className="mt-4 space-y-2 border-t border-line pt-4">
                  {capability.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 text-[13px] leading-6 text-ink/90">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 bg-accent" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={capability.proof.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:underline"
                >
                  {capability.proof.label}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 03 — Work */}
      <Section
        id="work"
        index="04"
        eyebrow="Selected work"
        title="Everything in the index, filterable."
        lead="Twenty-one projects: Linux distributions, local AI agents, tills, storefronts, platforms and the odd zero-dependency CLI. Pick a kind to narrow the field."
      >
        <Reveal>
          <WorkGrid />
        </Reveal>
      </Section>

      {/* 04 — Deep dives */}
      <Section
        id="deep-dives"
        index="05"
        eyebrow="Three in full"
        title="The systems I'd point at first."
        lead="Not summaries — the actual design decisions, and the trade each one makes."
      >
        <div className="space-y-6">
          {deepDives.map((dive, i) => (
            <Reveal key={dive.slug} delay={Math.min(i * 0.06, 0.2)}>
              <article className="em-panel p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <p className="em-index">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="em-h3 text-xl text-ink">{dive.title}</h3>
                </div>

                <p className="mt-4 font-display text-lg leading-8 text-accent">
                  {dive.question}
                </p>

                <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem]">
                  <div className="space-y-4 text-[15px] leading-7 text-mute">
                    {dive.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                    ))}
                  </div>

                  <dl className="h-fit divide-y divide-[var(--rule)] rounded-xl border border-line bg-[rgba(4,19,15,0.55)]">
                    {dive.proofPoints.map((point) => (
                      <div key={point.label} className="px-4 py-3">
                        <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-mute">
                          {point.label}
                        </dt>
                        <dd className="mt-1 text-sm font-semibold text-ink">{point.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <a
                  href={dive.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:underline"
                >
                  Read the repository
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 05 — Lab */}
      <Section
        id="lab"
        index="06"
        eyebrow="The lab"
        title={
          <>
            Five objects, five ideas. <span className="em-grad">Turn them around.</span>
          </>
        }
        lead="Everything here is generated in the browser — no textures, no downloads. Each object is a literal shape for a decision inside the projects above."
      >
        <Reveal>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5">
            <Sparkles size={13} className="text-accent" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-mute">
              WebGL · pauses when off-screen · still under reduced-motion
            </span>
          </div>
          <ArtifactLab />
        </Reveal>
      </Section>

      {/* 06 — Process */}
      <Section
        id="process"
        index="07"
        eyebrow="How I work"
        title="Five steps, in the same order every time."
        lead="Process is what stops a good first week from becoming a bad third month."
      >
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={Math.min(i * 0.05, 0.25)}>
              <div className="em-panel em-panel--hover flex h-full flex-col p-6">
                <p className="tnum font-display text-3xl leading-none text-accent/70">{step.n}</p>
                <h3 className="em-h3 mt-4 text-ink">{step.title}</h3>
                <p className="mt-3 text-[14px] leading-6 text-mute">{step.body}</p>
                <p className="mt-auto border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-ink">
                  {step.output}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* 07 — Stack */}
      <Section
        id="stack"
        index="08"
        eyebrow="Stack constellation"
        title="Thirty tools, placed by how much they're used."
      >
        <Reveal>
          <StackOrbit />
        </Reveal>
      </Section>

      {/* 08 — Journey */}
      <Section
        id="journey"
        index="09"
        eyebrow="Journey"
        title="Four years, four turns down the stack."
      >
        <ol className="space-y-4">
          {timeline.map((entry, i) => (
            <Reveal as="li" key={entry.year} delay={Math.min(i * 0.05, 0.2)}>
              <div className="em-panel grid gap-3 p-6 sm:grid-cols-[6rem_1fr] sm:gap-6">
                <p className="tnum font-display text-2xl leading-none text-accent">{entry.year}</p>
                <div>
                  <h3 className="em-h3 text-ink">{entry.title}</h3>
                  <p className="mt-2 max-w-3xl text-[15px] leading-7 text-mute">{entry.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* 09 — Numbers */}
      <Section
        id="numbers"
        index="10"
        eyebrow="By the numbers"
        title="Counted from the repositories, not from memory."
      >
        <Reveal>
          <Metrics />
        </Reveal>
      </Section>

      {/* 10 — FAQ */}
      <Section
        id="faq"
        index="11"
        eyebrow="Questions"
        title="The six I get asked most."
      >
        <Reveal>
          <div className="divide-y divide-[var(--rule)] border-y border-line">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[16px] font-semibold text-ink marker:content-none">
                  <span>{faq.q}</span>
                  <span
                    className="mt-1 shrink-0 font-mono text-accent transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-[15px] leading-7 text-mute">{faq.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* 11 — Contact */}
      <section id="contact" className="scroll-mt-20 border-t border-line py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="em-panel em-grid relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
              <p className="em-eyebrow">12 · Contact</p>
              <h2 className="em-h2 mt-3 max-w-2xl text-ink">
                Tell me what &ldquo;done&rdquo; looks like.
              </h2>
              <p className="em-lead mt-4 max-w-xl">
                Send the problem and the shape of the finished thing. You get a
                direct answer — including when I&apos;m not the right person for
                it, and who probably is.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={`mailto:${AUTHOR_EMAIL}`} className="em-btn em-btn--primary">
                  <Mail size={16} aria-hidden="true" />
                  {AUTHOR_EMAIL}
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="em-btn em-btn--ghost"
                >
                  GitHub
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="em-btn em-btn--ghost"
                >
                  LinkedIn
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <Link href="/classic" className="em-btn em-btn--ghost">
                  Switch to the classic edition
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>

              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                Based in Tunisia · remote · usually replies within a day
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
