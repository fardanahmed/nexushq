import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* Depth cue behind the hero: a perspective floor that tilts away as you scroll. One gradient layer, no blur. */
export default function HeroScrollBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ perspective: '900px' }}
      aria-hidden="true"
    >
      <motion.div
        style={{ opacity, y }}
        className="absolute inset-x-0 bottom-0 h-[55%] origin-bottom"
      >
        <div
          className="h-full w-full opacity-70"
          style={{
            transform: 'rotateX(70deg)',
            transformOrigin: '50% 100%',
            backgroundImage:
              'linear-gradient(to right, oklch(0.8 0.14 165 / 50%) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.8 0.14 165 / 50%) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage:
              'radial-gradient(ellipse 65% 70% at 50% 100%, black 10%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 65% 70% at 50% 100%, black 10%, transparent 75%)',
          }}
        />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
