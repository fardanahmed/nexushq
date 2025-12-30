import Hero from '@/components/home/Hero';
import ResearchGrid from '@/components/home/ResearchGrid';
import ObjectivesSection from '@/components/home/ObjectivesSection';
import PartnersSection from '@/components/home/PartnersSection';

import { getResearchAreas } from '@/lib/db-utils';

export default function Home() {
  const areasPromise = getResearchAreas();
  
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <Hero />
      <ResearchGrid areasPromise={areasPromise} />
      <ObjectivesSection />
      <PartnersSection />
    </main>
  );
}
