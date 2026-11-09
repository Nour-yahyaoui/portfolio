import type { Metadata } from "next";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import EmeraldNav from "@/components/emerald/EmeraldNav";
import EmeraldMotion from "@/components/emerald/Motion";
import {
  AUTHOR_EMAIL,
  AUTHOR_NAME,
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Nour Yahyaoui — Emerald edition",
  description:
    "The emerald edition of Nour Yahyaoui's portfolio: a cold, deep-green reading experience over the same work — full-stack products, local AI agents, Rust systems, and a 3D lab where five procedural objects stand in for how the software holds together.",
  alternates: {
    canonical: "/emerald",
  },
  openGraph: {
    title: "Nour Yahyaoui — Emerald edition",
    description:
      "Full-stack developer in Tunisia: secure web products, local AI tools, Rust systems, and a Debian-based Linux distribution — presented in a cold emerald edition with an interactive 3D lab.",
    url: `${SITE_URL}/emerald`,
    type: "website",
  },
};

/**
 * The emerald edition is a self-contained world: its own palette (via
 * data-palette, see app/globals.css), its own masthead and colophon, its own
 * display face. The classic edition is untouched one directory away.
 */
export default function EmeraldLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-palette="emerald" className="em-shell">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* Scoped display face for this edition only — the classic edition keeps
          its serif, so the font cannot live in the shared root layout. */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
      />
      <EmeraldMotion>
        <EmeraldNav />
        <main id="main">{children}</main>
        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-display text-xl font-semibold tracking-[-0.02em] text-ink">
                Nour Yahyaoui
                <span className="text-accent">.</span>
              </p>
              <p className="mt-2 max-w-md text-sm leading-6 text-mute">
                Emerald edition — the same portfolio in a colder light. Built with
                Next.js, three.js and a narrow palette: emerald, mint, cyan.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`mailto:${AUTHOR_EMAIL}`}
                  className="em-btn em-btn--ghost em-btn--sm"
                >
                  <Mail size={14} aria-hidden="true" />
                  Email
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="em-btn em-btn--ghost em-btn--sm"
                >
                  <Github size={14} aria-hidden="true" />
                  GitHub
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="em-btn em-btn--ghost em-btn--sm"
                >
                  <Linkedin size={14} aria-hidden="true" />
                  LinkedIn
                </a>
              </div>
            </div>

            <nav aria-label="Editions" className="flex flex-col gap-2">
              <p className="em-index">Editions</p>
              <Link href="/" className="text-sm text-mute transition-colors hover:text-accent">
                Lobby — choose a version
              </Link>
              <Link href="/classic" className="text-sm text-mute transition-colors hover:text-accent">
                Classic — paper &amp; ink
              </Link>
              <Link href="/emerald" className="text-sm text-accent">
                Emerald — this one
              </Link>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
                © {new Date().getFullYear()} {AUTHOR_NAME}
              </p>
            </nav>
          </div>
        </footer>
      </EmeraldMotion>
    </div>
  );
}
