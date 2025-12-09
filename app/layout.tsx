import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "../components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aama Ko Nana – आमाको न्यानोपनको अनुभूति (Coming Soon)",
  description:
    "Aama Ko Nana – आमाको न्यानोपनको अनुभूति | Countdown to a new crafted experience blending design, narrative & commerce.",
  keywords: [
    "Aama Ko Nana",
    "coming soon",
    "design",
    "portfolio",
    "commerce",
    "Nepal",
  ],
  openGraph: {
    title: "Aama Ko Nana — Coming Soon",
    description: "आमाको न्यानोपनको अनुभूति. A bold creative & commerce destination in the making.",
    url: "https://example.com",
    siteName: "Aama Ko Nana",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aama Ko Nana Coming Soon",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aama Ko Nana — Coming Soon",
    description: "आमाको न्यानोपनको अनुभूति.",
    images: ["/og-image.png"],
  },
  robots: { index: false, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full bg-background text-foreground selection:bg-foreground selection:text-background`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-background/90 focus:backdrop-blur-sm focus:px-4 focus:py-2 focus:rounded-md focus:border focus:border-foreground/20"
        >
          Skip to content
        </a>
        <header className="sticky top-0 z-50 nav-glass">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="brand-dot" />
              <span className="text-foreground">Aama Ko Nana</span>
            </div>
            <nav className="hidden md:flex items-center gap-5" aria-label="Primary">
              <a className="text-muted hover:text-foreground transition-colors" href="#story">Story</a>
              <a className="text-muted hover:text-foreground transition-colors" href="#materials">Materials</a>
              <a className="text-muted hover:text-foreground transition-colors" href="#care">Care</a>
              <a className="text-muted hover:text-foreground transition-colors" href="#newsletter">Updates</a>
            </nav>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <a className="btn btn-primary" href="#newsletter" style={{padding:"0.7rem 1rem", borderRadius:18}}>
                <span className="dot" /> Join List
              </a>
            </div>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="footer">
          <div className="container" role="contentinfo">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem'}}>
              <p>© {new Date().getFullYear()} Aama Ko Nana. All rights reserved.</p>
              <div style={{display:'flex',gap:'1rem'}}>
                <a href="#" aria-label="Instagram">Instagram</a>
                <a href="#" aria-label="Facebook">Facebook</a>
                <a href="#" aria-label="X">X</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
