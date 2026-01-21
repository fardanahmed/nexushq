import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { getSiteSettings } from '@/lib/db-utils';
import type { SiteData } from '@/types';

const DemoFooter = async () => {
  const currentYear = new Date().getFullYear();
  const siteData = await getSiteSettings<SiteData>('site_data');

  if (!siteData) return null;

  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-[#fdfbf7] dark:bg-stone-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Left: Brand */}
          <div className="max-w-sm">
            <Link href="/demo" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-700 dark:bg-amber-600 text-amber-50 font-serif font-bold">
                C
              </div>
              <span className="text-xl font-bold font-serif text-amber-950 dark:text-amber-100">
                CARER
              </span>
            </Link>
            <p className="mt-6 text-stone-600 dark:text-stone-400 leading-relaxed">
              {siteData.tagline}
            </p>
          </div>

          {/* Right: Links & Contact */}
          <div className="flex flex-col gap-12 sm:flex-row">
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-950 dark:text-amber-100">
                Explore
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/research"
                    className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors text-stone-600 dark:text-stone-400"
                  >
                    Research
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources"
                    className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors text-stone-600 dark:text-stone-400"
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors text-stone-600 dark:text-stone-400"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors text-stone-600 dark:text-stone-400"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-950 dark:text-amber-100">
                Contact
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-amber-700 dark:text-amber-500" />
                  <a
                    href={`mailto:${siteData.contact.email}`}
                    className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors text-stone-600 dark:text-stone-400"
                  >
                    {siteData.contact.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-amber-700 dark:text-amber-500" />
                  <span className="text-stone-600 dark:text-stone-400">
                    {siteData.contact.phone}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-amber-700 dark:text-amber-500 mt-1" />
                  <span className="text-stone-600 dark:text-stone-400">
                    {siteData.contact.address}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-stone-500 dark:text-stone-500">
          <p>
            © {currentYear} {siteData.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DemoFooter;
