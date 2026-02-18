import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  ChartLine,
  Code2,
  Megaphone,
  MoveRight,
  Sparkles,
  Zap
} from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import {
  faqs,
  pricingPlans,
  processSteps,
  projects,
  services,
  siteConfig,
  stats,
  testimonials,
  trustedBy
} from "@/lib/site-content";

const serviceIcons = [Sparkles, Code2, Megaphone, BriefcaseBusiness];

export function HomeSections() {
  return (
    <main>
      <section className="relative overflow-hidden pb-20 pt-12 md:pb-28 md:pt-16">
        <Container>
          <div className="rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 shadow-xl shadow-black/10 md:p-10">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-7">
                <span className="inline-flex rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--accent-soft))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[hsl(var(--accent))]">
                  Freelance partner for modern businesses
                </span>
                <div className="space-y-5">
                  <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-[hsl(var(--foreground))] md:text-5xl">
                    Elevate your brand with a website that sells your expertise.
                  </h1>
                  <p className="max-w-xl text-pretty text-[hsl(var(--muted-foreground))] md:text-lg">
                    {siteConfig.description} Every project ships with clear strategy, clean code, and launch-ready
                    deployment.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-5 py-3 text-sm font-semibold text-[hsl(var(--accent-foreground))] transition hover:-translate-y-0.5 hover:brightness-95"
                  >
                    Start your project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-5 py-3 text-sm font-semibold text-[hsl(var(--foreground))] transition hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
                  >
                    View recent work
                    <MoveRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-3">
                      <p className="text-xl font-semibold text-[hsl(var(--foreground))]">{stat.value}</p>
                      <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative isolate overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-gradient-to-b from-[hsl(var(--accent-soft))] via-[hsl(var(--surface))] to-[hsl(var(--surface))] p-6">
                <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
                <div className="relative space-y-4">
                  <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/90 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">How I work</p>
                    <ul className="mt-3 space-y-3">
                      {processSteps.slice(0, 3).map((step) => (
                        <li key={step.title} className="flex items-start gap-2 text-sm text-[hsl(var(--foreground))]">
                          <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--accent))]" />
                          <span>{step.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">Response</p>
                    <p className="mt-2 text-sm font-medium text-[hsl(var(--foreground))]">{siteConfig.responseTime}</p>
                    <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{siteConfig.launchTimeline}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(var(--muted-foreground))]">
            Trusted by teams in SaaS, ecommerce, and consulting
          </p>
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-4 sm:grid-cols-3 lg:grid-cols-6">
            {trustedBy.map((brand) => (
              <div
                key={brand}
                className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-center text-sm font-semibold text-[hsl(var(--muted-foreground))]"
              >
                {brand}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28" id="services">
        <Container className="space-y-8">
          <SectionHeader
            badge="Services"
            title="Everything needed to launch and scale your freelance-ready web presence"
            description="Choose a one-time build, or start with a launch and continue with monthly optimization."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];
              return (
                <article
                  key={service.title}
                  className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 transition hover:-translate-y-0.5 hover:border-[hsl(var(--accent))]"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-[hsl(var(--foreground))]">{service.title}</h3>
                  <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{service.description}</p>
                  <ul className="mt-4 space-y-2">
                    {service.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2 text-sm text-[hsl(var(--foreground))]">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" aria-hidden />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[hsl(var(--muted-foreground))]">
                    {service.priceFrom}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28" id="process">
        <Container className="space-y-8">
          <SectionHeader
            badge="Process"
            title="Structured delivery from strategy to launch"
            description="A transparent framework keeps timelines, priorities, and outcomes aligned from day one."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6"
              >
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--accent-soft))] text-sm font-semibold text-[hsl(var(--accent))]">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[hsl(var(--foreground))]">{step.title}</h3>
                <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{step.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28" id="portfolio">
        <Container className="space-y-8">
          <SectionHeader
            badge="Featured work"
            title="Selected projects built for measurable growth"
            description="Each engagement combines premium visual direction with conversion strategy and technical reliability."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group flex h-full flex-col rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 transition hover:-translate-y-0.5 hover:border-[hsl(var(--accent))]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[hsl(var(--accent))]">{project.category}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-[hsl(var(--foreground))]">{project.title}</h3>
                <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{project.summary}</p>
                <div className="mt-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-sm font-medium text-[hsl(var(--foreground))]">
                  {project.impact}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-1 text-xs text-[hsl(var(--muted-foreground))]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <Link
                  href={project.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--accent))]"
                >
                  Discuss a similar build
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container className="space-y-8">
          <SectionHeader
            badge="Results"
            title="Client feedback"
            description="Partnerships built on speed, communication, and outcomes that move the business."
            align="center"
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="h-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6"
              >
                <blockquote className="text-sm leading-relaxed text-[hsl(var(--foreground))]">“{testimonial.quote}”</blockquote>
                <figcaption className="mt-5 text-sm text-[hsl(var(--muted-foreground))]">
                  <span className="block font-semibold text-[hsl(var(--foreground))]">{testimonial.name}</span>
                  {testimonial.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container className="space-y-8">
          <SectionHeader
            badge="Pricing"
            title="Flexible engagement models for every stage"
            description="Start with a launch package or choose a growth retainer for continuous optimization."
            align="center"
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-2xl border p-6 ${
                  plan.featured
                    ? "border-[hsl(var(--accent))] bg-[hsl(var(--accent-soft))]/60"
                    : "border-[hsl(var(--border))] bg-[hsl(var(--surface))]"
                }`}
              >
                <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{plan.name}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-[hsl(var(--foreground))]">{plan.price}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.13em] text-[hsl(var(--muted-foreground))]">{plan.timeline}</p>
                <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))]">{plan.description}</p>
                <ul className="mt-5 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-[hsl(var(--foreground))]">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--accent))]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container className="space-y-8">
          <SectionHeader
            badge="FAQ"
            title="Common questions before kickoff"
            description="If you need a custom scope, I can map recommendations after a short discovery call."
          />
          <div className="grid gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-5 open:border-[hsl(var(--accent))]"
              >
                <summary className="cursor-pointer list-none font-medium text-[hsl(var(--foreground))]">
                  <span className="inline-flex items-start gap-2">
                    <ChartLine className="mt-0.5 h-4 w-4 text-[hsl(var(--accent))]" />
                    {faq.question}
                  </span>
                </summary>
                <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28" id="contact">
        <Container>
          <div className="grid gap-8 rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6">
              <SectionHeader
                badge="Contact"
                title="Tell me what you’re building"
                description="Share your goals, timeline, and budget. I will send recommendations and next steps."
              />
              <div className="space-y-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-4">
                <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Direct contact</p>
                <a href={`mailto:${siteConfig.email}`} className="block text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
                  {siteConfig.email}
                </a>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">{siteConfig.phone}</p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">{siteConfig.location}</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-1.5 text-xs font-medium text-[hsl(var(--muted-foreground))]">
                <Zap className="h-3.5 w-3.5 text-[hsl(var(--accent))]" />
                {siteConfig.responseTime}
              </div>
            </div>
            <ContactForm />
          </div>
        </Container>
      </section>
    </main>
  );
}
