import React, { useState } from 'react';
import { 
  X, Check, Sparkles, Sliders, ArrowRight, Eye, RefreshCw, 
  Palette, Terminal, Layers, BookOpen, Zap, Compass
} from 'lucide-react';
import { motion } from 'motion/react';
import { DESIGN_THEMES, DesignTheme } from '../data/designThemes';

interface DesignStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeThemeId: string;
  onSelectTheme: (themeId: DesignTheme['id']) => void;
}

export const DesignStudioModal: React.FC<DesignStudioModalProps> = ({
  isOpen,
  onClose,
  activeThemeId,
  onSelectTheme,
}) => {
  const [selectedView, setSelectedView] = useState<'grid' | 'compare'>('grid');
  const [hoveredThemeId, setHoveredThemeId] = useState<string | null>(null);

  if (!isOpen) return null;

  const activeTheme = DESIGN_THEMES.find((t) => t.id === activeThemeId) || DESIGN_THEMES[0];

  const getThemeIcon = (id: string) => {
    switch (id) {
      case 'swiss':
        return <Compass className="w-5 h-5 text-[#FF3000]" />;
      case 'cyber':
        return <Terminal className="w-5 h-5 text-[#00FF66]" />;
      case 'modern-dark':
        return <Layers className="w-5 h-5 text-[#38BDF8]" />;
      case 'editorial':
        return <BookOpen className="w-5 h-5 text-[#C2410C]" />;
      case 'neo-pop':
        return <Zap className="w-5 h-5 text-[#2563EB]" />;
      default:
        return <Palette className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      id="design-studio-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        id="design-studio-dialog"
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-white text-black border-4 border-black shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b-4 border-black bg-[#F2F2F2]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-black text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#FF3000]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight">
                  DESIGN STUDIO // ARCHITECTURAL OPTIONS
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-black text-white text-[10px] font-mono uppercase font-bold">
                  5 CANONS AVAILABLE
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-600 mt-0.5">
                Select an aesthetic design canon below to instantly restyle Viplov's portfolio in real-time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View toggle */}
            <div className="hidden sm:flex border-2 border-black bg-white text-xs font-mono">
              <button
                onClick={() => setSelectedView('grid')}
                className={`px-3 py-1.5 font-bold uppercase cursor-pointer ${
                  selectedView === 'grid' ? 'bg-black text-white' : 'hover:bg-neutral-100'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setSelectedView('compare')}
                className={`px-3 py-1.5 font-bold uppercase cursor-pointer ${
                  selectedView === 'compare' ? 'bg-black text-white' : 'hover:bg-neutral-100'
                }`}
              >
                Matrix
              </button>
            </div>

            <button
              id="btn-close-design-studio"
              onClick={onClose}
              className="w-10 h-10 border-2 border-black bg-white hover:bg-[#FF3000] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Current Active Indicator Banner */}
        <div className="px-4 sm:px-6 py-2.5 bg-black text-white flex flex-wrap items-center justify-between text-xs font-mono border-b-4 border-black">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
            <span className="text-neutral-400">ACTIVE DESIGN:</span>
            <span className="font-bold text-white uppercase tracking-wider">{activeTheme.name}</span>
            <span className="text-neutral-500">({activeTheme.category})</span>
          </div>
          <span className="text-neutral-400 text-[11px] hidden md:inline">
            CLICK ANY OPTION BELOW TO INSTANTLY MORPH THE UI
          </span>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#FAFAFA] space-y-6">
          {selectedView === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {DESIGN_THEMES.map((theme, idx) => {
                const isActive = theme.id === activeThemeId;
                return (
                  <div
                    key={theme.id}
                    id={`theme-card-${theme.id}`}
                    onMouseEnter={() => setHoveredThemeId(theme.id)}
                    onMouseLeave={() => setHoveredThemeId(null)}
                    onClick={() => onSelectTheme(theme.id)}
                    className={`relative flex flex-col justify-between border-4 transition-all duration-150 cursor-pointer text-left ${
                      isActive
                        ? 'border-black bg-white shadow-[6px_6px_0px_#000000] ring-2 ring-offset-2 ring-black'
                        : 'border-neutral-300 bg-white hover:border-black hover:shadow-[4px_4px_0px_#000000]'
                    }`}
                  >
                    {/* Active Ribbon */}
                    {isActive && (
                      <div className="absolute -top-3 -right-2 bg-black text-white px-3 py-0.5 text-[10px] font-mono font-black uppercase tracking-widest border-2 border-black flex items-center gap-1 shadow-sm">
                        <Check className="w-3 h-3 text-[#00FF66]" />
                        <span>ACTIVE NOW</span>
                      </div>
                    )}

                    {/* Card Top: Number & Category */}
                    <div className="p-4 border-b-2 border-neutral-200 flex items-center justify-between bg-neutral-50">
                      <div className="flex items-center gap-2">
                        {getThemeIcon(theme.id)}
                        <span className="font-mono text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                          OPT 0{idx + 1} // {theme.id.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 border border-neutral-300 bg-white text-neutral-700 uppercase">
                        {theme.category}
                      </span>
                    </div>

                    {/* Theme Header & Tagline */}
                    <div className="p-4 pb-3 flex-1">
                      <h3 className="text-lg font-black uppercase tracking-tight mb-1 text-black">
                        {theme.name}
                      </h3>
                      <p className="text-xs font-mono text-neutral-600 mb-3 line-clamp-2">
                        {theme.tagline}
                      </p>

                      {/* Mini Live Preview Sandbox Box */}
                      <div
                        className="p-3 border-2 mb-3 text-xs"
                        style={{
                          backgroundColor: theme.colors.bg,
                          color: theme.colors.text,
                          borderColor: theme.colors.border,
                        }}
                      >
                        <div className="flex items-center justify-between mb-2 pb-1.5 border-b" style={{ borderColor: theme.colors.border }}>
                          <span className="font-bold text-[11px] tracking-wider uppercase">
                            SAMPLE INTERFACE
                          </span>
                          <span
                            className="text-[9px] px-1.5 py-0.5 font-mono uppercase font-bold"
                            style={{
                              backgroundColor: theme.colors.accent,
                              color: theme.id === 'cyber' ? '#000000' : '#FFFFFF',
                            }}
                          >
                            7.95 SGPA
                          </span>
                        </div>
                        <p className="text-[11px] leading-snug mb-2" style={{ color: theme.colors.textMuted }}>
                          "Objectivity over subjectivity. The grid is the skeleton of information."
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="px-2.5 py-1 text-[10px] font-bold uppercase"
                            style={{
                              backgroundColor: theme.colors.accent,
                              color: theme.id === 'cyber' ? '#000000' : '#FFFFFF',
                            }}
                          >
                            VIEW REPO
                          </button>
                          <span className="text-[10px] font-mono" style={{ color: theme.colors.text }}>
                            C++ / TS / IEC-CET
                          </span>
                        </div>
                      </div>

                      {/* Color Palette Swatches */}
                      <div className="space-y-1.5 mb-3">
                        <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">
                          PALETTE SPECIFICATION
                        </span>
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-5 h-5 border border-black/30 rounded-sm title"
                            style={{ backgroundColor: theme.colors.bg }}
                            title={`Background: ${theme.colors.bg}`}
                          />
                          <div
                            className="w-5 h-5 border border-black/30 rounded-sm"
                            style={{ backgroundColor: theme.colors.surface }}
                            title={`Surface: ${theme.colors.surface}`}
                          />
                          <div
                            className="w-5 h-5 border border-black/30 rounded-sm"
                            style={{ backgroundColor: theme.colors.card }}
                            title={`Card: ${theme.colors.card}`}
                          />
                          <div
                            className="w-5 h-5 border border-black/30 rounded-sm"
                            style={{ backgroundColor: theme.colors.accent }}
                            title={`Accent: ${theme.colors.accent}`}
                          />
                          <div
                            className="w-5 h-5 border border-black/30 rounded-sm"
                            style={{ backgroundColor: theme.colors.text }}
                            title={`Text: ${theme.colors.text}`}
                          />
                          <div
                            className="w-5 h-5 border border-black/30 rounded-sm"
                            style={{ backgroundColor: theme.colors.border }}
                            title={`Border: ${theme.colors.border}`}
                          />
                        </div>
                      </div>

                      {/* Typography Specs */}
                      <div className="text-[11px] font-mono text-neutral-700 bg-neutral-100 p-2.5 border border-neutral-200 space-y-1">
                        <div>
                          <span className="font-bold text-neutral-500">TYPE: </span>
                          <span className="font-semibold text-black">{theme.typography.display}</span>
                        </div>
                        <div>
                          <span className="font-bold text-neutral-500">ACCENT: </span>
                          <span className="font-bold" style={{ color: theme.colors.accent }}>
                            {theme.colors.accent}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button Footer */}
                    <div className="p-3 border-t-2 border-neutral-200 bg-neutral-50">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTheme(theme.id);
                        }}
                        className={`w-full py-2 px-3 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                          isActive
                            ? 'bg-black text-white'
                            : 'bg-white text-black border-2 border-black hover:bg-black hover:text-white'
                        }`}
                      >
                        {isActive ? (
                          <>
                            <Check className="w-4 h-4 text-[#00FF66]" />
                            <span>CURRENT DESIGN CANON</span>
                          </>
                        ) : (
                          <>
                            <span>SWITCH TO THIS DESIGN</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Comparison Matrix View */
            <div className="border-4 border-black bg-white overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-black text-white border-b-4 border-black">
                    <th className="p-3 uppercase tracking-wider">CANON OPTION</th>
                    <th className="p-3 uppercase tracking-wider">AESTHETIC ARCHETYPE</th>
                    <th className="p-3 uppercase tracking-wider">PRIMARY ACCENT</th>
                    <th className="p-3 uppercase tracking-wider">TYPOGRAPHY</th>
                    <th className="p-3 uppercase tracking-wider">GEOMETRY & RADIUS</th>
                    <th className="p-3 uppercase tracking-wider">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-neutral-200">
                  {DESIGN_THEMES.map((theme) => {
                    const isActive = theme.id === activeThemeId;
                    return (
                      <tr
                        key={theme.id}
                        className={`hover:bg-neutral-50 transition-colors ${
                          isActive ? 'bg-neutral-100 font-bold' : ''
                        }`}
                      >
                        <td className="p-3 font-black flex items-center gap-2">
                          <span
                            className="w-3 h-3 inline-block"
                            style={{ backgroundColor: theme.colors.accent }}
                          />
                          <span>{theme.name}</span>
                          {isActive && (
                            <span className="text-[9px] bg-black text-white px-1.5 py-0.2 uppercase">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-neutral-700">{theme.category}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="w-4 h-4 rounded-sm border border-black/20"
                              style={{ backgroundColor: theme.colors.accent }}
                            />
                            <span>{theme.colors.accent}</span>
                          </div>
                        </td>
                        <td className="p-3 text-neutral-700">{theme.typography.display}</td>
                        <td className="p-3 text-neutral-700">
                          {theme.id === 'swiss'
                            ? '0px radius, 4px black borders'
                            : theme.id === 'cyber'
                            ? '2px radius, 2px borders'
                            : theme.id === 'modern-dark'
                            ? '12px rounded bento, 1px borders'
                            : theme.id === 'editorial'
                            ? '4px radius, 1px stone borders'
                            : '8px radius, 3px borders + 4px shadow'}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => onSelectTheme(theme.id)}
                            className={`px-3 py-1 text-[11px] font-black uppercase tracking-wider border-2 border-black cursor-pointer ${
                              isActive
                                ? 'bg-black text-white'
                                : 'bg-white hover:bg-black hover:text-white'
                            }`}
                          >
                            {isActive ? 'SELECTED' : 'APPLY'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Design Philosophy Note Box */}
          <div className="p-4 border-2 border-black bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#F2F2F2] border border-black text-black">
                <Sliders className="w-5 h-5 text-[#FF3000]" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-black">
                  PORTFOLIO IDENTITY PRESERVATION
                </h4>
                <p className="text-xs font-mono text-neutral-600 mt-0.5 max-w-2xl">
                  Every design option seamlessly renders all your academic milestones (IEC-CET, 7.95 SGPA, BPS Delhi), live repositories (<span className="text-black font-bold">repos</span>, <span className="text-black font-bold">IECCET</span>, <span className="text-black font-bold">calc</span>, <span className="text-black font-bold">beyond</span>), and contact channels.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-black text-white hover:bg-[#FF3000] text-xs font-black uppercase tracking-widest transition-colors cursor-pointer whitespace-nowrap"
            >
              CLOSE & EXPLORE
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
