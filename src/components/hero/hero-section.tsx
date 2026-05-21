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
    <section className="relative h-svh max-h-svh min-h-svh overflow-hidden supports-[height:100dvh]:min-h-dvh supports-[height:100dvh]:h-dvh supports-[height:100dvh]:max-h-dvh">
      <HeroAmbientBackground />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto grid h-full min-h-0 w-full max-w-5xl grid-rows-[auto_auto_minmax(0,1fr)_auto] items-center px-5 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] pt-[calc(5.25rem+env(safe-area-inset-top,0px))] text-center sm:px-8 sm:pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] sm:pt-[calc(4rem+env(safe-area-inset-top,0px))]"
      >
        {/* Title — CMS only */}
        <motion.div variants={fadeUp} className="shrink-0 max-w-2xl justify-self-center">
          <h1 className="text-balance font-light leading-[1.1] tracking-tight text-foreground text-[clamp(1.65rem,4.8vw,3.25rem)]">
            {titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        </motion.div>

        {/* Subtitle — CMS only */}
        <motion.p
          variants={fadeUp}
          className="shrink-0 max-w-md justify-self-center text-pretty leading-relaxed text-muted-foreground text-[clamp(0.8rem,2.2vw,1rem)] pt-[clamp(0.35rem,1vh,0.65rem)] sm:max-w-lg"
        >
          {settings.hero_subtitle}
        </motion.p>

        {/* Butterfly — larger on mobile via wrapper; desktop unchanged from sm+ */}
        <motion.div
          variants={fadeUp}
          className="flex min-h-0 w-full items-center justify-center justify-self-center overflow-hidden px-3 py-[clamp(0.15rem,1.2vh,0.85rem)] sm:px-0"
        >
          <div className="origin-center w-full max-sm:[&>div]:!max-w-[calc(100vw-24px)] max-sm:scale-100 sm:max-w-[min(60vw,920px)] sm:scale-[0.86] md:scale-[0.92] lg:scale-100 [@media(max-height:700px)]:max-sm:[&>div]:!max-w-[calc(100vw-28px)] [@media(max-height:700px)_and_(orientation:landscape)]:scale-[0.62] [@media(max-height:700px)_and_(orientation:landscape)]:sm:scale-[0.86]">
            <HeroButterflyVisual />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          className="shrink-0 justify-self-center pb-1 pt-[clamp(0.5rem,1.5vh,1rem)] sm:pb-0"
        >
          <button
            type="button"
            onClick={openVerify}
            className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full px-9 text-sm font-medium tracking-wide text-white transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] sm:h-12 sm:px-10"
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
