"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Trophy, 
  ArrowLeft, 
  Award, 
  Building2, 
  User, 
  Search, 
  ShieldCheck, 
  BookOpen, 
  Star, 
  ExternalLink, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Globe,
  GraduationCap,
  Users
} from "lucide-react";
import { ScholarContributor } from "@/lib/types";
import { fetchHallOfFameScholars } from "@/lib/firebase-service";

export default function HallOfFamePage() {
  const [scholars, setScholars] = useState<ScholarContributor[]>([]);
  const [totalEdits, setTotalEdits] = useState(0);
  const [totalInstitutions, setTotalInstitutions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBadge, setSelectedBadge] = useState<"all" | "senior_fellow" | "contributing_scholar" | "peer_reviewer">("all");
  const [languageMode, setLanguageMode] = useState<"vi" | "en">("vi");

  // Đọc ngôn ngữ lưu sẵn
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("rv_lexicon_mode");
      if (savedLang === "en" || savedLang === "vi") {
        setLanguageMode(savedLang);
      }
    }
  }, []);

  const isEn = languageMode === "en";

  const t = {
    backBtn: isEn ? "Back to Lexicon" : "Quay lại Từ điển",
    title: isEn ? "Scholarly Hall of Fame" : "Bảng Vinh Danh Học Giả",
    subtitle: isEn 
      ? "Public registry honoring professors, researchers, and peer reviewers who advance research methodology rigor"
      : "Vinh danh các Giáo sư, Tiến sĩ, Giảng viên và Nghiên cứu sinh đã đóng góp và chuẩn hoá hệ thống phương pháp luận",
    statTotalEdits: isEn ? "Peer-Reviewed Contributions" : "Đóng góp học thuật đã duyệt",
    statInstitutions: isEn ? "Universities & Institutes" : "Trường Đại học & Viện nghiên cứu",
    statRigor: isEn ? "Review Rigor" : "Tiêu chuẩn Thẩm định",
    statRigorVal: isEn ? "100% Peer-Reviewed" : "100% Tiền kiểm duyệt",
    searchPlaceholder: isEn ? "Search by scholar name or university..." : "Tìm theo tên học giả hoặc trường đại học...",
    filterAll: isEn ? "All Scholars" : "Tất cả",
    badgeSenior: isEn ? "Senior Methodology Fellow" : "Chuyên gia Phương pháp Cấp cao",
    badgeContributing: isEn ? "Contributing Scholar" : "Học giả Đóng góp Tích cực",
    badgeReviewer: isEn ? "Peer Reviewer" : "Người Bình duyệt Học thuật",
    podiumTitle: isEn ? "Top Distinguished Contributors" : "Học Giả Xuất Sắc Hàng Đầu",
    tableRank: isEn ? "Rank" : "Thứ hạng",
    tableScholar: isEn ? "Scholar" : "Học giả / Nhà nghiên cứu",
    tableInstitution: isEn ? "Affiliation" : "Đơn vị công tác",
    tableBadge: isEn ? "Distinction" : "Danh hiệu",
    tableTotal: isEn ? "Accepted Edits" : "Số lần đóng góp",
    tableTerms: isEn ? "Recent Terms" : "Mục từ tiêu biểu",
    empty: isEn ? "No scholars found matching your search." : "Không tìm thấy học giả nào phù hợp với tìm kiếm.",
    howToEarnTitle: isEn ? "How to Earn Scholarly Recognition" : "Quy trình Được Vinh danh Học thuật",
    step1Title: isEn ? "1. Propose Edits or Terms" : "1. Đề xuất Sửa đổi hoặc Tạo Mục từ",
    step1Desc: isEn ? "Click Edit on any term or propose a new methodology concept with academic rigor." : "Bấm nút Sửa mục từ hoặc Đề xuất từ mới kèm luận điểm phương pháp luận rõ ràng.",
    step2Title: isEn ? "2. Provide DOI Citations" : "2. Đính kèm Minh chứng DOI / Scopus",
    step2Desc: isEn ? "Support your claims with seminal literature from top Q1 journals and textbooks." : "Bổ sung nguồn trích dẫn từ các tạp chí Q1, sách kinh điển (Hair et al., Kline, Bagozzi...).",
    step3Title: isEn ? "3. Peer Review & Attribution" : "3. Hội đồng Phê duyệt & Ghi danh Vĩnh viễn",
    step3Desc: isEn ? "Once approved, your name and institution are permanently etched into the Hall of Fame." : "Sau khi được phê duyệt, tên và trường của bạn sẽ được vinh danh vĩnh viễn trên hệ thống."
  };

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchHallOfFameScholars()
      .then((res) => {
        if (isMounted) {
          setScholars(res.scholars);
          setTotalEdits(res.totalApprovedEdits);
          setTotalInstitutions(res.totalParticipatingInstitutions);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error loading hall of fame:", err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggleLang = (mode: "vi" | "en") => {
    setLanguageMode(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("rv_lexicon_mode", mode);
    }
  };

  // Lọc theo tìm kiếm và danh hiệu
  const filteredScholars = scholars.filter((s) => {
    const matchSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.institution.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedBadge === "all") return matchSearch;
    return matchSearch && s.badge === selectedBadge;
  });

  const getBadgePill = (badge: ScholarContributor["badge"]) => {
    switch (badge) {
      case "senior_fellow":
        return {
          label: t.badgeSenior,
          className: "bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800"
        };
      case "contributing_scholar":
        return {
          label: t.badgeContributing,
          className: "bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800"
        };
      default:
        return {
          label: t.badgeReviewer,
          className: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
        };
    }
  };

  const top3 = scholars.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* 1. Header Điều hướng */}
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
            <Trophy size={18} className="text-amber-500" />
            <span>{t.title}</span>
          </h1>
        </div>

        {/* Nút Chuyển đổi Ngôn ngữ */}
        <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-100 dark:bg-slate-800/80 text-xs font-semibold">
          <button
            onClick={() => handleToggleLang("vi")}
            className={`px-2 py-1 rounded-md transition flex items-center gap-1 ${
              languageMode === "vi"
                ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-xs font-bold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>🇻🇳</span>
            <span className="hidden md:inline">Anh - Việt</span>
          </button>
          <button
            onClick={() => handleToggleLang("en")}
            className={`px-2 py-1 rounded-md transition flex items-center gap-1 ${
              languageMode === "en"
                ? "bg-blue-600 text-white shadow-xs font-bold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Globe size={12} className={languageMode === "en" ? "text-white" : "text-slate-500"} />
            <span className="hidden md:inline">English</span>
          </button>
        </div>
      </header>

      {/* 2. Khung Nội Dung Chính */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 md:p-8 space-y-8">
        {/* Hero Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 text-amber-500 flex items-center justify-center mx-auto shadow-sm">
            <Trophy size={28} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-serif">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-serif">
            {t.subtitle}
          </p>
        </div>

        {/* 3 Thẻ Thống Kê Tổng Quan */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1 text-center">
            <span className="text-slate-500 text-xs block">{t.statTotalEdits}</span>
            <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
              {totalEdits}
            </span>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1 text-center">
            <span className="text-slate-500 text-xs block">{t.statInstitutions}</span>
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              {totalInstitutions}
            </span>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1 text-center">
            <span className="text-slate-500 text-xs block">{t.statRigor}</span>
            <span className="text-xl sm:text-2xl font-extrabold text-purple-600 dark:text-purple-400">
              {t.statRigorVal}
            </span>
          </div>
        </div>

        {/* Podium Top 3 Học giả Xuất sắc */}
        {!isLoading && top3.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" />
              <span>{t.podiumTitle}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {top3.map((scholar, idx) => {
                const medalColors = [
                  "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400",
                  "border-slate-300 bg-slate-50/50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300",
                  "border-orange-300 bg-orange-50/50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400"
                ];
                const medalLabels = ["🥇 #1", "🥈 #2", "🥉 #3"];

                return (
                  <div
                    key={scholar.id}
                    className={`p-4 rounded-2xl border-2 ${medalColors[idx]} space-y-3 relative overflow-hidden shadow-xs`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold font-mono text-sm px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 shadow-2xs">
                        {medalLabels[idx]}
                      </span>
                      <span className="text-xs font-mono font-bold">
                        {scholar.totalContributions} {isEn ? "edits" : "lần"}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {scholar.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                        <Building2 size={12} className="shrink-0" />
                        <span className="truncate">{scholar.institution}</span>
                      </p>
                    </div>

                    {scholar.recentTermsContributed.length > 0 && (
                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
                        <span className="font-semibold block">{t.tableTerms}:</span>
                        <div className="flex flex-wrap gap-1">
                          {scholar.recentTermsContributed.slice(0, 2).map((tm) => (
                            <span key={tm} className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-[10px] font-mono truncate max-w-full">
                              {tm}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Thanh Tìm kiếm & Lọc Danh hiệu */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs no-scrollbar">
            <button
              onClick={() => setSelectedBadge("all")}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition shrink-0 ${
                selectedBadge === "all"
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              {t.filterAll}
            </button>
            <button
              onClick={() => setSelectedBadge("senior_fellow")}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition shrink-0 ${
                selectedBadge === "senior_fellow"
                  ? "bg-amber-600 text-white font-bold"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              {t.badgeSenior}
            </button>
            <button
              onClick={() => setSelectedBadge("contributing_scholar")}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition shrink-0 ${
                selectedBadge === "contributing_scholar"
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              {t.badgeContributing}
            </button>
          </div>
        </div>

        {/* Bảng Danh Sách Toàn Bộ Học Giả */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          {isLoading ? (
            <div className="py-16 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2">
              <Clock className="animate-spin text-blue-500" size={22} />
              <span>{isEn ? "Loading Scholarly Registry..." : "Đang tải Bảng Vinh danh Học giả..."}</span>
            </div>
          ) : filteredScholars.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              {t.empty}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4 w-16 text-center">{t.tableRank}</th>
                    <th className="py-3 px-4">{t.tableScholar}</th>
                    <th className="py-3 px-4">{t.tableInstitution}</th>
                    <th className="py-3 px-4">{t.tableBadge}</th>
                    <th className="py-3 px-4 text-center">{t.tableTotal}</th>
                    <th className="py-3 px-4 hidden md:table-cell">{t.tableTerms}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                  {filteredScholars.map((scholar, index) => {
                    const badgePill = getBadgePill(scholar.badge);
                    return (
                      <tr
                        key={scholar.id}
                        className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition"
                      >
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-500">
                          #{index + 1}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-[11px] shrink-0">
                              {scholar.name[0]}
                            </div>
                            <span>{scholar.name}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                          <div className="flex items-center gap-1.5 truncate max-w-xs">
                            <Building2 size={13} className="text-slate-400 shrink-0" />
                            <span className="truncate">{scholar.institution}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgePill.className}`}>
                            {badgePill.label}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-blue-600 dark:text-blue-400">
                          {scholar.totalContributions}
                        </td>
                        <td className="py-3.5 px-4 hidden md:table-cell text-slate-500 text-[11px]">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {scholar.recentTermsContributed.slice(0, 2).map((tm) => (
                              <span key={tm} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px] truncate max-w-[140px]">
                                {tm}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 4. Hướng Dẫn Tham Gia & Được Vinh Danh */}
        <section className="p-6 rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50/30 dark:bg-blue-950/20 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Award size={16} className="text-blue-600" />
            <span>{t.howToEarnTitle}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <strong className="text-slate-900 dark:text-white block font-sans">
                {t.step1Title}
              </strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-serif">
                {t.step1Desc}
              </p>
            </div>

            <div className="space-y-1">
              <strong className="text-slate-900 dark:text-white block font-sans">
                {t.step2Title}
              </strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-serif">
                {t.step2Desc}
              </p>
            </div>

            <div className="space-y-1">
              <strong className="text-slate-900 dark:text-white block font-sans">
                {t.step3Title}
              </strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-serif">
                {t.step3Desc}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
