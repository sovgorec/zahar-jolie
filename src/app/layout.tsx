import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SiteProviders } from "@/components/providers/site-providers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Jolie — luxury biotech beauty formulations. Precision skincare engineered for luminous, timeless radiance.",
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Luxury biotech beauty — precision formulations for cellular renewal and feminine radiance.",
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Luxury biotech beauty — precision formulations for cellular renewal.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[oklch(0.985_0.008_350)] font-sans text-foreground">
        <SiteProviders>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </SiteProviders>
      </body>
    </html>
  );
}
