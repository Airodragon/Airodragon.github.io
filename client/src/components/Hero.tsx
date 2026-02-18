import { ArrowRight, Code, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { NavSectionId, portfolioContent, SocialLink } from '@/lib/portfolio-content';

interface HeroProps {
  onNavigate: (section: NavSectionId) => void;
}

const iconBySocialId: Record<SocialLink['id'], typeof Mail> = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  leetcode: Code,
};

export default function Hero({ onNavigate }: HeroProps) {
  const { profile, highlights, socials } = portfolioContent;

  return (
    <section id="home" className="hero-shell section-shell relative flex items-center pt-28">
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {profile.role}
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-4 max-w-2xl text-balance text-xl text-foreground/90 sm:text-2xl">
            {profile.headline}
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{profile.summary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => onNavigate('contact')}
              className="group gap-2 px-8 shadow-lg"
              data-testid="button-get-in-touch"
            >
              Get In Touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              data-testid="button-view-resume"
            >
              <a href={profile.resumeUrl}>View Resume</a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {socials.map((social) => {
              const Icon = iconBySocialId[social.id];
              return (
                <Button key={social.id} variant="outline" size="icon" asChild data-testid={`link-${social.id}`}>
                  <a
                    href={social.href}
                    target={social.id === 'email' ? undefined : '_blank'}
                    rel={social.id === 'email' ? undefined : 'noopener noreferrer'}
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </Button>
              );
            })}
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            <span className="font-medium text-foreground/90">Availability:</span> {profile.availability}
          </p>
        </div>

        <Card className="surface-card ui-animate border-border/70 shadow-xl">
          <CardContent className="space-y-7 p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">At a glance</p>
              <p className="mt-2 text-sm text-muted-foreground">{profile.subheadline}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-border/70 bg-background/70 p-4"
                  data-testid={`card-highlight-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-xl font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border/70 bg-background/70 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Location & Timezone</p>
              <p className="mt-2 text-sm text-foreground">{profile.location}</p>
              <p className="text-sm text-muted-foreground">{profile.timezone}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
