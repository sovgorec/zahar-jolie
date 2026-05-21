"use client";

import { HeroSection } from "@/components/hero/hero-section";
import { FlagshipShowcase } from "@/components/showcase/flagship-showcase";
import { MaintenanceOverlay } from "@/components/layout/maintenance-overlay";
import { useSettings } from "@/hooks/use-settings";

export function HomePage() {
  const { settings, loading } = useSettings();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-pulse rounded-full bg-rose-200/60" />
      </div>
    );
  }

  if (!settings.site_enabled) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <p className="text-muted-foreground">This site is currently unavailable.</p>
      </div>
    );
  }

  return (
    <>
      <MaintenanceOverlay settings={settings} />
      <HeroSection settings={settings} />
      <FlagshipShowcase />
    </>
  );
}
