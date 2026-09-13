import React, { useState } from 'react';
import { EDUCATION_TIMELINE, PERSONAL_INFO } from '../data/portfolioData';
import { Award, BookOpen, CheckCircle, GraduationCap, MapPin, School } from 'lucide-react';

export const AcademicsSection: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>('undergraduate');

  return (
    <section
      id="academics"
      className="w-full border-b-4 border-black bg-white relative"
    >
      {/* Section Header Banner */}
      <div className="border-b-4 border-black bg-[#F2F2F2] p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-[#FF3000] uppercase block mb-1">
            03. ACADEMIC DOSSIER & PEDAGOGY
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-black">
            EDUCATION & RECORDS
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-black text-white font-mono text-xs font-bold tracking-wider uppercase border-2 border-black flex items-center gap-2">
            <span className="w-2 h-2 bg-[#FF3000]" />
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
                <span className="text-neutral-600 font-bold uppercase">SCHOOLING BASE</span>
                <span className="font-bold text-black uppercase">DELHI, INDIA</span>
              </div>
              <div className="p-3.5 bg-[#F2F2F2] border-2 border-black flex items-center justify-between">
                <span className="text-neutral-600 font-bold uppercase">FOUNDATIONAL PREP</span>
                <span className="font-bold text-black uppercase">VIDHYAPEETH PREET VIHAR</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-black/20 text-[10px] font-mono text-neutral-500 uppercase">
            OBJECTIVE RECORD ARCHIVE // VERIFIED DATA
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
                onClick={() => setActiveStageId(stage.id)}
                className={`p-6 sm:p-8 md:p-10 cursor-pointer transition-colors duration-150 ${
                  isActive ? 'bg-[#F2F2F2]' : 'bg-white hover:bg-neutral-50'
                }`}
              >
                {/* Stage Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black text-[#FF3000] tracking-widest">
                      0{idx + 1}.
                    </span>
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-600">
                      {stage.period}
                    </span>
                  </div>
                  {stage.score && (
                    <span className="self-start sm:self-auto px-2.5 py-1 bg-black text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                      {stage.scoreLabel}: {stage.score}
                    </span>
                  )}
                </div>

                {/* Institution & Title */}
                <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black mb-1">
                  {stage.institution}
                </h4>
                <div className="text-xs font-mono font-bold text-black uppercase mb-4">
                  {stage.stage} // <span className="text-neutral-600">{stage.location}</span>
                </div>

                {/* Description */}
                <p className="text-sm font-medium text-neutral-800 leading-relaxed font-sans mb-4">
                  {stage.details}
                </p>

                {/* Highlights List */}
                <div className="bg-white border-2 border-black p-4 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-[#FF3000] uppercase tracking-wider block">
                    KEY MILESTONES & FOCUS:
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-800 font-sans">
                    {stage.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#FF3000] font-black font-mono">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
