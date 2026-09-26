import { ArrowUpRight, Code2 } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { portfolioContent } from '@/lib/portfolio-content';

export default function Projects() {
  const { projects } = portfolioContent;

  return (
    <section id="projects" className="section-shell">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Work"
          title="Selected projects"
          description="Live product references, engineering implementations, and practical architecture outcomes."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => {
            const liveUrl = 'liveUrl' in project ? project.liveUrl : undefined;
            const repoUrl = 'repoUrl' in project ? project.repoUrl : undefined;
            const isFeatured = index === 0;

            return (
              <article
                key={`${project.title}-${project.company}`}
                className={`editorial-panel group relative flex h-full flex-col border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.05] sm:p-7 ${
                  isFeatured ? 'md:col-span-2 xl:col-span-2' : ''
                }`}
                data-testid={`card-project-${index}`}
              >
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/20 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-foreground/80">
                    {project.type}
                  </span>
                  {isFeatured && (
                    <span className="rounded-full bg-[var(--brand-red)] px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white">
                      Featured
                    </span>
                  )}
                  {liveUrl && (
                    <span className="rounded-full border border-white/25 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/90">
                      Live
                    </span>
                  )}
                </div>

                <h3
                  className={`font-semibold tracking-tight text-foreground ${isFeatured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}
                  data-testid={`text-title-${index}`}
                >
                  {project.title}
                </h3>
                <p
                  className="mt-2 text-sm font-semibold text-[var(--brand-red)]"
                  data-testid={`text-company-${index}`}
                >
                  {project.company}
                </p>
                <p
                  className={`mt-3 flex-grow leading-relaxed text-muted-foreground ${isFeatured ? 'text-base' : 'text-sm sm:text-[0.95rem]'}`}
                  data-testid={`text-description-${index}`}
                >
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/12 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      data-testid={`text-tech-${tech.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-magnetic
                      data-testid={`link-project-live-${index}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-transform hover:scale-[1.03]"
                    >
                      {project.liveLabel ?? 'Live Preview'}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {repoUrl && (
                    <a
                      href={repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-magnetic
                      data-testid={`link-project-repo-${index}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      Source
                      <Code2 className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
