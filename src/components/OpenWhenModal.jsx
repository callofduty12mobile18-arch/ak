import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Sparkles } from 'lucide-react';
import { DEFAULT_UNIVERSE_DATA } from '../data/universeData';

export default function OpenWhenModal({ isOpen, onClose, boyfriendName }) {
  const letters = DEFAULT_UNIVERSE_DATA.openWhenLetters;
  const [selectedLetter, setSelectedLetter] = useState(null);
  const him = boyfriendName || DEFAULT_UNIVERSE_DATA.boyfriendName;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-card max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-5 sm:p-8 border border-white/20 shadow-2xl relative my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6 sm:mb-8 pr-6 sm:pr-0">
          <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs uppercase tracking-widest text-love-rose font-semibold bg-love-rose/10 px-3 py-1 rounded-full border border-love-rose/20">
            <Mail className="w-3.5 h-3.5" /> For Every Kind of Day
          </span>
          <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-white">
            Open When…
          </h3>
          <p className="text-xs sm:text-sm font-cormorant italic text-love-muted max-w-md mx-auto">
            Some days you'll need to hear me even when I'm not right there beside you. Open the one that fits your heart right now.
          </p>
        </div>

        {/* Letter Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {letters.map((l, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedLetter(l)}
              className="p-4 sm:p-5 rounded-2xl glass border border-white/10 hover:border-love-rose/40 text-left flex flex-col justify-between min-h-[120px] sm:h-36 transition-all group relative overflow-hidden active:scale-98"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {l.seal}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-love-rose font-semibold">
                  {l.tag}
                </span>
              </div>
              <div className="mt-2">
                <h4 className="font-playfair font-bold text-white text-sm sm:text-base group-hover:text-love-rose transition-colors">
                  {l.title}
                </h4>
                <p className="text-xs font-cormorant italic text-love-muted mt-0.5 truncate">
                  {l.hint}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Letter Reader Popup */}
        <AnimatePresence>
          {selectedLetter && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-lg">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="parchment max-w-lg w-full max-h-[85vh] overflow-y-auto rounded-3xl p-5 sm:p-8 relative shadow-2xl space-y-4 sm:space-y-5"
              >
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-rose-950/10 hover:bg-rose-950/20 text-rose-950 transition-colors"
                  aria-label="Close letter"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="pb-3 border-b border-rose-900/15 pr-6">
                  <span className="text-xs uppercase tracking-widest font-semibold text-rose-900/60 block">
                    {selectedLetter.tag}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-playfair font-bold text-rose-950 capitalize">
                    {selectedLetter.title}
                  </h4>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {selectedLetter.body.map((item, i) => (
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

                <div className="pt-3 sm:pt-4 border-t border-rose-900/15 text-right">
                  <span className="font-caveat text-xl sm:text-2xl text-rose-950 font-bold">
                    — always, your {him}
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
