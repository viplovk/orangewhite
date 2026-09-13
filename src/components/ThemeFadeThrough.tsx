import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DesignTheme, DESIGN_THEMES } from '../data/designThemes';
import { sound } from '../lib/sound';

interface ThemeFadeThroughProps {
  targetThemeId: DesignTheme['id'] | null;
  activeThemeId: DesignTheme['id'];
  onApplyTheme: (themeId: DesignTheme['id']) => void;
  onComplete: () => void;
}

export const ThemeFadeThrough: React.FC<ThemeFadeThroughProps> = ({
  targetThemeId,
  activeThemeId,
  onApplyTheme,
  onComplete,
}) => {
  const [transitionData, setTransitionData] = useState<{
    targetTheme: DesignTheme;
    originTheme: DesignTheme;
    stage: 'covering' | 'revealing';
  } | null>(null);

  // Keep references to handlers to prevent stale closures or redundant effect re-runs
  const onApplyThemeRef = useRef(onApplyTheme);
  onApplyThemeRef.current = onApplyTheme;

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const activeThemeIdRef = useRef(activeThemeId);
  activeThemeIdRef.current = activeThemeId;

  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => {
    // Only initiate if a target is requested and differs from current active theme
    if (!targetThemeId || targetThemeId === activeThemeIdRef.current) {
      return;
    }

    clearTimers();

    const origin =
      DESIGN_THEMES.find((t) => t.id === activeThemeIdRef.current) || DESIGN_THEMES[0];
    const target =
      DESIGN_THEMES.find((t) => t.id === targetThemeId) || DESIGN_THEMES[0];

    // Phase 1: Mount overlay and begin covering viewport
    setTransitionData({
      originTheme: origin,
      targetTheme: target,
      stage: 'covering',
    });

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const coverDuration = prefersReducedMotion ? 40 : 130;
    const holdDuration = prefersReducedMotion ? 20 : 50;
    const revealDuration = prefersReducedMotion ? 50 : 160;

    // Timer 1: Once viewport is fully opaque, apply theme classes underneath
    const t1 = setTimeout(() => {
      onApplyThemeRef.current(targetThemeId);
      try {
        sound.playModeSwitch();
      } catch {
        // ignore audio errors
      }

      // Timer 2: Short hold to allow browser layout & paint of new theme classes
      const t2 = setTimeout(() => {
        setTransitionData((prev) => (prev ? { ...prev, stage: 'revealing' } : null));

        // Timer 3: Reveal completes; clear overlay and reset pending state
        const t3 = setTimeout(() => {
          setTransitionData(null);
          onCompleteRef.current();
        }, revealDuration);

        timersRef.current.push(t3);
      }, holdDuration);

      timersRef.current.push(t2);
    }, coverDuration);

    timersRef.current.push(t1);

    return () => {
      clearTimers();
    };
  }, [targetThemeId]); // Strictly depend ONLY on targetThemeId to avoid premature re-renders

  return (
    <AnimatePresence mode="wait">
      {transitionData && (
        <motion.div
          id="theme-fade-through-overlay"
          key="theme-fade-through"
          initial={{ opacity: 0 }}
          animate={{ opacity: transitionData.stage === 'revealing' ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: transitionData.stage === 'revealing' ? 0.16 : 0.13,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed inset-0 z-[99990] pointer-events-auto select-none flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden bg-[#08090C]/95 backdrop-blur-[2px]"
          aria-hidden="true"
        >
          {/* Subtle Swiss Architectural Grid Texture */}
          <div className="absolute inset-0 swiss-grid-pattern opacity-10 pointer-events-none invert" />

          {/* Top Telemetry Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-4 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-white/80">
            <div className="flex items-center gap-2 sm:gap-3">
              <span
                className="inline-block w-2 h-2 animate-pulse"
                style={{ backgroundColor: transitionData.targetTheme.colors.accent }}
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
              style={{ color: transitionData.targetTheme.colors.accent }}
            >
              SWAPPING THEME
            </div>
          </div>

          {/* Center Typographic Focal Point */}
          <div className="relative z-10 max-w-2xl my-auto">
            {/* Origin to Destination Indicator */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono tracking-widest uppercase text-neutral-400 mb-3">
              <span>{transitionData.originTheme.name}</span>
              <span style={{ color: transitionData.targetTheme.colors.accent }}>→</span>
              <span className="text-white font-bold">{transitionData.targetTheme.name}</span>
            </div>

            {/* Big Grotesque Destination Title */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-none font-sans">
              {transitionData.targetTheme.name}
            </h2>

            {/* Architectural Theme Accent Metric Rule */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 110 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="h-1.5 my-4"
              style={{ backgroundColor: transitionData.targetTheme.colors.accent }}
            />

            {/* Tagline / Style Readout */}
            <p className="text-xs sm:text-sm font-mono text-neutral-300 uppercase tracking-wider max-w-lg leading-relaxed">
              {transitionData.targetTheme.tagline}
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
