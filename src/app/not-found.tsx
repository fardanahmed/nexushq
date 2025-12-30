import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="max-w-2xl">
        {/* 404 Icon */}
        <div className="mb-8 text-9xl font-bold text-primary/20">404</div>
        
        {/* Heading */}
        <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl">
          Page Not Found
        </h1>
        
        {/* Description */}
        <p className="mb-8 text-lg text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Back to Home
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" asChild>
            <Link href="/research" className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Browse Research
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="mb-4 text-sm text-muted-foreground">
            Or explore these popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/about" className="text-primary hover:underline">
              About Us
            </Link>
            <Link href="/resources" className="text-primary hover:underline">
              Resources
            </Link>
            <Link href="/contact" className="text-primary hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
