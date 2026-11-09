"use client";

import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import {
  CrystalCore,
  ParticleDrift,
  PrismRings,
} from "@/components/emerald/scene/artifacts";

type Variant = "gold" | "emerald";

const LOOK: Record<
  Variant,
  {
    cold: string;
    warm: string;
    wire: string;
    rings: string[];
    particle: [string, string];
    key: string;
    fill: string;
    fog: number;
  }
> = {
  gold: {
    cold: "#3a1a02",
    warm: "#f0b429",
    wire: "#d6a21c",
    rings: ["#d6a21c", "#f0b429", "#fde68a"],
    particle: ["#d6a21c", "#fde68a"],
    key: "#fde68a",
    fill: "#d6a21c",
    fog: 0.09,
  },
  emerald: {
    cold: "#0b3b2e",
    warm: "#a7f3d0",
    wire: "#34d399",
    rings: ["#34d399", "#22d3ee", "#a7f3d0"],
    particle: ["#34d399", "#22d3ee"],
    key: "#a7f3d0",
    fill: "#34d399",
    fog: 0.09,
  },
};

/**
 * A small live preview inside each lobby door — the same geometry, two
 * temperatures. Warm gold for the classic edition, cold emerald for the new
 * one, so the choice is made with the eyes before it's made with the cursor.
 */
export default function LobbyScene({ variant }: { variant: Variant }) {
  const look = LOOK[variant];
  const reduced = useReducedMotion();

  return (
    <Canvas
      frameloop={reduced ? "demand" : "always"}
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 4.4], fov: 46 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none", touchAction: "pan-y" }}
    >
      <fogExp2 attach="fog" args={[0x06090a, look.fog]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 4]} intensity={1.2} color={look.key} />
      <pointLight position={[-3, -1.5, -2]} intensity={18} distance={18} color={look.fill} />
      <group scale={0.78}>
        <CrystalCore
          detail={4}
          radius={1.3}
          amp={0.28}
          cold={look.cold}
          warm={look.warm}
          wire={look.wire}
        />
        <PrismRings count={3} colors={look.rings} />
      </group>
      <ParticleDrift
        count={260}
        spread={10}
        depth={8}
        cold={look.particle[0]}
        warm={look.particle[1]}
      />
    </Canvas>
  );
}
