"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Github, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Skills", href: "/skills" },
  { name: "Contact", href: "/contact" },
];

/**
 * Masthead, like the top of a printed manual: solid paper, one hairline,
 * serif name, mono navigation. Sticky (not floating, no glass, no shadow).
 */
export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Escape closes the mobile menu and returns focus to the button.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-h-11 items-center gap-3" aria-label="Nour Yahyaoui — home">
          <span className="font-display text-lg leading-none tracking-[-0.01em] text-ink">
            Nour Yahyaoui<span className="text-accent">.</span>
          </span>
          <span className="label-mono hidden lg:block">Full-stack developer</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 items-center px-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  active ? "text-accent" : "text-mute hover:text-ink"
                }`}
              >
                {item.name}
                {active && <span className="ml-1.5 inline-block h-1 w-1 rounded-full bg-accent" aria-hidden="true" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Nour-yahyaoui"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nour Yahyaoui on GitHub"
            className="grid h-11 w-11 place-items-center rounded-[2px] border border-line text-mute transition-colors hover:border-linestrong hover:text-ink"
          >
            <Github size={17} aria-hidden="true" />
          </a>
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-[2px] border border-line text-mute transition-colors hover:border-linestrong hover:text-ink md:hidden"
          >
            {isMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav id="mobile-nav" aria-label="Mobile navigation" className="border-t border-linesoft md:hidden">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
                className={`flex min-h-12 items-center justify-between border-b border-linesoft px-4 font-mono text-xs uppercase tracking-[0.14em] last:border-b-0 ${
                  active ? "text-accent" : "text-mute"
                }`}
              >
                {item.name}
                {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
