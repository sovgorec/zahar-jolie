"use client";

import { motion } from "framer-motion";

export function GradientBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -left-[10%] top-[8%] h-[min(520px,70vw)] w-[min(520px,70vw)] rounded-full bg-[radial-gradient(circle,oklch(0.92_0.06_350)_0%,transparent_70%)] blur-3xl"
        animate={{ x: [0, 28, 0], y: [0, 18, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[8%] top-[22%] h-[min(480px,65vw)] w-[min(480px,65vw)] rounded-full bg-[radial-gradient(circle,oklch(0.9_0.05_25)_0%,transparent_72%)] blur-3xl"
        animate={{ x: [0, -24, 0], y: [0, 22, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[5%] left-[20%] h-[min(400px,55vw)] w-[min(400px,55vw)] rounded-full bg-[radial-gradient(circle,oklch(0.94_0.04_85)_0%,transparent_70%)] blur-3xl opacity-80"
        animate={{ x: [0, 16, 0], y: [0, -14, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
