import DemoHero from '@/components/home/DemoHero';
import DemoResearchGrid from '@/components/home/DemoResearchGrid';
import DemoObjectivesSection from '@/components/home/DemoObjectivesSection';
import { dataClient } from '@/lib/data/client';

export default async function DemoPage() {
  const researchAreasPromise = dataClient.fetchResearchAreas();

  return (
    <>
      <DemoHero />
      <DemoResearchGrid areasPromise={researchAreasPromise} />
      <DemoObjectivesSection />
    </>
  );
}
