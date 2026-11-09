"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeftRight } from "lucide-react";
import { emeraldSections } from "@/lib/emerald";

export default function EmeraldNav() {
  const [active, setActive] = useState(emeraldSections[0].id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const nodes = emeraldSections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (typeof IntersectionObserver === "undefined" || nodes.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[rgba(4,19,15,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/emerald" className="flex shrink-0 items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rotate-45 bg-accent" aria-hidden="true" />
          <span className="font-display text-base font-semibold tracking-[-0.02em] text-ink">
            Nour Yahyaoui
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-accent sm:inline">
            Emerald
          </span>
        </Link>

        <nav
          aria-label="Emerald edition sections"
          className="ml-4 hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto lg:flex"
        >
          {emeraldSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={active === section.id ? "true" : undefined}
              className={`whitespace-nowrap rounded-md px-2 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                active === section.id ? "text-accent" : "text-mute hover:text-ink"
              }`}
            >
              {section.index}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-mute transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowLeftRight size={13} aria-hidden="true" />
            Versions
          </Link>
          <Link
            href="/classic"
            className="hidden rounded-lg border border-line px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-mute transition-colors hover:border-accent hover:text-accent sm:inline-flex"
          >
            Classic
          </Link>
        </div>
      </div>

      <div className="h-px w-full bg-line">
        <div
          className="h-px bg-gradient-to-r from-accent to-[var(--accent-2)] transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </header>
  );
}
