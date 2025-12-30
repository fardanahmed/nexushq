// src/app/research/page.tsx
import { supabase } from '@/lib/data/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Activity, Sprout, Cpu, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, any> = {
  Zap,
  Activity,
  Sprout,
  Cpu,
};

async function getResearchAreas() {
  const { data, error } = await supabase
    .from('research_areas')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching research areas:', error);
    return [];
  }
  return data;
}

export default async function ResearchPage() {
  const researchAreas = await getResearchAreas();

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-primary pt-32 pb-20 text-primary-foreground">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/10 text-primary-foreground">
             <Zap className="h-8 w-8" />
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl">
            Research Areas
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-primary-foreground/90">
            Exploring the frontiers of science and technology to solve the world's most pressing challenges.
          </p>
        </div>
      </section>

      {/* Research Grid */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {researchAreas.map((area: any) => {
              const Icon = iconMap[area.icon] || Zap;
              return (
                <Card key={area.id} className="flex flex-col border-border transition-all hover:border-primary/50 hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                       <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground">{area.description}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                     <Button variant="ghost" className="group pl-0 text-primary hover:text-primary/80 hover:bg-transparent">
                        Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                     </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="border-t border-border bg-muted/30 py-24">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight">
            Interested in Collaborating?
          </h2>
          <p className="mb-10 text-xl text-muted-foreground">
            We are always looking for partners in industry and academia to advance our research goals.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn About Our Mission</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

