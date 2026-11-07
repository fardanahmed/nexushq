import { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Video,
  CreditCard,
  Users,
  Zap,
  Shield,
  Search,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Feature } from '@/types';

interface FeaturesFilterProps {
  initialFeatures: Feature[];
}

const categoryIcons: Record<string, typeof Sparkles> = {
  All: Sparkles,
  Scheduling: Calendar,
  Video: Video,
  Payments: CreditCard,
  CRM: Users,
  Automation: Zap,
};

export default function FeaturesFilter({
  initialFeatures,
}: FeaturesFilterProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Map features into logical categories
  const categories = [
    'All',
    'Scheduling',
    'Video',
    'Payments',
    'CRM',
    'Automation',
  ];

  const filteredFeatures = initialFeatures.filter((f) => {
    const matchesCategory =
      activeCategory === 'All' ||
      f.title.toLowerCase().includes(activeCategory.toLowerCase()) ||
      f.description.toLowerCase().includes(activeCategory.toLowerCase());

    const matchesSearch =
      searchQuery.trim() === '' ||
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10">
      {/* Category Pills and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-950/70 p-4 md:p-6 rounded-3xl border border-emerald-500/15 backdrop-blur-2xl glow-border">
        {/* Category Pills */}
        <div
          role="group"
          aria-label="Feature categories"
          className="flex flex-wrap items-center gap-2"
        >
          {categories.map((cat) => {
            const Icon = categoryIcons[cat] || Sparkles;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-300 text-black shadow-lg shadow-emerald-500/25 border border-emerald-300 font-extrabold'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search
            className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter features..."
            aria-label="Search and filter features"
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
          />
        </div>
      </div>

      {/* Grid Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory + searchQuery}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredFeatures.length === 0 ? (
            <div className="col-span-full py-16 text-center space-y-3 rounded-3xl border border-white/5 bg-white/[0.02]">
              <p className="text-lg font-bold text-white">
                No features match "{searchQuery}"
              </p>
              <p className="text-sm text-slate-400">
                Try adjusting your keyword or category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="mt-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredFeatures.map((feature, i) => (
              <div
                key={feature.id || i}
                className="group relative rounded-3xl border border-emerald-500/15 bg-slate-950/50 p-8 backdrop-blur-2xl hover:border-emerald-400/40 hover:shadow-[0_0_40px_rgba(16,231,178,0.15)] transition-all duration-500 flex flex-col justify-between glow-border"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all duration-300">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white group-hover:text-emerald-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                    Included in All Plans
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10e7b2]" />
                </div>
              </div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
