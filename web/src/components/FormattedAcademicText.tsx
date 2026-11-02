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
  /approx\./gi,
  /s\.e\./gi,
  /c\.p\./gi,
];

const GREEK_MAP: Record<string, string> = {
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  varepsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  vartheta: "θ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  pi: "π",
  rho: "ρ",
  varrho: "ρ",
  sigma: "σ",
  varsigma: "σ",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  varphi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  Gamma: "Γ",
  Delta: "Δ",
  Theta: "Θ",
  Lambda: "Λ",
  Xi: "Ξ",
  Pi: "Π",
  Sigma: "Σ",
  Upsilon: "Υ",
  Phi: "Φ",
  Chi: "χ",
  Psi: "Ψ",
  Omega: "Ω",
};

const GREEK_NAMES_PATTERN =
  "alpha|beta|gamma|delta|varepsilon|epsilon|zeta|eta|vartheta|theta|kappa|lambda|mu|nu|xi|pi|varrho|rho|varsigma|sigma|tau|varphi|phi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Phi|Chi|Psi|Omega";

function replaceBalancedCommand(
  input: string,
  cmdPattern: RegExp,
  replacer: (arg1: string, arg2?: string) => string,
  twoArgs = false
): string {
  let result = input;
  let safety = 0;
  while (safety < 40) {
    safety++;
    const match = cmdPattern.exec(result);
    if (!match) break;
    const startIdx = match.index;
    const openBraceIdx = startIdx + match[0].length - 1; // points to '{'
    let depth = 0;
    let endBrace1 = -1;
    for (let i = openBraceIdx; i < result.length; i++) {
      if (result[i] === "{") depth++;
      else if (result[i] === "}") {
        depth--;
        if (depth === 0) {
          endBrace1 = i;
          break;
        }
      }
    }
    if (endBrace1 === -1) break;
    const arg1 = result.slice(openBraceIdx + 1, endBrace1);

    if (!twoArgs) {
      const replacement = replacer(arg1);
      result = result.slice(0, startIdx) + replacement + result.slice(endBrace1 + 1);
      cmdPattern.lastIndex = 0;
      continue;
    }

    // Expect second '{'
    let nextIdx = endBrace1 + 1;
    while (nextIdx < result.length && result[nextIdx] === " ") nextIdx++;
    if (result[nextIdx] !== "{") {
      // Fallback if only 1 brace
      break;
    }
    let depth2 = 0;
    let endBrace2 = -1;
    for (let i = nextIdx; i < result.length; i++) {
      if (result[i] === "{") depth2++;
      else if (result[i] === "}") {
        depth2--;
        if (depth2 === 0) {
          endBrace2 = i;
          break;
        }
      }
    }
    if (endBrace2 === -1) break;
    const arg2 = result.slice(nextIdx + 1, endBrace2);
    const replacement = replacer(arg1, arg2);
    result = result.slice(0, startIdx) + replacement + result.slice(endBrace2 + 1);
    cmdPattern.lastIndex = 0;
  }
  return result;
}

function applyAccent(inner: string, combiningChar: string): string {
  const clean = inner.trim();
  const greekConverted = GREEK_MAP[clean] || clean;
  if (greekConverted.length === 0) return "";
  if (greekConverted.length === 1) {
    return greekConverted + combiningChar;
  }
  // Put combining accent on the first character (e.g. Var -> V̂ar, AVE -> ĀVE)
  return greekConverted[0] + combiningChar + greekConverted.slice(1);
}

/**
 * Chuẩn hóa biểu thức toán học LaTeX và pseudo-LaTeX sang ký hiệu Unicode chuẩn mực,
 * bảo toàn cấu trúc chỉ số dưới (_) và chỉ số trên (^) cho bộ dựng React.
 */
function normalizeMathNotation(raw: string): string {
  if (!raw) return "";

  // 1. Bảo vệ các đoạn mã trong dấu backtick `...`
  const codeMocks: string[] = [];
  let s = raw.replace(/`([^`]+)`/g, (m) => {
    const token = `___CODEMASK_${codeMocks.length}___`;
    codeMocks.push(m);
    return token;
  });

  // 2. Xóa các từ khóa định cỡ ngoặc của LaTeX
  s = s
    .replace(/\\left\s*\(/g, "(")
    .replace(/\\right\s*\)/g, ")")
    .replace(/\\left\s*\[/g, "[")
    .replace(/\\right\s*\]/g, "]")
    .replace(/\\left\s*\\\{/g, "{")
    .replace(/\\right\s*\\\}/g, "}")
    .replace(/\\left\s*\|/g, "|")
    .replace(/\\right\s*\|/g, "|")
    .replace(/\\left\b/g, "")
    .replace(/\\right\b/g, "");

  // 3. Giải nén các lệnh định dạng chữ trong toán học: \text{...}, \mathbf{...}, \mathrm{...}, \mathcal{...}
  s = replaceBalancedCommand(
    s,
    /\\(?:text|mathrm|mathbf|mathcal|boldsymbol|operatorname|mathit)\s*\{/g,
    (arg1) => arg1
  );

  // 4. Chuyển đổi các lệnh LaTeX có dấu gạch chéo ngược (\alpha, \beta, ...)
  s = s.replace(
    new RegExp(`\\\\(${GREEK_NAMES_PATTERN})\\b`, "g"),
    (_, name) => GREEK_MAP[name] || name
  );

  // 5. Chuyển đổi các lệnh dấu mũ / gạch ngang / ngã: \hat{x}, hat{x}, \widehat{x}, widehat{x}, \bar{x}, bar{x}, \tilde{x}, tilde{x}, \vec{x}
  s = replaceBalancedCommand(s, /\\?widehat\s*\{/g, (arg) => applyAccent(arg, "\u0302"));
  s = replaceBalancedCommand(s, /\\?widetilde\s*\{/g, (arg) => applyAccent(arg, "\u0303"));
  s = replaceBalancedCommand(s, /(?:\\hat|\bhat)\s*\{/g, (arg) => applyAccent(arg, "\u0302"));
  s = replaceBalancedCommand(s, /(?:\\bar|\bbar)\s*\{/g, (arg) => applyAccent(arg, "\u0304"));
  s = replaceBalancedCommand(s, /(?:\\tilde|\btilde)\s*\{/g, (arg) => applyAccent(arg, "\u0303"));
  s = replaceBalancedCommand(s, /(?:\\vec|\bvec)\s*\{/g, (arg) => applyAccent(arg, "\u20d7"));
  s = replaceBalancedCommand(s, /\\dot\s*\{/g, (arg) => applyAccent(arg, "\u0307"));
  s = replaceBalancedCommand(s, /\\ddot\s*\{/g, (arg) => applyAccent(arg, "\u0308"));

  // 6. Chuyển đổi phân số \frac{a}{b}
  s = replaceBalancedCommand(
    s,
    /\\frac\s*\{/g,
    (num, den = "") => {
      const n = num.trim();
      const d = den.trim();
      const nClean = /^[a-zA-Z0-9\u0370-\u03ff_^{}\u0300-\u036f]+$/.test(n) ? n : `(${n})`;
      const dClean = /^[a-zA-Z0-9\u0370-\u03ff_^{}\u0300-\u036f]+$/.test(d) ? d : `(${d})`;
      return `${nClean}/${dClean}`;
    },
    true
  );

  // 7. Chuyển đổi căn bậc hai \sqrt{...} và sqrt(...)
  s = replaceBalancedCommand(s, /\\sqrt\s*\{/g, (arg) => {
    const a = arg.trim();
    return a.length <= 2 ? `√${a}` : `√(${a})`;
  });
  s = s.replace(/\bsqrt\s*\(/g, "√(");

  // 8. Chuyển đổi tổng, tích, tích phân, giới hạn
  s = s
    .replace(/\\sum\b/g, "∑")
    .replace(/\bsum(?=_|\^|\s*\[|\s*\()/g, "∑")
    .replace(/\bsum\s+(?=∑)/g, "∑ ")
    .replace(/\\prod\b/g, "∏")
    .replace(/\bprod(?=_|\^)/g, "∏")
    .replace(/\\int\b/g, "∫")
    .replace(/\bintegral(?=_|\^)/g, "∫")
    .replace(/\\lim\b/g, "lim")
    .replace(/\\log\b/g, "log")
    .replace(/\\ln\b/g, "ln")
    .replace(/\\exp\b/g, "exp")
    .replace(/\\sin\b/g, "sin")
    .replace(/\\cos\b/g, "cos")
    .replace(/\\min\b/g, "min")
    .replace(/\\max\b/g, "max")
    .replace(/\\sup\b/g, "sup")
    .replace(/\\inf\b/g, "inf")
    .replace(/\\det\b/g, "det")
    .replace(/\\Pr\b/g, "Pr")
    .replace(/\\Cov\b/g, "Cov")
    .replace(/\\Var\b/g, "Var");

  // 9. Chuyển đổi các toán tử LaTeX và tổ hợp ký tự toán học
  s = s
    .replace(/\\(?:ge|geq)\b/g, "≥")
    .replace(/\\(?:le|leq)\b/g, "≤")
    .replace(/\\(?:ne|neq)\b/g, "≠")
    .replace(/\\approx\b/g, "≈")
    .replace(/\\sim\b/g, "~")
    .replace(/\\equiv\b/g, "≡")
    .replace(/\\propto\b/g, "∝")
    .replace(/\\pm\b/g, "±")
    .replace(/\\times\b/g, "×")
    .replace(/\\cdot\b/g, "·")
    .replace(/\\(?:to|rightarrow)\b/g, "→")
    .replace(/\\leftarrow\b/g, "←")
    .replace(/\\downarrow\b/g, "↓")
    .replace(/\\uparrow\b/g, "↑")
    .replace(/\\Rightarrow\b/g, "⇒")
    .replace(/\\Leftrightarrow\b/g, "⇔")
    .replace(/\\forall\b/g, "∀")
    .replace(/\\exists\b/g, "∃")
    .replace(/\\in\b/g, "∈")
    .replace(/\\notin\b/g, "∉")
    .replace(/\\subseteq\b/g, "⊆")
    .replace(/\\subset\b/g, "⊂")
    .replace(/\\setminus\b/g, "∖")
    .replace(/\\perp\b/g, "⊥")
    .replace(/\\mid\b/g, "|")
    .replace(/\\infty\b/g, "∞")
    .replace(/\\partial\b/g, "∂")
    .replace(/\\nabla\b/g, "∇")
    .replace(/\\top\b/g, "⊤")
    .replace(/\\(?:dots|ldots|cdots)\b/g, "…")
    .replace(/\\\{/g, "{")
    .replace(/\\\}/g, "}");

  // Toán tử ASCII trong ngữ cảnh công thức
  s = s
    .replace(/(?<=[a-zA-Z0-9\u0370-\u03ff_}\])\s])>=(?=\s*[+-]?[a-zA-Z0-9\u0370-\u03ff_({[])/g, "≥")
    .replace(/(?<=[a-zA-Z0-9\u0370-\u03ff_}\])\s])<=(?=\s*[+-]?[a-zA-Z0-9\u0370-\u03ff_({[])/g, "≤")
    .replace(/(?<=[a-zA-Z0-9\u0370-\u03ff_}\])\s])!=(?=\s*[+-]?[a-zA-Z0-9\u0370-\u03ff_({[])/g, "≠")
    .replace(/->/g, "→")
    .replace(/<-/g, "←")
    .replace(/(?:→)\s*infinity\b/gi, "→ ∞")
    .replace(/\{([a-zA-Z0-9]+)\s+in\s+([a-zA-Z0-9]+)\}/g, "{$1 ∈ $2}");

  // 10. Chuyển đổi tên chữ cái Hy Lạp không có '\' khi nằm trong ngữ cảnh công thức toán
  // a) Đi kèm chỉ số dưới hoặc chỉ số trên: beta_1, sigma^2, epsilon_{it}, Chi^2
  s = s.replace(
    new RegExp(`\\b(${GREEK_NAMES_PATTERN})(?=[_^])`, "g"),
    (_, name) => GREEK_MAP[name] || name
  );
  // b) Nằm bên trong chỉ số dưới hoặc hàm: _{beta}, (theta | y), [epsilon | X], Var(epsilon)
  s = s.replace(
    new RegExp(
      `(?<=[(\\[{|,_^\\s*=+\\-*/<>≤≥≠≈~÷×])(${GREEK_NAMES_PATTERN})(?=\\s*[)\\]}|,^_\\s*=+\\-*/<>≤≥≠≈~':;.]|$)`,
      "g"
    ),
    (match, name, offset, fullStr) => {
      // Kiểm tra xem có ít nhất 1 ký hiệu toán học lân cận không (tránh thay thế từ tiếng Anh thông thường nếu có)
      const before = fullStr.slice(Math.max(0, offset - 3), offset);
      const after = fullStr.slice(offset + match.length, offset + match.length + 4);
      if (
        /[=+\-*/<>≤≥≠≈~|()[\]{}_^]/.test(before) ||
        /[=+\-*/<>≤≥≠≈~|()[\]{}_^']/.test(after) ||
        /^\s*(?:is|denotes|represents|=)\b/.test(after)
      ) {
        return GREEK_MAP[name] || match;
      }
      return match;
    }
  );
  // c) Cụm đặc thù: Delta R^2, sum sum
  s = s.replace(/\bDelta\s+(?=[A-Z\u0370-\u03ff])/g, "Δ");
  s = s.replace(/∑\s+sum\b/g, "∑ ∑");

  // 11. Gỡ bỏ cặp dấu $...$ bao quanh công thức toán học sau khi đã chuẩn hóa
  s = s.replace(/\$([^$]+)\$/g, "$1");

  // 12. Khôi phục các đoạn mã trong dấu backtick `...`
  codeMocks.forEach((code, idx) => {
    s = s.replaceAll(`___CODEMASK_${idx}___`, code);
  });

  return s;
}

const SUBSCRIPT_UNICODE_MAP: Record<string, string> = {
  "0": "₀",
  "1": "₁",
  "2": "₂",
  "3": "₃",
  "4": "₄",
  "5": "₅",
  "6": "₆",
  "7": "₇",
  "8": "₈",
  "9": "₉",
  "+": "₊",
  "-": "₋",
  "=": "₌",
  "(": "₍",
  ")": "₎",
  a: "ₐ",
  e: "ₑ",
  i: "ᵢ",
  j: "ⱼ",
  k: "ₖ",
  m: "ₘ",
  n: "ₙ",
  o: "ₒ",
  p: "ₚ",
  r: "ᵣ",
  s: "ₛ",
  t: "ₜ",
  u: "ᵤ",
  v: "ᵥ",
  x: "ₓ",
};

const SUPERSCRIPT_UNICODE_MAP: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "+": "⁺",
  "-": "⁻",
  "=": "⁼",
  "(": "⁽",
  ")": "⁾",
  n: "ⁿ",
  i: "ⁱ",
};

/**
 * Định dạng chuỗi văn bản học thuật phẳng (Plain Text) dùng cho danh sách bên trái,
 * Command Palette, đoạn trích tìm kiếm (snippet) và trích dẫn APA.
 */
export function formatAcademicPlainText(input?: string): string {
  if (!input) return "";
  let s = normalizeMathNotation(input);

  // Xóa dấu ** (in đậm Markdown) và ` (code)
  s = s.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1");

  // Chuyển các chỉ số trên đơn giản (^2, ^3, ^{-1}, ^n) sang ký tự Unicode đẹp mắt
  s = s.replace(/\^\{([0-9+-]+)\}/g, (_, exp: string) =>
    exp
      .split("")
      .map((ch) => SUPERSCRIPT_UNICODE_MAP[ch] || ch)
      .join("")
  );
  s = s.replace(/\^([0-9ni])/g, (_, ch: string) => SUPERSCRIPT_UNICODE_MAP[ch] || `^${ch}`);

  // Chuyển các chỉ số dưới 1 ký tự (_0.._9, _i, _j, _k, _n, _t) sang Unicode
  s = s.replace(/\_\{([0-9ijkmnt])\}/g, (_, sub: string) => SUBSCRIPT_UNICODE_MAP[sub] || `_${sub}`);
  s = s.replace(
    /(?<=[a-zA-Z\u0370-\u03ff\u0300-\u036f)\]])_([0-9ijkmnt])\b/g,
    (_, ch: string) => SUBSCRIPT_UNICODE_MAP[ch] || `_${ch}`
  );

  // Gọn các dấu ngoặc nhọn còn lại quanh chỉ số phức tạp: _{it} -> _it
  s = s.replace(/_\{([^}]+)\}/g, "_$1").replace(/\^\{([^}]+)\}/g, "^$1");

  return s;
}

/**
 * Dựng chuỗi văn bản học thuật thành cây phần tử React (hỗ trợ `code`, **in đậm**,
 * chỉ số dưới <sub>, chỉ số trên <sup> và ký hiệu toán học chuẩn).
 */
export function renderAcademicInline(rawText: string): React.ReactNode {
  if (!rawText) return null;
  const normalized = normalizeMathNotation(rawText);

  // Tách trước theo `code` và **bold**
  const segments = normalized.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);

  return segments.map((seg, segIdx) => {
    if (!seg) return null;

    if (seg.startsWith("`") && seg.endsWith("`") && seg.length > 2) {
      return (
        <code
          key={`code-${segIdx}`}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-200/75 dark:bg-slate-800 font-mono text-[0.86em] text-indigo-700 dark:text-indigo-300 border border-slate-300/60 dark:border-slate-700/70"
        >
          {seg.slice(1, -1)}
        </code>
      );
    }

    if (seg.startsWith("**") && seg.endsWith("**") && seg.length > 4) {
      return (
        <strong
          key={`bold-${segIdx}`}
          className="font-semibold text-slate-900 dark:text-white"
        >
          {renderSubSupTokens(seg.slice(2, -2), `b-${segIdx}`)}
        </strong>
      );
    }

    return <React.Fragment key={`seg-${segIdx}`}>{renderSubSupTokens(seg, `s-${segIdx}`)}</React.Fragment>;
  });
}

/**
 * Phân tách chỉ số dưới (_{...}, _(...), _x) và chỉ số trên (^{...}, ^(...), ^x)
 * thành các thẻ <sub> và <sup> chuẩn mực.
 */
function renderSubSupTokens(text: string, keyPrefix: string): React.ReactNode {
  if (!text || (!text.includes("_") && !text.includes("^"))) {
    return text;
  }

  const nodes: React.ReactNode[] = [];
  // Biểu thức chính quy khớp _{...}, _(...), _token hoặc ^{...}, ^(...), ^token
  // Chỉ khớp khi đứng ngay sau một ký tự biến toán học, chữ Hy Lạp, dấu đóng ngoặc hoặc tổng/tích/tích phân/lim
  const tokenRegex =
    /(?<=[a-zA-Z0-9\u0370-\u03ff\u0300-\u036f)\]}∑∏∫])([_^])(?:\{([^{}]+)\}|\(([^()]+)\)|([a-zA-Z0-9\u0370-\u03ff*+-]{1,12}))/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    const matchStart = match.index;
    if (matchStart > lastIndex) {
      nodes.push(text.slice(lastIndex, matchStart));
    }

    const op = match[1]; // '_' or '^'
    const content = match[2] ?? match[3] ?? match[4] ?? "";

    if (op === "_") {
      nodes.push(
        <sub
          key={`${keyPrefix}-sub-${matchStart}`}
          className="text-[0.75em] leading-none align-baseline relative -bottom-[0.18em] font-sans"
        >
          {content}
        </sub>
      );
    } else {
      nodes.push(
        <sup
          key={`${keyPrefix}-sup-${matchStart}`}
          className="text-[0.75em] leading-none align-baseline relative -top-[0.36em] font-sans"
        >
          {content}
        </sup>
      );
    }

    lastIndex = matchStart + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : text;
}

/**
 * Tìm vị trí dấu hai chấm ':' ở cấp độ ngoài cùng (không nằm trong ngoặc đơn, ngoặc vuông,
 * ngoặc nhọn, công thức $...$ hay `code`) để làm nhãn tiêu đề đoạn mà không bao giờ cắt nhầm
 * các chú thích trong ngoặc như "(Normal Science: ...)" hay "(H₀: ρ = 1)".
 */
function findTopLevelColonIndex(text: string, maxLen = 48): number {
  let parenDepth = 0;
  let bracketDepth = 0;
  let braceDepth = 0;
  let inMath = false;
  let inCode = false;

  const limit = Math.min(text.length, maxLen);
  for (let i = 0; i < limit; i++) {
    const ch = text[i];
    if (ch === "`") {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    if (ch === "$") {
      inMath = !inMath;
      continue;
    }
    if (inMath) continue;

    if (ch === "(") parenDepth++;
    else if (ch === ")") parenDepth = Math.max(0, parenDepth - 1);
    else if (ch === "[") bracketDepth++;
    else if (ch === "]") bracketDepth = Math.max(0, bracketDepth - 1);
    else if (ch === "{") braceDepth++;
    else if (ch === "}") braceDepth = Math.max(0, braceDepth - 1);
    else if (
      ch === ":" &&
      parenDepth === 0 &&
      bracketDepth === 0 &&
      braceDepth === 0
    ) {
      // Không tách nếu phía trước dấu ':' là ký hiệu giả thuyết H₀ / H_0 / H₁ / H_1
      const prefix = text.slice(0, i).trim();
      if (/^H(?:_?[01aA]|[₀₁])$/.test(prefix)) {
        return -1;
      }
      return i;
    }
  }
  return -1;
}

function splitSentencesSafely(text: string): string[] {
  let masked = text;
  const masks: { token: string; match: string }[] = [];

  // Bảo vệ công thức $...$ và `code`
  masked = masked.replace(/(\$[^$]+\$|`[^`]+`)/g, (match) => {
    const token = `___MATH_${masks.length}___`;
    masks.push({ token, match });
    return token;
  });

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
      const text = String(item).trim().replace(/^[-•*]\s*/, "");
      const colonIdx = findTopLevelColonIndex(text, 48);
      if (colonIdx > 0) {
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
    // Chỉ khớp (1), (2), (a), (b) khi đứng ở đầu câu hoặc sau khoảng trắng/dấu câu,
    // tuyệt đối không cắt các hàm toán học như AR(1), I(1), Y(1), D_i(1), y_(1)
    const parenNumMatch = section.match(/(?:^|[\s:;,.—–-])\([1-9a-d]\)\s+/g);
    const dotNumMatch = section.match(/(?:^|\s)[1-9]\.\s+/g);

    if (parenNumMatch && parenNumMatch.length >= 2) {
      const parts = section.split(/(?<=(?:^|[\s:;,.—–-]))(?=\([1-9a-d]\)\s+)/);
      for (const part of parts) {
        const trimmed = part.trim();
        const m = trimmed.match(/^(\([1-9a-d]\))\s*([\s\S]*)/);
        if (m) {
          const bodyText = m[2].trim();
          const colonIdx = findTopLevelColonIndex(bodyText, 44);
          if (colonIdx > 0) {
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
          const colonIdx = findTopLevelColonIndex(bodyText, 44);
          if (colonIdx > 0) {
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
    } else if (
      section.startsWith("- ") ||
      section.startsWith("• ") ||
      section.startsWith("* ")
    ) {
      const clean = section.replace(/^[-•*]\s*/, "").trim();
      const colonIdx = findTopLevelColonIndex(clean, 44);
      if (colonIdx > 0) {
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
          const colonIdx = findTopLevelColonIndex(sent, 45);
          if (colonIdx > 0 && !sent.slice(0, colonIdx).includes(" ")) {
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
            const cIdx = findTopLevelColonIndex(sent, 60);
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
        const colonIdx = findTopLevelColonIndex(section, 60);
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
    default:
      "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    definition:
      "bg-blue-100/80 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800/60 font-semibold",
    mechanism:
      "bg-indigo-100/80 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60 font-semibold",
    pitfalls:
      "bg-amber-100/90 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800/60 font-semibold",
    benchmarks:
      "bg-emerald-100/90 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60 font-semibold",
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
    pitfalls:
      "text-amber-950 dark:text-amber-200 font-bold uppercase tracking-wide",
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
                  <span className={`mr-1.5 ${labelColors}`}>
                    {renderAcademicInline(block.label)}
                  </span>
                )}
                <span>{renderAcademicInline(block.body)}</span>
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
              <span
                className={`shrink-0 text-base leading-none mt-1 select-none ${bulletColors}`}
              >
                •
              </span>
              <div className="flex-1 leading-relaxed">
                {block.label && (
                  <span className={`mr-1.5 ${labelColors}`}>
                    {renderAcademicInline(block.label)}
                  </span>
                )}
                <span>{renderAcademicInline(block.body)}</span>
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
                <div
                  className={`text-xs uppercase tracking-wider mb-1 ${labelColors}`}
                >
                  {renderAcademicInline(block.label)}
                </div>
              )}
              {block.body && (
                <p className="leading-relaxed">
                  {renderAcademicInline(block.body)}
                </p>
              )}
            </div>
          );
        }

        // Standard paragraph
        return (
          <p key={index} className="leading-relaxed">
            {block.label && (
              <span className={`mr-1.5 ${labelColors}`}>
                {renderAcademicInline(block.label)}
              </span>
            )}
            {renderAcademicInline(block.body)}
          </p>
        );
      })}
    </div>
  );
}
