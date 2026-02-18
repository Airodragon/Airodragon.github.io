"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "revify-accent";

export const accentOptions = [
  { id: "violet", label: "Violet" },
  { id: "blue", label: "Blue" },
  { id: "emerald", label: "Emerald" },
  { id: "rose", label: "Rose" }
] as const;

export type AccentId = (typeof accentOptions)[number]["id"];

type AccentContextValue = {
  accent: AccentId;
  setAccent: (accent: AccentId) => void;
};

const AccentContext = createContext<AccentContextValue | null>(null);

function isAccentId(value: string | null): value is AccentId {
  return Boolean(value && accentOptions.some((accent) => accent.id === value));
}

export function AccentProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<AccentId>("violet");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isAccentId(saved)) {
      setAccentState(saved);
      document.documentElement.dataset.accent = saved;
      return;
    }

    document.documentElement.dataset.accent = "violet";
  }, []);

  const setAccent = (nextAccent: AccentId) => {
    setAccentState(nextAccent);
    document.documentElement.dataset.accent = nextAccent;
    localStorage.setItem(STORAGE_KEY, nextAccent);
  };

  const value = useMemo(
    () => ({
      accent,
      setAccent
    }),
    [accent]
  );

  return <AccentContext value={value}>{children}</AccentContext>;
}

export function useAccent() {
  const context = useContext(AccentContext);

  if (!context) {
    throw new Error("useAccent must be used inside AccentProvider");
  }

  return context;
}
