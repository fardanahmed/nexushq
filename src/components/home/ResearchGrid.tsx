import React, { useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Calendar, Users, Video, CreditCard, Zap, Activity, Sprout, Cpu, ArrowRight, type LucideIcon } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import type { Feature } from '@/types';

const iconMap: Record<string, LucideIcon> = { Calendar, Users, Video, CreditCard, Zap, Activity, Sprout, Cpu };

// Bento Box layouts for up to 6 items
const bentoClasses = [
  'md:col-span-2 md:row-span-2', // 0: Large square (Hero feature)
  'md:col-span-1 md:row-span-1', // 1: Small square
  'md:col-span-1 md:row-span-2', // 2: Tall vertical
  'md:col-span-2 md:row-span-1', // 3: Wide horizontal
  'md:col-span-1 md:row-span-1', // 4: Small square
  'md:col-span-1 md:row-span-1', // 5: Small square
];

const TiltCard = ({ area, index }: { area: Feature, index: number }) => {
  const Icon = iconMap[area.icon] || Zap;
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

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
  
  const bentoClass = bentoClasses[index] || 'md:col-span-1 md:row-span-1';
  const isLarge = index === 0;

  return (
    <motion.div
      key={area.id}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      className={`h-full perspective-[1200px] flex ${bentoClass}`}
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
        <Card className={`group relative overflow-hidden border-white/5 bg-slate-950/40 backdrop-blur-2xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(99,102,241,0.2)] hover:border-indigo-500/30 h-full flex flex-col will-change-transform glow-border ${isLarge ? 'min-h-[400px]' : 'min-h-[250px]'}`}>
          
          {/* Decorative hover spotlight */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 rounded-[inherit]"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  ${isLarge ? '800px' : '400px'} circle at ${mouseX}px ${mouseY}px,
                  ${glowColor},
                  transparent 80%
                )
              `,
            }}
          />

          {/* Dot matrix texture */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none" />

          {/* Abstract geometric background elements per card */}
          {index === 0 && (
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 blur-[60px] rounded-full group-hover:bg-indigo-500/20 transition-colors duration-700" />
          )}
          {index === 2 && (
            <div className="absolute -left-10 bottom-0 w-40 h-40 bg-violet-500/10 blur-[50px] rounded-full group-hover:bg-violet-500/20 transition-colors duration-700" />
          )}

          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-amber-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <CardHeader className="flex-none relative z-20 p-6 md:p-8" style={{ transform: "translateZ(30px)" }}>
            <div className="flex items-start justify-between w-full mb-4">
              <div className="rounded-2xl bg-indigo-500/10 w-fit p-3.5 ring-1 ring-inset ring-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-500 group-hover:bg-indigo-500/20 group-hover:ring-indigo-400/40 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] group-hover:scale-110">
                <Icon className={`${isLarge ? 'h-8 w-8' : 'h-6 w-6'} text-indigo-400 transition-colors duration-500 group-hover:text-indigo-300 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]`} />
              </div>
              {isLarge && (
                <div className="inline-flex items-center rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 backdrop-blur-md shadow-lg">
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                  Core Feature
                </div>
              )}
            </div>
            <CardTitle className={`font-black tracking-tight text-white group-hover:text-indigo-300 transition-colors duration-300 ${isLarge ? 'text-3xl' : 'text-xl'}`}>
              {area.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-grow relative z-20 px-6 md:px-8" style={{ transform: "translateZ(20px)" }}>
            <p className={`text-slate-400 leading-relaxed font-medium ${isLarge ? 'text-lg line-clamp-4' : 'text-sm line-clamp-3'}`}>
              {area.description}
            </p>
          </CardContent>

          <CardFooter className="flex-none pt-0 pb-6 md:pb-8 px-6 md:px-8 relative z-20" style={{ transform: "translateZ(25px)" }}>
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
    <section className="w-full pb-24 md:pb-32 pt-16 md:pt-24 bg-[#030014]/90 backdrop-blur-sm relative overflow-hidden">
      {/* Top glowing divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      
      {/* Abstract 3D ambient glows */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto auto-rows-[minmax(200px,auto)]">
          {areas.map((area, index) => (
            <TiltCard key={area.id} area={area} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchGrid;

