"use client";

import Link from "next/link";
import { getHistoriaChapter } from "@/lib/historia";

/**
 * The Timur–Bayezid connection moment: two extraordinary commanders who met
 * at the Battle of Ankara (1402). Highlighted visually as a special bridge
 * between the two chapters.
 */

export function TimurBayezidConnection() {
  const timur = getHistoriaChapter("amir-timur");
  const bayezid = getHistoriaChapter("bayezid-i");
  if (!timur || !bayezid) return null;

  return (
    <section
      className="relative py-24 overflow-hidden bg-[var(--h-surface-soft)] border-t border-[var(--h-rule)] border-b border-[var(--h-rule)]"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Decorative gold line. */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-[var(--h-gold-dim)]/40 -z-10" />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <p className="label-mono text-[var(--h-gold-bright)] mb-3 tracking-[0.2em]">
              A shared moment in history
            </p>
            <h2 className="h-title mb-6 text-[var(--h-ink)]">
              Ankara, 1402
            </h2>
            <p className="text-[var(--h-ink-soft)] text-base leading-8 max-w-lg mb-8">
              Timur and Bayezid I — two of the most capable commanders of their
              age — confronted each other on a single field at the Battle of
              Ankara. Timur&rsquo;s victory captured Bayezid and ended the Ottoman
              sultan&rsquo;s expansion, triggering a decade of Ottoman civil war.
            </p>
            <div className="flex gap-3">
              <Link
                href="/historia/amir-timur"
                className="inline-flex items-center gap-1.5 min-h-[44px] px-4 border border-[var(--h-gold-dim)] bg-transparent text-[var(--h-gold-bright)] text-sm font-semibold rounded-[2px] transition-colors hover:bg-[var(--h-gold-dim)] hover:text-[var(--h-bg-deep)]"
              >
                Timur&rsquo;s chapter
              </Link>
              <Link
                href="/historia/bayezid-i"
                className="inline-flex items-center gap-1.5 min-h-[44px] px-4 border border-[var(--h-gold-dim)] bg-transparent text-[var(--h-gold-bright)] text-sm font-semibold rounded-[2px] transition-colors hover:bg-[var(--h-gold-dim)] hover:text-[var(--h-bg-deep)]"
              >
                Bayezid&rsquo;s chapter
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[3/4]">
              <div className="absolute inset-0 bg-[var(--h-bg-deep)] rounded-[2px] border border-[var(--h-gold-dim)] shadow-[0_0_40px_rgba(197,160,89,0.2)] overflow-hidden">
                <img
                  src={timur.portrait}
                  alt={timur.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-90"
                />
                <img
                  src={bayezid.portrait}
                  alt={bayezid.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover absolute inset-0 opacity-50 mix-blend-overlay"
                />
              </div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[var(--h-bg-deep)] px-3 py-1 rounded-[2px] border border-[var(--h-gold-dim)] shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[var(--h-gold-bright)]" />
                <span className="text-[var(--h-gold-bright)] text-xs font-bold uppercase tracking-wider">Timur</span>
                <span className="w-1 h-1 bg-[var(--h-gold-dim)]" />
                <span className="text-[var(--h-gold-bright)] text-xs font-bold uppercase tracking-wider">Bayezid I</span>
                <span className="w-2 h-2 rounded-full bg-[var(--h-gold-bright)]" />
                <span className="text-[var(--h-mute)] text-xs">Ankara · 1402</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
