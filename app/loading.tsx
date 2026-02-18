import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <main className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl space-y-3">
          <div className="h-10 w-2/3 animate-pulse rounded-lg bg-[hsl(var(--border))]" />
          <div className="h-4 w-full animate-pulse rounded bg-[hsl(var(--border))]" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-[hsl(var(--border))]" />
        </div>
      </Container>
    </main>
  );
}
