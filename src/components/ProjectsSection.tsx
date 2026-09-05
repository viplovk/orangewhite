import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ArrowUpRight, Code, ExternalLink, Play, Plus } from 'lucide-react';
import { ProjectModal } from './ProjectModal';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeInlinePreview, setActiveInlinePreview] = useState<string>('calc');

  return (
    <section
      id="projects"
      className="w-full border-b-4 border-black bg-white relative"
    >
      {/* Section Header Banner */}
      <div className="border-b-4 border-black bg-[#F2F2F2] p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-[#FF3000] uppercase block mb-1">
            02. CODEBASE & WORKSPACES
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-black">
            FEATURED REPOSITORIES
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/viplovk"
            target="_blank"
            rel="noreferrer"
            className="h-12 px-6 bg-black text-white hover:bg-[#FF3000] uppercase font-black text-xs tracking-widest flex items-center gap-2 transition-colors duration-150 group"
          >
            <span>ALL REPOSITORIES (GITHUB)</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Projects Grid: 2x2 asymmetric responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y-4 md:divide-y-0 divide-black">
        {PROJECTS.map((project, idx) => (
          <div
            key={project.id}
            id={`project-card-${project.id}`}
            className={`p-6 sm:p-10 md:p-12 flex flex-col justify-between transition-all duration-300 relative group bg-white hover:bg-[#F8F8F8] hover:shadow-inner ${
              idx % 2 === 0 ? 'md:border-r-4 md:border-black' : ''
            } ${idx >= 2 ? 'md:border-t-4 md:border-black' : ''}`}
          >
            {/* Top metadata row */}
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-black/20">
                <span className="text-xs font-mono font-bold text-[#FF3000] tracking-widest">
                  INDEX // 0{idx + 1}
                </span>
                <span className="px-2 py-0.5 bg-black text-white text-[10px] font-mono font-bold tracking-widest uppercase group-hover:bg-[#FF3000] transition-colors duration-200">
                  {project.status}
                </span>
              </div>

              {/* Repo identifier */}
              <div className="font-mono text-xs font-bold text-neutral-500 uppercase mb-2 transition-colors duration-200 group-hover:text-black">
                viplovk/{project.repoName}
              </div>

              {/* Headline */}
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black mb-3 group-hover:text-[#FF3000] transition-colors duration-200">
                {project.name}
              </h3>

              {/* Summary */}
              <p className="text-sm font-medium text-neutral-700 leading-relaxed font-sans mb-6">
                {project.summary}
              </p>

              {/* Tech stack badges */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-white border border-black text-[10px] font-mono font-bold uppercase text-black transition-all duration-150 hover:bg-black hover:text-white hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t-2 border-black/20 flex flex-col sm:flex-row items-stretch gap-3">
              <button
                id={`btn-inspect-${project.id}`}
                onClick={() => setSelectedProject(project)}
                className="flex-1 h-12 px-4 bg-black text-white text-xs font-black tracking-widest uppercase hover:bg-[#FF3000] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group/btn shadow-xs hover:shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current transition-transform duration-200 group-hover/btn:scale-110" />
                <span>INSPECT & DEMO</span>
              </button>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="h-12 px-5 bg-white border-2 border-black text-black hover:bg-black hover:text-white uppercase font-black text-xs tracking-widest flex items-center justify-center gap-1.5 transition-all duration-200 shadow-xs hover:shadow-sm"
              >
                <span>GITHUB</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Direct Interactive Showcase Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
