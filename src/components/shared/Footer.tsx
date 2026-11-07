import { Mail, Phone, MapPin } from 'lucide-react';
import type { SiteData } from '@/types';
import { Logo } from './Logo';

interface FooterProps {
  siteData?: SiteData | null;
}

export default function Footer({ siteData }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const fallbackSiteData: SiteData = {
    name: 'NexusHQ Technologies',
    abbreviation: 'NexusHQ',
    tagline: 'The Coaching Platform for Modern Mentors',
    contact: {
      email: 'hello@nexushq.tech',
      phone: '+1-800-NEXUS-HQ',
      address: 'Remote-first, Global',
    },
  };

  const data = {
    ...fallbackSiteData,
    ...siteData,
    contact: {
      ...fallbackSiteData.contact,
      ...siteData?.contact,
    },
  };

  return (
    <footer className="relative border-t border-emerald-500/15 bg-[#020408] text-slate-400 overflow-hidden">
      {/* Top glowing ambient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="container mx-auto max-w-7xl px-6 pt-16 pb-12 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 mb-16">
          {/* Brand & Newsletter Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <Logo className="h-9 w-9" />
              <span className="text-2xl font-extrabold font-heading bg-gradient-to-r from-white via-slate-100 to-emerald-300 bg-clip-text text-transparent tracking-tight">
                {data.abbreviation}
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed font-medium">
              {data.tagline}. Unifying client booking, HD video sessions, CRM
              notes, and automated billing into one breathtaking command center.
            </p>

            {/* Operational Status Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span>
                All Systems Operational (
                <span className="tabular-nums">99.9%</span> Uptime)
              </span>
            </div>
          </div>

          {/* Navigation Links Column (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-heading">
              Platform Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/features', label: 'Platform Capabilities' },
                { href: '/pricing', label: 'Pricing & Plans' },
                { href: '/about', label: 'About & Mission' },
                { href: '/contact', label: 'Contact Support' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-emerald-300 font-medium py-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-heading">
              Connect With Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span className="tabular-nums">{data.contact.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>{data.contact.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <a
                  href={`mailto:${data.contact.email}`}
                  className="transition-colors hover:text-emerald-300 font-medium"
                >
                  {data.contact.email}
                </a>
              </li>
            </ul>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com/fardanahmed"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X Twitter Profile"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-slate-500">
          <p>
            © <span className="tabular-nums">{currentYear}</span> {data.name}.
            All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </a>
            <a
              href="/security"
              className="hover:text-slate-300 transition-colors"
            >
              Security Overview
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
