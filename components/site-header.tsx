"use client";

import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { navigationLinks } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[hsl(var(--border))]/70 bg-[hsl(var(--background))]/90 backdrop-blur-lg">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="inline-flex items-center gap-2 font-semibold tracking-tight text-[hsl(var(--foreground))]">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))]">
            <Sparkles className="h-4 w-4" />
          </span>
          Revify Studio
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/80 px-2 py-1 md:flex">
          {navigationLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))]"
                    : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-[hsl(var(--accent))] px-5 py-2.5 text-sm font-semibold text-[hsl(var(--accent-foreground))] transition hover:-translate-y-0.5 hover:brightness-95"
          >
            Book a call
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface))] md:hidden"
          onClick={() => setMenuOpen((previous) => !previous)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {menuOpen ? (
        <div className="border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))] md:hidden">
          <Container className="space-y-1 py-3">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))]"
                      : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent-soft))] hover:text-[hsl(var(--foreground))]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-[hsl(var(--accent))] px-4 py-2.5 text-sm font-semibold text-[hsl(var(--accent-foreground))]"
            >
              Book a call
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
