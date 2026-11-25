import { useState, type SubmitEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const TOPICS = ['General question', 'Team plan', 'Beta access', 'Integrations'];

const inputClass =
  'h-12 w-full rounded-control border border-hairline bg-slate-2 px-4 text-sm text-chalk placeholder:text-mist/70';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: TOPICS[0],
    message: '',
  });

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const backendApiUrl = (
        import.meta.env.PUBLIC_BACKEND_API_URL || ''
      ).replace(/\/$/, '');
      const response = await fetch(`${backendApiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json().catch(() => ({}));
      setStatus({
        success: response.ok,
        message:
          result.message ||
          (response.ok
            ? 'Message sent.'
            : `The server answered ${response.status}. Try again in a minute, or email us directly.`),
      });
      if (response.ok) {
        setFormData({ name: '', email: '', subject: TOPICS[0], message: '' });
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      setStatus({
        success: false,
        message:
          'Could not reach the server. Check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status?.success) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-object border border-hairline bg-slate p-8"
      >
        <h2 className="text-h4">Message sent.</h2>
        <p className="mt-2 text-mist">{status.message} We reply by email.</p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setStatus(null)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-object border border-hairline bg-slate p-6 md:p-8"
    >
      <h2 className="text-h4">Send a message</h2>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-chalk">Topic</legend>
        <div className="flex flex-wrap gap-1.5">
          {TOPICS.map((topic) => {
            const selected = formData.subject === topic;
            return (
              <button
                key={topic}
                type="button"
                aria-pressed={selected}
                onClick={() => setFormData({ ...formData, subject: topic })}
                className={`rounded-control border px-3 py-1.5 text-sm transition-colors duration-150 ${
                  selected
                    ? 'border-sea/60 bg-slate-2 text-chalk'
                    : 'border-hairline text-mist hover:text-chalk'
                }`}
              >
                {topic}
              </button>
            );
          })}
        </div>
      </fieldset>

      {status && !status.success && (
        <p
          role="alert"
          className="rounded-control border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-chalk"
        >
          {status.message}
        </p>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-chalk"
          >
            Name
          </label>
          <input
            id="name"
            required
            autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-chalk"
        >
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full resize-none rounded-control border border-hairline bg-slate-2 px-4 py-3 text-sm text-chalk placeholder:text-mist/70"
          placeholder="What do you coach, and what do you need from the tool?"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" /> Sending
          </>
        ) : (
          'Send message'
        )}
      </Button>
    </form>
  );
}
