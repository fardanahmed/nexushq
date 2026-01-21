import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import Hero from '@/components/home/Hero';
import ResearchGrid from '@/components/home/ResearchGrid';
import GoalsSection from '@/components/home/GoalsSection';
import JoinTeamSection from '@/components/home/JoinTeamSection';

import { getResearchAreas } from '@/lib/db-utils';

export default function Home() {
  const areasPromise = getResearchAreas();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ResearchGrid areasPromise={areasPromise} />
        <GoalsSection />
        <JoinTeamSection />
      </main>
      <Footer />
    </div>
  );
}
