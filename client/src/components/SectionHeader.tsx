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
      <div className={cn('max-w-3xl', centered && 'mx-auto')}>
        <div className={cn('inline-flex items-center gap-2.5', centered && 'justify-center')}>
          <span className="h-px w-6 bg-[var(--brand-red)]" />
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--brand-red)] sm:text-xs">
            {eyebrow}
          </p>
        </div>
        <h2 className="heading-display mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>
      <div
        className={cn(
          'mb-2 hidden h-px flex-1 bg-gradient-to-r from-white/15 to-transparent md:block',
          centered && 'md:hidden',
        )}
      />
    </div>
  );
}
