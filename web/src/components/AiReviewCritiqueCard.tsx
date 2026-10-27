"use client";

import React from "react";
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Edit3, 
  Send,
  HelpCircle
} from "lucide-react";
import { AiReviewEvaluation } from "@/lib/types";

interface AiReviewCritiqueCardProps {
  evaluation: AiReviewEvaluation;
  onEditAgain?: () => void;
  onForceSubmit?: () => void;
  isSubmitting?: boolean;
  mode?: "modal_feedback" | "dashboard_view";
}

export default function AiReviewCritiqueCard({
  evaluation,
  onEditAgain,
  onForceSubmit,
  isSubmitting = false,
  mode = "modal_feedback"
}: AiReviewCritiqueCardProps) {
  const isApproved = evaluation.verdict === "approve";
  const isNeedsRevision = evaluation.verdict === "needs_revision";
  const isRejected = evaluation.verdict === "reject";

  const scoreColor = isApproved
    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800"
    : isNeedsRevision
    ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800"
    : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800";

  return (
    <div className={`rounded-xl border p-4 sm:p-5 space-y-4 animate-in fade-in duration-200 ${
      isApproved 
        ? "bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900" 
        : isNeedsRevision 
        ? "bg-amber-50/40 dark:bg-amber-950/20 border-amber-300 dark:border-amber-900"
        : "bg-red-50/40 dark:bg-red-950/20 border-red-300 dark:border-red-900"
    }`}>
      {/* Header: Huy hiệu AI & Điểm số */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shrink-0">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Thẩm định Học thuật Q1 (Gemini AI)
              </span>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${scoreColor}`}>
                {isApproved 
                  ? "✓ Đạt chuẩn (Approve)" 
                  : isNeedsRevision 
                  ? "⚠️ Cần hoàn thiện thêm" 
                  : "✕ Chưa đạt chuẩn (Reject)"}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
              Model: {evaluation.model} • {new Date(evaluation.evaluated_at).toLocaleTimeString("vi-VN")}
            </p>
          </div>
        </div>

        {/* Điểm số tổng thể */}
        <div className="text-right shrink-0">
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {evaluation.academic_score}
            <span className="text-xs text-slate-400 font-normal">/100</span>
          </div>
          <span className="text-[10px] text-slate-500 block uppercase font-medium">Điểm học thuật</span>
        </div>
      </div>

      {/* Tóm tắt nhận xét của AI */}
      <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans bg-white/80 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-200/70 dark:border-slate-800">
        <strong className="text-slate-900 dark:text-white block mb-1">Đánh giá chung:</strong>
        {evaluation.summary}
      </div>

      {/* Chi tiết 5 tiêu chí học thuật */}
      {evaluation.criteria && (
        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block uppercase tracking-wider">
            Thang điểm tiêu chí:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px]">
            <div className="p-2 rounded bg-white/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-slate-500 block text-[10px]">Định nghĩa</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{evaluation.criteria.definition_rigor}</span>
            </div>
            <div className="p-2 rounded bg-white/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-slate-500 block text-[10px]">Ngưỡng số liệu</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{evaluation.criteria.empirical_benchmarks}</span>
            </div>
            <div className="p-2 rounded bg-white/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-slate-500 block text-[10px]">Cạm bẫy</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{evaluation.criteria.pitfalls_validity}</span>
            </div>
            <div className="p-2 rounded bg-white/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-slate-500 block text-[10px]">Nguồn & DOI</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{evaluation.criteria.citation_integrity}</span>
            </div>
            <div className="p-2 rounded bg-white/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-slate-500 block text-[10px]">Văn phong</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{evaluation.criteria.academic_tone}</span>
            </div>
          </div>
        </div>
      )}

      {/* Cảnh báo lỗi / Red Flags (nếu có) */}
      {evaluation.red_flags && evaluation.red_flags.length > 0 && (
        <div className="p-3 rounded-lg bg-red-100/60 dark:bg-red-950/40 border border-red-200 dark:border-red-900/80 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-red-700 dark:text-red-400">
            <AlertTriangle size={14} className="shrink-0" />
            <span>Điểm cần khắc phục trước khi thông qua:</span>
          </div>
          <ul className="list-disc list-inside text-red-800 dark:text-red-300 space-y-0.5 text-[11px] pl-1">
            {evaluation.red_flags.map((flag, idx) => (
              <li key={idx}>{flag}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Điểm mạnh (Key Strengths) */}
      {evaluation.key_strengths && evaluation.key_strengths.length > 0 && (
        <div className="p-3 rounded-lg bg-emerald-100/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 size={14} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>Điểm mạnh ghi nhận:</span>
          </div>
          <ul className="list-disc list-inside text-emerald-900 dark:text-emerald-200 space-y-0.5 text-[11px] pl-1">
            {evaluation.key_strengths.map((str, idx) => (
              <li key={idx}>{str}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Gợi ý hoàn thiện từ Ban biên tập AI */}
      {evaluation.suggested_editorial_notes && (
        <div className="text-[11px] text-slate-600 dark:text-slate-400 bg-white/60 dark:bg-slate-900/40 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
          <strong className="text-slate-800 dark:text-slate-200">Gợi ý chỉnh sửa: </strong>
          {evaluation.suggested_editorial_notes}
        </div>
      )}

      {/* Các nút hành động nếu là chế độ phản hồi nộp bài (modal_feedback) */}
      {mode === "modal_feedback" && !isApproved && (
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 border-t border-slate-200/70 dark:border-slate-800">
          {onEditAgain && (
            <button
              type="button"
              onClick={onEditAgain}
              className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Edit3 size={13} />
              <span>Chỉnh sửa lại theo góp ý của AI</span>
            </button>
          )}

          {onForceSubmit && (
            <button
              type="button"
              onClick={onForceSubmit}
              disabled={isSubmitting}
              className="px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium transition flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Send size={13} />
              <span>{isSubmitting ? "Đang gửi..." : "Vẫn muốn gửi cho Admin duyệt thủ công"}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
