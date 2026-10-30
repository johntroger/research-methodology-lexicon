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
  MessageSquare,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Bot,
  AlertTriangle,
  Crown,
  LogIn,
  LogOut,
  UserCheck
} from "lucide-react";
import { 
  fetchPendingRevisions, 
  fetchPendingTerms, 
  reviewTermRevision, 
  reviewNewTermProposal,
  saveAiEvaluationToRevision,
  saveAiEvaluationToNewTerm,
  loginWithGoogle,
  logoutUser,
  TermRevisionItem,
  NewTermProposalItem,
  subscribeToAuth
} from "@/lib/firebase-service";
import { requestAiReview } from "@/lib/submission-guard";
import VisualDiffViewer from "@/components/VisualDiffViewer";
import AiReviewCritiqueCard from "@/components/AiReviewCritiqueCard";
import type { User } from "firebase/auth";

const SUPER_ADMIN_EMAILS = [
  "tranthanhtung37@gmail.com",
  ...(process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",")
    .map(e => e.trim().toLowerCase())
    .filter(Boolean)
];

const ADMIN_PASSCODE = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "Tranthanhtung";

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

  // AI Moderation States
  const [aiAnalyzingId, setAiAnalyzingId] = useState<string | null>(null);
  const [isBatchAnalyzing, setIsBatchAnalyzing] = useState(false);
  const [expandedAiCards, setExpandedAiCards] = useState<Record<string, boolean>>({});

  const toggleAiCard = (id: string) => {
    setExpandedAiCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTriggerAiReviewRevision = async (rev: TermRevisionItem) => {
    setAiAnalyzingId(rev.id);
    try {
      const res = await requestAiReview("revision", rev.termName, rev);
      if (res.success && res.evaluation) {
        setRevisions(prev => prev.map(r => r.id === rev.id ? { ...r, aiEvaluation: res.evaluation } : r));
        await saveAiEvaluationToRevision(rev.id, res.evaluation);
        setExpandedAiCards(prev => ({ ...prev, [rev.id]: true }));
      }
    } catch (err) {
      console.error("AI Review error:", err);
    } finally {
      setAiAnalyzingId(null);
    }
  };

  const handleTriggerAiReviewNewTerm = async (term: NewTermProposalItem) => {
    setAiAnalyzingId(term.id);
    try {
      const res = await requestAiReview("new_term", term.term, term);
      if (res.success && res.evaluation) {
        setNewTerms(prev => prev.map(t => t.id === term.id ? { ...t, aiEvaluation: res.evaluation } : t));
        await saveAiEvaluationToNewTerm(term.id, res.evaluation);
        setExpandedAiCards(prev => ({ ...prev, [term.id]: true }));
      }
    } catch (err) {
      console.error("AI Review error:", err);
    } finally {
      setAiAnalyzingId(null);
    }
  };

  const handleBatchAiAudit = async () => {
    setIsBatchAnalyzing(true);
    try {
      if (activeTab === "revisions") {
        const pending = revisions.filter(r => (r.status || "pending") === "pending" && !r.aiEvaluation);
        for (const rev of pending) {
          setAiAnalyzingId(rev.id);
          const res = await requestAiReview("revision", rev.termName, rev);
          if (res.success && res.evaluation) {
            setRevisions(prev => prev.map(r => r.id === rev.id ? { ...r, aiEvaluation: res.evaluation } : r));
            await saveAiEvaluationToRevision(rev.id, res.evaluation);
          }
        }
      } else {
        const pending = newTerms.filter(t => (t.status || "pending") === "pending" && !t.aiEvaluation);
        for (const term of pending) {
          setAiAnalyzingId(term.id);
          const res = await requestAiReview("new_term", term.term, term);
          if (res.success && res.evaluation) {
            setNewTerms(prev => prev.map(t => t.id === term.id ? { ...t, aiEvaluation: res.evaluation } : t));
            await saveAiEvaluationToNewTerm(term.id, res.evaluation);
          }
        }
      }
    } catch (err) {
      console.error("Batch AI review error:", err);
    } finally {
      setAiAnalyzingId(null);
      setIsBatchAnalyzing(false);
    }
  };

  const isSuperAdmin = Boolean(currentUser?.email && SUPER_ADMIN_EMAILS.includes(currentUser.email.toLowerCase()));

  // Lắng nghe auth & tải dữ liệu
  useEffect(() => {
    const unsub = subscribeToAuth((u) => {
      setCurrentUser(u);
      // Tự động nhận diện và mở khóa nếu là Super Admin
      if (u && u.email && SUPER_ADMIN_EMAILS.includes(u.email.toLowerCase())) {
        setIsUnlocked(true);
      }
    });

    loadData();
    return () => unsub();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      if (user && user.email && SUPER_ADMIN_EMAILS.includes(user.email.toLowerCase())) {
        setIsUnlocked(true);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setIsUnlocked(false);
  };

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
    if (passcode.trim() === ADMIN_PASSCODE) {
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
          {currentUser && (
            <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              {isSuperAdmin ? (
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                  <Crown size={13} className="text-amber-500" />
                  <span>Admin: {currentUser.email}</span>
                </span>
              ) : (
                <span className="text-slate-600 dark:text-slate-300">
                  {currentUser.email}
                </span>
              )}
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-500 ml-1 transition"
                title="Đăng xuất"
              >
                <LogOut size={12} />
              </button>
            </div>
          )}

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
          <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-5 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
              <Lock size={22} />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Khu vực Thẩm định & Phê duyệt
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Dành riêng cho Hội đồng Biên tập Từ điển. Đăng nhập Google bằng tài khoản Quản trị viên (<span className="font-mono text-blue-600 dark:text-blue-400">tranthanhtung37@gmail.com</span>) hoặc nhập mã PIN.
              </p>
            </div>

            {/* Nút Đăng nhập Google một chạm cho Super Admin */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs transition shadow-xs flex items-center justify-center gap-2"
              >
                <Crown size={15} className="text-amber-500" />
                <span>Đăng nhập với Google (tranthanhtung37@gmail.com)</span>
              </button>

              {currentUser && !isSuperAdmin && (
                <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-xs">
                  <p>Tài khoản hiện tại (<span className="font-mono">{currentUser.email}</span>) không thuộc danh sách Quản trị viên.</p>
                  <button
                    onClick={handleLogout}
                    className="underline mt-1 font-bold block mx-auto text-amber-900 dark:text-amber-200"
                  >
                    Đăng xuất để đổi tài khoản
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
              <span>hoặc dùng mã PIN dự phòng</span>
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
            </div>

            <form onSubmit={handleUnlockWithPasscode} className="space-y-3 pt-1">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Nhập mã PIN quản trị viên..."
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
                <span>Mở khóa bằng mã PIN</span>
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

            {/* Filter buttons & Batch AI Audit */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleBatchAiAudit}
                disabled={isBatchAnalyzing}
                className="px-3 py-1 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                title="Tự động gọi Gemini AI thẩm định tất cả các mục chưa được đánh giá"
              >
                <Sparkles size={13} className={isBatchAnalyzing ? "animate-spin" : ""} />
                <span>{isBatchAnalyzing ? "Đang quét AI..." : "Quét AI Tất Cả Chờ Duyệt"}</span>
              </button>

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
                            {rev.aiEvaluation && (
                              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 border ${
                                rev.aiEvaluation.academic_score >= 80
                                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                                  : rev.aiEvaluation.academic_score >= 60
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                                  : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-300 dark:border-red-800"
                              }`}>
                                <Sparkles size={11} />
                                <span>
                                  {rev.aiEvaluation.academic_score >= 80 
                                    ? `AI Verified (${rev.aiEvaluation.academic_score})` 
                                    : `AI: ${rev.aiEvaluation.academic_score}/100`}
                                </span>
                              </span>
                            )}
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
                          <div className="flex items-center gap-2 shrink-0 flex-wrap">
                            <button
                              onClick={() => handleTriggerAiReviewRevision(rev)}
                              disabled={aiAnalyzingId === rev.id}
                              className="px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-medium text-xs transition flex items-center gap-1 disabled:opacity-50"
                              title="Yêu cầu Gemini AI thẩm định"
                            >
                              <Sparkles size={12} className={aiAnalyzingId === rev.id ? "animate-spin text-indigo-600" : ""} />
                              <span>{aiAnalyzingId === rev.id ? "Đang quét AI..." : rev.aiEvaluation ? "AI Thẩm định lại" : "AI Thẩm định"}</span>
                            </button>

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

                      {/* HỘP KẾT QUẢ THẨM ĐỊNH GEMINI AI (NẾU CÓ) */}
                      {rev.aiEvaluation && (
                        <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-900/60 text-xs space-y-2">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              <div className="p-1 rounded bg-indigo-600 text-white shrink-0">
                                <Sparkles size={13} />
                              </div>
                              <span className="font-bold text-indigo-950 dark:text-indigo-200">
                                Thẩm định Gemini AI • Điểm: {rev.aiEvaluation.academic_score}/100 
                                ({rev.aiEvaluation.verdict === "approve" ? "Đề xuất Phê duyệt" : rev.aiEvaluation.verdict === "needs_revision" ? "Đề xuất Xem xét" : "Đề xuất Từ chối"})
                              </span>
                            </div>
                            <button
                              onClick={() => toggleAiCard(rev.id)}
                              className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                            >
                              <span>{expandedAiCards[rev.id] ? "Thu gọn kết quả AI" : "Xem chi tiết tiêu chí & cờ đỏ"}</span>
                              {expandedAiCards[rev.id] ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                            </button>
                          </div>

                          <p className="text-slate-700 dark:text-slate-300 italic pl-1 leading-relaxed">
                            "{rev.aiEvaluation.summary}"
                          </p>

                          {expandedAiCards[rev.id] && (
                            <div className="pt-2">
                              <AiReviewCritiqueCard evaluation={rev.aiEvaluation} mode="dashboard_view" />
                            </div>
                          )}
                        </div>
                      )}

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
                        {/* Diff Bản dịch tiếng Việt */}
                        {(rev.proposedContent.vietnamese !== undefined && rev.proposedContent.vietnamese !== rev.originalContent.vietnamese) && (
                          <VisualDiffViewer
                            label="Bản dịch tiếng Việt (Vietnamese Term)"
                            original={rev.originalContent.vietnamese || ""}
                            proposed={rev.proposedContent.vietnamese || ""}
                          />
                        )}

                        {/* Diff Dị bản tiếng Việt */}
                        {(rev.proposedContent.vietnameseVariants !== undefined && JSON.stringify(rev.proposedContent.vietnameseVariants) !== JSON.stringify(rev.originalContent.vietnameseVariants || [])) && (
                          <VisualDiffViewer
                            label="Dị bản tiếng Việt (Vietnamese Variants)"
                            original={(rev.originalContent.vietnameseVariants || []).join(", ")}
                            proposed={(rev.proposedContent.vietnameseVariants || []).join(", ")}
                          />
                        )}

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
                            {item.aiEvaluation && (
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 border ${
                                item.aiEvaluation.academic_score >= 80
                                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                                  : item.aiEvaluation.academic_score >= 60
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                                  : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-300 dark:border-red-800"
                              }`}>
                                <Sparkles size={10} />
                                <span>
                                  {item.aiEvaluation.academic_score >= 80 
                                    ? `AI Verified (${item.aiEvaluation.academic_score})` 
                                    : `AI: ${item.aiEvaluation.academic_score}/100`}
                                </span>
                              </span>
                            )}
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
                          <div className="flex items-center gap-2 shrink-0 flex-wrap">
                            <button
                              onClick={() => handleTriggerAiReviewNewTerm(item)}
                              disabled={aiAnalyzingId === item.id}
                              className="px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-medium text-xs transition flex items-center gap-1 disabled:opacity-50"
                              title="Yêu cầu Gemini AI thẩm định"
                            >
                              <Sparkles size={12} className={aiAnalyzingId === item.id ? "animate-spin text-indigo-600" : ""} />
                              <span>{aiAnalyzingId === item.id ? "Đang quét AI..." : item.aiEvaluation ? "AI Thẩm định lại" : "AI Thẩm định"}</span>
                            </button>

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

                      {/* HỘP KẾT QUẢ THẨM ĐỊNH GEMINI AI (NẾU CÓ) */}
                      {item.aiEvaluation && (
                        <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-900/60 text-xs space-y-2">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              <div className="p-1 rounded bg-indigo-600 text-white shrink-0">
                                <Sparkles size={13} />
                              </div>
                              <span className="font-bold text-indigo-950 dark:text-indigo-200">
                                Thẩm định Gemini AI • Điểm: {item.aiEvaluation.academic_score}/100 
                                ({item.aiEvaluation.verdict === "approve" ? "Đề xuất Phê duyệt" : item.aiEvaluation.verdict === "needs_revision" ? "Đề xuất Xem xét" : "Đề xuất Từ chối"})
                              </span>
                            </div>
                            <button
                              onClick={() => toggleAiCard(item.id)}
                              className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                            >
                              <span>{expandedAiCards[item.id] ? "Thu gọn kết quả AI" : "Xem chi tiết tiêu chí & cờ đỏ"}</span>
                              {expandedAiCards[item.id] ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                            </button>
                          </div>

                          <p className="text-slate-700 dark:text-slate-300 italic pl-1 leading-relaxed">
                            "{item.aiEvaluation.summary}"
                          </p>

                          {expandedAiCards[item.id] && (
                            <div className="pt-2">
                              <AiReviewCritiqueCard evaluation={item.aiEvaluation} mode="dashboard_view" />
                            </div>
                          )}
                        </div>
                      )}

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
