import { BadgeCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { processSteps, services } from "@/lib/site-content";

export const metadata = {
  title: "Services | Revify Studio",
  description: "Website design, Next.js development, and growth-focused freelance services."
};

export default function ServicesPage() {
  return (
    <main className="py-14 md:py-20">
      <Container className="space-y-8">
        <SectionHeader
          badge="Services"
          title="Freelance packages designed for launch speed and measurable growth"
          description="From strategy and design to development and optimization, each offer is built to create business impact."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.title} className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
              <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">{service.title}</h2>
              <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{service.description}</p>
              <ul className="mt-4 space-y-2">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2 text-sm text-[hsl(var(--foreground))]">
                    <BadgeCheck className="mt-0.5 h-4 w-4 text-[hsl(var(--accent))]" />
                    {outcome}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[hsl(var(--accent))]">
                {service.priceFrom}
              </p>
            </article>
          ))}
        </div>

        <section className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
          <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">What delivery looks like</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {processSteps.map((step, index) => (
              <div key={step.title} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-4">
                <p className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--accent-soft))] text-xs font-semibold text-[hsl(var(--accent))]">
                  {index + 1}
                </p>
                <h3 className="mt-3 font-semibold text-[hsl(var(--foreground))]">{step.title}</h3>
                <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-2xl border border-[hsl(var(--accent))] bg-[hsl(var(--accent-soft))]/60 p-6">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--accent))]">
            <Sparkles className="h-4 w-4" />
            Need a custom scope?
          </p>
          <p className="mt-2 max-w-2xl text-sm text-[hsl(var(--foreground))]">
            If your requirements do not fit a package, I can build a tailored plan for your goals, timeline, and team
            capacity.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex rounded-full bg-[hsl(var(--accent))] px-5 py-2.5 text-sm font-semibold text-[hsl(var(--accent-foreground))]"
          >
            Request custom proposal
          </Link>
        </div>
      </Container>
    </main>
  );
}
