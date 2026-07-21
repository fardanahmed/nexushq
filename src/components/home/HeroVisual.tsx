import { useState, useEffect, useMemo } from 'react';

const features = [
  { id: 'schedule', label: 'Scheduling', icon: '📅', x: 0, y: -160, color: 'text-indigo-400' },
  { id: 'crm', label: 'Client CRM', icon: '👥', x: 160, y: 0, color: 'text-violet-400' },
  { id: 'video', label: 'HD Video', icon: '🎥', x: 0, y: 160, color: 'text-emerald-400' },
  { id: 'billing', label: 'Billing', icon: '💳', x: -160, y: 0, color: 'text-amber-400' },
];

export default function HeroVisual() {
  const [mounted, setMounted] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Generate stable random particles once
  const particles = useMemo(() => {
    return [...Array(12)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      z: Math.random() * -100,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * -5,
    }));
  }, []);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30; // Max rotation X
      const y = (e.clientY / window.innerHeight - 0.5) * 30; // Max rotation Y
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
    <div className="relative w-full h-[400px] lg:h-[480px] flex items-center justify-center select-none perspective-[1000px]">
      
      {/* Container with 3D tilt */}
      <div 
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out preserve-3d"
        style={{
          transform: `rotateX(${-mouseOffset.y}deg) rotateY(${mouseOffset.x}deg)`,
        }}
      >
        {/* SVG Data Lines */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-0" 
          viewBox="-250 -250 500 500" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {features.map((feat) => {
            // Calculate a curved path from the feature to the center
            const controlPointX = feat.x * 0.5;
            const controlPointY = feat.y * 0.5;
            const pathData = `M ${feat.x} ${feat.y} Q ${controlPointX + (feat.y !== 0 ? 50 : 0)} ${controlPointY + (feat.x !== 0 ? 50 : 0)} 0 0`;

            return (
              <g key={`path-${feat.id}`}>
                {/* Background Line */}
                <path 
                  d={pathData} 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className="text-indigo-500/20"
                />
                
                {/* Flowing Data Stream */}
                <path 
                  d={pathData} 
                  stroke="url(#glow-gradient)" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  strokeDasharray="4 24"
                  className="animate-data-flow"
                />
              </g>
            );
          })}

          <defs>
            <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
        </svg>

        {/* Central Core */}
        <div className="absolute z-20 flex items-center justify-center translate-z-[40px]">
          {/* Core Outer Glow */}
          <div className="absolute w-[180px] h-[180px] rounded-full bg-indigo-600/30 blur-2xl animate-pulse" />
          
          {/* Hexagon Shape */}
          <div className="relative w-28 h-28 bg-slate-900/80 backdrop-blur-xl border border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.4)] flex items-center justify-center overflow-hidden rotate-45 transition-transform duration-500 hover:scale-105 hover:border-indigo-400/80 hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] group cursor-default">
            {/* Inner rotating gradient */}
            <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(139,92,246,0.5)_360deg)] animate-[spin_4s_linear_infinite]" />
            
            <div className="absolute inset-1 bg-slate-950 flex flex-col items-center justify-center -rotate-45 z-10">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">
                N
              </div>
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-indigo-300 mt-1">
                Core
              </div>
            </div>
          </div>
        </div>

        {/* Satellite Nodes */}
        {features.map((feat) => (
          <div
            key={feat.id}
            className="absolute z-30 translate-z-[20px]"
            style={{
              transform: `translate(${feat.x}px, ${feat.y}px)`,
            }}
          >
            <div className="relative flex flex-col items-center justify-center group cursor-default">
              {/* Outer Ring */}
              <div className="absolute w-16 h-16 rounded-full border border-white/5 bg-slate-900/60 backdrop-blur-md shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:border-white/20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
              
              {/* Icon Container */}
              <div className={`relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-slate-800 border border-white/10 ${feat.color}`}>
                <span className="text-xl drop-shadow-md">{feat.icon}</span>
              </div>
              
              {/* Label */}
              <div className="absolute -bottom-8 whitespace-nowrap opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <span className="px-3 py-1 rounded-full bg-slate-900/90 border border-white/10 text-xs font-semibold text-slate-200 shadow-xl backdrop-blur-md">
                  {feat.label}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {/* Floating background particles */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-indigo-400/50"
            style={{
              left: p.left,
              top: p.top,
              transform: `translateZ(${p.z}px)`,
              animation: `float-particle ${p.duration}s ease-in-out infinite alternate`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

      </div>

      <style>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        @keyframes float-particle {
          0% { transform: translateY(0) scale(1); opacity: 0.2; }
          100% { transform: translateY(-40px) scale(1.5); opacity: 0.8; }
        }
        @keyframes data-flow {
          0% { stroke-dashoffset: 28; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-data-flow {
          animation: data-flow 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
