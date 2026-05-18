"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/types/cms";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  index: number;
}

export function ProductCard({ product, onSelect, index }: ProductCardProps) {
  const hasImage = Boolean(product.image_url?.trim());

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onClick={() => onSelect(product)}
      className={cn(
        "group flex w-full flex-col overflow-hidden rounded-2xl border border-white/70",
        "bg-white/65 text-left shadow-[0_12px_40px_-16px_oklch(0.45_0.04_15/0.18)]",
        "backdrop-blur-md transition-shadow hover:shadow-[0_20px_50px_-12px_oklch(0.45_0.05_15/0.22)]",
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[oklch(0.97_0.02_350)] to-[oklch(0.93_0.04_25)]">
        {hasImage ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl font-light tracking-[0.2em] text-[oklch(0.75_0.05_15)] opacity-60">
              {product.name.slice(0, 1)}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/80 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
        {product.category ? (
          <span className="text-[0.65rem] font-medium tracking-[0.35em] uppercase text-[oklch(0.55_0.06_15)]">
            {product.category}
          </span>
        ) : null}
        <h3 className="text-lg font-medium leading-snug text-foreground">{product.name}</h3>
        {product.capacity ? (
          <p className="text-sm text-muted-foreground">{product.capacity}</p>
        ) : null}
        <p className="mt-auto line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
      </div>
    </motion.button>
  );
}
