import React, { useState } from 'react';
import { Sparkles, ChevronRight, Palette, ChevronLeft, Check, Layers, Crosshair } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DESIGN_THEMES, DesignTheme } from '../data/designThemes';
import { CursorMode } from './CustomCursor';

interface ThemeSwitcherBarProps {
  activeThemeId: DesignTheme['id'];
  onSelectTheme: (themeId: DesignTheme['id']) => void;
  onOpenDesignStudio: () => void;
  cursorEnabled?: boolean;
  cursorMode?: CursorMode;
  onToggleCursor?: () => void;
  onCycleCursorMode?: () => void;
}

export const ThemeSwitcherBar: React.FC<ThemeSwitcherBarProps> = ({
  activeThemeId,
  onSelectTheme,
  onOpenDesignStudio,
  cursorEnabled = true,
  cursorMode = 'reticle',
  onToggleCursor,
  onCycleCursorMode,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const currentThemeIndex = DESIGN_THEMES.findIndex((t) => t.id === activeThemeId);
  const activeTheme = DESIGN_THEMES[currentThemeIndex] || DESIGN_THEMES[0];

  const handleNextTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (currentThemeIndex + 1) % DESIGN_THEMES.length;
    onSelectTheme(DESIGN_THEMES[nextIdx].id);
  };

  const handlePrevTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (currentThemeIndex - 1 + DESIGN_THEMES.length) % DESIGN_THEMES.length;
    onSelectTheme(DESIGN_THEMES[prevIdx].id);
  };

  return (
    <div
      id="floating-theme-switcher"
      className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 font-mono select-none"
    >
      <AnimatePresence mode="wait">
        {collapsed ? (
          <motion.button
            key="collapsed-btn"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => setCollapsed(false)}
            className="flex items-center gap-2 px-3 py-2 bg-black text-white border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.4)] text-xs font-bold uppercase tracking-wider hover:bg-[#FF3000] transition-all cursor-pointer hover:shadow-[4px_4px_0px_rgba(0,0,0,0.5)]"
            title="Open Design Switcher"
          >
            <Palette className="w-4 h-4 text-[#00FF66]" />
            <span>DESIGN ({activeTheme.name.split(' ')[0]})</span>
          </motion.button>
        ) : (
          <motion.div
            key="expanded-bar"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white text-black border-4 border-black shadow-[6px_6px_0px_#000000] p-2 flex flex-col gap-2 max-w-[340px]"
          >
            {/* Top Bar: Title and collapse */}
            <div className="flex items-center justify-between gap-3 px-1 pb-1 border-b-2 border-black/15 text-[10px] font-bold text-neutral-500 uppercase">
              <div className="flex items-center gap-1.5 text-black">
                <span
                  className="w-2.5 h-2.5 inline-block transition-colors duration-200"
                  style={{ backgroundColor: activeTheme.colors.accent }}
                />
                <span className="tracking-wider">DESIGN STUDIO // THEME</span>
              </div>
              <button
                onClick={() => setCollapsed(true)}
                className="hover:text-black text-neutral-400 cursor-pointer text-[11px] transition-colors"
                title="Minimize"
              >
                [MINIMIZE]
              </button>
            </div>

            {/* Active theme display + Quick cycling buttons */}
            <div className="flex items-center justify-between gap-1 bg-[#F5F5F5] p-1.5 border border-black/20">
              <button
                onClick={handlePrevTheme}
                className="p-1 hover:bg-black hover:text-white transition-all cursor-pointer border border-transparent hover:border-black"
                title="Previous design"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div
                onClick={onOpenDesignStudio}
                className="flex-1 text-center cursor-pointer px-2 py-0.5 hover:bg-white transition-all"
                title="Click to open Design Studio showroom"
              >
                <div className="text-xs font-black uppercase tracking-tight text-black flex items-center justify-center gap-1">
                  <span>{activeTheme.name}</span>
                </div>
                <div className="text-[9px] text-neutral-600 truncate uppercase">
                  {activeTheme.category}
                </div>
              </div>

              <button
                onClick={handleNextTheme}
                className="p-1 hover:bg-black hover:text-white transition-all cursor-pointer border border-transparent hover:border-black"
                title="Next design"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick theme pill row */}
            <div className="grid grid-cols-5 gap-1 pt-0.5">
              {DESIGN_THEMES.map((theme) => {
                const isSelected = theme.id === activeThemeId;
                return (
                  <button
                    key={theme.id}
                    onClick={() => onSelectTheme(theme.id)}
                    className={`p-1.5 text-[9px] font-bold uppercase tracking-tight flex flex-col items-center gap-1 border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-black bg-black text-white shadow-xs scale-105'
                        : 'border-neutral-300 bg-white hover:border-black text-neutral-700 hover:scale-102'
                    }`}
                    title={`${theme.name} (${theme.category})`}
                  >
                    <span
                      className="w-3 h-3 rounded-none border border-black/30 transition-colors duration-200"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                    <span className="truncate w-full text-center">
                      {theme.id === 'modern-dark' ? 'DARK' : theme.id.toUpperCase().slice(0, 5)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Inverting Cursor Quick Switcher */}
            <div className="flex items-center justify-between gap-1 p-1 bg-neutral-100 border border-black/15 text-[10px]">
              <div className="flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5 text-black" />
                <span className="font-mono font-bold uppercase text-black">INVERT CURSOR</span>
              </div>
              <div className="flex items-center gap-1">
                {cursorEnabled && onCycleCursorMode && (
                  <button
                    onClick={onCycleCursorMode}
                    className="px-1.5 py-0.5 bg-white hover:bg-black hover:text-white border border-black/30 text-[9px] font-mono font-bold uppercase transition-all cursor-pointer"
                    title="Cycle cursor style (Reticle / Disc / Precision). Hotkey: Press 'C'"
                  >
                    {cursorMode.toUpperCase()}
                  </button>
                )}
                {onToggleCursor && (
                  <button
                    onClick={onToggleCursor}
                    className={`px-1.5 py-0.5 font-mono font-bold text-[9px] uppercase border transition-all cursor-pointer ${
                      cursorEnabled
                        ? 'bg-black text-white border-black hover:bg-[#FF3000]'
                        : 'bg-white text-neutral-500 border-neutral-300 hover:border-black'
                    }`}
                    title={cursorEnabled ? 'Disable custom inverted cursor' : 'Enable custom inverted cursor'}
                  >
                    {cursorEnabled ? 'ACTIVE' : 'OFF'}
                  </button>
                )}
              </div>
            </div>

            {/* Launch full showroom button */}
            <button
              onClick={onOpenDesignStudio}
              className="w-full py-1.5 px-2 bg-black text-white hover:bg-[#FF3000] text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-200 shadow-xs hover:shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00FF66]" />
              <span>OPEN 5 DESIGN SHOWROOM</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
