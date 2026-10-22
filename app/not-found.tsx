import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page doesn't exist. Head back to the index of Nour Yahyaoui's work.",
};

/** A 404 with the same design discipline as the homepage (Paper & Ink). */
export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8">
      <p className="label-mono">
        Error <span className="px-1 text-accent">·</span> 404
      </p>
      <p className="tnum mt-6 font-display text-[clamp(4rem,12vw,7rem)] leading-none text-ink" aria-hidden="true">
        404<span className="text-accent">.</span>
      </p>
      <h1 className="h-title mt-6 text-ink">We couldn&apos;t find that page.</h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-mute">
        It may have been moved, renamed, or never existed. Nothing is broken —
        the rest of the site is where you left it.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">
          Back to the front page
        </Link>
        <Link href="/projects" className="btn btn-outline">
          Browse the project index
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
