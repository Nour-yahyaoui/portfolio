import LivingScene from "./LivingScene";
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
  { term: "Open to", detail: "Freelance projects and thoughtful collaborations" },
];

export default function Hero() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-24 lg:pt-24">
        <div className="lg:col-span-7">
          <p className="label-mono">
            Nour Yahyaoui <span className="px-1 text-accent">·</span> Portfolio, 2026 edition
          </p>
          <h1 className="h-display mt-6 max-w-2xl text-ink">
            A little curiosity.
            A lot of building.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-mute">
            I&apos;m a full-stack developer from Tunisia. My work spans secure web
            products, mobile applications, and developer tools. I care about
            thoughtful interfaces, dependable systems, and the details that
            make software a pleasure to use.
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

        <div className="min-w-0 lg:col-span-5">
          <LivingScene />
          <p className="label-mono mt-6 border-b border-ink pb-2 text-ink">Behind the work</p>
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
