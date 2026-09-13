import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProfileSpecs } from './components/ProfileSpecs';
import { ProjectsSection } from './components/ProjectsSection';
import { AcademicsSection } from './components/AcademicsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DesignStudioModal } from './components/DesignStudioModal';
import { ThemeSwitcherBar } from './components/ThemeSwitcherBar';
import { CustomCursor, CursorMode } from './components/CustomCursor';
import { DesignTheme } from './data/designThemes';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [activeThemeId, setActiveThemeId] = useState<DesignTheme['id']>(() => {
    try {
      const saved = localStorage.getItem('viplov_portfolio_theme') as DesignTheme['id'];
      if (saved && ['swiss', 'cyber', 'modern-dark', 'editorial', 'neo-pop'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'swiss';
  });
  const [isDesignStudioOpen, setIsDesignStudioOpen] = useState(false);

  // Inverted Custom Cursor State
  const [cursorEnabled, setCursorEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('viplov_cursor_enabled');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const [cursorMode, setCursorMode] = useState<CursorMode>(() => {
    try {
      const saved = localStorage.getItem('viplov_cursor_mode') as CursorMode;
      return saved && ['reticle', 'disc', 'precision'].includes(saved) ? saved : 'reticle';
    } catch {
      return 'reticle';
    }
  });

  const handleToggleCursor = () => {
    setCursorEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('viplov_cursor_enabled', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleCycleCursorMode = () => {
    setCursorMode((prev) => {
      const modes: CursorMode[] = ['reticle', 'disc', 'precision'];
      const next = modes[(modes.indexOf(prev) + 1) % modes.length];
      try {
        localStorage.setItem('viplov_cursor_mode', next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Keyboard shortcut 'C' to cycle cursor modes or toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName) ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }
      if (e.key === 'c' || e.key === 'C') {
        handleCycleCursorMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync theme to document body class and storage
  useEffect(() => {
    try {
      localStorage.setItem('viplov_portfolio_theme', activeThemeId);
    } catch {
      // ignore
    }

    // Remove all previous theme classes
    document.body.classList.remove(
      'theme-swiss', 
      'theme-cyber', 
      'theme-modern-dark', 
      'theme-editorial', 
      'theme-neo-pop'
    );
    // Add current theme class
    document.body.classList.add(`theme-${activeThemeId}`);
  }, [activeThemeId]);

  // Scroll listener to update active section indicator
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'profile', 'projects', 'academics', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId === 'hero' ? 'hero-section' : sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const targetId = sectionId === 'hero' ? 'hero-section' : sectionId;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTheme = (themeId: DesignTheme['id']) => {
    setActiveThemeId(themeId);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#FF3000] selection:text-white flex flex-col transition-colors duration-200">
      {/* Structural Container */}
      <div className="w-full max-w-[1600px] mx-auto border-x-4 border-black min-h-screen flex flex-col bg-white">
        {/* Sticky Header */}
        <Header 
          activeSection={activeSection} 
          onNavigate={scrollToSection}
          activeThemeId={activeThemeId}
          onOpenDesignStudio={() => setIsDesignStudioOpen(true)}
          cursorEnabled={cursorEnabled}
          cursorMode={cursorMode}
          onCycleCursorMode={handleCycleCursorMode}
        />

        {/* Main Content Sections */}
        <main className="flex-1 flex flex-col">
          <Hero
            onExploreProjects={() => scrollToSection('projects')}
            onContactClick={() => scrollToSection('contact')}
          />
          <ProfileSpecs />
          <ProjectsSection />
          <AcademicsSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Floating Theme Controller Pill Bar */}
      <ThemeSwitcherBar
        activeThemeId={activeThemeId}
        onSelectTheme={handleSelectTheme}
        onOpenDesignStudio={() => setIsDesignStudioOpen(true)}
        cursorEnabled={cursorEnabled}
        cursorMode={cursorMode}
        onToggleCursor={handleToggleCursor}
        onCycleCursorMode={handleCycleCursorMode}
      />

      {/* Unique Inverted Optical Custom Cursor */}
      <CustomCursor
        enabled={cursorEnabled}
        mode={cursorMode}
        onToggleEnabled={handleToggleCursor}
        onCycleMode={handleCycleCursorMode}
      />

      {/* Comprehensive Design Studio Showroom Modal */}
      <DesignStudioModal
        isOpen={isDesignStudioOpen}
        onClose={() => setIsDesignStudioOpen(false)}
        activeThemeId={activeThemeId}
        onSelectTheme={handleSelectTheme}
      />
    </div>
  );
}
