"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { metrics } from "@/lib/emerald";

function useCountUp(target: number, active: boolean, reduced: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let frame = 0;
    const duration = 1100;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, reduced]);

  return value;
}

function MetricCell({ metric, active, reduced }: { metric: (typeof metrics)[number]; active: boolean; reduced: boolean }) {
  const value = useCountUp(metric.value, active, reduced);
  const shown = metric.value % 1 === 0 ? Math.round(value).toString() : value.toFixed(1);

  return (
    <div className="em-panel p-5">
      <p className="tnum font-display text-4xl leading-none text-ink">
        {shown}
        {metric.suffix ? <span className="text-accent">{metric.suffix}</span> : null}
      </p>
      <p className="mt-3 text-sm font-semibold text-ink">{metric.label}</p>
      <p className="mt-1 text-[13px] leading-6 text-mute">{metric.note}</p>
    </div>
  );
}

export default function Metrics() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      {metrics.map((metric) => (
        <MetricCell
          key={metric.label}
          metric={metric}
          active={active}
          reduced={reduced}
        />
      ))}
    </div>
  );
}
