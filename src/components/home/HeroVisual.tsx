import { useCallback, useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import {
  Video,
  Sparkles,
  TrendingUp,
  Users,
  ShieldCheck,
  Volume2,
  CircleDot,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Logo } from '@/components/shared/Logo';

/* ── Modes Definition ── */
type HubMode = 'studio' | 'revenue' | 'crm';

const MODES: { id: HubMode; label: string; icon: typeof Video }[] = [
  { id: 'studio', label: 'Live Studio', icon: Video },
  { id: 'revenue', label: 'Revenue OS', icon: TrendingUp },
  { id: 'crm', label: 'Client CRM', icon: Users },
];

/* ── Audio Spectrum Bar Heights ── */
const SPECTRUM_BARS = [
  35, 65, 45, 90, 80, 50, 95, 75, 40, 85, 60, 90, 45, 70, 55, 80,
];
const REVENUE_BARS = [45, 65, 50, 85, 70, 95, 100];

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<HubMode>('studio');
  const [sessionSeconds, setSessionSeconds] = useState(2052); // 34:12

  // Increment session timer smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120, mass: 0.4 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120, mass: 0.4 });

  const rotateX = useTransform(smoothY, [-1, 1], [7, -7]);
  const rotateY = useTransform(smoothX, [-1, 1], [-7, 7]);

  // Cursor-following specular glow
  const glowX = useTransform(smoothX, [-1, 1], [20, 80]);
  const glowY = useTransform(smoothY, [-1, 1], [20, 80]);
  const glowLeftPct = useTransform(glowX, (v) => `${v}%`);
  const glowTopPct = useTransform(glowY, (v) => `${v}%`);

  // Parallax floating widgets
  const floatX1 = useTransform(smoothX, [-1, 1], [-18, 18]);
  const floatY1 = useTransform(smoothY, [-1, 1], [-18, 18]);

  const floatX2 = useTransform(smoothX, [-1, 1], [22, -22]);
  const floatY2 = useTransform(smoothY, [-1, 1], [18, -18]);

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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-[480px] sm:h-[520px] lg:h-[580px] flex items-center justify-center select-none"
      style={{ perspective: 1800 }}
    >
      {/* ── Background Core Ambient Glow ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full pointer-events-none blur-[110px]"
        style={{
          background:
            'radial-gradient(circle, rgba(16,231,178,0.22) 0%, rgba(6,182,212,0.12) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* ── Main Nexus Command Console ── */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10 w-[94%] max-w-[460px] rounded-2xl border border-emerald-500/25 bg-[#03090e]/85 backdrop-blur-2xl shadow-[0_25px_65px_-12px_rgba(0,0,0,0.8),0_0_35px_rgba(16,231,178,0.15)] p-5 sm:p-6 overflow-hidden"
      >
        {/* Specular cursor glow highlight */}
        <motion.div
          className="absolute w-[240px] h-[240px] rounded-full pointer-events-none blur-[70px] -translate-x-1/2 -translate-y-1/2 z-0 opacity-40"
          style={{
            left: glowLeftPct,
            top: glowTopPct,
            background:
              'radial-gradient(circle, rgba(16,231,178,0.3) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* 4 Corner Crosshairs */}
        <div className="absolute top-2 left-2 text-emerald-400/40 text-[10px] font-mono leading-none pointer-events-none">
          +
        </div>
        <div className="absolute top-2 right-2 text-emerald-400/40 text-[10px] font-mono leading-none pointer-events-none">
          +
        </div>
        <div className="absolute bottom-2 left-2 text-emerald-400/40 text-[10px] font-mono leading-none pointer-events-none">
          +
        </div>
        <div className="absolute bottom-2 right-2 text-emerald-400/40 text-[10px] font-mono leading-none pointer-events-none">
          +
        </div>

        {/* ── Console Header (Telemetry & Status) ── */}
        <div className="relative z-10 flex items-center justify-between border-b border-emerald-500/15 pb-3.5 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-slate-950/90 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,231,178,0.35)] flex items-center justify-center">
              <Logo size={20} className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-white tracking-tight text-sm">
                  Nexus OS
                </span>
                <span className="text-[10px] font-mono font-medium text-emerald-300/80 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                  v3.4.1
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 tabular-nums">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>12ms</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
              <Lock className="w-2.5 h-2.5 text-emerald-400" />
              <span>AES-256</span>
            </div>
          </div>
        </div>

        {/* ── Mode Switcher Pills ── */}
        <div className="relative z-10 flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/60 border border-emerald-500/15 mb-4">
          {MODES.map((mode) => {
            const Icon = mode.icon;
            const isSelected = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`relative flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'text-black font-extrabold shadow-md shadow-emerald-500/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeModePill"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 border border-emerald-300/40"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="relative z-10 w-3.5 h-3.5" />
                <span className="relative z-10">{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Interactive View Canvas ── */}
        <div className="relative z-10 min-h-[220px]">
          <AnimatePresence mode="wait">
            {/* Mode 1: Live Studio */}
            {activeMode === 'studio' && (
              <motion.div
                key="studio"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-3.5"
              >
                {/* Active Session Frame */}
                <div className="relative rounded-xl border border-emerald-500/20 bg-slate-950/60 p-3.5 overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-emerald-400/40">
                        ER
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#020408]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          Elena Rostova
                          <span className="text-[10px] font-normal text-emerald-300/80 bg-emerald-500/15 px-1.5 py-0.2 rounded">
                            Series A Founder
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          Executive Advisory Sync
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold text-emerald-400 font-mono tabular-nums flex items-center gap-1 justify-end">
                        <CircleDot className="w-3 h-3 animate-pulse" />
                        {formatTimer(sessionSeconds)}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        4K UHD · 60fps
                      </div>
                    </div>
                  </div>

                  {/* Animated Live Audio Visualizer Equalizer Spectrum */}
                  <div className="pt-1 pb-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
                      <span className="flex items-center gap-1 text-emerald-300">
                        <Volume2 className="w-3 h-3 text-emerald-400" />
                        Live Neural Denoising
                      </span>
                      <span className="text-emerald-400 font-mono">
                        0.0% Latency Loss
                      </span>
                    </div>

                    <div className="h-10 w-full flex items-end gap-1 px-1 bg-white/[0.02] rounded-lg border border-white/[0.04] py-1">
                      {SPECTRUM_BARS.map((height, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-full bg-gradient-to-t from-emerald-500 via-teal-400 to-amber-300"
                          animate={{
                            height: [
                              `${height * 0.4}%`,
                              `${height}%`,
                              `${height * 0.6}%`,
                            ],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.8 + (i % 4) * 0.2,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Live Transcript Snippet */}
                  <div className="mt-2.5 p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/15 text-[11px] text-slate-300 leading-snug font-mono flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-emerald-300">AI Co-pilot:</strong>{' '}
                      Elena noted target ARR of $2.4M by Q4. Follow-up action
                      item logged to CRM.
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Mode 2: Revenue OS */}
            {activeMode === 'revenue' && (
              <motion.div
                key="revenue"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider mb-0.5">
                      Net Monthly Retainer Velocity
                    </div>
                    <div className="text-2xl font-black text-white font-heading tracking-tight tabular-nums">
                      $18,450
                      <span className="text-sm font-normal text-slate-400">
                        .00
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg text-xs font-bold border border-emerald-500/20 tabular-nums">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+38.2% MoM</span>
                  </div>
                </div>

                {/* Bar Graph */}
                <div className="h-24 w-full flex items-end gap-2 pt-2">
                  {REVENUE_BARS.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 relative group cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-white/[0.04] rounded-t" />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="w-full rounded-t bg-gradient-to-t from-emerald-600 via-teal-400 to-amber-300 shadow-[0_0_12px_rgba(16,231,178,0.4)]"
                      />
                    </div>
                  ))}
                </div>

                {/* Instant Settlement Ticker */}
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Instant Stripe Payout Auto-Settled</span>
                  </div>
                  <span className="font-mono font-bold text-white tabular-nums">
                    +$2,400.00
                  </span>
                </div>
              </motion.div>
            )}

            {/* Mode 3: Client CRM */}
            {activeMode === 'crm' && (
              <motion.div
                key="crm"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-2.5"
              >
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-emerald-500/15">
                    <div className="text-[10px] text-slate-400 font-mono uppercase">
                      Retention Rate
                    </div>
                    <div className="text-xl font-bold text-white font-heading tabular-nums mt-0.5">
                      98.4%
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">
                      Top 1% of Mentors
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-emerald-500/15">
                    <div className="text-[10px] text-slate-400 font-mono uppercase">
                      Active Mentees
                    </div>
                    <div className="text-xl font-bold text-white font-heading tabular-nums mt-0.5">
                      24 / 25
                    </div>
                    <div className="text-[10px] text-amber-400 mt-0.5">
                      1 Slot Available
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold text-[10px]">
                      MK
                    </div>
                    <div>
                      <div className="text-slate-200 font-medium">
                        Marcus Kane
                      </div>
                      <div className="text-[10px] text-slate-500">
                        6-Month Retainer Renewed
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-emerald-400 font-semibold">
                    $6,000
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Floating Tactical Widget 1: Live Mentor Call (Top-Right) ── */}
      <motion.div
        style={{
          x: floatX1,
          y: floatY1,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="absolute top-4 sm:top-6 right-[-2%] sm:right-[0%] z-20 w-44 sm:w-48 rounded-xl border border-emerald-400/30 bg-[#031510]/90 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(16,231,178,0.2)] p-3 pointer-events-auto"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-bold text-white font-heading">
            VIP Mentee Link
          </span>
        </div>
        <div className="text-xs font-semibold text-emerald-200 truncate">
          Elena Rostova
        </div>
        <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex items-center justify-between">
          <span>Executive Track</span>
          <span className="text-emerald-400 font-bold">ACTIVE</span>
        </div>
      </motion.div>

      {/* ── Floating Tactical Widget 2: Auto-Deposit Confirmed (Bottom-Left) ── */}
      <motion.div
        style={{
          x: floatX2,
          y: floatY2,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="absolute bottom-6 sm:bottom-8 left-[-2%] sm:left-[0%] z-20 w-48 sm:w-52 rounded-xl border border-emerald-500/30 bg-[#031510]/90 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(16,231,178,0.2)] p-3 pointer-events-auto"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-emerald-300/80 font-mono uppercase tracking-wider">
              Instant Payout
            </div>
            <div className="text-sm font-bold text-white font-heading tabular-nums">
              +$2,850.00
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
