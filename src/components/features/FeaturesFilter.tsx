import { useState } from 'react';
import {
  Calendar,
  Video,
  CreditCard,
  Users,
  Zap,
  Search,
  type LucideIcon,
} from 'lucide-react';
import type { Feature } from '@/types';

interface FeaturesFilterProps {
  initialFeatures: Feature[];
}

const categories = [
  'All',
  'Scheduling',
  'Video',
  'Payments',
  'CRM',
  'Automation',
];

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  Video,
  CreditCard,
  Users,
  Zap,
};

export default function FeaturesFilter({
  initialFeatures,
}: FeaturesFilterProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const q = searchQuery.trim().toLowerCase();
  const filtered = initialFeatures.filter((f) => {
    const text = `${f.title} ${f.description}`.toLowerCase();
    const inCategory =
      activeCategory === 'All' || text.includes(activeCategory.toLowerCase());
    return inCategory && (q === '' || text.includes(q));
  });

  const reset = () => {
    setActiveCategory('All');
    setSearchQuery('');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 border-b border-hairline pb-6 md:flex-row md:items-center md:justify-between">
        <div
          role="group"
          aria-label="Feature categories"
          className="flex flex-wrap gap-1.5"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-control px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'bg-slate-2 text-chalk'
                    : 'text-mist hover:text-chalk'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-64">
          <Search
            className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-mist"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search features"
            aria-label="Search features"
            className="h-10 w-full rounded-control border border-hairline bg-slate-2 pr-3 pl-9 text-sm text-chalk placeholder:text-mist/70"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-card border border-hairline py-14 text-center">
          <p className="font-medium text-chalk">
            Nothing matches {q ? `"${searchQuery}"` : `"${activeCategory}"`}.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-2 text-sm text-sea underline-offset-4 hover:underline"
          >
            Show all features
          </button>
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Zap;
            return (
              <li
                key={feature.id || i}
                className="flex flex-col rounded-card border border-hairline bg-slate p-6"
              >
                <Icon className="h-5 w-5 text-sea" aria-hidden="true" />
                <h2 className="mt-4 text-h4">{feature.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  {feature.description}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
