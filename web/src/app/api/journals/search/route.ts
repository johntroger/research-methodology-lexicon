import { NextRequest, NextResponse } from "next/server";
import { searchJournals } from "@/lib/journal-search";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const mode = searchParams.get("mode") || undefined;

    const data = searchJournals(query, mode);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in /api/journals/search:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error?.message || "Failed to search journals"
      },
      { status: 500 }
    );
  }
}
