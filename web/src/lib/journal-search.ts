import path from "path";
import fs from "fs";

export interface JournalItemResult {
  id: string;
  title: string;
  issn?: string;
  eissn?: string;
  publisher?: string;
  country?: string;
  status: "active" | "discontinued" | "wos_delisted" | "hijacked" | "predatory" | "neutral";
  statusBadge: {
    label: string;
    variant: "success" | "danger" | "warning" | "info" | "neutral";
    detail?: string;
  };
  scopus?: {
    quartile?: "Q1" | "Q2" | "Q3" | "Q4";
    sjr?: string | number;
    hIndex?: string | number;
    rank?: string | number;
  };
  abdc?: {
    rating: string;
    field?: string;
  };
  hdgsnn?: {
    maxPoints: string | number;
    councils: Array<{ council: string; points: string | number }>;
  };
  discontinuedInfo?: {
    coverage?: string;
    reason?: string;
    year?: string;
    publisher?: string;
  };
  wosDelistedInfo?: {
    category?: string;
    date?: string;
    reason?: string;
  };
  hijackedInfo?: {
    fakeUrl?: string;
    realUrl?: string;
    notes?: string;
  };
  beallInfo?: {
    type: "publisher" | "standalone";
    name: string;
    url?: string;
  };
  retraction?: {
    count: number;
    warningLevel: "none" | "low" | "high";
  };
  vietnamNational?: {
    stt?: number;
    org?: string;
    isScopus16: boolean;
  };
  aci?: boolean;
  nafosted?: boolean;
}

export interface JournalSearchResponse {
  query: string;
  scopusVersion: string;
  totalFound: number;
  results: JournalItemResult[];
  didYouMean?: string[];
  stats: {
    totalScopus: number;
    totalDiscontinued: number;
    totalAbdc: number;
    totalHdgs: number;
  };
}

let cachedDb: any = null;

function getLookupDatabase(): any {
  if (cachedDb) return cachedDb;
  
  const candidatePaths = [
    path.join(process.cwd(), "src", "data", "discontinued_lookup.json"),
    path.join(process.cwd(), "web", "src", "data", "discontinued_lookup.json"),
    path.join(__dirname, "..", "data", "discontinued_lookup.json")
  ];

  let foundPath = candidatePaths.find((p) => fs.existsSync(p));
  if (!foundPath) {
    throw new Error(`Database file not found in any candidate path: ${candidatePaths.join(", ")}`);
  }
  const raw = fs.readFileSync(foundPath, "utf-8");
  cachedDb = JSON.parse(raw);
  return cachedDb;
}

export const KNOWN_ACRONYMS: Record<string, string> = {
  jabeg: "journal of asian business and economic studies",
  jabes: "journal of asian business and economic studies",
  jbr: "journal of business research",
  jcr: "journal of consumer research",
  jbe: "journal of business ethics",
  jams: "journal of the academy of marketing science",
  jm: "journal of marketing",
  jfe: "journal of financial economics",
  aer: "american economic review",
  amj: "academy of management journal",
  amr: "academy of management review",
  jom: "journal of management",
  misq: "mis quarterly",
  ijhm: "international journal of hospitality management",
  ijchm: "international journal of contemporary hospitality management",
  jhtm: "journal of hospitality and tourism management",
  trr: "tourism recreation research",
  jed: "journal of economics and development",
  ejor: "european journal of operational research",
  ijpe: "international journal of production economics",
  ijpr: "international journal of production research",
  jf: "journal of finance",
  rfs: "review of financial studies",
  res: "review of economic studies",
  qje: "quarterly journal of economics",
  jpe: "journal of political economy",
  jebo: "journal of economic behavior & organization",
  smj: "strategic management journal",
  jwb: "journal of world business",
  jibs: "journal of international business studies",
  apjm: "asia pacific journal of management",
  ijim: "international journal of information management",
  eswa: "expert systems with applications",
  ktpt: "journal of economics and development",
  vjcs: "vietnam journal of computer science",
  vjm: "vietnam journal of mathematics",
  vjes: "vietnam journal of earth sciences",
  vjc: "vietnam journal of chemistry",
  vjst: "vietnam journal of science and technology",
  ansn: "advances in natural sciences: nanoscience and nanotechnology",
  jsamd: "journal of science: advanced materials and devices",
  jit: "journal of information and telecommunication"
};

function normalizeIssn(val: any): string {
  if (!val) return "";
  return String(val).replace(/[^0-9Xx]/g, "").toUpperCase();
}

function normalizeVnText(str: string): string {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanVnJournalName(s: string): string {
  const norm = normalizeVnText(s);
  return norm.replace(/^(tap chi|tap chi dien tu|the journal of|journal of)\s+/, "");
}

function matchTitleSafely(targetText: string, queryText: string): boolean {
  if (!targetText || !queryText) return false;
  const t = targetText.toLowerCase();
  const q = queryText.toLowerCase();
  if (t === q) return true;
  if (q.length <= 5) {
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp("(?:^|[^a-z0-9])" + escaped + "(?:[^a-z0-9]|$)", "i");
    return re.test(t);
  }
  return t.includes(q);
}

function toTitleCase(str: string): string {
  if (!str) return "";
  return str
    .split(" ")
    .map((w) => (w.length > 0 ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : ""))
    .join(" ");
}

function formatIssn(issn?: string): string {
  if (!issn) return "";
  const clean = normalizeIssn(issn);
  if (clean.length === 8) return clean.slice(0, 4) + "-" + clean.slice(4);
  return issn;
}

export function searchJournals(query: string, mode?: string): JournalSearchResponse {
  const lookupDb = getLookupDatabase();
  const scopusVer = lookupDb.scopus_version || "Scopus Discontinued Titles";
  const sjrMap = lookupDb.sjr_rankings || {};
  const discList = lookupDb.discontinued_journals || [];
  const abdcMap = lookupDb.abdc_rankings || {};
  const hdgsByIssn = lookupDb.hdgs_by_issn || {};
  const hdgsByTitle = lookupDb.hdgs_by_title || {};
  const hdgsJournals = (lookupDb.hdgsnn_kinhte && lookupDb.hdgsnn_kinhte.journals) || {};
  const hijackedList = lookupDb.hijacked_journals || [];
  const wosDelistedList = lookupDb.wos_delisted_journals || [];
  const beallJournalsList = lookupDb.beall_standalone_journals || [];
  const beallPublishersList = lookupDb.beall_publishers || [];
  const retractionMap = lookupDb.retraction_counts_by_journal || {};
  const vnList = lookupDb.vn_standards_2026 || [];
  const aciByIssn = (lookupDb.aci_journals && lookupDb.aci_journals.by_issn) || {};
  const aciByTitle = (lookupDb.aci_journals && lookupDb.aci_journals.by_title) || {};
  const nafostedByIssn = (lookupDb.nafosted_national && lookupDb.nafosted_national.by_issn) || {};
  const nafostedByTitle = (lookupDb.nafosted_national && lookupDb.nafosted_national.by_title) || {};
  const issnLinkedMap = lookupDb.issn_linked_map || {};

  const stats = {
    totalScopus: Object.keys(sjrMap).length,
    totalDiscontinued: discList.length,
    totalAbdc: Object.keys(abdcMap).length,
    totalHdgs: Object.keys(hdgsByIssn).length
  };

  // 1. Chế độ xem đặc biệt: Danh sách 16 Tạp chí Việt Nam trong Scopus/WoS
  if (mode === "vn16") {
    const intlVn = vnList.filter((item: any) => item.intl || item.stt <= 16);
    const results: JournalItemResult[] = intlVn.map((j: any) => {
      const tLower = j.title.toLowerCase();
      const sjrInfo = sjrMap[tLower] || null;
      const issnFmt = formatIssn(j.issn);
      const eissnFmt = formatIssn(j.eissn);
      return {
        id: `vn16-${j.stt}`,
        title: toTitleCase(j.title),
        issn: issnFmt,
        eissn: eissnFmt,
        publisher: j.publisher || j.org,
        country: "Vietnam",
        status: "active",
        statusBadge: {
          label: sjrInfo ? `Scopus ${sjrInfo.quartile || "Active"}` : "Scopus / WoS Quốc tế",
          variant: "success",
          detail: "Tạp chí thuộc danh mục 16 Tạp chí Khoa học Việt Nam đạt chuẩn Scopus/WoS Quốc tế"
        },
        scopus: sjrInfo
          ? {
              quartile: sjrInfo.quartile,
              sjr: sjrInfo.sjr,
              hIndex: sjrInfo.h_index
            }
          : undefined,
        vietnamNational: {
          stt: j.stt,
          org: j.org,
          isScopus16: true
        },
        aci: true,
        nafosted: true
      };
    });

    return {
      query: "Top 16 Tạp chí Việt Nam trong Scopus / WoS",
      scopusVersion: scopusVer,
      totalFound: results.length,
      results,
      stats
    };
  }

  // 2. Chế độ xem đặc biệt: Tạp chí Khối Kinh tế - Quản trị bị Scopus loại gần đây
  if (mode === "discontinued_biz") {
    const bizKeywords = [
      "business",
      "econom",
      "finance",
      "manage",
      "market",
      "account",
      "banking",
      "commerce",
      "social",
      "tourism",
      "hospitality"
    ];
    const filtered = discList.filter((item: any) => {
      const t = (item.title || "").toLowerCase();
      return bizKeywords.some((kw) => t.includes(kw));
    });

    filtered.sort((a: any, b: any) =>
      String(b.discontinued_info || "").localeCompare(String(a.discontinued_info || ""))
    );

    const results: JournalItemResult[] = filtered.slice(0, 25).map((item: any, idx: number) => ({
      id: `disc-biz-${idx}`,
      title: item.title,
      issn: formatIssn(item.issn),
      eissn: formatIssn(item.eissn),
      publisher: item.publisher,
      country: item.country,
      status: "discontinued",
      statusBadge: {
        label: "ĐÃ BỊ SCOPUS LOẠI",
        variant: "danger",
        detail: `Ngừng chỉ mục Scopus: ${item.discontinued_info || "Gần đây"}`
      },
      discontinuedInfo: {
        year: item.discontinued_info,
        coverage: item.coverage,
        reason: item.reason || "Publication Concerns / Metrics"
      }
    }));

    return {
      query: "Tạp chí Khối Kinh tế - Quản trị bị loại khỏi Scopus",
      scopusVersion: scopusVer,
      totalFound: results.length,
      results,
      stats
    };
  }

  // 3. Tra cứu theo từ khóa người dùng
  const q = (query || "").trim();
  if (q.length < 2) {
    return {
      query: q,
      scopusVersion: scopusVer,
      totalFound: 0,
      results: [],
      stats
    };
  }

  const normQIssn = normalizeIssn(q);
  const qLower = q.toLowerCase();
  const resolvedQuery = KNOWN_ACRONYMS[qLower] || qLower;
  const normQVn = normalizeVnText(resolvedQuery);
  const cleanQVn = cleanVnJournalName(resolvedQuery);

  const matchedItems: JournalItemResult[] = [];

  // A. Kiểm tra Hijacked Journals (Tạp chí Giả mạo)
  for (const h of hijackedList) {
    const hTitle = (h.title || h.journal_title || "").toLowerCase();
    const hIssn = normalizeIssn(h.issn || "");
    if (
      (normQIssn && normQIssn.length === 8 && normQIssn === hIssn) ||
      (hTitle && matchTitleSafely(hTitle, resolvedQuery))
    ) {
      matchedItems.push({
        id: `hijacked-${h.issn || hTitle}`,
        title: h.title || h.journal_title,
        issn: formatIssn(h.issn),
        status: "hijacked",
        statusBadge: {
          label: "CẢNH BÁO MẠO DANH (HIJACKED)",
          variant: "danger",
          detail: "Tạp chí bị kẻ xấu tạo website giả mạo để lừa tiền nộp bài của tác giả."
        },
        hijackedInfo: {
          fakeUrl: h.fake_url || h.hijacked_url || h.url_fake,
          realUrl: h.real_url || h.authentic_url || h.url_real,
          notes: h.notes || "Kiểm tra kỹ tên miền gốc của tạp chí trước khi nộp bài."
        }
      });
      break;
    }
  }

  // B. Kiểm tra Web of Science Delisted / On Hold
  for (const item of wosDelistedList) {
    const issn = normalizeIssn(item.issn || "");
    const eissn = normalizeIssn(item.e_issn || "");
    const title = (item.name || "").toLowerCase();
    if (
      (normQIssn && normQIssn.length === 8 && (normQIssn === issn || normQIssn === eissn)) ||
      (title && title === resolvedQuery) ||
      (title && resolvedQuery.length >= 6 && matchTitleSafely(title, resolvedQuery))
    ) {
      matchedItems.push({
        id: `wos-delisted-${issn || title}`,
        title: item.name,
        issn: formatIssn(item.issn),
        eissn: formatIssn(item.e_issn),
        status: "wos_delisted",
        statusBadge: {
          label: "WOS DELISTED / ON HOLD",
          variant: "danger",
          detail: "Đã bị Clarivate loại khỏi danh mục Web of Science (SCIE/SSCI/ESCI) hoặc tạm dừng đánh giá."
        },
        wosDelistedInfo: {
          category: item.category,
          date: item.date,
          reason: item.reason || "Editorial quality concerns / Retraction surges"
        }
      });
      break;
    }
  }

  // C. Kiểm tra Scopus Discontinued (Bị loại khỏi Scopus)
  for (const item of discList) {
    const title = item.title || "";
    const issn = normalizeIssn(item.issn || "");
    const eissn = normalizeIssn(item.eissn || "");

    if (
      (normQIssn && normQIssn.length === 8 && (normQIssn === issn || normQIssn === eissn)) ||
      matchTitleSafely(title, resolvedQuery)
    ) {
      matchedItems.push({
        id: `disc-${issn || title}`,
        title: item.title,
        issn: formatIssn(item.issn),
        eissn: formatIssn(item.eissn),
        publisher: item.publisher,
        country: item.country,
        status: "discontinued",
        statusBadge: {
          label: "BỊ LOẠI KHỎI SCOPUS",
          variant: "danger",
          detail: `Ngừng chỉ mục từ: ${item.discontinued_info || "Bản cập nhật gần đây"}`
        },
        discontinuedInfo: {
          coverage: item.coverage,
          reason: item.reason,
          year: item.discontinued_info,
          publisher: item.publisher
        }
      });
      break;
    }
  }

  // D. Kiểm tra Beall's List (Tạp chí săn mồi)
  for (const item of beallJournalsList) {
    const name = (item.name || "").toLowerCase();
    const abbr = (item.abbr || "").toLowerCase();
    if (
      (abbr && abbr === resolvedQuery) ||
      (name && name === resolvedQuery) ||
      (name && resolvedQuery.length >= 6 && matchTitleSafely(name, resolvedQuery))
    ) {
      matchedItems.push({
        id: `beall-journal-${name}`,
        title: item.name,
        status: "predatory",
        statusBadge: {
          label: "BEALL'S LIST (TẠP CHÍ SĂN MỒI)",
          variant: "danger",
          detail: "Nằm trong danh sách tạp chí có dấu hiệu lừa đảo học thuật / săn mồi (Predatory journal)."
        },
        beallInfo: {
          type: "standalone",
          name: item.name,
          url: item.url
        }
      });
      break;
    }
  }

  // E. Tra cứu SCImago SJR Scopus Active
  let matchedSjr: any = null;
  let matchedSjrTitle = "";
  if (sjrMap[resolvedQuery]) {
    matchedSjr = sjrMap[resolvedQuery];
    matchedSjrTitle = resolvedQuery;
  } else {
    for (const [title, info] of Object.entries<any>(sjrMap)) {
      const issns = String(info.issn || "").split(",").map(normalizeIssn).filter(Boolean);
      if (normQIssn && normQIssn.length === 8 && issns.includes(normQIssn)) {
        matchedSjr = info;
        matchedSjrTitle = title;
        break;
      }
    }
    if (!matchedSjr) {
      for (const [title, info] of Object.entries<any>(sjrMap)) {
        if (matchTitleSafely(title, resolvedQuery)) {
          matchedSjr = info;
          matchedSjrTitle = title;
          break;
        }
      }
    }
  }

  // F. Tra cứu ABDC (Úc)
  let matchedAbdc: any = null;
  let abdcTitle = "";
  if (abdcMap[resolvedQuery]) {
    matchedAbdc = abdcMap[resolvedQuery];
    abdcTitle = resolvedQuery;
  } else if (matchedSjrTitle && abdcMap[matchedSjrTitle]) {
    matchedAbdc = abdcMap[matchedSjrTitle];
    abdcTitle = matchedSjrTitle;
  } else {
    for (const [title, info] of Object.entries<any>(abdcMap)) {
      const issns = String(info.issn || "").split(",").map(normalizeIssn).filter(Boolean);
      if (normQIssn && normQIssn.length === 8 && issns.includes(normQIssn)) {
        matchedAbdc = info;
        abdcTitle = title;
        break;
      } else if (matchTitleSafely(title, resolvedQuery)) {
        matchedAbdc = info;
        abdcTitle = title;
        break;
      }
    }
  }

  // G. Tra cứu Danh mục Tiêu chuẩn Việt Nam 2026 (341 tạp chí)
  let matchedVn: any = null;
  for (const item of vnList) {
    const tNorm = normalizeVnText(item.title);
    const tClean = cleanVnJournalName(item.title);
    if (tNorm === normQVn || tClean === cleanQVn) {
      matchedVn = item;
      break;
    }
    if (item.aliases && item.aliases.some((a: string) => normalizeVnText(a) === normQVn || cleanVnJournalName(a) === cleanQVn)) {
      matchedVn = item;
      break;
    }
  }
  if (!matchedVn && cleanQVn.length >= 4) {
    for (const item of vnList) {
      const tClean = cleanVnJournalName(item.title);
      if (matchTitleSafely(tClean, cleanQVn) || (cleanQVn.length >= 8 && cleanQVn.includes(tClean))) {
        matchedVn = item;
        break;
      }
    }
  }

  // H. Tra cứu Hội đồng Giáo sư Nhà nước (HĐGSNN)
  let matchedHdgs: any = null;
  if (normQIssn && normQIssn.length === 8) {
    if (hdgsByIssn[normQIssn]) {
      matchedHdgs = hdgsByIssn[normQIssn];
    } else if (issnLinkedMap[normQIssn]) {
      for (const linked of issnLinkedMap[normQIssn]) {
        if (hdgsByIssn[linked]) {
          matchedHdgs = hdgsByIssn[linked];
          break;
        }
      }
    }
  }

  if (!matchedHdgs && matchedVn) {
    const vnIssns = [matchedVn.issn, matchedVn.eissn].filter(Boolean).map(normalizeIssn).filter(Boolean);
    for (const vi of vnIssns) {
      if (hdgsByIssn[vi]) {
        matchedHdgs = hdgsByIssn[vi];
        break;
      }
    }
  }

  if (!matchedHdgs && matchedSjr && matchedSjr.issn) {
    const sjrIssns = String(matchedSjr.issn).split(",").map(normalizeIssn).filter(Boolean);
    for (const si of sjrIssns) {
      if (hdgsByIssn[si]) {
        matchedHdgs = hdgsByIssn[si];
        break;
      }
    }
  }

  if (!matchedHdgs && cleanQVn.length >= 4) {
    if (hdgsByTitle[cleanQVn]) {
      matchedHdgs = hdgsByTitle[cleanQVn];
    } else {
      for (const [titleClean, info] of Object.entries<any>(hdgsByTitle)) {
        if (titleClean === cleanQVn || matchTitleSafely(titleClean, cleanQVn) || (cleanQVn.length >= 8 && cleanQVn.includes(titleClean))) {
          matchedHdgs = info;
          break;
        }
      }
    }
  }

  if (!matchedHdgs) {
    for (const [title, info] of Object.entries<any>(hdgsJournals)) {
      const tClean = cleanVnJournalName(title);
      if (tClean === cleanQVn || (cleanQVn.length >= 4 && matchTitleSafely(tClean, cleanQVn))) {
        matchedHdgs = { title, scores: [{ council: "Kinh tế", points: info.points }] };
        break;
      }
    }
  }

  // I. Tổng hợp mục Tra cứu Active Scopus / HĐGS / ABDC nếu chưa trùng với mục cảnh báo
  const primaryTitle = matchedSjrTitle
    ? toTitleCase(matchedSjrTitle)
    : matchedVn
    ? toTitleCase(matchedVn.title)
    : matchedHdgs
    ? toTitleCase(matchedHdgs.title)
    : matchedAbdc
    ? toTitleCase(abdcTitle)
    : "";

  if (primaryTitle) {
    const isAlreadyAdded = matchedItems.some(
      (m) => m.title.toLowerCase() === primaryTitle.toLowerCase()
    );

    if (!isAlreadyAdded) {
      let finalIssn = "";
      if (matchedSjr && matchedSjr.issn) {
        finalIssn = String(matchedSjr.issn).split(",")[0].trim();
      } else if (matchedVn && matchedVn.issn) {
        finalIssn = matchedVn.issn;
      } else if (matchedHdgs && matchedHdgs.issn) {
        finalIssn = matchedHdgs.issn;
      } else if (matchedAbdc && matchedAbdc.issn) {
        finalIssn = String(matchedAbdc.issn).split(",")[0].trim();
      }

      // Đếm số bài rút
      let retCount = 0;
      const lowerT = primaryTitle.toLowerCase();
      if (retractionMap[lowerT]) {
        retCount = retractionMap[lowerT];
      }

      let badgeLabel = "Scopus Active";
      let badgeVariant: "success" | "info" | "warning" = "info";
      if (matchedSjr && matchedSjr.quartile) {
        badgeLabel = `Scopus ${matchedSjr.quartile}`;
        badgeVariant = "success";
      } else if (matchedHdgs) {
        badgeLabel = "HĐGSNN Việt Nam";
        badgeVariant = "info";
      }

      const hdgsCouncils: Array<{ council: string; points: string | number }> = [];
      let maxPoints: string | number = "N/A";
      if (matchedHdgs && Array.isArray(matchedHdgs.scores)) {
        for (const s of matchedHdgs.scores) {
          hdgsCouncils.push({ council: s.council, points: s.points });
        }
        const numericScores = matchedHdgs.scores
          .map((s: any) => parseFloat(s.points))
          .filter((n: number) => !isNaN(n));
        if (numericScores.length > 0) {
          maxPoints = Math.max(...numericScores);
        }
      }

      matchedItems.unshift({
        id: `journal-${primaryTitle.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
        title: primaryTitle,
        issn: formatIssn(finalIssn),
        publisher: matchedSjr ? matchedSjr.publisher : matchedVn ? matchedVn.org : undefined,
        country: matchedSjr ? matchedSjr.country : matchedVn ? "Vietnam" : undefined,
        status: "active",
        statusBadge: {
          label: badgeLabel,
          variant: badgeVariant,
          detail: matchedSjr ? `SJR: ${matchedSjr.sjr || "N/A"} | H-Index: ${matchedSjr.h_index || "N/A"}` : undefined
        },
        scopus: matchedSjr
          ? {
              quartile: matchedSjr.quartile,
              sjr: matchedSjr.sjr,
              hIndex: matchedSjr.h_index
            }
          : undefined,
        abdc: matchedAbdc
          ? {
              rating: matchedAbdc.rating || matchedAbdc.rank || "Listed",
              field: matchedAbdc.field || matchedAbdc.for_field
            }
          : undefined,
        hdgsnn:
          hdgsCouncils.length > 0
            ? {
                maxPoints,
                councils: hdgsCouncils
              }
            : undefined,
        retraction: {
          count: retCount,
          warningLevel: retCount >= 5 ? "high" : retCount > 0 ? "low" : "none"
        },
        vietnamNational: matchedVn
          ? {
              stt: matchedVn.stt,
              org: matchedVn.org,
              isScopus16: matchedVn.intl || matchedVn.stt <= 16
            }
          : undefined,
        aci: !!(aciByTitle[cleanQVn] || (normQIssn && aciByIssn[normQIssn])),
        nafosted: !!(nafostedByTitle[cleanQVn] || (normQIssn && nafostedByIssn[normQIssn]))
      });
    }
  }

  // J. Gợi ý từ gần đúng nếu không thấy kết quả
  let didYouMean: string[] = [];
  if (matchedItems.length === 0 && cleanQVn.length >= 3) {
    const pool = new Set<string>();
    for (const [k, v] of Object.entries<any>(hdgsByTitle)) {
      if (v.title) pool.add(v.title);
    }
    for (const item of vnList) {
      if (item.title) pool.add(item.title);
    }
    const qWords = cleanQVn.split(" ").filter((w) => w.length >= 2);
    const scored: Array<{ title: string; score: number }> = [];

    for (const originalTitle of pool) {
      const candClean = cleanVnJournalName(originalTitle);
      const candWords = candClean.split(" ").filter((w) => w.length >= 2);
      if (candWords.length === 0) continue;
      let matchCount = 0;
      for (const qw of qWords) {
        if (candClean.includes(qw)) matchCount += 1;
      }
      if (matchCount > 0) {
        const union = new Set([...qWords, ...candWords]).size;
        scored.push({ title: originalTitle, score: matchCount / union });
      }
    }

    scored.sort((a, b) => b.score - a.score);
    didYouMean = scored.slice(0, 3).map((s) => s.title);
  }

  return {
    query: q,
    scopusVersion: scopusVer,
    totalFound: matchedItems.length,
    results: matchedItems,
    didYouMean: didYouMean.length > 0 ? didYouMean : undefined,
    stats
  };
}
