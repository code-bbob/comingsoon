import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
