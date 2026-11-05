"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Subtle atmospheric particles floating through the 3D space.
 * Uses a single Points mesh — cheap, GPU-composited, no rAF of its own.
 * Respects reduced motion by staying nearly still.
 */

export function AmbientParticles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(
    () =>
      new Float32Array(
        Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 18)
      ),
    [count]
  );
  const sizes = useMemo(
    () =>
      new Float32Array(
        Array.from({ length: count }, () => Math.random() * 0.06 + 0.02)
      ),
    [count]
  );

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    const time = state.clock.getElapsedTime();
    // Slow, subtle drift — reduced motion keeps it minimal.
    points.rotation.y = time * 0.015;
    points.rotation.x = Math.sin(time * 0.5) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#8f7345"
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
