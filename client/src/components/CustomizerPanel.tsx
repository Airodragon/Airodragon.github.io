import { Palette, PanelRightOpen, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { CustomizableSectionId } from '@/lib/portfolio-content';
import {
  AccentPreset,
  accentPresetHues,
  CardStyle,
  Density,
  MotionLevel,
  useUiCustomizer,
} from '@/components/UiCustomizerProvider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const customizableSections: CustomizableSectionId[] = ['about', 'experience', 'projects', 'contact'];

const cardStyleOptions: Array<{ value: CardStyle; label: string }> = [
  { value: 'glass', label: 'Glass' },
  { value: 'solid', label: 'Solid' },
  { value: 'minimal', label: 'Minimal' },
];

const densityOptions: Array<{ value: Density; label: string }> = [
  { value: 'compact', label: 'Compact' },
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'spacious', label: 'Spacious' },
];

const motionOptions: Array<{ value: MotionLevel; label: string }> = [
  { value: 'reduced', label: 'Reduced' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'expressive', label: 'Expressive' },
];

const accentPresetOptions: Array<{ value: AccentPreset; label: string }> = [
  { value: 'ocean', label: 'Ocean' },
  { value: 'violet', label: 'Violet' },
  { value: 'emerald', label: 'Emerald' },
  { value: 'rose', label: 'Rose' },
  { value: 'amber', label: 'Amber' },
  { value: 'custom', label: 'Custom' },
];

const sectionLabels: Record<CustomizableSectionId, string> = {
  about: 'About',
  experience: 'Experience',
  projects: 'Projects',
  contact: 'Contact',
};

export default function CustomizerPanel() {
  const [open, setOpen] = useState(false);
  const {
    preferences,
    setAccentPreset,
    setAccentHue,
    setDensity,
    setCardStyle,
    setMotion,
    setRadius,
    setGradients,
    setSectionVisibility,
    resetPreferences,
  } = useUiCustomizer();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="fixed bottom-6 right-6 z-50 gap-2 rounded-full px-4 py-5 shadow-xl"
          data-testid="button-customizer-open"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Customize
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full border-l border-border/70 bg-background/95 p-0 backdrop-blur-xl sm:max-w-md"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b border-border/60 px-6 py-5">
            <SheetTitle className="flex items-center gap-2">
              <PanelRightOpen className="h-5 w-5 text-primary" />
              UI Customizer
            </SheetTitle>
            <SheetDescription>
              Tune layout, style, and visual identity with live updates.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <Tabs defaultValue="theme" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="theme">Theme</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
                <TabsTrigger value="content">Sections</TabsTrigger>
              </TabsList>

              <TabsContent value="theme" className="space-y-6">
                <div className="space-y-2">
                  <Label>Accent preset</Label>
                  <Select
                    value={preferences.accentPreset}
                    onValueChange={(value) => setAccentPreset(value as AccentPreset)}
                  >
                    <SelectTrigger data-testid="select-accent-preset">
                      <SelectValue placeholder="Select accent" />
                    </SelectTrigger>
                    <SelectContent>
                      {accentPresetOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <span className="inline-flex items-center gap-2">
                            {option.value !== 'custom' && (
                              <span
                                className="inline-block h-2.5 w-2.5 rounded-full"
                                style={{
                                  backgroundColor: `hsl(${accentPresetHues[option.value]} 90% 58%)`,
                                }}
                              />
                            )}
                            {option.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="accent-hue-slider">Accent hue</Label>
                    <span className="text-xs text-muted-foreground">{preferences.accentHue}&deg;</span>
                  </div>
                  <Slider
                    id="accent-hue-slider"
                    min={0}
                    max={359}
                    step={1}
                    value={[preferences.accentHue]}
                    onValueChange={(values) => setAccentHue(values[0] ?? preferences.accentHue)}
                    data-testid="slider-accent-hue"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Card style</Label>
                  <Select
                    value={preferences.cardStyle}
                    onValueChange={(value) => setCardStyle(value as CardStyle)}
                  >
                    <SelectTrigger data-testid="select-card-style">
                      <SelectValue placeholder="Select card style" />
                    </SelectTrigger>
                    <SelectContent>
                      {cardStyleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="layout" className="space-y-6">
                <div className="space-y-2">
                  <Label>Section density</Label>
                  <Select
                    value={preferences.density}
                    onValueChange={(value) => setDensity(value as Density)}
                  >
                    <SelectTrigger data-testid="select-density">
                      <SelectValue placeholder="Select spacing density" />
                    </SelectTrigger>
                    <SelectContent>
                      {densityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="radius-slider">Roundness</Label>
                    <span className="text-xs text-muted-foreground">{preferences.radius}px</span>
                  </div>
                  <Slider
                    id="radius-slider"
                    min={10}
                    max={30}
                    step={1}
                    value={[preferences.radius]}
                    onValueChange={(values) => setRadius(values[0] ?? preferences.radius)}
                    data-testid="slider-radius"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Animation intensity</Label>
                  <Select
                    value={preferences.motion}
                    onValueChange={(value) => setMotion(value as MotionLevel)}
                  >
                    <SelectTrigger data-testid="select-motion">
                      <SelectValue placeholder="Select animation level" />
                    </SelectTrigger>
                    <SelectContent>
                      {motionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border/70 p-3">
                  <div>
                    <p className="text-sm font-medium">Gradient background</p>
                    <p className="text-xs text-muted-foreground">
                      Enable decorative gradients and ambient glow.
                    </p>
                  </div>
                  <Switch
                    checked={preferences.gradients}
                    onCheckedChange={setGradients}
                    data-testid="switch-gradients"
                  />
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-3">
                {customizableSections.map((section) => (
                  <div
                    key={section}
                    className="flex items-center justify-between rounded-lg border border-border/70 p-3"
                  >
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium">{sectionLabels[section]}</p>
                    </div>
                    <Switch
                      checked={preferences.sectionVisibility[section]}
                      onCheckedChange={(checked) => setSectionVisibility(section, checked)}
                      data-testid={`switch-section-${section}`}
                    />
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          <div className="border-t border-border/60 p-4">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={resetPreferences}
              data-testid="button-customizer-reset"
            >
              <RotateCcw className="h-4 w-4" />
              Reset to defaults
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
