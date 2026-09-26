import { useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import MagneticCursor from '@/components/MagneticCursor';
import { NavSectionId, portfolioContent } from '@/lib/portfolio-content';

function PortfolioSections() {
  const [activeSection, setActiveSection] = useState<NavSectionId>('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const visibleSections = useMemo(
    () => portfolioContent.navigation.map((item) => item.id),
    [],
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleSections]);

  // Lock brand to dark red system
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
    localStorage.setItem('theme', 'dark');
  }, []);

  return (
    <div className="portfolio-root min-h-screen bg-background text-foreground">
      <MagneticCursor />
      <Navigation
        onNavigate={scrollToSection}
        activeSection={activeSection}
        visibleSections={visibleSections}
        scrollProgress={scrollProgress}
      />
      <main className="relative z-10">
        <Hero onNavigate={scrollToSection} />
        <div className="relative overflow-hidden bg-background">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgb(250_1_1_/_0.12),_transparent_55%)]" />
          <Reveal>
            <About />
          </Reveal>
          <Reveal delay={0.05}>
            <Experience />
          </Reveal>
          <Reveal delay={0.05}>
            <Projects />
          </Reveal>
          <Reveal delay={0.05}>
            <Contact />
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function Portfolio() {
  return (
    <ThemeProvider>
      <PortfolioSections />
    </ThemeProvider>
  );
}
