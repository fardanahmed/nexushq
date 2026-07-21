import React, { useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Calendar, Users, Video, CreditCard, Zap, Activity, Sprout, Cpu, ArrowRight, type LucideIcon } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import type { Feature } from '@/types';

const iconMap: Record<string, LucideIcon> = { Calendar, Users, Video, CreditCard, Zap, Activity, Sprout, Cpu };

const TiltCard = ({ area, index }: { area: Feature, index: number }) => {
  const Icon = iconMap[area.icon] || Zap;
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;
    
    mouseX.set(mX);
    mouseY.set(mY);

    const xPct = mX / width - 0.5;
    const yPct = mY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Node highlight colors for dynamic feel
  const highlightColors = [
    'rgba(99, 102, 241, 0.18)',  // Indigo
    'rgba(167, 139, 250, 0.18)', // Violet
    'rgba(45, 212, 191, 0.18)',  // Teal
    'rgba(251, 191, 36, 0.18)',  // Amber
  ];
  const glowColor = highlightColors[index % highlightColors.length];

  return (
    <motion.div
      key={area.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`h-full perspective-[1200px] flex min-h-[420px] ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative"
      >
        <Card className="group relative overflow-hidden border-white/5 bg-slate-950/45 backdrop-blur-2xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(99,102,241,0.2)] hover:border-indigo-500/30 h-full flex flex-col will-change-transform glow-border">
          {/* Decorative hover spotlight */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 rounded-[inherit]"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  500px circle at ${mouseX}px ${mouseY}px,
                  ${glowColor},
                  transparent 80%
                )
              `,
            }}
          />

          {/* Dot matrix texture */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:18px_18px] pointer-events-none" />

          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-amber-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <CardHeader className="flex-none relative z-20" style={{ transform: "translateZ(40px)" }}>
            <div className="flex items-start justify-between w-full mb-6">
              <div className="rounded-2xl bg-indigo-500/10 w-fit p-4 ring-1 ring-inset ring-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-500 group-hover:bg-indigo-500/20 group-hover:ring-indigo-400/40 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] group-hover:scale-110">
                <Icon className="h-7 w-7 text-indigo-400 transition-colors duration-500 group-hover:text-indigo-300 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
              </div>
              {index === 0 && (
                <div className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-bold text-slate-350 backdrop-blur-md">
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                  Core Feature
                </div>
              )}
            </div>
            <CardTitle className="line-clamp-2 text-2xl font-black tracking-tight text-white group-hover:text-indigo-300 transition-colors duration-300">
              {area.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-grow relative z-20" style={{ transform: "translateZ(25px)" }}>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base line-clamp-4 font-medium">
              {area.description}
            </p>
          </CardContent>

          <CardFooter className="flex-none pt-0 relative z-20" style={{ transform: "translateZ(30px)" }}>
            <a
              href="/features"
              className="text-sm font-bold text-indigo-400 flex items-center gap-2 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-indigo-300"
            >
              <span className="border-b border-transparent group-hover:border-indigo-400/50 pb-0.5">Learn more</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

interface FeaturesGridProps {
  areas: Feature[];
}

const ResearchGrid = ({ areas }: FeaturesGridProps) => {
  return (
    <section className="w-full py-24 bg-[#030014]/90 backdrop-blur-sm relative overflow-hidden">
      {/* Top glowing divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent" />
      
      {/* Abstract 3D ambient glows */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-amber-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[1000px] rounded-full bg-indigo-900/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 flex flex-col items-center text-center justify-between gap-4 max-w-4xl mx-auto animate-fadeInUp">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/15 bg-indigo-900/15 px-5 py-2 text-xs font-bold text-indigo-350 shadow-[0_0_20px_rgba(99,102,241,0.1)] uppercase tracking-widest backdrop-blur-md">
            Interactive Modules
          </div>
          <h2 className="text-4xl font-black tracking-tighter sm:text-5xl lg:text-[3.8rem] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-400 drop-shadow-xl uppercase">
            Everything You Need
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {areas.map((area, index) => (
            <TiltCard key={area.id} area={area} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchGrid;

