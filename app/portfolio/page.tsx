import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { projects } from "@/lib/site-content";

export const metadata = {
  title: "Portfolio | Revify Studio",
  description: "Selected web projects focused on conversion, performance, and growth outcomes."
};

export default function PortfolioPage() {
  return (
    <main className="py-14 md:py-20">
      <Container className="space-y-8">
        <SectionHeader
          badge="Portfolio"
          title="Selected projects"
          description="Examples of strategic website builds built to increase conversion quality and support long-term growth."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="flex h-full flex-col rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 transition hover:-translate-y-0.5 hover:border-[hsl(var(--accent))]"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-[hsl(var(--accent))]">{project.category}</p>
              <h2 className="mt-3 text-xl font-semibold text-[hsl(var(--foreground))]">{project.title}</h2>
              <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{project.summary}</p>

              <div className="mt-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-sm font-medium text-[hsl(var(--foreground))]">
                {project.impact}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-1 text-xs text-[hsl(var(--muted-foreground))]"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <Link href={project.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--accent))]">
                Build something similar
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
