import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CustomizableSectionId } from '@/lib/portfolio-content';

export type AccentPreset = 'ocean' | 'violet' | 'emerald' | 'rose' | 'amber' | 'custom';
export type Density = 'compact' | 'comfortable' | 'spacious';
export type CardStyle = 'solid' | 'glass' | 'minimal';
export type MotionLevel = 'reduced' | 'balanced' | 'expressive';

const ACCENT_PRESET_HUES: Record<Exclude<AccentPreset, 'custom'>, number> = {
  ocean: 209,
  violet: 262,
  emerald: 156,
  rose: 339,
  amber: 36,
};

export interface UiPreferences {
  accentPreset: AccentPreset;
  accentHue: number;
  density: Density;
  cardStyle: CardStyle;
  motion: MotionLevel;
  radius: number;
  gradients: boolean;
  sectionVisibility: Record<CustomizableSectionId, boolean>;
}

const STORAGE_KEY = 'portfolio-ui-preferences';

const DEFAULT_PREFERENCES: UiPreferences = {
  accentPreset: 'ocean',
  accentHue: ACCENT_PRESET_HUES.ocean,
  density: 'comfortable',
  cardStyle: 'glass',
  motion: 'balanced',
  radius: 18,
  gradients: true,
  sectionVisibility: {
    about: true,
    experience: true,
    projects: true,
    contact: true,
  },
};

interface UiCustomizerContextType {
  preferences: UiPreferences;
  setAccentPreset: (preset: AccentPreset) => void;
  setAccentHue: (hue: number) => void;
  setDensity: (density: Density) => void;
  setCardStyle: (cardStyle: CardStyle) => void;
  setMotion: (motion: MotionLevel) => void;
  setRadius: (radius: number) => void;
  setGradients: (enabled: boolean) => void;
  setSectionVisibility: (section: CustomizableSectionId, visible: boolean) => void;
  resetPreferences: () => void;
}

const UiCustomizerContext = createContext<UiCustomizerContextType | undefined>(undefined);

const isDensity = (value: unknown): value is Density =>
  value === 'compact' || value === 'comfortable' || value === 'spacious';
const isCardStyle = (value: unknown): value is CardStyle =>
  value === 'solid' || value === 'glass' || value === 'minimal';
const isMotion = (value: unknown): value is MotionLevel =>
  value === 'reduced' || value === 'balanced' || value === 'expressive';
const isPreset = (value: unknown): value is AccentPreset =>
  value === 'ocean' ||
  value === 'violet' ||
  value === 'emerald' ||
  value === 'rose' ||
  value === 'amber' ||
  value === 'custom';

const clampHue = (hue: number) => ((Math.round(hue) % 360) + 360) % 360;
const clampRadius = (radius: number) => Math.max(10, Math.min(30, Math.round(radius)));

const applyAccentPalette = (hue: number) => {
  const root = document.documentElement;
  const normalizedHue = clampHue(hue);

  root.style.setProperty('--ui-accent-hue', String(normalizedHue));
  root.style.setProperty('--primary', `${normalizedHue} 90% 58%`);
  root.style.setProperty('--ring', `${normalizedHue} 90% 62%`);
  root.style.setProperty('--sidebar-primary', `${normalizedHue} 90% 58%`);
  root.style.setProperty('--chart-1', `${normalizedHue} 90% 58%`);
  root.style.setProperty('--chart-2', `${(normalizedHue + 24) % 360} 82% 56%`);
  root.style.setProperty('--chart-3', `${(normalizedHue + 47) % 360} 77% 53%`);
  root.style.setProperty('--chart-4', `${(normalizedHue + 73) % 360} 70% 49%`);
  root.style.setProperty('--chart-5', `${(normalizedHue + 103) % 360} 65% 45%`);
};

const readStoredPreferences = (): UiPreferences => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_PREFERENCES;
    }

    const parsed = JSON.parse(raw) as Partial<UiPreferences>;

    const sectionVisibility = {
      about:
        typeof parsed.sectionVisibility?.about === 'boolean'
          ? parsed.sectionVisibility.about
          : DEFAULT_PREFERENCES.sectionVisibility.about,
      experience:
        typeof parsed.sectionVisibility?.experience === 'boolean'
          ? parsed.sectionVisibility.experience
          : DEFAULT_PREFERENCES.sectionVisibility.experience,
      projects:
        typeof parsed.sectionVisibility?.projects === 'boolean'
          ? parsed.sectionVisibility.projects
          : DEFAULT_PREFERENCES.sectionVisibility.projects,
      contact:
        typeof parsed.sectionVisibility?.contact === 'boolean'
          ? parsed.sectionVisibility.contact
          : DEFAULT_PREFERENCES.sectionVisibility.contact,
    };

    const accentPreset = isPreset(parsed.accentPreset)
      ? parsed.accentPreset
      : DEFAULT_PREFERENCES.accentPreset;
    const accentHue =
      typeof parsed.accentHue === 'number'
        ? clampHue(parsed.accentHue)
        : accentPreset !== 'custom'
          ? ACCENT_PRESET_HUES[accentPreset]
          : DEFAULT_PREFERENCES.accentHue;

    return {
      accentPreset,
      accentHue,
      density: isDensity(parsed.density) ? parsed.density : DEFAULT_PREFERENCES.density,
      cardStyle: isCardStyle(parsed.cardStyle) ? parsed.cardStyle : DEFAULT_PREFERENCES.cardStyle,
      motion: isMotion(parsed.motion) ? parsed.motion : DEFAULT_PREFERENCES.motion,
      radius:
        typeof parsed.radius === 'number'
          ? clampRadius(parsed.radius)
          : DEFAULT_PREFERENCES.radius,
      gradients: typeof parsed.gradients === 'boolean' ? parsed.gradients : DEFAULT_PREFERENCES.gradients,
      sectionVisibility,
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
};

export function UiCustomizerProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UiPreferences>(readStoredPreferences);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.density = preferences.density;
    root.dataset.cardStyle = preferences.cardStyle;
    root.dataset.motion = preferences.motion;
    root.dataset.gradients = preferences.gradients ? 'on' : 'off';
    root.style.setProperty('--ui-radius', `${clampRadius(preferences.radius)}px`);
    applyAccentPalette(preferences.accentHue);
  }, [preferences]);

  const value = useMemo<UiCustomizerContextType>(
    () => ({
      preferences,
      setAccentPreset: (preset) => {
        setPreferences((previous) => ({
          ...previous,
          accentPreset: preset,
          accentHue: preset === 'custom' ? previous.accentHue : ACCENT_PRESET_HUES[preset],
        }));
      },
      setAccentHue: (hue) => {
        setPreferences((previous) => ({
          ...previous,
          accentHue: clampHue(hue),
          accentPreset: 'custom',
        }));
      },
      setDensity: (density) => {
        setPreferences((previous) => ({ ...previous, density }));
      },
      setCardStyle: (cardStyle) => {
        setPreferences((previous) => ({ ...previous, cardStyle }));
      },
      setMotion: (motion) => {
        setPreferences((previous) => ({ ...previous, motion }));
      },
      setRadius: (radius) => {
        setPreferences((previous) => ({ ...previous, radius: clampRadius(radius) }));
      },
      setGradients: (enabled) => {
        setPreferences((previous) => ({ ...previous, gradients: enabled }));
      },
      setSectionVisibility: (section, visible) => {
        setPreferences((previous) => ({
          ...previous,
          sectionVisibility: {
            ...previous.sectionVisibility,
            [section]: visible,
          },
        }));
      },
      resetPreferences: () => {
        setPreferences(DEFAULT_PREFERENCES);
      },
    }),
    [preferences],
  );

  return <UiCustomizerContext.Provider value={value}>{children}</UiCustomizerContext.Provider>;
}

export function useUiCustomizer() {
  const context = useContext(UiCustomizerContext);
  if (!context) {
    throw new Error('useUiCustomizer must be used within UiCustomizerProvider');
  }
  return context;
}

export const accentPresetHues = ACCENT_PRESET_HUES;
