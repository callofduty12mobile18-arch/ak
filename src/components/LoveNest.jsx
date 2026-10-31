import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DEFAULT_UNIVERSE_DATA } from '../data/universeData';

export default function LoveNest({
  girlfriendName,
  adminEmail,
  onTriggerHug,
  onOpenHeartbeat,
  onOpenGiftBox,
  onOpenAnniversary,
}) {
  const her        = girlfriendName || DEFAULT_UNIVERSE_DATA.girlfriendName;
  const compliments = DEFAULT_UNIVERSE_DATA.compliments;

  // ── Compliments jar ────────────────────────────────────────────
  const [jarActive,   setJarActive]   = useState(false);
  const [compliment,  setCompliment]  = useState(null);

  const shakeJar = () => {
    setJarActive(true);
    confetti({ particleCount: 22, spread: 48, origin: { y: 0.6 },
               colors: ['#e8c16a', '#d4778d'] });
    setTimeout(() => {
      setCompliment(compliments[Math.floor(Math.random() * compliments.length)]);
      setJarActive(false);
    }, 380);
  };

  // ── Wish board ─────────────────────────────────────────────────
  const [wishInput,    setWishInput]    = useState('');
  const [wishes,       setWishes]       = useState([
    'Grow old together 💖',
    'A cosy wooden cottage in the hills 🌲',
    'Infinite laughs & late-night chats ☕',
  ]);
  const [floatingStars, setFloatingStars] = useState([]);

  const releaseWish = () => {
    const text = wishInput.trim();
    if (!text) return;
    setWishes(prev => [text, ...prev.slice(0, 14)]);
    setWishInput('');
    const id = Date.now();
    setFloatingStars(prev => [...prev, { id, text, x: 20 + Math.random() * 60 }]);
    setTimeout(() => setFloatingStars(prev => prev.filter(s => s.id !== id)), 4500);
    confetti({ particleCount: 35, spread: 75, origin: { y: 0.75 },
               colors: ['#e8c16a', '#d4778d'] });
    const email = adminEmail || DEFAULT_UNIVERSE_DATA.adminEmail;
    if (email) {
      fetch(`https://formsubmit.co/ajax/${email.trim()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: `${her}'s wish`, wish: text, date: new Date().toISOString() }),
      }).catch(() => {});
    }
  };

  return (
    <div className="section space-y-20 sm:space-y-24">

      {/* ── Section heading ──────────────────────────────────────── */}
      <div className="space-y-2">
        <h2 className="type-heading text-love-ink">The love nest</h2>
        <span className="gold-rule block" style={{ width: '5.5rem' }} aria-hidden />
        <p className="type-label text-love-muted max-w-[52ch] mt-3">
          Built to make you smile whenever you need warmth.
        </p>
      </div>

      {/* ── Three interaction cards — each visually distinct ────── */}
      <div className="space-y-10 sm:space-y-12">

        {/* 1 · Virtual hug — full-bleed image treatment */}
        <div className="rounded-xl overflow-hidden border border-[rgba(255,255,255,0.07)]">
          <div className="relative aspect-[3/1] sm:aspect-[4/1] bg-black">
            <img
              src="/photos/couple-swing.jpeg"
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0408] via-[#0a0408]/60 to-transparent" />
            <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between h-full gap-6">
              <div className="space-y-1.5">
                <h3 className="font-cormorant italic text-love-ink font-medium"
                    style={{ fontSize: 'clamp(1.2rem, 3vw, 1.75rem)' }}>
                  Send a virtual hug
                </h3>
                <p className="type-label text-love-muted max-w-[36ch]">
                  Feeling the distance? Tap for a warm embrace with glowing starlight.
                </p>
              </div>
              <button
                onClick={onTriggerHug}
                className="shrink-0 px-5 py-2.5 rounded border border-love-rose/40 text-love-rose hover:bg-love-rose/10 transition-colors text-sm font-montserrat font-medium"
              >
                🤗 Send hug
              </button>
            </div>
          </div>
        </div>

        {/* 2 · Heartbeat sync — dark surface, centred pulse icon */}
        <div className="glass-card rounded-xl p-7 sm:p-9 flex flex-col sm:flex-row items-start sm:items-center gap-7">
          {/* Animated ring + finger icon */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <span
              className="absolute inset-0 rounded-full border border-love-rose/30 animate-ping"
              style={{ animationDuration: '1.8s' }}
              aria-hidden
            />
            <span className="absolute inset-0 rounded-full border border-love-rose/15" aria-hidden />
            <span className="text-2xl select-none" aria-hidden>🫀</span>
          </div>
          <div className="flex-1 space-y-1.5">
            <h3 className="font-cormorant italic text-love-ink font-medium"
                style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)' }}>
              Hold to feel my heartbeat
            </h3>
            <p className="type-label text-love-muted max-w-[42ch]">
              Press and hold the sensor to sync our 72 BPM cardiac rhythm and hear
              whispers in real time.
            </p>
          </div>
          <button
            onClick={onOpenHeartbeat}
            className="shrink-0 px-5 py-2.5 rounded border border-[rgba(255,255,255,0.12)] text-love-muted hover:text-love-ink hover:border-love-gold/40 transition-colors text-sm font-montserrat font-medium whitespace-nowrap"
          >
            Place thumb
          </button>
        </div>

        {/* 3 · Birthday gift box — gold accent treatment */}
        <div
          className="rounded-xl p-7 sm:p-9 border flex flex-col sm:flex-row items-start sm:items-center gap-7"
          style={{
            background: 'linear-gradient(135deg, rgba(232,193,106,0.06) 0%, rgba(212,119,141,0.04) 100%)',
            borderColor: 'rgba(232,193,106,0.2)',
          }}
        >
          <div className="text-4xl select-none shrink-0" aria-hidden>🎁</div>
          <div className="flex-1 space-y-1.5">
            <h3 className="font-cormorant italic text-love-gold font-medium"
                style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)' }}>
              Birthday surprise gift box
            </h3>
            <p className="type-label text-love-muted max-w-[42ch]">
              Untie the golden ribbon to reveal 5 redeemable love coupons and a
              birthday letter — unlocks on January 23.
            </p>
          </div>
          <button
            onClick={onOpenGiftBox}
            className="shrink-0 px-5 py-2.5 rounded border border-love-gold/40 text-love-gold hover:bg-love-gold/10 transition-colors text-sm font-montserrat font-medium whitespace-nowrap"
          >
            Unwrap 🎂
          </button>
        </div>

        {/* 4 · Anniversary gift — rose accent treatment */}
        <div
          className="rounded-xl p-7 sm:p-9 border flex flex-col sm:flex-row items-start sm:items-center gap-7"
          style={{
            background: 'linear-gradient(135deg, rgba(212,119,141,0.06) 0%, rgba(180,85,112,0.04) 100%)',
            borderColor: 'rgba(212,119,141,0.2)',
          }}
        >
          <div className="text-4xl select-none shrink-0" aria-hidden>💞</div>
          <div className="flex-1 space-y-1.5">
            <h3 className="font-cormorant italic text-love-rose font-medium"
                style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)' }}>
              Anniversary gift box
            </h3>
            <p className="type-label text-love-muted max-w-[42ch]">
              5 anniversary coupons and a love letter just for the two of us —
              unlocks on March 24 every year.
            </p>
          </div>
          <button
            onClick={onOpenAnniversary}
            className="shrink-0 px-5 py-2.5 rounded border border-love-rose/40 text-love-rose hover:bg-love-rose/10 transition-colors text-sm font-montserrat font-medium whitespace-nowrap"
          >
            Unwrap 💞
          </button>
        </div>
      </div>

      <hr className="gold-rule-full" />

      {/* ── Compliments jar ─────────────────────────────────────── */}
      <div className="space-y-6">
        <div className="space-y-1.5">
          <h3 className="font-cormorant italic text-love-ink font-medium"
              style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)' }}>
            The compliments jar
          </h3>
          <p className="type-label text-love-muted">
            Tap the jar to unfold a reason I love you.
          </p>
        </div>

        <div className="flex items-start gap-8">
          {/* Jar visual */}
          <motion.button
            onClick={shakeJar}
            aria-label="Shake the compliments jar"
            animate={jarActive ? { rotate: [-5, 5, -4, 4, -2, 2, 0], y: [-6, 0] } : {}}
            transition={{ duration: 0.38 }}
            className="shrink-0 flex flex-col items-center gap-0 cursor-pointer group"
          >
            {/* Cork */}
            <div className="w-10 h-3 rounded-t-sm mx-auto bg-gradient-to-r from-love-gold to-love-amber" />
            {/* Body */}
            <div className="w-16 h-20 rounded-b-2xl rounded-t-sm border-2 border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.05)] backdrop-blur-sm flex items-center justify-center group-hover:border-love-gold/40 transition-colors">
              <span className="text-xl" aria-hidden>✨</span>
            </div>
            <p className="type-label text-love-muted mt-2 text-center">Shake</p>
          </motion.button>

          {/* Reveal */}
          <div className="flex-1 pt-2">
            <AnimatePresence mode="wait">
              {compliment ? (
                <motion.p
                  key={compliment}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{   opacity: 0, y: -4 }}
                  transition={{ duration: 0.28 }}
                  className="type-quote text-love-gold leading-relaxed"
                >
                  "{compliment}"
                </motion.p>
              ) : (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="type-label text-love-faint italic"
                >
                  Tap the jar to reveal something sweet…
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <hr className="gold-rule-full" />

      {/* ── Wish board ──────────────────────────────────────────── */}
      <div className="space-y-6 relative">
        <div className="space-y-1.5">
          <h3 className="font-cormorant italic text-love-ink font-medium"
              style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)' }}>
            The starry wish board
          </h3>
          <p className="type-label text-love-muted">
            Write a dream. Release it into our sky.
          </p>
        </div>

        {/* Input row */}
        <div className="flex gap-2 max-w-lg">
          <input
            type="text"
            value={wishInput}
            onChange={e => setWishInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && releaseWish()}
            placeholder="Our next adventure…"
            maxLength={80}
            className="flex-1 px-4 py-2.5 rounded bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-sm text-love-ink placeholder-[rgba(251,238,233,0.28)] focus:outline-none focus:border-love-gold/40 transition-colors"
          />
          <button
            onClick={releaseWish}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded border border-love-gold/30 text-love-gold hover:bg-love-gold/10 transition-colors text-sm font-montserrat font-medium shrink-0"
          >
            <Send className="w-3.5 h-3.5" aria-hidden />
            Release
          </button>
        </div>

        {/* Wish chips */}
        <div className="flex flex-wrap gap-2">
          {wishes.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-3 py-1 rounded-full text-xs text-love-muted border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]"
            >
              {w}
            </motion.span>
          ))}
        </div>

        {/* Floating released stars */}
        <AnimatePresence>
          {floatingStars.map(s => (
            <motion.div
              key={s.id}
              initial={{ opacity: 1, y: 40, scale: 0.6 }}
              animate={{ opacity: 0, y: -220, scale: 1.1 }}
              exit={{   opacity: 0 }}
              transition={{ duration: 4, ease: 'easeOut' }}
              style={{ left: `${s.x}%` }}
              className="absolute bottom-12 pointer-events-none z-20 flex flex-col items-center"
            >
              <Star className="w-5 h-5 text-love-gold fill-love-gold" aria-hidden />
              <span className="text-[10px] text-love-gold mt-1 bg-[rgba(10,4,8,0.7)] px-2 py-0.5 rounded-full whitespace-nowrap">
                {s.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
