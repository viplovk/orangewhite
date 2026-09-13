import React, { useEffect, useRef } from 'react';
import { Experiment } from '../../data/experiments';
import { ExperimentCard } from './ExperimentCard';
import gsap from 'gsap';

interface ExperimentGridProps {
  experiments: Experiment[];
  onSelectExperiment: (exp: Experiment) => void;
  selectedCategory: string;
}

export const ExperimentGrid: React.FC<ExperimentGridProps> = ({
  experiments,
  onSelectExperiment,
  selectedCategory,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  // GSAP animation on category change or initial render
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('article');
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 18,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.35,
        stagger: 0.05,
        ease: 'power2.out',
      }
    );
  }, [selectedCategory, experiments.length]);

  if (experiments.length === 0) {
    return (
      <div className="w-full py-20 px-6 text-center border-b-4 border-black bg-[#F9F9F9]">
        <div className="inline-block p-8 border-2 border-dashed border-black max-w-md bg-white">
          <span className="font-mono text-xs font-bold text-[#FF3000] uppercase block mb-2">
            TELEMETRY // ZERO RESULTS
          </span>
          <h4 className="text-xl font-black uppercase text-black mb-2">
            NO EXPERIMENTS MATCHED
          </h4>
          <p className="text-xs font-mono text-neutral-600">
            No prototypes currently cataloged under {selectedCategory}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 sm:p-10 border-b-4 border-black bg-[#F5F5F5]"
    >
      {experiments.map((experiment) => (
        <ExperimentCard
          key={experiment.id}
          experiment={experiment}
          onSelect={onSelectExperiment}
        />
      ))}
    </div>
  );
};
