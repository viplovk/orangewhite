import React, { useState, useEffect } from 'react';
import { Terminal, GitBranch, Star, Clock, ExternalLink, RefreshCw, Check, Code, ShieldCheck } from 'lucide-react';
import { sound } from '../lib/sound';

interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

export const GithubTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'repos' | 'profile' | 'telemetry'>('repos');
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([
    'SYSTEM KERNEL v2.5.0 MOUNTED',
    'CONNECTED TO GITHUB API // HOST: api.github.com/users/viplovk',
    'READY FOR STANDARD INPUT.',
  ]);

  // Fallback initial repos in case of API rate limiting
  const fallbackRepos: GithubRepo[] = [
    {
      name: 'repos',
      description: 'Repository manifest analyzer, directory indexer, and developer telemetry utility.',
      html_url: 'https://github.com/viplovk/repos',
      stargazers_count: 12,
      language: 'TypeScript',
      updated_at: new Date().toISOString(),
      fork: false,
    },
    {
      name: 'IECCET',
      description: 'CSE academic portal, curriculum syllabus blueprint & SGPA/CGPA evaluator for IEC-CET students.',
      html_url: 'https://github.com/viplovk/IECCET',
      stargazers_count: 24,
      language: 'TypeScript',
      updated_at: new Date().toISOString(),
      fork: false,
    },
    {
      name: 'calc',
      description: 'Programmatic high-precision arithmetic syntax evaluator and AST parser.',
      html_url: 'https://github.com/viplovk/calc',
      stargazers_count: 18,
      language: 'TypeScript',
      updated_at: new Date().toISOString(),
      fork: false,
    },
    {
      name: 'beyond',
      description: 'Experimental spatial layout algorithms, dynamic Bauhaus kinetic typography & canvas physics.',
      html_url: 'https://github.com/viplovk/beyond',
      stargazers_count: 31,
      language: 'TypeScript',
      updated_at: new Date().toISOString(),
      fork: false,
    },
  ];

  const fetchGithubData = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.github.com/users/viplovk/repos?sort=updated&per_page=8');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data);
          setCommandHistory((prev) => [
            ...prev,
            `FETCH SUCCESSFUL: ${data.length} REPOSITORIES LOADED FROM VIPLOVK`,
          ]);
          return;
        }
      }
      // Fallback
      setRepos(fallbackRepos);
    } catch {
      setRepos(fallbackRepos);
      setCommandHistory((prev) => [
        ...prev,
        'API RATE LIMIT REACHED // MOUNTED HIGH-SPEED LOCAL CACHE',
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubData();
  }, []);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    sound.playClick();
    const newLogs = [...commandHistory, `$ ${commandInput}`];

    if (cmd === 'clear') {
      setCommandHistory([]);
      setCommandInput('');
      return;
    } else if (cmd === 'repos' || cmd === 'ls') {
      setActiveTab('repos');
      newLogs.push('SWITCHED VIEW: REPOSITORIES');
    } else if (cmd === 'whoami' || cmd === 'profile') {
      setActiveTab('profile');
      newLogs.push('IDENTITY: Viplov // B.Tech CSE (2025–2029) 2nd Year at IEC-CET');
    } else if (cmd === 'telemetry' || cmd === 'status') {
      setActiveTab('telemetry');
      newLogs.push('TELEMETRY MONITOR ACTIVE: PING 24ms // ZERO PACKET LOSS');
    } else if (cmd === 'help') {
      newLogs.push('AVAILABLE COMMANDS: repos, profile, telemetry, clear, contact, date');
    } else if (cmd === 'date') {
      newLogs.push(new Date().toUTCString());
    } else if (cmd === 'contact') {
      newLogs.push('EMAIL: viplov7@icloud.com | GITHUB: github.com/viplovk');
    } else {
      newLogs.push(`COMMAND NOT FOUND: "${cmd}". TYPE 'help' FOR AVAILABLE ROUTINES.`);
    }

    setCommandHistory(newLogs);
    setCommandInput('');
  };

  return (
    <div className="w-full border-t-4 border-black bg-black text-white font-mono">
      {/* Terminal Header Bar */}
      <div className="p-4 sm:px-8 bg-neutral-900 border-b-4 border-black flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF3000]" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs font-bold tracking-widest text-neutral-300 uppercase">
            TERMINAL // GITHUB: VIPLOVK
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-black border border-neutral-700 text-green-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            STATUS: ONLINE
          </span>

          <button
            onClick={() => {
              sound.playClick();
              fetchGithubData();
            }}
            disabled={loading}
            className="p-1.5 bg-black border border-neutral-700 hover:border-[#FF3000] text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Refresh GitHub Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Terminal Viewport Switcher */}
      <div className="flex border-b-2 border-neutral-800 bg-neutral-950 text-xs">
        <button
          onClick={() => {
            setActiveTab('repos');
            sound.playClick();
          }}
          className={`px-6 py-3 font-bold tracking-wider uppercase transition-colors border-r border-neutral-800 cursor-pointer ${
            activeTab === 'repos'
              ? 'bg-black text-[#FF3000] border-b-2 border-b-[#FF3000]'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          &gt; REPOSITORIES ({repos.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('profile');
            sound.playClick();
          }}
          className={`px-6 py-3 font-bold tracking-wider uppercase transition-colors border-r border-neutral-800 cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-black text-[#FF3000] border-b-2 border-b-[#FF3000]'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          &gt; PROFILE DOSSIER
        </button>
        <button
          onClick={() => {
            setActiveTab('telemetry');
            sound.playClick();
          }}
          className={`px-6 py-3 font-bold tracking-wider uppercase transition-colors cursor-pointer ${
            activeTab === 'telemetry'
              ? 'bg-black text-[#FF3000] border-b-2 border-b-[#FF3000]'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          &gt; LOG STREAM
        </button>
      </div>

      {/* Viewport Content */}
      <div className="p-6 sm:p-10 bg-black min-h-[360px]">
        {activeTab === 'repos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                data-cursor-text="OPEN"
                className="p-5 bg-neutral-950 border-2 border-neutral-800 hover:border-[#FF3000] transition-all duration-200 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span className="text-[#FF3000] font-bold flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5" />
                      viplovk/{repo.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      {repo.stargazers_count}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-300 font-sans mb-4 leading-relaxed line-clamp-2">
                    {repo.description || 'Public open-source repository by Viplov.'}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-400">
                  <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 text-white font-bold">
                    {repo.language || 'TypeScript'}
                  </span>
                  <span className="flex items-center gap-1 text-neutral-400 group-hover:text-white transition-colors">
                    <span>VIEW GITHUB</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-neutral-950 p-6 sm:p-8 border-2 border-neutral-800 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <span className="text-neutral-400 font-bold">GITHUB USERNAME</span>
              <span className="text-[#FF3000] font-bold text-sm">@viplovk</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <span className="text-neutral-400 font-bold">ACADEMIC BASE</span>
              <span className="text-white font-bold">IEC College of Eng & Tech (B.Tech CSE 2025–2029)</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <span className="text-neutral-400 font-bold">GEOGRAPHY</span>
              <span className="text-white font-bold">Delhi & Greater Noida, India [28.6139° N, 77.2090° E]</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <span className="text-neutral-400 font-bold">ORGANIZATIONS & FOCUS</span>
              <span className="text-white font-bold">Core Systems, Algorithmic Compilers, Swiss Digital Systems</span>
            </div>
            <div className="pt-2">
              <a
                href="https://github.com/viplovk"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF3000] text-white font-bold text-xs hover:bg-white hover:text-black transition-colors"
              >
                <span>OPEN OFFICIAL PROFILE (GITHUB.COM/VIPLOVK)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {activeTab === 'telemetry' && (
          <div className="bg-neutral-950 p-4 border-2 border-neutral-800 h-64 overflow-y-auto space-y-1.5 text-xs text-neutral-300 font-mono">
            {commandHistory.map((line, idx) => (
              <div key={idx} className={line.startsWith('$') ? 'text-[#FF3000] font-bold' : ''}>
                {line}
              </div>
            ))}
          </div>
        )}

        {/* Command Line Input */}
        <form onSubmit={handleCommandSubmit} className="mt-6 flex items-center gap-3">
          <span className="text-[#FF3000] text-sm font-black">&gt;</span>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="Type 'repos', 'profile', 'telemetry', 'help' or 'clear'..."
            className="flex-1 h-11 bg-neutral-950 border-2 border-neutral-800 px-4 text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF3000]"
          />
          <button
            type="submit"
            className="h-11 px-5 bg-white text-black font-bold text-xs uppercase hover:bg-[#FF3000] hover:text-white transition-colors cursor-pointer"
          >
            EXEC
          </button>
        </form>

        {/* Quick Command Chips */}
        <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-neutral-500">
          <span>QUICK ROUTINES:</span>
          {['repos', 'profile', 'telemetry', 'help', 'contact', 'clear'].map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => {
                setCommandInput(cmd);
                sound.playHover();
              }}
              className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 hover:border-neutral-400 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
