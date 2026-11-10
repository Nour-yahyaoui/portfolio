"use client";

/**
 * The Lab's 3D objects — every one procedural: no textures, no HDRIs, no
 * downloads, so the page never waits on a network round-trip to look right.
 * Palette is deliberately narrow (emerald → mint → cyan) so the eye rests.
 */

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export const EM = {
  deep: "#0b3b2e",
  emerald: "#34d399",
  mint: "#a7f3d0",
  cyan: "#22d3ee",
  night: "#04130f",
};

const coreVertex = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;

  void main() {
    vec3 p = position;
    float d =
      sin(p.x * 2.0 + uTime) *
      sin(p.y * 2.3 + uTime * 1.2) *
      sin(p.z * 1.9 + uTime * 0.8);
    d += 0.5 * sin(p.x * 3.7 - uTime * 1.4) * sin(p.y * 3.1 + uTime);
    p += normal * d * uAmp;
    vDisp = d;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = -mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const coreFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uCold;
  uniform vec3 uWarm;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;

  void main() {
    float f = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 2.0);
    float mixv = clamp(f * 1.25 + vDisp * 0.55 + 0.12 * sin(uTime * 0.6), 0.0, 1.0);
    vec3 c = mix(uCold, uWarm, mixv);
    gl_FragColor = vec4(c * (0.10 + f * 1.45), 1.0);
  }
`;

/* ---------------------------------------------------------------- CrystalCore */

export function CrystalCore({
  detail = 5,
  radius = 1.35,
  amp = 0.26,
  speed = 1,
  cold = EM.deep,
  warm = EM.mint,
  wire = EM.emerald,
}: {
  detail?: number;
  radius?: number;
  amp?: number;
  speed?: number;
  /** Colour at the silhouette's dark side. */
  cold?: string;
  /** Colour the fresnel rim burns toward. */
  warm?: string;
  /** Colour of the surrounding wireframe cage. */
  wire?: string;
}) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: amp },
      uCold: { value: new THREE.Color(cold) },
      uWarm: { value: new THREE.Color(warm) },
    }),
    [amp, cold, warm],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (mat.current) mat.current.uniforms.uTime.value = t;
    if (mesh.current) mesh.current.rotation.y = t * 0.18;
  });

  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[radius, detail]} />
        <shaderMaterial
          ref={mat}
          uniforms={uniforms}
          vertexShader={coreVertex}
          fragmentShader={coreFragment}
        />
      </mesh>
      <mesh scale={1.55}>
        <icosahedronGeometry args={[radius, 1]} />
        <meshBasicMaterial
          color={wire}
          wireframe
          transparent
          opacity={0.14}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------- WireCage */

export function WireCage({ radius = 2.3, opacity = 0.1, color = EM.emerald }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = -t * 0.12;
    ref.current.rotation.x = t * 0.08;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[radius, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}

/* ---------------------------------------------------------------- PrismRings */

export function PrismRings({
  count = 3,
  colors = [EM.emerald, EM.cyan, EM.mint],
}: {
  count?: number;
  colors?: string[];
}) {
  const group = useRef<THREE.Group>(null);
  const rings = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        radius: 2 + i * 0.55,
        tilt: [Math.PI / 2 + i * 0.42, i * 0.6, i * 0.35] as [number, number, number],
        color: colors[i % colors.length],
        speed: 0.25 + i * 0.16,
      })),
    [count, colors],
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      child.rotation.z += delta * rings[i].speed;
      child.rotation.x = rings[i].tilt[0] + Math.sin(state.clock.elapsedTime * 0.25 + i) * 0.12;
    });
  });

  return (
    <group ref={group}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={ring.tilt}>
          <torusGeometry args={[ring.radius, 0.008, 6, 128]} />
          <meshBasicMaterial
            color={ring.color}
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

/* ------------------------------------------------------------- ParticleDrift */

const pointVertex = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  varying float vPhase;

  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.35 + aPhase) * 0.22;
    p.x += cos(uTime * 0.22 + aPhase * 1.7) * 0.14;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = min(aSize * uPixelRatio * (46.0 / max(-mv.z, 0.001)), 24.0 * uPixelRatio);
    vAlpha = (0.25 + 0.75 * pow(abs(sin(uTime * 0.6 + aPhase)), 2.0)) * smoothstep(0.5, 2.0, -mv.z);
    vPhase = aPhase;
    gl_Position = projectionMatrix * mv;
  }
`;

const pointFragment = /* glsl */ `
  uniform vec3 uCold;
  uniform vec3 uWarm;
  varying float vAlpha;
  varying float vPhase;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    vec3 c = mix(uCold, uWarm, abs(sin(vPhase)));
    gl_FragColor = vec4(c, a * vAlpha);
  }
`;

export function ParticleDrift({
  count = 900,
  spread = 16,
  depth = 22,
  cold = EM.emerald,
  warm = EM.cyan,
}: {
  count?: number;
  spread?: number;
  depth?: number;
  cold?: string;
  warm?: string;
}) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * depth;
      sizes[i] = 0.6 + Math.random() * 1.9;
      phases[i] = Math.random() * Math.PI * 2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    return g;
  }, [count, spread, depth]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uCold: { value: new THREE.Color(cold) },
      uWarm: { value: new THREE.Color(warm) },
    }),
    [gl, cold, warm],
  );

  useFrame((state) => {
    if (mat.current) mat.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={pointVertex}
        fragmentShader={pointFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ---------------------------------------------------------------- OrbitalKnot */

export function OrbitalKnot() {
  const knot = useRef<THREE.Mesh>(null);
  const orbiters = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const nodes = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        radius: 2.1 + (i % 3) * 0.42,
        offset: (i / 12) * Math.PI * 2,
        tilt: ((i % 3) - 1) * 0.55,
        speed: 0.35 + (i % 4) * 0.12,
      })),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (knot.current) {
      knot.current.rotation.x = t * 0.22;
      knot.current.rotation.y = t * 0.31;
    }
    if (orbiters.current) {
      nodes.forEach((node, i) => {
        const a = node.offset + t * node.speed;
        dummy.position.set(
          Math.cos(a) * node.radius,
          Math.sin(a * 1.0) * node.radius * Math.sin(node.tilt + 1.1) * 0.6,
          Math.sin(a) * node.radius * Math.cos(node.tilt),
        );
        dummy.rotation.set(a, a * 0.5, 0);
        const s = 0.085 + Math.sin(t * 1.6 + i) * 0.02;
        dummy.scale.setScalar(s);
        dummy.updateMatrix();
        orbiters.current!.setMatrixAt(i, dummy.matrix);
      });
      orbiters.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      <mesh ref={knot}>
        <torusKnotGeometry args={[1.15, 0.34, 220, 28, 2, 3]} />
        <meshBasicMaterial
          color={EM.emerald}
          wireframe
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <instancedMesh ref={orbiters} args={[undefined, undefined, 12]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={EM.mint}
          emissive={new THREE.Color(EM.emerald)}
          emissiveIntensity={1.5}
          roughness={0.25}
          metalness={0.1}
        />
      </instancedMesh>
    </group>
  );
}

/* ------------------------------------------------------------------ DataHelix */

export function DataHelix() {
  const strands = useRef<THREE.InstancedMesh>(null);
  const rungs = useRef<THREE.InstancedMesh>(null);
  const group = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { beads, bars } = useMemo(() => {
    const rungsCount = 22;
    const height = 4.2;
    const beads: { pos: [number, number, number]; strand: number }[] = [];
    const bars: { pos: [number, number, number]; rot: number }[] = [];
    for (let i = 0; i < rungsCount; i++) {
      const f = i / (rungsCount - 1);
      const y = (f - 0.5) * height;
      const a = f * Math.PI * 3.4;
      const r = 0.95;
      const x1 = Math.cos(a) * r;
      const z1 = Math.sin(a) * r;
      const x2 = Math.cos(a + Math.PI) * r;
      const z2 = Math.sin(a + Math.PI) * r;
      beads.push({ pos: [x1, y, z1], strand: 0 });
      beads.push({ pos: [x2, y, z2], strand: 1 });
      bars.push({ pos: [0, y, 0], rot: -a });
    }
    return { beads, bars };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.35;
    if (strands.current) {
      beads.forEach((bead, i) => {
        const pulse = 1 + Math.sin(t * 2.4 + i * 0.5) * 0.18;
        dummy.position.set(bead.pos[0], bead.pos[1], bead.pos[2]);
        dummy.rotation.set(t * 0.6, t * 0.4, 0);
        dummy.scale.setScalar(0.11 * pulse);
        dummy.updateMatrix();
        strands.current!.setMatrixAt(i, dummy.matrix);
      });
      strands.current.instanceMatrix.needsUpdate = true;
    }
    if (rungs.current) {
      bars.forEach((bar, i) => {
        dummy.position.set(bar.pos[0], bar.pos[1], bar.pos[2]);
        dummy.rotation.set(0, bar.rot + t * 0.0, Math.PI / 2);
        dummy.scale.set(1.9, 0.022, 0.022);
        dummy.updateMatrix();
        rungs.current!.setMatrixAt(i, dummy.matrix);
      });
      rungs.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      <instancedMesh ref={strands} args={[undefined, undefined, beads.length]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={EM.mint}
          emissive={new THREE.Color(EM.emerald)}
          emissiveIntensity={1.4}
          roughness={0.3}
        />
      </instancedMesh>
      <instancedMesh ref={rungs} args={[undefined, undefined, bars.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color={EM.cyan}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  );
}

/* ----------------------------------------------------------------- ShardStorm */

export function ShardStorm({ count = 200 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const shards = useMemo(
    () =>
      Array.from({ length: count }, () => {
        const ring = 1.1 + Math.random() * 1.5;
        const a = Math.random() * Math.PI * 2;
        return {
          ring,
          a,
          y: (Math.random() - 0.5) * 1.5,
          speed: 0.25 + Math.random() * 0.7,
          spin: 0.6 + Math.random() * 2.2,
          size: 0.045 + Math.random() * 0.075,
          phase: Math.random() * Math.PI * 2,
        };
      }),
    [count],
  );

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    shards.forEach((s, i) => {
      const a = s.a + t * s.speed;
      const r = s.ring + Math.sin(t * 0.8 + s.phase) * 0.18;
      dummy.position.set(Math.cos(a) * r, s.y + Math.sin(t * 0.9 + s.phase) * 0.25, Math.sin(a) * r);
      dummy.rotation.set(t * s.spin, t * s.spin * 0.7, s.phase);
      dummy.scale.setScalar(s.size);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={EM.emerald}
        emissive={new THREE.Color(EM.deep)}
        emissiveIntensity={0.8}
        roughness={0.35}
        metalness={0.35}
        flatShading
      />
    </instancedMesh>
  );
}

/* ---------------------------------------------------------------- WireTerrain */

export function WireTerrain({ segments = 64 }: { segments?: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const base = useMemo(() => {
    const g = new THREE.PlaneGeometry(11, 11, segments, segments);
    g.rotateX(-Math.PI / 2);
    return g;
  }, [segments]);

  const positions = useMemo(() => base.attributes.position.array.slice(), [base]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime * 0.5;
    const attr = mesh.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 2];
      arr[i + 1] =
        Math.sin(x * 0.55 + t) * 0.42 +
        Math.cos(z * 0.42 - t * 0.8) * 0.38 +
        Math.sin((x + z) * 0.24 + t * 0.6) * 0.3;
    }
    attr.needsUpdate = true;
  });

  return (
    <mesh ref={mesh} geometry={base} position={[0, -1.1, 0]}>
      <meshBasicMaterial color={EM.emerald} wireframe transparent opacity={0.34} />
    </mesh>
  );
}

/* ------------------------------------------------------------- Ground glow ring */

export function GroundGlow() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const m = ref.current.material as THREE.MeshBasicMaterial;
    m.opacity = 0.16 + Math.sin(t * 0.9) * 0.06;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
      <ringGeometry args={[1.4, 3.4, 72]} />
      <meshBasicMaterial
        color={EM.emerald}
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ----------------------------------------------------------- Pointer parallax */

export function ParallaxRig({
  children,
  strength = 0.35,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const targetY = state.pointer.x * strength;
    const targetX = -state.pointer.y * strength * 0.7;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.045;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.045;
  });

  return <group ref={group}>{children}</group>;
}
