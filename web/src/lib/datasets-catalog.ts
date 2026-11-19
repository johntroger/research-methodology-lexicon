export interface DatasetItem {
  name: string;
  url: string;
  cat_key: string;
  cat: string;
  cat_vi: string;
  desc?: string;
  years?: string;
  access?: string;
}

export interface DatasetCategory {
  key: string;
  name: string;
  name_vi: string;
  count: number;
}

export interface DatasetsPayload {
  ok: boolean;
  source_name: string;
  source_url: string;
  updated_at: string;
  total: number;
  filtered_total: number;
  categories: DatasetCategory[];
  items: DatasetItem[];
  data_origin?: "worker_api" | "github_raw" | "fallback";
}

export type DomainKey = "all" | "econ" | "edu_soc" | "health_env" | "gov_misc";

export interface DomainGroupConfig {
  key: DomainKey;
  label_vi: string;
  label_en: string;
  short_vi: string;
  short_en: string;
  categories: string[];
}

export const WORKER_DATASETS_API_URL =
  "https://scopus-wos-zalo-bot.nttu-kts-johntroger.workers.dev/api/datasets";

export const GITHUB_RAW_DATASETS_URL =
  "https://raw.githubusercontent.com/johntroger/scopus-wos-bot/main/research_datasets.json";

export const CAT_VI: Record<string, string> = {
  finance: "Tài chính",
  personal_finance: "Tài chính cá nhân",
  businesses: "Doanh nghiệp",
  macroeconomics: "Kinh tế vĩ mô",
  inflation_and_cost_of_living: "Lạm phát & Chi phí SH",
  working: "Lao động & Việc làm",
  shopping: "Tiêu dùng & Mua sắm",
  real_estate: "Bất động sản",
  patents: "Sáng chế",
  education: "Giáo dục",
  academia: "Học thuật & ĐH",
  household_surveys: "Khảo sát hộ gia đình",
  us_censuses_and_economic_history: "Tổng điều tra & LS KT",
  time_use: "Sử dụng thời gian",
  family: "Gia đình",
  mobility_and_migration: "Di cư & Dịch chuyển",
  demography: "Nhân khẩu học",
  beliefs_and_values: "Niềm tin & Giá trị",
  social_networks: "Mạng xã hội",
  religion: "Tôn giáo",
  health_public_health_and_epidemiology: "Y tế & Dịch tễ học",
  injury_and_death: "Chấn thương & Tử vong",
  environment_and_energy: "Môi trường & Năng lượng",
  weather: "Thời tiết & Khí hậu",
  maps_and_geography: "Bản đồ & Địa lý",
  crashes_and_traffic: "Tai nạn & Giao thông",
  government: "Chính phủ",
  politics_and_voting: "Chính trị & Bầu cử",
  law: "Pháp luật",
  crime: "Tội phạm",
  states_conflict_and_regimes: "Quốc gia & Xung đột",
  sports: "Thể thao",
  names: "Tên gọi & Nhân danh",
  misc: "Tổng hợp (OWID, Gapminder)",
};

export const DOMAIN_GROUPS: DomainGroupConfig[] = [
  {
    key: "all",
    label_vi: "Tất cả lĩnh vực",
    label_en: "All Domains",
    short_vi: "Tất cả",
    short_en: "All",
    categories: [],
  },
  {
    key: "econ",
    label_vi: "Kinh tế – Tài chính – Doanh nghiệp",
    label_en: "Economics, Finance & Business",
    short_vi: "Kinh tế & Tài chính",
    short_en: "Econ & Finance",
    categories: [
      "finance",
      "personal_finance",
      "businesses",
      "macroeconomics",
      "working",
      "shopping",
      "real_estate",
      "inflation_and_cost_of_living",
      "patents",
    ],
  },
  {
    key: "edu_soc",
    label_vi: "Giáo dục – Xã hội – Nhân khẩu",
    label_en: "Education, Society & Demography",
    short_vi: "Giáo dục & Xã hội",
    short_en: "Education & Society",
    categories: [
      "education",
      "academia",
      "household_surveys",
      "us_censuses_and_economic_history",
      "family",
      "demography",
      "mobility_and_migration",
      "time_use",
      "beliefs_and_values",
      "social_networks",
    ],
  },
  {
    key: "health_env",
    label_vi: "Y tế – Môi trường – Khí hậu",
    label_en: "Health, Environment & Climate",
    short_vi: "Y tế & Môi trường",
    short_en: "Health & Environment",
    categories: [
      "health_public_health_and_epidemiology",
      "injury_and_death",
      "environment_and_energy",
      "weather",
      "maps_and_geography",
      "crashes_and_traffic",
    ],
  },
  {
    key: "gov_misc",
    label_vi: "Chính phủ – Pháp luật – Tổng hợp",
    label_en: "Government, Law & General",
    short_vi: "Chính phủ & Tổng hợp",
    short_en: "Gov, Law & Misc",
    categories: [
      "government",
      "politics_and_voting",
      "law",
      "crime",
      "states_conflict_and_regimes",
      "religion",
      "sports",
      "names",
      "misc",
    ],
  },
];

export const CAT_ALIASES: Record<string, string[]> = {
  "tai chinh": ["finance", "personal_finance"],
  "tai chinh ca nhan": ["personal_finance"],
  "kinh te": ["macroeconomics", "businesses", "inflation_and_cost_of_living", "finance"],
  "kinh te vi mo": ["macroeconomics"],
  "vi mo": ["macroeconomics"],
  "doanh nghiep": ["businesses"],
  "cong ty": ["businesses"],
  "kinh doanh": ["businesses"],
  "lao dong": ["working"],
  "viec lam": ["working"],
  "nhan luc": ["working"],
  "giao duc": ["education", "academia"],
  "hoc thuat": ["academia"],
  "dai hoc": ["academia", "education"],
  "y te": ["health_public_health_and_epidemiology"],
  "y hoc": ["health_public_health_and_epidemiology"],
  "suc khoe": ["health_public_health_and_epidemiology"],
  "dich te": ["health_public_health_and_epidemiology"],
  "moi truong": ["environment_and_energy", "weather"],
  "nang luong": ["environment_and_energy"],
  "thoi tiet": ["weather"],
  "khi hau": ["weather", "environment_and_energy"],
  "bat dong san": ["real_estate"],
  "nha dat": ["real_estate"],
  "nha o": ["real_estate"],
  "tieu dung": ["shopping"],
  "mua sam": ["shopping"],
  "ban le": ["shopping"],
  "ho gia dinh": ["household_surveys"],
  "khao sat": ["household_surveys"],
  "khao sat ho gia dinh": ["household_surveys"],
  "gia dinh": ["family"],
  "toi pham": ["crime"],
  "phap luat": ["law"],
  luat: ["law"],
  "chinh phu": ["government"],
  "chinh tri": ["politics_and_voting"],
  "bau cu": ["politics_and_voting"],
  "di cu": ["mobility_and_migration"],
  "dan so": ["demography"],
  "nhan khau": ["demography"],
  "nhan khau hoc": ["demography"],
  "sang che": ["patents"],
  "mang xa hoi": ["social_networks"],
  "lam phat": ["inflation_and_cost_of_living"],
  "chi phi": ["inflation_and_cost_of_living"],
  "giao thong": ["crashes_and_traffic"],
  "tai nan": ["crashes_and_traffic", "injury_and_death"],
  "tu vong": ["injury_and_death", "demography"],
  "thoi gian": ["time_use"],
  "ban do": ["maps_and_geography"],
  "dia ly": ["maps_and_geography"],
  "ton giao": ["religion"],
  "van hoa": ["beliefs_and_values"],
  "niem tin": ["beliefs_and_values"],
  "gia tri": ["beliefs_and_values"],
  "xung dot": ["states_conflict_and_regimes"],
  "chien tranh": ["states_conflict_and_regimes"],
  "the thao": ["sports"],
  "tong dieu tra": ["us_censuses_and_economic_history"],
  "lich su": ["us_censuses_and_economic_history"],
  ten: ["names"],
  "tong hop": ["misc"],
  khac: ["misc"],
  finance: ["finance", "personal_finance"],
  "personal finance": ["personal_finance"],
  business: ["businesses"],
  businesses: ["businesses"],
  macro: ["macroeconomics"],
  macroeconomics: ["macroeconomics"],
  working: ["working"],
  work: ["working"],
  labor: ["working"],
  labour: ["working"],
  education: ["education"],
  academia: ["academia"],
  academic: ["academia"],
  health: ["health_public_health_and_epidemiology"],
  epidemiology: ["health_public_health_and_epidemiology"],
  environment: ["environment_and_energy"],
  energy: ["environment_and_energy"],
  weather: ["weather"],
  climate: ["weather", "environment_and_energy"],
  "real estate": ["real_estate"],
  housing: ["real_estate"],
  shopping: ["shopping"],
  household: ["household_surveys"],
  surveys: ["household_surveys"],
  census: ["us_censuses_and_economic_history"],
  history: ["us_censuses_and_economic_history"],
  family: ["family"],
  crime: ["crime"],
  law: ["law"],
  government: ["government"],
  politics: ["politics_and_voting"],
  voting: ["politics_and_voting"],
  migration: ["mobility_and_migration"],
  mobility: ["mobility_and_migration"],
  demography: ["demography"],
  patent: ["patents"],
  patents: ["patents"],
  social: ["social_networks"],
  "social networks": ["social_networks"],
  inflation: ["inflation_and_cost_of_living"],
  cpi: ["inflation_and_cost_of_living"],
  traffic: ["crashes_and_traffic"],
  crash: ["crashes_and_traffic"],
  crashes: ["crashes_and_traffic"],
  injury: ["injury_and_death"],
  death: ["injury_and_death"],
  time: ["time_use"],
  "time use": ["time_use"],
  map: ["maps_and_geography"],
  maps: ["maps_and_geography"],
  geo: ["maps_and_geography"],
  geography: ["maps_and_geography"],
  religion: ["religion"],
  beliefs: ["beliefs_and_values"],
  values: ["beliefs_and_values"],
  conflict: ["states_conflict_and_regimes"],
  war: ["states_conflict_and_regimes"],
  states: ["states_conflict_and_regimes"],
  sports: ["sports"],
  sport: ["sports"],
  names: ["names"],
  misc: ["misc"],
};

export const VI_TOKENS: Record<string, string[]> = {
  "bien doi khi hau": ["weather", "temperature", "environmental", "precipitation"],
  "khi hau": ["weather", "temperature", "environmental"],
  "tien luong": ["wage", "salary", "earnings", "income", "pay"],
  luong: ["wage", "salary", "earnings", "income", "pay"],
  "thu nhap": ["income", "earnings"],
  thue: ["tax"],
  "ngan hang": ["bank", "central bank", "monetary", "credit"],
  "chinh sach tien te": ["monetary policy", "central bank"],
  "tien te": ["monetary", "bank"],
  "chung khoan": ["equity", "stock", "ownership", "corporate"],
  "so huu": ["ownership", "voteholders"],
  "sinh vien": ["student", "college", "university"],
  "hoc sinh": ["student", "school", "k 12"],
  "dai hoc": ["college", "university", "phd", "faculty"],
  "giao vien": ["teacher", "faculty", "school"],
  "benh vien": ["hospital", "healthcare", "medical"],
  "y te": ["health", "medical", "mortality"],
  "o nhiem": ["pollution", "air", "environment", "environmental", "hazards"],
  "phat thai": ["emission", "pollution", "energy"],
  dien: ["electricity", "energy", "power"],
  "gia nha": ["home price", "housing", "zillow", "property"],
  "bat dong san": ["housing", "home", "property", "zillow"],
  "hon nhan": ["marriage", "divorce", "family"],
  "ly hon": ["divorce", "marriage"],
  "sinh san": ["fertility", "birth"],
  "tu vong": ["mortality", "death"],
  "canh sat": ["police", "crime"],
  "toa an": ["court", "judge", "law"],
  "thuong mai": ["trade", "amazon", "e commerce"],
  "mua sam": ["purchase", "amazon", "e commerce"],
  "viec lam": ["employment", "job", "occupation", "workforce"],
  "that nghiep": ["unemployment", "employment", "work"],
  "di cu": ["migration", "mobility"],
  "sang che": ["patent"],
  "bau cu": ["voting", "election", "voter", "congress"],
  "nghi vien": ["congress", "legislator"],
  "hanh phuc": ["happiness", "flourishing"],
  "ti le": ["rate"],
};

const STOPWORDS = new Set([
  "ve",
  "cua",
  "cho",
  "voi",
  "va",
  "trong",
  "tu",
  "cac",
  "nhung",
  "nganh",
  "linh",
  "vuc",
  "chu",
  "de",
  "du",
  "lieu",
  "data",
  "dataset",
  "datasets",
  "mien",
  "phi",
  "mo",
  "tim",
]);

export function normVn(str?: string): string {
  if (!str) return "";
  return String(str)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getDomainForCategory(catKey: string): DomainKey {
  for (const group of DOMAIN_GROUPS) {
    if (group.key !== "all" && group.categories.includes(catKey)) {
      return group.key;
    }
  }
  return "gov_misc";
}

export function filterAndScoreDatasets(
  items: DatasetItem[],
  options: {
    domain?: DomainKey;
    cat?: string;
    query?: string;
    onlyPublic?: boolean;
  }
): DatasetItem[] {
  const { domain = "all", cat = "all", query = "", onlyPublic = false } = options;

  const domainConfig = DOMAIN_GROUPS.find((d) => d.key === domain);
  const domKeys = domain === "all" ? null : domainConfig?.categories || [];

  const baseFiltered = items.filter((it) => {
    if (domKeys && !domKeys.includes(it.cat_key)) return false;
    if (cat !== "all" && it.cat_key !== cat) return false;
    if (onlyPublic) {
      const acc = (it.access || "").toLowerCase();
      if (acc && !acc.includes("public") && !acc.includes("open") && !acc.includes("free")) {
        return false;
      }
    }
    return true;
  });

  const qRaw = query.trim();
  const qNorm = normVn(qRaw).replace(/^(?:ve|nganh|chu de|linh vuc)\s+/, "").trim();

  if (!qNorm) return baseFiltered;

  // Khớp trực tiếp theo alias chủ đề khi chưa chọn chủ đề cụ thể
  if (cat === "all" && CAT_ALIASES[qNorm]) {
    const aliasSet = CAT_ALIASES[qNorm];
    const aliasHits = baseFiltered.filter((it) => aliasSet.includes(it.cat_key));
    if (aliasHits.length > 0) return aliasHits;
  }

  // Dịch cụm từ khóa tiếng Việt sang tiếng Anh
  const translatedSet = new Set<string>();
  for (const [vp, enTerms] of Object.entries(VI_TOKENS)) {
    if (qNorm.includes(vp)) {
      enTerms.forEach((en) => translatedSet.add(en));
    }
  }

  const rawWords = qNorm.split(" ").filter((w) => w.length >= 2 && !STOPWORDS.has(w));
  for (const rw of rawWords) {
    if (VI_TOKENS[rw]) {
      VI_TOKENS[rw].forEach((en) => translatedSet.add(en));
    }
  }
  const transKeys = Array.from(translatedSet);

  const scored: { item: DatasetItem; score: number }[] = [];

  for (const it of baseFiltered) {
    const nN = normVn(it.name);
    const cN = normVn(it.cat);
    const cvN = normVn(it.cat_vi || CAT_VI[it.cat_key] || "");
    const dN = normVn(it.desc || "");
    const uL = (it.url || "").toLowerCase();
    const yN = normVn(it.years || "");
    const aN = normVn(it.access || "");

    let score = 0;

    if (nN === qNorm) score += 120;
    else if (nN.startsWith(qNorm)) score += 75;
    else if (qNorm.length >= 2 && nN.includes(qNorm)) score += 60;

    if (qNorm.length >= 2 && (dN.includes(qNorm) || uL.includes(qNorm))) score += 45;
    if (cN.includes(qNorm) || cvN.includes(qNorm)) score += 35;
    if (yN.includes(qNorm) || aN.includes(qNorm)) score += 20;

    for (const rw of rawWords) {
      if (nN.includes(rw)) score += 22;
      if (dN.includes(rw)) score += 14;
      if (cN.includes(rw) || cvN.includes(rw)) score += 16;
      if (uL.includes(rw)) score += 10;
    }

    for (const tk of transKeys) {
      if (nN.includes(tk)) score += 26;
      if (dN.includes(tk)) score += 18;
      if (cN.includes(tk)) score += 14;
    }

    if (score > 0) {
      scored.push({ item: it, score });
    }
  }

  scored.sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name));
  return scored.map((s) => s.item);
}

function normalizePayload(
  raw: Partial<DatasetsPayload> & { items?: Partial<DatasetItem>[]; categories?: Partial<DatasetCategory>[] },
  origin: "worker_api" | "github_raw"
): DatasetsPayload {
  const items: DatasetItem[] = (raw.items || []).map((it) => {
    const catKey = it.cat_key || "misc";
    return {
      name: it.name || "Untitled Dataset",
      url: it.url || "#",
      cat_key: catKey,
      cat: it.cat || "Misc.",
      cat_vi: it.cat_vi || CAT_VI[catKey] || it.cat || "Khác",
      desc: it.desc,
      years: it.years,
      access: it.access,
    };
  });

  const categories: DatasetCategory[] = (raw.categories || []).map((c) => {
    const key = c.key || "misc";
    return {
      key,
      name: c.name || key,
      name_vi: c.name_vi || CAT_VI[key] || c.name || key,
      count: typeof c.count === "number" ? c.count : items.filter((i) => i.cat_key === key).length,
    };
  });

  return {
    ok: true,
    source_name: raw.source_name || "Free Datasets for Social Science Research (Todd Jones)",
    source_url: raw.source_url || "https://github.com/toddrjones/datasets",
    updated_at: raw.updated_at || new Date().toISOString(),
    total: typeof raw.total === "number" ? raw.total : items.length,
    filtered_total: typeof raw.filtered_total === "number" ? raw.filtered_total : items.length,
    categories,
    items,
    data_origin: origin,
  };
}

export async function fetchDatasetsCatalog(): Promise<DatasetsPayload> {
  // 1. Ưu tiên Workers API (đã kèm sẵn nhãn tiếng Việt name_vi / cat_vi)
  try {
    const res = await fetch(WORKER_DATASETS_API_URL, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      const json = await res.json();
      if (json && Array.isArray(json.items) && json.items.length > 0) {
        return normalizePayload(json, "worker_api");
      }
    }
  } catch (err) {
    console.warn("Worker datasets API unavailable, falling back to GitHub raw JSON:", err);
  }

  // 2. Fallback sang file JSON gốc trên GitHub
  try {
    const res = await fetch(GITHUB_RAW_DATASETS_URL, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      const json = await res.json();
      if (json && Array.isArray(json.items) && json.items.length > 0) {
        return normalizePayload(json, "github_raw");
      }
    }
  } catch (err) {
    console.error("GitHub raw datasets JSON unavailable:", err);
  }

  return {
    ok: false,
    source_name: "Free Datasets for Social Science Research (Todd Jones)",
    source_url: "https://github.com/toddrjones/datasets",
    updated_at: new Date().toISOString(),
    total: 0,
    filtered_total: 0,
    categories: [],
    items: [],
    data_origin: "fallback",
  };
}
