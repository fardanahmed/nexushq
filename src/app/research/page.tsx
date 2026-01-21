// src/app/research/page.tsx
import { dataClient } from '@/lib/data/client';
import { getImageUrl } from '@/lib/images';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
import Link from 'next/link';
import type { ResearchArea } from '@/types';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Activity,
  Sprout,
  Cpu,
  Calculator,
};

async function getResearchAreas() {
  return await dataClient.fetchResearchAreas();
}

export default async function ResearchPage() {
  const researchAreas = await getResearchAreas();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background text-foreground">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-black text-white">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          >
            <source
              src={getImageUrl('Scene_a_scientific_1080p_202601202028.mp4')}
              type="video/mp4"
            />
          </video>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Research Areas
            </h1>
            <p className="max-w-2xl text-xl text-gray-200 sm:text-2xl">
              Exploring the frontiers of science and technology to solve the
              world&apos;s most pressing challenges.
            </p>
          </div>
        </section>

        {/* Research Grid */}
        <section className="py-24">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {researchAreas.map((area: ResearchArea) => {
                const Icon = iconMap[area.icon] || Zap;
                return (
                  <Card
                    key={area.id}
                    className="flex flex-col border-border transition-all hover:border-primary/50 hover:shadow-lg"
                  >
                    <CardHeader>
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-2xl">{area.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-muted-foreground">
                        {area.description}
                      </p>
                    </CardContent>
                    <div className="p-6 pt-0">
                      <Button
                        variant="ghost"
                        className="group pl-0 text-primary hover:text-primary/80 hover:bg-transparent"
                      >
                        Learn More{' '}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
              We are always looking for partners in industry and academia to
              advance our research goals.
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
      <Footer />
    </div>
  );
}
