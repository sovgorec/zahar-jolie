import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/page-transition";
import { AboutUsPage } from "@/components/about/about-us-page";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About product and production — European quality, GMP manufacturing, and pharmaceutical excellence.",
  openGraph: {
    title: "About Us · Jolie",
    description:
      "European Quality & Production — Growth Hormone (GH) overview, quality systems, and regulatory adherence.",
  },
};

export default function AboutPage() {
  return (
    <PageTransition>
      <AboutUsPage />
    </PageTransition>
  );
}
