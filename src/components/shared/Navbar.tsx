'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ModeToggle } from '@/components/mode-toggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/research', label: 'Research' },
    { href: '/resources', label: 'Resources' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background backdrop-blur-sm">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
            C
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">
            CARER
          </span>
        </Link>

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
                <Link href={link.href}>{link.label}</Link>
              </Button>
            );
          })}

          <div className="ml-2 pl-2 border-l border-border/50">
            <ModeToggle />
          </div>

          <Button className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 font-semibold shadow-lg shadow-primary/20">
            Join Us
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 lg:hidden">
          <ModeToggle />
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
                <Link
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
                </Link>
              );
            })}
            <Button
              className="w-full bg-primary text-primary-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Join Us
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
