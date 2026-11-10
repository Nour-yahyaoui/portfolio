"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ACTS, CameraRig, PALETTE, VoyageWorld, type Quality } from "./scene/voyage";

const HINTS: Record<string, string> = {
  awakening: "Scroll to begin the flight ↓",
  tunnel: "Speed is the point — keep going.",
  gallery: "Click any monolith to open its case study.",
  forge: "Loops, strands and edge cases, all at once.",
  core: "End of the line — the work continues below.",
};

/**
 * THE VOYAGE — a sticky, scroll-driven flight through five 3D acts.
 *
 * The section is tall (760vh); the canvas sticks to the viewport and the
 * scroll position alone drives the camera along a Catmull–Rom path. No
 * scroll-jacking: the page scrolls normally, the flight follows it.
 */
export default function Voyage() {
  const wrap = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [chapter, setChapter] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(true);
  const reduced = useReducedMotion() ?? false;
  const router = useRouter();

  // Navigation is wired here, in the DOM tree, then handed into the scene:
  // a click on a monolith opens that project's case study.
  const openProject = useMemo(
    () => (slug: string) => router.push(`/projects/${slug}`),
    [router],
  );

  const quality: Quality = useMemo(() => {
    if (typeof window === "undefined") return "high";
    const cores = navigator.hardwareConcurrency ?? 4;
    return window.innerWidth < 820 || cores <= 4 ? "low" : "high";
  }, []);

  // Mount the canvas a little before it scrolls into view.
  useEffect(() => {
    const node = wrap.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((entry) => entry.isIntersecting);
        if (hit) setMounted(true);
        setInView(hit);
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // One rAF-throttled scroll reader. Progress goes to a ref (read inside the
  // render loop); only chapter changes touch React state.
  useEffect(() => {
    const node = wrap.current;
    if (!node) return;
    let frame = 0;

    const read = () => {
      frame = 0;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
      progress.current = p;
      if (bar.current) bar.current.style.width = `${p * 100}%`;

      let next = 0;
      for (let i = 0; i < ACTS.length; i++) if (p >= ACTS[i].at) next = i;
      setChapter((current) => (current === next ? current : next));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const act = ACTS[chapter];
  const height = reduced ? "100vh" : "680vh";

  return (
    <section id="voyage" className="relative bg-[#04130f]" aria-labelledby="voyage-title">
      <div ref={wrap} style={{ height }} className="relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {mounted ? (
            <Canvas
              frameloop={reduced ? "demand" : inView ? "always" : "never"}
              dpr={reduced ? 1 : [1, 1.5]}
              camera={{ position: [0, 0, 16], fov: 46, near: 0.1, far: 240 }}
              gl={{
                antialias: quality === "high",
                alpha: false,
                powerPreference: "high-performance",
              }}
              onCreated={({ gl }) => {
                gl.setClearColor(PALETTE.night, 1);
              }}
            >
              <CameraRig progress={progress} reduced={reduced} />
              <VoyageWorld quality={quality} onOpen={openProject} />

              {!reduced ? (
                <EffectComposer multisampling={0}>
                  <Bloom
                    intensity={quality === "high" ? 1.55 : 1.15}
                    luminanceThreshold={0.1}
                    luminanceSmoothing={0.4}
                    mipmapBlur
                    radius={0.85}
                  />
                  <ChromaticAberration
                    offset={[0.0007, 0.0011]}
                    radialModulation
                    modulationOffset={0.45}
                  />
                  <Vignette offset={0.26} darkness={0.78} eskil={false} />
                  <Noise
                    opacity={0.03}
                    premultiply
                    blendFunction={BlendFunction.ADD}
                  />
                </EffectComposer>
              ) : null}
            </Canvas>
          ) : null}

          {/* ------------------------------------------------------------ HUD */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="max-w-sm">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                  The Voyage · {String(chapter + 1).padStart(2, "0")}/
                  {String(ACTS.length).padStart(2, "0")}
                </p>
                <h3
                  id="voyage-title"
                  className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl"
                >
                  {act.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-6 text-[#8fb9a9]">{act.line}</p>
              </div>

              <ol className="hidden flex-col items-end gap-1.5 sm:flex">
                {ACTS.map((item, i) => (
                  <li
                    key={item.id}
                    className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                      i === chapter ? "text-[var(--accent)]" : "text-[#3d6b5c]"
                    }`}
                  >
                    {item.title}
                    <span
                      className={`inline-block h-px transition-all ${
                        i === chapter ? "w-8 bg-[var(--accent)]" : "w-3 bg-[#234a3d]"
                      }`}
                      aria-hidden="true"
                    />
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <div className="mx-auto max-w-md">
                <div className="h-px w-full bg-[#123a2d]">
                  <div
                    ref={bar}
                    className="h-px bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
                    style={{ width: "0%" }}
                  />
                </div>
                <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[#7fae9c]">
                  {HINTS[act.id]}
                </p>
              </div>
            </div>
          </div>

          {/* Edge vignette so the type always sits on the darkest part. */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_45%,rgba(4,19,15,0.75)_100%)]"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* What the screen reader gets instead of the flight. */}
      <p className="sr-only">
        An animated flight through five scenes: a faceted emerald crystal, a
        tunnel of glowing gates, a gallery of twelve project monoliths, a forge
        of looping geometry, and a converging core. The same projects are listed
        in full further down this page.
      </p>
    </section>
  );
}
