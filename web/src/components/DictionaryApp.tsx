"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Volume2,
  Copy,
  Check,
  Bookmark,
  Star,
  Share2,
  Printer,
  Maximize2,
  Minimize2,
  Type,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Sparkles,
  AlertTriangle,
  ExternalLink,
  Tag,
  GraduationCap,
  Layers,
  ArrowRight,
  X,
  FileText,
  VolumeX,
  Link as LinkIcon,
  LogIn,
  LogOut,
  MessageSquarePlus,
  User as UserIcon,
  Globe,
  GitPullRequest,
  PlusCircle,
  Edit3,
  ShieldCheck,
  Clock,
  MessageSquare,
  Trophy,
  Award,
  Users
} from "lucide-react";
import { MethodologyTerm, AcademicAcronym, SearchItem } from "@/lib/types";
import { getSearchEngine, SearchOutputItem } from "@/lib/search-engine";
import { speakAcademicTerm } from "@/lib/speech-helper";
import CitationModal from "./CitationModal";
import { FeedbackModal } from "./FeedbackModal";
import EditTermModal from "./EditTermModal";
import NewTermModal from "./NewTermModal";
import TermHistoryView from "./TermHistoryView";
import TermDiscussionView from "./TermDiscussionView";
import LoginModal from "./LoginModal";
import {
  UI_I18N,
  getTermDefinition,
  getTermBenchmarks,
  getTermPitfalls,
  getTermDebates,
  getTermDomainTags,
  getAcronymPurpose,
  getAcronymBenchmark,
  getAcronymDomain
} from "@/lib/monolingual-academic-data";
import { 
  loginWithGoogle, 
  logoutUser, 
  subscribeToAuth, 
  fetchUserBookmarks, 
  toggleUserBookmark 
} from "@/lib/firebase-service";
import type { User } from "firebase/auth";

interface DictionaryAppProps {
  initialTerms: MethodologyTerm[];
  initialAcronyms: Record<string, AcademicAcronym>;
}

export default function DictionaryApp({
  initialTerms,
  initialAcronyms
}: DictionaryAppProps) {
  // State tìm kiếm & danh sách
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(
    initialTerms[0]?.id || ""
  );
  const [filterType, setFilterType] = useState<"all" | "term" | "acronym" | "saved">("all");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isZenMode, setIsZenMode] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<"list" | "detail">("detail");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isCitationModalOpen, setIsCitationModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Wiki Community Contribution State (Phase 1 & Phase 3)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editSection, setEditSection] = useState<"all" | "definition" | "benchmarks" | "pitfalls" | "debates" | "citations">("all");
  const [isNewTermModalOpen, setIsNewTermModalOpen] = useState(false);
  const [termSubTab, setTermSubTab] = useState<"article" | "history" | "talk">("article");

  const handleOpenSectionEdit = (section: "all" | "definition" | "benchmarks" | "pitfalls" | "debates" | "citations") => {
    setEditSection(section);
    setIsEditModalOpen(true);
  };
  
  // Phiên bản ngôn ngữ: 'vi' (Anh - Việt) hoặc 'en' (Anh - Anh thuần túy)
  const [languageMode, setLanguageMode] = useState<"vi" | "en">("vi");
  const t = UI_I18N[languageMode];

  // Firebase Auth & Cloud Bookmarks
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [authLoading, setAuthLoading] = useState(false);

  // Lắng nghe trạng thái đăng nhập và tải Bookmarks & Ngôn ngữ đã lưu
  useEffect(() => {
    fetchUserBookmarks().then((bks) => setBookmarks(bks));

    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("rv_lexicon_mode");
      if (savedLang === "en" || savedLang === "vi") {
        setLanguageMode(savedLang);
      }
    }

    const unsubscribe = subscribeToAuth((user) => {
      setCurrentUser(user);
      if (user) {
        fetchUserBookmarks(user.uid).then((bks) => setBookmarks(bks));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleToggleLanguage = (mode: "vi" | "en") => {
    setLanguageMode(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("rv_lexicon_mode", mode);
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("lang", mode);
      window.history.replaceState(null, "", currentUrl.toString());
    }
  };

  const handleToggleBookmark = async (termId: string) => {
    const updated = await toggleUserBookmark(termId, bookmarks, currentUser?.uid);
    setBookmarks(updated);
  };

  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    try {
      const user = await loginWithGoogle();
      if (user) {
        setCurrentUser(user);
        const bks = await fetchUserBookmarks(user.uid);
        setBookmarks(bks);
      }
    } catch (err: any) {
      console.warn("Đăng nhập:", err);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
  };

  const searchInputRef = useRef<HTMLInputElement>(null);
  const contentScrollRef = useRef<HTMLDivElement>(null);
  const [readingProgress, setReadingProgress] = useState(0);

  // Khởi tạo search engine
  const searchEngine = useMemo(() => {
    const engine = getSearchEngine();
    if (engine.getCount() === 0) {
      engine.indexData(initialTerms, initialAcronyms);
    }
    return engine;
  }, [initialTerms, initialAcronyms]);

  // ĐỒNG BỘ URL LẦN ĐẦU TẢI TRANG (Deep URL Linking: ?term=slug hoặc ?q=search)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const termParam = params.get("term");
      const qParam = params.get("q");
      const langParam = params.get("lang");

      if (langParam === "en" || langParam === "vi") {
        setLanguageMode(langParam);
      }

      if (qParam) {
        setSearchQuery(qParam);
      }

      if (termParam) {
        const exists =
          initialTerms.some((t) => t.id === termParam) ||
          Object.keys(initialAcronyms).some(
            (k) => `acronym-${k.toLowerCase().replace(/[^a-z0-9]/g, "-")}` === termParam
          );
        if (exists) {
          setSelectedId(termParam);
        }
      }
    }
  }, [initialTerms, initialAcronyms]);

  // CẬP NHẬT URL KHI CHỌN TỪ (Không reload trang)
  useEffect(() => {
    if (typeof window !== "undefined" && selectedId) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("term", selectedId);
      currentUrl.searchParams.set("lang", languageMode);
      if (searchQuery) {
        currentUrl.searchParams.set("q", searchQuery);
      } else {
        currentUrl.searchParams.delete("q");
      }
      window.history.replaceState(null, "", currentUrl.toString());
    }
  }, [selectedId, searchQuery, languageMode]);

  // LUÔN CUỘN LÊN ĐỈNH KHI CHỌN MỤC TỪ MỚI
  useEffect(() => {
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    setReadingProgress(0);
    setTermSubTab("article");
  }, [selectedId]);

  // Kết quả tìm kiếm
  const searchResults: SearchOutputItem[] = useMemo(() => {
    if (!searchQuery.trim()) {
      const termItems: SearchOutputItem[] = initialTerms.map((t) => ({
        id: t.id,
        doc_type: "term",
        term: t.term,
        vietnamese: languageMode === "en" ? "" : t.vietnamese,
        domain: languageMode === "en" ? (getTermDomainTags(t, "en")[0] || "Methodology") : (t.domain_tags[0] || "Phương pháp"),
        snippet: languageMode === "en" 
          ? getTermDefinition(t, "en").slice(0, 110) + "..." 
          : t.core_definition.slice(0, 110) + "...",
        score: 1,
        raw_term: t
      }));

      const acronymItems: SearchOutputItem[] = Object.entries(initialAcronyms).map(
        ([key, val]) => ({
          id: `acronym-${key.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
          doc_type: "acronym",
          term: `${key} - ${val.full_name}`,
          vietnamese: languageMode === "en" ? "" : val.vietnamese,
          domain: languageMode === "en" ? getAcronymDomain(val, "en") : "Từ viết tắt",
          snippet: languageMode === "en"
            ? getAcronymPurpose(val, "en").slice(0, 110) + "..."
            : val.purpose.slice(0, 110) + "...",
          score: 1,
          raw_acronym: val
        })
      );

      const all = [...termItems, ...acronymItems].sort((a, b) =>
        a.term.localeCompare(b.term)
      );

      if (filterType === "term") return all.filter((i) => i.doc_type === "term");
      if (filterType === "acronym") return all.filter((i) => i.doc_type === "acronym");
      if (filterType === "saved") return all.filter((i) => bookmarks.includes(i.id));
      return all;
    }

    const rawRes = searchEngine.search(searchQuery, 100);
    const res = rawRes.map((item) => {
      if (languageMode === "en") {
        if (item.doc_type === "term" && item.raw_term) {
          return {
            ...item,
            vietnamese: "",
            domain: getTermDomainTags(item.raw_term, "en")[0] || "Methodology",
            snippet: getTermDefinition(item.raw_term, "en").slice(0, 110) + "..."
          };
        }
        if (item.doc_type === "acronym" && item.raw_acronym) {
          return {
            ...item,
            vietnamese: "",
            domain: getAcronymDomain(item.raw_acronym, "en"),
            snippet: getAcronymPurpose(item.raw_acronym, "en").slice(0, 110) + "..."
          };
        }
      }
      return item;
    });

    if (filterType === "term") return res.filter((i) => i.doc_type === "term");
    if (filterType === "acronym") return res.filter((i) => i.doc_type === "acronym");
    if (filterType === "saved") return res.filter((i) => bookmarks.includes(i.id));
    return res;
  }, [searchQuery, filterType, searchEngine, initialTerms, initialAcronyms, bookmarks, languageMode]);

  // Lấy mục từ chi tiết đang được chọn
  const activeTerm = useMemo(() => {
    return initialTerms.find((t) => t.id === selectedId);
  }, [initialTerms, selectedId]);

  const activeAcronym = useMemo(() => {
    if (selectedId.startsWith("acronym-")) {
      const key = Object.keys(initialAcronyms).find(
        (k) => `acronym-${k.toLowerCase().replace(/[^a-z0-9]/g, "-")}` === selectedId
      );
      return key ? { key, ...initialAcronyms[key] } : null;
    }
    return null;
  }, [initialAcronyms, selectedId]);

  // Dải chữ cái A-Z
  const alphabetLetters = useMemo(() => {
    const letters = new Set<string>();
    for (const item of searchResults) {
      const firstChar = item.term.charAt(0).toUpperCase();
      if (/[A-Z]/.test(firstChar)) {
        letters.add(firstChar);
      }
    }
    return Array.from(letters).sort();
  }, [searchResults]);

  // Nhảy tới chữ cái trong danh sách
  const scrollToLetter = (letter: string) => {
    const target = searchResults.find((item) =>
      item.term.toUpperCase().startsWith(letter)
    );
    if (target) {
      setSelectedId(target.id);
      const element = document.getElementById(`list-item-${target.id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  };

  // Điều khiển thanh tiến độ cuộn đọc
  const handleScroll = () => {
    if (contentScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentScrollRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    }
  };

  // Sao chép văn bản
  const handleCopy = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Sao chép liên kết chia sẻ trực tiếp
  const handleShareLink = () => {
    if (typeof window !== "undefined") {
      const url = window.location.href;
      handleCopy(url, "share_url");
    }
  };

  // Phát âm âm thanh
  const handlePronounce = (termText: string) => {
    setIsPlayingAudio(true);
    speakAcademicTerm(
      termText,
      "en-US",
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false),
      () => setIsPlayingAudio(false)
    );
  };

  // Đổi phông chữ
  const getFontSizeClass = () => {
    switch (fontSizeLevel) {
      case -1:
        return "text-sm";
      case 1:
        return "text-lg";
      case 2:
        return "text-xl";
      default:
        return "text-base";
    }
  };

  // Lắng nghe phím tắt: `/` (tìm kiếm), `Ctrl+B` (thu gọn sidebar), `F` (zen mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setIsSidebarCollapsed((prev) => !prev);
      }

      if (
        (e.key === "f" || e.key === "F") &&
        document.activeElement !== searchInputRef.current &&
        !e.ctrlKey &&
        !e.metaKey
      ) {
        e.preventDefault();
        setIsZenMode((prev) => !prev);
      }

      if (e.key === "Escape") {
        if (isCitationModalOpen) {
          setIsCitationModalOpen(false);
        } else if (isFeedbackModalOpen) {
          setIsFeedbackModalOpen(false);
        } else if (isLoginModalOpen) {
          setIsLoginModalOpen(false);
        } else if (isEditModalOpen) {
          setIsEditModalOpen(false);
        } else if (isNewTermModalOpen) {
          setIsNewTermModalOpen(false);
        } else if (isZenMode) {
          setIsZenMode(false);
        } else if (searchQuery) {
          setSearchQuery("");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isZenMode, searchQuery, isCitationModalOpen, isFeedbackModalOpen, isLoginModalOpen, isEditModalOpen, isNewTermModalOpen]);

  return (
    <div
      className={`h-screen h-dvh flex flex-col overflow-hidden ${
        isDarkMode ? "dark bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* 1. THANH HEADER TOÀN TRANG */}
      {!isZenMode && (
        <header className="no-print h-14 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur sticky top-0 z-40 px-3 sm:px-4 flex items-center justify-between gap-2">
          {/* Logo & Tên từ điển & Nút chuyển đổi Song ngữ / Tiếng Anh thời gian thực */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-sm shrink-0">
              R
            </div>
            <div className="min-w-0 flex items-center gap-2">
              <h1 className="font-bold text-xs sm:text-sm md:text-base tracking-tight text-slate-900 dark:text-white truncate">
                {t.app_title}
              </h1>
            </div>
          </div>

          {/* Thanh công cụ phải: Bộ chuyển ngôn ngữ Realtime, Góp ý, Phông chữ, Theme, Zen, Auth */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Realtime Language Switcher Pill [ 🇻🇳 Anh - Việt | 🌐 English ] */}
            <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-100 dark:bg-slate-800/80 text-xs font-semibold mr-1">
              <button
                onClick={() => handleToggleLanguage("vi")}
                className={`px-2 py-1 rounded-md transition flex items-center gap-1 ${
                  languageMode === "vi"
                    ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-xs font-bold"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
                title="Chuyển sang ấn bản Song ngữ Anh - Việt"
              >
                <span>🇻🇳</span>
                <span className="hidden md:inline">Anh - Việt</span>
              </button>
              <button
                onClick={() => handleToggleLanguage("en")}
                className={`px-2 py-1 rounded-md transition flex items-center gap-1 ${
                  languageMode === "en"
                    ? "bg-blue-600 text-white shadow-xs font-bold"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
                title="Switch to Monolingual Academic English Edition"
              >
                <Globe size={12} className={languageMode === "en" ? "text-white" : "text-slate-500"} />
                <span className="hidden md:inline">English</span>
              </button>
            </div>

            {/* Nút Góp ý học thuật toàn trang */}
            <button
              onClick={() => setIsFeedbackModalOpen(true)}
              className="px-2 py-1 sm:px-2.5 sm:py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 rounded-lg transition flex items-center gap-1"
              title={t.feedback_tooltip}
            >
              <MessageSquarePlus size={14} />
              <span className="hidden sm:inline">{t.feedback_button}</span>
            </button>

            {/* Nút chỉnh cỡ chữ A- / A+ */}
            <div className="hidden sm:flex items-center border border-slate-200 dark:border-slate-800 rounded-lg p-0.5 bg-slate-50 dark:bg-slate-800/60">
              <button
                onClick={() => setFontSizeLevel((prev) => Math.max(-1, prev - 1))}
                className="px-2 py-1 text-xs font-medium hover:bg-white dark:hover:bg-slate-700 rounded transition"
                title={t.font_decrease}
              >
                A-
              </button>
              <span className="text-xs text-slate-400 px-0.5">|</span>
              <button
                onClick={() => setFontSizeLevel((prev) => Math.min(2, prev + 1))}
                className="px-2 py-1 text-xs font-medium hover:bg-white dark:hover:bg-slate-700 rounded transition"
                title={t.font_increase}
              >
                A+
              </button>
            </div>

            {/* Chế độ Sáng / Tối */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title={isDarkMode ? t.mode_light : t.mode_dark}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Chế độ Zen Mode */}
            <button
              onClick={() => setIsZenMode(true)}
              className="p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition hidden md:inline-flex"
              title={t.zen_tooltip}
            >
              <Maximize2 size={16} />
            </button>

            {/* In ấn Ctrl + P */}
            <button
              onClick={() => window.print()}
              className="p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition hidden md:inline-flex"
              title={t.print_tooltip}
            >
              <Printer size={16} />
            </button>

            {/* Bảng Vinh danh Học giả (Scholarly Hall of Fame Phase 4) */}
            <Link
              href="/hall-of-fame"
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800 transition flex items-center gap-1 text-xs font-semibold"
              title={languageMode === "en" ? "Scholarly Hall of Fame" : "Bảng Vinh Danh Học Giả"}
            >
              <Trophy size={14} className="text-amber-500" />
              <span className="hidden md:inline">{languageMode === "en" ? "Hall of Fame" : "Vinh danh"}</span>
            </Link>

            {/* Hồ sơ Đóng góp & Chứng nhận (Phase 5) */}
            <Link
              href="/my-contributions"
              className="p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition hidden lg:inline-flex"
              title={languageMode === "en" ? "My Submissions & Certificates" : "Hồ sơ Đóng góp & Chứng nhận"}
            >
              <FileText size={16} className="text-slate-500 dark:text-slate-400" />
            </Link>

            {/* Bảng điều khiển Kiểm duyệt Học thuật (Wiki Moderation Phase 2) */}
            <Link
              href="/moderation"
              className="p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition hidden sm:inline-flex"
              title="Bảng điều khiển Kiểm duyệt Học thuật (Editorial Moderation Dashboard)"
            >
              <ShieldCheck size={16} className="text-blue-600 dark:text-blue-400" />
            </Link>

            {/* Google Authentication (Login / Profile) */}
            <div className="border-l border-slate-200 dark:border-slate-800 pl-1 sm:pl-1.5 ml-0.5">
              {currentUser ? (
                <div className="flex items-center gap-1.5">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || "User"}
                      className="w-7 h-7 rounded-full border border-blue-500 shadow-xs"
                      title={currentUser.displayName || currentUser.email || "User"}
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                      {currentUser.email ? currentUser.email[0].toUpperCase() : "U"}
                    </div>
                  )}
                  <Link
                    href="/my-contributions"
                    className="p-1 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition"
                    title={languageMode === "en" ? "My Submissions & Certificates" : "Hồ sơ Đóng góp & Chứng nhận của tôi"}
                  >
                    <FileText size={15} />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                    title={t.logout_tooltip}
                  >
                    <LogOut size={15} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  disabled={authLoading}
                  className="px-2 py-1 sm:px-2.5 sm:py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition flex items-center gap-1 shadow-xs"
                  title={t.login_tooltip}
                >
                  <LogIn size={13} className="text-blue-600 dark:text-blue-400" />
                  <span className="hidden sm:inline">{authLoading ? "..." : t.login_button}</span>
                </button>
              )}
            </div>
          </div>
        </header>
      )}

      {/* NÚT THOÁT ZEN MODE KHI ĐANG BẬT */}
      {isZenMode && (
        <button
          onClick={() => setIsZenMode(false)}
          className="no-print fixed top-4 right-4 z-50 p-2.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 backdrop-blur shadow-lg transition flex items-center gap-1.5 text-xs font-medium"
        >
          <Minimize2 size={15} /> {t.exit_zen}
        </button>
      )}

      {/* NÚT CHUYỂN TAB TRÊN ĐIỆN THOẠI DI ĐỘNG */}
      <div className="no-print sm:hidden flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-14 z-30">
        <button
          onClick={() => setMobileTab("list")}
          className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition ${
            mobileTab === "list"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-slate-500"
          }`}
        >
          {t.mobile_tab_list} ({searchResults.length})
        </button>
        <button
          onClick={() => setMobileTab("detail")}
          className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition ${
            mobileTab === "detail"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-slate-500"
          }`}
        >
          {t.mobile_tab_detail}
        </button>
      </div>

      {/* 2. KHUNG BỐ CỤC 2 CỘT CHÍNH (MAIN TWO-COLUMN WORKSPACE) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* ========================================================
            CỘT BÊN TRÁI (30%): DANH SÁCH TRA CỨU & BỘ CHỈ MỤC
            ======================================================== */}
        <aside
          className={`no-print border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-full transition-all duration-200 ${
            isSidebarCollapsed ? "w-0 overflow-hidden border-none" : "w-full sm:w-80 md:w-96"
          } ${mobileTab === "detail" ? "hidden sm:flex" : "flex"}`}
        >
          {/* Ô Tìm kiếm ghim đầu danh sách */}
          <div className="shrink-0 p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.search_placeholder}
                className="w-full pl-9 pr-8 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Bộ lọc Tab & Số đếm */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800 p-0.5 rounded-md">
                <button
                  onClick={() => setFilterType("all")}
                  className={`px-2 py-0.5 rounded font-medium transition ${
                    filterType === "all"
                      ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {t.tab_all}
                </button>
                <button
                  onClick={() => setFilterType("term")}
                  className={`px-2 py-0.5 rounded font-medium transition ${
                    filterType === "term"
                      ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {t.tab_terms}
                </button>
                <button
                  onClick={() => setFilterType("acronym")}
                  className={`px-2 py-0.5 rounded font-medium transition ${
                    filterType === "acronym"
                      ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {t.tab_acronyms}
                </button>
                <button
                  onClick={() => setFilterType("saved")}
                  className={`px-2 py-0.5 rounded font-medium transition flex items-center gap-1 ${
                    filterType === "saved"
                      ? "bg-amber-400 text-amber-950 shadow-xs font-semibold"
                      : "text-amber-600 dark:text-amber-400"
                  }`}
                  title={languageMode === "vi" ? "Danh sách các thuật ngữ đã lưu của bạn" : "Your bookmarked items"}
                >
                  <Star size={11} className={filterType === "saved" ? "fill-amber-950" : "fill-amber-400"} />
                  <span>{t.tab_saved} ({bookmarks.length})</span>
                </button>
              </div>

              <span className="text-slate-400 text-[11px] font-mono">
                {searchResults.length} {t.terms_count}
              </span>
            </div>

            {/* Nút Đề xuất thuật ngữ mới (Wiki Contribution Phase 1) */}
            <button
              onClick={() => setIsNewTermModalOpen(true)}
              className="w-full py-1.5 px-2.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 rounded-lg transition flex items-center justify-center gap-1.5 shadow-xs"
              title={t.tooltip_new_term}
            >
              <PlusCircle size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span>{t.btn_new_term}</span>
            </button>
          </div>

          {/* Dải nhảy nhanh A-Z */}
          {alphabetLetters.length > 0 && (
            <div className="shrink-0 px-2 py-1.5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/40 flex items-center gap-1 overflow-x-auto text-[11px] font-mono scrollbar-none">
              {alphabetLetters.map((l) => (
                <button
                  key={l}
                  onClick={() => scrollToLetter(l)}
                  className="px-1.5 py-0.5 rounded text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition"
                >
                  {l}
                </button>
              ))}
            </div>
          )}

          {/* Danh sách mục từ cuộn độc lập */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {searchResults.length === 0 ? (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <BookOpen size={28} className="mx-auto text-slate-300 dark:text-slate-600" />
                <p className="text-sm font-medium">{t.empty_search_title}</p>
                <p className="text-xs">
                  {filterType === "saved" ? t.empty_saved_desc : t.empty_search_desc}
                </p>
              </div>
            ) : (
              searchResults.map((item, idx) => {
                const isSelected = item.id === selectedId;
                const isBookmarked = bookmarks.includes(item.id);
                return (
                  <button
                    key={item.id}
                    id={`list-item-${item.id}`}
                    onClick={() => {
                      setSelectedId(item.id);
                      setMobileTab("detail");
                    }}
                    className={`w-full text-left p-3 transition flex flex-col gap-1 ${
                      isSelected
                        ? "bg-blue-50/80 dark:bg-blue-950/40 border-l-4 border-blue-600 pl-2.5"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        {isBookmarked && (
                          <Star size={12} className="shrink-0 fill-amber-400 text-amber-500" />
                        )}
                        <span
                          className={`text-sm font-semibold tracking-tight truncate ${
                            isSelected
                              ? "text-blue-700 dark:text-blue-300"
                              : "text-slate-800 dark:text-slate-200"
                          }`}
                        >
                          {item.term}
                        </span>
                      </div>
                      {item.doc_type === "acronym" ? (
                        <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                          ACR
                        </span>
                      ) : (
                        <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {idx + 1}
                        </span>
                      )}
                    </div>
                    {/* Ở chế độ tiếng Việt: hiển thị nghĩa tiếng Việt; Ở chế độ English: hiển thị đoạn trích nghĩa tiếng Anh */}
                    {languageMode === "vi" ? (
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                        {item.vietnamese}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 font-serif">
                        {item.snippet}
                      </p>
                    )}
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                      {item.domain}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </aside>

        {/* NÚT THU GỌN / MỞ RỘNG SIDEBAR */}
        {!isZenMode && (
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="no-print hidden sm:flex absolute left-0 z-20 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-r-md p-1 shadow-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
            style={{
              left: isSidebarCollapsed
                ? "0px"
                : "clamp(320px, 20vw + 100px, 384px)"
            }}
            title={isSidebarCollapsed ? t.expand_sidebar : t.collapse_sidebar}
          >
            {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}

        {/* ========================================================
            CỘT BÊN PHẢI (70%): NỘI DUNG CHI TIẾT MỤC TỪ ĐIỂN
            ======================================================== */}
        <main
          ref={contentScrollRef}
          onScroll={handleScroll}
          className={`h-full flex-1 overflow-y-auto bg-white dark:bg-slate-900 p-4 sm:p-8 md:p-12 transition-all ${
            mobileTab === "list" ? "hidden sm:block" : "block"
          }`}
        >
          {/* Thanh Tiến độ Cuộn đọc */}
          <div
            className="no-print fixed top-14 left-0 h-0.5 bg-blue-600 z-50 transition-all duration-75"
            style={{ width: `${readingProgress}%` }}
          />

          {/* KHUNG NỘI DUNG TỐI ƯU CÔNG THÁI HỌC */}
          <div className={`max-w-3xl mx-auto space-y-6 ${getFontSizeClass()} print-clean`}>
            {/* TH1: HIỂN THỊ MỤC TỪ CHÍNH (METHODOLOGY TERM) */}
            {activeTerm && (
              <article className="space-y-6">
                {/* 1. TIÊU ĐỀ THUẬT NGỮ & PHÁT ÂM */}
                <header className="border-b border-slate-200 dark:border-slate-800 pb-5 space-y-2.5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-serif">
                          {activeTerm.term}
                        </h2>
                        {activeTerm.part_of_speech && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 italic">
                            [{activeTerm.part_of_speech}]
                          </span>
                        )}
                        {activeTerm.tier === "flagship" ? (
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800 font-bold flex items-center gap-1">
                            ★ {languageMode === "en" ? "Flagship Core" : "Thuật ngữ Cốt lõi"}
                          </span>
                        ) : activeTerm.tier ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium capitalize">
                            {activeTerm.tier}
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                            {t.concept_level_badge}
                          </span>
                        )}

                        {activeTerm.expert_status === "verified" ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-semibold flex items-center gap-1">
                            <ShieldCheck size={12} /> {languageMode === "en" ? "Verified" : "Đã Thẩm Định"}
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-medium flex items-center gap-1">
                            <Clock size={12} /> {languageMode === "en" ? "Editorial Dossier" : "Hồ sơ Rà soát"}
                          </span>
                        )}
                      </div>

                      {/* Phiên âm IPA & Nút loa phát âm */}
                      <div className="flex items-center gap-2 text-sm text-slate-500 font-mono">
                        <span>{activeTerm.ipa || "/.../"}</span>
                        <button
                          onClick={() => handlePronounce(activeTerm.term)}
                          className={`no-print p-1.5 rounded-md transition flex items-center gap-1 text-xs font-sans ${
                            isPlayingAudio
                              ? "bg-blue-600 text-white animate-pulse"
                              : "text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-slate-800"
                          }`}
                          title={t.pronounce_tooltip}
                        >
                          <Volume2 size={16} />
                          <span className="text-[11px] font-medium hidden sm:inline">{t.pronounce_button}</span>
                        </button>
                      </div>
                    </div>

                    {/* Nút Bookmark, Xuất Trích Dẫn, Chia sẻ Link & Góp ý */}
                    <div className="no-print flex items-center gap-1.5 shrink-0 flex-wrap sm:flex-nowrap">
                      {/* Nút Bookmark ⭐ */}
                      <button
                        onClick={() => handleToggleBookmark(activeTerm.id)}
                        className={`p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium border rounded-md transition flex items-center gap-1 ${
                          bookmarks.includes(activeTerm.id)
                            ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 font-semibold"
                            : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                        title={bookmarks.includes(activeTerm.id) ? t.save_tooltip_remove : t.save_tooltip_add}
                      >
                        <Bookmark
                          size={14}
                          className={bookmarks.includes(activeTerm.id) ? "fill-amber-400 text-amber-500" : "text-slate-400"}
                        />
                        <span className="hidden sm:inline">
                          {bookmarks.includes(activeTerm.id) ? t.saved_button : t.save_button}
                        </span>
                      </button>

                      <button
                        onClick={handleShareLink}
                        className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-1 text-slate-700 dark:text-slate-300"
                        title={t.share_button}
                      >
                        {copiedSection === "share_url" ? (
                          <>
                            <Check size={14} className="text-green-600" />
                            <span className="hidden sm:inline">{t.share_copied}</span>
                          </>
                        ) : (
                          <>
                            <LinkIcon size={14} />
                            <span className="hidden sm:inline">{t.share_button}</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setIsCitationModalOpen(true)}
                        className="px-2.5 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-md transition flex items-center gap-1.5 shadow-xs"
                        title={t.cite_tooltip}
                      >
                        <FileText size={14} />
                        <span>{t.cite_button}</span>
                      </button>

                      {/* Nút Đề xuất Chỉnh sửa Mục từ (Wiki Revision) */}
                      <button
                        onClick={() => handleOpenSectionEdit("all")}
                        className="px-2.5 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-md transition flex items-center gap-1.5 shadow-xs"
                        title={t.tooltip_edit_term}
                      >
                        <GitPullRequest size={14} className="text-blue-600 dark:text-blue-400" />
                        <span className="hidden sm:inline">{t.btn_edit_term}</span>
                      </button>

                      <button
                        onClick={() => setIsFeedbackModalOpen(true)}
                        className="p-1.5 sm:px-2 sm:py-1.5 text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:border-emerald-300 text-slate-500 hover:text-emerald-600 transition"
                        title={t.feedback_tooltip}
                      >
                        <MessageSquarePlus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Bản dịch tiếng Việt chuẩn hóa & Dị bản: CHỈ HIỂN THỊ KHI Ở CHẾ ĐỘ 'vi' */}
                  {languageMode === "vi" && activeTerm.vietnamese && (
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-blue-800 dark:text-blue-400">
                        {activeTerm.vietnamese}
                      </p>
                      {activeTerm.vietnamese_variants && activeTerm.vietnamese_variants.length > 0 && (
                        <p className="text-xs text-slate-500 italic">
                          Dị bản thường gặp: {activeTerm.vietnamese_variants.join(" • ")}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Nhãn phân loại chuyên ngành (100% tiếng Anh khi ở chế độ EN) */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {getTermDomainTags(activeTerm, languageMode).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </header>

                {/* THANH ĐIỀU HƯỚNG SUB-TABS: MỤC TỪ (ARTICLE) | LỊCH SỬ (HISTORY) | THẢO LUẬN (TALK PAGE) */}
                <nav className="no-print flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs">
                  <button
                    onClick={() => setTermSubTab("article")}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                      termSubTab === "article"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <BookOpen size={13} />
                    <span>{languageMode === "en" ? "Article" : "Mục từ"}</span>
                  </button>

                  <button
                    onClick={() => setTermSubTab("history")}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                      termSubTab === "history"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Clock size={13} />
                    <span>{languageMode === "en" ? "History & Provenance" : "Lịch sử Phiên bản"}</span>
                  </button>

                  <button
                    onClick={() => setTermSubTab("talk")}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                      termSubTab === "talk"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <MessageSquare size={13} />
                    <span>{languageMode === "en" ? "Talk & Debates" : "Thảo luận Học thuật"}</span>
                  </button>
                </nav>

                {termSubTab === "article" && (
                  <div className="space-y-6">

                {/* 2. KHỐI ĐỊNH NGHĨA CỐT LÕI */}
                <section className="p-4 rounded-xl border-l-4 border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={14} /> {t.sec_definition}
                    </span>
                    <div className="flex items-center gap-1.5 no-print">
                      <button
                        onClick={() => handleOpenSectionEdit("definition")}
                        className="text-slate-400 hover:text-blue-600 transition p-0.5 rounded"
                        title={t.btn_edit_section}
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        onClick={() => handleCopy(getTermDefinition(activeTerm, languageMode), "def")}
                        className="text-slate-400 hover:text-blue-600 transition p-0.5 rounded"
                        title={t.copy_tooltip}
                      >
                        {copiedSection === "def" ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-serif text-base sm:text-lg">
                    {getTermDefinition(activeTerm, languageMode)}
                  </p>
                </section>

                {/* 3. KHỐI BẪY DÙNG TỪ & LỖI THƯỜNG GẶP */}
                {getTermPitfalls(activeTerm, languageMode) && (
                  <section className="p-4 rounded-xl border-l-4 border-amber-500 bg-amber-50/40 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <AlertTriangle size={14} /> {t.sec_pitfalls}
                      </span>
                      <div className="flex items-center gap-1.5 no-print">
                        <button
                          onClick={() => handleOpenSectionEdit("pitfalls")}
                          className="text-slate-400 hover:text-amber-600 transition p-0.5 rounded"
                          title={t.btn_edit_section}
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={() => handleCopy(getTermPitfalls(activeTerm, languageMode) || "", "pitfalls")}
                          className="text-slate-400 hover:text-amber-600 transition p-0.5 rounded"
                          title={t.copy_tooltip}
                        >
                          {copiedSection === "pitfalls" ? (
                            <Check size={13} className="text-green-600" />
                          ) : (
                            <Copy size={13} />
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                      {getTermPitfalls(activeTerm, languageMode)}
                    </p>
                  </section>
                )}

                {/* 4. KHỐI CHỈ SỐ NGƯỠNG HOẶC ĐỐI ĐẦU HỌC THUẬT */}
                {(getTermBenchmarks(activeTerm, languageMode) || getTermDebates(activeTerm, languageMode)) && (
                  <section className="p-4 rounded-xl border-l-4 border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-3">
                    {getTermBenchmarks(activeTerm, languageMode) && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
                          <span className="flex items-center gap-1.5">
                            <Sparkles size={14} /> {t.sec_benchmarks}
                          </span>
                          <div className="flex items-center gap-1.5 no-print">
                            <button
                              onClick={() => handleOpenSectionEdit("benchmarks")}
                              className="text-slate-400 hover:text-emerald-600 transition p-0.5 rounded"
                              title={t.btn_edit_section}
                            >
                              <Edit3 size={13} />
                            </button>
                            <button
                              onClick={() => handleCopy(getTermBenchmarks(activeTerm, languageMode) || "", "benchmarks")}
                              className="text-slate-400 hover:text-emerald-600 transition p-0.5 rounded"
                              title={t.copy_tooltip}
                            >
                              {copiedSection === "benchmarks" ? (
                                <Check size={13} className="text-green-600" />
                              ) : (
                                <Copy size={13} />
                              )}
                            </button>
                          </div>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-mono">
                          {getTermBenchmarks(activeTerm, languageMode)}
                        </p>
                      </div>
                    )}

                    {getTermDebates(activeTerm, languageMode) && (
                      <div className="space-y-1 pt-2 border-t border-emerald-200/60 dark:border-emerald-900/40">
                        <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
                          {t.sec_debates}
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                          {getTermDebates(activeTerm, languageMode)}
                        </p>
                      </div>
                    )}
                  </section>
                )}

                {/* 5. CÁC BIẾN THỂ CON / THUẬT NGỮ LIÊN ĐỚI */}
                {activeTerm.corpus_variants && activeTerm.corpus_variants.length > 0 && (
                  <section className="space-y-2.5 pt-2">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers size={14} /> {t.sec_variants}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {activeTerm.corpus_variants.map((v, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4"
                        >
                          <div>
                            <span className="font-semibold text-sm text-slate-900 dark:text-white">
                              {v.v}
                            </span>{" "}
                            {languageMode === "vi" && v.vn && (
                              <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                                ({v.vn})
                              </span>
                            )}
                            {v.rel && (
                              <p className="text-xs text-slate-500 mt-0.5">
                                {languageMode === "vi"
                                  ? v.rel
                                  : (v.rel_en || v.rel
                                      .replace(/Thành tố con bắt buộc/g, "Mandatory sub-dimension")
                                      .replace(/Đánh giá của hội đồng chuyên gia về độ bao quát miền khái niệm/g, "Expert panel evaluation of construct domain coverage")
                                      .replace(/Đánh giá chủ quan xem thang đo thoạt nhìn có vẻ đo đúng khái niệm/g, "Subjective plausibility assessment of scale items")
                                      .replace(/Đánh giá mức độ thang đo liên hệ đúng lý thuyết với các biến khác/g, "Nomological theoretical network correlation assessment")
                                      .replace(/Tương quan với một tiêu chuẩn chuẩn mực bên ngoài/g, "Correlation with an established external criterion")
                                      .replace(/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/gi, ""))}
                              </p>
                            )}
                          </div>
                          {v.src && (
                            <span className="shrink-0 text-[11px] font-mono text-slate-400">
                              {v.src}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 6. Ý KIẾN THẨM ĐỊNH CỦA HỘI ĐỒNG CHUYÊN GIA (EXPERT REVIEW DOSSIER) */}
                {activeTerm.expert_notes && (
                  <section className="p-4 rounded-xl border-l-4 border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-indigo-950 dark:text-indigo-300 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck size={15} className="text-indigo-600 dark:text-indigo-400" />
                        {languageMode === "en" ? "Editorial Board & Expert Review Guidance" : "Ghi Chú Hiệu Đính Của Chuyên Gia Thẩm Định"}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300">
                        ThS. Trần Thanh Tùng (NTTU)
                      </span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-sans">
                      {activeTerm.expert_notes}
                    </p>
                  </section>
                )}

                {/* 7. KHỐI TRÍCH DẪN UY TÍN */}
                <footer className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap size={15} /> {t.sec_literature}
                    </span>
                    <div className="flex items-center gap-1.5 no-print">
                      <button
                        onClick={() => handleOpenSectionEdit("citations")}
                        className="text-slate-400 hover:text-purple-600 transition p-0.5 rounded"
                        title={t.btn_edit_section}
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        onClick={() =>
                          handleCopy(
                            `${activeTerm.apa_reference || activeTerm.seminal_citation}`,
                            "footer_ref"
                          )
                        }
                        className="text-slate-400 hover:text-purple-600 transition p-0.5 rounded"
                        title={t.copy_tooltip}
                      >
                        {copiedSection === "footer_ref" ? (
                          <Check size={13} className="text-green-600" />
                        ) : (
                          <Copy size={13} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
                    {activeTerm.seminal_citation && (
                      <p>
                        <strong className="text-slate-700 dark:text-slate-300">
                          {t.seminal_paper_label}
                        </strong>{" "}
                        {activeTerm.seminal_citation}
                      </p>
                    )}
                    {activeTerm.apa_reference && (
                      <p>
                        <strong className="text-slate-700 dark:text-slate-300">
                          {t.textbook_apa_label}
                        </strong>{" "}
                        {activeTerm.apa_reference}
                      </p>
                    )}
                  </div>
                </footer>

                {/* 11. KHỐI VINH DANH HỌC GIẢ HIỆU ĐÍNH (SCHOLARLY CONTRIBUTORS ATTRIBUTION) */}
                <section className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-slate-200/60 dark:border-slate-800 pb-2">
                    <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-bold">
                      <Award size={14} className="text-amber-500" />
                      <span>{languageMode === "en" ? "Scholarly Attribution & Provenance" : "Ghi Nhận Đóng Góp & Thẩm Định Học Thuật"}</span>
                    </div>
                    <Link 
                      href="/hall-of-fame" 
                      className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>{languageMode === "en" ? "Hall of Fame" : "Bảng Vinh danh"}</span>
                      <ArrowRight size={11} />
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="flex items-start gap-2">
                      <ShieldCheck size={16} className="text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-slate-900 dark:text-white block font-sans">
                          {languageMode === "en" ? "Foundation Editorial Board" : "Hội đồng Biên soạn & Khởi tạo"}
                        </strong>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                          {languageMode === "en" 
                            ? "Research Methodology Lexicon Editorial Committee & Peer Reviewers" 
                            : "Hội đồng Biên soạn Từ điển Phương pháp Nghiên cứu Khoa học"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Users size={16} className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-slate-900 dark:text-white block font-sans">
                          {languageMode === "en" ? "Community Peer Review" : "Đóng góp & Hiệu đính Cộng đồng"}
                        </strong>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                          {languageMode === "en"
                            ? "Approved scholarly revisions earn credit in the Scholarly Hall of Fame."
                            : "Các bản hiệu đính được phê duyệt sẽ được ghi danh vĩnh viễn trên Bảng Vinh danh."}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* TAB LỊCH SỬ PHIÊN BẢN (REVISION HISTORY & VISUAL DIFF) */}
            {termSubTab === "history" && (
              <div className="pt-2">
                <TermHistoryView
                  termId={activeTerm.id}
                  termName={activeTerm.term}
                  initialCitation={activeTerm.apa_reference || activeTerm.seminal_citation}
                  languageMode={languageMode}
                />
              </div>
            )}

            {/* TAB THẢO LUẬN HỌC THUẬT (TALK PAGE / DISCUSSION THREADS) */}
            {termSubTab === "talk" && (
              <div className="pt-2">
                <TermDiscussionView
                  termId={activeTerm.id}
                  termName={activeTerm.term}
                  currentUser={currentUser}
                  languageMode={languageMode}
                />
              </div>
            )}
          </article>
        )}

            {/* TH2: HIỂN THỊ MỤC TỪ VIẾT TẮT (ACADEMIC ACRONYM) */}
            {activeAcronym && (
              <article className="space-y-6">
                <header className="border-b border-slate-200 dark:border-slate-800 pb-5 space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-1 rounded bg-amber-500 text-white font-extrabold text-lg tracking-wider font-mono">
                        {activeAcronym.key}
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                        {t.acronym_badge}
                      </span>
                      {activeAcronym.expert_status === "verified" ? (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-semibold flex items-center gap-1">
                          <ShieldCheck size={12} /> {languageMode === "en" ? "Verified" : "Đã Thẩm Định"}
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-medium flex items-center gap-1">
                          <Clock size={12} /> {languageMode === "en" ? "Editorial Dossier" : "Hồ sơ Rà soát"}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Nút Bookmark cho Acronym */}
                      <button
                        onClick={() => handleToggleBookmark(selectedId)}
                        className={`p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium border rounded-md transition flex items-center gap-1 ${
                          bookmarks.includes(selectedId)
                            ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 font-semibold"
                            : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                        title={bookmarks.includes(selectedId) ? t.save_tooltip_remove : t.save_tooltip_add}
                      >
                        <Bookmark
                          size={14}
                          className={bookmarks.includes(selectedId) ? "fill-amber-400 text-amber-500" : "text-slate-400"}
                        />
                        <span className="hidden sm:inline">
                          {bookmarks.includes(selectedId) ? t.saved_button : t.save_button}
                        </span>
                      </button>

                      <button
                        onClick={handleShareLink}
                        className="no-print px-2.5 py-1.5 text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-1 text-slate-700 dark:text-slate-300"
                        title={t.share_button}
                      >
                        {copiedSection === "share_url" ? (
                          <>
                            <Check size={14} className="text-green-600" />
                            <span className="hidden sm:inline">{t.share_copied}</span>
                          </>
                        ) : (
                          <>
                            <LinkIcon size={14} />
                            <span className="hidden sm:inline">{t.share_button}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-serif">
                    {activeAcronym.full_name}
                  </h2>

                  {/* Bản dịch tiếng Việt chỉ hiển thị khi ở chế độ 'vi' */}
                  {languageMode === "vi" && activeAcronym.vietnamese && (
                    <p className="text-lg font-bold text-blue-800 dark:text-blue-400">
                      {activeAcronym.vietnamese}
                    </p>
                  )}
                </header>

                {/* Mục đích & Bản chất */}
                <section className="p-4 rounded-xl border-l-4 border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={14} /> {t.sec_acronym_purpose}
                    </span>
                    <button
                      onClick={() => handleCopy(getAcronymPurpose(activeAcronym, languageMode), "acronym_def")}
                      className="no-print text-slate-400 hover:text-blue-600 transition"
                      title={t.copy_tooltip}
                    >
                      {copiedSection === "acronym_def" ? (
                        <Check size={13} className="text-green-600" />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-serif text-base sm:text-lg">
                    {getAcronymPurpose(activeAcronym, languageMode)}
                  </p>
                </section>

                {/* Ngưỡng tham chiếu */}
                {getAcronymBenchmark(activeAcronym, languageMode) && (
                  <section className="p-4 rounded-xl border-l-4 border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-2">
                    <div className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={14} /> {t.sec_acronym_benchmark}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-mono">
                      {getAcronymBenchmark(activeAcronym, languageMode)}
                    </p>
                  </section>
                )}

                {/* Ý KIẾN THẨM ĐỊNH CỦA HỘI ĐỒNG CHUYÊN GIA CHO TỪ VIẾT TẮT */}
                {activeAcronym.expert_notes && (
                  <section className="p-4 rounded-xl border-l-4 border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-indigo-950 dark:text-indigo-300 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck size={15} className="text-indigo-600 dark:text-indigo-400" />
                        {languageMode === "en" ? "Editorial Board & Expert Review Guidance" : "Ghi Chú Hiệu Đính Của Chuyên Gia Thẩm Định"}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300">
                        ThS. Trần Thanh Tùng (NTTU)
                      </span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-sans">
                      {activeAcronym.expert_notes}
                    </p>
                  </section>
                )}
              </article>
            )}
          </div>
        </main>
      </div>

      {/* MODAL XUẤT TRÍCH DẪN ĐA ĐỊNH DẠNG (APA / BibTeX / RIS) */}
      {activeTerm && (
        <CitationModal
          term={activeTerm}
          isOpen={isCitationModalOpen}
          onClose={() => setIsCitationModalOpen(false)}
          languageMode={languageMode}
        />
      )}

      {/* MODAL GÓP Ý & BÁO LỖI HỌC THUẬT */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        currentTerm={activeTerm ? { id: activeTerm.id, term: activeTerm.term } : undefined}
        userEmail={currentUser?.email || undefined}
        languageMode={languageMode}
      />

      {/* MODAL ĐỀ XUẤT CHỈNH SỬA MỤC TỪ (WIKI REVISION - PHASE 1) */}
      {activeTerm && (
        <EditTermModal
          term={activeTerm}
          section={editSection}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          languageMode={languageMode}
          currentUser={currentUser}
          onLoginRequired={() => setIsLoginModalOpen(true)}
        />
      )}

      {/* MODAL ĐỀ XUẤT THUẬT NGỮ MỚI (WIKI NEW TERM - PHASE 1) */}
      <NewTermModal
        isOpen={isNewTermModalOpen}
        onClose={() => setIsNewTermModalOpen(false)}
        languageMode={languageMode}
        currentUser={currentUser}
        onLoginRequired={() => setIsLoginModalOpen(true)}
      />

      {/* MODAL ĐĂNG NHẬP / XÁC THỰC DANH TÍNH HỌC THUẬT */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
          if (user?.uid) {
            fetchUserBookmarks(user.uid).then((bks) => setBookmarks(bks));
          }
        }}
        languageMode={languageMode}
      />
    </div>
  );
}
