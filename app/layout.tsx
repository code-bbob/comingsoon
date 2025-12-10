import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
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

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased min-h-full bg-[var(--background)] text-[color:var(--foreground)] selection:bg-[var(--foreground)] selection:text-[var(--background)]`}
      >
        <header className="bg-black text-center text-white py-2 px-2 top-0 z-50 bg-[rgba(201,164,107,0.18)]  backdrop-blur-sm backdrop-saturate-50 border-b border-[color:var(--line-color)] font-playfair">
          Winter Sale is Live! Up to 30% off on selected items. <a href="#newborns" className="underline font-semibold">Shop Now</a>
          </header>

        <header className="sticky top-0 z-50 bg-[rgba(201,164,107,0.18)]  backdrop-blur-3xl backdrop-saturate-50 border-b border-[color:var(--line-color)] ">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="inline-block w-3 h-3 rounded-full bg-[var(--accent)] shadow-[0_0_0_6px_hsl(var(--accent-rgb)/0.2)]" />
              <span className="text-lg font-playfair text-[color:var(--foreground)]">Aama Ko Nana</span>
            </div>
            <nav className="hidden md:flex items-center gap-5" aria-label="Primary">
              <a className="text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition-colors" href="#story">Story</a>
              <a className="text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition-colors" href="#materials">Materials</a>
              <a className="text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition-colors" href="#care">Care</a>
              <a className="text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition-colors" href="#newsletter">Updates</a>
            </nav>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              {/* <a
                className="inline-flex items-center gap-2 rounded-[18px] px-4 py-[0.7rem] font-semibold text-white border border-[color:var(--line-color)] shadow-[0_2px_10px_-2px_hsl(var(--accent-rgb)/0.55)] bg-[linear-gradient(92deg,var(--accent),var(--accent-2))] hover:shadow-[0_4px_20px_-4px_hsl(var(--accent-rgb)/0.7)] transition"
                href="#newsletter"
              >
                <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_0_6px_hsl(var(--accent-rgb)/0.18)]" />
                Join List
              </a> */}
            </div>
          </div>
        </header>

        <main id="main">{children}</main>
        <footer className="border-t border-[color:var(--line-color)] mt-16 py-8 text-[color:var(--muted)]">
          <div className="max-w-6xl mx-auto px-6" role="contentinfo">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <p>© {new Date().getFullYear()} Aama Ko Nana. All rights reserved.</p>
              <div className="flex gap-4">
                <a className="opacity-70 hover:opacity-100 transition" href="#" aria-label="Instagram">Instagram</a>
                <a className="opacity-70 hover:opacity-100 transition" href="#" aria-label="Facebook">Facebook</a>
                <a className="opacity-70 hover:opacity-100 transition" href="#" aria-label="X">X</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
