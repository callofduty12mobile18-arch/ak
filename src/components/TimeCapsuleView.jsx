import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Lock, Sparkles, X, Heart } from 'lucide-react';
import { DEFAULT_UNIVERSE_DATA } from '../data/universeData';

export default function TimeCapsuleView({ boyfriendName }) {
  const capsules = DEFAULT_UNIVERSE_DATA.timeCapsules;
  const him = boyfriendName || DEFAULT_UNIVERSE_DATA.boyfriendName;
  const [activeCapsule, setActiveCapsule] = useState(null);
  const [nowTime, setNowTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNowTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isUnlocked = (cap) => {
    if (cap.unlockable) return true;
    const target = new Date(cap.date + 'T00:00:00');
    return target <= nowTime;
  };

  const getCountdown = (cap) => {
    const target = new Date(cap.date + 'T00:00:00');
    const diff = Math.max(0, target - nowTime);

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    return { d, h, m, s };
  };

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-8 sm:py-16 space-y-8 sm:space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-widest text-love-gold font-semibold bg-love-gold/10 px-3.5 py-1.5 rounded-full border border-love-gold/20 shadow-sm">
          <Clock className="w-3.5 h-3.5" />
          <span>Future Keepsakes</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-playfair font-extrabold text-white tracking-tight">
          Our Time Capsule
        </h2>
        <p className="text-xs sm:text-sm font-cormorant italic text-love-muted max-w-xl mx-auto">
          Written for future us. Each letter waits quietly until its designated milestone, then unlocks itself automatically.
        </p>
      </div>

      {/* Capsule List */}
      <div className="space-y-4 sm:space-y-5">
        {capsules.map((cap, idx) => {
          const unlocked = isUnlocked(cap);
          const cd = getCountdown(cap);

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className={`glass-card rounded-3xl p-5 sm:p-6 border transition-all ${
                unlocked
                  ? 'border-love-gold/50 hover:border-love-gold cursor-pointer hover:scale-[1.01] shadow-2xl shadow-love-gold/5'
                  : 'border-white/10 opacity-90'
              }`}
              onClick={() => unlocked && setActiveCapsule(cap)}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl sm:text-3xl p-2.5 rounded-2xl bg-white/5 border border-white/10 shrink-0">
                    {unlocked ? cap.icon : <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-love-muted" />}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-playfair font-bold text-white">
                      {cap.name}
                    </h3>
                    <span className="text-[11px] sm:text-xs font-montserrat uppercase tracking-wider text-love-muted block mt-0.5">
                      {cap.when}
                    </span>
                  </div>
                </div>

                <div>
                  {unlocked ? (
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-love-rose to-love-gold text-love-dark shadow-md whitespace-nowrap">
                      Open Letter ✨
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-love-muted border border-white/10 whitespace-nowrap">
                      Locked
                    </span>
                  )}
                </div>
              </div>

              {/* Countdown Bar if locked */}
              {!unlocked && (
                <div className="grid grid-cols-4 gap-2 pt-4 mt-4 border-t border-white/10 text-center">
                  {[
                    { val: cd.d, label: 'days' },
                    { val: String(cd.h).padStart(2, '0'), label: 'hrs' },
                    { val: String(cd.m).padStart(2, '0'), label: 'min' },
                    { val: String(cd.s).padStart(2, '0'), label: 'sec' },
                  ].map((unit, i) => (
                    <div key={i} className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="font-playfair font-bold text-base sm:text-xl text-love-gold block tabular-nums">
                        {unit.val}
                      </span>
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-love-muted font-medium">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Capsule Reader Popup */}
      <AnimatePresence>
        {activeCapsule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="parchment max-w-lg w-full max-h-[88vh] overflow-y-auto rounded-3xl p-6 sm:p-8 relative shadow-2xl space-y-5"
            >
              <button
                onClick={() => setActiveCapsule(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-rose-950/10 hover:bg-rose-950/20 text-rose-950 transition-colors"
                aria-label="Close capsule"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="pb-3 border-b border-rose-900/15 pr-6 sm:pr-0">
                <span className="text-xs uppercase tracking-widest font-semibold text-rose-900/60 block">
                  {activeCapsule.when}
                </span>
                <h3 className="text-xl sm:text-2xl font-playfair font-bold text-rose-950 mt-1">
                  {activeCapsule.name}
                </h3>
              </div>

              <div className="space-y-4">
                {activeCapsule.letter && !activeCapsule.body && (
                  <p className="font-cormorant text-base sm:text-lg italic text-rose-950/90 leading-relaxed whitespace-pre-line">
                    {activeCapsule.letter}
                  </p>
                )}

                {activeCapsule.body && Array.isArray(activeCapsule.body) && (
                  <div className="space-y-3">
                    {activeCapsule.body.map((item, i) => (
                      <React.Fragment key={i}>
                        {item.p && (
                          <p className="font-cormorant text-base sm:text-lg italic text-rose-950/90 leading-relaxed">
                            {item.p}
                          </p>
                        )}
                        {item.real && (
                          <div className="p-3 sm:p-3.5 rounded-xl bg-rose-950/10 border-l-3 border-rose-900 font-cormorant italic text-rose-950 text-sm sm:text-base">
                            "{item.real}"
                            <span className="block text-[10px] font-montserrat uppercase tracking-wider text-rose-950/60 mt-1">
                              {item.who}
                            </span>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {activeCapsule.promise && (
                  <div className="p-3.5 rounded-xl bg-rose-950/10 border-l-3 border-rose-900 font-cormorant italic text-rose-950 text-sm sm:text-base">
                    <strong>My Promise to You:</strong><br />
                    "{activeCapsule.promise}"
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-rose-900/15 text-right">
                <span className="font-caveat text-xl sm:text-2xl text-rose-950 font-bold">
                  — always waiting for you, {him}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
