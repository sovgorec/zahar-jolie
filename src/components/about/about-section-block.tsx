"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/motion";
import type { AboutTextSection } from "@/data/about-content";

interface AboutSectionBlockProps {
  section: AboutTextSection;
  index: number;
}

export function AboutSectionBlock({ section, index }: AboutSectionBlockProps) {
  const reversed = index % 2 === 1;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      className="relative"
      aria-labelledby={`about-${section.id}`}
    >
      <div
        className={cn(
          "mx-auto grid max-w-6xl items-center gap-10 px-5 sm:gap-14 sm:px-8 lg:grid-cols-12 lg:gap-16",
          reversed && "lg:[&>div:first-child]:order-2",
        )}
      >
        <div className="lg:col-span-5">
          <div
            className={cn(
              "relative overflow-hidden rounded-3xl border border-white/55 p-8 sm:p-10",
              "bg-white/42 shadow-[0_20px_60px_-26px_oklch(0.5_0.06_280/0.14)] backdrop-blur-sm",
            )}
          >
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[radial-gradient(circle,oklch(0.82_0.1_250/0.12)_0%,transparent_70%)] blur-2xl"
              aria-hidden
            />
            <p className="mb-3 text-[0.65rem] font-medium tracking-[0.4em] uppercase text-[oklch(0.55_0.06_15)]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2
              id={`about-${section.id}`}
              className="text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl"
            >
              {section.title}
            </h2>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="max-w-prose space-y-5">
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-base leading-[1.75] text-muted-foreground sm:text-[1.05rem]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
