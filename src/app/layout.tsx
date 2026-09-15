import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "@/styles/globals.css";

const inter = localFont({ src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2", variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')),
  title: { default: "Psametra Logistics — Freight, in full view.", template: "%s | Psametra Logistics" },
  description: "Explore a connected freight experience: quote, track, manage documents and see every shipment clearly. A logistics website and software concept by Psametra.",
  robots: { index: false, follow: false },
  openGraph: { title: "Psametra Logistics — Freight, in full view.", description: "Physical freight. Digital control. A logistics experience by Psametra.", type: "website", locale: "en_GB", siteName: "Psametra Logistics" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={inter.variable}><body><a href="#main" className="skip-link">Skip to content</a><Header /><main id="main" tabIndex={-1}>{children}</main><Footer /></body></html>;
}
