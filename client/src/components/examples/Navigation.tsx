import { ThemeProvider } from '../ThemeProvider';
import Navigation from '../Navigation';

export default function NavigationExample() {
  return (
    <ThemeProvider>
      <div className="h-screen bg-background">
        <Navigation 
          onNavigate={(section) => console.log('Navigate to:', section)} 
          activeSection="home"
        />
        <div className="pt-24 p-6">
          <p className="text-muted-foreground">Navigation component preview</p>
        </div>
      </div>
    </ThemeProvider>
  );
}
