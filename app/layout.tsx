import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { site } from "@/config/content";
import "./globals.css";

// Body typeface
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Display typeface for headlines — the type contrast is what pulls it out of
// the generic "everything in Inter" look.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mapeocrypto.bo"),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    title: `${site.name} — Crypto Bolivia 2026`,
    description: site.tagline,
    type: "website",
    locale: "es_BO",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Crypto Bolivia 2026`,
    description: site.tagline,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        {/* Texture — non-interactive overlays */}
        <div className="vignette-overlay" aria-hidden />
        <div className="grain-overlay" aria-hidden />
      </body>
    </html>
  );
}
