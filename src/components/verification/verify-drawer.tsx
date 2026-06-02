"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ShieldCheck, ShieldX } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CMS_SITE_ID } from "@/lib/constants";
import type { VerificationCheckResponse } from "@/types/cms";

type VerifyState = "idle" | "loading" | "success" | "error";

interface VerifyDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const fadeSlide = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

export function VerifyDrawer({ open, onOpenChange }: VerifyDrawerProps) {
  const [serial, setSerial] = useState("");
  const [state, setState] = useState<VerifyState>("idle");
  const [result, setResult] = useState<VerificationCheckResponse | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = serial.trim();
    if (!trimmed) return;

    setState("loading");
    setResult(null);

    try {
      const res = await fetch("/api/verification/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serial: trimmed, site: CMS_SITE_ID }),
      });
      const data = (await res.json()) as VerificationCheckResponse;
      setResult(data);
      setState(data.ok ? "success" : "error");
    } catch {
      setState("error");
      setResult({ ok: false, serial: trimmed, error: "network_error" });
    }
  }

  function handleOpenChange(next: boolean) {
    if (!next) {
      setSerial("");
      setState("idle");
      setResult(null);
    }
    onOpenChange(next);
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} shouldScaleBackground>
      <DrawerContent
        centered
        hideHandle
        className="flex flex-col overflow-hidden border-white/55 bg-white/72 p-0 text-popover-foreground shadow-[0_28px_80px_-28px_oklch(0.45_0.08_280/0.28)] backdrop-blur-xl supports-backdrop-filter:bg-white/65"
      >
        <div className="flex w-full flex-col items-center px-5 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] pt-3 text-center sm:px-8 sm:pb-8">
          <div
            className="mb-5 h-1 w-12 shrink-0 rounded-full bg-[oklch(0.75_0.04_280/0.35)] sm:w-14"
            aria-hidden
          />

          <DrawerHeader className="w-full max-w-md items-center px-0 pb-0 pt-0 text-center">
            <p className="mb-2 text-[0.6rem] font-medium tracking-[0.42em] uppercase text-[oklch(0.55_0.06_15)]">
              Authenticity
            </p>
            <DrawerTitle className="text-center">Verify your product</DrawerTitle>
            <DrawerDescription className="mx-auto max-w-sm text-center">
              Enter your serial number to confirm a genuine Jolie formulation.
            </DrawerDescription>
          </DrawerHeader>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex w-full max-w-md flex-col items-center gap-6"
          >
            <div className="flex w-full flex-col items-center gap-2.5">
              <Label
                htmlFor="serial"
                className="text-center text-[0.65rem] font-medium tracking-[0.28em] uppercase text-[oklch(0.55_0.06_15)]"
              >
                Serial number
              </Label>
              <Input
                id="serial"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
                placeholder="JOL-2026-001"
                className="h-12 w-full rounded-xl border-white/70 bg-white/75 px-4 text-center font-mono text-sm tracking-widest shadow-[inset_0_1px_2px_oklch(0.5_0.04_280/0.06)] backdrop-blur-sm"
                autoComplete="off"
                disabled={state === "loading"}
              />
            </div>

            <AnimatePresence mode="wait">
              {state === "loading" ? (
                <motion.div
                  key="loading"
                  {...fadeSlide}
                  className="flex w-full items-center justify-center gap-2 text-sm text-muted-foreground"
                >
                  <Loader2 className="size-4 animate-spin text-violet-500/80" />
                  Verifying…
                </motion.div>
              ) : null}

              {state === "success" && result ? (
                <motion.div
                  key="success"
                  {...fadeSlide}
                  className="w-full rounded-2xl border border-emerald-200/60 bg-emerald-50/50 p-4 text-center backdrop-blur-sm"
                >
                  <ShieldCheck className="mx-auto size-5 text-emerald-700" />
                  <p className="mt-2 font-medium text-emerald-900">Authentic Product</p>
                  <p className="mt-1 text-sm leading-relaxed text-emerald-800/85">
                    Original: <span className="font-mono">{result.serial}</span>
                    {result.product_name ? ` — ${result.product_name}` : ""}
                  </p>
                  {result.notes ? (
                    <p className="mt-2 text-xs text-emerald-800/70">{result.notes}</p>
                  ) : null}
                </motion.div>
              ) : null}

              {state === "error" && result ? (
                <motion.div
                  key="error"
                  {...fadeSlide}
                  className="w-full rounded-2xl border border-rose-200/60 bg-rose-50/45 p-4 text-center backdrop-blur-sm"
                >
                  <ShieldX className="mx-auto size-5 text-rose-700" />
                  <p className="mt-2 font-medium text-rose-900">Not verified</p>
                  <p className="mt-1 text-sm leading-relaxed text-rose-800/85">
                    {result.error === "network_error"
                      ? "Connection error. Please try again."
                      : "This serial was not found in our registry."}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="flex w-full max-w-sm flex-col-reverse items-stretch gap-3 pt-2 sm:flex-row sm:justify-center">
              <DrawerClose className="flex-1 sm:max-w-[11rem]">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-full rounded-full border-white/70 bg-white/50 backdrop-blur-sm"
                >
                  Close
                </Button>
              </DrawerClose>
              <button
                type="submit"
                disabled={state === "loading" || !serial.trim()}
                className="group relative inline-flex h-11 flex-1 items-center justify-center overflow-hidden rounded-full text-sm font-medium tracking-wide text-white transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 sm:max-w-[14rem]"
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"
                  aria-hidden
                />
                <span
                  className="absolute inset-0 rounded-full opacity-0 shadow-[0_8px_28px_-4px_rgba(139,92,246,0.5)] transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <span className="relative">Verify</span>
              </button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
