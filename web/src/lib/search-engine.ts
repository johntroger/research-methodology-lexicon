import MiniSearch, { SearchResult as MiniSearchResult } from "minisearch";
import { MethodologyTerm, AcademicAcronym } from "./types";
import { customTokenizer, normalizeQuery, removeVietnameseTones } from "./vietnamese-normalizer";

export interface SearchIndexDocument {
  id: string;                               // Khóa định danh
  doc_type: "term" | "acronym";             // Loại mục từ
  term: string;                             // Tiếng Anh gốc
  vietnamese: string;                       // Tiếng Việt chính
  vietnamese_variants: string;              // Dị bản (nối thành chuỗi)
  acronym_key: string;                      // Từ viết tắt
  domain: string;                           // Chuyên ngành
  definition: string;                       // Định nghĩa hoặc mục đích
  citation: string;                         // Tác giả / Nguồn trích dẫn
  // Dữ liệu kèm theo để hiển thị nhanh
  raw_term?: MethodologyTerm;
  raw_acronym?: AcademicAcronym;
}

export interface SearchOutputItem {
  id: string;
  doc_type: "term" | "acronym";
  term: string;
  vietnamese: string;
  domain: string;
  snippet: string;
  score: number;
  match_field?: string;
  raw_term?: MethodologyTerm;
  raw_acronym?: AcademicAcronym;
}

export class LexiconSearchEngine {
  private miniSearch: MiniSearch<SearchIndexDocument>;
  private isIndexed = false;
  private documentsMap = new Map<string, SearchIndexDocument>();

  constructor() {
    this.miniSearch = new MiniSearch<SearchIndexDocument>({
      fields: [
        "acronym_key",
        "term",
        "vietnamese",
        "vietnamese_variants",
        "domain",
        "citation",
        "definition"
      ],
      storeFields: [
        "id",
        "doc_type",
        "term",
        "vietnamese",
        "domain",
        "definition",
        "acronym_key"
      ],
      // Trọng số boosting
      searchOptions: {
        boost: {
          acronym_key: 6,
          term: 5,
          vietnamese: 4,
          vietnamese_variants: 3,
          citation: 2.5,
          domain: 2,
          definition: 1
        },
        prefix: true,
        fuzzy: (term) => (term.length > 3 ? 0.2 : false)
      },
      tokenize: customTokenizer
    });
  }

  /**
   * Nạp danh sách terms và acronyms vào chỉ mục
   */
  public indexData(terms: MethodologyTerm[], acronyms: Record<string, AcademicAcronym>): void {
    const docs: SearchIndexDocument[] = [];
    this.documentsMap.clear();

    // 1. Chỉ mục hóa Flagship Terms
    for (const t of terms) {
      const allDomains = [t.category, ...(t.domain_tags || [])].filter(Boolean);
      const fullDefinition = [
        t.core_definition,
        t.operational_mechanism,
        t.benchmarks,
        t.pitfalls
      ].filter(Boolean).join(" ");

      const doc: SearchIndexDocument = {
        id: t.id,
        doc_type: "term",
        term: t.term,
        vietnamese: t.vietnamese,
        vietnamese_variants: (t.vietnamese_variants || []).join(" "),
        acronym_key: "",
        domain: allDomains.join(", "),
        definition: fullDefinition,
        citation: `${t.seminal_citation || ""} ${t.apa_intext || ""} ${t.apa_reference || ""}`,
        raw_term: t
      };
      docs.push(doc);
      this.documentsMap.set(doc.id, doc);
    }

    // 2. Chỉ mục hóa Acronyms
    for (const [key, val] of Object.entries(acronyms)) {
      const id = `acronym-${key.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
      const doc: SearchIndexDocument = {
        id,
        doc_type: "acronym",
        term: val.full_name,
        vietnamese: val.vietnamese,
        vietnamese_variants: "",
        acronym_key: key,
        domain: "Từ viết tắt",
        definition: val.purpose,
        citation: val.benchmark || "",
        raw_acronym: val
      };
      docs.push(doc);
      this.documentsMap.set(doc.id, doc);
    }

    this.miniSearch.removeAll();
    this.miniSearch.addAll(docs);
    this.isIndexed = true;
  }

  /**
   * Tra cứu 2 chiều thông minh
   */
  public search(query: string, limit = 15): SearchOutputItem[] {
    if (!this.isIndexed || !query || query.trim().length === 0) {
      return [];
    }

    const clean = normalizeQuery(query);
    const toneFree = removeVietnameseTones(clean);

    // Tìm kiếm với từ khóa gốc và từ khóa không dấu
    const results = this.miniSearch.search(clean, {
      prefix: true,
      fuzzy: (term) => (term.length > 3 ? 0.2 : false),
      combineWith: "OR"
    });

    // Nếu tìm có dấu ít kết quả, thử gộp thêm kết quả tìm không dấu
    let combinedResults = results;
    if (results.length < limit && toneFree !== clean) {
      const fallbackResults = this.miniSearch.search(toneFree, {
        prefix: true,
        fuzzy: (term) => (term.length > 3 ? 0.2 : false)
      });
      const seenIds = new Set(results.map((r) => r.id));
      for (const r of fallbackResults) {
        if (!seenIds.has(r.id)) {
          combinedResults.push(r);
          seenIds.add(r.id);
        }
      }
    }

    // Giới hạn số lượng và ánh xạ dữ liệu kết quả
    return combinedResults.slice(0, limit).map((r) => {
      const originalDoc = this.documentsMap.get(r.id);
      return {
        id: r.id,
        doc_type: r.doc_type as "term" | "acronym",
        term: r.doc_type === "acronym" && r.acronym_key ? `${r.acronym_key} - ${r.term}` : r.term,
        vietnamese: r.vietnamese,
        domain: r.domain,
        snippet: (r.definition || "").slice(0, 150) + "...",
        score: r.score,
        raw_term: originalDoc?.raw_term,
        raw_acronym: originalDoc?.raw_acronym
      };
    });
  }

  /**
   * Lấy số lượng tài liệu đã chỉ mục
   */
  public getCount(): number {
    return this.documentsMap.size;
  }
}

// Khởi tạo Singleton instance
let searchEngineInstance: LexiconSearchEngine | null = null;

export function getSearchEngine(): LexiconSearchEngine {
  if (!searchEngineInstance) {
    searchEngineInstance = new LexiconSearchEngine();
  }
  return searchEngineInstance;
}
