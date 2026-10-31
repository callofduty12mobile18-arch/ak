import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, Printer, X, Feather, Search } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DEFAULT_UNIVERSE_DATA } from '../data/universeData';

export default function LettersArchive({ loveLetters, girlfriendName, boyfriendName, onOpenOpenWhen }) {
  const letters = loveLetters || DEFAULT_UNIVERSE_DATA.loveLetters;
  const her = girlfriendName || DEFAULT_UNIVERSE_DATA.girlfriendName;
  const him = boyfriendName || DEFAULT_UNIVERSE_DATA.boyfriendName;

  const [activeLetter, setActiveLetter] = useState(null);
  const [selectedMood, setSelectedMood] = useState('romantic');
  const [generatedLetter, setGeneratedLetter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const moodLetters = {
    romantic: {
      title: `My Dearest ${her}`,
      body: `When I sit down to write to you, the world grows quiet — because every thought leads straight back to you.\n\nYour smile is the sunrise I never want to miss. Your laughter turns ordinary days into memories I treasure. With you, love is not a place I visit; it is the home I live in.\n\nI will keep choosing you, in every season, in every mood, in every tomorrow we are lucky enough to share.`
    },
    playful: {
      title: `Hey Gorgeous ${her} 😊`,
      body: `Consider this your certified, 100% genuine, no-refunds love letter — because you are ridiculously wonderful.\n\nYou make my heart do that silly cartwheel thing. I love our inside jokes, our teasing, and the way you pretend to be annoyed when you're secretly smiling.\n\nP.S. — You owe me one warm hug. Interest accrues daily! 💕`
    },
    missing: {
      title: `Thinking of You, ${her} 🌙`,
      body: `I look at my phone and miss your voice. I close my eyes and see your smile.\n\nEven when miles keep our hands apart, not a single second passes where my heart forgets who it belongs to. You are always right here with me, in every thought, in every breath.\n\nCounting the hours until I can pull you close again.`
    },
    morning: {
      title: `Good Morning, My Angel ☀️`,
      body: `Before the rush of today begins, I wanted to whisper this into your morning:\n\nYou are my absolute favorite person in the entire world. Thank you for simply existing, for being the sweetest light in my life, and for making every sunrise feel worth waking up for.\n\nGo conquer the day, my kanmani. I am always cheering for you.`
    }
  };

  const handleGenerate = () => {
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    setGeneratedLetter(moodLetters[selectedMood]);
  };

  const handlePrint = (letter) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${letter.title || 'Love Letter'}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Playfair+Display:wght@700&display=swap');
          body {
            font-family: 'Cormorant Garamond', Georgia, serif;
            padding: 48px;
            max-width: 650px;
            margin: 0 auto;
            color: #2b140b;
            background: #fff;
            line-height: 1.8;
          }
          h1 { font-family: 'Playfair Display', serif; font-size: 28px; border-bottom: 2px solid #ecd3c1; padding-bottom: 12px; margin-bottom: 24px; color: #691729; }
          p { font-size: 18px; font-style: italic; white-space: pre-line; }
          .sig { font-family: 'Caveat', cursive; font-size: 26px; margin-top: 36px; text-align: right; color: #691729; }
        </style>
      </head>
      <body>
        <h1>${letter.title}</h1>
        <p>${letter.body}</p>
        <div class="sig">Forever Yours,<br/>${him}</div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const filteredLetters = letters
    .map((text, idx) => ({ number: idx + 1, text }))
    .filter(item => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return String(item.number).includes(q) || item.text.toLowerCase().includes(q);
    });

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-8 sm:py-16 space-y-10 sm:space-y-16">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-widest text-love-rose font-semibold bg-love-rose/10 px-3.5 py-1.5 rounded-full border border-love-rose/20 shadow-sm">
          <Mail className="w-3.5 h-3.5" />
          <span>Handwritten Love Archives</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-playfair font-extrabold text-white tracking-tight">
          The Sealed Letter Archive
        </h2>
        <p className="text-xs sm:text-sm font-cormorant italic text-love-muted max-w-xl mx-auto">
          A collection of 52 personal handwritten scrolls. Tap any wax-sealed envelope to unfold our private words.
        </p>

        {/* Shortcut to Open When */}
        <div className="pt-2">
          <button
            onClick={onOpenOpenWhen}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-love-rose/40 text-xs sm:text-sm font-semibold text-love-rose hover:bg-love-rose/20 transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-love-gold" />
            <span>Open When… Letters (for every kind of day) →</span>
          </button>
        </div>
      </div>

      {/* Love Letter Generator Card */}
      <div className="glass-card rounded-3xl p-5 sm:p-8 border border-white/10 max-w-2xl mx-auto text-center space-y-4 shadow-2xl">
        <div className="flex items-center justify-center gap-2 text-love-gold">
          <Feather className="w-5 h-5 text-love-gold" />
          <h3 className="text-base sm:text-lg font-playfair font-bold text-white">
            Custom Mood Letter Generator
          </h3>
        </div>
        <p className="text-xs sm:text-sm font-cormorant italic text-love-muted">
          Pick how you're feeling right now, and I'll generate a special letter crafted for you.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white focus:outline-none focus:border-love-rose"
          >
            <option value="romantic" className="bg-love-dark">💕 Deeply Romantic</option>
            <option value="playful" className="bg-love-dark">😊 Playful & Sweet</option>
            <option value="missing" className="bg-love-dark">🌙 Missing You</option>
            <option value="morning" className="bg-love-dark">☀️ Good Morning</option>
          </select>

          <button
            onClick={handleGenerate}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-love-rose to-love-rose-deep text-white text-xs sm:text-sm font-bold shadow-md hover:opacity-90 active:scale-95 transition-all"
          >
            Weave My Letter ✨
          </button>
        </div>

        {/* Generated Letter Preview */}
        {generatedLetter && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="parchment rounded-2xl p-5 sm:p-7 text-left space-y-3.5 shadow-2xl mt-4"
          >
            <h4 className="font-playfair font-bold text-lg sm:text-xl text-rose-950">
              {generatedLetter.title}
            </h4>
            <p className="font-cormorant text-base sm:text-lg italic text-rose-950/90 whitespace-pre-line leading-relaxed">
              {generatedLetter.body}
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-rose-900/15">
              <span className="font-caveat text-xl sm:text-2xl text-rose-950 font-bold">Forever Yours, {him}</span>
              <button
                onClick={() => handlePrint(generatedLetter)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/10 hover:bg-rose-950/20 text-rose-950 text-xs font-semibold transition-colors"
              >
                <Printer className="w-3.5 h-3.5" /> Save / Print PDF
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* 52 Wax-Sealed Envelopes Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-love-gold flex items-center gap-2">
            <span>All {letters.length} Love Scrolls</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-love-muted">
              {filteredLetters.length} shown
            </span>
          </h3>

          {/* Quick Search */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-love-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scroll number or word..."
              className="w-full pl-8 pr-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-love-rose"
            />
          </div>
        </div>

        {/* Envelopes Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3.5">
          {filteredLetters.map((item) => (
            <motion.button
              key={item.number}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveLetter(item)}
              className="glass rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-center aspect-square border border-white/10 hover:border-love-rose/40 group relative overflow-hidden transition-all shadow-md active:scale-95"
            >
              <div className="wax-seal w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg mb-1.5 group-hover:scale-110 transition-transform">
                {item.number}
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-love-ink/75 group-hover:text-white transition-colors truncate w-full text-center">
                Scroll #{item.number}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Full-Screen Letter Parchment Modal */}
      <AnimatePresence>
        {activeLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="parchment max-w-lg w-full max-h-[88vh] overflow-y-auto rounded-3xl p-6 sm:p-10 relative shadow-2xl space-y-5"
            >
              <button
                onClick={() => setActiveLetter(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-rose-950/10 hover:bg-rose-950/20 text-rose-950 transition-colors"
                aria-label="Close letter"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center pb-3 border-b border-rose-900/15 pr-6 sm:pr-0">
                <span className="text-xs uppercase tracking-widest font-semibold text-rose-900/60 block">
                  Love Scroll #{activeLetter.number}
                </span>
                <h3 className="text-xl sm:text-2xl font-playfair font-bold text-rose-950 mt-1">
                  My Dearest {her},
                </h3>
              </div>

              <div className="font-cormorant text-base sm:text-xl italic text-rose-950/90 leading-relaxed whitespace-pre-line">
                {activeLetter.text}
              </div>

              <div className="pt-4 border-t border-rose-900/15 flex items-center justify-between">
                <div className="font-caveat text-xl sm:text-2xl text-rose-950 leading-tight">
                  Forever Yours,<br />
                  <span className="font-bold">{him}</span>
                </div>
                <button
                  onClick={() => handlePrint({ title: `Love Scroll #${activeLetter.number} for ${her}`, body: activeLetter.text })}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-950/10 hover:bg-rose-950/20 text-rose-950 text-xs font-semibold transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" /> Save / Print
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
