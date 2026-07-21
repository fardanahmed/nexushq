import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import * as THREE from 'three';

// Create a circular texture on canvas to avoid loading external image assets
function createCircleTexture() {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  
  const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 16, 16);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Interfaces for our dynamic node points
interface NodePoint {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  vz: number;
  speed: number;
  color: THREE.Color;
  angleOffset: number;
}

function ConstellationNetwork({ count, isHome }: { count: number; isHome: boolean }) {
  const { viewport } = useThree();
  
  // Create refs to buffer geometries to update them directly in the render loop (60fps bypass)
  const pointsGeometryRef = useRef<THREE.BufferGeometry>(null);
  const linesGeometryRef = useRef<THREE.BufferGeometry>(null);
  
  const circleTexture = useMemo(() => createCircleTexture(), []);
  
  // Configuration constants
  const lineThreshold = 2.8;
  const maxLines = 150;
  const gravityStrength = 0.08;
  const gravityRadius = 4.0;
  
  // Set up particles initial states
  const { nodes, pointsPositions, linesPositions, linesColors } = useMemo(() => {
    const nodes: NodePoint[] = [];
    const pointsPositions = new Float32Array(count * 3);
    
    // We pre-allocate arrays for line positions (maxLines * 2 vertices * 3 coordinates)
    const linesPositions = new Float32Array(maxLines * 2 * 3);
    const linesColors = new Float32Array(maxLines * 2 * 3);
    
    const colorIndigo = new THREE.Color('#6366f1');
    const colorAmber = new THREE.Color('#f59e0b');
    const colorViolet = new THREE.Color('#8b5cf6');
    
    for (let i = 0; i < count; i++) {
      // Position nodes in a 3D volume that covers the viewport
      const x = (Math.random() - 0.5) * viewport.width * 1.5;
      const y = (Math.random() - 0.5) * viewport.height * 1.5;
      const z = (Math.random() - 0.5) * 8 - 4; // drift slightly in depth
      
      const speed = 0.2 + Math.random() * 0.5;
      const angleOffset = Math.random() * Math.PI * 2;
      
      // Node color variation
      const rand = Math.random();
      let color = colorIndigo;
      if (rand > 0.85) {
        color = colorAmber;
      } else if (rand > 0.6) {
        color = colorViolet;
      }
      
      nodes.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        vx: (Math.random() - 0.5) * 0.01,
        vy: (Math.random() - 0.5) * 0.01,
        vz: (Math.random() - 0.5) * 0.005,
        speed,
        color,
        angleOffset
      });
      
      pointsPositions[i * 3] = x;
      pointsPositions[i * 3 + 1] = y;
      pointsPositions[i * 3 + 2] = z;
    }
    
    return { nodes, pointsPositions, linesPositions, linesColors };
  }, [count, viewport.width, viewport.height]);

  // Track mouse smoothly via pointer interpolation
  const mouse = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to Three.js space
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current.x = x * (viewport.width / 2);
      mouse.current.y = y * (viewport.height / 2);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [viewport.width, viewport.height]);

  // Frameloop animation
  useFrame((state) => {
    if (!isHome) return; // Freeze simulation on subpages to maximize performance
    
    const time = state.clock.getElapsedTime();
    const pointsGeo = pointsGeometryRef.current;
    const linesGeo = linesGeometryRef.current;
    
    if (!pointsGeo || !linesGeo) return;
    
    const pointsPosAttr = pointsGeo.getAttribute('position') as THREE.BufferAttribute;
    const linesPosAttr = linesGeo.getAttribute('position') as THREE.BufferAttribute;
    const linesColAttr = linesGeo.getAttribute('color') as THREE.BufferAttribute;
    
    if (!pointsPosAttr || !linesPosAttr || !linesColAttr) return;
    
    // 1. Update node physics (drift + mouse attraction)
    for (let i = 0; i < count; i++) {
      const node = nodes[i];
      
      // Floating wave motion
      const waveX = Math.sin(time * 0.2 * node.speed + node.angleOffset) * 0.15;
      const waveY = Math.cos(time * 0.35 * node.speed + node.angleOffset) * 0.15;
      
      let targetX = node.baseX + waveX;
      let targetY = node.baseY + waveY;
      
      // Calculate cursor influence
      const dx = mouse.current.x - node.x;
      const dy = mouse.current.y - node.y;
      const distToMouse = Math.sqrt(dx * dx + dy * dy);
      
      if (distToMouse < gravityRadius) {
        // Gravitational pull towards cursor
        const pull = (1 - distToMouse / gravityRadius) * gravityStrength;
        targetX += dx * pull;
        targetY += dy * pull;
      }
      
      // Apply smooth interpolation (easing)
      node.x += (targetX - node.x) * 0.05;
      node.y += (targetY - node.y) * 0.05;
      node.z += node.vz;
      
      // Bound checking for depth
      if (Math.abs(node.z - node.baseZ) > 1.5) {
        node.vz = -node.vz;
      }
      
      // Write new positions to points buffer
      pointsPosAttr.setXYZ(i, node.x, node.y, node.z);
    }
    pointsPosAttr.needsUpdate = true;
    
    // 2. Find connection lines (pairs distance check)
    let lineCount = 0;
    const linePosArr = linesPosAttr.array as Float32Array;
    const lineColArr = linesColAttr.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      if (lineCount >= maxLines) break;
      const n1 = nodes[i];
      
      for (let j = i + 1; j < count; j++) {
        if (lineCount >= maxLines) break;
        const n2 = nodes[j];
        
        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const dz = n1.z - n2.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < lineThreshold) {
          const index = lineCount * 6;
          
          // Set start vertex
          linePosArr[index] = n1.x;
          linePosArr[index + 1] = n1.y;
          linePosArr[index + 2] = n1.z;
          
          // Set end vertex
          linePosArr[index + 3] = n2.x;
          linePosArr[index + 4] = n2.y;
          linePosArr[index + 5] = n2.z;
          
          // Fade line color based on proximity
          const alpha = 1.0 - dist / lineThreshold;
          
          // Set colors (start color and end color)
          // We fade them to dark background so they merge nicely
          lineColArr[index] = n1.color.r * alpha * 0.4;
          lineColArr[index + 1] = n1.color.g * alpha * 0.4;
          lineColArr[index + 2] = n1.color.b * alpha * 0.4;
          
          lineColArr[index + 3] = n2.color.r * alpha * 0.4;
          lineColArr[index + 4] = n2.color.g * alpha * 0.4;
          lineColArr[index + 5] = n2.color.b * alpha * 0.4;
          
          lineCount++;
        }
      }
    }
    
    linesPosAttr.needsUpdate = true;
    linesColAttr.needsUpdate = true;
    linesGeo.setDrawRange(0, lineCount * 2);
  });

  return (
    <group>
      {/* 1. Rendering the Node Particles */}
      <points>
        <bufferGeometry ref={pointsGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[pointsPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          map={circleTexture || undefined}
          transparent
          opacity={0.7}
          depthWrite={false}
          vertexColors={false}
          color="#a5b4fc"
        />
      </points>
      
      {/* 2. Rendering the Connection Lines */}
      <lineSegments>
        <bufferGeometry ref={linesGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[linesPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[linesColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          linewidth={1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function GlobalLoaderNotifier() {
  const { active, progress } = useProgress();

  useEffect(() => {
    if (!active && progress === 100) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).is3dSceneLoaded = true;
      window.dispatchEvent(new Event('3d-scene-ready'));
    }
  }, [active, progress]);

  return null;
}

export default function Interactive3DBackground() {
  const [isHome, setIsHome] = useState(true);
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    setIsHome(window.location.pathname === '/');
    setWindowWidth(window.innerWidth);

    const handleRouteChange = () => {
      setIsHome(window.location.pathname === '/');
    };
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    document.addEventListener('astro:page-load', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('astro:page-load', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Responsive particle density to guarantee 60fps on mobile
  const nodeCount = windowWidth < 768 ? 18 : 50;

  return (
    <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none bg-gradient-to-br from-[#0a0518] via-indigo-950/15 to-[#120722]">
      <div
        className="absolute inset-0"
        style={{
          filter: isHome ? 'none' : 'blur(10px)',
          opacity: isHome ? 0.95 : 0.2,
          transition: 'filter 0.5s ease-out, opacity 0.5s ease-out'
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={[1, 1.5]} // Limit DPR to 1.5 for performance optimization on Retina screens
          style={{ pointerEvents: 'none' }}
          frameloop={isHome ? "always" : "never"}
        >
          <GlobalLoaderNotifier />
          <ambientLight intensity={0.4} />
          <ConstellationNetwork count={nodeCount} isHome={isHome} />
        </Canvas>
      </div>
    </div>
  );
}
