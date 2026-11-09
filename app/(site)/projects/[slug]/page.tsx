import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, getProjectBySlug } from "@/lib/projects";
import { getProjectDetail } from "@/lib/projectDetails";
import { SITE_URL } from "@/lib/site";
import type { ProjectLink } from "@/lib/types";

/**
 * Case study page — one per project, statically generated.
 * Written from each project's repository: what it is, how it works,
 * the stack grouped by job, and the decisions worth explaining.
 */

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const detail = getProjectDetail(slug);
  if (!project) return { title: "Project not found" };

  const description = detail?.tagline ?? project.description;
  return {
    title: `${project.title} — Case Study`,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.title} | Nour Yahyaoui`,
      description,
      url: `/projects/${slug}`,
      type: "article",
    },
  };
}

function externalLinks(slug: string, project: NonNullable<ReturnType<typeof getProjectBySlug>>): ProjectLink[] {
  if (project.links) return project.links;
  const links: ProjectLink[] = [];
  if (project.liveDemo) links.push({ label: "Live preview", href: project.liveDemo, variant: "primary" });
  if (project.code && !project.privateCode)
    links.push({ label: "Source code", href: project.code, variant: project.liveDemo ? "secondary" : "primary" });
  void slug;
  return links;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const detail = getProjectDetail(slug);
  if (!project || !detail) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const number = String(index + 1).padStart(2, "0");
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;
  const links = externalLinks(slug, project);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: detail.tagline,
    url: `${SITE_URL}/projects/${slug}`,
    creator: { "@type": "Person", name: "Nour Yahyaoui", url: SITE_URL },
    ...(project.code ? { codeRepository: project.code } : {}),
    ...(project.liveDemo ? { sameAs: project.liveDemo } : {}),
  };

  const specRows: { label: string; value: string }[] = [
    { label: "Field", value: project.mainTag },
    ...(project.status ? [{ label: "Status", value: project.status }] : []),
    ...(project.version ? [{ label: "Version", value: project.version }] : []),
    ...detail.facts,
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb">
        <Link href="/projects" className="link-rule">
          <ArrowLeft size={14} aria-hidden="true" />
          Back to the index
        </Link>
      </nav>

      <header className="mt-8 border-b-2 border-ink pb-8">
        <p className="label-mono">
          Case study {number} <span className="px-1 text-accent">·</span> {project.mainTag}
        </p>
        <h1 className="h-display mt-5 text-ink">{project.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-mute">{detail.tagline}</p>
        {links.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-3">
            {links.map((link, i) => (
              <a
                key={`${link.label}-${link.href}`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={i === 0 ? "btn btn-primary" : "btn btn-outline"}
              >
                {link.label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="grid gap-12 pt-12 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <p className="label-mono border-b border-ink pb-2 text-ink">Specification</p>
            <dl>
              {specRows.map((row) => (
                <div key={row.label} className="grid grid-cols-[7rem_1fr] gap-3 border-b border-linesoft py-3">
                  <dt className="font-mono text-[11px] uppercase leading-6 tracking-[0.12em] text-mute">{row.label}</dt>
                  <dd className="text-sm leading-6 text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>

            <p className="label-mono mt-8 border-b border-ink pb-2 text-ink">Stack, by job</p>
            <div>
              {detail.stack.map((group) => (
                <div key={group.group} className="border-b border-linesoft py-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-mute">{group.group}</p>
                  <ul className="mt-2 space-y-1">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm leading-6 text-ink">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="label-mono mt-8">Technologies in brief</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-8">
          <section aria-labelledby="what-title">
            <p className="label-mono">01 · What it is</p>
            <h2 id="what-title" className="h-section mt-3 text-ink">
              The problem and the answer
            </h2>
            <div className="mt-4 max-w-[68ch] space-y-5 text-[17px] leading-8 text-mute">
              {detail.overview.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="mt-14" aria-labelledby="how-title">
            <p className="label-mono">02 · How it works</p>
            <h2 id="how-title" className="h-section mt-3 text-ink">
              Under the surface
            </h2>
            <div className="mt-6">
              {detail.howItWorks.map((step, i) => (
                <article key={step.title} className="grid gap-2 border-t border-line py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-4">
                  <p className="tnum font-display text-2xl leading-none text-mute" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h3 className="text-base font-semibold leading-snug text-ink">{step.title}</h3>
                    <p className="mt-2 max-w-[68ch] text-[15px] leading-7 text-mute">{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-14 border border-line bg-surface p-6 sm:p-8" aria-labelledby="eng-title">
            <p className="label-mono">03 · Engineering notes</p>
            <h2 id="eng-title" className="h-section mt-3 text-ink">
              Decisions worth explaining
            </h2>
            <ul className="mt-5 space-y-4">
              {detail.engineering.map((note) => (
                <li key={note.slice(0, 40)} className="flex items-baseline gap-3 text-[15px] leading-7 text-mute">
                  <span className="font-mono text-accent" aria-hidden="true">
                    —
                  </span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </section>

          <p className="mt-10 max-w-[68ch] text-sm leading-6 text-mute">
            This case study is written from the project&apos;s own repository and documentation
            {project.code ? (
              <>
                {" "}
                — <a href={project.code} target="_blank" rel="noopener noreferrer" className="font-medium text-accent underline underline-offset-4">read the source</a> to check every claim.
              </>
            ) : (
              "."
            )}
          </p>
        </div>
      </div>

      <nav aria-label="More case studies" className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="group bg-paper p-6 transition-colors hover:bg-subtle">
            <span className="label-mono flex items-center gap-2">
              <ArrowLeft size={13} aria-hidden="true" /> Previous · {String(index).padStart(2, "0")}
            </span>
            <span className="h-title mt-3 block text-ink transition-colors group-hover:text-accent">{prev.title}</span>
          </Link>
        ) : (
          <span className="bg-paper p-6" aria-hidden="true" />
        )}
        {next ? (
          <Link href={`/projects/${next.slug}`} className="group bg-paper p-6 text-right transition-colors hover:bg-subtle">
            <span className="label-mono flex items-center justify-end gap-2">
              Next · {String(index + 2).padStart(2, "0")} <ArrowRight size={13} aria-hidden="true" />
            </span>
            <span className="h-title mt-3 block text-ink transition-colors group-hover:text-accent">{next.title}</span>
          </Link>
        ) : (
          <span className="bg-paper p-6 text-right">
            <span className="label-mono">End of the index</span>
            <span className="mt-3 block text-sm leading-6 text-mute">
              That&apos;s all {projects.length}. <Link href="/contact" className="font-medium text-accent underline underline-offset-4">Yours could be next.</Link>
            </span>
          </span>
        )}
      </nav>
    </main>
  );
}
