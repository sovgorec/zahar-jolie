"use client";

import { useEffect, useState } from "react";
import { CMS_SITE_ID } from "@/lib/constants";
import { getServerDefaultSettings } from "@/lib/cms/default-settings";
import type { SettingsApiResponse, SiteSettings } from "@/types/cms";

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(
    getServerDefaultSettings(),
  );
  const [loading, setLoading] = useState(true);
  const [degraded, setDegraded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/settings?site=${CMS_SITE_ID}`);
        const data = (await res.json()) as SettingsApiResponse;
        if (cancelled) return;
        if (data.settings) {
          setSettings(data.settings);
          setDegraded(Boolean(data.degraded));
        }
      } catch {
        if (!cancelled) setDegraded(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { settings, loading, degraded };
}
