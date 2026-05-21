"use client";

import Image from "next/image";
import { motion, useSpring } from "framer-motion";
import { useMouseParallax } from "@/hooks/use-mouse-parallax";

const wingEase = "easeInOut" as const;

interface HeroButterflyVisualProps {
  parallaxIntensity?: number;
}

function ButterflyHalf({
  clip,
  origin,
  rotateKeyframes,
}: {
  clip: string;
  origin: string;
  rotateKeyframes: number[];
}) {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden will-change-transform"
      style={{ clipPath: clip, transformOrigin: origin }}
      animate={{ rotate: rotateKeyframes }}
      transition={{ duration: 8, repeat: Infinity, ease: wingEase }}
    >
      <Image
        src="/images/butterfly.png"
        alt=""
        fill
        priority
        className="object-contain object-center"
        sizes="(max-width: 768px) 92vw, 720px"
      />
    </motion.div>
  );
}

export function HeroButterflyVisual({
  parallaxIntensity = 14,
}: HeroButterflyVisualProps) {
  const mouse = useMouseParallax(parallaxIntensity);
  const springX = useSpring(mouse.x, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouse.y, { stiffness: 60, damping: 20 });

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[min(92vw,680px)] will-change-transform"
      style={{ x: springX, y: springY }}
      animate={{ y: [-6, 6, -6] }}
      transition={{ duration: 9, repeat: Infinity, ease: wingEase }}
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,oklch(0.78_0.14_265/0.55)_0%,oklch(0.85_0.1_290/0.15)_50%,transparent_72%)] blur-3xl"
        animate={{ opacity: [0.4, 0.72, 0.4], scale: [0.94, 1.06, 0.94] }}
        transition={{ duration: 7, repeat: Infinity, ease: wingEase }}
        aria-hidden
      />

      <div
        className="relative aspect-[5/4] w-full drop-shadow-[0_28px_64px_oklch(0.5_0.1_280/0.28)] sm:aspect-[6/5]"
        role="img"
        aria-label="Jolie butterfly emblem"
      >
        <ButterflyHalf
          clip="inset(0 50% 0 0)"
          origin="100% 50%"
          rotateKeyframes={[-1.5, 1.5, -1.5]}
        />
        <ButterflyHalf
          clip="inset(0 0 0 50%)"
          origin="0% 50%"
          rotateKeyframes={[1.5, -1.5, 1.5]}
        />
      </div>
    </motion.div>
  );
}
