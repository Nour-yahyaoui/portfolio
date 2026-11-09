"use client";

import EmeraldCanvas from "./EmeraldCanvas";
import { StackPoints } from "./StackConstellation";
import { ParticleDrift } from "./scene/artifacts";
import { skillAreas, showcaseSkills, type SkillArea } from "@/lib/skills";

const AREA_COLOR: Record<SkillArea, string> = {
  Frontend: "#a7f3d0",
  "Backend & APIs": "#34d399",
  "Rust & Systems": "#22d3ee",
  "AI & Agents": "#5eead4",
  "Mobile & Desktop": "#7dd3fc",
  "Craft & DevOps": "#99f6e4",
};

export default function StackOrbit() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
      <div className="em-panel relative overflow-hidden">
        <div className="relative aspect-square w-full">
          <EmeraldCanvas
            className="absolute inset-0 h-full w-full"
            camera={{ position: [0, 0, 6.6], fov: 46 }}
            label={`A rotating sphere of ${showcaseSkills.length} skills, grouped by area`}
          >
            <StackPoints />
            <ParticleDrift count={180} spread={14} depth={14} />
          </EmeraldCanvas>
        </div>
        <p className="border-t border-line px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
          {showcaseSkills.length} skills · distance from the core = depth of use
        </p>
      </div>

      <div>
        <p className="em-eyebrow">Constellation</p>
        <h3 className="em-h3 mt-3 text-2xl text-ink">
          One point per tool, placed by how much I lean on it.
        </h3>
        <p className="mt-3 text-[15px] leading-7 text-mute">
          Core tools orbit closest because they show up in nearly every build
          (React, TypeScript, PostgreSQL, Rust, Python). Toolkit items sit at the
          rim — real, used, but called on for specific jobs.
        </p>

        <ul className="mt-6 space-y-3">
          {skillAreas.map((area) => {
            const items = showcaseSkills.filter((skill) => skill.area === area.name);
            const core = items.filter((skill) => skill.tier === "Core");
            return (
              <li key={area.name} className="border-l-2 pl-4" style={{ borderColor: AREA_COLOR[area.name] }}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="text-sm font-semibold text-ink">{area.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-mute">
                    {items.length} tools · {core.length} core
                  </p>
                </div>
                <p className="mt-1 text-[13px] leading-6 text-mute">{area.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
