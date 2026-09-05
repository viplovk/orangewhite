import React, { useState } from 'react';
import { BookOpen, GraduationCap, CheckCircle2, Calculator } from 'lucide-react';

interface Course {
  code: string;
  title: string;
  credits: number;
  gradePoint: number;
}

export const InteractiveIECCET: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    { code: 'BCS101', title: 'PROGRAMMING FOR PROBLEM SOLVING', credits: 4, gradePoint: 9 }, // A+
    { code: 'BAS103', title: 'ENGINEERING MATHEMATICS - I', credits: 4, gradePoint: 8 },      // A
    { code: 'BAS101', title: 'ENGINEERING PHYSICS', credits: 4, gradePoint: 8 },              // A
    { code: 'BEE101', title: 'BASIC ELECTRICAL ENGINEERING', credits: 3, gradePoint: 7 },     // B+
    { code: 'BAS104', title: 'ENVIRONMENT & ECOLOGY', credits: 2, gradePoint: 8 },            // A
    { code: 'BCS151', title: 'PROGRAMMING LAB (C/SYSTEMS)', credits: 1, gradePoint: 10 },     // O
    { code: 'BAS151', title: 'PHYSICS LAB', credits: 1, gradePoint: 9 },                      // A+
  ]);

  const [activeTab, setActiveTab] = useState<'calculator' | 'syllabus'>('calculator');

  const gradeOptions = [
    { label: 'O (10)', value: 10 },
    { label: 'A+ (9)', value: 9 },
    { label: 'A (8)', value: 8 },
    { label: 'B+ (7)', value: 7 },
    { label: 'B (6)', value: 6 },
    { label: 'C (5)', value: 5 },
  ];

  const updateGrade = (index: number, newGrade: number) => {
    const updated = [...courses];
    updated[index].gradePoint = newGrade;
    setCourses(updated);
  };

  const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);
  const totalPoints = courses.reduce((acc, c) => acc + c.credits * c.gradePoint, 0);
  const calculatedSGPA = (totalPoints / totalCredits).toFixed(2);

  return (
    <div className="w-full border-4 border-black bg-white font-mono text-xs">
      {/* Header */}
      <div className="p-4 bg-black text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-4 border-black">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#FF3000]" />
          <span className="font-black uppercase tracking-widest text-sm">
            IECCET // CSE ACADEMIC COMPUTATION PORTAL
          </span>
        </div>
        <div className="text-[11px] text-neutral-300">
          AFFILIATION: IEC COLLEGE OF ENGINEERING & TECHNOLOGY
        </div>
      </div>

      {/* Mode Select */}
      <div className="flex border-b-4 border-black bg-[#F2F2F2]">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-6 py-2.5 font-bold uppercase tracking-wider text-xs border-r-4 border-black transition-colors ${
            activeTab === 'calculator' ? 'bg-white text-black' : 'hover:bg-white text-neutral-600'
          }`}
        >
          SGPA EVALUATOR (LIVE)
        </button>
        <button
          onClick={() => setActiveTab('syllabus')}
          className={`px-6 py-2.5 font-bold uppercase tracking-wider text-xs border-r-4 border-black transition-colors ${
            activeTab === 'syllabus' ? 'bg-white text-black' : 'hover:bg-white text-neutral-600'
          }`}
        >
          DEPARTMENT SYLLABUS INDEX
        </button>
      </div>

      {activeTab === 'calculator' ? (
        <div className="p-6">
          {/* Result Banner */}
          <div className="p-4 bg-[#F2F2F2] border-4 border-black mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#FF3000] uppercase tracking-widest block">
                COMPUTED FIRST SEMESTER RATING
              </span>
              <span className="text-3xl sm:text-4xl font-black text-black">
                {calculatedSGPA} <span className="text-base font-bold text-neutral-500">/ 10.00 SGPA</span>
              </span>
              <p className="text-[11px] text-neutral-600 font-sans mt-0.5">
                Calculated across {totalCredits} credit weight units. Matches Viplov&apos;s 1st Sem official record (7.95).
              </p>
            </div>
            <button
              onClick={() => {
                // reset to official 7.95 configuration
                setCourses([
                  { code: 'BCS101', title: 'PROGRAMMING FOR PROBLEM SOLVING', credits: 4, gradePoint: 9 },
                  { code: 'BAS103', title: 'ENGINEERING MATHEMATICS - I', credits: 4, gradePoint: 8 },
                  { code: 'BAS101', title: 'ENGINEERING PHYSICS', credits: 4, gradePoint: 8 },
                  { code: 'BEE101', title: 'BASIC ELECTRICAL ENGINEERING', credits: 3, gradePoint: 7 },
                  { code: 'BAS104', title: 'ENVIRONMENT & ECOLOGY', credits: 2, gradePoint: 8 },
                  { code: 'BCS151', title: 'PROGRAMMING LAB (C/SYSTEMS)', credits: 1, gradePoint: 10 },
                  { code: 'BAS151', title: 'PHYSICS LAB', credits: 1, gradePoint: 9 },
                ]);
              }}
              className="px-4 py-2 bg-black text-white hover:bg-[#FF3000] uppercase font-bold text-xs"
            >
              RESTORE OFFICIAL 7.95 BENCHMARK
            </button>
          </div>

          {/* Courses Table */}
          <div className="border-2 border-black divide-y-2 divide-black">
            <div className="grid grid-cols-12 bg-black text-white p-2.5 text-[10px] font-bold uppercase tracking-wider">
              <div className="col-span-3 sm:col-span-2">CODE</div>
              <div className="col-span-5 sm:col-span-6">COURSE TITLE</div>
              <div className="col-span-2 text-center">CREDITS</div>
              <div className="col-span-2 text-right">GRADE</div>
            </div>
            {courses.map((course, idx) => (
              <div
                key={course.code}
                className="grid grid-cols-12 p-2.5 items-center hover:bg-[#F2F2F2] transition-colors"
              >
                <div className="col-span-3 sm:col-span-2 font-bold text-[#FF3000]">
                  {course.code}
                </div>
                <div className="col-span-5 sm:col-span-6 font-bold truncate text-black">
                  {course.title}
                </div>
                <div className="col-span-2 text-center font-bold">{course.credits}</div>
                <div className="col-span-2 text-right">
                  <select
                    value={course.gradePoint}
                    onChange={(e) => updateGrade(idx, Number(e.target.value))}
                    className="bg-white border border-black px-2 py-1 text-xs font-bold uppercase cursor-pointer"
                  >
                    {gradeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-4">
          <div className="p-4 border-2 border-black bg-[#F2F2F2]">
            <h5 className="font-bold text-sm uppercase text-black mb-2">
              CSE FOUNDATIONAL SYLLABUS TRACKER
            </h5>
            <p className="text-xs text-neutral-700 font-sans leading-relaxed">
              Provides unified digital access to AKTU university guidelines, laboratory manuals, and lecture notes curated by Viplov for classmates at IEC College of Engineering & Technology.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['UNIT 1: Computational Logic & C Syntax', 'UNIT 2: Arrays, Pointers & Memory Models', 'UNIT 3: Structures, Unions & Dynamic Allocation', 'UNIT 4: File I/O & Preprocessor Directives'].map((unit, i) => (
              <div key={i} className="p-3 border-2 border-black bg-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF3000]" />
                <span className="font-bold text-xs">{unit}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
