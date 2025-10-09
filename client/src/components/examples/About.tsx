import { ThemeProvider } from '../ThemeProvider';
import About from '../About';

export default function AboutExample() {
  return (
    <ThemeProvider>
      <div className="bg-background">
        <About />
      </div>
    </ThemeProvider>
  );
}
