import { NextRequest, NextResponse } from "next/server";
import {
  DomainKey,
  fetchDatasetsCatalog,
  filterAndScoreDatasets,
} from "@/lib/datasets-catalog";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const cat = searchParams.get("cat") || "all";
    const domainParam = (searchParams.get("domain") || "all") as DomainKey;
    const validDomains: DomainKey[] = ["all", "econ", "edu_soc", "health_env", "gov_misc"];
    const domain: DomainKey = validDomains.includes(domainParam) ? domainParam : "all";

    const catalog = await fetchDatasetsCatalog();
    const filteredItems = filterAndScoreDatasets(catalog.items, {
      domain,
      cat,
      query: q,
    });

    return NextResponse.json(
      {
        ...catalog,
        filtered_total: filteredItems.length,
        items: filteredItems,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("API /api/datasets error:", error);
    return NextResponse.json(
      { ok: false, error: "Không thể tải dữ liệu Kho Dữ liệu Mở lúc này." },
      { status: 500 }
    );
  }
}
