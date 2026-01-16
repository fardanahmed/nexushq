import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { getSiteSettings } from '@/lib/db-utils';
import { getImageUrl, images } from '@/lib/images';

const ObjectivesSection = async () => {
  const objectives = (await getSiteSettings('objectives')) as string[];

  if (!objectives) return null;

  return (
    <section className="bg-background border-y border-border py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Left: Heading & Image */}
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Our Strategic <span className="text-primary">Objectives</span>
            </h2>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              We are committed to fostering a culture of integrity and
              innovation, bridging the gap between theoretical knowledge and
              practical application.
            </p>

            {/* Image Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
                <Image
                  src={getImageUrl(images.leadership)}
                  alt="Leadership Development"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
                <Image
                  src={getImageUrl(images.mentorship)}
                  alt="Mentorship Programs"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: List */}
          <ul className="grid gap-6 sm:grid-cols-1">
            {objectives.map((objective, idx) => (
              <li key={idx} className="flex items-start">
                <div className="mr-4 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="text-lg text-foreground/90">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ObjectivesSection;
