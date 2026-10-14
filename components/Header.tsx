"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Github, Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto flex h-[62px] max-w-7xl items-center justify-between rounded-2xl border border-white/[0.085] bg-[#0c0f15]/80 px-4 shadow-[0_10px_40px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:px-6">
        <Link href="/" className="group flex items-center gap-3" aria-label="Nour Yahyaoui home">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-sky-300/15 bg-sky-300/[0.07] font-mono text-sm font-semibold tracking-[-0.08em] text-sky-200 transition group-hover:border-sky-300/30 group-hover:bg-sky-300/10">
            NY
          </span>
          <span className="hidden sm:block">
            <span className="block text-[13px] font-semibold tracking-tight text-white">Nour Yahyaoui</span>
            <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">Software developer</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-xs font-medium transition ${active ? "bg-white/[0.07] text-white" : "text-white/50 hover:bg-white/[0.04] hover:text-white/85"}`}
              >
                {item.name}
                {active && <span className="absolute inset-x-3.5 -bottom-[1px] h-px bg-sky-200/70" />}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://github.com/Nour-yahyaoui"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nour Yahyaoui on GitHub"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.08] text-white/55 transition hover:border-white/20 hover:text-white"
          >
            <Github size={15} />
          </a>
          <Link href="/contact" className="group inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-xs font-semibold text-[#090b10] transition hover:bg-sky-100">
            Let&apos;s talk <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/75 transition hover:bg-white/[0.06] md:hidden"
        >
          {isMenuOpen ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>

      {isMenuOpen && (
        <nav aria-label="Mobile navigation" className="mx-3 mt-2 rounded-2xl border border-white/10 bg-[#0c0f15]/95 p-2 shadow-2xl backdrop-blur-2xl sm:mx-5 md:hidden">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm ${active ? "bg-white/[0.07] text-white" : "text-white/60 hover:bg-white/[0.04] hover:text-white"}`}
              >
                {item.name}
                {active && <span className="h-1.5 w-1.5 rounded-full bg-sky-200" />}
              </Link>
            );
          })}
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-[#090b10]">
            Contact me <ArrowUpRight size={15} />
          </Link>
        </nav>
      )}
    </header>
  );
}
