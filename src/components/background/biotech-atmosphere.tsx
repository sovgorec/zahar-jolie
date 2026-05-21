"use client";

import { AmbientBlob } from "@/components/background/ambient-blob";

export type BiotechAtmosphereVariant = "hero" | "about";

interface BiotechAtmosphereProps {
  variant: BiotechAtmosphereVariant;
}

/** Shared luxury biotech atmospheric layer — hero & about use the same palette. */
export function BiotechAtmosphere({ variant }: BiotechAtmosphereProps) {
  const isHero = variant === "hero";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[linear-gradient(168deg,oklch(0.992_0.008_350)_0%,oklch(0.965_0.022_285)_38%,oklch(0.97_0.018_250)_68%,oklch(0.975_0.015_220)_100%)]" />

      {isHero ? (
        <div className="absolute left-1/2 top-[32%] h-[min(640px,75vh)] w-[min(720px,85vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,oklch(0.94_0.03_280/0.5)_0%,transparent_68%)] blur-3xl" />
      ) : (
        <div className="absolute left-1/2 top-[12%] h-[min(560px,70vh)] w-[min(680px,90vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,oklch(0.94_0.03_280/0.45)_0%,transparent_68%)] blur-3xl" />
      )}

      <AmbientBlob
        className={
          isHero
            ? "absolute -left-[12%] top-[6%] h-[48vh] w-[48vh] rounded-full bg-[radial-gradient(circle,oklch(0.82_0.09_210/0.22)_0%,transparent_70%)] blur-[72px]"
            : "absolute -left-[18%] top-[8%] h-[52vh] w-[52vh] rounded-full bg-[radial-gradient(circle,oklch(0.82_0.09_210/0.18)_0%,transparent_70%)] blur-[80px]"
        }
        duration={16}
        animate={{
          x: [0, 28, 0],
          y: [0, 18, 0],
          opacity: [0.32, 0.48, 0.32],
        }}
      />

      <AmbientBlob
        className={
          isHero
            ? "absolute -right-[8%] top-[14%] h-[44vh] w-[44vh] rounded-full bg-[radial-gradient(circle,oklch(0.8_0.08_250/0.2)_0%,transparent_72%)] blur-[68px]"
            : "absolute -right-[14%] top-[18%] h-[48vh] w-[48vh] rounded-full bg-[radial-gradient(circle,oklch(0.8_0.08_250/0.17)_0%,transparent_72%)] blur-[76px]"
        }
        duration={18}
        animate={{
          x: [0, -24, 0],
          y: [0, 14, 0],
          opacity: [0.28, 0.44, 0.28],
        }}
      />

      <AmbientBlob
        className={
          isHero
            ? "absolute right-[5%] top-[42%] h-[36vh] w-[36vh] rounded-full bg-[radial-gradient(circle,oklch(0.78_0.1_290/0.18)_0%,transparent_70%)] blur-[64px]"
            : "absolute right-[2%] top-[48%] h-[40vh] w-[40vh] rounded-full bg-[radial-gradient(circle,oklch(0.78_0.1_290/0.15)_0%,transparent_70%)] blur-[70px]"
        }
        duration={20}
        animate={{
          x: [0, -16, 0],
          y: [0, 20, 0],
          opacity: [0.24, 0.38, 0.24],
        }}
      />

      <AmbientBlob
        className={
          isHero
            ? "absolute bottom-[10%] left-[8%] h-[40vh] w-[40vh] rounded-full bg-[radial-gradient(circle,oklch(0.8_0.09_300/0.16)_0%,transparent_72%)] blur-[70px]"
            : "absolute bottom-[12%] left-[4%] h-[44vh] w-[44vh] rounded-full bg-[radial-gradient(circle,oklch(0.8_0.09_300/0.14)_0%,transparent_72%)] blur-[74px]"
        }
        duration={19}
        animate={{
          x: [0, 18, 0],
          y: [0, -14, 0],
          opacity: [0.22, 0.36, 0.22],
        }}
      />

      <AmbientBlob
        className={
          isHero
            ? "absolute bottom-[18%] left-[38%] h-[32vh] w-[32vh] rounded-full bg-[radial-gradient(circle,oklch(0.85_0.07_200/0.14)_0%,transparent_74%)] blur-[60px]"
            : "absolute bottom-[20%] left-[42%] h-[36vh] w-[36vh] rounded-full bg-[radial-gradient(circle,oklch(0.85_0.07_200/0.12)_0%,transparent_74%)] blur-[64px]"
        }
        duration={17}
        animate={{
          x: [0, 12, 0],
          y: [0, -10, 0],
          opacity: [0.2, 0.32, 0.2],
        }}
      />

      {!isHero && (
        <AmbientBlob
          className="absolute -left-[6%] bottom-[28%] h-[38vh] w-[38vh] rounded-full bg-[radial-gradient(circle,oklch(0.82_0.08_265/0.14)_0%,transparent_72%)] blur-[68px]"
          duration={21}
          animate={{
            x: [0, 14, 0],
            y: [0, 12, 0],
            opacity: [0.18, 0.3, 0.18],
          }}
        />
      )}

      <AmbientBlob
        className={
          isHero
            ? "absolute left-1/2 top-[36%] h-[min(480px,65vw)] w-[min(480px,65vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.8_0.11_265/0.2)_0%,transparent_65%)] blur-[90px]"
            : "absolute left-1/2 top-[55%] h-[min(420px,60vw)] w-[min(420px,60vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.8_0.11_265/0.16)_0%,transparent_65%)] blur-[88px]"
        }
        duration={10}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.22, 0.36, 0.22],
        }}
      />

      <div
        className={
          isHero
            ? "absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_40%,transparent_40%,oklch(0.98_0.01_280/0.35)_100%)]"
            : "absolute inset-0 bg-[radial-gradient(ellipse_95%_85%_at_50%_30%,transparent_35%,oklch(0.98_0.01_280/0.3)_100%)]"
        }
      />
    </div>
  );
}
