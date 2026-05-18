import type { SiteSettings } from "@/types/cms";
import { parseBooleanCellOrDefault } from "@/lib/cms/parse-boolean";
import { getServerDefaultSettings } from "@/lib/cms/default-settings";

const KNOWN_KEYS = new Set([
  "site_enabled",
  "maintenance_mode",
  "maintenance_text",
  "hero_title",
  "hero_subtitle",
  "intro_video",
]);

const KEY_ALIASES: Record<string, string> = {
  site_enabled: "site_enabled",
  siteenabled: "site_enabled",
  enabled: "site_enabled",
  maintenance_mode: "maintenance_mode",
  maintenancemode: "maintenance_mode",
  maintenance: "maintenance_mode",
  maintenance_text: "maintenance_text",
  maintenancetext: "maintenance_text",
  hero_title: "hero_title",
  herotitle: "hero_title",
  title: "hero_title",
  hero_subtitle: "hero_subtitle",
  herosubtitle: "hero_subtitle",
  subtitle: "hero_subtitle",
  intro_video: "intro_video",
  introvideo: "intro_video",
  video: "intro_video",
  intro: "intro_video",
};

function normalizeKey(raw: string): string | null {
  const k = raw.trim().toLowerCase().replace(/\s+/g, "_");
  if (KNOWN_KEYS.has(k)) return k;
  return KEY_ALIASES[k.replace(/_/g, "")] ?? KEY_ALIASES[k] ?? null;
}

function mergeFromMap(raw: Record<string, string>): SiteSettings {
  const d = getServerDefaultSettings();
  return {
    site_enabled: parseBooleanCellOrDefault(raw.site_enabled, true),
    maintenance_mode: parseBooleanCellOrDefault(raw.maintenance_mode, false),
    maintenance_text: raw.maintenance_text ?? d.maintenance_text,
    hero_title: (raw.hero_title || d.hero_title).trim() || d.hero_title,
    hero_subtitle:
      (raw.hero_subtitle || d.hero_subtitle).trim() || d.hero_subtitle,
    intro_video: (raw.intro_video ?? "").trim(),
  };
}

export interface SettingsParseMeta {
  format: "wide" | "key_value" | "empty" | "defaults";
  keysFound: string[];
}

export function parseSettingsGrid(rows: string[][]): {
  settings: SiteSettings;
  meta: SettingsParseMeta;
} {
  const defaults = getServerDefaultSettings();
  if (rows.length === 0) {
    return { settings: defaults, meta: { format: "empty", keysFound: [] } };
  }

  const headerNorm = rows[0].map((c) =>
    c.trim().toLowerCase().replace(/\s+/g, "_"),
  );
  const knownInHeader = headerNorm.filter(
    (h) => KNOWN_KEYS.has(h) || normalizeKey(h),
  );
  const isWideHeader = knownInHeader.length >= 2 && rows.length >= 2;

  if (isWideHeader) {
    const map: Record<string, string> = {};
    for (let c = 0; c < headerNorm.length; c++) {
      const key = normalizeKey(headerNorm[c] ?? "");
      if (key) {
        map[key] = rows[1]?.[c] ?? "";
      }
    }
    return {
      settings: mergeFromMap(map),
      meta: { format: "wide", keysFound: Object.keys(map) },
    };
  }

  const map: Record<string, string> = {};
  for (const row of rows) {
    const k = normalizeKey(row[0] ?? "");
    if (!k) continue;
    map[k] = row[1] ?? "";
  }

  if (Object.keys(map).length === 0) {
    return { settings: defaults, meta: { format: "defaults", keysFound: [] } };
  }

  return {
    settings: mergeFromMap(map),
    meta: { format: "key_value", keysFound: Object.keys(map) },
  };
}
