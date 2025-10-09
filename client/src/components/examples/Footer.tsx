import { ThemeProvider } from '../ThemeProvider';
import Footer from '../Footer';

export default function FooterExample() {
  return (
    <ThemeProvider>
      <div className="bg-background min-h-screen flex flex-col justify-end">
        <Footer />
      </div>
    </ThemeProvider>
  );
}
