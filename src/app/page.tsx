import Hero from '@/components/home/Hero';
import ResearchGrid from '@/components/home/ResearchGrid';
import ObjectivesSection from '@/components/home/ObjectivesSection';
import PartnersSection from '@/components/home/PartnersSection';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <Hero />
      <ResearchGrid />
      <ObjectivesSection />
      <PartnersSection />
    </main>
  );
}
