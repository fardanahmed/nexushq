import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Executive Leadership Coach",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    quote: "NexusHQ completely eliminated my admin anxiety. I used to spend 10 hours a week chasing payments and sending Zoom links. Now, it's all automated. My clients love how professional the portal looks.",
    highlight: "Eliminated admin anxiety"
  },
  {
    name: "Marcus Thorne",
    role: "Fitness & Nutrition Mentor",
    image: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    quote: "The CRM features are a game-changer. Being able to track a client's progress, share secure documents, and handle billing in one dashboard makes me look like I have a full team behind me.",
    highlight: "A total game-changer"
  },
  {
    name: "Dr. Elena Rostova",
    role: "Career Transitions Expert",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    quote: "I moved over from a messy combination of Calendly, Stripe, and Google Drive. The migration was seamless and the unified experience justifies double the price I'm paying.",
    highlight: "Replaced my entire tech stack"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 relative bg-[#030014] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeInUp">
          <h2 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl text-white mb-6">
            Loved by <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">top mentors</span>
          </h2>
          <p className="text-lg text-slate-400 font-medium">
            Don't just take our word for it. See how coaches are reclaiming their time and scaling their businesses with NexusHQ.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div 
              key={i} 
              className="group relative flex flex-col justify-between p-8 rounded-3xl bg-slate-900/50 backdrop-blur-sm border border-white/5 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(124,58,237,0.1)]"
            >
              {/* Quote marks */}
              <div className="absolute top-6 right-8 text-6xl font-serif text-white/5 group-hover:text-violet-500/10 transition-colors pointer-events-none">
                "
              </div>

              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                <h4 className="text-lg font-bold text-white mb-3 font-heading">
                  "{testimonial.highlight}"
                </h4>
                
                <p className="text-slate-400 leading-relaxed text-sm mb-8">
                  {testimonial.quote}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full ring-2 ring-white/10 group-hover:ring-violet-500/50 transition-all object-cover"
                />
                <div>
                  <div className="text-white font-bold text-sm">{testimonial.name}</div>
                  <div className="text-violet-400 text-xs font-semibold">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
