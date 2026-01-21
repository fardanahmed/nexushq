import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, GraduationCap, CheckCircle2 } from 'lucide-react';
import { getCertifications, getSiteSettings } from '@/lib/db-utils';
import { getImageUrl, images } from '@/lib/images';
import type { MentorshipContent } from '@/types';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export const revalidate = 3600;

export default async function ResourcesPage() {
  const certifications = await getCertifications();
  const mentorshipContent =
    await getSiteSettings<MentorshipContent>('mentorship_content');

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background text-foreground">
        {/* Header Section */}
        <section className="border-b border-border py-16 sm:py-20 lg:py-28">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">
                Resources & Training
              </p>
              <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Resources & <span className="text-primary">Development</span>
              </h1>
              <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground">
                Empowering the next generation of researchers through
                certification, mentorship, and continuous learning
                opportunities.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="certifications" className="w-full">
              <div className="mb-12 flex justify-center">
                <TabsList className="grid h-auto w-full max-w-md grid-cols-2 rounded-full bg-muted p-1">
                  <TabsTrigger
                    value="certifications"
                    className="rounded-full px-8 py-3 text-sm font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                  >
                    Certifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="mentorship"
                    className="rounded-full px-8 py-3 text-sm font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                  >
                    Mentorship
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Certifications Tab */}
              <TabsContent
                value="certifications"
                className="mt-0 animate-in fade-in-50 slide-in-from-bottom-4 duration-500"
              >
                <div className="grid gap-8 lg:grid-cols-2">
                  {certifications.map((program) => (
                    <div
                      key={program.id}
                      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/50"
                    >
                      <div className="p-8">
                        <div className="mb-6 flex items-start justify-between">
                          <div className="rounded-lg bg-primary/10 p-3 text-primary">
                            <GraduationCap className="h-8 w-8" />
                          </div>
                          <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {program.duration}
                          </span>
                        </div>

                        <h3 className="mb-4 text-2xl font-bold text-card-foreground">
                          {program.title}
                        </h3>
                        <p className="mb-6 text-muted-foreground line-clamp-3">
                          {program.description}
                        </p>

                        <div className="border-t border-border pt-6">
                          {/* Here we might iterate modules if available or just show a button */}
                          <Button className="w-full" variant="secondary">
                            View Program Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Mentorship Tab */}
              <TabsContent
                value="mentorship"
                className="mt-0 animate-in fade-in-50 slide-in-from-bottom-4 duration-500"
              >
                <div className="overflow-hidden rounded-3xl border border-border bg-card">
                  <div className="grid lg:grid-cols-2">
                    <div className="p-12">
                      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                        <Users className="h-4 w-4" />
                        Global Network
                      </div>
                      <h2 className="mb-6 text-3xl font-bold tracking-tight text-card-foreground">
                        {mentorshipContent?.title || 'Expert Guidance'}
                      </h2>
                      <p className="mb-8 text-lg text-muted-foreground">
                        {mentorshipContent?.description ||
                          'Connect with world-class researchers and industry leaders.'}
                      </p>

                      <ul className="mb-10 space-y-4">
                        {[
                          'One-on-one career guidance',
                          'Research proposal reviews',
                          'Industry networking opportunities',
                          'Publication support',
                        ].map((item, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 text-card-foreground"
                          >
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <Button size="lg" className="w-full sm:w-auto">
                        Apply for Mentorship
                      </Button>
                    </div>
                    <div className="relative min-h-[400px] bg-muted lg:min-h-full">
                      <Image
                        src={getImageUrl(images.mentorship)}
                        alt="Mentorship Session"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
