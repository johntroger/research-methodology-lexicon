"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  X,
  BookOpen,
  Award,
  Flame,
  CheckCircle2,
  Info,
  QrCode,
  Sparkles,
  RefreshCw,
  Globe,
  FileWarning,
  AlertTriangle,
  ExternalLink,
  ArrowLeft,
  Sun,
  Moon,
  Share2,
  Copy,
  Check
} from "lucide-react";
import { JournalItemResult, JournalSearchResponse } from "@/lib/journal-search";
import JournalVerificationCard from "./JournalVerificationCard";

function JournalSearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResponse, setSearchResponse] = useState<JournalSearchResponse | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "vn16" | "discontinued_biz">("all");
  const [languageMode, setLanguageMode] = useState<"vi" | "en">("vi");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isEn = languageMode === "en";

  // Khởi tạo Theme & Ngôn ngữ từ localStorage
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

  const handleSearch = async (queryText: string, mode?: string, updateUrl = true) => {
    const q = queryText.trim();
    if (!q && !mode) {
      setSearchResponse(null);
      if (updateUrl && typeof window !== "undefined") {
        window.history.replaceState(null, "", "/tap-chi");
      }
      return;
    }

    setLoading(true);
    try {
      const url = mode
        ? `/api/journals/search?mode=${encodeURIComponent(mode)}`
        : `/api/journals/search?q=${encodeURIComponent(q)}`;

      if (updateUrl && typeof window !== "undefined") {
        const nextQuery = mode ? `?mode=${encodeURIComponent(mode)}` : `?q=${encodeURIComponent(q)}`;
        window.history.replaceState(null, "", `/tap-chi${nextQuery}`);
      }

      const res = await fetch(url);
      if (res.ok) {
        const data: JournalSearchResponse = await res.json();
        setSearchResponse(data);
      }
    } catch (err) {
      console.error("Lỗi khi tra cứu tạp chí:", err);
    } finally {
      setLoading(false);
    }
  };

  // Đọc params từ URL khi vào trang lần đầu
  useEffect(() => {
    const initialQuery = searchParams.get("q");
    const initialMode = searchParams.get("mode");

    if (initialMode === "vn16" || initialMode === "discontinued_biz") {
      setActiveFilter(initialMode);
      setSearchTerm("");
      handleSearch("", initialMode, false);
    } else if (initialQuery) {
      setActiveFilter("all");
      setSearchTerm(initialQuery);
      handleSearch(initialQuery, undefined, false);
    } else {
      // Mặc định hiện Top 16 tạp chí VN vào Scopus
      setActiveFilter("vn16");
      handleSearch("", "vn16", false);
    }
  }, [searchParams]);

  // Debounced search khi người dùng gõ
  useEffect(() => {
    if (activeFilter !== "all") return;
    const q = searchTerm.trim();
    if (q.length < 2) return;

    const timer = setTimeout(() => {
      handleSearch(q, undefined, true);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchTerm, activeFilter]);

  const handleQuickFilter = (mode: "vn16" | "discontinued_biz") => {
    setActiveFilter(mode);
    setSearchTerm("");
    handleSearch("", mode, true);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setActiveFilter("all");
    setSearchResponse(null);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "/tap-chi");
    }
    inputRef.current?.focus();
  };

  const handleCopyShareLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className={isDarkMode ? "dark min-h-screen bg-[#070B14] text-slate-100" : "min-h-screen bg-slate-50 text-slate-900"}>
      {/* 1. TOP HEADER (Cố định, đồng bộ phong cách với toàn trang) */}
      <header className="sticky top-0 z-40 h-16 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#070B14]/95 backdrop-blur px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <Link
            href="/"
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0 hover:scale-105 transition"
            title="Quay lại Từ điển Phương pháp Nghiên cứu"
          >
            R
          </Link>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-blue-600 dark:text-blue-400 font-semibold uppercase block">
                JOURNAL VERIFICATION PORTAL
              </span>
              <span className="hidden sm:inline-block px-2 py-0.2 rounded-full text-[9px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-700 uppercase">
                Bot Zalo Sync
              </span>
            </div>
            <h1 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
              {isEn ? "Scholarly Journal Integrity & Index Verifier" : "Thẩm định & Tra cứu Tạp chí Khoa học"}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Nút Copy Share Link */}
          <button
            onClick={handleCopyShareLink}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition cursor-pointer"
            title="Sao chép liên kết trang tra cứu này để chia sẻ"
          >
            {copiedLink ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} />}
            <span>{copiedLink ? "Đã chép link!" : "Chia sẻ link"}</span>
          </button>

          {/* Bộ chọn ngôn ngữ Song ngữ / English */}
          <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-100 dark:bg-slate-800/80 text-xs font-semibold">
            <button
              onClick={() => handleToggleLanguage("vi")}
              className={`px-2.5 py-1 rounded-md transition flex items-center gap-1 ${
                languageMode === "vi"
                  ? "bg-white dark:bg-blue-600 text-blue-700 dark:text-white shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
              }`}
            >
              <span>🇻🇳</span>
              <span className="hidden md:inline">Song ngữ</span>
            </button>
            <button
              onClick={() => handleToggleLanguage("en")}
              className={`px-2.5 py-1 rounded-md transition flex items-center gap-1 ${
                languageMode === "en"
                  ? "bg-blue-600 text-white shadow-xs font-bold"
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

      {/* 2. BODY CHÍNH (Full width, rộng mở tối đa màn hình) */}
      <main className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 space-y-6">
        
        {/* Banner tiêu đề giới thiệu */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-blue-800/40">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <Sparkles size={13} className="text-amber-400" />
              <span>Hệ thống Thẩm định Tạp chí Khoa học & Cảnh báo Sớm</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Tra cứu phân vị Scopus, Web of Science, ABDC & Khung điểm HĐGSNN
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Xác thực tức thì độ tin cậy của tạp chí khoa học trước khi nộp bài: Kiểm tra chỉ số SJR, phân hạng Q1–Q4, danh sách tạp chí bị loại khỏi Scopus <em>(Discontinued)</em>, bị WoS loại <em>(Delisted/On Hold)</em>, tạp chí bị cướp tên miền <em>(Hijacked)</em> và số lượng bài bị rút từ <em>Retraction Watch</em>.
            </p>

            {/* Quick Stats Pill */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-300">
              <span className="px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur border border-white/10">
                📚 <strong>31.753</strong> Tạp chí Scopus SJR
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200">
                ⚠️ <strong>1.169</strong> Tạp chí bị Scopus loại
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-200">
                🏆 <strong>2.648</strong> Tạp chí xếp hạng ABDC
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-200">
                🇻🇳 <strong>663</strong> Tạp chí tính điểm HĐGSNN
              </span>
            </div>
          </div>
        </div>

        {/* Thanh tìm kiếm chính & Bộ lọc */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="relative flex items-center">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setActiveFilter("all");
              }}
              placeholder={
                isEn
                  ? "Search by ISSN (0148-2963), acronym (JABES, JBR, VJCS) or journal title..."
                  : "Tra cứu theo mã ISSN (vd: 0148-2963), tên viết tắt (JABES, JBR, VJCS) hoặc tên tạp chí..."
              }
              className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900 text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-xs"
            />
            {searchTerm && (
              <button
                onClick={handleResetSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition"
                title="Xóa tìm kiếm"
              >
                <X size={16} />
              </button>
            )}
            {loading && (
              <div className="absolute right-12 top-1/2 -translate-y-1/2">
                <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
              </div>
            )}
          </div>

          {/* Quick Filter Tags */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
              <Sparkles size={13} className="text-amber-500" />
              Chế độ xem nhanh:
            </span>

            <button
              onClick={() => handleQuickFilter("vn16")}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer border flex items-center gap-1.5 ${
                activeFilter === "vn16"
                  ? "bg-blue-600 text-white border-blue-600 shadow-xs font-semibold"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400"
              }`}
            >
              <span>🇻🇳</span>
              <span>16 Tạp chí VN trong Scopus / WoS</span>
            </button>

            <button
              onClick={() => handleQuickFilter("discontinued_biz")}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer border flex items-center gap-1.5 ${
                activeFilter === "discontinued_biz"
                  ? "bg-red-600 text-white border-red-600 shadow-xs font-semibold"
                  : "bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50 hover:border-red-400"
              }`}
            >
              <FileWarning size={14} />
              <span>Tạp chí Kinh tế bị Scopus loại</span>
            </button>

            {/* Keyword chips */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 ml-auto">
              <span>Gợi ý tra cứu:</span>
              {["JABES", "JBR", "0148-2963", "VJCS", "Kinh tế và Phát triển"].map((kw) => (
                <button
                  key={kw}
                  onClick={() => {
                    setSearchTerm(kw);
                    setActiveFilter("all");
                    handleSearch(kw);
                  }}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 font-mono text-[11px] transition cursor-pointer"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. VÙNG KẾT QUẢ TRA CỨU */}
        <section className="space-y-4">
          {searchResponse && (
            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 dark:text-slate-400 px-1">
              <span>
                Tìm thấy <strong className="text-slate-900 dark:text-white font-bold">{searchResponse.totalFound}</strong> kết quả tạp chí
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {activeFilter === "discontinued_biz"
                  ? "Danh mục Scopus Discontinued (T9/2026)"
                  : "Dữ liệu CSDL: Cập nhật T9/2026"}
              </span>
            </div>
          )}

          {/* Lưới kết quả Responsive Grid 2 cột trên màn hình rộng */}
          {searchResponse?.results && searchResponse.results.length > 0 ? (
            <div className={searchResponse.results.length > 1 ? "grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6" : "space-y-4"}>
              {searchResponse.results.map((item) => (
                <JournalVerificationCard key={item.id} item={item} />
              ))}
            </div>
          ) : searchResponse && searchResponse.totalFound === 0 ? (
            <div className="text-center py-16 px-4 bg-white dark:bg-[#0c1222] rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
              <Info className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">
                Không tìm thấy tạp chí nào khớp với từ khóa
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
                Hãy thử kiểm tra lại mã số ISSN (vd: 0148-2963), tên viết tắt tiếng Anh (JABES, JBR) hoặc một phần tên tạp chí.
              </p>

              {searchResponse.didYouMean && searchResponse.didYouMean.length > 0 && (
                <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 max-w-lg mx-auto">
                  <span className="text-xs text-slate-500 mr-2">Gợi ý gần đúng:</span>
                  <div className="inline-flex flex-wrap gap-2 mt-2">
                    {searchResponse.didYouMean.map((title, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchTerm(title);
                          handleSearch(title);
                        }}
                        className="px-3 py-1 rounded-lg text-xs bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 font-medium transition cursor-pointer"
                      >
                        {title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </section>

        {/* 4. FOOTER CARD KẾT NỐI ZALO BOT KÈM MÃ QR CODE */}
        <section className="pt-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white shadow-2xl relative overflow-hidden border border-blue-800/60">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
              {/* QR Code Container */}
              <div className="p-3.5 bg-white rounded-2xl shadow-xl shrink-0 flex flex-col items-center group">
                <img
                  src="/images/zalo-bot-qr.svg"
                  alt="QR Code Zalo Bot Tra Cứu Tạp Chí"
                  className="w-36 h-36 sm:w-40 sm:h-40 object-contain group-hover:scale-105 transition-transform duration-200"
                />
                <span className="text-[11px] font-bold text-slate-800 mt-2 uppercase tracking-wider flex items-center gap-1.5">
                  <QrCode size={13} className="text-blue-600" />
                  Quét mã trên Zalo
                </span>
              </div>

              {/* Nội dung và Nút hành động */}
              <div className="flex-1 text-center lg:text-left space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
                  <span>🤖 ZALO BOT TRA CỨU TẠP CHÍ & CẢNH BÁO TỰ ĐỘNG</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Đồng bộ tra cứu & nhận cảnh báo bài bị rút ngay trong Zalo mỗi ngày
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                  Quét mã QR bằng ứng dụng Zalo trên điện thoại hoặc bấm nút mở bên dưới để kết nối với Bot Zalo. Bạn có thể nhắn tin tra cứu nhanh ISSN, phân vị Scopus, chỉ số SJR, ABDC và nhận cảnh báo sớm nguy cơ tạp chí bị loại khỏi Scopus/WoS hoàn toàn tự động và miễn phí.
                </p>

                <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <a
                    href="https://bot.zaloplatforms.com/bots/916143010038410261"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-sm transition flex items-center gap-2 shadow-lg shadow-blue-500/30 cursor-pointer"
                  >
                    <span>Mở Bot trên Zalo (bot.zaloplatforms.com)</span>
                    <ExternalLink size={16} />
                  </a>

                  <div className="text-xs text-slate-400">
                    ID Bot Zalo: <strong className="font-mono text-slate-200 text-sm">916143010038410261</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 5. BOTTOM FOOTER */}
      <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2">
        <p>
          Hệ thống Thẩm định Tạp chí Khoa học & Từ điển Phương pháp Nghiên cứu Khoa học chuẩn mực quốc tế.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
          <Link href="/" className="hover:text-blue-600 transition">Không gian Tra cứu Từ điển (/)</Link>
          <span>•</span>
          <Link href="/home" className="hover:text-blue-600 transition">Trang chủ Giới thiệu (/home)</Link>
          <span>•</span>
          <Link href="/hall-of-fame" className="hover:text-blue-600 transition">Bảng Vinh danh Học giả</Link>
          <span>•</span>
          <a
            href="https://bot.zaloplatforms.com/bots/916143010038410261"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-600 transition flex items-center gap-1"
          >
            <span>Zalo Bot ↗</span>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default function JournalSearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 dark:bg-[#070B14] flex items-center justify-center">
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>Đang tải Cổng Tra cứu Tạp chí...</span>
          </div>
        </div>
      }
    >
      <JournalSearchContent />
    </Suspense>
  );
}
