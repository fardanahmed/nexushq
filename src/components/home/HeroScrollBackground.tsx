import React, { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion';

export default function HeroScrollBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Mouse parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Parallax transforms for celestial light & grid
  const lightX = useTransform(springX, [-0.5, 0.5], ['-8%', '8%']);
  const lightY = useTransform(springY, [-0.5, 0.5], ['-5%', '5%']);
  const gridRotateY = useTransform(springX, [-0.5, 0.5], ['-4deg', '4deg']);

  // Scroll-linked transforms (0 = hero active, 0.4 = hero scrolled past)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.82]);
  const scrollY = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const scrollRotateX = useTransform(scrollYProgress, [0, 0.5], [0, 18]);
  const beamHeight = useTransform(scrollYProgress, [0, 0.4], ['100%', '30%']);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.35], [0.8, 0]);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const xPct = e.clientX / window.innerWidth - 0.5;
      const yPct = e.clientY / window.innerHeight - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#020408]" />
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#020408]"
      style={{ perspective: '1200px' }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          opacity: scrollOpacity,
          scale: scrollScale,
          y: scrollY,
          rotateX: scrollRotateX,
          transformOrigin: '50% 20%',
        }}
        className="relative w-full h-full"
      >
        {/* 1. Deep Space Atmospheric Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(16,231,178,0.22)_0%,rgba(6,182,212,0.12)_35%,rgba(2,4,8,0.95)_75%)]" />

        {/* 2. Top Celestial Laser Emitter / Horizon Spotlight */}
        <motion.div
          style={{ x: lightX, y: lightY }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1100px] h-[500px] pointer-events-none"
        >
          {/* Intense core emerald beam */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-96 bg-gradient-to-b from-emerald-300 via-emerald-500/40 to-transparent blur-[80px] rounded-full opacity-60" />

          {/* Solar gold accent flare */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-48 bg-gradient-to-b from-amber-200 via-amber-500/30 to-transparent blur-[60px] rounded-full opacity-40" />

          {/* Vertical Laser Light Pillar */}
          <motion.div
            style={{ height: beamHeight, opacity: beamOpacity }}
            className="absolute top-12 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-white via-emerald-300 to-transparent shadow-[0_0_25px_#10e7b2]"
          />
        </motion.div>

        {/* 3. Infinite 3D Perspective Grid Matrix (Floor Plane) */}
        <motion.div
          style={{ rotateY: gridRotateY }}
          className="absolute -bottom-32 inset-x-0 h-[65%] origin-bottom overflow-hidden [perspective:800px]"
        >
          <div
            className="w-full h-full opacity-35"
            style={{
              transform: 'rotateX(72deg) translateZ(0)',
              transformOrigin: '50% 100%',
              backgroundImage: `
                linear-gradient(to right, rgba(16, 231, 178, 0.35) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(16, 231, 178, 0.35) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
              maskImage:
                'radial-gradient(ellipse 70% 60% at 50% 100%, black 20%, transparent 80%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 70% 60% at 50% 100%, black 20%, transparent 80%)',
            }}
          />
        </motion.div>

        {/* 4. Horizon Glow Bar (Laser line dividing sky from grid) */}
        <div className="absolute top-[48%] inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-60 shadow-[0_0_15px_rgba(16,231,178,0.5)]" />

        {/* 5. Geometric Crosshair Markers (+) on Horizon */}
        <div className="absolute top-[47.6%] left-1/4 -translate-x-1/2 text-emerald-400/40 text-xs font-mono font-light select-none">
          +
        </div>
        <div className="absolute top-[47.6%] right-1/4 translate-x-1/2 text-emerald-400/40 text-xs font-mono font-light select-none">
          +
        </div>
        <div className="absolute top-[47.6%] left-1/2 -translate-x-1/2 text-amber-400/50 text-xs font-mono font-light select-none">
          +
        </div>

        {/* 6. Subtle Floating Ambient Orbs */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-teal-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

        {/* 7. Bottom Vignette Fade (seamlessly dissolves into #020408 for next section) */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#020408] via-[#020408]/80 to-transparent" />
      </motion.div>
    </div>
  );
}
