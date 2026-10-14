import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { featuredProjects, otherProjects, projects } from "@/lib/projects";

export default function ProjectsClient() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[580px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(56,129,222,0.11),transparent_64%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[520px] hero-grid opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <header className="mb-12 max-w-3xl sm:mb-16">
          <p className="section-kicker">Portfolio <span>/</span> {String(projects.length).padStart(2, "0")} projects</p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.065em] text-white sm:text-5xl lg:text-6xl">
            Work made with
            <br className="hidden sm:block" />
            <span className="hero-title-gradient">care and intent.</span>
          </h1>
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
              A selection of products, tools, and experiments — from VexOS, a Debian-based Linux distribution, to a local AI coding agent.
            </p>
            <Link href="#more-work" className="group inline-flex w-fit shrink-0 items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/45 transition hover:text-white/80">
              More work <ArrowDownRight size={15} className="transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </header>

        <section aria-labelledby="featured-title">
          <div className="mb-5 flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h2 id="featured-title" className="text-xs font-medium uppercase tracking-[0.18em] text-white/55">Featured projects</h2>
            <span className="font-mono text-[10px] text-white/25">01 — 02</span>
          </div>
          <div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <section id="more-work" className="mt-16 scroll-mt-28 sm:mt-24" aria-labelledby="more-title">
          <div className="mb-5 flex items-end justify-between border-b border-white/[0.08] pb-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">Selected archive</p>
              <h2 id="more-title" className="mt-1.5 text-xl font-medium tracking-tight text-white sm:text-2xl">More work</h2>
            </div>
            <span className="font-mono text-[10px] text-white/25">03 — {String(projects.length).padStart(2, "0")}</span>
          </div>
          <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <div className="mt-16 flex flex-col justify-between gap-5 border-t border-white/[0.08] pt-7 sm:flex-row sm:items-center">
          <p className="max-w-lg text-sm leading-6 text-slate-400">
            Have a challenge in mind? I enjoy making software useful, dependable, and clear to work with.
          </p>
          <Link href="/contact" className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-white/75 transition hover:text-white">
            Start a conversation <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
