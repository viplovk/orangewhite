import React from 'react';
import { Experiment } from '../../data/experiments';
import { ExperimentPreview } from './ExperimentPreview';
import { ArrowUpRight, Code, Eye } from 'lucide-react';
import { sound } from '../../lib/sound';

interface ExperimentCardProps {
  experiment: Experiment;
  onSelect: (experiment: Experiment) => void;
}

export const ExperimentCard: React.FC<ExperimentCardProps> = ({
  experiment,
  onSelect,
}) => {
  const getStatusBadge = (status: Experiment['status']) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            ACTIVE
          </span>
        );
      case 'PROTOTYPE':
        return (
          <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#FF3000] bg-orange-50 px-2 py-0.5 border border-orange-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3000]" />
            PROTOTYPE
          </span>
        );
      case 'CONCEPT':
        return (
          <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 border border-blue-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            CONCEPT
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 border border-neutral-300">
            ARCHIVED
          </span>
        );
    }
  };

  return (
    <article
      data-cursor-text="EXPLORE"
      onClick={() => {
        sound.playClick();
        onSelect(experiment);
      }}
      onMouseEnter={() => sound.playHover()}
      className="group relative flex flex-col bg-white border-2 border-black hover:border-[#FF3000] transition-colors duration-150 cursor-pointer overflow-hidden select-none"
    >
      {/* Top Technical Metadata Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#F4F4F4] border-b-2 border-black group-hover:bg-black group-hover:text-white transition-colors duration-150">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-black tracking-widest text-[#FF3000]">
            EXP / {experiment.number}
          </span>
          <span className="text-[10px] font-mono text-neutral-400">
            // {experiment.category}
          </span>
        </div>
        <div>{getStatusBadge(experiment.status)}</div>
      </div>

      {/* Live Interactive Preview Canvas */}
      <div className="w-full h-52 sm:h-56 bg-neutral-50 border-b-2 border-black overflow-hidden relative">
        <ExperimentPreview experiment={experiment} interactive={true} isDetail={false} />
        
        {/* Subtle hover overlay hint */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-20">
          <span className="px-2 py-1 bg-black text-white text-[9px] font-mono font-bold tracking-wider flex items-center gap-1">
            <Eye className="w-3 h-3 text-[#FF3000]" />
            CLICK TO INSPECT
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-black group-hover:text-[#FF3000] transition-colors duration-150 uppercase">
              {experiment.title}
            </h3>
            <span className="text-xs font-mono text-neutral-400 font-bold">
              {experiment.year}
            </span>
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2 mb-4 font-sans">
            {experiment.description}
          </p>
        </div>

        {/* Tech Stack Pills & Action Bar */}
        <div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {experiment.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-neutral-100 text-neutral-800 border border-neutral-300 font-mono text-[10px] font-semibold tracking-wider uppercase"
              >
                {tech}
              </span>
            ))}
            {experiment.technologies.length > 3 && (
              <span className="px-1.5 py-0.5 text-neutral-400 font-mono text-[10px]">
                +{experiment.technologies.length - 3}
              </span>
            )}
          </div>

          <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-xs font-mono font-bold uppercase">
            <span className="text-[#FF3000] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform duration-150">
              <span>EXPLORE EXPERIMENT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
            <span className="text-neutral-400 text-[10px]">
              LAB-REF: #{experiment.number}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
