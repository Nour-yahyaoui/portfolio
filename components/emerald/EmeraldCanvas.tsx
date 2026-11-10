"use client";

import { Component, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";

/**
 * One shared canvas host for every emerald 3D scene.
 *
 * - Mounts only when it scrolls into view (IntersectionObserver), so three
 *   canvases lower down the page cost nothing until you reach them.
 * - Renders on demand under prefers-reduced-motion: one frame, then still.
 * - Never blocks pointer events unless a scene is genuinely interactive.
 */

class CanvasBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function EmeraldCanvas({
  children,
  className = "",
  camera = { position: [0, 0.4, 6.2], fov: 46 },
  interactive = false,
  fog = 0.055,
  dpr = [1, 1.75] as [number, number],
  label,
}: {
  children: ReactNode;
  className?: string;
  camera?: { position: [number, number, number]; fov: number };
  interactive?: boolean;
  fog?: number | false;
  dpr?: [number, number];
  label: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      setInView(true);
      return;
    }
    // `visible` latches on first sight (mount cost paid once); `inView`
    // keeps tracking so the render loop stops when the canvas scrolls away.
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((entry) => entry.isIntersecting);
        if (hit) setVisible(true);
        setInView(hit);
      },
      { rootMargin: "220px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} className={className}>
      <div className="h-full w-full" aria-hidden={!interactive}>
        <CanvasBoundary fallback={<div className="h-full w-full" />}>
          {visible ? (
            <Canvas
              frameloop={reduced ? "demand" : inView ? "always" : "never"}
              dpr={dpr}
              camera={camera}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              // Decorative canvases: never steal focus, never eat scroll.
              style={{ pointerEvents: interactive ? "auto" : "none", touchAction: "pan-y" }}
            >
              {fog !== false && <fogExp2 attach="fog" args={[0x04130f, fog]} />}
              <ambientLight intensity={0.55} />
              <directionalLight position={[4, 6, 5]} intensity={1.1} color="#a7f3d0" />
              <pointLight position={[-5.5, -1.5, -2.5]} intensity={34} distance={26} color="#22d3ee" />
              <pointLight position={[4.5, 3, 4]} intensity={26} distance={26} color="#34d399" />
              {children}
            </Canvas>
          ) : null}
        </CanvasBoundary>
      </div>
      {interactive ? null : <span className="sr-only">{label}</span>}
    </div>
  );
}
