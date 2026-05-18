import { fetchSheetValues } from "@/lib/google-sheets/client";
import { getSiteSheetConfig } from "@/lib/cms/site-registry";
import { parseProductsGrid } from "@/lib/cms/parse-products";
import { cmsDebug } from "@/lib/cms/cms-debug";
import type { Product } from "@/types/cms";

export async function loadSiteProducts(site: string): Promise<{
  products: Product[];
  error?: string;
  debug?: Record<string, unknown>;
}> {
  const cfg = getSiteSheetConfig(site);
  if (!cfg) {
    return { products: [], error: "unknown_site" };
  }

  const range = `${cfg.productsTab}!A:Z`;
  const { rows, error: fetchError } = await fetchSheetValues(range);

  if (fetchError) {
    cmsDebug("products", { site, range, fetchError });
    return {
      products: [],
      error: "sheets_unavailable",
      debug: { fetchError, range },
    };
  }

  const { products, meta } = parseProductsGrid(rows);
  const activeCount = products.filter((p) => p.active).length;

  cmsDebug("products", {
    site,
    range,
    rowCount: rows.length,
    parsedCount: products.length,
    activeCount,
    mappedColumns: meta.mappedColumns,
    headerRow: meta.headerRow,
  });

  if (rows.length >= 2 && products.length === 0) {
    return {
      products: [],
      error: "parse_empty",
      debug: {
        range,
        rowCount: rows.length,
        headerRow: meta.headerRow,
        mappedColumns: meta.mappedColumns,
      },
    };
  }

  return {
    products,
    ...(products.length === 0 && rows.length < 2 ? { error: "sheet_empty" } : {}),
  };
}
