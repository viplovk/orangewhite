import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProfileSpecs } from './components/ProfileSpecs';
import { ProjectsSection } from './components/ProjectsSection';
import { Experiments } from './components/experiments/Experiments';
import { GithubTerminal } from './components/GithubTerminal';
import { AcademicsSection } from './components/AcademicsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DesignStudioModal } from './components/DesignStudioModal';
import { ThemeSwitcherBar } from './components/ThemeSwitcherBar';
import { CustomCursor, CursorMode } from './components/CustomCursor';
import { SystemLoader } from './components/SystemLoader';
import { ThemeFadeThrough } from './components/ThemeFadeThrough';
import { DesignTheme } from './data/designThemes';
import { sound } from './lib/sound';
import {
  ThemeState,
  getInitialTheme,
  applyThemeToDOM,
} from './lib/themeManager';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isBootLoaded, setIsBootLoaded] = useState<boolean>(false);

  // Atomic Theme State: current theme and active transition lock
  const [themeState, setThemeState] = useState<ThemeState>(() => ({
    current: getInitialTheme(),
    transition: null,
  }));
  const activeThemeId = themeState.current;

  const [isDesignStudioOpen, setIsDesignStudioOpen] = useState(false);

  // Initial synchronous application of theme classes to document.body
  useLayoutEffect(() => {
    applyThemeToDOM(themeState.current);
  }, []);

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

  // Scroll listener to update active section indicator
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'profile', 'projects', 'experiments', 'github', 'academics', 'contact'];
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

  // Atomic state guard: Initiates theme transition if not already transitioning
  const handleSelectTheme = useCallback((targetThemeId: DesignTheme['id']) => {
    setThemeState((prev) => {
      if (prev.transition !== null || prev.current === targetThemeId) {
        return prev;
      }
      return {
        current: prev.current,
        transition: {
          from: prev.current,
          to: targetThemeId,
        },
      };
    });
  }, []);

  // Strictly sequential execution: Invoked when viewport curtain is 100% opaque
  const handleCovered = useCallback((toThemeId: DesignTheme['id']) => {
    // 1. Strictly sequential class application to body & reflow
    applyThemeToDOM(toThemeId);

    // 2. Tactile audio feedback
    try {
      sound.playModeSwitch();
    } catch {
      // ignore
    }

    // 3. Atomically update current theme while transition is active
    setThemeState((prev) => ({
      current: toThemeId,
      transition: prev.transition,
    }));
  }, []);

  // Invoked when curtain reveal completes: Releases the transition lock atomically
  const handleTransitionCompleted = useCallback(() => {
    setThemeState((prev) => ({
      current: prev.current,
      transition: null,
    }));
  }, []);

  // Safety watchdog: Guarantees lock release and DOM synchronization if browser tab sleeps
  useEffect(() => {
    if (!themeState.transition) return;
    const watchdog = setTimeout(() => {
      applyThemeToDOM(themeState.transition.to);
      setThemeState((prev) => ({
        current: prev.transition ? prev.transition.to : prev.current,
        transition: null,
      }));
    }, 700);
    return () => clearTimeout(watchdog);
  }, [themeState.transition]);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#FF3000] selection:text-white flex flex-col transition-colors duration-200">
      {/* 1-Second Cinematic System Loader */}
      {!isBootLoaded && (
        <SystemLoader onComplete={() => setIsBootLoaded(true)} />
      )}

      {/* Swiss International Typographic Fade-Through Theme Transition Overlay */}
      <ThemeFadeThrough
        transition={themeState.transition}
        onCovered={handleCovered}
        onCompleted={handleTransitionCompleted}
      />

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
          <Experiments />
          <div id="github">
            <GithubTerminal />
          </div>
          <AcademicsSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Floating Theme & System Controller Bar */}
      <ThemeSwitcherBar
        activeThemeId={activeThemeId}
        onSelectTheme={handleSelectTheme}
        onOpenDesignStudio={() => setIsDesignStudioOpen(true)}
        cursorEnabled={cursorEnabled}
        cursorMode={cursorMode}
        onToggleCursor={handleToggleCursor}
        onCycleCursorMode={handleCycleCursorMode}
      />

      {/* Inverted Optical Custom Cursor with Magnetic Tracking */}
      <CustomCursor
        enabled={cursorEnabled}
        mode={cursorMode}
        onToggleEnabled={handleToggleCursor}
        onCycleMode={handleCycleCursorMode}
      />

      {/* Design Studio Showroom Modal */}
      <DesignStudioModal
        isOpen={isDesignStudioOpen}
        onClose={() => setIsDesignStudioOpen(false)}
        activeThemeId={activeThemeId}
        onSelectTheme={handleSelectTheme}
      />
    </div>
  );
}
