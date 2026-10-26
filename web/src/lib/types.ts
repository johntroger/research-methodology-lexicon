import { z } from "zod";

/**
 * Cấu trúc Biến thể nội hàm / Thuật ngữ con liên quan
 */
export interface CorpusVariant {
  v: string;             // Tên tiếng Anh của biến thể
  vn: string;            // Bản dịch tiếng Việt
  rel?: string;           // Mối quan hệ logic hoặc điều kiện ngưỡng
  src?: string;           // Nguồn trích dẫn (ví dụ: Hair et al. 2018)
  rel_en?: string;        // Mối quan hệ bằng tiếng Anh
}

/**
 * Cấu trúc Mục từ Chuẩn Từ điển Phương pháp Nghiên cứu Khoa học
 */
export interface MethodologyTerm {
  id: string;                                // Slug URL duy nhất (ví dụ: "construct-validity")
  term: string;                              // Tên thuật ngữ tiếng Anh gốc
  ipa?: string;                              // Phiên âm quốc tế IPA
  part_of_speech?: string;                   // Từ loại: [Danh từ - n.], [Động từ - v.], ...
  vietnamese: string;                        // Bản dịch tiếng Việt chuẩn hóa
  vietnamese_variants?: string[];            // Các dị bản dịch thường gặp tại Việt Nam
  domain_tags: string[];                     // Các nhãn chuyên ngành phân loại
  core_definition: string;                   // Định nghĩa cốt lõi chuẩn xác
  paradigm_debates?: string;                 // Tranh luận học thuật & so sánh trường phái
  benchmarks?: string;                       // Ngưỡng tham chiếu số liệu thực nghiệm vàng
  pitfalls?: string;                         // Cảnh báo bẫy dùng sai từ và lỗi hội đồng hay bắt bẻ
  academic_example?: string;                 // Ví dụ câu thực tế trích trong bài báo khoa học
  syntactic_patterns?: string;               // Mẫu cú pháp và giới từ bắt buộc đi kèm (control for, regress on)
  apa_reporting_rules?: string;              // Quy chuẩn viết ký hiệu thống kê theo APA 7th
  reporting_tips?: string;                   // Mẹo viết: Luận án tiến sĩ vs. Bài báo Q1
  vietnam_contextual_note?: string;          // Lưu ý thu thập số liệu trong bối cảnh Việt Nam
  seminal_citation?: string;                 // Bài báo gốc khai sinh khái niệm
  apa_intext?: string;                       // Trích dẫn mẫu trong bài viết (In-text)
  apa_reference?: string;                    // Tài liệu tham khảo hoàn chỉnh chuẩn APA 7th
  corpus_variants?: CorpusVariant[];         // Các thuật ngữ con / nhánh đo lường trực thuộc
  related_terms?: string[];                  // Các ID thuật ngữ liên quan
  // Các trường tiếng Anh cho phiên bản Anh - Anh thuần túy (Monolingual English)
  core_definition_en?: string;
  paradigm_debates_en?: string;
  benchmarks_en?: string;
  pitfalls_en?: string;
  domain_tags_en?: string[];
}

/**
 * Cấu trúc Thuật ngữ Viết tắt Học thuật (Acronyms)
 */
export interface AcademicAcronym {
  full_name: string;                         // Tên tiếng Anh đầy đủ
  vietnamese: string;                        // Tên dịch tiếng Việt
  purpose: string;                           // Mục đích & bản chất trong nghiên cứu
  benchmark?: string;                        // Ngưỡng định lượng tham chiếu
  domain?: string;                           // Lĩnh vực chuyên môn
  // Các trường tiếng Anh cho phiên bản Anh - Anh
  purpose_en?: string;
  benchmark_en?: string;
  domain_en?: string;
}

/**
 * Chỉ mục Tra cứu Rút gọn (Search Entry siêu nhẹ cho MiniSearch)
 */
export interface SearchItem {
  id: string;                                // Khóa chính liên kết
  term: string;                              // Từ khóa tiếng Anh
  vietnamese: string;                        // Từ khóa tiếng Việt
  vietnamese_variants?: string[];            // Dị bản tiếng Việt
  type: "term" | "acronym";                  // Phân loại: Thuật ngữ chính hay từ viết tắt
  domain: string;                            // Chuyên ngành / Lĩnh vực
  snippet: string;                           // Trích đoạn tóm tắt ngắn
  acronym_key?: string;                      // Khóa viết tắt (nếu là acronym)
  snippet_en?: string;
  domain_en?: string;
}

/**
 * Dữ liệu Đề xuất Chỉnh sửa Mục từ (Wiki-Style Revision)
 */
export interface TermRevisionInput {
  termId: string;
  termName: string;
  section: "all" | "definition" | "benchmarks" | "pitfalls" | "debates" | "citations";
  languageMode: "vi" | "en";
  authorUid?: string;
  authorName: string;
  authorEmail?: string;
  authorInstitution?: string;
  editSummary: string;               // Lý do chỉnh sửa (bắt buộc)
  supportingSources: string;          // Nguồn trích dẫn / DOI (bắt buộc)
  originalContent: {
    coreDefinition?: string;
    benchmarks?: string;
    pitfalls?: string;
    debates?: string;
    seminalCitation?: string;
    apaReference?: string;
  };
  proposedContent: {
    coreDefinition?: string;
    benchmarks?: string;
    pitfalls?: string;
    debates?: string;
    seminalCitation?: string;
    apaReference?: string;
  };
  status?: "pending" | "approved" | "rejected";
  createdAt?: string;
}

/**
 * Dữ liệu Đề xuất Tạo Thuật ngữ Mới
 */
export interface NewTermProposalInput {
  term: string;                      // Tên tiếng Anh (bắt buộc)
  ipa?: string;
  partOfSpeech?: string;
  vietnamese: string;                // Tiếng Việt (bắt buộc)
  vietnameseVariants?: string[];
  domainTags: string[];
  coreDefinition: string;            // Bắt buộc
  coreDefinitionEn?: string;
  benchmarks?: string;
  benchmarksEn?: string;
  pitfalls?: string;
  pitfallsEn?: string;
  paradigmDebates?: string;
  paradigmDebatesEn?: string;
  seminalCitation?: string;
  apaReference?: string;
  proposalReason: string;            // Lý do đề xuất (bắt buộc)
  supportingSources: string;         // Nguồn tài liệu uy tín (bắt buộc)
  authorUid?: string;
  authorName: string;
  authorEmail?: string;
  authorInstitution?: string;
  status?: "pending" | "approved" | "rejected";
  createdAt?: string;
}
