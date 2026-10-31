import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: null, y: null, radius: 100 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -50 - 10;
        this.size = Math.random() * 7 + 4;
        this.speedY = Math.random() * 1.3 + 0.6;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 1.5 - 0.75;
        this.opacity = Math.random() * 0.45 + 0.25;
        this.type = Math.random() > 0.35 ? 0 : 1; // 0: Sakura Petal, 1: Golden Ember
        this.oscillationSpeed = Math.random() * 0.02 + 0.005;
        this.oscillationDistance = Math.random() * 1.5 + 0.5;
        this.angle = Math.random() * Math.PI * 2;
      }

      update() {
        this.angle += this.oscillationSpeed;
        this.x += Math.sin(this.angle) * this.oscillationDistance + this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 3;
            this.y += Math.sin(angle) * force * 3;
          }
        }

        if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;

        if (this.type === 0) {
          // Sakura Petal
          ctx.fillStyle = '#ff7b93';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
          ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
          ctx.fill();
        } else {
          // Golden Starlight
          ctx.fillStyle = '#f3cf8a';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#f3cf8a';
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    const particleCount = Math.min(50, Math.floor((width * height) / 22000));
    const particles = Array.from({ length: particleCount }, () => {
      const p = new Particle();
      p.y = Math.random() * height;
      return p;
    });

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
