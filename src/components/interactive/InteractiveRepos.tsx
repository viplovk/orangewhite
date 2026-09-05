import React, { useState } from 'react';
import { Search, GitBranch, GitCommit, Star, ExternalLink, Folder, FileCode } from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';

export const InteractiveRepos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRepo, setSelectedRepo] = useState(PROJECTS[0]);

  const filtered = PROJECTS.filter(
    (p) =>
      p.repoName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-full border-4 border-black bg-white font-mono text-xs">
      {/* Header telemetry */}
      <div className="p-4 bg-[#F2F2F2] border-b-4 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#FF3000]" />
          <span className="font-black tracking-widest uppercase text-black">
            REPOS MANIFEST // GITHUB.COM/VIPLOVK
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-neutral-500 uppercase">INDEXED: 4 REPOSITORIES</span>
          <span className="px-2 py-0.5 bg-black text-white text-[10px] font-bold">LIVE API</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-3 border-b-4 border-black flex items-center gap-2 bg-white">
        <Search className="w-4 h-4 text-black" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="FILTER REPOSITORIES (NAME, TECH, KEYWORD)..."
          className="w-full bg-transparent outline-none font-mono text-xs uppercase font-bold placeholder:text-neutral-400"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="px-2 py-0.5 bg-black text-white text-[10px] uppercase font-bold"
          >
            CLEAR
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 divide-y-4 md:divide-y-0 md:divide-x-4 divide-black">
        {/* Repo List */}
        <div className="md:col-span-5 divide-y-2 divide-black max-h-80 overflow-y-auto bg-white">
          {filtered.map((repo) => {
            const isSelected = selectedRepo.id === repo.id;
            return (
              <div
                key={repo.id}
                onClick={() => setSelectedRepo(repo)}
                className={`p-4 cursor-pointer transition-colors duration-100 ${
                  isSelected ? 'bg-black text-white' : 'hover:bg-[#F2F2F2] text-black'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-black text-sm uppercase tracking-tight">
                    {repo.repoName}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 ${
                      isSelected ? 'bg-[#FF3000] text-white' : 'bg-black text-white'
                    }`}
                  >
                    {repo.status}
                  </span>
                </div>
                <div
                  className={`text-[11px] truncate mb-2 font-sans font-medium ${
                    isSelected ? 'text-neutral-300' : 'text-neutral-600'
                  }`}
                >
                  {repo.summary}
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono">
                  <span className="flex items-center gap-1">
                    <GitBranch className="w-3 h-3 text-[#FF3000]" />
                    main
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#FF3000]" />
                    {repo.stats.stars || 10}
                  </span>
                  <span className="opacity-75">{repo.stats.language}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Repo Inspector */}
        <div className="md:col-span-7 p-6 bg-[#F2F2F2] flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] text-[#FF3000] font-bold uppercase tracking-widest block">
                  ACTIVE REPOSITORY
                </span>
                <h4 className="text-xl font-black uppercase tracking-tight text-black">
                  viplovk/{selectedRepo.repoName}
                </h4>
              </div>
              <a
                href={selectedRepo.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 bg-black text-white hover:bg-[#FF3000] transition-colors duration-150 flex items-center gap-1.5 font-bold uppercase text-[10px]"
              >
                <span>OPEN GITHUB</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-xs text-neutral-800 font-sans font-medium mb-4 leading-relaxed">
              {selectedRepo.description}
            </p>

            {/* Architecture Highlights */}
            <div className="mb-4 bg-white border-2 border-black p-3">
              <span className="text-[10px] font-bold text-[#FF3000] uppercase tracking-wider block mb-2">
                STRUCTURAL SPECIFICATION:
              </span>
              <ul className="space-y-1.5 text-[11px] text-neutral-800">
                {selectedRepo.architecture.map((arch, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#FF3000] font-bold">›</span>
                    <span>{arch}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-1.5">
              {selectedRepo.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-white border border-black text-[10px] font-bold uppercase text-black"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-black/20 flex items-center justify-between text-[10px] text-neutral-500">
            <span>LICENSE: {selectedRepo.stats.license}</span>
            <span>COMMITS: {selectedRepo.stats.commits}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
