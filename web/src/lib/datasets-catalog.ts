export interface DatasetItem {
  name: string;
  url: string;
  cat_key: string;
  cat: string;
  cat_vi: string;
  desc?: string;
  years?: string;
  access?: string;
  featured?: boolean;
  has_vietnam?: boolean;
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

export type DomainKey =
  | "all"
  | "biz_mkt"
  | "vn_asean"
  | "econ_fin"
  | "edu_soc"
  | "health_env"
  | "gov_repo";

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
  // Nhóm chủ đề mới bổ sung (Business, Management, Marketing, VN/ASEAN, Repos)
  management_and_esg: "Quản trị, Khởi nghiệp & ESG",
  marketing_and_consumer: "Marketing & Hành vi tiêu dùng",
  vietnam_and_asean: "Việt Nam & ASEAN",
  trade_and_development: "Thương mại & Phát triển toàn cầu",
  academic_repositories: "Kho dữ liệu Bài báo & Khảo sát",

  // 34 chủ đề gốc từ scopus-wos-bot
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
    key: "biz_mkt",
    label_vi: "Quản trị – Marketing – Doanh nghiệp",
    label_en: "Business, Management & Marketing",
    short_vi: "Quản trị & Marketing",
    short_en: "Business & Mkt",
    categories: [
      "management_and_esg",
      "marketing_and_consumer",
      "businesses",
      "shopping",
      "patents",
    ],
  },
  {
    key: "vn_asean",
    label_vi: "Việt Nam & ASEAN",
    label_en: "Vietnam & ASEAN",
    short_vi: "Việt Nam & ASEAN",
    short_en: "Vietnam & ASEAN",
    categories: ["vietnam_and_asean"],
  },
  {
    key: "econ_fin",
    label_vi: "Kinh tế – Tài chính – Thương mại",
    label_en: "Economics, Finance & Trade",
    short_vi: "Kinh tế & Tài chính",
    short_en: "Econ & Finance",
    categories: [
      "finance",
      "personal_finance",
      "macroeconomics",
      "trade_and_development",
      "working",
      "real_estate",
      "inflation_and_cost_of_living",
    ],
  },
  {
    key: "edu_soc",
    label_vi: "Giáo dục – Xã hội – Nhân khẩu",
    label_en: "Education, Society & Demography",
    short_vi: "Giáo dục & Xã hội",
    short_en: "Edu & Society",
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
    short_en: "Health & Env",
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
    key: "gov_repo",
    label_vi: "Chính phủ – Pháp luật – Kho Học thuật",
    label_en: "Gov, Law & Academic Repos",
    short_vi: "Chính phủ & Kho NCKH",
    short_en: "Gov & Repos",
    categories: [
      "academic_repositories",
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

// 28 nguồn dữ liệu mở chuẩn Q1 tuyển chọn bổ sung (Business, Management, Marketing, Economics, VN/ASEAN, Academic Repos)
export const CURATED_EXTRA_DATASETS: DatasetItem[] = [
  // === 1. BUSINESS, MANAGEMENT & ESG ===
  {
    name: "World Management Survey (WMS)",
    url: "https://worldmanagementsurvey.org/",
    cat_key: "management_and_esg",
    cat: "Management, Entrepreneurship & ESG",
    cat_vi: "Quản trị, Khởi nghiệp & ESG",
    desc: "Dự án Stanford/LSE (Nick Bloom & cộng sự) đo lường chất lượng thực hành quản trị (operations, monitoring, targets, incentives) tại hàng chục nghìn doanh nghiệp, bệnh viện và trường học ở 35+ quốc gia.",
    years: "2004-present",
    access: "Free for academic research",
    featured: true,
    has_vietnam: true,
  },
  {
    name: "World Bank Enterprise Surveys (WBES)",
    url: "https://www.enterprisesurveys.org/",
    cat_key: "management_and_esg",
    cat: "Management, Entrepreneurship & ESG",
    cat_vi: "Quản trị, Khởi nghiệp & ESG",
    desc: "Dữ liệu vi mô cấp doanh nghiệp tại 155+ quốc gia (có nhiều sóng của Việt Nam như 2015, 2023) về tiếp cận tài chính, đổi mới sáng tạo, tham nhũng, giới tính lãnh đạo và năng suất (Stata/SPSS/CSV).",
    years: "2006-2025",
    access: "Free with registration",
    featured: true,
    has_vietnam: true,
  },
  {
    name: "Global Entrepreneurship Monitor (GEM)",
    url: "https://www.gemconsortium.org/data",
    cat_key: "management_and_esg",
    cat: "Management, Entrepreneurship & ESG",
    cat_vi: "Quản trị, Khởi nghiệp & ESG",
    desc: "Khảo sát toàn cầu hàng đầu về ý định khởi nghiệp (APS) và hệ sinh thái khởi nghiệp quốc gia (NES) tại 120+ nền kinh tế, bao gồm Việt Nam.",
    years: "2001-present",
    access: "Public (3-year lag) / Academic",
    featured: true,
    has_vietnam: true,
  },
  {
    name: "SEC EDGAR Corporate Filings",
    url: "https://www.sec.gov/edgar/searchedgar/companysearch",
    cat_key: "management_and_esg",
    cat: "Management, Entrepreneurship & ESG",
    cat_vi: "Quản trị, Khởi nghiệp & ESG",
    desc: "Kho báo cáo tài chính (10-K, 10-Q, 8-K, DEF 14A) và thông tin quản trị công ty của toàn bộ doanh nghiệp niêm yết tại Mỹ. Rất mạnh cho nghiên cứu Kế toán, Tài chính doanh nghiệp & Text Analytics.",
    years: "1994-present",
    access: "Public (Open API)",
    featured: true,
  },
  {
    name: "WikiRate Open ESG Data",
    url: "https://wikirate.org/",
    cat_key: "management_and_esg",
    cat: "Management, Entrepreneurship & ESG",
    cat_vi: "Quản trị, Khởi nghiệp & ESG",
    desc: "Nền tảng dữ liệu mở về chỉ số ESG, phát thải carbon, nhân quyền trong chuỗi cung ứng và báo cáo phát triển bền vững (CSR/GRI) của các tập đoàn toàn cầu.",
    years: "2014-present",
    access: "Public (CC BY 4.0 / API)",
    featured: true,
  },

  // === 2. MARKETING, CONSUMER BEHAVIOR & E-COMMERCE ===
  {
    name: "ResearchBox (Wharton / UPenn)",
    url: "https://researchbox.org/",
    cat_key: "marketing_and_consumer",
    cat: "Marketing & Consumer Behavior",
    cat_vi: "Marketing & Hành vi tiêu dùng",
    desc: "Kho lưu trữ dữ liệu thực nghiệm (experimental data), bảng hỏi và mã phân tích từ các bài báo đăng trên Journal of Consumer Research (JCR), JMR, Marketing Science & Management Science.",
    years: "2019-present",
    access: "Public",
    featured: true,
  },
  {
    name: "Amazon Reviews 2023 (UCSD McAuley Lab)",
    url: "https://amazon-reviews-2023.github.io/",
    cat_key: "marketing_and_consumer",
    cat: "Marketing & Consumer Behavior",
    cat_vi: "Marketing & Hành vi tiêu dùng",
    desc: "Hơn 570 triệu đánh giá sản phẩm, điểm xếp hạng và siêu dữ liệu thuộc 33 ngành hàng. Bộ dữ liệu kinh điển cho bài báo Q1 về eWOM, Online Reviews, hành vi tiêu dùng & phân tích cảm xúc (NLP).",
    years: "1996-2023",
    access: "Public (Research use)",
    featured: true,
  },
  {
    name: "Yelp Open Dataset",
    url: "https://www.yelp.com/dataset",
    cat_key: "marketing_and_consumer",
    cat: "Marketing & Consumer Behavior",
    cat_vi: "Marketing & Hành vi tiêu dùng",
    desc: "Gần 7 triệu đánh giá khách hàng, 150.000+ cơ sở kinh doanh và dữ liệu check-in. Rất phổ biến trong nghiên cứu Marketing dịch vụ, Trải nghiệm khách hàng & Du lịch – Khách sạn.",
    years: "2005-present",
    access: "Free for academic use",
    featured: true,
  },
  {
    name: "Google Merchandise Store (GA4 BigQuery)",
    url: "https://developers.google.com/analytics/bigquery/web-ecommerce-demo-dataset",
    cat_key: "marketing_and_consumer",
    cat: "Marketing & Consumer Behavior",
    cat_vi: "Marketing & Hành vi tiêu dùng",
    desc: "Dữ liệu hành trình người dùng thực tế (clickstream, nguồn lưu lượng, phễu chuyển đổi, giao dịch) từ cửa hàng trực tuyến Google trên BigQuery. Chuẩn cho Digital Marketing Analytics.",
    years: "2020-2021",
    access: "Public (Google Cloud)",
    featured: true,
  },
  {
    name: "UCI Online Retail II Dataset",
    url: "https://archive.ics.uci.edu/dataset/502/online+retail+ii",
    cat_key: "marketing_and_consumer",
    cat: "Marketing & Consumer Behavior",
    cat_vi: "Marketing & Hành vi tiêu dùng",
    desc: "Hơn 1 triệu giao dịch bán lẻ trực tuyến thực tế tại Anh (2009–2011). Bộ chuẩn quốc tế để tính chỉ số RFM, giá trị vòng đời khách hàng (CLV), phân khúc và dự báo rời bỏ (Churn).",
    years: "2009-2011",
    access: "Public (CC BY 4.0)",
    featured: true,
  },
  {
    name: "Olist Brazilian E-Commerce Dataset",
    url: "https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce",
    cat_key: "marketing_and_consumer",
    cat: "Marketing & Consumer Behavior",
    cat_vi: "Marketing & Hành vi tiêu dùng",
    desc: "100.000 đơn hàng thương mại điện tử thực tế kèm dữ liệu thanh toán, thời gian giao hàng, vị trí địa lý và đánh giá hài lòng khách hàng. Rất tốt cho nghiên cứu E-commerce & Logistics.",
    years: "2016-2018",
    access: "Public (CC BY-NC-SA 4.0)",
    featured: true,
  },
  {
    name: "Instacart Market Basket Analysis",
    url: "https://www.kaggle.com/c/instacart-market-basket-analysis/data",
    cat_key: "marketing_and_consumer",
    cat: "Marketing & Consumer Behavior",
    cat_vi: "Marketing & Hành vi tiêu dùng",
    desc: "Hơn 3 triệu đơn hàng tạp hóa trực tuyến từ 200.000+ người dùng. Chuẩn cho nghiên cứu hành vi mua lặp lại, phân tích giỏ hàng (Market Basket) và hệ thống gợi ý sản phẩm.",
    years: "2017",
    access: "Free for non-commercial research",
  },

  // === 3. KINH TẾ VĨ MÔ, TÀI CHÍNH & THƯƠNG MẠI TOÀN CẦU ===
  {
    name: "Kenneth French Data Library (Fama-French)",
    url: "https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html",
    cat_key: "finance",
    cat: "Finance",
    cat_vi: "Tài chính",
    desc: "Bộ dữ liệu chuẩn vàng của ngành Tài chính định lượng: các nhân tố Fama-French (3-factor, 5-factor), Momentum, danh mục ngành và thị trường quốc tế cập nhật liên tục.",
    years: "1926-present",
    access: "Public",
    featured: true,
  },
  {
    name: "World Bank Global Findex Database",
    url: "https://www.worldbank.org/en/publication/globalfindex",
    cat_key: "finance",
    cat: "Finance",
    cat_vi: "Tài chính",
    desc: "Dữ liệu khảo sát toàn cầu toàn diện nhất về Tài chính toàn diện (Financial Inclusion), thanh toán số, tiết kiệm, tín dụng và sức chống chịu tài chính tại 140+ nước (có Việt Nam).",
    years: "2011-2025",
    access: "Public",
    featured: true,
    has_vietnam: true,
  },
  {
    name: "FRED (Federal Reserve Economic Data)",
    url: "https://fred.stlouisfed.org/",
    cat_key: "macroeconomics",
    cat: "Macroeconomics",
    cat_vi: "Kinh tế vĩ mô",
    desc: "Hơn 800.000 chuỗi thời gian kinh tế, lãi suất, lạm phát, tỷ giá, việc làm và chỉ số tài chính Mỹ & quốc tế do Cục Dự trữ Liên bang St. Louis cung cấp (hỗ trợ API Python/R).",
    years: "1919-present",
    access: "Public (Open API)",
    featured: true,
    has_vietnam: true,
  },
  {
    name: "World Bank Open Data (WDI & WGI)",
    url: "https://databank.worldbank.org/",
    cat_key: "trade_and_development",
    cat: "Global Trade & Development",
    cat_vi: "Thương mại & Phát triển toàn cầu",
    desc: "Hệ thống chỉ số Phát triển Thế giới (WDI) và Chỉ số Quản trị Toàn cầu (WGI — tham nhũng, pháp quyền, ổn định chính trị) cho 217 nền kinh tế, bao gồm chuỗi dài của Việt Nam.",
    years: "1960-present",
    access: "Public (CC BY 4.0 / API)",
    featured: true,
    has_vietnam: true,
  },
  {
    name: "UN Comtrade Database",
    url: "https://comtradeplus.un.org/",
    cat_key: "trade_and_development",
    cat: "Global Trade & Development",
    cat_vi: "Thương mại & Phát triển toàn cầu",
    desc: "Cơ sở dữ liệu thương mại quốc tế chi tiết nhất của Liên Hợp Quốc về xuất nhập khẩu song phương theo mã hàng hóa HS của hầu hết các quốc gia (có dữ liệu Việt Nam).",
    years: "1962-present",
    access: "Public (Free API tier)",
    featured: true,
    has_vietnam: true,
  },
  {
    name: "Penn World Table (PWT)",
    url: "https://www.rug.nl/ggdc/productivity/pwt/",
    cat_key: "macroeconomics",
    cat: "Macroeconomics",
    cat_vi: "Kinh tế vĩ mô",
    desc: "Bộ dữ liệu kinh điển so sánh GDP thực theo sức mua tương đương (PPP), năng suất nhân tố tổng hợp (TFP), tích lũy vốn và vốn nhân lực của 183 quốc gia (có Việt Nam).",
    years: "1950-present",
    access: "Public (CC BY 4.0)",
    featured: true,
    has_vietnam: true,
  },
  {
    name: "World Inequality Database (WID.world)",
    url: "https://wid.world/",
    cat_key: "trade_and_development",
    cat: "Global Trade & Development",
    cat_vi: "Thương mại & Phát triển toàn cầu",
    desc: "Cơ sở dữ liệu toàn cầu về bất bình đẳng thu nhập, phân phối tài sản và bất bình đẳng phát thải carbon (do nhóm Thomas Piketty & cộng sự xây dựng).",
    years: "1800-present",
    access: "Public",
    featured: true,
    has_vietnam: true,
  },
  {
    name: "IMF Data Portal (WEO & IFS)",
    url: "https://data.imf.org/",
    cat_key: "macroeconomics",
    cat: "Macroeconomics",
    cat_vi: "Kinh tế vĩ mô",
    desc: "Thống kê Tài chính Quốc tế (IFS), Triển vọng Kinh tế Thế giới (WEO), cán cân thanh toán (BOP), nợ công và dự báo kinh tế vĩ mô toàn cầu của Quỹ Tiền tệ Quốc tế.",
    years: "1948-present",
    access: "Public",
    has_vietnam: true,
  },
  {
    name: "OECD Data Explorer",
    url: "https://data-explorer.oecd.org/",
    cat_key: "trade_and_development",
    cat: "Global Trade & Development",
    cat_vi: "Thương mại & Phát triển toàn cầu",
    desc: "Kho dữ liệu chuẩn hóa của OECD về kinh tế số, thuế, đổi mới sáng tạo, thương mại giá trị gia tăng (TiVA), giáo dục và chính sách công (có dữ liệu đối chiếu với Việt Nam).",
    years: "1960-present",
    access: "Public (Open API)",
    has_vietnam: true,
  },

  // === 4. DỮ LIỆU ĐẶC THÙ VIỆT NAM & ASEAN ===
  {
    name: "UNU-WIDER Viet Nam SME Database",
    url: "https://www.wider.unu.edu/database/viet-nam-sme-database",
    cat_key: "vietnam_and_asean",
    cat: "Vietnam & ASEAN Data",
    cat_vi: "Việt Nam & ASEAN",
    desc: "Bộ dữ liệu bảng (panel data) khảo sát hơn 2.500 doanh nghiệp nhỏ và vừa (SME) chế biến chế tạo tại 10 tỉnh/thành Việt Nam. Nguồn dữ liệu của hàng trăm bài báo Q1 về doanh nghiệp VN.",
    years: "2005-2015",
    access: "Free for academic research",
    featured: true,
    has_vietnam: true,
  },
  {
    name: "PCI Vietnam (Chỉ số Năng lực Cạnh tranh Cấp tỉnh)",
    url: "https://pcivietnam.vn/",
    cat_key: "vietnam_and_asean",
    cat: "Vietnam & ASEAN Data",
    cat_vi: "Việt Nam & ASEAN",
    desc: "Dữ liệu thường niên của VCCI & USAID đánh giá chất lượng điều hành kinh tế, môi trường kinh doanh, chi phí không chính thức và cải cách thủ tục tại 63 tỉnh/thành Việt Nam.",
    years: "2006-present",
    access: "Public",
    featured: true,
    has_vietnam: true,
  },
  {
    name: "PAPI Vietnam (Hiệu quả Quản trị & Hành chính công)",
    url: "https://papi.org.vn/",
    cat_key: "vietnam_and_asean",
    cat: "Vietnam & ASEAN Data",
    cat_vi: "Việt Nam & ASEAN",
    desc: "Khảo sát trải nghiệm người dân quy mô lớn nhất Việt Nam (UNDP) về tham gia ở cấp cơ sở, công khai minh bạch, kiểm soát tham nhũng và cung ứng dịch vụ công cấp tỉnh.",
    years: "2011-present",
    access: "Public",
    featured: true,
    has_vietnam: true,
  },
  {
    name: "Tổng cục Thống kê Việt Nam (GSO Open Data)",
    url: "https://www.gso.gov.vn/",
    cat_key: "vietnam_and_asean",
    cat: "Vietnam & ASEAN Data",
    cat_vi: "Việt Nam & ASEAN",
    desc: "Cổng dữ liệu chính thức của Tổng cục Thống kê Việt Nam: Niên giám thống kê, GRDP cấp tỉnh, dân số – lao động, chỉ số giá tiêu dùng (CPI), thương mại, đầu tư và bảng tổng hợp VHLSS.",
    years: "1995-present",
    access: "Public",
    featured: true,
    has_vietnam: true,
  },
  {
    name: "ASEANstats Data Portal",
    url: "https://data.aseanstats.org/",
    cat_key: "vietnam_and_asean",
    cat: "Vietnam & ASEAN Data",
    cat_vi: "Việt Nam & ASEAN",
    desc: "Cổng thống kê chính thức của khối ASEAN với dữ liệu chuẩn hóa về thương mại nội khối, dòng vốn FDI, tăng trưởng kinh tế, du lịch và mục tiêu phát triển bền vững (SDGs).",
    years: "2000-present",
    access: "Public",
    featured: true,
    has_vietnam: true,
  },

  // === 5. KHO LƯU TRỮ DỮ LIỆU HỌC THUẬT & KHẢO SÁT (REPLICATION / SEM / LIKERT) ===
  {
    name: "Harvard Dataverse",
    url: "https://dataverse.harvard.edu/",
    cat_key: "academic_repositories",
    cat: "Academic & Survey Repositories",
    cat_vi: "Kho dữ liệu Bài báo & Khảo sát",
    desc: "Kho lưu trữ dữ liệu mở lớn nhất của Đại học Harvard với hàng trăm nghìn bộ dữ liệu sao chép (replication datasets) từ các bài báo khoa học xã hội, kinh tế, quản trị và chính sách.",
    years: "Ongoing",
    access: "Public",
    featured: true,
  },
  {
    name: "Mendeley Data (Elsevier)",
    url: "https://data.mendeley.com/",
    cat_key: "academic_repositories",
    cat: "Academic & Survey Repositories",
    cat_vi: "Kho dữ liệu Bài báo & Khảo sát",
    desc: "Kho dữ liệu mở của Elsevier chứa rất nhiều bộ dữ liệu khảo sát thang đo Likert (CSV/SPSS) đi kèm bài báo Data in Brief về Marketing, Hành vi người tiêu dùng, Quản trị & Kinh doanh.",
    years: "Ongoing",
    access: "Public (CC BY 4.0)",
    featured: true,
    has_vietnam: true,
  },
  {
    name: "openICPSR (University of Michigan)",
    url: "https://www.openicpsr.org/",
    cat_key: "academic_repositories",
    cat: "Academic & Survey Repositories",
    cat_vi: "Kho dữ liệu Bài báo & Khảo sát",
    desc: "Kho lưu trữ dữ liệu mở chính thức của Hiệp hội Kinh tế Hoa Kỳ (AEA — tạp chí AER, AEJ) và hàng nghìn nghiên cứu định lượng Khoa học Xã hội & Hành vi.",
    years: "Ongoing",
    access: "Public (Free registration)",
    featured: true,
  },
  {
    name: "Google Dataset Search",
    url: "https://datasetsearch.research.google.com/",
    cat_key: "academic_repositories",
    cat: "Academic & Survey Repositories",
    cat_vi: "Kho dữ liệu Bài báo & Khảo sát",
    desc: "Công cụ tìm kiếm chuyên biệt tương tự Google Scholar nhưng dành riêng cho bộ dữ liệu, lập chỉ mục hàng chục triệu dataset từ các trường đại học, chính phủ và kho lưu trữ mở toàn cầu.",
    years: "Ongoing",
    access: "Public",
    featured: true,
  },
];

export const CAT_ALIASES: Record<string, string[]> = {
  // Aliases mới cho Business, Management, Marketing, VN/ASEAN
  marketing: ["marketing_and_consumer", "shopping"],
  "hanh vi tieu dung": ["marketing_and_consumer", "shopping"],
  "nguoi tieu dung": ["marketing_and_consumer", "shopping"],
  "thuong mai dien tu": ["marketing_and_consumer", "shopping"],
  ecommerce: ["marketing_and_consumer", "shopping"],
  "e commerce": ["marketing_and_consumer", "shopping"],
  "quan tri": ["management_and_esg", "businesses"],
  management: ["management_and_esg"],
  "khoi nghiep": ["management_and_esg"],
  entrepreneurship: ["management_and_esg"],
  esg: ["management_and_esg"],
  csr: ["management_and_esg"],
  "viet nam": ["vietnam_and_asean"],
  vietnam: ["vietnam_and_asean"],
  asean: ["vietnam_and_asean"],
  "thuong mai": ["trade_and_development"],
  "xuat nhap khau": ["trade_and_development"],
  "phat trien": ["trade_and_development"],
  "kho du lieu": ["academic_repositories"],
  replication: ["academic_repositories"],
  likert: ["academic_repositories", "marketing_and_consumer"],
  sem: ["academic_repositories", "marketing_and_consumer"],

  // Aliases gốc
  "tai chinh": ["finance", "personal_finance"],
  "tai chinh ca nhan": ["personal_finance"],
  "kinh te": ["macroeconomics", "businesses", "inflation_and_cost_of_living", "finance", "trade_and_development"],
  "kinh te vi mo": ["macroeconomics"],
  "vi mo": ["macroeconomics"],
  "doanh nghiep": ["businesses", "management_and_esg"],
  "cong ty": ["businesses", "management_and_esg"],
  "kinh doanh": ["businesses", "management_and_esg", "marketing_and_consumer"],
  "lao dong": ["working"],
  "viec lam": ["working"],
  "nhan luc": ["working"],
  "giao duc": ["education", "academia"],
  "hoc thuat": ["academia", "academic_repositories"],
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
  "tieu dung": ["shopping", "marketing_and_consumer"],
  "mua sam": ["shopping", "marketing_and_consumer"],
  "ban le": ["shopping", "marketing_and_consumer"],
  "ho gia dinh": ["household_surveys"],
  "khao sat": ["household_surveys", "academic_repositories"],
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
  business: ["businesses", "management_and_esg"],
  businesses: ["businesses", "management_and_esg"],
  macro: ["macroeconomics"],
  macroeconomics: ["macroeconomics"],
  working: ["working"],
  work: ["working"],
  labor: ["working"],
  labour: ["working"],
  education: ["education"],
  academia: ["academia"],
  academic: ["academia", "academic_repositories"],
  health: ["health_public_health_and_epidemiology"],
  epidemiology: ["health_public_health_and_epidemiology"],
  environment: ["environment_and_energy"],
  energy: ["environment_and_energy"],
  weather: ["weather"],
  climate: ["weather", "environment_and_energy"],
  "real estate": ["real_estate"],
  housing: ["real_estate"],
  shopping: ["shopping", "marketing_and_consumer"],
  household: ["household_surveys"],
  surveys: ["household_surveys", "academic_repositories"],
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
  // Token mới cho Business, Management, Marketing, VN
  "hanh vi": ["consumer", "behavior", "shopping", "review", "marketing"],
  "khach hang": ["customer", "consumer", "retail", "review", "rfm", "clv"],
  "danh gia": ["review", "reviews", "ewom", "yelp", "amazon"],
  "ban le": ["retail", "ecommerce", "shopping", "amazon", "olist"],
  "quan tri": ["management", "governance", "corporate", "wms", "pci", "papi"],
  "khoi nghiep": ["entrepreneurship", "gem", "startup"],
  "ben vung": ["esg", "sustainability", "csr", "sdg", "wikirate"],
  "bat binh dang": ["inequality", "wid", "income"],
  "xuat nhap khau": ["trade", "comtrade", "export", "import"],
  "tai chinh toan dien": ["findex", "inclusion", "banking", "payment"],
  "doanh nghiep nho": ["sme", "enterprise", "wbes"],
  "nang luc canh tranh": ["pci", "competitiveness", "governance"],
  "hanh chinh cong": ["papi", "governance", "public"],

  // Token gốc
  "bien doi khi hau": ["weather", "temperature", "environmental", "precipitation"],
  "khi hau": ["weather", "temperature", "environmental"],
  "tien luong": ["wage", "salary", "earnings", "income", "pay"],
  luong: ["wage", "salary", "earnings", "income", "pay"],
  "thu nhap": ["income", "earnings"],
  thue: ["tax"],
  "ngan hang": ["bank", "central bank", "monetary", "credit"],
  "chinh sach tien te": ["monetary policy", "central bank"],
  "tien te": ["monetary", "bank"],
  "chung khoan": ["equity", "stock", "ownership", "corporate", "fama", "french"],
  "so huu": ["ownership", "voteholders"],
  "sinh vien": ["student", "college", "university"],
  "hoc sinh": ["student", "school", "k 12"],
  "dai hoc": ["college", "university", "phd", "faculty"],
  "giao vien": ["teacher", "faculty", "school"],
  "benh vien": ["hospital", "healthcare", "medical"],
  "y te": ["health", "medical", "mortality"],
  "o nhiem": ["pollution", "air", "environment", "environmental", "hazards"],
  "phat thai": ["emission", "pollution", "energy", "carbon"],
  dien: ["electricity", "energy", "power"],
  "gia nha": ["home price", "housing", "zillow", "property"],
  "bat dong san": ["housing", "home", "property", "zillow"],
  "hon nhan": ["marriage", "divorce", "family"],
  "ly hon": ["divorce", "marriage"],
  "sinh san": ["fertility", "birth"],
  "tu vong": ["mortality", "death"],
  "canh sat": ["police", "crime"],
  "toa an": ["court", "judge", "law"],
  "thuong mai": ["trade", "amazon", "e commerce", "comtrade"],
  "mua sam": ["purchase", "amazon", "e commerce", "retail"],
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

// Đánh dấu thêm các bộ toàn cầu trong nguồn gốc cũng có dữ liệu Việt Nam mạnh
const KNOWN_VIETNAM_GLOBAL_NAMES = new Set([
  "world values survey",
  "our world in data",
  "gapminder",
  "un world population prospects",
  "v-dem",
  "ipums international",
  "pisa",
  "global flourishing study",
  "world risk poll & resilience index",
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
  return "gov_repo";
}

export type SortMode = "relevance" | "featured" | "az";

export function filterAndScoreDatasets(
  items: DatasetItem[],
  options: {
    domain?: DomainKey;
    cat?: string;
    query?: string;
    onlyPublic?: boolean;
    onlyFeatured?: boolean;
    onlyVietnam?: boolean;
    sortBy?: SortMode;
  }
): DatasetItem[] {
  const {
    domain = "all",
    cat = "all",
    query = "",
    onlyPublic = false,
    onlyFeatured = false,
    onlyVietnam = false,
    sortBy = "relevance",
  } = options;

  const domainConfig = DOMAIN_GROUPS.find((d) => d.key === domain);
  const domKeys = domain === "all" ? null : domainConfig?.categories || [];

  const baseFiltered = items.filter((it) => {
    if (domain === "vn_asean") {
      if (it.cat_key !== "vietnam_and_asean" && !it.has_vietnam) return false;
    } else if (domKeys && !domKeys.includes(it.cat_key)) {
      return false;
    }
    if (cat !== "all" && it.cat_key !== cat) return false;
    if (onlyFeatured && !it.featured) return false;
    if (onlyVietnam && !it.has_vietnam && it.cat_key !== "vietnam_and_asean") return false;
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

  if (!qNorm) {
    const result = [...baseFiltered];
    if (sortBy === "az") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Mặc định ưu tiên các bộ nổi bật Q1 lên đầu để người dùng dễ khám phá
      result.sort((a, b) => {
        const fa = a.featured ? 1 : 0;
        const fb = b.featured ? 1 : 0;
        if (fb !== fa) return fb - fa;
        return a.name.localeCompare(b.name);
      });
    }
    return result;
  }

  // Khớp trực tiếp theo alias chủ đề khi chưa chọn chủ đề cụ thể
  if (cat === "all" && CAT_ALIASES[qNorm]) {
    const aliasSet = CAT_ALIASES[qNorm];
    const aliasHits = baseFiltered.filter(
      (it) =>
        aliasSet.includes(it.cat_key) ||
        (aliasSet.includes("vietnam_and_asean") && it.has_vietnam)
    );
    if (aliasHits.length > 0) {
      return aliasHits.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
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
      if (it.featured) score += 8;
      scored.push({ item: it, score });
    }
  }

  if (sortBy === "az") {
    scored.sort((a, b) => a.item.name.localeCompare(b.item.name));
  } else {
    scored.sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name));
  }
  return scored.map((s) => s.item);
}

function mergeWithCuratedDatasets(baseItems: DatasetItem[]): {
  items: DatasetItem[];
  categories: DatasetCategory[];
} {
  const seenUrls = new Set<string>();
  const seenNames = new Set<string>();
  const merged: DatasetItem[] = [];

  // 1. Đưa các bộ tuyển chọn Q1 mới vào trước (ưu tiên mô tả song ngữ giàu thông tin)
  for (const extra of CURATED_EXTRA_DATASETS) {
    const normUrl = extra.url.replace(/\/+$/, "").toLowerCase();
    const normName = normVn(extra.name);
    seenUrls.add(normUrl);
    seenNames.add(normName);
    merged.push(extra);
  }

  // 2. Gộp 147 bộ từ Workers API / GitHub (bỏ qua nếu trùng URL/tên)
  for (const item of baseItems) {
    const normUrl = (item.url || "").replace(/\/+$/, "").toLowerCase();
    const normName = normVn(item.name);
    if (seenUrls.has(normUrl) || seenNames.has(normName)) continue;

    seenUrls.add(normUrl);
    seenNames.add(normName);
    const hasVn =
      item.has_vietnam || KNOWN_VIETNAM_GLOBAL_NAMES.has(item.name.trim().toLowerCase());
    merged.push({
      ...item,
      has_vietnam: hasVn,
    });
  }

  // 3. Tính lại đầy đủ danh sách categories kèm số lượng
  const catMap = new Map<string, DatasetCategory>();
  for (const it of merged) {
    const existing = catMap.get(it.cat_key);
    if (existing) {
      existing.count += 1;
    } else {
      catMap.set(it.cat_key, {
        key: it.cat_key,
        name: it.cat,
        name_vi: it.cat_vi || CAT_VI[it.cat_key] || it.cat,
        count: 1,
      });
    }
  }

  const categories = Array.from(catMap.values()).sort((a, b) => b.count - a.count);
  return { items: merged, categories };
}

function normalizePayload(
  raw: Partial<DatasetsPayload> & {
    items?: Partial<DatasetItem>[];
    categories?: Partial<DatasetCategory>[];
  },
  origin: "worker_api" | "github_raw"
): DatasetsPayload {
  const rawItems: DatasetItem[] = (raw.items || []).map((it) => {
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

  const { items, categories } = mergeWithCuratedDatasets(rawItems);

  return {
    ok: true,
    source_name:
      "Todd Jones Open Datasets + VNResearch Q1 Curated (Business, Marketing & Vietnam/ASEAN)",
    source_url: raw.source_url || "https://github.com/toddrjones/datasets",
    updated_at: raw.updated_at || new Date().toISOString(),
    total: items.length,
    filtered_total: items.length,
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

  // 3. Nếu cả 2 nguồn ngoài tạm thời gián đoạn, vẫn phục vụ bộ 28+ nguồn tuyển chọn Q1
  const { items, categories } = mergeWithCuratedDatasets([]);
  return {
    ok: true,
    source_name: "VNResearch Q1 Curated Datasets",
    source_url: "https://github.com/toddrjones/datasets",
    updated_at: new Date().toISOString(),
    total: items.length,
    filtered_total: items.length,
    categories,
    items,
    data_origin: "fallback",
  };
}
