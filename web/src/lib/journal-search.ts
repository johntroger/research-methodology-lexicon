import path from "path";
import fs from "fs";

export interface JournalReportSection {
  executivePill: string;
  verdictLevel: "safe" | "danger" | "warning";
  verdictTitle: string;
  verdictBadges: string[];
  recommendation: string;
  identification: {
    title: string;
    issn: string;
    publisher: string;
    acronymDecoded?: string;
  };
  vietnamStandards: {
    standardVn?: string;
    category?: string;
    nafosted?: string;
    aci?: string;
    hdgsnnScores?: string[];
  };
  internationalRankings: {
    scopus?: string;
    abdc?: string;
    quartile?: string;
    sjr?: string | number;
    abdcRating?: string;
  };
  integrityChecks: {
    scopusStatus: string;
    wosStatus: string;
    hijackedStatus: string;
    beallStatus: string;
    retractionStatus: string;
  };
  warnings?: string[];
  rawReportText: string;
}

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
  report?: JournalReportSection;
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
  if (!issn) return "N/A";
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

  // Helper tạo Báo cáo Thẩm định chuẩn xác như Zalo Bot
  function buildZaloReport(params: {
    finalTitle: string;
    finalIssn: string;
    orgPublisher: string;
    acronymDecoded?: string;
    matchedDisc?: any;
    matchedHijacked?: any;
    matchedWosDelisted?: any;
    matchedBeallJournal?: any;
    matchedBeallPublisher?: any;
    matchedSjr?: any;
    matchedAbdc?: any;
    matchedVn?: any;
    matchedHdgs?: any;
    matchedAci?: any;
    matchedNafostedNational?: any;
    retractionCount: number;
  }): JournalReportSection {
    const {
      finalTitle,
      finalIssn,
      orgPublisher,
      acronymDecoded,
      matchedDisc,
      matchedHijacked,
      matchedWosDelisted,
      matchedBeallJournal,
      matchedBeallPublisher,
      matchedSjr,
      matchedAbdc,
      matchedVn,
      matchedHdgs,
      matchedAci,
      matchedNafostedNational,
      retractionCount
    } = params;

    const isNafostedIntl =
      matchedSjr &&
      ["Q1", "Q2", "Q3"].includes(matchedSjr.quartile) &&
      !matchedDisc &&
      !matchedBeallJournal &&
      !matchedBeallPublisher &&
      !matchedWosDelisted;

    let verdictLevel: "safe" | "danger" | "warning" = "safe";
    let verdictTitle = "🟢 KẾT LUẬN: ĐỦ CHUẨN XÉT GS/PGS & TIẾN SĨ (AN TOÀN)";
    let verdictBadges: string[] = [];
    let executivePill = "";
    let recommendation = "";
    const warnings: string[] = [];

    if (matchedDisc) {
      verdictLevel = "danger";
      verdictTitle = "🔴 CẢNH BÁO NGUY HIỂM: TẠP CHÍ BỊ LOẠI KHỎI SCOPUS (DISCONTINUED)";
      verdictBadges = ["Bị Scopus loại", "0 điểm HĐGSNN", "Không tính chuẩn Tiến sĩ"];
      executivePill = `${verdictTitle}\n⚠️ 0 điểm HĐGSNN • Bài đăng sau ngày bị loại KHÔNG được tính chuẩn Tiến sĩ\n━━━━━━━━━━━━━━━━━━━━━━━━━`;
      recommendation = "⛔ TUYỆT ĐỐI KHÔNG NỘP BÀI: Tạp chí có rủi ro pháp lý học thuật rất lớn, bài báo công bố sau ngày ngừng lập chỉ mục sẽ không được công nhận.";
      warnings.push(`Đã bị Scopus loại bỏ: Năm ngừng chỉ mục: ${matchedDisc.discontinued_info || "Gần đây"}. Lý do: ${matchedDisc.reason || "Publication Concerns (Nghi vấn biên tập)"}.`);
    } else if (matchedHijacked) {
      verdictLevel = "danger";
      verdictTitle = "🚨 CẢNH BÁO LỪA ĐẢO: TẠP CHÍ BỊ CƯỚP TÊN MIỀN (HIJACKED)";
      verdictBadges = ["Website giả mạo", "Lừa phí đăng bài", "TUYỆT ĐỐI TRÁNH"];
      executivePill = `${verdictTitle}\n⚠️ Website giả mạo chiếm đoạt phí đăng bài • TUYỆT ĐỐI KHÔNG NỘP\n━━━━━━━━━━━━━━━━━━━━━━━━━`;
      recommendation = "⛔ TUYỆT ĐỐI KHÔNG NỘP BÀI VÀO LINK GIẢ: Hãy chỉ truy cập đúng website chính thức của tạp chí.";
      warnings.push(`Cảnh báo cướp tên miền: Website giả: ${matchedHijacked.fake_url || matchedHijacked.hijacked_url || "N/A"}. Website thật: ${matchedHijacked.real_url || matchedHijacked.authentic_url || "N/A"}.`);
    } else if (matchedWosDelisted) {
      verdictLevel = "danger";
      verdictTitle = "🔴 CẢNH BÁO: BỊ LOẠI KHỎI WEB OF SCIENCE (WOS DELISTED)";
      verdictBadges = ["WoS Delisted", "Tước chỉ mục quốc tế", "Mất Impact Factor"];
      executivePill = `${verdictTitle}\n⚠️ Bị tước chỉ mục quốc tế do vi phạm tiêu chuẩn chất lượng\n━━━━━━━━━━━━━━━━━━━━━━━━━`;
      recommendation = "⛔ TUYỆT ĐỐI KHÔNG NỘP BÀI: Bị tước Impact Factor (JIF), bài báo công bố không được tính chuẩn đầu ra WoS Core Collection.";
      warnings.push(`Đã bị Web of Science delist: ${matchedWosDelisted.reason || "Vi phạm liêm chính khoa học / Nghi vấn paper mill"}.`);
    } else if (matchedBeallJournal || matchedBeallPublisher) {
      verdictLevel = "warning";
      verdictTitle = "⚠️ CẢNH BÁO RỦI RO: THUỘC DANH SÁCH SĂN MỒI (BEALL'S LIST)";
      verdictBadges = ["Beall's List", "Tạp chí săn mồi", "Nguy cơ không nghiệm thu"];
      executivePill = `${verdictTitle}\n⚠️ Tiềm ẩn nguy cơ không được công nhận nghiệm thu / bảo vệ\n━━━━━━━━━━━━━━━━━━━━━━━━━`;
      recommendation = "⚠️ CẢNH GIÁC CAO: Đơn vị xuất bản hoặc tạp chí nằm trong danh mục săn mồi của Beall's List. Cần kiểm tra kỹ lưỡng ban biên tập và chính sách phản biện trước khi nộp bài.";
      warnings.push("Tạp chí hoặc nhà xuất bản nằm trong danh sách đen các tạp chí săn mồi (Predatory Publishers / Standalone Predatory Journals).");
    } else {
      verdictLevel = "safe";
      verdictTitle = "🟢 KẾT LUẬN: ĐỦ CHUẨN XÉT GS/PGS & TIẾN SĨ (AN TOÀN)";
      if (matchedSjr?.quartile) verdictBadges.push(`⭐ Scopus ${matchedSjr.quartile}`);
      if (matchedHdgs?.scores && matchedHdgs.scores.length > 0) {
        verdictBadges.push(`🎯 HĐGS ${matchedHdgs.scores[0].council}: ${matchedHdgs.scores[0].points}`);
      } else if (matchedSjr?.quartile === "Q1") {
        verdictBadges.push("🎯 HĐGS: 0 - 2,0đ (Q1)");
      } else if (matchedSjr?.quartile) {
        verdictBadges.push(`🎯 HĐGS: 0 - 1,5đ (${matchedSjr.quartile})`);
      }
      if (matchedNafostedNational) {
        verdictBadges.push("🎖️ NAFOSTED Quốc gia");
      } else if (isNafostedIntl) {
        verdictBadges.push("🎖️ NAFOSTED Quốc tế");
      } else if (matchedAci) {
        verdictBadges.push("🌟 ASEAN ACI");
      }

      executivePill = `${verdictTitle}\n${verdictBadges.join(" | ")}\n━━━━━━━━━━━━━━━━━━━━━━━━━`;

      if (matchedSjr?.quartile === "Q1" || matchedAbdc?.rating === "A*" || matchedAbdc?.rating === "A") {
        recommendation = "✅ RẤT NÊN NỘP: Tạp chí quốc tế hàng đầu, đủ điều kiện bảo vệ Luận án Tiến sĩ, xét PGS/GS và nghiệm thu đề tài NCKH trọng điểm.";
      } else if (matchedSjr || matchedAbdc) {
        recommendation = "✅ ĐỦ CHUẨN: Tạp chí quốc tế uy tín, phù hợp công bố kết quả nghiên cứu khoa học.";
      } else if (matchedVn || matchedHdgs) {
        recommendation = "✅ ĐỦ CHUẨN QUỐC GIA: Đạt chuẩn khoa học Việt Nam 2026, tính điểm HĐGSNN và nghiệm thu đề tài NCKH trong nước.";
      } else {
        recommendation = "✅ ĐỦ ĐIỀU KIỆN: Tạp chí khoa học hợp lệ, chưa ghi nhận dấu hiệu vi phạm liêm chính học thuật.";
      }
    }

    // Tiêu chuẩn Việt Nam
    let standardVnText: string | undefined;
    let categoryVnText: string | undefined;
    let nafostedText: string | undefined;
    let aciText: string | undefined;
    const hdgsnnList: string[] = [];

    if (matchedVn) {
      standardVnText = `✅ ĐẠT TIÊU CHUẨN QUỐC GIA (STT: ${matchedVn.stt} / 341)`;
      categoryVnText = matchedVn.cat || "Tạp chí chỉ mục quốc tế (Scopus, WoS)";
    } else if (matchedSjr || matchedAbdc) {
      standardVnText = "Tạp chí quốc tế (công nhận tính điểm theo quy chế đào tạo & HĐGSNN)";
    }

    if (matchedNafostedNational) {
      nafostedText = `🇻🇳 ĐẠT CHUẨN QUỐC GIA UY TÍN (HĐ ngành: ${matchedNafostedNational.council || "Kinh tế / KHXH"} - Đủ điều kiện nghiệm thu đề tài NAFOSTED)`;
    } else if (isNafostedIntl) {
      nafostedText = `🎖️ ĐẠT CHUẨN QUỐC TẾ UY TÍN (Scopus ${matchedSjr.quartile} theo QĐ 14/QĐ-HĐQL-NAFOSTED - Đủ điều kiện chủ nhiệm/nghiệm thu đề tài cấp Quốc gia)`;
    }

    if (matchedAci) {
      aciText = `🌟 ĐẠT CHUẨN ACI (${matchedAci.title || finalTitle} - Tính điểm HĐGSNN tối đa 1,25 điểm & chuẩn Tiến sĩ)`;
    }

    if (matchedHdgs && Array.isArray(matchedHdgs.scores)) {
      for (const sc of matchedHdgs.scores) {
        hdgsnnList.push(`HĐGS ${sc.council}: ${sc.points}`);
      }
    } else if (matchedSjr?.quartile === "Q1") {
      hdgsnnList.push("HĐGS Kinh tế / Đa ngành: 0 - 2,0 điểm (Khung chung Scopus Q1)");
    } else if (matchedSjr?.quartile) {
      hdgsnnList.push(`HĐGS: 0 - 1,5 điểm (Khung chung Scopus ${matchedSjr.quartile})`);
    }

    // Xếp hạng quốc tế
    let scopusDesc: string | undefined;
    let abdcDesc: string | undefined;

    if (matchedSjr) {
      const qTier = matchedSjr.quartile || "N/A";
      const sjrVal = matchedSjr.sjr || "N/A";
      let tierExpl = "";
      if (qTier === "Q1") tierExpl = "Top 25% tạp chí hàng đầu thế giới";
      else if (qTier === "Q2") tierExpl = "Nhóm 25% - 50% thế giới";
      else if (qTier === "Q3") tierExpl = "Nhóm 50% - 75% danh mục";
      else if (qTier === "Q4") tierExpl = "Nhóm 75% - 100% danh mục";
      scopusDesc = `🌟 ${qTier} (SJR: ${sjrVal} - ${tierExpl})`;
    }

    if (matchedAbdc) {
      const r = matchedAbdc.rating || matchedAbdc.abdc || "Listed";
      let rExpl = "";
      if (r === "A*") rExpl = "Tạp chí tinh hoa quốc tế (Top 7% Kinh tế/Quản trị)";
      else if (r === "A") rExpl = "Tạp chí xuất sắc, uy tín quốc tế rất cao";
      else if (r === "B") rExpl = "Tạp chí chất lượng tốt, quốc tế công nhận";
      else if (r === "C") rExpl = "Tạp chí đạt chuẩn bình duyệt quốc tế";
      abdcDesc = `🎖️ Hạng ${r} (${rExpl})`;
    }

    // Kiểm định liêm chính
    const scopusStatus = matchedDisc
      ? `🔴 ĐÃ BỊ LOẠI KHỎI SCOPUS (Từ ${matchedDisc.discontinued_info || "gần đây"})`
      : matchedSjr
      ? "✅ ĐANG HOẠT ĐỘNG (Active - An toàn)"
      : "✅ Không nằm trong danh mục bị loại";

    const wosStatus = matchedWosDelisted
      ? `🔴 BỊ TƯỚC CHỈ MỤC WoS (Lý do: ${matchedWosDelisted.reason || "Editorial quality concerns"})`
      : "✅ Không nằm trong danh sách bị loại (WoS Delisted)";

    const hijackedStatus = matchedHijacked
      ? "🚨 BỊ CƯỚP TÊN MIỀN / CÓ TRANG WEB GIẢ MẠO"
      : "✅ AN TOÀN (Chưa ghi nhận website cướp tên miền)";

    const beallStatus = matchedBeallJournal || matchedBeallPublisher
      ? "⚠️ NẰM TRONG DANH SÁCH SĂN MỒI (BEALL'S LIST)"
      : "✅ An toàn (Không thuộc NXB/Tạp chí săn mồi)";

    const retractionStatus = retractionCount > 0
      ? `⚠️ Có ${retractionCount} bài từng bị rút / thu hồi (Retraction Watch)`
      : "✅ 0 bài bị rút (Chỉ số liêm chính cao)";

    // Tạo RAW text chuẩn cho người dùng copy
    const rawLines: string[] = [
      executivePill,
      "🔬 BÁO CÁO THẨM ĐỊNH TẠP CHÍ KHOA HỌC",
      `📖 Tạp chí: "${finalTitle}"`
    ];
    if (acronymDecoded) {
      rawLines.push(`(Được giải mã từ tên viết tắt: ${acronymDecoded.toUpperCase()})`);
    }

    rawLines.push("\n📋 1. ĐỊNH DANH & CƠ QUAN CHỦ QUẢN:");
    rawLines.push(`• Tên chính thức: ${finalTitle}`);
    rawLines.push(`• Mã ISSN / eISSN: ${finalIssn}`);
    if (orgPublisher) rawLines.push(`• Cơ quan chủ quản / NXB: ${orgPublisher}`);

    if (standardVnText || nafostedText || aciText || hdgsnnList.length > 0) {
      rawLines.push("\n🇻🇳 2. TIÊU CHUẨN VIỆT NAM, NAFOSTED & HĐGSNN:");
      if (standardVnText) rawLines.push(`• Chuẩn khoa học VN 2026: ${standardVnText}`);
      if (categoryVnText) rawLines.push(`• Phân nhóm: ${categoryVnText}`);
      if (nafostedText) rawLines.push(`• Chuẩn Quỹ NAFOSTED: ${nafostedText}`);
      if (aciText) rawLines.push(`• Chỉ mục ACI (Đông Nam Á): ${aciText}`);
      if (hdgsnnList.length > 0) {
        rawLines.push("• Điểm HĐGSNN 2025 (QĐ 26/QĐ-HĐGSNN):");
        hdgsnnList.forEach((s) => rawLines.push(`  🎯 ${s}`));
      }
    }

    if (scopusDesc || abdcDesc) {
      rawLines.push("\n🏆 3. XẾP HẠNG QUỐC TẾ (SCOPUS / ABDC):");
      if (scopusDesc) rawLines.push(`• SCImago Scopus: ${scopusDesc}`);
      if (abdcDesc) rawLines.push(`• Phân hạng ABDC (Úc): ${abdcDesc}`);
    }

    rawLines.push("\n🛡️ 4. KIỂM ĐỊNH LIÊM CHÍNH & RỦI RO:");
    rawLines.push(`• Tình trạng Scopus: ${scopusStatus}`);
    rawLines.push(`• Web of Science: ${wosStatus}`);
    rawLines.push(`• Tạp chí giả mạo: ${hijackedStatus}`);
    rawLines.push(`• Danh sách Beall's List: ${beallStatus}`);
    rawLines.push(`• Lịch sử rút bài (Retraction Watch): ${retractionStatus}`);

    rawLines.push(`\n🎯 5. KHUYẾN NGHỊ NỘP BÀI (VERDICT):`);
    rawLines.push(recommendation);

    rawLines.push("\n📖 Tra cứu trực tuyến tại VNResearch Dictionary:");
    rawLines.push("👉 https://vnresearch-dictionary.vercel.app/tap-chi");

    return {
      executivePill,
      verdictLevel,
      verdictTitle,
      verdictBadges,
      recommendation,
      identification: {
        title: finalTitle,
        issn: finalIssn,
        publisher: orgPublisher,
        acronymDecoded
      },
      vietnamStandards: {
        standardVn: standardVnText,
        category: categoryVnText,
        nafosted: nafostedText,
        aci: aciText,
        hdgsnnScores: hdgsnnList
      },
      internationalRankings: {
        scopus: scopusDesc,
        abdc: abdcDesc,
        quartile: matchedSjr?.quartile,
        sjr: matchedSjr?.sjr,
        abdcRating: matchedAbdc?.rating || matchedAbdc?.abdc
      },
      integrityChecks: {
        scopusStatus,
        wosStatus,
        hijackedStatus,
        beallStatus,
        retractionStatus
      },
      warnings: warnings.length > 0 ? warnings : undefined,
      rawReportText: rawLines.join("\n")
    };
  }

  // 1. Chế độ xem đặc biệt: Danh sách 16 Tạp chí Việt Nam trong Scopus/WoS
  if (mode === "vn16") {
    const intlVn = vnList.filter((item: any) => item.intl || item.stt <= 16);
    const results: JournalItemResult[] = intlVn.map((j: any) => {
      const tLower = j.title.toLowerCase();
      const sjrInfo = sjrMap[tLower] || null;
      const issnFmt = formatIssn(j.issn);
      const eissnFmt = formatIssn(j.eissn);
      const rep = buildZaloReport({
        finalTitle: toTitleCase(j.title),
        finalIssn: issnFmt,
        orgPublisher: j.org || j.publisher || "Cơ quan chủ quản Việt Nam",
        matchedVn: j,
        matchedSjr: sjrInfo,
        matchedAci: aciByTitle[cleanVnJournalName(j.title)] || (j.issn && aciByIssn[normalizeIssn(j.issn)]),
        matchedNafostedNational: nafostedByTitle[cleanVnJournalName(j.title)] || (j.issn && nafostedByIssn[normalizeIssn(j.issn)]),
        retractionCount: retractionMap[tLower] || 0
      });

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
        nafosted: true,
        report: rep
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

    const results: JournalItemResult[] = filtered.slice(0, 25).map((item: any, idx: number) => {
      const rep = buildZaloReport({
        finalTitle: item.title,
        finalIssn: formatIssn(item.issn),
        orgPublisher: item.publisher || "NXB Quốc tế",
        matchedDisc: item,
        retractionCount: retractionMap[(item.title || "").toLowerCase()] || 0
      });

      return {
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
        },
        report: rep
      };
    });

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
  const acronymDecoded = KNOWN_ACRONYMS[qLower] ? q.toUpperCase() : undefined;
  const normQVn = normalizeVnText(resolvedQuery);
  const cleanQVn = cleanVnJournalName(resolvedQuery);

  const matchedItems: JournalItemResult[] = [];

  // A. Kiểm tra Hijacked Journals (Tạp chí Giả mạo)
  let matchedHijacked: any = null;
  for (const h of hijackedList) {
    const hTitle = (h.title || h.journal_title || "").toLowerCase();
    const hIssn = normalizeIssn(h.issn || "");
    if (
      (normQIssn && normQIssn.length === 8 && normQIssn === hIssn) ||
      (hTitle && matchTitleSafely(hTitle, resolvedQuery))
    ) {
      matchedHijacked = h;
      break;
    }
  }

  // B. Kiểm tra Web of Science Delisted / On Hold
  let matchedWosDelisted: any = null;
  for (const item of wosDelistedList) {
    const issn = normalizeIssn(item.issn || "");
    const eissn = normalizeIssn(item.e_issn || "");
    const title = (item.name || "").toLowerCase();
    if (
      (normQIssn && normQIssn.length === 8 && (normQIssn === issn || normQIssn === eissn)) ||
      (title && title === resolvedQuery) ||
      (title && resolvedQuery.length >= 6 && matchTitleSafely(title, resolvedQuery))
    ) {
      matchedWosDelisted = item;
      break;
    }
  }

  // C. Kiểm tra Scopus Discontinued (Bị loại khỏi Scopus)
  let matchedDisc: any = null;
  for (const item of discList) {
    const title = item.title || "";
    const issn = normalizeIssn(item.issn || "");
    const eissn = normalizeIssn(item.eissn || "");

    if (
      (normQIssn && normQIssn.length === 8 && (normQIssn === issn || normQIssn === eissn)) ||
      matchTitleSafely(title, resolvedQuery)
    ) {
      matchedDisc = item;
      break;
    }
  }

  // D. Kiểm tra Beall's List (Tạp chí săn mồi)
  let matchedBeallJournal: any = null;
  for (const item of beallJournalsList) {
    const name = (item.name || "").toLowerCase();
    const abbr = (item.abbr || "").toLowerCase();
    if (
      (abbr && abbr === resolvedQuery) ||
      (name && name === resolvedQuery) ||
      (name && resolvedQuery.length >= 6 && matchTitleSafely(name, resolvedQuery))
    ) {
      matchedBeallJournal = item;
      break;
    }
  }

  let matchedBeallPublisher: any = null;
  for (const item of beallPublishersList) {
    const name = (item.name || "").toLowerCase();
    const abbr = (item.abbr || "").toLowerCase();
    if (
      (abbr && abbr === resolvedQuery) ||
      (name && matchTitleSafely(name, resolvedQuery))
    ) {
      matchedBeallPublisher = item;
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

  // Tra cứu ACI & NAFOSTED
  let matchedAci: any = null;
  if (normQIssn && normQIssn.length === 8) {
    if (aciByIssn[normQIssn]) matchedAci = aciByIssn[normQIssn];
  }
  if (!matchedAci && matchedVn) {
    const vnIssns = [matchedVn.issn, matchedVn.eissn].filter(Boolean).map(normalizeIssn).filter(Boolean);
    for (const vi of vnIssns) {
      if (aciByIssn[vi]) { matchedAci = aciByIssn[vi]; break; }
    }
  }
  if (!matchedAci && cleanQVn.length >= 4) {
    if (aciByTitle[cleanQVn]) matchedAci = aciByTitle[cleanQVn];
    else {
      for (const [titleClean, info] of Object.entries<any>(aciByTitle)) {
        if (titleClean === cleanQVn || matchTitleSafely(titleClean, cleanQVn)) {
          matchedAci = info;
          break;
        }
      }
    }
  }

  let matchedNafostedNational: any = null;
  if (normQIssn && normQIssn.length === 8) {
    if (nafostedByIssn[normQIssn]) matchedNafostedNational = nafostedByIssn[normQIssn];
  }
  if (!matchedNafostedNational && matchedVn) {
    const vnIssns = [matchedVn.issn, matchedVn.eissn].filter(Boolean).map(normalizeIssn).filter(Boolean);
    for (const vi of vnIssns) {
      if (nafostedByIssn[vi]) { matchedNafostedNational = nafostedByIssn[vi]; break; }
    }
  }
  if (!matchedNafostedNational && cleanQVn.length >= 4) {
    if (nafostedByTitle[cleanQVn]) matchedNafostedNational = nafostedByTitle[cleanQVn];
    else {
      for (const [titleClean, info] of Object.entries<any>(nafostedByTitle)) {
        if (titleClean === cleanQVn || matchTitleSafely(titleClean, cleanQVn)) {
          matchedNafostedNational = info;
          break;
        }
      }
    }
  }

  // Xác định Tên và ISSN chính
  const primaryTitle = toTitleCase(
    matchedVn?.title ||
    matchedHdgs?.title ||
    matchedDisc?.title ||
    matchedWosDelisted?.name ||
    matchedBeallJournal?.name ||
    matchedBeallPublisher?.name ||
    matchedSjrTitle ||
    abdcTitle ||
    matchedHijacked?.title ||
    resolvedQuery
  );

  let finalIssn = "";
  if (matchedSjr && matchedSjr.issn) {
    finalIssn = String(matchedSjr.issn).split(",")[0].trim();
  } else if (matchedVn && matchedVn.issn) {
    finalIssn = matchedVn.issn;
  } else if (matchedHdgs && matchedHdgs.issn) {
    finalIssn = matchedHdgs.issn;
  } else if (matchedDisc && (matchedDisc.issn || matchedDisc.eissn)) {
    finalIssn = matchedDisc.issn || matchedDisc.eissn;
  } else if (matchedWosDelisted && (matchedWosDelisted.issn || matchedWosDelisted.e_issn)) {
    finalIssn = matchedWosDelisted.issn || matchedWosDelisted.e_issn;
  } else if (matchedAbdc && matchedAbdc.issn) {
    finalIssn = String(matchedAbdc.issn).split(",")[0].trim();
  }

  const orgPublisher =
    matchedVn?.org ||
    matchedHdgs?.org ||
    matchedDisc?.publisher ||
    matchedWosDelisted?.publisher ||
    (matchedSjr ? matchedSjr.publisher : "") ||
    (matchedBeallPublisher ? matchedBeallPublisher.name : "");

  let retCount = 0;
  const lowerT = primaryTitle.toLowerCase();
  if (retractionMap[lowerT]) {
    retCount = retractionMap[lowerT];
  }

  // Tạo báo cáo thẩm định chuẩn Zalo Bot
  const fullReport = buildZaloReport({
    finalTitle: primaryTitle,
    finalIssn: formatIssn(finalIssn),
    orgPublisher,
    acronymDecoded,
    matchedDisc,
    matchedHijacked,
    matchedWosDelisted,
    matchedBeallJournal,
    matchedBeallPublisher,
    matchedSjr,
    matchedAbdc,
    matchedVn,
    matchedHdgs,
    matchedAci,
    matchedNafostedNational,
    retractionCount: retCount
  });

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

  let finalStatus: "active" | "discontinued" | "wos_delisted" | "hijacked" | "predatory" | "neutral" = "active";
  if (matchedDisc) finalStatus = "discontinued";
  else if (matchedHijacked) finalStatus = "hijacked";
  else if (matchedWosDelisted) finalStatus = "wos_delisted";
  else if (matchedBeallJournal || matchedBeallPublisher) finalStatus = "predatory";

  matchedItems.push({
    id: `journal-${primaryTitle.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
    title: primaryTitle,
    issn: formatIssn(finalIssn),
    eissn: matchedVn?.eissn || matchedDisc?.eissn,
    publisher: orgPublisher,
    country: matchedSjr ? matchedSjr.country : matchedVn ? "Vietnam" : undefined,
    status: finalStatus,
    statusBadge: {
      label: fullReport.verdictBadges[0] || (matchedDisc ? "BỊ LOẠI KHỎI SCOPUS" : "ĐẠT CHUẨN KHOA HỌC"),
      variant: fullReport.verdictLevel === "danger" ? "danger" : fullReport.verdictLevel === "warning" ? "warning" : "success",
      detail: fullReport.verdictBadges.slice(1).join(" • ")
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
    discontinuedInfo: matchedDisc
      ? {
          coverage: matchedDisc.coverage,
          reason: matchedDisc.reason,
          year: matchedDisc.discontinued_info,
          publisher: matchedDisc.publisher
        }
      : undefined,
    wosDelistedInfo: matchedWosDelisted
      ? {
          category: matchedWosDelisted.category,
          date: matchedWosDelisted.date,
          reason: matchedWosDelisted.reason
        }
      : undefined,
    hijackedInfo: matchedHijacked
      ? {
          fakeUrl: matchedHijacked.fake_url || matchedHijacked.hijacked_url,
          realUrl: matchedHijacked.real_url || matchedHijacked.authentic_url,
          notes: matchedHijacked.notes
        }
      : undefined,
    beallInfo: matchedBeallJournal
      ? {
          type: "standalone",
          name: matchedBeallJournal.name,
          url: matchedBeallJournal.url
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
    aci: !!matchedAci,
    nafosted: !!(matchedNafostedNational || (matchedSjr && ["Q1", "Q2", "Q3"].includes(matchedSjr.quartile))),
    report: fullReport
  });

  // Gợi ý từ gần đúng nếu không thấy kết quả
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
