export function parseBooleanCell(value: string | undefined): boolean {
  if (value === undefined) return false;
  const v = value.trim().toLowerCase();
  return v === "true" || v === "1" || v === "yes" || v === "y" || v === "on";
}

/** Empty cells use defaultVal (typical for CMS "active" columns). */
export function parseBooleanCellOrDefault(
  value: string | undefined,
  defaultVal: boolean,
): boolean {
  if (value === undefined || value.trim() === "") return defaultVal;
  const v = value.trim().toLowerCase();
  if (v === "false" || v === "0" || v === "no" || v === "n" || v === "off") {
    return false;
  }
  if (v === "true" || v === "1" || v === "yes" || v === "y" || v === "on") {
    return true;
  }
  return defaultVal;
}
