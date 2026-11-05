"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { historiaTimeline, getHistoriaChapter, type HistoriaChapterSlug } from "@/lib/historia";

/**
 * Interactive historical timeline connecting the five figures.
 *
 * Vertical timeline on desktop, compact on mobile. Each event reveals on
 * scroll via Framer Motion. Clicking an event navigates to that figure's
 * chapter. Built with semantic HTML (ol/li + time) so it's fully
 * accessible and works without JavaScript styling.
 */

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start 0.85", "end 0.15"],
  });

  // Spring-based fade/slide for each event; staggered by index.
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const blur = useTransform(scrollYProgress, [0, 1], [8, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 14 },
    },
  };

  return (
    <section
      ref={ref}
      id="historia-timeline"
      className="py-24 border-t border-[var(--h-rule)]"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 mb-16 border-b-2 border-[var(--h-rule-strong)] pb-10">
          <div className="flex-shrink-0">
            <p className="label-mono text-[var(--h-gold-bright)] mb-2 tracking-[0.2em]">
              Timeline
            </p>
            <h2 className="h-title text-[var(--h-ink)]">A single arc of power.</h2>
          </div>
          <p className="text-[var(--h-mute)] text-sm leading-6 max-w-md lg:max-w-none lg:w-full">
            From the Battle of Manzikert (1071) to Nader Shah&rsquo;s Indian campaign
            (1739), five figures across seven centuries.
          </p>
        </div>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative mx-auto max-w-2xl"
        >
          {/* Connector line. */}
          <motion.div
            className="absolute left-[12px] top-4 bottom-4 w-[2px] bg-[var(--h-rule-strong)] lg:left-[50%] lg:-translate-x-[50%]"
            style={{ opacity, filter: `blur(${blur.get() ? 0 : 8}px)` }}
          />

          {historiaTimeline.map((event, i) => {
            const chapter = getHistoriaChapter(event.figure as HistoriaChapterSlug);
            const isLeft = i % 2 === 0;
            return (
              <motion.li
                key={event.year}
                variants={itemVariants}
                className="relative mb-20 last:mb-0"
              >
                {/* Connector node. */}
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className={`absolute left-[calc(50%-6px)] top-4 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--h-gold-bright)] border-2 border-[var(--h-bg-deep)] lg:left-[50%] lg:-translate-x-[50%] z-10`}
                  style={{ opacity }}
                />

                <div
                  className={`relative w-full lg:w-[45%] px-4 ${
                    isLeft ? "lg:text-right lg:pr-1" : "lg:pl-1"
                  }`}
                >
                  <time
                    dateTime={String(event.year)}
                    className="block tnum font-mono text-[var(--h-gold-bright)] text-xs font-bold uppercase tracking-[0.18em] mb-1"
                  >
                    {event.year}
                  </time>
                  <Link
                    href={`/historia/${event.figure}`}
                    className="block"
                  >
                    <h3 className="text-[var(--h-ink)] font-semibold text-lg leading-snug mb-1 group-hover:underline">
                      {event.label}
                    </h3>
                    <p className="text-[var(--h-mute)] text-sm leading-6 max-w-xs lg:max-w-none lg:inline-block">
                      {chapter?.title}
                    </p>
                  </Link>
                  <p className="mt-2 text-[var(--h-ink-soft)] text-sm leading-6 max-w-xs lg:max-w-none lg:inline-block">
                    {event.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
