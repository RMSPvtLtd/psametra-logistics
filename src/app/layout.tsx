import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "@/styles/globals.css";

const inter = localFont({ src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2", variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')),
  title: { default: "psametra Logistics — Freight, in full view.", template: "%s | psametra Logistics" },
  description: "Explore a connected freight experience: quote, track, manage documents and see every shipment clearly. A logistics website and software concept by psametra.",
  robots: { index: false, follow: false },
  openGraph: { title: "psametra Logistics — Freight, in full view.", description: "Physical freight. Digital control. A logistics experience by psametra.", type: "website", locale: "en_GB", siteName: "psametra Logistics" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" className={inter.variable} data-theme="light" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `(function(){var t;try{t=localStorage.getItem("psametra-theme")}catch(e){}document.documentElement.dataset.theme=t==="light"||t==="dark"?t:matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"})()` }} /></head><body><a href="#main" className="skip-link">Skip to content</a><Header /><main id="main" tabIndex={-1}>{children}</main><Footer /></body></html>;
}
