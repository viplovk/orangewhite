import React, { useState, useEffect, useRef } from 'react';
import { Experiment, EXPERIMENTS } from '../../data/experiments';
import { useExperimentFilter } from '../../hooks/useExperimentFilter';
import { ExperimentFilters } from './ExperimentFilters';
import { FeaturedExperiment } from './FeaturedExperiment';
import { ExperimentGrid } from './ExperimentGrid';
import { ExperimentDetail } from './ExperimentDetail';
import { ArrowUpRight, FlaskConical, Terminal, Activity, Sparkles } from 'lucide-react';
import { sound } from '../../lib/sound';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Experiments: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    filteredExperiments,
    categoryCounts,
    stats,
    getRandomExperiment,
  } = useExperimentFilter();

  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Identify featured experiment (or fallback to first item)
  const featuredExperiment = EXPERIMENTS.find((e) => e.featured) || EXPERIMENTS[0];

  // The remaining experiments displayed in grid
  // If 'ALL' is selected, omit featured from grid to avoid duplicate visual emphasis
  // If a category is selected, show all matching in grid
  const gridExperiments =
    selectedCategory === 'ALL'
      ? filteredExperiments.filter((e) => e.id !== featuredExperiment.id)
      : filteredExperiments;

  // GSAP ScrollTrigger Entrance Reveal
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current.querySelectorAll('.exp-stagger-item'), {
          opacity: 0,
          y: 24,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Surprise Me Handler
  const handleSurpriseMe = () => {
    const random = getRandomExperiment();
    setSelectedExperiment(random);
  };

  return (
    <section
      ref={sectionRef}
      id="experiments"
      className="w-full border-b-4 border-black bg-white relative overflow-hidden"
    >
      {/* Precision Swiss Architectural Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-15">
        <div className="w-full h-full grid grid-cols-12 divide-x divide-black" />
      </div>

      {/* Top Laboratory Metadata Strip */}
      <div className="relative z-10 w-full border-b-4 border-black bg-black text-white px-4 sm:px-10 py-2.5 flex items-center justify-between font-mono text-[11px]">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#FF3000] inline-block animate-pulse" />
          <span className="font-bold tracking-widest uppercase text-white">
            LAB / 001 // EXPERIMENTAL WORKSPACE
          </span>
          <span className="text-neutral-500 hidden sm:inline">//</span>
          <span className="text-neutral-400 hidden sm:inline">
            STATUS: <span className="text-emerald-400 font-bold">ACTIVE</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-neutral-400">
          <span className="hidden md:inline">28.6139° N, 77.2090° E</span>
          <span className="text-white font-bold">VIPLOV // LAB</span>
        </div>
      </div>

      {/* Editorial Header Banner */}
      <div
        ref={headerRef}
        className="relative z-10 border-b-4 border-black bg-[#F4F4F4] p-6 sm:p-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
      >
        <div className="max-w-2xl">
          <span className="exp-stagger-item text-xs font-mono font-bold tracking-widest text-[#FF3000] uppercase block mb-1.5">
            03. DIGITAL LABORATORY // EXPLORATORY ARTIFACTS
          </span>
          <h2 className="exp-stagger-item text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-black leading-none mb-3">
            EXPERIMENTS
          </h2>
          <p className="exp-stagger-item text-sm sm:text-base text-neutral-700 font-sans leading-relaxed">
            Small ideas. Strange interfaces. Unfinished systems. Digital experiments in Three.js, WebGL, AI, shaders, and creative code.
          </p>
        </div>

        {/* Dynamic Laboratory Telemetry Stats */}
        <div className="exp-stagger-item flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs">
          <div className="px-3.5 py-2 bg-white border-2 border-black flex items-center gap-2">
            <span className="text-neutral-400">TOTAL:</span>
            <span className="font-bold text-black">
              {stats.total < 10 ? `0${stats.total}` : stats.total}
            </span>
          </div>

          <div className="px-3.5 py-2 bg-white border-2 border-black flex items-center gap-2">
            <span className="text-neutral-400">ACTIVE:</span>
            <span className="font-bold text-emerald-600">
              {stats.active < 10 ? `0${stats.active}` : stats.active}
            </span>
          </div>

          <div className="px-3.5 py-2 bg-white border-2 border-black flex items-center gap-2">
            <span className="text-neutral-400">DISCIPLINES:</span>
            <span className="font-bold text-black">
              {stats.categoriesCount < 10 ? `0${stats.categoriesCount}` : stats.categoriesCount}
            </span>
          </div>

          <div className="px-3.5 py-2 bg-[#FF3000] text-white font-bold flex items-center gap-2 border-2 border-black">
            <span>SHOWING:</span>
            <span>
              {filteredExperiments.length < 10
                ? `0${filteredExperiments.length}`
                : filteredExperiments.length}
              {' / '}
              {stats.total < 10 ? `0${stats.total}` : stats.total}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Navigation Bar */}
      <div className="relative z-10">
        <ExperimentFilters
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
          onSurpriseMe={handleSurpriseMe}
        />
      </div>

      {/* Featured Experiment (Shown when viewing 'ALL' or when featured category matches) */}
      {(selectedCategory === 'ALL' ||
        featuredExperiment.categories.includes(selectedCategory)) && (
        <div className="relative z-10">
          <FeaturedExperiment
            experiment={featuredExperiment}
            onSelect={setSelectedExperiment}
          />
        </div>
      )}

      {/* Secondary Experiment Grid */}
      <div className="relative z-10">
        <ExperimentGrid
          experiments={gridExperiments}
          onSelectExperiment={setSelectedExperiment}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* Bottom Technical Footer */}
      <div className="relative z-10 px-6 sm:px-10 py-5 bg-black text-white flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold tracking-widest uppercase">
            MORE EXPERIMENTS ARE ALWAYS IN PROGRESS // LAB STATUS: ● ACTIVE
          </span>
        </div>

        <a
          href="https://github.com/viplovk"
          target="_blank"
          rel="noreferrer"
          onClick={() => sound.playClick()}
          data-cursor-text="GITHUB"
          className="px-4 py-2 bg-white text-black hover:bg-[#FF3000] hover:text-white uppercase font-bold text-xs tracking-widest flex items-center gap-1.5 transition-colors duration-150 cursor-pointer"
        >
          <span>VIEW ALL ON GITHUB</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Interactive Detail Modal / Inspector */}
      <ExperimentDetail
        experiment={selectedExperiment}
        onClose={() => setSelectedExperiment(null)}
      />
    </section>
  );
};
