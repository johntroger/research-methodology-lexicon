"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Award, 
  ShieldCheck, 
  BookOpen, 
  User, 
  ExternalLink, 
  RefreshCw, 
  Globe, 
  Search,
  MessageSquare,
  Sparkles,
  GitPullRequest,
  PlusCircle,
  Eye,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { 
  fetchUserSubmissions, 
  subscribeToAuth,
  TermRevisionItem,
  NewTermProposalItem
} from "@/lib/firebase-service";
import type { User as FirebaseUser } from "firebase/auth";
import VisualDiffViewer from "@/components/VisualDiffViewer";
import ScholarlyCertificateModal from "@/components/ScholarlyCertificateModal";

export default function MyContributionsPage() {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [revisions, setRevisions] = useState<TermRevisionItem[]>([]);
  const [proposals, setProposals] = useState<NewTermProposalItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"revisions" | "proposals">("revisions");
  const [languageMode, setLanguageMode] = useState<"vi" | "en">("vi");
  const [expandedDiffId, setExpandedDiffId] = useState<string | null>(null);

  // Certificate Modal state
  const [selectedCert, setSelectedCert] = useState<{
    scholarName: string;
    institution?: string;
    termName: string;
    version?: string;
    approvedDate?: string;
    certificateId: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("rv_lexicon_mode");
      if (savedLang === "en" || savedLang === "vi") {
        setLanguageMode(savedLang);
      }
    }

    const unsub = subscribeToAuth((u) => {
      setCurrentUser(u);
      loadSubmissions(u?.uid, u?.email || undefined);
    });

    return () => unsub();
  }, []);

  const loadSubmissions = async (uid?: string, email?: string) => {
    setIsLoading(true);
    try {
      const data = await fetchUserSubmissions(uid, email);
      setRevisions(data.revisions);
      setProposals(data.proposals);
    } catch (err) {
      console.error("Error loading user submissions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const isEn = languageMode === "en";

  const t = {
    backBtn: isEn ? "Back to Lexicon" : "Quay lại Từ điển",
    title: isEn ? "My Submissions & Peer-Review Dossier" : "Hồ Sơ Đóng Góp & Theo Dõi Đề Xuất",
    subtitle: isEn
      ? "Real-time tracking of your proposed revisions, editorial reviews, and certified academic credentials"
      : "Theo dõi tiến độ thẩm định các đề xuất hiệu đính, đọc phản hồi từ Hội đồng và nhận Chứng nhận Học thuật",
    statTotal: isEn ? "Total Submissions" : "Tổng số đề xuất",
    statApproved: isEn ? "Approved & Merged" : "Đã duyệt & Sáp nhập",
    statPending: isEn ? "Under Peer Review" : "Đang chờ thẩm định",
    statRejected: isEn ? "Revisions Requested" : "Cần hoàn thiện",
    tabRevisions: isEn ? "Term Revisions" : "Chỉnh sửa mục từ",
    tabProposals: isEn ? "New Term Proposals" : "Đề xuất mục từ mới",
    emptyRevisions: isEn 
      ? "You haven't submitted any term revisions yet. Propose an edit on any methodology term!" 
      : "Bạn chưa gửi đề xuất chỉnh sửa mục từ nào. Hãy bấm [Sửa mục từ] trên bất kỳ thuật ngữ nào!",
    emptyProposals: isEn 
      ? "You haven't proposed any new methodology terms yet." 
      : "Bạn chưa gửi đề xuất thuật ngữ mới nào.",
    statusApproved: isEn ? "Approved" : "Đã phê duyệt",
    statusPending: isEn ? "Pending Review" : "Chờ thẩm định",
    statusRejected: isEn ? "Needs Revision" : "Cần hoàn thiện",
    viewDiff: isEn ? "View Visual Diff" : "Xem so sánh vết sửa (Diff)",
    hideDiff: isEn ? "Hide Diff" : "Thu gọn Diff",
    getCertBtn: isEn ? "Scholarly Certificate" : "Chứng Nhận Học Thuật",
    reviewerNoteLabel: isEn ? "Editorial Feedback / Note" : "Ý kiến Thẩm định của Hội đồng",
    editSummaryLabel: isEn ? "Edit Summary" : "Lý do & Tóm tắt sửa đổi",
    sourcesLabel: isEn ? "Supporting Literature / DOI" : "Nguồn minh chứng / DOI",
    guestNotice: isEn
      ? "Showing submissions from your local browser session. Sign in with Google to sync across all devices."
      : "Đang hiển thị đề xuất từ trình duyệt của bạn. Đăng nhập Google để đồng bộ trên mọi thiết bị."
  };

  const allItems = [...revisions, ...proposals];
  const approvedCount = allItems.filter(i => i.status === "approved").length;
  const pendingCount = allItems.filter(i => (i.status || "pending") === "pending").length;
  const rejectedCount = allItems.filter(i => i.status === "rejected").length;

  const handleOpenCertificate = (item: TermRevisionItem | NewTermProposalItem, isProposal: boolean) => {
    const termTitle = isProposal ? (item as NewTermProposalItem).term : (item as TermRevisionItem).termName;
    const author = item.authorName || currentUser?.displayName || (isEn ? "Scholar" : "Học giả");
    const inst = item.authorInstitution || (isEn ? "Research Institution" : "Viện nghiên cứu");

    setSelectedCert({
      scholarName: author,
      institution: inst,
      termName: termTitle,
      version: isProposal ? "v1.0" : "v1.1",
      approvedDate: item.createdAt || new Date().toISOString(),
      certificateId: `LEX-CERT-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    });
  };

  const toggleDiff = (id: string) => {
    setExpandedDiffId(prev => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* 1. Header Điều Hướng */}
      <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">{t.backBtn}</span>
          </Link>
          <div className="h-4 w-px bg-slate-200 dark:border-slate-800 hidden sm:block" />
          <h1 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
            <FileText size={18} className="text-blue-600 dark:text-blue-400" />
            <span>{t.title}</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => loadSubmissions(currentUser?.uid, currentUser?.email || undefined)}
            disabled={isLoading}
            className="p-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition flex items-center gap-1"
          >
            <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
            <span className="hidden sm:inline">{isEn ? "Refresh" : "Làm mới"}</span>
          </button>
        </div>
      </header>

      {/* 2. Khung Nội Dung */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 md:p-8 space-y-6">
        {/* Banner Giới thiệu */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
              {t.title}
            </h2>
            {currentUser && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium">
                {currentUser.displayName || currentUser.email}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-serif leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {!currentUser && (
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
            <Sparkles size={14} className="shrink-0" />
            <span>{t.guestNotice}</span>
          </div>
        )}

        {/* Thẻ Thống Kê Nhanh */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <span className="text-slate-500 block">{t.statTotal}</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5 block">
              {allItems.length}
            </span>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-xs">
            <span className="text-slate-500 block">{t.statApproved}</span>
            <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 block">
              {approvedCount}
            </span>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 shadow-xs">
            <span className="text-slate-500 block">{t.statPending}</span>
            <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono mt-0.5 block">
              {pendingCount}
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <span className="text-slate-500 block">{t.statRejected}</span>
            <span className="text-2xl font-extrabold text-slate-500 font-mono mt-0.5 block">
              {rejectedCount}
            </span>
          </div>
        </div>

        {/* 3. Tabs: Chỉnh sửa mục từ vs Đề xuất từ mới */}
        <div className="border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("revisions")}
            className={`pb-2.5 transition flex items-center gap-1.5 border-b-2 ${
              activeTab === "revisions"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 font-bold"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <GitPullRequest size={14} />
            <span>{t.tabRevisions}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-mono">
              {revisions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("proposals")}
            className={`pb-2.5 transition flex items-center gap-1.5 border-b-2 ${
              activeTab === "proposals"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 font-bold"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <PlusCircle size={14} />
            <span>{t.tabProposals}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-mono">
              {proposals.length}
            </span>
          </button>
        </div>

        {/* 4. Danh Sách Đề Xuất */}
        {isLoading ? (
          <div className="py-16 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2">
            <Clock className="animate-spin text-blue-500" size={20} />
            <span>{isEn ? "Loading your submissions..." : "Đang tải danh sách đề xuất..."}</span>
          </div>
        ) : activeTab === "revisions" ? (
          revisions.length === 0 ? (
            <div className="p-10 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-2">
              <GitPullRequest className="mx-auto text-slate-300 dark:text-slate-600" size={32} />
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                {t.emptyRevisions}
              </p>
              <Link href="/" className="text-xs font-semibold text-blue-600 hover:underline block pt-1">
                {t.backBtn} &rarr;
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {revisions.map((rev) => {
                const isApproved = rev.status === "approved";
                const isRejected = rev.status === "rejected";
                const isPending = !isApproved && !isRejected;
                const isExpanded = expandedDiffId === rev.id;

                let orig = "";
                let prop = "";
                if (rev.section === "definition") {
                  orig = rev.originalContent?.coreDefinition || "";
                  prop = rev.proposedContent?.coreDefinition || "";
                } else if (rev.section === "benchmarks") {
                  orig = rev.originalContent?.benchmarks || "";
                  prop = rev.proposedContent?.benchmarks || "";
                } else if (rev.section === "pitfalls") {
                  orig = rev.originalContent?.pitfalls || "";
                  prop = rev.proposedContent?.pitfalls || "";
                } else {
                  orig = JSON.stringify(rev.originalContent, null, 2);
                  prop = JSON.stringify(rev.proposedContent, null, 2);
                }

                return (
                  <article
                    key={rev.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-slate-900 dark:text-white font-serif">
                            {rev.termName}
                          </h3>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            #{rev.section}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {new Date(rev.createdAt || "").toLocaleDateString(isEn ? "en-US" : "vi-VN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })}
                        </span>
                      </div>

                      {/* Trạng thái duyệt & Nút Chứng nhận */}
                      <div className="flex items-center gap-2">
                        {isApproved && (
                          <>
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                              <CheckCircle2 size={12} />
                              <span>{t.statusApproved}</span>
                            </span>
                            <button
                              onClick={() => handleOpenCertificate(rev, false)}
                              className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-xs transition flex items-center gap-1"
                            >
                              <Award size={13} />
                              <span>{t.getCertBtn}</span>
                            </button>
                          </>
                        )}
                        {isPending && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                            <Clock size={12} />
                            <span>{t.statusPending}</span>
                          </span>
                        )}
                        {isRejected && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 flex items-center gap-1">
                            <XCircle size={12} />
                            <span>{t.statusRejected}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Lý do & Nguồn minh chứng */}
                    <div className="text-xs space-y-1">
                      <strong className="text-slate-500 block">{t.editSummaryLabel}:</strong>
                      <p className="text-slate-800 dark:text-slate-200 font-serif leading-relaxed">
                        {rev.editSummary}
                      </p>
                      {rev.supportingSources && (
                        <div className="text-[11px] font-mono text-slate-500 pt-0.5">
                          {t.sourcesLabel}: {rev.supportingSources}
                        </div>
                      )}
                    </div>

                    {/* Nhận xét phản hồi từ ThS. Trần Thanh Tùng */}
                    {(rev as any).reviewerNote && (
                      <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs space-y-1">
                        <strong className="text-blue-900 dark:text-blue-300 flex items-center gap-1 font-sans">
                          <MessageSquare size={13} />
                          <span>{t.reviewerNoteLabel}:</span>
                        </strong>
                        <p className="text-slate-700 dark:text-slate-300 font-serif leading-relaxed">
                          {(rev as any).reviewerNote}
                        </p>
                      </div>
                    )}

                    {/* Nút xem Visual Diff */}
                    <div className="pt-1 flex items-center justify-between text-xs">
                      <button
                        onClick={() => toggleDiff(rev.id)}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
                      >
                        <span>{isExpanded ? t.hideDiff : t.viewDiff}</span>
                        {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                        <VisualDiffViewer
                          original={orig}
                          proposed={prop}
                          label={rev.section}
                        />
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )
        ) : (
          proposals.length === 0 ? (
            <div className="p-10 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-2">
              <PlusCircle className="mx-auto text-slate-300 dark:text-slate-600" size={32} />
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                {t.emptyProposals}
              </p>
              <Link href="/" className="text-xs font-semibold text-blue-600 hover:underline block pt-1">
                {t.backBtn} &rarr;
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {proposals.map((prop) => {
                const isApproved = prop.status === "approved";
                const isRejected = prop.status === "rejected";
                const isPending = !isApproved && !isRejected;

                return (
                  <article
                    key={prop.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white font-serif">
                          {prop.term}
                        </h3>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {prop.vietnamese}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isApproved && (
                          <>
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                              <CheckCircle2 size={12} />
                              <span>{t.statusApproved}</span>
                            </span>
                            <button
                              onClick={() => handleOpenCertificate(prop, true)}
                              className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-xs transition flex items-center gap-1"
                            >
                              <Award size={13} />
                              <span>{t.getCertBtn}</span>
                            </button>
                          </>
                        )}
                        {isPending && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                            <Clock size={12} />
                            <span>{t.statusPending}</span>
                          </span>
                        )}
                        {isRejected && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 flex items-center gap-1">
                            <XCircle size={12} />
                            <span>{t.statusRejected}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-xs space-y-2">
                      <p className="text-slate-800 dark:text-slate-200 font-serif leading-relaxed">
                        {prop.coreDefinition}
                      </p>
                      <div className="text-[11px] font-mono text-slate-500">
                        {t.sourcesLabel}: {prop.supportingSources}
                      </div>
                    </div>

                    {/* Phản hồi từ ThS. Trần Thanh Tùng */}
                    {(prop as any).reviewerNote && (
                      <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs space-y-1">
                        <strong className="text-blue-900 dark:text-blue-300 flex items-center gap-1 font-sans">
                          <MessageSquare size={13} />
                          <span>{t.reviewerNoteLabel}:</span>
                        </strong>
                        <p className="text-slate-700 dark:text-slate-300 font-serif leading-relaxed">
                          {(prop as any).reviewerNote}
                        </p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )
        )}
      </main>

      {/* Modal Chứng Nhận Học Thuật */}
      {selectedCert && (
        <ScholarlyCertificateModal
          isOpen={Boolean(selectedCert)}
          onClose={() => setSelectedCert(null)}
          scholarName={selectedCert.scholarName}
          institution={selectedCert.institution}
          termName={selectedCert.termName}
          version={selectedCert.version}
          approvedDate={selectedCert.approvedDate}
          certificateId={selectedCert.certificateId}
          languageMode={languageMode}
        />
      )}
    </div>
  );
}
