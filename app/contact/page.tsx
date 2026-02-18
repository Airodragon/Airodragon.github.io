import { CalendarClock, Mail, MapPin, PhoneCall } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { siteConfig } from "@/lib/site-content";

export const metadata = {
  title: "Contact | Revify Studio",
  description: "Get in touch for a custom freelance website and growth proposal."
};

const contactCards = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail },
  { label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s+/g, "")}`, icon: PhoneCall },
  { label: "Location", value: siteConfig.location, icon: MapPin },
  { label: "Response", value: siteConfig.responseTime, icon: CalendarClock }
] as const;

export default function ContactPage() {
  return (
    <main className="py-14 md:py-20">
      <Container className="space-y-8">
        <SectionHeader
          badge="Contact"
          title="Let’s build your next growth-ready website"
          description="Share your project details and goals. You will receive tailored recommendations and next steps."
        />

        <div className="grid gap-8 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 md:p-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="space-y-4">
            {contactCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.label}
                  className="flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-4"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.13em] text-[hsl(var(--muted-foreground))]">{card.label}</p>
                    {"href" in card ? (
                      <a href={card.href} className="mt-1 block text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--accent))]">
                        {card.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm font-medium text-[hsl(var(--foreground))]">{card.value}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </aside>

          <ContactForm />
        </div>
      </Container>
    </main>
  );
}
