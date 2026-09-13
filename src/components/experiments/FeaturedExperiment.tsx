import React from 'react';
import { Experiment } from '../../data/experiments';
import { ExperimentPreview } from './ExperimentPreview';
import { ArrowUpRight, Code, Terminal, Activity, Zap } from 'lucide-react';
import { sound } from '../../lib/sound';

interface FeaturedExperimentProps {
  experiment: Experiment;
  onSelect: (experiment: Experiment) => void;
}

export const FeaturedExperiment: React.FC<FeaturedExperimentProps> = ({
  experiment,
  onSelect,
}) => {
  return (
    <div className="w-full border-b-4 border-black bg-white">
      {/* Featured Header Banner */}
      <div className="flex items-center justify-between px-6 sm:px-10 py-3 bg-black text-white border-b-2 border-black font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#FF3000] inline-block animate-ping" />
          <span className="font-bold tracking-widest uppercase text-white">
            LAB_BENCHMARK // PRIMARY EXPERIMENTAL ARTIFACT
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-neutral-400 text-[11px]">
          <span>GPU ACCELERATED</span>
          <span>//</span>
          <span>LATENCY: &lt;16.6MS</span>
        </div>
      </div>

      {/* 12-Column Asymmetrical Grid Layout */}
      <div className="grid grid-cols-12 divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-black">
        {/* Left Column (Cols 1-7 or 8): High-Density Live Canvas (7 columns on lg, 8 on xl) */}
        <div className="col-span-12 lg:col-span-7 xl:col-span-8 bg-[#F8F8F8] relative min-h-[380px] sm:min-h-[440px] flex flex-col justify-between overflow-hidden group">
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="px-2.5 py-1 bg-black text-white text-[10px] font-mono font-bold tracking-widest uppercase">
              LIVE SHADER RUNTIME
            </span>
            <span className="px-2 py-1 bg-[#FF3000] text-white text-[10px] font-mono font-bold tracking-widest uppercase">
              INTERACTIVE CANVAS
            </span>
          </div>

          {/* Interactive Preview */}
          <div className="w-full h-full min-h-[360px] sm:min-h-[420px] relative">
            <ExperimentPreview
              experiment={experiment}
              interactive={true}
              isDetail={true}
            />
          </div>

          {/* Bottom telemetry readout strip */}
          <div className="w-full border-t-2 border-black bg-white p-3 sm:px-6 flex items-center justify-between font-mono text-[10px] sm:text-xs text-neutral-600">
            <div className="flex items-center gap-4">
              <span className="text-[#FF3000] font-bold">● SIMULATION: EULERIAN GRID</span>
              <span className="hidden md:inline text-neutral-400">PRECISION: FP32</span>
            </div>
            <span className="font-bold text-black">DRAG / HOVER TO TEST DYNAMICS</span>
          </div>
        </div>

        {/* Right Column (Cols 8-12 or 9-12): Editorial Typography & Details */}
        <div className="col-span-12 lg:col-span-5 xl:col-span-4 p-6 sm:p-10 flex flex-col justify-between bg-white">
          <div>
            {/* Monospace Top Spec */}
            <div className="flex items-center justify-between font-mono text-xs mb-4">
              <span className="font-bold text-[#FF3000] tracking-widest">
                LAB / {experiment.number}
              </span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-[10px]">
                ● {experiment.status}
              </span>
            </div>

            {/* Editorial Large Heading */}
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-black uppercase leading-none mb-4">
              {experiment.title}
            </h3>

            {/* Research & Technical Copy */}
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans mb-6">
              {experiment.description}
            </p>

            {experiment.notes && (
              <div className="p-4 bg-[#F5F5F5] border-l-4 border-[#FF3000] mb-6">
                <span className="block font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                  RESEARCH METHODOLOGY // NOTES
                </span>
                <p className="text-xs font-mono text-neutral-800 leading-normal">
                  {experiment.notes}
                </p>
              </div>
            )}

            {/* Technologies Grid */}
            <div className="mb-8">
              <span className="block font-mono text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                CORE STACK & PIPELINE
              </span>
              <div className="flex flex-wrap gap-2">
                {experiment.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white text-black border-2 border-black font-mono text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors duration-150"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t-2 border-neutral-200">
            <button
              onClick={() => {
                sound.playClick();
                onSelect(experiment);
              }}
              data-cursor-text="LAUNCH"
              className="flex-1 h-12 bg-black text-white hover:bg-[#FF3000] uppercase font-mono font-bold text-xs tracking-widest flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer"
            >
              <span>LAUNCH EXPERIMENT</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href={experiment.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              data-cursor-text="GITHUB"
              className="h-12 px-5 bg-white text-black border-2 border-black hover:bg-black hover:text-white uppercase font-mono font-bold text-xs tracking-widest flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer"
            >
              <Code className="w-4 h-4" />
              <span>SOURCE</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
