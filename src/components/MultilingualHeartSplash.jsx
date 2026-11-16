import React, { useEffect, useRef, useState } from 'react';

const LOVE_PHRASES = [
  'I love you', 'Te amo', 'Je t’aime', 'Ich liebe dich', 'Ti amo',
  'Eu te amo', 'Ik hou van jou', 'Jag älskar dig', 'Jeg elsker deg', 'Kocham cię',
  'Σ’ αγαπώ', 'Я тебя люблю', 'Seni seviyorum', 'أحبك', 'मैं तुमसे प्यार करता हूँ',
  'আমি তোমাকে ভালোবাসি', '我爱你', '愛してる', '사랑해', 'நான் உன்னை காதலிக்கிறேன்',
];

const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function heartPoint(angle) {
  return {
    x: 16 * Math.pow(Math.sin(angle), 3),
    y: -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)),
  };
}

function buildHeartBoundary(width, height) {
  const rawPoints = Array.from({ length: 721 }, (_, index) => heartPoint((index / 720) * Math.PI * 2));
  const bounds = rawPoints.reduce((result, point) => ({
    minX: Math.min(result.minX, point.x), maxX: Math.max(result.maxX, point.x),
    minY: Math.min(result.minY, point.y), maxY: Math.max(result.maxY, point.y),
  }), { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity });
  const scale = Math.min((width * 0.56) / (bounds.maxX - bounds.minX), (height * 0.67) / (bounds.maxY - bounds.minY));
  const centerX = width / 2;
  const centerY = height * 0.47;
  return rawPoints.map((point) => ({ x: centerX + point.x * scale, y: centerY + point.y * scale }));
}

function buildPhrases(context, width, height) {
  const boundary = buildHeartBoundary(width, height);
  const centerX = width / 2;
  const centerY = height * 0.47;
  const phrases = [];
  let phraseIndex = 0;

  [
    { ratio: 1, fontSize: clamp(Math.min(width, height) * 0.018, 11, 16), gap: 18 },
    { ratio: 0.77, fontSize: clamp(Math.min(width, height) * 0.014, 9, 13), gap: 14 },
  ].forEach(({ ratio, fontSize, gap }) => {
    const ring = boundary.map((point) => ({
      x: centerX + (point.x - centerX) * ratio,
      y: centerY + (point.y - centerY) * ratio,
    }));
    context.font = `${fontSize}px "Cormorant Garamond", Georgia, serif`;
    let travelled = 0;

    for (let index = 1; index < ring.length; index += 1) {
      const previous = ring[index - 1];
      const point = ring[index];
      travelled += Math.hypot(point.x - previous.x, point.y - previous.y);
      const text = LOVE_PHRASES[phraseIndex % LOVE_PHRASES.length];
      const requiredSpace = context.measureText(text).width + gap;
      if (travelled < requiredSpace) continue;

      const next = ring[(index + 2) % ring.length];
      let angle = Math.atan2(next.y - previous.y, next.x - previous.x);
      if (angle > Math.PI / 2 || angle < -Math.PI / 2) angle += Math.PI;
      phrases.push({
        text, x: point.x, y: point.y, angle, delay: phrases.length * 0.026,
        seed: (phraseIndex * 0.618) % 1, fontSize,
      });
      phraseIndex += 1;
      travelled = 0;
    }
  });
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
      phrases = buildPhrases(context, window.innerWidth, window.innerHeight);
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
        const fontSize = phrase.fontSize;
        const verticalStart = height * 0.16;

        context.save();
        context.globalAlpha = entered * (shimmer ? 1 : 0.8);
        context.font = `${fontSize}px "Cormorant Garamond", Georgia, serif`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.shadowBlur = shimmer ? 17 : 6;
        context.shadowColor = shimmer ? '#f8db87' : '#d4778d';
        context.fillStyle = shimmer ? '#f8db87' : `hsl(${338 + phrase.seed * 22} 68% ${60 + phrase.seed * 18}%)`;
        context.translate(phrase.x, verticalStart + (phrase.y - verticalStart) * entered + float);
        context.rotate(phrase.angle);
        context.fillText(phrase.text, 0, 0);
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
