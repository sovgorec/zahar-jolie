"use client";

import { motion } from "framer-motion";
import { HeroAmbientBackground } from "@/components/hero/hero-ambient-background";
import { HeroButterflyVisual } from "@/components/hero/hero-butterfly-visual";
import { useSiteUi } from "@/components/providers/site-providers";
import { fadeUp, staggerContainer } from "@/lib/motion";
import type { SiteSettings } from "@/types/cms";

interface HeroSectionProps {
  settings: SiteSettings;
}

function formatHeroTitle(title: string): string[] {
  const trimmed = title.trim();
  if (trimmed.includes("\n")) {
    return trimmed.split("\n").map((l) => l.trim()).filter(Boolean);
  }
  const words = trimmed.split(/\s+/);
  if (words.length <= 3) return [trimmed];
  return [words.slice(0, 2).join(" "), words.slice(2).join(" ")];
}

export function HeroSection({ settings }: HeroSectionProps) {
  const { openVerify } = useSiteUi();
  const titleLines = formatHeroTitle(settings.hero_title);

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      <HeroAmbientBackground />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-0 px-5 pb-20 pt-24 text-center sm:px-8 sm:pb-24 sm:pt-28"
      >
        <motion.div
          variants={fadeUp}
          className="flex w-full flex-[1.2] items-center justify-center py-4 sm:py-6"
        >
          <HeroButterflyVisual />
        </motion.div>

        <motion.div variants={fadeUp} className="max-w-2xl">
          <h1 className="text-balance text-3xl font-light leading-[1.12] tracking-tight text-foreground sm:text-5xl md:text-[3.25rem]">
            {titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:max-w-lg sm:text-base"
        >
          {settings.hero_subtitle}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 sm:mt-10">
          <button
            type="button"
            onClick={openVerify}
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-10 text-sm font-medium tracking-wide text-white transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span
              className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"
              aria-hidden
            />
            <span
              className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70"
              aria-hidden
            />
            <span className="absolute inset-0 rounded-full shadow-[0_8px_32px_-4px_rgba(139,92,246,0.55)] transition-shadow duration-500 group-hover:shadow-[0_12px_48px_-4px_rgba(168,85,247,0.65)]" />
            <span className="relative">Verify Authenticity</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
