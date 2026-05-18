import { NextResponse } from "next/server";
import { loadSiteSettings } from "@/lib/cms/load-site-settings";
import { DEFAULT_SITE_ID, getSiteSheetConfig } from "@/lib/cms/site-registry";
import { isCmsDebugEnabled } from "@/lib/cms/cms-debug";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const site = (searchParams.get("site") || DEFAULT_SITE_ID).trim().toLowerCase();
  const cfg = getSiteSheetConfig(site);

  const { settings, error, debug } = await loadSiteSettings(site);
  const degraded = Boolean(error);

  return NextResponse.json({
    site,
    settings,
    ...(cfg && { sheets: { settingsTab: cfg.settingsTab } }),
    ...(degraded && { degraded: true, error }),
    ...(isCmsDebugEnabled() && debug && { debug }),
  });
}
