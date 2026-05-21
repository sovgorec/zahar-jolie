"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { useSiteUi } from "@/components/providers/site-providers";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { openVerify } = useSiteUi();

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-40",
        "border-b border-white/50 bg-white/72 shadow-[0_1px_24px_-4px_oklch(0.55_0.04_280/0.08)]",
        "backdrop-blur-md backdrop-saturate-150",
        "supports-backdrop-filter:bg-white/65",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Logo size="sm" />
        </Link>
        <nav className="hidden items-center gap-8 text-sm tracking-wide text-muted-foreground md:flex">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href="/about" className="transition-colors hover:text-foreground">
            About Us
          </Link>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/about"
            className="inline-flex h-7 items-center justify-center rounded-full border border-rose-200/70 bg-white/60 px-4 text-[0.8rem] font-medium text-foreground transition-colors hover:bg-white md:hidden"
          >
            About Us
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-rose-200/80 bg-white/60 px-4"
            onClick={openVerify}
          >
            Verify
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
