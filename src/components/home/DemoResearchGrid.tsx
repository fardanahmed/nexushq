'use client';

import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Zap,
  Activity,
  Sprout,
  Cpu,
  Calculator,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { use } from 'react';
import type { ResearchArea } from '@/types';

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Activity,
  Sprout,
  Cpu,
  Calculator,
};

interface ResearchGridProps {
  areasPromise: Promise<ResearchArea[]>;
}

const DemoResearchGrid = ({ areasPromise }: ResearchGridProps) => {
  const researchAreas = use(areasPromise);

  return (
    <section className="py-24 bg-[#fdfbf7] dark:bg-stone-950 border-y border-stone-200 dark:border-stone-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <span className="text-sm font-medium uppercase tracking-widest text-amber-700 dark:text-amber-500">
            Our Focus
          </span>
          <h2 className="mt-3 font-serif text-4xl font-bold text-amber-950 dark:text-amber-50 sm:text-5xl">
            Research Frontiers
          </h2>
          <p className="mt-6 text-lg text-stone-600 dark:text-stone-400 max-w-3xl leading-relaxed">
            Exploring the intersection of knowledge and practice through
            rigorous, interdisciplinary research.
          </p>
        </div>

        {/* Research Cards - Card-based like book pages */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {researchAreas.map((area, index) => {
            const Icon = iconMap[area.icon] || Zap;
            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-lg hover:border-amber-200 dark:hover:border-amber-800 transition-all duration-300">
                  <CardHeader>
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-800">
                      <Icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="font-serif text-xl text-stone-800 dark:text-stone-100 leading-snug">
                      {area.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                      {area.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/30 pl-0"
                      asChild
                    >
                      <Link
                        href="/research"
                        className="flex items-center gap-2"
                      >
                        Explore
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DemoResearchGrid;
