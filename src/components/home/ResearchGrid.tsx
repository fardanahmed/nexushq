import React, { useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Zap, Activity, Sprout, Cpu, Calculator, ArrowRight, type LucideIcon } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { ResearchArea } from '@/types';

const iconMap: Record<string, LucideIcon> = { Zap, Activity, Sprout, Cpu, Calculator };

const TiltCard = ({ area, index }: { area: ResearchArea, index: number }) => {
  const Icon = iconMap[area.icon] || Zap;
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      key={area.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="h-full perspective-[1200px] flex min-h-[450px]"
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
        <Card className="group relative overflow-hidden border-white/10 bg-slate-900/40 backdrop-blur-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:border-purple-500/40 h-full flex flex-col will-change-transform">
          {/* Decorative hover glare */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 rounded-[inherit]"
            style={{
              background: useTransform(
                () => `radial-gradient(500px circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.15), transparent 40%)`
              )
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <CardHeader className="flex-none relative z-20" style={{ transform: "translateZ(50px)" }}>
            <div className="mb-6 rounded-2xl bg-slate-800/80 w-fit p-5 ring-1 ring-inset ring-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:bg-purple-500/20 group-hover:ring-purple-400/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] group-hover:scale-110">
              <Icon className="h-10 w-10 text-cyan-400 transition-colors duration-500 group-hover:text-purple-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            </div>
            <CardTitle className="line-clamp-2 text-2xl font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors duration-300 drop-shadow-md">
              {area.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-grow relative z-20" style={{ transform: "translateZ(30px)" }}>
            <p className="text-slate-300 leading-relaxed text-base line-clamp-4 font-medium">
              {area.description}
            </p>
          </CardContent>

          <CardFooter className="flex-none pt-0 relative z-20" style={{ transform: "translateZ(40px)" }}>
            <a
              href="/research"
              className="text-sm font-bold text-cyan-400 flex items-center gap-2 transition-all duration-300 group-hover:translate-x-2 group-hover:text-purple-300"
            >
              <span className="border-b border-transparent group-hover:border-purple-400/50 pb-0.5">Explore research</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

interface ResearchGridProps {
  areas: ResearchArea[];
}

const ResearchGrid = ({ areas }: ResearchGridProps) => {
  return (
    <section className="container mx-auto px-6 py-32 bg-slate-950 relative overflow-hidden">
      {/* Abstract 3D ambient glows */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[1000px] rounded-full bg-blue-900/5 blur-[150px] pointer-events-none" />

      <div className="mb-24 flex flex-col items-center text-center justify-between gap-6 max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-2 text-sm font-bold text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.15)] uppercase tracking-widest">
          Research Areas
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white drop-shadow-lg uppercase">
          Emerging Research Frontiers
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto relative z-10">
        {areas.map((area, index) => (
          <TiltCard key={area.id} area={area} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ResearchGrid;
