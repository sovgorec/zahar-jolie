import { fetchSheetValues } from "@/lib/google-sheets/client";
import { getSiteSheetConfig } from "@/lib/cms/site-registry";
import { parseSettingsGrid } from "@/lib/cms/parse-settings";
import { getServerDefaultSettings } from "@/lib/cms/default-settings";
import { cmsDebug } from "@/lib/cms/cms-debug";
import type { SiteSettings } from "@/types/cms";

export async function loadSiteSettings(site: string): Promise<{
  settings: SiteSettings;
  error?: string;
  debug?: Record<string, unknown>;
}> {
  const cfg = getSiteSheetConfig(site);
  if (!cfg) {
    return { settings: getServerDefaultSettings(), error: "unknown_site" };
  }

  const range = `${cfg.settingsTab}!A:Z`;
  const { rows, error: fetchError } = await fetchSheetValues(range);

  if (fetchError) {
    cmsDebug("settings", { site, range, fetchError });
    return {
      settings: getServerDefaultSettings(),
      error: "sheets_unavailable",
      debug: { fetchError, range },
    };
  }

  const { settings, meta } = parseSettingsGrid(rows);

  cmsDebug("settings", {
    site,
    range,
    rowCount: rows.length,
    format: meta.format,
    keysFound: meta.keysFound,
    hero_title: settings.hero_title,
    site_enabled: settings.site_enabled,
  });

  return { settings };
}
