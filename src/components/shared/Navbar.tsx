import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

interface NavbarProps {
  pathname?: string;
}

const Navbar = ({ pathname: propPathname }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pathname, setPathname] = useState(propPathname || '');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updatePathname = () => {
      if (typeof window !== 'undefined') {
        setPathname(window.location.pathname);
      }
    };
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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      aria-label="Main Navigation"
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-emerald-500/20 bg-[#020408]/90 shadow-2xl shadow-black/80 backdrop-blur-2xl'
          : 'border-b border-white/5 bg-[#020408]/60 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        {/* Logo & Brand Name */}
        <a
          href="/"
          className="flex items-center gap-3 group cursor-pointer focus-visible:rounded-xl"
        >
          <Logo className="h-9 w-9 transition-transform duration-300 group-hover:scale-105" />
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold font-heading bg-gradient-to-r from-white via-slate-100 to-emerald-300 bg-clip-text text-transparent tracking-tight">
              NexusHQ
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 tabular-nums">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              v3.4
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1.5 lg:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-sm font-semibold rounded-full px-4 py-2 transition-all duration-200 ${
                  isActive
                    ? 'text-emerald-300 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbarActiveIndicator"
                    className="absolute inset-0 rounded-full bg-emerald-500/15 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,231,178,0.2)] -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}

          <a
            href="https://app.nexushq.tech"
            className="group relative ml-4 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 px-5 py-2.5 text-sm font-extrabold text-black shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/40 border border-emerald-300/50 overflow-hidden whitespace-nowrap"
          >
            <span className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine pointer-events-none" />
            <span className="relative z-10 font-extrabold">
              Start Free Trial
            </span>
          </a>
        </div>

        {/* Mobile Menu Button (Min 44x44px touch target) */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            type="button"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400"
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
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-nav"
            role="navigation"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="border-b border-emerald-500/20 bg-[#020408]/95 backdrop-blur-2xl lg:hidden overflow-hidden"
          >
            <div className="container mx-auto flex flex-col space-y-2 px-6 py-6">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`min-h-[44px] flex items-center text-base font-semibold px-3 rounded-xl transition-colors ${
                      isActive
                        ? 'text-emerald-300 bg-emerald-500/10 font-bold border-l-2 border-emerald-400'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-3">
                <a
                  href="https://app.nexushq.tech"
                  className="group relative w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 px-6 py-3.5 text-base font-extrabold text-black shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:shadow-emerald-500/40 border border-emerald-300/40 overflow-hidden"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">Start Free Trial</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
