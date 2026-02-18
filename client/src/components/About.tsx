import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SectionHeader from '@/components/SectionHeader';
import { portfolioContent } from '@/lib/portfolio-content';

const infoIcons = [Briefcase, GraduationCap, Award];

export default function About() {
  const { aboutCards, skills } = portfolioContent;

  return (
    <section id="about" className="section-shell relative">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="About"
          title="Built for product impact"
          description="Product-focused engineering mindset with strong fundamentals, practical architecture decisions, and clean execution."
        />

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            {aboutCards.map((card, index) => {
              const Icon = infoIcons[index] ?? Briefcase;
              return (
                <Card key={card.title} className="surface-card ui-animate border-border/70">
                  <CardContent className="flex gap-4 p-6">
                    <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-sm ring-1 ring-primary/20">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{card.body}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="surface-card ui-animate border-border/70">
            <CardContent className="p-6 sm:p-7">
              <h3 className="text-xl font-semibold text-foreground">Technical Toolkit</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A practical stack for shipping scalable, maintainable products.
              </p>

              <div className="mt-6 space-y-5">
                {skills.map((skillGroup) => (
                  <div key={skillGroup.category} className="rounded-xl border border-border/60 bg-background/65 p-4">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
                      {skillGroup.category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs"
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
