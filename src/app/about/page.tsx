import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/page-transition";
import { GradientBlobs } from "@/components/background/gradient-blobs";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover Jolie — where biotech precision meets luxury feminine skincare.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <article className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28">
        <GradientBlobs />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
          <p className="mb-4 text-[0.65rem] font-medium tracking-[0.45em] uppercase text-[oklch(0.55_0.06_15)]">
            About Jolie
          </p>
          <h1 className="text-3xl font-light tracking-tight text-foreground sm:text-5xl">
            Where science meets radiance
          </h1>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              Jolie was founded on a singular belief: that luxury skincare should be
              rooted in verifiable biotech science, not fleeting trends. Our laboratory
              partners with leading peptide researchers to develop formulations that
              support cellular renewal, barrier integrity, and visible luminosity.
            </p>
            <p>
              Every product in the Jolie collection undergoes rigorous stability testing
              and batch-level authentication. Our verification system ensures that each
              formulation you receive is genuine — traceable from laboratory to ritual.
            </p>
            <p>
              We design for the discerning woman who treats her skin as an investment in
              long-term wellbeing: elegant in presentation, precise in composition, and
              uncompromising in quality.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              { label: "Biotech-first", value: "Peptide-led formulations" },
              { label: "Authenticated", value: "Serial verification" },
              { label: "Refined", value: "Luxury minimal design" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/70 bg-white/55 p-5 backdrop-blur-md"
              >
                <p className="text-[0.65rem] font-medium tracking-[0.3em] uppercase text-[oklch(0.55_0.06_15)]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </PageTransition>
  );
}
