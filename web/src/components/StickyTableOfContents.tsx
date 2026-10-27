"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Cpu,
  AlertTriangle,
  Sparkles,
  Layers,
  GraduationCap,
  Network,
  ShieldCheck,
  Award,
  ChevronUp
} from "lucide-react";

export interface TocSectionItem {
  id: string;
  label: string;
  shortLabel?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface StickyTableOfContentsProps {
  sections: TocSectionItem[];
  containerRef?: React.RefObject<HTMLDivElement | null>;
  languageMode?: "vi" | "en";
}

export default function StickyTableOfContents({
  sections,
  containerRef,
  languageMode = "vi"
}: StickyTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");

  useEffect(() => {
    if (sections.length === 0) return;

    // Thiết lập IntersectionObserver để phát hiện mục đang đọc
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Tìm mục xuất hiện rõ nhất
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Lấy mục có tỷ lệ hiển thị cao nhất hoặc mục đầu tiên xuất hiện từ trên xuống
        const best = visibleEntries.reduce((prev, current) =>
          current.intersectionRatio > prev.intersectionRatio ? current : prev
        );
        setActiveId(best.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: containerRef ? containerRef.current : null,
      rootMargin: "-10% 0px -70% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1.0]
    });

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections, containerRef]);

  const scrollToSection = (id: string) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    if (containerRef && containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (sections.length <= 1) return null;

  return (
    <div className="no-print">
      {/* 1. THANH CHỈ MỤC GẮN LỀ PHẢI TRÊN MÀN HÌNH LỚN (Desktop Floating TOC Rail) */}
      <nav 
        aria-label="Table of contents"
        className="hidden 2xl:flex flex-col gap-1 fixed right-6 top-28 z-30 w-52 p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-lg text-xs"
      >
        <div className="flex items-center justify-between pb-2 mb-1 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          <span>{languageMode === "en" ? "Contents" : "Mục lục bài đọc"}</span>
          <button
            onClick={scrollToTop}
            className="p-1 hover:text-blue-600 dark:hover:text-blue-400 rounded transition"
            title={languageMode === "en" ? "Back to top" : "Lên đầu trang"}
          >
            <ChevronUp size={13} />
          </button>
        </div>

        <div className="space-y-0.5">
          {sections.map((sec) => {
            const isActive = activeId === sec.id;
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`w-full text-left px-2 py-1.5 rounded-lg transition flex items-center gap-2 group ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                <Icon
                  size={13}
                  className={`shrink-0 transition-colors ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                  }`}
                />
                <span className="truncate">{sec.shortLabel || sec.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* 2. THANH CHỈ MỤC DẠNG PILL FLOATING Ở TRÊN ĐẦU TRANG CHO MÀN HÌNH VỪA & NHỎ (Tablet & Laptop) */}
      <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-10 px-4 sm:px-6 md:px-8 lg:px-10 py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/70 dark:border-slate-800/70 mb-6 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1 hidden sm:inline">
          {languageMode === "en" ? "Jump to:" : "Mục:"}
        </span>
        {sections.map((sec) => {
          const isActive = activeId === sec.id;
          const Icon = sec.icon;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`shrink-0 px-2.5 py-1 rounded-full text-xs transition flex items-center gap-1.5 border ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600 font-medium shadow-xs"
                  : "bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300"
              }`}
            >
              <Icon size={12} className={isActive ? "text-white" : "text-slate-500"} />
              <span className="whitespace-nowrap">{sec.shortLabel || sec.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
