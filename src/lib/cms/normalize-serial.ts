/** Canonical form for serial lookup. */
export function canonicalSerial(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, "").replace(/_/g, "-");
}

export function serialsMatch(a: string, b: string): boolean {
  return canonicalSerial(a) === canonicalSerial(b);
}
