"use client";

import React, { useState, useEffect } from "react";
import { 
  MessageSquare, 
  MessageSquarePlus, 
  ThumbsUp, 
  Reply, 
  Send, 
  ExternalLink, 
  BookOpen, 
  User, 
  Building2, 
  Filter, 
  ShieldCheck, 
  Sparkles,
  AlertCircle,
  Clock,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { DiscussionItem, DiscussionReply, DiscussionCategory } from "@/lib/types";
import { 
  fetchTermDiscussions, 
  createTermDiscussion, 
  addDiscussionReply, 
  toggleDiscussionUpvote 
} from "@/lib/firebase-service";
import type { User as FirebaseUser } from "firebase/auth";

interface TermDiscussionViewProps {
  termId: string;
  termName: string;
  currentUser: FirebaseUser | null;
  languageMode: "vi" | "en";
}

export default function TermDiscussionView({
  termId,
  termName,
  currentUser,
  languageMode
}: TermDiscussionViewProps) {
  const [discussions, setDiscussions] = useState<DiscussionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<"all" | DiscussionCategory>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<DiscussionCategory>("methodology_debate");
  const [content, setContent] = useState("");
  const [doiRef, setDoiRef] = useState("");
  const [authorName, setAuthorName] = useState(currentUser?.displayName || "");
  const [authorInstitution, setAuthorInstitution] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Active reply form ID
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [replyAuthorName, setReplyAuthorName] = useState(currentUser?.displayName || "");
  const [replyAuthorInstitution, setReplyAuthorInstitution] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const isEn = languageMode === "en";

  // Text Localization (Strict 0 Vietnamese characters in English mode)
  const t = {
    talkPageTitle: isEn ? "Academic Talk Page" : "Trang Thảo Luận Học Thuật",
    talkPageSubtitle: isEn 
      ? "Peer-to-peer scholarly deliberation, benchmark scrutiny, and literature dialogue" 
      : "Không gian tranh luận phương pháp luận, phản biện ngưỡng số liệu và sắc thái thuật ngữ",
    newThreadBtn: isEn ? "Start Discussion Thread" : "Đăng Chủ Đề Thảo Luận",
    filterAll: isEn ? "All Topics" : "Tất cả",
    catMethodology: isEn ? "Methodology Debate" : "Tranh luận Phương pháp luận",
    catBenchmark: isEn ? "Benchmark Dispute" : "Tranh luận Ngưỡng số liệu",
    catTranslation: isEn ? "Translation Nuance" : "Sắc thái Dịch thuật ngữ",
    catGeneral: isEn ? "General Inquiries" : "Thảo luận chung",
    noDiscussions: isEn 
      ? "No academic discussions initiated for this term yet. Be the first scholar to open a dialogue!" 
      : "Chưa có chủ đề thảo luận nào cho mục từ này. Hãy là học giả đầu tiên mở diễn đàn thảo luận!",
    threadTitleLabel: isEn ? "Topic Title / Question" : "Tiêu đề Chủ đề / Câu hỏi học thuật",
    threadTitlePlaceholder: isEn 
      ? "e.g., Cross-paradigm debate on sample size adequacy vs. statistical power..." 
      : "VD: Tranh luận về ngưỡng AVE > 0.50 trong bối cảnh nghiên cứu thực nghiệm tại VN...",
    categoryLabel: isEn ? "Category" : "Phân loại Chủ đề",
    contentLabel: isEn ? "Scholarly Argument / Critique" : "Nội dung Lập luận / Đóng góp ý kiến",
    contentPlaceholder: isEn 
      ? "Provide methodological rationale, empirical observations, or theoretical references..." 
      : "Trình bày luận điểm khoa học, dẫn chứng thực tế hoặc câu hỏi đối với hội đồng biên tập...",
    doiLabel: isEn ? "Supporting DOI or Academic Literature (Optional)" : "DOI hoặc Nguồn trích dẫn minh chứng (Tuỳ chọn)",
    doiPlaceholder: isEn ? "10.1016/j.jbusres... or citation" : "10.1016/j.jbusres... hoặc trích dẫn APA",
    authorNameLabel: isEn ? "Your Name / Scholarly Identity" : "Họ tên Nhà nghiên cứu",
    authorInstitutionLabel: isEn ? "University / Affiliation" : "Trường Đại học / Viện nghiên cứu",
    submitBtn: isEn ? "Publish Topic" : "Đăng Thảo Luận",
    cancelBtn: isEn ? "Cancel" : "Hủy",
    replyBtn: isEn ? "Reply" : "Trả lời",
    repliesTitle: isEn ? "Responses" : "Phản hồi",
    sendReplyBtn: isEn ? "Send Response" : "Gửi phản hồi",
    replyPlaceholder: isEn ? "Write your peer-review response or counter-argument..." : "Viết phản hồi học thuật hoặc bổ sung luận cứ...",
    upvoteTitle: isEn ? "Endorse / Insightful" : "Hữu ích / Đồng thuận",
    errorRequired: isEn ? "Please fill in title and discussion content." : "Vui lòng nhập tiêu đề và nội dung thảo luận.",
    errorViInEn: isEn ? "English Edition allows English text only. Please remove Vietnamese characters." : ""
  };

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchTermDiscussions(termId)
      .then((items) => {
        if (isMounted) {
          setDiscussions(items);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error loading discussions:", err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [termId]);

  // Bộ lọc danh mục
  const filteredDiscussions = discussions.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  const getCategoryBadge = (cat: DiscussionCategory) => {
    switch (cat) {
      case "methodology_debate":
        return {
          label: t.catMethodology,
          className: "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
        };
      case "benchmark_dispute":
        return {
          label: t.catBenchmark,
          className: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
        };
      case "translation_nuance":
        return {
          label: t.catTranslation,
          className: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
        };
      default:
        return {
          label: t.catGeneral,
          className: "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
        };
    }
  };

  // Xử lý tạo chủ đề thảo luận mới
  const handleCreateDiscussion = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim() || !content.trim()) {
      setFormError(t.errorRequired);
      return;
    }

    // Kiểm tra nguyên tắc 0 tiếng Việt khi ở English Edition
    if (isEn) {
      const viRegex = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
      if (viRegex.test(title) || viRegex.test(content)) {
        setFormError(t.errorViInEn);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const created = await createTermDiscussion({
        termId,
        termName,
        authorUid: currentUser?.uid,
        authorName: authorName.trim() || (isEn ? "Visiting Scholar" : "Nhà nghiên cứu"),
        authorEmail: currentUser?.email || undefined,
        authorInstitution: authorInstitution.trim() || undefined,
        category,
        title: title.trim(),
        content: content.trim(),
        doiRef: doiRef.trim() || undefined
      });

      setDiscussions((prev) => [created, ...prev]);
      setTitle("");
      setContent("");
      setDoiRef("");
      setIsFormOpen(false);
    } catch (err: any) {
      console.error(err);
      setFormError(err.message || "Failed to create discussion");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Xử lý gửi phản hồi
  const handleSendReply = async (discussionId: string) => {
    if (!replyContent.trim()) return;

    if (isEn) {
      const viRegex = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
      if (viRegex.test(replyContent)) {
        alert(t.errorViInEn);
        return;
      }
    }

    setIsSubmittingReply(true);
    try {
      const reply = await addDiscussionReply(discussionId, {
        authorUid: currentUser?.uid,
        authorName: replyAuthorName.trim() || (isEn ? "Scholar" : "Học giả"),
        authorInstitution: replyAuthorInstitution.trim() || undefined,
        content: replyContent.trim()
      });

      setDiscussions((prev) =>
        prev.map((d) => {
          if (d.id === discussionId) {
            return {
              ...d,
              replies: [...(d.replies || []), reply]
            };
          }
          return d;
        })
      );

      setReplyContent("");
      setReplyingToId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  // Xử lý Upvote
  const handleUpvote = async (discussionId: string) => {
    const userIdentifier = currentUser?.uid || "guest_device";
    const result = await toggleDiscussionUpvote(discussionId, userIdentifier);

    setDiscussions((prev) =>
      prev.map((d) => {
        if (d.id === discussionId) {
          const upvotedBy = d.upvotedBy || [];
          const hasVoted = upvotedBy.includes(userIdentifier);
          const newUpvotedBy = hasVoted
            ? upvotedBy.filter((u) => u !== userIdentifier)
            : [...upvotedBy, userIdentifier];

          return {
            ...d,
            upvotes: result.upvotes,
            upvotedBy: newUpvotedBy
          };
        }
        return d;
      })
    );
  };

  const getDoiUrl = (doi: string) => {
    if (doi.startsWith("http")) return doi;
    if (doi.startsWith("10.")) return `https://doi.org/${doi}`;
    return null;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header Talk Page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <MessageSquare size={18} />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {t.talkPageTitle}
            </h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              {discussions.length}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t.talkPageSubtitle} &bull; <span className="font-mono">{termName}</span>
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-xs shrink-0"
        >
          <MessageSquarePlus size={14} />
          <span>{t.newThreadBtn}</span>
        </button>
      </div>

      {/* 2. Form Mở Chủ Đề Thảo Luận Mới */}
      {isFormOpen && (
        <form
          onSubmit={handleCreateDiscussion}
          className="p-4 sm:p-5 rounded-2xl border-2 border-blue-200 dark:border-blue-900 bg-blue-50/30 dark:bg-blue-950/20 space-y-4 shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-blue-100 dark:border-blue-900/60 pb-2.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sparkles size={14} className="text-blue-600" />
              <span>{t.newThreadBtn}</span>
            </h4>
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              {t.cancelBtn}
            </button>
          </div>

          {formError && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                {t.threadTitleLabel} *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.threadTitlePlaceholder}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                {t.categoryLabel}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as DiscussionCategory)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="methodology_debate">{t.catMethodology}</option>
                <option value="benchmark_dispute">{t.catBenchmark}</option>
                <option value="translation_nuance">{t.catTranslation}</option>
                <option value="general">{t.catGeneral}</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              {t.contentLabel} *
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t.contentPlaceholder}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-serif leading-relaxed"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                {t.doiLabel}
              </label>
              <input
                type="text"
                value={doiRef}
                onChange={(e) => setDoiRef(e.target.value)}
                placeholder={t.doiPlaceholder}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                {t.authorNameLabel}
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder={isEn ? "Dr. John Doe" : "TS. Nguyễn Văn A"}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                {t.authorInstitutionLabel}
              </label>
              <input
                type="text"
                value={authorInstitution}
                onChange={(e) => setAuthorInstitution(e.target.value)}
                placeholder={isEn ? "University of Economics..." : "ĐH Kinh tế..."}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              {t.cancelBtn}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs disabled:opacity-50 flex items-center gap-1"
            >
              <Send size={12} />
              <span>{isSubmitting ? "..." : t.submitBtn}</span>
            </button>
          </div>
        </form>
      )}

      {/* 3. Thanh Lọc Theo Phân Loại Chủ Đề */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-2.5 py-1 rounded-lg font-medium transition shrink-0 ${
            selectedCategory === "all"
              ? "bg-blue-600 text-white font-bold"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
          }`}
        >
          {t.filterAll}
        </button>
        <button
          onClick={() => setSelectedCategory("methodology_debate")}
          className={`px-2.5 py-1 rounded-lg font-medium transition shrink-0 ${
            selectedCategory === "methodology_debate"
              ? "bg-purple-600 text-white font-bold"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
          }`}
        >
          {t.catMethodology}
        </button>
        <button
          onClick={() => setSelectedCategory("benchmark_dispute")}
          className={`px-2.5 py-1 rounded-lg font-medium transition shrink-0 ${
            selectedCategory === "benchmark_dispute"
              ? "bg-amber-600 text-white font-bold"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
          }`}
        >
          {t.catBenchmark}
        </button>
        <button
          onClick={() => setSelectedCategory("translation_nuance")}
          className={`px-2.5 py-1 rounded-lg font-medium transition shrink-0 ${
            selectedCategory === "translation_nuance"
              ? "bg-emerald-600 text-white font-bold"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
          }`}
        >
          {t.catTranslation}
        </button>
        <button
          onClick={() => setSelectedCategory("general")}
          className={`px-2.5 py-1 rounded-lg font-medium transition shrink-0 ${
            selectedCategory === "general"
              ? "bg-blue-600 text-white font-bold"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
          }`}
        >
          {t.catGeneral}
        </button>
      </div>

      {/* 4. Danh sách các Luồng Thảo Luận */}
      {isLoading ? (
        <div className="py-12 flex flex-col items-center justify-center gap-2 text-slate-400">
          <Clock className="animate-spin text-blue-500" size={20} />
          <span className="text-xs">{isEn ? "Loading discussions..." : "Đang tải thảo luận..."}</span>
        </div>
      ) : filteredDiscussions.length === 0 ? (
        <div className="p-8 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-2">
          <MessageSquare className="mx-auto text-slate-300 dark:text-slate-600" size={32} />
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {t.noDiscussions}
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            {t.newThreadBtn} &rarr;
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDiscussions.map((item) => {
            const badge = getCategoryBadge(item.category);
            const userIdentifier = currentUser?.uid || "guest_device";
            const isUpvoted = (item.upvotedBy || []).includes(userIdentifier);
            const isReplying = replyingToId === item.id;
            const doiUrl = item.doiRef ? getDoiUrl(item.doiRef) : null;

            return (
              <article
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xs space-y-3.5 transition hover:border-slate-300 dark:hover:border-slate-700"
              >
                {/* Header chủ đề: Badge + Tiêu đề + Thời gian */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.className}`}>
                      {badge.label}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white font-serif">
                      {item.title}
                    </h4>
                  </div>

                  <span className="text-[11px] text-slate-400 font-mono">
                    {new Date(item.createdAt).toLocaleDateString(isEn ? "en-US" : "vi-VN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </span>
                </div>

                {/* Tác giả & Đơn vị */}
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {item.authorName}
                  </span>
                  {item.authorInstitution && (
                    <>
                      <span>&bull;</span>
                      <span className="italic truncate">{item.authorInstitution}</span>
                    </>
                  )}
                </div>

                {/* Nội dung thảo luận */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-serif leading-relaxed whitespace-pre-line">
                  {item.content}
                </p>

                {/* DOI / Trích dẫn minh chứng */}
                {item.doiRef && (
                  <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-mono pt-1">
                    <BookOpen size={13} className="shrink-0" />
                    {doiUrl ? (
                      <a
                        href={doiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        <span>{item.doiRef}</span>
                        <ExternalLink size={11} />
                      </a>
                    ) : (
                      <span>{item.doiRef}</span>
                    )}
                  </div>
                )}

                {/* Footer tương tác: Upvote & Nút Trả lời */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleUpvote(item.id)}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition flex items-center gap-1.5 ${
                        isUpvoted
                          ? "bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400"
                          : "border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                      title={t.upvoteTitle}
                    >
                      <ThumbsUp size={13} className={isUpvoted ? "fill-blue-500 text-blue-600" : ""} />
                      <span>{item.upvotes || 0}</span>
                      <span className="hidden sm:inline">{t.upvoteTitle}</span>
                    </button>

                    <button
                      onClick={() => {
                        setReplyingToId(isReplying ? null : item.id);
                        setReplyContent("");
                      }}
                      className="px-2.5 py-1 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1 text-xs font-medium"
                    >
                      <Reply size={13} />
                      <span>{t.replyBtn}</span>
                      {item.replies && item.replies.length > 0 && (
                        <span className="font-mono text-[11px] px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800">
                          {item.replies.length}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* 5. Phản hồi Dạng Luồng (Threaded Replies) */}
                {item.replies && item.replies.length > 0 && (
                  <div className="pl-3 sm:pl-4 border-l-2 border-slate-200 dark:border-slate-800 space-y-2.5 pt-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      {t.repliesTitle} ({item.replies.length}):
                    </span>
                    {item.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {reply.authorName}
                            {reply.authorInstitution && ` • ${reply.authorInstitution}`}
                          </span>
                          <span className="font-mono">
                            {new Date(reply.createdAt).toLocaleDateString(isEn ? "en-US" : "vi-VN", {
                              month: "short",
                              day: "numeric"
                            })}
                          </span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 font-serif leading-relaxed">
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Form Nhập Phản Hồi Mở Rộng */}
                {isReplying && (
                  <div className="pt-2 pl-3 sm:pl-4 border-l-2 border-blue-500 space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={replyAuthorName}
                        onChange={(e) => setReplyAuthorName(e.target.value)}
                        placeholder={t.authorNameLabel}
                        className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                      />
                      <input
                        type="text"
                        value={replyAuthorInstitution}
                        onChange={(e) => setReplyAuthorInstitution(e.target.value)}
                        placeholder={t.authorInstitutionLabel}
                        className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                      />
                    </div>
                    <div className="flex gap-2">
                      <textarea
                        rows={2}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder={t.replyPlaceholder}
                        className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-serif focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleSendReply(item.id)}
                        disabled={isSubmittingReply || !replyContent.trim()}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shadow-xs disabled:opacity-50 flex items-center justify-center self-end"
                      >
                        <Send size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
