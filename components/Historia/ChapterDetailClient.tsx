"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { historiaChapters, getConnectedChapter, type HistoriaChapterSlug } from "@/lib/historia";
import { AmbientParticles } from "./AmbientParticles";
import { PortraitFrame } from "./PortraitFrame";

interface ChapterDetailClientProps {
  chapterSlug: HistoriaChapterSlug;
  portraitSrc: string;
  chapterTitle: string;
}

/**
 * Client-side chapter detail:
 * - A single interactive 3D portrait (or 2D fallback on low-end devices).
 * - The connection moment (Timur <-> Bayezid at Ankara 1402).
 * - Accessible HTML content: context, achievements, reflection, timeline, bibliography.
 */

export function ChapterDetailClient({
  chapterSlug,
  portraitSrc,
}: ChapterDetailClientProps) {
  const data = historiaChapters.find((c) => c.slug === chapterSlug);
  const connected = getConnectedChapter(chapterSlug);
  const [use3D, setUse3D] = useState(true);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowEnd =
      typeof navigator !== "undefined" &&
      navigator.hardwareConcurrency &&
      navigator.hardwareConcurrency < 4;
    if (reduced || lowEnd) setUse3D(false);
  }, []);

  if (!data) return null;

  return (
    <article className="historia space-y-16">
      {/* Header: back link + title. */}
      <header className="border-b-2 border-[var(--h-rule-strong)] pb-8">
        <Link
          href="/historia/chapters"
          className="inline-flex items-center gap-2 min-h-[40px] px-3 border border-[var(--h-rule)] bg-transparent text-[var(--h-mute)] text-xs font-semibold uppercase tracking-[0.14em] rounded-[2px] transition-colors hover:border-[var(--h-gold-dim)] hover:text-[var(--h-gold-bright)] mb-6"
        >
          <ArrowLeft size={14} aria-hidden="true" /> Return to archive
        </Link>
        <p className="label-mono text-[var(--h-gold-bright)] mb-3 tracking-[0.2em]">
          {data.theme}
        </p>
        <h1 className="h-display mt-0 mb-4 text-[var(--h-ink)]">{data.title}</h1>
        <p className="text-[var(--h-mute)] text-sm leading-6 max-w-md">{data.period}</p>
      </header>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left: portrait (3D or fallback). */}
        <div className="lg:col-span-5 flex flex-col items-center gap-6">
          {use3D ? (
            <div className="w-full max-w-[420px] aspect-[3/4]">
              <canvas
                className="w-full h-full rounded-[2px] border border-[var(--h-rule)] bg-[var(--h-surface-deep, var(--h-bg-deep))]"
                style={{ touchAction: "none" }}
              >
                {/* Inline mini-canvas for the single portrait. */}
                {/*
                  We render a small R3F canvas here. To avoid importing the full
                  HeroSection, we reuse PortraitFrame inside a tiny Canvas.
                */}
                <MiniPortraitCanvas src={portraitSrc} label={data.title} active />
              </canvas>
            </div>
          ) : (
            <div className="w-full max-w-[420px] aspect-[3/4] rounded-[2px] border border-[var(--h-rule)] bg-[var(--h-bg-deep)] overflow-hidden">
              <img
                src={portraitSrc}
                alt={data.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <p className="text-[var(--h-mute)] text-xs leading-5 max-w-[400px] text-center">
            {data.portraitCredit}
          </p>
        </div>

        {/* Right: content. */}
        <div className="lg:col-span-7 space-y-10">
          {/* Cinematic introduction. */}
          <section>
            <p className="label-mono text-[var(--h-gold-dim)] mb-3 uppercase tracking-[0.14em]">
              Introduction
            </p>
            <p className="text-[var(--h-ink-soft)] text-lg leading-8 max-w-3xl">
              {data.introduction}
            </p>
          </section>

          {/* Historical context. */}
          <section>
            <p className="label-mono text-[var(--h-gold-dim)] mb-3 uppercase tracking-[0.14em]">
              Historical context
            </p>
            <p className="text-[var(--h-ink-soft)] text-lg leading-8 max-w-3xl">
              {data.context}
            </p>
          </section>

          {/* Achievements. */}
          <section>
            <p className="label-mono text-[var(--h-gold-dim)] mb-3 uppercase tracking-[0.14em]">
              Important achievements
            </p>
            <ul className="space-y-3 text-[var(--h-ink-soft)] text-base leading-7 max-w-3xl list-disc pl-6">
              {data.achievements.map((a, i) => (
                <li key={i} className="marker:text-[var(--h-gold-bright)] marker:font-bold">
                  {a}
                </li>
              ))}
            </ul>
          </section>

          {/* Admired quality + reflection. */}
          <section className="border-l-3 border-[var(--h-gold-dim)] pl-6 pt-2 pb-4 bg-[var(--h-surface)] rounded-r-[2px]">
            <p className="label-mono text-[var(--h-gold-bright)] mb-3 uppercase tracking-[0.14em]">
              The quality I admire
            </p>
            <p className="text-[var(--h-ink)] text-base leading-7 max-w-3xl font-medium">
              {data.admiredQuality}
            </p>
            <blockquote className="mt-6 border-l-2 border-[var(--h-gold-dim)] pl-4 italic text-[var(--h-ink-soft)] text-lg leading-8 max-w-3xl">
              &ldquo;{data.reflection}&rdquo;
            </blockquote>
          </section>

          {/* Connection moment (Timur <-> Bayezid). */}
          {connected && (
            <section className="border-2 border-[var(--h-gold-dim)] bg-[var(--h-surface)] rounded-[2px] p-6">
              <p className="label-mono text-[var(--h-gold-bright)] mb-3 uppercase tracking-[0.14em]">
                A shared moment in history
              </p>
              <h3 className="h-section mt-0 mb-3 text-[var(--h-ink)]">
                {data.title} &rarr; {connected.title}
              </h3>
              <p className="text-[var(--h-ink-soft)] text-base leading-7 mb-4 max-w-3xl">
                {connected.connectionNote || `Their paths met at the Battle of Ankara in 1402.`}
              </p>
              <Link
                href={`/historia/${connected.slug}`}
                className="inline-flex items-center gap-1.5 min-h-[40px] px-3 border border-[var(--h-gold-dim)] bg-transparent text-[var(--h-gold-bright)] text-xs font-semibold uppercase tracking-[0.14em] rounded-[2px] transition-colors hover:bg-[var(--h-gold-dim)] hover:text-[var(--h-bg-deep)]"
              >
                Open {connected.title}<span aria-hidden="true"> →</span>
              </Link>
            </section>
          )}

          {/* Timeline events for this chapter. */}
          <section>
            <p className="label-mono text-[var(--h-gold-dim)] mb-3 uppercase tracking-[0.14em]">
              Timeline
            </p>
            <ul className="space-y-4 text-[var(--h-ink-soft)] text-sm leading-7 max-w-3xl">
              {data.timeline.map((event) => (
                <li key={event.year} className="flex gap-4">
                  <span className="tnum font-mono text-[var(--h-gold-bright)] text-xs w-16 shrink-0">
                    {event.year}
                  </span>
                  <span>{event.label}</span>
                  <span className="ml-auto text-[var(--h-mute)] text-[10px]">{event.description}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Bibliography. */}
          <section className="pt-6 border-t border-[var(--h-rule-soft)]">
            <p className="label-mono text-[var(--h-gold-dim)] mb-3 uppercase tracking-[0.14em]">
              Sources
            </p>
            <ul className="space-y-2 text-[var(--h-mute)] text-xs leading-6 max-w-3xl">
              {data.bibliography.map((b, i) => (
                <li key={i} className="list-disc pl-4">
                  {b.author && <span className="font-medium text-[var(--h-ink-soft)]">{b.author}. </span>}
                  <em className="text-[var(--h-ink-soft)]">{b.title}</em>{" "}
                  {b.publisher && <span>, {b.publisher}</span>}
                  {b.year && <span className="text-[var(--h-mute)]">, {b.year}</span>}.
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}

/**
 * Tiny R3F canvas rendering one interactive PortraitFrame.
 * Kept separate so ChapterDetailClient can stay mostly server-rendered HTML.
 */

function MiniPortraitCanvas({ src, label, active }: { src: string; label: string; active: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 40 }}
      shadows
      frameloop="demand"
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 4]} color="#e8c988" intensity={2} />
      <pointLight position={[-3, 2, 4]} color="#f3e9d2" intensity={1.4} />
      <AmbientParticles count={60} />
      <group
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <PortraitFrame src={src} label={label} width={2.9} active={active} />
      </group>
    </Canvas>
  );
}
