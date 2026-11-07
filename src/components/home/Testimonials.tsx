import { motion, useReducedMotion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Executive Leadership Coach',
    image: '/assets/avatars/sarah.webp',
    quote:
      "NexusHQ completely eliminated my admin anxiety. I used to spend 10 hours a week chasing payments and sending Zoom links. Now, it's all automated.",
    highlight: 'Eliminated admin anxiety',
    featured: true,
  },
  {
    name: 'Marcus Thorne',
    role: 'Fitness & Nutrition Mentor',
    image: '/assets/avatars/marcus.webp',
    quote:
      'The CRM features are a game-changer. Tracking progress, sharing documents, and handling billing in one dashboard makes me look like I have a full team.',
    highlight: 'A total game-changer',
    featured: false,
  },
  {
    name: 'Dr. Elena Rostova',
    role: 'Career Transitions Expert',
    image: '/assets/avatars/elena.webp',
    quote:
      'Moved from Calendly + Stripe + Google Drive. The migration was seamless and the unified experience justifies double the price.',
    highlight: 'Replaced my entire tech stack',
    featured: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 relative bg-[#020408] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Left-aligned heading — breaks centered-heading monotony */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16"
        >
          <h2 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl text-white mb-4 pb-1">
            Loved by{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent inline-block pb-1">
              top mentors
            </span>
          </h2>
          <p className="text-lg text-slate-400 font-medium max-w-lg">
            See how coaches are reclaiming their time and scaling their
            businesses with NexusHQ.
          </p>
        </motion.div>

        {/* Staggered masonry: 1 large featured + 2 smaller */}
        <motion.div
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Featured testimonial — spans full height of 2 rows */}
          <motion.div
            variants={shouldReduceMotion ? undefined : cardVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="group relative flex flex-col justify-between p-10 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-emerald-500/15 hover:border-emerald-400/40 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(16,231,178,0.15)] md:row-span-2"
          >
            {/* Quote marks */}
            <div className="absolute top-8 right-10 text-7xl font-serif text-white/5 group-hover:text-emerald-500/10 transition-colors pointer-events-none select-none">
              "
            </div>

            <div>
              <h4 className="text-2xl font-bold text-white mb-4 font-heading leading-tight group-hover:text-emerald-300 transition-colors">
                "{testimonials[0].highlight}"
              </h4>
              <p className="text-slate-400 leading-relaxed text-base mb-8">
                {testimonials[0].quote}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
              <img
                src={testimonials[0].image}
                alt={testimonials[0].name}
                className="w-14 h-14 rounded-full ring-2 ring-emerald-500/30 group-hover:ring-emerald-400/60 transition-all object-cover"
              />
              <div>
                <div className="text-white font-bold text-base">
                  {testimonials[0].name}
                </div>
                <div className="text-emerald-400 text-sm font-semibold font-mono">
                  {testimonials[0].role}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Two smaller testimonials stacked */}
          {testimonials.slice(1).map((testimonial, i) => (
            <motion.div
              key={i}
              variants={shouldReduceMotion ? undefined : cardVariants}
              whileHover={
                shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }
              }
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="group relative flex flex-col justify-between p-8 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-emerald-500/15 hover:border-emerald-400/40 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(16,231,178,0.12)]"
            >
              <div className="absolute top-6 right-8 text-6xl font-serif text-white/5 group-hover:text-emerald-500/10 transition-colors pointer-events-none select-none">
                "
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-3 font-heading group-hover:text-emerald-300 transition-colors">
                  "{testimonial.highlight}"
                </h4>
                <p className="text-slate-400 leading-relaxed text-sm mb-6">
                  {testimonial.quote}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-auto pt-5 border-t border-white/5">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full ring-2 ring-emerald-500/30 group-hover:ring-emerald-400/60 transition-all object-cover"
                />
                <div>
                  <div className="text-white font-bold text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-emerald-400 text-xs font-semibold font-mono">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
