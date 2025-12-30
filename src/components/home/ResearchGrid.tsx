'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getResearchAreas } from '@/lib/db-utils';
import { Zap, Activity, Sprout, Cpu, ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { use } from 'react';

const iconMap: Record<string, any> = {
  Zap,
  Activity,
  Sprout,
  Cpu,
};

const ResearchGrid = ({ areasPromise }: { areasPromise: Promise<any[]> }) => {
  const researchAreas = use(areasPromise);

  return (
    <section className="container mx-auto px-4 py-24 bg-background">
      <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Research Frontiers
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Our interdisciplinary teams are tackling the most pressing challenges of our time.
          </p>
        </div>
        <Button variant="ghost" className="group text-primary hover:text-primary/80 hover:bg-primary/10" asChild>
           <Link href="/research">
             View All Areas <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
           </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {researchAreas.map((area: any, index: number) => {
          const Icon = iconMap[area.icon] || Zap;
          return (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden border-border bg-card transition-all hover:bg-accent/50 hover:shadow-lg hover:border-primary/50 h-full">
              {/* Hover Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              
              <CardHeader>
                <div className="mb-4 rounded-lg bg-primary/10 w-fit p-3 ring-1 ring-inset ring-primary/20 transition-all group-hover:bg-primary/20 group-hover:ring-primary/50">
                  <span className="text-primary group-hover:text-primary transition-colors duration-300">
                     <Icon className="h-8 w-8" />
                  </span>
                </div>
                <CardTitle className="line-clamp-2 text-xl text-card-foreground">{area.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {area.description}
                </p>
              </CardContent>
              <CardFooter>
                  <span className="text-sm font-medium text-primary flex items-center opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
              </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ResearchGrid;
