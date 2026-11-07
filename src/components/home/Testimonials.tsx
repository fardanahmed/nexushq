// shortcut: illustrative quotes from the private beta brief, not verified customers; replace with real ones at launch.
const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Executive leadership coach',
    image: '/assets/avatars/sarah.webp',
    quote:
      'I used to spend ten hours a week chasing payments and sending Zoom links. Now clients pay when they book and the link is already there.',
  },
  {
    name: 'Marcus Thorne',
    role: 'Fitness and nutrition mentor',
    image: '/assets/avatars/marcus.webp',
    quote:
      'Progress, shared files and billing on one client record. It makes a one-person practice look like a team.',
  },
  {
    name: 'Dr. Elena Rostova',
    role: 'Career transitions coach',
    image: '/assets/avatars/elena.webp',
    quote:
      'Moved over from Calendly, Stripe and Google Drive. The migration took an afternoon and nothing was lost.',
  },
];

export default function Testimonials() {
  return (
    <section className="border-t border-hairline py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-h2">What coaches in the beta say.</h2>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <li
              key={t.name}
              className="flex flex-col justify-between rounded-card border border-hairline bg-slate p-6"
            >
              <blockquote className="text-base leading-relaxed text-chalk">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-hairline pt-4">
                <img
                  src={t.image}
                  alt=""
                  width="40"
                  height="40"
                  loading="lazy"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-medium text-chalk">{t.name}</div>
                  <div className="text-xs text-mist">{t.role}</div>
                </div>
              </figcaption>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
