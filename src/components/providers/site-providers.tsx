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

interface SiteUiContextValue {
  openVerify: () => void;
  closeVerify: () => void;
  verifyOpen: boolean;
}

const SiteUiContext = createContext<SiteUiContextValue | null>(null);

export function SiteProviders({ children }: { children: ReactNode }) {
  const [verifyOpen, setVerifyOpen] = useState(false);

  const openVerify = useCallback(() => setVerifyOpen(true), []);
  const closeVerify = useCallback(() => setVerifyOpen(false), []);

  const value = useMemo(
    () => ({
      openVerify,
      closeVerify,
      verifyOpen,
    }),
    [openVerify, closeVerify, verifyOpen],
  );

  return (
    <SiteUiContext.Provider value={value}>
      {children}
      <VerifyDrawer open={verifyOpen} onOpenChange={setVerifyOpen} />
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
