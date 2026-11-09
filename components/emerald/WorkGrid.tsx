"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Filter } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/projects";

const ALL = "All";

export default function WorkGrid() {
  const [filter, setFilter] = useState(ALL);

  const filters = useMemo(() => {
    const tags = Array.from(new Set(projects.map((project) => project.mainTag)));
    return [ALL, ...tags.sort((a, b) => a.localeCompare(b))];
  }, []);

  const visible = useMemo(
    () => (filter === ALL ? projects : projects.filter((p) => p.mainTag === filter)),
    [filter],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="em-index inline-flex items-center gap-2">
          <Filter size={13} aria-hidden="true" />
          Filter
        </span>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter projects by kind">
          {filters.map((tag) => {
            const selected = tag === filter;
            const count =
              tag === ALL ? projects.length : projects.filter((p) => p.mainTag === tag).length;
            return (
              <button
                key={tag}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(tag)}
                className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                  selected
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-line text-mute hover:border-rule-strong hover:text-ink"
                }`}
              >
                {tag}
                <span className="ml-1.5 opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.ul
        layout
        className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        aria-live="polite"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.32, delay: Math.min(i * 0.02, 0.2), ease: [0.22, 1, 0.36, 1] }}
              className="em-panel em-panel--hover flex flex-col p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-display text-3xl leading-none text-accent/80" aria-hidden="true">
                  {String(projects.indexOf(project) + 1).padStart(2, "0")}
                </p>
                <p className="text-right font-mono text-[10px] uppercase leading-5 tracking-[0.12em] text-mute">
                  {project.mainTag}
                  {project.version ? <span className="block text-accent">{project.version}</span> : null}
                </p>
              </div>

              <h3 className="em-h3 mt-4 text-ink">{project.title.replace(/ — .*$/, "")}</h3>
              <p className="mt-2 line-clamp-4 text-[14px] leading-6 text-mute">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="em-chip text-[10px]">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 text-[13px] font-semibold text-ink hover:text-accent"
                >
                  Case study
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
                {project.liveDemo ? (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[13px] font-semibold text-accent hover:underline"
                  >
                    Live
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                ) : null}
                {project.code && !project.privateCode ? (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[13px] font-semibold text-ink hover:text-accent"
                  >
                    Source
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                ) : null}
                {project.privateCode ? (
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-mute">
                    Private source
                  </span>
                ) : null}
                {project.status ? (
                  <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.1em] text-mute">
                    {project.status}
                  </span>
                ) : null}
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
