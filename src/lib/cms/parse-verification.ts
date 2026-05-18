import type { VerificationRecord } from "@/types/cms";
import { canonicalSerial } from "@/lib/cms/normalize-serial";

const COLUMN_ALIASES: Record<string, readonly string[]> = {
  serial: [
    "serial",
    "code",
    "serial_number",
    "serial number",
    "serial numbers",
    "serials",
    "serial_code",
    "barcode",
    "sku",
  ],
  status: ["status", "state", "valid", "verified", "active"],
  product_name: ["product_name", "product", "product name", "item", "sku_name"],
  notes: ["notes", "note", "comment", "comments"],
};

function normalizeHeader(cell: string): string {
  return cell.trim().toLowerCase().replace(/\s+/g, " ");
}

function buildHeaderIndexMap(headerRow: string[]): Record<string, number> | null {
  const norm = headerRow.map(normalizeHeader);
  const map: Record<string, number> = {};

  for (const [canonical, aliases] of Object.entries(COLUMN_ALIASES)) {
    for (const alias of aliases) {
      const idx = norm.indexOf(alias);
      if (idx !== -1) {
        map[canonical] = idx;
        break;
      }
    }
  }

  if (map.serial === undefined) return null;
  return map;
}

const SERIAL_LIKE = /^[A-Z0-9][A-Z0-9\-_.]{4,}$/i;

function looksLikeSerialValue(cell: string): boolean {
  const s = cell.trim();
  if (!s || s.length < 6) return false;
  return SERIAL_LIKE.test(s) && /\d/.test(s);
}

export interface VerificationParseMeta {
  headerRow: string[];
  mappedColumns: string[];
  headerless: boolean;
}

export function parseVerificationGrid(rows: string[][]): {
  records: VerificationRecord[];
  meta: VerificationParseMeta;
} {
  if (rows.length === 0) {
    return {
      records: [],
      meta: { headerRow: [], mappedColumns: [], headerless: false },
    };
  }

  let map = buildHeaderIndexMap(rows[0]);
  let dataStartIndex = 1;
  let headerless = false;

  if (!map && looksLikeSerialValue(rows[0][0] ?? "")) {
    map = { serial: 0 };
    dataStartIndex = 0;
    headerless = true;
  }

  if (!map) {
    return {
      records: [],
      meta: { headerRow: rows[0], mappedColumns: [], headerless: false },
    };
  }

  const records: VerificationRecord[] = [];
  for (let i = dataStartIndex; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.every((c) => !c)) continue;

    const rawSerial = (row[map.serial] ?? "").trim();
    if (!rawSerial) continue;

    const serial = canonicalSerial(rawSerial);
    records.push({
      serial,
      status: map.status !== undefined ? (row[map.status] ?? "").trim() : "",
      product_name:
        map.product_name !== undefined
          ? (row[map.product_name] ?? "").trim()
          : "",
      notes: map.notes !== undefined ? (row[map.notes] ?? "").trim() : "",
    });
  }

  return {
    records,
    meta: {
      headerRow: headerless ? [] : rows[0],
      mappedColumns: Object.keys(map),
      headerless,
    },
  };
}

const INVALID_STATUSES = new Set([
  "invalid",
  "revoked",
  "blocked",
  "false",
  "no",
  "0",
  "bad",
  "void",
  "inactive",
  "expired",
  "fake",
  "counterfeit",
  "denied",
]);

export function isVerificationStatusOk(status: string): boolean {
  const s = status.trim().toLowerCase();
  if (!s) return true;
  if (INVALID_STATUSES.has(s)) return false;
  return true;
}
