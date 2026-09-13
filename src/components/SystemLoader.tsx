import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SystemLoaderProps {
  onComplete: () => void;
}

export const SystemLoader: React.FC<SystemLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState('BOOTING KERNEL...');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const stages = [
      { at: 15, text: 'INDEXING REPOSITORIES...' },
      { at: 42, text: 'MOUNTING SWISS GRID MATRIX...' },
      { at: 75, text: 'INITIALIZING 3D TELEMETRY...' },
      { at: 96, text: 'DISPATCHING INTERFACE // READY' },
    ];

    const startTime = performance.now();
    const duration = 1000; // Fast 1-second loader sequence

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const ratio = Math.min(elapsed / duration, 1);
      // Easing curve
      const eased = Math.pow(ratio, 1.2) * 100;
      setProgress(Math.round(eased));

      const matched = stages.filter((s) => s.at <= eased).pop();
      if (matched) {
        setStageText(matched.text);
      }

      if (ratio < 1) {
        requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 350);
        }, 120);
      }
    };

    const anim = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(anim);
  }, [onComplete]);

  // Generate ASCII progress bar
  const totalBars = 20;
  const filledBars = Math.round((progress / 100) * totalBars);
  const barString = '█'.repeat(filledBars) + '░'.repeat(Math.max(0, totalBars - filledBars));

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-99999 bg-white text-black flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Subtle noise background */}
          <div className="absolute inset-0 swiss-dots opacity-30 pointer-events-none" />

          <div className="w-full max-w-md border-4 border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000] relative">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-6 font-mono text-[11px] font-bold tracking-widest uppercase">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#FF3000] animate-ping" />
                <span>SYSTEM INITIALIZER</span>
              </div>
              <span>v2.5 // DEL</span>
            </div>

            {/* Main Name */}
            <div className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-black mb-4">
              VIPLOV
            </div>

            {/* Sub-label */}
            <div className="text-xs font-mono font-bold text-neutral-600 uppercase mb-6 tracking-wide">
              COMPUTER SCIENCE UNDERGRAD // B.TECH CSE (2025–2029)
            </div>

            {/* ASCII Progress Bar */}
            <div className="font-mono text-sm sm:text-base font-bold text-black tracking-widest mb-2 select-none overflow-hidden">
              [{barString}] <span className="text-[#FF3000]">{progress}%</span>
            </div>

            {/* Stage Text */}
            <div className="h-6 flex items-center justify-between text-[11px] font-mono font-bold text-neutral-700">
              <span className="text-[#FF3000]">&gt; {stageText}</span>
              <span className="text-[10px] text-neutral-400 font-normal">28.61°N 77.20°E</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
