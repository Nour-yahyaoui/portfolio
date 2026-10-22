import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import { featuredProjects, projects } from "@/lib/projects";

const principles = [
  {
    title: "Full-stack, actually",
    copy: "Interface, API, database, deployment. One person accountable for the whole path from sketch to production — nothing lost between handoffs, because there are none.",
  },
  {
    title: "Local AI, with guardrails",
    copy: "Agents that do real work on your own machine: permission-checked tools, shell allowlists, and an audit trail for every call. Useful first, contained always.",
  },
  {
    title: "Secure by default",
    copy: "Rate limits, validation, and secret scanning are part of the first version, not a later patch. If a control matters, it ships on day one.",
  },
];

export default function HomeClient() {
  return (
    <main>
      <Hero />

      <section id="selected-work" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="selected-work-title">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b-2 border-ink pb-4">
          <div>
            <p className="label-mono">01 · Selected work</p>
            <h2 id="selected-work-title" className="h-title mt-3 text-ink">
              Two systems, built to be used daily.
            </h2>
          </div>
          <Link href="/projects" className="link-rule">
            All {projects.length} projects
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <p className="mt-5 max-w-2xl text-[15px] leading-7 text-mute">
          A Linux distribution you can boot, and an AI coding agent you can run
          entirely on your own hardware. Both are public, both are documented,
          and both are maintained.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-subtle" aria-labelledby="how-title">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="label-mono">02 · How I build</p>
          <h2 id="how-title" className="h-title mt-3 text-ink">
            Three rules that don&apos;t change per project.
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {principles.map((principle, i) => (
              <article key={principle.title} className="border-t border-linestrong pt-5">
                <p className="tnum font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  Rule 0{i + 1}
                </p>
                <h3 className="h-section mt-3 text-ink">{principle.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-mute">{principle.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="bg-inv px-6 py-10 text-oninv sm:px-10 sm:py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-oninvmute">
                Have something in mind?
              </p>
              <h2 className="h-title mt-3">Let&apos;s make it work in the real world.</h2>
              <p className="mt-3 text-[15px] leading-7 text-oninvmute">
                Tell me what you&apos;re building and what &ldquo;done&rdquo;
                looks like. You&apos;ll get a direct answer — including if
                I&apos;m not the right person for it.
              </p>
            </div>
            <Link href="/contact" className="btn btn-inverse shrink-0">
              Get in touch
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
