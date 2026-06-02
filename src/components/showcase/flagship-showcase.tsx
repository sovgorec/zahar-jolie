"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FLAGSHIP_SHOWCASE } from "@/data/flagship-showcase-content";
import { fadeUp, staggerContainer } from "@/lib/motion";

const organicEase = [0.45, 0, 0.55, 1] as const;

export function FlagshipShowcase() {
  return (
    <section
      className="relative overflow-hidden border-t border-white/40 py-20 sm:py-28 lg:py-36"
      aria-labelledby="flagship-showcase-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.975_0.012_280)_0%,oklch(0.99_0.008_350)_45%,oklch(0.97_0.015_250)_100%)]"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute left-[5%] top-[15%] h-[45vh] w-[45vh] rounded-full bg-[radial-gradient(circle,oklch(0.82_0.08_220/0.1)_0%,transparent_70%)] blur-[90px]"
        animate={{ opacity: [0.28, 0.48, 0.28] }}
        transition={{ duration: 10, repeat: Infinity, ease: organicEase }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute right-[5%] bottom-[10%] h-[40vh] w-[40vh] rounded-full bg-[radial-gradient(circle,oklch(0.78_0.1_290/0.08)_0%,transparent_72%)] blur-[80px]"
        animate={{ opacity: [0.22, 0.4, 0.22] }}
        transition={{ duration: 12, repeat: Infinity, ease: organicEase }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Hero: image + headline */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16 xl:gap-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
          >
            <motion.div
              className="pointer-events-none absolute -inset-4 rounded-[28px] bg-[radial-gradient(ellipse,oklch(0.8_0.1_250/0.22)_0%,transparent_72%)] blur-2xl sm:-inset-6"
              animate={{ opacity: [0.4, 0.65, 0.4] }}
              transition={{ duration: 7, repeat: Infinity, ease: organicEase }}
              aria-hidden
            />
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 6, repeat: Infinity, ease: organicEase }}
              className="relative overflow-hidden rounded-[20px] bg-white/40 shadow-[0_28px_64px_-16px_oklch(0.45_0.06_280/0.22)] ring-1 ring-white/60"
            >
              <div className="relative aspect-[5/4] w-full sm:aspect-[4/3]">
                <Image
                  src="/images/flagship-product.png"
                  alt="Jolie HGH rDNA Growth Hormone — pharmaceutical kit presentation"
                  fill
                  className="object-contain object-center p-2 sm:p-3"
                  sizes="(max-width: 1024px) 92vw, 55vw"
                  priority={false}
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="flex flex-col text-center lg:text-left"
          >
            <motion.p
              variants={fadeUp}
              className="mb-4 text-[0.65rem] font-medium tracking-[0.48em] uppercase text-[oklch(0.55_0.06_15)]"
            >
              Flagship Formulation
            </motion.p>
            <motion.div variants={fadeUp} id="flagship-showcase-title">
              <h2 className="text-balance text-4xl font-light leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
                {FLAGSHIP_SHOWCASE.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </motion.div>
            <motion.ul
              variants={fadeUp}
              className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
            >
              {FLAGSHIP_SHOWCASE.specs.map((spec) => (
                <li
                  key={spec}
                  className="inline-flex items-center justify-center rounded-full border border-white/60 bg-white/45 px-4 py-2 text-sm font-medium tracking-wide text-foreground backdrop-blur-sm"
                >
                  {spec}
                </li>
              ))}
            </motion.ul>
            <motion.div
              variants={fadeUp}
              className="mt-8 space-y-4 rounded-2xl border border-white/55 bg-white/42 p-6 text-left shadow-[0_16px_48px_-24px_oklch(0.5_0.06_280/0.12)] backdrop-blur-sm sm:p-8"
            >
              {FLAGSHIP_SHOWCASE.overview.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-pretty text-sm leading-[1.75] text-muted-foreground sm:text-[0.95rem]"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Detail cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-2 sm:gap-5 lg:mt-24 lg:grid-cols-3 lg:gap-6"
        >
          {FLAGSHIP_SHOWCASE.sections.map((block) => (
            <motion.article
              key={block.id}
              variants={fadeUp}
              className="rounded-2xl border border-white/55 bg-white/42 p-6 shadow-[0_12px_40px_-20px_oklch(0.5_0.06_280/0.12)] backdrop-blur-sm sm:p-7"
            >
              <div className="mb-3 h-px w-10 bg-gradient-to-r from-[oklch(0.72_0.06_265)] to-transparent" />
              <h3 className="text-lg font-medium tracking-tight text-foreground">
                {block.title}
              </h3>
              <p className="mt-3 text-sm leading-[1.7] text-muted-foreground">
                {block.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
