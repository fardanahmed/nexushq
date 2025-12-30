'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';
import { submitContactForm } from './actions';

const initialState = {
  success: false,
  message: '',
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-card-foreground">Send Us a Message</h2>
      
      {state.success ? (
        <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-6 text-center">
          <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">Message Sent!</h3>
          <p className="text-muted-foreground">{state.message}</p>
          <Button 
            variant="outline" 
            className="mt-6"
            onClick={() => window.location.reload()}
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form action={formAction} className="space-y-6">
          {state.message && !state.success && (
             <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
               {state.message}
             </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Name
              </label>
              <input 
                id="name" 
                name="name"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" 
                placeholder="Your Name" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input 
                id="email" 
                name="email"
                type="email" 
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" 
                placeholder="your@email.com" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium text-foreground">
              Subject
            </label>
            <input 
              id="subject" 
              name="subject"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" 
              placeholder="Research Inquiry..." 
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              Message
            </label>
            <textarea 
              id="message" 
              name="message"
              required
              className="flex min-h-[140px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none" 
              placeholder="Tell us about your inquiry..." 
            />
          </div>

          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full font-semibold disabled:opacity-70"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
              </>
            ) : (
              <>
                Send Message <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
