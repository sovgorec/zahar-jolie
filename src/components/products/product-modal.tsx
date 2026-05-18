"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Product } from "@/types/cms";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  if (!product) return null;

  const hasImage = Boolean(product.image_url?.trim());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto border-white/60 bg-white/90 p-0 shadow-[0_32px_80px_-24px_oklch(0.4_0.05_15/0.25)] backdrop-blur-xl sm:max-w-lg"
        showCloseButton
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl bg-gradient-to-br from-[oklch(0.97_0.02_350)] to-[oklch(0.92_0.04_25)]">
          {hasImage ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              sizes="512px"
            />
          ) : null}
        </div>
        <div className="space-y-5 p-6 sm:p-8">
          <DialogHeader className="gap-2 text-left">
            {product.category ? (
              <p className="text-[0.65rem] font-medium tracking-[0.35em] uppercase text-[oklch(0.55_0.06_15)]">
                {product.category}
              </p>
            ) : null}
            <DialogTitle className="text-2xl font-medium tracking-tight">
              {product.name}
            </DialogTitle>
            {product.capacity ? (
              <DialogDescription className="text-sm">
                {product.capacity}
              </DialogDescription>
            ) : null}
          </DialogHeader>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {product.composition ? (
            <div>
              <h4 className="mb-1.5 text-xs font-medium tracking-[0.25em] uppercase text-foreground">
                Composition
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.composition}
              </p>
            </div>
          ) : null}

          {product.usage_method ? (
            <div>
              <h4 className="mb-1.5 text-xs font-medium tracking-[0.25em] uppercase text-foreground">
                Usage
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.usage_method}
              </p>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
