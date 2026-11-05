"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "./HeroSection";
import { ChapterGrid } from "./ChapterGrid";
import { Timeline } from "./Timeline";
import { TimurBayezidConnection } from "./TimurBayezidConnection";
import { PhilosophySection } from "./PhilosophySection";


/**
 * HISTORIA client orchestrator for /historia.
 *
 * Combines the immersive 3D hero, the chapter archive, the interactive
 * timeline, the Timur–Bayezid connection moment, and the personal
 * philosophy section into one premium historical experience.
 */

export default function HistoriaClient() {
  const [activeSlug, setActiveSlug] = useState<string | undefined>(undefined);

  return (
    <div className="historia space-y-0">
      {/* Hero — immersive 3D opening (or 2D fallback). */}
      <HeroSection
        onSelectChapter={setActiveSlug}
        activeSlug={activeSlug}
      />

      {/* Chapter archive. */}
      <ChapterGrid />

      {/* Connection moment — Timur & Bayezid at Ankara 1402. */}
      <TimurBayezidConnection />

      {/* Interactive timeline. */}
      <Timeline />

      {/* Personal philosophy. */}
      <PhilosophySection />

      {/* CTA — contact. */}
      <section className="py-24 border-t border-[var(--h-rule)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="label-mono text-[var(--h-gold-bright)] mb-4 tracking-[0.2em]">
            Start a conversation
          </p>
          <h3 className="h-title mb-6 text-[var(--h-ink)]">
            Interested in history, strategy, or building software?
          </h3>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2 bg-[var(--h-ink)] text-[var(--h-bg-deep)] font-semibold rounded-[2px] transition-colors hover:bg-[var(--h-gold-bright)] hover:text-[var(--h-ink)]"
          >
            Get in touch
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
