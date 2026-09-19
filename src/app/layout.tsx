import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { getContent } from "@/lib/store";
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

export async function generateMetadata(): Promise<Metadata> {
  const { favicon } = await getContent();
  return {
    ...baseMetadata,
    ...(favicon ? { icons: { icon: favicon, shortcut: favicon, apple: favicon } } : {}),
  };
}

const baseMetadata: Metadata = {
  title: {
    default: "CFConsulting — Toute la chaîne de valeur digitale",
    template: "%s — CFConsulting",
  },
  description:
    "CFConsulting couvre l'intégralité de la chaîne de valeur digitale, de la stratégie à l'exécution, à travers quatre pôles complémentaires : cadrage, exécution technique, logiciels métiers bancaires et solutions sectorielles.",
};

export const dynamic = "force-dynamic";

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
