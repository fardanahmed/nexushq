import Image from 'next/image';
import { getImageUrl, images } from '@/lib/images';

const PartnersSection = () => {
  return (
    <section className="border-y border-border bg-muted/20 py-16">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Our Partners & Collaborators
          </h2>
          <p className="mb-12 text-lg text-muted-foreground">
            Working together with leading institutions to drive innovation and
            research excellence
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl">
          <Image
            src={getImageUrl(images.institutionalPartners)}
            alt="CARER Institutional Partners and Collaborators"
            width={1200}
            height={400}
            className="h-auto w-full object-contain"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
