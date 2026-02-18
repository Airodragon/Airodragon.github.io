export default function AiCharacterAvatar() {
  return (
    <figure
      className="ui-animate relative mx-auto w-full overflow-hidden rounded-2xl border border-border/70 bg-background/80 p-3"
      data-testid="card-ai-character"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,hsl(var(--primary)/0.18),transparent_44%),radial-gradient(circle_at_82%_82%,hsl(var(--primary)/0.14),transparent_46%)]" />
      <div className="absolute right-4 top-4 z-20 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
        AI persona
      </div>

      <svg
        viewBox="0 0 320 220"
        className="relative z-10 w-full"
        role="img"
        aria-label="Custom AI character illustration"
      >
        <defs>
          <linearGradient id="ai-shell" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.85)" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.55)" />
          </linearGradient>
          <linearGradient id="ai-plate" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--background) / 0.9)" />
            <stop offset="100%" stopColor="hsl(var(--card) / 0.9)" />
          </linearGradient>
        </defs>

        <rect x="40" y="26" width="240" height="170" rx="28" fill="url(#ai-shell)" opacity="0.22" />
        <rect x="76" y="38" width="168" height="138" rx="24" fill="url(#ai-plate)" stroke="hsl(var(--border))" />
        <rect x="106" y="66" width="108" height="78" rx="18" fill="hsl(var(--background))" stroke="hsl(var(--border))" />

        <circle cx="136" cy="103" r="11" fill="hsl(var(--primary))" opacity="0.95" />
        <circle cx="184" cy="103" r="11" fill="hsl(var(--primary))" opacity="0.95" />
        <circle cx="136" cy="103" r="3.5" fill="hsl(var(--primary-foreground))" />
        <circle cx="184" cy="103" r="3.5" fill="hsl(var(--primary-foreground))" />

        <rect x="134" y="127" width="52" height="7" rx="3.5" fill="hsl(var(--foreground) / 0.85)" />

        <rect x="98" y="52" width="20" height="5" rx="2.5" fill="hsl(var(--primary))" />
        <rect x="202" y="52" width="20" height="5" rx="2.5" fill="hsl(var(--primary))" />

        <rect x="126" y="16" width="68" height="16" rx="8" fill="hsl(var(--background))" stroke="hsl(var(--border))" />
        <circle cx="160" cy="16" r="10" fill="hsl(var(--primary))" opacity="0.9" />

        <rect x="122" y="174" width="76" height="16" rx="8" fill="hsl(var(--background))" stroke="hsl(var(--border))" />
        <rect x="108" y="190" width="104" height="8" rx="4" fill="hsl(var(--foreground) / 0.22)" />

        <line x1="60" y1="96" x2="36" y2="96" stroke="hsl(var(--primary) / 0.8)" strokeWidth="3" strokeLinecap="round" />
        <line x1="260" y1="96" x2="284" y2="96" stroke="hsl(var(--primary) / 0.8)" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <div className="relative z-10 mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-border/70 bg-background/70 px-2 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
          clean UI systems
        </div>
        <div className="rounded-lg border border-border/70 bg-background/70 px-2 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
          scalable frontend
        </div>
      </div>

      <figcaption className="relative z-10 mt-2 flex items-center justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
        <span>Custom AI Character</span>
        <span className="rounded-full border border-primary/35 bg-primary/10 px-2 py-0.5 text-primary">Modern</span>
      </figcaption>
    </figure>
  );
}
