import type { SiteSettings } from "@/types/cms";

/** Server-only defaults when Sheets are unreachable. */
export function getServerDefaultSettings(): SiteSettings {
  return {
    site_enabled: true,
    maintenance_mode: false,
    maintenance_text: "",
    hero_title: "The science of luminous skin.",
    hero_subtitle:
      "Precision biotech formulations crafted for timeless feminine radiance and cellular renewal.",
    intro_video: "",
  };
}
