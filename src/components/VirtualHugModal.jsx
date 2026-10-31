import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VirtualHugModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      // Trigger heart confetti explosion
      confetti({
        particleCount: 50,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#ff7b93', '#f4a6b8', '#ffd700']
      });

      const timer = setTimeout(() => {
        onClose();
      }, 7500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative max-w-sm sm:max-w-md w-full max-h-[92vh] overflow-y-auto glass-card rounded-3xl p-5 sm:p-8 text-center border border-love-rose/40 shadow-[0_0_80px_rgba(244,166,184,0.3)] space-y-4 sm:space-y-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close hug"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Glowing Real Couple Photo Frame */}
          <div className="relative max-w-[280px] sm:max-w-[320px] max-h-[50vh] mx-auto rounded-2xl overflow-hidden shadow-2xl border border-love-rose/40">
            <img
              src="/photos/couple-swing.jpeg"
              alt="Shalini & Polonium"
              onError={(e) => { e.target.src = "/photos/couple-selfie-bw.jpeg"; }}
              className="w-full h-auto max-h-[50vh] object-cover object-center"
            />
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 rounded-2xl ring-2 ring-love-rose/50 pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <span className="text-[11px] font-caveat text-white font-bold tracking-wider px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20">
                You & Me · Always & Forever 💕
              </span>
            </div>
          </div>

          {/* Romantic Caption */}
          <div className="space-y-1 sm:space-y-1.5 px-2">
            <h3 className="text-lg sm:text-2xl font-playfair font-bold text-white flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-love-rose fill-love-rose animate-pulse" />
              Wrapped in My Warmest Embrace
            </h3>
            <p className="text-xs sm:text-sm font-cormorant italic text-love-gold">
              "In your arms is my absolute favorite place in the world."
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
