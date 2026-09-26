import { Briefcase, GraduationCap, Award } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { portfolioContent } from '@/lib/portfolio-content';

const infoIcons = [Briefcase, GraduationCap, Award];

export default function About() {
  const { aboutCards, skills, highlights } = portfolioContent;

  return (
    <section id="about" className="section-shell relative">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="About"
          title="Built for product impact"
          description="Product-focused engineering mindset with strong fundamentals, practical architecture decisions, and clean execution."
        />

        <div className="mb-10 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="bg-[hsl(0_0%_6%)] px-5 py-5 sm:px-6 sm:py-6"
              data-testid={`stat-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--brand-red)]">
                {item.label}
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="space-y-8">
            {aboutCards.map((card, index) => {
              const Icon = infoIcons[index] ?? Briefcase;
              return (
                <article
                  key={card.title}
                  className="editorial-panel group flex gap-4 border-b border-white/10 pb-8 last:border-b-0 last:pb-0"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-[var(--brand-red)]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                      {card.body}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="editorial-panel rounded-sm border border-white/10 bg-white/[0.03] p-6 sm:p-7">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">Technical Toolkit</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A practical stack for shipping scalable, maintainable products.
            </p>

            <div className="mt-6 space-y-6">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category}>
                  <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--brand-red)]">
                    {skillGroup.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/85"
                        data-testid={`badge-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
