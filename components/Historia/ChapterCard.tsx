"use client";

import Link from "next/link";
import { getHistoriaChapter } from "@/lib/historia";
import type { HistoriaChapterSlug } from "@/lib/historia";

interface ChapterCardProps {
  slug: HistoriaChapterSlug;
  featured?: boolean;
}

export function ChapterCard({ slug, featured = false }: ChapterCardProps) {
  const chapter = getHistoriaChapter(slug);
  if (!chapter) return null;

  return (
    <article
      className={`relative group overflow-hidden rounded-[2px] border border-[var(--h-rule)] bg-[var(--h-surface)] transition-all ${
        featured
          ? "border-[var(--h-gold-dim)] shadow-[0_0_30px_rgba(197,160,89,0.15)]"
          : "hover:border-[var(--h-gold-dim)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--h-bg-deep)]">
        <img
          src={chapter.portrait}
          alt={chapter.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Overlay tint on hover. */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[var(--h-bg-deep)]/90 to-transparent">
          <span className="label-mono text-[var(--h-gold-dim)]">{chapter.theme}</span>
          <h3 className="h-section mt-1 text-[var(--h-ink)]">{chapter.title}</h3>
          <p className="mt-1 text-xs text-[var(--h-mute)] leading-5">{chapter.period}</p>
        </div>
        <a
          href={`/historia/${slug}`}
          className="absolute inset-0 z-10"
          aria-label={`Read the ${chapter.title} chapter`}
        />
      </div>
      <div className="p-5">
        <p className="text-[var(--h-ink-soft)] text-sm leading-6 line-clamp-3">
          {chapter.introduction}
        </p>
        <Link
          href={`/historia/${slug}`}
          className="mt-4 inline-flex items-center gap-1.5 min-h-[40px] px-3 border border-[var(--h-gold-dim)] bg-transparent text-[var(--h-gold-bright)] text-xs font-semibold uppercase tracking-[0.14em] rounded-[2px] transition-colors hover:bg-[var(--h-gold-dim)] hover:text-[var(--h-bg-deep)]"
        >
          Read chapter <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
