import type { Metadata } from "next";
import Script from "next/script";
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

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X5K9BPJ10S"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-X5K9BPJ10S');`}
        </Script>
      </body>
    </html>
  );
}
