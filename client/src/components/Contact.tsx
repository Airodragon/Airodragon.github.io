import { Code, Github, Globe, Linkedin, Mail, PhoneCall } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { portfolioContent } from '@/lib/portfolio-content';

const socialIconMap = {
  github: Github,
  linkedin: Linkedin,
  leetcode: Code,
  email: Mail,
  portfolio: Globe,
};

export default function Contact() {
  const { profile, socials } = portfolioContent;
  const networkLinks = socials.filter((item) => item.id !== 'email');

  return (
    <section id="contact" className="section-shell section-band">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something excellent"
          description="Open to software engineering opportunities, product collaborations, and high-impact frontend work."
        />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div className="editorial-panel">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Start a conversation
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {profile.availability} Whether you need a product engineer, a frontend lead, or a collaborator for a
              strategic build, I&apos;m happy to discuss.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a
                href={`mailto:${profile.email}`}
                data-magnetic
                data-testid="button-send-email"
                className="inline-flex min-w-44 items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-neutral-900 transition-transform hover:scale-[1.03]"
              >
                <Mail className="h-4 w-4" />
                Send an Email
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                data-magnetic
                data-testid="button-call"
                className="inline-flex min-w-44 items-center justify-center gap-2 rounded-full border border-white/35 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <PhoneCall className="h-4 w-4" />
                {profile.phone}
              </a>
            </div>

            <dl className="mt-10 grid gap-4 border-t border-white/10 pt-6 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--brand-red)]">
                  Email
                </dt>
                <dd className="mt-1.5 text-foreground/90">{profile.email}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--brand-red)]">
                  Location
                </dt>
                <dd className="mt-1.5 text-foreground/90">{profile.location}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--brand-red)]">
                  Phone
                </dt>
                <dd className="mt-1.5 text-foreground/90">{profile.phone}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--brand-red)]">
                  Timezone
                </dt>
                <dd className="mt-1.5 text-foreground/90">{profile.timezone}</dd>
              </div>
            </dl>
          </div>

          <aside className="editorial-panel border border-white/10 bg-white/[0.03] p-6 sm:p-7">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">Elsewhere</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Code, profile, and technical progress across the web.
            </p>

            <ul className="mt-6 space-y-1">
              {networkLinks.map((social) => {
                const Icon = socialIconMap[social.id];
                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      data-magnetic
                      data-testid={`link-${social.id}-footer`}
                      className="group flex items-center justify-between border-b border-white/10 px-1 py-3.5 text-sm transition-colors hover:text-[var(--brand-red)]"
                    >
                      <span className="inline-flex items-center gap-2.5 font-medium text-foreground group-hover:text-[var(--brand-red)]">
                        <Icon className="h-4 w-4 opacity-70" />
                        {social.label}
                      </span>
                      <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Open</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
