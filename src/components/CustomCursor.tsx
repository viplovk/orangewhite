import React, { useEffect, useRef, useState } from 'react';

export type CursorMode = 'reticle' | 'disc' | 'precision';

interface CustomCursorProps {
  enabled?: boolean;
  mode?: CursorMode;
  onToggleEnabled?: () => void;
  onCycleMode?: () => void;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  enabled = true,
  mode = 'reticle',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isTextTarget, setIsTextTarget] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [coords, setCoords] = useState({ x: -100, y: -100 });

  // Refs for requestAnimationFrame lerp movement
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  // Check if device is touch-primary
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      const hasTouch = 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(hasTouch);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Sync cursor state to document body
  useEffect(() => {
    if (enabled && !isTouchDevice) {
      document.body.classList.add('custom-cursor-active');
    } else {
      document.body.classList.remove('custom-cursor-active');
    }
    return () => {
      document.body.classList.remove('custom-cursor-active');
    };
  }, [enabled, isTouchDevice]);

  // Handle Mouse Events & Smooth Lerp Loop
  useEffect(() => {
    if (!enabled || isTouchDevice) return;

    let isMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isMoving) {
        setIsVisible(true);
        isMoving = true;
      }

      // Fast update for direct dot (0ms latency for ultra-crisp tracking)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Update telemetry readout coordinates periodically
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });

      // Target element inspection for contextual cursor states
      const target = e.target as HTMLElement | null;
      if (target) {
        // Check if cursor text is explicitly defined
        const customText = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
        const customType = target.closest('[data-cursor]')?.getAttribute('data-cursor');

        // Check if target is interactive
        const isInteractive = Boolean(
          target.closest('a, button, [role="button"], input[type="submit"], input[type="button"], select, .cursor-pointer, [data-interactive="true"]')
        );

        // Check if target is a text field
        const isText = Boolean(
          target.closest('input[type="text"], input[type="email"], textarea, [contenteditable="true"]')
        );

        setIsTextTarget(isText);

        if (customText) {
          setIsHovering(true);
          setHoverText(customText);
        } else if (isInteractive) {
          setIsHovering(true);
          // Contextual micro-label depending on tag
          if (target.closest('a')) {
            const href = target.closest('a')?.getAttribute('href');
            setHoverText(href?.startsWith('mailto') ? 'EMAIL' : href?.startsWith('#') ? 'JUMP' : 'LINK');
          } else if (target.closest('button')) {
            const btnText = target.closest('button')?.innerText?.trim().toUpperCase();
            if (btnText && btnText.length <= 6 && !btnText.includes('\n')) {
              setHoverText(btnText);
            } else {
              setHoverText('SELECT');
            }
          } else {
            setHoverText(customType?.toUpperCase() || 'ACT');
          }
        } else {
          setIsHovering(false);
          setHoverText(null);
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

    // Smooth Lerp loop for the architectural follower
    const renderLoop = () => {
      // Lerp factor: 0.18 gives responsive precision with aesthetic kinetic trailing
      const ease = 0.2;
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
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [enabled, isTouchDevice]);

  if (!enabled || isTouchDevice) {
    return null;
  }

  return (
    <div
      id="custom-cursor-root"
      className={`fixed inset-0 pointer-events-none z-[999999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* ====================================================================
          1. ZERO-LATENCY PINPOINT DOT
          Tracks true pointer coordinate instantly with difference blend mode
          ==================================================================== */}
      <div
        ref={dotRef}
        id="cursor-dot-center"
        className="custom-cursor-elem fixed top-0 left-0 -ml-[4px] -mt-[4px] w-[8px] h-[8px] rounded-full bg-white pointer-events-none will-change-transform mix-blend-difference"
        style={{
          transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
          opacity: isHovering || isTextTarget ? 0.2 : 1,
          transition: 'opacity 150ms ease, transform 0s',
        }}
      />

      {/* ====================================================================
          2. ARCHITECTURAL INVERTING FOLLOWER / LENS
          Interpolates with fluid physics; inverts all elements underneath
          ==================================================================== */}
      <div
        ref={followerRef}
        id="cursor-lens-follower"
        className="custom-cursor-elem fixed top-0 left-0 pointer-events-none will-change-transform mix-blend-difference"
        style={{
          transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
          transition: 'transform 0s', // Transform handled strictly by requestAnimationFrame
        }}
      >
        {/* TEXT INPUT CARAT / CALIPER MODE */}
        {isTextTarget ? (
          <div className="relative -left-1 -top-4 w-2 h-8 flex flex-col items-center justify-between pointer-events-none">
            <div className="w-2.5 h-[2px] bg-white" />
            <div className="w-[2px] h-6 bg-white animate-pulse" />
            <div className="w-2.5 h-[2px] bg-white" />
          </div>
        ) : mode === 'disc' ? (
          /* PURE SOLID INVERT DISC MODE */
          <div
            className={`custom-cursor-elem rounded-full bg-white flex items-center justify-center transition-all duration-200 ease-out select-none ${
              isMouseDown
                ? 'w-7 h-7 -ml-3.5 -mt-3.5 scale-90'
                : isHovering
                ? 'w-16 h-16 -ml-8 -mt-8 scale-105'
                : 'w-10 h-10 -ml-5 -mt-5 scale-100'
            }`}
          >
            {isHovering && hoverText && (
              <span className="font-mono text-[9px] font-black tracking-widest text-black uppercase pointer-events-none">
                {hoverText}
              </span>
            )}
          </div>
        ) : mode === 'precision' ? (
          /* ARCHITECTURAL DRAFTING CROSSHAIR MODE */
          <div
            className={`relative transition-all duration-150 select-none ${
              isMouseDown ? 'scale-90' : isHovering ? 'scale-125' : 'scale-100'
            }`}
          >
            {/* Horizontal Line */}
            <div className="absolute top-0 -left-6 w-12 h-[1px] bg-white -translate-y-1/2" />
            {/* Vertical Line */}
            <div className="absolute left-0 -top-6 w-[1px] h-12 bg-white -translate-x-1/2" />
            {/* Precision Center Ring */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border border-white rounded-full" />
            {/* Micro Coordinates Badge */}
            <div className="absolute top-4 left-4 whitespace-nowrap bg-white text-black px-1 py-0.5 text-[8px] font-mono font-bold tracking-wider">
              X:{coords.x} Y:{coords.y}
            </div>
          </div>
        ) : (
          /* DEFAULT: SWISS RETICLE LENS MODE */
          <div
            className={`custom-cursor-elem relative rounded-full flex items-center justify-center transition-all duration-200 ease-out select-none ${
              isHovering
                ? 'w-16 h-16 -ml-8 -mt-8 bg-white border-2 border-white'
                : isMouseDown
                ? 'w-8 h-8 -ml-4 -mt-4 border-2 border-white bg-white/20'
                : 'w-10 h-10 -ml-5 -mt-5 border border-white bg-transparent'
            }`}
          >
            {/* 4 Swiss Blueprint Crosshair Ticks (Top, Right, Bottom, Left) */}
            {!isHovering && (
              <>
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-[1.5px] h-1.5 bg-white" />
                <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-1.5 h-[1.5px] bg-white" />
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-[1.5px] h-1.5 bg-white" />
                <span className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-1.5 h-[1.5px] bg-white" />
              </>
            )}

            {/* Hover Micro-Badge Inside Inverted Disc */}
            {isHovering ? (
              <span className="font-mono text-[9px] font-black tracking-widest text-black uppercase pointer-events-none px-1 text-center leading-none">
                {hoverText || 'VIEW'}
              </span>
            ) : (
              /* Center Crosshair Marker */
              <span className="w-1 h-1 bg-white rounded-full opacity-60" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
