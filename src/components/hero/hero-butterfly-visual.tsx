"use client";

import Image from "next/image";
import { motion, useSpring } from "framer-motion";
import { useMouseParallax } from "@/hooks/use-mouse-parallax";

const organicEase = [0.45, 0, 0.55, 1] as const;

interface HeroButterflyVisualProps {
  parallaxIntensity?: number;
}

function FloatingParticle({ delay, left, top }: { delay: number; left: string; top: string }) {
  return (
    <motion.span
      className="pointer-events-none absolute size-1 rounded-full bg-violet-300/40 blur-[1px]"
      style={{ left, top }}
      animate={{ y: [0, -12, 0], opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden
    />
  );
}

export function HeroButterflyVisual({
  parallaxIntensity = 10,
}: HeroButterflyVisualProps) {
  const mouse = useMouseParallax(parallaxIntensity);
  const springX = useSpring(mouse.x, { stiffness: 50, damping: 22 });
  const springY = useSpring(mouse.y, { stiffness: 50, damping: 22 });

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[min(60vw,920px)] will-change-transform"
      style={{ x: springX, y: springY }}
      animate={{
        y: [-5, 5, -5],
        scale: [1, 1.012, 1],
      }}
      transition={{
        y: { duration: 5.5, repeat: Infinity, ease: organicEase },
        scale: { duration: 5, repeat: Infinity, ease: organicEase },
      }}
    >
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[42%] h-[70%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,oklch(0.78_0.14_265/0.45)_0%,oklch(0.82_0.12_290/0.12)_55%,transparent_72%)] blur-3xl"
        animate={{ opacity: [0.35, 0.6, 0.35], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 6, repeat: Infinity, ease: organicEase }}
        aria-hidden
      />

      <FloatingParticle delay={0} left="18%" top="22%" />
      <FloatingParticle delay={1.2} left="78%" top="30%" />
      <FloatingParticle delay={2.4} left="62%" top="68%" />

      <div
        className="relative mx-auto aspect-[5/4] w-full sm:aspect-[6/5]"
        role="img"
        aria-label="Jolie butterfly emblem"
      >
        {/* Left wing — transparent layer, hinge at center-right */}
        <motion.div
          className="absolute inset-0 z-10 will-change-transform"
          style={{ transformOrigin: "100% 48%" }}
          animate={{ rotate: [-2, 1.5, -2], y: [0, -2, 0] }}
          transition={{
            rotate: { duration: 5, repeat: Infinity, ease: organicEase },
            y: { duration: 4.5, repeat: Infinity, ease: organicEase },
          }}
        >
          <Image
            src="/images/butterfly-wing-left.png"
            alt=""
            fill
            priority
            className="object-contain object-center select-none"
            sizes="(max-width: 768px) 92vw, 920px"
          />
        </motion.div>

        {/* Right wing — transparent layer, hinge at center-left */}
        <motion.div
          className="absolute inset-0 z-10 will-change-transform"
          style={{ transformOrigin: "0% 48%" }}
          animate={{ rotate: [2, -1.5, 2], y: [0, 2, 0] }}
          transition={{
            rotate: { duration: 5, repeat: Infinity, ease: organicEase, delay: 0.15 },
            y: { duration: 4.5, repeat: Infinity, ease: organicEase, delay: 0.15 },
          }}
        >
          <Image
            src="/images/butterfly-wing-right.png"
            alt=""
            fill
            priority
            className="object-contain object-center select-none"
            sizes="(max-width: 768px) 92vw, 920px"
          />
        </motion.div>

        {/* Soft depth shadow — no white fill */}
        <div
          className="pointer-events-none absolute bottom-[8%] left-1/2 h-[12%] w-[55%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse,oklch(0.5_0.08_280/0.12)_0%,transparent_70%)] blur-xl"
          aria-hidden
        />
      </div>
    </motion.div>
  );
}
