"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiActix, SiAndroid, SiDebian, SiDocker, SiExpo, SiExpress, SiFastapi, SiFigma,
  SiFramer, SiGit, SiGithub, SiGithubactions, SiGnubash, SiHtml5, SiJavascript,
  SiLinux, SiNeon, SiNextdotjs, SiNodedotjs, SiOllama, SiPhp, SiPostgresql,
  SiPrometheus, SiPydantic, SiPytest, SiPython, SiQwen, SiRadixui, SiReact,
  SiReactquery, SiRedux, SiRust, SiSqlite, SiSwift, SiTailwindcss, SiTokio,
  SiTypescript, SiVercel, SiVite, SiXfce,
} from "react-icons/si";
import { constellations, universeSkills } from "@/lib/skills";
import type { Constellation, UniverseSkill } from "@/lib/skills";

/**
 * The Skills Universe — a hand-rolled 3D sphere (no WebGL, no three.js):
 * 44 skill icons sit on a Fibonacci sphere around the portrait core.
 * A rAF loop rotates the sphere and writes transforms directly to the DOM
 * nodes (perspective scale, depth opacity, z-index), so React only
 * re-renders on interaction. Drag to spin with inertia; tap a planet for
 * its story. Honours prefers-reduced-motion, pauses offscreen / on focus.
 */

const ICONS: Record<string, IconType> = {
  react: SiReact, nextjs: SiNextdotjs, typescript: SiTypescript, javascript: SiJavascript,
  tailwind: SiTailwindcss, vite: SiVite, html5: SiHtml5, framer: SiFramer, radix: SiRadixui,
  nodejs: SiNodedotjs, express: SiExpress, python: SiPython, fastapi: SiFastapi, php: SiPhp,
  postgresql: SiPostgresql, neon: SiNeon, rust: SiRust, actix: SiActix, tokio: SiTokio,
  sqlite: SiSqlite, debian: SiDebian, linux: SiLinux, bash: SiGnubash, ollama: SiOllama,
  qwen: SiQwen, pydantic: SiPydantic, prometheus: SiPrometheus, pytest: SiPytest,
  expo: SiExpo, android: SiAndroid, swift: SiSwift, xfce: SiXfce, git: SiGit,
  github: SiGithub, docker: SiDocker, vercel: SiVercel, actions: SiGithubactions,
  figma: SiFigma, redux: SiRedux, tanstack: SiReactquery,
};

function SkillGlyph({ skill, size = 24 }: { skill: UniverseSkill; size?: number }) {
  if (skill.icon.startsWith("mono:")) {
    return (
      <span
        aria-hidden="true"
        className="font-mono font-bold leading-none"
        style={{ color: skill.color, fontSize: size * 0.72 }}
      >
        {skill.icon.slice(5)}
      </span>
    );
  }
  const Icon = ICONS[skill.icon];
  return Icon ? <Icon size={size} color={skill.color} aria-hidden="true" /> : null;
}

const TIER_SIZE: Record<UniverseSkill["tier"], number> = { Core: 56, Strong: 49, Toolkit: 43 };

/** Deterministic PRNG so the starfield is identical on server and client. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function SkillUniverse({ variant = "full" }: { variant?: "full" | "compact" }) {
  const compact = variant === "compact";
  const [activeId, setActiveId] = useState<string>("rust");
  const [filter, setFilter] = useState<Constellation | "All">("All");
  const [paused, setPaused] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLButtonElement>());
  const sizeRef = useRef({ w: 800, h: 560 });
  const rotRef = useRef({ x: 0.42, y: 0.6 });
  const velRef = useRef({ x: 0, y: 0.0032 });
  const dragRef = useRef<null | { px: number; py: number }>(null);
  const runningRef = useRef(true);
  const focusHoldRef = useRef(false);
  const filterRef = useRef<Constellation | "All">("All");
  const pausedRef = useRef(false);
  filterRef.current = filter;
  pausedRef.current = paused;

  /** Evenly spread points on a sphere (Fibonacci lattice). */
  const points = useMemo(() => {
    const n = universeSkills.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    return universeSkills.map((skill, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      return { skill, x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });
  }, []);

  const stars = useMemo(() => {
    const rand = mulberry32(20261022);
    return Array.from({ length: 110 }, (_, i) => ({
      id: i,
      left: rand() * 100,
      top: rand() * 100,
      size: rand() < 0.85 ? 1 : 2,
      delay: rand() * 4,
      duration: 2.4 + rand() * 3.4,
    }));
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const resize = new ResizeObserver(() => {
      sizeRef.current = { w: stage.clientWidth, h: stage.clientHeight };
    });
    resize.observe(stage);
    sizeRef.current = { w: stage.clientWidth, h: stage.clientHeight };

    const visibility = new IntersectionObserver(
      ([entry]) => { runningRef.current = entry.isIntersecting; },
      { threshold: 0.05 },
    );
    visibility.observe(stage);

    const layout = () => {
      const { w, h } = sizeRef.current;
      const cx = w / 2, cy = h / 2;
      const radius = Math.min(w, h) * 0.365;
      const fov = radius * 3.1;
      const { x: rx, y: ry } = rotRef.current;
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const activeFilter = filterRef.current;

      for (const p of points) {
        const el = nodeRefs.current.get(p.skill.id);
        if (!el) continue;
        // rotate around Y, then X
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const depth = (z2 + 1) / 2; // 0 back → 1 front
        const perspective = fov / (fov - z2 * radius);
        const sx = cx + x1 * radius * perspective;
        const sy = cy + y2 * radius * perspective;
        const scale = (0.5 + depth * 0.62) * perspective;
        const dimmed = activeFilter !== "All" && p.skill.constellation !== activeFilter;
        el.style.transform = `translate(-50%,-50%) translate(${sx.toFixed(1)}px,${sy.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        el.style.opacity = String((0.16 + depth * 0.84) * (dimmed ? 0.13 : 1));
        el.style.zIndex = String(100 + Math.round(depth * 800));
        el.style.pointerEvents = depth < 0.18 ? "none" : "auto";
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    layout();
    if (reduced) {
      return () => { resize.disconnect(); visibility.disconnect(); };
    }

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!runningRef.current || document.hidden) return;
      if (!pausedRef.current && !focusHoldRef.current && !dragRef.current) {
        rotRef.current.y += velRef.current.y;
        rotRef.current.x += velRef.current.x;
        // ease spin back toward the gentle cruise speed & a level tilt
        velRef.current.y += (0.0032 - velRef.current.y) * 0.012;
        velRef.current.x *= 0.96;
        rotRef.current.x += (0.42 - rotRef.current.x) * 0.004;
      }
      layout();
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); resize.disconnect(); visibility.disconnect(); };
  }, [points]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    dragRef.current = { px: e.clientX, py: e.clientY };
    stageRef.current?.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = e.clientX - drag.px, dy = e.clientY - drag.py;
    drag.px = e.clientX; drag.py = e.clientY;
    rotRef.current.y += dx * 0.0052;
    rotRef.current.x = Math.max(-1.1, Math.min(1.1, rotRef.current.x + dy * 0.0052));
    velRef.current = { y: dx * 0.00028, x: dy * 0.00028 };
  };
  const endDrag = () => { dragRef.current = null; };

  const active = universeSkills.find((s) => s.id === activeId) ?? universeSkills[0];
  const stageHeight = compact ? "h-[400px] sm:h-[460px]" : "h-[470px] sm:h-[560px] lg:h-[600px]";

  return (
    <div className="universe-panel relative overflow-hidden border border-line">
      {/* Controls (full variant) */}
      {!compact && (
        <div className="relative z-[1000] flex flex-wrap items-center gap-2 border-b border-white/10 px-4 py-3 sm:px-6">
          <p className="mr-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
            Constellations
          </p>
          {(["All", ...constellations.map((c) => c.name)] as const).map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
              className={`min-h-11 rounded-[2px] border px-3 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors sm:min-h-9 ${
                filter === name
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                  : "border-white/15 text-white/65 hover:border-white/40 hover:text-white"
              }`}
            >
              {name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="ml-auto inline-flex min-h-11 items-center gap-2 rounded-[2px] border border-white/15 px-3 font-mono text-[10px] uppercase tracking-[0.12em] text-white/65 transition-colors hover:border-white/40 hover:text-white sm:min-h-9"
          >
            {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
      )}

      {/* Stage */}
      <div
        ref={stageRef}
        role="group"
        aria-label="Interactive 3D skills universe. Drag to rotate, or tab through the skill planets and press Enter for details."
        className={`relative w-full cursor-grab touch-none select-none active:cursor-grabbing ${stageHeight}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onFocus={() => { focusHoldRef.current = true; }}
        onBlur={() => { focusHoldRef.current = false; }}
      >
        {stars.map((star) => (
          <span
            key={star.id}
            aria-hidden="true"
            className="universe-star"
            style={{
              left: `${star.left}%`, top: `${star.top}%`,
              width: star.size, height: star.size,
              animationDelay: `${star.delay}s`, animationDuration: `${star.duration}s`,
            }}
          />
        ))}

        {/* Orbit rings */}
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]" style={{ transform: "translate(-50%,-50%) rotateX(72deg)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[88%] w-[88%] rounded-full border border-white/[0.05]" style={{ transform: "translate(-50%,-50%) rotateX(64deg) rotateZ(-18deg)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[62%] w-[62%] rounded-full border border-white/[0.06]" style={{ transform: "translate(-50%,-50%) rotateY(68deg) rotateZ(24deg)" }} />

        {/* Core — the sun of this little system */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-[500] -translate-x-1/2 -translate-y-1/2"
        >
          <span className="universe-core-ring absolute inset-0 rounded-full border border-[var(--accent)]" />
          <div className={`relative overflow-hidden rounded-full border-2 border-[var(--accent)] ${compact ? "h-[74px] w-[74px]" : "h-[92px] w-[92px] sm:h-[108px] sm:w-[108px]"}`}>
            <Image
              src="/nour-portrait.jpg"
              alt=""
              fill
              sizes="108px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Planets */}
        {points.map(({ skill }) => {
          const size = TIER_SIZE[skill.tier] * (compact ? 0.88 : 1);
          const isActive = skill.id === activeId;
          return (
            <button
              key={skill.id}
              ref={(el) => {
                if (el) nodeRefs.current.set(skill.id, el);
                else nodeRefs.current.delete(skill.id);
              }}
              type="button"
              aria-pressed={isActive}
              aria-label={`${skill.name} — ${skill.constellation}. Show details.`}
              title={skill.name}
              onClick={() => setActiveId(skill.id)}
              onMouseEnter={() => setActiveId(skill.id)}
              className="absolute left-0 top-0 flex w-[76px] flex-col items-center gap-1 will-change-transform"
              style={{ opacity: 0 }}
            >
              <span
                className={`grid place-items-center rounded-full border backdrop-blur-[3px] transition-colors ${
                  isActive
                    ? "border-[var(--accent)] bg-white/[0.14]"
                    : "border-white/[0.16] bg-white/[0.06]"
                }`}
                style={{ width: size, height: size }}
              >
                <SkillGlyph skill={skill} size={Math.round(size * 0.46)} />
              </span>
              <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.08em] text-white/85 [text-shadow:0_1px_6px_rgba(0,0,0,0.9)]">
                {skill.name}
              </span>
            </button>
          );
        })}

        <p className="pointer-events-none absolute bottom-3 left-4 z-[1000] font-mono text-[10px] uppercase tracking-[0.14em] text-white/45 sm:left-6">
          Drag to spin · Tap a planet
        </p>
        <p className="tnum pointer-events-none absolute bottom-3 right-4 z-[1000] font-mono text-[10px] uppercase tracking-[0.14em] text-white/45 sm:right-6">
          {universeSkills.length} skills in orbit
        </p>
      </div>

      {/* Detail readout */}
      {compact ? (
        <div className="relative z-[1000] flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/10 px-4 py-4 sm:px-6">
          <p aria-live="polite" className="min-w-0 text-sm leading-6 text-white/75">
            <strong className="font-display text-lg font-normal text-white">{active.name}</strong>
            <span className="text-white/40"> — </span>
            <span className="line-clamp-1 inline sm:line-clamp-none">{active.blurb}</span>
          </p>
          <Link
            href="/skills"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 border-b border-[var(--accent)] font-mono text-[11px] uppercase tracking-[0.14em] text-white transition-colors hover:text-[var(--accent)]"
          >
            Enter the full universe <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <div aria-live="polite" className="relative z-[1000] grid gap-5 border-t border-white/10 px-4 py-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-7 sm:px-6">
          <span className="grid h-16 w-16 place-items-center rounded-full border border-white/15 bg-white/[0.06]">
            <SkillGlyph skill={active} size={30} />
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
              {active.constellation} <span className="px-1 text-[var(--accent)]">·</span> {active.tier}
            </p>
            <h3 className="mt-1.5 font-display text-2xl font-normal leading-tight text-white">{active.name}</h3>
            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-white/70">{active.blurb}</p>
          </div>
          <div className="sm:text-right">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">Proof</p>
            {active.proof.href.startsWith("http") ? (
              <a
                href={active.proof.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center gap-2 border-b border-[var(--accent)] text-sm font-medium text-white transition-colors hover:text-[var(--accent)]"
              >
                {active.proof.label} <ArrowRight size={14} aria-hidden="true" />
              </a>
            ) : (
              <Link
                href={active.proof.href}
                className="mt-2 inline-flex min-h-11 items-center gap-2 border-b border-[var(--accent)] text-sm font-medium text-white transition-colors hover:text-[var(--accent)]"
              >
                {active.proof.label} <ArrowRight size={14} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
