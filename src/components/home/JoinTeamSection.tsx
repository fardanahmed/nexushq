import { useState, type SubmitEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const inputClass =
  'h-12 w-full rounded-control border border-hairline bg-slate-2 px-4 text-sm text-chalk placeholder:text-mist/70';

const JoinTeamSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
  });

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const backendApiUrl = (
        import.meta.env.PUBLIC_BACKEND_API_URL || ''
      ).replace(/\/$/, '');
      const response = await fetch(`${backendApiUrl}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(
          result.message ||
            `The server answered ${response.status}. Try again in a minute.`
        );
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : 'Could not reach the server. Check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="join" className="border-t border-hairline py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-6">
            <h2 className="text-h2">Join the waitlist.</h2>
            <p className="max-w-[48ch] text-lead text-mist">
              NexusHQ is in private beta. Leave your email and we tell you when
              a place opens. No card, no commitment.
            </p>
            <a
              href="/features"
              className="inline-block text-sm font-medium text-sea underline-offset-4 hover:underline"
            >
              See what is included
            </a>
          </div>

          <div className="rounded-object border border-hairline bg-slate p-6 md:p-8 lg:col-span-6">
            {submitted ? (
              <div role="status" aria-live="polite" className="space-y-2 py-4">
                <h3 className="text-h4">You are on the list.</h3>
                <p className="text-mist">
                  We email <span className="text-chalk">{formData.email}</span>{' '}
                  when a place opens.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate={false}
              >
                <div className="space-y-1.5">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-chalk"
                  >
                    Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    autoComplete="name"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-chalk"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-chalk"
                  >
                    What do you coach or teach?{' '}
                    <span className="font-normal text-mist">(optional)</span>
                  </label>
                  <input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Leadership, fitness, maths, piano"
                  />
                </div>
                {error && (
                  <p
                    role="alert"
                    className="rounded-control border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-chalk"
                  >
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" aria-hidden="true" />{' '}
                      Joining
                    </>
                  ) : (
                    'Join the waitlist'
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinTeamSection;
