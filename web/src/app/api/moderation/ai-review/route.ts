import { NextRequest, NextResponse } from "next/server";
import { 
  AiReviewRequest, 
  AiReviewResponse, 
  AiReviewEvaluation,
  TermRevisionInput,
  NewTermProposalInput 
} from "../../../../lib/types";
import { 
  validateRevisionLocally, 
  validateNewTermLocally 
} from "../../../../lib/submission-guard";

const DEFAULT_GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

/**
 * System Prompt chuẩn hóa cho Thẩm định viên Học thuật Q1
 */
const SYSTEM_PROMPT = `Bạn là Chuyên gia Phương pháp luận và Thẩm định viên Cao cấp (Senior Peer Reviewer) cho các tạp chí quốc tế Q1 (như Journal of Marketing, MIS Quarterly, Journal of Applied Psychology).
Nhiệm vụ của bạn là thẩm định nghiêm ngặt một bản đề xuất đóng góp vào Từ điển Phương pháp Nghiên cứu Khoa học (bao gồm đề xuất chỉnh sửa mục từ hoặc tạo thuật ngữ mới).

TIÊU CHUẨN ĐÁNH GIÁ (Thang điểm 0 - 100):
1. definition_rigor (Độ chuẩn xác định nghĩa): Định nghĩa có chặt chẽ, sáng rõ, mang tính khái niệm hóa cao, không bị văn nói/mơ hồ?
2. empirical_benchmarks (Ngưỡng thực nghiệm): Các con số cut-off (ví dụ Cronbach's alpha >= 0.70, CR >= 0.70, AVE >= 0.50, HTMT < 0.85/0.90, VIF < 3.3/5.0...) có chính xác và trích dẫn đúng trường phái?
3. pitfalls_validity (Cạm bẫy phương pháp): Cảnh báo bẫy dùng từ và lỗi hội đồng có thực tế, đúng trọng tâm không?
4. citation_integrity (Tính xác thực trích dẫn): Trích dẫn seminal paper, tác giả khai sinh và mã DOI có chuẩn mực APA 7th không? ĐẶC BIỆT: Phải phát hiện và gắn cờ đỏ nếu nghi ngờ bịa nguồn (hallucination).
5. academic_tone (Văn phong học thuật): Văn phong nghiêm cẩn, học thuật, tuyệt đối không dùng từ ngữ cảm tính, sáo rỗng hoặc quảng cáo.

QUY TẮC PHÂN LOẠI QUYẾT ĐỊNH (verdict):
- "approve": Điểm tổng >= 80, không có red flags nghiêm trọng, nội dung làm tăng giá trị học thuật.
- "needs_revision": Điểm tổng từ 60 - 79, hoặc có một số điểm cần làm rõ/chỉnh sửa trước khi ban hành.
- "reject": Điểm tổng < 60, hoặc vi phạm nghiêm trọng (bịa nguồn, định nghĩa sai lệch bản chất, nội dung rác).

BẮT BUỘC TRẢ VỀ JSON HỢP LỆ THEO SCHEMA SAU:
{
  "verdict": "approve" | "reject" | "needs_revision",
  "academic_score": number, // 0 - 100
  "summary": string, // 2-3 câu súc tích bằng tiếng Việt giải thích lý do đánh giá
  "criteria": {
    "definition_rigor": number,
    "empirical_benchmarks": number,
    "pitfalls_validity": number,
    "citation_integrity": number,
    "academic_tone": number
  },
  "red_flags": string[], // Danh sách các cảnh báo vi phạm nghiêm trọng (mảng rỗng [] nếu không có)
  "key_strengths": string[], // Các điểm nổi bật của bài nộp
  "suggested_editorial_notes": string // Lời khuyên cụ thể, mang tính xây dựng giúp tác giả hoặc biên tập viên hoàn thiện
}`;

/**
 * Bộ thẩm định heuristic thông minh (dùng khi chưa cấu hình GEMINI_API_KEY)
 */
function generateHeuristicEvaluation(
  type: "revision" | "new_term",
  termName: string,
  payload: TermRevisionInput | NewTermProposalInput
): AiReviewEvaluation {
  let score = 75;
  const redFlags: string[] = [];
  const strengths: string[] = [];

  let sources = "";
  let definition = "";

  if (type === "revision") {
    const rev = payload as TermRevisionInput;
    sources = rev.supportingSources || "";
    definition = rev.proposedContent?.coreDefinition || "";

    if (rev.editSummary && rev.editSummary.length > 25) {
      score += 5;
      strengths.push("Lý do chỉnh sửa được trình bày rõ ràng, có căn cứ phương pháp luận.");
    }
  } else {
    const prop = payload as NewTermProposalInput;
    sources = prop.supportingSources || "";
    definition = prop.coreDefinition || "";

    if (prop.benchmarks && prop.benchmarks.length > 20) {
      score += 5;
      strengths.push("Có cung cấp ngưỡng tham chiếu thực nghiệm chi tiết.");
    }
    if (prop.pitfalls && prop.pitfalls.length > 20) {
      score += 5;
      strengths.push("Có nhận diện cạm bẫy phương pháp luận thường gặp.");
    }
  }

  // Phân tích trích dẫn học thuật / DOI
  const hasDoi = /10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+/.test(sources) || /doi\.org/i.test(sources);
  const hasYear = /\((19|20)\d{2}\)|(19|20)\d{2}/.test(sources);
  const hasSeminalAuthor = /(Hair|Fornell|Larcker|Podsakoff|Nunnally|Kline|Hayes|Bagozzi|Creswell|Marsh|Henseler|Sarstedt|Preacher)/i.test(sources);

  if (hasDoi || (hasYear && hasSeminalAuthor)) {
    score += 10;
    strengths.push("Nguồn trích dẫn học thuật uy tín có năm xuất bản hoặc DOI kiểm chứng rõ ràng.");
  } else if (!hasYear) {
    score -= 15;
    redFlags.push("Nguồn trích dẫn thiếu năm xuất bản hoặc không tuân thủ định dạng APA 7th.");
  }

  // Phân tích định nghĩa
  if (definition && definition.length >= 60) {
    score += 5;
    strengths.push("Định nghĩa có chiều sâu và làm rõ cơ chế vận hành của thuật ngữ.");
  } else if (definition && definition.length < 35) {
    score -= 10;
    redFlags.push("Định nghĩa còn ngắn gọn, chưa phân tích đầy đủ bản chất phương pháp luận.");
  }

  // Chuẩn hóa điểm trong khoảng 0 - 100
  score = Math.max(30, Math.min(95, score));

  let verdict: "approve" | "reject" | "needs_revision" = "needs_revision";
  if (score >= 80 && redFlags.length === 0) {
    verdict = "approve";
  } else if (score < 60 || redFlags.length >= 2) {
    verdict = "reject";
  }

  const defScore = Math.min(100, score + 2);
  const benchScore = Math.min(100, Math.max(50, score - 3));
  const pitScore = Math.min(100, Math.max(55, score - 2));
  const citeScore = hasDoi || hasSeminalAuthor ? Math.min(100, score + 5) : Math.max(40, score - 15);
  const toneScore = Math.min(100, score);

  return {
    verdict,
    academic_score: score,
    summary: verdict === "approve"
      ? `Đề xuất cho "${termName}" đáp ứng tốt tiêu chuẩn học thuật với nguồn trích dẫn rõ ràng và định nghĩa có chiều sâu.`
      : verdict === "needs_revision"
      ? `Đề xuất cho "${termName}" có tiềm năng nhưng cần bổ sung trích dẫn chuẩn APA 7th và làm rõ thêm ngưỡng thực nghiệm.`
      : `Đề xuất cho "${termName}" chưa đáp ứng tiêu chuẩn thẩm định tối thiểu hoặc thiếu nguồn gốc kiểm chứng.`,
    criteria: {
      definition_rigor: defScore,
      empirical_benchmarks: benchScore,
      pitfalls_validity: pitScore,
      citation_integrity: citeScore,
      academic_tone: toneScore
    },
    red_flags: redFlags,
    key_strengths: strengths.length > 0 ? strengths : ["Thuật ngữ phù hợp với mục tiêu từ điển phương pháp nghiên cứu."],
    suggested_editorial_notes: verdict === "approve"
      ? "Đề xuất đạt chuẩn, khuyến nghị Ban biên tập phê duyệt vào từ điển."
      : "Vui lòng cập nhật bổ sung bài báo seminal paper và định dạng lại trích dẫn theo APA 7th.",
    evaluated_at: new Date().toISOString(),
    model: "gemini-2.5-flash (heuristic-fallback)"
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: AiReviewRequest = await req.json();
    const { type, termName, payload } = body;

    if (!type || !termName || !payload) {
      return NextResponse.json<AiReviewResponse>(
        { success: false, error: "Dữ liệu yêu cầu không hợp lệ (thiếu type, termName hoặc payload)." },
        { status: 400 }
      );
    }

    // 1. Tầng Kiểm tra Tĩnh (Local Pre-validation) trước khi gọi AI
    if (type === "revision") {
      const validation = validateRevisionLocally(payload as TermRevisionInput);
      if (!validation.isValid) {
        return NextResponse.json<AiReviewResponse>(
          { success: false, error: validation.error },
          { status: 422 }
        );
      }
    } else if (type === "new_term") {
      const validation = validateNewTermLocally(payload as NewTermProposalInput);
      if (!validation.isValid) {
        return NextResponse.json<AiReviewResponse>(
          { success: false, error: validation.error },
          { status: 422 }
        );
      }
    }

    // 2. Kiểm tra API Key của Gemini
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("[Gemini AI] Chưa cấu hình GEMINI_API_KEY. Chạy chế độ thẩm định Heuristic.");
      const evaluation = generateHeuristicEvaluation(type, termName, payload);
      return NextResponse.json<AiReviewResponse>({
        success: true,
        evaluation
      });
    }

    // 3. Chuẩn bị nội dung gửi đến Google Gemini Paid API
    const userPrompt = `
Vui lòng thẩm định đề xuất sau:
- Loại đề xuất: ${type === "revision" ? "CHỈNH SỬA MỤC TỪ HIỆN CÓ (Revision)" : "TẠO THUẬT NGỮ MỚI (New Term)"}
- Tên thuật ngữ: ${termName}
- Dữ liệu chi tiết:
${JSON.stringify(payload, null, 2)}
`;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${DEFAULT_GEMINI_MODEL}:generateContent?key=${apiKey}`;

    const apiResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: [
          {
            parts: [{ text: userPrompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      })
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error("[Gemini AI] API Error:", apiResponse.status, errorText);

      // Fallback thông minh nếu API gặp sự cố (ví dụ quota tạm thời)
      const fallbackEval = generateHeuristicEvaluation(type, termName, payload);
      fallbackEval.summary += " (Lưu ý: Kết quả thẩm định tạm thời do kết nối Gemini API gián đoạn)";
      return NextResponse.json<AiReviewResponse>({
        success: true,
        evaluation: fallbackEval
      });
    }

    const data = await apiResponse.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error("Không nhận được phản hồi văn bản từ Gemini API.");
    }

    const evaluationJson = JSON.parse(candidateText);

    const evaluation: AiReviewEvaluation = {
      verdict: evaluationJson.verdict || "needs_revision",
      academic_score: Number(evaluationJson.academic_score) || 70,
      summary: evaluationJson.summary || `Đánh giá học thuật cho "${termName}".`,
      criteria: {
        definition_rigor: Number(evaluationJson.criteria?.definition_rigor) || 70,
        empirical_benchmarks: Number(evaluationJson.criteria?.empirical_benchmarks) || 70,
        pitfalls_validity: Number(evaluationJson.criteria?.pitfalls_validity) || 70,
        citation_integrity: Number(evaluationJson.criteria?.citation_integrity) || 70,
        academic_tone: Number(evaluationJson.criteria?.academic_tone) || 70
      },
      red_flags: Array.isArray(evaluationJson.red_flags) ? evaluationJson.red_flags : [],
      key_strengths: Array.isArray(evaluationJson.key_strengths) ? evaluationJson.key_strengths : [],
      suggested_editorial_notes: evaluationJson.suggested_editorial_notes || "Xem xét kỹ các tài liệu trích dẫn trước khi phê duyệt.",
      evaluated_at: new Date().toISOString(),
      model: DEFAULT_GEMINI_MODEL
    };

    return NextResponse.json<AiReviewResponse>({
      success: true,
      evaluation
    });

  } catch (error: any) {
    console.error("[Gemini AI Review Route] Error:", error);
    return NextResponse.json<AiReviewResponse>(
      { success: false, error: error?.message || "Lỗi hệ thống trong quá trình thẩm định AI." },
      { status: 500 }
    );
  }
}
