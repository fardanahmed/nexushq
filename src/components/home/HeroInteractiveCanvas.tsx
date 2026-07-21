import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

// Feature details to display in the HUD overlay
const featureDetails = [
  {
    id: 'calendar',
    title: 'Smart Scheduling',
    tagline: 'Prevent double-bookings automatically.',
    description: 'A fully integrated booking engine that checks your Google calendar, auto-detects client timezones, enforces custom buffer times, and triggers SMS reminders.',
    stat: '99.9% Client Arrival Rate',
    color: '#818cf8', // Indigo
    icon: '📅'
  },
  {
    id: 'crm',
    title: 'Client Management (CRM)',
    tagline: 'Your client records, fully secure.',
    description: 'Centralized client roster with profiles, intake questionnaires, secure session progress logs, and tag grouping. Fast search and filters help you manage at scale.',
    stat: '100% HIPAA-Compliant Logs',
    color: '#a78bfa', // Violet
    icon: '👥'
  },
  {
    id: 'video',
    title: 'Integrated Video Sessions',
    tagline: 'In-app HD streaming with zero downloads.',
    description: 'Launch private video coaching sessions straight from your client profiles. Features built-in screensharing, session recording, and AI-powered summary notes.',
    stat: 'WebRTC Peer-to-Peer HD',
    color: '#2dd4bf', // Emerald/Teal
    icon: '🎥'
  },
  {
    id: 'payments',
    title: 'Automated Billing & Invoicing',
    tagline: 'Get paid on time, globally.',
    description: 'Accept credit cards, set up recurring coaching subscriptions, trigger professional invoices, and handle split-billing or discount codes with global Stripe integration.',
    stat: 'Stripe Secure Checkout',
    color: '#fbbf24', // Amber
    icon: '💳'
  }
];

function ConnectingLine({ targetPos, color }: { targetPos: [number, number, number]; color: string }) {
  const lineRef = useRef<any>(null);
  
  useFrame((state) => {
    if (lineRef.current) {
      // Create a glowing, traveling dash effect along the line
      const time = state.clock.getElapsedTime();
      lineRef.current.material.dashOffset = -time * 0.4;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={[[0, 0, 0], targetPos]}
      color={color}
      lineWidth={1.5}
      dashed
      dashScale={6}
      dashSize={0.4}
      gapSize={0.2}
      transparent
      opacity={0.5}
    />
  );
}

function ParticleRing({ radius, count, color, speedMultiplier = 1 }: { radius: number; count: number; color: string; speedMultiplier?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.2;
      const r = radius + (Math.random() - 0.5) * 0.2;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.15;
      arr[i * 3 + 2] = Math.sin(angle) * r;
    }
    return arr;
  }, [radius, count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      pointsRef.current.rotation.y = time * 0.05 * speedMultiplier;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={color}
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  );
}

function CentralCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const outerCageRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.2;
      coreRef.current.rotation.x = time * 0.1;
      // Soft breathing/pulsing scale
      const scale = 1.0 + Math.sin(time * 1.5) * 0.06;
      coreRef.current.scale.set(scale, scale, scale);
    }
    if (outerCageRef.current) {
      outerCageRef.current.rotation.y = -time * 0.12;
      outerCageRef.current.rotation.z = time * 0.08;
    }
  });

  return (
    <group>
      {/* Central glowing core sphere */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.0, 2]} />
        <meshPhysicalMaterial
          color="#6366f1"
          roughness={0.15}
          metalness={0.9}
          emissive="#4f46e5"
          emissiveIntensity={1.2}
          transparent
          opacity={0.85}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* Wireframe protective cage around the core */}
      <mesh ref={outerCageRef}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial
          color="#818cf8"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Tiny inner energy point */}
      <pointLight distance={8} intensity={4} color="#a5b4fc" />
    </group>
  );
}

interface SatelliteProps {
  index: number;
  position: [number, number, number];
  color: string;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

function SatelliteNode({ index, position, color, isHovered, onHover }: SatelliteProps) {
  const meshRef = useRef<THREE.Group>(null);
  const orbitalRingRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Soft independent floating translation
      meshRef.current.position.y = position[1] + Math.sin(time * 1.8 + index) * 0.12;
      
      // Rotate the inner geometry
      const mainMesh = meshRef.current.children[0] as THREE.Mesh;
      if (mainMesh) {
        mainMesh.rotation.y = time * 0.8 + index;
        mainMesh.rotation.x = time * 0.4;
      }
    }
    if (orbitalRingRef.current) {
      orbitalRingRef.current.rotation.x = time * 1.2 + index;
    }
  });

  const baseScale = isHovered ? 1.3 : 1.0;

  return (
    <group ref={meshRef} position={position}>
      {/* 1. Core Satellite Mesh depending on index */}
      <mesh
        scale={baseScale}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(false);
        }}
      >
        {index === 0 && <torusGeometry args={[0.3, 0.1, 12, 24]} />} {/* Calendar ring */}
        {index === 1 && <icosahedronGeometry args={[0.35, 0]} />} {/* CRM node */}
        {index === 2 && <octahedronGeometry args={[0.36]} />} {/* Video prism */}
        {index === 3 && <cylinderGeometry args={[0.32, 0.32, 0.12, 16]} />} {/* Payment coin */}
        
        <meshPhysicalMaterial
          color={color}
          roughness={0.1}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={isHovered ? 1.8 : 0.4}
          clearcoat={1.0}
        />
      </mesh>

      {/* 2. Satellite orbital ring details */}
      <mesh ref={orbitalRingRef} scale={isHovered ? 1.4 : 1.1}>
        <torusGeometry args={[0.55, 0.02, 8, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>

      {/* 3. Small point light to cast color reflection on near meshes */}
      {isHovered && <pointLight distance={3} intensity={2.5} color={color} />}
    </group>
  );
}

interface SceneProps {
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
}

function InteractiveWorkspace({ hoveredIndex, setHoveredIndex }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Track mouse coordinates for smooth mesh parallax rotation
  const mouse = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      targetRotation.current.x = y * 0.35; // pitch
      targetRotation.current.y = x * 0.35; // yaw
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Base passive rotation
      groupRef.current.rotation.y = time * 0.05;
      
      // Interpolate mouse parallax
      mouse.current.x += (targetRotation.current.x - mouse.current.x) * 0.08;
      mouse.current.y += (targetRotation.current.y - mouse.current.y) * 0.08;
      
      groupRef.current.rotation.x = mouse.current.x;
      groupRef.current.rotation.z = mouse.current.y;
    }
  });

  // Orbital positions for the 4 satellites: [X, Y, Z]
  const satellitePositions: [number, number, number][] = [
    [2.3, 0.5, 1.8],    // Front-Right: Calendar
    [-2.2, 0.8, 1.6],   // Back-Left: CRM
    [-1.8, -1.2, -2.0],  // Bottom-Left: Video
    [2.0, -0.6, -1.8]   // Top-Back-Right: Payments
  ];

  return (
    <group ref={groupRef}>
      <CentralCore />
      
      {/* Orbit particle rings */}
      <ParticleRing radius={3.0} count={35} color="#818cf8" speedMultiplier={1.5} />
      <ParticleRing radius={3.3} count={25} color="#fbbf24" speedMultiplier={-1} />

      {featureDetails.map((feat, i) => (
        <group key={feat.id}>
          {/* Node Line connecting to center core */}
          <ConnectingLine targetPos={satellitePositions[i]} color={feat.color} />
          
          {/* Core Satellite Node */}
          <SatelliteNode
            index={i}
            position={satellitePositions[i]}
            color={feat.color}
            isHovered={hoveredIndex === i}
            onHover={(hovered) => setHoveredIndex(hovered ? i : null)}
          />
        </group>
      ))}
    </group>
  );
}

export default function HeroInteractiveCanvas() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Hydration safety: ensure canvas only renders on the client
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[400px] lg:h-[480px] w-full rounded-[2.5rem] bg-slate-950/20 border border-white/5 flex items-center justify-center">
        <div className="h-10 w-10 border-t-2 border-indigo-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Active feature helper
  const activeFeat = hoveredIndex !== null ? featureDetails[hoveredIndex] : null;

  return (
    <div className="relative w-full h-[450px] lg:h-[520px] select-none flex flex-col justify-end animate-fadeIn">
      
      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0 z-10 w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 6.2], fov: 48 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.5} />
          {/* Key lights */}
          <directionalLight position={[5, 8, 3]} intensity={1.5} color="#818cf8" />
          <directionalLight position={[-5, -4, -3]} intensity={0.8} color="#f59e0b" />
          
          <InteractiveWorkspace hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
          
          <OrbitControls
            enableZoom={true}
            minDistance={4.2}
            maxDistance={7.5}
            enablePan={false}
            // Limit polar angles to prevent flipping
            maxPolarAngle={Math.PI / 2 + 0.4}
            minPolarAngle={Math.PI / 2 - 0.4}
          />
        </Canvas>
      </div>

      {/* Floating UI HUD Overlay Card */}
      <div className="relative z-20 mx-auto mb-6 w-full max-w-[28rem] px-4 pointer-events-none transition-all duration-300 transform">
        <div className="glass rounded-2xl p-5 shadow-2xl border border-white/10 ring-1 ring-inset ring-white/5 min-h-[140px] flex flex-col justify-center transition-all duration-500 hover:border-white/20">
          {activeFeat ? (
            <div className="space-y-2 pointer-events-auto">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-lg shadow-inner ring-1 ring-white/10"
                  style={{ backgroundColor: `${activeFeat.color}25`, borderColor: `${activeFeat.color}50`, color: activeFeat.color }}
                >
                  {activeFeat.icon}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white transition-colors duration-300">
                    {activeFeat.title}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider transition-colors duration-300" style={{ color: activeFeat.color }}>
                    {activeFeat.tagline}
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                {activeFeat.description}
              </p>
              
              <div className="pt-1 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400">Metric Indicator:</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white shadow-sm shadow-black/20" style={{ textShadow: `0 0 8px ${activeFeat.color}50` }}>
                  {activeFeat.stat}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 space-y-2">
              <p className="text-indigo-300 font-bold uppercase tracking-wider text-xs animate-pulse">
                ✦ NexusHQ Interactive Hub ✦
              </p>
              <h3 className="text-white font-bold text-base">Explore the Platform</h3>
              <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto">
                Hover or tap the orbiting nodes to inspect scheduling, CRM records, video calling, and automated invoicing. Click & drag to rotate the view.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
