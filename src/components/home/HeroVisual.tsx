import { useCallback, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { CalendarDays, Wallet, Users, Video } from 'lucide-react';

/*
  The one 3D moment on the site: a coach's day, rendered as a tilted panel.
  Intro: rises from flat (rotateX 22) to its resting tilt, then idles.
  Pointer parallax is capped at ±4 degrees. Reduced motion = final frame.
  Transforms only; no blur layers.
*/
type Panel = 'today' | 'income' | 'clients';

const PANELS: { id: Panel; label: string; icon: typeof Video }[] = [
  { id: 'today', label: 'Today', icon: CalendarDays },
  { id: 'income', label: 'Income', icon: Wallet },
  { id: 'clients', label: 'Clients', icon: Users },
];

const SESSIONS = [
  {
    time: '10:00',
    name: 'Elena Rostova',
    kind: 'Strategy session',
    paid: true,
    live: true,
  },
  {
    time: '11:30',
    name: 'Marcus Kane',
    kind: 'Check-in',
    paid: true,
    live: false,
  },
  {
    time: '14:00',
    name: 'Open slot',
    kind: 'Booking link shared',
    paid: false,
    live: false,
  },
];

const MONTH_BARS = [38, 52, 46, 70, 64, 88];

const CLIENTS = [
  {
    initials: 'ER',
    name: 'Elena Rostova',
    next: 'Today 10:00',
    progress: '6 of 8 sessions',
  },
  {
    initials: 'MK',
    name: 'Marcus Kane',
    next: 'Today 11:30',
    progress: '2 of 6 sessions',
  },
  {
    initials: 'SJ',
    name: 'Sarah Jenkins',
    next: 'Thu 09:00',
    progress: '4 of 4 sessions',
  },
];

const REST = { rotateX: 6, rotateY: -8 };
const TILT = 4;

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [panel, setPanel] = useState<Panel>('today');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 120, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 120, mass: 0.5 });
  const rotateX = useTransform(
    smoothY,
    [-1, 1],
    [REST.rotateX + TILT, REST.rotateX - TILT]
  );
  const rotateY = useTransform(
    smoothX,
    [-1, 1],
    [REST.rotateY - TILT, REST.rotateY + TILT]
  );
  const sideX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const sideY = useTransform(smoothY, [-1, 1], [-8, 8]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduceMotion || !containerRef.current) return;
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      mouseX.set(((e.clientX - left) / width) * 2 - 1);
      mouseY.set(((e.clientY - top) / height) * 2 - 1);
    },
    [mouseX, mouseY, reduceMotion]
  );
  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const intro = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 40, rotateX: 22 },
          animate: { opacity: 1, y: 0, rotateX: 0 },
          transition: {
            duration: 0.9,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-[440px] w-full items-center justify-center sm:h-[500px]"
      style={{ perspective: 1600 }}
    >
      <motion.div
        {...intro(0.15)}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative z-10 w-[92%] max-w-[440px]"
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="rounded-object border border-hairline bg-slate p-5 shadow-object"
        >
          <div className="mb-4 flex items-center justify-between border-b border-hairline pb-3">
            <div>
              <div className="font-heading text-base font-semibold text-chalk">
                Tuesday 12
              </div>
              <div className="text-xs text-mist">3 sessions, 1 open slot</div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-sea">
              <span className="h-1.5 w-1.5 rounded-full bg-sea" />
              Live
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Hero preview panels"
            className="mb-4 flex gap-1 rounded-control bg-ink p-1"
          >
            {PANELS.map((p) => {
              const Icon = p.icon;
              const selected = panel === p.id;
              return (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setPanel(p.id)}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-chip py-1.5 text-xs font-medium transition-colors duration-150 ${
                    selected
                      ? 'bg-slate-2 text-chalk'
                      : 'text-mist hover:text-chalk'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {p.label}
                </button>
              );
            })}
          </div>

          <div className="min-h-[196px]">
            {panel === 'today' && (
              <ul className="space-y-2">
                {SESSIONS.map((s) => (
                  <li
                    key={s.time}
                    className={`flex items-center gap-3 rounded-control px-3 py-2.5 ${
                      s.live ? 'bg-slate-2' : ''
                    }`}
                  >
                    <span className="w-11 text-sm tabular-nums text-mist">
                      {s.time}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium text-chalk">
                        {s.name}
                      </span>
                      <span className="block text-xs text-mist">{s.kind}</span>
                    </span>
                    {s.live ? (
                      <span className="inline-flex items-center gap-1.5 rounded-chip bg-emerald px-2.5 py-1 text-xs font-semibold text-ink">
                        <Video className="h-3 w-3" aria-hidden="true" />
                        Join
                      </span>
                    ) : s.paid ? (
                      <span className="text-xs text-brass">Paid</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}

            {panel === 'income' && (
              <div className="space-y-4 px-1">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs text-mist">This month</div>
                    <div className="font-heading text-3xl font-semibold tabular-nums text-brass">
                      $4,320
                    </div>
                  </div>
                  <div className="text-xs text-mist">18 sessions</div>
                </div>
                <div className="flex h-20 items-end gap-2">
                  {MONTH_BARS.map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t ${i === MONTH_BARS.length - 1 ? 'bg-brass' : 'bg-slate-2'}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between rounded-control bg-ink px-3 py-2.5 text-xs">
                  <span className="text-mist">Stripe payout, Friday</span>
                  <span className="font-medium tabular-nums text-chalk">
                    $1,180
                  </span>
                </div>
              </div>
            )}

            {panel === 'clients' && (
              <ul className="space-y-2">
                {CLIENTS.map((c) => (
                  <li
                    key={c.initials}
                    className="flex items-center gap-3 px-3 py-2"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-2 text-xs font-semibold text-chalk">
                      {c.initials}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium text-chalk">
                        {c.name}
                      </span>
                      <span className="block text-xs text-mist">
                        {c.progress}
                      </span>
                    </span>
                    <span className="text-xs tabular-nums text-mist">
                      {c.next}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        {...intro(0.45)}
        style={{ x: sideX, y: sideY, transformStyle: 'preserve-3d' }}
        className="absolute top-3 right-0 z-20 hidden w-40 rounded-card sm:block border border-hairline bg-slate-2 p-3 shadow-object sm:right-2"
        aria-hidden="true"
      >
        <div className="text-xs text-mist">Payment received</div>
        <div className="mt-0.5 font-heading text-lg font-semibold tabular-nums text-brass">
          $240
        </div>
        <div className="text-xs text-mist">Elena Rostova, 10:00</div>
      </motion.div>

      <motion.div
        {...intro(0.55)}
        style={{ x: sideY, y: sideX, transformStyle: 'preserve-3d' }}
        className="absolute bottom-4 left-0 z-20 hidden w-44 rounded-card sm:block border border-hairline bg-slate-2 p-3 shadow-object sm:left-2"
        aria-hidden="true"
      >
        <div className="text-xs text-mist">Session notes</div>
        <div className="mt-0.5 text-sm font-medium text-chalk">Marcus Kane</div>
        <div className="text-xs text-mist">2 action items, shared</div>
      </motion.div>
    </div>
  );
}
