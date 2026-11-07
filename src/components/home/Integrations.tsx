import { useState, useEffect } from 'react';
import { Activity, Check } from 'lucide-react';

const integrationTools = [
  {
    id: 'stripe',
    logo: 'https://cdn.simpleicons.org/stripe/10e7b2',
    color: '#10e7b2',
    angle: -25,
    radius: 170,
    label: 'Stripe Payments',
    latency: '4ms',
  },
  {
    id: 'zoom',
    logo: 'https://cdn.simpleicons.org/zoom/38bdf8',
    color: '#38bdf8',
    angle: 35,
    radius: 180,
    label: 'Zoom Video',
    latency: '12ms',
  },
  {
    id: 'calendar',
    logo: 'https://cdn.simpleicons.org/googlecalendar/f59e0b',
    color: '#f59e0b',
    angle: 95,
    radius: 160,
    label: 'Google Calendar',
    latency: '8ms',
  },
  {
    id: 'notion',
    logo: 'https://cdn.simpleicons.org/notion/ffffff',
    color: '#cbd5e1',
    angle: 155,
    radius: 190,
    label: 'Notion Workspace',
    latency: '15ms',
  },
  {
    id: 'slack',
    logo: '/assets/icons/slack.svg',
    color: '#E01E5A',
    angle: 215,
    radius: 175,
    label: 'Slack Notifications',
    latency: '6ms',
  },
  {
    id: 'mailchimp',
    logo: 'https://cdn.simpleicons.org/mailchimp/eab308',
    color: '#eab308',
    angle: 275,
    radius: 165,
    label: 'Mailchimp Campaigns',
    latency: '19ms',
  },
];

export default function Integrations() {
  const [mounted, setMounted] = useState(false);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-28 relative bg-[#020408] overflow-hidden border-t border-emerald-500/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,231,178,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Copy & Benefits */}
          <div className="space-y-8 lg:max-w-xl animate-fadeInUp">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold font-mono uppercase tracking-wider backdrop-blur-md">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Bi-Directional Telemetry Mesh</span>
            </div>

            <h2 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl text-white pb-1">
              Plays nice with your{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent inline-block pb-1">
                favorite tools
              </span>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed font-medium">
              NexusHQ acts as your central synaptic command hub, instantly
              bridging scheduling, video telemetry, automated payouts, and CRM
              sync without custom glue code.
            </p>
            <ul className="space-y-4 pt-2">
              {[
                'Zero-latency 2-way sync across Google Calendar, Outlook & Apple iCal.',
                'Dynamic 4K HD video room generation with instant meeting encryption.',
                'Automated Stripe invoice processing and instant global bank payouts.',
                'Auto-push client session takeaways directly into Notion and Slack channels.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 flex-shrink-0">
                    <Check className="w-3 h-3 text-emerald-300" />
                  </div>
                  <span className="text-slate-300 text-base font-medium">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Synaptic Node Mesh Visual */}
          <div className="relative h-[520px] flex items-center justify-center w-full">
            {/* Concentric Ambient Radar Rings */}
            <div className="absolute w-[360px] h-[360px] rounded-full border border-emerald-500/10 pointer-events-none animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-[440px] h-[440px] rounded-full border border-emerald-500/5 pointer-events-none animate-[spin_60s_linear_infinite_reverse]" />

            {/* Center Nexus Core Node */}
            <div className="relative z-20 w-32 h-32 rounded-[2.2rem] bg-gradient-to-br from-slate-900 via-slate-950 to-[#020408] border border-emerald-400/40 shadow-[0_0_60px_rgba(16,231,178,0.35)] flex items-center justify-center group cursor-pointer hover:border-emerald-300 hover:shadow-[0_0_90px_rgba(16,231,178,0.55)] transition-all duration-500">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-[2.2rem] animate-pulse" />
              <div className="relative z-10 flex flex-col items-center justify-center">
                <span className="text-4xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent tracking-wider drop-shadow-[0_0_12px_rgba(16,231,178,0.6)]">
                  N
                </span>
                <span className="text-[9px] font-mono font-bold text-emerald-400 tracking-widest uppercase">
                  CORE HUB
                </span>
              </div>
            </div>

            {/* Orbiting Brand Nodes */}
            {integrationTools.map((tool) => {
              const angleRad = (tool.angle * Math.PI) / 180;
              const x = Math.cos(angleRad) * tool.radius;
              const y = Math.sin(angleRad) * tool.radius;

              const isHovered = hoveredTool === tool.id;
              const opacity = hoveredTool === null || isHovered ? 1 : 0.35;

              return (
                <div
                  key={tool.id}
                  className="absolute top-1/2 left-1/2 w-16 h-16"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  {/* Connecting Line (SVG) with animated gradient dashes */}
                  <svg
                    className="absolute top-1/2 left-1/2 w-[480px] h-[480px] pointer-events-none -translate-x-1/2 -translate-y-1/2 -z-10"
                    style={{ opacity }}
                  >
                    <line
                      x1="240"
                      y1="240"
                      x2={240 - x}
                      y2={240 - y}
                      stroke={isHovered ? tool.color : 'rgba(16,231,178,0.2)'}
                      strokeWidth={isHovered ? '2.5' : '1.2'}
                      strokeDasharray={isHovered ? 'none' : '4 6'}
                      className="transition-all duration-300"
                    />
                  </svg>

                  {/* Tool Node Container */}
                  <div
                    tabIndex={0}
                    role="button"
                    aria-label={`Integration with ${tool.label}`}
                    onMouseEnter={() => setHoveredTool(tool.id)}
                    onMouseLeave={() => setHoveredTool(null)}
                    onFocus={() => setHoveredTool(tool.id)}
                    onBlur={() => setHoveredTool(null)}
                    className="relative z-10 w-full h-full rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-xl"
                    style={{
                      opacity,
                      boxShadow: isHovered
                        ? `0 0 35px ${tool.color}50`
                        : '0 10px 30px rgba(0,0,0,0.5)',
                      borderColor: isHovered
                        ? `${tool.color}90`
                        : 'rgba(255,255,255,0.1)',
                    }}
                  >
                    <img
                      src={tool.logo}
                      alt=""
                      className="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Tooltip Badge */}
                    <div
                      className={`absolute -top-12 whitespace-nowrap px-3 py-1.5 bg-slate-950 text-xs font-bold text-white rounded-xl transition-all duration-200 pointer-events-none shadow-2xl border border-emerald-500/20 flex items-center gap-2 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                      style={{ borderBottom: `2px solid ${tool.color}` }}
                    >
                      <span>{tool.label}</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        {tool.latency}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
