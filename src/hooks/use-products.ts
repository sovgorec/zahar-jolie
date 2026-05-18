"use client";

import { useEffect, useState } from "react";
import { CMS_SITE_ID } from "@/lib/constants";
import { FALLBACK_PRODUCTS } from "@/data/fallback-products";
import type { Product, ProductsApiResponse } from "@/types/cms";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [degraded, setDegraded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/products?site=${CMS_SITE_ID}`);
        const data = (await res.json()) as ProductsApiResponse;
        if (cancelled) return;

        const active = (data.products ?? []).filter((p) => p.active);
        if (active.length > 0) {
          setProducts(active);
          setDegraded(Boolean(data.degraded));
        } else {
          setProducts(FALLBACK_PRODUCTS);
          setDegraded(true);
        }
      } catch {
        if (!cancelled) {
          setProducts(FALLBACK_PRODUCTS);
          setDegraded(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, degraded };
}
