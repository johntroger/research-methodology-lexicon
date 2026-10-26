"use client";

import React, { useState } from "react";
import { computeWordDiff, DiffSegment } from "@/lib/diff-helper";
import { Split, AlignLeft, Check, Copy } from "lucide-react";

interface VisualDiffViewerProps {
  original: string;
  proposed: string;
  label?: string;
  defaultView?: "split" | "inline";
}

export default function VisualDiffViewer({
  original,
  proposed,
  label,
  defaultView = "split"
}: VisualDiffViewerProps) {
  const [viewMode, setViewMode] = useState<"split" | "inline">(defaultView);
  const [copied, setCopied] = useState(false);

  const diffSegments = computeWordDiff(original, proposed);
  const hasChanges = diffSegments.some(s => s.type !== "unchanged");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden text-xs shadow-xs">
      {/* Header thanh công cụ Diff */}
      <div className="px-3.5 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {label && (
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {label}
            </span>
          )}
          {hasChanges ? (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
              Có sửa đổi
            </span>
          ) : (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500">
              Không đổi
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {/* Nút chuyển đổi chế độ xem So sánh Song song / Xen kẽ */}
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-md p-0.5 bg-white dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setViewMode("split")}
              className={`p-1 rounded transition ${
                viewMode === "split"
                  ? "bg-blue-600 text-white shadow-2xs"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
              title="Xem so sánh 2 cột song song (Side-by-side)"
            >
              <Split size={13} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("inline")}
              className={`p-1 rounded transition ${
                viewMode === "inline"
                  ? "bg-blue-600 text-white shadow-2xs"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
              title="Xem so sánh xen kẽ (Inline Diff)"
            >
              <AlignLeft size={13} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleCopy(proposed)}
            className="p-1 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition"
            title="Sao chép nội dung đề xuất"
          >
            {copied ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
          </button>
        </div>
      </div>

      {/* Vùng hiển thị nội dung Diff */}
      {viewMode === "split" ? (
        /* CHẾ ĐỘ 1: XEM 2 CỘT SONG SONG (SIDE-BY-SIDE) */
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
          {/* Cột trái: Bản gốc hiện tại */}
          <div className="p-3.5 space-y-1.5 bg-slate-50/40 dark:bg-slate-900/40">
            <div className="flex items-center justify-between text-[11px] font-bold text-red-700 dark:text-red-400 uppercase tracking-wider">
              <span>Bản gốc hiện tại (Original)</span>
            </div>
            <div className="font-serif leading-relaxed text-slate-700 dark:text-slate-300 select-all whitespace-pre-wrap">
              {diffSegments.map((seg, idx) => {
                if (seg.type === "added") return null;
                if (seg.type === "removed") {
                  return (
                    <span
                      key={idx}
                      className="bg-red-100 text-red-900 dark:bg-red-950/80 dark:text-red-200 line-through px-0.5 rounded font-medium"
                    >
                      {seg.value}
                    </span>
                  );
                }
                return <span key={idx}>{seg.value}</span>;
              })}
            </div>
          </div>

          {/* Cột phải: Bản đề xuất mới */}
          <div className="p-3.5 space-y-1.5 bg-emerald-50/20 dark:bg-emerald-950/10">
            <div className="flex items-center justify-between text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <span>Bản đề xuất mới (Proposed)</span>
            </div>
            <div className="font-serif leading-relaxed text-slate-800 dark:text-slate-200 select-all whitespace-pre-wrap">
              {diffSegments.map((seg, idx) => {
                if (seg.type === "removed") return null;
                if (seg.type === "added") {
                  return (
                    <span
                      key={idx}
                      className="bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-200 font-semibold px-0.5 rounded border border-emerald-300 dark:border-emerald-700"
                    >
                      {seg.value}
                    </span>
                  );
                }
                return <span key={idx}>{seg.value}</span>;
              })}
            </div>
          </div>
        </div>
      ) : (
        /* CHẾ ĐỘ 2: XEM XEN KẼ (INLINE RED/GREEN DIFF) */
        <div className="p-3.5 font-serif leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap select-all">
          {diffSegments.map((seg, idx) => {
            if (seg.type === "removed") {
              return (
                <span
                  key={idx}
                  className="bg-red-100 text-red-900 dark:bg-red-950/80 dark:text-red-200 line-through px-0.5 rounded mx-0.5 font-medium"
                >
                  {seg.value}
                </span>
              );
            }
            if (seg.type === "added") {
              return (
                <span
                  key={idx}
                  className="bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-200 font-semibold px-0.5 rounded mx-0.5 border border-emerald-300 dark:border-emerald-700"
                >
                  {seg.value}
                </span>
              );
            }
            return <span key={idx}>{seg.value}</span>;
          })}
        </div>
      )}
    </div>
  );
}
