"use client";

import { historiaChapters } from "@/lib/historia";
import { ChapterCard } from "./ChapterCard";
import type { HistoriaChapterSlug } from "@/lib/historia";

export function ChapterGrid({ featuredOnly }: { featuredOnly?: boolean } = {}) {
  const chapters = featuredOnly
    ? historiaChapters.filter((c) => c.slug === "amir-timur")
    : historiaChapters;

  return (
    <section className="py-20 border-t border-[var(--h-rule)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-12 border-b-2 border-[var(--h-rule-strong)] pb-6">
          <div>
            <p className="label-mono text-[var(--h-gold-bright)] mb-2 tracking-[0.2em]">
              Chapters
            </p>
            <h2 className="h-title text-[var(--h-ink)]">Five figures. Five reflections.</h2>
          </div>
          <p className="text-[var(--h-mute)] text-sm">
            {chapters.length} chapters in the archive
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.slug} slug={chapter.slug as HistoriaChapterSlug} featured={featuredOnly} />
          ))}
        </div>
      </div>
    </section>
  );
}
