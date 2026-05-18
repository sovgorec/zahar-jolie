"use client";

import { motion } from "framer-motion";

interface ButterflySpec {
  top: string;
  left: string;
  scale: number;
  opacity: number;
  blur: number;
  duration: number;
  delay: number;
  rotate: number;
}

const BUTTERFLIES: ButterflySpec[] = [
  { top: "12%", left: "8%", scale: 0.9, opacity: 0.22, blur: 2, duration: 14, delay: 0, rotate: -8 },
  { top: "28%", left: "78%", scale: 1.1, opacity: 0.18, blur: 3, duration: 18, delay: 2, rotate: 12 },
  { top: "58%", left: "14%", scale: 0.75, opacity: 0.15, blur: 4, duration: 16, delay: 1, rotate: 6 },
  { top: "72%", left: "68%", scale: 0.85, opacity: 0.2, blur: 2.5, duration: 20, delay: 3, rotate: -14 },
  { top: "38%", left: "42%", scale: 0.55, opacity: 0.12, blur: 5, duration: 22, delay: 4, rotate: 4 },
];

function ButterflySvg({ blur }: { blur: number }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `blur(${blur}px)` }}
    >
      <path
        d="M60 40 C52 28 38 18 28 22 C18 26 22 38 34 42 C26 36 18 44 24 52 C30 58 44 50 52 44 C56 48 64 48 68 44 C76 50 90 58 96 52 C102 44 94 36 86 42 C98 38 102 26 92 22 C82 18 68 28 60 40Z"
        fill="currentColor"
        className="text-[oklch(0.72_0.08_15)]"
      />
      <ellipse cx="60" cy="40" rx="2.5" ry="14" fill="oklch(0.55 0.06 15)" opacity="0.6" />
    </svg>
  );
}

export function ButterflyLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {BUTTERFLIES.map((b, i) => (
        <motion.div
          key={i}
          className="absolute text-foreground"
          style={{
            top: b.top,
            left: b.left,
            width: `${80 * b.scale}px`,
            height: `${54 * b.scale}px`,
            opacity: b.opacity,
            rotate: b.rotate,
          }}
          animate={{
            y: [0, -18, 0, 12, 0],
            x: [0, 12, -8, 6, 0],
            rotate: [b.rotate, b.rotate + 6, b.rotate - 4, b.rotate],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ButterflySvg blur={b.blur} />
        </motion.div>
      ))}
    </div>
  );
}
