import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Orchestrated page-load sequence — one entrance, nowhere else
const FADE_UP = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

const PORTALS = [
  {
    section: 'story',
    title:   'Our story',
    desc:    'Chennai station to movie dates, home visits & 12 milestones',
  },
  {
    section: 'scrapbook',
    title:   'The scrapbook',
    desc:    'Polaroids, 3D flip cards & a scratch-to-reveal secret',
  },
  {
    section: 'numbers',
    title:   'Our numbers',
    desc:    '93,105 messages · 310k words · 101-day unbroken streak',
  },
  {
    section: 'letters',
    title:   '52 sealed letters',
    desc:    'Wax-sealed scrolls & mood letters for any moment',
  },
];

export default function HeroCountdown({
  anniversaryDate,
  girlfriendName,
  girlfriendBirthday,
  onNavigate,
  onOpenGiftBox,
}) {
  const her = girlfriendName || 'Shalini';

  const [timeLeft,      setTimeLeft]      = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [greeting,      setGreeting]      = useState('');
  const [daysUntilBday, setDaysUntilBday] = useState(null);
  const [isBirthday,    setIsBirthday]    = useState(false);

  useEffect(() => {
    const now = new Date();
    const isToday = now.getMonth() === 0 && now.getDate() === 23;
    setIsBirthday(isToday);

    if (isToday) {
      setGreeting(`Happy birthday, ${her}`);
    } else {
      const h = now.getHours();
      if      (h >= 5  && h < 12) setGreeting(`Good morning, ${her}`);
      else if (h >= 12 && h < 17) setGreeting(`Good afternoon, ${her}`);
      else if (h >= 17 && h < 22) setGreeting(`Good evening, ${her}`);
      else                        setGreeting(`Sweet dreams, ${her}`);
    }

    let next = new Date(now.getFullYear(), 0, 23);
    if (now > next && !isToday) next = new Date(now.getFullYear() + 1, 0, 23);
    setDaysUntilBday(isToday ? 0 : Math.ceil((next - now) / 86_400_000));

    const tick = () => {
      const start = new Date(anniversaryDate || '2026-03-24T18:00');
      const diff  = Math.max(0, new Date() - start);
      const s = 1000, m = s * 60, h = m * 60, d = h * 24;
      setTimeLeft({
        days:    Math.floor(diff / d),
        hours:   Math.floor((diff % d) / h),
        minutes: Math.floor((diff % h) / m),
        seconds: Math.floor((diff % m) / s),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [anniversaryDate, her]);

  const pad = (n, len = 2) => String(n).padStart(len, '0');

  return (
    <div className="section pt-20 sm:pt-24 pb-12 space-y-16 sm:space-y-20">

      {/* ── Hero block ──────────────────────────────────────────── */}
      <div className="space-y-6 max-w-3xl">

        {/* Greeting — Cormorant italic, the signature display line */}
        <motion.p
          {...FADE_UP(0)}
          className="type-display text-love-ink leading-none"
        >
          {greeting}
        </motion.p>

        {/* Gold rule beneath greeting — width auto-fits the text visually */}
        <motion.span
          {...FADE_UP(0.1)}
          className="gold-rule block"
          style={{ width: '14rem' }}
          aria-hidden
        />

        {/* Sub-copy — Montserrat 300, left-aligned, ≤ 60ch */}
        <motion.p
          {...FADE_UP(0.18)}
          className="font-montserrat font-light text-sm sm:text-base text-love-muted leading-relaxed max-w-[52ch]"
        >
          A universe handcrafted only for you — every memory, every whispered
          word, every promise we made, gathered in one quiet place.
        </motion.p>

        {/* Tamil quote — the visual heartbeat of this design */}
        <motion.blockquote
          {...FADE_UP(0.26)}
          className="border-l-2 border-love-rose/50 pl-5 space-y-1"
        >
          <p className="type-quote text-love-rose">
            "Una kathalecha en manasu ku savu illa de en kanmani"
          </p>
          <footer className="type-label text-love-muted">
            Polonium — June 1, 2026
          </footer>
        </motion.blockquote>
      </div>

      {/* ── Hero photo + live counter ────────────────────────────── */}
      <motion.div
        {...FADE_UP(0.34)}
        className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 sm:gap-10 items-start"
      >
        {/* Polaroid — the one image, no hover scale */}
        <button
          onClick={() => onNavigate('scrapbook')}
          aria-label="View the scrapbook"
          className="group self-start mx-auto sm:mx-0"
        >
          <div className="bg-[#f8f4ef] p-3 pb-10 rounded-sm shadow-[0_12px_40px_rgba(0,0,0,0.6)] -rotate-1 group-hover:rotate-0 transition-transform duration-500 w-[11rem] sm:w-[13rem]">
            <div className="w-full aspect-square overflow-hidden bg-black/10">
              <img
                src="/photos/couple-swing.jpeg"
                alt="Shalini and Polonium on the swing"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <p className="type-hand text-[#3d1a10] text-center mt-3 text-base leading-tight">
              You &amp; me on our swing 🌸
            </p>
          </div>
          {/* Washi tape */}
          <div
            aria-hidden
            className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-3 rounded-sm opacity-80 -rotate-1 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #d4778d, #e8c16a)' }}
          />
        </button>

        {/* Live counter */}
        <div className="space-y-4 pt-1">
          {/* Label */}
          <p className="type-label text-love-muted">
            Time spent loving you
            <span
              className="inline-flex items-center gap-1 ml-3 text-[10px] text-emerald-400 font-medium"
            >
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse inline-block" />
              live
            </span>
          </p>

          {/* Numbers — giant Playfair, left-aligned */}
          <div className="flex items-end gap-3 sm:gap-5 flex-wrap">
            {[
              { v: pad(timeLeft.days, 3), u: 'days' },
              { v: pad(timeLeft.hours),   u: 'hours' },
              { v: pad(timeLeft.minutes), u: 'min' },
              { v: pad(timeLeft.seconds), u: 'sec' },
            ].map(({ v, u }, i) => (
              <div key={i} className="flex flex-col items-start">
                <span className="type-counter text-love-ink tabular-nums">{v}</span>
                <span className="type-label text-love-muted mt-0.5">{u}</span>
              </div>
            ))}
          </div>

          <hr className="gold-rule-full" />

          {/* Birthday note */}
          <p className="type-label text-love-faint">
            {isBirthday
              ? '🎂 Today is her birthday!'
              : `${daysUntilBday} days until her birthday — January 23`
            }
            {' '}
            {onOpenGiftBox && !isBirthday && (
              <button
                onClick={onOpenGiftBox}
                className="text-love-gold hover:text-love-ink transition-colors ml-1 underline underline-offset-2"
              >
                Open the gift
              </button>
            )}
          </p>
        </div>
      </motion.div>

      {/* ── Four section portals ─────────────────────────────────── */}
      <motion.div {...FADE_UP(0.44)} className="space-y-3">
        <p className="type-label text-love-faint">Explore our world</p>
        <hr className="gold-rule-full" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden border border-[rgba(255,255,255,0.07)]">
          {PORTALS.map((p, i) => (
            <button
              key={i}
              onClick={() => onNavigate(p.section)}
              className="group bg-[#0a0408] hover:bg-[rgba(255,255,255,0.025)] transition-colors p-5 sm:p-6 text-left flex items-start justify-between gap-4"
            >
              <div className="space-y-1 flex-1 min-w-0">
                <p className="font-cormorant italic text-love-ink text-xl sm:text-2xl font-medium leading-tight group-hover:text-love-gold transition-colors duration-200">
                  {p.title}
                </p>
                <p className="type-label text-love-muted leading-relaxed">
                  {p.desc}
                </p>
              </div>
              <ArrowRight
                className="w-4 h-4 text-love-faint group-hover:text-love-gold group-hover:translate-x-0.5 transition-all duration-200 shrink-0 mt-1"
                aria-hidden
              />
            </button>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
