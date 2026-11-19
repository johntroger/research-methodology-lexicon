"use client";

import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  X,
  Database,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  LockOpen,
  ShieldCheck,
  KeyRound,
  Globe,
  Sun,
  Moon,
  ArrowLeft,
  Share2,
  Sparkles,
  BookOpen,
  QrCode,
  RefreshCw,
  Filter,
  Landmark,
  GraduationCap,
  HeartPulse,
  Scale,
  Layers,
  RotateCcw,
} from "lucide-react";
import {
  DatasetsPayload,
  DatasetItem,
  DomainKey,
  DOMAIN_GROUPS,
  CAT_VI,
  filterAndScoreDatasets,
  getDomainForCategory,
} from "@/lib/datasets-catalog";

interface OpenDatasetsPageProps {
  initialData: DatasetsPayload;
}

function getHostname(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function getAccessBadgeStyle(access?: string): {
  tone: "emerald" | "blue" | "amber" | "slate";
  label: string;
} {
  if (!access || !access.trim()) {
    return { tone: "emerald", label: "Mở / Miễn phí" };
  }
  const lower = access.toLowerCase();
  if (lower.includes("public") || lower.includes("open") || lower.includes("cc0") || lower.includes("cc by")) {
    return { tone: "emerald", label: access };
  }
  if (lower.includes("academic") || lower.includes("free") || lower.includes("research")) {
    return { tone: "blue", label: access };
  }
  return { tone: "amber", label: access };
}

function formatUpdatedDate(iso: string, isEn: boolean): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(isEn ? "en-US" : "vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
}

const DOMAIN_ICONS: Record<DomainKey, React.ReactNode> = {
  all: <Layers size={15} />,
  econ: <Landmark size={15} />,
  edu_soc: <GraduationCap size={15} />,
  health_env: <HeartPulse size={15} />,
  gov_misc: <Scale size={15} />,
};

const QUICK_SEARCH_SUGGESTIONS_VI = [
  "Tài chính",
  "Kinh tế vĩ mô",
  "Tiền lương",
  "Giáo dục",
  "Y tế",
  "Biến đổi khí hậu",
  "Khảo sát hộ gia đình",
  "Bất động sản",
  "OWID",
];

const QUICK_SEARCH_SUGGESTIONS_EN = [
  "Finance",
  "Macroeconomics",
  "Wage",
  "Education",
  "Health",
  "Climate",
  "Household",
  "Housing",
  "OWID",
];

function OpenDatasetsContent({ initialData }: OpenDatasetsPageProps) {
  const searchParams = useSearchParams();

  const [catalog, setCatalog] = useState<DatasetsPayload>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDomain, setActiveDomain] = useState<DomainKey>("all");
  const [activeCat, setActiveCat] = useState<string>("all");
  const [onlyPublic, setOnlyPublic] = useState(false);
  const [languageMode, setLanguageMode] = useState<"vi" | "en">("vi");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const isEn = languageMode === "en";

  // Đồng bộ Theme & Ngôn ngữ từ localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("rv_lexicon_mode");
      if (savedLang === "en" || savedLang === "vi") {
        setLanguageMode(savedLang);
      }

      const savedTheme = localStorage.getItem("rv_theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialDark = savedTheme === "dark" || (!savedTheme && prefersDark);
      setIsDarkMode(initialDark);
      if (initialDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  // Đọc URL query params lần đầu (?q=...&cat=...&domain=...)
  useEffect(() => {
    const q = searchParams.get("q") || "";
    const cat = searchParams.get("cat") || "all";
    const dom = (searchParams.get("domain") || "all") as DomainKey;
    const validDomains: DomainKey[] = ["all", "econ", "edu_soc", "health_env", "gov_misc"];

    if (q) setSearchTerm(q);
    if (cat && cat !== "all") {
      setActiveCat(cat);
      setActiveDomain(getDomainForCategory(cat));
    } else if (validDomains.includes(dom)) {
      setActiveDomain(dom);
    }
  }, [searchParams]);

  // Đồng bộ state lọc lên URL (/data?...)
  const syncUrlParams = (next: { q?: string; domain?: DomainKey; cat?: string }) => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    if (next.domain && next.domain !== "all") params.set("domain", next.domain);
    if (next.cat && next.cat !== "all") params.set("cat", next.cat);
    if (next.q && next.q.trim()) params.set("q", next.q.trim());
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `/data?${qs}` : "/data");
  };

  const handleToggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (typeof window !== "undefined") {
      localStorage.setItem("rv_theme", nextDark ? "dark" : "light");
      if (nextDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const handleToggleLanguage = (mode: "vi" | "en") => {
    setLanguageMode(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("rv_lexicon_mode", mode);
    }
  };

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/datasets");
      if (res.ok) {
        const fresh: DatasetsPayload = await res.json();
        if (fresh && Array.isArray(fresh.items) && fresh.items.length > 0) {
          setCatalog(fresh);
        }
      }
    } catch (err) {
      console.error("Không thể làm mới danh mục dữ liệu:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDomainSelect = (domain: DomainKey) => {
    setActiveDomain(domain);
    setActiveCat("all");
    syncUrlParams({ q: searchTerm, domain, cat: "all" });
  };

  const handleCategorySelect = (catKey: string) => {
    const nextCat = activeCat === catKey ? "all" : catKey;
    setActiveCat(nextCat);
    syncUrlParams({ q: searchTerm, domain: activeDomain, cat: nextCat });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    syncUrlParams({ q: value, domain: activeDomain, cat: activeCat });
  };

  const handleQuickSearch = (keyword: string) => {
    setSearchTerm(keyword);
    setActiveDomain("all");
    setActiveCat("all");
    syncUrlParams({ q: keyword, domain: "all", cat: "all" });
    inputRef.current?.focus();
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setActiveDomain("all");
    setActiveCat("all");
    setOnlyPublic(false);
    syncUrlParams({});
    inputRef.current?.focus();
  };

  const handleCopyItemUrl = (url: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl((prev) => (prev === url ? null : prev)), 1800);
    }
  };

  const handleCopyShareLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShareLink(true);
      setTimeout(() => setCopiedShareLink(false), 2000);
    }
  };

  // Tính số lượng bộ dữ liệu theo từng nhóm ngành
  const domainCounts = useMemo(() => {
    const counts: Record<DomainKey, number> = {
      all: catalog.items.length,
      econ: 0,
      edu_soc: 0,
      health_env: 0,
      gov_misc: 0,
    };
    for (const item of catalog.items) {
      const dom = getDomainForCategory(item.cat_key);
      counts[dom] = (counts[dom] || 0) + 1;
    }
    return counts;
  }, [catalog.items]);

  // Danh sách chủ đề hiển thị theo nhóm ngành đang chọn
  const visibleCategories = useMemo(() => {
    const domCfg = DOMAIN_GROUPS.find((d) => d.key === activeDomain);
    const list =
      activeDomain === "all"
        ? catalog.categories
        : catalog.categories.filter((c) => domCfg?.categories.includes(c.key));
    return [...list].sort((a, b) => b.count - a.count);
  }, [catalog.categories, activeDomain]);

  // Kết quả lọc & chấm điểm song ngữ tức thì
  const filteredItems = useMemo(() => {
    return filterAndScoreDatasets(catalog.items, {
      domain: activeDomain,
      cat: activeCat,
      query: searchTerm,
      onlyPublic,
    });
  }, [catalog.items, activeDomain, activeCat, searchTerm, onlyPublic]);

  const hasActiveFilter =
    activeDomain !== "all" || activeCat !== "all" || searchTerm.trim().length > 0 || onlyPublic;

  return (
    <div
      className={
        isDarkMode
          ? "dark min-h-screen bg-[#070B14] text-slate-100"
          : "min-h-screen bg-slate-50 text-slate-900"
      }
    >
      {/* 1. TOP HEADER */}
      <header className="sticky top-0 z-40 h-16 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#070B14]/95 backdrop-blur px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <Link
            href="/"
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0 hover:scale-105 transition"
            title="Quay lại Từ điển Phương pháp Nghiên cứu"
          >
            R
          </Link>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold uppercase block">
                OPEN RESEARCH DATASETS
              </span>
              <span className="hidden sm:inline-block px-2 py-0.2 rounded-full text-[9px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-700 uppercase">
                Live API Sync
              </span>
            </div>
            <h1 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
              {isEn
                ? "Open Datasets Directory for Social Science Research"
                : "Kho Dữ liệu Mở cho Nghiên cứu Khoa học"}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Nút chuyển sang Tra cứu Tạp chí */}
          <Link
            href="/tap-chi"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/80 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-xs font-semibold transition"
            title="Chuyển sang Cổng Tra cứu & Thẩm định Tạp chí (/tap-chi)"
          >
            <BookOpen size={14} />
            <span>{isEn ? "Journal Verifier" : "Tra cứu Tạp chí"}</span>
          </Link>

          {/* Nút Copy Share Link */}
          <button
            onClick={handleCopyShareLink}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition cursor-pointer"
            title="Sao chép liên kết kết quả lọc hiện tại"
          >
            {copiedShareLink ? (
              <Check size={14} className="text-emerald-500" />
            ) : (
              <Share2 size={14} />
            )}
            <span>
              {copiedShareLink
                ? isEn
                  ? "Copied!"
                  : "Đã chép link!"
                : isEn
                  ? "Share"
                  : "Chia sẻ"}
            </span>
          </button>

          {/* Bộ chọn ngôn ngữ Song ngữ / English */}
          <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-100 dark:bg-slate-800/80 text-xs font-semibold">
            <button
              onClick={() => handleToggleLanguage("vi")}
              className={`px-2.5 py-1 rounded-md transition flex items-center gap-1 cursor-pointer ${
                languageMode === "vi"
                  ? "bg-white dark:bg-emerald-600 text-emerald-700 dark:text-white shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
              }`}
            >
              <span>🇻🇳</span>
              <span className="hidden md:inline">Song ngữ</span>
            </button>
            <button
              onClick={() => handleToggleLanguage("en")}
              className={`px-2.5 py-1 rounded-md transition flex items-center gap-1 cursor-pointer ${
                languageMode === "en"
                  ? "bg-emerald-600 text-white shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
              }`}
            >
              <Globe size={12} />
              <span className="hidden md:inline">English</span>
            </button>
          </div>

          {/* Nút Đổi Sáng / Tối */}
          <button
            onClick={handleToggleTheme}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title={isDarkMode ? "Chuyển sang chế độ Sáng" : "Chuyển sang chế độ Tối"}
          >
            {isDarkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
          </button>

          {/* Nút Quay lại Từ điển */}
          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 shadow-sm"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">{isEn ? "Back to Lexicon" : "Về Từ điển"}</span>
          </Link>
        </div>
      </header>

      {/* 2. BODY CHÍNH */}
      <main className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 space-y-6">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-emerald-800/40">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-4xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                <Sparkles size={13} className="text-amber-400" />
                <span>
                  {isEn
                    ? "Curated Secondary Data Catalog for Quantitative & Empirical Research"
                    : "Thư viện Dữ liệu Thứ cấp Mở phục vụ Nghiên cứu Định lượng & Thực nghiệm"}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                {isEn
                  ? "Explore 147+ Open Datasets Across Economics, Society, Health & Governance"
                  : "Kho Dữ liệu Mở cho Nghiên cứu Khoa học Xã hội, Kinh tế & Chính sách"}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {isEn
                  ? "Instantly search and filter vetted free datasets by 4 major academic domains and 34 specialized topics. Ideal for empirical papers, doctoral dissertations, econometrics, and reproducible social science."
                  : "Tra cứu song ngữ Việt–Anh tức thì hàng trăm bộ dữ liệu thứ cấp uy tín quốc tế theo 4 nhóm ngành lớn và 34 chủ đề chuyên sâu. Phù hợp cho bài báo quốc tế Q1/Q2, luận án Tiến sĩ, nghiên cứu kinh tế lượng và khoa học xã hội."}
              </p>

              {/* Quick Stats Pills */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs font-mono text-slate-200">
                <span className="px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur border border-white/10">
                  📊 <strong>{catalog.total}</strong>{" "}
                  {isEn ? "Open Datasets" : "Bộ dữ liệu mở"}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-200">
                  🗂️ <strong>4</strong> {isEn ? "Major Domains" : "Nhóm ngành lớn"}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 border border-teal-400/30 text-teal-200">
                  🏷️ <strong>{catalog.categories.length}</strong>{" "}
                  {isEn ? "Research Topics" : "Chủ đề chuyên sâu"}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-200">
                  🔄 {isEn ? "Updated:" : "Cập nhật:"}{" "}
                  <strong>{formatUpdatedDate(catalog.updated_at, isEn)}</strong>
                </span>
              </div>
            </div>

            {/* Nguồn gốc & Nút đồng bộ */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-2.5 shrink-0">
              <a
                href={catalog.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-slate-200 font-medium transition"
              >
                <Database size={13} className="text-emerald-300" />
                <span>{isEn ? "Source: Todd Jones (GitHub)" : "Nguồn chuẩn: Todd Jones"}</span>
                <ExternalLink size={12} />
              </a>
              <button
                onClick={handleRefreshData}
                disabled={isRefreshing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-xs text-emerald-200 font-semibold transition cursor-pointer disabled:opacity-50"
              >
                <RefreshCw size={13} className={isRefreshing ? "animate-spin" : ""} />
                <span>
                  {isRefreshing
                    ? isEn
                      ? "Syncing..."
                      : "Đang đồng bộ..."
                    : isEn
                      ? "Sync Latest Data"
                      : "Đồng bộ dữ liệu mới"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. THANH TÌM KIẾM & BỘ LỌC 4 NHÓM NGÀNH / 34 CHỦ ĐỀ */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          {/* Ô tìm kiếm song ngữ Việt-Anh */}
          <div className="relative flex items-center">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={
                isEn
                  ? "Search by dataset name, topic, or keywords (e.g., finance, wage, climate, OWID, V-Dem, housing)..."
                  : "Tìm kiếm song ngữ Việt–Anh tức thì (vd: tài chính, tiền lương, biến đổi khí hậu, giáo dục, OWID, V-Dem, GDP)..."
              }
              className="w-full pl-12 pr-12 py-3.5 text-sm sm:text-base rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/90 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
                title="Xóa từ khóa"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Gợi ý tìm kiếm nhanh */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium mr-1">
              {isEn ? "Quick search:" : "Gợi ý nhanh:"}
            </span>
            {(isEn ? QUICK_SEARCH_SUGGESTIONS_EN : QUICK_SEARCH_SUGGESTIONS_VI).map((kw) => (
              <button
                key={kw}
                onClick={() => handleQuickSearch(kw)}
                className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800 transition cursor-pointer"
              >
                {kw}
              </button>
            ))}
          </div>

          {/* Tab 4 Nhóm ngành lớn */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <Filter size={13} className="text-emerald-600 dark:text-emerald-400" />
                <span>
                  {isEn ? "Filter by 4 Major Domains" : "Lọc theo 4 Nhóm ngành lớn"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyPublic}
                    onChange={(e) => setOnlyPublic(e.target.checked)}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span>{isEn ? "Open / Free access only" : "Chỉ hiện mở / miễn phí"}</span>
                </label>

                {hasActiveFilter && (
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-950/70 transition cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>{isEn ? "Reset all" : "Xóa bộ lọc"}</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {DOMAIN_GROUPS.map((dom) => {
                const active = activeDomain === dom.key;
                const count = domainCounts[dom.key] || 0;
                return (
                  <button
                    key={dom.key}
                    onClick={() => handleDomainSelect(dom.key)}
                    className={`px-3 py-2.5 rounded-xl text-left border transition flex items-center justify-between gap-2 cursor-pointer ${
                      active
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-slate-50 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={active ? "text-emerald-100" : "text-emerald-600 dark:text-emerald-400"}>
                        {DOMAIN_ICONS[dom.key]}
                      </span>
                      <span className="text-xs font-semibold truncate">
                        {isEn ? dom.short_en : dom.short_vi}
                      </span>
                    </div>
                    <span
                      className={`px-1.5 py-0.5 rounded-md text-[11px] font-mono font-bold shrink-0 ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dải Chip 34 Chủ đề chuyên sâu */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => handleCategorySelect("all")}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                  activeCat === "all"
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400"
                }`}
              >
                {isEn ? "All Topics" : "Tất cả chủ đề"} ({visibleCategories.length})
              </button>

              {visibleCategories.map((cat) => {
                const isSelected = activeCat === cat.key;
                const label = isEn ? cat.name : cat.name_vi || CAT_VI[cat.key] || cat.name;
                return (
                  <button
                    key={cat.key}
                    onClick={() => handleCategorySelect(cat.key)}
                    title={`${cat.name_vi || CAT_VI[cat.key] || cat.name} — ${cat.name}`}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition inline-flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs font-semibold"
                        : "bg-slate-50 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                    }`}
                  >
                    <span>{label}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. KẾT QUẢ HIỂN THỊ */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500 dark:text-slate-400 px-1">
            <div>
              {isEn ? "Showing " : "Hiển thị "}
              <strong className="text-slate-900 dark:text-white font-bold">
                {filteredItems.length}
              </strong>
              {" / "}
              <span>{catalog.total}</span>
              {isEn ? " open research datasets" : " bộ dữ liệu mở"}
              {activeCat !== "all" && (
                <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                  {isEn
                    ? catalog.categories.find((c) => c.key === activeCat)?.name
                    : CAT_VI[activeCat] || activeCat}
                </span>
              )}
            </div>

            <div className="text-xs text-slate-400 dark:text-slate-500 font-mono">
              API: scopus-wos-zalo-bot / research_datasets.json
            </div>
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {filteredItems.map((item: DatasetItem, idx: number) => {
                const accessBadge = getAccessBadgeStyle(item.access);
                const hostname = getHostname(item.url);
                const isCopied = copiedUrl === item.url;
                const catLabelVi = item.cat_vi || CAT_VI[item.cat_key] || item.cat;

                const badgeColors = {
                  emerald:
                    "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800",
                  blue: "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200/80 dark:border-blue-800",
                  amber:
                    "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-800",
                  slate:
                    "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
                }[accessBadge.tone];

                return (
                  <article
                    key={`${item.cat_key}-${item.name}-${idx}`}
                    className="group flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-[#0c1222] border border-slate-200/90 dark:border-slate-800 hover:border-emerald-400/80 dark:hover:border-emerald-600/80 shadow-xs hover:shadow-md transition-all duration-200"
                  >
                    <div className="space-y-3">
                      {/* Top Badges: Chủ đề + Năm */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <button
                          onClick={() => handleCategorySelect(item.cat_key)}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 hover:text-emerald-800 dark:hover:text-emerald-300 transition cursor-pointer"
                          title={isEn ? item.cat : `${catLabelVi} (${item.cat})`}
                        >
                          <span>{isEn ? item.cat : catLabelVi}</span>
                        </button>

                        {item.years && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800/70">
                            <Calendar size={11} />
                            <span className="truncate max-w-[160px]" title={item.years}>
                              {item.years}
                            </span>
                          </span>
                        )}
                      </div>

                      {/* Tên bộ dữ liệu */}
                      <div>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition leading-snug inline-flex items-start gap-1.5"
                        >
                          <span>{item.name}</span>
                        </a>
                        {!isEn && (
                          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                            {item.cat} • <span className="font-mono">{hostname}</span>
                          </div>
                        )}
                        {isEn && (
                          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 font-mono">
                            {hostname}
                          </div>
                        )}
                      </div>

                      {/* Mô tả */}
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4">
                        {item.desc ||
                          (isEn
                            ? "Open research dataset curated for empirical social science analysis."
                            : "Bộ dữ liệu mở phục vụ phân tích thực nghiệm và nghiên cứu khoa học.")}
                      </p>
                    </div>

                    {/* Footer thẻ: Điều kiện truy cập + Nút hành động */}
                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium max-w-full ${badgeColors}`}
                        title={accessBadge.label}
                      >
                        {accessBadge.tone === "emerald" ? (
                          <LockOpen size={12} className="shrink-0" />
                        ) : accessBadge.tone === "blue" ? (
                          <ShieldCheck size={12} className="shrink-0" />
                        ) : (
                          <KeyRound size={12} className="shrink-0" />
                        )}
                        <span className="truncate">{accessBadge.label}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition shadow-2xs"
                        >
                          <span>{isEn ? "Open Source" : "Mở nguồn dữ liệu"}</span>
                          <ExternalLink size={13} />
                        </a>

                        <button
                          onClick={() => handleCopyItemUrl(item.url)}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition cursor-pointer shrink-0"
                          title="Sao chép đường dẫn nguồn dữ liệu"
                        >
                          {isCopied ? (
                            <>
                              <Check size={13} className="text-emerald-500" />
                              <span className="text-emerald-600 dark:text-emerald-400">
                                {isEn ? "Copied" : "Đã chép"}
                              </span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>{isEn ? "Copy" : "Copy link"}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 text-center space-y-3">
              <Database className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isEn
                  ? "No matching datasets found"
                  : "Không tìm thấy bộ dữ liệu nào phù hợp"}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                {isEn
                  ? "Try broadening your keywords or clearing the active domain/topic filters."
                  : "Thử tìm bằng từ khóa rộng hơn (tiếng Việt hoặc tiếng Anh) hoặc đặt lại bộ lọc nhóm ngành/chủ đề."}
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>{isEn ? "Reset filters" : "Đặt lại tất cả bộ lọc"}</span>
              </button>
            </div>
          )}
        </section>

        {/* 5. FOOTER CARD KẾT NỐI ZALO BOT KÈM MÃ QR CODE */}
        <section className="pt-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white shadow-2xl relative overflow-hidden border border-blue-800/60">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
              <div className="p-3.5 bg-white rounded-2xl shadow-xl shrink-0 flex flex-col items-center group">
                <img
                  src="/images/zalo-bot-qr.svg"
                  alt="QR Code Zalo Bot Tra Cứu Tạp Chí & Dữ Liệu Mở"
                  className="w-36 h-36 sm:w-40 sm:h-40 object-contain group-hover:scale-105 transition-transform duration-200"
                />
                <span className="text-[11px] font-bold text-slate-800 mt-2 uppercase tracking-wider flex items-center gap-1.5">
                  <QrCode size={13} className="text-blue-600" />
                  Quét mã trên Zalo
                </span>
              </div>

              <div className="flex-1 text-center lg:text-left space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
                  <span>🤖 ZALO BOT HỖ TRỢ NGHIÊN CỨU KHOA HỌC (TẠP CHÍ & DỮ LIỆU MỞ)</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Tra cứu nhanh tạp chí Scopus/WoS/HĐGSNN & Kho dữ liệu ngay trên Zalo
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                  Quét mã QR bằng ứng dụng Zalo hoặc mở liên kết bên dưới để nhắn tin trực tiếp với Bot. Hệ thống đồng bộ dữ liệu liên tục giúp bạn kiểm tra phân vị tạp chí, cảnh báo bài rút và tìm nguồn dữ liệu thứ cấp mọi lúc, mọi nơi.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <a
                    href="https://bot.zaloplatforms.com/bots/916143010038410261"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-sm transition flex items-center gap-2 shadow-lg shadow-blue-500/30"
                  >
                    <span>Mở Bot trên Zalo</span>
                    <ExternalLink size={16} />
                  </a>

                  <Link
                    href="/tap-chi"
                    className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-sm transition flex items-center gap-2"
                  >
                    <BookOpen size={15} />
                    <span>Mở Cổng Tra cứu Tạp chí (/tap-chi)</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 6. BOTTOM FOOTER */}
      <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2">
        <p>
          Kho Dữ liệu Mở & Từ điển Phương pháp Nghiên cứu Khoa học — Đồng bộ từ{" "}
          <a
            href={catalog.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-emerald-600"
          >
            {catalog.source_name}
          </a>
          .
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
          <Link href="/" className="hover:text-blue-600 transition">
            Không gian Từ điển (/)
          </Link>
          <span>•</span>
          <Link href="/home" className="hover:text-blue-600 transition">
            Trang Giới thiệu (/home)
          </Link>
          <span>•</span>
          <Link href="/tap-chi" className="hover:text-blue-600 transition">
            Tra cứu Tạp chí (/tap-chi)
          </Link>
          <span>•</span>
          <Link href="/hall-of-fame" className="hover:text-blue-600 transition">
            Bảng Vinh danh Học giả
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default function OpenDatasetsPage({ initialData }: OpenDatasetsPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 dark:bg-[#070B14] flex items-center justify-center">
          <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>Đang tải Kho Dữ liệu Mở...</span>
          </div>
        </div>
      }
    >
      <OpenDatasetsContent initialData={initialData} />
    </Suspense>
  );
}
