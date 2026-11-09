"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * One MotionConfig for the whole emerald edition: with reducedMotion="user",
 * every animation below automatically collapses to a plain appear when the
 * visitor has asked their OS to calm things down.
 */
export default function EmeraldMotion({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
