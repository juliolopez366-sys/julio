import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display-loaded",
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  variable: "--font-body-loaded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Encuentra tu detonante real | Rastreador SII/FODMAP",
  description:
    "Cruza cada síntoma con lo que comiste en las últimas 48 horas y descubre tu detonante real — sin teclear, sin adivinar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${workSans.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col">{children}</body>
    </html>
  );
}
