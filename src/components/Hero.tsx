import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Code2, Compass, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onExploreProjects: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onContactClick }) => {
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to IST
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

  return (
    <section
      id="hero-section"
      className="relative w-full border-b-4 border-black bg-white overflow-hidden transition-colors duration-300"
    >
      {/* Top Telemetry Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b-4 border-black bg-[#F2F2F2] text-xs font-mono font-bold tracking-widest uppercase">
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
          <span>STATUS:</span>
          <span className="text-[#FF3000] font-black">CSE UNDERGRAD</span>
        </div>
      </div>

      {/* Main Asymmetric Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Massive Typographic Statement (7 Cols on desktop) */}
        <motion.div 
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 p-6 sm:p-10 md:p-16 border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col justify-between bg-white relative"
        >
          {/* Subtle Grid texture */}
          <div className="absolute inset-0 swiss-grid-pattern opacity-60 pointer-events-none" />

          <div className="relative z-10">
            {/* Classification label */}
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="inline-flex items-center gap-3 px-3 py-1 bg-black text-white text-[11px] font-mono font-bold tracking-widest uppercase mb-6 sm:mb-8 transition-colors duration-200"
            >
              <span className="w-2 h-2 bg-[#FF3000]" />
              <span>SYSTEM ARCHITECTURE & SOFTWARE</span>
            </motion.div>

            {/* Massive Name Typography */}
            <motion.h1
              id="hero-main-title"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] font-black tracking-tighter uppercase leading-[0.82] text-black select-none"
            >
              VIPLOV
            </motion.h1>

            {/* Sub-headline in Swiss Grotesque */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="mt-8 sm:mt-12 max-w-xl"
            >
              <p className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-black leading-snug">
                SOFTWARE DEVELOPER & COMPUTER SCIENCE UNDERGRADUATE BASED IN DELHI & GREATER NOIDA.
              </p>
              <div className="h-1.5 w-24 bg-[#FF3000] my-6 transition-colors duration-300" />
              <p className="text-sm sm:text-base font-medium text-neutral-800 leading-relaxed font-sans max-w-lg">
                Engineering algorithmic tools, high-precision evaluators, and academic systems. 
                Built upon the core philosophy: <strong className="text-black font-bold uppercase">Objectivity over subjectivity. The grid as absolute law.</strong>
              </p>
            </motion.div>
          </div>

          {/* Action CTAs */}
          <div className="relative z-10 mt-10 sm:mt-16 pt-8 border-t-4 border-black">
            <div className="flex flex-col sm:flex-row items-stretch gap-4">
              <button
                id="hero-btn-explore"
                onClick={onExploreProjects}
                className="flex-1 h-14 sm:h-16 px-8 bg-black text-white text-xs sm:text-sm font-black tracking-widest uppercase hover:bg-[#FF3000] hover:text-white transition-all duration-200 flex items-center justify-between cursor-pointer group shadow-sm hover:shadow-md"
              >
                <span>REPOSITORIES // 04</span>
                <ArrowDown className="w-5 h-5 transition-transform duration-200 group-hover:translate-y-1" />
              </button>
              <button
                id="hero-btn-contact"
                onClick={onContactClick}
                className="flex-1 h-14 sm:h-16 px-8 bg-white border-4 border-black text-black text-xs sm:text-sm font-black tracking-widest uppercase hover:bg-[#FF3000] hover:text-white hover:border-[#FF3000] transition-all duration-200 flex items-center justify-between cursor-pointer group shadow-sm hover:shadow-md"
              >
                <span>DISPATCH TRANSMISSION</span>
                <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Abstract Bauhaus Composition & Real-time Specs (5 Cols) */}
        <motion.div 
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col justify-between bg-[#F2F2F2] transition-colors duration-300"
        >
          {/* Geometric Bauhaus Composition Box */}
          <div className="p-8 sm:p-12 border-b-4 border-black relative overflow-hidden flex-1 flex flex-col justify-center items-center min-h-[360px] sm:min-h-[440px] swiss-diagonal">
            {/* Abstract Swiss Graphic elements */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 border-4 border-black bg-white p-6 shadow-[0_0_0_8px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_0_0_12px_rgba(0,0,0,0.08)]">
              {/* Background dot matrix */}
              <div className="absolute inset-0 swiss-dots opacity-40 pointer-events-none" />

              {/* Swiss Red Accent Circle */}
              <div className="absolute top-4 right-4 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#FF3000] flex items-center justify-center text-white font-black text-2xl sm:text-3xl tracking-tighter select-none transition-transform duration-300 hover:scale-105">
                19 Y
              </div>

              {/* Black geometric rectangle */}
              <div className="absolute bottom-4 left-4 w-32 h-20 sm:w-40 sm:h-24 bg-black text-white p-3 flex flex-col justify-between transition-transform duration-300 hover:scale-105">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF3000]">
                  SGPA METRIC
                </span>
                <span className="text-2xl sm:text-3xl font-black tracking-tighter">
                  7.95
                </span>
              </div>

              {/* Crosshair coordinate markers */}
              <div className="absolute top-4 left-4 text-xs font-mono font-black text-black">
                + [28.6139°N]
              </div>
              <div className="absolute bottom-4 right-4 text-xs font-mono font-black text-black">
                [77.2090°E] +
              </div>

              {/* Central grid line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-black/20 -translate-y-1/2 pointer-events-none" />
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-black/20 -translate-x-1/2 pointer-events-none" />
            </div>

            <div className="mt-6 text-center">
              <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-neutral-600 bg-white px-3 py-1 border-2 border-black transition-colors duration-200">
                BAUHAUS COMPOSITION // FORM 01
              </span>
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
              <span className="text-xs text-neutral-600 font-medium">B.Tech CSE</span>
            </div>

            <div className="p-4 sm:p-6 hover:bg-[#F2F2F2] transition-all duration-200">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF3000] block mb-1 uppercase">
                CODE REPOSITORIES
              </span>
              <span className="text-base sm:text-lg font-black uppercase text-black block leading-tight">
                GITHUB / VIPLOVK
              </span>
              <span className="text-xs text-neutral-600 font-medium">Open Source</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
