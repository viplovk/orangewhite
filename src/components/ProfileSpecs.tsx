import React, { useState } from 'react';
import { PERSONAL_INFO, SPECIFICATIONS } from '../data/portfolioData';
import { Award, BookOpen, Check, Cpu, MapPin, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProfileSpecs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'specs' | 'philosophy' | 'stack'>('specs');

  const coreStack = [
    { category: 'LANGUAGES', items: ['TypeScript', 'JavaScript (ESNext)', 'C / C++', 'Python', 'SQL', 'HTML5 / CSS3'] },
    { category: 'FRAMEWORKS & LIBS', items: ['React 19', 'Vite', 'Tailwind CSS v4', 'Express', 'Motion', 'Node.js'] },
    { category: 'COMPUTATION & THEORY', items: ['Data Structures & Algorithms', 'Discrete Mathematics', 'Abstract Syntax Trees', 'Object-Oriented Design'] },
    { category: 'TOOLCHAIN & DEPLOY', items: ['Git / GitHub Workflows', 'Linux / POSIX Shell', 'Cloud Run / Containers', 'Package Managers (npm/pnpm)'] },
  ];

  const swissTenets = [
    { num: 'I', title: 'OBJECTIVITY OVER SUBJECTIVITY', text: 'The interface recedes to let raw information speak. Every visual decision must be mathematically justifiable by content constraints.' },
    { num: 'II', title: 'THE GRID AS LAW', text: 'The grid is not a soft suggestion; it is the visible, structural skeleton of software architecture and telemetry.' },
    { num: 'III', title: 'TYPOGRAPHY IS INTERFACE', text: 'Scale, weight, and spatial balance supersede arbitrary decoration. Grotesque typography anchors human cognition.' },
    { num: 'IV', title: 'FUNCTIONAL ACCENT SYSTEM', text: 'Swiss Red (#FF3000) is reserved strictly for signal priority, status indicators, and active feedback states.' },
  ];

  return (
    <section
      id="profile"
      className="w-full border-b-4 border-black bg-white relative"
    >
      {/* Section Header Banner */}
      <div className="border-b-4 border-black bg-[#F2F2F2] p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-[#FF3000] uppercase block mb-1">
            01. ARCHITECTURE & SPECIFICATION
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-black">
            SYSTEM DOSSIER
          </h2>
        </div>
        
        {/* Tab Controls */}
        <div className="flex border-4 border-black bg-white">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 sm:px-6 py-3 text-xs font-black tracking-widest uppercase transition-colors duration-150 ${
              activeTab === 'specs' ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#FF3000] hover:text-white'
            }`}
          >
            SPECIFICATIONS
          </button>
          <button
            onClick={() => setActiveTab('stack')}
            className={`px-4 sm:px-6 py-3 text-xs font-black tracking-widest uppercase border-l-4 border-black transition-colors duration-150 ${
              activeTab === 'stack' ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#FF3000] hover:text-white'
            }`}
          >
            STACK MATRIX
          </button>
          <button
            onClick={() => setActiveTab('philosophy')}
            className={`px-4 sm:px-6 py-3 text-xs font-black tracking-widest uppercase border-l-4 border-black transition-colors duration-150 ${
              activeTab === 'philosophy' ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#FF3000] hover:text-white'
            }`}
          >
            CANONS
          </button>
        </div>
      </div>

      {/* Main Content Area with Smooth Tab Transitions */}
      <AnimatePresence mode="wait">
        {activeTab === 'specs' && (
          <motion.div
            key="specs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-black"
          >
            {/* Left Column: Quick Profile Card (4 cols) */}
            <div className="lg:col-span-4 p-8 sm:p-12 bg-white flex flex-col justify-between swiss-dots">
              <div>
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center font-black text-2xl mb-8 border-2 border-black transition-transform duration-200 hover:scale-105">
                  VP
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black mb-2">
                  {PERSONAL_INFO.formalName}
                </h3>
                <p className="text-xs font-mono font-bold tracking-wider text-[#FF3000] uppercase mb-6">
                  19 YEARS // B.TECH CSE
                </p>
                <div className="h-1 w-16 bg-black mb-6" />

                <div className="space-y-4 text-xs font-mono">
                  <div className="p-3 bg-[#F2F2F2] border-2 border-black flex items-center justify-between transition-colors duration-150 hover:border-[#FF3000]">
                    <span className="text-neutral-600 font-bold uppercase">LOCATION 01</span>
                    <span className="font-bold text-black uppercase">DELHI, IN</span>
                  </div>
                  <div className="p-3 bg-[#F2F2F2] border-2 border-black flex items-center justify-between transition-colors duration-150 hover:border-[#FF3000]">
                    <span className="text-neutral-600 font-bold uppercase">LOCATION 02</span>
                    <span className="font-bold text-black uppercase">GREATER NOIDA</span>
                  </div>
                  <div className="p-3 bg-[#F2F2F2] border-2 border-black flex items-center justify-between transition-colors duration-150 hover:border-[#FF3000]">
                    <span className="text-neutral-600 font-bold uppercase">COLLEGE</span>
                    <span className="font-bold text-black uppercase">IEC-CET</span>
                  </div>
                  <div className="p-3 bg-black text-white border-2 border-black flex items-center justify-between transition-colors duration-150 hover:border-[#FF3000]">
                    <span className="text-neutral-400 font-bold uppercase">DEGREE TRACK</span>
                    <span className="font-bold text-[#FF3000] uppercase">B.TECH CSE (2029) // 2ND YR</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-black/20 text-[11px] font-mono text-neutral-600">
                COORDINATES: 28.6139° N, 77.2090° E // CITIZENSHIP: INDIAN
              </div>
            </div>

            {/* Right Column: High Density Specifications Table (8 cols) */}
            <div className="lg:col-span-8 bg-white divide-y-4 divide-black">
              {/* Table Header */}
              <div className="hidden sm:grid sm:grid-cols-12 p-4 sm:px-8 bg-black text-white text-[11px] font-mono font-bold tracking-widest uppercase">
                <div className="col-span-4">PARAMETER</div>
                <div className="col-span-5">SPECIFICATION VALUE</div>
                <div className="col-span-3 text-right">TYPE</div>
              </div>

              {SPECIFICATIONS.map((spec, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:px-8 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center hover:bg-[#F2F2F2] transition-colors duration-150 group"
                >
                  <div className="sm:col-span-4">
                    <span className="text-[10px] font-mono font-bold text-[#FF3000] tracking-widest block sm:hidden uppercase">
                      PARAMETER
                    </span>
                    <span className="text-sm font-black uppercase tracking-tight text-black group-hover:text-[#FF3000] transition-colors duration-150">
                      {spec.parameter}
                    </span>
                  </div>
                  <div className="sm:col-span-5">
                    <span className="text-sm font-bold uppercase text-black block">
                      {spec.value}
                    </span>
                    <span className="text-xs text-neutral-600 font-medium font-sans">
                      {spec.detail}
                    </span>
                  </div>
                  <div className="sm:col-span-3 sm:text-right mt-2 sm:mt-0">
                    <span className="inline-block px-2.5 py-1 text-[10px] font-mono font-bold tracking-widest uppercase bg-white border-2 border-black text-black group-hover:bg-black group-hover:text-white transition-colors duration-150">
                      {spec.classification}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Stack Matrix Tab */}
        {activeTab === 'stack' && (
          <motion.div
            key="stack"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y-4 md:divide-y-0 md:divide-x-4 divide-black bg-white"
          >
            {coreStack.map((group, idx) => (
              <div key={idx} className="p-8 flex flex-col justify-between hover:bg-[#F2F2F2] transition-colors duration-150">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b-4 border-black">
                    <span className="text-xs font-mono font-bold text-[#FF3000] tracking-widest">
                      0{idx + 1}.
                    </span>
                    <span className="text-xs font-mono font-black text-black uppercase tracking-widest">
                      {group.category}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {group.items.map((item, i) => (
                      <div
                        key={i}
                        className="p-3 bg-white border-2 border-black text-xs font-bold uppercase tracking-tight flex items-center justify-between hover:bg-[#FF3000] hover:text-white hover:border-[#FF3000] transition-all duration-150 cursor-default shadow-xs hover:shadow-sm"
                      >
                        <span>{item}</span>
                        <span className="text-[10px] font-mono opacity-60">■</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 pt-4 border-t-2 border-neutral-300 text-[10px] font-mono text-neutral-500 uppercase">
                  VERIFIED OPERATIONAL STACK
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Philosophy Tab */}
        {activeTab === 'philosophy' && (
          <motion.div
            key="philosophy"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 divide-y-4 md:divide-y-0 md:divide-x-4 divide-black bg-white"
          >
            {swissTenets.map((tenet, idx) => (
              <div
                key={idx}
                className={`p-8 sm:p-12 hover:bg-[#F2F2F2] transition-colors duration-150 ${
                  idx >= 2 ? 'md:border-t-4 md:border-black' : ''
                }`}
              >
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-4xl sm:text-5xl font-black font-mono text-black">
                    {tenet.num}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#FF3000] tracking-widest uppercase">
                    CANON // 0{idx + 1}
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black mb-4">
                  {tenet.title}
                </h4>
                <p className="text-sm font-medium text-neutral-700 leading-relaxed font-sans">
                  {tenet.text}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
