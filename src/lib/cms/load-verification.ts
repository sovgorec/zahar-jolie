import { fetchSheetValues } from "@/lib/google-sheets/client";
import { getSiteSheetConfig } from "@/lib/cms/site-registry";
import {
  parseVerificationGrid,
  isVerificationStatusOk,
} from "@/lib/cms/parse-verification";
import { canonicalSerial, serialsMatch } from "@/lib/cms/normalize-serial";
import { cmsDebug } from "@/lib/cms/cms-debug";
import type { VerificationRecord } from "@/types/cms";

export async function loadVerificationRecords(site: string): Promise<{
  records: VerificationRecord[];
  error?: string;
  debug?: Record<string, unknown>;
}> {
  const cfg = getSiteSheetConfig(site);
  if (!cfg) {
    return { records: [], error: "unknown_site" };
  }
  const range = `${cfg.verificationTab}!A:Z`;
  const { rows, error: fetchError } = await fetchSheetValues(range);
  if (fetchError) {
    cmsDebug("verification", { site, range, fetchError });
    return {
      records: [],
      error: "sheets_unavailable",
      debug: { fetchError, range },
    };
  }

  const { records, meta } = parseVerificationGrid(rows);

  cmsDebug("verification", {
    site,
    range,
    rowCount: rows.length,
    recordCount: records.length,
    mappedColumns: meta.mappedColumns,
    headerless: meta.headerless,
    headerRow: meta.headerRow,
  });

  if (rows.length >= 1 && records.length === 0) {
    return {
      records: [],
      error: "parse_empty",
      debug: {
        range,
        rowCount: rows.length,
        headerRow: meta.headerRow,
        mappedColumns: meta.mappedColumns,
      },
    };
  }

  return { records };
}

export async function checkSerialForSite(
  site: string,
  serialInput: string,
): Promise<{
  ok: boolean;
  serial: string;
  status?: string;
  product_name?: string;
  notes?: string;
  error?: string;
}> {
  const normalized = canonicalSerial(serialInput);
  if (!normalized) {
    return { ok: false, serial: "", error: "empty_serial" };
  }

  const { records, error } = await loadVerificationRecords(site);
  if (error) {
    return { ok: false, serial: normalized, error };
  }

  const row = records.find((r) => serialsMatch(r.serial, normalized));
  if (!row) {
    return { ok: false, serial: normalized };
  }

  const ok = isVerificationStatusOk(row.status);
  return {
    ok,
    serial: normalized,
    status: row.status,
    product_name: row.product_name,
    notes: row.notes,
  };
}
