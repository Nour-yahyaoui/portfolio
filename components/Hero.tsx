import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * Paper & Ink hero (Recipe R1): left-aligned serif display at weight 400,
 * hierarchy from scale, and a spec-sheet column of real facts on the right.
 * No gradient text, no glow, no fake window chrome — per distinctive-visual-style.
 */
const specSheet: { term: string; detail: string }[] = [
  { term: "Based in", detail: "Tunisia — working with clients remotely" },
  { term: "Practice", detail: "Full-stack web & mobile, local AI, Linux systems" },
  { term: "Experience", detail: "3 years of freelance and client work" },
  { term: "Currently", detail: "VexOS v2.2.1 · nour-code v1.4.0 · RustPad v1.2.0" },
  { term: "Open to", detail: "Freelance projects and thoughtful collaborations" },
];

export default function Hero() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-24 lg:pt-24">
        <div className="lg:col-span-8">
          <p className="label-mono">
            Nour Yahyaoui <span className="px-1 text-accent">·</span> Portfolio, 2026 edition
          </p>
          <h1 className="h-display mt-6 max-w-2xl text-ink">
            Software built end to end, and written down properly.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-mute">
            I&apos;m a full-stack developer from Tunisia. I build secure web
            products, local AI tools that keep your data on your machine, and
            VexOS — a Debian-based Linux distribution for developers. This
            site is the index of that work.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/projects" className="btn btn-primary">
              Read the project index
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Start a conversation
            </Link>
          </div>
        </div>

        <div className="lg:col-span-4 lg:pt-10">
          <p className="label-mono border-b border-ink pb-2 text-ink">Specification</p>
          <dl>
            {specSheet.map((row) => (
              <div
                key={row.term}
                className="grid grid-cols-[7.5rem_1fr] gap-3 border-b border-linesoft py-3 last:border-b-0"
              >
                <dt className="font-mono text-[11px] uppercase leading-6 tracking-[0.12em] text-mute">
                  {row.term}
                </dt>
                <dd className="text-sm leading-6 text-ink">{row.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
