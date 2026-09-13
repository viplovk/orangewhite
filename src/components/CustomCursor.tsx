import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export type CursorMode = 'reticle' | 'disc' | 'precision';

interface CustomCursorProps {
  enabled?: boolean;
  mode?: CursorMode;
  onToggleEnabled?: () => void;
  onCycleMode?: () => void;
}

// Isomorphic useLayoutEffect safe for client execution
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const CustomCursor: React.FC<CustomCursorProps> = ({
  enabled = true,
  mode = 'reticle',
}) => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isTextTarget, setIsTextTarget] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Dedicated container DOM node ref for safe React Portal mounting to document.body
  const portalContainerRef = useRef<HTMLDivElement | null>(null);

  // Refs for requestAnimationFrame lerp movement and direct DOM manipulation
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const coordsTextRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  // Guard against redundant React re-renders on high-frequency mousemove
  const lastStateRef = useRef({
    isHovering: false,
    hoverText: null as string | null,
    isTextTarget: false,
  });

  // Check if device is touch-primary
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // 1. Stable useLayoutEffect for mounting portal container DOM node to document.body
  // Cleans up node from DOM and clears refs on unmount to prevent memory leaks and React render errors
  useIsomorphicLayoutEffect(() => {
    if (typeof document === 'undefined') return;

    // Create a dedicated wrapper element attached to body
    const container = document.createElement('div');
    container.id = 'custom-cursor-portal-root';
    container.setAttribute('aria-hidden', 'true');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '2147483647'; // Topmost z-index
    container.style.overflow = 'hidden';

    document.body.appendChild(container);
    portalContainerRef.current = container;
    setMounted(true);

    return () => {
      setMounted(false);
      // Clean DOM node removal to prevent memory leaks and orphan portals
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
      portalContainerRef.current = null;
    };
  }, []);

  // 2. Touch capability detection with proper resize listener cleanup
  useEffect(() => {
    const checkTouch = () => {
      const hasTouch =
        typeof window !== 'undefined' &&
        ('ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia('(pointer: coarse)').matches);
      setIsTouchDevice(Boolean(hasTouch));
    };

    checkTouch();
    window.addEventListener('resize', checkTouch, { passive: true });
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // 3. Sync cursor state class to document body safely
  useEffect(() => {
    if (!mounted) return;

    if (enabled && !isTouchDevice) {
      document.body.classList.add('custom-cursor-active');
    } else {
      document.body.classList.remove('custom-cursor-active');
    }

    return () => {
      document.body.classList.remove('custom-cursor-active');
    };
  }, [enabled, isTouchDevice, mounted]);

  // 4. Handle Mouse Events & Smooth Lerp Loop with Complete Event Listener Cleanup
  useEffect(() => {
    if (!enabled || isTouchDevice || !mounted) return;

    let isMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isMoving) {
        setIsVisible(true);
        isMoving = true;
      }

      // Fast pinpoint dot update (0ms latency, direct hardware-accelerated transform)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Fast coordinate badge update without triggering component re-renders
      if (coordsTextRef.current) {
        coordsTextRef.current.textContent = `X:${Math.round(e.clientX)} Y:${Math.round(e.clientY)}`;
      }

      // Inspect target element for contextual cursor states
      const target = e.target as HTMLElement | null;
      if (target && typeof target.closest === 'function') {
        const customText = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
        const customType = target.closest('[data-cursor]')?.getAttribute('data-cursor');

        const isInteractive = Boolean(
          target.closest(
            'a, button, [role="button"], input[type="submit"], input[type="button"], select, .cursor-pointer, [data-interactive="true"]'
          )
        );

        const isText = Boolean(
          target.closest(
            'input[type="text"], input[type="email"], textarea, [contenteditable="true"]'
          )
        );

        let nextHoverText: string | null = null;
        let nextIsHovering = false;

        if (customText) {
          nextIsHovering = true;
          nextHoverText = customText;
        } else if (isInteractive) {
          nextIsHovering = true;
          if (target.closest('a')) {
            const href = target.closest('a')?.getAttribute('href');
            nextHoverText = href?.startsWith('mailto') ? 'EMAIL' : href?.startsWith('#') ? 'JUMP' : 'LINK';
          } else if (target.closest('button')) {
            const btnText = target.closest('button')?.innerText?.trim().toUpperCase();
            if (btnText && btnText.length <= 6 && !btnText.includes('\n')) {
              nextHoverText = btnText;
            } else {
              nextHoverText = 'SELECT';
            }
          } else {
            nextHoverText = customType?.toUpperCase() || 'ACT';
          }
        }

        // Only invoke React state setters when values actually change
        if (
          lastStateRef.current.isHovering !== nextIsHovering ||
          lastStateRef.current.hoverText !== nextHoverText ||
          lastStateRef.current.isTextTarget !== isText
        ) {
          lastStateRef.current = {
            isHovering: nextIsHovering,
            hoverText: nextHoverText,
            isTextTarget: isText,
          };
          setIsHovering(nextIsHovering);
          setHoverText(nextHoverText);
          setIsTextTarget(isText);
        }
      } else {
        if (
          lastStateRef.current.isHovering ||
          lastStateRef.current.hoverText !== null ||
          lastStateRef.current.isTextTarget
        ) {
          lastStateRef.current = {
            isHovering: false,
            hoverText: null,
            isTextTarget: false,
          };
          setIsHovering(false);
          setHoverText(null);
          setIsTextTarget(false);
        }
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
      isMoving = false;
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Physics Lerp Loop for follower lens
    const renderLoop = () => {
      const ease = 0.22;
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * ease;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * ease;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current !== null) {
        cancelAnimationFrame(animFrameId.current);
        animFrameId.current = null;
      }
    };
  }, [enabled, isTouchDevice, mounted]);

  // Safe unmount: return null if disabled, touch device, or DOM container not ready
  if (!mounted || !portalContainerRef.current || !enabled || isTouchDevice || typeof document === 'undefined') {
    return null;
  }

  const cursorContent = (
    <div
      id="custom-cursor-root"
      key="custom-cursor-root"
      className={`fixed inset-0 pointer-events-none z-[2147483647] transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* ====================================================================
          1. ZERO-LATENCY DUAL-CONTRAST PINPOINT DOT
          Combines mix-blend-difference inverting core with crisp boundary ring 
          and optical drop shadow to guarantee 100% visibility on all backgrounds.
          ==================================================================== */}
      <div
        ref={dotRef}
        id="cursor-dot-center"
        className="custom-cursor-elem fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{
          opacity: isTextTarget ? 0.3 : 1,
          transition: 'opacity 150ms ease, transform 0ms linear',
        }}
      >
        <div className="relative -left-1.5 -top-1.5 w-3 h-3 flex items-center justify-center pointer-events-none">
          {/* High-contrast outer boundary ring - visible against black, white, and mid-tones */}
          <div className="absolute inset-0 rounded-full bg-black/60 shadow-[0_0_0_1px_rgba(255,255,255,0.9),0_0_4px_rgba(0,0,0,0.8)] pointer-events-none" />
          {/* Inner Inverting Difference Core */}
          <div className="relative w-2 h-2 rounded-full bg-white mix-blend-difference pointer-events-none" />
          {/* Vibrant Red Center Pip for Instant Visual Acquisition */}
          <div className="absolute w-1 h-1 rounded-full bg-[#FF3000] pointer-events-none shadow-[0_0_2px_#FF3000]" />
        </div>
      </div>

      {/* ====================================================================
          2. ARCHITECTURAL INVERTING & HIGH-CONTRAST FOLLOWER LENS
          Uses mix-blend-difference with dual-tone perimeter shading and Swiss
          accent indicators so it is boldly visible over images, text, and solids.
          ==================================================================== */}
      <div
        ref={followerRef}
        id="cursor-lens-follower"
        className="custom-cursor-elem fixed top-0 left-0 pointer-events-none will-change-transform filter drop-shadow-[0_0_1.5px_rgba(0,0,0,0.9)] drop-shadow-[0_0_3px_rgba(255,255,255,0.4)]"
      >
        {/* TEXT INPUT CARAT / CALIPER MODE */}
        {isTextTarget ? (
          <div
            key="cursor-mode-text"
            className="relative -left-1 -top-4 w-2 h-8 flex flex-col items-center justify-between pointer-events-none mix-blend-difference"
          >
            <div className="w-3 h-[2px] bg-white shadow-[0_0_2px_#000]" />
            <div className="w-[2px] h-6 bg-white shadow-[0_0_2px_#000] animate-pulse" />
            <div className="w-3 h-[2px] bg-white shadow-[0_0_2px_#000]" />
          </div>
        ) : mode === 'disc' ? (
          /* SOLID INVERT DISC MODE WITH DUAL CONTRAST PERIMETER */
          <div
            key="cursor-mode-disc"
            className={`custom-cursor-elem rounded-full mix-blend-difference bg-white flex items-center justify-center transition-all duration-200 ease-out select-none shadow-[0_0_0_1.5px_rgba(0,0,0,0.85)] ${
              isMouseDown
                ? 'w-8 h-8 -ml-4 -mt-4 scale-90'
                : isHovering
                ? 'w-18 h-18 -ml-9 -mt-9 scale-105'
                : 'w-11 h-11 -ml-[22px] -mt-[22px] scale-100'
            }`}
          >
            {isHovering && hoverText && (
              <span className="font-mono text-[10px] font-black tracking-widest text-black uppercase pointer-events-none select-none">
                {hoverText}
              </span>
            )}
          </div>
        ) : mode === 'precision' ? (
          /* ARCHITECTURAL DRAFTING DUAL-CONTRAST CROSSHAIR MODE */
          <div
            key="cursor-mode-precision"
            className={`relative transition-all duration-150 select-none ${
              isMouseDown ? 'scale-90' : isHovering ? 'scale-120' : 'scale-100'
            }`}
          >
            {/* Horizontal Line with Inverting Core & Dark Edge */}
            <div className="absolute top-0 -left-7 w-14 h-[2px] bg-white mix-blend-difference -translate-y-1/2 shadow-[0_0_2px_rgba(0,0,0,0.9)]" />
            {/* Vertical Line with Inverting Core & Dark Edge */}
            <div className="absolute left-0 -top-7 w-[2px] h-14 bg-white mix-blend-difference -translate-x-1/2 shadow-[0_0_2px_rgba(0,0,0,0.9)]" />
            {/* Precision Center Ring */}
            <div className="absolute -top-3.5 -left-3.5 w-7 h-7 border-2 border-white mix-blend-difference rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.8)]" />
            {/* Swiss Red Cardinal Precision Pips */}
            <div className="absolute -top-4.5 left-0 w-1 h-1 -translate-x-1/2 bg-[#FF3000] rounded-full shadow-[0_0_2px_#000]" />
            <div className="absolute top-3.5 left-0 w-1 h-1 -translate-x-1/2 bg-[#FF3000] rounded-full shadow-[0_0_2px_#000]" />
            <div className="absolute top-0 -left-4.5 w-1 h-1 -translate-y-1/2 bg-[#FF3000] rounded-full shadow-[0_0_2px_#000]" />
            <div className="absolute top-0 left-3.5 w-1 h-1 -translate-y-1/2 bg-[#FF3000] rounded-full shadow-[0_0_2px_#000]" />

            {/* High-Contrast Coordinates Badge */}
            <div
              ref={coordsTextRef}
              className="absolute top-4 left-4 whitespace-nowrap bg-black/95 text-white border border-white/60 px-1.5 py-0.5 text-[8px] font-mono font-bold tracking-widest shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
            >
              X:0 Y:0
            </div>
          </div>
        ) : (
          /* DEFAULT: SWISS RETICLE LENS MODE (HIGH CONTRAST & INVERTING) */
          <div
            key="cursor-mode-reticle"
            className={`custom-cursor-elem relative rounded-full flex items-center justify-center transition-all duration-200 ease-out select-none ${
              isHovering
                ? 'w-18 h-18 -ml-9 -mt-9 bg-white mix-blend-difference border-2 border-white shadow-[0_0_0_1.5px_rgba(0,0,0,0.8)]'
                : isMouseDown
                ? 'w-9 h-9 -ml-4.5 -mt-4.5 border-2 border-white mix-blend-difference bg-white/20 shadow-[0_0_0_1px_rgba(0,0,0,0.8)]'
                : 'w-11 h-11 -ml-[22px] -mt-[22px] border-2 border-white mix-blend-difference bg-transparent shadow-[0_0_0_1px_rgba(0,0,0,0.8)]'
            }`}
          >
            {/* 4 Swiss Blueprint Crosshair Ticks (High Contrast Red with Shadow) */}
            {!isHovering && (
              <>
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-[2px] h-2 bg-[#FF3000] shadow-[0_0_1.5px_#000]" />
                <span className="absolute top-1/2 -right-2 -translate-y-1/2 w-2 h-[2px] bg-[#FF3000] shadow-[0_0_1.5px_#000]" />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[2px] h-2 bg-[#FF3000] shadow-[0_0_1.5px_#000]" />
                <span className="absolute top-1/2 -left-2 -translate-y-1/2 w-2 h-[2px] bg-[#FF3000] shadow-[0_0_1.5px_#000]" />
              </>
            )}

            {/* Hover Micro-Badge Inside Inverted Disc */}
            {isHovering ? (
              <span className="font-mono text-[10px] font-black tracking-widest text-black uppercase pointer-events-none px-1 text-center leading-none select-none">
                {hoverText || 'VIEW'}
              </span>
            ) : (
              /* Center Crosshair Pip */
              <span className="w-1.5 h-1.5 bg-white rounded-full opacity-80 shadow-[0_0_1px_#000]" />
            )}
          </div>
        )}
      </div>
    </div>
  );

  // Render cursor into the dedicated portal container node mounted via useLayoutEffect
  return createPortal(cursorContent, portalContainerRef.current);
};
