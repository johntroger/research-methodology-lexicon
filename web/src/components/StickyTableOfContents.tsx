"use client";

import React, { useState, useEffect } from "react";

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

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        const best = visibleEntries.reduce((prev, current) =>
          current.intersectionRatio > prev.intersectionRatio ? current : prev
        );
        setActiveId(best.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: containerRef ? containerRef.current : null,
      rootMargin: "-5% 0px -65% 0px",
      threshold: [0, 0.2, 0.5, 0.8, 1.0]
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

  if (sections.length <= 1) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="no-print -mt-1 mb-4 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1.5 px-0.5"
    >
      <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
        {languageMode === "en" ? "Sections:" : "Chuyển nhanh:"}
      </span>
      {sections.map((sec) => {
        const isActive = activeId === sec.id;
        const Icon = sec.icon;
        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className={`shrink-0 px-2.5 py-1 rounded-lg text-xs transition flex items-center gap-1.5 border cursor-pointer ${
              isActive
                ? "bg-blue-50 dark:bg-blue-950/70 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-semibold shadow-2xs"
                : "bg-slate-50/80 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Icon
              size={12}
              className={
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-400"
              }
            />
            <span className="whitespace-nowrap">{sec.shortLabel || sec.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
