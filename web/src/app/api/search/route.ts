import { NextRequest, NextResponse } from "next/server";
import { getAllTerms, getAllAcronyms } from "@/lib/data-loader";
import { getSearchEngine } from "@/lib/search-engine";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : 15;

  const engine = getSearchEngine();

  // Khởi tạo chỉ mục nếu chưa có
  if (engine.getCount() === 0) {
    const terms = getAllTerms();
    const acronyms = getAllAcronyms();
    engine.indexData(terms, acronyms);
  }

  const results = engine.search(q, limit);

  return NextResponse.json({
    query: q,
    total_results: results.length,
    results
  });
}
