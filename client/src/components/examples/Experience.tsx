import { ThemeProvider } from '../ThemeProvider';
import Experience from '../Experience';

export default function ExperienceExample() {
  return (
    <ThemeProvider>
      <div className="bg-background">
        <Experience />
      </div>
    </ThemeProvider>
  );
}
