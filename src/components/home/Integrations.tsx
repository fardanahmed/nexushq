const tools = [
  {
    id: 'stripe',
    logo: 'https://cdn.simpleicons.org/stripe/f4f1e8',
    label: 'Stripe',
    does: 'Payments and payouts',
  },
  {
    id: 'zoom',
    logo: 'https://cdn.simpleicons.org/zoom/f4f1e8',
    label: 'Zoom',
    does: 'Video sessions',
  },
  {
    id: 'calendar',
    logo: 'https://cdn.simpleicons.org/googlecalendar/f4f1e8',
    label: 'Google Calendar',
    does: 'Two-way availability',
  },
  {
    id: 'notion',
    logo: 'https://cdn.simpleicons.org/notion/f4f1e8',
    label: 'Notion',
    does: 'Notes export',
  },
  {
    id: 'slack',
    logo: '/assets/icons/slack.svg',
    label: 'Slack',
    does: 'Booking alerts',
  },
  {
    id: 'mailchimp',
    logo: 'https://cdn.simpleicons.org/mailchimp/f4f1e8',
    label: 'Mailchimp',
    does: 'Client list sync',
  },
];

export default function Integrations() {
  return (
    <section className="border-t border-hairline py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-h2">Works with the tools you already use.</h2>
          <p className="mt-4 text-lead text-mist">
            Keep your calendar, your Stripe account and your video app. NexusHQ
            connects them so you stop copying between tabs.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {tools.map((tool) => (
            <li
              key={tool.id}
              className="rounded-card border border-hairline bg-slate p-4"
            >
              <img
                src={tool.logo}
                alt=""
                width="24"
                height="24"
                loading="lazy"
                className="h-6 w-6 object-contain"
              />
              <div className="mt-4 font-heading text-base font-semibold text-chalk">
                {tool.label}
              </div>
              <div className="mt-0.5 text-xs text-mist">{tool.does}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
