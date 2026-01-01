import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { getSiteSettings } from '@/lib/db-utils';

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const siteData: any = await getSiteSettings('site_data');

  if (!siteData) return null;

  return (
    <footer className="border-t border-border bg-background text-muted-foreground">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          {/* Left: Logo and Tagline */}
          <div>
            <h3 className="mb-2 text-2xl font-bold text-foreground inline-flex items-baseline gap-1">
              <span>{siteData.abbreviation}</span>
              <span className="text-lg font-medium text-muted-foreground">Institute</span>
            </h3>
            <p className="text-sm text-muted-foreground">{siteData.tagline}</p>
          </div>

          {/* Middle: Navigation Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/research" className="transition-colors hover:text-primary">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/resources" className="transition-colors hover:text-primary">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-primary">
                  Contact
                </Link>
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
                <span>{siteData.contact.phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{siteData.contact.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <a 
                  href={`mailto:${siteData.contact.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {siteData.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom: Copyright and Legal Links */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm md:flex-row">
          <p className="text-muted-foreground">
            © {currentYear} {siteData.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
