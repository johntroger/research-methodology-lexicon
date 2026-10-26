"use client";

import React, { useState } from "react";
import { 
  X, 
  Send, 
  CheckCircle2, 
  PlusCircle, 
  AlertTriangle, 
  BookOpen, 
  ShieldAlert,
  LogIn,
  GraduationCap
} from "lucide-react";
import { NewTermProposalInput } from "@/lib/types";
import { 
  submitNewTermProposal, 
  checkSubmissionRateLimit 
} from "@/lib/firebase-service";
import type { User } from "firebase/auth";

interface NewTermModalProps {
  isOpen: boolean;
  onClose: () => void;
  languageMode?: "vi" | "en";
  currentUser: User | null;
  onLoginRequired: () => void;
}

const VI_CHAR_REGEX = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;

const DOMAIN_OPTIONS = [
  "Phương pháp Định lượng",
  "Phương pháp Định tính",
  "Đo lường & Thang đo",
  "Thiết kế Thực nghiệm",
  "Kinh tế lượng",
  "Quan hệ Nhân quả",
  "Khảo sát & Chọn mẫu",
  "Phương pháp Hỗn hợp",
  "Hệ hình Nghiên cứu",
  "Triết học Khoa học",
  "PLS-SEM",
  "CB-SEM"
];

export default function NewTermModal({
  isOpen,
  onClose,
  languageMode = "vi",
  currentUser,
  onLoginRequired
}: NewTermModalProps) {
  const isEn = languageMode === "en";

  // Form Fields
  const [term, setTerm] = useState("");
  const [ipa, setIpa] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("Noun");
  const [vietnamese, setVietnamese] = useState("");
  const [vietnameseVariants, setVietnameseVariants] = useState("");
  const [selectedDomains, setSelectedDomains] = useState<string[]>(["Phương pháp Định lượng"]);
  const [coreDefinition, setCoreDefinition] = useState("");
  const [coreDefinitionEn, setCoreDefinitionEn] = useState("");
  const [benchmarks, setBenchmarks] = useState("");
  const [pitfalls, setPitfalls] = useState("");
  const [seminalCitation, setSeminalCitation] = useState("");
  const [apaReference, setApaReference] = useState("");
  const [proposalReason, setProposalReason] = useState("");
  const [supportingSources, setSupportingSources] = useState("");
  const [institution, setInstitution] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const rateLimitInfo = checkSubmissionRateLimit();

  const toggleDomain = (domain: string) => {
    setSelectedDomains(prev => 
      prev.includes(domain) ? prev.filter(d => d !== domain) : [...prev, domain]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onLoginRequired();
      return;
    }

    if (!term.trim() || !coreDefinition.trim() || !proposalReason.trim() || !supportingSources.trim()) {
      setErrorMessage(
        isEn
          ? "Please fill in all mandatory fields: Term, Core Definition, Proposal Reason, and Supporting Sources."
          : "Vui lòng nhập đủ các trường bắt buộc: Tên thuật ngữ, Định nghĩa cốt lõi, Lý do đề xuất và Nguồn tài liệu uy tín."
      );
      return;
    }

    // Kiểm tra tính hợp lệ tiếng Anh nếu có nhập trường EN
    if (coreDefinitionEn && VI_CHAR_REGEX.test(coreDefinitionEn)) {
      setErrorMessage(
        isEn
          ? "English definition must not contain Vietnamese characters."
          : "Định nghĩa tiếng Anh không được chứa ký tự tiếng Việt."
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const proposalData: NewTermProposalInput = {
      term: term.trim(),
      ipa: ipa.trim() || undefined,
      partOfSpeech,
      vietnamese: vietnamese.trim() || term.trim(),
      vietnameseVariants: vietnameseVariants.trim() 
        ? vietnameseVariants.split(",").map(s => s.trim()).filter(Boolean)
        : [],
      domainTags: selectedDomains.length > 0 ? selectedDomains : ["Phương pháp Nghiên cứu"],
      coreDefinition: coreDefinition.trim(),
      coreDefinitionEn: coreDefinitionEn.trim() || undefined,
      benchmarks: benchmarks.trim() || undefined,
      pitfalls: pitfalls.trim() || undefined,
      seminalCitation: seminalCitation.trim() || undefined,
      apaReference: apaReference.trim() || undefined,
      proposalReason: proposalReason.trim(),
      supportingSources: supportingSources.trim(),
      authorUid: currentUser.uid,
      authorName: currentUser.displayName || currentUser.email || "Academic Researcher",
      authorEmail: currentUser.email || undefined,
      authorInstitution: institution.trim() || undefined
    };

    const res = await submitNewTermProposal(proposalData);
    setIsSubmitting(false);

    if (res.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2200);
    } else {
      setErrorMessage(res.error || (isEn ? "Failed to submit new term proposal." : "Gửi đề xuất thuật ngữ mới thất bại."));
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
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <PlusCircle size={18} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {isEn ? "Propose New Methodology Term" : "Đề xuất Bổ sung Thuật ngữ Phương pháp Mới"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isEn 
                  ? "Help expand the lexicon with peer-reviewed research terminology" 
                  : "Cùng cộng đồng học thuật hoàn thiện kho thuật ngữ phương pháp nghiên cứu khoa học"}
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
          <div className="p-10 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center animate-bounce">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              {isEn ? "New Term Proposal Submitted!" : "Đề xuất thuật ngữ mới đã được gửi thành công!"}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              {isEn
                ? "The editorial committee will review your proposal and seminal literature references before indexing it into the official dictionary."
                : "Hội đồng biên tập sẽ thẩm định định nghĩa và tài liệu tham khảo trước khi bổ sung chính thức vào danh mục thuật ngữ."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
            {/* Banner đăng nhập nếu chưa auth */}
            {!currentUser && (
              <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                  <ShieldAlert size={16} className="shrink-0" />
                  <span>
                    {isEn 
                      ? "Sign in with Google to establish scholarly authorship." 
                      : "Vui lòng đăng nhập Google để định danh học thuật và ghi nhận quyền tác giả."}
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

            {/* Error Message */}
            {errorMessage && (
              <div className="p-2.5 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
                {errorMessage}
              </div>
            )}

            {/* Thông tin tác giả & Trường công tác */}
            {currentUser && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {currentUser.displayName || currentUser.email}
                  </span>
                  <span className="text-slate-400 block text-[11px]">{currentUser.email}</span>
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder={isEn ? "University / Institute..." : "Trường ĐH / Viện nghiên cứu..."}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* 1. THUẬT NGỮ TIẾNG ANH & BẢN DỊCH */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {isEn ? "Term Name (English) *" : "Tên thuật ngữ tiếng Anh *"}
                </label>
                <input
                  type="text"
                  required
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="e.g. Statistical Power, Latent Profile Analysis..."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {isEn ? "Vietnamese Translation" : "Bản dịch tiếng Việt chuẩn hóa *"}
                </label>
                <input
                  type="text"
                  value={vietnamese}
                  onChange={(e) => setVietnamese(e.target.value)}
                  placeholder="Ví dụ: Lực thống kê, Phân tích trắc diện tiềm ẩn..."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Dị bản & Từ loại */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? "Vietnamese Variants (comma separated)" : "Các dị bản dịch thường gặp (phân cách bằng dấu phẩy)"}
                </label>
                <input
                  type="text"
                  value={vietnameseVariants}
                  onChange={(e) => setVietnameseVariants(e.target.value)}
                  placeholder="Ví dụ: Công suất thống kê, Độ mạnh thống kê..."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? "Part of Speech" : "Từ loại"}
                </label>
                <select
                  value={partOfSpeech}
                  onChange={(e) => setPartOfSpeech(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Noun">Noun (Danh từ)</option>
                  <option value="Verb">Verb (Động từ)</option>
                  <option value="Adjective">Adjective (Tính từ)</option>
                  <option value="Framework">Framework / Methodology (Hệ thống phương pháp)</option>
                </select>
              </div>
            </div>

            {/* Lĩnh vực chuyên môn */}
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {isEn ? "Domain Tags (Select 1-3 tags)" : "Lĩnh vực Chuyên môn (Chọn 1-3 nhãn phù hợp)"}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {DOMAIN_OPTIONS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleDomain(tag)}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition ${
                      selectedDomains.includes(tag)
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. ĐỊNH NGHĨA CỐT LÕI */}
            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                {isEn ? "Core Conceptual Definition (English or Vietnamese) *" : "Bản chất & Định nghĩa Cốt lõi (Bắt buộc) *"}
              </label>
              <textarea
                required
                rows={3}
                value={coreDefinition}
                onChange={(e) => setCoreDefinition(e.target.value)}
                placeholder={
                  isEn
                    ? "Enter standard academic conceptual definition with rigorous epistemological scope..."
                    : "Mô tả chuẩn xác bản chất học thuật, đối tượng đo lường hoặc cơ chế phương pháp luận..."
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Ngưỡng thực nghiệm & Cạm bẫy */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? "Empirical Benchmarks" : "Ngưỡng Thực nghiệm (Benchmarks)"}
                </label>
                <textarea
                  rows={2}
                  value={benchmarks}
                  onChange={(e) => setBenchmarks(e.target.value)}
                  placeholder="Ví dụ: Ngưỡng tối thiểu > 0.80, alpha = 0.05..."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? "Methodological Pitfalls" : "Cạm bẫy Phương pháp / Lỗi thường gặp"}
                </label>
                <textarea
                  rows={2}
                  value={pitfalls}
                  onChange={(e) => setPitfalls(e.target.value)}
                  placeholder="Ví dụ: Rất dễ nhầm lẫn khái niệm này với..."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Trích dẫn kinh điển & Sách giáo khoa */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? "Seminal Citation" : "Bài báo gốc kinh điển"}
                </label>
                <input
                  type="text"
                  value={seminalCitation}
                  onChange={(e) => setSeminalCitation(e.target.value)}
                  placeholder="Tác giả (Năm), Tên bài báo, Tạp chí..."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? "APA 7th Reference" : "Sách giáo khoa trích dẫn (APA 7th)"}
                </label>
                <input
                  type="text"
                  value={apaReference}
                  onChange={(e) => setApaReference(e.target.value)}
                  placeholder="Creswell, Hair, Kline..."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 3. LÝ DO ĐỀ XUẤT & NGUỒN KIỂM CHỨNG (BẮT BUỘC) */}
            <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-3">
              <div>
                <label className="block font-bold text-emerald-900 dark:text-emerald-300 mb-1">
                  {isEn ? "Proposal Justification *" : "Lý do Đề xuất Thuật ngữ này *"}
                </label>
                <input
                  type="text"
                  required
                  value={proposalReason}
                  onChange={(e) => setProposalReason(e.target.value)}
                  placeholder={
                    isEn
                      ? "Why is this term essential for doctoral & academic researchers?"
                      : "Tại sao thuật ngữ này quan trọng đối với nghiên cứu sinh và nhà nghiên cứu?"
                  }
                  className="w-full px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-900 dark:text-emerald-300 mb-1">
                  {isEn ? "Academic Supporting Sources / DOI *" : "Nguồn Tài Liệu Học Thuật Kiểm Chứng / DOI *"}
                </label>
                <input
                  type="text"
                  required
                  value={supportingSources}
                  onChange={(e) => setSupportingSources(e.target.value)}
                  placeholder="Ví dụ: doi:10.1037/0033-2909.131.6.862 hoặc Tạp chí Q1 / Nhà xuất bản SAGE"
                  className="w-full px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Footer Actions */}
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
                  disabled={isSubmitting || !currentUser}
                  className="px-4 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg transition flex items-center gap-1.5 shadow-xs"
                >
                  <Send size={13} />
                  <span>
                    {isSubmitting 
                      ? (isEn ? "Submitting..." : "Đang gửi...") 
                      : (isEn ? "Submit New Term" : "Gửi Đề Xuất Thuật Ngữ")}
                  </span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
