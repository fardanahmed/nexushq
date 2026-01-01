import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getSiteSettings } from '@/lib/db-utils';
import type { HeroContent, SiteData } from '@/types';

const Hero = async () => {
  const heroContent = (await getSiteSettings('hero_content')) as HeroContent;
  const siteData = (await getSiteSettings('site_data')) as SiteData;

  if (!heroContent) return null;

  return (
    <section className="relative w-full bg-background">
      <div className="relative h-[90vh] w-full overflow-hidden bg-black shadow-2xl">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero-background.webp"
            alt="CARER Research"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
            style={{ filter: 'saturate(0.8) brightness(0.7)' }}
            priority
          />
          {/* Dark gradient overlay - stronger on left for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="container relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
          <div className="max-w-4xl pt-20">
            {/* Tagline Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-blue-200 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
              </span>
              {siteData?.tagline || 'Integrity. Innovation. Impact.'}
            </div>

            {/* Main Headline */}
            <h1 className="mb-8 text-left text-5xl font-bold leading-[1.1] sm:text-6xl lg:text-8xl text-white">
              {heroContent.headline}
            </h1>

            {/* Subheadline */}
            <p className="mb-12 max-w-2xl text-xl leading-relaxed text-slate-200 sm:text-2xl">
              {heroContent.subheadline}
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-white px-8 py-6 text-lg font-bold text-slate-950 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/50"
                asChild
              >
                <Link href="/research" className="flex items-center gap-2">
                  <span className="relative z-10">{heroContent.ctaPrimary}</span>
                  <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-100 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 bg-white/5 px-8 py-6 text-lg font-bold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/50 hover:shadow-lg"
                asChild
              >
                <Link href="/about">{heroContent.ctaSecondary}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
