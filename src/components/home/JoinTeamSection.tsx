import { useState, type SubmitEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const JoinTeamSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
  });

  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const backendApiUrl = (
        import.meta.env.PUBLIC_BACKEND_API_URL || ''
      ).replace(/\/$/, '');
      const response = await fetch(`${backendApiUrl}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(
          result.message || `Request failed (${response.status}).`
        );
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Could not join the waitlist.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="join"
      className="py-24 md:py-32 bg-[#020408]/95 backdrop-blur-sm border-t border-emerald-500/10 relative overflow-hidden"
    >
      {/* Dynamic Portal Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-25 blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, rgba(16, 231, 178, 0.2) 0%, rgba(251, 191, 36, 0.15) 50%, transparent 80%)',
          }}
        />
      </div>

      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* Context Column */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 lg:max-w-md"
          >
            <h2 className="font-heading text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-emerald-100 to-amber-300 sm:text-5xl drop-shadow-xl pb-2">
              Ready to Level Up Your Practice?
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed font-medium">
              Join the NexusHQ private beta to secure early access, lifetime
              launch discount rates, and help shape the command centre for
              modern mentors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="/features"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold group transition-colors"
              >
                <span className="border-b border-transparent group-hover:border-emerald-400 pb-0.5">
                  Explore all capabilities
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          {/* Glass Form Column */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Soft backdrop glow behind the form */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-[2.5rem] blur-2xl opacity-20" />

            <div className="relative rounded-[2.2rem] border border-emerald-500/20 bg-slate-950/70 backdrop-blur-3xl p-8 md:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] ring-1 ring-inset ring-emerald-500/10 hover:border-emerald-500/40 transition-all duration-500 group/form">
              {/* Internal glow line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-0 group-hover/form:opacity-100 transition-opacity duration-700" />

              {submitted ? (
                <motion.div
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-8 text-center space-y-5"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,231,178,0.3)]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-heading">
                      You're on the list!
                    </h3>
                    <p className="text-slate-400 mt-2 font-medium">
                      We will notify you at{' '}
                      <span className="text-emerald-300 font-semibold">
                        {formData.email}
                      </span>{' '}
                      as soon as your slot opens.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2 group/input relative">
                    <label
                      htmlFor="fullName"
                      className="text-sm font-semibold text-slate-300 transition-colors group-focus-within/input:text-emerald-300"
                    >
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      autoComplete="name"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="flex h-12 w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-white placeholder:text-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-emerald-950/20 backdrop-blur-sm shadow-inner shadow-black/50"
                      placeholder="e.g. Sarah Johnson"
                    />
                  </div>
                  <div className="space-y-2 group/input relative">
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-slate-300 transition-colors group-focus-within/input:text-emerald-300"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="flex h-12 w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-white placeholder:text-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-emerald-950/20 backdrop-blur-sm shadow-inner shadow-black/50"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-2 group/input relative">
                    <label
                      htmlFor="location"
                      className="text-sm font-semibold text-slate-300 transition-colors group-focus-within/input:text-emerald-300"
                    >
                      What do you coach/teach?
                    </label>
                    <input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="flex h-12 w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-white placeholder:text-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-emerald-950/20 backdrop-blur-sm shadow-inner shadow-black/50"
                      placeholder="e.g. Executive, Tech, Design, Academics"
                    />
                  </div>
                  {error && (
                    <p role="alert" className="text-sm text-red-400">
                      {error}
                    </p>
                  )}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-xl text-base font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-300 shadow-[0_0_25px_rgba(16,231,178,0.35)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(16,231,178,0.55)] hover:scale-[1.01] border border-emerald-300/60 cursor-pointer overflow-hidden relative group/btn"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out mix-blend-overlay" />
                      {isSubmitting ? (
                        <span className="flex items-center gap-2 relative z-10 text-black">
                          <Loader2 className="h-5 w-5 animate-spin text-black" />{' '}
                          Enrolling...
                        </span>
                      ) : (
                        <span className="relative z-10 text-black font-heading">
                          Request Early Access
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JoinTeamSection;
