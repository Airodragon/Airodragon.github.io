import { Clock4, Compass, ShieldCheck, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { siteConfig, stats } from "@/lib/site-content";

export const metadata = {
  title: "About | Revify Studio",
  description: "About Revify Studio and the freelance process used for premium web projects."
};

const principles = [
  {
    title: "Business-first execution",
    description: "Every design and development decision is tied to a measurable business objective.",
    icon: TrendingUp
  },
  {
    title: "Clarity over complexity",
    description: "Simple communication, transparent milestones, and predictable delivery rhythms.",
    icon: Compass
  },
  {
    title: "Quality and reliability",
    description: "Performance, accessibility, and maintainability are built in from the start.",
    icon: ShieldCheck
  },
  {
    title: "Fast collaboration",
    description: "Quick feedback loops with clear ownership and proactive updates.",
    icon: Clock4
  }
] as const;

export default function AboutPage() {
  return (
    <main className="py-14 md:py-20">
      <Container className="space-y-10">
        <SectionHeader
          badge="About"
          title="A freelance studio built for focused growth"
          description="Revify Studio partners with founders and teams to turn websites into reliable channels for trust, leads, and revenue."
        />

        <section className="grid gap-6 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
            <p>
              I focus on premium web experiences that combine strategy, visual clarity, and modern Next.js engineering.
              The goal is not just to launch quickly, but to launch with confidence and measurable results.
            </p>
            <p>
              Typical projects include positioning refinements, conversion-focused landing architecture, scalable component
              systems, and post-launch optimization loops. You stay in control of priorities with clear weekly updates.
            </p>
            <p>
              If you are building an ambitious brand and need a reliable technical and design partner, this studio is built
              for that level of execution.
            </p>
          </div>
          <div className="space-y-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-4">
            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Studio details</p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">{siteConfig.location}</p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">{siteConfig.responseTime}</p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">{siteConfig.launchTimeline}</p>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-5">
              <p className="text-2xl font-semibold text-[hsl(var(--foreground))]">{stat.value}</p>
              <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{stat.label}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <article key={principle.title} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))]">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-[hsl(var(--foreground))]">{principle.title}</h2>
                <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{principle.description}</p>
              </article>
            );
          })}
        </section>
      </Container>
    </main>
  );
}
