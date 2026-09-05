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
