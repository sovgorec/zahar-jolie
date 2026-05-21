"use client";

import { motion } from "framer-motion";

const blobEase = "easeInOut" as const;

export interface AmbientBlobProps {
  className: string;
  duration: number;
  delay?: number;
  animate: {
    x?: number[];
    y?: number[];
    opacity?: number[];
    scale?: number[];
  };
}

export function AmbientBlob({
  className,
  duration,
  delay = 0,
  animate,
}: AmbientBlobProps) {
  return (
    <motion.div
      className={className}
      animate={animate}
      transition={{ duration, repeat: Infinity, ease: blobEase, delay }}
      aria-hidden
    />
  );
}
