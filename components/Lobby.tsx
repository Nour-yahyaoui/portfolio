"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import LobbyScene from "@/components/LobbyScene";
import { AUTHOR_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";

type Edition = "classic" | "emerald";

const STORAGE_KEY = "portfolio-edition";

const doors: {
  id: Edition;
  edition: string;
  name: string;
  tone: string;
  copy: string;
  bullets: string[];
  swatches: string[];
  cta: string;
  href: string;
}[] = [
  {
    id: "classic",
    edition: "Edition A",
    name: "Paper & Ink",
    tone: "Warm · light · printed",
    copy: "The original portfolio: warm paper, a serif display, hairline rules and one vermilion accent. Laid out like a printed manual — an index of twenty projects, each with a written case study.",
    bullets: [
      "Twenty projects with full case studies",
      "Specification sheets, printed-index typography",
      "Light and dark themes, serif throughout",
    ],
    swatches: ["#f5f3ee", "#c4340b", "#8a8474"],
    cta: "Enter the classic edition",
    href: "/classic",
  },
  {
    id: "emerald",
    edition: "Edition B · new",
    name: "Emerald",
    tone: "Cold · deep green · expanded",
    copy: "The same work in a cold, deep emerald field that rests the eye at night — with more of everything: three systems written out in full, a five-object 3D lab, a skill constellation, and the questions clients actually ask.",
    bullets: [
      "Five procedural 3D objects, each explaining a real system",
      "Three deep dives: local AI, Rust documents, offline tills",
      "Filterable index, process, timeline and FAQ",
    ],
    swatches: ["#04130f", "#34d399", "#22d3ee"],
    cta: "Enter the emerald edition",
    href: "/emerald",
  },
];

export default function Lobby() {
  const [remembered, setRemembered] = useState<Edition | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "classic" || stored === "emerald") setRemembered(stored);
    } catch {
      /* private mode — no memory, no problem */
    }
  }, []);

  const choose = (edition: Edition) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, edition);
    } catch {
      /* ignore */
    }
  };

  const forget = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setRemembered(null);
  };

  return (
    <div className="lobby">
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-10 sm:px-6 lg:px-8">
        {/* Masthead */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="lobby-eyebrow">Nour Yahyaoui · Portfolio 2026</p>
          <nav aria-label="Elsewhere" className="flex items-center gap-1">
            <a
              href={`mailto:${AUTHOR_EMAIL}`}
              className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--lobby-line)] text-[var(--lobby-mute)] transition-colors hover:text-white"
              aria-label="Email Nour Yahyaoui"
            >
              <Mail size={16} aria-hidden="true" />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--lobby-line)] text-[var(--lobby-mute)] transition-colors hover:text-white"
              aria-label="Nour Yahyaoui on GitHub"
            >
              <Github size={16} aria-hidden="true" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--lobby-line)] text-[var(--lobby-mute)] transition-colors hover:text-white"
              aria-label="Nour Yahyaoui on LinkedIn"
            >
              <Linkedin size={16} aria-hidden="true" />
            </a>
          </nav>
        </motion.div>

        {/* Headline */}
        <div className="mt-12 max-w-3xl sm:mt-16">
          <motion.h1
            className="lobby-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            Two editions.
            <br />
            One body of work.
          </motion.h1>
          <motion.p
            className="mt-5 max-w-2xl text-[17px] leading-8 text-[var(--lobby-mute)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            Same projects, same numbers, same person — two different lights to
            read them in. Pick the one that suits your eyes tonight; the switch
            is always one click away, and your choice is remembered on this
            device.
          </motion.p>

          {remembered ? (
            <motion.p
              className="mt-6 inline-flex flex-wrap items-center gap-3 rounded-full border border-[var(--lobby-line)] px-4 py-2 text-sm text-[var(--lobby-mute)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--em)]" aria-hidden="true" />
              Welcome back — last time you read the{" "}
              <span className="font-semibold text-white">
                {remembered === "emerald" ? "emerald" : "classic"}
              </span>{" "}
              edition.
              <Link
                href={remembered === "emerald" ? "/emerald" : "/classic"}
                className="font-semibold text-white underline decoration-dotted underline-offset-4"
              >
                Continue
              </Link>
              <button
                type="button"
                onClick={forget}
                className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--lobby-mute)] underline decoration-dotted underline-offset-4 hover:text-white"
              >
                Forget
              </button>
            </motion.p>
          ) : null}
        </div>

        {/* The two doors */}
        <div className="mt-12 grid gap-5 pb-10 lg:grid-cols-2">
          {doors.map((door, i) => (
            <motion.div
              key={door.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={door.href}
                onClick={() => choose(door.id)}
                className={`lobby-door lobby-door--${door.id === "classic" ? "gold" : "emerald"}`}
              >
                {/* Live 3D preview */}
                <div className="relative -mx-1 h-44 overflow-hidden rounded-2xl border border-[var(--lobby-line)] bg-black/30">
                  <LobbyScene variant={door.id === "classic" ? "gold" : "emerald"} />
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <p className="lobby-eyebrow">{door.edition}</p>
                  <span className="lobby-chip">
                    <span className="lobby-swatch" aria-hidden="true">
                      {door.swatches.map((color) => (
                        <span key={color} style={{ background: color }} />
                      ))}
                    </span>
                    {door.tone}
                  </span>
                </div>

                <h2 className="mt-4 font-display text-3xl leading-none tracking-[-0.02em]">
                  {door.name}
                </h2>

                <p className="mt-3 text-[15px] leading-7 text-[var(--lobby-mute)]">{door.copy}</p>

                <ul className="mt-5 space-y-2 border-t border-[var(--lobby-line)] pt-5">
                  {door.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 text-[14px] leading-6 text-white/85">
                      <span
                        className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full"
                        style={{ background: door.id === "classic" ? "var(--gold)" : "var(--em)" }}
                        aria-hidden="true"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <span
                    className={`lobby-enter lobby-enter--${door.id === "classic" ? "gold" : "emerald"}`}
                  >
                    {door.cta}
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--lobby-mute)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Sparkles size={13} aria-hidden="true" />
          Full-stack development · Local AI · Rust systems · VexOS Linux
        </motion.p>
      </div>
    </div>
  );
}
