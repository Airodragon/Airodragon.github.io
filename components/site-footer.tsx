import Link from "next/link";
import { Container } from "@/components/ui/container";
import { navigationLinks, siteConfig, socialLinks } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))]">
      <Container className="space-y-8 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-lg font-semibold text-[hsl(var(--foreground))]">{siteConfig.name}</p>
            <p className="max-w-sm text-sm text-[hsl(var(--muted-foreground))]">{siteConfig.description}</p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">
              Sitemap
            </p>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[hsl(var(--muted-foreground))] transition hover:text-[hsl(var(--foreground))]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">
              Contact
            </p>
            <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
              <li>{siteConfig.location}</li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="transition hover:text-[hsl(var(--foreground))]">
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.phone}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-[hsl(var(--border))] pt-6 md:flex-row md:items-center">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--border))] text-xs font-semibold uppercase text-[hsl(var(--muted-foreground))] transition hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
                aria-label={social.label}
              >
                {social.shortLabel}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
