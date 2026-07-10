import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Icosahedron, Torus, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Define a type for our floating shapes
type ShapeData = {
  id: number;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  type: 'sphere' | 'icosahedron' | 'torus';
  floatSpeed: number;
  floatIntensity: number;
  floatRotation: number;
};

const predefinedShapes: ShapeData[] = [
  // Top Right Cluster
  { id: 1, type: 'torus', position: [7, 4, -5], rotation: [Math.PI/4, -Math.PI/6, 0], scale: 1.8, color: '#1e40af', floatSpeed: 1.5, floatIntensity: 1.5, floatRotation: 0.2 },
  { id: 2, type: 'torus', position: [5, 2, -3], rotation: [Math.PI/2, Math.PI/4, 0], scale: 1.2, color: '#0369a1', floatSpeed: 2, floatIntensity: 1, floatRotation: 0.3 },
  { id: 3, type: 'icosahedron', position: [4.5, 3.5, -2], rotation: [0.5, 0.5, 0], scale: 0.8, color: '#0f172a', floatSpeed: 1, floatIntensity: 2, floatRotation: 0.5 },
  
  // Bottom Right (near the card)
  { id: 4, type: 'icosahedron', position: [8, -3, -4], rotation: [0.2, -0.4, 0], scale: 0.7, color: '#0f766e', floatSpeed: 1.5, floatIntensity: 1.5, floatRotation: 0.4 },
  
  // Bottom Center
  { id: 5, type: 'sphere', position: [1.5, -4.5, -5], rotation: [0, 0, 0], scale: 0.8, color: '#1d4ed8', floatSpeed: 2, floatIntensity: 1, floatRotation: 0.2 },
  { id: 6, type: 'sphere', position: [2.5, -5, -6], rotation: [0, 0, 0], scale: 0.7, color: '#0f766e', floatSpeed: 1.5, floatIntensity: 1.2, floatRotation: 0.1 },
  { id: 7, type: 'torus', position: [3, -7, -4], rotation: [Math.PI/3, 0, 0], scale: 1.2, color: '#0369a1', floatSpeed: 1, floatIntensity: 0.8, floatRotation: 0.3 },
  
  // Middle Left
  { id: 8, type: 'icosahedron', position: [-6, -4, -6], rotation: [1, 1, 0], scale: 0.6, color: '#4c1d95', floatSpeed: 1.2, floatIntensity: 1.5, floatRotation: 0.6 },
  
  // Top Center/Left
  { id: 9, type: 'sphere', position: [-1, 6, -8], rotation: [0, 0, 0], scale: 0.9, color: '#312e81', floatSpeed: 0.8, floatIntensity: 1, floatRotation: 0.1 },
  { id: 10, type: 'sphere', position: [-8, 2, -10], rotation: [0, 0, 0], scale: 0.6, color: '#0284c7', floatSpeed: 1, floatIntensity: 1.2, floatRotation: 0.2 },
];

const ShapeObject = ({ data }: { data: ShapeData }) => {
  const materialProps = {
    color: data.color,
    roughness: 0.1,
    metalness: 0.8,
    envMapIntensity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.2,
  };

  return (
    <Float
      speed={data.floatSpeed}
      rotationIntensity={data.floatRotation}
      floatIntensity={data.floatIntensity}
      position={data.position}
      rotation={data.rotation}
    >
      <mesh scale={data.scale}>
        {data.type === 'sphere' && <Sphere args={[1, 32, 32]}><meshPhysicalMaterial {...materialProps} /></Sphere>}
        {data.type === 'icosahedron' && <Icosahedron args={[1, 0]}><meshPhysicalMaterial {...materialProps} flatShading /></Icosahedron>}
        {data.type === 'torus' && <Torus args={[1, 0.3, 16, 32]}><meshPhysicalMaterial {...materialProps} /></Torus>}
      </mesh>
    </Float>
  );
};

const InteractiveScene = () => {
  return (
    <group>
      {predefinedShapes.map((shape) => (
        <ShapeObject key={shape.id} data={shape} />
      ))}
    </group>
  );
};

export default function Interactive3DBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`fixed inset-0 -z-10 h-full w-full pointer-events-none transition-opacity duration-1000 ease-in-out ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]} style={{ pointerEvents: 'none' }}>
        {/* Abstract environment map for sleek reflections */}
        <Environment preset="city" />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#0891b2" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />
        
        <InteractiveScene />
      </Canvas>
    </div>
  );
}
