import { Code, Github, Globe, Linkedin, Mail, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

  return (
    <section id="contact" className="section-shell bg-muted/20">
      <div className="mx-auto max-w-5xl">
        <Card className="surface-card ui-animate border-border/70">
          <CardContent className="p-6 text-center sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Contact</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-5xl">Let&apos;s build something excellent</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              {profile.availability} Whether you need a product engineer, a frontend lead, or a collaborator for a
              strategic build, I&apos;m happy to discuss.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="min-w-44 gap-2 px-9"
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
                className="min-w-44 gap-2 px-9"
                data-testid="button-call"
              >
                <a href={`tel:${profile.phone.replace(/\s+/g, '')}`}>
                  <PhoneCall className="h-4 w-4" />
                  {profile.phone}
                </a>
              </Button>
            </div>

            <div className="mx-auto mt-8 max-w-md rounded-xl border border-border/70 bg-background/70 p-5">
              <p className="text-sm text-muted-foreground">Connect on</p>
              <div className="mt-3 flex flex-wrap justify-center gap-3">
                {socials
                  .filter((item) => item.id !== 'email')
                  .map((social) => {
                    const Icon = socialIconMap[social.id];
                    return (
                      <Button key={social.id} variant="ghost" size="icon" asChild data-testid={`link-${social.id}-footer`}>
                        <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                          <Icon className="h-5 w-5" />
                        </a>
                      </Button>
                    );
                  })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
