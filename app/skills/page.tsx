import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SkillUniverse from "@/components/SkillUniverse";
import { constellations, skillGroups, universeSkills } from "@/lib/skills";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Skills Universe — React, Next.js, Rust, Python & Local AI",
  description:
    "Every skill of full-stack developer Nour Yahyaoui in one interactive 3D universe: React, Next.js, TypeScript, Node.js, Python, Rust with Actix Web and Axum, PostgreSQL, Ollama local AI, React Native, Docker — each planet linked to the project that proves it.",
  alternates: { canonical: "/skills" },
  openGraph: {
    title: "The Skills Universe | Nour Yahyaoui",
    description:
      "44 skills in orbit — drag the universe, tap a planet, read the proof. React · Next.js · Rust · Python · Local AI.",
    url: "/skills",
    type: "website",
  },
};

const totalTechnologies = skillGroups.reduce((sum, group) => sum + group.technologies.length, 0);

export default function SkillsPage() {
  const skillsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Skills of Nour Yahyaoui",
    url: `${SITE_URL}/skills`,
    itemListElement: universeSkills.map((skill, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: skill.name,
      description: skill.blurb,
    })),
  };

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(skillsJsonLd) }}
      />

      <header className="border-b-2 border-ink pb-8">
        <p className="label-mono">
          Skills <span className="px-1 text-accent">·</span> {universeSkills.length} in orbit ·{" "}
          {totalTechnologies} itemised below
        </p>
        <h1 className="h-display mt-5 text-ink">My skills, as a small universe.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-mute">
          Every technology I work with, in one place — orbiting the person who
          has to answer for all of them. Drag to spin it, tap any planet to
          see what I do with it and which project proves it. Prefer a ledger
          to a galaxy? The complete inventory is itemised underneath.
        </p>
      </header>

      <div className="pt-10">
        <SkillUniverse />
      </div>

      <section className="pt-16" aria-labelledby="constellations-title">
        <div className="border-b-2 border-ink pb-4">
          <p className="label-mono">Chart</p>
          <h2 id="constellations-title" className="h-title mt-3 text-ink">
            Six constellations.
          </h2>
        </div>
        <div className="grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
          {constellations.map((constellation, i) => {
            const count = universeSkills.filter((s) => s.constellation === constellation.name).length;
            return (
              <article key={constellation.name} className="border-b border-line py-6">
                <p className="tnum font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  {String(i + 1).padStart(2, "0")} · {count} skills
                </p>
                <h3 className="h-section mt-2.5 text-ink">{constellation.name}</h3>
                <p className="mt-2 text-[15px] leading-7 text-mute">{constellation.description}</p>
                <p className="mt-3 font-mono text-[11px] leading-5 tracking-[0.04em] text-mute">
                  {universeSkills
                    .filter((s) => s.constellation === constellation.name)
                    .map((s) => s.name)
                    .join(" · ")}
                </p>
              </article>
            );
          })}
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-6 text-mute">
          Planet size is honest, not decorative: <strong className="font-semibold text-ink">Core</strong> skills
          are daily drivers, <strong className="font-semibold text-ink">Strong</strong> ones have shipped to
          production, and <strong className="font-semibold text-ink">Toolkit</strong> skills are in regular
          rotation. Every planet links to its proof.
        </p>
      </section>

      <section className="pt-16" aria-labelledby="inventory-title">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b-2 border-ink pb-4">
          <div>
            <p className="label-mono">Inventory</p>
            <h2 id="inventory-title" className="h-title mt-3 text-ink">
              All of it, itemised.
            </h2>
          </div>
          <p className="tnum font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
            {String(skillGroups.length).padStart(2, "0")} groups · {totalTechnologies} entries
          </p>
        </div>

        <div>
          {skillGroups.map((group, i) => (
            <article
              key={group.name}
              className="grid gap-2 border-b border-line py-6 sm:grid-cols-[3.5rem_16rem_1fr] sm:gap-4"
            >
              <p className="tnum font-display text-2xl leading-none text-mute" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="text-base font-semibold leading-snug text-ink">{group.name}</h3>
                <p className="mt-1 text-sm leading-6 text-mute">{group.description}</p>
              </div>
              <ul className="flex flex-wrap content-start gap-1.5" aria-label={`${group.name} technologies`}>
                {group.technologies.map((tech) => (
                  <li key={tech} className="tag">
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 bg-inv px-6 py-10 text-oninv sm:px-10 sm:py-12" aria-labelledby="skills-cta">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-oninvmute">
              Need one of these planets?
            </p>
            <h2 id="skills-cta" className="h-title mt-3">
              Skills are only interesting in orbit around a problem.
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-oninvmute">
              Tell me what you&apos;re building — I&apos;ll tell you honestly
              which of these it needs, and whether I&apos;m the right person
              to build it.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href="/contact" className="btn btn-inverse">
              Start a project
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/projects" className="btn border border-oninvmute text-oninv transition-colors hover:border-oninv">
              See the proof
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
