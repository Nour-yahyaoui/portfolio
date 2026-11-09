"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { showcaseSkills, type SkillArea } from "@/lib/skills";

/** One point per skill, on a Fibonacci sphere: Core sits closest to the core. */
const AREA_COLOR: Record<SkillArea, string> = {
  Frontend: "#a7f3d0",
  "Backend & APIs": "#34d399",
  "Rust & Systems": "#22d3ee",
  "AI & Agents": "#5eead4",
  "Mobile & Desktop": "#7dd3fc",
  "Craft & DevOps": "#99f6e4",
};

const TIER_RADIUS = { Core: 1.55, Strong: 2.0, Toolkit: 2.42 } as const;
const TIER_SIZE = { Core: 13, Strong: 9, Toolkit: 7 } as const;

const vertex = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    vec3 p = position;
    p *= 1.0 + sin(uTime * 0.6 + aPhase) * 0.012;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSize * uPixelRatio * (34.0 / max(-mv.z, 0.001));
    vAlpha = 0.55 + 0.45 * sin(uTime * 1.1 + aPhase);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.05, d);
    float halo = smoothstep(0.5, 0.15, d) * 0.45;
    gl_FragColor = vec4(vColor, (core + halo) * vAlpha);
  }
`;

export function StackPoints() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const { gl } = useThree();

  const geometry = useMemo(() => {
    const count = showcaseSkills.length;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const color = new THREE.Color();

    showcaseSkills.forEach((skill, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(1 - y * y, 0));
      const theta = golden * i;
      const r = TIER_RADIUS[skill.tier];
      positions[i * 3] = Math.cos(theta) * radiusAtY * r;
      positions[i * 3 + 1] = y * r;
      positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * r;

      color.set(AREA_COLOR[skill.area]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = TIER_SIZE[skill.tier];
      phases[i] = i * 0.7;
    });

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
    }),
    [gl],
  );

  useFrame((state) => {
    if (mat.current) mat.current.uniforms.uTime.value = state.clock.elapsedTime;
    if (group.current) {
      const t = state.clock.elapsedTime;
      group.current.rotation.y = t * 0.12 + state.pointer.x * 0.3;
      group.current.rotation.x = Math.sin(t * 0.18) * 0.08 - state.pointer.y * 0.18;
    }
  });

  return (
    <group ref={group}>
      <points geometry={geometry}>
        <shaderMaterial
          ref={mat}
          uniforms={uniforms}
          vertexShader={vertex}
          fragmentShader={fragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <mesh>
        <icosahedronGeometry args={[2.75, 1]} />
        <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.07} depthWrite={false} />
      </mesh>
    </group>
  );
}
