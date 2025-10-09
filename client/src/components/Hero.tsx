import { Mail, Github, Linkedin, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative px-6 pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 -z-10" />
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="mb-4 text-primary font-semibold text-sm md:text-base uppercase tracking-wide">
          Software Engineer
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-foreground">
          Mihir Srivastava
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 mb-6 font-light">
          Full-Stack Developer specializing in React & Next.js
        </p>
        <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Building scalable, performant web applications with modern technologies. Currently leading API design development at Apiwiz, with experience delivering enterprise solutions for Reliance Jio and other major platforms.
        </p>
        
        <div className="flex gap-4 justify-center mb-12 flex-wrap">
          <Button 
            size="lg"
            onClick={() => onNavigate('contact')}
            className="px-8 shadow-lg"
            data-testid="button-get-in-touch"
          >
            Get In Touch
          </Button>
          <Button 
            size="lg"
            variant="outline"
            asChild
            data-testid="button-view-resume"
          >
            <a href="#">View Resume</a>
          </Button>
        </div>

        <div className="flex gap-4 justify-center">
          <Button variant="outline" size="icon" asChild data-testid="link-email">
            <a href="mailto:mihir190801@gmail.com" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild data-testid="link-github">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild data-testid="link-linkedin">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild data-testid="link-leetcode">
            <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
              <Code className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
