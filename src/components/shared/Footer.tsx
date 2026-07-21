import { Mail, Phone, MapPin } from 'lucide-react';
import type { SiteData } from '@/types';

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
      ...siteData?.contact
    }
  };

  return (
    <footer className="relative border-t border-border bg-card text-muted-foreground">
      {/* Gradient accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          {/* Left: Logo and Tagline */}
          <div>
            <h3 className="mb-2 text-2xl font-bold text-foreground">
              {data.abbreviation}
            </h3>
            <p className="text-sm text-muted-foreground">{data.tagline}</p>
          </div>

          {/* Middle: Navigation Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/features"
                  className="transition-colors hover:text-primary"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="transition-colors hover:text-primary"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="transition-colors hover:text-primary"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Right: Contact Info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{data.contact.phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{data.contact.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <a
                  href={`mailto:${data.contact.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {data.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom: Copyright and Legal Links */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm md:flex-row">
          <p className="text-muted-foreground">
            © {currentYear} {data.name}. All rights reserved.
          </p>
          <a
            href={`mailto:${data.contact.email}`}
            className="transition-colors hover:text-primary"
          >
            {data.contact.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
