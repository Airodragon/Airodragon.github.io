import { Code, Github, Globe, Linkedin, Mail, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    <section id="contact" className="section-shell bg-muted/15">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something excellent"
          description="Open to software engineering opportunities, product collaborations, and high-impact frontend work."
        />

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="surface-card ui-animate border-border/70">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-foreground sm:text-2xl">Start a conversation</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {profile.availability} Whether you need a product engineer, a frontend lead, or a collaborator for a
                strategic build, I&apos;m happy to discuss.
              </p>

              <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  asChild
                  className="min-w-44 gap-2 px-8"
                  data-testid="button-send-email"
                >
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="h-4 w-4" />
                    Send an Email
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="min-w-44 gap-2 px-8"
                  data-testid="button-call"
                >
                  <a href={`tel:${profile.phone.replace(/\s+/g, '')}`}>
                    <PhoneCall className="h-4 w-4" />
                    {profile.phone}
                  </a>
                </Button>
              </div>

              <div className="mt-8 rounded-xl border border-border/70 bg-background/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Primary Info</p>
                <div className="mt-3 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                  <p>
                    <span className="font-medium text-foreground">Email:</span> {profile.email}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Location:</span> {profile.location}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Phone:</span> {profile.phone}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Timezone:</span> {profile.timezone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="surface-card ui-animate border-border/70">
            <CardContent className="p-6 sm:p-7">
              <h3 className="text-lg font-semibold text-foreground">Social & Portfolio Links</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Connect through platforms where I share code, profile updates, and technical progress.
              </p>

              <div className="mt-5 space-y-2">
                {networkLinks.map((social) => {
                  const Icon = socialIconMap[social.id];
                  return (
                    <Button
                      key={social.id}
                      variant="outline"
                      asChild
                      className="w-full justify-between rounded-xl border-border/70 px-4"
                      data-testid={`link-${social.id}-footer`}
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                        <span className="inline-flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {social.label}
                        </span>
                        <span className="text-xs text-muted-foreground">Open</span>
                      </a>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
