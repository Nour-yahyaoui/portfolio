"use client";

/**
 * THE VOYAGE — the emerald edition's centre piece.
 *
 * One continuous camera flight through five acts, driven by scroll:
 *   Awakening → The Tunnel → The Gallery → The Forge → The Core
 *
 * Everything is procedural (geometry, shaders, card textures drawn to a
 * 2D canvas at runtime): no textures, no HDRIs, nothing to download.
 */

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { projects } from "@/lib/projects";

export const PALETTE = {
  night: "#04130f",
  deep: "#0b3b2e",
  emerald: "#34d399",
  mint: "#a7f3d0",
  cyan: "#22d3ee",
};

/* ----------------------------------------------------------- the flight path */

const POINTS = [
  new THREE.Vector3(0, 0, 16),
  new THREE.Vector3(0, 0, 8),
  new THREE.Vector3(-2.0, 0.5, 1.5),
  new THREE.Vector3(1.8, -0.4, -7),
  new THREE.Vector3(-1.4, 0.6, -18),
  new THREE.Vector3(1.2, -0.3, -30),
  new THREE.Vector3(-0.9, 0.35, -42),
  new THREE.Vector3(0.7, 0.05, -54),
  new THREE.Vector3(-0.3, 0.2, -66),
  new THREE.Vector3(0, 0, -78),
];

export const CURVE = new THREE.CatmullRomCurve3(POINTS, false, "catmullrom", 0.55);
/** The monument sits beside the flight path — the camera flies past it, close. */
export const HERO_POS = new THREE.Vector3(2.3, 0.35, -1);
/** The core waits beyond the end of the path: the flight ends facing it. */
export const CORE_POS = CURVE.getPointAt(1).clone().add(new THREE.Vector3(0, 0.6, -18));

/** Act boundaries in scroll-progress space (0 → 1). */
export type Beat = { from: number; text: string };
export type Act = {
  id: string;
  at: number;
  title: string;
  line: string;
  /** Story beats inside the act — the caption changes as you scroll through. */
  beats: Beat[];
};

/**
 * Six chapters. The story is a loop: it opens on a crystal with a hard
 * perimeter, flies out through the work and the connections between it, and
 * returns to the same crystal — larger, with everything else built around it.
 */
export const ACTS: Act[] = [
  {
    id: "awakening",
    at: 0,
    title: "Awakening",
    line: "One crystal. One perimeter it cannot cross.",
    beats: [
      {
        from: 0,
        text: "Every system starts as a shape with a boundary. This one is nour-code: a model in the middle, a shell of permissions around it.",
      },
      {
        from: 0.085,
        text: "The shell is the product. Paths are checked, commands are allow-listed, every call is written down. The core moves; the shell decides how far.",
      },
    ],
  },
  {
    id: "tunnel",
    at: 0.16,
    title: "The Tunnel",
    line: "Forty-four gates. Nine thousand stars going past.",
    beats: [
      {
        from: 0.16,
        text: "Then the flight: forty-four gates, each one a request that made it through validation, a rate limit and an audit line.",
      },
      {
        from: 0.26,
        text: "This is what production looks like from the inside — not one big moment, but thousands of small ones that hold.",
      },
    ],
  },
  {
    id: "gallery",
    at: 0.38,
    title: "The Gallery",
    line: "Twelve systems, hanging in the dark. Click one.",
    beats: [
      {
        from: 0.38,
        text: "The work itself: tills and storefronts, a university platform, a Linux distribution, a document studio that fits in 3.9 MB.",
      },
      {
        from: 0.48,
        text: "Every monolith opens its case study. None of them are mockups — all of them run.",
      },
    ],
  },
  {
    id: "network",
    at: 0.57,
    title: "The Network",
    line: "Everything connected. Nothing assumed.",
    beats: [
      {
        from: 0.57,
        text: "Between the systems: the connections nobody sees until they break. APIs, webhooks, migrations, tenant scopes, permissions.",
      },
      {
        from: 0.645,
        text: "Signals travel these edges constantly. Each pulse is a request that was validated, scoped to its tenant, and answered — or refused.",
      },
    ],
  },
  {
    id: "forge",
    at: 0.71,
    title: "The Forge",
    line: "Loops, strands and edge cases, all at once.",
    beats: [
      {
        from: 0.71,
        text: "Where it is built: an agentic loop that calls a tool, reads the result, and continues — up to fifteen times, every call audited.",
      },
      {
        from: 0.775,
        text: "And the edge cases arrive anyway: an unknown barcode, an Arabic label on a French receipt, a shop with no internet.",
      },
    ],
  },
  {
    id: "core",
    at: 0.84,
    title: "The Core",
    line: "Everything converges — or it never ships.",
    beats: [
      {
        from: 0.84,
        text: "Back at the centre: the same crystal as the beginning, larger. What changed is everything built around it.",
      },
      {
        from: 0.925,
        text: "Twenty-one projects, thirty-one repositories, one rule — if the code cannot show it, the page does not claim it.",
      },
    ],
  },
];

/**
 * Pacing: the camera eases in and out of every chapter instead of sliding
 * through at a constant rate, so each beat gets a moment on screen.
 */
export function pacedProgress(p: number): number {
  let i = 0;
  for (let k = 0; k < ACTS.length; k++) if (p >= ACTS[k].at) i = k;
  const start = ACTS[i].at;
  const end = i + 1 < ACTS.length ? ACTS[i + 1].at : 1;
  const local = end > start ? (p - start) / (end - start) : 0;
  const eased = local * local * (3 - 2 * local);
  return start + eased * (end - start);
}


export type Quality = "high" | "low";

/* --------------------------------------------------------------- the camera */

export function CameraRig({
  progress,
  reduced,
}: {
  progress: React.MutableRefObject<number>;
  reduced: boolean;
}) {
  const { camera } = useThree();
  const eased = useRef(0);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const ahead = useMemo(() => new THREE.Vector3(), []);
  const focus = useMemo(() => new THREE.Vector3(), []);
  const anchor = useMemo(() => new THREE.Vector3(), []);
  const prevFov = useRef(48);

  useFrame((state, delta) => {
    const target = reduced ? 0.05 : pacedProgress(progress.current);
    // Critically-damped follow: fast enough to feel connected, slow enough
    // to feel like flying rather than dragging.
    const damp = 1 - Math.pow(0.0015, Math.min(delta, 0.05));
    eased.current += (target - eased.current) * damp;
    const p = THREE.MathUtils.clamp(eased.current, 0, 1);

    const speed = Math.abs(target - eased.current);

    CURVE.getPointAt(p, pos);
    CURVE.getPointAt(Math.min(1, p + 0.018), ahead);

    // Where the camera looks: mostly ahead along the path, but pulled toward
    // the subject of whichever act we're inside.
    focus.copy(ahead);
    if (p < 0.26) {
      anchor.copy(HERO_POS);
      focus.lerp(anchor, THREE.MathUtils.smoothstep(p, 0.0, 0.24) * 0.92);
    } else if (p > 0.8) {
      anchor.copy(CORE_POS);
      focus.lerp(anchor, THREE.MathUtils.smoothstep(p, 0.8, 0.95) * 0.85);
    }

    // Parallax: the visitor leans, the flight leans with them.
    const px = state.pointer.x;
    const py = state.pointer.y;
    camera.position.set(
      pos.x + px * 0.9,
      pos.y - py * 0.7 + Math.sin(state.clock.elapsedTime * 0.6) * 0.05,
      pos.z,
    );
    camera.lookAt(focus);

    // Speed widens the lens; the tunnel breathes.
    const fov = 46 + THREE.MathUtils.clamp(speed * 260, 0, 12) + (p > 0.83 ? 6 : 0);
    const nextFov = THREE.MathUtils.lerp(prevFov.current, fov, 0.06);
    if (Math.abs(nextFov - prevFov.current) > 0.01) {
      prevFov.current = nextFov;
      (camera as THREE.PerspectiveCamera).fov = nextFov;
      camera.updateProjectionMatrix();
    }

    // A touch of roll on the turns — the one thing that sells "flight".
    (camera as THREE.PerspectiveCamera).rotation.z +=
      Math.sin(state.clock.elapsedTime * 0.35) * 0.006 + px * 0.03;
  });

  return null;
}

/* ------------------------------------------------------------ aurora ribbons */

const auroraVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const auroraFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uA;
  uniform vec3 uB;
  uniform float uSeed;
  varying vec2 vUv;

  float ribbon(float x, float t, float seed) {
    return sin(x * 5.0 + t * 0.5 + seed) * 0.5
         + sin(x * 9.0 - t * 0.34 + seed * 2.0) * 0.28
         + sin(x * 2.3 + t * 0.21 + seed * 3.0) * 0.22;
  }

  void main() {
    float t = uTime;
    float n = ribbon(vUv.x, t, uSeed);
    float centre = 0.5 + n * 0.09;
    float band = smoothstep(0.42, 0.0, abs(vUv.y - centre));
    band *= smoothstep(1.0, 0.25, vUv.y) * smoothstep(0.0, 0.3, vUv.y);
    float shimmer = 0.75 + 0.25 * sin(vUv.x * 40.0 + t * 1.2 + uSeed * 10.0);
    vec3 col = mix(uA, uB, band * shimmer);
    gl_FragColor = vec4(col * band * shimmer * 1.35, band * 0.5 * shimmer);
  }
`;

export function Aurora({
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  seed = 0,
  width = 60,
  height = 22,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  seed?: number;
  width?: number;
  height?: number;
}) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uA: { value: new THREE.Color(PALETTE.deep) },
      uB: { value: new THREE.Color(PALETTE.mint) },
      uSeed: { value: seed },
    }),
    [seed],
  );

  useFrame((state) => {
    if (mat.current) mat.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[width, height, 1, 1]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={auroraVertex}
        fragmentShader={auroraFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ----------------------------------------------------------------- god rays */

const rayVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vN;
  varying vec3 vView;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vView = -mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const rayFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  varying vec3 vN;
  varying vec3 vView;
  void main() {
    float rim = pow(1.0 - abs(dot(normalize(vN), normalize(vView))), 1.6);
    float fall = pow(1.0 - vUv.y, 1.6) * smoothstep(0.0, 0.12, vUv.y);
    float pulse = 0.65 + 0.35 * sin(uTime * 0.9 + vUv.x * 6.28318);
    gl_FragColor = vec4(uColor, rim * fall * pulse * 0.4);
  }
`;

export function GodRays({ count = 6, radius = 9 }: { count?: number; radius?: number }) {
  const group = useRef<THREE.Group>(null);
  const mats = useRef<(THREE.ShaderMaterial | null)[]>([]);

  const rays = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2 + 0.4;
        return {
          position: [Math.cos(a) * radius * 0.35, 1.5, Math.sin(a) * radius * 0.35] as [
            number,
            number,
            number,
          ],
          rotation: [0.32, a, (i % 2 ? 1 : -1) * 0.22] as [number, number, number],
          height: 24 + (i % 3) * 6,
          seed: i,
        };
      }),
    [count, radius],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    mats.current.forEach((m, i) => {
      if (m) m.uniforms.uTime.value = t + i;
    });
    if (group.current) group.current.rotation.y = t * 0.05;
  });

  return (
    <group ref={group}>
      {rays.map((ray, i) => (
        <mesh key={i} position={ray.position} rotation={ray.rotation}>
          <cylinderGeometry args={[0.06, 4.2, ray.height, 20, 1, true]} />
          <shaderMaterial
            ref={(m) => {
              mats.current[i] = m;
            }}
            uniforms={{
              uTime: { value: 0 },
              uColor: { value: new THREE.Color(i % 2 ? PALETTE.cyan : PALETTE.mint) },
            }}
            vertexShader={rayVertex}
            fragmentShader={rayFragment}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------- crystal */

const crystalVertex = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;
  varying vec3 vPos;

  void main() {
    vec3 p = position;
    float d =
      sin(p.x * 1.9 + uTime * 0.9) *
      sin(p.y * 2.2 + uTime * 1.15) *
      sin(p.z * 1.7 + uTime * 0.75);
    d += 0.45 * sin(p.x * 3.4 - uTime * 1.3) * sin(p.y * 3.0 + uTime * 0.9);
    d += 0.22 * sin(p.z * 5.1 + uTime * 1.7);
    p += normal * d * uAmp;
    vDisp = d;
    vPos = p;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = -mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const crystalFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uCold;
  uniform vec3 uWarm;
  uniform vec3 uRim;
  uniform float uGlow;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;
  varying vec3 vPos;

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vView);
    float fres = pow(1.0 - max(dot(n, v), 0.0), 2.4);
    float veins = smoothstep(0.35, 0.95, abs(sin(vPos.y * 12.0 + uTime * 0.8)));
    float mixv = clamp(fres * 1.35 + vDisp * 0.5 + 0.15 * sin(uTime * 0.5), 0.0, 1.0);
    vec3 col = mix(uCold, uWarm, mixv);
    col += uRim * fres * 1.25;
    col += uRim * veins * 0.28;
    gl_FragColor = vec4(col * (0.16 + fres * 1.9) * uGlow, 1.0);
  }
`;

export function MonumentCrystal({
  radius = 2.6,
  detail = 6,
  amp = 0.42,
  glow = 1,
  position = [0, 0, 0],
}: {
  radius?: number;
  detail?: number;
  amp?: number;
  glow?: number;
  position?: [number, number, number];
}) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const cage = useRef<THREE.Mesh>(null);
  const shards = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: amp },
      uGlow: { value: glow },
      uCold: { value: new THREE.Color("#05231b") },
      uWarm: { value: new THREE.Color(PALETTE.mint) },
      uRim: { value: new THREE.Color(PALETTE.emerald) },
    }),
    [amp, glow],
  );

  const shardData = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => {
        const a = (i / 26) * Math.PI * 2;
        const r = radius * (1.55 + Math.random() * 0.7);
        return {
          a,
          r,
          y: (Math.random() - 0.5) * radius * 1.6,
          speed: 0.12 + Math.random() * 0.24,
          spin: 0.5 + Math.random() * 1.8,
          size: 0.09 + Math.random() * 0.16,
        };
      }),
    [radius],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mat.current) mat.current.uniforms.uTime.value = t;
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.16;
      mesh.current.rotation.x = Math.sin(t * 0.21) * 0.12;
    }
    if (cage.current) {
      cage.current.rotation.y = -t * 0.1;
      cage.current.rotation.z = t * 0.06;
    }
    if (shards.current) {
      shardData.forEach((s, i) => {
        const ang = s.a + t * s.speed;
        dummy.position.set(
          Math.cos(ang) * s.r,
          s.y + Math.sin(t * 0.7 + i) * 0.22,
          Math.sin(ang) * s.r,
        );
        dummy.rotation.set(t * s.spin, t * s.spin * 0.6, s.a);
        dummy.scale.setScalar(s.size);
        dummy.updateMatrix();
        shards.current!.setMatrixAt(i, dummy.matrix);
      });
      shards.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group position={position}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[radius, detail]} />
        <shaderMaterial
          ref={mat}
          uniforms={uniforms}
          vertexShader={crystalVertex}
          fragmentShader={crystalFragment}
        />
      </mesh>

      <mesh ref={cage} scale={1.42}>
        <icosahedronGeometry args={[radius, 1]} />
        <meshBasicMaterial
          color={PALETTE.emerald}
          wireframe
          transparent
          opacity={0.13}
          depthWrite={false}
        />
      </mesh>

      <instancedMesh ref={shards} args={[undefined, undefined, shardData.length]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={PALETTE.mint}
          emissive={new THREE.Color(PALETTE.emerald)}
          emissiveIntensity={1.6}
          roughness={0.2}
          metalness={0.35}
          flatShading
        />
      </instancedMesh>
    </group>
  );
}

/* ----------------------------------------------------------------- starfield */

const starVertex = /* glsl */ `
  attribute float aSize;
  attribute float aMix;
  attribute float aPhase;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vMix;
  varying float vAlpha;
  void main() {
    vMix = aMix;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float twinkle = 0.45 + 0.55 * pow(abs(sin(uTime * 0.8 + aPhase)), 2.0);
    // Cap the sprite: a star the camera flies through must not become a
    // screen-filling blob, and it fades out as it passes the lens.
    gl_PointSize = min(aSize * uPixelRatio * (52.0 / max(-mv.z, 0.001)) * twinkle, 26.0 * uPixelRatio);
    vAlpha = twinkle * smoothstep(120.0, 8.0, -mv.z) * smoothstep(0.6, 2.4, -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const starFragment = /* glsl */ `
  uniform vec3 uA;
  uniform vec3 uB;
  varying float vMix;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(mix(uA, uB, vMix), core * vAlpha);
  }
`;

export function Starfield({ count = 9000 }: { count?: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const mixes = new Float32Array(count);
    const phases = new Float32Array(count);
    const p = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      // Most stars hug the flight path (that's what makes it feel like speed);
      // a scattered shell fills the distance.
      if (i < count * 0.72) {
        const u = Math.random();
        CURVE.getPointAt(u, p);
        const a = Math.random() * Math.PI * 2;
        const r = 2.4 + Math.pow(Math.random(), 0.6) * 16;
        positions[i * 3] = p.x + Math.cos(a) * r;
        positions[i * 3 + 1] = p.y + Math.sin(a) * r * 0.7;
        positions[i * 3 + 2] = p.z + (Math.random() - 0.5) * 10;
      } else {
        const a = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        const r = 40 + Math.random() * 60;
        positions[i * 3] = r * Math.sin(ph) * Math.cos(a);
        positions[i * 3 + 1] = r * Math.sin(ph) * Math.sin(a) * 0.6;
        positions[i * 3 + 2] = -20 - Math.random() * 90;
      }
      sizes[i] = 0.5 + Math.random() * 2.1;
      mixes[i] = Math.random();
      phases[i] = Math.random() * Math.PI * 2;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    g.setAttribute("aMix", new THREE.BufferAttribute(mixes, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uA: { value: new THREE.Color(PALETTE.emerald) },
      uB: { value: new THREE.Color(PALETTE.cyan) },
    }),
    [gl],
  );

  useFrame((state) => {
    if (mat.current) mat.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={starVertex}
        fragmentShader={starFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* -------------------------------------------------------------------- gates */

export function Gates({ count = 44, from = 0.16, to = 0.62 }: { count?: number; from?: number; to?: number }) {
  const group = useRef<THREE.Group>(null);
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  const gates = useMemo(() => {
    const out: {
      position: THREE.Vector3;
      quaternion: THREE.Quaternion;
      radius: number;
      color: string;
      seed: number;
    }[] = [];
    for (let i = 0; i < count; i++) {
      const u = from + (i / (count - 1)) * (to - from);
      const point = CURVE.getPointAt(u);
      const tangent = CURVE.getTangentAt(u);
      const q = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        tangent.clone().normalize(),
      );
      out.push({
        position: point,
        quaternion: q,
        radius: 3.1 + Math.sin(i * 0.7) * 0.9 + (i % 3) * 0.35,
        color: [PALETTE.emerald, PALETTE.cyan, PALETTE.mint][i % 3],
        seed: i,
      });
    }
    return out;
  }, [count, from, to]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      child.rotation.z = t * (0.12 + (i % 5) * 0.05) * (i % 2 ? 1 : -1);
      const m = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      if (m) m.opacity = 0.32 + 0.3 * Math.abs(Math.sin(t * 0.6 + i * 0.4));
    });
  });

  return (
    <group ref={group}>
      {gates.map((gate, i) => (
        <mesh
          key={i}
          position={gate.position}
          quaternion={gate.quaternion}
          userData={{ up }}
        >
          <torusGeometry args={[gate.radius, 0.035, 8, 96]} />
          <meshBasicMaterial
            color={gate.color}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ spires */

export function Spires({ count = 70, from = 0.18, to = 0.6 }: { count?: number; from?: number; to?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const spires = useMemo(() => {
    const out: { pos: THREE.Vector3; h: number; w: number; rot: number }[] = [];
    for (let i = 0; i < count; i++) {
      const u = from + (i / count) * (to - from);
      const p = CURVE.getPointAt(u);
      const tangent = CURVE.getTangentAt(u);
      const side = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 1, 0)).normalize();
      const dir = i % 2 ? 1 : -1;
      const dist = 5.5 + Math.random() * 7;
      out.push({
        pos: p.clone().addScaledVector(side, dir * dist).setY(-3 + Math.random() * 1.5),
        h: 4 + Math.random() * 16,
        w: 0.5 + Math.random() * 1.4,
        rot: Math.random() * Math.PI,
      });
    }
    return out;
  }, [count, from, to]);

  useFrame(() => {
    if (!mesh.current) return;
    spires.forEach((s, i) => {
      dummy.position.set(s.pos.x, s.pos.y + s.h / 2, s.pos.z);
      dummy.rotation.set(0, s.rot, 0);
      dummy.scale.set(s.w, s.h, s.w);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, spires.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={PALETTE.emerald} wireframe transparent opacity={0.16} />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------- neural tissue */

interface Network {
  nodes: THREE.Vector3[];
  edges: [number, number][];
}

/** Connect every node to its nearest few neighbours — a k-NN graph, not noise. */
function buildNetwork(points: THREE.Vector3[], neighbors = 2, maxDist = 5): Network {
  const edges: [number, number][] = [];
  const seen = new Set<string>();

  points.forEach((p, i) => {
    const nearest = points
      .map((q, j) => ({ j, d: p.distanceTo(q) }))
      .filter((x) => x.j !== i && x.d < maxDist)
      .sort((a, b) => a.d - b.d)
      .slice(0, neighbors);

    nearest.forEach(({ j }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) return;
      seen.add(key);
      edges.push([i, j]);
    });
  });

  return { nodes: points, edges };
}

const edgeVertex = /* glsl */ `
  attribute float aT;
  attribute float aPhase;
  attribute float aLen;
  varying float vT;
  varying float vPhase;
  varying float vLen;
  void main() {
    vT = aT;
    vPhase = aPhase;
    vLen = aLen;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const edgeFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uA;
  uniform vec3 uB;
  uniform float uGlow;
  varying float vT;
  varying float vPhase;
  varying float vLen;

  void main() {
    // A signal leaves one node, arrives at the other, then repeats — travelling
    // light along a fixed wire, which is what a request actually looks like.
    float speed = 0.16 + 0.10 * fract(vPhase * 7.13);
    float head = fract(uTime * speed + vPhase);
    float d = abs(vT - head);
    d = min(d, 1.0 - d);
    float pulse = exp(-d * d * 110.0);
    float base = 0.14 + 0.06 * sin(vLen * 3.0 + uTime * 0.4);
    vec3 col = mix(uA, uB, vT);
    gl_FragColor = vec4(col * (base + pulse * 1.9) * uGlow, base * 0.7 + pulse * 0.95);
  }
`;

function NeuralLines({ net, glow = 1 }: { net: Network; glow?: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(net.edges.length * 6);
    const ts = new Float32Array(net.edges.length * 2);
    const phases = new Float32Array(net.edges.length * 2);
    const lens = new Float32Array(net.edges.length * 2);

    net.edges.forEach(([a, b], i) => {
      const A = net.nodes[a];
      const B = net.nodes[b];
      positions.set([A.x, A.y, A.z, B.x, B.y, B.z], i * 6);
      const phase = Math.random();
      const len = A.distanceTo(B);
      ts[i * 2] = 0;
      ts[i * 2 + 1] = 1;
      phases[i * 2] = phase;
      phases[i * 2 + 1] = phase;
      lens[i * 2] = len;
      lens[i * 2 + 1] = len;
    });

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aT", new THREE.BufferAttribute(ts, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    g.setAttribute("aLen", new THREE.BufferAttribute(lens, 1));
    return g;
  }, [net]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uA: { value: new THREE.Color(PALETTE.emerald) },
      uB: { value: new THREE.Color(PALETTE.cyan) },
      uGlow: { value: glow },
    }),
    [glow],
  );

  useFrame((state) => {
    if (mat.current) mat.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <lineSegments geometry={geometry}>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={edgeVertex}
        fragmentShader={edgeFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function NeuralNodes({ net, size = 0.085 }: { net: Network; size?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // How many edges touch each node — busier nodes burn a little brighter.
  const degree = useMemo(() => {
    const out = new Array(net.nodes.length).fill(0);
    net.edges.forEach(([a, b]) => {
      out[a] += 1;
      out[b] += 1;
    });
    return out;
  }, [net]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    net.nodes.forEach((node, i) => {
      const fire = 0.5 + 0.5 * Math.sin(t * 1.4 + i * 0.9 + degree[i]);
      dummy.position.copy(node);
      dummy.rotation.set(t * 0.3 + i, t * 0.2, 0);
      dummy.scale.setScalar(size * (0.7 + degree[i] * 0.22) * (0.85 + fire * 0.5));
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, net.nodes.length]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={PALETTE.mint}
        emissive={new THREE.Color(PALETTE.emerald)}
        emissiveIntensity={1.8}
        roughness={0.2}
        metalness={0.3}
      />
    </instancedMesh>
  );
}

/**
 * A neural web strung along the flight path: nodes in a shell around the
 * route, wired to their nearest neighbours, with signals running the wires.
 * It reads as connective tissue and it doubles as a depth cue — near edges
 * whip past while far ones crawl.
 */
export function NeuralWeb({
  nodes = 150,
  from = 0.24,
  to = 0.78,
  inner = 3.4,
  outer = 11,
  neighbors = 2,
  glow = 1,
}: {
  nodes?: number;
  from?: number;
  to?: number;
  inner?: number;
  outer?: number;
  neighbors?: number;
  glow?: number;
}) {
  const net = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < nodes; i++) {
      const u = from + Math.random() * (to - from);
      const centre = CURVE.getPointAt(u);
      const a = Math.random() * Math.PI * 2;
      const r = inner + Math.pow(Math.random(), 0.65) * (outer - inner);
      points.push(
        new THREE.Vector3(
          centre.x + Math.cos(a) * r,
          centre.y + Math.sin(a) * r * 0.8,
          centre.z + (Math.random() - 0.5) * 7,
        ),
      );
    }
    return buildNetwork(points, neighbors, 6.5);
  }, [nodes, from, to, inner, outer, neighbors]);

  return (
    <group>
      <NeuralLines net={net} glow={glow} />
      <NeuralNodes net={net} />
    </group>
  );
}

/** The same idea as a ball: a cluster of wired nodes, used for the core. */
export function NeuralCluster({
  position = [0, 0, 0],
  radius = 5,
  nodes = 90,
  neighbors = 3,
  glow = 1.1,
}: {
  position?: [number, number, number];
  radius?: number;
  nodes?: number;
  neighbors?: number;
  glow?: number;
}) {
  const group = useRef<THREE.Group>(null);

  const net = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < nodes; i++) {
      const y = 1 - (i / Math.max(nodes - 1, 1)) * 2;
      const r = Math.sqrt(Math.max(1 - y * y, 0));
      const theta = golden * i;
      const jitter = 0.82 + Math.random() * 0.32;
      points.push(
        new THREE.Vector3(
          Math.cos(theta) * r * radius * jitter,
          y * radius * jitter,
          Math.sin(theta) * r * radius * jitter,
        ),
      );
    }
    return buildNetwork(points, neighbors, radius * 0.72);
  }, [nodes, radius, neighbors]);

  useFrame((state) => {
    if (group.current) {
      const t = state.clock.elapsedTime;
      group.current.rotation.y = t * 0.05;
      group.current.rotation.x = Math.sin(t * 0.14) * 0.08;
    }
  });

  return (
    <group ref={group} position={position}>
      <NeuralLines net={net} glow={glow} />
      <NeuralNodes net={net} size={0.1} />
    </group>
  );
}

/* -------------------------------------------------------------- depth layers */

/**
 * Floor and ceiling grids receding into the fog. A flat starfield reads as
 * speed; a grid you can see converging reads as *distance*.
 */
export function DepthField() {
  return (
    <group>
      <mesh position={[0, -5.5, -45]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[80, 220, 20, 56]} />
        <meshBasicMaterial color={PALETTE.emerald} wireframe transparent opacity={0.085} />
      </mesh>
      <mesh position={[0, 7.5, -45]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[80, 220, 14, 40]} />
        <meshBasicMaterial color={PALETTE.cyan} wireframe transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

const moteVertex = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.x += sin(uTime * 0.22 + aPhase) * 0.6;
    p.y += cos(uTime * 0.18 + aPhase * 1.7) * 0.5;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = min(aSize * uPixelRatio * (140.0 / max(-mv.z, 0.001)), 86.0 * uPixelRatio);
    // Only the near-but-not-touching motes survive: that is what makes them
    // read as out-of-focus bokeh instead of a wash of green.
    float near = smoothstep(1.1, 3.6, -mv.z);
    float far = smoothstep(26.0, 9.0, -mv.z);
    vAlpha = near * far * (0.3 + 0.3 * sin(uTime * 0.7 + aPhase));
    gl_Position = projectionMatrix * mv;
  }
`;

const moteFragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.12, d) * 0.5;
    gl_FragColor = vec4(uColor, a * vAlpha);
  }
`;

/** Soft out-of-focus motes drifting close to the lens — the near depth layer. */
export function Motes({ count = 120 }: { count?: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const p = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      CURVE.getPointAt(Math.random(), p);
      const a = Math.random() * Math.PI * 2;
      const r = 1.6 + Math.random() * 5.5;
      positions[i * 3] = p.x + Math.cos(a) * r;
      positions[i * 3 + 1] = p.y + Math.sin(a) * r * 0.8;
      positions[i * 3 + 2] = p.z + (Math.random() - 0.5) * 12;
      sizes[i] = 6 + Math.random() * 16;
      phases[i] = Math.random() * Math.PI * 2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uColor: { value: new THREE.Color(PALETTE.mint) },
    }),
    [gl],
  );

  useFrame((state) => {
    if (mat.current) mat.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={moteVertex}
        fragmentShader={moteFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ---------------------------------------------------------------- monoliths */

function makeCardTexture(index: number, title: string, tags: string[], meta: string) {
  const c = document.createElement("canvas");
  c.width = 768;
  c.height = 1024;
  const x = c.getContext("2d")!;

  const grad = x.createLinearGradient(0, 0, 768, 1024);
  grad.addColorStop(0, "rgba(9,40,31,0.96)");
  grad.addColorStop(1, "rgba(3,16,13,0.98)");
  x.fillStyle = grad;
  x.fillRect(0, 0, 768, 1024);

  // hairline frame
  x.strokeStyle = "rgba(52,211,153,0.55)";
  x.lineWidth = 4;
  x.strokeRect(22, 22, 724, 980);

  // corner ticks
  x.fillStyle = "#34d399";
  [[22, 22], [746 - 34, 22], [22, 1002 - 34], [746 - 34, 1002 - 34]].forEach(([cx, cy]) =>
    x.fillRect(cx, cy, 34, 4),
  );

  x.fillStyle = "#34d399";
  x.font = "600 26px ui-monospace, SFMono-Regular, Menlo, monospace";
  x.fillText(String(index + 1).padStart(2, "0"), 62, 110);

  x.fillStyle = "rgba(167,243,208,0.72)";
  x.font = "500 20px ui-monospace, SFMono-Regular, Menlo, monospace";
  x.fillText(meta.toUpperCase().slice(0, 26), 130, 110);

  // title, wrapped
  x.fillStyle = "#eafff6";
  const words = title.split(" ");
  let line = "";
  let y = 220;
  let size = 62;
  x.font = `700 ${size}px "Space Grotesk", system-ui, sans-serif`;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (x.measureText(test).width > 640 && line) {
      x.fillText(line, 62, y);
      y += size * 1.12;
      line = word;
      if (y > 700 && size > 40) {
        size -= 6;
        x.font = `700 ${size}px "Space Grotesk", system-ui, sans-serif`;
      }
    } else {
      line = test;
    }
  }
  if (line) x.fillText(line, 62, y);

  // tag rail
  let tx = 62;
  let ty = 790;
  x.font = "500 22px ui-monospace, SFMono-Regular, Menlo, monospace";
  tags.slice(0, 4).forEach((tag) => {
    const w = x.measureText(tag).width + 30;
    if (tx + w > 706) {
      tx = 62;
      ty += 46;
    }
    x.strokeStyle = "rgba(52,211,153,0.4)";
    x.lineWidth = 2;
    x.beginPath();
    x.rect(tx, ty - 28, w, 38);
    x.stroke();
    x.fillStyle = "rgba(167,243,208,0.9)";
    x.fillText(tag, tx + 15, ty);
    tx += w + 12;
  });

  x.fillStyle = "#34d399";
  x.font = "600 24px ui-monospace, SFMono-Regular, Menlo, monospace";
  x.fillText("CASE STUDY  →", 62, 950);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export function Monoliths({
  from = 0.4,
  to = 0.62,
  limit = 12,
  onOpen,
}: {
  from?: number;
  to?: number;
  limit?: number;
  /** Navigation is injected from the DOM side, where the router lives. */
  onOpen?: (slug: string) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const items = useMemo(() => projects.slice(0, limit), [limit]);
  const textures = useMemo(
    () => items.map((p, i) => makeCardTexture(i, p.title.replace(/ — .*$/, ""), p.tags, p.mainTag)),
    [items],
  );

  const placed = useMemo(
    () =>
      items.map((project, i) => {
        const u = from + (i / Math.max(items.length - 1, 1)) * (to - from);
        const point = CURVE.getPointAt(u);
        const tangent = CURVE.getTangentAt(u);
        const side = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 1, 0)).normalize();
        const dir = i % 2 ? 1 : -1;
        return {
          project,
          position: point
            .clone()
            .addScaledVector(side, dir * 4.4)
            .add(new THREE.Vector3(0, 0.3 + (i % 3) * 0.35, 0)),
          rotationY: Math.atan2(-side.clone().multiplyScalar(dir).x, -side.clone().multiplyScalar(dir).z),
          float: i * 0.7,
        };
      }),
    [items, from, to],
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      child.position.y += Math.sin(t * 0.7 + i) * 0.0012;
      child.lookAt(
        child.position.x * 0.55,
        child.position.y + Math.sin(t * 0.5 + i) * 0.12,
        child.position.z + 6,
      );
    });
  });

  return (
    <group ref={group}>
      {placed.map((item, i) => (
        <group key={item.project.slug} position={item.position} rotation={[0, item.rotationY, 0]}>
          {/* glow plate behind the card */}
          <mesh position={[0, 0, -0.06]} scale={[1.06, 1.04, 1]}>
            <planeGeometry args={[3.1, 4.1]} />
            <meshBasicMaterial
              color={PALETTE.emerald}
              transparent
              opacity={0.16}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          <mesh
            onClick={(event) => {
              event.stopPropagation();
              if (onOpen) onOpen(item.project.slug);
            }}
            onPointerOver={() => {
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "";
            }}
          >
            <planeGeometry args={[3, 4]} />
            <meshBasicMaterial map={textures[i]} transparent toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ---------------------------------------------------------------- the forge */

export function Forge({ position }: { position: THREE.Vector3 }) {
  const knot = useRef<THREE.Mesh>(null);
  const helix = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const beads = useRef<THREE.InstancedMesh>(null);
  const debris = useRef<THREE.InstancedMesh>(null);

  const beadCount = 64;
  const debrisCount = 160;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (knot.current) {
      knot.current.rotation.x = t * 0.24;
      knot.current.rotation.y = t * 0.33;
    }
    if (helix.current) helix.current.rotation.y = -t * 0.4;

    if (beads.current) {
      for (let i = 0; i < beadCount; i++) {
        const f = i / beadCount;
        const a = f * Math.PI * 8 + t * 0.8;
        const r = 1.35;
        const y = (f - 0.5) * 6;
        const strand = i % 2 ? Math.PI : 0;
        dummy.position.set(Math.cos(a + strand) * r, y, Math.sin(a + strand) * r);
        dummy.rotation.set(t, t * 0.5, 0);
        dummy.scale.setScalar(0.13 + Math.sin(t * 3 + i) * 0.03);
        dummy.updateMatrix();
        beads.current.setMatrixAt(i, dummy.matrix);
      }
      beads.current.instanceMatrix.needsUpdate = true;
    }

    if (debris.current) {
      for (let i = 0; i < debrisCount; i++) {
        const a = (i / debrisCount) * Math.PI * 2 + t * (0.2 + (i % 5) * 0.06);
        const r = 3.4 + Math.sin(t * 0.7 + i) * 1.2;
        dummy.position.set(
          Math.cos(a) * r,
          Math.sin(t * 0.9 + i * 0.3) * 2.2,
          Math.sin(a) * r * 0.7,
        );
        dummy.rotation.set(t * (0.6 + (i % 3) * 0.4), t * 0.4, i);
        dummy.scale.setScalar(0.07 + (i % 7) * 0.012);
        dummy.updateMatrix();
        debris.current.setMatrixAt(i, dummy.matrix);
      }
      debris.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group position={position}>
      <mesh ref={knot}>
        <torusKnotGeometry args={[2.2, 0.6, 260, 32, 2, 3]} />
        <meshBasicMaterial
          color={PALETTE.emerald}
          wireframe
          transparent
          opacity={0.42}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <group ref={helix}>
        <instancedMesh ref={beads} args={[undefined, undefined, beadCount]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={PALETTE.mint}
            emissive={new THREE.Color(PALETTE.emerald)}
            emissiveIntensity={1.7}
            roughness={0.25}
          />
        </instancedMesh>
      </group>

      <instancedMesh ref={debris} args={[undefined, undefined, debrisCount]}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={PALETTE.emerald}
          emissive={new THREE.Color(PALETTE.deep)}
          emissiveIntensity={0.9}
          roughness={0.4}
          metalness={0.4}
          flatShading
        />
      </instancedMesh>
    </group>
  );
}

/* ------------------------------------------------------------------ the core */

const implodeVertex = /* glsl */ `
  attribute float aRadius;
  attribute float aAngle;
  attribute float aSpeed;
  attribute float aSize;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  void main() {
    float pulse = 0.55 + 0.45 * sin(uTime * 1.1 + aAngle * 3.0);
    float r = aRadius * (0.55 + pulse * 0.75);
    float a = aAngle + uTime * aSpeed;
    vec3 p = vec3(cos(a) * r, sin(a * 1.7 + uTime * 0.4) * r * 0.8, sin(a) * r);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = min(aSize * uPixelRatio * (60.0 / max(-mv.z, 0.001)), 34.0 * uPixelRatio);
    vAlpha = pulse;
    gl_Position = projectionMatrix * mv;
  }
`;

const implodeFragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, core * vAlpha);
  }
`;

export function Implosion({ count = 2600 }: { count?: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();

  const geometry = useMemo(() => {
    const radius = new Float32Array(count);
    const angle = new Float32Array(count);
    const speed = new Float32Array(count);
    const size = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      radius[i] = 2.4 + Math.pow(Math.random(), 0.7) * 7;
      angle[i] = Math.random() * Math.PI * 2;
      speed[i] = (0.15 + Math.random() * 0.5) * (Math.random() < 0.5 ? -1 : 1);
      size[i] = 0.8 + Math.random() * 2.4;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    g.setAttribute("aRadius", new THREE.BufferAttribute(radius, 1));
    g.setAttribute("aAngle", new THREE.BufferAttribute(angle, 1));
    g.setAttribute("aSpeed", new THREE.BufferAttribute(speed, 1));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uColor: { value: new THREE.Color(PALETTE.mint) },
    }),
    [gl],
  );

  useFrame((state) => {
    if (mat.current) mat.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={implodeVertex}
        fragmentShader={implodeFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function CoreChamber({ high = true }: { high?: boolean }) {
  const rings = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!rings.current) return;
    const t = state.clock.elapsedTime;
    rings.current.children.forEach((child, i) => {
      child.rotation.set(Math.PI / 2 + i * 0.4, t * (0.2 + i * 0.08), t * 0.1 * (i % 2 ? 1 : -1));
    });
  });

  return (
    <group position={CORE_POS}>
      <MonumentCrystal radius={3.4} detail={high ? 6 : 4} amp={0.55} glow={1.35} />
      <Implosion count={high ? 2600 : 1100} />
      {/* Everything the flight passed, wired together around the centre. */}
      <NeuralCluster radius={8.4} nodes={high ? 130 : 60} neighbors={3} glow={1.2} />
      <group ref={rings}>
        {[5.2, 6.4, 7.6, 8.8].map((r, i) => (
          <mesh key={r}>
            <torusGeometry args={[r, 0.02 + i * 0.008, 6, 128]} />
            <meshBasicMaterial
              color={i % 2 ? PALETTE.cyan : PALETTE.emerald}
              transparent
              opacity={0.5}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
      <Aurora position={[0, 2, -14]} scale={[1.5, 1, 1]} seed={2.1} width={70} height={26} />
    </group>
  );
}

/* ---------------------------------------------------------- the whole world */

export function VoyageWorld({
  quality,
  onOpen,
}: {
  quality: Quality;
  onOpen?: (slug: string) => void;
}) {
  const high = quality === "high";

  // The forge sits just off the path: a near miss reads better than a crash.
  const forgeAt = useMemo(() => {
    const at = 0.775;
    const point = CURVE.getPointAt(at);
    const tangent = CURVE.getTangentAt(at);
    const side = new THREE.Vector3()
      .crossVectors(tangent, new THREE.Vector3(0, 1, 0))
      .normalize();
    return point.clone().addScaledVector(side, 3.6).setY(0.4);
  }, []);

  return (
    <>
      <color attach="background" args={[PALETTE.night]} />
      <fogExp2 attach="fog" args={[0x04130f, 0.0165]} />

      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 8, 6]} intensity={1.2} color={PALETTE.mint} />
      <pointLight
        position={HERO_POS}
        intensity={high ? 90 : 40}
        distance={40}
        color={PALETTE.emerald}
      />
      <pointLight position={[0, 2, -10]} intensity={40} distance={30} color={PALETTE.cyan} />

      {/* Act 01 — Awakening */}
      <group position={HERO_POS}>
        <MonumentCrystal radius={2.7} detail={high ? 6 : 4} amp={0.45} glow={1.25} />
        <GodRays count={high ? 6 : 3} radius={7} />
        <Aurora position={[0, 3.5, -18]} seed={0.4} width={70} height={26} />
        <Aurora position={[0, -3, -26]} seed={1.7} width={90} height={30} />
      </group>
      {/* The first hint of the network: a small wired cluster behind the monument. */}
      <NeuralCluster position={[HERO_POS.x + 0.5, HERO_POS.y, HERO_POS.z - 2]} radius={4.6} nodes={high ? 70 : 34} glow={0.8} />

      {/* Acts 02–03 — the flight */}
      <DepthField />
      <Starfield count={high ? 9000 : 3200} />
      <Motes count={high ? 120 : 50} />
      <Gates count={high ? 44 : 22} />
      <Spires count={high ? 70 : 30} />

      {/* Act 03 — the gallery */}
      <Monoliths from={0.38} to={0.56} onOpen={onOpen} />

      {/* Act 04 — the network: connective tissue strung along the whole route */}
      <NeuralWeb
        nodes={high ? 170 : 70}
        from={0.22}
        to={0.8}
        inner={3.6}
        outer={12}
        glow={1.15}
      />

      {/* Act 05 — the forge */}
      <Forge position={forgeAt} />

      {/* Act 06 — the core */}
      <CoreChamber high={high} />
    </>
  );
}
