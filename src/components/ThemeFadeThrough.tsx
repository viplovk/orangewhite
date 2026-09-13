import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DESIGN_THEMES } from '../data/designThemes';
import { ThemeTransition, ThemeId } from '../lib/themeManager';

interface ThemeFadeThroughProps {
  transition: ThemeTransition | null;
  onCovered: (toThemeId: ThemeId) => void;
  onCompleted: () => void;
}

export const ThemeFadeThrough: React.FC<ThemeFadeThroughProps> = ({
  transition,
  onCovered,
  onCompleted,
}) => {
  const [stage, setStage] = useState<'idle' | 'covering' | 'revealing'>('idle');

  // Keep latest callback references in stable refs to prevent effect re-runs or stale closures
  const onCoveredRef = useRef(onCovered);
  onCoveredRef.current = onCovered;

  const onCompletedRef = useRef(onCompleted);
  onCompletedRef.current = onCompleted;

  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!transition) {
      setStage('idle');
      return;
    }

    // Step 1: Initiate covering phase
    setStage('covering');

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const coverDuration = prefersReducedMotion ? 40 : 130;
    const holdDuration = prefersReducedMotion ? 20 : 40;
    const revealDuration = prefersReducedMotion ? 50 : 160;

    // Step 2: When viewport is 100% opaque, invoke strictly sequential DOM class application
    const tCover = setTimeout(() => {
      onCoveredRef.current(transition.to);

      // Step 3: Brief hold while fully occluded so browser finishes composite reflow
      const tHold = setTimeout(() => {
        setStage('revealing');

        // Step 4: When reveal animation finishes, release atomic lock
        const tReveal = setTimeout(() => {
          setStage('idle');
          onCompletedRef.current();
        }, revealDuration);

        timersRef.current.push(tReveal);
      }, holdDuration);

      timersRef.current.push(tHold);
    }, coverDuration);

    timersRef.current = [tCover];

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [transition?.from, transition?.to]);

  const originTheme = transition
    ? DESIGN_THEMES.find((t) => t.id === transition.from) || DESIGN_THEMES[0]
    : null;
  const targetTheme = transition
    ? DESIGN_THEMES.find((t) => t.id === transition.to) || DESIGN_THEMES[0]
    : null;

  const isVisible = stage === 'covering' || stage === 'revealing';

  return (
    <AnimatePresence mode="wait">
      {isVisible && targetTheme && originTheme && (
        <motion.div
          id="theme-fade-through-overlay"
          key={`theme-fade-${transition?.from}-${transition?.to}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: stage === 'revealing' ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: stage === 'revealing' ? 0.16 : 0.13,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`fixed inset-0 z-[99990] select-none flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden bg-[#08090C]/95 backdrop-blur-[2px] ${
            stage === 'covering' ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          aria-hidden="true"
        >
          {/* Subtle Swiss Architectural Grid Texture */}
          <div className="absolute inset-0 swiss-grid-pattern opacity-10 pointer-events-none invert" />

          {/* Top Telemetry Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-4 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-white/80">
            <div className="flex items-center gap-2 sm:gap-3">
              <span
                className="inline-block w-2 h-2 animate-pulse"
                style={{ backgroundColor: targetTheme.colors.accent }}
              />
              <span>SYSTEM CANON // PALETTE RECONFIG</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-neutral-400">
              <span>DELHI [28.61° N]</span>
              <span>•</span>
              <span>GR. NOIDA [77.50° E]</span>
            </div>
            <div
              className="font-black"
              style={{ color: targetTheme.colors.accent }}
            >
              SWAPPING THEME
            </div>
          </div>

          {/* Center Typographic Focal Point */}
          <div className="relative z-10 max-w-2xl my-auto">
            {/* Origin to Destination Indicator */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono tracking-widest uppercase text-neutral-400 mb-3">
              <span>{originTheme.name}</span>
              <span style={{ color: targetTheme.colors.accent }}>→</span>
              <span className="text-white font-bold">{targetTheme.name}</span>
            </div>

            {/* Big Grotesque Destination Title */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-none font-sans">
              {targetTheme.name}
            </h2>

            {/* Architectural Theme Accent Metric Rule */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 110 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="h-1.5 my-4"
              style={{ backgroundColor: targetTheme.colors.accent }}
            />

            {/* Tagline / Style Readout */}
            <p className="text-xs sm:text-sm font-mono text-neutral-300 uppercase tracking-wider max-w-lg leading-relaxed">
              {targetTheme.tagline}
            </p>
          </div>

          {/* Bottom Precision Telemetry Bar */}
          <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-4 text-[9px] sm:text-[11px] font-mono tracking-widest uppercase text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white/60" />
              <span>OBJECTIVE GRID SKELETON</span>
            </div>
            <div className="text-right text-neutral-400">
              INTERNATIONAL TYPOGRAPHIC STYLE
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
