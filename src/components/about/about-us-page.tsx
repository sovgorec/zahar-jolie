"use client";

import { motion } from "framer-motion";
import { GradientBlobs } from "@/components/background/gradient-blobs";
import { AboutSectionBlock } from "@/components/about/about-section-block";
import {
  ABOUT_HERO,
  ABOUT_QUALITY_PILLARS,
  ABOUT_QUALITY_TITLE,
  ABOUT_SECTIONS,
} from "@/data/about-content";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function AboutUsPage() {
  return (
    <article className="relative overflow-hidden">
      <GradientBlobs />

      {/* Hero */}
      <section className="relative border-b border-white/40 pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,oklch(1_0.02_350/0.85),transparent)]"
          aria-hidden
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative mx-auto max-w-6xl px-5 sm:px-8"
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 text-[0.65rem] font-medium tracking-[0.48em] uppercase text-[oklch(0.55_0.06_15)]"
          >
            {ABOUT_HERO.label}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="max-w-4xl text-balance text-3xl font-light leading-[1.12] tracking-tight text-foreground sm:text-5xl md:text-[3.25rem]"
          >
            {ABOUT_HERO.title}
          </motion.h1>
          <motion.div
            variants={fadeUp}
            className="mt-10 h-px w-24 bg-gradient-to-r from-[oklch(0.72_0.06_15)] to-transparent"
            aria-hidden
          />
        </motion.div>
      </section>

      {/* Alternating content sections */}
      <div className="relative space-y-20 py-20 sm:space-y-28 sm:py-28">
        {ABOUT_SECTIONS.map((section, index) => (
          <AboutSectionBlock key={section.id} section={section} index={index} />
        ))}
      </div>

      {/* European Quality Emphasis */}
      <section
        className="relative border-t border-white/50 bg-white/30 py-20 sm:py-28"
        aria-labelledby="about-quality-emphasis"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_50%,oklch(0.94_0.04_25/0.5),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-12 text-center sm:mb-16"
          >
            <h2
              id="about-quality-emphasis"
              className="text-3xl font-light tracking-tight text-foreground sm:text-4xl"
            >
              {ABOUT_QUALITY_TITLE}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
            className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8"
          >
            {ABOUT_QUALITY_PILLARS.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                className="group rounded-2xl border border-white/70 bg-white/55 p-6 shadow-[0_16px_48px_-20px_oklch(0.45_0.04_15/0.18)] backdrop-blur-md transition-shadow hover:shadow-[0_24px_56px_-16px_oklch(0.45_0.05_15/0.22)] sm:p-8"
              >
                <div className="mb-4 h-px w-10 bg-gradient-to-r from-[oklch(0.72_0.06_15)] to-transparent transition-all group-hover:w-16" />
                <h3 className="text-lg font-medium tracking-tight text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem] sm:leading-[1.7]">
                  {pillar.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="h-8 sm:h-12" aria-hidden />
    </article>
  );
}
