"use client";

import { motion } from "framer-motion";

const blobEase = "easeInOut" as const;

function AmbientBlob({
  className,
  duration,
  delay = 0,
  animate,
}: {
  className: string;
  duration: number;
  delay?: number;
  animate: {
    x?: number[];
    y?: number[];
    opacity?: number[];
    scale?: number[];
  };
}) {
  return (
    <motion.div
      className={className}
      animate={animate}
      transition={{ duration, repeat: Infinity, ease: blobEase, delay }}
      aria-hidden
    />
  );
}

export function HeroAmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Base atmospheric wash */}
      <div className="absolute inset-0 bg-[linear-gradient(168deg,oklch(0.992_0.008_350)_0%,oklch(0.965_0.022_285)_38%,oklch(0.97_0.018_250)_68%,oklch(0.975_0.015_220)_100%)]" />

      {/* Soft center lift behind butterfly */}
      <div className="absolute left-1/2 top-[32%] h-[min(640px,75vh)] w-[min(720px,85vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,oklch(0.94_0.03_280/0.5)_0%,transparent_68%)] blur-3xl" />

      {/* Cyan — upper left */}
      <AmbientBlob
        className="absolute -left-[12%] top-[6%] h-[48vh] w-[48vh] rounded-full bg-[radial-gradient(circle,oklch(0.82_0.09_210/0.22)_0%,transparent_70%)] blur-[72px]"
        duration={16}
        animate={{
          x: [0, 28, 0],
          y: [0, 18, 0],
          opacity: [0.35, 0.5, 0.35],
        }}
      />

      {/* Pale blue — upper right */}
      <AmbientBlob
        className="absolute -right-[8%] top-[14%] h-[44vh] w-[44vh] rounded-full bg-[radial-gradient(circle,oklch(0.8_0.08_250/0.2)_0%,transparent_72%)] blur-[68px]"
        duration={18}
        animate={{
          x: [0, -24, 0],
          y: [0, 14, 0],
          opacity: [0.3, 0.48, 0.3],
        }}
      />

      {/* Lavender — mid right */}
      <AmbientBlob
        className="absolute right-[5%] top-[42%] h-[36vh] w-[36vh] rounded-full bg-[radial-gradient(circle,oklch(0.78_0.1_290/0.18)_0%,transparent_70%)] blur-[64px]"
        duration={20}
        animate={{
          x: [0, -16, 0],
          y: [0, 20, 0],
          opacity: [0.28, 0.42, 0.28],
        }}
      />

      {/* Light violet — lower left */}
      <AmbientBlob
        className="absolute bottom-[10%] left-[8%] h-[40vh] w-[40vh] rounded-full bg-[radial-gradient(circle,oklch(0.8_0.09_300/0.16)_0%,transparent_72%)] blur-[70px]"
        duration={19}
        animate={{
          x: [0, 18, 0],
          y: [0, -14, 0],
          opacity: [0.26, 0.4, 0.26],
        }}
      />

      {/* Turquoise — lower center */}
      <AmbientBlob
        className="absolute bottom-[18%] left-[38%] h-[32vh] w-[32vh] rounded-full bg-[radial-gradient(circle,oklch(0.85_0.07_200/0.14)_0%,transparent_74%)] blur-[60px]"
        duration={17}
        animate={{
          x: [0, 12, 0],
          y: [0, -10, 0],
          opacity: [0.22, 0.36, 0.22],
        }}
      />

      {/* Butterfly halo — subtle pulse */}
      <AmbientBlob
        className="absolute left-1/2 top-[36%] h-[min(480px,65vw)] w-[min(480px,65vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.8_0.11_265/0.2)_0%,transparent_65%)] blur-[90px]"
        duration={10}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
      />

      {/* Ultra-soft vignette edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_40%,transparent_40%,oklch(0.98_0.01_280/0.35)_100%)]" />
    </div>
  );
}
