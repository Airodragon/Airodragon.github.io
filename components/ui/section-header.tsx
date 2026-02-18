import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  badge?: string;
  title: string;
  description: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  badge,
  title,
  description,
  align = "left",
  className
}: SectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <div className={cn("max-w-2xl space-y-4", isCentered && "mx-auto text-center", className)}>
      {badge ? (
        <span className="inline-flex rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[hsl(var(--accent))]">
          {badge}
        </span>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-[hsl(var(--foreground))] md:text-4xl">
        {title}
      </h2>
      <p className="text-pretty text-[hsl(var(--muted-foreground))] md:text-lg">{description}</p>
    </div>
  );
}
