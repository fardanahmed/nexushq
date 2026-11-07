import { useState } from 'react';
import {
  Video,
  FileText,
  Users,
  CreditCard,
  Sparkles,
  CheckCircle,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  {
    id: 'video',
    label: 'HD Video & Audio',
    icon: Video,
    title: 'Integrated HD Video Sessions',
    subtitle:
      'Zero third-party links required. Launch 4K video rooms directly inside your mentor portal.',
    tag: '4K Ultra HD',
    metrics: [
      { label: 'Latency', value: '< 40ms' },
      { label: 'Recording', value: 'Auto Cloud Sync' },
      { label: 'Security', value: 'E2E Encrypted' },
    ],
    previewBg: 'from-emerald-950/40 via-slate-950 to-[#020408]',
  },
  {
    id: 'notes',
    label: 'AI Session Summaries',
    icon: FileText,
    title: 'Instant AI Action Item Extraction',
    subtitle:
      'Nexus AI automatically transcribes your calls, extracts key milestones, and drafts follow-up notes.',
    tag: 'Nexus AI 3.5',
    metrics: [
      { label: 'Accuracy', value: '99.4%' },
      { label: 'Processing', value: 'Real-time' },
      { label: 'Export', value: 'Notion & PDF' },
    ],
    previewBg: 'from-teal-950/40 via-slate-950 to-[#020408]',
  },
  {
    id: 'crm',
    label: 'Client CRM & Roster',
    icon: Users,
    title: 'Complete Client Relationship Hub',
    subtitle:
      'Keep track of client milestones, session history, shared files, and goal progress in one place.',
    tag: 'Unified Profiles',
    metrics: [
      { label: 'Active Roster', value: 'Unlimited' },
      { label: 'Files', value: 'Secure Storage' },
      { label: 'Reminders', value: 'Automated' },
    ],
    previewBg: 'from-cyan-950/40 via-slate-950 to-[#020408]',
  },
  {
    id: 'billing',
    label: 'Smart Invoicing',
    icon: CreditCard,
    title: 'Automated Billing & Payouts',
    subtitle:
      'Collect single-session fees or recurring retainer payments before clients even step into your call.',
    tag: 'Powered by Stripe',
    metrics: [
      { label: 'Payout Speed', value: 'Instant / 2-Day' },
      { label: 'Currencies', value: '135+ Supported' },
      { label: 'Invoices', value: 'Auto PDF' },
    ],
    previewBg: 'from-amber-950/40 via-slate-950 to-[#020408]',
  },
];

export default function PlatformShowcase() {
  const [activeTab, setActiveTab] = useState('video');
  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="mt-16 max-w-5xl mx-auto rounded-3xl border border-emerald-500/20 bg-[#020408]/85 p-6 md:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(16,231,178,0.12)] overflow-hidden">
      {/* Interactive Tabs Header with hotkey indicators */}
      <div
        role="tablist"
        aria-label="Platform capabilities tabs"
        className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8 border-b border-emerald-500/15 pb-6"
      >
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-bold font-heading transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-black shadow-lg shadow-emerald-500/25 border border-emerald-300/60 scale-[1.02] font-extrabold'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-900 border border-white/5'
              }`}
            >
              <span
                className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                  isActive
                    ? 'bg-black/20 text-black border-black/30'
                    : 'bg-white/5 text-slate-500 border-white/10'
                }`}
              >
                0{idx + 1}
              </span>
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className={`relative rounded-2xl p-6 md:p-10 border border-emerald-500/20 bg-gradient-to-br ${currentTab.previewBg} overflow-hidden shadow-2xl`}
        >
          <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Copy & Specs */}
            <div className="md:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentTab.tag}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight leading-tight">
                {currentTab.title}
              </h3>

              <p className="text-slate-300 text-base leading-relaxed font-medium">
                {currentTab.subtitle}
              </p>

              {/* Quick Metrics Cards */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {currentTab.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/15"
                  >
                    <div className="text-[11px] text-slate-400 font-mono">
                      {m.label}
                    </div>
                    <div className="text-sm font-bold text-white font-heading mt-0.5 tabular-nums">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Mock UI Visual */}
            <div className="md:col-span-5 relative">
              <div className="rounded-2xl border border-emerald-500/25 bg-[#03090e]/95 p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-emerald-500/15 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-300/90 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Live Telemetry
                  </span>
                </div>

                {activeTab === 'video' && (
                  <div className="space-y-3">
                    <div className="relative h-32 rounded-xl bg-slate-950 overflow-hidden flex items-center justify-center border border-emerald-500/20">
                      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/30 to-teal-600/10" />
                      <div className="relative z-10 text-center space-y-1">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/30 mx-auto flex items-center justify-center text-emerald-300">
                          <Video className="w-5 h-5" />
                        </div>
                        <div className="text-xs font-bold text-white font-heading">
                          Strategy Sync Call
                        </div>
                        <div className="text-[10px] text-emerald-400 font-mono flex items-center justify-center gap-1 tabular-nums">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          00:18:42 · HD Stream
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 space-y-1">
                      <div className="text-emerald-300 font-bold text-[11px] flex items-center gap-1 font-heading">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />{' '}
                        Action Items
                      </div>
                      <div className="text-slate-300 font-mono text-[11px]">
                        1. Review Q3 roadmap deck
                      </div>
                      <div className="text-slate-300 font-mono text-[11px]">
                        2. Approve Stripe payout schedule
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'crm' && (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center text-[10px]">
                          SJ
                        </div>
                        <div>
                          <div className="font-bold text-white font-heading text-[11px]">
                            Sarah Jenkins
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono tabular-nums">
                            12 Sessions Completed
                          </div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold font-mono">
                        VIP Active
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === 'billing' && (
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/20 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-mono">
                        Monthly Retainer
                      </span>
                      <span className="font-bold text-white font-heading tabular-nums">
                        $1,500.00
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono font-semibold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3" /> Auto-debited via
                      Stripe
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
