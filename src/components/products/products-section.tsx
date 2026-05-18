"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/products/product-card";
import { useSiteUi } from "@/components/providers/site-providers";
import { useProducts } from "@/hooks/use-products";
import { fadeUp } from "@/lib/motion";

export function ProductsSection() {
  const { products, loading } = useProducts();
  const { openProduct } = useSiteUi();

  return (
    <section id="products" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-12 text-center sm:mb-16"
        >
          <p className="mb-3 text-[0.65rem] font-medium tracking-[0.45em] uppercase text-[oklch(0.55_0.06_15)]">
            Formulations
          </p>
          <h2 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">
            The collection
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            Precision biotech skincare — each formula engineered for cellular renewal
            and luminous radiance.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] animate-pulse rounded-2xl bg-white/50"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onSelect={openProduct}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
