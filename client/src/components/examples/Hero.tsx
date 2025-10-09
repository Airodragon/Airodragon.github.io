import { ThemeProvider } from '../ThemeProvider';
import Hero from '../Hero';

export default function HeroExample() {
  return (
    <ThemeProvider>
      <div className="bg-background">
        <Hero onNavigate={(section) => console.log('Navigate to:', section)} />
      </div>
    </ThemeProvider>
  );
}
