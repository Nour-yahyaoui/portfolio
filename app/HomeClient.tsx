import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import SkillMarquee from "@/components/SkillMarquee";
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

const services = [
  {
    title: "Shop & business systems",
    copy: "Points of sale, inventory, orders, debts, staff — the daily machinery of a small business, on web, mobile, or a single offline binary that never needs the internet to open the till.",
    proof: "Proof: OneClick (Rust POS) and Matjari (web + mobile).",
    href: "/projects/oneclick",
  },
  {
    title: "E-commerce that keeps its books",
    copy: "Storefronts with variants and offers, cash-on-delivery checkout, and an admin desk where orders and stock can never disagree — because they commit in the same transaction.",
    proof: "Proof: Nextgen, a complete store on Next.js + Neon Postgres.",
    href: "/projects/nextgen",
  },
  {
    title: "Platforms & communities",
    copy: "Multi-role products with real workflows: reviews and approvals, capacity-safe registration, moderation, audit logs. The unglamorous machinery that decides whether a platform survives its second month.",
    proof: "Proof: Campus, an open-source university platform.",
    href: "/projects/campus",
  },
  {
    title: "Local AI & developer tools",
    copy: "Agents and CLIs that run on your own hardware and respect your boundaries: permission-checked tools, secret scanning, single-binary utilities. Software your security review will enjoy.",
    proof: "Proof: nour-code and env-sentry.",
    href: "/projects/nour-code",
  },
];

const numbers = [
  { value: "15", label: "Projects in this index, each with a case study" },
  { value: "28", label: "Public repositories on GitHub" },
  { value: "345", label: "Offline tests guarding nour-code alone" },
  { value: "3", label: "Languages shipped in product UIs — Arabic, French, English" },
  { value: "3 yrs", label: "Of freelance & client work" },
];

export default function HomeClient() {
  return (
    <main>
      <Hero />

      <section
        id="selected-work"
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="selected-work-title"
      >
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b-2 border-ink pb-4">
          <div>
            <p className="label-mono">01 · Selected work</p>
            <h2 id="selected-work-title" className="h-title mt-3 text-ink">
              Three systems, built to be used daily.
            </h2>
          </div>
          <Link href="/projects" className="link-rule">
            All {projects.length} projects
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <p className="mt-5 max-w-2xl text-[15px] leading-7 text-mute">
          A Linux distribution you can boot, an AI coding agent that runs
          entirely on your own hardware, and a Rust till that runs a shop
          offline. Open any of them for the full case study — how it works,
          and the stack behind it.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              className={
                featuredProjects.length % 2 === 1 && i === featuredProjects.length - 1
                  ? "lg:col-span-2"
                  : ""
              }
            />
          ))}
        </div>
      </section>

      <section className="border-y border-line" aria-labelledby="person-title">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="lg:col-span-4">
            <figure>
              <div className="relative aspect-[3/4] w-full max-w-xs overflow-hidden border border-line bg-subtle">
                <Image
                  src="/nour-white-shirt.jpg"
                  alt="Nour Yahyaoui in a white shirt, mirror portrait"
                  fill
                  sizes="(max-width: 1024px) 320px, 25vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                The author of the index
              </figcaption>
            </figure>
          </div>
          <div className="lg:col-span-8">
            <p className="label-mono">02 · The person</p>
            <h2 id="person-title" className="h-title mt-3 text-ink">
              One developer, end to end.
            </h2>
            <div className="mt-4 max-w-[68ch] space-y-5 text-[17px] leading-8 text-mute">
              <p>
                I&apos;m Nour — 19, from Tunisia, three years into building
                software for clients. I started with Python, grew through
                JavaScript and React into full-stack Next.js and React
                Native, and lately I build systems: a Linux distribution, a
                local AI agent, and offline shop software in Rust.
              </p>
              <p>
                Working with me means one accountable person from the first
                sketch to the deployed product — and documentation written
                well enough that you never depend on me to understand your
                own system.
              </p>
            </div>
            <Link href="/about" className="link-rule mt-6">
              More about me
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-subtle" aria-labelledby="how-title">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="label-mono">03 · How I build</p>
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

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="services-title">
        <div className="border-b-2 border-ink pb-4">
          <p className="label-mono">04 · Services</p>
          <h2 id="services-title" className="h-title mt-3 text-ink">
            What you can hire me to build.
          </h2>
        </div>
        <div>
          {services.map((service, i) => (
            <article
              key={service.title}
              className="grid gap-2 border-b border-line py-7 sm:grid-cols-[3.5rem_1fr] sm:gap-4"
            >
              <p className="tnum font-display text-2xl leading-none text-mute" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="h-section text-ink">{service.title}</h3>
                <p className="mt-2 max-w-[68ch] text-[15px] leading-7 text-mute">{service.copy}</p>
                <p className="mt-2 text-sm leading-6 text-ink">{service.proof}</p>
                <Link href={service.href} className="link-rule mt-1">
                  Read that case study
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-subtle" aria-labelledby="numbers-title">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="label-mono">05 · By the numbers</p>
          <h2 id="numbers-title" className="sr-only">
            The work, counted honestly
          </h2>
          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-5">
            {numbers.map((stat) => (
              <div key={stat.label} className="border-t border-linestrong pt-4">
                <dd className="tnum font-display text-4xl leading-none text-ink">{stat.value}</dd>
                <dt className="mt-3 text-sm leading-6 text-mute">{stat.label}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm leading-6 text-mute">
            Counts taken from the projects and repositories themselves — the
            same rule the case studies follow.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="skills-marquee-title">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b-2 border-ink pb-4">
          <div>
            <p className="label-mono">06 · Skills in motion</p>
            <h2 id="skills-marquee-title" className="h-title mt-3 text-ink">
              All of it, scrolling past.
            </h2>
          </div>
          <Link href="/skills" className="link-rule">
            See all skills
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <p className="mt-5 max-w-2xl text-[15px] leading-7 text-mute">
          Forty-four skills in motion — React and Rust, Actix and Ollama,
          Postgres and Python. Hover to pause the strip; click any skill to
          open the project that proves it.
        </p>
        <div className="mt-8">
          <SkillMarquee variant="compact" />
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
