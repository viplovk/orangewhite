import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO, SPECIFICATIONS } from '../data/portfolioData';
import { Award, BookOpen, Check, Cpu, MapPin, Terminal, Layers, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TechSystem } from './TechSystem';
import { sound } from '../lib/sound';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProfileSpecs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editorial' | 'specs' | 'stack' | 'philosophy'>('editorial');
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headlineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const coreStack = [
    { category: 'LANGUAGES', items: ['TypeScript', 'JavaScript (ESNext)', 'C / C++', 'Python', 'SQL', 'HTML5 / CSS3'] },
    { category: 'FRAMEWORKS & LIBS', items: ['React 19', 'Three.js / WebGL', 'Vite', 'Tailwind CSS', 'Express', 'Motion'] },
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
      ref={sectionRef}
      id="profile"
      className="w-full border-b-4 border-black bg-white relative"
    >
      {/* Section Header Banner */}
      <div
        ref={headlineRef}
        className="border-b-4 border-black bg-[#F2F2F2] p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-[#FF3000] uppercase block mb-1">
            01. ARCHITECTURE & PROFILE SPECIFICATION
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-black">
            SYSTEM DOSSIER
          </h2>
        </div>
        
        {/* Tab Controls */}
        <div className="flex flex-wrap border-4 border-black bg-white">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('editorial');
            }}
            className={`px-4 sm:px-5 py-3 text-xs font-black tracking-widest uppercase transition-colors duration-150 cursor-pointer ${
              activeTab === 'editorial' ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#FF3000] hover:text-white'
            }`}
          >
            ABOUT // COMPOSITION
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('specs');
            }}
            className={`px-4 sm:px-5 py-3 text-xs font-black tracking-widest uppercase border-l-2 sm:border-l-4 border-black transition-colors duration-150 cursor-pointer ${
              activeTab === 'specs' ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#FF3000] hover:text-white'
            }`}
          >
            SPECS
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('stack');
            }}
            className={`px-4 sm:px-5 py-3 text-xs font-black tracking-widest uppercase border-l-2 sm:border-l-4 border-black transition-colors duration-150 cursor-pointer ${
              activeTab === 'stack' ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#FF3000] hover:text-white'
            }`}
          >
            TECH MATRIX
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('philosophy');
            }}
            className={`px-4 sm:px-5 py-3 text-xs font-black tracking-widest uppercase border-l-2 sm:border-l-4 border-black transition-colors duration-150 cursor-pointer ${
              activeTab === 'philosophy' ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#FF3000] hover:text-white'
            }`}
          >
            CANONS
          </button>
        </div>
      </div>

      {/* Main Content Area with Smooth Tab Transitions */}
      <AnimatePresence mode="wait">
        {/* Tab 1: Editorial Visual Composition (Who I am, What I build, Areas of Focus, Location) */}
        {activeTab === 'editorial' && (
          <motion.div
            key="editorial"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-black bg-white"
          >
            {/* Left 7 Columns: Editorial Narrative & Typographic Manifesto */}
            <div className="lg:col-span-7 p-6 sm:p-10 md:p-14 bg-white flex flex-col justify-between swiss-grid-pattern">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-[10px] font-mono font-bold tracking-widest uppercase mb-6">
                  <span className="w-2 h-2 bg-[#FF3000]" />
                  <span>EDITORIAL PROFILE // ARCHITECTURE</span>
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-black leading-tight mb-8">
                  ENGINEERING SOFTWARE WITH MATHEMATICAL PURITY AND VISIBLE SYSTEMS.
                </h3>

                <div className="space-y-6 text-base sm:text-lg font-medium text-neutral-800 leading-relaxed font-sans">
                  <p>
                    I am <strong className="text-black font-black uppercase">Viplov</strong>, a 19-year-old Computer Science & Engineering undergraduate (Batch 2025–2029) currently in my 2nd year at <strong className="text-black font-bold">IEC College of Engineering & Technology</strong>.
                  </p>
                  <p>
                    Operating between <strong className="text-black font-bold">Delhi</strong> (Permanent Base) and <strong className="text-black font-bold">Greater Noida</strong> (Academic Campus), my work bridges rigorous core computation—algorithms, data structures, low-level systems in C/C++—with modern front-end architectures in TypeScript, React, and spatial WebGL graphics.
                  </p>
                  <p>
                    I view user interfaces through the lens of the International Typographic Style (Swiss Design): objective, functional, and anchored by explicit grid lines. The software I build prioritizes deterministic accuracy, rapid data indexing, and intuitive cognition.
                  </p>
                </div>
              </div>

              {/* Editorial Pillars */}
              <div className="mt-10 pt-8 border-t-2 border-black grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 bg-[#F2F2F2] border border-black">
                  <span className="text-[10px] text-[#FF3000] font-bold block mb-1">DISCIPLINE 01</span>
                  <span className="font-bold text-black uppercase">ALGORITHMS & DATA STRUCTURES</span>
                </div>
                <div className="p-4 bg-[#F2F2F2] border border-black">
                  <span className="text-[10px] text-[#FF3000] font-bold block mb-1">DISCIPLINE 02</span>
                  <span className="font-bold text-black uppercase">SYSTEM PLATFORMS & COMPILERS</span>
                </div>
                <div className="p-4 bg-[#F2F2F2] border border-black">
                  <span className="text-[10px] text-[#FF3000] font-bold block mb-1">DISCIPLINE 03</span>
                  <span className="font-bold text-black uppercase">SWISS DIGITAL DESIGN SYSTEMS</span>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Visual Profile Specimen & Direct Badges */}
            <div className="lg:col-span-5 p-6 sm:p-10 md:p-12 bg-[#F9F9F9] flex flex-col justify-between">
              <div>
                <div className="w-20 h-20 bg-black text-white flex items-center justify-center font-black text-3xl mb-8 border-4 border-black shadow-[4px_4px_0px_0px_#FF3000]">
                  VP
                </div>

                <div className="text-xs font-mono font-bold text-[#FF3000] uppercase tracking-widest mb-1">
                  OFFICIAL CANDIDATE RECORD
                </div>
                <h4 className="text-2xl sm:text-3xl font-black uppercase text-black tracking-tight mb-4">
                  VIPLOV // CSE 2ND YR
                </h4>

                <div className="h-1.5 w-16 bg-[#FF3000] mb-8" />

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 bg-white border-2 border-black flex items-center justify-between">
                    <span className="text-neutral-500 font-bold uppercase">AGE / BORN</span>
                    <span className="font-bold text-black uppercase">19 YEARS // 2007</span>
                  </div>
                  <div className="p-3.5 bg-white border-2 border-black flex items-center justify-between">
                    <span className="text-neutral-500 font-bold uppercase">INSTITUTION</span>
                    <span className="font-bold text-black uppercase">IEC-CET (GR. NOIDA)</span>
                  </div>
                  <div className="p-3.5 bg-white border-2 border-black flex items-center justify-between">
                    <span className="text-neutral-500 font-bold uppercase">DEGREE BATCH</span>
                    <span className="font-bold text-[#FF3000] uppercase">B.TECH CSE (2025–2029)</span>
                  </div>
                  <div className="p-3.5 bg-white border-2 border-black flex items-center justify-between">
                    <span className="text-neutral-500 font-bold uppercase">SECONDARY SCHOOL</span>
                    <span className="font-bold text-black uppercase">BHARTI PUBLIC SCHOOL (2023)</span>
                  </div>
                  <div className="p-3.5 bg-white border-2 border-black flex items-center justify-between">
                    <span className="text-neutral-500 font-bold uppercase">PREPARATION</span>
                    <span className="font-bold text-black uppercase">VIDHYAPEETH PREET VIHAR</span>
                  </div>
                  <div className="p-3.5 bg-black text-white border-2 border-black flex items-center justify-between">
                    <span className="text-neutral-400 font-bold uppercase">GITHUB NODE</span>
                    <span className="font-bold text-[#FF3000] uppercase">GITHUB.COM/VIPLOVK</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t-2 border-black/20 text-[10px] font-mono text-neutral-500 uppercase flex items-center justify-between">
                <span>COORDINATES: 28.6139° N, 77.2090° E</span>
                <span className="text-black font-bold">DELHI NCR</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Structured Specifications Table */}
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
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center font-black text-2xl mb-8 border-2 border-black">
                  VP
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black mb-2">
                  {PERSONAL_INFO.formalName}
                </h3>
                <p className="text-xs font-mono font-bold tracking-wider text-[#FF3000] uppercase mb-6">
                  19 YEARS // B.TECH CSE (2025–2029)
                </p>
                <div className="h-1 w-16 bg-black mb-6" />

                <div className="space-y-4 text-xs font-mono">
                  <div className="p-3 bg-[#F2F2F2] border-2 border-black flex items-center justify-between">
                    <span className="text-neutral-600 font-bold uppercase">LOCATION 01</span>
                    <span className="font-bold text-black uppercase">DELHI, IN</span>
                  </div>
                  <div className="p-3 bg-[#F2F2F2] border-2 border-black flex items-center justify-between">
                    <span className="text-neutral-600 font-bold uppercase">LOCATION 02</span>
                    <span className="font-bold text-black uppercase">GREATER NOIDA</span>
                  </div>
                  <div className="p-3 bg-[#F2F2F2] border-2 border-black flex items-center justify-between">
                    <span className="text-neutral-600 font-bold uppercase">COLLEGE</span>
                    <span className="font-bold text-black uppercase">IEC-CET</span>
                  </div>
                  <div className="p-3 bg-black text-white border-2 border-black flex items-center justify-between">
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

        {/* Tab 3: Interactive Technology Matrix & Nodes System */}
        {activeTab === 'stack' && (
          <motion.div
            key="stack"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <TechSystem />
          </motion.div>
        )}

        {/* Tab 4: Philosophy & Canons */}
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
