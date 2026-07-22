import { useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Calendar, Video, CreditCard, TrendingUp } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';

/* ── Static data extracted outside the component ── */

const BAR_HEIGHTS = [40, 70, 45, 90, 65, 85, 100];

const SESSIONS = [
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
] as const;

/* ── Animation variants ── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, damping: 20, stiffness: 100 },
  },
};

const widgetVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, damping: 18, stiffness: 120 },
  },
};

const barVariants = {
  hidden: { scaleY: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    transition: {
      delay: 0.4 + i * 0.06,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

/* ── Component ── */

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid motion
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120, mass: 0.4 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120, mass: 0.4 });

  // Main card tilt
  const rotateX = useTransform(smoothY, [-1, 1], [6, -6]);
  const rotateY = useTransform(smoothX, [-1, 1], [-6, 6]);

  // Cursor-following glow spotlight (tracks mouse position as %)
  const glowX = useTransform(smoothX, [-1, 1], [20, 80]);
  const glowY = useTransform(smoothY, [-1, 1], [20, 80]);
  const glowLeftPct = useTransform(glowX, (v) => `${v}%`);
  const glowTopPct = useTransform(glowY, (v) => `${v}%`);

  // Widget 1 — foreground layer (mild parallax)
  const floatX1 = useTransform(smoothX, [-1, 1], [-15, 15]);
  const floatY1 = useTransform(smoothY, [-1, 1], [-15, 15]);

  // Widget 2 — mid layer (stronger parallax, opposite direction)
  const floatX2 = useTransform(smoothX, [-1, 1], [25, -25]);
  const floatY2 = useTransform(smoothY, [-1, 1], [20, -20]);

  // Widget 3 — deep layer (subtle, own direction)
  const floatX3 = useTransform(smoothX, [-1, 1], [12, -12]);
  const floatY3 = useTransform(smoothY, [-1, 1], [-20, 20]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      mouseX.set(((e.clientX - left) / width) * 2 - 1);
      mouseY.set(((e.clientY - top) / height) * 2 - 1);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full h-[450px] lg:h-[550px] flex items-center justify-center select-none"
      style={{ perspective: 2000 }}
    >
      {/* ── Ambient background auras ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full pointer-events-none blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(139,92,246,0.15) 60%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-[40%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full pointer-events-none blur-[100px]"
        style={{
          background:
            'radial-gradient(circle, rgba(192,38,211,0.2) 0%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* ── Main Dashboard Card ── */}
      <motion.div
        variants={cardVariants}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10 w-[90%] max-w-[420px] rounded-2xl border border-white/[0.08] bg-slate-900/70 backdrop-blur-2xl shadow-[0_25px_60px_-12px_rgba(0,0,0,0.5)] p-6 overflow-hidden"
      >
        {/* Cursor-following glow inside the card */}
        <motion.div
          className="absolute w-[200px] h-[200px] rounded-full pointer-events-none blur-[80px] -translate-x-1/2 -translate-y-1/2 z-0"
          style={{
            left: glowLeftPct,
            top: glowTopPct,
            background:
              'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Animated gradient border shimmer */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, transparent 40%, transparent 60%, rgba(192,38,211,0.1) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between mb-5 border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1 rounded-xl bg-slate-950/80 border border-indigo-500/25 shadow-[0_0_16px_rgba(99,102,241,0.35)] flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.12, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <Logo size={28} className="h-7 w-7" />
              </motion.div>
            </div>
            <span className="font-bold text-slate-100 tracking-tight text-base">
              NexusHQ
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Traffic light dots */}
            <div
              className="w-2.5 h-2.5 rounded-full bg-red-500/50"
              aria-hidden="true"
            />
            <div
              className="w-2.5 h-2.5 rounded-full bg-amber-400/50"
              aria-hidden="true"
            />
            <div
              className="w-2.5 h-2.5 rounded-full bg-emerald-400/50"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Dashboard content */}
        <div className="relative z-10 space-y-4">
          {/* Revenue header */}
          <div className="flex justify-between items-end">
            <div>
              <div className="text-[11px] text-slate-400/80 font-medium uppercase tracking-wider mb-1">
                Monthly Revenue
              </div>
              <div className="text-3xl font-bold text-white tracking-tight">
                $12,450
              </div>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-lg text-xs font-semibold border border-emerald-400/10">
              <TrendingUp className="w-3 h-3" />
              <span>+14%</span>
            </div>
          </div>

          {/* Animated bar chart */}
          <div className="h-24 w-full flex items-end gap-1.5 pt-4">
            {BAR_HEIGHTS.map((height, i) => (
              <div key={i} className="flex-1 relative group cursor-pointer">
                {/* Background track */}
                <div className="absolute inset-0 bg-white/[0.03] rounded-t" />
                {/* Animated fill */}
                <motion.div
                  custom={i}
                  variants={barVariants}
                  className="absolute bottom-0 w-full rounded-t origin-bottom"
                  style={{
                    height: `${height}%`,
                    background: `linear-gradient(to top, rgba(99,102,241,0.9), rgba(129,140,248,0.6))`,
                  }}
                />
                {/* Hover tooltip */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
                  ${Math.round(height * 124.5)}
                </div>
              </div>
            ))}
          </div>

          {/* Sessions list */}
          <div className="pt-2">
            <div className="text-[11px] text-slate-400/80 font-medium uppercase tracking-wider mb-3">
              Upcoming Sessions
            </div>
            <div className="space-y-2">
              {SESSIONS.map((session, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    x: 2,
                    backgroundColor: 'rgba(255,255,255,0.06)',
                  }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] cursor-pointer"
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
                      <div className="text-xs text-slate-500">
                        {session.type}
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] font-medium text-slate-400 bg-white/[0.04] px-2 py-1 rounded-md">
                    {session.time}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Inner accent border overlay */}
        <div
          className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06] pointer-events-none"
          style={{ transform: 'translateZ(1px)' }}
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Floating Widget 1 — Smart Booking ── */}
      <motion.div
        variants={widgetVariants}
        whileHover={{ scale: 1.04, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          x: floatX1,
          y: floatY1,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="absolute top-8 right-[4%] z-20 w-48 rounded-2xl border border-white/[0.08] bg-slate-900/80 backdrop-blur-xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.4)] p-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500/15 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="text-sm font-semibold text-white">Smart Booking</div>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-indigo-500/60 to-violet-500/40 rounded-full"
            />
          </div>
          <div className="h-2 w-3/4 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ delay: 1.0, duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-indigo-500/40 to-violet-500/30 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* ── Floating Widget 2 — Session Active ── */}
      <motion.div
        variants={widgetVariants}
        whileHover={{ scale: 1.04, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          x: floatX2,
          y: floatY2,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="absolute bottom-10 left-[2%] z-20 w-56 rounded-2xl border border-white/[0.08] bg-slate-900/80 backdrop-blur-xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.4)] p-4"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
            <Video className="w-4 h-4" />
            {/* Pulsing live ring */}
            <span
              className="absolute inset-0 rounded-full animate-ping bg-emerald-400/20"
              aria-hidden="true"
            />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-900" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">
              Session Active
            </div>
            <div className="text-xs text-emerald-400 font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
              Recording · 24:13
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Floating Widget 3 — Invoice Paid ── */}
      <motion.div
        variants={widgetVariants}
        whileHover={{ scale: 1.06, y: -3 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          x: floatX3,
          y: floatY3,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="absolute bottom-24 right-[2%] z-0 w-40 rounded-2xl border border-indigo-500/15 bg-indigo-950/50 backdrop-blur-md shadow-[0_15px_40px_-10px_rgba(0,0,0,0.4)] p-4 flex flex-col items-center text-center"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white mb-2 shadow-lg shadow-amber-500/25">
          <CreditCard className="w-5 h-5" />
        </div>
        <div className="text-[11px] font-medium text-indigo-300/80 mb-0.5">
          Invoice Paid
        </div>
        <div className="text-lg font-bold text-white tracking-tight">
          $450.00
        </div>
        <div className="mt-1.5 text-[10px] text-emerald-400/80 font-medium flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-emerald-400" />
          Confirmed
        </div>
      </motion.div>

      {/* ── Background geometric accents ── */}
      <div
        className="absolute top-16 left-16 w-36 h-36 border border-white/[0.03] rounded-full animate-[spin_25s_linear_infinite]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-16 right-16 w-52 h-52 border border-white/[0.03] rounded-full border-dashed animate-[spin_35s_linear_infinite_reverse]"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/[0.02] rounded-full"
        aria-hidden="true"
      />
    </motion.div>
  );
}
