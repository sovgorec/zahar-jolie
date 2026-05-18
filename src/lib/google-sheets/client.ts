import { google } from "googleapis";
import type { JWT } from "google-auth-library";
import { cmsDebug } from "@/lib/cms/cms-debug";

export interface SheetsReadContext {
  spreadsheetId: string;
  auth: JWT;
}

export interface SheetFetchResult {
  rows: string[][];
  error?: string;
}

let cachedContext: SheetsReadContext | null | undefined;

export function getSpreadsheetId(): string | null {
  const id =
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim() ||
    process.env.GOOGLE_SHEETS_ID?.trim();
  return id || null;
}

function normalizePrivateKey(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const unquoted = raw.replace(/^["']|["']$/g, "");
  return unquoted.replace(/\\n/g, "\n");
}

function readServiceAccountFromEnv(): {
  clientEmail?: string;
  privateKey?: string;
} {
  const clientEmail =
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() ||
    process.env.GOOGLE_CLIENT_EMAIL?.trim();

  const privateKey = normalizePrivateKey(
    process.env.GOOGLE_PRIVATE_KEY ||
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
  );

  return { clientEmail, privateKey };
}

export async function createSheetsReadContext(): Promise<SheetsReadContext | null> {
  if (cachedContext !== undefined) {
    return cachedContext;
  }

  const spreadsheetId = getSpreadsheetId();
  if (!spreadsheetId) {
    cmsDebug("auth", { ok: false, reason: "missing_spreadsheet_id" });
    cachedContext = null;
    return null;
  }

  let { clientEmail, privateKey } = readServiceAccountFromEnv();

  const jsonRaw = process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON?.trim();
  if ((!clientEmail || !privateKey) && jsonRaw) {
    try {
      const parsed = JSON.parse(jsonRaw) as {
        client_email?: string;
        private_key?: string;
      };
      clientEmail = parsed.client_email ?? clientEmail;
      privateKey = normalizePrivateKey(parsed.private_key) ?? privateKey;
    } catch {
      cmsDebug("auth", { ok: false, reason: "invalid_service_account_json" });
      cachedContext = null;
      return null;
    }
  }

  if (!clientEmail || !privateKey) {
    cmsDebug("auth", {
      ok: false,
      reason: "missing_credentials",
      hasEmail: Boolean(clientEmail),
      hasPrivateKey: Boolean(privateKey),
    });
    cachedContext = null;
    return null;
  }

  try {
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    await auth.authorize();
    cachedContext = { spreadsheetId, auth };
    cmsDebug("auth", { ok: true, spreadsheetId });
    return cachedContext;
  } catch (err) {
    const message = err instanceof Error ? err.message : "authorize_failed";
    cmsDebug("auth", { ok: false, reason: message });
    cachedContext = null;
    return null;
  }
}

export async function fetchSheetValues(rangeA1: string): Promise<SheetFetchResult> {
  const ctx = await createSheetsReadContext();
  if (!ctx) {
    return { rows: [], error: "sheets_unavailable" };
  }
  try {
    const sheets = google.sheets({ version: "v4", auth: ctx.auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: ctx.spreadsheetId,
      range: rangeA1,
    });
    const values = res.data.values;
    if (!values || !Array.isArray(values)) {
      return { rows: [] };
    }
    const rows = values.map((row) => row.map((c) => String(c ?? "").trim()));
    cmsDebug("fetch", { range: rangeA1, rowCount: rows.length });
    return { rows };
  } catch (err) {
    const message = err instanceof Error ? err.message : "fetch_failed";
    cmsDebug("fetch", { range: rangeA1, error: message });
    return { rows: [], error: message };
  }
}

export function resetSheetsClientCache(): void {
  cachedContext = undefined;
}
