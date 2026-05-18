import { NextResponse } from "next/server";
import { checkSerialForSite } from "@/lib/cms/load-verification";
import { DEFAULT_SITE_ID } from "@/lib/cms/site-registry";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { serial?: string; site?: string };
    const serial = typeof body.serial === "string" ? body.serial : "";
    const site = (body.site || DEFAULT_SITE_ID).trim().toLowerCase();

    const result = await checkSerialForSite(site, serial);
    const degraded = Boolean(result.error);

    return NextResponse.json({
      ok: result.ok,
      serial: result.serial,
      status: result.status,
      product_name: result.product_name,
      notes: result.notes,
      ...(degraded && { degraded: true, error: result.error }),
    });
  } catch {
    return NextResponse.json(
      { ok: false, serial: "", degraded: true, error: "invalid_body" },
      { status: 400 },
    );
  }
}
