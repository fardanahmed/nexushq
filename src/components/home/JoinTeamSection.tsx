import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const JoinTeamSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', location: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API waitlist submission
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-[#030014]/90 backdrop-blur-sm border-t border-white/5 relative overflow-hidden">
      {/* Glow background bubbles */}
      <div className="absolute -right-48 top-1/3 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute left-1/4 -bottom-48 h-[600px] w-[600px] rounded-full bg-violet-600/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          
          {/* Context Column */}
          <div className="space-y-8 lg:max-w-md animate-fadeInUp">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/15 bg-indigo-900/15 px-5 py-2 text-xs font-bold text-indigo-350 shadow-[0_0_20px_rgba(99,102,241,0.1)] uppercase tracking-widest backdrop-blur-md">
              Get Early Access
            </div>
            <h2 className="font-heading text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-400 sm:text-5xl drop-shadow-xl uppercase">
              Ready to Level Up Your Practice?
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed font-medium">
              Join the NexusHQ private beta to secure early access, lifetime launch discount rates, and help shape the command centre for modern mentors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="/features" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-350 font-bold group transition-colors">
                <span className="border-b border-transparent group-hover:border-indigo-450 pb-0.5">Explore all capabilities</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Glass Form Column */}
          <div className="relative animate-fadeInUp">
            {/* Soft backdrop glow behind the form */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-[2.5rem] blur-2xl opacity-15" />
            
            <div className="relative rounded-[2.2rem] border border-white/5 bg-slate-950/40 backdrop-blur-3xl p-8 md:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.6)] ring-1 ring-inset ring-white/5 hover:border-indigo-500/20 transition-all duration-500">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl bg-indigo-500/10 border border-indigo-500/20 p-8 text-center space-y-5"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-450 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      You're on the list!
                    </h3>
                    <p className="text-slate-400 mt-2 font-medium">
                      We will notify you at <span className="text-indigo-300">{formData.email}</span> as soon as your slot opens.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-semibold text-slate-350">Full Name</label>
                    <input
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="flex h-12 w-full rounded-xl border border-white/5 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/30 focus:bg-white/10 backdrop-blur-sm"
                      placeholder="e.g. Sarah Johnson"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-350">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="flex h-12 w-full rounded-xl border border-white/5 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/30 focus:bg-white/10 backdrop-blur-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-semibold text-slate-350">What do you coach/teach?</label>
                    <input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="flex h-12 w-full rounded-xl border border-white/5 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/30 focus:bg-white/10 backdrop-blur-sm"
                      placeholder="e.g. Executive, Tech, Design, Academics"
                    />
                  </div>
                  <div className="pt-2">
                    <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-xl text-base font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/35 hover:brightness-110 border border-indigo-400/20 cursor-pointer">
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" /> Enrolling...
                        </span>
                      ) : (
                        'Request Access Slot'
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default JoinTeamSection;

