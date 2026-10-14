import Link from "next/link";
import { ArrowUpRight, Braces, Boxes, Cpu, ShieldCheck } from "lucide-react";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import { featuredProjects } from "@/lib/projects";

const focusAreas = [
  {
    icon: <Boxes size={18} />,
    title: "Full-stack products",
    copy: "Thoughtful web and mobile experiences, backed by reliable APIs and data models.",
  },
  {
    icon: <Cpu size={18} />,
    title: "Local AI systems",
    copy: "Practical agents that work with real tools while respecting permissions and privacy.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Secure by default",
    copy: "Clear boundaries, careful validation, and useful audit trails from the start.",
  },
];

export default function HomeClient() {
  return (
    <main>
      <Hero />

      <section id="selected-work" className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="section-kicker">01 <span>/</span> Selected work</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-white sm:text-4xl lg:text-5xl">
                Built to be used. <span className="text-white/40">Made to last.</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
                Two recent projects at the intersection of Linux distribution engineering, local AI, and secure developer tooling.
              </p>
            </div>
            <Link href="/projects" className="group inline-flex w-fit items-center gap-2 border-b border-white/20 pb-1.5 text-sm text-white/70 transition hover:border-sky-200/60 hover:text-white">
              View all projects
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-white/[0.018] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-3">
            <Braces size={17} className="text-sky-300/75" />
            <p className="section-kicker">02 <span>/</span> How I build</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {focusAreas.map((area, index) => (
              <article key={area.title} className="rounded-2xl border border-white/[0.075] bg-[#0d1016]/75 p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-sky-300/10 bg-sky-300/[0.07] text-sky-200/85">
                    {area.icon}
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.12em] text-white/20">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-base font-medium tracking-tight text-white">{area.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{area.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#10141d] px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
          <div className="pointer-events-none absolute -right-20 -top-40 h-96 w-96 rounded-full bg-sky-400/[0.09] blur-[100px]" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="section-kicker">Have something in mind?</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.045em] text-white sm:text-3xl">
                Let&apos;s make it work in the real world.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                I&apos;m open to thoughtful collaborations, freelance work, and interesting problems.
              </p>
            </div>
            <Link href="/contact" className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#0a0d13] transition hover:bg-sky-100">
              Get in touch
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
