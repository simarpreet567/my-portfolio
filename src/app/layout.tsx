import type { Metadata } from "next";
import "./globals.css";

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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased scanlines">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
