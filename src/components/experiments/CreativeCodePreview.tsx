import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CreativeCodePreviewProps {
  interactive?: boolean;
  className?: string;
  isDetail?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isSpecial?: boolean;
}

export const CreativeCodePreview: React.FC<CreativeCodePreviewProps> = ({
  interactive = true,
  className = '',
  isDetail = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef<boolean>(false);
  const reducedMotion = useReducedMotion();

  const mouseRef = useRef({ x: -1000, y: -1000, isOver: false });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number | null = null;
    let particles: Particle[] = [];

    const count = isDetail ? 75 : 45;

    const initParticles = (w: number, h: number) => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.9,
          vy: (Math.random() - 0.5) * 0.9,
          radius: i === 0 ? 3.5 : Math.random() * 1.8 + 1.2,
          isSpecial: i === 0 || i === 1,
        });
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 200;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.length === 0) initParticles(w, h);
    };
    resize();

    let resizeRafId: number | null = null;
    const ro = new ResizeObserver(() => {
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        resize();
      });
    });
    ro.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.isOver = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isOver = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    const draw = () => {
      animId = requestAnimationFrame(draw);
      if (!isVisibleRef.current) return;

      const w = container.clientWidth;
      const h = container.clientHeight;

      ctx.clearRect(0, 0, w, h);

      // Swiss architectural coordinate grid
      ctx.strokeStyle = '#EEEEEE';
      ctx.lineWidth = 1;
      const gridSpacing = 32;
      for (let x = 0; x < w; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const connectionDist = isDetail ? 75 : 55;
      const mouseInfluenceDist = 90;

      // Update and connect particles
      const speedMult = reducedMotion ? 0.2 : 1.0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx * speedMult;
        p.y += p.vy * speedMult;

        // Bounce off container boundaries
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Cursor Repulsion / Attraction Force
        if (mouseRef.current.isOver) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < mouseInfluenceDist && d > 1) {
            const force = (mouseInfluenceDist - d) / mouseInfluenceDist;
            p.x -= (dx / d) * force * 3.5;
            p.y -= (dy / d) * force * 3.5;
          }
        }

        // Draw Inter-particle Constellation Lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = 1.0 - dist / connectionDist;
            ctx.strokeStyle = p.isSpecial || p2.isSpecial
              ? `rgba(255, 48, 0, ${alpha * 0.7})`
              : `rgba(20, 20, 20, ${alpha * 0.25})`;
            ctx.lineWidth = p.isSpecial || p2.isSpecial ? 1.2 : 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Render Particle Nodes
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isSpecial ? '#FF3000' : '#111111';
        ctx.fill();
      }

      // Cursor Gravitational Well Indicator
      if (mouseRef.current.isOver) {
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 16, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 48, 0, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#FF3000';
        ctx.fill();
      }
    };

    draw();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      io.disconnect();
      ro.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [interactive, isDetail, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[220px] bg-[#FAFAFA] flex items-center justify-center overflow-hidden select-none ${className}`}
    >
      <div className="absolute top-2 left-2 z-10 text-[9px] font-mono text-neutral-500 font-bold pointer-events-none">
        BOIDS // AGENT_SWARM
      </div>
      <div className="absolute bottom-2 right-2 z-10 text-[9px] font-mono text-neutral-400 font-bold pointer-events-none">
        GRAVITATIONAL FIELD
      </div>

      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
