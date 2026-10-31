import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DEFAULT_UNIVERSE_DATA } from '../data/universeData';

export default function ConstellationView() {
  const starsData = DEFAULT_UNIVERSE_DATA.stars;
  const canvasRef = useRef(null);
  const [foundStars, setFoundStars] = useState(() => new Array(starsData.length).fill(false));
  const [activeStar, setActiveStar] = useState(null);

  const discoveredCount = foundStars.filter(Boolean).length;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Background faint stars
    const backgroundStars = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * 1.2,
      sp: 0.5 + Math.random() * 1.5,
      offset: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const render = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw faint background twinkling stars
      backgroundStars.forEach((s) => {
        const alpha = 0.2 + 0.4 * Math.sin(t * s.sp + s.offset);
        ctx.beginPath();
        ctx.arc(s.x * width, s.y * height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 246, 224, ${Math.max(0, alpha)})`;
        ctx.fill();
      });

      // 2. Draw constellation connection lines between discovered stars
      ctx.lineWidth = 1.5;
      for (let i = 1; i < starsData.length; i++) {
        if (foundStars[i] && foundStars[i - 1]) {
          const aX = starsData[i - 1].x * width;
          const aY = starsData[i - 1].y * height;
          const bX = starsData[i].x * width;
          const bY = starsData[i].y * height;

          const grad = ctx.createLinearGradient(aX, aY, bX, bY);
          grad.addColorStop(0, 'rgba(244, 166, 184, 0.6)');
          grad.addColorStop(1, 'rgba(243, 207, 138, 0.6)');

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(aX, aY);
          ctx.lineTo(bX, bY);
          ctx.stroke();
        }
      }

      // 3. Draw memory constellation stars
      starsData.forEach((s, idx) => {
        const x = s.x * width;
        const y = s.y * height;
        const isFound = foundStars[idx];

        const pulse = isFound ? 1 + 0.15 * Math.sin(t * 2 + idx) : 1 + 0.3 * Math.sin(t * 2.5 + idx);
        const radius = (s.mag * 3.5 + 2) * pulse;
        const glowRadius = radius * (isFound ? 4.5 : 3);

        const color = isFound ? '243, 207, 138' : '255, 246, 224';

        // Glow halo
        const halo = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
        halo.addColorStop(0, `rgba(${color}, ${isFound ? 0.6 : 0.35})`);
        halo.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Core star
        ctx.fillStyle = `rgba(${color}, 1)`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${color}, 0.9)`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Cross sparkle for discovered
        if (isFound) {
          ctx.strokeStyle = 'rgba(255, 246, 224, 0.7)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x - radius * 2.5, y);
          ctx.lineTo(x + radius * 2.5, y);
          ctx.moveTo(x, y - radius * 2.5);
          ctx.lineTo(x, y + radius * 2.5);
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [foundStars, starsData]);

  // Unified hit detector for click and mobile touch
  const handleInteractionAt = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const clickY = clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;

    // Generous hit detection radius (38px) for mobile fingers
    const hitRadius = 38;

    starsData.forEach((s, idx) => {
      const sX = s.x * width;
      const sY = s.y * height;
      const dist = Math.hypot(clickX - sX, clickY - sY);

      if (dist < hitRadius) {
        if (!foundStars[idx]) {
          const updated = [...foundStars];
          updated[idx] = true;
          setFoundStars(updated);

          if (updated.filter(Boolean).length === starsData.length) {
            confetti({
              particleCount: 80,
              spread: 100,
              origin: { y: 0.6 },
              colors: ['#f4a6b8', '#f3cf8a', '#ffd700']
            });
          }
        }
        setActiveStar(s);
      }
    });
  };

  const handleCanvasClick = (e) => {
    handleInteractionAt(e.clientX, e.clientY);
  };

  const handleCanvasTouchEnd = (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      const touch = e.changedTouches[0];
      handleInteractionAt(touch.clientX, touch.clientY);
    }
  };

  return (
    <div className="relative w-full h-[75vh] sm:h-[82vh] max-w-5xl mx-auto rounded-3xl overflow-hidden glass-card border border-white/10 mt-2 sm:mt-6 flex flex-col justify-between p-4 sm:p-6 shadow-2xl">
      {/* Top Banner */}
      <div className="z-10 text-center space-y-1">
        <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs uppercase tracking-widest text-love-rose font-semibold bg-love-rose/10 px-3 py-1 rounded-full border border-love-rose/20">
          <Sparkles className="w-3.5 h-3.5" /> Tap every star to connect
        </span>
        <h2 className="text-xl sm:text-3xl font-playfair font-bold text-white">
          Our Constellation
        </h2>
        <p className="text-xs sm:text-sm font-cormorant italic text-love-muted">
          Every star is a night or milestone where we became more us.
        </p>
      </div>

      {/* Night Sky Canvas with Touch Support */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onTouchEnd={handleCanvasTouchEnd}
        className="absolute inset-0 w-full h-full cursor-pointer z-0 touch-none"
      />

      {/* Bottom Progress Bar */}
      <div className="z-10 flex items-center justify-between glass px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-white/10 text-xs sm:text-sm max-w-md mx-auto w-full">
        <span className="text-love-ink/80 flex items-center gap-1.5 font-medium">
          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-love-gold" />
          Discovered <strong className="text-love-gold">{discoveredCount}</strong> / {starsData.length} stars
        </span>
        <span className="text-[10px] sm:text-[11px] font-cormorant italic text-love-rose">
          {discoveredCount === starsData.length ? 'Sky complete ✨' : 'Tap glowing stars'}
        </span>
      </div>

      {/* Memory Details Panel */}
      <AnimatePresence>
        {activeStar && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="absolute bottom-14 sm:bottom-16 left-1/2 -translate-x-1/2 w-[94%] max-w-lg z-20 glass-card rounded-2xl p-5 sm:p-6 border border-white/20 shadow-2xl backdrop-blur-2xl max-h-[60vh] overflow-y-auto"
          >
            <button
              onClick={() => setActiveStar(null)}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close star details"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2 sm:space-y-3 pr-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-love-rose block">
                {activeStar.date}
              </span>
              <h3 className="text-lg sm:text-xl font-playfair font-bold text-white leading-snug">
                {activeStar.title}
              </h3>
              <p className="text-xs sm:text-sm font-cormorant italic text-love-ink/90 leading-relaxed">
                {activeStar.text}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
