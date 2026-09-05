import React, { useState } from 'react';
import { ArrowUpRight, Menu, X, Sparkles, Palette } from 'lucide-react';
import { DESIGN_THEMES } from '../data/designThemes';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  activeThemeId?: string;
  onOpenDesignStudio?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeSection, 
  onNavigate,
  activeThemeId = 'swiss',
  onOpenDesignStudio,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentTheme = DESIGN_THEMES.find((t) => t.id === activeThemeId) || DESIGN_THEMES[0];

  const navItems = [
    { id: 'profile', label: '01. SPECIFICATION' },
    { id: 'projects', label: '02. REPOSITORIES' },
    { id: 'academics', label: '03. ACADEMICS' },
    { id: 'contact', label: '04. TELEMETRY' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 w-full bg-white border-b-4 border-black selection:bg-[#FF3000] selection:text-white"
    >
      <div className="flex items-stretch justify-between h-16 sm:h-20">
        {/* Brand identity block */}
        <div
          id="brand-logo"
          onClick={() => handleNavClick('hero')}
          className="flex items-center px-4 sm:px-8 border-r-4 border-black cursor-pointer bg-white hover:bg-black hover:text-white transition-colors duration-150 select-none group"
        >
          <span className="w-3 h-3 bg-[#FF3000] mr-3 inline-block group-hover:rotate-90 transition-transform duration-200" />
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase leading-none">
              VIPLOV
            </span>
            <span className="text-[10px] font-bold tracking-widest text-[#FF3000] uppercase mt-0.5">
              CSE // IN // 19Y
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-stretch flex-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex-1 flex items-center justify-center px-4 border-r-4 border-black text-xs font-black tracking-widest uppercase transition-all duration-150 relative overflow-hidden group ${
                  isActive
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-[#FF3000] hover:text-white'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-1 right-2 w-1.5 h-1.5 bg-[#FF3000]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button, Design Studio Trigger & Telemetry indicator */}
        <div className="hidden sm:flex items-stretch">
          {onOpenDesignStudio && (
            <button
              id="header-btn-design-studio"
              onClick={onOpenDesignStudio}
              className="flex items-center gap-2 px-3 sm:px-4 border-r-4 border-black bg-white hover:bg-black hover:text-white transition-colors duration-150 cursor-pointer text-xs font-mono font-bold tracking-wider uppercase group"
              title="Explore Design Options"
            >
              <span
                className="w-2.5 h-2.5 inline-block group-hover:scale-125 transition-transform"
                style={{ backgroundColor: currentTheme.colors.accent }}
              />
              <span className="hidden md:inline">DESIGN:</span>
              <span>{currentTheme.name.split(' ')[0]}</span>
              <span className="text-[10px] text-[#FF3000] font-black group-hover:text-white">▾</span>
            </button>
          )}

          <div className="flex items-center px-4 border-r-4 border-black bg-[#F2F2F2] text-[11px] font-mono font-bold tracking-tight">
            <span className="inline-block w-2 h-2 bg-[#FF3000] mr-2 animate-pulse" />
            <span className="uppercase text-black">ONLINE // DEL</span>
          </div>
          <button
            id="header-cta-contact"
            onClick={() => handleNavClick('contact')}
            className="flex items-center gap-2 px-6 bg-black text-white text-xs font-black tracking-widest uppercase hover:bg-[#FF3000] transition-colors duration-150 cursor-pointer"
          >
            <span>CONNECT</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-stretch">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center w-16 sm:w-20 border-l-4 border-black bg-white hover:bg-black hover:text-white transition-colors duration-150"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="lg:hidden border-t-4 border-black bg-white divide-y-4 divide-black"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className="w-full text-left py-4 px-6 text-sm font-black tracking-widest uppercase hover:bg-[#FF3000] hover:text-white transition-colors duration-150 flex items-center justify-between"
            >
              <span>{item.label}</span>
              <span className="text-[#FF3000] group-hover:text-white font-mono text-xs">→</span>
            </button>
          ))}
          {onOpenDesignStudio && (
            <button
              id="mobile-nav-design-studio"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDesignStudio();
              }}
              className="w-full text-left py-4 px-6 text-sm font-black tracking-widest uppercase bg-black text-white hover:bg-[#FF3000] transition-colors duration-150 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00FF66]" />
                <span>DESIGN OPTIONS (5 CANONS)</span>
              </div>
              <span className="text-xs font-mono text-[#00FF66]">[OPEN]</span>
            </button>
          )}
          <div className="p-4 bg-[#F2F2F2] flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-black uppercase">DELHI // GREATER NOIDA</span>
            <span className="text-[#FF3000]">B.TECH CSE</span>
          </div>
        </div>
      )}
    </header>
  );
};
