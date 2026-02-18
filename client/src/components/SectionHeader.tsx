import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-10 flex items-end justify-between gap-4 sm:mb-12',
        centered && 'flex-col text-center md:items-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', centered && 'mx-auto')}>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/90 sm:text-sm">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">{title}</h2>
        {description && <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      <div className={cn('hidden h-px flex-1 bg-gradient-to-r from-border/80 to-transparent md:block', centered && 'md:hidden')} />
    </div>
  );
}
