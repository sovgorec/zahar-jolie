"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { VerifyDrawer } from "@/components/verification/verify-drawer";
import { ProductModal } from "@/components/products/product-modal";
import type { Product } from "@/types/cms";

interface SiteUiContextValue {
  openVerify: () => void;
  closeVerify: () => void;
  verifyOpen: boolean;
  openProduct: (product: Product) => void;
  closeProduct: () => void;
  selectedProduct: Product | null;
}

const SiteUiContext = createContext<SiteUiContextValue | null>(null);

export function SiteProviders({ children }: { children: ReactNode }) {
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openVerify = useCallback(() => setVerifyOpen(true), []);
  const closeVerify = useCallback(() => setVerifyOpen(false), []);
  const openProduct = useCallback((product: Product) => setSelectedProduct(product), []);
  const closeProduct = useCallback(() => setSelectedProduct(null), []);

  const value = useMemo(
    () => ({
      openVerify,
      closeVerify,
      verifyOpen,
      openProduct,
      closeProduct,
      selectedProduct,
    }),
    [openVerify, closeVerify, verifyOpen, openProduct, closeProduct, selectedProduct],
  );

  return (
    <SiteUiContext.Provider value={value}>
      {children}
      <VerifyDrawer open={verifyOpen} onOpenChange={setVerifyOpen} />
      <ProductModal
        product={selectedProduct}
        open={Boolean(selectedProduct)}
        onOpenChange={(open) => {
          if (!open) closeProduct();
        }}
      />
    </SiteUiContext.Provider>
  );
}

export function useSiteUi() {
  const ctx = useContext(SiteUiContext);
  if (!ctx) {
    throw new Error("useSiteUi must be used within SiteProviders");
  }
  return ctx;
}
