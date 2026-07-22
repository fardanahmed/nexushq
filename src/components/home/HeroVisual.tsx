import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Calendar, Video, CreditCard, TrendingUp } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid motion
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100, mass: 0.5 });

  // Transforms for the main dashboard (moves opposite to mouse)
  const rotateX = useTransform(smoothY, [-1, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [-1, 1], [-8, 8]);

  // Transforms for floating elements (moves more dramatically)
  const floatX1 = useTransform(smoothX, [-1, 1], [-20, 20]);
  const floatY1 = useTransform(smoothY, [-1, 1], [-20, 20]);

  const floatX2 = useTransform(smoothX, [-1, 1], [30, -30]);
  const floatY2 = useTransform(smoothY, [-1, 1], [30, -30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - top) / height) * 2 - 1; // -1 to 1
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[450px] lg:h-[550px] flex items-center justify-center perspective-[2000px] select-none"
    >
      {/* Ambient glowing background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-indigo-500/25 blur-[110px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/4 w-[280px] h-[280px] bg-violet-600/25 blur-[90px] rounded-full pointer-events-none" />

      {/* Main Dashboard Card */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10 w-[90%] max-w-[420px] rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-2xl shadow-2xl p-6"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1 rounded-xl bg-slate-950/80 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center justify-center">
              <Logo size={28} className="h-7 w-7" />
            </div>
            <span className="font-bold text-slate-100 tracking-tight text-base">
              NexusHQ
            </span>
          </div>
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-violet-500/40" />
          </div>
        </div>

        {/* Dashboard Content Mockup */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs text-slate-400 font-medium mb-1">
                Monthly Revenue
              </div>
              <div className="text-3xl font-bold text-white">$12,450</div>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-xs font-semibold">
              <TrendingUp className="w-3 h-3" />
              <span>+14%</span>
            </div>
          </div>

          <div className="h-24 w-full flex items-end gap-2 pt-4">
            {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-indigo-500/20 rounded-t-sm hover:bg-indigo-500/40 transition-colors relative group"
              >
                <div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-sm"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>

          <div className="pt-2">
            <div className="text-xs text-slate-400 font-medium mb-3">
              Upcoming Sessions
            </div>
            <div className="space-y-2">
              {[
                {
                  name: 'Sarah J.',
                  type: 'Strategy Sync',
                  time: '10:00 AM',
                  color: 'bg-violet-500',
                },
                {
                  name: 'Mike T.',
                  type: 'Onboarding',
                  time: '1:30 PM',
                  color: 'bg-emerald-500',
                },
              ].map((session, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${session.color}`}
                    >
                      {session.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-200">
                        {session.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {session.type}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-slate-300 bg-white/5 px-2 py-1 rounded">
                    {session.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Accent Border */}
        <div
          className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none"
          style={{ transform: 'translateZ(1px)' }}
        />
      </motion.div>

      {/* Floating Widget 1 - Calendar/Scheduling */}
      <motion.div
        style={{
          x: floatX1,
          y: floatY1,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="absolute top-10 right-[5%] z-20 w-48 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl p-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="text-sm font-semibold text-white">Smart Booking</div>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full bg-white/10 rounded-full" />
          <div className="h-2 w-3/4 bg-white/10 rounded-full" />
        </div>
      </motion.div>

      {/* Floating Widget 2 - Video Call */}
      <motion.div
        style={{
          x: floatX2,
          y: floatY2,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="absolute bottom-12 left-[2%] z-20 w-56 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl p-4"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="relative w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
            <Video className="w-4 h-4" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-900" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">
              Session Active
            </div>
            <div className="text-xs text-emerald-400 font-medium animate-pulse">
              Recording...
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Widget 3 - CRM/Payments */}
      <motion.div
        style={{
          x: useTransform(smoothX, [-1, 1], [15, -15]),
          y: useTransform(smoothY, [-1, 1], [-30, 30]),
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="absolute bottom-24 right-[2%] z-0 w-40 rounded-2xl border border-indigo-500/20 bg-indigo-950/60 backdrop-blur-md shadow-2xl p-4 flex flex-col items-center text-center"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white mb-2 shadow-lg shadow-amber-500/30">
          <CreditCard className="w-5 h-5" />
        </div>
        <div className="text-xs font-medium text-indigo-200 mb-1">
          Invoice Paid
        </div>
        <div className="text-lg font-bold text-white">$450.00</div>
      </motion.div>

      {/* Background geometric accents */}
      <div className="absolute top-20 left-20 w-32 h-32 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
      <div className="absolute bottom-20 right-20 w-48 h-48 border border-white/5 rounded-full border-dashed animate-[spin_20s_linear_infinite_reverse]" />
    </div>
  );
}
