import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ArrowUpRight, Code, Layers, Filter, Terminal } from 'lucide-react';
import { ProjectModal } from './ProjectModal';
import { ProjectArtifactCard } from './ProjectArtifactCard';
import { sound } from '../lib/sound';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const categories = ['ALL', 'DEVELOPER TOOLING & TELEMETRY', 'INSTITUTIONAL PLATFORM', 'MATHEMATICAL COMPUTING', 'CREATIVE COMPUTING & UI'];

  const filteredProjects = filterCategory === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filterCategory);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Scroll-triggered subtle reveal for the section header
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
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

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="w-full border-b-4 border-black bg-white relative"
    >
      {/* Section Header Banner with Live GSAP Scroll Trigger */}
      <div
        ref={headerRef}
        className="border-b-4 border-black bg-[#F2F2F2] p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-[#FF3000] uppercase block mb-1">
            02. CODEBASE & WORKSPACES // ARTIFACT ARCHIVES
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-black">
            FEATURED REPOSITORIES
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white border-2 border-black font-mono text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FF3000] animate-ping" />
            <span>4 PRODUCTION ARTIFACTS</span>
          </div>

          <a
            href="https://github.com/viplovk"
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick()}
            data-cursor-text="OPEN"
            className="h-12 px-6 bg-black text-white hover:bg-[#FF3000] uppercase font-black text-xs tracking-widest flex items-center gap-2 transition-colors duration-150 group cursor-pointer"
          >
            <span>GITHUB: VIPLOVK</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Filter and Telemetry Strip */}
      <div className="p-3 sm:px-8 border-b-4 border-black bg-white flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <span className="text-neutral-500 font-bold uppercase text-[10px]">FILTER:</span>
          {['ALL', 'TOOLING', 'ACADEMIC', 'MATH', 'CANVAS'].map((catLabel, idx) => {
            const fullCat = idx === 0 ? 'ALL' : categories[idx];
            const isSelected = filterCategory === fullCat;
            return (
              <button
                key={catLabel}
                onClick={() => {
                  sound.playClick();
                  setFilterCategory(fullCat);
                }}
                className={`px-2.5 py-1 text-[10px] font-bold uppercase border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-neutral-300 hover:border-black'
                }`}
              >
                {catLabel}
              </button>
            );
          })}
        </div>

        <div className="text-[10px] text-neutral-500 font-bold uppercase flex items-center gap-3">
          <span>3D PERSPECTIVE: ACTIVE</span>
          <span className="text-[#FF3000]">● INTERACTION READY</span>
        </div>
      </div>

      {/* Projects Grid: Asymmetric Responsive Artifact Grid with 3D Tilt */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y-4 md:divide-y-0 divide-black">
        {filteredProjects.map((project, idx) => (
          <ProjectArtifactCard
            key={project.id}
            project={project}
            index={idx}
            onInspect={(p) => setSelectedProject(p)}
          />
        ))}
      </div>

      {/* Interactive Project Inspect Modal with Live Sandbox */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
