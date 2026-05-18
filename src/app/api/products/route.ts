import { NextResponse } from "next/server";
import { loadSiteProducts } from "@/lib/cms/load-site-products";
import { DEFAULT_SITE_ID, getSiteSheetConfig } from "@/lib/cms/site-registry";
import { isCmsDebugEnabled } from "@/lib/cms/cms-debug";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const site = (searchParams.get("site") || DEFAULT_SITE_ID).trim().toLowerCase();
  const cfg = getSiteSheetConfig(site);

  const { products, error, debug } = await loadSiteProducts(site);
  const degraded = Boolean(error);

  return NextResponse.json({
    site,
    products,
    ...(cfg && { sheets: { productsTab: cfg.productsTab } }),
    ...(degraded && { degraded: true, error }),
    ...(isCmsDebugEnabled() && debug && { debug }),
  });
}
