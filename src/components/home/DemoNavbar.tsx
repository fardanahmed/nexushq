'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ModeToggle } from '@/components/mode-toggle';

const DemoNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/demo', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/research', label: 'Research' },
    { href: '/resources', label: 'Resources' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-amber-200 dark:border-amber-900/50 bg-[#fdfbf7]/95 dark:bg-stone-950/95 backdrop-blur supports-[backdrop-filter]:bg-[#fdfbf7]/80 dark:supports-[backdrop-filter]:bg-stone-950/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/demo" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-800 dark:bg-amber-700 text-amber-50 font-serif font-bold text-lg">
            C
          </div>
          <span className="text-xl font-bold font-serif text-amber-950 dark:text-amber-100 tracking-tight">
            CARER
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-amber-800 dark:hover:text-amber-400 ${
                  isActive
                    ? 'text-amber-800 dark:text-amber-400'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button
            size="sm"
            className="bg-amber-800 hover:bg-amber-900 dark:bg-amber-600 dark:hover:bg-amber-700 text-amber-50 rounded-full"
            asChild
          >
            <Link href="/demo" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Join Us
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-amber-900 dark:text-amber-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-amber-200 dark:border-amber-900/50 bg-[#fdfbf7] dark:bg-stone-950 lg:hidden">
          <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-medium py-2 ${
                    isActive
                      ? 'text-amber-800 dark:text-amber-400'
                      : 'text-stone-700 dark:text-stone-300'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default DemoNavbar;
