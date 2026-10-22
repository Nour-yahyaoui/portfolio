import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project, ProjectLink } from "@/lib/types";

/**
 * A project as an entry in a printed index (Recipe R1 signature element):
 * big tabular number in the left rail, serif title, hairlines instead of
 * cards-and-shadows, mono for data. `variant="row"` is the dense archive form.
 * Every entry links to its case study at /projects/[slug].
 */

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

function CaseStudyLink({ slug }: { slug: string }) {
  return (
    <Link href={`/projects/${slug}`} className="link-rule border-accent font-semibold text-accent">
      Read the case study
      <ArrowRight size={14} aria-hidden="true" />
    </Link>
  );
}

function LinkRow({ project }: { project: Project }) {
  const links = getLinks(project);

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
      <CaseStudyLink slug={project.slug} />
      {links.map((link) => (
        <a
          key={`${link.label}-${link.href}`}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-rule"
        >
          {link.label}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      ))}
      {project.privateCode && links.length === 0 && (
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-mute">
          Private source
        </span>
      )}
    </div>
  );
}

export default function ProjectCard({
  project,
  index = 0,
  variant = "featured",
  className = "",
}: {
  project: Project;
  index?: number;
  variant?: "featured" | "row";
  className?: string;
}) {
  const number = String(index + 1).padStart(2, "0");
  const meta = [project.mainTag, project.status, project.version].filter(Boolean).join(" · ");
  const detailHref = `/projects/${project.slug}`;

  if (variant === "row") {
    return (
      <article className={`grid gap-3 border-b border-line py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-4 ${className}`}>
        <p className="tnum font-display text-2xl leading-none text-mute" aria-hidden="true">
          {number}
        </p>
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg font-semibold leading-snug tracking-[-0.01em] text-ink">
              <Link href={detailHref} className="transition-colors hover:text-accent">
                {project.title}
              </Link>
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-mute">{meta}</p>
          </div>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-mute">{project.description}</p>
          <p className="mt-2 font-mono text-[11px] leading-5 tracking-[0.04em] text-mute">
            {project.tags.join(" · ")}
          </p>
          <div className="mt-1">
            <LinkRow project={project} />
          </div>
          {project.note && <p className="mt-1 text-xs leading-5 text-mute">{project.note}</p>}
        </div>
      </article>
    );
  }

  return (
    <article className={`flex flex-col border border-line bg-surface p-6 sm:p-8 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <p className="tnum font-display text-5xl leading-none text-ink" aria-hidden="true">
          {number}
          <span className="text-accent">.</span>
        </p>
        <p className="pt-1 text-right font-mono text-[11px] uppercase leading-5 tracking-[0.12em] text-mute">
          {project.mainTag}
          {(project.status || project.version) && (
            <>
              <br />
              {[project.status, project.version].filter(Boolean).join(" · ")}
            </>
          )}
        </p>
      </div>

      <h3 className="h-title mt-6 text-ink">
        <Link href={detailHref} className="transition-colors hover:text-accent">
          {project.title}
        </Link>
      </h3>
      <p className="mt-3 text-[15px] leading-7 text-mute">{project.description}</p>

      {project.highlights && project.highlights.length > 0 && (
        <ul className="mt-5 border-t border-linesoft">
          {project.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-baseline gap-3 border-b border-linesoft py-2.5 text-sm leading-6 text-ink last:border-b-0"
            >
              <span className="font-mono text-accent" aria-hidden="true">
                —
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <div className="border-t border-linesoft pt-2">
          <LinkRow project={project} />
        </div>
        {project.note && <p className="mt-1 text-xs leading-5 text-mute">{project.note}</p>}
      </div>
    </article>
  );
}
