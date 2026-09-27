import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Outfit } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex",
});

export const metadata: Metadata = {
  title: {
    default: "Hedy — Operations research, composed",
    template: "%s — Hedy",
  },
  description:
    "Portfolio of Hedy, Cornell ORIE: queueing, optimization, retrieval, and visual case studies for pricing, fleets, exams, and images.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${outfit.variable} ${plex.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <SiteShell>{children}</SiteShell>
        </TooltipProvider>
      </body>
    </html>
  );
}
