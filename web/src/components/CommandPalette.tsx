"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  BookOpen,
  ArrowRight,
  Sparkles,
  Shuffle,
  Globe,
  Maximize2,
  Bookmark,
  PlusCircle,
  Trophy,
  ShieldCheck,
  Clock,
  Trash2,
  X,
  CornerDownLeft,
  Command,
  Tag
} from "lucide-react";
import { MethodologyTerm, AcademicAcronym } from "@/lib/types";
import { SearchOutputItem } from "@/lib/search-engine";
import { getTermDomainTags, getTermDefinition } from "@/lib/monolingual-academic-data";

export interface RecentSearchItem {
  id: string;
  term: string;
  vietnamese?: string;
  doc_type?: "term" | "acronym";
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  terms: MethodologyTerm[];
  acronyms: Record<string, AcademicAcronym>;
  languageMode: "vi" | "en";
  onSelectTerm: (id: string) => void;
  onToggleLanguage: () => void;
  onToggleZenMode: () => void;
  onOpenNewTermModal: () => void;
  onFilterSaved: () => void;
  recentSearches: RecentSearchItem[];
  onClearRecentSearches: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  terms,
  acronyms,
  languageMode,
  onSelectTerm,
  onToggleLanguage,
  onToggleZenMode,
  onOpenNewTermModal,
  onFilterSaved,
  recentSearches,
  onClearRecentSearches
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus ô tìm kiếm khi mở modal
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Hành động nhanh (Quick Actions)
  const quickActions = useMemo(() => {
    return [
      {
        id: "action-random",
        type: "action" as const,
        title: languageMode === "en" ? "Random Methodological Term" : "Xem ngẫu nhiên một từ phương pháp luận",
        subtitle: languageMode === "en" ? "Jump to a random research concept" : "Khám phá ngẫu nhiên 1 trong 1,874 thuật ngữ chuẩn mực",
        icon: Shuffle,
        badge: "🎲 Khám phá",
        handler: () => {
          if (terms.length > 0) {
            const randomIndex = Math.floor(Math.random() * terms.length);
            const target = terms[randomIndex];
            if (target) {
              onSelectTerm(target.id);
              onClose();
            }
          }
        }
      },
      {
        id: "action-toggle-lang",
        type: "action" as const,
        title: languageMode === "vi" ? "Chuyển sang bản Tiếng Anh (Monolingual English)" : "Switch to Bilingual English - Vietnamese",
        subtitle: languageMode === "vi" ? "Chuyển toàn bộ định nghĩa, bẫy từ và tranh luận sang Anh ngữ học thuật" : "Chuyển sang ấn bản song ngữ với đối chiếu dịch nghĩa tiếng Việt",
        icon: Globe,
        badge: "🌐 Ngôn ngữ",
        handler: () => {
          onToggleLanguage();
          onClose();
        }
      },
      {
        id: "action-zen-mode",
        type: "action" as const,
        title: languageMode === "en" ? "Toggle Focus / Zen Mode" : "Bật / Tắt Chế độ tập trung (Zen Mode)",
        subtitle: languageMode === "en" ? "Distraction-free reading view" : "Ẩn thanh điều hướng và lề, tối đa hóa không gian đọc học thuật",
        icon: Maximize2,
        badge: "🧘 Zen Mode",
        handler: () => {
          onToggleZenMode();
          onClose();
        }
      },
      {
        id: "action-bookmarks",
        type: "action" as const,
        title: languageMode === "en" ? "View Bookmarked Terms" : "Xem danh sách thuật ngữ đã lưu (Bookmarks)",
        subtitle: languageMode === "en" ? "Filter list to your saved research concepts" : "Mở nhanh các mục từ đã đánh dấu sao",
        icon: Bookmark,
        badge: "⭐ Đã lưu",
        handler: () => {
          onFilterSaved();
          onClose();
        }
      },
      {
        id: "action-new-term",
        type: "action" as const,
        title: languageMode === "en" ? "Propose New Methodology Term" : "Đề xuất bổ sung thuật ngữ phương pháp mới",
        subtitle: languageMode === "en" ? "Contribute a doctoral/Q1 research concept to the community" : "Đóng góp thuật ngữ chuẩn mực cho cộng đồng học thuật",
        icon: PlusCircle,
        badge: "➕ Đóng góp",
        handler: () => {
          onClose();
          onOpenNewTermModal();
        }
      }
    ];
  }, [languageMode, terms, onSelectTerm, onClose, onToggleLanguage, onToggleZenMode, onFilterSaved, onOpenNewTermModal]);

  // Danh mục chuyên ngành gợi ý để lọc nhanh
  const domainSuggestions = useMemo(() => {
    return [
      "Kinh tế lượng",
      "Mô hình SEM/PLS-SEM",
      "Thực nghiệm",
      "Định tính",
      "Thiết kế thang đo",
      "Hành vi người tiêu dùng"
    ];
  }, []);

  // Lọc kết quả tìm kiếm tức thì
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    // Tìm trong Actions
    const matchingActions = quickActions.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.badge.toLowerCase().includes(q)
    );

    // Tìm trong Acronyms
    const matchingAcronyms: {
      id: string;
      type: "acronym";
      term: string;
      vietnamese: string;
      domain: string;
      snippet: string;
      key: string;
    }[] = [];

    for (const [key, val] of Object.entries(acronyms)) {
      if (
        key.toLowerCase().includes(q) ||
        val.full_name.toLowerCase().includes(q) ||
        val.vietnamese.toLowerCase().includes(q)
      ) {
        matchingAcronyms.push({
          id: `acronym-${key.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
          type: "acronym",
          key,
          term: `${key} - ${val.full_name}`,
          vietnamese: val.vietnamese,
          domain: "Từ viết tắt",
          snippet: val.purpose
        });
      }
      if (matchingAcronyms.length >= 5) break;
    }

    // Tìm trong Terms
    const matchingTerms: {
      id: string;
      type: "term";
      term: string;
      vietnamese: string;
      domain: string;
      snippet: string;
    }[] = [];

    for (const t of terms) {
      const matchTerm = t.term.toLowerCase().includes(q);
      const matchVn = t.vietnamese?.toLowerCase().includes(q);
      const matchVariants = t.vietnamese_variants?.some((v) => v.toLowerCase().includes(q));
      const matchDomain = t.domain_tags?.some((d) => d.toLowerCase().includes(q)) || t.category?.toLowerCase().includes(q);

      if (matchTerm || matchVn || matchVariants || matchDomain) {
        matchingTerms.push({
          id: t.id,
          type: "term",
          term: t.term,
          vietnamese: languageMode === "en" ? "" : t.vietnamese,
          domain: languageMode === "en" ? (getTermDomainTags(t, "en")[0] || "Methodology") : (t.category || t.domain_tags[0] || "Phương pháp"),
          snippet: languageMode === "en" ? getTermDefinition(t, "en") : t.core_definition
        });
      }
      if (matchingTerms.length >= 15) break;
    }

    return [...matchingActions, ...matchingAcronyms, ...matchingTerms];
  }, [query, quickActions, acronyms, terms, languageMode]);

  // Danh sách hiển thị hiện tại để điều hướng bằng phím
  const displayedItems = useMemo(() => {
    if (!query.trim()) {
      return quickActions;
    }
    return filteredResults;
  }, [query, quickActions, filteredResults]);

  // Điều khiển phím mũi tên & Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < displayedItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : displayedItems.length - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = displayedItems[selectedIndex];
        if (selected) {
          if ("handler" in selected && typeof selected.handler === "function") {
            selected.handler();
          } else if ("id" in selected) {
            onSelectTerm(selected.id);
            onClose();
          }
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, displayedItems, selectedIndex, onSelectTerm, onClose]);

  // Tự động cuộn theo phần tử được chọn
  useEffect(() => {
    if (listRef.current) {
      const activeElement = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[8vh] sm:pt-[12vh] px-3 sm:px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[78vh] transition-all transform animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* THANH TÌM KIẾM CHÍNH CỦA COMMAND PALETTE */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3 bg-slate-50/50 dark:bg-slate-900/50">
          <Search size={20} className="text-blue-600 dark:text-blue-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={
              languageMode === "en"
                ? "Type a term, acronym (e.g. AVE, SEM), or command..."
                : "Tra nhanh thuật ngữ, viết tắt (AVE, SEM, HTMT), hoặc lệnh..."
            }
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md"
            >
              <X size={16} />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* NỘI DUNG CUỘN */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-2 space-y-4 divide-y divide-slate-100 dark:divide-slate-800/60">
          {/* TRƯỜNG HỢP: CHƯA GÕ GÌ (Hiển thị Lịch sử gần đây, Thao tác nhanh & Danh mục) */}
          {!query.trim() && (
            <div className="space-y-4 pt-1">
              {/* 1. LỊCH SỬ TRA CỨU GẦN ĐÂY */}
              {recentSearches.length > 0 && (
                <div className="px-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-blue-600 dark:text-blue-400" />
                      {languageMode === "en" ? "Recent Searches" : "Đã tra cứu gần đây"}
                    </span>
                    <button
                      onClick={onClearRecentSearches}
                      className="text-[11px] text-slate-400 hover:text-red-500 transition flex items-center gap-1 font-normal lowercase"
                      title="Xóa toàn bộ lịch sử"
                    >
                      <Trash2 size={11} /> {languageMode === "en" ? "Clear" : "Xóa"}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectTerm(item.id);
                          onClose();
                        }}
                        className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-300 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 transition flex items-center gap-1.5"
                      >
                        <span className="font-medium">{item.term}</span>
                        {item.vietnamese && (
                          <span className="text-[11px] text-slate-400 truncate max-w-[120px]">
                            • {item.vietnamese}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. THAO TÁC NHANH (QUICK ACTIONS) */}
              <div className="px-2">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-amber-500" />
                  {languageMode === "en" ? "Quick Actions" : "Lệnh & Thao tác nhanh"}
                </div>
                <div className="space-y-1">
                  {quickActions.map((action, idx) => {
                    const isSelected = selectedIndex === idx;
                    const ActionIcon = action.icon;
                    return (
                      <button
                        key={action.id}
                        data-index={idx}
                        onClick={action.handler}
                        className={`w-full text-left p-2.5 rounded-xl transition flex items-center justify-between gap-3 ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-sm"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`p-2 rounded-lg shrink-0 ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                            }`}
                          >
                            <ActionIcon size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold truncate">{action.title}</p>
                            <p
                              className={`text-xs truncate ${
                                isSelected ? "text-blue-100" : "text-slate-400 dark:text-slate-500"
                              }`}
                            >
                              {action.subtitle}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`shrink-0 text-[11px] px-2 py-0.5 rounded-md font-medium ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          {action.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. LỌC THEO CHUYÊN NGÀNH */}
              <div className="px-2 pt-2">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Tag size={13} className="text-indigo-500" />
                  {languageMode === "en" ? "Explore by Domain" : "Khám phá theo lĩnh vực"}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {domainSuggestions.map((dom) => (
                    <button
                      key={dom}
                      onClick={() => setQuery(dom)}
                      className="px-2.5 py-1 text-xs rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-300 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 transition"
                    >
                      {dom}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TRƯỜNG HỢP: ĐÃ GÕ TỪ KHÓA (Hiển thị kết quả tra cứu) */}
          {query.trim() && (
            <div className="space-y-1 pt-1">
              {filteredResults.length === 0 ? (
                <div className="p-8 text-center text-slate-400 space-y-2">
                  <BookOpen size={32} className="mx-auto text-slate-300 dark:text-slate-600" />
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {languageMode === "en" ? "No matching academic terms found" : "Không tìm thấy thuật ngữ phù hợp"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {languageMode === "en"
                      ? "Try searching by English name, Vietnamese keyword, or standard acronym"
                      : "Thử tìm bằng tên tiếng Anh, từ khóa tiếng Việt hoặc từ viết tắt chuẩn"}
                  </p>
                </div>
              ) : (
                filteredResults.map((item, idx) => {
                  const isSelected = selectedIndex === idx;

                  // Mục là Quick Action
                  if ("handler" in item) {
                    const ActionIcon = item.icon;
                    return (
                      <button
                        key={item.id}
                        data-index={idx}
                        onClick={item.handler}
                        className={`w-full text-left p-2.5 rounded-xl transition flex items-center justify-between gap-3 ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-sm"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`p-2 rounded-lg shrink-0 ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                            }`}
                          >
                            <ActionIcon size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold truncate">{item.title}</p>
                            <p
                              className={`text-xs truncate ${
                                isSelected ? "text-blue-100" : "text-slate-400 dark:text-slate-500"
                              }`}
                            >
                              {item.subtitle}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`shrink-0 text-[11px] px-2 py-0.5 rounded-md font-medium ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          {item.badge}
                        </span>
                      </button>
                    );
                  }

                  // Mục là Term hoặc Acronym
                  return (
                    <button
                      key={item.id}
                      data-index={idx}
                      onClick={() => {
                        onSelectTerm(item.id);
                        onClose();
                      }}
                      className={`w-full text-left p-3 rounded-xl transition flex items-center justify-between gap-3 ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-sm"
                          : "hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold tracking-tight truncate">
                            {item.term}
                          </span>
                          {item.type === "acronym" ? (
                            <span
                              className={`shrink-0 text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                                isSelected
                                  ? "bg-white/20 text-white border-white/40"
                                  : "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900"
                              }`}
                            >
                              ACR
                            </span>
                          ) : (
                            <span
                              className={`shrink-0 text-[10px] px-1.5 py-0.2 rounded ${
                                isSelected
                                  ? "bg-white/20 text-white"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                              }`}
                            >
                              {item.domain}
                            </span>
                          )}
                        </div>

                        {item.vietnamese && (
                          <p
                            className={`text-xs truncate ${
                              isSelected ? "text-blue-100" : "text-slate-600 dark:text-slate-400"
                            }`}
                          >
                            {item.vietnamese}
                          </p>
                        )}

                        <p
                          className={`text-xs line-clamp-1 font-serif ${
                            isSelected ? "text-blue-100/80" : "text-slate-400 dark:text-slate-500"
                          }`}
                        >
                          {item.snippet}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center">
                        <CornerDownLeft
                          size={14}
                          className={isSelected ? "text-white" : "text-slate-300 dark:text-slate-600"}
                        />
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* CHÂN MODAL: HƯỚNG DẪN PHÍM TẮT ĐIỀU HƯỚNG */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">↓</kbd>
              <span>{languageMode === "en" ? "Navigate" : "Di chuyển"}</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">↵</kbd>
              <span>{languageMode === "en" ? "Select" : "Mở"}</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">ESC</kbd>
              <span>{languageMode === "en" ? "Close" : "Đóng"}</span>
            </span>
          </div>

          <div className="font-mono text-[11px] text-slate-400">
            1,874 {languageMode === "en" ? "Flagship Terms" : "Mục từ Chuẩn mực"}
          </div>
        </div>
      </div>
    </div>
  );
}
