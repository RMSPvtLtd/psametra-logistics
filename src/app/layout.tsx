import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/navigation/header";
import { site } from "@/content/site";
import { TransitionProvider } from "@/components/navigation/transition-provider";
import { themeBootstrap } from "@/components/navigation/theme-config";
import { Footer } from "@/components/footer";
import { ScrollProvider } from "@/components/navigation/scroll-provider";
import { MotionObserver } from "@/components/motion-observer";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: {
    default: "Psametra — Software engineered for what’s next.",
    template: "%s — Psametra",
  },
  description: site.description,
  openGraph: {
    title: "Psametra — Software engineered for what’s next.",
    description: site.description,
    type: "website",
    siteName: site.name,
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        <ScrollProvider>
          <TransitionProvider>
            <MotionObserver />
            <a className="skip-link" href="#main">
              Skip to content
            </a>
            <Header />
            <main id="main" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </TransitionProvider>
        </ScrollProvider>
      </body>
    </html>
  );
}
