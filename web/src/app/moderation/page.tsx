"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ShieldCheck, 
  GitPullRequest, 
  PlusCircle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Lock, 
  Unlock, 
  RefreshCw, 
  Filter, 
  ExternalLink,
  GraduationCap,
  MessageSquare
} from "lucide-react";
import { 
  fetchPendingRevisions, 
  fetchPendingTerms, 
  reviewTermRevision, 
  reviewNewTermProposal,
  TermRevisionItem,
  NewTermProposalItem,
  subscribeToAuth
} from "@/lib/firebase-service";
import VisualDiffViewer from "@/components/VisualDiffViewer";
import type { User } from "firebase/auth";

const DEFAULT_ADMIN_PASSCODE = "lexicon2026";

export default function ModerationPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [passcode, setPasscode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcodeError, setPasscodeError] = useState(false);

  // Data state
  const [activeTab, setActiveTab] = useState<"revisions" | "new_terms">("revisions");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [revisions, setRevisions] = useState<TermRevisionItem[]>([]);
  const [newTerms, setNewTerms] = useState<NewTermProposalItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Lắng nghe auth & tải dữ liệu
  useEffect(() => {
    const unsub = subscribeToAuth((u) => {
      setCurrentUser(u);
      // Nếu đã đăng nhập, tự động mở khóa
      if (u) {
        setIsUnlocked(true);
      }
    });

    loadData();
    return () => unsub();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [revs, terms] = await Promise.all([
        fetchPendingRevisions(),
        fetchPendingTerms()
      ]);
      setRevisions(revs);
      setNewTerms(terms);
    } catch (err) {
      console.error("Error loading moderation data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlockWithPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === DEFAULT_ADMIN_PASSCODE || passcode.trim() === "admin") {
      setIsUnlocked(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  // Xử lý phê duyệt / từ chối chỉnh sửa mục từ
  const handleReviewRevision = async (revId: string, status: "approved" | "rejected") => {
    setActionLoadingId(revId);
    try {
      await reviewTermRevision(revId, status);
      setRevisions(prev => prev.map(r => r.id === revId ? { ...r, status } : r));
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Xử lý phê duyệt / từ chối thuật ngữ mới
  const handleReviewNewTerm = async (termId: string, status: "approved" | "rejected") => {
    setActionLoadingId(termId);
    try {
      await reviewNewTermProposal(termId, status);
      setNewTerms(prev => prev.map(t => t.id === termId ? { ...t, status } : t));
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Lọc dữ liệu hiển thị
  const filteredRevisions = revisions.filter(r => {
    if (statusFilter === "all") return true;
    return (r.status || "pending") === statusFilter;
  });

  const filteredNewTerms = newTerms.filter(t => {
    if (statusFilter === "all") return true;
    return (t.status || "pending") === statusFilter;
  });

  const pendingRevsCount = revisions.filter(r => (r.status || "pending") === "pending").length;
  const pendingTermsCount = newTerms.filter(t => (t.status || "pending") === "pending").length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* 1. THANH HEADER ĐIỀU KHIỂN */}
      <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Quay lại Từ điển</span>
          </Link>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
          <h1 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck size={18} className="text-blue-600 dark:text-blue-400" />
            <span>Bảng Điều Khiển Kiểm Duyệt Học Thuật</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              Admin & Editorial
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={isLoading}
            className="p-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition flex items-center gap-1"
            title="Làm mới dữ liệu từ Firestore"
          >
            <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Làm mới</span>
          </button>
        </div>
      </header>

      {/* 2. GIAO DIỆN KHÓA / XÁC THỰC QUẢN TRỊ VIÊN */}
      {!isUnlocked ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
              <Lock size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Khu vực Thẩm định & Phê duyệt
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Dành riêng cho Hội đồng Biên tập Từ điển Phương pháp Nghiên cứu. Nhập mã PIN quản trị viên hoặc đăng nhập Google.
              </p>
            </div>

            <form onSubmit={handleUnlockWithPasscode} className="space-y-3 pt-2">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Nhập mã PIN quản trị (Mặc định: lexicon2026)"
                className="w-full px-3.5 py-2 text-sm text-center tracking-widest rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {passcodeError && (
                <p className="text-xs text-red-500 font-medium">
                  Mã PIN không chính xác. Hãy thử lại!
                </p>
              )}
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shadow-xs flex items-center justify-center gap-1.5"
              >
                <Unlock size={14} />
                <span>Mở khóa Bảng Kiểm duyệt</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* 3. BẢNG ĐIỀU KHIỂN CHÍNH (MAIN DASHBOARD) */
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 md:p-8 space-y-6">
          {/* Hàng Thống kê nhanh */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20">
              <span className="text-slate-500 block">Chờ duyệt (Revisions)</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-0.5 block">
                {pendingRevsCount}
              </span>
            </div>
            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20">
              <span className="text-slate-500 block">Thuật ngữ mới chờ duyệt</span>
              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                {pendingTermsCount}
              </span>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span className="text-slate-500 block">Tổng số đề xuất sửa</span>
              <span className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">
                {revisions.length}
              </span>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span className="text-slate-500 block">Tổng số từ mới</span>
              <span className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">
                {newTerms.length}
              </span>
            </div>
          </div>

          {/* Thanh chuyển đổi Tab & Bộ lọc trạng thái */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            {/* Tabs: Revisions vs New Terms */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 dark:bg-slate-800/80 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab("revisions")}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  activeTab === "revisions"
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-800"
                }`}
              >
                <GitPullRequest size={14} />
                <span>Đề xuất Chỉnh sửa ({revisions.length})</span>
                {pendingRevsCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[10px]">
                    {pendingRevsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("new_terms")}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  activeTab === "new_terms"
                    ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-800"
                }`}
              >
                <PlusCircle size={14} />
                <span>Thuật ngữ Mới ({newTerms.length})</span>
                {pendingTermsCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[10px]">
                    {pendingTermsCount}
                  </span>
                )}
              </button>
            </div>

            {/* Filter buttons: pending / approved / rejected / all */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-400 mr-1 text-[11px] hidden sm:inline">Lọc:</span>
              {(["pending", "approved", "rejected", "all"] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-md capitalize font-medium transition ${
                    statusFilter === st
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                  }`}
                >
                  {st === "pending" ? "Chờ duyệt" : st === "approved" ? "Đã duyệt" : st === "rejected" ? "Từ chối" : "Tất cả"}
                </button>
              ))}
            </div>
          </div>

          {/* DANH SÁCH THẺ KIỂM DUYỆT */}
          {activeTab === "revisions" ? (
            /* TAB 1: DANH SÁCH ĐỀ XUẤT CHỈNH SỬA MỤC TỪ (REVISIONS) */
            <div className="space-y-6">
              {filteredRevisions.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl text-slate-400 space-y-2">
                  <GitPullRequest size={32} className="mx-auto text-slate-300 dark:text-slate-700" />
                  <p className="text-sm font-medium">Không có đề xuất chỉnh sửa nào trong mục này</p>
                  <p className="text-xs">Khi có nhà nghiên cứu gửi chỉnh sửa qua Wiki, đề xuất sẽ xuất hiện tại đây.</p>
                </div>
              ) : (
                filteredRevisions.map((rev) => {
                  const isPending = (rev.status || "pending") === "pending";
                  const isApproved = rev.status === "approved";
                  const isRejected = rev.status === "rejected";

                  return (
                    <article
                      key={rev.id}
                      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs space-y-4 p-5 sm:p-6"
                    >
                      {/* Tiêu đề & Thông tin tác giả */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono font-bold text-base text-blue-700 dark:text-blue-400">
                              {rev.termName}
                            </span>
                            <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              Phần sửa: {rev.section === "all" ? "Toàn bộ" : rev.section}
                            </span>
                            <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                              {rev.languageMode === "en" ? "🌐 English" : "🇻🇳 Anh - Việt"}
                            </span>
                            {isApproved && (
                              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                ✓ Đã phê duyệt
                              </span>
                            )}
                            {isRejected && (
                              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                                ✕ Đã từ chối
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="font-medium text-slate-700 dark:text-slate-300">
                              Tác giả: {rev.authorName}
                            </span>
                            {rev.authorInstitution && (
                              <span className="flex items-center gap-1 italic">
                                <GraduationCap size={12} /> {rev.authorInstitution}
                              </span>
                            )}
                            <span className="flex items-center gap-1 font-mono text-[11px]">
                              <Clock size={11} /> {new Date(rev.createdAt || "").toLocaleString("vi-VN")}
                            </span>
                          </div>
                        </div>

                        {/* Nút hành động một chạm */}
                        {isPending && (
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleReviewRevision(rev.id, "approved")}
                              disabled={actionLoadingId === rev.id}
                              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition flex items-center gap-1 shadow-xs disabled:opacity-50"
                            >
                              <CheckCircle2 size={13} />
                              <span>Phê duyệt</span>
                            </button>
                            <button
                              onClick={() => handleReviewRevision(rev.id, "rejected")}
                              disabled={actionLoadingId === rev.id}
                              className="px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 font-medium text-xs transition flex items-center gap-1 disabled:opacity-50"
                            >
                              <XCircle size={13} />
                              <span>Từ chối</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Hai trường học thuật: Lý do sửa & Nguồn DOI */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs">
                        <div>
                          <strong className="text-slate-700 dark:text-slate-300 block mb-0.5">
                            Lý do chỉnh sửa (Edit Summary):
                          </strong>
                          <p className="text-slate-600 dark:text-slate-400">
                            {rev.editSummary}
                          </p>
                        </div>
                        <div>
                          <strong className="text-slate-700 dark:text-slate-300 block mb-0.5">
                            Nguồn học thuật kiểm chứng / DOI:
                          </strong>
                          <p className="text-slate-600 dark:text-slate-400 font-mono">
                            {rev.supportingSources}
                          </p>
                        </div>
                      </div>

                      {/* GIAO DIỆN SO SÁNH TRỰC QUAN RED/GREEN VISUAL DIFF */}
                      <div className="space-y-3 pt-2">
                        {/* Diff Định nghĩa cốt lõi */}
                        {(rev.proposedContent.coreDefinition !== undefined && rev.proposedContent.coreDefinition !== rev.originalContent.coreDefinition) && (
                          <VisualDiffViewer
                            label="Định nghĩa Cốt lõi (Core Definition)"
                            original={rev.originalContent.coreDefinition || ""}
                            proposed={rev.proposedContent.coreDefinition || ""}
                          />
                        )}

                        {/* Diff Ngưỡng thực nghiệm */}
                        {(rev.proposedContent.benchmarks !== undefined && rev.proposedContent.benchmarks !== rev.originalContent.benchmarks) && (
                          <VisualDiffViewer
                            label="Ngưỡng Thực nghiệm (Empirical Benchmarks)"
                            original={rev.originalContent.benchmarks || ""}
                            proposed={rev.proposedContent.benchmarks || ""}
                          />
                        )}

                        {/* Diff Cạm bẫy phương pháp */}
                        {(rev.proposedContent.pitfalls !== undefined && rev.proposedContent.pitfalls !== rev.originalContent.pitfalls) && (
                          <VisualDiffViewer
                            label="Cạm bẫy Phương pháp luận (Pitfalls)"
                            original={rev.originalContent.pitfalls || ""}
                            proposed={rev.proposedContent.pitfalls || ""}
                          />
                        )}

                        {/* Diff Tranh luận học thuật */}
                        {(rev.proposedContent.debates !== undefined && rev.proposedContent.debates !== rev.originalContent.debates) && (
                          <VisualDiffViewer
                            label="Tranh luận Học thuật (Paradigm Debates)"
                            original={rev.originalContent.debates || ""}
                            proposed={rev.proposedContent.debates || ""}
                          />
                        )}

                        {/* Diff Tài liệu trích dẫn */}
                        {(rev.proposedContent.seminalCitation !== undefined && rev.proposedContent.seminalCitation !== rev.originalContent.seminalCitation) && (
                          <VisualDiffViewer
                            label="Bài báo gốc kinh điển (Seminal Citation)"
                            original={rev.originalContent.seminalCitation || ""}
                            proposed={rev.proposedContent.seminalCitation || ""}
                          />
                        )}
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          ) : (
            /* TAB 2: DANH SÁCH ĐỀ XUẤT THUẬT NGỮ MỚI (NEW TERMS) */
            <div className="space-y-6">
              {filteredNewTerms.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl text-slate-400 space-y-2">
                  <PlusCircle size={32} className="mx-auto text-slate-300 dark:text-slate-700" />
                  <p className="text-sm font-medium">Không có đề xuất thuật ngữ mới nào</p>
                  <p className="text-xs">Khi có thành viên đề xuất từ mới, thông tin sẽ xuất hiện tại đây.</p>
                </div>
              ) : (
                filteredNewTerms.map((item) => {
                  const isPending = (item.status || "pending") === "pending";
                  const isApproved = item.status === "approved";
                  const isRejected = item.status === "rejected";

                  return (
                    <article
                      key={item.id}
                      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs space-y-4 p-5 sm:p-6 text-xs"
                    >
                      {/* Tiêu đề thuật ngữ đề xuất & Nút duyệt */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
                              {item.term}
                            </h3>
                            {item.partOfSpeech && (
                              <span className="italic text-slate-500">[{item.partOfSpeech}]</span>
                            )}
                            <span className="font-semibold text-blue-700 dark:text-blue-300">
                              ({item.vietnamese})
                            </span>
                            {isApproved && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                ✓ Đã bổ sung
                              </span>
                            )}
                            {isRejected && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                                ✕ Đã từ chối
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-slate-500 mt-1">
                            <span>Người đề xuất: {item.authorName}</span>
                            {item.authorInstitution && <span>• {item.authorInstitution}</span>}
                            <span>• {new Date(item.createdAt || "").toLocaleDateString("vi-VN")}</span>
                          </div>
                        </div>

                        {isPending && (
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleReviewNewTerm(item.id, "approved")}
                              disabled={actionLoadingId === item.id}
                              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition flex items-center gap-1 shadow-xs disabled:opacity-50"
                            >
                              <CheckCircle2 size={13} />
                              <span>Chấp thuận & Bổ sung</span>
                            </button>
                            <button
                              onClick={() => handleReviewNewTerm(item.id, "rejected")}
                              disabled={actionLoadingId === item.id}
                              className="px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-50 text-red-600 font-medium transition flex items-center gap-1 disabled:opacity-50"
                            >
                              <XCircle size={13} />
                              <span>Bác bỏ</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Phân loại & Lý do */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {item.domainTags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                          <strong className="text-slate-700 dark:text-slate-300 block mb-0.5">
                            Lý do đề xuất & Tầm quan trọng học thuật:
                          </strong>
                          <p className="text-slate-600 dark:text-slate-400">
                            {item.proposalReason}
                          </p>
                          <span className="text-[11px] font-mono text-slate-500 block mt-1">
                            Nguồn kiểm chứng: {item.supportingSources}
                          </span>
                        </div>

                        {/* Nội dung định nghĩa đề xuất */}
                        <div className="p-4 rounded-xl border-l-4 border-emerald-600 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                          <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                            Định nghĩa Cốt lõi Đề xuất:
                          </span>
                          <p className="font-serif leading-relaxed text-slate-800 dark:text-slate-200 text-sm">
                            {item.coreDefinition}
                          </p>

                          {item.benchmarks && (
                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 font-mono text-xs">
                              <strong>Ngưỡng số liệu:</strong> {item.benchmarks}
                            </div>
                          )}

                          {item.seminalCitation && (
                            <div className="pt-1 text-slate-500">
                              <strong>Bài báo gốc:</strong> {item.seminalCitation}
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          )}
        </main>
      )}
    </div>
  );
}
