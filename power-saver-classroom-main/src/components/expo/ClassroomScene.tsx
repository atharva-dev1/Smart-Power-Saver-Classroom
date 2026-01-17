import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text, Environment, MeshReflectorMaterial } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SystemState } from '@/hooks/useSystemState';

interface ClassroomSceneProps {
  state: SystemState;
}

export function ClassroomScene({ state }: ClassroomSceneProps) {
  return (
    <div className="w-full h-full min-h-[400px] rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border border-expo-cyan/20">
      <Canvas
        camera={{ position: [10, 8, 10], fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene state={state} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#0ea5e9" wireframe />
    </mesh>
  );
}

function Scene({ state }: { state: SystemState }) {
  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[8, 12, 8]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} color="#60a5fa" />

      {/* Room light effect when on */}
      {state.lightOn && (
        <>
          <pointLight
            position={[-1.5, 3.5, 0]}
            intensity={3}
            color="#fef08a"
            distance={10}
            decay={2}
          />
          <pointLight
            position={[1.5, 3.5, 0]}
            intensity={3}
            color="#fef08a"
            distance={10}
            decay={2}
          />
        </>
      )}

      {/* Fog for depth */}
      <fog attach="fog" args={['#0f172a', 15, 35]} />

      {/* Classroom structure */}
      <Classroom lightOn={state.lightOn} />

      {/* Furniture */}
      <ClassroomFurniture />

      {/* Ceiling fixtures */}
      <CeilingLight on={state.lightOn} position={[-1.5, 3.9, 0]} />
      <CeilingLight on={state.lightOn} position={[1.5, 3.9, 0]} />
      <CeilingFan spinning={state.fanOn} />
      <ProjectionScreen deployed={state.lightOn} />

      {/* Electronics table with components */}
      <ElectronicsTable state={state} />

      {/* Human silhouette */}
      {/* Students in classroom */}
      {state.pirDetecting && <Students pirDetecting={state.pirDetecting} />}

      {/* Data flow visualization */}
      {(state.pirDetecting || state.mode === 'override') && <DataFlowParticles />}

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={8}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 6}
        autoRotate
        autoRotateSpeed={0.3}
        target={[0, 1.5, 0]}
      />

      <Environment preset="night" />
    </>
  );
}

function Classroom({ lightOn }: { lightOn: boolean }) {
  const wallColor = lightOn ? '#3b4a6b' : '#1e293b';
  const floorColor = lightOn ? '#4a5568' : '#334155';

  return (
    <group position={[0, 0, 0]}>
      {/* Floor with reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 10]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={0.5}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color={floorColor}
          metalness={0.3}
          mirror={0}
        />
      </mesh>

      {/* Floor tiles pattern */}
      <FloorTiles />

      {/* Back wall */}
      <mesh position={[0, 2, -5]} receiveShadow>
        <boxGeometry args={[12, 4, 0.2]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-6, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 4, 0.2]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>

      {/* Right wall with windows */}
      <group position={[6, 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[10, 4, 0.2]} />
          <meshStandardMaterial color={wallColor} roughness={0.8} />
        </mesh>
        {/* Windows */}
        {[-2, 2].map((z, i) => (
          <group key={i} position={[z, 0.5, 0.15]}>
            {/* Window frame */}
            <mesh>
              <boxGeometry args={[2.2, 2.2, 0.08]} />
              <meshStandardMaterial color="#1e3a5f" metalness={0.3} />
            </mesh>
            {/* Glass */}
            <mesh position={[0, 0, 0.05]}>
              <boxGeometry args={[1.8, 1.8, 0.02]} />
              <meshStandardMaterial
                color="#38bdf8"
                opacity={0.3}
                transparent
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            {/* Window cross */}
            <mesh position={[0, 0, 0.1]}>
              <boxGeometry args={[0.05, 1.8, 0.03]} />
              <meshStandardMaterial color="#374151" />
            </mesh>
            <mesh position={[0, 0, 0.1]}>
              <boxGeometry args={[1.8, 0.05, 0.03]} />
              <meshStandardMaterial color="#374151" />
            </mesh>
          </group>
        ))}
      </group>



      {/* Door in back wall */}
      <group position={[3.5, 1.2, -4.85]}>
        <mesh>
          <boxGeometry args={[1.2, 2.4, 0.15]} />
          <meshStandardMaterial color="#7c3aed" roughness={0.6} />
        </mesh>
        {/* Door handle */}
        <mesh position={[0.4, 0, 0.1]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Door frame */}
        <mesh position={[0, 1.25, 0]}>
          <boxGeometry args={[1.4, 0.1, 0.2]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      </group>

      {/* Ceiling */}
      <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#1e293b" side={THREE.DoubleSide} />
      </mesh>

      {/* Whiteboard */}
      <Whiteboard />

      {/* Clock */}
      <WallClock />

      {/* Ceiling Projector */}
      <CeilingProjector lightOn={lightOn} />

      {/* Wall Posters */}
      <WallPosters />

      {/* AC Unit */}
      <ACUnit running={lightOn} />
    </group>
  );
}

function FloorTiles() {
  const tiles = useMemo(() => {
    const result = [];
    for (let x = -5; x <= 5; x += 2) {
      for (let z = -4; z <= 4; z += 2) {
        result.push({ x, z, color: (x + z) % 4 === 0 ? '#475569' : '#3f4f63' });
      }
    }
    return result;
  }, []);

  return (
    <group position={[0, 0.01, 0]}>
      {tiles.map((tile, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[tile.x, 0, tile.z]}>
          <planeGeometry args={[1.95, 1.95]} />
          <meshStandardMaterial color={tile.color} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Whiteboard() {
  return (
    <group position={[0, 2.2, -4.85]}>
      {/* Board frame */}
      <mesh>
        <boxGeometry args={[4, 2, 0.1]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      {/* White surface */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[3.8, 1.8, 0.02]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Label */}
      <Text position={[0, -1.2, 0.1]} fontSize={0.15} color="#94a3b8">
        Smart Classroom
      </Text>
    </group>
  );
}

function WallClock() {
  return (
    <group position={[-5.85, 3, 0]}>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[0.03, 0, 0]}>
        <circleGeometry args={[0.35, 32]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      {/* Clock hands */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[0.04, 0.1, 0]}>
        <boxGeometry args={[0.02, 0.2, 0.01]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, Math.PI / 4]} position={[0.04, 0.05, 0.05]}>
        <boxGeometry args={[0.02, 0.15, 0.01]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
    </group>
  );
}

function CeilingProjector({ lightOn }: { lightOn: boolean }) {
  return (
    <group position={[0, 3.6, -2]}>
      {/* Mounting bracket */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
        <meshStandardMaterial color="#374151" metalness={0.5} />
      </mesh>
      {/* Projector body */}
      <mesh castShadow>
        <boxGeometry args={[0.6, 0.25, 0.45]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Lens housing */}
      <mesh position={[0, -0.08, 0.25]}>
        <cylinderGeometry args={[0.12, 0.1, 0.12, 16]} />
        <meshStandardMaterial color="#0f172a" metalness={0.6} />
      </mesh>
      {/* Lens glass */}
      <mesh position={[0, -0.08, 0.31]}>
        <circleGeometry args={[0.08, 16]} />
        <meshStandardMaterial
          color={lightOn ? "#60a5fa" : "#1e40af"}
          emissive={lightOn ? "#3b82f6" : "#000000"}
          emissiveIntensity={lightOn ? 0.5 : 0}
          metalness={0.9}
        />
      </mesh>
      {/* Vents */}
      {[-0.18, 0.18].map((x, i) => (
        <mesh key={i} position={[x, 0, -0.23]}>
          <boxGeometry args={[0.1, 0.12, 0.02]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      ))}
      {/* Status LED */}
      <mesh position={[0.25, 0.05, 0.23]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial
          color={lightOn ? "#22c55e" : "#ef4444"}
          emissive={lightOn ? "#22c55e" : "#ef4444"}
          emissiveIntensity={1}
        />
      </mesh>
      {/* Label */}
      <Float speed={2} floatIntensity={0.1}>
        <Text
          position={[0, -0.4, 0.3]}
          fontSize={0.12}
          color="#22d3ee"
          anchorX="center"
          outlineWidth={0.01}
          outlineColor="#0f172a"
        >
          Projector
        </Text>
      </Float>
    </group>
  );
}

function ProjectionScreen({ deployed }: { deployed: boolean }) {
  const screenRef = useRef<THREE.Group>(null);
  const targetY = deployed ? 1.8 : 0.1;

  useFrame((_, delta) => {
    if (screenRef.current) {
      const currentScale = screenRef.current.scale.y;
      const newScale = THREE.MathUtils.lerp(currentScale, deployed ? 1 : 0.05, delta * 3);
      screenRef.current.scale.y = newScale;

      // Update position to keep top anchored
      const screenHeight = 2;
      screenRef.current.position.y = 3.9 - (screenHeight * newScale) / 2;
    }
  });

  return (
    <group position={[0, 0, -4.6]}>
      {/* Roller housing */}
      <mesh position={[0, 3.95, 0]}>
        <boxGeometry args={[3.5, 0.12, 0.15]} />
        <meshStandardMaterial color="#374151" metalness={0.5} />
      </mesh>
      {/* End caps */}
      {[-1.8, 1.8].map((x, i) => (
        <mesh key={i} position={[x, 3.95, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.18, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.6} />
        </mesh>
      ))}

      {/* Screen */}
      <group ref={screenRef} position={[0, 2.9, 0]}>
        {/* White screen surface */}
        <mesh>
          <boxGeometry args={[3.2, 2, 0.03]} />
          <meshStandardMaterial
            color="#f8fafc"
            roughness={0.3}
            emissive={deployed ? "#e0f2fe" : "#000000"}
            emissiveIntensity={deployed ? 0.1 : 0}
          />
        </mesh>
        {/* Screen border */}
        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[3.3, 2.1, 0.02]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Bottom weight bar */}
        <mesh position={[0, -1.02, 0]}>
          <boxGeometry args={[3.2, 0.06, 0.05]} />
          <meshStandardMaterial color="#374151" metalness={0.4} />
        </mesh>

        {/* Projected content when deployed */}
        {deployed && (
          <group position={[0, 0, 0.02]}>
            {/* Title */}
            <Text position={[0, 0.6, 0]} fontSize={0.18} color="#0ea5e9" anchorX="center" fontWeight="bold">
              Smart Power Saver
            </Text>
            {/* Diagram box */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[2, 0.8, 0.01]} />
              <meshStandardMaterial color="#0c4a6e" opacity={0.5} transparent />
            </mesh>
            {/* Flow arrows */}
            <Text position={[-0.8, 0, 0]} fontSize={0.12} color="#22d3ee" anchorX="center">
              PIR
            </Text>
            <Text position={[0, 0, 0]} fontSize={0.15} color="#fbbf24" anchorX="center">
              →
            </Text>
            <Text position={[0.8, 0, 0]} fontSize={0.12} color="#22d3ee" anchorX="center">
              MCU
            </Text>
            {/* Subtitle */}
            <Text position={[0, -0.6, 0]} fontSize={0.1} color="#94a3b8" anchorX="center">
              Automated Energy Management
            </Text>
          </group>
        )}
      </group>

      {/* Label */}
      <Float speed={2} floatIntensity={0.1}>
        <Text
          position={[0, 3.6, 0.3]}
          fontSize={0.12}
          color="#22d3ee"
          anchorX="center"
          outlineWidth={0.01}
          outlineColor="#0f172a"
        >
          Projection Screen
        </Text>
      </Float>
    </group>
  );
}

function WallPosters() {
  return (
    <group>
      {/* IoT Poster on left wall */}
      <group position={[-5.85, 2.5, -2]} rotation={[0, Math.PI / 2, 0]}>
        {/* Frame */}
        <mesh>
          <boxGeometry args={[1.2, 0.9, 0.05]} />
          <meshStandardMaterial color="#1e3a5f" />
        </mesh>
        {/* Poster content */}
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[1.1, 0.8, 0.01]} />
          <meshStandardMaterial color="#0d9488" />
        </mesh>
        {/* Poster text */}
        <Text position={[0, 0.25, 0.05]} fontSize={0.1} color="#f0fdfa" anchorX="center" fontWeight="bold">
          IoT
        </Text>
        <Text position={[0, 0.05, 0.05]} fontSize={0.06} color="#ccfbf1" anchorX="center">
          Internet of Things
        </Text>
        <Text position={[0, -0.15, 0.05]} fontSize={0.05} color="#99f6e4" anchorX="center">
          Connect Everything
        </Text>
      </group>

      {/* Energy Saving Poster on left wall */}
      <group position={[-5.85, 2.5, 2]} rotation={[0, Math.PI / 2, 0]}>
        {/* Frame */}
        <mesh>
          <boxGeometry args={[1.2, 0.9, 0.05]} />
          <meshStandardMaterial color="#1e3a5f" />
        </mesh>
        {/* Poster content */}
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[1.1, 0.8, 0.01]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>
        {/* Leaf icon using simple geometry */}
        <mesh position={[0, 0.15, 0.05]}>
          <circleGeometry args={[0.12, 3]} />
          <meshStandardMaterial color="#86efac" />
        </mesh>
        <Text position={[0, -0.1, 0.05]} fontSize={0.07} color="#f0fdf4" anchorX="center" fontWeight="bold">
          Save Energy
        </Text>
        <Text position={[0, -0.25, 0.05]} fontSize={0.04} color="#bbf7d0" anchorX="center">
          Go Green!
        </Text>
      </group>

      {/* Circuit Diagram Poster on back wall */}
      <group position={[-3.5, 2.8, -4.85]}>
        {/* Frame */}
        <mesh>
          <boxGeometry args={[1, 0.7, 0.05]} />
          <meshStandardMaterial color="#1e3a5f" />
        </mesh>
        {/* Poster content */}
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[0.9, 0.6, 0.01]} />
          <meshStandardMaterial color="#1e40af" />
        </mesh>
        {/* Circuit lines */}
        <mesh position={[-0.2, 0.1, 0.05]}>
          <boxGeometry args={[0.3, 0.02, 0.01]} />
          <meshStandardMaterial color="#60a5fa" />
        </mesh>
        <mesh position={[0.1, 0, 0.05]}>
          <boxGeometry args={[0.02, 0.25, 0.01]} />
          <meshStandardMaterial color="#60a5fa" />
        </mesh>
        <mesh position={[0.1, -0.15, 0.05]}>
          <boxGeometry args={[0.25, 0.02, 0.01]} />
          <meshStandardMaterial color="#60a5fa" />
        </mesh>
        {/* Component dots */}
        <mesh position={[-0.2, 0.1, 0.05]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0.1, 0.1, 0.05]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
        </mesh>
        <Text position={[0, -0.38, 0.05]} fontSize={0.05} color="#bfdbfe" anchorX="center">
          Arduino Basics
        </Text>
      </group>

      {/* PSIT Logo Poster on back wall */}
      <group position={[4.2, 2.8, -4.85]}>
        {/* Frame */}
        <mesh>
          <boxGeometry args={[0.8, 0.8, 0.05]} />
          <meshStandardMaterial color="#7c3aed" />
        </mesh>
        {/* Poster content */}
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[0.7, 0.7, 0.01]} />
          <meshStandardMaterial color="#581c87" />
        </mesh>
        <Text position={[0, 0.1, 0.05]} fontSize={0.12} color="#e9d5ff" anchorX="center" fontWeight="bold">
          PSIT
        </Text>
        <Text position={[0, -0.12, 0.05]} fontSize={0.05} color="#c4b5fd" anchorX="center">
          CHE
        </Text>
        <Text position={[0, -0.25, 0.05]} fontSize={0.04} color="#a78bfa" anchorX="center">
          Tech Expo 2K25
        </Text>
      </group>

      {/* Safety Rules Poster */}
      <group position={[-5.85, 1.3, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Frame */}
        <mesh>
          <boxGeometry args={[1.4, 1, 0.05]} />
          <meshStandardMaterial color="#1e3a5f" />
        </mesh>
        {/* Poster content */}
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[1.3, 0.9, 0.01]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        <Text position={[0, 0.3, 0.05]} fontSize={0.08} color="#fef2f2" anchorX="center" fontWeight="bold">
          Lab Safety
        </Text>
        {/* Safety icons - simple circles */}
        {[-0.35, 0, 0.35].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.05]}>
            <circleGeometry args={[0.1, 16]} />
            <meshStandardMaterial color="#fef2f2" />
          </mesh>
        ))}
        <Text position={[0, -0.3, 0.05]} fontSize={0.05} color="#fecaca" anchorX="center">
          Safety First!
        </Text>
      </group>
    </group>
  );
}

function ACUnit({ running }: { running: boolean }) {
  const ventRef = useRef<THREE.Group>(null);
  const ventAngle = useRef(0);

  useFrame((_, delta) => {
    if (ventRef.current && running) {
      // Oscillate vents back and forth
      ventAngle.current += delta * 2;
      const swing = Math.sin(ventAngle.current) * 0.3;
      ventRef.current.rotation.x = swing;
    }
  });

  return (
    <group position={[-5.75, 3.2, 0]} rotation={[0, Math.PI / 2, 0]}>
      {/* Main body */}
      <mesh castShadow>
        <boxGeometry args={[2.5, 0.5, 0.35]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>

      {/* Top panel with vents */}
      <mesh position={[0, 0.28, 0]}>
        <boxGeometry args={[2.5, 0.06, 0.35]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>

      {/* Front panel (lower) */}
      <mesh position={[0, -0.2, 0.17]}>
        <boxGeometry args={[2.4, 0.1, 0.02]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>

      {/* Display panel */}
      <mesh position={[0.8, 0.1, 0.18]}>
        <boxGeometry args={[0.6, 0.15, 0.02]} />
        <meshStandardMaterial
          color={running ? "#0f172a" : "#1e293b"}
          emissive={running ? "#0ea5e9" : "#000000"}
          emissiveIntensity={running ? 0.3 : 0}
        />
      </mesh>

      {/* Temperature display */}
      {running && (
        <Text position={[0.8, 0.1, 0.2]} fontSize={0.08} color="#22d3ee" anchorX="center">
          24°C
        </Text>
      )}

      {/* Status LED */}
      <mesh position={[1.1, 0.1, 0.18]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial
          color={running ? "#22c55e" : "#64748b"}
          emissive={running ? "#22c55e" : "#000000"}
          emissiveIntensity={running ? 1 : 0}
        />
      </mesh>

      {/* Air vents (animated) */}
      <group ref={ventRef} position={[0, -0.15, 0.15]}>
        {[-0.9, -0.45, 0, 0.45, 0.9].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.35, 0.02, 0.12]} />
            <meshStandardMaterial color="#94a3b8" />
          </mesh>
        ))}
      </group>

      {/* Side panels */}
      {[-1.27, 1.27].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <boxGeometry args={[0.04, 0.5, 0.35]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
      ))}

      {/* Air flow effect when running */}
      {running && (
        <group position={[0, -0.35, 0.1]}>
          {[0, 1, 2].map((i) => (
            <AirFlowParticle key={i} delay={i * 0.3} />
          ))}
        </group>
      )}

      {/* Brand logo */}
      <mesh position={[-0.9, 0.1, 0.18]}>
        <boxGeometry args={[0.3, 0.1, 0.01]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>

      {/* Label */}
      <Float speed={2} floatIntensity={0.1}>
        <Text
          position={[0, 0.5, 0.3]}
          fontSize={0.12}
          color="#22d3ee"
          anchorX="center"
          outlineWidth={0.01}
          outlineColor="#0f172a"
        >
          Air Conditioner
        </Text>
      </Float>
    </group>
  );
}

function AirFlowParticle({ delay }: { delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(delay);

  useFrame((_, delta) => {
    if (meshRef.current) {
      timeRef.current += delta;
      const cycle = (timeRef.current % 2);
      meshRef.current.position.y = -cycle * 0.5;
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      if (material.opacity !== undefined) {
        material.opacity = Math.max(0, 1 - cycle);
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.8, 0.05, 0.02]} />
      <meshBasicMaterial color="#93c5fd" transparent opacity={0.4} />
    </mesh>
  );
}

function ClassroomFurniture() {
  return (
    <group>
      {/* Student desks - 2 rows */}
      {[-3, -1, 1, 3].map((x, i) => (
        <group key={i}>
          <StudentDesk position={[x, 0, -2.5]} />
          <StudentDesk position={[x, 0, 0]} />
        </group>
      ))}

      {/* Teacher's desk */}
      <TeacherDesk />
    </group>
  );
}

function StudentDesk({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Desk top */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.04, 0.7]} />
        <meshStandardMaterial color="#78716c" roughness={0.7} />
      </mesh>
      {/* Desk legs */}
      {[[-0.5, 0.25], [0.5, 0.25], [-0.5, -0.25], [0.5, -0.25]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.37, z]} castShadow>
          <boxGeometry args={[0.04, 0.74, 0.04]} />
          <meshStandardMaterial color="#44403c" />
        </mesh>
      ))}
      {/* Chair */}
      <group position={[0, 0, 0.6]}>
        {/* Seat */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[0.45, 0.04, 0.45]} />
          <meshStandardMaterial color="#0891b2" />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.75, -0.2]} castShadow>
          <boxGeometry args={[0.45, 0.6, 0.04]} />
          <meshStandardMaterial color="#0891b2" />
        </mesh>
        {/* Legs */}
        {[[-0.18, 0.18], [0.18, 0.18], [-0.18, -0.18], [0.18, -0.18]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.22, z]} castShadow>
            <boxGeometry args={[0.03, 0.44, 0.03]} />
            <meshStandardMaterial color="#374151" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function TeacherDesk() {
  return (
    <group position={[0, 0, -4]}>
      {/* Desk top */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.06, 1]} />
        <meshStandardMaterial color="#44403c" roughness={0.5} />
      </mesh>
      {/* Front panel */}
      <mesh position={[0, 0.4, 0.47]} castShadow>
        <boxGeometry args={[2.5, 0.8, 0.06]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      {/* Side panels */}
      <mesh position={[-1.22, 0.4, 0]} castShadow>
        <boxGeometry args={[0.06, 0.8, 1]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      <mesh position={[1.22, 0.4, 0]} castShadow>
        <boxGeometry args={[0.06, 0.8, 1]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      {/* Drawer handles */}
      <mesh position={[-0.5, 0.4, 0.5]}>
        <boxGeometry args={[0.2, 0.03, 0.03]} />
        <meshStandardMaterial color="#a1a1aa" metalness={0.8} />
      </mesh>
      <mesh position={[0.5, 0.4, 0.5]}>
        <boxGeometry args={[0.2, 0.03, 0.03]} />
        <meshStandardMaterial color="#a1a1aa" metalness={0.8} />
      </mesh>
    </group>
  );
}

function CeilingLight({ on, position }: { on: boolean; position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Light fixture housing */}
      <mesh castShadow>
        <boxGeometry args={[1, 0.08, 0.4]} />
        <meshStandardMaterial color="#374151" metalness={0.5} />
      </mesh>
      {/* Light panel */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.9, 0.02, 0.35]} />
        <meshStandardMaterial
          color={on ? "#fef9c3" : "#4b5563"}
          emissive={on ? "#fef08a" : "#000000"}
          emissiveIntensity={on ? 3 : 0}
        />
      </mesh>
      {/* Glow effect */}
      {on && (
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[1.2, 0.1, 0.6]} />
          <meshBasicMaterial color="#fef08a" transparent opacity={0.15} />
        </mesh>
      )}
    </group>
  );
}

function CeilingFan({ spinning }: { spinning: boolean }) {
  const fanRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (fanRef.current && spinning) {
      fanRef.current.rotation.y += delta * 10;
    }
  });

  return (
    <group position={[0, 3.7, 2]}>
      {/* Motor housing */}
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.25, 0.25, 16]} />
        <meshStandardMaterial color="#374151" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Rod */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
        <meshStandardMaterial color="#a1a1aa" metalness={0.8} />
      </mesh>
      {/* Fan blades */}
      <group ref={fanRef} position={[0, -0.1, 0]}>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            rotation={[0.1, (i * Math.PI * 2) / 5, 0]}
            position={[Math.cos((i * Math.PI * 2) / 5) * 0.6, 0, Math.sin((i * Math.PI * 2) / 5) * 0.6]}
            castShadow
          >
            <boxGeometry args={[0.8, 0.02, 0.18]} />
            <meshStandardMaterial color="#1e3a5f" roughness={0.7} />
          </mesh>
        ))}
      </group>
      {/* Label */}
      <Float speed={2} floatIntensity={0.1}>
        <Text
          position={[0, -0.6, 0.8]}
          fontSize={0.15}
          color="#22d3ee"
          anchorX="center"
          outlineWidth={0.01}
          outlineColor="#0f172a"
        >
          Ceiling Fan
        </Text>
      </Float>
    </group>
  );
}

function ElectronicsTable({ state }: { state: SystemState }) {
  return (
    <group position={[-4, 0, 2]}>
      {/* Table */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.06, 1.4]} />
        <meshStandardMaterial color="#78716c" roughness={0.6} />
      </mesh>
      {/* Table legs */}
      {[[-1.3, -0.6], [1.3, -0.6], [-1.3, 0.6], [1.3, 0.6]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.45, z]} castShadow>
          <boxGeometry args={[0.06, 0.9, 0.06]} />
          <meshStandardMaterial color="#44403c" />
        </mesh>
      ))}

      {/* Electronics components */}
      <Breadboard position={[-0.9, 0.97, 0]} />
      <ArduinoUno position={[0, 0.97, 0]} active={state.pirDetecting || state.mode === 'override'} />
      <RelayModule position={[0.8, 0.97, 0]} active={state.relayActive} />
      <LCDDisplay position={[-0.4, 1.05, -0.5]} message={state.lcdMessage} />
      <PIRSensor position={[1.1, 1.05, -0.4]} detecting={state.pirDetecting} />
      <ManualSwitch position={[0.4, 0.97, 0.4]} active={state.mode === 'override'} />

      {/* Wiring visualization */}
      <WireConnections active={state.pirDetecting || state.mode === 'override'} />

      {/* Table label */}
      <Float speed={2} floatIntensity={0.1}>
        <Text
          position={[0, 1.6, 0]}
          fontSize={0.18}
          color="#22d3ee"
          anchorX="center"
          outlineWidth={0.01}
          outlineColor="#0f172a"
        >
          Electronics Components
        </Text>
      </Float>
    </group>
  );
}

function Breadboard({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.5, 0.04, 0.3]} />
        <meshStandardMaterial color="#f5f5f4" />
      </mesh>
      {/* Holes pattern - center strip */}
      <mesh position={[0, 0.025, 0]}>
        <boxGeometry args={[0.45, 0.005, 0.05]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
      {/* Power rails */}
      <mesh position={[0, 0.025, 0.1]}>
        <boxGeometry args={[0.45, 0.005, 0.02]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      <mesh position={[0, 0.025, -0.1]}>
        <boxGeometry args={[0.45, 0.005, 0.02]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      <Float speed={2} floatIntensity={0.05}>
        <Text position={[0, 0.12, 0.25]} fontSize={0.07} color="#94a3b8">
          Breadboard
        </Text>
      </Float>
    </group>
  );
}

function ArduinoUno({ position, active }: { position: [number, number, number]; active: boolean }) {
  return (
    <group position={position}>
      {/* Board */}
      <mesh castShadow>
        <boxGeometry args={[0.45, 0.05, 0.35]} />
        <meshStandardMaterial color="#0066cc" roughness={0.4} />
      </mesh>
      {/* USB port */}
      <mesh position={[-0.18, 0.03, -0.12]}>
        <boxGeometry args={[0.1, 0.04, 0.08]} />
        <meshStandardMaterial color="#a1a1aa" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Power jack */}
      <mesh position={[-0.18, 0.03, 0.1]}>
        <cylinderGeometry args={[0.03, 0.03, 0.05, 8]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Microcontroller chip */}
      <mesh position={[0.05, 0.035, 0]}>
        <boxGeometry args={[0.15, 0.02, 0.08]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* LED indicators */}
      <mesh position={[0.15, 0.04, -0.1]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial
          color={active ? "#22c55e" : "#71717a"}
          emissive={active ? "#22c55e" : "#000"}
          emissiveIntensity={active ? 3 : 0}
        />
      </mesh>
      <mesh position={[0.15, 0.04, -0.05]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial
          color={active ? "#f59e0b" : "#71717a"}
          emissive={active ? "#f59e0b" : "#000"}
          emissiveIntensity={active ? 2 : 0}
        />
      </mesh>
      {/* Pin headers */}
      <mesh position={[0.18, 0.04, 0]}>
        <boxGeometry args={[0.03, 0.03, 0.3]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <Float speed={2} floatIntensity={0.05}>
        <Text position={[0, 0.12, 0.28]} fontSize={0.04} maxWidth={0.4} textAlign="center" color="#22d3ee">
          ESP32 Development Module
        </Text>
      </Float>
    </group>
  );
}

function RelayModule({ position, active }: { position: [number, number, number]; active: boolean }) {
  return (
    <group position={position}>
      {/* Board */}
      <mesh castShadow>
        <boxGeometry args={[0.35, 0.04, 0.25]} />
        <meshStandardMaterial color="#1e3a5f" />
      </mesh>
      {/* Relay blocks */}
      <mesh position={[-0.08, 0.04, 0]}>
        <boxGeometry args={[0.1, 0.06, 0.12]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      <mesh position={[0.08, 0.04, 0]}>
        <boxGeometry args={[0.1, 0.06, 0.12]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      {/* Status LED */}
      <mesh position={[0, 0.05, 0.1]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial
          color={active ? "#ef4444" : "#71717a"}
          emissive={active ? "#ef4444" : "#000"}
          emissiveIntensity={active ? 3 : 0}
        />
      </mesh>
      {/* Terminals */}
      <mesh position={[0, 0.04, -0.1]}>
        <boxGeometry args={[0.3, 0.03, 0.04]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
      <Float speed={2} floatIntensity={0.05}>
        <Text position={[0, 0.15, 0.2]} fontSize={0.07} color="#f59e0b">
          Relay Module
        </Text>
      </Float>
    </group>
  );
}

function LCDDisplay({ position, message }: { position: [number, number, number]; message: string }) {
  return (
    <group position={position} rotation={[0.4, 0, 0]}>
      {/* LCD frame */}
      <mesh castShadow>
        <boxGeometry args={[0.55, 0.35, 0.06]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Screen bezel */}
      <mesh position={[0, 0.02, 0.035]}>
        <boxGeometry args={[0.5, 0.22, 0.01]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      {/* Active screen */}
      <mesh position={[0, 0.02, 0.04]}>
        <boxGeometry args={[0.45, 0.18, 0.005]} />
        <meshStandardMaterial
          color="#0c4a6e"
          emissive="#0ea5e9"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* LCD text */}
      <Text
        position={[0, 0.02, 0.05]}
        fontSize={0.045}
        color="#22d3ee"
        maxWidth={0.4}
        textAlign="center"
      >
        {message}
      </Text>
      {/* I2C module */}
      <mesh position={[0, -0.13, 0.04]}>
        <boxGeometry args={[0.25, 0.06, 0.02]} />
        <meshStandardMaterial color="#1e3a5f" />
      </mesh>
      <Float speed={2} floatIntensity={0.05}>
        <Text position={[0, -0.25, 0.05]} fontSize={0.07} color="#22d3ee">
          LCD Display
        </Text>
      </Float>
    </group>
  );
}

function PIRSensor({ position, detecting }: { position: [number, number, number]; detecting: boolean }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh castShadow>
        <cylinderGeometry args={[0.1, 0.08, 0.04, 16]} />
        <meshStandardMaterial color="#f5f5f4" />
      </mesh>
      {/* Fresnel lens dome */}
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.08, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={detecting ? "#22c55e" : "#e5e7eb"}
          opacity={0.85}
          transparent
          emissive={detecting ? "#22c55e" : "#000"}
          emissiveIntensity={detecting ? 1 : 0}
        />
      </mesh>
      {/* Detection wave effect */}
      {detecting && (
        <group>
          <mesh position={[0, 0.08, 0]}>
            <ringGeometry args={[0.15, 0.18, 32]} />
            <meshBasicMaterial color="#22c55e" transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <ringGeometry args={[0.25, 0.28, 32]} />
            <meshBasicMaterial color="#22c55e" transparent opacity={0.2} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}
      {/* Potentiometers */}
      <mesh position={[-0.04, 0.025, -0.06]}>
        <cylinderGeometry args={[0.015, 0.015, 0.01, 8]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      <mesh position={[0.04, 0.025, -0.06]}>
        <cylinderGeometry args={[0.015, 0.015, 0.01, 8]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      <Float speed={2} floatIntensity={0.05}>
        <Text position={[0, 0.2, 0.1]} fontSize={0.07} color="#22c55e">
          PIR Sensor
        </Text>
      </Float>
    </group>
  );
}

function ManualSwitch({ position, active }: { position: [number, number, number]; active: boolean }) {
  return (
    <group position={position}>
      {/* Switch base */}
      <mesh castShadow>
        <boxGeometry args={[0.12, 0.03, 0.08]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      {/* Toggle */}
      <mesh position={[active ? 0.02 : -0.02, 0.03, 0]} rotation={[0, 0, active ? 0.3 : -0.3]}>
        <cylinderGeometry args={[0.015, 0.015, 0.04, 8]} />
        <meshStandardMaterial
          color={active ? "#22c55e" : "#ef4444"}
          metalness={0.5}
        />
      </mesh>
      <Float speed={2} floatIntensity={0.05}>
        <Text position={[0, 0.12, 0.08]} fontSize={0.06} color="#f59e0b">
          Manual Switch
        </Text>
      </Float>
    </group>
  );
}

function WireConnections({ active }: { active: boolean }) {
  return (
    <group position={[0, 0, 0]}>
      {/* PIR to Arduino - Green wire */}
      <Wire
        start={[1.1, 1.0, -0.4]}
        end={[0.15, 1.0, 0]}
        color="#22c55e"
        active={active}
      />

      {/* Arduino to Relay - Red wire */}
      <Wire
        start={[0.2, 1.0, 0]}
        end={[0.65, 1.0, 0]}
        color="#ef4444"
        active={active}
      />

      {/* Arduino to LCD - Yellow wire */}
      <Wire
        start={[-0.1, 1.0, 0]}
        end={[-0.4, 1.0, -0.35]}
        color="#eab308"
        active={active}
      />

      {/* Relay to ceiling - simulated power wires */}
      {active && (
        <>
          <Wire start={[0.8, 1.0, 0]} end={[0.8, 2.5, 0]} color="#3b82f6" active={true} />
          <Wire start={[0.85, 1.0, 0]} end={[4, 3.7, 0]} color="#ef4444" active={true} />
        </>
      )}
    </group>
  );
}

function Wire({ start, end, color, active }: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  active: boolean
}) {
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(...start),
      new THREE.Vector3(
        (start[0] + end[0]) / 2,
        Math.max(start[1], end[1]) + 0.1,
        (start[2] + end[2]) / 2
      ),
      new THREE.Vector3(...end)
    ]);
    return curve.getPoints(20);
  }, [start, end]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={color}
        linewidth={2}
        transparent
        opacity={active ? 1 : 0.4}
      />
    </line>
  );
}

function Students({ pirDetecting }: { pirDetecting: boolean }) {
  const students = [
    { position: [-3, 0, -2.5] as [number, number, number], delay: 0 },
    { position: [-1, 0, 0] as [number, number, number], delay: 1.2 },
    { position: [1, 0, -2.5] as [number, number, number], delay: 2.5 },
    { position: [3, 0, 0] as [number, number, number], delay: 3.7 },
    { position: [3, 0, -2.5] as [number, number, number], delay: 0.5, isTarget: true },
  ];

  return (
    <>
      {students.map((student, i) => (
        <Student
          key={i}
          position={student.position}
          delay={student.delay}
          showLabel={student.isTarget && pirDetecting}
        />
      ))}
    </>
  );
}

function Student({ position, delay, showLabel }: { position: [number, number, number]; delay: number; showLabel: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2 + delay) * 0.05;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1 + delay) * 0.02;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0} floatIntensity={0.3}>
      <group ref={groupRef} position={position}>
        {/* Body */}
        <mesh position={[0, 1, 0]} castShadow>
          <capsuleGeometry args={[0.25, 0.8, 8, 16]} />
          <meshStandardMaterial
            color="#0ea5e9"
            opacity={0.7}
            transparent
            emissive="#0ea5e9"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Head */}
        <mesh position={[0, 1.7, 0]} castShadow>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial
            color="#0ea5e9"
            opacity={0.7}
            transparent
            emissive="#0ea5e9"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Arms */}
        <mesh position={[-0.35, 1.1, 0]} rotation={[0, 0, 0.3]} castShadow>
          <capsuleGeometry args={[0.08, 0.4, 4, 8]} />
          <meshStandardMaterial color="#0ea5e9" opacity={0.6} transparent />
        </mesh>
        <mesh position={[0.35, 1.1, 0]} rotation={[0, 0, -0.3]} castShadow>
          <capsuleGeometry args={[0.08, 0.4, 4, 8]} />
          <meshStandardMaterial color="#0ea5e9" opacity={0.6} transparent />
        </mesh>
        {/* Legs */}
        <mesh position={[-0.12, 0.35, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.5, 4, 8]} />
          <meshStandardMaterial color="#0ea5e9" opacity={0.6} transparent />
        </mesh>
        <mesh position={[0.12, 0.35, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.5, 4, 8]} />
          <meshStandardMaterial color="#0ea5e9" opacity={0.6} transparent />
        </mesh>
        {/* Glow effect */}
        <pointLight position={[0, 1, 0]} intensity={1} color="#0ea5e9" distance={3} />

        {/* Label */}
        {showLabel && (
          <Float speed={2} floatIntensity={0.1}>
            <Text
              position={[0, 2.1, 0]}
              fontSize={0.12}
              color="#22d3ee"
              anchorX="center"
              outlineWidth={0.01}
              outlineColor="#0f172a"
            >
              Person Detected
            </Text>
          </Float>
        )}
      </group>
    </Float>
  );
}

function DataFlowParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 2 + i) * 0.002;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const { positions, colors } = useMemo(() => {
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Distribute around electronics table area
      const radius = 1 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(theta) * radius - 4;
      positions[i * 3 + 1] = 1 + Math.random() * 2.5;
      positions[i * 3 + 2] = Math.sin(theta) * radius + 2;

      // Cyan to blue gradient
      colors[i * 3] = 0.1 + Math.random() * 0.3;
      colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
      colors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
    }

    return { positions, colors };
  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}
