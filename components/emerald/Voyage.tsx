"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
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
import { ArrowDown, ArrowRight, Mail } from "lucide-react";
import { ACTS, CameraRig, PALETTE, VoyageWorld, type Quality } from "./scene/voyage";
import { AUTHOR_EMAIL } from "@/lib/site";

const HINTS: Record<string, string> = {
  awakening: "Scroll to begin the flight ↓",
  tunnel: "Speed is the point — keep going.",
  gallery: "Click any monolith to open its case study.",
  network: "Every pulse is a request that was checked before it was answered.",
  forge: "Loops, strands and edge cases, all at once.",
  core: "End of the line — the work continues below.",
};

/**
 * THE VOYAGE — a sticky, scroll-driven flight through six chapters.
 *
 * The section is tall (760vh); the canvas sticks to the viewport and scroll
 * position alone drives the camera along a path. No scroll-jacking: the page
 * scrolls normally, the flight follows it, and the captions tell a story that
 * starts on a crystal and returns to the same crystal at the end.
 */
export default function Voyage() {
  const wrap = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  const [stage, setStage] = useState({ chapter: 0, beat: 0 });
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
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
  // render loop); React state is touched only when the chapter, the beat, or
  // the opening/ending card actually changes.
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

      let chapter = 0;
      for (let i = 0; i < ACTS.length; i++) if (p >= ACTS[i].at) chapter = i;
      let beat = 0;
      ACTS[chapter].beats.forEach((b, i) => {
        if (p >= b.from) beat = i;
      });

      setStage((current) =>
        current.chapter === chapter && current.beat === beat ? current : { chapter, beat },
      );
      setStarted(p > 0.012);
      setEnded(p > 0.965);
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

  const act = ACTS[stage.chapter];
  const beat = act.beats[stage.beat];
  const height = reduced ? "100vh" : "760vh";

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
                  <Noise opacity={0.03} premultiply blendFunction={BlendFunction.ADD} />
                </EffectComposer>
              ) : null}
            </Canvas>
          ) : null}

          {/* ------------------------------------------------------------ HUD */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="max-w-sm">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                  The Voyage · {String(stage.chapter + 1).padStart(2, "0")}/
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
                      i === stage.chapter ? "text-[var(--accent)]" : "text-[#3d6b5c]"
                    }`}
                  >
                    {item.title}
                    <span
                      className={`inline-block h-px transition-all ${
                        i === stage.chapter ? "w-8 bg-[var(--accent)]" : "w-3 bg-[#234a3d]"
                      }`}
                      aria-hidden="true"
                    />
                  </li>
                ))}
              </ol>
            </div>

            {/* The story beat for this part of the chapter. */}
            <div className="mx-auto w-full max-w-xl">
              <div
                key={beat.text}
                className="rounded-xl border border-[rgba(52,211,153,0.18)] bg-[rgba(4,19,15,0.55)] px-4 py-3 backdrop-blur-sm"
                style={{ animation: "em-beat-in 0.5s ease-out" }}
              >
                <p className="text-[14px] leading-7 text-[#d8f5e9]">{beat.text}</p>
              </div>

              <div className="mt-4 flex items-center gap-1.5">
                {ACTS.map((item, i) => (
                  <span
                    key={item.id}
                    className={`h-[3px] flex-1 rounded-full transition-colors ${
                      i <= stage.chapter ? "bg-[var(--accent)]" : "bg-[#123a2d]"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[#7fae9c]">
                {HINTS[act.id]}
              </p>
            </div>
          </div>

          {/* -------------------------------------------------- opening card */}
          <div
            className={`pointer-events-none absolute inset-0 grid place-items-center px-6 transition-opacity duration-700 ${
              started ? "opacity-0" : "opacity-100"
            }`}
            aria-hidden={started}
          >
            <div className="max-w-lg text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]">
                Chapter one of six
              </p>
              <p className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                The Voyage
              </p>
              <p className="mt-4 text-[15px] leading-7 text-[#8fb9a9]">
                A flight through how this work is built — from a crystal with a
                hard perimeter, out through the systems and the connections
                between them, and back to the centre.
              </p>
              <p className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white">
                Scroll to begin
                <ArrowDown size={13} aria-hidden="true" />
              </p>
            </div>
          </div>

          {/* ---------------------------------------------------- ending card */}
          <div
            className={`absolute inset-0 grid place-items-center px-6 transition-opacity duration-700 ${
              ended ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={!ended}
          >
            <div className="max-w-lg text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]">
                End of the flight
              </p>
              <p className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                That was the shape of it.
              </p>
              <p className="mt-4 text-[15px] leading-7 text-[#8fb9a9]">
                Everything you just flew past is written up in full below —
                twenty-one projects, each with a case study, a repository and a
                live build where one exists.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <a href="#work" className="em-btn em-btn--primary">
                  See the work
                  <ArrowDown size={16} aria-hidden="true" />
                </a>
                <a href={`mailto:${AUTHOR_EMAIL}`} className="em-btn em-btn--ghost">
                  <Mail size={16} aria-hidden="true" />
                  Start a conversation
                </a>
                <Link href="/classic" className="em-btn em-btn--ghost">
                  Switch edition
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
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

      {/* What a screen reader gets instead of the flight. */}
      <p className="sr-only">
        An animated flight through six scenes: a faceted emerald crystal, a
        tunnel of glowing gates, a gallery of twelve project monoliths, a
        neural network of wired nodes with signals running between them, a forge
        of looping geometry, and a converging core wrapped in its own network.
        The same projects are listed in full further down this page.
      </p>
    </section>
  );
}
