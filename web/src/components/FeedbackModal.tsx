"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, MessageSquarePlus } from "lucide-react";
import { submitUserFeedback, FeedbackInput } from "../lib/firebase-service";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTerm?: { id: string; term: string };
  userEmail?: string;
}

export function FeedbackModal({ isOpen, onClose, currentTerm, userEmail }: FeedbackModalProps) {
  const [feedbackType, setFeedbackType] = useState<FeedbackInput["type"]>("correction");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(userEmail || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      await submitUserFeedback({
        termId: currentTerm?.id,
        termName: currentTerm?.term,
        type: feedbackType,
        message: message.trim(),
        userEmail: email.trim() || undefined
      });
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setMessage("");
        onClose();
      }, 1800);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-900/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-100">
                Góp ý & Báo lỗi Học thuật
              </h3>
              <p className="text-xs text-stone-400">
                {currentTerm ? `Đang đóng góp cho: "${currentTerm.term}"` : "Cùng chung tay hoàn thiện từ điển nghiên cứu"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-medium text-stone-100 mb-1">Cảm ơn đóng góp của bạn!</h4>
            <p className="text-sm text-stone-400 max-w-sm">
              Ý kiến của bạn đã được ghi nhận. Ban biên tập sẽ rà soát và cập nhật trong các phiên bản dữ liệu tiếp theo.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Type selector */}
            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1.5 uppercase tracking-wider">
                Loại góp ý
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "correction", label: "Sửa định nghĩa" },
                  { id: "missing_term", label: "Thiếu thuật ngữ" },
                  { id: "suggestion", label: "Góp ý khác" }
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFeedbackType(type.id as FeedbackInput["type"])}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all text-center ${
                      feedbackType === type.id
                        ? "bg-stone-800 border-emerald-500 text-emerald-400"
                        : "bg-stone-950/50 border-stone-800 text-stone-400 hover:border-stone-700"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message area */}
            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1.5 uppercase tracking-wider">
                Nội dung chi tiết
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                placeholder="Mô tả lỗi thuật ngữ, nguồn tài liệu kinh điển cần bổ sung, hoặc đề xuất bản dịch chuẩn xác hơn..."
                className="w-full px-3.5 py-2.5 text-sm bg-stone-950 border border-stone-800 rounded-xl text-stone-200 placeholder-stone-600 focus:outline-hidden focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Email (optional) */}
            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1.5 uppercase tracking-wider">
                Email của bạn (không bắt buộc)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="researcher@university.edu.vn"
                className="w-full px-3.5 py-2 text-sm bg-stone-950 border border-stone-800 rounded-xl text-stone-200 placeholder-stone-600 focus:outline-hidden focus:border-emerald-500 transition-colors"
              />
              <p className="text-[11px] text-stone-500 mt-1">
                Để ban biên tập có thể gửi lời cảm ơn và thông báo khi thuật ngữ được phê duyệt.
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-800/80">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !message.trim()}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-medium text-stone-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                {isSubmitting ? "Đang gửi..." : "Gửi góp ý"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
