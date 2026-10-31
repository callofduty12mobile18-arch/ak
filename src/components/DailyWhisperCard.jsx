import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { DEFAULT_UNIVERSE_DATA } from '../data/universeData';

function buildWhispers() {
  return [
    ...DEFAULT_UNIVERSE_DATA.compliments,
    ...DEFAULT_UNIVERSE_DATA.loveLetters.slice(0, 15),
    'You are the reason I believe in beautiful beginnings.',
    'Every sunrise feels softer because I get to love you.',
    'July 12, 2025 at Chennai Station will forever be my favourite miracle.',
    'Watching Jananayagam with your hand in mine was the best evening of my life.',
    'September 6 — stepping into your home and seeing your smile there.',
    'September 19 — having you walk through my door and fill my whole world.',
    'Distance is nothing when someone means everything.',
    'Your laugh is my absolute favourite soundtrack.',
    'I love you more than yesterday, and less than tomorrow.',
    'You are my calm, my spark, and my forever home.',
  ];
}

const WHISPERS = buildWhispers();

export default function DailyWhisperCard({ girlfriendName }) {
  const [note,       setNote]       = useState('');
  const [isToday,    setIsToday]    = useState(true); // true = today's pick, false = shuffle
  const [todayLabel, setTodayLabel] = useState('');
  const [spinning,   setSpinning]   = useState(false);

  useEffect(() => {
    const now = new Date();
    setTodayLabel(
      now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    );
    const start    = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now - start) / 86_400_000);
    setNote(WHISPERS[dayOfYear % WHISPERS.length]);
  }, []);

  const shuffle = () => {
    setSpinning(true);
    setIsToday(false);
    setNote(WHISPERS[Math.floor(Math.random() * WHISPERS.length)]);
    setTimeout(() => setSpinning(false), 420);
  };

  return (
    <div className="section pt-0 pb-16">
      <div className="max-w-prose space-y-5">

        {/* Heading line */}
        <div className="space-y-1.5">
          <h2 className="type-heading text-love-ink">
            {isToday ? "Today's whisper" : "A little peek"}
          </h2>
          <span className="gold-rule block" style={{ width: '6rem' }} aria-hidden />
        </div>

        {/* The quote — large Cormorant italic, left-aligned */}
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={note}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="type-quote text-love-ink leading-relaxed"
          >
            "{note}"
          </motion.blockquote>
        </AnimatePresence>

        {/* Footer row — date left, shuffle right */}
        <div className="flex items-center justify-between pt-2 border-t border-[rgba(255,255,255,0.07)]">
          <p className="type-label text-love-faint">{todayLabel}</p>
          <button
            onClick={shuffle}
            className="flex items-center gap-1.5 type-label text-love-muted hover:text-love-gold transition-colors"
            aria-label="Show a different whisper"
          >
            <RefreshCw
              className={`w-3 h-3 ${spinning ? 'animate-spin' : ''}`}
              aria-hidden
            />
            Shuffle
          </button>
        </div>

      </div>
    </div>
  );
}
