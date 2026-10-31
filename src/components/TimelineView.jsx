import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DEFAULT_UNIVERSE_DATA } from '../data/universeData';

// Photo attached to specific milestones by date or title keyword
function getMilestonePhoto(m) {
  const title = (m.title || '').toLowerCase();
  const date  = m.date  || '';
  if (date.includes('2026-03-24') || title.includes('our love began'))
    return { src: '/photos/couple-selfie-bw.jpeg', caption: 'The day forever started' };
  if (date.includes('2026-04-08') || title.includes('trust'))
    return { src: '/photos/holding-hand-1.jpeg',   caption: '"Naa full ah trust panra unna"' };
  if (date.includes('2026-07-25') || title.includes('movie') || date.includes('2026-07-14'))
    return { src: '/photos/holding-hand-2.jpeg',   caption: 'Fingers interlocked in the dark' };
  if (date.includes('2026-09-06') || date.includes('2026-09-19') || title.includes('home'))
    return { src: '/photos/couple-swing.jpeg',     caption: 'Our smiles, side by side' };
  return null;
}

export default function TimelineView({ milestones, girlfriendName, boyfriendName }) {
  const list   = milestones || DEFAULT_UNIVERSE_DATA.milestones;
  const quotes = DEFAULT_UNIVERSE_DATA.memoryQuotes;
  const her    = girlfriendName || DEFAULT_UNIVERSE_DATA.girlfriendName;
  const him    = boyfriendName  || DEFAULT_UNIVERSE_DATA.boyfriendName;

  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setQuoteIdx(i => (i + 1) % quotes.length),
      6500
    );
    return () => clearInterval(id);
  }, [quotes.length]);

  const q       = quotes[quoteIdx];
  const speaker = q.who === 'her' ? her : him;

  return (
    <div className="section space-y-16 sm:space-y-20">

      {/* ── Section heading ────────────────────────────────────── */}
      <div className="space-y-2">
        <h2 className="type-heading text-love-ink">Our journey</h2>
        <span className="gold-rule block" style={{ width: '5rem' }} aria-hidden />
        <p className="type-label text-love-muted max-w-[52ch] mt-3">
          From Chennai Railway Station to quiet home visits — every chapter
          that made us more us.
        </p>
      </div>

      {/* ── Memory quotes carousel ──────────────────────────────── */}
      <div className="space-y-5">
        <p className="type-label text-love-faint">Words I'll never forget</p>

        {/* Quote display */}
        <div className="min-h-[6rem] flex items-start">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={quoteIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{   opacity: 0, y: -6 }}
              transition={{ duration: 0.32 }}
              className="border-l-2 border-love-rose/50 pl-5 space-y-2"
            >
              <p className="type-quote text-love-rose">"{q.text}"</p>
              <footer className="type-label text-love-muted">
                {speaker} &mdash; {q.date}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Carousel nav — prev / dots / next */}
        <div className="flex items-center gap-4 pl-5">
          <button
            onClick={() => setQuoteIdx((quoteIdx - 1 + quotes.length) % quotes.length)}
            className="w-7 h-7 flex items-center justify-center rounded border border-[rgba(255,255,255,0.1)] text-love-muted hover:text-love-ink hover:border-[rgba(255,255,255,0.2)] transition-colors"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-3.5 h-3.5" aria-hidden />
          </button>

          <div className="flex items-center gap-1.5" role="tablist" aria-label="Quotes">
            {quotes.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === quoteIdx}
                aria-label={`Quote ${i + 1}`}
                onClick={() => setQuoteIdx(i)}
                className={[
                  'h-px rounded-full transition-all duration-300',
                  i === quoteIdx
                    ? 'w-8 bg-love-gold'
                    : 'w-2 bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.4)]',
                ].join(' ')}
              />
            ))}
          </div>

          <button
            onClick={() => setQuoteIdx((quoteIdx + 1) % quotes.length)}
            className="w-7 h-7 flex items-center justify-center rounded border border-[rgba(255,255,255,0.1)] text-love-muted hover:text-love-ink hover:border-[rgba(255,255,255,0.2)] transition-colors"
            aria-label="Next quote"
          >
            <ChevronRight className="w-3.5 h-3.5" aria-hidden />
          </button>
        </div>
      </div>

      <hr className="gold-rule-full" />

      {/* ── Milestones list ─────────────────────────────────────── */}
      <ol className="relative space-y-0" aria-label="Relationship milestones">
        {/* Continuous left rail */}
        <div
          className="absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-love-rose/40 via-love-rose/20 to-transparent pointer-events-none"
          aria-hidden
        />

        {list.map((m, idx) => {
          const photo = getMilestonePhoto(m);
          const dateStr = new Date(m.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
          });

          return (
            <li
              key={m.id ?? idx}
              className="relative pl-8 sm:pl-12 pb-12 last:pb-0"
            >
              {/* Bead on the rail */}
              <div
                className="absolute left-0 top-[1.1rem] w-2 h-2 rounded-full bg-love-rose/70 -translate-x-[3px] ring-4 ring-[#0a0408]"
                aria-hidden
              />

              {/* Date */}
              <p className="type-label text-love-gold mb-2">{dateStr}</p>

              {/* Title */}
              <h3 className="font-cormorant italic font-medium text-love-ink leading-snug mb-2"
                  style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }}>
                {m.title}
              </h3>

              {/* Narrative */}
              <p className="type-label text-love-muted leading-relaxed max-w-[58ch]">
                {m.text}
              </p>

              {/* Attached photo — only for milestones that have one */}
              {photo && (
                <div className="mt-5 flex items-start gap-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded overflow-hidden border border-[rgba(255,255,255,0.1)] shrink-0 bg-black/20">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="type-hand text-love-rose self-center">
                    {photo.caption}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ol>

    </div>
  );
}
