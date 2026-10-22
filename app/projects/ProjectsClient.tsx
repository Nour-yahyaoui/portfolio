import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { featuredProjects, otherProjects, projects } from "@/lib/projects";

/**
 * The complete index — the site's signature element (Recipe R1):
 * every project numbered and set densely in type, like a spec sheet.
 */
export default function ProjectsClient() {
  const archiveStart = featuredProjects.length;

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-8">
      <header className="border-b-2 border-ink pb-8">
        <p className="label-mono">
          Index <span className="px-1 text-accent">·</span> {String(projects.length).padStart(2, "0")} projects
        </p>
        <h1 className="h-display mt-5 text-ink">Everything, in order.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-mute">
          Products, tools, and experiments — from a bootable Linux distribution
          to a local AI coding agent. Featured work first, then the full
          numbered index. Every entry links to something real.
        </p>
      </header>

      <section className="pt-12" aria-labelledby="featured-title">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="featured-title" className="h-section text-ink">
            Featured
          </h2>
          <span className="tnum font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
            01 — {String(archiveStart).padStart(2, "0")}
          </span>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </section>

      <section id="more-work" className="scroll-mt-24 pt-16" aria-labelledby="index-title">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <p className="label-mono">The archive</p>
            <h2 id="index-title" className="h-section mt-2 text-ink">
              Complete index
            </h2>
          </div>
          <span className="tnum font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
            {String(archiveStart + 1).padStart(2, "0")} — {String(projects.length).padStart(2, "0")}
          </span>
        </div>
        <div className="mt-4 border-t border-line">
          {otherProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={archiveStart + i}
              variant="row"
            />
          ))}
        </div>
      </section>

      <div className="flex flex-col justify-between gap-4 pt-12 sm:flex-row sm:items-center">
        <p className="max-w-lg text-[15px] leading-7 text-mute">
          Have a challenge in mind? I enjoy making software useful, dependable,
          and clear to work with.
        </p>
        <Link href="/contact" className="link-rule">
          Start a conversation
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
