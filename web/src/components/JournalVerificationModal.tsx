"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  X,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
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
  Maximize2,
  Minimize2
} from "lucide-react";
import { JournalItemResult, JournalSearchResponse } from "@/lib/journal-search";
import JournalVerificationCard from "./JournalVerificationCard";

interface JournalVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  languageMode?: "vi" | "en";
}

export default function JournalVerificationModal({
  isOpen,
  onClose,
  languageMode = "vi"
}: JournalVerificationModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResponse, setSearchResponse] = useState<JournalSearchResponse | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "vn16" | "discontinued_biz">("all");
  const [isFullscreen, setIsFullscreen] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const isEn = languageMode === "en";

  // Tự động focus ô tìm kiếm khi mở Modal
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      // Mặc định tải sẵn 16 tạp chí Việt Nam trong Scopus để người dùng không bị trống màn hình
      if (!searchResponse) {
        handleQuickFilter("vn16");
      }
    }
  }, [isOpen]);

  // Lắng nghe phím ESC để đóng Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearch = async (queryText: string, mode?: string) => {
    const q = queryText.trim();
    if (!q && !mode) {
      setSearchResponse(null);
      return;
    }

    setLoading(true);
    try {
      const url = mode
        ? `/api/journals/search?mode=${encodeURIComponent(mode)}`
        : `/api/journals/search?q=${encodeURIComponent(q)}`;
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

  // Debounced search khi người dùng gõ
  useEffect(() => {
    if (activeFilter !== "all") return;
    const q = searchTerm.trim();
    if (q.length < 2) {
      return;
    }
    const timer = setTimeout(() => {
      handleSearch(q);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchTerm, activeFilter]);

  const handleQuickFilter = (mode: "vn16" | "discontinued_biz") => {
    setActiveFilter(mode);
    setSearchTerm("");
    handleSearch("", mode);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setActiveFilter("all");
    setSearchResponse(null);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-slate-900/75 dark:bg-black/85 backdrop-blur-md flex items-center justify-center transition-all duration-200 ${
        isFullscreen ? "p-0 sm:p-2 lg:p-3" : "p-3 sm:p-4 md:p-6"
      }`}
    >
      <div
        className={`bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col transition-all duration-200 animate-in fade-in zoom-in-95 ${
          isFullscreen
            ? "w-full h-full sm:h-[98vh] max-w-full rounded-none sm:rounded-2xl"
            : "w-full max-w-5xl h-[92vh] max-h-[92vh] rounded-2xl"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Modal Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800/80 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-white dark:from-[#0d162d] dark:via-[#0c1222] dark:to-[#0c1222] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-600 dark:bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
              <BookOpen size={20} className="text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight truncate">
                  {isEn ? "Journal Integrity & Index Verification" : "Hệ thống Tra cứu & Thẩm định Tạp chí Khoa học"}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-700 shrink-0">
                  Scopus • WoS • HĐGSNN
                </span>
                <span className="hidden xl:inline text-[11px] font-mono text-slate-400 dark:text-slate-500">
                  (Dữ liệu Zalo Bot tự động)
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate hidden sm:block">
                {isEn
                  ? "Verify Scopus Quartile (Q1–Q4), WoS status, Discontinued risk, ABDC rank & HĐGSNN criteria"
                  : "Kiểm tra phân vị Scopus (Q1–Q4), Cảnh báo loại trừ, Giả mạo tên miền, ABDC và khung điểm HĐGSNN"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Nút Phóng to tối đa / Thu gọn */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title={isFullscreen ? "Thu nhỏ cửa sổ" : "Mở rộng tối đa màn hình"}
            >
              {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
            </button>

            {/* Nút Đóng */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer"
              title="Đóng (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* 2. Search Box & Quick Tags */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 shrink-0 space-y-3">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
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
                  ? "Enter ISSN (e.g. 0148-2963), acronym (JABES, JBR, VJCS) or journal title..."
                  : "Nhập mã ISSN (vd: 0148-2963), tên viết tắt (JABES, JBR, VJCS) hoặc tên tạp chí..."
              }
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/90 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-xs"
            />
            {searchTerm && (
              <button
                onClick={handleResetSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition"
                title="Xóa tìm kiếm"
              >
                <X size={14} />
              </button>
            )}
            {loading && (
              <div className="absolute right-10 top-1/2 -translate-y-1/2">
                <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" />
              </div>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
              <Sparkles size={12} className="text-amber-500" />
              {isEn ? "Quick Views:" : "Khám phá nhanh:"}
            </span>
            <button
              onClick={() => handleQuickFilter("vn16")}
              className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer border flex items-center gap-1.5 ${
                activeFilter === "vn16"
                  ? "bg-blue-600 text-white border-blue-600 shadow-xs font-semibold"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400"
              }`}
            >
              <span>🇻🇳</span>
              <span>{isEn ? "16 VN Journals in Scopus/WoS" : "16 Tạp chí VN trong Scopus"}</span>
            </button>

            <button
              onClick={() => handleQuickFilter("discontinued_biz")}
              className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer border flex items-center gap-1.5 ${
                activeFilter === "discontinued_biz"
                  ? "bg-red-600 text-white border-red-600 shadow-xs font-semibold"
                  : "bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50 hover:border-red-400"
              }`}
            >
              <FileWarning size={13} />
              <span>{isEn ? "Scopus Delisted in Business/Econ" : "Tạp chí Kinh tế bị Scopus loại"}</span>
            </button>

            {/* Quick search keywords */}
            <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 ml-auto">
              <span>Gợi ý:</span>
              <button
                onClick={() => {
                  setSearchTerm("JABES");
                  setActiveFilter("all");
                  handleSearch("JABES");
                }}
                className="hover:text-blue-600 underline font-mono"
              >
                JABES
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  setSearchTerm("JBR");
                  setActiveFilter("all");
                  handleSearch("JBR");
                }}
                className="hover:text-blue-600 underline font-mono"
              >
                JBR
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  setSearchTerm("0148-2963");
                  setActiveFilter("all");
                  handleSearch("0148-2963");
                }}
                className="hover:text-blue-600 underline font-mono"
              >
                0148-2963
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  setSearchTerm("Kinh tế và Phát triển");
                  setActiveFilter("all");
                  handleSearch("Kinh tế và Phát triển");
                }}
                className="hover:text-blue-600 underline font-mono"
              >
                Kinh tế & Phát triển
              </button>
            </div>
          </div>
        </div>

        {/* 3. Results Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {searchResponse && (
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-1">
              <span>
                {isEn ? "Found" : "Tìm thấy"}{" "}
                <strong className="text-slate-900 dark:text-white">{searchResponse.totalFound}</strong>{" "}
                {isEn ? "journal results" : "kết quả tạp chí"}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {searchResponse.scopusVersion}
              </span>
            </div>
          )}

          {/* Danh sách thẻ Tạp chí */}
          {searchResponse?.results && searchResponse.results.length > 0 ? (
            <div className={searchResponse.results.length > 1 ? "grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6" : "space-y-4"}>
              {searchResponse.results.map((item) => (
                <JournalVerificationCard key={item.id} item={item} />
              ))}
            </div>
          ) : searchResponse && searchResponse.totalFound === 0 ? (
            <div className="text-center py-10 px-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
              <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                {isEn ? "No journal matched your query" : "Không tìm thấy tạp chí phù hợp"}
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                {isEn
                  ? "Try searching by ISSN (e.g. 0148-2963), acronym (JABES, JBR) or partial journal name."
                  : "Hãy thử tra cứu theo mã số ISSN (vd: 0148-2963), tên viết tắt (JABES, JBR) hoặc một phần tên tạp chí."}
              </p>

              {searchResponse.didYouMean && searchResponse.didYouMean.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-500 mr-2">Có phải bạn muốn tìm:</span>
                  <div className="inline-flex flex-wrap gap-1.5 mt-1">
                    {searchResponse.didYouMean.map((title, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchTerm(title);
                          handleSearch(title);
                        }}
                        className="px-2.5 py-1 rounded-md text-xs bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition cursor-pointer"
                      >
                        {title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {/* 4. FOOTER CARD THEO YÊU CẦU: QR CODE & LINK DẪN TỚI ZALO BOT */}
          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80">
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white shadow-xl relative overflow-hidden border border-blue-800/50">
              {/* Subtle Ambient Glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 sm:gap-6">
                {/* QR Code Container */}
                <div className="p-2.5 bg-white rounded-xl shadow-lg shrink-0 flex flex-col items-center group">
                  <img
                    src="/images/zalo-bot-qr.svg"
                    alt="QR Code Zalo Bot Tra Cứu Tạp Chí"
                    className="w-28 h-28 sm:w-32 sm:h-32 object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                  <span className="text-[10px] font-bold text-slate-800 mt-1 uppercase tracking-wider flex items-center gap-1">
                    <QrCode size={11} className="text-blue-600" />
                    Quét mã Zalo
                  </span>
                </div>

                {/* Content & Action Button */}
                <div className="flex-1 text-center md:text-left space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
                    <span>🤖 Zalo Bot Thẩm Định Tạp Chí & Cảnh Báo Sớm</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold tracking-tight text-white">
                    Tra cứu tạp chí & nhận cảnh báo tự động ngay trên Zalo
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                    Quét mã QR bằng ứng dụng Zalo trên điện thoại hoặc mở liên kết bên dưới để nhắn tin tra cứu nhanh ISSN, phân vị Scopus, chỉ số SJR, ABDC và nhận cảnh báo bài bị rút <em>(Retraction Watch)</em> mỗi ngày hoàn toàn miễn phí.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <a
                      href="https://bot.zaloplatforms.com/bots/916143010038410261"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-2 shadow-lg shadow-blue-500/30 cursor-pointer"
                    >
                      <span>Mở Bot trên Zalo (bot.zaloplatforms.com)</span>
                      <ExternalLink size={14} />
                    </a>
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      ID Bot: <strong className="font-mono text-slate-300">916143010038410261</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Modal Bottom Footer Controls */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">
              Cơ sở dữ liệu: <strong>{searchResponse?.stats.totalScopus.toLocaleString() || "31.750+"}</strong> Scopus •{" "}
              <strong>{searchResponse?.stats.totalDiscontinued.toLocaleString() || "1.160+"}</strong> Bị loại •{" "}
              <strong>{searchResponse?.stats.totalHdgs.toLocaleString() || "660+"}</strong> HĐGSNN
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition cursor-pointer ml-auto"
          >
            Đóng (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}
