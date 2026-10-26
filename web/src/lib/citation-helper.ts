import { MethodologyTerm, AcademicAcronym } from "./types";

/**
 * Tạo trích dẫn In-text chuẩn APA 7th
 */
export function getAPAInText(term: MethodologyTerm): string {
  if (term.apa_intext && term.apa_intext.trim()) {
    return term.apa_intext.trim();
  }
  if (term.seminal_citation) {
    // Trích xuất tác giả và năm từ seminal_citation
    const match = term.seminal_citation.match(/^([A-Za-z\s,&.]+)\s*\((\d{4})\)/);
    if (match) {
      const authors = match[1].trim();
      const year = match[2];
      return `(${authors}, ${year})`;
    }
  }
  return `(Research Methodology Lexicon, 2026)`;
}

/**
 * Tạo trích dẫn Thư mục hoàn chỉnh chuẩn APA 7th
 */
export function getAPAReference(term: MethodologyTerm): string {
  if (term.apa_reference && term.apa_reference.trim()) {
    return term.apa_reference.trim();
  }
  if (term.seminal_citation && term.seminal_citation.trim()) {
    return term.seminal_citation.trim();
  }
  return `Research Methodology Lexicon. (2026). ${term.term}. Online Research Methodology Lexicon.`;
}

/**
 * Sinh mã BibTeX cho Overleaf / LaTeX
 */
export function generateBibTeX(term: MethodologyTerm): string {
  const cleanId = term.id.replace(/[^a-zA-Z0-9_]/g, "_");
  
  if (term.seminal_citation) {
    const match = term.seminal_citation.match(/^([A-Za-z\s,&.]+)\s*\((\d{4})\)\.\s*([^.]+)\.\s*([^,]+)/);
    if (match) {
      const author = match[1].trim();
      const year = match[2];
      const title = match[3].trim();
      const journal = match[4].trim();

      return `@article{${cleanId},
  author    = {${author}},
  title     = {${title}},
  journal   = {${journal}},
  year      = {${year}},
  note      = {Trích xuất từ Từ điển Thuật ngữ Phương pháp Nghiên cứu Khoa học}
}`;
    }
  }

  return `@misc{${cleanId},
  title        = {${term.term} (${term.vietnamese})},
  author       = {{Research Methodology Lexicon}},
  year         = {2026},
  howpublished = {Online Academic Lexicon},
  note         = {Truy cập từ https://research-vocabulary.vercel.app/?term=${term.id}}
}`;
}

/**
 * Sinh chuỗi RIS để nạp vào Zotero / Mendeley / EndNote
 */
export function generateRIS(term: MethodologyTerm): string {
  const lines = [
    "TY  - ELEC",
    `TI  - ${term.term}: ${term.vietnamese}`,
    "AU  - Research Methodology Lexicon",
    "PY  - 2026",
    `AB  - ${term.core_definition}`,
    `UR  - https://research-vocabulary.vercel.app/?term=${term.id}`,
    "ER  - "
  ];
  return lines.join("\r\n");
}

/**
 * Tải file .RIS trực tiếp về máy tính
 */
export function downloadRISFile(term: MethodologyTerm) {
  const content = generateRIS(term);
  const blob = new Blob([content], { type: "application/x-research-info-systems;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${term.id}-citation.ris`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
