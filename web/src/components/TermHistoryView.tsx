"use client";

import React, { useState, useEffect } from "react";
import { 
  Clock, 
  GitCommit, 
  User, 
  Building2, 
  BookOpen, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  GitPullRequest
} from "lucide-react";
import { TermHistoryEntry } from "@/lib/types";
import { fetchTermRevisionHistory } from "@/lib/firebase-service";
import VisualDiffViewer from "./VisualDiffViewer";

interface TermHistoryViewProps {
  termId: string;
  termName: string;
  initialCitation?: string;
  languageMode: "vi" | "en";
}

export default function TermHistoryView({
  termId,
  termName,
  initialCitation,
  languageMode
}: TermHistoryViewProps) {
  const [history, setHistory] = useState<TermHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedDiffId, setExpandedDiffId] = useState<string | null>(null);

  const isEn = languageMode === "en";

  const t = {
    title: isEn ? "Revision & Editorial History" : "Lịch sử Phiên bản & Hiệu đính",
    subtitle: isEn 
      ? "Peer-reviewed revision timeline and provenance records" 
      : "Nhật ký lưu trữ các lần chỉnh sửa học thuật và thẩm định cộng đồng",
    loading: isEn ? "Loading version timeline..." : "Đang tải lịch sử phiên bản...",
    empty: isEn ? "No community revisions recorded yet." : "Chưa có bản ghi hiệu đính cộng đồng nào.",
    author: isEn ? "Editor / Contributor" : "Người hiệu đính",
    institution: isEn ? "Affiliation" : "Đơn vị công tác",
    summary: isEn ? "Edit Summary" : "Lý do & Tóm tắt hiệu đính",
    sources: isEn ? "Supporting Evidence / DOI" : "Nguồn minh chứng / DOI",
    viewDiff: isEn ? "View Red/Green Visual Diff" : "Xem so sánh trực quan (Red/Green Diff)",
    hideDiff: isEn ? "Hide Visual Diff" : "Thu gọn so sánh",
    foundationTag: isEn ? "Foundation Release" : "Ấn bản Khởi tạo",
    communityTag: isEn ? "Peer-Reviewed Revision" : "Hiệu đính Cộng đồng đã duyệt",
    section: isEn ? "Section" : "Phần sửa đổi"
  };

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchTermRevisionHistory(termId, termName, initialCitation)
      .then((entries) => {
        if (isMounted) {
          setHistory(entries);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error loading term history:", err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [termId, termName, initialCitation]);

  const toggleDiff = (id: string) => {
    setExpandedDiffId((prev) => (prev === id ? null : id));
  };

  if (isLoading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
        <Clock className="animate-spin text-blue-500" size={24} />
        <span className="text-xs">{t.loading}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Tiêu đề & Giới thiệu */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <Clock size={18} />
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {t.title}
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {t.subtitle} &bull; <span className="font-mono">{termName}</span>
        </p>
      </div>

      {/* Dòng thời gian lịch sử (Timeline) */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {history.map((entry, index) => {
          const isInitial = entry.isInitialVersion;
          const isExpanded = expandedDiffId === entry.id;

          return (
            <div key={entry.id} className="relative group">
              {/* Điểm nút Timeline Icon */}
              <div 
                className={`absolute -left-6 sm:-left-8 top-1.5 w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 ${
                  isInitial 
                    ? "bg-blue-600 border-white dark:border-slate-900 text-white shadow-xs" 
                    : "bg-emerald-600 border-white dark:border-slate-900 text-white shadow-xs"
                }`}
              >
                {isInitial ? (
                  <ShieldCheck size={13} />
                ) : (
                  <GitPullRequest size={13} />
                )}
              </div>

              {/* Hộp nội dung phiên bản */}
              <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xs space-y-3 transition hover:border-slate-300 dark:hover:border-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      {entry.version}
                    </span>
                    <span 
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isInitial 
                          ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900" 
                          : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900"
                      }`}
                    >
                      {isInitial ? t.foundationTag : t.communityTag}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {new Date(entry.timestamp).toLocaleDateString(isEn ? "en-US" : "vi-VN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })}
                    </span>
                  </div>

                  {entry.diffData && (
                    <button
                      onClick={() => toggleDiff(entry.id)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 transition"
                    >
                      <span>{isExpanded ? t.hideDiff : t.viewDiff}</span>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  )}
                </div>

                {/* Thông tin tác giả & Đơn vị */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                    <User size={13} className="text-slate-400 shrink-0" />
                    <span className="font-medium">{entry.authorName}</span>
                  </div>
                  {entry.authorInstitution && (
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <Building2 size={13} className="text-slate-400 shrink-0" />
                      <span className="truncate">{entry.authorInstitution}</span>
                    </div>
                  )}
                </div>

                {/* Tóm tắt lý do chỉnh sửa */}
                <div className="text-xs space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    {t.summary}:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 font-serif leading-relaxed">
                    {entry.editSummary}
                  </p>
                </div>

                {/* Phần được sửa đổi & Nguồn trích dẫn minh chứng */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-slate-400">{t.section}:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {entry.sectionModified}
                    </span>
                  </div>
                  {entry.supportingSources && (
                    <div className="flex items-center gap-1 text-slate-500 font-mono max-w-full sm:max-w-md truncate">
                      <BookOpen size={12} className="text-slate-400 shrink-0" />
                      <span className="truncate">{entry.supportingSources}</span>
                    </div>
                  )}
                </div>

                {/* Trình hiển thị Red/Green Visual Diff mở rộng */}
                {entry.diffData && isExpanded && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                    <VisualDiffViewer
                      original={entry.diffData.original}
                      proposed={entry.diffData.proposed}
                      label={entry.diffData.sectionName}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
