"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { GradientBlobs } from "@/components/background/gradient-blobs";
import { ButterflyLayer } from "@/components/background/butterfly-layer";
import { useSiteUi } from "@/components/providers/site-providers";
import { fadeUp, staggerContainer } from "@/lib/motion";
import type { SiteSettings } from "@/types/cms";

interface HeroSectionProps {
  settings: SiteSettings;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const { openVerify } = useSiteUi();

  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-24 sm:pt-28">
      <GradientBlobs />
      <ButterflyLayer />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,oklch(1_0.02_350/0.9),transparent)]"
        aria-hidden
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex max-w-6xl flex-col items-center px-5 pb-20 pt-8 text-center sm:px-8 sm:pt-14"
      >
        <motion.div variants={fadeUp} className="mb-10">
          <Logo size="lg" className="items-center" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mb-4 text-[0.65rem] font-medium tracking-[0.5em] uppercase text-[oklch(0.55_0.06_15)]"
        >
          Luxury Biotech Beauty
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="max-w-3xl text-balance text-3xl font-light leading-[1.15] tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          {settings.hero_title}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {settings.hero_subtitle}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
        >
          <Button
            size="lg"
            className="h-11 rounded-full bg-[oklch(0.42_0.06_15)] px-8 text-white hover:bg-[oklch(0.38_0.06_15)]"
            onClick={openVerify}
          >
            Verify authenticity
          </Button>
          <Link
            href="/#products"
            className="inline-flex h-11 items-center justify-center rounded-full border border-rose-200/70 bg-white/70 px-8 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-white"
          >
            Explore products
          </Link>
        </motion.div>

        {settings.intro_video ? (
          <motion.div variants={fadeUp} className="mt-14 w-full max-w-2xl">
            <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/40 p-1 shadow-[0_24px_80px_-20px_oklch(0.5_0.05_15/0.2)] backdrop-blur-md">
              <video
                src={settings.intro_video}
                className="aspect-video w-full rounded-xl object-cover"
                controls
                playsInline
                preload="metadata"
              />
            </div>
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
}
