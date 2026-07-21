import { useState, useEffect } from 'react';
import { CreditCard, Video, Calendar, MessageSquare, FileText, Mail, Link as LinkIcon } from 'lucide-react';

const integrationTools = [
  { id: 'stripe', icon: CreditCard, color: '#6366f1', angle: -20, radius: 150, label: 'Stripe' },
  { id: 'zoom', icon: Video, color: '#3b82f6', angle: 40, radius: 160, label: 'Zoom' },
  { id: 'calendar', icon: Calendar, color: '#f59e0b', angle: 100, radius: 140, label: 'Google Calendar' },
  { id: 'notion', icon: FileText, color: '#94a3b8', angle: 160, radius: 170, label: 'Notion' },
  { id: 'slack', icon: MessageSquare, color: '#f43f5e', angle: 220, radius: 170, label: 'Slack' },
  { id: 'mailchimp', icon: Mail, color: '#eab308', angle: 280, radius: 150, label: 'Mailchimp' },
];

export default function Integrations() {
  const [mounted, setMounted] = useState(false);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-32 relative bg-[#030014] overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Copy */}
          <div className="space-y-8 lg:max-w-xl animate-fadeInUp">
            <h2 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl text-white pb-1">
              Plays nice with your <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent inline-block pb-1">favorite tools</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed font-medium">
              You don't have to abandon the software you already know and love. NexusHQ acts as the central brain, seamlessly connecting to your existing stack so you never have to copy-paste data again.
            </p>
            <ul className="space-y-4">
              {[
                "Auto-sync calendar events and avoid double booking.",
                "Generate custom Zoom links for every session.",
                "Process payments instantly via Stripe.",
                "Export notes and CRM data to Notion or Slack."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 flex-shrink-0">
                    <LinkIcon className="w-3 h-3 text-indigo-300" />
                  </div>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Visual Node Graph */}
          <div className="relative h-[500px] flex items-center justify-center w-full">
            
            {/* Center Nexus Node */}
            <div className="relative z-20 w-32 h-32 rounded-[2rem] bg-gradient-to-br from-slate-900 to-[#030014] border border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.2)] flex items-center justify-center group cursor-pointer hover:border-indigo-400 hover:shadow-[0_0_80px_rgba(99,102,241,0.4)] transition-all duration-500">
              <div className="absolute inset-0 bg-indigo-500/10 rounded-[2rem] animate-pulse" />
              <span className="text-4xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">N</span>
            </div>

            {/* Orbiting Tools */}
            {integrationTools.map((tool) => {
              const angleRad = (tool.angle * Math.PI) / 180;
              const x = Math.cos(angleRad) * tool.radius;
              const y = Math.sin(angleRad) * tool.radius;
              
              const isHovered = hoveredTool === tool.id;
              const opacity = hoveredTool === null || isHovered ? 1 : 0.3;

              return (
                <div 
                  key={tool.id} 
                  className="absolute top-1/2 left-1/2 w-16 h-16" 
                  style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                >
                  
                  {/* Connecting Line (SVG) */}
                  <svg className="absolute top-1/2 left-1/2 w-[400px] h-[400px] pointer-events-none -translate-x-1/2 -translate-y-1/2 -z-10" style={{ opacity }}>
                    <line 
                      x1="200" y1="200" 
                      x2={200 - x} y2={200 - y} 
                      stroke={isHovered ? tool.color : 'rgba(255,255,255,0.1)'} 
                      strokeWidth={isHovered ? "2" : "1"}
                      strokeDasharray="4 4"
                      className="transition-all duration-300"
                    />
                  </svg>

                  {/* Tool Icon Node */}
                  <div 
                    onMouseEnter={() => setHoveredTool(tool.id)}
                    onMouseLeave={() => setHoveredTool(null)}
                    className="relative z-10 w-full h-full rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
                    style={{ 
                      opacity,
                      boxShadow: isHovered ? `0 0 30px ${tool.color}40` : 'none',
                      borderColor: isHovered ? `${tool.color}80` : 'rgba(255,255,255,0.1)'
                    }}
                  >
                    <tool.icon 
                      className="w-7 h-7 transition-colors duration-300" 
                      style={{ color: isHovered ? tool.color : '#94a3b8' }} 
                    />
                    
                    {/* Tooltip */}
                    <div 
                      className={`absolute -top-10 whitespace-nowrap px-3 py-1 bg-slate-800 text-xs font-bold text-white rounded-md transition-all duration-200 pointer-events-none ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                      style={{ borderBottom: `2px solid ${tool.color}` }}
                    >
                      {tool.label}
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
