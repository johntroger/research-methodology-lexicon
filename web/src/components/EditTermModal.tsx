"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  Send, 
  CheckCircle2, 
  GitPullRequest, 
  AlertTriangle, 
  BookOpen, 
  Sparkles, 
  ShieldAlert,
  LogIn,
  GraduationCap
} from "lucide-react";
import { MethodologyTerm, TermRevisionInput, AiReviewEvaluation } from "@/lib/types";
import { 
  submitTermRevision, 
  checkSubmissionRateLimit 
} from "@/lib/firebase-service";
import { 
  validateRevisionLocally, 
  requestAiReview 
} from "@/lib/submission-guard";
import AiReviewCritiqueCard from "./AiReviewCritiqueCard";
import { 
  getTermDefinition, 
  getTermBenchmarks, 
  getTermPitfalls, 
  getTermDebates 
} from "@/lib/monolingual-academic-data";
import type { User } from "firebase/auth";

interface EditTermModalProps {
  term: MethodologyTerm;
  section?: "all" | "vietnamese" | "definition" | "benchmarks" | "pitfalls" | "debates" | "citations";
  isOpen: boolean;
  onClose: () => void;
  languageMode?: "vi" | "en";
  currentUser: User | null;
  onLoginRequired: () => void;
}

const VI_CHAR_REGEX = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;

export default function EditTermModal({
  term,
  section = "all",
  isOpen,
  onClose,
  languageMode = "vi",
  currentUser,
  onLoginRequired
}: EditTermModalProps) {
  const isEn = languageMode === "en";

  // Form State
  const [institution, setInstitution] = useState("");
  const [editSummary, setEditSummary] = useState("");
  const [supportingSources, setSupportingSources] = useState("");

  // Content Fields
  const [vietnamese, setVietnamese] = useState("");
  const [vietnameseVariants, setVietnameseVariants] = useState("");
  const [coreDef, setCoreDef] = useState("");
  const [benchmarks, setBenchmarks] = useState("");
  const [pitfalls, setPitfalls] = useState("");
  const [debates, setDebates] = useState("");
  const [seminalCitation, setSeminalCitation] = useState("");
  const [apaReference, setApaReference] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rateLimitInfo, setRateLimitInfo] = useState({ allowed: true, remaining: 3 });

  // AI Review States
  const [isAiReviewing, setIsAiReviewing] = useState(false);
  const [aiEvaluation, setAiEvaluation] = useState<AiReviewEvaluation | null>(null);
  const [showAiDrawer, setShowAiDrawer] = useState(false);
  const [pendingRevisionData, setPendingRevisionData] = useState<TermRevisionInput | null>(null);

  // Khởi tạo giá trị ban đầu từ mục từ hiện tại
  useEffect(() => {
    if (isOpen) {
      setVietnamese(term.vietnamese || "");
      setVietnameseVariants((term.vietnamese_variants || []).join(", "));
      setCoreDef(getTermDefinition(term, languageMode));
      setBenchmarks(getTermBenchmarks(term, languageMode) || "");
      setPitfalls(getTermPitfalls(term, languageMode) || "");
      setDebates(getTermDebates(term, languageMode) || "");
      setSeminalCitation(term.seminal_citation || "");
      setApaReference(term.apa_reference || "");
      setEditSummary("");
      setSupportingSources("");
      setErrorMessage(null);
      setIsSuccess(false);
      setShowAiDrawer(false);
      setAiEvaluation(null);
      setPendingRevisionData(null);
      setRateLimitInfo(checkSubmissionRateLimit());
    }
  }, [isOpen, term, languageMode]);

  if (!isOpen) return null;

  // Kiểm tra vi phạm tiếng Việt khi ở chế độ English
  const hasVietnameseViolation = isEn && (
    VI_CHAR_REGEX.test(coreDef) ||
    VI_CHAR_REGEX.test(benchmarks) ||
    VI_CHAR_REGEX.test(pitfalls) ||
    VI_CHAR_REGEX.test(debates) ||
    VI_CHAR_REGEX.test(editSummary)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onLoginRequired();
      return;
    }

    if (!editSummary.trim() || !supportingSources.trim()) {
      setErrorMessage(
        isEn 
          ? "Please provide both an Edit Summary and Supporting Academic Citations." 
          : "Vui lòng nhập đầy đủ Lý do chỉnh sửa và Nguồn tài liệu học thuật kiểm chứng."
      );
      return;
    }

    if (hasVietnameseViolation) {
      setErrorMessage(
        isEn
          ? "Strict Academic Rule Violation: No Vietnamese characters are allowed in the Monolingual English Edition."
          : "Lỗi: Không được chứa ký tự tiếng Việt trong phiên bản tiếng Anh."
      );
      return;
    }

    setErrorMessage(null);

    // Parse variants thành array chuỗi
    const parsedVariants = vietnameseVariants
      .split(/[,;\n•]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    const revisionData: TermRevisionInput = {
      termId: term.id,
      termName: term.term,
      section,
      languageMode,
      authorUid: currentUser.uid,
      authorName: currentUser.displayName || currentUser.email || "Academic Researcher",
      authorEmail: currentUser.email || undefined,
      authorInstitution: institution.trim() || undefined,
      editSummary: editSummary.trim(),
      supportingSources: supportingSources.trim(),
      originalContent: {
        vietnamese: term.vietnamese,
        vietnameseVariants: term.vietnamese_variants || [],
        coreDefinition: getTermDefinition(term, languageMode),
        benchmarks: getTermBenchmarks(term, languageMode),
        pitfalls: getTermPitfalls(term, languageMode),
        debates: getTermDebates(term, languageMode),
        seminalCitation: term.seminal_citation,
        apaReference: term.apa_reference
      },
      proposedContent: {
        vietnamese: vietnamese.trim() || undefined,
        vietnameseVariants: parsedVariants.length > 0 ? parsedVariants : undefined,
        coreDefinition: coreDef.trim(),
        benchmarks: benchmarks.trim() || undefined,
        pitfalls: pitfalls.trim() || undefined,
        debates: debates.trim() || undefined,
        seminalCitation: seminalCitation.trim() || undefined,
        apaReference: apaReference.trim() || undefined
      }
    };

    // 1. Kiểm tra tĩnh sơ bộ (Local Validation Guard)
    const localVal = validateRevisionLocally(revisionData);
    if (!localVal.isValid) {
      setErrorMessage(localVal.error || "Dữ liệu chưa hợp lệ.");
      return;
    }

    // 2. Kích hoạt Thẩm định Học thuật Thời gian thực với Gemini AI
    setIsAiReviewing(true);
    setShowAiDrawer(false);

    try {
      const aiRes = await requestAiReview("revision", term.term, revisionData);
      setIsAiReviewing(false);

      if (aiRes.success && aiRes.evaluation) {
        const evaluation: AiReviewEvaluation = aiRes.evaluation;
        setAiEvaluation(evaluation);
        revisionData.aiEvaluation = evaluation;

        // Nếu được phê duyệt hoặc điểm >= 80 (Đạt chuẩn)
        if (evaluation.verdict === "approve" || evaluation.academic_score >= 80) {
          setIsSubmitting(true);
          const res = await submitTermRevision(revisionData);
          setIsSubmitting(false);

          if (res.success) {
            setIsSuccess(true);
            setTimeout(() => {
              setIsSuccess(false);
              onClose();
            }, 2600);
          } else {
            setErrorMessage(res.error || (isEn ? "Failed to submit revision." : "Gửi đề xuất thất bại."));
          }
        } else {
          // Chưa đạt chuẩn: mở bảng góp ý AI để người dùng chỉnh sửa
          setPendingRevisionData(revisionData);
          setShowAiDrawer(true);
        }
      } else {
        // Fallback: nếu AI lỗi, vẫn cho phép gửi thủ công bình thường
        setIsSubmitting(true);
        const res = await submitTermRevision(revisionData);
        setIsSubmitting(false);

        if (res.success) {
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            onClose();
          }, 2200);
        } else {
          setErrorMessage(res.error || (isEn ? "Failed to submit revision." : "Gửi đề xuất thất bại."));
        }
      }
    } catch (err: any) {
      console.error("[EditTermModal AI Submit Error]", err);
      setIsAiReviewing(false);
      setErrorMessage("Lỗi trong quá trình thẩm định AI. Vui lòng thử lại.");
    }
  };

  const handleForceSubmit = async () => {
    if (!pendingRevisionData) return;
    setIsSubmitting(true);
    try {
      const res = await submitTermRevision(pendingRevisionData);
      setIsSubmitting(false);

      if (res.success) {
        setShowAiDrawer(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 2200);
      } else {
        setErrorMessage(res.error || (isEn ? "Failed to submit revision." : "Gửi đề xuất thất bại."));
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage("Gửi đề xuất thất bại.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <GitPullRequest size={18} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {isEn ? "Propose Term Revision" : "Đề xuất Chỉnh sửa Thuật ngữ"}
                <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {term.term}
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isEn 
                  ? "Wiki-style scholarly peer review (Pending approval by editorial board)" 
                  : "Mô hình phản biện mở Wiki (Đề xuất sẽ được Hội đồng biên tập xem xét qua bảng Diff)"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        {isSuccess ? (
          <div className="p-8 sm:p-10 flex flex-col items-center justify-center text-center space-y-3.5">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center animate-bounce">
              <CheckCircle2 size={32} />
            </div>
            
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {isEn ? "Revision Proposal Submitted!" : "Đề xuất Chỉnh sửa Đã Được Ghi Nhận!"}
              </h4>
              {aiEvaluation && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <Sparkles size={13} />
                  <span>AI Verified • Điểm Thẩm Định: {aiEvaluation.academic_score}/100</span>
                </div>
              )}
            </div>

            {aiEvaluation?.summary && (
              <p className="text-xs text-slate-700 dark:text-slate-300 max-w-md bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 p-3 rounded-xl italic">
                "{aiEvaluation.summary}"
              </p>
            )}

            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              {isEn
                ? "Your proposed changes have been verified and placed in the priority moderation queue for editorial confirmation."
                : "Đóng góp học thuật của bạn đã được gắn cờ ưu tiên (AI Verified) và chuyển đến Ban biên tập để hoàn tất cập nhật vào bản chính thức."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
            {/* Banner trạng thái khi AI đang thẩm định */}
            {isAiReviewing && (
              <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/80 dark:bg-indigo-950/40 flex items-center gap-3 animate-pulse">
                <div className="p-2 rounded-lg bg-indigo-600 text-white shrink-0">
                  <Sparkles size={16} className="animate-spin" />
                </div>
                <div className="text-xs space-y-0.5">
                  <strong className="text-indigo-950 dark:text-indigo-200 block font-bold">
                    {isEn ? "Gemini AI is peer-reviewing your submission..." : "Trợ lý AI đang thẩm định học thuật chuẩn Q1..."}
                  </strong>
                  <p className="text-indigo-700 dark:text-indigo-300 text-[11px]">
                    {isEn 
                      ? "Evaluating conceptual rigor, empirical benchmarks, and citation integrity in real-time." 
                      : "Đang kiểm tra tính chính xác của định nghĩa, ngưỡng số liệu và tính xác thực của nguồn DOI/trích dẫn..."}
                  </p>
                </div>
              </div>
            )}

            {/* Bảng góp ý chi tiết từ AI nếu chưa đạt chuẩn */}
            {showAiDrawer && aiEvaluation && (
              <AiReviewCritiqueCard 
                evaluation={aiEvaluation}
                onEditAgain={() => setShowAiDrawer(false)}
                onForceSubmit={handleForceSubmit}
                isSubmitting={isSubmitting}
                mode="modal_feedback"
              />
            )}

            {/* Banner yêu cầu đăng nhập nếu là Guest */}
            {!currentUser && (
              <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                  <ShieldAlert size={16} className="shrink-0" />
                  <span>
                    {isEn 
                      ? "Sign in with Google to establish scholarly authorship and attribution." 
                      : "Vui lòng đăng nhập Google để định danh học thuật và ghi nhận đóng góp trên mục từ."}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onLoginRequired}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold flex items-center gap-1.5 shrink-0 text-xs shadow-xs"
                >
                  <LogIn size={13} />
                  <span>{isEn ? "Sign In" : "Đăng nhập"}</span>
                </button>
              </div>
            )}

            {/* Cảnh báo vi phạm tiếng Việt ở chế độ English */}
            {hasVietnameseViolation && (
              <div className="p-3 rounded-lg border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 flex items-center gap-2 font-medium">
                <AlertTriangle size={15} className="shrink-0 text-red-500" />
                <span>
                  {isEn
                    ? "Strict Academic Rule: Monolingual English Edition must contain ZERO Vietnamese characters. Please translate all text to standard academic English."
                    : "Quy chuẩn bắt buộc: Bản Anh - Anh không được xuất hiện bất kỳ ký tự tiếng Việt nào. Vui lòng chuyển toàn bộ sang tiếng Anh học thuật."}
                </span>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="p-2.5 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
                {errorMessage}
              </div>
            )}

            {/* Thông tin tác giả đóng góp & Cơ quan công tác */}
            {currentUser && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isEn ? "Author Name" : "Tác giả đóng góp"}
                  </label>
                  <input
                    type="text"
                    disabled
                    value={currentUser.displayName || currentUser.email || ""}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <GraduationCap size={13} />
                    {isEn ? "Affiliation / University (Optional)" : "Trường Đại học / Viện nghiên cứu"}
                  </label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder={isEn ? "e.g. NTTU, Oxford, Harvard, VNU..." : "Ví dụ: Trường Đại học Nguyễn Tất Thành, ĐHQG..."}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* CÁC TRƯỜNG NỘI DUNG MỤC TỪ ĐƯỢC PHÉP CHỈNH SỬA */}
            <div className="space-y-3 pt-1">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <BookOpen size={14} className="text-blue-600" />
                {isEn ? "Propose Content Changes" : "Nội dung đề xuất chỉnh sửa"}
              </h4>

              {/* Bản dịch tiếng Việt chuẩn hóa & Dị bản thường gặp (Chỉ hiển thị khi ở chế độ VI) */}
              {!isEn && (section === "all" || section === "vietnamese") && (
                <div className="p-3.5 rounded-xl border border-blue-200/90 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 space-y-3">
                  <div>
                    <label className="block font-bold text-blue-900 dark:text-blue-300 mb-1">
                      Bản dịch tiếng Việt chuẩn hóa
                    </label>
                    <input
                      type="text"
                      value={vietnamese}
                      onChange={(e) => setVietnamese(e.target.value)}
                      placeholder="Ví dụ: Độ giá trị khái niệm"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Các dị bản dịch thường gặp tại Việt Nam (ngăn cách bằng dấu phẩy)
                    </label>
                    <input
                      type="text"
                      value={vietnameseVariants}
                      onChange={(e) => setVietnameseVariants(e.target.value)}
                      placeholder="Ví dụ: Độ giá trị cấu trúc, Độ giá trị cấu niệm"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Định nghĩa Cốt lõi */}
              {(section === "all" || section === "definition") && (
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isEn ? "Core Conceptual Definition" : "Bản chất & Định nghĩa Cốt lõi"}
                  </label>
                  <textarea
                    rows={3}
                    value={coreDef}
                    onChange={(e) => setCoreDef(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* Ngưỡng thực nghiệm */}
              {(section === "all" || section === "benchmarks") && (
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isEn ? "Empirical Benchmarks & Decision Thresholds" : "Ngưỡng Thực nghiệm & Tiêu chuẩn Phán quyết"}
                  </label>
                  <textarea
                    rows={2}
                    value={benchmarks}
                    onChange={(e) => setBenchmarks(e.target.value)}
                    placeholder={isEn ? "e.g. AVE > 0.50, CR > 0.70, HTMT < 0.85..." : "Ví dụ: AVE > 0.50, CR > 0.70, HTMT < 0.85..."}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* Cạm bẫy phương pháp luận */}
              {(section === "all" || section === "pitfalls") && (
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isEn ? "Methodological Pitfalls & Reviewer Red Flags" : "Cạm bẫy Phương pháp & Điểm đỏ Hội đồng"}
                  </label>
                  <textarea
                    rows={2}
                    value={pitfalls}
                    onChange={(e) => setPitfalls(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* Tranh luận học thuật */}
              {(section === "all" || section === "debates") && (
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isEn ? "Paradigm Debates & Epistemological Stance" : "Tranh luận Học thuật & Trường phái"}
                  </label>
                  <textarea
                    rows={2}
                    value={debates}
                    onChange={(e) => setDebates(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* Trích dẫn & Tài liệu kinh điển */}
              {(section === "all" || section === "citations") && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isEn ? "Seminal Landmark Publication" : "Bài báo gốc kinh điển"}
                    </label>
                    <input
                      type="text"
                      value={seminalCitation}
                      onChange={(e) => setSeminalCitation(e.target.value)}
                      placeholder="e.g. Cronbach & Meehl (1955)..."
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isEn ? "Textbook Citation (APA 7th)" : "Sách giáo khoa trích dẫn"}
                    </label>
                    <input
                      type="text"
                      value={apaReference}
                      onChange={(e) => setApaReference(e.target.value)}
                      placeholder="e.g. Creswell & Creswell (2023)..."
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* HAI TRƯỜNG BẮT BUỘC THEO QUY CHUẨN WIKIPEDIA (EDIT SUMMARY & CITATION) */}
            <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 space-y-3">
              <div>
                <label className="block font-bold text-blue-900 dark:text-blue-300 mb-1">
                  {isEn ? "1. Edit Summary (Why are you modifying this?)" : "1. Tóm tắt Sửa đổi (Lý do chỉnh sửa - Bắt buộc)"} *
                </label>
                <input
                  type="text"
                  required
                  value={editSummary}
                  onChange={(e) => setEditSummary(e.target.value)}
                  placeholder={
                    isEn
                      ? "e.g. Updated HTMT threshold to 0.85 per Henseler et al. (2015)..."
                      : "Ví dụ: Bổ sung ngưỡng HTMT 0.85 theo Henseler (2015) thay cho Fornell-Larcker..."
                  }
                  className="w-full px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-blue-900 dark:text-blue-300 mb-1">
                  {isEn ? "2. Supporting Academic Citation or DOI" : "2. Nguồn Trích Dẫn Học Thuật Uy Tín / DOI (Bắt buộc)"} *
                </label>
                <input
                  type="text"
                  required
                  value={supportingSources}
                  onChange={(e) => setSupportingSources(e.target.value)}
                  placeholder={
                    isEn
                      ? "e.g. Hair et al. (2022) / doi:10.1007/s11747-014-0403-8"
                      : "Ví dụ: Hair et al. (2022) / doi:10.1007/s11747-014-0403-8"
                  }
                  className="w-full px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Footer Actions & Rate Limit Note */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
              <span className="text-[11px] text-slate-400">
                {isEn 
                  ? `Daily limit: ${rateLimitInfo.remaining}/3 proposals remaining` 
                  : `Hạn ngạch: Còn ${rateLimitInfo.remaining}/3 lượt đề xuất trong 24h`}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                >
                  {isEn ? "Cancel" : "Hủy"}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isAiReviewing || hasVietnameseViolation || !currentUser}
                  className="px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white rounded-lg transition flex items-center gap-1.5 shadow-xs"
                >
                  {isAiReviewing ? (
                    <>
                      <Sparkles size={13} className="animate-spin" />
                      <span>{isEn ? "AI Reviewing..." : "AI Đang thẩm định..."}</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Send size={13} className="animate-pulse" />
                      <span>{isEn ? "Submitting..." : "Đang gửi..."}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={13} />
                      <span>{isEn ? "AI Review & Submit" : "Thẩm định AI & Gửi"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
