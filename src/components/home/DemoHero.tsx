import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Library } from 'lucide-react';
import { getSiteSettings } from '@/lib/db-utils';
import { getImageUrl, images } from '@/lib/images';
import type { HeroContent, SiteData } from '@/types';

const Hero = async () => {
  const heroContent = await getSiteSettings<HeroContent>('hero_content');
  const siteData = await getSiteSettings<SiteData>('site_data');

  if (!heroContent) return null;

  return (
    <section className="relative w-full min-h-[85vh] flex items-center bg-[#fdfbf7] dark:bg-stone-950">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="book-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M20 0 L40 20 L20 40 L0 20 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-amber-900/10 dark:text-amber-400/10"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#book-pattern)" />
        </svg>
      </div>

      {/* Background Image with Warm Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getImageUrl(images.heroBackground)}
          alt="CARER Research"
          fill
          sizes="100vw"
          quality={90}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#fdfbf7]/85 dark:bg-stone-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fdfbf7] via-[#fdfbf7]/60 to-transparent dark:from-stone-950 dark:via-stone-950/60 dark:to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24">
          <div className="max-w-3xl">
            {/* Tagline with decorative element */}
            <div className="flex items-center gap-4 mb-8">
              <Library className="h-5 w-5 text-amber-700 dark:text-amber-500" />
              <span className="text-sm font-medium uppercase tracking-widest text-amber-700 dark:text-amber-500">
                {siteData?.tagline || 'Integrity. Innovation. Impact.'}
              </span>
            </div>

            {/* Main Headline - Serif for academic feel */}
            <h1 className="font-serif text-4xl font-bold leading-tight text-amber-950 dark:text-amber-50 sm:text-5xl lg:text-6xl">
              {heroContent.headline}
            </h1>

            {/* Subheadline - Warm gray for readability */}
            <p className="mt-6 text-lg leading-relaxed text-stone-600 dark:text-stone-400 sm:text-xl max-w-2xl">
              {heroContent.subheadline}
            </p>

            {/* Call to Action Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-amber-800 hover:bg-amber-900 dark:bg-amber-600 dark:hover:bg-amber-700 text-white rounded-full px-8 shadow-lg shadow-amber-900/20 dark:shadow-amber-900/40"
                asChild
              >
                <Link href="/team" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {heroContent.ctaPrimary}
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100 rounded-full px-8"
                asChild
              >
                <Link href="/about" className="flex items-center gap-2">
                  {heroContent.ctaSecondary}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
