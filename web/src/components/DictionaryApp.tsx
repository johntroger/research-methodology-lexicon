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
  Users,
  Cpu,
  Network
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
import FormattedAcademicText from "./FormattedAcademicText";
import CommandPalette, { RecentSearchItem } from "./CommandPalette";
import StickyTableOfContents, { TocSectionItem } from "./StickyTableOfContents";
import {
  UI_I18N,
  getTermDefinition,
  getTermOperationalMechanism,
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
  const [filterType, setFilterType] = useState<"term" | "acronym" | "saved">("term");
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

  // Global Command Palette & Lịch sử Tra cứu gần đây (Phase 1)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([]);

  // Tải Lịch sử Tra cứu từ localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("rv_recent_searches");
        if (raw) {
          setRecentSearches(JSON.parse(raw));
        }
      } catch (e) {
        console.warn("Lỗi đọc recent searches:", e);
      }
    }
  }, []);

  // Wiki Community Contribution State (Phase 1 & Phase 3)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editSection, setEditSection] = useState<"all" | "vietnamese" | "definition" | "benchmarks" | "pitfalls" | "debates" | "citations">("all");
  const [isNewTermModalOpen, setIsNewTermModalOpen] = useState(false);
  const [termSubTab, setTermSubTab] = useState<"article" | "history" | "talk">("article");

  const handleOpenSectionEdit = (section: "all" | "vietnamese" | "definition" | "benchmarks" | "pitfalls" | "debates" | "citations") => {
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

  // Map tra cứu nhanh mục từ theo ID phục vụ liên kết chéo (Cross-reference lookup)
  const termsMap = useMemo(() => new Map(initialTerms.map((t) => [t.id, t])), [initialTerms]);

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

  // Cập nhật Lịch sử Tra cứu khi chuyển mục từ
  useEffect(() => {
    if (!selectedId || typeof window === "undefined") return;

    const termItem = initialTerms.find((t) => t.id === selectedId);
    let itemToAdd: RecentSearchItem | null = null;

    if (termItem) {
      itemToAdd = {
        id: termItem.id,
        term: termItem.term,
        vietnamese: termItem.vietnamese,
        doc_type: "term"
      };
    } else if (selectedId.startsWith("acronym-")) {
      const key = Object.keys(initialAcronyms).find(
        (k) => `acronym-${k.toLowerCase().replace(/[^a-z0-9]/g, "-")}` === selectedId
      );
      if (key && initialAcronyms[key]) {
        itemToAdd = {
          id: selectedId,
          term: `${key} - ${initialAcronyms[key].full_name}`,
          vietnamese: initialAcronyms[key].vietnamese,
          doc_type: "acronym"
        };
      }
    }

    if (itemToAdd) {
      setRecentSearches((prev) => {
        const filtered = prev.filter((item) => item.id !== itemToAdd!.id);
        const updated = [itemToAdd!, ...filtered].slice(0, 10);
        try {
          localStorage.setItem("rv_recent_searches", JSON.stringify(updated));
        } catch (err) {
          // ignore
        }
        return updated;
      });
    }
  }, [selectedId, initialTerms, initialAcronyms]);

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("rv_recent_searches");
    }
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
        domain: languageMode === "en" ? (getTermDomainTags(t, "en")[0] || "Methodology") : (t.category || t.domain_tags[0] || "Phương pháp"),
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

  // Danh sách các phân mục chi tiết của mục từ (phục vụ Table of Contents / Scrollspy)
  const tocSections: TocSectionItem[] = useMemo(() => {
    if (!activeTerm) return [];
    const list: TocSectionItem[] = [
      {
        id: "section-definition",
        label: languageMode === "en" ? "Core Definition" : "Định nghĩa cốt lõi",
        shortLabel: languageMode === "en" ? "Definition" : "Định nghĩa",
        icon: BookOpen
      }
    ];

    if (getTermOperationalMechanism(activeTerm, languageMode)) {
      list.push({
        id: "section-mechanism",
        label: languageMode === "en" ? "Mechanism" : "Cơ chế vận hành",
        shortLabel: languageMode === "en" ? "Mechanism" : "Cơ chế",
        icon: Cpu
      });
    }

    if (getTermPitfalls(activeTerm, languageMode)) {
      list.push({
        id: "section-pitfalls",
        label: languageMode === "en" ? "Pitfalls & Mistakes" : "Cạm bẫy dùng từ",
        shortLabel: languageMode === "en" ? "Pitfalls" : "Cạm bẫy",
        icon: AlertTriangle
      });
    }

    if (getTermBenchmarks(activeTerm, languageMode) || getTermDebates(activeTerm, languageMode)) {
      list.push({
        id: "section-benchmarks",
        label: languageMode === "en" ? "Benchmarks & Debates" : "Ngưỡng số & Tranh luận",
        shortLabel: languageMode === "en" ? "Benchmarks" : "Ngưỡng số",
        icon: Sparkles
      });
    }

    if (activeTerm.corpus_variants && activeTerm.corpus_variants.length > 0) {
      list.push({
        id: "section-variants",
        label: languageMode === "en" ? "Corpus Variants" : "Biến thể nội hàm",
        shortLabel: languageMode === "en" ? "Variants" : "Biến thể",
        icon: Layers
      });
    }

    if (activeTerm.expert_notes) {
      list.push({
        id: "section-expert-notes",
        label: languageMode === "en" ? "Expert Notes" : "Ghi chú hiệu đính",
        shortLabel: languageMode === "en" ? "Notes" : "Hiệu đính",
        icon: ShieldCheck
      });
    }

    if (activeTerm.related_terms && activeTerm.related_terms.length > 0) {
      list.push({
        id: "section-related",
        label: languageMode === "en" ? "Related Terms" : "Thuật ngữ liên quan",
        shortLabel: languageMode === "en" ? "Related" : "Liên quan",
        icon: Network
      });
    }

    if (activeTerm.apa_reference || activeTerm.seminal_citation) {
      list.push({
        id: "section-citations",
        label: languageMode === "en" ? "Citations & APA" : "Trích dẫn kinh điển",
        shortLabel: languageMode === "en" ? "Citations" : "Trích dẫn",
        icon: GraduationCap
      });
    }

    list.push({
      id: "section-provenance",
      label: languageMode === "en" ? "Scholarly Provenance" : "Ghi nhận đóng góp",
      shortLabel: languageMode === "en" ? "Provenance" : "Vinh danh",
      icon: Award
    });

    return list;
  }, [activeTerm, languageMode]);

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

  // Nhảy liên kết siêu văn bản tới biến thể / thuật ngữ liên quan
  const handleJumpToVariant = (variantName: string) => {
    const cleanName = variantName.trim().toLowerCase();
    const match = initialTerms.find(
      (t) =>
        t.term.toLowerCase() === cleanName ||
        t.term.toLowerCase().startsWith(cleanName + " (") ||
        t.term.toLowerCase().includes(`(${cleanName})`) ||
        t.id.toLowerCase() === cleanName.replace(/[^a-z0-9]/g, "-")
    );
    if (match) {
      setSelectedId(match.id);
      setMobileTab("detail");
      if (contentScrollRef.current) {
        contentScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      setSearchQuery(variantName);
      setMobileTab("list");
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

  // Lắng nghe phím tắt: `/` (tìm kiếm), `Ctrl+B` (thu gọn sidebar), `F` (zen mode), `↓` / `↑` (chuyển mục từ)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Bỏ qua nếu đang mở bất kỳ modal nào (tránh can thiệp nhập liệu trong form)
      const isAnyModalOpen =
        isCommandPaletteOpen ||
        isCitationModalOpen ||
        isFeedbackModalOpen ||
        isLoginModalOpen ||
        isEditModalOpen ||
        isNewTermModalOpen;

      // Phím tắt toàn cầu mở Command Palette: Ctrl + K hoặc Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      if (e.key === "/" && document.activeElement !== searchInputRef.current && !isAnyModalOpen) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setIsSidebarCollapsed((prev) => !prev);
        return;
      }

      if (
        (e.key === "f" || e.key === "F") &&
        document.activeElement !== searchInputRef.current &&
        !e.ctrlKey &&
        !e.metaKey &&
        !isAnyModalOpen
      ) {
        e.preventDefault();
        setIsZenMode((prev) => !prev);
        return;
      }

      // Di chuyển lên / xuống giữa các mục từ bằng phím mũi tên ArrowDown và ArrowUp
      if (!isAnyModalOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        // Chỉ xử lý nếu không đang gõ trong một textarea hoặc input khác ngoài thanh tìm kiếm
        const isTypingInOtherInput =
          document.activeElement &&
          document.activeElement !== searchInputRef.current &&
          (document.activeElement.tagName === "INPUT" ||
            document.activeElement.tagName === "TEXTAREA");

        if (!isTypingInOtherInput && searchResults.length > 0) {
          e.preventDefault();
          const currentIndex = searchResults.findIndex((item) => item.id === selectedId);

          let nextIndex = currentIndex;
          if (e.key === "ArrowDown") {
            nextIndex = currentIndex < searchResults.length - 1 ? currentIndex + 1 : 0;
          } else if (e.key === "ArrowUp") {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : searchResults.length - 1;
          }

          const nextItem = searchResults[nextIndex];
          if (nextItem) {
            setSelectedId(nextItem.id);
            // Cuộn mượt danh sách để mục từ được chọn luôn hiển thị trong tầm mắt
            const el = document.getElementById(`list-item-${nextItem.id}`);
            if (el) {
              el.scrollIntoView({ block: "nearest", behavior: "smooth" });
            }
          }
          return;
        }
      }

      if (!isAnyModalOpen && e.key === "Enter" && document.activeElement === searchInputRef.current) {
        searchInputRef.current?.blur();
        return;
      }

      if (e.key === "Escape") {
        if (isCommandPaletteOpen) {
          setIsCommandPaletteOpen(false);
        } else if (isCitationModalOpen) {
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
  }, [
    isZenMode,
    searchQuery,
    isCommandPaletteOpen,
    isCitationModalOpen,
    isFeedbackModalOpen,
    isLoginModalOpen,
    isEditModalOpen,
    isNewTermModalOpen,
    searchResults,
    selectedId
  ]);

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

          {/* Nút bấm nhanh mở Command Palette (Ctrl + K) trên Header */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="hidden lg:flex items-center gap-2.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 border border-slate-200/90 dark:border-slate-700/80 text-xs transition hover:border-blue-400 shadow-2xs"
            title="Tra cứu nhanh toàn bộ từ điển (Ctrl + K)"
          >
            <Search size={13} className="text-blue-600 dark:text-blue-400" />
            <span className="text-slate-400 text-xs font-normal">
              {languageMode === "en" ? "Search 1,874 terms & acronyms..." : "Tra cứu 1,874 thuật ngữ & viết tắt..."}
            </span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-bold text-slate-600 dark:text-slate-300">
              Ctrl K
            </kbd>
          </button>

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
                className="w-full pl-9 pr-14 sm:pr-16 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 shadow-sm"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                >
                  <X size={14} />
                </button>
              ) : (
                <button
                  onClick={() => setIsCommandPaletteOpen(true)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-600 transition border border-slate-200 dark:border-slate-600"
                  title="Mở Bảng Lệnh Toàn Cầu (Ctrl + K)"
                >
                  <span>Ctrl K</span>
                </button>
              )}
            </div>

            {/* Lịch sử Tra cứu gần đây (Recent Searches Quick Chips) */}
            {recentSearches.length > 0 && !searchQuery && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-[11px]">
                <span className="text-slate-400 shrink-0 font-medium">
                  {languageMode === "en" ? "Recent:" : "Gần đây:"}
                </span>
                {recentSearches.slice(0, 6).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedId(item.id);
                      setMobileTab("detail");
                    }}
                    className={`shrink-0 px-2 py-0.5 rounded-md border text-[11px] transition ${
                      item.id === selectedId
                        ? "bg-blue-100 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-semibold"
                        : "bg-slate-100/70 dark:bg-slate-800 border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:border-blue-300"
                    }`}
                  >
                    {item.term.split(" - ")[0]}
                  </button>
                ))}
              </div>
            )}

            {/* Bộ lọc Tab & Số đếm */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800 p-0.5 rounded-md">
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

              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono">
                <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold" title={languageMode === "en" ? "Use Up/Down Arrow keys to navigate terms" : "Dùng phím Mũi tên Lên/Xuống để chuyển từ"}>
                  ↑↓
                </span>
                <span>
                  {searchResults.length} {t.terms_count}
                </span>
              </div>
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

          {/* Dải nhảy nhanh A-Z: Hiển thị đầy đủ toàn bộ chữ cái từ A đến Z */}
          {alphabetLetters.length > 0 && (
            <div className="shrink-0 px-2 py-1.5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/60">
              <div className="flex flex-wrap items-center justify-between gap-y-1 text-[11px] font-mono">
                {alphabetLetters.map((l) => (
                  <button
                    key={l}
                    onClick={() => scrollToLetter(l)}
                    className="w-5 h-5 sm:w-5.5 flex items-center justify-center rounded text-slate-500 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-100/70 dark:hover:bg-slate-800 transition font-medium"
                    title={`Nhảy tới vần ${l}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
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
          className={`h-full flex-1 overflow-y-auto bg-white dark:bg-slate-900 px-4 sm:px-6 md:px-8 lg:px-10 py-6 transition-all ${
            mobileTab === "list" ? "hidden sm:block" : "block"
          }`}
        >
          {/* Thanh Tiến độ Cuộn đọc */}
          <div
            className="no-print fixed top-14 left-0 h-0.5 bg-blue-600 z-50 transition-all duration-75"
            style={{ width: `${readingProgress}%` }}
          />

          {/* KHUNG NỘI DUNG TỐI ƯU CÔNG THÁI HỌC */}
          <div
            className={`w-full ${
              isSidebarCollapsed
                ? "max-w-5xl lg:max-w-6xl xl:max-w-7xl"
                : "max-w-4xl lg:max-w-5xl xl:max-w-6xl"
            } mx-auto space-y-6 ${getFontSizeClass()} print-clean`}
          >
            {/* Thanh điều hướng tức thì trên Mobile (Mobile Instant Navigation Header) */}
            <div className="no-print sm:hidden flex items-center justify-between pb-3 mb-2 border-b border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setMobileTab("list")}
                className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-900 transition"
              >
                <ChevronLeft size={16} />
                <span>{languageMode === "en" ? "← Back to Terms List" : "← Danh mục tra cứu"}</span>
              </button>
              <button
                onClick={() => setIsCommandPaletteOpen(true)}
                className="flex items-center gap-1 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs"
              >
                <Search size={13} className="text-blue-600 dark:text-blue-400" />
                <span>Ctrl+K</span>
              </button>
            </div>

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
                        {activeTerm.tier === "flagship" || activeTerm.is_flagship || Boolean(activeTerm.apa_reference && activeTerm.apa_reference.trim().length > 0) ? (
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
                    <div className="space-y-1 group/vn relative">
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-blue-800 dark:text-blue-400">
                          {activeTerm.vietnamese}
                        </p>
                        <button
                          onClick={() => handleOpenSectionEdit("vietnamese")}
                          className="no-print opacity-60 hover:opacity-100 hover:text-blue-600 dark:hover:text-blue-400 transition p-1 rounded hover:bg-blue-50 dark:hover:bg-slate-800 inline-flex items-center gap-1 text-[11px] font-medium text-slate-400"
                          title="Đề xuất sửa bản dịch tiếng Việt hoặc dị bản"
                        >
                          <Edit3 size={13} />
                          <span className="hidden sm:inline">Sửa bản dịch</span>
                        </button>
                      </div>
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
                    {/* DẢI ĐIỀU HƯỚNG NHANH CÁC PHÂN MỤC TRONG BÀI (IN-FLOW SECTION ANCHORS) */}
                    <StickyTableOfContents
                      sections={tocSections}
                      containerRef={contentScrollRef}
                      languageMode={languageMode}
                    />

                {/* 2. KHỐI ĐỊNH NGHĨA CỐT LÕI */}
                <section id="section-definition" className="p-4 rounded-xl border-l-4 border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-2">
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
                  <FormattedAcademicText
                    content={getTermDefinition(activeTerm, languageMode)}
                    className="text-slate-800 dark:text-slate-200 font-serif text-base sm:text-lg"
                    variant="definition"
                  />
                </section>

                {/* 2.5 KHỐI CƠ CHẾ VẬN HÀNH & MÔ HÌNH PHƯƠNG PHÁP LUẬN */}
                {getTermOperationalMechanism(activeTerm, languageMode) && (
                  <section id="section-mechanism" className="p-4 rounded-xl border-l-4 border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Cpu size={14} /> {t.sec_operational_mechanism}
                      </span>
                      <div className="flex items-center gap-1.5 no-print">
                        <button
                          onClick={() => handleCopy(getTermOperationalMechanism(activeTerm, languageMode) || "", "op_mech")}
                          className="text-slate-400 hover:text-indigo-600 transition p-0.5 rounded"
                          title={t.copy_tooltip}
                        >
                          {copiedSection === "op_mech" ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>
                    <FormattedAcademicText
                      content={getTermOperationalMechanism(activeTerm, languageMode)}
                      className="text-slate-700 dark:text-slate-300 text-sm sm:text-base"
                      variant="mechanism"
                    />
                  </section>
                )}

                {/* 3. KHỐI BẪY DÙNG TỪ & LỖI THƯỜNG GẶP */}
                {getTermPitfalls(activeTerm, languageMode) && (
                  <section id="section-pitfalls" className="p-4 rounded-xl border-l-4 border-amber-500 bg-amber-50/40 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 space-y-2">
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
                    <FormattedAcademicText
                      content={getTermPitfalls(activeTerm, languageMode)}
                      className="text-slate-700 dark:text-slate-300 text-sm sm:text-base"
                      variant="pitfalls"
                    />
                  </section>
                )}

                {/* 4. KHỐI CHỈ SỐ NGƯỠNG HOẶC ĐỐI ĐẦU HỌC THUẬT */}
                {(getTermBenchmarks(activeTerm, languageMode) || getTermDebates(activeTerm, languageMode)) && (
                  <section id="section-benchmarks" className="p-4 rounded-xl border-l-4 border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-3">
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
                        <FormattedAcademicText
                          content={getTermBenchmarks(activeTerm, languageMode)}
                          className="text-slate-700 dark:text-slate-300 text-sm sm:text-base font-mono"
                          variant="benchmarks"
                        />
                      </div>
                    )}

                    {getTermDebates(activeTerm, languageMode) && (
                      <div className="space-y-1 pt-2 border-t border-emerald-200/60 dark:border-emerald-900/40">
                        <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
                          {t.sec_debates}
                        </span>
                        <FormattedAcademicText
                          content={getTermDebates(activeTerm, languageMode)}
                          className="text-slate-700 dark:text-slate-300 text-sm sm:text-base"
                          variant="default"
                        />
                      </div>
                    )}
                  </section>
                )}

                {/* 5. CÁC BIẾN THỂ CON / THUẬT NGỮ LIÊN ĐỚI */}
                {activeTerm.corpus_variants && activeTerm.corpus_variants.length > 0 && (
                  <section id="section-variants" className="space-y-2.5 pt-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Layers size={14} /> {t.sec_variants}
                      </h3>
                      <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium hidden sm:inline">
                        {languageMode === "en" ? "Click any variant to jump" : "Nhấp vào biến thể để tra cứu nhanh"}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {activeTerm.corpus_variants.map((v, i) => (
                        <div
                          key={i}
                          onClick={() => handleJumpToVariant(v.v)}
                          className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-blue-50/70 dark:hover:bg-slate-800/90 hover:border-blue-300 dark:hover:border-blue-600 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 group shadow-2xs"
                        >
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                                {v.v}
                              </span>{" "}
                              {languageMode === "vi" && v.vn && (
                                <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                                  ({v.vn})
                                </span>
                              )}
                              <ArrowRight size={13} className="text-blue-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition shrink-0" />
                            </div>
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
                  <section id="section-expert-notes" className="p-4 rounded-xl border-l-4 border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-2">
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

                {/* 6.5 KHỐI THUẬT NGỮ LIÊN QUAN & XEM THÊM (RELATED TERMS & CROSS-REFERENCES) */}
                {activeTerm.related_terms && activeTerm.related_terms.length > 0 && (
                  <section id="section-related" className="p-4 sm:p-5 rounded-xl border border-blue-200/80 dark:border-blue-900/50 bg-blue-50/30 dark:bg-blue-950/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                          <Network size={16} />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                            {t.sec_related_terms}
                          </h3>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {t.related_terms_hint}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                      {activeTerm.related_terms.map((relId) => {
                        const relTerm = termsMap.get(relId);
                        if (!relTerm) return null;
                        return (
                          <button
                            key={relId}
                            onClick={() => {
                              setSelectedId(relId);
                              setMobileTab("detail");
                              contentScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                              const el = document.getElementById(`list-item-${relId}`);
                              if (el) {
                                el.scrollIntoView({ block: "nearest", behavior: "smooth" });
                              }
                            }}
                            className="group text-left p-3 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-800/90 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xs hover:bg-blue-50/40 dark:hover:bg-slate-800 transition flex flex-col justify-between gap-1.5"
                            title={t.jump_tooltip}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition line-clamp-1">
                                {relTerm.term}
                              </span>
                              <ArrowRight size={13} className="shrink-0 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition" />
                            </div>
                            {languageMode === "vi" && relTerm.vietnamese && (
                              <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1">
                                {relTerm.vietnamese}
                              </p>
                            )}
                            <div className="flex items-center gap-1.5 pt-0.5">
                              {relTerm.category && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium">
                                  {relTerm.category}
                                </span>
                              )}
                              {relTerm.domain_tags && relTerm.domain_tags[0] && relTerm.domain_tags[0] !== relTerm.category && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 font-mono">
                                  #{relTerm.domain_tags[0]}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* 7. KHỐI TRÍCH DẪN UY TÍN */}
                <footer id="section-citations" className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 space-y-3">
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
                <section id="section-provenance" className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 space-y-3">
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
                  <FormattedAcademicText
                    content={getAcronymPurpose(activeAcronym, languageMode)}
                    className="text-slate-800 dark:text-slate-200 font-serif text-base sm:text-lg"
                    variant="definition"
                  />
                </section>

                {/* Ngưỡng tham chiếu */}
                {getAcronymBenchmark(activeAcronym, languageMode) && (
                  <section className="p-4 rounded-xl border-l-4 border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-2">
                    <div className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={14} /> {t.sec_acronym_benchmark}
                    </div>
                    <FormattedAcademicText
                      content={getAcronymBenchmark(activeAcronym, languageMode)}
                      className="text-slate-700 dark:text-slate-300 text-sm sm:text-base font-mono"
                      variant="benchmarks"
                    />
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

      {/* NÚT NỔI QUAY LẠI DANH SÁCH TRÊN DI ĐỘNG (MOBILE FLOATING BACK BUTTON) */}
      {mobileTab === "detail" && (
        <button
          onClick={() => setMobileTab("list")}
          className="no-print sm:hidden fixed bottom-5 right-5 z-40 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-4 py-2.5 rounded-full shadow-2xl border border-blue-500/50 flex items-center gap-2 text-xs font-semibold transition"
          title={languageMode === "en" ? "Back to list" : "Quay lại danh sách"}
        >
          <ChevronLeft size={16} />
          <span>{languageMode === "en" ? `List (${searchResults.length})` : `Danh mục (${searchResults.length})`}</span>
        </button>
      )}

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

      {/* COMMAND PALETTE TOÀN CẦU (CTRL + K / CMD + K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        terms={initialTerms}
        acronyms={initialAcronyms}
        languageMode={languageMode}
        onSelectTerm={(id) => {
          setSelectedId(id);
          setMobileTab("detail");
        }}
        onToggleLanguage={() => handleToggleLanguage(languageMode === "vi" ? "en" : "vi")}
        onToggleZenMode={() => setIsZenMode((prev) => !prev)}
        onOpenNewTermModal={() => setIsNewTermModalOpen(true)}
        onFilterSaved={() => setFilterType("saved")}
        recentSearches={recentSearches}
        onClearRecentSearches={handleClearRecentSearches}
      />
    </div>
  );
}
