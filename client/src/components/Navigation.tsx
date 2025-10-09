import { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';

interface NavigationProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export default function Navigation({ onNavigate, activeSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = ['home', 'about', 'experience', 'projects', 'contact'];

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-background/80 border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-2xl font-bold text-primary hover-elevate active-elevate-2 px-3 py-1 rounded-md transition-all"
            data-testid="link-logo"
          >
            Mihir Srivastava
          </button>
          
          <div className="hidden md:flex gap-2 items-center">
            {navItems.map((item) => (
              <Button
                key={item}
                variant="ghost"
                onClick={() => onNavigate(item)}
                className={`capitalize ${activeSection === item ? 'text-primary' : 'text-muted-foreground'}`}
                data-testid={`link-nav-${item}`}
              >
                {item}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle-mobile"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-menu-toggle"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Button
                key={item}
                variant="ghost"
                onClick={() => {
                  onNavigate(item);
                  setIsMenuOpen(false);
                }}
                className={`capitalize justify-start ${activeSection === item ? 'text-primary' : 'text-muted-foreground'}`}
                data-testid={`link-nav-mobile-${item}`}
              >
                {item}
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
