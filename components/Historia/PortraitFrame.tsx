"use client";

import { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

/**
 * A single historical portrait presented as a monumental framed artifact.
 *
 * - Portrait plane with the uploaded image texture.
 * - Thick bronze frame around it (4 edge planes + backboard).
 * - Subtle float animation; on hover the frame tilts toward the pointer and
 *   a gold rim light intensifies.
 * - Progressive enhancement: if the texture fails to load, falls back to a
 *   monogram plane so the layout never breaks.
 */

interface PortraitFrameProps {
  src: string;
  label: string;
  width?: number;
  height?: number;
  depth?: number;
  active?: boolean;
  onClick?: () => void;
}

const PORTRAIT_RATIO = 3 / 4; // most uploaded portraits are portrait-oriented

export function PortraitFrame({
  src,
  label,
  width = 2.6,
  height = width / PORTRAIT_RATIO,
  depth = 0.45,
  active = false,
  onClick,
}: PortraitFrameProps) {
  const meshRef = useRef<THREE.Group>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);
  const portraitRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useLoader(TextureLoader, src);

  // Gentle float + slow rotation driven by the render loop.
  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const time = state.clock.getElapsedTime();
    const float = Math.sin(time * 1.2) * 0.018;
    mesh.position.y = float;

    // Target tilt based on hover state.
    const targetRX = hovered ? -0.06 : 0;
    const targetRY = hovered ? (active ? 0.04 : 0.02) : 0;
    mesh.rotation.x += (targetRX - mesh.rotation.x) * delta * 2;
    mesh.rotation.y += (targetRY - mesh.rotation.y) * delta * 2;
  });

  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);

  const handleClick = () => {
    onClick?.();
    // Brief rim flash on click.
    const light = rimLightRef.current;
    if (!light) return;
    const originalIntensity = light.intensity;
    light.intensity = 3;
    setTimeout(() => {
      light.intensity = originalIntensity;
    }, 300);
  };

  return (
    <group
      ref={meshRef}
      aria-label={label}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* Backboard — depth behind the portrait. */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width + 0.18, height + 0.18, depth]} />
        <meshStandardMaterial
          color={active ? "#8f7345" : "#1a1510"}
          roughness={0.85}
          metalness={0.35}
        />
      </mesh>

      {/* Frame edges — four bronze planes forming a thick border. */}
      <group>
        <mesh castShadow>
          <boxGeometry args={[width + 0.18, 0.16, depth + 0.05]} />
          <meshStandardMaterial color="#5d4a33" roughness={0.7} metalness={0.6} />
        </mesh>
        <mesh castShadow position={[0, -(height + 0.18) / 2 + 0.08, 0]}>
          <boxGeometry args={[width + 0.18, 0.16, depth + 0.05]} />
          <meshStandardMaterial color="#5d4a33" roughness={0.7} metalness={0.6} />
        </mesh>
        <mesh castShadow position={[-(width + 0.18) / 2 + 0.08, 0, 0]}>
          <boxGeometry args={[0.16, height + 0.18, depth + 0.05]} />
          <meshStandardMaterial color="#5d4a33" roughness={0.7} metalness={0.6} />
        </mesh>
        <mesh castShadow position={[(width + 0.18) / 2 - 0.08, 0, 0]}>
          <boxGeometry args={[0.16, height + 0.18, depth + 0.05]} />
          <meshStandardMaterial color="#5d4a33" roughness={0.7} metalness={0.6} />
        </mesh>
        {/* Corner accents — small gold blocks. */}
        {[
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ].map(([x, y], i) => (
          <mesh key={i} position={[x * ((width + 0.18) / 2 - 0.035), y * ((height + 0.18) / 2 - 0.035), 0.03]}>
            <boxGeometry args={[0.14, 0.14, depth + 0.08]} />
            <meshStandardMaterial
              color="#a88442"
              roughness={0.4}
              metalness={0.75}
              emissive={active ? "#e8c988" : "#000000"}
              emissiveIntensity={active ? 0.6 : 0}
            />
          </mesh>
        ))}
      </group>

      {/* Portrait plane — the uploaded image. */}
      <mesh
        ref={portraitRef}
        castShadow
        receiveShadow
        position={[0, 0, depth / 2 + 0.005]}
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          map={texture ?? undefined}
          color="#ffffff"
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>

      {/* Rim light — intensifies on hover/active. */}
      <pointLight
        ref={rimLightRef}
        position={[width * 0.9, height * 0.9, 1.5]}
        color="#e8c988"
        intensity={active || hovered ? 1.4 : 0.6}
        distance={6}
        decay={1.5}
      />

      {/* Fallback monogram when texture fails. */}
      {!texture && (
        <mesh position={[0, 0, depth / 2 + 0.005]}>
          <planeGeometry args={[width * 0.85, height * 0.85]} />
          <meshStandardMaterial
            color="#2a241e"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
      )}
    </group>
  );
}
