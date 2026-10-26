"use client";

import React, { useState } from "react";
import { Copy, Check, Download, X, BookMarked, Code2 } from "lucide-react";
import { MethodologyTerm } from "@/lib/types";
import {
  getAPAInText,
  getAPAReference,
  generateBibTeX,
  downloadRISFile
} from "@/lib/citation-helper";

interface CitationModalProps {
  term: MethodologyTerm;
  isOpen: boolean;
  onClose: () => void;
}

export default function CitationModal({ term, isOpen, onClose }: CitationModalProps) {
  const [activeTab, setActiveTab] = useState<"apa" | "bibtex">("apa");
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const inText = getAPAInText(term);
  const apaRef = getAPAReference(term);
  const bibtex = generateBibTeX(term);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookMarked className="text-blue-600" size={20} />
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              Xuất Trích Dẫn Học Thuật (Citation)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-5 pt-3 flex gap-2 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("apa")}
            className={`py-2 px-3 border-b-2 transition ${
              activeTab === "apa"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Chuẩn APA 7th (Word / PDF)
          </button>
          <button
            onClick={() => setActiveTab("bibtex")}
            className={`py-2 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === "bibtex"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <Code2 size={13} /> BibTeX (LaTeX / Overleaf)
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {activeTab === "apa" ? (
            <>
              {/* In-text citation */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span>Trích dẫn trong bài (In-text citation)</span>
                  <button
                    onClick={() => handleCopy(inText, "intext")}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 font-normal lowercase"
                  >
                    {copiedType === "intext" ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
                    {copiedType === "intext" ? "Đã chép" : "Copy"}
                  </button>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-serif text-slate-800 dark:text-slate-200 text-sm select-all">
                  {inText}
                </div>
              </div>

              {/* Full Bibliography */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span>Danh mục Tài liệu tham khảo (APA 7th Reference)</span>
                  <button
                    onClick={() => handleCopy(apaRef, "aparef")}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 font-normal lowercase"
                  >
                    {copiedType === "aparef" ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
                    {copiedType === "aparef" ? "Đã chép" : "Copy"}
                  </button>
                </div>
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-serif text-slate-800 dark:text-slate-200 text-sm leading-relaxed pl-7 -indent-5 select-all">
                  {apaRef}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Mã nguồn BibTeX</span>
                <button
                  onClick={() => handleCopy(bibtex, "bibtex")}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 font-normal lowercase"
                >
                  {copiedType === "bibtex" ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
                  {copiedType === "bibtex" ? "Đã chép" : "Copy"}
                </button>
              </div>
              <pre className="p-3.5 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono leading-relaxed overflow-x-auto">
                {bibtex}
              </pre>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50/80 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-slate-500">
            Hỗ trợ Zotero, Mendeley, EndNote & Overleaf
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => downloadRISFile(term)}
              className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium hover:bg-slate-50 transition flex items-center gap-1.5 text-slate-700 dark:text-slate-300 shadow-xs"
            >
              <Download size={13} /> Tải file .RIS (Zotero)
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Xong
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
