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

function scanlineIntervals(boundary, y) {
  const intersections = [];
  for (let index = 0; index < boundary.length - 1; index += 1) {
    const start = boundary[index];
    const end = boundary[index + 1];
    if ((start.y <= y && end.y > y) || (end.y <= y && start.y > y)) {
      intersections.push(start.x + ((y - start.y) * (end.x - start.x)) / (end.y - start.y));
    }
  }
  intersections.sort((left, right) => left - right);
  return Array.from({ length: Math.floor(intersections.length / 2) }, (_, index) => [intersections[index * 2], intersections[index * 2 + 1]]);
}

function buildPhrases(context, width, height) {
  const boundary = buildHeartBoundary(width, height);
  const top = Math.min(...boundary.map((point) => point.y));
  const bottom = Math.max(...boundary.map((point) => point.y));
  const rows = 19;
  const fontSize = clamp(Math.min(width, height) * 0.016, 11, 15);
  const phrases = [];
  let phraseIndex = 0;
  context.font = `${fontSize}px "Cormorant Garamond", Georgia, serif`;

  for (let row = 0; row < rows; row += 1) {
    const y = top + ((row + 0.5) / rows) * (bottom - top);
    scanlineIntervals(boundary, y).forEach(([left, right]) => {
      let x = left + 12;
      while (x < right - 12) {
        const text = LOVE_PHRASES[phraseIndex % LOVE_PHRASES.length];
        const textWidth = context.measureText(text).width;
        if (x + textWidth > right - 8) break;
        phrases.push({ text, x: x + textWidth / 2, y, delay: row * 0.04 + phrases.length * 0.008, seed: (phraseIndex * 0.618) % 1, fontSize });
        x += textWidth + 16;
        phraseIndex += 1;
      }
    });
    if (phrases.length === 0 && row === 0) {
      phrases.push({ text: LOVE_PHRASES[0], x: width / 2, y, delay: 0, seed: 0, fontSize });
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
