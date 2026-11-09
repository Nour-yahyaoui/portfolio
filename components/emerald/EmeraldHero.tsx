"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import EmeraldCanvas from "./EmeraldCanvas";
import {
  CrystalCore,
  GroundGlow,
  ParallaxRig,
  ParticleDrift,
  PrismRings,
  WireCage,
} from "./scene/artifacts";
import { AUTHOR_EMAIL, GITHUB_URL } from "@/lib/site";

const facts = [
  { term: "Based in", detail: "Tunisia — remote, CET ± 1" },
  { term: "Practice", detail: "Full-stack · local AI · Rust systems" },
  { term: "Currently", detail: "VexOS v2.2.1 · nour-code v1.4.0 · RustPad v2.1.0" },
  { term: "Open to", detail: "Freelance builds and collaborations" },
];

export default function EmeraldHero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* 3D field — decorative, sits behind the type, never eats a click. */}
      <EmeraldCanvas
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        camera={{ position: [0, 0.35, 6.4], fov: 46 }}
        label="Animated emerald crystal core surrounded by orbiting rings and drifting particles"
      >
        <ParallaxRig strength={0.28}>
          <group position={[1.35, 0.25, -0.6]} scale={0.92}>
            <CrystalCore detail={5} radius={1.3} amp={0.24} />
            <WireCage radius={2.45} opacity={0.1} />
          </group>
          <PrismRings count={3} />
          <GroundGlow />
        </ParallaxRig>
        <ParticleDrift count={700} spread={18} depth={20} />
      </EmeraldCanvas>

      <div className="em-grid pointer-events-none absolute inset-0 -z-20" aria-hidden="true" />

      <div className="mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <motion.p
          className="em-chip border-line text-accent"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          Emerald edition · the same portfolio, colder light
        </motion.p>

        <motion.h1
          className="em-h1 mt-6 max-w-4xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          I build the whole thing,
          <br />
          <span className="em-grad">then I write it down.</span>
        </motion.h1>

        <motion.p
          className="em-lead mt-6 max-w-2xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          Full-stack developer in Tunisia. Secure web products, local AI tools
          that keep your data on your own machine, and offline systems in Rust.
          This edition trades the warm paper of the classic site for a deep
          emerald field — and opens a lab where five 3D objects stand in for how
          the work actually holds together.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
        >
          <a href="#work" className="em-btn em-btn--primary">
            See the work
            <ArrowDown size={16} aria-hidden="true" />
          </a>
          <a href={`mailto:${AUTHOR_EMAIL}`} className="em-btn em-btn--ghost">
            <Mail size={16} aria-hidden="true" />
            Start a conversation
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="em-btn em-btn--ghost"
          >
            GitHub
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </motion.div>

        <motion.dl
          className="mt-14 grid max-w-4xl grid-cols-1 gap-x-10 gap-y-3 border-t border-line pt-6 sm:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {facts.map((fact) => (
            <div key={fact.term} className="flex flex-wrap items-baseline gap-x-3">
              <dt className="em-index shrink-0">{fact.term}</dt>
              <dd className="text-sm text-ink/90">{fact.detail}</dd>
            </div>
          ))}
        </motion.dl>

        <p className="mt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
          <span className="inline-block h-6 w-px bg-gradient-to-b from-accent to-transparent" aria-hidden="true" />
          Scroll — the lab is further down
        </p>

        <p className="mt-6 text-sm text-mute">
          Prefer the original?{" "}
          <Link href="/classic" className="text-accent underline decoration-dotted underline-offset-4">
            Open the classic edition
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
