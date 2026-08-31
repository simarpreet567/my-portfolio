import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "LITTLEBLOOM — Luxury Pastel Baby Boutique | Tiny things. Big smiles.",
  description:
    "Discover cloud-soft organic clothing, heirloom wooden toys, silicone weaning essentials and tranquil nursery bedding for your precious little one.",
  keywords: [
    "baby clothes",
    "organic cotton romper",
    "wooden toys",
    "baby boutique india",
    "nursery decor",
    "baby gifts",
    "silicone feeding set",
    "newborn essentials",
  ],
  authors: [{ name: "Littlebloom" }],
  openGraph: {
    title: "LITTLEBLOOM — Tiny things. Big smiles.",
    description:
      "Curated essentials, heirloom toys, and tranquil nursery treasures for your little one.",
    url: "https://littlebloom.in",
    siteName: "Littlebloom Baby Boutique",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-cream text-cocoa-deep min-h-screen flex flex-col antialiased selection:bg-powder-pink selection:text-cocoa-deep">
        <Providers>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
