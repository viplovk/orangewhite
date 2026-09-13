import React, { useRef, useState } from 'react';
import { Project } from '../types';
import { ArrowUpRight, ExternalLink, Play, Layers, GitBranch, Star, Terminal } from 'lucide-react';
import { sound } from '../lib/sound';

interface ProjectArtifactCardProps {
  project: Project;
  index: number;
  onInspect: (project: Project) => void;
}

export const ProjectArtifactCard: React.FC<ProjectArtifactCardProps> = ({
  project,
  index,
  onInspect,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // 3D perspective tilt limits (-6deg to +6deg)
    const rX = ((y - centerY) / centerY) * -5;
    const rY = ((x - centerX) / centerX) * 5;

    setRotateX(rX);
    setRotateY(rY);
    setSpotlightPos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      id={`project-artifact-${project.id}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-text="VIEW"
      style={{
        perspective: '1200px',
      }}
      className={`p-6 sm:p-8 md:p-10 flex flex-col justify-between transition-all duration-200 relative group bg-white hover:bg-[#FAF9F6] ${
        index % 2 === 0 ? 'md:border-r-4 md:border-black' : ''
      } ${index >= 2 ? 'md:border-t-4 md:border-black' : ''}`}
    >
      {/* 21st.dev Style Radial Spotlight Effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(255, 48, 0, 0.07), transparent 80%)`,
        }}
      />

      {/* 3D Internal Layer Container */}
      <div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${isHovered ? 8 : 0}px)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="w-full flex-1 flex flex-col justify-between"
      >
        {/* Top Metadata Header */}
        <div>
          <div className="flex items-center justify-between pb-3 mb-5 border-b-2 border-black/20 text-xs font-mono font-bold tracking-widest">
            <span className="text-[#FF3000]">
              ARTIFACT // 0{index + 1}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 font-mono text-[10px] uppercase">
                {project.year}
              </span>
              <span className="px-2 py-0.5 bg-black text-white text-[9px] font-mono uppercase tracking-wider group-hover:bg-[#FF3000] transition-colors duration-200">
                {project.status}
              </span>
            </div>
          </div>

          {/* Repo Tag & Category */}
          <div className="flex items-center justify-between mb-2">
            <div className="font-mono text-xs font-bold text-neutral-500 group-hover:text-black flex items-center gap-1.5 transition-colors duration-150">
              <GitBranch className="w-3.5 h-3.5 text-[#FF3000]" />
              <span>viplovk/{project.repoName}</span>
            </div>
            <span className="text-[10px] font-mono uppercase text-neutral-400">
              {project.category}
            </span>
          </div>

          {/* Large Title */}
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black mb-3 group-hover:text-[#FF3000] transition-colors duration-200">
            {project.name}
          </h3>

          {/* Summary */}
          <p className="text-sm font-medium text-neutral-700 leading-relaxed font-sans mb-5">
            {project.summary}
          </p>

          {/* Schematic Graphic / Wireframe Mini-Preview */}
          <div className="mb-6 p-4 bg-[#F2F2F2] border-2 border-black/20 group-hover:border-black group-hover:bg-white transition-all duration-200 relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-600 mb-2">
              <span>MANIFEST SPEC: {project.id.toUpperCase()}</span>
              <span className="text-[#FF3000] font-bold">● LIVE SANDBOX READY</span>
            </div>

            <div className="h-16 flex items-center justify-between gap-2 font-mono text-[11px]">
              <div className="flex-1 bg-white border border-neutral-300 p-2 flex flex-col justify-between">
                <span className="text-[9px] text-neutral-400">COMMITS</span>
                <span className="font-black text-black">{project.stats?.commits || '30+'}</span>
              </div>
              <div className="flex-1 bg-white border border-neutral-300 p-2 flex flex-col justify-between">
                <span className="text-[9px] text-neutral-400">LICENSE</span>
                <span className="font-black text-black">{project.stats?.license || 'MIT'}</span>
              </div>
              <div className="flex-1 bg-white border border-neutral-300 p-2 flex flex-col justify-between">
                <span className="text-[9px] text-neutral-400">LANGUAGE</span>
                <span className="font-black text-[#FF3000]">{project.stats?.language || 'TS'}</span>
              </div>
            </div>
          </div>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-white border border-black text-[10px] font-mono font-bold uppercase text-black group-hover:border-[#FF3000] transition-all duration-150"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t-2 border-black/20 flex flex-col sm:flex-row items-stretch gap-2.5">
          <button
            id={`btn-inspect-${project.id}`}
            onClick={() => {
              sound.playClick();
              onInspect(project);
            }}
            data-cursor-text="LAUNCH"
            className="flex-1 h-12 px-4 bg-black text-white text-xs font-black tracking-widest uppercase hover:bg-[#FF3000] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>INSPECT ARTIFACT & DEMO</span>
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick()}
            data-cursor-text="OPEN"
            className="h-12 px-4 bg-white border-2 border-black text-black hover:bg-black hover:text-white uppercase font-black text-xs tracking-widest flex items-center justify-center gap-1.5 transition-all duration-200 shadow-xs hover:shadow-sm"
          >
            <span>GITHUB</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
