import React, { useRef, useState, useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface KineticTypePreviewProps {
  interactive?: boolean;
  className?: string;
  isDetail?: boolean;
}

export const KineticTypePreview: React.FC<KineticTypePreviewProps> = ({
  interactive = true,
  className = '',
  isDetail = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || reducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const letters = ['S', 'W', 'I', 'S', 'S'];
  const subLetters = ['K', 'I', 'N', 'E', 'T', 'I', 'C'];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full min-h-[220px] bg-[#F8F8F8] flex flex-col items-center justify-center p-6 overflow-hidden select-none ${className}`}
    >
      <div className="absolute top-2 left-2 z-10 text-[9px] font-mono text-neutral-500 font-bold pointer-events-none">
        VARIABLE_TYPE // MATRIX
      </div>
      <div className="absolute bottom-2 right-2 z-10 text-[9px] font-mono text-[#FF3000] font-bold pointer-events-none">
        OPTICAL AXIS: {Math.round(mouseOffset.x * 100)} / {Math.round(mouseOffset.y * 100)}
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {letters.map((char, i) => {
          const depth = (i - 2) * 12;
          const shiftX = mouseOffset.x * depth;
          const shiftY = mouseOffset.y * 18;
          const scaleY = 1 + Math.abs(mouseOffset.y) * 0.3;
          const isCenter = i === 2;

          return (
            <span
              key={i}
              style={{
                transform: `translate3d(${shiftX}px, ${shiftY}px, 0) scaleY(${scaleY})`,
                transition: reducedMotion ? 'none' : 'transform 0.08s ease-out',
                color: isCenter && Math.abs(mouseOffset.x) > 0.2 ? '#FF3000' : '#000000',
              }}
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter inline-block font-sans"
            >
              {char}
            </span>
          );
        })}
      </div>

      <div className="flex items-center gap-1.5 mt-2">
        {subLetters.map((char, i) => {
          const shiftX = -mouseOffset.x * (i - 3) * 6;
          return (
            <span
              key={i}
              style={{
                transform: `translate3d(${shiftX}px, 0, 0)`,
                transition: reducedMotion ? 'none' : 'transform 0.08s ease-out',
              }}
              className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-neutral-600 uppercase"
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
};
