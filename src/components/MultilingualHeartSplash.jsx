import React, { useEffect, useRef, useState } from 'react';

const LOVE_PHRASES = [
  'I love you', 'Te amo', 'Je t’aime', 'Ich liebe dich', 'Ti amo',
  'Eu te amo', 'Ik hou van jou', 'Jag älskar dig', 'Jeg elsker deg', 'Kocham cię',
  'Σ’ αγαπώ', 'Я тебя люблю', 'Seni seviyorum', 'أحبك', 'मैं तुमसे प्यार करता हूँ',
  'আমি তোমাকে ভালোবাসি', '我爱你', '愛してる', '사랑해', 'நான் உன்னை காதலிக்கிறேன்',
];

const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function heartWidthAt(y) {
  const insideHeart = (x) => {
    const radius = x * x + y * y - 1;
    return radius * radius * radius - x * x * y * y * y <= 0;
  };

  let low = 0;
  let high = 1.5;
  for (let step = 0; step < 24; step += 1) {
    const middle = (low + high) / 2;
    if (insideHeart(middle)) low = middle;
    else high = middle;
  }
  return low;
}

function buildPhrases(width, height) {
  const rows = 22;
  const scale = Math.min(width / 3.25, height / 3.2);
  const centerX = width / 2;
  const centerY = height * 0.51;
  const phrases = [];
  let phraseIndex = 0;

  for (let row = 0; row < rows; row += 1) {
    const normalizedY = 1.16 - (row / (rows - 1)) * 2.22;
    const widthAtRow = heartWidthAt(normalizedY);
    if (widthAtRow < 0.04) continue;

    const count = Math.max(1, Math.floor(widthAtRow * 5.7));
    for (let column = 0; column < count; column += 1) {
      const ratio = count === 1 ? 0.5 : column / (count - 1);
      const normalizedX = -widthAtRow + ratio * widthAtRow * 2;
      phrases.push({
        text: LOVE_PHRASES[phraseIndex % LOVE_PHRASES.length],
        x: centerX + normalizedX * scale,
        y: centerY - normalizedY * scale,
        delay: (row * 0.035) + (column * 0.018),
        scale: clamp(0.58 + widthAtRow * 0.31, 0.6, 0.92),
        seed: (phraseIndex * 0.618) % 1,
      });
      phraseIndex += 1;
    }
  }
  return phrases;
}

export default function MultilingualHeartSplash({ duration = 9000, onComplete }) {
  const canvasRef = useRef(null);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const totalDuration = reducedMotion ? 1000 : clamp(duration, 5000, 15000);
    const drawDuration = reducedMotion ? 1 : totalDuration * 0.62;
    const fadeDuration = 900;
    let frameId;
    let phrases = [];
    let startTime = performance.now();

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      phrases = buildPhrases(window.innerWidth, window.innerHeight);
      startTime = performance.now();
    };

    const draw = (now) => {
      const elapsed = now - startTime;
      const progress = clamp(elapsed / drawDuration, 0, 1);
      const shimmerPhase = Math.max(0, (elapsed - drawDuration) / 1000);
      const width = window.innerWidth;
      const height = window.innerHeight;

      context.clearRect(0, 0, width, height);
      const background = context.createRadialGradient(width / 2, height * 0.43, 10, width / 2, height / 2, Math.max(width, height) * 0.78);
      background.addColorStop(0, '#3b1026');
      background.addColorStop(0.48, '#180812');
      background.addColorStop(1, '#080306');
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      phrases.forEach((phrase) => {
        const localProgress = clamp((progress - phrase.delay) / 0.45, 0, 1);
        if (localProgress <= 0) return;

        const entered = easeOutCubic(localProgress);
        const float = Math.sin((elapsed / 1200) + phrase.seed * 8) * 2.2;
        const shimmer = progress >= 1 && Math.sin(shimmerPhase * 2.3 + phrase.seed * 19) > 0.92;
        const fontSize = Math.max(10, Math.min(width, height) * 0.025 * phrase.scale);
        const verticalStart = height * 0.18;

        context.save();
        context.globalAlpha = entered * (shimmer ? 1 : 0.8);
        context.font = `${fontSize}px "Cormorant Garamond", Georgia, serif`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.shadowBlur = shimmer ? 17 : 6;
        context.shadowColor = shimmer ? '#f8db87' : '#d4778d';
        context.fillStyle = shimmer ? '#f8db87' : `hsl(${338 + phrase.seed * 22} 68% ${60 + phrase.seed * 18}%)`;
        context.fillText(phrase.text, phrase.x, verticalStart + (phrase.y - verticalStart) * entered + float);
        context.restore();
      });

      if (elapsed >= totalDuration - fadeDuration) {
        setIsLeaving(true);
      }
      if (elapsed >= totalDuration) {
        onComplete();
        return;
      }
      frameId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    frameId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, [duration, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-[900ms] ${isLeaving ? 'opacity-0' : 'opacity-100'}`}
      aria-label="A heart made from I love you in many languages"
      role="img"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      <p className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-center font-cormorant italic text-sm tracking-wide text-love-muted sm:text-base">
        A thousand ways to say the same thing
      </p>
    </div>
  );
}
