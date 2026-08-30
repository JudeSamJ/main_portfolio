import { Suspense, useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ScrollControls,
  Scroll,
  useScroll,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";
import { profile, stats, skills, projects } from "../data/content";
import Panel from "./ScrollPanel";

// ---------------------------------------------------------------------------
// PROTOTYPE: "run through the world" video-game-style scroll experience.
//
// A character runs forward along a winding path through a low-poly forest.
// Scrolling advances the character along the path (not the camera alone) and
// a third-person chase camera follows behind/above, banking through turns —
// closer to a game camera than a slideshow dolly.
//
// PLACEHOLDER MODEL: `public/models/RobotExpressive.glb` is three.js's CC0
// sample rigged character (by Tomás Laulhé), used here only to prove out the
// path/camera/animation mechanics. Swap in your real character:
//
//   1. Drop your rigged, animated .glb into `public/models/your-character.glb`
//   2. Change PATH below to that filename
//   3. Update RUN_CLIP / IDLE_CLIP to match your model's animation names
//      (check them by importing the file into https://gltf.report or logging
//      `names` from useAnimations in dev tools)
//
// The path, forest, camera rig, and scroll wiring all stay the same.
// ---------------------------------------------------------------------------

const MODEL_PATH = "/models/RobotExpressive.glb";
const RUN_CLIP = "Running";
const IDLE_CLIP = "Idle";

// A winding path through the forest — swap/extend these waypoints to change
// the route. x/z = ground position, y = slight elevation change.
const WAYPOINTS = [
  [0, 0, 0],
  [3, 0, -14],
  [-4, 0.6, -30],
  [-2, 0, -46],
  [5, -0.4, -62],
  [2, 0, -78],
  [-3, 0.4, -94],
  [0, 0, -112],
];

const curve = new THREE.CatmullRomCurve3(
  WAYPOINTS.map((p) => new THREE.Vector3(...p)),
  false,
  "catmullrom",
  0.4
);
const PATH_LENGTH = curve.getLength();

function useForestLayout(count, seed = 1) {
  return useMemo(() => {
    let s = seed;
    const rand = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    const trees = [];
    for (let i = 0; i < count; i++) {
      const u = rand();
      const point = curve.getPointAt(u);
      const side = rand() < 0.5 ? -1 : 1;
      const offset = 4 + rand() * 10;
      const tangent = curve.getTangentAt(u);
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
      const pos = point.clone().addScaledVector(normal, side * offset);
      trees.push({
        position: [pos.x, 0, pos.z],
        scale: 0.8 + rand() * 0.9,
        rotation: rand() * Math.PI * 2,
        hue: 0.28 + rand() * 0.08,
      });
    }
    return trees;
  }, [count, seed]);
}

function Tree({ position, scale, rotation, hue }) {
  const foliageColor = useMemo(
    () => new THREE.Color().setHSL(hue, 0.45, 0.28),
    [hue]
  );
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.22, 2, 6]} />
        <meshStandardMaterial color="#3b2a1f" roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.6, 0]} castShadow>
        <coneGeometry args={[1.1, 2.2, 7]} />
        <meshStandardMaterial color={foliageColor} roughness={0.8} />
      </mesh>
      <mesh position={[0, 3.6, 0]} castShadow>
        <coneGeometry args={[0.8, 1.6, 7]} />
        <meshStandardMaterial color={foliageColor} roughness={0.8} />
      </mesh>
    </group>
  );
}

function Forest() {
  const trees = useForestLayout(160, 7);
  return (
    <group>
      {trees.map((t, i) => (
        <Tree key={i} {...t} />
      ))}
    </group>
  );
}

function Ground() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.02, -PATH_LENGTH / 2]}
      receiveShadow
    >
      <planeGeometry args={[140, PATH_LENGTH + 60]} />
      <meshStandardMaterial color="#0e1a12" roughness={1} />
    </mesh>
  );
}

// Thin glowing line marking the path itself, like a trail of energy.
function PathTrail() {
  const points = useMemo(() => curve.getPoints(200).map((p) => [p.x, 0.03, p.z]), []);
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flat())}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#ffc433" transparent opacity={0.35} />
    </line>
  );
}

function Runner({ progressRef }) {
  const group = useRef();
  const { scene, animations } = useGLTF(MODEL_PATH);
  const { actions } = useAnimations(animations, group);
  const currentAction = useRef(null);

  useEffect(() => {
    const idle = actions[IDLE_CLIP];
    idle?.reset().fadeIn(0.3).play();
    currentAction.current = idle;
    return () => idle?.fadeOut(0.2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const u = progressRef.current.smoothed;
    const point = curve.getPointAt(Math.min(Math.max(u, 0), 1));
    const tangent = curve.getTangentAt(Math.min(Math.max(u, 0.0001), 0.9999));

    group.current.position.copy(point);
    const targetAngle = Math.atan2(tangent.x, tangent.z);
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetAngle,
      6,
      delta
    );

    const running = progressRef.current.speed > 0.0006;
    const wantClip = running ? RUN_CLIP : IDLE_CLIP;
    if (currentAction.current !== actions[wantClip] && actions[wantClip]) {
      actions[wantClip].reset().fadeIn(0.25).play();
      currentAction.current?.fadeOut(0.25);
      currentAction.current = actions[wantClip];
    }
  });

  return <primitive ref={group} object={scene} scale={1} />;
}

function CameraRig({ progressRef }) {
  useFrame((state, delta) => {
    const u = progressRef.current.smoothed;
    const point = curve.getPointAt(Math.min(Math.max(u, 0), 1));
    const tangent = curve
      .getTangentAt(Math.min(Math.max(u, 0.0001), 0.9999))
      .normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x);

    // Chase camera: behind + above the runner, banking slightly into turns.
    // Character is ~4.8 units tall, so keep enough distance for full-body framing.
    const behind = point
      .clone()
      .addScaledVector(tangent, -10)
      .add(new THREE.Vector3(0, 4.5, 0));
    const bank = normal.dot(new THREE.Vector3(1, 0, 0)) * 0.35;

    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      behind.x,
      3,
      delta
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      behind.y,
      3,
      delta
    );
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      behind.z,
      3,
      delta
    );

    const lookTarget = point.clone().addScaledVector(tangent, 2).add(new THREE.Vector3(0, 2.4, 0));
    state.camera.lookAt(lookTarget);
    state.camera.rotation.z = THREE.MathUtils.damp(
      state.camera.rotation.z,
      bank,
      3,
      delta
    );
  });
  return null;
}

function useScrollProgress() {
  const scroll = useScroll();
  const progressRef = useRef({ smoothed: 0, speed: 0 });

  useFrame((state, delta) => {
    const target = scroll.offset;
    const prev = progressRef.current.smoothed;
    const next = THREE.MathUtils.damp(prev, target, 4, delta);
    progressRef.current.speed = Math.abs(next - prev) / Math.max(delta, 0.0001) / 10;
    progressRef.current.smoothed = next;
  });

  return progressRef;
}

function Scene3D() {
  const progressRef = useScrollProgress();
  return (
    <>
      <fog attach="fog" args={["#060a08", 15, 70]} />
      <ambientLight intensity={0.35} color="#9fd8b8" />
      <directionalLight
        position={[10, 18, 6]}
        intensity={1.4}
        color="#ffe9b0"
        castShadow
      />
      <hemisphereLight args={["#3a5a3f", "#0a0f0a", 0.6]} />
      <Suspense fallback={null}>
        <Ground />
        <PathTrail />
        <Forest />
        <Runner progressRef={progressRef} />
      </Suspense>
      <CameraRig progressRef={progressRef} />
    </>
  );
}

function Overlay() {
  return (
    <div className="relative w-full" style={{ height: "600vh" }}>
      <Panel top={20}>
        <p className="font-accent text-xs uppercase tracking-widest text-leaf-400 mb-4">
          {profile.alias}
        </p>
        <h1 className="font-display text-5xl sm:text-7xl text-white text-glow-strawhat mb-4">
          {profile.name}
        </h1>
        <p className="text-stone-350">{profile.tagline}</p>
        <p className="mt-8 text-xs text-stone-500 uppercase tracking-widest animate-pulse">
          Scroll to start running ↓
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

      <Panel top={230} align="right">
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

      <Panel top={350} align="left">
        <p className="font-accent text-xs uppercase tracking-widest text-strawhat-400 mb-2">
          Bounty Board
        </p>
        <h2 className="font-display text-3xl text-white text-glow-strawhat mb-4">
          Missions Completed
        </h2>
        <ul className="space-y-2 text-sm text-stone-350">
          {projects.slice(0, 3).map((p) => (
            <li key={p.title}>
              <span className="text-white/90">{p.title}</span> — {p.tags.join(", ")}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel top={470}>
        <p className="font-accent text-xs uppercase tracking-widest text-soul-400 mb-2">
          Journey&apos;s End
        </p>
        <h2 className="font-display text-4xl text-white text-glow-soul mb-4">
          You&apos;ve Reached the Clearing
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

export default function RunExperience() {
  return (
    <div className="fixed inset-0 bg-[#060a08]">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [-2.1, 4.5, 9.8], fov: 55, near: 0.1, far: 200 }}
      >
        <ScrollControls pages={6} damping={0.2}>
          <Scene3D />
          <Scroll html style={{ width: "100%" }}>
            <Overlay />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
