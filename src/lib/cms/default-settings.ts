import type { SiteSettings } from "@/types/cms";

/** Server-only defaults when Sheets are unreachable. */
export function getServerDefaultSettings(): SiteSettings {
  return {
    site_enabled: true,
    maintenance_mode: false,
    maintenance_text: "",
    hero_title: "Advanced care for a better you",
    hero_subtitle:
      "Premium pharmaceutical solutions created with science, quality and care.",
    intro_video: "",
  };
}
