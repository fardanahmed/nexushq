import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Logo } from './Logo';

interface NavbarProps {
  pathname?: string;
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const isActivePath = (pathname: string, href: string) =>
  pathname === href || (href !== '/' && pathname.startsWith(href));

const Navbar = ({ pathname: propPathname }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pathname, setPathname] = useState(propPathname || '');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updatePathname = () => setPathname(window.location.pathname);
    updatePathname();
    document.addEventListener('astro:page-load', updatePathname);
    return () =>
      document.removeEventListener('astro:page-load', updatePathname);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 z-50 w-full border-b transition-colors duration-150 ${
        scrolled || isMenuOpen
          ? 'border-hairline bg-ink/95'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2.5 rounded-control">
          <Logo className="h-8 w-8" size={32} />
          <span className="font-heading text-lg font-semibold text-chalk">
            NexusHQ
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = isActivePath(pathname, link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`rounded-control px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'text-chalk underline decoration-sea decoration-2 underline-offset-8'
                    : 'text-mist hover:text-chalk'
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <a
            href="/#join"
            className="ml-3 inline-flex h-10 items-center rounded-control bg-emerald px-4 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-sea"
          >
            Join the waitlist
          </a>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-control text-chalk hover:bg-slate-2 lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-nav"
          className="border-t border-hairline bg-ink lg:hidden"
        >
          <div className="container mx-auto flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => {
              const isActive = isActivePath(pathname, link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-11 items-center rounded-control px-3 text-base font-medium ${
                    isActive
                      ? 'bg-slate-2 text-chalk'
                      : 'text-mist hover:bg-slate-2 hover:text-chalk'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="/#join"
              className="mt-3 inline-flex min-h-12 items-center justify-center rounded-control bg-emerald px-4 text-base font-semibold text-ink"
              onClick={() => setIsMenuOpen(false)}
            >
              Join the waitlist
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
