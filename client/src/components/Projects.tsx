import { ArrowUpRight, BookOpen, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { portfolioContent } from '@/lib/portfolio-content';

export default function Projects() {
  const { projects } = portfolioContent;

  return (
    <section id="projects" className="section-shell">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Projects</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Selected work</h2>
          </div>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-border/80 to-transparent md:block" />
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <Card
              key={`${project.title}-${project.company}`}
              className="surface-card ui-animate group flex h-full flex-col border-border/70"
              data-testid={`card-project-${index}`}
            >
              <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 pb-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <Badge variant="outline" className="rounded-full border-primary/40 bg-primary/10 text-primary">
                    {project.type}
                  </Badge>
                </div>
                {'url' in project && project.url ? (
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Sparkles className="h-4 w-4 text-primary" />
                )}
              </CardHeader>

              <CardContent className="flex flex-1 flex-col">
                <CardTitle className="text-xl" data-testid={`text-title-${index}`}>
                  {project.title}
                </CardTitle>
                <p className="mt-2 text-sm font-medium text-primary" data-testid={`text-company-${index}`}>
                  {project.company}
                </p>
                <p
                  className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground"
                  data-testid={`text-description-${index}`}
                >
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-border/70 pt-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border/70 bg-background/70 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      data-testid={`text-tech-${tech.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      #{tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
