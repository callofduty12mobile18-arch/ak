import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, X, Moon } from 'lucide-react';
import { DEFAULT_UNIVERSE_DATA } from '../data/universeData';

export default function AfterDarkModal({ isOpen, onClose, secretWord }) {
  const targetSecret = (secretWord || DEFAULT_UNIVERSE_DATA.afterDarkSecret || "thangam").toLowerCase().trim();
  const whispers = DEFAULT_UNIVERSE_DATA.afterDarkWhispers;

  const [inputVal, setInputVal] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('ad_unlocked') === '1') {
        setIsUnlocked(true);
      }
    } catch (e) {}
  }, []);

  const handleUnlock = (e) => {
    e.preventDefault();
    const clean = inputVal.toLowerCase().replace(/\s+/g, '').trim();
    if (clean === targetSecret) {
      setIsUnlocked(true);
      setHasError(false);
      try {
        sessionStorage.setItem('ad_unlocked', '1');
      } catch (e) {}
    } else {
      setHasError(true);
      setTimeout(() => setHasError(false), 1200);
    }
  };

  const handleRelock = () => {
    try {
      sessionStorage.removeItem('ad_unlocked');
    } catch (e) {}
    setIsUnlocked(false);
    setInputVal("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-xl glass-card rounded-3xl p-5 sm:p-10 border border-white/10 shadow-2xl my-auto max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close After Dark"
        >
          <X className="w-5 h-5" />
        </button>

        {!isUnlocked ? (
          /* Password Gate */
          <div className="text-center space-y-5 sm:space-y-6 py-4 sm:py-6 pr-4 sm:pr-0">
            <motion.div
              animate={hasError ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-love-rose/10 border border-love-rose/30 flex items-center justify-center mx-auto text-2xl sm:text-3xl shadow-[0_0_20px_rgba(244,166,184,0.3)]"
            >
              🔒
            </motion.div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-3xl font-playfair font-bold text-white">
                This part is only for you.
              </h3>
              <p className="text-xs sm:text-sm font-cormorant italic text-love-muted max-w-xs mx-auto">
                Some things I only ever said to you in the dark. Say our secret word and I'll say them again.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-3 max-w-xs mx-auto">
              <input
                type="password"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="what do you call me? 🖤"
                className="w-full px-5 py-3 rounded-full bg-white/5 border border-white/20 text-center text-base text-white placeholder-white/40 focus:outline-none focus:border-love-rose transition-colors"
              />
              {hasError && (
                <p className="text-xs text-love-rose font-medium animate-pulse">
                  Only the real one knows. Try again…
                </p>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-love-rose to-purple-600 text-white font-bold text-sm hover:opacity-90 active:scale-98 transition-all shadow-lg"
              >
                Unlock Secret Room 🗝️
              </button>
            </form>

            <p className="text-[11px] text-love-muted/60 font-cormorant italic">
              Hint: A 7-letter Tamil term of endearment ("th*****")
            </p>
          </div>
        ) : (
          /* Unlocked Whispers Archive */
          <div className="space-y-6 py-2">
            <div className="text-center space-y-1 pb-4 border-b border-white/10 pr-6 sm:pr-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 uppercase tracking-widest bg-purple-900/30 px-3 py-1 rounded-full border border-purple-500/20">
                <Moon className="w-3.5 h-3.5" /> After Dark Whispers
              </span>
              <h3 className="text-2xl font-playfair font-bold text-white pt-1">
                When the whole world is asleep
              </h3>
              <p className="text-xs text-love-muted font-cormorant italic">
                Raw, unfiltered, whispered only to you.
              </p>
            </div>

            <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
              {whispers.map((w, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className={`p-4 rounded-2xl border text-sm sm:text-base leading-relaxed ${
                    w.w === 'him'
                      ? 'bg-purple-950/30 border-purple-800/40 text-purple-100 ml-4 rounded-br-none'
                      : 'bg-rose-950/30 border-rose-800/40 text-rose-100 mr-4 rounded-bl-none'
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-wider block font-bold mb-1 opacity-70">
                    {w.w === 'him' ? 'Him' : 'Her'}
                  </span>
                  <p className="font-cormorant italic">{w.t}</p>
                </motion.div>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={handleRelock}
                className="text-xs text-love-muted hover:text-white flex items-center gap-1 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" /> Re-lock room
              </button>
              <span className="text-xs text-love-rose font-cormorant italic">
                Ours forever 🖤
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
