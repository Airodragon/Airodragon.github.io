import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { portfolioContent } from '@/lib/portfolio-content';

export default function Experience() {
  const { experience } = portfolioContent;

  return (
    <section id="experience" className="section-shell bg-muted/20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Experience</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Building production systems</h2>
          </div>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-border/80 to-transparent md:block" />
        </div>

        <div className="space-y-5">
          {experience.map((exp, index) => (
            <Card
              key={`${exp.company}-${exp.period}`}
              className="surface-card ui-animate relative overflow-hidden border-border/70"
              data-testid={`card-experience-${index}`}
            >
              <CardContent className="p-6 sm:p-7">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground sm:text-2xl" data-testid={`text-role-${index}`}>
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-base font-semibold text-primary" data-testid={`text-company-${index}`}>
                      {exp.company}
                    </p>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{exp.summary}</p>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground md:text-right">
                    <p className="font-medium" data-testid={`text-period-${index}`}>{exp.period}</p>
                    <p data-testid={`text-location-${index}`}>{exp.location}</p>
                    <Badge variant="outline" className="rounded-full border-primary/40 bg-primary/10 text-primary">
                      Role Impact
                    </Badge>
                  </div>
                </div>

                <ul className="grid gap-3 sm:grid-cols-2">
                  {exp.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 rounded-xl border border-border/70 bg-background/70 p-3 text-foreground/80"
                      data-testid={`text-highlight-${index}-${idx}`}
                    >
                      <span className="mt-1 font-bold text-primary">•</span>
                      <span className="text-sm leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
