import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "simukhurana | Portfolio",
  description: "Software Engineer from Ludhiana, India",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased scanlines`}>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
