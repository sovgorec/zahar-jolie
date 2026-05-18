"use client";

import type { SiteSettings } from "@/types/cms";

interface MaintenanceOverlayProps {
  settings: SiteSettings;
}

export function MaintenanceOverlay({ settings }: MaintenanceOverlayProps) {
  if (!settings.maintenance_mode) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[oklch(0.98_0.01_350/0.95)] px-6 backdrop-blur-md">
      <div className="max-w-md text-center">
        <p className="mb-3 text-[0.65rem] font-medium tracking-[0.45em] uppercase text-[oklch(0.55_0.06_15)]">
          Jolie
        </p>
        <h1 className="text-2xl font-light tracking-tight text-foreground">
          Temporarily unavailable
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {settings.maintenance_text ||
            "We are refining our experience. Please return shortly."}
        </p>
      </div>
    </div>
  );
}
