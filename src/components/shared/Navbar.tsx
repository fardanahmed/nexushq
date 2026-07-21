import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavbarProps {
  pathname?: string;
}

const Navbar = ({ pathname: propPathname }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pathname, setPathname] = useState(propPathname || '');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    }
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
    <nav className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${scrolled ? 'border-border/60 bg-background/95 shadow-lg shadow-black/10 backdrop-blur-xl' : 'border-border/40 bg-background/80 backdrop-blur-md'}`}>
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
            N
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">
            NexusHQ
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Button
                key={link.href}
                variant="ghost"
                asChild
                className={`text-base font-medium rounded-full px-5 transition-colors ${
                  isActive
                    ? 'bg-secondary text-primary hover:bg-secondary/80'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <a href={link.href}>{link.label}</a>
              </Button>
            );
          })}

          <Button asChild className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 font-semibold shadow-lg shadow-primary/20">
            <a href="https://app.nexushq.tech">Get Started</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="border-b border-border bg-background lg:hidden">
          <div className="container mx-auto flex flex-col space-y-4 px-4 py-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-medium transition-colors ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
            <Button
              asChild
              className="w-full bg-primary text-primary-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              <a href="https://app.nexushq.tech">Get Started</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
