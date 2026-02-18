import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { AccentProvider } from "@/components/providers/accent-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeCustomizer } from "@/components/theme-customizer";
import { siteConfig } from "@/lib/site-content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const siteUrl = siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Revify Studio | Freelance Web Design & Next.js Development",
    template: "%s | Revify Studio"
  },
  description: siteConfig.description,
  keywords: [
    "freelance web developer",
    "nextjs freelancer",
    "website design",
    "conversion focused website",
    "portfolio website"
  ],
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Revify Studio | Freelance Web Design & Next.js Development",
    description: siteConfig.description,
    url: siteUrl,
    siteName: siteConfig.name
  },
  twitter: {
    card: "summary_large_image",
    title: "Revify Studio | Freelance Web Design & Next.js Development",
    description: siteConfig.description
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} min-h-screen bg-[hsl(var(--background))] font-sans text-[hsl(var(--foreground))] antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AccentProvider>
            <a
              href="#main-content"
              className="sr-only rounded-md bg-[hsl(var(--accent))] px-3 py-2 font-semibold text-[hsl(var(--accent-foreground))] focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100]"
            >
              Skip to content
            </a>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div id="main-content" className="flex-1">
                {children}
              </div>
              <SiteFooter />
              <ThemeCustomizer />
            </div>
          </AccentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
