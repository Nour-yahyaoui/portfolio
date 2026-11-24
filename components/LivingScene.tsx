"use client";

import { useRef, useState, type CSSProperties } from "react";

/** Lightweight CSS 3D: no WebGL download, works without a graphics context. */
export default function LivingScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  return (
    <div className={`living-scene ${paused ? "is-paused" : ""}`} ref={ref}
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        const box = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--rx", `${-(event.clientY - box.top - box.height / 2) / 18}deg`);
        event.currentTarget.style.setProperty("--ry", `${(event.clientX - box.left - box.width / 2) / 18}deg`);
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty("--rx", "0deg");
        ref.current?.style.setProperty("--ry", "0deg");
      }}>
      <div className="scene-coordinate label-mono">Fig. 01 / Ideas in orbit</div>
      <div className="scene-art" aria-hidden="true">
        <div className="scene-grid" />
        <div className="scene-tilt">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
          <div className="scene-cube">{Array.from({ length: 6 }, (_, i) => <div className={`cube-face face-${i}`} key={i}><span>{["N", "Y", "{ }", "↗", "01", "</>"][i]}</span></div>)}</div>
          {["BUILD", "REFINE", "SHIP"].map((label, i) => <span className="orbit-label" key={label} style={{ "--i": i } as CSSProperties}>{label}</span>)}
        </div>
        <div className="scene-shadow" />
      </div>
      <div className="scene-bottom"><span className="label-mono"><span className="status-dot" /> Work in motion</span><button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused} className="scene-control">{paused ? "Play motion ↗" : "Pause motion Ⅱ"}</button></div>
    </div>
  );
}
