import { TermRevisionInput, NewTermProposalInput } from "./types";

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  errorField?: string;
}

/**
 * Kiểm tra tính hợp lệ sơ bộ của Đề xuất Chỉnh sửa (Revision)
 * Ngăn chặn dữ liệu rác, nội dung không thay đổi, bảo vệ 100% chi phí gọi Gemini API.
 */
export function validateRevisionLocally(input: TermRevisionInput): ValidationResult {
  // 1. Kiểm tra lý do chỉnh sửa (Edit Summary)
  const summary = (input.editSummary || "").trim();
  if (summary.length < 10) {
    return {
      isValid: false,
      errorField: "editSummary",
      error: "Lý do chỉnh sửa quá ngắn (tối thiểu 10 ký tự). Vui lòng nêu rõ lý do hoặc luận điểm cần bổ sung/chỉnh sửa."
    };
  }

  // 2. Kiểm tra nguồn kiểm chứng (DOI / Tài liệu học thuật)
  const sources = (input.supportingSources || "").trim();
  if (sources.length < 5) {
    return {
      isValid: false,
      errorField: "supportingSources",
      error: "Vui lòng cung cấp nguồn học thuật kiểm chứng hoặc mã DOI (tối thiểu 5 ký tự)."
    };
  }

  // 3. Kiểm tra xem có bất kỳ thay đổi nào so với bản gốc hay không
  const orig = input.originalContent || {};
  const prop = input.proposedContent || {};

  const hasDiff = 
    (prop.coreDefinition !== undefined && prop.coreDefinition.trim() !== (orig.coreDefinition || "").trim()) ||
    (prop.benchmarks !== undefined && prop.benchmarks.trim() !== (orig.benchmarks || "").trim()) ||
    (prop.pitfalls !== undefined && prop.pitfalls.trim() !== (orig.pitfalls || "").trim()) ||
    (prop.debates !== undefined && prop.debates.trim() !== (orig.debates || "").trim()) ||
    (prop.seminalCitation !== undefined && prop.seminalCitation.trim() !== (orig.seminalCitation || "").trim()) ||
    (prop.apaReference !== undefined && prop.apaReference.trim() !== (orig.apaReference || "").trim());

  if (!hasDiff) {
    return {
      isValid: false,
      errorField: "proposedContent",
      error: "Nội dung đề xuất giống hệt bản hiện tại, không có chỉnh sửa nào được phát hiện."
    };
  }

  // 4. Nếu có sửa định nghĩa, định nghĩa không được quá ngắn
  if (prop.coreDefinition !== undefined && prop.coreDefinition.trim().length > 0 && prop.coreDefinition.trim().length < 25) {
    return {
      isValid: false,
      errorField: "coreDefinition",
      error: "Định nghĩa đề xuất quá ngắn (tối thiểu 25 ký tự). Vui lòng trình bày định nghĩa hoàn chỉnh mang tính khái niệm hóa."
    };
  }

  return { isValid: true };
}

/**
 * Kiểm tra tính hợp lệ sơ bộ của Đề xuất Thuật ngữ Mới (New Term Proposal)
 */
export function validateNewTermLocally(input: NewTermProposalInput): ValidationResult {
  // 1. Tên thuật ngữ tiếng Anh
  const term = (input.term || "").trim();
  if (term.length < 3) {
    return {
      isValid: false,
      errorField: "term",
      error: "Tên thuật ngữ tiếng Anh phải có ít nhất 3 ký tự."
    };
  }

  // 2. Bản dịch tiếng Việt
  const vietnamese = (input.vietnamese || "").trim();
  if (vietnamese.length < 3) {
    return {
      isValid: false,
      errorField: "vietnamese",
      error: "Bản dịch tiếng Việt chuẩn hóa phải có ít nhất 3 ký tự."
    };
  }

  // 3. Định nghĩa cốt lõi
  const definition = (input.coreDefinition || "").trim();
  if (definition.length < 30) {
    return {
      isValid: false,
      errorField: "coreDefinition",
      error: "Định nghĩa cốt lõi quá ngắn (tối thiểu 30 ký tự). Định nghĩa cần làm rõ bản chất phương pháp luận và mục đích trong nghiên cứu."
    };
  }

  // 4. Nguồn trích dẫn / Seminal Paper
  const sources = (input.supportingSources || "").trim();
  if (sources.length < 5) {
    return {
      isValid: false,
      errorField: "supportingSources",
      error: "Vui lòng cung cấp nguồn trích dẫn học thuật uy tín hoặc mã DOI kiểm chứng."
    };
  }

  // 5. Lý do đề xuất
  const reason = (input.proposalReason || "").trim();
  if (reason.length < 10) {
    return {
      isValid: false,
      errorField: "proposalReason",
      error: "Vui lòng nêu lý do đề xuất bổ sung mục từ này vào từ điển (tối thiểu 10 ký tự)."
    };
  }

  return { isValid: true };
}

/**
 * Gửi yêu cầu thẩm định học thuật đến Server-Side Gemini API Route
 */
export async function requestAiReview(
  type: "revision" | "new_term",
  termName: string,
  payload: TermRevisionInput | NewTermProposalInput
): Promise<{ success: boolean; evaluation?: any; error?: string }> {
  try {
    const res = await fetch("/api/moderation/ai-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, termName, payload })
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error("[requestAiReview] Network error:", err);
    return {
      success: false,
      error: "Không thể kết nối đến máy chủ thẩm định AI. Vui lòng thử lại sau."
    };
  }
}
