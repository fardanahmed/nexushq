'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const JoinTeamSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section className="border-y border-border bg-background py-12 md:py-16">
      <div className="container mx-auto max-w-xl px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-2">
            Keen to join the team?
          </h2>
          <p className="text-muted-foreground">
            Follow our journey, get our latest updates, hear about openings
          </p>
        </div>

        {submitted ? (
          <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-6 text-center">
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-1">
              Thank you for your interest!
            </h3>
            <p className="text-sm text-muted-foreground">
              We&apos;ll be in touch when opportunities arise.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="fullName" className="sr-only">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                required
                className="flex h-11 w-full rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="Full Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="flex h-11 w-full rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="Email"
              />
            </div>

            <div>
              <label htmlFor="location" className="sr-only">
                Location
              </label>
              <input
                id="location"
                name="location"
                className="flex h-11 w-full rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="Location"
              />
            </div>

            <div className="flex justify-center pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="font-semibold px-8 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default JoinTeamSection;
