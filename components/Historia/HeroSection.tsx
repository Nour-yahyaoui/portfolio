"use client";

import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Link from "next/link";
import { AmbientParticles } from "./AmbientParticles";
import { PortraitFrame } from "./PortraitFrame";
import { historiaChapters } from "@/lib/historia";

const PORTRAITS = [
  { slug: "amir-timur", label: "Amir Timur (Tamerlane)", src: "/historia/portraits/01-timur.jpg" },
  { slug: "shah-ismail-i", label: "Shah Ismail I", src: "/historia/portraits/02-ismail.jpg" },
  { slug: "alp-arslan", label: "Alp Arslan", src: "/historia/portraits/03-alp-arslan.jpg" },
  { slug: "nader-shah", label: "Nader Shah Afshar", src: "/historia/portraits/04-nader-shah.jpg" },
  { slug: "bayezid-i", label: "Bayezid I (Yıldırım)", src: "/historia/portraits/05-bayezid-i.jpg" },
];

/**
 * HISTORIA Hero — cinematic 3D composition of the five historical portraits
 * arranged as monumental framed artifacts.
 *
 * The 3D canvas sits behind an accessible HTML overlay (title, subtitle,
 * description, entry link). On low-performance devices or
 * prefers-reduced-motion, a lightweight 2D fallback renders the portraits
 * as CSS cards instead of WebGL.
 */

export function HeroSection({
  onSelectChapter,
  activeSlug,
}: {
  onSelectChapter: (slug: string) => void;
  activeSlug?: string;
}) {
  const [use3D, setUse3D] = useState(true);

  useEffect(() => {
    // Capability check: low-end mobile, reduced motion, or limited memory
    // fall back to the 2D experience so the page stays fast and accessible.
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowEnd =
      typeof navigator !== "undefined" &&
      navigator.hardwareConcurrency &&
      navigator.hardwareConcurrency < 4;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    if (reduced || lowEnd || isMobile) {
      setUse3D(false);
    }
  }, []);

  if (!use3D) {
    return <HeroFallback onSelectChapter={onSelectChapter} activeSlug={activeSlug} />;
  }

  return (
    <section className="historia relative w-full h-[70vh] min-h-[600px] overflow-hidden bg-[var(--h-bg-deep)]" id="historia-hero">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          shadows
          camera={{ position: [0, 0, 7.5], fov: 45 }}
          frameloop="demand"
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.35} color="#ffffff" />
          <spotLight
            position={[-4, 3, 4]}
            color="#e8c988"
            intensity={2.2}
            angle={0.45}
            penumbra={0.6}
            distance={14}
            castShadow
          />
          <spotLight
            position={[4, 2, 4]}
            color="#f3e9d2"
            intensity={1.6}
            angle={0.4}
            penumbra={0.5}
            distance={12}
            castShadow
          />
          <spotLight
            position={[0, -1, 3]}
            color="#8f7345"
            intensity={1.0}
            angle={0.5}
            penumbra={0.7}
            distance={10}
            castShadow
          />
          <AmbientParticles count={100} />

          <Suspense fallback={null}>
            {/* Central elevated portrait. */}
            <PortraitFrame
              src={PORTRAITS[0].src}
              label={PORTRAITS[0].label}
              width={3.1}
              active={activeSlug === PORTRAITS[0].slug}
              onClick={() => onSelectChapter(PORTRAITS[0].slug)}
            />

            {/* Flanking portraits in an arc. */}
            <group position={[-3.6, -0.6, -1.2]} rotation={[0, 0.25, 0]}>
              <PortraitFrame
                src={PORTRAITS[1].src}
                label={PORTRAITS[1].label}
                width={2.1}
                active={activeSlug === PORTRAITS[1].slug}
                onClick={() => onSelectChapter(PORTRAITS[1].slug)}
              />
            </group>
            <group position={[3.6, -0.6, -1.2]} rotation={[0, -0.25, 0]}>
              <PortraitFrame
                src={PORTRAITS[2].src}
                label={PORTRAITS[2].label}
                width={2.1}
                active={activeSlug === PORTRAITS[2].slug}
                onClick={() => onSelectChapter(PORTRAITS[2].slug)}
              />
            </group>
            <group position={[-2.6, -1.9, -2.4]} rotation={[0, 0.5, 0.05]}>
              <PortraitFrame
                src={PORTRAITS[3].src}
                label={PORTRAITS[3].label}
                width={1.8}
                active={activeSlug === PORTRAITS[3].slug}
                onClick={() => onSelectChapter(PORTRAITS[3].slug)}
              />
            </group>
            <group position={[2.6, -1.9, -2.4]} rotation={[0, -0.5, 0.05]}>
              <PortraitFrame
                src={PORTRAITS[4].src}
                label={PORTRAITS[4].label}
                width={1.8}
                active={activeSlug === PORTRAITS[4].slug}
                onClick={() => onSelectChapter(PORTRAITS[4].slug)}
              />
            </group>
          </Suspense>

          <OrbitControls enablePan={false} enableZoom={false} autoRotate={true} autoRotateSpeed={0.6} />
        </Canvas>
      </div>

      {/* Accessible HTML overlay — title, subtitle, description, entry point. */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <p className="label-mono text-[var(--h-gold-bright)] mb-3 tracking-[0.2em]">
            HISTORIA
          </p>
          <h1 className="h-display text-[var(--h-ink)] mb-4">HISTORIA</h1>
          <p className="text-[var(--h-gold)] text-lg sm:text-xl font-medium leading-relaxed mb-6 max-w-xl">
            &ldquo;Lessons from the people who shaped history.&rdquo;
          </p>
          <p className="text-[var(--h-ink-soft)] text-base sm:text-lg leading-7 mb-10 max-w-2xl">
            An exploration of ambition, determination, leadership, strategy, and
            the extraordinary individuals who changed the course of history.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/historia/chapters"
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2 border border-[var(--h-gold-dim)] bg-transparent text-[var(--h-ink-soft)] text-sm font-semibold rounded-[2px] transition-colors hover:bg-[var(--h-gold-dim)] hover:text-[var(--h-bg-deep)]"
            >
              Explore the chapters
            </Link>
            <a
              href="#historia-timeline"
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2 border border-[var(--h-rule)] bg-transparent text-[var(--h-mute)] text-sm font-semibold rounded-[2px] transition-colors hover:border-[var(--h-gold-dim)] hover:text-[var(--h-gold-bright)]"
            >
              View the timeline
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroFallback({
  onSelectChapter,
  activeSlug,
}: {
  onSelectChapter: (slug: string) => void;
  activeSlug?: string;
}) {
  return (
    <section className="historia relative w-full min-h-[600px] overflow-hidden bg-[var(--h-bg-deep)]" id="historia-hero">
      {/* Lightweight CSS grid of portraits — same content, no WebGL. */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {PORTRAITS.map((p) => {
            const Chapter = historiaChapters.find((c) => c.slug === p.slug);
            return (
              <article
                key={p.slug}
                onClick={() => onSelectChapter(p.slug)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectChapter(p.slug);
                  }
                }}
                role="button"
                tabIndex={0}
                className={`relative group cursor-pointer rounded-[2px] border border-[var(--h-rule)] bg-[var(--h-surface)] overflow-hidden transition-all ${
                  activeSlug === p.slug
                    ? "border-[var(--h-gold-bright)] shadow-[0_0_20px_rgba(197,160,89,0.25)]"
                    : "hover:border-[var(--h-gold-dim)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
                }`}
              >
                <div className="aspect-[3/4] overflow-hidden bg-[var(--h-bg-deep)]">
                  <img
                    src={p.src}
                    alt={p.label}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="label-mono mb-1 text-[var(--h-gold-dim)]">{Chapter?.theme}</p>
                  <h3 className="text-[var(--h-ink)] font-semibold text-lg leading-snug">{p.label}</h3>
                  <p className="mt-2 text-[var(--h-mute)] text-sm leading-6">
                    {Chapter?.period}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Title overlay at bottom for the fallback — keeps the hero recognizable. */}
      <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 bg-gradient-to-t from-[var(--h-bg-deep)] to-transparent pointer-events-none">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="label-mono text-[var(--h-gold-bright)] mb-3 tracking-[0.2em]">HISTORIA</p>
          <h1 className="h-display text-[var(--h-ink)] mb-4">HISTORIA</h1>
          <p className="text-[var(--h-gold)] text-lg sm:text-xl font-medium leading-relaxed mb-6 max-w-xl">
            &ldquo;Lessons from the people who shaped history.&rdquo;
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/historia/chapters"
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2 border border-[var(--h-gold-dim)] bg-transparent text-[var(--h-ink-soft)] text-sm font-semibold rounded-[2px] transition-colors hover:bg-[var(--h-gold-dim)] hover:text-[var(--h-bg-deep)]"
            >
              Explore the chapters
            </Link>
            <a
              href="#historia-timeline"
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2 border border-[var(--h-rule)] bg-transparent text-[var(--h-mute)] text-sm font-semibold rounded-[2px] transition-colors hover:border-[var(--h-gold-dim)] hover:text-[var(--h-gold-bright)]"
            >
              View the timeline
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
