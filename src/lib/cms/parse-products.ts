import type { Product } from "@/types/cms";
import { parseBooleanCellOrDefault } from "@/lib/cms/parse-boolean";

const COLUMN_ALIASES: Record<string, readonly string[]> = {
  name: ["name", "product", "product_name", "title", "product name"],
  category: ["category", "cat", "type"],
  description: ["description", "desc", "details"],
  composition: ["composition", "ingredients", "formula"],
  usage_method: ["usage_method", "usage", "method", "how_to_use", "how to use"],
  capacity: ["capacity", "size", "volume", "amount"],
  image_url: ["image_url", "image", "image url", "img", "photo", "picture"],
  active: ["active", "enabled", "visible", "published"],
};

const REQUIRED_COLUMNS = ["name"] as const;

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

  for (const required of REQUIRED_COLUMNS) {
    if (map[required] === undefined) return null;
  }

  return map;
}

function slugId(name: string, rowIndex: number): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  return `jolie-${base || "product"}-${rowIndex}`;
}

function cell(row: string[], map: Record<string, number>, key: string): string {
  const idx = map[key];
  if (idx === undefined) return "";
  return (row[idx] ?? "").trim();
}

export interface ProductsParseMeta {
  headerRow: string[];
  mappedColumns: string[];
  skippedRows: number;
}

export function parseProductsGrid(rows: string[][]): {
  products: Product[];
  meta: ProductsParseMeta;
} {
  if (rows.length < 2) {
    return {
      products: [],
      meta: { headerRow: rows[0] ?? [], mappedColumns: [], skippedRows: 0 },
    };
  }

  const map = buildHeaderIndexMap(rows[0]);
  if (!map) {
    return {
      products: [],
      meta: {
        headerRow: rows[0],
        mappedColumns: [],
        skippedRows: rows.length - 1,
      },
    };
  }

  const hasActiveColumn = map.active !== undefined;
  const products: Product[] = [];
  let skippedRows = 0;

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.every((c) => !c)) {
      skippedRows++;
      continue;
    }
    const name = cell(row, map, "name");
    if (!name) {
      skippedRows++;
      continue;
    }

    const activeRaw = hasActiveColumn ? cell(row, map, "active") : "";
    const active = hasActiveColumn
      ? parseBooleanCellOrDefault(activeRaw, true)
      : true;

    products.push({
      id: slugId(name, i),
      name,
      category: cell(row, map, "category"),
      description: cell(row, map, "description"),
      composition: cell(row, map, "composition"),
      usage_method: cell(row, map, "usage_method"),
      capacity: cell(row, map, "capacity"),
      image_url: cell(row, map, "image_url"),
      active,
    });
  }

  return {
    products,
    meta: {
      headerRow: rows[0],
      mappedColumns: Object.keys(map),
      skippedRows,
    },
  };
}
