import { ArrowUpRight, Check, ExternalLink } from "lucide-react";
import ProjectArtwork from "@/components/ProjectArtwork";
import type { Project, ProjectAccent, ProjectLink } from "@/lib/types";

const accentStyles: Record<
  ProjectAccent,
  { badge: string; border: string; primary: string; soft: string; dot: string }
> = {
  orange: {
    badge: "border-orange-300/20 bg-orange-300/10 text-orange-200",
    border: "hover:border-orange-300/30",
    primary: "bg-orange-300 text-[#20140d] hover:bg-orange-200",
    soft: "border-orange-300/20 bg-orange-300/[0.06] text-orange-100/80",
    dot: "bg-orange-300",
  },
  blue: {
    badge: "border-sky-300/20 bg-sky-300/10 text-sky-200",
    border: "hover:border-sky-300/30",
    primary: "bg-sky-300 text-[#081723] hover:bg-sky-200",
    soft: "border-sky-300/20 bg-sky-300/[0.06] text-sky-100/80",
    dot: "bg-sky-300",
  },
  cyan: {
    badge: "border-cyan-300/20 bg-cyan-300/10 text-cyan-200",
    border: "hover:border-cyan-300/30",
    primary: "bg-cyan-300 text-[#061719] hover:bg-cyan-200",
    soft: "border-cyan-300/20 bg-cyan-300/[0.06] text-cyan-100/80",
    dot: "bg-cyan-300",
  },
  violet: {
    badge: "border-violet-300/20 bg-violet-300/10 text-violet-200",
    border: "hover:border-violet-300/30",
    primary: "bg-violet-300 text-[#170d20] hover:bg-violet-200",
    soft: "border-violet-300/20 bg-violet-300/[0.06] text-violet-100/80",
    dot: "bg-violet-300",
  },
};

function getLinks(project: Project): ProjectLink[] {
  if (project.links) return project.links;

  const links: ProjectLink[] = [];
  if (project.liveDemo) {
    links.push({ label: "Live preview", href: project.liveDemo, variant: "primary" });
  }
  if (project.code && !project.privateCode) {
    links.push({
      label: "Source code",
      href: project.code,
      variant: project.liveDemo ? "secondary" : "primary",
    });
  }
  return links;
}

export default function ProjectCard({ project }: { project: Project }) {
  const accent = accentStyles[project.accent ?? "cyan"];
  const links = getLinks(project);
  const mainLinks = links.filter((link) => link.variant !== "quiet").slice(0, 2);
  const extraLinks = links.filter((link) => link.variant === "quiet");

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[22px] border border-white/[0.09] bg-[#101319] shadow-[0_16px_60px_rgba(0,0,0,0.16)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(0,0,0,0.3)] ${accent.border}`}
    >
      <div className="relative aspect-[1.72] overflow-hidden border-b border-white/[0.08] bg-[#151922]">
        <ProjectArtwork
          artwork={project.artwork}
          title={project.title}
          mainTag={project.mainTag}
          tags={project.tags}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101319]/80 via-transparent to-black/10" />
        <div className="absolute left-4 top-4 flex max-w-[60%] items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.13em] backdrop-blur-md sm:text-[11px] ${accent.badge}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
            {project.mainTag}
          </span>
        </div>
        {(project.status || project.version) && (
          <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-[#080a0d]/70 px-2.5 py-1 text-[10px] text-white/70 backdrop-blur-md sm:text-[11px]">
            {project.status && <span>{project.status}</span>}
            {project.status && project.version && <span className="text-white/25">·</span>}
            {project.version && <span className="font-mono text-white/55">{project.version}</span>}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div>
          <h3 className="text-xl font-semibold tracking-[-0.035em] text-white sm:text-[22px]">
            {project.title}
          </h3>
          <p className="mt-2.5 text-sm leading-6 text-slate-300/75">
            {project.description}
          </p>
        </div>

        {project.highlights && project.highlights.length > 0 && (
          <ul className="mt-5 space-y-2 border-y border-white/[0.07] py-4">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2.5 text-xs leading-5 text-white/65 sm:text-[13px]">
                <Check size={14} strokeWidth={2.4} className="mt-0.5 shrink-0 text-white/45" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-2.5 py-1 text-[10px] leading-none sm:text-[11px] ${
                project.featured ? accent.soft : "border-white/[0.08] bg-white/[0.035] text-slate-300/70"
              }`}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span className="rounded-full border border-white/[0.08] bg-white/[0.035] px-2.5 py-1 text-[10px] leading-none text-slate-400 sm:text-[11px]">
              +{project.tags.length - 5}
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          {mainLinks.map((link, index) => (
            <a
              key={`${link.label}-${link.href}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-4 text-xs font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                (link.variant === "primary" || (!link.variant && index === 0))
                  ? accent.primary
                  : "border border-white/10 bg-white/[0.04] text-white/80 hover:border-white/20 hover:bg-white/[0.08]"
              }`}
            >
              {link.label}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ))}
          {extraLinks.length > 0 && (
            <div className="flex items-center gap-3 px-1 sm:ml-auto">
              {extraLinks.map((link) => (
                <a
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-white/45 transition hover:text-white/80"
                >
                  {link.label}
                  <ExternalLink size={11} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
          {project.privateCode && links.length === 0 && (
            <span className="rounded-full border border-white/10 px-4 py-2.5 text-xs text-white/35">Private source</span>
          )}
        </div>
        {project.note && (
          <p className="mt-3 text-[11px] leading-5 text-white/35">{project.note}</p>
        )}
      </div>
    </article>
  );
}
