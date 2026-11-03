import fs from "fs";
import path from "path";
import { MethodologyTerm, AcademicAcronym, SearchItem } from "./types";
import { MethodologyTermSchema } from "./schema";

// Đường dẫn ưu tiên: public/data/ trong web, hoặc fallback về ../data/
function getDataPath(fileName: string): string {
  const localPublicPath = path.join(process.cwd(), "public", "data", fileName);
  if (fs.existsSync(localPublicPath)) {
    return localPublicPath;
  }
  const rootDataPath = path.join(process.cwd(), "..", "data", fileName);
  if (fs.existsSync(rootDataPath)) {
    return rootDataPath;
  }
  return localPublicPath;
}

/**
 * Đọc toàn bộ danh sách thuật ngữ phương pháp (Flagship Methodology Terms)
 */
export function getAllTerms(): MethodologyTerm[] {
  try {
    const filePath = getDataPath("methodology_terms.json");
    if (!fs.existsSync(filePath)) {
      console.warn(`[data-loader] File not found: ${filePath}`);
      return [];
    }
    const rawData = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(rawData);
    const terms = json.terms || [];

    // Parse và gán an toàn qua Zod Schema
    return terms.map((item: any) => {
      const parsed = MethodologyTermSchema.safeParse(item);
      if (parsed.success) {
        return parsed.data as MethodologyTerm;
      } else {
        const normalizeText = (val: unknown): string => {
          if (Array.isArray(val)) {
            return val
              .map((s) => (String(s).trim().startsWith("•") ? String(s).trim() : `• ${String(s).trim()}`))
              .join("\n");
          }
          return typeof val === "string" ? val : "";
        };
        // Fallback tự động nếu data đang làm sạch thiếu trường, giữ nguyên đầy đủ các trường tiếng Anh & thẩm định
        return {
          ...item,
          id: item.id || `term-${Math.random().toString(36).substring(2, 9)}`,
          term: item.term || "Thuật ngữ chưa đặt tên",
          ipa: item.ipa || "",
          part_of_speech: item.part_of_speech || "Noun",
          vietnamese: item.vietnamese || "Chưa có bản dịch",
          vietnamese_variants: item.vietnamese_variants || [],
          domain_tags: item.domain_tags || ["Phương pháp Nghiên cứu"],
          category: item.category || "",
          core_definition: item.core_definition || "Nội dung đang được cập nhật...",
          operational_mechanism: item.operational_mechanism || "",
          paradigm_debates: item.paradigm_debates || "",
          benchmarks: normalizeText(item.benchmarks),
          pitfalls: normalizeText(item.pitfalls),
          academic_example: item.academic_example || "",
          syntactic_patterns: item.syntactic_patterns || "",
          apa_reporting_rules: item.apa_reporting_rules || "",
          reporting_tips: item.reporting_tips || "",
          vietnam_contextual_note: item.vietnam_contextual_note || "",
          seminal_citation: item.seminal_citation || "",
          apa_intext: item.apa_intext || "",
          apa_reference: item.apa_reference || "",
          corpus_variants: item.corpus_variants || [],
          related_terms: item.related_terms || [],
          tier: item.tier || (item.apa_reference ? "flagship" : "textbook"),
          is_flagship: item.is_flagship ?? Boolean(item.apa_reference && item.apa_reference.trim().length > 0),
          core_definition_en: item.core_definition_en,
          operational_mechanism_en: item.operational_mechanism_en,
          benchmarks_en: normalizeText(item.benchmarks_en) || undefined,
          pitfalls_en: normalizeText(item.pitfalls_en) || undefined,
          paradigm_debates_en: item.paradigm_debates_en,
          domain_tags_en: item.domain_tags_en,
          expert_status: item.expert_status,
          expert_notes: item.expert_notes,
          expert_checks: item.expert_checks,
        } as MethodologyTerm;
      }
    });
  } catch (error) {
    console.error("[data-loader] Lỗi khi đọc methodology_terms.json:", error);
    return [];
  }
}

/**
 * Lấy chi tiết một thuật ngữ theo Slug ID
 */
export function getTermById(id: string): MethodologyTerm | undefined {
  const terms = getAllTerms();
  return terms.find((t) => t.id === id);
}

/**
 * Đọc toàn bộ danh sách thuật ngữ viết tắt (Acronyms)
 */
export function getAllAcronyms(): Record<string, AcademicAcronym> {
  try {
    const filePath = getDataPath("acronyms.json");
    if (!fs.existsSync(filePath)) {
      return {};
    }
    const rawData = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(rawData);
    return json.acronyms || {};
  } catch (error) {
    console.error("[data-loader] Lỗi khi đọc acronyms.json:", error);
    return {};
  }
}

/**
 * Lấy danh sách tổng hợp siêu nhẹ để làm Search Index
 */
export function getSearchIndex(): SearchItem[] {
  const terms = getAllTerms();
  const acronyms = getAllAcronyms();

  const termItems: SearchItem[] = terms.map((t) => ({
    id: t.id,
    term: t.term,
    vietnamese: t.vietnamese,
    vietnamese_variants: t.vietnamese_variants,
    type: "term",
    domain: t.category || t.domain_tags[0] || "Phương pháp",
    snippet: t.core_definition.slice(0, 160) + "..."
  }));

  const acronymItems: SearchItem[] = Object.entries(acronyms).map(([key, val]) => ({
    id: `acronym-${key.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
    term: key,
    vietnamese: `${val.full_name} (${val.vietnamese})`,
    type: "acronym",
    domain: "Từ viết tắt",
    snippet: val.purpose.slice(0, 160) + "...",
    acronym_key: key
  }));

  return [...termItems, ...acronymItems];
}

/**
 * Lấy số lượng thống kê động (Terms count & Acronyms count)
 */
export function getLexiconStats() {
  const terms = getAllTerms();
  const acronyms = getAllAcronyms();
  return {
    termsCount: terms.length,
    acronymsCount: Object.keys(acronyms).length,
    totalCount: terms.length + Object.keys(acronyms).length
  };
}
