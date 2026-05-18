/**
 * Site registry for Google Sheets CMS tabs.
 * Tab names must match worksheet titles in the spreadsheet exactly.
 */
export const DEFAULT_SITE_ID = "jolie";

export interface SiteSheetConfig {
  id: string;
  productsTab: string;
  verificationTab: string;
  settingsTab: string;
}

export const SITES: Record<string, SiteSheetConfig> = {
  jolie: {
    id: "jolie",
    productsTab: "jolie_products",
    verificationTab: "jolie_verification",
    settingsTab: "jolie_settings",
  },
};

export function getSiteConfig(siteId: string): SiteSheetConfig | null {
  const id = siteId.trim().toLowerCase();
  return SITES[id] ?? null;
}

export function listSiteIds(): string[] {
  return Object.keys(SITES);
}
