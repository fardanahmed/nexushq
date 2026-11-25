import type { SiteData } from '@/types';
import { Logo } from './Logo';

interface FooterProps {
  siteData?: SiteData | null;
}

const fallbackSiteData: SiteData = {
  name: 'NexusHQ Technologies',
  abbreviation: 'NexusHQ',
  tagline:
    'Booking, payments, video sessions and client notes for solo coaches',
  contact: {
    email: 'hello@nexushq.tech',
  },
};

const links = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const social = [
  {
    href: 'https://github.com/fardanahmed',
    label: 'GitHub',
    path: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z',
  },
  {
    href: 'https://x.com',
    label: 'X',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    href: 'https://linkedin.com',
    label: 'LinkedIn',
    path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  },
];

export default function Footer({ siteData }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const data = {
    ...fallbackSiteData,
    ...siteData,
    contact: { ...fallbackSiteData.contact, ...siteData?.contact },
  };

  return (
    <footer className="border-t border-hairline bg-ink-2 text-mist">
      <div className="container mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="mb-14 grid gap-12 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <Logo className="h-8 w-8" size={32} />
              <span className="font-heading text-lg font-semibold text-chalk">
                {data.abbreviation}
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed">{data.tagline}.</p>
            <p className="text-sm">
              Private beta. The client portal is in development.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="mb-4 text-sm font-semibold text-chalk">Pages</h2>
            <ul className="space-y-2.5 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block py-0.5 transition-colors duration-150 hover:text-chalk"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h2 className="mb-4 text-sm font-semibold text-chalk">Contact</h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${data.contact.email}`}
                  className="transition-colors duration-150 hover:text-chalk"
                >
                  {data.contact.email}
                </a>
              </li>
              {data.contact.phone && (
                <li className="tabular-nums">{data.contact.phone}</li>
              )}
              {data.contact.address && <li>{data.contact.address}</li>}
            </ul>
            <div className="mt-5 flex items-center gap-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-control border border-hairline text-mist transition-colors duration-150 hover:bg-slate-2 hover:text-chalk"
                >
                  <svg
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-hairline pt-6 text-xs sm:flex-row sm:items-center">
          <p>
            © <span className="tabular-nums">{currentYear}</span> {data.name}
          </p>
          <div className="flex items-center gap-5">
            <a href="/privacy" className="transition-colors hover:text-chalk">
              Privacy
            </a>
            <a href="/terms" className="transition-colors hover:text-chalk">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
