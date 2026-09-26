import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavSectionId } from '@/lib/portfolio-content';
import { cn } from '@/lib/utils';

interface NavigationProps {
  onNavigate: (section: NavSectionId) => void;
  activeSection: NavSectionId;
  visibleSections?: NavSectionId[];
  scrollProgress?: number;
}

const HERO_NAV: { id: NavSectionId; label: string }[] = [
  { id: 'projects', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation({
  onNavigate,
  activeSection,
  visibleSections,
  scrollProgress = 0,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = HERO_NAV.filter((item) =>
    visibleSections ? visibleSections.includes(item.id) : true,
  );
  const onHero = activeSection === 'home';

  return (
    <nav className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 sm:pt-5">
      <div
        className={cn(
          'pointer-events-auto relative overflow-hidden rounded-full border transition-[background,border-color,box-shadow] duration-300',
          onHero
            ? 'border-white/25 bg-white/12 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-[20px]'
            : 'border-white/10 bg-black/70 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-[20px]',
        )}
      >
        <div className="flex items-center gap-1 px-2 py-1.5 sm:gap-1.5 sm:px-2.5 sm:py-2">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            data-magnetic
            data-testid="link-logo"
            className={cn(
              'mr-1 hidden rounded-full px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.22em] sm:inline-flex',
              onHero ? 'text-white/90 hover:bg-white/10' : 'text-white/80 hover:bg-white/10',
            )}
          >
            MS
          </button>

          <div className="hidden items-center gap-0.5 sm:flex">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  data-magnetic
                  data-testid={`link-nav-${item.id}`}
                  className={cn(
                    'rounded-full px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-colors',
                    onHero
                      ? active
                        ? 'bg-white text-neutral-900'
                        : 'text-white/85 hover:bg-white/12 hover:text-white'
                      : active
                        ? 'bg-[#FF0000] text-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white',
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            data-magnetic
            data-testid="button-menu-toggle"
            className={cn(
              'inline-flex h-9 w-9 items-center justify-center rounded-full sm:hidden',
              onHero ? 'text-white hover:bg-white/12' : 'text-white hover:bg-white/10',
            )}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {isMenuOpen && (
          <div
            className={cn(
              'border-t px-2 py-2 sm:hidden',
              onHero ? 'border-white/20' : 'border-border/50',
            )}
          >
            <div className="flex flex-col gap-0.5">
              <button
                type="button"
                onClick={() => {
                  onNavigate('home');
                  setIsMenuOpen(false);
                }}
                className={cn(
                  'rounded-xl px-3 py-2.5 text-left text-sm font-medium',
                  onHero ? 'text-white/90 hover:bg-white/10' : 'text-foreground hover:bg-accent/55',
                )}
              >
                Home
              </button>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  data-testid={`link-nav-mobile-${item.id}`}
                  className={cn(
                    'rounded-xl px-3 py-2.5 text-left text-sm font-medium',
                    onHero ? 'text-white/90 hover:bg-white/10' : 'text-muted-foreground hover:bg-accent/55',
                    activeSection === item.id && (onHero ? 'bg-white/15 text-white' : 'bg-accent text-foreground'),
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div
          className={cn('h-px w-full', onHero ? 'bg-white/15' : 'bg-border/40')}
          aria-hidden
        >
          <div
            className={cn(
              'h-full transition-[width] duration-300 ease-out',
              onHero ? 'bg-white/70' : 'bg-[#FF0000]',
            )}
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </nav>
  );
}
