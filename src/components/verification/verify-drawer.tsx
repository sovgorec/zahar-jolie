"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ShieldCheck, ShieldX } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
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
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="border-white/60 bg-white/92 backdrop-blur-xl">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-xl font-medium tracking-tight">
            Authenticity verification
          </DrawerTitle>
          <DrawerDescription>
            Enter your product serial number to confirm genuine Jolie formulation.
          </DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit} className="space-y-5 px-4 pb-2">
          <div className="space-y-2">
            <Label htmlFor="serial" className="text-xs tracking-[0.2em] uppercase">
              Serial number
            </Label>
            <Input
              id="serial"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              placeholder="JOL-2026-001"
              className="h-11 rounded-xl border-rose-100/80 bg-white/80 font-mono tracking-wider"
              autoComplete="off"
              disabled={state === "loading"}
            />
          </div>

          <AnimatePresence mode="wait">
            {state === "loading" ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Loader2 className="size-4 animate-spin" />
                Verifying…
              </motion.div>
            ) : null}

            {state === "success" && result ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-4"
              >
                <motion.div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-700" />
                  <div>
                    <p className="font-medium text-emerald-900">Authentic product</p>
                    <p className="mt-1 text-sm text-emerald-800/80">
                      Serial <span className="font-mono">{result.serial}</span>
                      {result.product_name ? ` — ${result.product_name}` : ""}
                    </p>
                    {result.notes ? (
                      <p className="mt-2 text-xs text-emerald-800/70">{result.notes}</p>
                    ) : null}
                  </div>
                </motion.div>
              </motion.div>
            ) : null}

            {state === "error" && result ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-rose-200/80 bg-rose-50/50 p-4"
              >
                <div className="flex items-start gap-3">
                  <ShieldX className="mt-0.5 size-5 shrink-0 text-rose-700" />
                  <div>
                    <p className="font-medium text-rose-900">Not verified</p>
                    <p className="mt-1 text-sm text-rose-800/80">
                      {result.error === "network_error"
                        ? "Connection error. Please try again."
                        : "This serial was not found in our registry."}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <DrawerFooter className="flex-row gap-2 px-0">
            <DrawerClose className="flex-1">
              <Button variant="outline" className="w-full rounded-full">
                Close
              </Button>
            </DrawerClose>
            <Button
              type="submit"
              className="flex-1 rounded-full bg-[oklch(0.42_0.06_15)] text-white hover:bg-[oklch(0.38_0.06_15)]"
              disabled={state === "loading" || !serial.trim()}
            >
              Verify
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
