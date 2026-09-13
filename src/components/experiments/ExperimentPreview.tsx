import React from 'react';
import { Experiment } from '../../data/experiments';
import { ThreePreview } from './ThreePreview';
import { WebGLPreview } from './WebGLPreview';
import { ShaderPreview } from './ShaderPreview';
import { AIExperimentPreview } from './AIExperimentPreview';
import { CreativeCodePreview } from './CreativeCodePreview';
import { KineticTypePreview } from './KineticTypePreview';

interface ExperimentPreviewProps {
  experiment: Experiment;
  interactive?: boolean;
  className?: string;
  isDetail?: boolean;
}

export const ExperimentPreview: React.FC<ExperimentPreviewProps> = ({
  experiment,
  interactive = true,
  className = '',
  isDetail = false,
}) => {
  // Dispatcher based on experiment type or specific experiment id
  switch (experiment.type) {
    case 'three':
      return (
        <ThreePreview
          interactive={interactive}
          className={className}
          isDetail={isDetail}
        />
      );

    case 'webgl':
      return (
        <WebGLPreview
          interactive={interactive}
          className={className}
          isDetail={isDetail}
        />
      );

    case 'shader':
      return (
        <ShaderPreview
          interactive={interactive}
          className={className}
          isDetail={isDetail}
        />
      );

    case 'ai':
      return (
        <AIExperimentPreview
          interactive={interactive}
          className={className}
          isDetail={isDetail}
        />
      );

    case 'motion':
      return (
        <KineticTypePreview
          interactive={interactive}
          className={className}
          isDetail={isDetail}
        />
      );

    case 'creative-code':
      return (
        <CreativeCodePreview
          interactive={interactive}
          className={className}
          isDetail={isDetail}
        />
      );

    default:
      // Fallback placeholder with Swiss graphic styling
      return (
        <div
          className={`relative w-full h-full min-h-[220px] bg-[#F2F2F2] flex flex-col items-center justify-center p-6 border-b-2 border-black ${className}`}
        >
          <span className="w-3 h-3 bg-[#FF3000] mb-2" />
          <span className="font-mono text-xs font-bold text-black uppercase tracking-widest">
            {experiment.title}
          </span>
          <span className="text-[10px] font-mono text-neutral-500 mt-1 uppercase">
            LIVE ARTIFACT COMING SOON
          </span>
        </div>
      );
  }
};
