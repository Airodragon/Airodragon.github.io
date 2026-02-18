"use client";

import { Check, Monitor, Moon, Settings2, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";
import { AccentId, accentOptions, useAccent } from "@/components/providers/accent-provider";
import { cn } from "@/lib/utils";

const accentSwatches: Record<AccentId, string> = {
  violet: "hsl(262 84% 62%)",
  blue: "hsl(221 90% 60%)",
  emerald: "hsl(155 70% 43%)",
  rose: "hsl(348 83% 58%)"
};

const themeChoices = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor }
] as const;

export function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { accent, setAccent } = useAccent();

  const activeTheme = useMemo(() => theme ?? "system", [theme]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        aria-expanded={open}
        aria-controls="theme-customizer-panel"
        aria-label="Open theme customizer"
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/95 text-[hsl(var(--foreground))] shadow-lg shadow-black/15 backdrop-blur transition hover:-translate-y-0.5 hover:border-[hsl(var(--accent))]"
      >
        <Settings2 className="h-5 w-5" />
      </button>

      {open ? (
        <div
          id="theme-customizer-panel"
          className="absolute bottom-14 right-0 w-[18rem] space-y-5 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/95 p-4 shadow-2xl shadow-black/20 backdrop-blur"
        >
          <div className="space-y-2">
            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Appearance</p>
            <div className="grid grid-cols-3 gap-2">
              {themeChoices.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTheme(id)}
                  className={cn(
                    "inline-flex items-center justify-center gap-1 rounded-lg border px-2 py-2 text-xs font-medium transition",
                    activeTheme === id
                      ? "border-[hsl(var(--accent))] bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))]"
                      : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--accent))]"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Accent</p>
            <div className="grid grid-cols-4 gap-2">
              {accentOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setAccent(option.id)}
                  className={cn(
                    "relative inline-flex h-9 items-center justify-center rounded-lg border transition",
                    accent === option.id
                      ? "border-[hsl(var(--accent))] ring-2 ring-[hsl(var(--accent-soft))]"
                      : "border-[hsl(var(--border))]"
                  )}
                  aria-label={`Switch accent to ${option.label}`}
                  title={option.label}
                >
                  <span
                    className="h-5 w-5 rounded-full"
                    style={{ backgroundColor: accentSwatches[option.id] }}
                    aria-hidden
                  />
                  {accent === option.id ? (
                    <Check className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-[hsl(var(--accent))] p-0.5 text-white" />
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
