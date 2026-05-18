/** Server-side CMS diagnostics (set CMS_DEBUG=1 in Vercel/local). */
export function isCmsDebugEnabled(): boolean {
  return process.env.CMS_DEBUG === "1" || process.env.NODE_ENV === "development";
}

export function cmsDebug(label: string, payload: Record<string, unknown>): void {
  if (!isCmsDebugEnabled()) return;
  console.info(`[jolie-cms] ${label}`, payload);
}
