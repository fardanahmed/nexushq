import { CheckCircle2 } from 'lucide-react';

const GoalsSection = () => {
  const goals = [
    'Promote academic excellence through mentorship and advanced training.',
    'Bridge academia and industry to create commercially viable solutions.',
    'Foster collaborative research at national and international levels.',
  ];

  return (
    <section className="bg-background border-y border-border py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] items-stretch">
          {/* Left: Title Box */}
          <div className="flex items-center justify-center rounded-2xl border-2 border-border bg-muted/30 p-8 md:p-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl text-center">
              CARER&apos;s <span className="text-primary">Goals</span>
            </h2>
          </div>

          {/* Right: Goals List */}
          <div className="flex items-center rounded-2xl border-2 border-border bg-card p-8 md:p-12">
            <ul className="space-y-6">
              {goals.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <span className="text-lg md:text-xl text-foreground/90 leading-relaxed">
                    {goal}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
