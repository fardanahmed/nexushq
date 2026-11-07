import { useState } from 'react';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    monthlyPrice: '$19',
    annualPrice: '$15',
    description: 'For a coach with a handful of clients.',
    features: [
      'Up to 20 active clients',
      'Booking page with your availability',
      'Google Calendar and Zoom sync',
      'Email reminders for both sides',
      'Income overview',
    ],
    cta: 'Join the waitlist',
    href: '/#join',
    highlighted: false,
  },
  {
    name: 'Professional',
    monthlyPrice: '$49',
    annualPrice: '$39',
    description: 'For an established practice with a full roster.',
    features: [
      'Unlimited clients',
      'Video sessions with recording',
      'Stripe payments and automatic invoices',
      'Client portal with your branding',
      'Session notes and action items',
      'Client progress and packages',
      'Priority support',
    ],
    cta: 'Join the waitlist',
    href: '/#join',
    highlighted: true,
  },
  {
    name: 'Team',
    monthlyPrice: 'Custom',
    annualPrice: 'Custom',
    description: 'For academies and multi-coach teams.',
    features: [
      'Everything in Professional',
      'Several coaches, shared clients',
      'Your own domain',
      'API and webhooks',
      'Single sign-on',
      'A named contact and onboarding',
    ],
    cta: 'Talk to us',
    href: '/contact',
    highlighted: false,
  },
];

export default function PricingGrid() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-center gap-3 text-sm">
        <span className={!isAnnual ? 'font-medium text-chalk' : 'text-mist'}>
          Monthly
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={isAnnual}
          aria-label="Bill yearly"
          onClick={() => setIsAnnual(!isAnnual)}
          className="relative inline-flex h-7 w-12 items-center rounded-full border border-hairline bg-slate-2 p-0.5"
        >
          <span
            className={`h-5 w-5 rounded-full bg-chalk transition-transform duration-150 ${
              isAnnual ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
        <span className={isAnnual ? 'font-medium text-chalk' : 'text-mist'}>
          Yearly <span className="text-sea">(two months free)</span>
        </span>
      </div>

      <div className="grid items-stretch gap-4 md:grid-cols-3">
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
              className={`flex flex-col rounded-object border p-8 ${
                tier.highlighted
                  ? 'border-sea/60 bg-slate'
                  : 'border-hairline bg-slate'
              }`}
            >
              <div className="flex items-baseline justify-between">
                <h2 className="text-h4">{tier.name}</h2>
                {tier.highlighted && (
                  <span className="text-xs text-sea">Most chosen</span>
                )}
              </div>
              <p className="mt-1.5 min-h-10 text-sm text-mist">
                {tier.description}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-heading text-5xl font-semibold tabular-nums text-chalk">
                  {price}
                </span>
                {price !== 'Custom' && (
                  <span className="text-sm text-mist">
                    /month{isAnnual && ', billed yearly'}
                  </span>
                )}
              </div>

              <ul className="mt-8 mb-8 flex-grow space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-chalk"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-sea"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={tier.href}
                className={`inline-flex h-12 items-center justify-center rounded-control px-6 text-base font-semibold transition-colors duration-150 ${
                  tier.highlighted
                    ? 'bg-emerald text-ink hover:bg-sea'
                    : 'border border-hairline text-chalk hover:bg-slate-2'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
