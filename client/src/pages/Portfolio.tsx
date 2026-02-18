import { useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import CustomizerPanel from '@/components/CustomizerPanel';
import { UiCustomizerProvider, useUiCustomizer } from '@/components/UiCustomizerProvider';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { NavSectionId, portfolioContent } from '@/lib/portfolio-content';

function PortfolioSections() {
  const [activeSection, setActiveSection] = useState<NavSectionId>('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const {
    preferences: { sectionVisibility },
  } = useUiCustomizer();
  const isSectionVisible = (section: NavSectionId) => {
    if (section === 'home') {
      return true;
    }
    return sectionVisibility[section];
  };
  const visibleSections = useMemo(
    () => portfolioContent.navigation.filter((item) => isSectionVisible(item.id)).map((item) => item.id),
    [sectionVisibility],
  );

  const scrollToSection = (id: NavSectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        totalScrollableHeight > 0
          ? Math.min(100, Math.max(0, (window.scrollY / totalScrollableHeight) * 100))
          : 0;
      setScrollProgress(progress);

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of visibleSections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleSections]);

  useEffect(() => {
    if (!isSectionVisible(activeSection)) {
      setActiveSection('home');
    }
  }, [activeSection, sectionVisibility]);

  return (
    <div className="portfolio-root min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="ui-gradient-backdrop pointer-events-none fixed inset-0 -z-20" />
      <div className="ui-grid-backdrop pointer-events-none fixed inset-0 -z-10" />

      <Navigation
        onNavigate={scrollToSection}
        activeSection={activeSection}
        visibleSections={visibleSections}
        scrollProgress={scrollProgress}
      />
      <main className="relative z-10">
        <Hero onNavigate={scrollToSection} />
        {sectionVisibility.about && <About />}
        {sectionVisibility.experience && <Experience />}
        {sectionVisibility.projects && <Projects />}
        {sectionVisibility.contact && <Contact />}
      </main>
      <Footer />
      <CustomizerPanel />
    </div>
  );
}

export default function Portfolio() {
  return (
    <ThemeProvider>
      <UiCustomizerProvider>
        <div className="min-h-screen">
          <PortfolioSections />
        </div>
      </UiCustomizerProvider>
    </ThemeProvider>
  );
}
