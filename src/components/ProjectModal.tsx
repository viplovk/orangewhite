import React, { useEffect } from 'react';
import { Project } from '../types';
import { X, ExternalLink, GitBranch, GitCommit, Star, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { InteractiveCalc } from './interactive/InteractiveCalc';
import { InteractiveRepos } from './interactive/InteractiveRepos';
import { InteractiveIECCET } from './interactive/InteractiveIECCET';
import { InteractiveBeyond } from './interactive/InteractiveBeyond';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const renderInteractivePreview = () => {
    switch (project.previewType) {
      case 'calculator':
        return <InteractiveCalc />;
      case 'repos_indexer':
        return <InteractiveRepos />;
      case 'academic_hub':
        return <InteractiveIECCET />;
      case 'interactive_canvas':
        return <InteractiveBeyond />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      id="project-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs"
      onClick={onClose}
    >
      <motion.div
        id="project-modal-dialog"
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white border-4 border-black overflow-y-auto flex flex-col shadow-2xl font-sans"
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 sm:px-6 bg-black text-white border-b-4 border-black">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-[#FF3000]" />
            <span className="text-xs sm:text-sm font-mono font-black uppercase tracking-widest">
              REPOSITORY INSPECTION // viplovk/{project.repoName}
            </span>
          </div>
          <button
            id="modal-close-btn"
            onClick={onClose}
            className="p-1.5 bg-white text-black hover:bg-[#FF3000] hover:text-white transition-colors duration-150 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Title & Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-4 border-black">
            <div>
              <span className="text-xs font-mono font-bold text-[#FF3000] tracking-widest uppercase block mb-1">
                {project.category} // YEAR {project.year}
              </span>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
                {project.name}
              </h3>
            </div>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="h-12 px-6 bg-black text-white hover:bg-[#FF3000] uppercase font-black text-xs tracking-widest flex items-center justify-center gap-2 transition-colors duration-150 self-start sm:self-center"
            >
              <span>VIEW SOURCE CODE</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Interactive Live Sandbox Preview */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-black uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF3000] animate-ping" />
                LIVE DEMO ENVIRONMENT
              </span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase">
                INTERACTIVE PREVIEW
              </span>
            </div>
            <div className="bg-[#F2F2F2] p-2 sm:p-4 border-4 border-black">
              {renderInteractivePreview()}
            </div>
          </div>

          {/* Architecture & Engineering Details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
            <div className="md:col-span-7 space-y-4">
              <h4 className="text-xs font-mono font-black text-black uppercase tracking-widest border-b-2 border-black pb-1">
                ARCHITECTURE SPECIFICATION
              </h4>
              <p className="text-sm font-medium text-neutral-800 leading-relaxed font-sans">
                {project.description}
              </p>
              <div className="bg-[#F2F2F2] border-2 border-black p-4 space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#FF3000] uppercase tracking-wider block">
                  SYSTEM GUARANTEES:
                </span>
                <ul className="space-y-1.5 text-xs text-neutral-800 font-sans">
                  {project.architecture.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#FF3000] font-black font-mono">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-5 space-y-4">
              <h4 className="text-xs font-mono font-black text-black uppercase tracking-widest border-b-2 border-black pb-1">
                TECHNICAL TELEMETRY
              </h4>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 bg-[#F2F2F2] border-2 border-black flex items-center justify-between">
                  <span className="text-neutral-500">AUTHOR</span>
                  <span className="font-bold text-black">VIPLOV (viplovk)</span>
                </div>
                <div className="p-2.5 bg-[#F2F2F2] border-2 border-black flex items-center justify-between">
                  <span className="text-neutral-500">LICENSE</span>
                  <span className="font-bold text-black">{project.stats.license}</span>
                </div>
                <div className="p-2.5 bg-[#F2F2F2] border-2 border-black flex items-center justify-between">
                  <span className="text-neutral-500">ACTIVITY</span>
                  <span className="font-bold text-black">{project.stats.commits}</span>
                </div>
                <div className="p-2.5 bg-[#F2F2F2] border-2 border-black flex items-center justify-between">
                  <span className="text-neutral-500">PRIMARY LANG</span>
                  <span className="font-bold text-[#FF3000]">{project.stats.language}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold text-black uppercase tracking-widest block mb-2">
                  TECHNOLOGY TOKENS:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-black text-white font-mono text-[10px] font-bold uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#F2F2F2] border-t-4 border-black flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-600 uppercase">
            SWISS INTERNATIONAL TYPOGRAPHIC ARCHIVE
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-black text-white hover:bg-[#FF3000] uppercase font-bold text-xs"
          >
            DISMISS [ESC]
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
