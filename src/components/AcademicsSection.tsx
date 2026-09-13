import React, { useState, useEffect, useRef } from 'react';
import { EDUCATION_TIMELINE, PERSONAL_INFO } from '../data/portfolioData';
import { Award, BookOpen, CheckCircle, GraduationCap, MapPin, School, ArrowUpRight } from 'lucide-react';
import { sound } from '../lib/sound';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AcademicsSection: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>('undergraduate');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
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

  return (
    <section
      ref={sectionRef}
      id="academics"
      className="w-full border-b-4 border-black bg-white relative"
    >
      {/* Section Header Banner */}
      <div
        ref={headerRef}
        className="border-b-4 border-black bg-[#F2F2F2] p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-[#FF3000] uppercase block mb-1">
            03. ACADEMIC BLUEPRINT & TIMELINE // PEDAGOGY
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-black">
            EDUCATION & JOURNEY
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-black text-white font-mono text-xs font-bold tracking-wider uppercase border-2 border-black flex items-center gap-2">
            <span className="w-2 h-2 bg-[#FF3000] animate-pulse" />
            <span>DEGREE TRACK: B.TECH CSE (2025–2029) // 2ND YEAR</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Asymmetrical Layout (5 cols left, 7 cols right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-black">
        {/* Left Column: Academic KPI & Overview */}
        <div className="lg:col-span-5 p-6 sm:p-10 md:p-12 bg-white flex flex-col justify-between swiss-grid-pattern">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-[10px] font-mono font-bold tracking-widest uppercase mb-6">
              <GraduationCap className="w-3.5 h-3.5 text-[#FF3000]" />
              <span>CURRENT INSTITUTION</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black mb-2">
              IEC COLLEGE OF ENGINEERING & TECHNOLOGY
            </h3>
            <p className="text-xs font-mono font-bold text-[#FF3000] tracking-wider uppercase mb-6">
              DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
            </p>
            <div className="h-1.5 w-20 bg-black mb-8" />

            {/* Massive Academic Metric Block */}
            <div className="p-6 bg-black text-white border-4 border-black mb-8 relative overflow-hidden group">
              <div className="flex items-start justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-[#FF3000] uppercase">
                  CORE SPECIALIZATION
                </span>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">
                  BATCH 2025–2029 // 2ND YEAR
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-3 mb-2 uppercase">
                COMPUTER SCIENCE
              </div>
              <p className="text-xs font-sans text-neutral-300">
                Currently in 2nd year of B.Tech CSE (Batch 2025–2029), mastering data structures, algorithm analysis, low-level systems programming in C/C++, web platforms, and discrete mathematics.
              </p>
            </div>

            {/* Geographic & Structural Breakdown */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 bg-[#F2F2F2] border-2 border-black flex items-center justify-between">
                <span className="text-neutral-600 font-bold uppercase">CAMPUS LOCATION</span>
                <span className="font-bold text-black uppercase">GREATER NOIDA, UP</span>
              </div>
              <div className="p-3.5 bg-[#F2F2F2] border-2 border-black flex items-center justify-between">
                <span className="text-neutral-600 font-bold uppercase">PERMANENT RESIDENCE</span>
                <span className="font-bold text-black uppercase">DELHI, INDIA</span>
              </div>
              <div className="p-3.5 bg-[#F2F2F2] border-2 border-black flex items-center justify-between">
                <span className="text-neutral-600 font-bold uppercase">FOUNDATIONAL PREP</span>
                <span className="font-bold text-black uppercase">VIDHYAPEETH PREET VIHAR</span>
              </div>
              <div className="p-3.5 bg-[#F2F2F2] border-2 border-black flex items-center justify-between">
                <span className="text-neutral-600 font-bold uppercase">CLASS 10TH (2023)</span>
                <span className="font-bold text-black uppercase">BHARTI PUBLIC SCHOOL</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-black/20 text-[10px] font-mono text-neutral-500 uppercase flex items-center justify-between">
            <span>OBJECTIVE RECORD ARCHIVE</span>
            <span className="text-[#FF3000]">STATUS: CURRENTLY ACTIVE</span>
          </div>
        </div>

        {/* Right Column: Complete Academic Timeline Stages */}
        <div className="lg:col-span-7 bg-white divide-y-4 divide-black">
          {EDUCATION_TIMELINE.map((stage, idx) => {
            const isActive = activeStageId === stage.id;
            return (
              <div
                key={stage.id}
                id={`academic-stage-${stage.id}`}
                onClick={() => {
                  sound.playClick();
                  setActiveStageId(stage.id);
                }}
                className={`p-6 sm:p-8 md:p-10 cursor-pointer transition-colors duration-150 ${
                  isActive ? 'bg-[#F2F2F2]' : 'bg-white hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 ${isActive ? 'bg-[#FF3000]' : 'bg-black'}`} />
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-500">
                      MILESTONE 0{idx + 1} // {stage.period}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider border-2 ${
                      isActive
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-black'
                    }`}
                  >
                    {stage.score}
                  </span>
                </div>

                <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black mb-1">
                  {stage.stage}
                </h4>

                <div className="text-sm font-mono font-bold text-[#FF3000] uppercase mb-4">
                  {stage.institution}
                </div>

                <p className="text-sm font-medium text-neutral-800 leading-relaxed font-sans mb-6">
                  {stage.details}
                </p>

                {/* Highlights list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 border-t-2 border-black/10">
                  {stage.highlights.map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-700"
                    >
                      <span className="text-[#FF3000] font-black">■</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
