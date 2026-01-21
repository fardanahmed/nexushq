import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { getImageUrl, images } from '@/lib/images';

const DemoObjectivesSection = async () => {
  const objectives = [
    'Promote academic excellence through mentorship and advanced training.',
    'Bridge academia and industry to create commercially viable solutions.',
    'Foster collaborative research at national and international levels.',
  ];

  return (
    <section className="py-24 bg-[#fdfbf7] dark:bg-stone-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Left: Content */}
          <div>
            <span className="text-sm font-medium uppercase tracking-widest text-amber-700 dark:text-amber-500">
              Our Mission
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold text-amber-950 dark:text-amber-50 sm:text-5xl">
              CARER&apos;s{' '}
              <span className="text-amber-700 dark:text-amber-500">Goals</span>
            </h2>
            <p className="mt-8 text-lg text-stone-600 dark:text-stone-400 leading-relaxed max-w-xl">
              We are committed to fostering a culture of integrity and
              innovation, bridging the gap between theoretical knowledge and
              practical application to drive meaningful impact.
            </p>

            {/* Image with frame */}
            <div className="mt-10 relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg border border-stone-200 dark:border-stone-800">
              <Image
                src={getImageUrl(images.leadership)}
                alt="Leadership Development"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Goals List */}
          <div className="space-y-8">
            {objectives.map((objective, idx) => (
              <div key={idx} className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-800">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="pt-1">
                  <p className="text-lg text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                    {objective}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoObjectivesSection;
