"use client";

import { motion } from "framer-motion";

export function HeroAmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[linear-gradient(165deg,oklch(0.99_0.01_350)_0%,oklch(0.96_0.025_280)_45%,oklch(0.97_0.02_250)_100%)]" />

      <motion.div
        className="absolute -left-[15%] top-[10%] h-[55vh] w-[55vh] rounded-full bg-[radial-gradient(circle,oklch(0.88_0.08_280/0.55)_0%,transparent_68%)] blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 24, 0], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[10%] top-[20%] h-[50vh] w-[50vh] rounded-full bg-[radial-gradient(circle,oklch(0.86_0.1_250/0.5)_0%,transparent_70%)] blur-3xl"
        animate={{ x: [0, -32, 0], y: [0, 18, 0], opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[8%] left-[25%] h-[42vh] w-[42vh] rounded-full bg-[radial-gradient(circle,oklch(0.9_0.06_320/0.45)_0%,transparent_72%)] blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -16, 0], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-1/2 top-[38%] h-[min(520px,70vw)] w-[min(520px,70vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.82_0.12_265/0.35)_0%,transparent_65%)] blur-[80px]"
        animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
