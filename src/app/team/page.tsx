import { getSiteSettings } from '@/lib/db-utils';
import type { SiteData } from '@/types';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default async function TeamPage() {
  const siteData = await getSiteSettings<SiteData>('site_data');

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="container mx-auto max-w-7xl px-6 py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Our People
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the team behind {siteData?.abbreviation || 'CARER'}
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder for team members */}
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <div className="mx-auto h-24 w-24 rounded-full bg-muted mb-4" />
              <h3 className="text-lg font-semibold text-foreground">
                Team Member
              </h3>
              <p className="text-sm text-muted-foreground mt-2">Position</p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <div className="mx-auto h-24 w-24 rounded-full bg-muted mb-4" />
              <h3 className="text-lg font-semibold text-foreground">
                Team Member
              </h3>
              <p className="text-sm text-muted-foreground mt-2">Position</p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <div className="mx-auto h-24 w-24 rounded-full bg-muted mb-4" />
              <h3 className="text-lg font-semibold text-foreground">
                Team Member
              </h3>
              <p className="text-sm text-muted-foreground mt-2">Position</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              This is a placeholder page. Add your team member information here.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
