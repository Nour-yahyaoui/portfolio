"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll reveal: 14px rise + fade, once. Under prefers-reduced-motion the
 * wrapper (MotionConfig reducedMotion="user") removes the movement and keeps
 * the content visible immediately.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 14,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
