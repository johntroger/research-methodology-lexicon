"use client";

import React from "react";

interface FormattedAcademicTextProps {
  content?: string | string[];
  className?: string;
  variant?: "default" | "definition" | "mechanism" | "pitfalls" | "benchmarks";
}

interface ParsedBlock {
  type: "paragraph" | "numbered" | "bullet" | "heading";
  badge?: string;
  label?: string;
  body: string;
}

const PROTECTED_ABBREVIATIONS = [
  /et al\./gi,
  /e\.g\./gi,
  /i\.e\./gi,
  /vs\./gi,
  /Fig\./gi,
  /pp?\./gi,
  /Vol\./gi,
  /No\./gi,
  /Dr\./gi,
  /Prof\./gi,
  /Ph\.D\./gi,
  /U\.S\./gi,
  /approx\./gi
];

function splitSentencesSafely(text: string): string[] {
  let masked = text;
  const masks: { token: string; match: string }[] = [];
  PROTECTED_ABBREVIATIONS.forEach((regex, idx) => {
    masked = masked.replace(regex, (match) => {
      const token = `___ABBR_${idx}_${masks.length}___`;
      masks.push({ token, match });
      return token;
    });
  });

  const rawSentences = masked.split(/(?<=[.!?])\s+(?=[A-ZÀ-Ỹ0-9])/);

  return rawSentences
    .map((sent) => {
      let restored = sent;
      masks.forEach(({ token, match }) => {
        restored = restored.replaceAll(token, match);
      });
      return restored.trim();
    })
    .filter(Boolean);
}

function parseText(input?: string | string[]): ParsedBlock[] {
  if (!input) return [];

  if (Array.isArray(input)) {
    return input.map((item) => {
      const text = String(item).trim();
      const colonIdx = text.indexOf(":");
      if (colonIdx > 0 && colonIdx < 45) {
        return {
          type: "bullet",
          label: text.slice(0, colonIdx + 1).trim(),
          body: text.slice(colonIdx + 1).trim(),
        };
      }
      return { type: "bullet", body: text };
    });
  }

  const rawText = String(input).trim();
  if (!rawText) return [];

  // Split by explicit double or single newlines
  const rawSections = rawText
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const blocks: ParsedBlock[] = [];

  for (const section of rawSections) {
    // Check if section contains numbered points like (1) ... (2) ... or (a) ... (b) ...
    const parenNumMatch = section.match(/\([1-9a-d]\)\s+/g);
    const dotNumMatch = section.match(/(?:^|\s)[1-9]\.\s+/g);

    if (parenNumMatch && parenNumMatch.length >= 2) {
      const parts = section.split(/(?=\([1-9a-d]\)\s+)/);
      for (const part of parts) {
        const trimmed = part.trim();
        const m = trimmed.match(/^(\([1-9a-d]\))\s*([\s\S]*)/);
        if (m) {
          const bodyText = m[2].trim();
          const colonIdx = bodyText.indexOf(":");
          if (colonIdx > 0 && colonIdx < 40) {
            blocks.push({
              type: "numbered",
              badge: m[1],
              label: bodyText.slice(0, colonIdx + 1).trim(),
              body: bodyText.slice(colonIdx + 1).trim(),
            });
          } else {
            blocks.push({ type: "numbered", badge: m[1], body: bodyText });
          }
        } else if (trimmed) {
          blocks.push({ type: "paragraph", body: trimmed });
        }
      }
    } else if (dotNumMatch && dotNumMatch.length >= 2) {
      const parts = section.split(/(?=(?:^|\s)[1-9]\.\s+)/);
      for (const part of parts) {
        const trimmed = part.trim();
        const m = trimmed.match(/^([1-9]\.)\s*([\s\S]*)/);
        if (m) {
          const bodyText = m[2].trim();
          const colonIdx = bodyText.indexOf(":");
          if (colonIdx > 0 && colonIdx < 40) {
            blocks.push({
              type: "numbered",
              badge: m[1],
              label: bodyText.slice(0, colonIdx + 1).trim(),
              body: bodyText.slice(colonIdx + 1).trim(),
            });
          } else {
            blocks.push({ type: "numbered", badge: m[1], body: bodyText });
          }
        } else if (trimmed) {
          blocks.push({ type: "paragraph", body: trimmed });
        }
      }
    } else if (section.startsWith("- ") || section.startsWith("• ") || section.startsWith("* ")) {
      const clean = section.replace(/^[-•*]\s*/, "").trim();
      const colonIdx = clean.indexOf(":");
      if (colonIdx > 0 && colonIdx < 40) {
        blocks.push({
          type: "bullet",
          label: clean.slice(0, colonIdx + 1).trim(),
          body: clean.slice(colonIdx + 1).trim(),
        });
      } else {
        blocks.push({ type: "bullet", body: clean });
      }
    } else {
      // Long section: split by sentence if > 180 chars and multiple sentences
      const sentences = splitSentencesSafely(section);
      if (sentences.length >= 2 && section.length > 180) {
        sentences.forEach((sent) => {
          const colonIdx = sent.indexOf(":");
          if (colonIdx > 0 && colonIdx < 45 && !sent.slice(0, colonIdx).includes(" ")) {
            blocks.push({
              type: "paragraph",
              label: sent.slice(0, colonIdx + 1).trim(),
              body: sent.slice(colonIdx + 1).trim(),
            });
          } else if (
            sent.startsWith("BẪY TỬ HUYỆT") ||
            sent.startsWith("Quy chuẩn") ||
            sent.startsWith("Khuyến cáo") ||
            sent.startsWith("Độ giá trị")
          ) {
            const cIdx = sent.indexOf(":");
            if (cIdx > 0) {
              blocks.push({
                type: "heading",
                label: sent.slice(0, cIdx + 1).trim(),
                body: sent.slice(cIdx + 1).trim(),
              });
            } else {
              blocks.push({ type: "paragraph", body: sent });
            }
          } else {
            blocks.push({ type: "paragraph", body: sent });
          }
        });
      } else {
        const colonIdx = section.indexOf(":");
        if (
          colonIdx > 0 &&
          (section.startsWith("BẪY TỬ HUYỆT") ||
            section.startsWith("Quy chuẩn") ||
            section.startsWith("Khuyến cáo") ||
            section.startsWith("Độ giá trị") ||
            section.startsWith("Convergent Validity") ||
            section.startsWith("Discriminant Validity"))
        ) {
          blocks.push({
            type: "heading",
            label: section.slice(0, colonIdx + 1).trim(),
            body: section.slice(colonIdx + 1).trim(),
          });
        } else {
          blocks.push({ type: "paragraph", body: section });
        }
      }
    }
  }

  return blocks;
}

export default function FormattedAcademicText({
  content,
  className = "",
  variant = "default",
}: FormattedAcademicTextProps) {
  const blocks = parseText(content);

  if (blocks.length === 0) return null;

  // Variant color mappings for badges & bullets
  const badgeStyles = {
    default: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    definition: "bg-blue-100/80 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800/60 font-semibold",
    mechanism: "bg-indigo-100/80 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60 font-semibold",
    pitfalls: "bg-amber-100/90 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800/60 font-semibold",
    benchmarks: "bg-emerald-100/90 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60 font-semibold",
  }[variant];

  const bulletColors = {
    default: "text-slate-400 dark:text-slate-500",
    definition: "text-blue-500 dark:text-blue-400",
    mechanism: "text-indigo-500 dark:text-indigo-400",
    pitfalls: "text-amber-500 dark:text-amber-400",
    benchmarks: "text-emerald-500 dark:text-emerald-400",
  }[variant];

  const labelColors = {
    default: "text-slate-900 dark:text-slate-100 font-bold",
    definition: "text-blue-900 dark:text-blue-200 font-bold",
    mechanism: "text-indigo-900 dark:text-indigo-200 font-bold",
    pitfalls: "text-amber-950 dark:text-amber-200 font-bold uppercase tracking-wide",
    benchmarks: "text-emerald-950 dark:text-emerald-200 font-bold",
  }[variant];

  return (
    <div className={`space-y-3 ${className}`}>
      {blocks.map((block, index) => {
        if (block.type === "numbered") {
          return (
            <div
              key={index}
              className="flex items-start gap-2.5 sm:gap-3 pl-1 sm:pl-2 py-0.5"
            >
              <span
                className={`shrink-0 inline-flex items-center justify-center text-xs px-2 py-0.5 rounded-md border shadow-2xs ${badgeStyles}`}
              >
                {block.badge}
              </span>
              <div className="flex-1 leading-relaxed">
                {block.label && (
                  <span className={`mr-1.5 ${labelColors}`}>{block.label}</span>
                )}
                <span>{block.body}</span>
              </div>
            </div>
          );
        }

        if (block.type === "bullet") {
          return (
            <div
              key={index}
              className="flex items-start gap-2.5 sm:gap-3 pl-1.5 sm:pl-2.5 py-0.5"
            >
              <span className={`shrink-0 text-base leading-none mt-1 select-none ${bulletColors}`}>
                •
              </span>
              <div className="flex-1 leading-relaxed">
                {block.label && (
                  <span className={`mr-1.5 ${labelColors}`}>{block.label}</span>
                )}
                <span>{block.body}</span>
              </div>
            </div>
          );
        }

        if (block.type === "heading") {
          return (
            <div
              key={index}
              className="pt-1.5 pb-0.5 border-t border-slate-200/60 dark:border-slate-800/60 first:border-t-0 first:pt-0"
            >
              {block.label && (
                <div className={`text-xs uppercase tracking-wider mb-1 ${labelColors}`}>
                  {block.label}
                </div>
              )}
              {block.body && <p className="leading-relaxed">{block.body}</p>}
            </div>
          );
        }

        // Standard paragraph
        return (
          <p key={index} className="leading-relaxed">
            {block.label && (
              <span className={`mr-1.5 ${labelColors}`}>{block.label}</span>
            )}
            {block.body}
          </p>
        );
      })}
    </div>
  );
}
