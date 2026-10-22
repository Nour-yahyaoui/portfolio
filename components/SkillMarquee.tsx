import Link from "next/link";
import type { IconType } from "react-icons";
import {
  SiActix, SiAndroid, SiDebian, SiDocker, SiExpo, SiExpress, SiFastapi, SiFigma,
  SiFramer, SiGit, SiGithub, SiGithubactions, SiGnubash, SiHtml5, SiJavascript,
  SiLinux, SiNeon, SiNextdotjs, SiNodedotjs, SiOllama, SiPhp, SiPostgresql,
  SiPrometheus, SiPydantic, SiPytest, SiPython, SiQwen, SiRadixui, SiReact,
  SiReactquery, SiRedux, SiRust, SiSqlite, SiSwift, SiTailwindcss, SiTokio,
  SiTypescript, SiVercel, SiVite, SiXfce,
} from "react-icons/si";
import { showcaseSkills } from "@/lib/skills";
import type { ShowcaseSkill } from "@/lib/skills";

/**
 * Skills marquee — a normal horizontal animation, deliberately boring tech:
 * pure CSS `transform` keyframes (GPU-composited), zero client JavaScript,
 * zero rAF. Rows scroll in alternating directions, pause on hover/focus,
 * and become a plain scrollable strip under prefers-reduced-motion.
 * It replaced a 3D sphere that was too heavy on low-end devices.
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

const TIER_DOT: Record<ShowcaseSkill["tier"], string> = {
  Core: "bg-accent",
  Strong: "bg-ink",
  Toolkit: "bg-mute",
};

function glyphColor(skill: ShowcaseSkill) {
  // Near-white brand marks (Next.js, GitHub…) would vanish on the light
  // paper surface — ink adapts to both themes automatically.
  return skill.color.toUpperCase() === "#FFFFFF" ? "var(--ink)" : skill.color;
}

function SkillGlyph({ skill, size = 22 }: { skill: ShowcaseSkill; size?: number }) {
  if (skill.icon.startsWith("mono:")) {
    return (
      <span
        aria-hidden="true"
        className="font-mono font-bold leading-none"
        style={{ color: glyphColor(skill), fontSize: size * 0.68 }}
      >
        {skill.icon.slice(5)}
      </span>
    );
  }
  const Icon = ICONS[skill.icon];
  return Icon ? <Icon size={size} color={glyphColor(skill)} aria-hidden="true" /> : null;
}

function SkillChip({
  skill,
  decorative = false,
}: {
  skill: ShowcaseSkill;
  /** The duplicated loop copy: hidden from AT and out of the tab order. */
  decorative?: boolean;
}) {
  const chipClass =
    "inline-flex min-h-12 shrink-0 items-center gap-2.5 rounded-[2px] border border-line bg-paper px-4 transition-colors hover:border-accent";
  const content = (
    <>
      <span className="grid h-7 w-7 shrink-0 place-items-center">
        <SkillGlyph skill={skill} />
      </span>
      <span className="whitespace-nowrap text-sm font-medium text-ink">{skill.name}</span>
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${TIER_DOT[skill.tier]}`} aria-hidden="true" />
      <span className="sr-only">
        — {skill.area}, {skill.tier}. Proof: {skill.proof.label}
      </span>
    </>
  );

  if (skill.proof.href.startsWith("http")) {
    return (
      <a
        href={skill.proof.href}
        target="_blank"
        rel="noopener noreferrer"
        className={chipClass}
        tabIndex={decorative ? -1 : undefined}
        aria-hidden={decorative || undefined}
      >
        {content}
      </a>
    );
  }
  return (
    <Link
      href={skill.proof.href}
      className={chipClass}
      tabIndex={decorative ? -1 : undefined}
      aria-hidden={decorative || undefined}
    >
      {content}
    </Link>
  );
}

function MarqueeRow({ skills, reverse = false }: { skills: ShowcaseSkill[]; reverse?: boolean }) {
  const duration = Math.round(skills.length * 3.6);
  return (
    <div className="skill-marquee">
      <div
        className={`skill-marquee-track ${reverse ? "skill-marquee-track--reverse" : ""}`}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {[false, true].map((decorative) => (
          <div key={String(decorative)} className="skill-marquee-group" aria-hidden={decorative || undefined}>
            {skills.map((skill) => (
              <SkillChip key={skill.id} skill={skill} decorative={decorative} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Round-robin so every row mixes areas and tiers instead of reading like a list. */
function intoRows(skills: ShowcaseSkill[], rows: number): ShowcaseSkill[][] {
  const out: ShowcaseSkill[][] = Array.from({ length: rows }, () => []);
  skills.forEach((skill, i) => out[i % rows].push(skill));
  return out;
}

export default function SkillMarquee({ variant = "full" }: { variant?: "full" | "compact" }) {
  const compact = variant === "compact";
  const rows = intoRows(showcaseSkills, compact ? 2 : 4);

  return (
    <div className="border border-line bg-surface">
      {!compact && (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line px-4 py-3 sm:px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
            Hover to pause · Click a skill for its proof
          </p>
          <ul className="ml-auto flex flex-wrap items-center gap-x-5 gap-y-1" aria-label="Tier legend">
            {(Object.keys(TIER_DOT) as ShowcaseSkill["tier"][]).map((tier) => (
              <li key={tier} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-mute">
                <span className={`h-1.5 w-1.5 rounded-full ${TIER_DOT[tier]}`} aria-hidden="true" />
                {tier}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={`flex flex-col ${compact ? "gap-3 py-5" : "gap-3.5 py-6"}`}>
        {rows.map((rowSkills, i) => (
          <MarqueeRow key={i} skills={rowSkills} reverse={i % 2 === 1} />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-line px-4 py-3 sm:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
          Pure CSS animation · No JavaScript
        </p>
        <p className="tnum font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
          {showcaseSkills.length} skills
        </p>
      </div>
    </div>
  );
}
