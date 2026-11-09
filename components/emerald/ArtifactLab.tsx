"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EmeraldCanvas from "./EmeraldCanvas";
import {
  CrystalCore,
  DataHelix,
  GroundGlow,
  OrbitalKnot,
  ParallaxRig,
  ParticleDrift,
  PrismRings,
  ShardStorm,
  WireTerrain,
} from "./scene/artifacts";
import { labArtifacts, type ArtifactKind } from "@/lib/emerald";

function ArtifactObject({ kind }: { kind: ArtifactKind }) {
  switch (kind) {
    case "core":
      return (
        <ParallaxRig strength={0.3}>
          <CrystalCore detail={5} radius={1.28} amp={0.26} />
          <PrismRings count={3} />
          <GroundGlow />
        </ParallaxRig>
      );
    case "knot":
      return (
        <ParallaxRig strength={0.3}>
          <group scale={0.95}>
            <OrbitalKnot />
          </group>
          <ParticleDrift count={220} spread={9} depth={9} />
        </ParallaxRig>
      );
    case "helix":
      return (
        <ParallaxRig strength={0.25}>
          <group scale={0.82}>
            <DataHelix />
          </group>
          <ParticleDrift count={180} spread={10} depth={10} />
        </ParallaxRig>
      );
    case "shards":
      return (
        <ParallaxRig strength={0.35}>
          <group scale={1.05}>
            <ShardStorm count={200} />
          </group>
          <ParticleDrift count={160} spread={12} depth={12} />
        </ParallaxRig>
      );
    case "terrain":
      return (
        <group position={[0, 0.5, 0]}>
          <WireTerrain segments={56} />
          <ParticleDrift count={240} spread={16} depth={16} />
        </group>
      );
    default:
      return null;
  }
}

export default function ArtifactLab() {
  const [active, setActive] = useState<ArtifactKind>("core");
  const artifact = labArtifacts.find((item) => item.id === active) ?? labArtifacts[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
      {/* Canvas + tabs */}
      <div className="em-panel overflow-hidden">
        <div
          role="tablist"
          aria-label="3D artifacts"
          className="flex flex-wrap gap-1 border-b border-line p-2"
        >
          {labArtifacts.map((item) => {
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`lab-tab-${item.id}`}
                aria-selected={selected}
                aria-controls="lab-panel"
                onClick={() => setActive(item.id)}
                className={`rounded-lg px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                  selected
                    ? "bg-accent/15 text-accent"
                    : "text-mute hover:bg-surface hover:text-ink"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
          <EmeraldCanvas
            className="absolute inset-0 h-full w-full"
            camera={{ position: [0, 0.2, 6.2], fov: 46 }}
            label={`3D artifact: ${artifact.name}`}
          >
            <ArtifactObject kind={active} />
          </EmeraldCanvas>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#04130f] to-transparent"
            aria-hidden="true"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
            Procedural geometry · no textures, no downloads
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
            {labArtifacts.length} artifacts
          </p>
        </div>
      </div>

      {/* Caption */}
      <div
        role="tabpanel"
        id="lab-panel"
        aria-labelledby={`lab-tab-${active}`}
        className="em-panel em-panel--hover p-6 sm:p-7"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={artifact.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <p className="em-eyebrow">{artifact.tag}</p>
            <h3 className="em-h3 mt-3 text-2xl text-ink">{artifact.name}</h3>
            <p className="mt-4 text-[15px] leading-7 text-mute">{artifact.meaning}</p>
            <p className="mt-3 text-[15px] leading-7 text-mute">{artifact.blurb}</p>

            <dl className="mt-6 divide-y divide-[var(--rule)] border-y border-line">
              {artifact.specs.map((spec) => (
                <div key={spec.label} className="grid grid-cols-[8.5rem_1fr] gap-3 py-2.5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-mute">
                    {spec.label}
                  </dt>
                  <dd className="text-sm text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 border-l-2 border-accent/50 pl-4 font-mono text-[11px] leading-6 text-mute">
              {artifact.build}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
