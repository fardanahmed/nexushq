import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from './ContactForm';
import { getSiteSettings } from '@/lib/db-utils';

export const revalidate = 3600;

export default async function ContactPage() {
  const siteData: any = await getSiteSettings('site_data');

  if (!siteData) return null;

  return (
    <main className="bg-background text-foreground">
      {/* Header Section */}
      <section className="border-b border-border py-20 lg:py-28">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
              Contact Us
            </p>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Get in Touch
            </h1>
            <p className="text-xl leading-relaxed text-muted-foreground">
              Interested in collaborating or learning more about our research? Reach out to us and let&apos;s work together to drive innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            
            {/* Contact Info */}
            <div>
              <h2 className="mb-8 text-2xl font-bold">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Visit Us</h3>
                    <p className="text-muted-foreground">{siteData.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                    <a href={`mailto:${siteData.contact.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {siteData.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                    <a href={`tel:${siteData.contact.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {siteData.contact.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Office Hours (Optional Enhancement) */}
              <div className="mt-12 p-6 rounded-xl border border-border bg-card/50">
                <h3 className="text-lg font-semibold mb-3">Office Hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />

          </div>
        </div>
      </section>
    </main>
  );
}
