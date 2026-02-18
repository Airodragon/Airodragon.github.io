import { portfolioContent } from '@/lib/portfolio-content';

export default function Footer() {
  const { profile } = portfolioContent;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 px-6 py-8 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-muted-foreground" data-testid="text-copyright">
          &copy; {year} {profile.name}. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground" data-testid="text-location">
          {profile.location}
        </p>
      </div>
    </footer>
  );
}
