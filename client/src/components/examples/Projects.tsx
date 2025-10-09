import { ThemeProvider } from '../ThemeProvider';
import Projects from '../Projects';

export default function ProjectsExample() {
  return (
    <ThemeProvider>
      <div className="bg-background">
        <Projects />
      </div>
    </ThemeProvider>
  );
}
