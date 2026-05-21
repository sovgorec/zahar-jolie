"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const organicEase = [0.45, 0, 0.55, 1] as const;

const TITLE_LINES = ["10 IU recombinant", "human growth hormone"] as const;

const SHOWCASE_COPY = [
  "A flagship biotech formulation engineered for precision, consistency, and clinical-grade presentation.",
  "Manufactured under European quality frameworks — sterile solution, validated processes, and pharmaceutical-grade oversight from batch to release.",
] as const;

export function FlagshipShowcase() {
  return (
    <section
      className="relative overflow-hidden border-t border-white/40 py-20 sm:py-28 lg:py-32"
      aria-labelledby="flagship-showcase-title"
    >
      {/* Section atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.975_0.012_280)_0%,oklch(0.99_0.008_350)_50%,oklch(0.97_0.015_250)_100%)]"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute left-[10%] top-[20%] h-[40vh] w-[40vh] rounded-full bg-[radial-gradient(circle,oklch(0.82_0.08_220/0.12)_0%,transparent_70%)] blur-[80px]"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: organicEase }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute right-[8%] bottom-[15%] h-[36vh] w-[36vh] rounded-full bg-[radial-gradient(circle,oklch(0.78_0.1_290/0.1)_0%,transparent_72%)] blur-[72px]"
        animate={{ opacity: [0.25, 0.42, 0.25] }}
        transition={{ duration: 12, repeat: Infinity, ease: organicEase }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:gap-16 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Product visual */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,oklch(0.8_0.1_250/0.25)_0%,transparent_68%)] blur-3xl"
            animate={{ opacity: [0.35, 0.55, 0.35], scale: [0.96, 1.04, 0.96] }}
            transition={{ duration: 7, repeat: Infinity, ease: organicEase }}
            aria-hidden
          />

          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 6, repeat: Infinity, ease: organicEase }}
            className="relative"
          >
            <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">
              <Image
                src="/images/flagship-product.png"
                alt="Jolie sterile solution — flagship pharmaceutical presentation"
                fill
                className="object-contain object-center drop-shadow-[0_24px_48px_oklch(0.45_0.05_280/0.15)]"
                sizes="(max-width: 1024px) 90vw, 50vw"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Copy */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="flex flex-col text-center lg:text-left"
        >
          <p className="mb-5 text-[0.65rem] font-medium tracking-[0.48em] uppercase text-[oklch(0.55_0.06_15)]">
            Flagship Formulation
          </p>

          <h2
            id="flagship-showcase-title"
            className="text-balance text-3xl font-light leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]"
          >
            {TITLE_LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <div className="mt-8 space-y-5 sm:mt-10">
            {SHOWCASE_COPY.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mx-auto max-w-md text-pretty text-sm leading-[1.75] text-muted-foreground sm:text-base lg:mx-0 lg:max-w-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <Link
              href="/about"
              className="inline-flex h-10 items-center justify-center rounded-full border border-white/80 bg-white/50 px-7 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-white/80"
            >
              About Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
