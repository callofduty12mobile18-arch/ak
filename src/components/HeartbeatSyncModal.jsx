import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, Fingerprint } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HeartbeatSyncModal({ isOpen, onClose, girlfriendName, boyfriendName }) {
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [synced, setSynced] = useState(false);
  const [currentWhisperIdx, setCurrentWhisperIdx] = useState(0);

  const her = girlfriendName || "Shalini";
  const him = boyfriendName || "Polonium";

  const audioCtxRef = useRef(null);

  const whispers = [
    "Every beat of my heart...",
    "72 times every single minute...",
    "Since our first look at Chennai station...",
    `Only beats for you, my ${her}.`,
    "Distance can never change our rhythm. 🫂"
  ];

  // Synthesize gentle cardiac heartbeat thud using Web Audio API
  const playHeartbeatSound = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(60, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);

      // Mobile haptic pulse
      if (navigator.vibrate) {
        navigator.vibrate([70, 40, 90]);
      }
    } catch (e) {}
  };

  // Heartbeat loop when holding
  useEffect(() => {
    let beatInterval;
    let progressInterval;

    if (isHolding && !synced) {
      playHeartbeatSound();
      beatInterval = setInterval(() => {
        playHeartbeatSound();
        setCurrentWhisperIdx(prev => (prev + 1) % whispers.length);
      }, 833); // 72 BPM

      progressInterval = setInterval(() => {
        setHoldProgress(prev => {
          if (prev >= 100) {
            setSynced(true);
            confetti({
              particleCount: 70,
              spread: 100,
              origin: { y: 0.5 },
              colors: ['#f4a6b8', '#ffd700', '#e07a97']
            });
            return 100;
          }
          return prev + 2.5;
        });
      }, 100);
    } else if (!isHolding && !synced) {
      setHoldProgress(0);
      setCurrentWhisperIdx(0);
    }

    return () => {
      clearInterval(beatInterval);
      clearInterval(progressInterval);
    };
  }, [isHolding, synced]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-card max-w-md w-full rounded-3xl p-6 sm:p-8 text-center border border-love-rose/30 shadow-[0_0_80px_rgba(244,166,184,0.25)] relative overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
          aria-label="Close heartbeat sync"
        >
          <X className="w-4 h-4" />
        </button>

        {!synced ? (
          <div className="space-y-6 py-2">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-love-gold font-semibold flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Synchronous Heartbeat
              </span>
              <h3 className="text-2xl font-playfair font-bold text-white">
                Touch & Feel My Pulse
              </h3>
              <p className="text-xs font-cormorant italic text-love-muted">
                Press and hold your thumb below to sync with my heart.
              </p>
            </div>

            {/* Glowing Heart Pulse Sensor */}
            <div className="relative w-40 h-40 mx-auto flex items-center justify-center my-4 select-none">
              {/* Concentric Ambient Ripples */}
              {isHolding && (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                    transition={{ repeat: Infinity, duration: 0.833, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full bg-love-rose/30 border border-love-rose/50 pointer-events-none"
                  />
                  <motion.div
                    animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.833, delay: 0.15, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full bg-love-gold/20 border border-love-gold/40 pointer-events-none"
                  />
                </>
              )}

              {/* Sensor Touch Target */}
              <button
                onMouseDown={() => setIsHolding(true)}
                onMouseUp={() => setIsHolding(false)}
                onTouchStart={() => setIsHolding(true)}
                onTouchEnd={() => setIsHolding(false)}
                className={`relative w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl border ${
                  isHolding
                    ? 'bg-gradient-to-tr from-love-wine via-love-rose-deep to-love-rose border-love-gold scale-105 shadow-[0_0_50px_rgba(244,166,184,0.8)]'
                    : 'glass border-white/20 hover:border-love-rose active:scale-95'
                }`}
              >
                <Fingerprint className={`w-12 h-12 transition-all ${
                  isHolding ? 'text-white animate-pulse' : 'text-love-rose/80'
                }`} />
                <span className="text-[10px] font-montserrat uppercase tracking-wider text-white/90 mt-1 font-semibold">
                  {isHolding ? 'Holding...' : 'Hold Thumb'}
                </span>
              </button>
            </div>

            {/* Dynamic Whisper Text */}
            <div className="min-h-[50px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={isHolding ? currentWhisperIdx : 'idle'}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="font-cormorant text-lg italic text-love-gold"
                >
                  {isHolding ? whispers[currentWhisperIdx] : "Touch and keep holding to sync our hearts..."}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Sync Progress Bar */}
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-love-rose to-love-gold"
                style={{ width: `${holdProgress}%` }}
              />
            </div>
            <span className="text-[11px] text-love-muted font-montserrat block">
              72 BPM Cardiac Rhythm · Hold to 100%
            </span>
          </div>
        ) : (
          /* Synced Celebration State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-5 py-4"
          >
            <div className="w-16 h-16 rounded-full bg-love-rose/20 border border-love-rose mx-auto flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(244,166,184,0.6)]">
              💖
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold block">
                ● Cardiac Frequency Synced
              </span>
              <h3 className="text-2xl font-playfair font-bold text-white">
                Two Hearts, One Rhythm
              </h3>
            </div>

            <p className="font-cormorant text-lg sm:text-xl italic text-love-ink/90 leading-relaxed px-2">
              "Even when the world is noisy and miles stand between us, you carry my heart and I carry yours. Every single beat belongs to you."
            </p>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-montserrat text-love-gold space-y-1">
              <div>Synced for: <strong>{her} & {him}</strong></div>
              <div className="text-[11px] text-love-muted">Distance: 0 km in Heart & Spirit ✨</div>
            </div>

            <button
              onClick={() => {
                setSynced(false);
                setHoldProgress(0);
              }}
              className="px-6 py-2 rounded-full glass border border-white/20 text-xs text-white hover:bg-white/10 transition-colors"
            >
              Sync Again
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
