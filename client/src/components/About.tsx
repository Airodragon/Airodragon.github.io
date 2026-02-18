import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { portfolioContent } from '@/lib/portfolio-content';

const infoIcons = [Briefcase, GraduationCap, Award];

export default function About() {
  const { aboutCards, skills } = portfolioContent;

  return (
    <section id="about" className="section-shell relative">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">About</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Built for product impact</h2>
          </div>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-border/80 to-transparent md:block" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            {aboutCards.map((card, index) => {
              const Icon = infoIcons[index] ?? Briefcase;
              return (
                <Card key={card.title} className="surface-card ui-animate border-border/70">
                  <CardContent className="flex gap-4 p-6">
                    <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted-foreground">{card.body}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="surface-card ui-animate border-border/70">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-foreground">Technical Toolkit</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A practical stack for shipping scalable, maintainable products.
              </p>

              <div className="mt-6 space-y-5">
                {skills.map((skillGroup) => (
                  <div key={skillGroup.category}>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {skillGroup.category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs"
                          data-testid={`badge-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
