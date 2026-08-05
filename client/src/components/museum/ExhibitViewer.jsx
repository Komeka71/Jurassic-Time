import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows, Html } from "@react-three/drei";

function FossilModel({ url, autoRotate, ...props }) {
  const group = useRef(null);
  const { scene } = useGLTF(url);

  useFrame((_, delta) => {
    if (autoRotate && group.current) {
      group.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={group} {...props}>
      <primitive object={scene} />
    </group>
  );
}

function Pedestal() {
  return (
    <group position={[0, -1.05, 0]}>
      <mesh receiveShadow castShadow position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1.15, 1.3, 0.3, 48]} />
        <meshStandardMaterial color="#2b2622" roughness={0.85} metalness={0.05} />
      </mesh>
      <mesh receiveShadow position={[0, -0.12, 0]}>
        <cylinderGeometry args={[1.35, 1.5, 0.18, 48]} />
        <meshStandardMaterial color="#1c1815" roughness={0.9} />
      </mesh>
    </group>
  );
}

/**
 * Museum-themed loading placeholder shown inside the Canvas via Suspense.
 * Rendered in-scene (not a DOM overlay) so it sits correctly with the
 * pedestal and lighting already in view.
 */
function ExhibitLoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 select-none">
        {/* pulsing bone-shaped silhouette */}
        <div className="relative flex h-14 w-14 items-center justify-center">
          
          <svg
            viewBox="0 0 64 64"
            className="h-10 w-10 animate-pulse text-amber-100/40"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M14 24a6 6 0 1 0-8.5 8.5 6 6 0 0 0 3.4 1.7l17.9 17.9a6 6 0 0 0 1.7 3.4A6 6 0 1 0 37 47l-6-6a3 3 0 0 1 0-4l4-4a3 3 0 0 1 4 0l6 6a6 6 0 1 0 8.5-8.5 6 6 0 0 0-3.4-1.7L32.1 10.9a6 6 0 0 0-1.7-3.4A6 6 0 1 0 22 16l6 6a3 3 0 0 1 0 4l-4 4a3 3 0 0 1-4 0l-6-6z" />
          </svg>
          <span className="absolute inset-0 animate-ping rounded-full bg-amber-200/10" />
        </div>

        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-amber-100/60">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-300 [animation-delay:-0.2s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-300 [animation-delay:-0.1s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-300" />
          <span className="ml-1">Preparing exhibit</span>
        </div>
      </div>
    </Html>
  );
}

/**
 * ExhibitViewer
 * Reusable 3D viewer for a dinosaur fossil/skeleton GLB, on a museum
 * pedestal with soft lighting. Idle-rotates, pauses while the user drags/zooms.
 * Preloads the GLB as soon as it mounts (or modelUrl changes) so the
 * Suspense fallback is only briefly visible on a cold load.
 */
export default function ExhibitViewer({ modelUrl, label = "Featured Fossil", height = 420, className = "" }) {
  const [autoRotate, setAutoRotate] = useState(true);
  const idleTimer = useRef(null);

  useEffect(() => {
    if (!modelUrl) return;
    useGLTF.preload(modelUrl);
  }, [modelUrl]);

  const pauseAutoRotate = () => {
    setAutoRotate(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setAutoRotate(true), 2500);
  };

  return (
    <div className={`relative w-full ${className}`} style={{ height }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.6, 4.2], fov: 40 }}
        onPointerDown={pauseAutoRotate}
        onWheel={pauseAutoRotate}
      >
        <ambientLight intensity={0.35} />
        <spotLight position={[3, 5, 3]} angle={0.35} penumbra={0.6} intensity={1.1} castShadow shadow-mapSize={[1024, 1024]} color="#fff4e0" />
        <spotLight position={[-4, 3, -2]} angle={0.4} penumbra={0.8} intensity={0.35} color="#dce8ff" />

        <Suspense fallback={<ExhibitLoadingFallback />}>
          <FossilModel url={modelUrl} autoRotate={autoRotate} position={[0, -0.2, 0]} />
          <Environment preset="apartment" />
        </Suspense>

        <Pedestal />
        <ContactShadows position={[0, -1.2, 0]} opacity={0.5} scale={6} blur={2.4} far={2} />

        <OrbitControls
          enablePan={false}
          minDistance={2.2}
          maxDistance={6}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate={autoRotate}
          autoRotateSpeed={0.6}
        />
      </Canvas>

      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-amber-100/80 backdrop-blur-sm">
        {label} · drag to rotate · scroll to zoom
      </div>
    </div>
  );
}