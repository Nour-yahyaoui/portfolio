"use client";

import Link from "next/link";
import { historiaPhilosophy } from "@/lib/historia";

/**
 * "WHAT HISTORY TEACHES ME" — five personal interpretations drawn from the
 * archive. Not moral endorsements of the figures; lessons the author takes
 * from their lives. Each idea links back to its source chapter.
 */

export function PhilosophySection() {
  const { intro, ideas } = historiaPhilosophy;

  return (
    <section id="historia-philosophy" className="py-24 border-t border-[var(--h-rule)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 border-b-2 border-[var(--h-rule-strong)] pb-10">
          <p className="label-mono text-[var(--h-gold-bright)] mb-3 tracking-[0.2em]">
            What history teaches me
          </p>
          <h2 className="h-display mb-6 text-[var(--h-ink)]">
            Not glorification — understanding.
          </h2>
          <p className="text-[var(--h-ink-soft)] text-lg leading-8 max-w-2xl italic">
            {intro}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ideas.map((idea) => (
            <article
              key={idea.id}
              className={`relative group overflow-hidden rounded-[2px] border border-[var(--h-rule)] bg-[var(--h-surface)] p-8 transition-all ${
                "hover:border-[var(--h-gold-dim)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
              }`}
            >
              <div className="absolute inset-0 bg-[var(--h-gold-dim)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <span className="label-mono text-[var(--h-gold-dim)] mb-3 block tracking-[0.18em]">
                {idea.title.toUpperCase()}
              </span>
              <h3 className="h-section mt-0 mb-4 text-[var(--h-ink)]">
                {idea.statement}
              </h3>
              <Link
                href={`/historia/${idea.chapter}`}
                className="mt-6 inline-flex items-center gap-1.5 min-h-[40px] px-3 border border-[var(--h-gold-dim)] bg-transparent text-[var(--h-gold-bright)] text-xs font-semibold uppercase tracking-[0.14em] rounded-[2px] transition-colors hover:bg-[var(--h-gold-dim)] hover:text-[var(--h-bg-deep)]"
              >
                From {idea.chapter.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}<span aria-hidden="true"> →</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
