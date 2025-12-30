'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, RefreshCw, AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="max-w-2xl">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-destructive/10 p-6">
            <AlertCircle className="h-16 w-16 text-destructive" />
          </div>
        </div>
        
        {/* Heading */}
        <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl">
          Something Went Wrong
        </h1>
        
        {/* Description */}
        <p className="mb-8 text-lg text-muted-foreground">
          We're sorry, but something unexpected happened. Our team has been notified and we're working on a fix.
        </p>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 rounded-lg border border-border bg-muted p-4 text-left">
            <p className="text-sm font-mono text-muted-foreground">
              {error.message}
            </p>
            {error.digest && (
              <p className="mt-2 text-xs text-muted-foreground">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button 
            size="lg" 
            onClick={reset}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </Button>
          
          <Button size="lg" variant="outline" asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Support Info */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground">
            If the problem persists, please{' '}
            <Link href="/contact" className="text-primary hover:underline">
              contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
