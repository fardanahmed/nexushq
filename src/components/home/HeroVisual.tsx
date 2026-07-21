import { useState, useEffect } from 'react';

const features = [
  { label: 'Scheduling', icon: '📅', angle: 0 },
  { label: 'Client CRM', icon: '👥', angle: 90 },
  { label: 'HD Video', icon: '🎥', angle: 180 },
  { label: 'Billing', icon: '💳', angle: 270 },
];

export default function HeroVisual() {
  const [mounted, setMounted] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[400px] lg:h-[480px] w-full rounded-[2.5rem] bg-slate-950/20 border border-white/5 flex items-center justify-center">
        <div className="h-10 w-10 border-t-2 border-indigo-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] lg:h-[480px] flex items-center justify-center select-none">
      {/* Outer ambient glow */}
      <div
        className="absolute w-[340px] h-[340px] lg:w-[420px] lg:h-[420px] rounded-full opacity-30 blur-[80px] transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, #6366f1 0%, #7c3aed 40%, #f59e0b 100%)',
          transform: `translate(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.3}px)`,
        }}
      />

      {/* Core orb container */}
      <div
        className="relative w-[260px] h-[260px] lg:w-[320px] lg:h-[320px] transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px)`,
        }}
      >
        {/* Animated rotating ring */}
        <div className="absolute inset-[-20px] lg:inset-[-28px] rounded-full border border-indigo-500/20 animate-[spin_25s_linear_infinite]" />
        <div className="absolute inset-[-40px] lg:inset-[-52px] rounded-full border border-violet-500/10 animate-[spin_35s_linear_infinite_reverse]" />
        <div className="absolute inset-[-60px] lg:inset-[-76px] rounded-full border border-amber-500/[0.07] animate-[spin_45s_linear_infinite]" />

        {/* Tick marks on the middle ring */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <div
            key={deg}
            className="absolute top-1/2 left-1/2 w-[1px] h-2 bg-indigo-400/30 origin-bottom"
            style={{
              transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-170px)`,
            }}
          />
        ))}

        {/* Main gradient orb */}
        <div className="absolute inset-0 rounded-full overflow-hidden shadow-[0_0_80px_rgba(99,102,241,0.3),0_0_160px_rgba(124,58,237,0.15)]">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800 animate-[pulse_4s_ease-in-out_infinite]" />

          {/* Inner highlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15)_0%,transparent_60%)]" />

          {/* Shimmer sweep */}
          <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.08)_45%,transparent_60%)] animate-[shimmer_3s_ease-in-out_infinite]" />

          {/* Noise-like texture */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:8px_8px]" />
        </div>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="text-3xl lg:text-4xl font-black text-white/90 tracking-tighter drop-shadow-[0_2px_12px_rgba(99,102,241,0.5)]">
            N
          </div>
          <div className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.25em] text-indigo-200/70 mt-1">
            NexusHQ
          </div>
        </div>

        {/* Floating feature pills orbiting the orb */}
        {features.map((feat, i) => {
          const radius = 190; // orbit radius in px
          const angleRad = (feat.angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * radius;
          const y = Math.sin(angleRad) * radius;

          return (
            <div
              key={feat.label}
              className="absolute top-1/2 left-1/2 z-20 animate-fadeIn"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                animationDelay: `${i * 150}ms`,
              }}
            >
              <div
                className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 backdrop-blur-xl px-3.5 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-indigo-500/40 hover:shadow-[0_4px_30px_rgba(99,102,241,0.2)] transition-all duration-300 cursor-default whitespace-nowrap"
                style={{ animation: `float ${3 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.8}s` }}
              >
                <span className="text-sm">{feat.icon}</span>
                <span className="text-xs font-semibold text-slate-300">{feat.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%) rotate(15deg); }
          50% { transform: translateX(100%) rotate(15deg); }
        }
      `}</style>
    </div>
  );
}
