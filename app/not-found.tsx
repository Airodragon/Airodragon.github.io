import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <main className="py-20">
      <Container>
        <div className="mx-auto max-w-xl rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[hsl(var(--accent))]">404</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Page not found</h1>
          <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-[hsl(var(--accent))] px-5 py-2.5 text-sm font-semibold text-[hsl(var(--accent-foreground))]"
          >
            Go back home
          </Link>
        </div>
      </Container>
    </main>
  );
}
