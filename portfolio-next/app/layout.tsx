import type { Metadata } from "next";
import { Inter, Newsreader, Caveat } from "next/font/google";
import "./globals.css";

// Self-hosted via next/font (no Google <link> in production, per the skill).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  weight: ["500", "600", "700"],
});
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Isha Ghatule, Product Manager",
  description:
    "Product Manager building AI-native, compliance-aware fintech products. A portfolio built as a Jira ticket.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${newsreader.variable} ${caveat.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
