import { useState } from 'react';
import { Video, FileText, Users, CreditCard } from 'lucide-react';

const tabs = [
  {
    id: 'video',
    label: 'Video sessions',
    icon: Video,
    title: 'Sessions start from the dashboard',
    subtitle:
      'One click joins the call. The recording and the notes land on the client record afterwards.',
    facts: [
      ['Join', 'From the session card'],
      ['Recording', 'Saved to the client'],
      ['Reminders', 'Sent to both sides'],
    ],
    mock: (
      <div className="space-y-2">
        <div className="flex h-28 items-center justify-center rounded-control bg-ink text-sm text-mist">
          Strategy session, 10:00
        </div>
        <div className="flex items-center justify-between text-xs text-mist">
          <span>Elena Rostova</span>
          <span className="text-sea">Recording on</span>
        </div>
      </div>
    ),
  },
  {
    id: 'notes',
    label: 'Session notes',
    icon: FileText,
    title: 'Notes that stay with the client',
    subtitle:
      'Write during or after the call. Action items are listed so the next session starts where the last one ended.',
    facts: [
      ['Notes', 'Per session'],
      ['Action items', 'Checked off next time'],
      ['Export', 'PDF or Notion'],
    ],
    mock: (
      <ul className="space-y-2 text-sm">
        <li className="rounded-control bg-ink px-3 py-2 text-chalk">
          Review the Q3 plan
        </li>
        <li className="rounded-control bg-ink px-3 py-2 text-chalk">
          Send the pricing draft
        </li>
        <li className="rounded-control bg-ink px-3 py-2 text-mist line-through">
          Book the next three sessions
        </li>
      </ul>
    ),
  },
  {
    id: 'crm',
    label: 'Clients',
    icon: Users,
    title: 'One record per client',
    subtitle:
      'Sessions, payments, files and goals in one place, for as many clients as you have.',
    facts: [
      ['Clients', 'No limit'],
      ['Files', 'Shared both ways'],
      ['Progress', 'Sessions used of a package'],
    ],
    mock: (
      <ul className="space-y-2 text-sm">
        {[
          ['SJ', 'Sarah Jenkins', '12 sessions'],
          ['MK', 'Marcus Kane', '2 of 6 sessions'],
        ].map(([i, n, p]) => (
          <li
            key={i}
            className="flex items-center gap-3 rounded-control bg-ink px-3 py-2"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-2 text-xs font-semibold text-chalk">
              {i}
            </span>
            <span className="flex-1 text-chalk">{n}</span>
            <span className="text-xs text-mist">{p}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: 'billing',
    label: 'Payments',
    icon: CreditCard,
    title: 'Paid before the session starts',
    subtitle:
      'Single sessions or packages, charged through your own Stripe account. Invoices are made for you.',
    facts: [
      ['Payout', 'Your Stripe schedule'],
      ['Packages', 'Pay once, book many'],
      ['Invoices', 'PDF, automatic'],
    ],
    mock: (
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between rounded-control bg-ink px-3 py-2">
          <span className="text-mist">Monthly package</span>
          <span className="tabular-nums text-brass">$1,500</span>
        </div>
        <div className="flex items-center justify-between rounded-control bg-ink px-3 py-2">
          <span className="text-mist">Paid on</span>
          <span className="tabular-nums text-chalk">2 Nov</span>
        </div>
      </div>
    ),
  },
];

export default function PlatformShowcase() {
  const [activeTab, setActiveTab] = useState('video');
  const current = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="mt-20 rounded-object border border-hairline bg-slate p-5 md:p-8">
      <div
        role="tablist"
        aria-label="Platform capabilities"
        className="mb-8 flex flex-wrap gap-2 border-b border-hairline pb-5"
      >
        {tabs.map((tab) => {
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
              className={`flex items-center gap-2 rounded-control px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? 'bg-slate-2 text-chalk'
                  : 'text-mist hover:text-chalk'
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`tabpanel-${current.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${current.id}`}
        className="grid items-start gap-8 md:grid-cols-12"
      >
        <div className="space-y-5 md:col-span-7">
          <h3 className="text-h3">{current.title}</h3>
          <p className="max-w-[52ch] text-mist">{current.subtitle}</p>
          <dl className="grid grid-cols-3 gap-4 pt-2">
            {current.facts.map(([k, v]) => (
              <div key={k} className="border-t border-hairline pt-3">
                <dt className="text-xs text-mist">{k}</dt>
                <dd className="mt-0.5 text-sm font-medium text-chalk">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-card border border-hairline bg-slate-2 p-4 md:col-span-5">
          {current.mock}
        </div>
      </div>
    </div>
  );
}
