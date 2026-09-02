import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CFConsulting — Toute la chaîne de valeur digitale",
    template: "%s — CFConsulting",
  },
  description:
    "CFConsulting couvre l'intégralité de la chaîne de valeur digitale, de la stratégie à l'exécution, à travers quatre pôles complémentaires : cadrage, exécution technique, logiciels métiers bancaires et solutions sectorielles.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">{children}</body>
    </html>
  );
}
