import Image from 'next/image';
import { Shield, Lightbulb, Zap, Scale, Target } from 'lucide-react';
import { getSiteSettings } from '@/lib/db-utils';
import type { AboutContent, SiteData } from '@/types';

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="h-8 w-8" />,
  Lightbulb: <Lightbulb className="h-8 w-8" />,
  Zap: <Zap className="h-8 w-8" />,
};

export const revalidate = 3600; // Revalidate every hour

export default async function AboutPage() {
  const aboutContent = (await getSiteSettings('about_content')) as AboutContent;
  const siteData = (await getSiteSettings('site_data')) as SiteData;

  if (!aboutContent) {
    return <div className="p-20 text-center text-white">Loading content...</div>;
  }

  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" className="text-muted-foreground" />
          </svg>
        </div>
        
        <div className="container relative mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Who We Are
            </div>
            <h1 className="mb-8 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Pioneering the future of <span className="text-primary">sustainable development</span>
            </h1>
            <p className="text-xl leading-relaxed text-muted-foreground sm:text-2xl">
              {aboutContent.mission}
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            {[
              { title: 'Integrity', icon: Scale, desc: 'We adhere to the highest ethical standards in all our research and operations.' },
              { title: 'Innovation', icon: Lightbulb, desc: 'We constantly push boundaries to find novel solutions to complex global problems.' },
              { title: 'Impact', icon: Target, desc: 'We focus on tangible outcomes that make a measurable difference in society.' },
            ].map((value, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-card-foreground">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="border-y border-border bg-muted/30 py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            
            {/* Text Content */}
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
                Our Story
              </p>
              <h2 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
                The Journey of CARER
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                {aboutContent.preamble.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed mb-6">
                    {paragraph.replace(/\n/g, ' ')}
                  </p>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl md:aspect-[4/3] lg:aspect-auto lg:h-[600px] border border-border">
              <Image
                src="/assets/leadership.jpg"
                alt="Our History"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="border-t border-border bg-muted/50 py-20">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
            Our Vision
          </p>
          <blockquote className="mx-auto max-w-3xl text-2xl font-medium italic leading-relaxed text-foreground lg:text-3xl">
            &quot;{aboutContent.vision}&quot;
          </blockquote>
        </div>
      </section>
    </main>
  );
}
