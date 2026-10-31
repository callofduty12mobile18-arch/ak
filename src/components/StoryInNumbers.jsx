import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DEFAULT_UNIVERSE_DATA } from '../data/universeData';

const STATS = (stats) => [
  { value: stats.totalMessages.toLocaleString(), label: 'messages exchanged',  note: '93k moments of talking' },
  { value: stats.totalWords.toLocaleString(),    label: 'words written',        note: 'Equivalent to 4 full books' },
  { value: `${stats.streakDays}`,                label: 'days without a gap',   note: 'Not a single day missed' },
  { value: stats.lateNightMessages.toLocaleString(), label: 'late-night messages', note: 'Past midnight' },
  { value: stats.hugEmojis.toLocaleString(),     label: '🫂 hugs sent',         note: 'Our favourite emoji' },
  { value: stats.laughEmojis.toLocaleString(),   label: '😂 laughs shared',     note: 'Endless inside jokes' },
];

export default function StoryInNumbers({ girlfriendName, boyfriendName }) {
  const stats = DEFAULT_UNIVERSE_DATA.chatStats;
  const her   = girlfriendName || DEFAULT_UNIVERSE_DATA.girlfriendName;
  const him   = boyfriendName  || DEFAULT_UNIVERSE_DATA.boyfriendName;

  const total      = stats.herMessages + stats.himMessages;
  const herPct     = Math.round((stats.herMessages / total) * 100);
  const himPct     = 100 - herPct;
  const maxMonthly = Math.max(...stats.monthly2026.map(m => m.v));

  const [hoveredBar, setHoveredBar] = useState(null);

  return (
    <div className="section space-y-16 sm:space-y-20">

      {/* ── Section heading ──────────────────────────────────────── */}
      <div className="space-y-2">
        <h2 className="type-heading text-love-ink">Our story in numbers</h2>
        <span className="gold-rule block" style={{ width: '6rem' }} aria-hidden />
        <p className="type-label text-love-muted max-w-[52ch] mt-3">
          Every conversation, every late-night whisper, every unbroken day —
          measured and kept.
        </p>
      </div>

      {/* ── Six stat figures — numbers as display type ───────────── */}
      {/* Two-column editorial grid: number left, label right */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden border border-[rgba(255,255,255,0.07)]">
        {STATS(stats).map(({ value, label, note }, i) => (
          <div
            key={i}
            className="bg-[#0a0408] px-6 py-7 sm:px-8 sm:py-8 flex items-baseline gap-5"
          >
            {/* Number — Playfair display scale */}
            <dt className="font-playfair font-bold text-love-ink leading-none shrink-0"
                style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.03em' }}>
              {value}
            </dt>
            {/* Label + note stacked */}
            <div className="min-w-0">
              <dd className="type-label text-love-muted leading-snug">{label}</dd>
              <dd className="type-label text-love-faint leading-snug mt-0.5 italic">{note}</dd>
            </div>
          </div>
        ))}
      </dl>

      <hr className="gold-rule-full" />

      {/* ── Who texts more ───────────────────────────────────────── */}
      <div className="space-y-6 max-w-prose">
        <h3 className="font-cormorant italic text-love-ink font-medium"
            style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)' }}>
          Who can't stop texting?
        </h3>

        {[
          { name: her, pct: herPct, count: stats.herMessages, color: '#d4778d' },
          { name: him, pct: himPct, count: stats.himMessages, color: '#e8c16a' },
        ].map(({ name, pct, count, color }) => (
          <div key={name} className="space-y-1.5">
            <div className="flex items-baseline justify-between">
              <span className="type-label" style={{ color }}>{name}</span>
              <span className="type-label text-love-muted">
                {count.toLocaleString()} &nbsp;·&nbsp; {pct}%
              </span>
            </div>
            <div className="h-1.5 bg-[rgba(255,255,255,0.07)] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: color }}
              />
            </div>
          </div>
        ))}

        <p className="type-label text-love-faint italic pt-1">
          {her} leads — but every message from both of us is treasured.
        </p>
      </div>

      <hr className="gold-rule-full" />

      {/* ── Monthly volume bar chart ─────────────────────────────── */}
      <div className="space-y-6">
        <div className="space-y-0.5">
          <h3 className="font-cormorant italic text-love-ink font-medium"
              style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)' }}>
            2026 monthly volume
          </h3>
          <p className="type-label text-love-faint">Messages exchanged each month</p>
        </div>

        {/* Chart — bars grow from bottom, hover shows value */}
        <div
          className="flex items-end gap-1 sm:gap-2 h-44"
          role="img"
          aria-label="Bar chart of monthly message volume in 2026"
        >
          {stats.monthly2026.map((m, i) => {
            const hPct    = Math.max(4, (m.v / maxMonthly) * 100);
            const isPeak  = m.v === maxMonthly;
            const isHover = hoveredBar === i;

            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center justify-end gap-1.5 h-full"
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Tooltip */}
                <span
                  className={`type-label text-love-ink bg-[rgba(10,4,8,0.85)] px-1.5 py-0.5 rounded whitespace-nowrap transition-opacity duration-150 ${
                    isHover || isPeak ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {m.v.toLocaleString()}
                </span>

                {/* Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${hPct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: 'easeOut' }}
                  className="w-full rounded-t transition-colors duration-150"
                  style={{
                    background: isPeak
                      ? 'linear-gradient(to top, #b55570, #d4778d)'
                      : isHover
                      ? 'rgba(212,119,141,0.5)'
                      : 'rgba(255,255,255,0.12)',
                  }}
                />

                {/* Month label */}
                <span className={`type-label transition-colors duration-150 ${
                  isPeak ? 'text-love-rose' : 'text-love-faint'
                }`}>
                  {m.m}
                </span>
              </div>
            );
          })}
        </div>

        {/* Peak callout — inline, not a separate card */}
        <p className="type-label text-love-muted">
          Peak:{' '}
          <span className="text-love-rose">May 2026</span>
          {' '}— {stats.busiestDay}, 3,084 messages in a single day.
          We simply couldn't stop.
        </p>
      </div>

    </div>
  );
}
