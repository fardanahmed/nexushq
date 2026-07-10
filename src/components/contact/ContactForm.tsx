import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('subject', formData.subject);
      payload.append('message', formData.message);

      const backendApiUrl = (import.meta.env.PUBLIC_BACKEND_API_URL || '').replace(/\/$/, '');
      const response = await fetch(`${backendApiUrl}/api/contact`, {
        method: 'POST',
        body: payload,
      });

      const result = await response.json();
      setStatus({ success: response.ok, message: result.message });
      
      if (response.ok) {
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      setStatus({ success: false, message: 'Failed to send message. Please check your network and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-2xl blur opacity-15" />
      <div className="relative rounded-2xl border border-border bg-card/60 backdrop-blur-md p-8 md:p-10 shadow-xl">
        <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">Send Us a Message</h2>
        
        <AnimatePresence mode="wait">
          {status?.success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-xl bg-green-500/10 border border-green-500/20 p-6 text-center space-y-4"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-600 dark:text-green-400 animate-bounce">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Message Sent!</h3>
                <p className="text-muted-foreground mt-2">{status.message}</p>
                <Button 
                  variant="outline" 
                  className="mt-6 rounded-full border-border bg-card hover:bg-accent" 
                  onClick={() => setStatus(null)}
                >
                  Send Another Message
                </Button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {status && !status.success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-2.5"
                >
                  <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                  <span>{status.message}</span>
                </motion.div>
              )}

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Your Name <span className="text-primary">*</span></label>
                  <input
                    id="name"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="flex h-11 w-full rounded-xl border border-border bg-background/50 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Your Email <span className="text-primary">*</span></label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="flex h-11 w-full rounded-xl border border-border bg-background/50 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                <input
                  id="subject"
                  autoComplete="off"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="flex h-11 w-full rounded-xl border border-border bg-background/50 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Inquiry Topic"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message <span className="text-primary">*</span></label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  autoComplete="off"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="flex w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="How can we collaborate?"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full h-11 rounded-xl font-bold shadow-lg shadow-primary/10 transition-all duration-300 hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message <Send className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
