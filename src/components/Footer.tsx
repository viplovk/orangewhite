import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="w-full bg-white border-b-4 border-black font-mono text-xs"
    >
      {/* Top Colophon strip */}
      <div className="grid grid-cols-1 md:grid-cols-12 divide-y-4 md:divide-y-0 md:divide-x-4 divide-black border-b-4 border-black">
        <div className="md:col-span-4 p-6 sm:p-8 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 bg-[#FF3000]" />
            <span className="font-black text-sm uppercase tracking-widest text-black">
              VIPLOV // PORTFOLIO
            </span>
          </div>
          <p className="text-neutral-600 font-sans font-medium text-xs leading-relaxed">
            International Typographic Style system applied to personal computing dossier, open source repositories, and academic engineering.
          </p>
        </div>

        <div className="md:col-span-5 p-6 sm:p-8 bg-[#F2F2F2]">
          <span className="text-[10px] font-bold text-[#FF3000] uppercase tracking-widest block mb-2">
            DESIGN TOKENS // SPECIFICATION
          </span>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-800">
            <div>• TYPE: INTER (GROTESQUE)</div>
            <div>• RATIO: MATHEMATICAL</div>
            <div>• ACCENT: SWISS RED #FF3000</div>
            <div>• RADIUS: 0PX (RECTANGULAR)</div>
            <div>• GRID: 24PX ISOMETRIC</div>
            <div>• BORDER: 4PX SOLID BLACK</div>
          </div>
        </div>

        <div className="md:col-span-3 p-6 sm:p-8 bg-white flex flex-col justify-between items-start">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-4">
            NAVIGATION
          </span>
          <button
            id="btn-back-to-top"
            onClick={scrollToTop}
            className="w-full h-12 bg-black text-white hover:bg-[#FF3000] transition-colors duration-150 uppercase font-black tracking-widest text-xs flex items-center justify-between px-4 cursor-pointer group"
          >
            <span>APEX [RETURN]</span>
            <ArrowUp className="w-4 h-4 transition-transform duration-150 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>

      {/* Bottom Legal & Coordinates */}
      <div className="p-4 sm:px-8 bg-black text-white flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] tracking-wider uppercase">
        <div>
          VIPLOV © 2026 // B.TECH CSE IEC-CET // DELHI & GREATER NOIDA
        </div>
        <div className="text-neutral-400">
          ALL RIGHTS RESERVED // OBJECTIVE COMMUNICATION CANON
        </div>
      </div>
    </footer>
  );
};
