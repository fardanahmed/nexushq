import { useState, type SubmitEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TOPIC_PRESETS = [
  'General Inquiry',
  'Enterprise Plan',
  'VIP Beta Access',
  'API & Integrations',
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('subject', formData.subject);
      payload.append('message', formData.message);

      const backendApiUrl = (
        import.meta.env.PUBLIC_BACKEND_API_URL || ''
      ).replace(/\/$/, '');
      const response = await fetch(`${backendApiUrl}/api/contact`, {
        method: 'POST',
        body: payload,
      });

      const result = await response.json();
      setStatus({ success: response.ok, message: result.message });

      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          subject: 'General Inquiry',
          message: '',
        });
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      setStatus({
        success: false,
        message:
          'Failed to send message. Please check your network and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-3xl blur-2xl opacity-15" />
      <div className="relative rounded-3xl border border-emerald-500/20 bg-slate-950/70 backdrop-blur-3xl p-8 md:p-10 shadow-2xl glow-border">
        <h2 className="mb-6 font-heading text-2xl font-bold text-white">
          Send Us a Message
        </h2>

        {/* Quick Topic Selector */}
        <div className="mb-6">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5 font-mono">
            Select Topic
          </label>
          <div className="flex flex-wrap gap-2">
            {TOPIC_PRESETS.map((topic) => {
              const isSelected = formData.subject === topic;
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setFormData({ ...formData, subject: topic })}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-extrabold shadow-md shadow-emerald-500/20 border border-emerald-300'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {status?.success ? (
            <motion.div
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-8 text-center space-y-4"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  Message Delivered
                </h3>
                <p className="text-slate-300 text-sm mt-2">{status.message}</p>
                <Button
                  variant="outline"
                  className="mt-6 rounded-xl border-emerald-500/20 bg-slate-900/80 text-white hover:bg-slate-900 hover:border-emerald-400/40"
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
                  role="alert"
                  aria-live="assertive"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-2.5"
                >
                  <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                  <span>{status.message}</span>
                </motion.div>
              )}

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs font-semibold text-slate-300"
                  >
                    Your Name *
                  </label>
                  <input
                    id="name"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-slate-300"
                  >
                    Your Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="subject"
                  className="text-xs font-semibold text-slate-300"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  autoComplete="off"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                  placeholder="Inquiry Subject"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-semibold text-slate-300"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  autoComplete="off"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="flex w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 resize-none"
                  placeholder="Tell us about your coaching business and goals..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-2xl text-base font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-300 shadow-xl shadow-emerald-500/25 transition-all duration-300 hover:shadow-emerald-500/40 hover:scale-[1.01] border border-emerald-300/40 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2 text-black">
                    <Loader2 className="h-5 w-5 animate-spin" /> Transmitting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-black">
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
