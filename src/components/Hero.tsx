import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Code2, Compass, Terminal, Box, Eye, Layers } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../lib/sound';
import gsap from 'gsap';

interface HeroProps {
  onExploreProjects: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onContactClick }) => {
  const [istTime, setIstTime] = useState('');
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);
  const [mouseShift, setMouseShift] = useState({ x: 0, y: 0 });

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setIstTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance Animation
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        telemetryRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.5, clearProps: 'all' }
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 35, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, clearProps: 'transform' },
        '-=0.2'
      )
      .fromTo(
        '.hero-stagger-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, clearProps: 'all' },
        '-=0.3'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Subtle Mouse Coordinate Parallax Shift
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const xNorm = (e.clientX - rect.left) / rect.width - 0.5;
    const yNorm = (e.clientY - rect.top) / rect.height - 0.5;

    setMouseShift({
      x: xNorm * 12,
      y: yNorm * 8,
    });
  };

  return (
    <section
      ref={heroRef}
      id="hero-section"
      onMouseMove={handleMouseMove}
      className="relative w-full border-b-4 border-black bg-white overflow-hidden select-none transition-colors duration-300"
    >
      {/* Top Telemetry Strip */}
      <div
        ref={telemetryRef}
        className="grid grid-cols-2 md:grid-cols-4 border-b-4 border-black bg-[#F2F2F2] text-xs font-mono font-bold tracking-widest uppercase"
      >
        <div className="p-3 sm:px-6 border-r-4 border-black flex items-center gap-2">
          <span className="text-[#FF3000]">00.</span>
          <span>IDENTITY // DOSSIER</span>
        </div>
        <div className="p-3 sm:px-6 border-r-0 md:border-r-4 border-black flex items-center justify-between">
          <span>TIME [IST]:</span>
          <span className="text-[#FF3000] font-black tracking-wider">{istTime || '13:42:00'}</span>
        </div>
        <div className="p-3 sm:px-6 border-t-4 md:border-t-0 border-r-4 border-black flex items-center gap-2">
          <span>LOC:</span>
          <span className="text-black">DELHI / GR. NOIDA</span>
        </div>
        <div className="p-3 sm:px-6 border-t-4 md:border-t-0 border-black flex items-center justify-between bg-black text-white">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
            <span>STATUS:</span>
          </span>
          <span className="text-[#FF3000] font-black">CSE UNDERGRAD // 2ND YR</span>
        </div>
      </div>

      {/* Main Asymmetric Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Massive Typographic Statement (7 Cols on desktop) */}
        <div className="lg:col-span-7 p-6 sm:p-10 md:p-14 border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col justify-between bg-white relative">
          {/* Subtle Grid texture */}
          <div className="absolute inset-0 swiss-grid-pattern opacity-50 pointer-events-none" />

          <div className="relative z-10">
            {/* Classification label */}
            <div className="hero-stagger-item inline-flex items-center gap-3 px-3 py-1.5 bg-black text-white text-[11px] font-mono font-bold tracking-widest uppercase mb-6 sm:mb-8 transition-colors duration-200">
              <span className="w-2 h-2 bg-[#FF3000]" />
              <span>COMPUTER SCIENCE UNDERGRADUATE // BATCH 2025–2029</span>
            </div>

            {/* Massive Name Typography with Subtle Interactive Shift */}
            <div className="overflow-hidden">
              <h1
                ref={titleRef}
                id="hero-main-title"
                style={{
                  transform: `translate3d(${mouseShift.x}px, ${mouseShift.y}px, 0)`,
                  transition: 'transform 0.12s ease-out',
                }}
                className="text-7xl sm:text-8xl md:text-9xl lg:text-[9.5rem] xl:text-[11.5rem] font-black tracking-tighter uppercase leading-[0.82] text-black select-none will-change-transform"
              >
                VIPLOV
              </h1>
            </div>

            {/* Sub-headline in Swiss Grotesque */}
            <div className="hero-stagger-item mt-8 sm:mt-12 max-w-xl">
              <h2 id="hero-subheadline" className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-black leading-snug">
                SOFTWARE DEVELOPER & COMPUTER SCIENCE UNDERGRADUATE BASED IN DELHI & GREATER NOIDA.
              </h2>
              <div className="h-1.5 w-24 bg-[#FF3000] my-6 transition-colors duration-300" />
              <p className="text-sm sm:text-base font-medium text-neutral-800 leading-relaxed font-sans max-w-lg">
                Building algorithmic systems, mathematical evaluators, and academic software. 
                Grounded in the International Typographic Style: <strong className="text-black font-bold uppercase">Objectivity over subjectivity. The grid as absolute skeleton.</strong>
              </p>
            </div>
          </div>

          {/* Action CTAs & Scroll Indicator */}
          <div className="hero-stagger-item relative z-10 mt-10 sm:mt-14 pt-6 border-t-4 border-black">
            <div className="flex flex-col sm:flex-row items-stretch gap-4">
              <button
                id="hero-btn-explore"
                onClick={() => {
                  sound.playClick();
                  onExploreProjects();
                }}
                data-cursor-text="EXPLORE"
                className="flex-1 h-14 sm:h-16 px-8 bg-black text-white text-xs sm:text-sm font-black tracking-widest uppercase hover:bg-[#FF3000] hover:text-white transition-all duration-200 flex items-center justify-between cursor-pointer group shadow-sm hover:shadow-md"
              >
                <span>REPOSITORIES // 04</span>
                <ArrowDown className="w-5 h-5 transition-transform duration-200 group-hover:translate-y-1" />
              </button>

              <button
                id="hero-btn-contact"
                onClick={() => {
                  sound.playClick();
                  onContactClick();
                }}
                data-cursor-text="CONNECT"
                className="flex-1 h-14 sm:h-16 px-8 bg-white border-4 border-black text-black text-xs sm:text-sm font-black tracking-widest uppercase hover:bg-[#FF3000] hover:text-white hover:border-[#FF3000] transition-all duration-200 flex items-center justify-between cursor-pointer group shadow-sm hover:shadow-md"
              >
                <span>DISPATCH TRANSMISSION</span>
                <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>

            {/* Micro Scroll Indicator */}
            <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase">
              <span>SCROLL TO PROCEED // 28.61° N 77.20° E</span>
              <span className="flex items-center gap-1 text-black font-bold">
                <span>INDEX 01/04</span>
                <span className="text-[#FF3000]">▼</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Bauhaus Composition Viewport (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#F2F2F2] transition-colors duration-300">
          {/* Viewport Header Bar */}
          <div className="p-3 sm:px-6 border-b-4 border-black bg-white flex items-center justify-between font-mono text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="text-[#FF3000]">CANON:</span>
              <span className="uppercase text-black">SWISS BAUHAUS GEOMETRY</span>
            </div>

            <div className="flex items-center gap-1.5 px-2 py-0.5 border border-black bg-[#F2F2F2] text-[10px] font-mono text-neutral-600">
              <span className="w-1.5 h-1.5 bg-[#FF3000] rounded-full animate-ping" />
              <span className="text-black font-bold uppercase">FIG 01 // ORTHOGONAL</span>
            </div>
          </div>

          {/* Viewport Stage: Bauhaus Composition */}
          <div className="border-b-4 border-black relative overflow-hidden flex-1 flex flex-col justify-center items-center min-h-[380px] sm:min-h-[460px] bg-[#FAF9F6]">
            <div className="p-4 sm:p-8 flex items-center justify-center w-full h-full">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 border-4 border-black bg-white p-6 shadow-[0_0_0_8px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_0_0_12px_rgba(0,0,0,0.08)]">
                {/* Background dot matrix */}
                <div className="absolute inset-0 swiss-dots opacity-40 pointer-events-none" />

                {/* Swiss Accent Circle */}
                <div className="absolute top-4 right-4 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#FF3000] flex items-center justify-center text-white font-black text-2xl sm:text-3xl tracking-tighter select-none transition-transform duration-300 hover:scale-105">
                  19 Y
                </div>

                {/* Black geometric rectangle */}
                <div className="absolute bottom-4 left-4 w-32 h-20 sm:w-40 sm:h-24 bg-black text-white p-3 flex flex-col justify-between transition-transform duration-300 hover:scale-105">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF3000]">
                    BATCH 2025–2029
                  </span>
                  <span className="text-xl sm:text-2xl font-black tracking-tight uppercase leading-tight">
                    2ND YR CSE
                  </span>
                </div>

                {/* Crosshair coordinate markers */}
                <div className="absolute top-4 left-4 text-xs font-mono font-black text-black">
                  + [28.6139°N]
                </div>
                <div className="absolute bottom-4 right-4 text-xs font-mono font-black text-black">
                  [77.2090°E] +
                </div>

                {/* Central grid lines */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-black/20 -translate-y-1/2 pointer-events-none" />
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-black/20 -translate-x-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Real-time Specs Matrix */}
          <div className="grid grid-cols-2 divide-x-4 divide-black border-black bg-white">
            <div className="p-4 sm:p-6 hover:bg-[#F2F2F2] transition-all duration-200">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF3000] block mb-1 uppercase">
                ACADEMIC BASE
              </span>
              <span className="text-base sm:text-lg font-black uppercase text-black block leading-tight">
                IEC-CET
              </span>
              <span className="text-xs text-neutral-600 font-medium font-mono">B.Tech CSE // 2nd Year</span>
            </div>

            <div className="p-4 sm:p-6 hover:bg-[#F2F2F2] transition-all duration-200">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF3000] block mb-1 uppercase">
                CODE REPOSITORIES
              </span>
              <span className="text-base sm:text-lg font-black uppercase text-black block leading-tight">
                GITHUB / VIPLOVK
              </span>
              <span className="text-xs text-neutral-600 font-medium font-mono">Open Source Hub</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
