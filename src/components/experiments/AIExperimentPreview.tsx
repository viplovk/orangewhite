import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AIExperimentPreviewProps {
  interactive?: boolean;
  className?: string;
  isDetail?: boolean;
}

export const AIExperimentPreview: React.FC<AIExperimentPreviewProps> = ({
  interactive = true,
  className = '',
  isDetail = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef<boolean>(false);
  const reducedMotion = useReducedMotion();

  const [activeTokenIdx, setActiveTokenIdx] = useState<number>(0);

  const tokens = ['[PROMPT]', 'EMBED_768', 'MULTI_HEAD', 'FFN_LAYER', 'SOFTMAX', 'TOKEN_OUT'];

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number | null = null;
    let clock = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 200;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    // Attention Matrix Nodes
    const cols = isDetail ? 8 : 6;
    const rows = isDetail ? 6 : 4;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      if (!isVisibleRef.current) return;

      clock += reducedMotion ? 0.005 : 0.03;
      const w = container.clientWidth;
      const h = container.clientHeight;

      ctx.clearRect(0, 0, w, h);

      // Background Swiss coordinate grid
      ctx.strokeStyle = '#ECECEC';
      ctx.lineWidth = 1;
      const step = 28;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Center Attention Tensor Grid
      const startX = Math.max(40, (w - cols * 32) / 2);
      const startY = Math.max(30, (h - rows * 32) / 2 - 10);

      // Draw connection lines between active node and other nodes
      const activeCol = Math.floor(clock * 0.8) % cols;
      const activeRow = Math.floor(clock * 0.5) % rows;

      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = startX + c * 32;
          const y = startY + r * 32;

          const dist = Math.hypot(c - activeCol, r - activeRow);
          const weight = Math.sin(clock * 2.0 + dist * 1.5) * 0.5 + 0.5;

          // Connecting lines to active cell
          if (dist > 0 && dist < 3) {
            ctx.strokeStyle = `rgba(255, 48, 0, ${0.15 * weight})`;
            ctx.beginPath();
            ctx.moveTo(startX + activeCol * 32 + 10, startY + activeRow * 32 + 10);
            ctx.lineTo(x + 10, y + 10);
            ctx.stroke();
          }

          // Cell body
          const isAct = c === activeCol && r === activeRow;
          ctx.fillStyle = isAct ? '#FF3000' : `rgba(0, 0, 0, ${0.08 + weight * 0.55})`;
          ctx.fillRect(x, y, 20, 20);

          // Numeric attention weight text in cell if detail
          if (isDetail) {
            ctx.fillStyle = isAct ? '#FFFFFF' : '#888888';
            ctx.font = '7px monospace';
            ctx.fillText(weight.toFixed(1), x + 3, y + 13);
          }
        }
      }

      // Bottom Pipeline Bar
      const pipeY = h - 28;
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('PIPELINE:', 16, pipeY);

      const barW = (w - 90) / tokens.length;
      tokens.forEach((tok, idx) => {
        const bx = 80 + idx * barW;
        const isCurrent = idx === Math.floor(clock * 1.2) % tokens.length;

        ctx.fillStyle = isCurrent ? '#FF3000' : '#E0E0E0';
        ctx.fillRect(bx, pipeY - 8, barW - 6, 10);

        if (w > 340) {
          ctx.fillStyle = isCurrent ? '#000000' : '#999999';
          ctx.font = '8px monospace';
          ctx.fillText(tok, bx, pipeY + 12);
        }
      });
    };

    draw();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      io.disconnect();
      ro.disconnect();
    };
  }, [isDetail, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[220px] bg-[#FAFAFA] flex flex-col justify-between overflow-hidden select-none ${className}`}
    >
      <div className="absolute top-2 left-2 z-10 text-[9px] font-mono text-neutral-500 font-bold pointer-events-none">
        ATTENTION_MAP // PROTOTYPE
      </div>
      <div className="absolute top-2 right-2 z-10 text-[9px] font-mono text-[#FF3000] font-bold pointer-events-none flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 bg-[#FF3000] animate-pulse inline-block" />
        CONCEPT MODEL
      </div>

      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
