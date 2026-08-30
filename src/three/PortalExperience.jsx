import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Stars, Float } from "@react-three/drei";
import * as THREE from "three";
import { profile, stats, skills } from "../data/content";
import Panel from "./ScrollPanel";

// ---------------------------------------------------------------------------
// PROTOTYPE: scroll-driven "fly into the portal" 3D experience.
//
// Instead of the page scrolling up, the camera dollies forward through a
// tunnel of glowing rings — scrolling = moving deeper into the world.
//
// The rotating crystal below (EnergyCrystal) is a placeholder built from
// primitive geometry. To use a real 3D model instead:
//
//   1. Drop a .glb/.gltf file into `public/models/your-model.glb`
//   2. import { useGLTF } from "@react-three/drei"
//   3. const { scene } = useGLTF("/models/your-model.glb")
//      return <primitive object={scene} />
//
// Everything else (camera rig, rings, scroll-synced HTML panels) stays the
// same regardless of what mesh you place in the scene.
// ---------------------------------------------------------------------------

const RING_COLORS = ["#ef233c", "#ff8c1a", "#2f6fed", "#22c98a", "#ffc433"];
const RING_COUNT = 10;
const RING_SPACING = 8;
const TUNNEL_LENGTH = RING_COUNT * RING_SPACING;

function CameraRig() {
  const scroll = useScroll();

  useFrame((state, delta) => {
    const targetZ = 10 - scroll.offset * TUNNEL_LENGTH;
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      targetZ,
      4,
      delta
    );

    // subtle camera drift for a "flying" feel
    const t = state.clock.elapsedTime;
    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      Math.sin(t * 0.15) * 0.4,
      2,
      delta
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      Math.cos(t * 0.2) * 0.25,
      2,
      delta
    );
    state.camera.lookAt(0, 0, state.camera.position.z - 10);
  });

  return null;
}

function PortalRings() {
  const rings = Array.from({ length: RING_COUNT }, (_, i) => ({
    z: -i * RING_SPACING,
    color: RING_COLORS[i % RING_COLORS.length],
    rotation: (i % 2 === 0 ? 1 : -1) * (Math.PI / 10),
    scale: 3 + (i % 3) * 0.4,
  }));

  return (
    <>
      {rings.map((ring, i) => (
        <group key={i} position={[0, 0, ring.z]} rotation={[0, 0, ring.rotation]}>
          <mesh scale={ring.scale}>
            <torusGeometry args={[1.6, 0.04, 16, 64]} />
            <meshBasicMaterial color={ring.color} transparent opacity={0.55} />
          </mesh>
          <mesh scale={ring.scale} rotation={[0, 0, Math.PI / 8]}>
            <torusGeometry args={[1.6, 0.015, 16, 64]} />
            <meshBasicMaterial color={ring.color} transparent opacity={0.3} />
          </mesh>
        </group>
      ))}
    </>
  );
}

// Placeholder "3D model" — swap for a real glTF via useGLTF (see notes above).
function EnergyCrystal({ position = [0, 0, -18] }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.4;
    ref.current.rotation.x += delta * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1.2}>
      <group position={position} ref={ref}>
        <mesh>
          <icosahedronGeometry args={[1.4, 0]} />
          <meshStandardMaterial
            color="#ef233c"
            emissive="#ff5c5c"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.6}
            wireframe={false}
          />
        </mesh>
        <mesh scale={1.15}>
          <icosahedronGeometry args={[1.4, 0]} />
          <meshBasicMaterial color="#2f6fed" wireframe transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 2, 4]} intensity={40} color="#ef233c" distance={20} />
      <pointLight position={[0, -2, -18]} intensity={35} color="#2f6fed" distance={22} />
      <pointLight position={[0, 2, -34]} intensity={35} color="#22c98a" distance={22} />
    </>
  );
}

function Scene3D() {
  return (
    <>
      <CameraRig />
      <SceneLights />
      <Stars radius={60} depth={40} count={2500} factor={2.5} fade speed={0.6} />
      <PortalRings />
      <EnergyCrystal position={[0, 0, -18]} />
    </>
  );
}

function Overlay() {
  return (
    <div className="relative w-full" style={{ height: "500vh" }}>
      <Panel top={20}>
        <p className="font-accent text-xs uppercase tracking-widest text-leaf-400 mb-4">
          {profile.alias}
        </p>
        <h1 className="font-display text-5xl sm:text-7xl text-white text-glow-strawhat mb-4">
          {profile.name}
        </h1>
        <p className="text-stone-350">{profile.tagline}</p>
        <p className="mt-8 text-xs text-stone-500 uppercase tracking-widest animate-pulse">
          Scroll to fly in ↓
        </p>
      </Panel>

      <Panel top={110} align="left">
        <p className="font-accent text-xs uppercase tracking-widest text-soul-400 mb-2">
          Character Sheet
        </p>
        <h2 className="font-display text-3xl text-white text-glow-soul mb-4">
          About Me
        </h2>
        <p className="text-sm text-stone-350 mb-4">{profile.bio}</p>
        <div className="space-y-2">
          {stats.slice(0, 3).map((s) => (
            <div key={s.label} className="text-xs">
              <div className="flex justify-between text-stone-350 mb-1">
                <span>{s.label}</span>
                <span className="text-leaf-400">{s.value}/100</span>
              </div>
              <div className="h-1.5 rounded-full bg-void-700 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-strawhat-500 to-hero-500"
                  style={{ width: `${s.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel top={210} align="right">
        <p className="font-accent text-xs uppercase tracking-widest text-gold-400 mb-2">
          Ability List
        </p>
        <h2 className="font-display text-3xl text-white text-glow-leaf mb-4">
          Skills &amp; Jutsu
        </h2>
        <div className="flex flex-wrap gap-2 md:justify-end">
          {skills.slice(0, 6).map((s) => (
            <span
              key={s.name}
              className="text-[10px] uppercase tracking-wide font-accent px-2 py-1 bg-void-800/80 border border-white/10 text-white/80 rounded-sm"
            >
              {s.name}
            </span>
          ))}
        </div>
      </Panel>

      <Panel top={310}>
        <p className="font-accent text-xs uppercase tracking-widest text-strawhat-400 mb-2">
          Bounty Board
        </p>
        <h2 className="font-display text-3xl text-white text-glow-strawhat mb-4">
          Missions Completed
        </h2>
        <p className="text-sm text-stone-350">
          Keep scrolling through the portal to reach the mission log, training
          arc, and contact transponder — or switch back to Classic Mode any
          time.
        </p>
      </Panel>

      <Panel top={410}>
        <p className="font-accent text-xs uppercase tracking-widest text-soul-400 mb-2">
          Incoming Call
        </p>
        <h2 className="font-display text-4xl text-white text-glow-soul mb-4">
          You&apos;ve Reached the Core
        </h2>
        <a
          href="#contact"
          className="inline-block px-6 py-3 font-accent text-xs uppercase tracking-widest bg-strawhat-500 hover:bg-strawhat-400 text-white rounded-sm shadow-[0_0_25px_rgba(239,35,60,0.5)] transition-all hover:scale-105"
        >
          Send Transponder Call
        </a>
      </Panel>
    </div>
  );
}

export default function PortalExperience() {
  return (
    <div className="fixed inset-0 bg-void-950">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 100 }}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.25}>
            <Scene3D />
            <Scroll html style={{ width: "100%" }}>
              <Overlay />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
