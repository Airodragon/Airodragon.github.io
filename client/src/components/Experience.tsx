import SectionHeader from '@/components/SectionHeader';
import { portfolioContent } from '@/lib/portfolio-content';

export default function Experience() {
  const { experience } = portfolioContent;

  return (
    <section id="experience" className="section-shell section-band">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Experience"
          title="Building production systems"
          description="Hands-on delivery across API platforms, fintech products, and performance-focused frontend architecture."
        />

        <ol className="relative space-y-0 border-l border-white/15 pl-6 sm:pl-8">
          {experience.map((exp, index) => (
            <li
              key={`${exp.company}-${exp.period}`}
              className="relative pb-12 last:pb-0"
              data-testid={`card-experience-${index}`}
            >
              <span
                className="absolute -left-[1.9rem] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--brand-red)] sm:-left-[2.15rem]"
                aria-hidden
              />
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <h3
                    className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
                    data-testid={`text-role-${index}`}
                  >
                    {exp.role}
                  </h3>
                  <p
                    className="mt-1 text-base font-semibold text-[var(--brand-red)]"
                    data-testid={`text-company-${index}`}
                  >
                    {exp.company}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                    {exp.summary}
                  </p>
                </div>
                <div className="shrink-0 space-y-1 text-sm text-muted-foreground md:text-right">
                  <p className="font-medium text-foreground/90" data-testid={`text-period-${index}`}>
                    {exp.period}
                  </p>
                  <p data-testid={`text-location-${index}`}>{exp.location}</p>
                </div>
              </div>

              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {exp.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 border border-white/10 bg-white/[0.03] px-3.5 py-3 text-foreground/85"
                    data-testid={`text-highlight-${index}-${idx}`}
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--brand-red)]" />
                    <span className="text-sm leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
