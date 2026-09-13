import React, { useState } from 'react';
import { Cpu, Terminal, Layers, Network, ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';
import { sound } from '../lib/sound';

interface TechNode {
  id: string;
  name: string;
  category: 'SYSTEMS' | 'FRONTEND' | 'BACKEND' | 'THEORY';
  level: string;
  experience: string;
  description: string;
  relatedProjects: { id: string; name: string }[];
  highlightColor?: string;
}

const TECH_NODES: TechNode[] = [
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'FRONTEND',
    level: 'PRIMARY ENGINE',
    experience: 'Daily architectural language',
    description: 'Strict typing, generic abstractions, discriminated unions, and scalable front-end and server pipelines.',
    relatedProjects: [
      { id: 'repos', name: 'REPOS // META-INDEXER' },
      { id: 'calc', name: 'CALC // HIGH-PRECISION' },
      { id: 'beyond', name: 'BEYOND // CANVAS' },
    ],
  },
  {
    id: 'cpp',
    name: 'C / C++',
    category: 'SYSTEMS',
    level: 'CORE DISCIPLINE',
    experience: 'B.Tech academic & systems focus',
    description: 'Manual memory management, pointers, low-level data structures, algorithmic time-complexity optimization.',
    relatedProjects: [
      { id: 'calc', name: 'CALC // SYNTAX EVALUATOR' },
      { id: 'IECCET', name: 'IECCET // CSE CURRICULUM' },
    ],
  },
  {
    id: 'react',
    name: 'React 19 & Vite',
    category: 'FRONTEND',
    level: 'CORE STACK',
    experience: 'Production component development',
    description: 'Declarative component design, custom state machines, custom hooks, performant DOM reconciliation.',
    relatedProjects: [
      { id: 'IECCET', name: 'IECCET // PORTAL' },
      { id: 'repos', name: 'REPOS // META-INDEXER' },
    ],
  },
  {
    id: 'threejs',
    name: 'Three.js / WebGL',
    category: 'FRONTEND',
    level: 'CREATIVE COMPUTING',
    experience: 'Spatial & kinetic graphics',
    description: '3D buffer geometries, custom vertex shaders, camera projection matrices, and 60 FPS animation loops.',
    relatedProjects: [
      { id: 'beyond', name: 'BEYOND // EXPERIMENTAL' },
    ],
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    category: 'THEORY',
    level: 'FOUNDATIONAL',
    experience: 'Intensive coursework & problem-solving',
    description: 'Trees, Graphs, Dynamic Programming, Heaps, and asymptotic complexity analysis (Big-O).',
    relatedProjects: [
      { id: 'calc', name: 'CALC // AST PARSER' },
      { id: 'IECCET', name: 'IECCET // CSE STUDY MODULES' },
    ],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'SYSTEMS',
    level: 'SYSTEMS & SCRIPTING',
    experience: 'Algorithmic prototyping & scripting',
    description: 'Fast algorithmic proofs, data parsing, telemetry automation, and computational math.',
    relatedProjects: [
      { id: 'calc', name: 'CALC // EVALUATOR' },
    ],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'FRONTEND',
    level: 'DESIGN SYSTEMS',
    experience: 'Utility-first Swiss design architectures',
    description: 'International Typographic styling, fluid clamp() typography, zero-bloat CSS compilation, strict grids.',
    relatedProjects: [
      { id: 'IECCET', name: 'IECCET // ACADEMIC' },
      { id: 'repos', name: 'REPOS // META-INDEXER' },
    ],
  },
  {
    id: 'nodejs',
    name: 'Node.js & Express',
    category: 'BACKEND',
    level: 'SERVER RUNTIME',
    experience: 'REST endpoints & build tooling',
    description: 'Asynchronous event loops, RESTful endpoint proxying, file system streams, and containerization.',
    relatedProjects: [
      { id: 'repos', name: 'REPOS // GITHUB PROXY' },
    ],
  },
  {
    id: 'git',
    name: 'Git & GitHub Workflows',
    category: 'BACKEND',
    level: 'VERSION CONTROL',
    experience: 'Daily repo management (viplovk)',
    description: 'Branch topologies, semantic commit hygiene, repository metadata inspection, and GitHub Actions CI.',
    relatedProjects: [
      { id: 'repos', name: 'REPOS // WORKSPACE' },
      { id: 'IECCET', name: 'IECCET // OPEN SOURCE' },
    ],
  },
  {
    id: 'discrete-math',
    name: 'Discrete Mathematics',
    category: 'THEORY',
    level: 'ACADEMIC RIGOR',
    experience: 'IEC-CET CSE curriculum',
    description: 'Boolean algebra, combinatorics, set theory, formal grammars, and predicate logic.',
    relatedProjects: [
      { id: 'calc', name: 'CALC // SHUNTING-YARD' },
      { id: 'IECCET', name: 'IECCET // CURRICULUM' },
    ],
  },
  {
    id: 'canvas',
    name: 'HTML5 Canvas API',
    category: 'FRONTEND',
    level: 'RENDER ENGINES',
    experience: 'Direct 2D pixel manip & physics',
    description: 'Kinetic typography, particle acceleration, vector fields, and high-frequency canvas draw loops.',
    relatedProjects: [
      { id: 'beyond', name: 'BEYOND // CANVAS' },
    ],
  },
  {
    id: 'linux',
    name: 'Linux / POSIX Shell',
    category: 'SYSTEMS',
    level: 'DEVELOPER ENVIRONMENT',
    experience: 'Unix pipelines & terminal workflows',
    description: 'Shell scripting, POSIX process management, filesystem navigation, and Docker build workflows.',
    relatedProjects: [
      { id: 'repos', name: 'REPOS // CLI TOOLING' },
    ],
  },
];

export const TechSystem: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedNode, setSelectedNode] = useState<TechNode>(TECH_NODES[0]);

  const filteredNodes = activeCategory === 'ALL'
    ? TECH_NODES
    : TECH_NODES.filter((n) => n.category === activeCategory);

  const handleNodeClick = (node: TechNode) => {
    setSelectedNode(node);
    sound.playClick();
  };

  const handleNodeHover = (node: TechNode) => {
    sound.playHover();
  };

  return (
    <div className="w-full border-t-4 border-black bg-white">
      {/* Sub-header */}
      <div className="p-6 sm:p-8 border-b-4 border-black bg-[#F2F2F2] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-[#FF3000] uppercase block mb-1">
            NETWORK TOPOLOGY // RELATIONS
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
            INTERACTIVE TECHNOLOGY MATRIX
          </h3>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap border-2 border-black bg-white">
          {(['ALL', 'SYSTEMS', 'FRONTEND', 'BACKEND', 'THEORY'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                sound.playClick();
              }}
              className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase transition-colors duration-150 ${
                activeCategory === cat
                  ? 'bg-black text-white'
                  : 'text-black hover:bg-[#FF3000] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-black">
        {/* Left: Node Cloud Grid (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 bg-white swiss-grid-pattern">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredNodes.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  onMouseEnter={() => handleNodeHover(node)}
                  data-cursor-text="INSPECT"
                  className={`p-4 border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[110px] group ${
                    isSelected
                      ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_#FF3000]'
                      : 'bg-white text-black border-black hover:border-[#FF3000] hover:bg-[#F8F8F8]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${
                      isSelected ? 'text-[#FF3000]' : 'text-neutral-500'
                    }`}>
                      {node.category}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? 'bg-[#FF3000]' : 'bg-black/40 group-hover:bg-[#FF3000]'
                    }`} />
                  </div>

                  <div>
                    <div className="font-mono text-sm sm:text-base font-black uppercase tracking-tight">
                      {node.name}
                    </div>
                    <div className={`text-[10px] font-mono mt-0.5 truncate ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-600'
                    }`}>
                      {node.level}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t-2 border-black/20 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase">
            <span>TOUCH OR CLICK ANY NODE TO EXPAND SYSTEM TELEMETRY</span>
            <span className="text-[#FF3000]">TOTAL NODES: {TECH_NODES.length}</span>
          </div>
        </div>

        {/* Right: Selected Node Detailed Dossier (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-10 bg-[#F9F9F9] flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-[10px] font-mono font-bold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 bg-[#FF3000]" />
              <span>NODE DOSSIER // {selectedNode.id.toUpperCase()}</span>
            </div>

            <h4 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black mb-2">
              {selectedNode.name}
            </h4>

            <div className="inline-block px-2.5 py-0.5 bg-[#FF3000] text-white text-[11px] font-mono font-black uppercase tracking-wider mb-6">
              {selectedNode.level}
            </div>

            <p className="text-sm font-medium text-neutral-800 leading-relaxed font-sans mb-6">
              {selectedNode.description}
            </p>

            {/* Experience Context */}
            <div className="p-4 bg-white border-2 border-black mb-6">
              <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase block mb-1">
                OPERATIONAL CONTEXT
              </span>
              <span className="text-xs font-mono font-bold text-black uppercase">
                {selectedNode.experience}
              </span>
            </div>

            {/* Connected Projects */}
            <div>
              <span className="text-[10px] font-mono font-bold text-black uppercase tracking-widest block mb-2">
                CONNECTED REPOSITORIES & ARTIFACTS ({selectedNode.relatedProjects.length})
              </span>
              <div className="space-y-2">
                {selectedNode.relatedProjects.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 bg-white border-2 border-black flex items-center justify-between font-mono text-xs font-bold text-black uppercase hover:border-[#FF3000] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[#FF3000]">■</span>
                      <span>{p.name}</span>
                    </span>
                    <span className="text-[10px] text-neutral-500">ID: {p.id}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t-2 border-black/20 text-[10px] font-mono text-neutral-500 flex items-center justify-between">
            <span>DISCIPLINE: COMPUTER SCIENCE</span>
            <span className="text-black font-bold">IEC-CET BATCH 2025–2029</span>
          </div>
        </div>
      </div>
    </div>
  );
};
