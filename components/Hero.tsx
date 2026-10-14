import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Code2, Cpu, ShieldCheck, TerminalSquare } from "lucide-react";

const buildStatus = [
  { name: "VexOS Desktop", detail: "Debian trixie · developer desktop", status: "v2.2.1", tint: "orange" },
  { name: "nour-code", detail: "Qwen3 8B · local AI agent", status: "v1.0.0", tint: "blue" },
];

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[760px] items-center overflow-hidden border-b border-white/[0.06] lg:min-h-[820px]">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="hero-grid absolute inset-0 opacity-[0.42]" />
        <div className="absolute -left-36 top-16 h-[460px] w-[460px] rounded-full bg-sky-500/[0.09] blur-[130px]" />
        <div className="absolute -right-24 top-12 h-[520px] w-[520px] rounded-full bg-indigo-500/[0.10] blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,#090b10_100%)]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-24 pt-36 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-12 lg:pb-32 lg:pt-40">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-300/75 sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
            Independent developer · Tunisia
          </div>

          <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-sky-300/80">
            Nour Yahyaoui <span className="px-1.5 text-white/20">/</span> Software, thoughtfully built
          </p>
          <h1 className="max-w-3xl text-[clamp(3rem,5.1vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.07em] text-white">
            Thoughtful software,
            <br />
            <span className="hero-title-gradient">built end to end.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-slate-300/75 sm:text-lg sm:leading-8">
            I build secure web products, local AI tools, and developer-focused systems — from the first sketch to deployment. Practical engineering, with care in the details.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="group inline-flex min-h-12 items-center gap-2.5 rounded-full bg-white px-5 text-sm font-semibold text-[#0a0d13] transition hover:bg-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090b10]"
            >
              Explore selected work
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/12 bg-white/[0.025] px-5 text-sm font-medium text-white/75 transition hover:border-white/25 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Let&apos;s talk <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/[0.09] pt-5 sm:gap-7">
            <div>
              <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">3<span className="text-sky-300">+</span></p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-slate-400 sm:text-[11px]">Years with clients</p>
            </div>
            <div>
              <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">Full-stack</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-slate-400 sm:text-[11px]">Build to deployment</p>
            </div>
            <div>
              <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">Security</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-slate-400 sm:text-[11px]">Built in, not bolted on</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[570px] lg:ml-auto lg:mr-0">
          <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-blue-500/[0.12] blur-[90px]" />
          <div className="absolute -right-3 -top-5 z-10 hidden items-center gap-2 rounded-full border border-white/10 bg-[#11151d]/85 px-3 py-2 text-[10px] text-white/60 shadow-2xl backdrop-blur-xl sm:flex">
            <Code2 size={13} className="text-sky-300" />
            BUILD LOG <span className="text-white/20">·</span> 2026
          </div>
          <div className="overflow-hidden rounded-[26px] border border-white/[0.11] bg-[#0e1118]/85 shadow-[0_32px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="flex h-12 items-center justify-between border-b border-white/[0.08] px-4 sm:px-5">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-white/35 sm:text-[11px]">
                <TerminalSquare size={13} />
                ~/nour/selected-work
              </div>
              <span className="text-[9px] text-white/20">⌘ K</span>
            </div>

            <div className="p-5 sm:p-7">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">Featured work</p>
                  <h2 className="mt-1.5 text-lg font-medium tracking-tight text-white">Tools with a point of view.</h2>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-sky-300/15 bg-sky-300/[0.08] text-sky-200">
                  <Cpu size={18} />
                </div>
              </div>

              <div className="space-y-3">
                {buildStatus.map((build, index) => (
                  <div key={build.name} className="group flex items-center gap-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-3.5 transition hover:border-white/[0.15] hover:bg-white/[0.045] sm:gap-4 sm:p-4">
                    <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border ${build.tint === "orange" ? "border-orange-300/20 bg-orange-300/[0.09] text-orange-200" : "border-sky-300/20 bg-sky-300/[0.09] text-sky-200"}`}>
                      {index === 0 ? <TerminalSquare size={19} /> : <Cpu size={19} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-white">{build.name}</p>
                        <span className={`rounded-md border px-1.5 py-0.5 font-mono text-[9px] ${build.tint === "orange" ? "border-orange-300/15 text-orange-200/65" : "border-sky-300/15 text-sky-200/65"}`}>
                          {build.status}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">{build.detail}</p>
                    </div>
                    <ArrowUpRight size={15} className="mr-1 shrink-0 text-white/25 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60" />
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4">
                <div className="flex items-center gap-2 text-[10px] text-white/40 sm:text-[11px]">
                  <ShieldCheck size={14} className="text-emerald-300/75" />
                  Privacy & security, by design
                </div>
                <span className="font-mono text-[9px] text-white/25">02 FEATURED PROJECTS</span>
              </div>
            </div>
          </div>
          <a href="#selected-work" className="mx-auto mt-7 flex w-fit items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/35 transition hover:text-white/70 sm:text-[11px]">
            Scroll to selected work <ArrowDown size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
