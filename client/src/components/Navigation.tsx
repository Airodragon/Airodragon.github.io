import { useState } from 'react';
import { Menu, Moon, Sparkles, Sun, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';
import { NavSectionId, portfolioContent } from '@/lib/portfolio-content';
import { cn } from '@/lib/utils';

interface NavigationProps {
  onNavigate: (section: NavSectionId) => void;
  activeSection: NavSectionId;
  visibleSections?: NavSectionId[];
}

export default function Navigation({ onNavigate, activeSection, visibleSections }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navItems = portfolioContent.navigation.filter((item) =>
    visibleSections ? visibleSections.includes(item.id) : true,
  );

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto max-w-7xl rounded-2xl border border-border/70 bg-background/75 shadow-lg backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <button
            onClick={() => onNavigate('home')}
            className="group flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-accent/60"
            data-testid="link-logo"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="text-left leading-tight">
              <span className="block text-sm font-semibold text-foreground">{portfolioContent.profile.name}</span>
              <span className="block text-xs text-muted-foreground">{portfolioContent.profile.role}</span>
            </span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  activeSection === item.id
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
                )}
                data-testid={`link-nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-menu-toggle"
              className="md:hidden"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-border/60 px-3 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={cn(
                    'justify-start rounded-lg',
                    activeSection === item.id
                      ? 'bg-primary/15 text-primary hover:bg-primary/20'
                      : 'text-muted-foreground',
                  )}
                  data-testid={`link-nav-mobile-${item.id}`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
