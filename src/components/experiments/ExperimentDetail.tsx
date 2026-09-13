import React, { useEffect } from 'react';
import { Experiment } from '../../data/experiments';
import { ExperimentPreview } from './ExperimentPreview';
import { X, ArrowUpRight, Code, Terminal, Sliders, Cpu, Activity } from 'lucide-react';
import { sound } from '../../lib/sound';

interface ExperimentDetailProps {
  experiment: Experiment | null;
  onClose: () => void;
}

export const ExperimentDetail: React.FC<ExperimentDetailProps> = ({
  experiment,
  onClose,
}) => {
  useEffect(() => {
    if (!experiment) return;

    // Handle ESC key to dismiss modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      }
    };

    // Lock body scrolling while modal is open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [experiment, onClose]);

  if (!experiment) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="experiment-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playClick();
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white border-4 border-black flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-black text-white border-b-4 border-black">
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="w-2.5 h-2.5 bg-[#FF3000] inline-block animate-ping" />
            <span className="font-bold tracking-widest uppercase">
              LAB INSPECTION // ARTIFACT #{experiment.number}
            </span>
            <span className="text-neutral-400 hidden sm:inline">
              // {experiment.category}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            data-cursor-text="CLOSE"
            className="px-3 py-1 bg-white text-black hover:bg-[#FF3000] hover:text-white uppercase font-mono font-bold text-xs flex items-center gap-1.5 transition-colors duration-150 cursor-pointer"
          >
            <span>CLOSE</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Interactive Preview Container */}
          <div className="w-full h-80 sm:h-96 md:h-[420px] bg-neutral-100 border-b-4 border-black relative">
            <ExperimentPreview
              experiment={experiment}
              interactive={true}
              isDetail={true}
            />
            
            <div className="absolute bottom-3 left-4 z-20 pointer-events-none">
              <span className="px-2.5 py-1 bg-black text-white text-[10px] font-mono font-bold uppercase tracking-widest">
                LIVE INTERACTIVE STAGE
              </span>
            </div>
          </div>

          {/* Technical Metadata & Architecture Breakdown */}
          <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 bg-white">
            {/* Left 7 Cols: Description & Notes */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 font-mono text-xs text-[#FF3000] font-bold mb-2">
                  <span>EXP-ID: {experiment.id.toUpperCase()}</span>
                  <span>//</span>
                  <span>STATUS: {experiment.status}</span>
                  <span>//</span>
                  <span>YEAR: {experiment.year}</span>
                </div>

                <h2
                  id="experiment-modal-title"
                  className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black mb-4 leading-none"
                >
                  {experiment.title}
                </h2>

                <p className="text-sm sm:text-base text-neutral-800 leading-relaxed mb-6 font-sans">
                  {experiment.description}
                </p>

                {experiment.notes && (
                  <div className="p-4 bg-[#F5F5F5] border-l-4 border-black font-mono text-xs text-neutral-700 leading-relaxed mb-6">
                    <span className="block font-bold text-black uppercase tracking-widest text-[10px] mb-1">
                      TECHNICAL IMPLEMENTATION MEMORANDUM:
                    </span>
                    {experiment.notes}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-6 border-t-2 border-neutral-200">
                <a
                  href={experiment.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  data-cursor-text="OPEN"
                  className="px-6 py-3 bg-[#FF3000] text-white hover:bg-black font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-colors duration-150"
                >
                  <span>LAUNCH FULLSCREEN</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={experiment.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  data-cursor-text="CODE"
                  className="px-6 py-3 bg-white text-black border-2 border-black hover:bg-black hover:text-white font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-colors duration-150"
                >
                  <Code className="w-4 h-4" />
                  <span>VIEW REPO REPOSITORY</span>
                </a>
              </div>
            </div>

            {/* Right 5 Cols: Technical Specs & Stack */}
            <div className="md:col-span-5 bg-[#FAFAFA] p-6 border-2 border-black flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-black uppercase pb-3 mb-4 border-b-2 border-black">
                  <Terminal className="w-4 h-4 text-[#FF3000]" />
                  <span>ENVIRONMENT SPECS</span>
                </div>

                <div className="space-y-3 font-mono text-xs mb-6">
                  <div className="flex justify-between py-1 border-b border-neutral-200">
                    <span className="text-neutral-500">RUNTIME</span>
                    <span className="font-bold text-black">{experiment.type.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-200">
                    <span className="text-neutral-500">DISCIPLINE</span>
                    <span className="font-bold text-black">{experiment.category}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-200">
                    <span className="text-neutral-500">FRAME_TARGET</span>
                    <span className="font-bold text-emerald-600">60 FPS // V-SYNC</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-200">
                    <span className="text-neutral-500">ACCESSIBILITY</span>
                    <span className="font-bold text-black">REDUCED MOTION SAFE</span>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="block font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">
                    DEPLOYED DEPENDENCIES:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {experiment.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 bg-white border border-black font-mono text-[11px] font-bold uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-300 text-[10px] font-mono text-neutral-500">
                LAB COORDINATES: 28.6139° N, 77.2090° E // VIPLOV DEV LAB
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
