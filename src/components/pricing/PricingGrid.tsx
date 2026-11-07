import { useState } from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const tiers = [
  {
    name: 'Starter',
    monthlyPrice: '$19',
    annualPrice: '$15',
    period: '/month',
    description: 'Perfect for solo coaches and mentors just getting started.',
    features: [
      'Up to 20 active clients',
      'Automated 1-on-1 scheduling',
      'Google Calendar & Zoom sync',
      'Automated email reminders',
      'Basic revenue analytics',
    ],
    cta: 'Start Free Trial',
    href: 'https://app.nexushq.tech',
    highlighted: false,
  },
  {
    name: 'Professional',
    monthlyPrice: '$49',
    annualPrice: '$39',
    period: '/month',
    description: 'For established coaches ready to scale their roster.',
    features: [
      'Unlimited active clients',
      'HD Video sessions with cloud recording',
      'Stripe payments & automated invoicing',
      'Custom branded client portal',
      'AI session summaries & notes',
      'Client progress tracking CRM',
      '24/7 Priority support',
    ],
    cta: 'Start Free Trial',
    href: 'https://app.nexushq.tech',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: 'Custom',
    annualPrice: 'Custom',
    period: '',
    description: 'For coaching firms, academies, and multi-mentor teams.',
    features: [
      'Everything in Professional',
      'Multi-coach team management',
      'Full white-label custom domain',
      'Custom API & Webhooks access',
      'SSO & SAML Authentication',
      'Dedicated Account Manager',
      'Custom SLA & Onboarding',
    ],
    cta: 'Contact Sales',
    href: '/contact',
    highlighted: false,
  },
];

export default function PricingGrid() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="space-y-12">
      {/* Monthly / Annual Toggle Switch */}
      <div className="flex items-center justify-center gap-4">
        <span
          className={`text-sm font-bold transition-colors ${!isAnnual ? 'text-white' : 'text-slate-400'}`}
        >
          Monthly Billing
        </span>

        <button
          type="button"
          role="switch"
          aria-checked={isAnnual}
          aria-label="Toggle annual billing discount"
          onClick={() => setIsAnnual(!isAnnual)}
          className="relative inline-flex h-8 w-16 items-center rounded-full bg-slate-900 border border-white/10 p-1 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
        >
          <motion.div
            animate={{ x: isAnnual ? 32 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="h-6 w-6 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 shadow-md"
          />
        </button>

        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-bold transition-colors ${isAnnual ? 'text-white' : 'text-slate-400'}`}
          >
            Annual Billing
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-mono font-bold text-emerald-400">
            Save <span className="tabular-nums">20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid gap-8 md:grid-cols-3 items-stretch max-w-7xl mx-auto">
        {tiers.map((tier) => {
          const price =
            tier.monthlyPrice === 'Custom'
              ? 'Custom'
              : isAnnual
                ? tier.annualPrice
                : tier.monthlyPrice;

          return (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-3xl p-8 md:p-10 transition-all duration-300 backdrop-blur-2xl hover:-translate-y-1 ${
                tier.highlighted
                  ? 'border border-emerald-500/40 bg-slate-950/90 shadow-[0_20px_60px_rgba(16,231,178,0.25)] ring-1 ring-emerald-500/30 glow-border'
                  : 'border border-emerald-500/15 bg-slate-950/50 hover:border-emerald-500/30 shadow-xl'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-400 px-4 py-1 text-xs font-extrabold text-black uppercase tracking-wider shadow-lg shadow-emerald-500/20 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-black" /> Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                  {tier.name}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed min-h-[40px] font-medium">
                  {tier.description}
                </p>
                <div className="flex items-baseline gap-1 mt-6">
                  <span className="text-5xl font-extrabold text-white tracking-tight font-heading tabular-nums">
                    {price}
                  </span>
                  {tier.period && (
                    <span className="text-slate-400 text-sm font-medium font-mono">
                      {tier.period}{' '}
                      {isAnnual && price !== 'Custom' && '(billed annually)'}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-slate-300 font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={tier.href}
                className={`group relative inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-bold transition-all duration-300 overflow-hidden ${
                  tier.highlighted
                    ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-300 text-black font-extrabold shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] border border-emerald-300/50'
                    : 'border border-emerald-500/20 bg-slate-900/60 text-white hover:bg-slate-900 hover:border-emerald-400/40'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>{tier.cta}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
