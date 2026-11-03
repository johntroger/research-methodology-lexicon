"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Search,
  ShieldCheck,
  GraduationCap,
  Layers,
  AlertTriangle,
  Quote,
  Globe,
  Sun,
  Moon,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Compass,
  Trophy,
  FileText,
  Scale,
  Database,
  GitBranch,
  Award,
  Terminal,
  BookMarked
} from "lucide-react";

interface SpecimenTerm {
  id: string;
  term: string;
  vietnamese: string;
  categoryVi: string;
  categoryEn: string;
  formula: string;
  definitionVi: string;
  definitionEn: string;
  benchmarkVi: string;
  benchmarkEn: string;
  pitfallVi: string;
  pitfallEn: string;
  debateVi: string;
  debateEn: string;
  seminalCitation: string;
  apaReference: string;
  bibtex: string;
}

const SPECIMEN_TERMS: SpecimenTerm[] = [
  {
    id: "endogeneity",
    term: "Endogeneity",
    vietnamese: "Tính nội sinh (Biến giải thích nội sinh)",
    categoryVi: "Kinh tế lượng & Suy luận Nhân quả",
    categoryEn: "Econometrics & Causal Inference",
    formula: "Cov(X, u) ≠ 0  ⇒  E(β̂_OLS) ≠ β",
    definitionVi:
      "Vi phạm nghiêm trọng giả định Gauss–Markov xảy ra khi biến giải thích X có tương quan với sai số ngẫu nhiên u trong mô hình hồi quy (do bỏ sót biến quan trọng, đồng thời nhân quả hai chiều, hoặc sai số đo lường), làm ước lượng OLS bị chệch và không nhất quán.",
    definitionEn:
      "A foundational econometric violation occurring when an explanatory variable X is correlated with the structural error term u (due to omitted variables, simultaneity, or measurement error), rendering OLS estimates biased and inconsistent.",
    benchmarkVi:
      "Kiểm định Durbin–Wu–Hausman (p < 0.05 khẳng định có nội sinh). Biến công cụ (IV / 2SLS) phải thỏa mãn đồng thời điều kiện Độ mạnh công cụ (First-stage F > 10 theo Stock & Yogo, 2005 hoặc kiểm định tF F ≥ 104.7 theo Lee et al., 2022) và Ràng buộc loại trừ (Hansen J p > 0.05).",
    benchmarkEn:
      "Diagnosed via Durbin–Wu–Hausman test (p < 0.05). Instrumental variables (2SLS) must satisfy Relevance (first-stage F > 10 per Stock & Yogo, 2005, or tF critical value F ≥ 104.7 per Lee et al., 2022) and the Exclusion Restriction (Hansen J test p > 0.05).",
    pitfallVi:
      "Sử dụng biến công cụ yếu (Weak instruments) làm sai số chuẩn bị thổi phồng và độ chệch hữu hạn mẫu còn tệ hơn OLS; hoặc ngộ nhận mô hình Fixed Effects khử được cả nội sinh biến thiên theo thời gian.",
    pitfallEn:
      "Employing weak instruments that bias finite-sample estimates toward OLS and distort inference, or assuming panel fixed effects eliminate time-varying omitted variable bias and simultaneity.",
    debateVi:
      "Cuộc cách mạng độ tin cậy (Credibility Revolution - Angrist & Pischke, 2010) yêu cầu mọi nghiên cứu dữ liệu quan sát phải chỉ rõ chiến lược định danh nhân quả (IV, DID, RDD, SCM) thay vì chỉ chạy hồi quy điều chỉnh biến kiểm soát.",
    debateEn:
      "The Credibility Revolution (Angrist & Pischke, 2010) mandates explicit causal identification strategies (IV, DID, RDD, SCM) over naive covariate-adjusted regressions in observational research.",
    seminalCitation: "Theil (1953); Angrist, Imbens, & Rubin (1996); Wooldridge (2010); Lee et al. (2022)",
    apaReference:
      "Angrist, J. D., Imbens, G. W., & Rubin, D. B. (1996). Identification of causal effects using instrumental variables. Journal of the American Statistical Association, 91(434), 444–455. https://doi.org/10.1080/01621459.1996.10476902",
    bibtex: `@article{angrist1996identification,
  title={Identification of causal effects using instrumental variables},
  author={Angrist, Joshua D and Imbens, Guido W and Rubin, Donald B},
  journal={Journal of the American Statistical Association},
  volume={91},
  number={434},
  pages={444--455},
  year={1996},
  doi={10.1080/01621459.1996.10476902}
}`
  },
  {
    id: "discriminant-validity-htmt",
    term: "Discriminant Validity (HTMT Ratio)",
    vietnamese: "Độ giá trị phân biệt (Chỉ số tỷ số tương quan HTMT)",
    categoryVi: "Mô hình SEM & Đo lường Tâm lý học",
    categoryEn: "SEM & Psychometrics",
    formula: "HTMT_ij < 0.85 (khắt khe)  |  95% CI_upper < 0.85 / 0.90",
    definitionVi:
      "Mức độ một khái niệm tiềm ẩn thực sự tách biệt về mặt thực nghiệm so với các khái niệm khác trong mô hình cấu trúc, được đo lường qua tỷ số giữa trung bình các tương quan dị biệt (heterotrait-heteromethod) và trung bình nhân của các tương quan đồng nhất (monotrait-heteromethod).",
    definitionEn:
      "The degree to which a latent construct is empirically distinct from other constructs in a structural model, evaluated via the ratio of between-trait indicator correlations to within-trait indicator correlations (Henseler, Ringle, & Sarstedt, 2015).",
    benchmarkVi:
      "HTMT < 0.85 đối với các khái niệm khác biệt rõ về lý thuyết; HTMT < 0.90 đối với các khái niệm gần nhau. Kiểm định suy diễn Bootstrap một phía (95% one-sided percentile CI) yêu cầu cận trên nằm dưới ngưỡng 0.85 hoặc 0.90 (Franke & Sarstedt, 2019; Hair et al., 2022).",
    benchmarkEn:
      "HTMT < 0.85 for conceptually distinct constructs; HTMT < 0.90 for closely related constructs. In inferential testing, the upper bound of the one-sided 95% percentile bootstrap CI must fall below 0.85 or 0.90 (Franke & Sarstedt, 2019; Hair et al., 2022).",
    pitfallVi:
      "Chỉ báo cáo tiêu chuẩn Fornell–Larcker (1981) hoặc Cross-loadings mà bỏ qua HTMT — mô phỏng Monte Carlo của Henseler et al. (2015) chỉ ra Fornell–Larcker có độ nhạy rất thấp khi các hệ số tải nhân tố đồng đều.",
    pitfallEn:
      "Relying solely on the traditional Fornell–Larcker criterion or cross-loadings, which exhibit low sensitivity in detecting discriminant validity violations when indicator loadings are homogeneous.",
    debateVi:
      "Sự phát triển của chỉ số HTMT2 (Roemer, Schuberth, & Henseler, 2021) sử dụng trung bình nhân thay cho trung bình cộng để nới lỏng giả định tương đương tau đối với các thang đo congeneric.",
    debateEn:
      "Recent methodological advances introduced HTMT2 (Roemer, Schuberth, & Henseler, 2021) using geometric means to relax the tau-equivalence assumption across congeneric measurement scales.",
    seminalCitation: "Henseler, Ringle, & Sarstedt (2015); Franke & Sarstedt (2019); Hair et al. (2022)",
    apaReference:
      "Henseler, J., Ringle, C. M., & Sarstedt, M. (2015). A new criterion for assessing discriminant validity in variance-based structural equation modeling. Journal of the Academy of Marketing Science, 43(1), 115–135. https://doi.org/10.1007/s11747-014-0403-8",
    bibtex: `@article{henseler2015new,
  title={A new criterion for assessing discriminant validity in variance-based structural equation modeling},
  author={Henseler, J{\\"o}rg and Ringle, Christian M and Sarstedt, Marko},
  journal={Journal of the Academy of Marketing Science},
  volume={43},
  number={1},
  pages={115--135},
  year={2015},
  doi={10.1007/s11747-014-0403-8}
}`
  },
  {
    id: "difference-in-differences",
    term: "Difference-in-Differences (DID)",
    vietnamese: "Phương pháp Sai phân kép (Hiệu số trong hiệu số)",
    categoryVi: "Thiết kế Bán thực nghiệm & Đánh giá Chính sách",
    categoryEn: "Quasi-Experimental Design & Policy Evaluation",
    formula: "τ̂_DID = (Ȳ_T,post − Ȳ_T,pre) − (Ȳ_C,post − Ȳ_C,pre)",
    definitionVi:
      "Phương pháp bán thực nghiệm ước lượng tác động nhân quả của một can thiệp hoặc chính sách bằng cách so sánh sự thay đổi theo thời gian của biến kết quả ở nhóm chịu tác động (Treatment group) với sự thay đổi tương ứng ở nhóm đối chứng (Control group).",
    definitionEn:
      "A quasi-experimental identification strategy that estimates the average treatment effect on the treated (ATT) by comparing pre-to-post outcome changes in an exposed treatment group against contemporaneous changes in an unexposed comparison group.",
    benchmarkVi:
      "Giả định cốt lõi: Xu hướng song song (Parallel Trends) kèm điều kiện không có tác động đón đầu (No anticipation). Kiểm tra tính hợp lý qua mô hình Event-study, kiểm định độ nhạy Rambachan & Roth (2023), và dùng ước lượng Callaway & Sant'Anna (2021) hoặc Sun & Abraham (2021) khi can thiệp lệch pha (Staggered DID).",
    benchmarkEn:
      "Relies on Parallel Trends and No Anticipation assumptions. Evaluated via dynamic event-study specifications, HonestDiD sensitivity bounds (Rambachan & Roth, 2023), and heterogeneity-robust estimators (Callaway & Sant'Anna, 2021; Sun & Abraham, 2021) under staggered adoption.",
    pitfallVi:
      "Ước lượng hồi quy Two-Way Fixed Effects (TWFE) truyền thống khi thời điểm nhận can thiệp khác nhau giữa các đơn vị và hiệu ứng biến thiên theo thời gian — dẫn đến trọng số âm làm đảo dấu ước lượng (Goodman-Bacon, 2021).",
    pitfallEn:
      "Applying conventional Two-Way Fixed Effects (TWFE) under staggered treatment timing with heterogeneous dynamic effects, which introduces forbidden comparisons and negative weights (Goodman-Bacon, 2021).",
    debateVi:
      "Tranh luận hiện đại trong kinh tế lượng về lực thống kê thấp của kiểm định tiền xu hướng (Pre-trends test - Roth, 2022) và sự chuyển dịch sang phân tích độ nhạy định lượng.",
    debateEn:
      "Modern econometric critiques highlight the low power and conditioning distortions of pre-trend tests (Roth, 2022), advocating formal sensitivity analysis over binary pre-trend pass/fail rules.",
    seminalCitation: "Ashenfelter & Card (1985); Card & Krueger (1994); Callaway & Sant'Anna (2021); Goodman-Bacon (2021)",
    apaReference:
      "Callaway, B., & Sant'Anna, P. H. (2021). Difference-in-differences with multiple time periods. Journal of Econometrics, 225(2), 200–230. https://doi.org/10.1016/j.jeconom.2020.12.001",
    bibtex: `@article{callaway2021difference,
  title={Difference-in-differences with multiple time periods},
  author={Callaway, Brantly and Sant'Anna, Pedro HC},
  journal={Journal of Econometrics},
  volume={225},
  number={2},
  pages={200--230},
  year={2021},
  doi={10.1016/j.jeconom.2020.12.001}
}`
  },
  {
    id: "gioia-methodology",
    term: "Gioia Methodology",
    vietnamese: "Phương pháp cấu trúc hóa dữ liệu định tính Gioia",
    categoryVi: "Nghiên cứu Định tính & Xây dựng Lý thuyết",
    categoryEn: "Qualitative Inquiry & Theory Building",
    formula: "1st-Order Concepts (Informant) → 2nd-Order Themes (Theory) → Aggregate Dimensions",
    definitionVi:
      "Hệ phương pháp luận nghiên cứu định tính quy nạp nghiêm cẩn do Dennis Gioia, Kevin Corley và Aimee Hamilton (2013) hệ thống hóa nhằm xây dựng lý thuyết mới từ dữ liệu thực địa, kết hợp tiếng nói nguyên bản của người trong cuộc với sự trừu tượng hóa lý thuyết của nhà nghiên cứu.",
    definitionEn:
      "A systematic inductive approach to qualitative theory building developed by Gioia, Corley, and Hamilton (2013) that balances informant-centric lived meanings with researcher-centric theoretical abstraction through a three-tier data structure.",
    benchmarkVi:
      "Bắt buộc trình bày Sơ đồ Cấu trúc Dữ liệu 3 tầng (Data Structure): (1) Khái niệm bậc 1 (1st-order concepts) giữ sát ngôn ngữ người trả lời; (2) Chủ đề bậc 2 (2nd-order themes) ở tầm khái niệm lý thuyết; (3) Chiều kích tổng hợp (Aggregate dimensions), sau đó chuyển hóa thành Mô hình Lý thuyết Động (Dynamic Grounded Theory Model).",
    benchmarkEn:
      "Requires explicit presentation of a three-tier Data Structure (1st-order informant-centric concepts → 2nd-order researcher-centric themes → aggregate dimensions) paired with a dynamic process model showing relational arrows among constructs.",
    pitfallVi:
      "Dừng lại ở một sơ đồ Data Structure tĩnh dạng hộp phân loại mà không giải thích các mũi tên cơ chế chuyển động giữa các khái niệm (biến cấu trúc dữ liệu thành mô hình lý thuyết theo phê phán của chính Gioia et al., 2013).",
    pitfallEn:
      "Treating the static three-column Data Structure diagram as the final theory itself, omitting the dynamic relational arrows and process mechanisms that explain how constructs interact over time.",
    debateVi:
      "Cuộc đối thoại giữa chuẩn mực minh bạch hóa quy nạp của trường phái Gioia/Eisenhardt với trường phái định tính giải thích tự do cảnh báo nguy cơ công thức hóa (boilerplate qualitative research - Pratt, Kaplan, & Whittington, 2020).",
    debateEn:
      "Debate between structured transparency in inductive theory building (Gioia, Eisenhardt) and critiques of mechanistic 'template' qualitative research in management studies (Pratt, Kaplan, & Whittington, 2020).",
    seminalCitation: "Gioia, Corley, & Hamilton (2013, Organizational Research Methods)",
    apaReference:
      "Gioia, D. A., Corley, K. G., & Hamilton, A. L. (2013). Seeking qualitative rigor in inductive research: Notes on the Gioia methodology. Organizational Research Methods, 16(1), 15–31. https://doi.org/10.1177/1094428112452151",
    bibtex: `@article{gioia2013seeking,
  title={Seeking qualitative rigor in inductive research: Notes on the Gioia methodology},
  author={Gioia, Dennis A and Corley, Kevin G and Hamilton, Aimee L},
  journal={Organizational Research Methods},
  volume={16},
  number={1},
  pages={15--31},
  year={2013},
  doi={10.1177/1094428112452151}
}`
  }
];

interface DomainAtlasItem {
  code: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  terms: { id: string; label: string }[];
}

const DOMAIN_ATLAS: DomainAtlasItem[] = [
  {
    code: "01",
    titleVi: "Mô hình SEM & Trắc lượng Tâm lý",
    titleEn: "SEM & Psychometrics",
    descVi: "CB-SEM, PLS-SEM, CFA, IRT, bất biến đo lường MICOM/MGCFA, độ tin cậy ω và giá trị khái niệm.",
    descEn: "CB-SEM, PLS-SEM, CFA, IRT, measurement invariance (MICOM/MGCFA), McDonald's omega, and construct validity.",
    terms: [
      { id: "construct-validity", label: "Construct Validity" },
      { id: "discriminant-validity-htmt", label: "HTMT Ratio" },
      { id: "reflective-vs-formative", label: "Reflective vs. Formative" },
      { id: "mcdonalds-omega-vs-alpha", label: "McDonald's ω vs. α" }
    ]
  },
  {
    code: "02",
    titleVi: "Kinh tế lượng & Suy luận Nhân quả",
    titleEn: "Econometrics & Causal Inference",
    descVi: "Nội sinh, biến công cụ 2SLS, System GMM, DID lệch pha, RDD, đối chứng tổng hợp (SCM) và đồ thị DAGs.",
    descEn: "Endogeneity, 2SLS instrumental variables, System GMM, staggered DID, RDD, Synthetic Control, and Pearl's DAGs.",
    terms: [
      { id: "endogeneity", label: "Endogeneity" },
      { id: "difference-in-differences", label: "Difference-in-Differences" },
      { id: "regression-discontinuity-design-rdd", label: "Regression Discontinuity" },
      { id: "directed-acyclic-graphs-dags", label: "Causal DAGs" }
    ]
  },
  {
    code: "03",
    titleVi: "Phân tích Trung gian, Điều tiết & Đa cấp",
    titleEn: "Mediation, Moderation & Multilevel Modeling",
    descVi: "Conditional Process Analysis (Hayes PROCESS), Floodlight Johnson–Neyman, MSEM 1-1-1 / 2-1-1 và HLM.",
    descEn: "Conditional Process Analysis (Hayes PROCESS), Johnson–Neyman floodlight, multilevel SEM, and HLM.",
    terms: [
      { id: "mediating-variable", label: "Mediating Variable" },
      { id: "moderating-variable", label: "Moderating Variable" },
      { id: "johnson-neyman-technique", label: "Johnson–Neyman" },
      { id: "1-1-1-multilevel-mediation-model", label: "1-1-1 Multilevel SEM" }
    ]
  },
  {
    code: "04",
    titleVi: "Nghiên cứu Định tính & Xây dựng Lý thuyết",
    titleEn: "Qualitative Inquiry & Theory Building",
    descVi: "Grounded Theory, cấu trúc dữ liệu Gioia, nghiên cứu tình huống Yin/Eisenhardt, phân tích chuyên đề phản tư.",
    descEn: "Grounded Theory, Gioia methodology, Yin/Eisenhardt case study designs, and reflexive thematic analysis.",
    terms: [
      { id: "gioia-methodology", label: "Gioia Methodology" },
      { id: "grounded-theory", label: "Grounded Theory" },
      { id: "thematic-analysis", label: "Thematic Analysis" },
      { id: "data-saturation", label: "Data Saturation" }
    ]
  },
  {
    code: "05",
    titleVi: "Tổng quan Hệ thống, Phân tích Tổng hợp & Thư mục",
    titleEn: "Systematic Reviews, Meta-Analysis & Bibliometrics",
    descVi: "Chuẩn PRISMA 2020, PRISMA-ScR, dị biệt I² & τ², RoB 2, thiên lệch xuất bản và phân tích đồng trích dẫn.",
    descEn: "PRISMA 2020 guidelines, PRISMA-ScR, heterogeneity (I² & τ²), RoB 2, publication bias, and bibliometric mapping.",
    terms: [
      { id: "systematic-literature-review", label: "Systematic Review (PRISMA 2020)" },
      { id: "heterogeneity-in-meta-analysis", label: "Meta-Analytic Heterogeneity" },
      { id: "publication-bias", label: "Publication Bias" },
      { id: "bibliometric-analysis", label: "Bibliometric Analysis" }
    ]
  },
  {
    code: "06",
    titleVi: "Triết học Khoa học, Thiết kế Thực nghiệm & Đạo đức",
    titleEn: "Philosophy of Science, Experimental Design & Ethics",
    descVi: "Hậu thực chứng, Hiện thực phê phán (Bhaskar), Khả phản nghiệm (Popper), thiết kế đa nhân tố và Khoa học mở.",
    descEn: "Post-positivism, Critical Realism (Bhaskar), Falsificationism (Popper), factorial designs, and Open Science.",
    terms: [
      { id: "critical-realism", label: "Critical Realism" },
      { id: "falsificationism", label: "Falsificationism" },
      { id: "factorial-design", label: "Factorial Design" },
      { id: "preregistration", label: "Preregistration & IPA" }
    ]
  }
];

export default function LandingHomePage() {
  const router = useRouter();
  const [languageMode, setLanguageMode] = useState<"vi" | "en">("vi");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [heroQuery, setHeroQuery] = useState("");
  const [activeSpecimenId, setActiveSpecimenId] = useState<string>(SPECIMEN_TERMS[0].id);
  const [activeSpecimenTab, setActiveSpecimenTab] = useState<"overview" | "benchmarks" | "citations">("overview");
  const [copiedCite, setCopiedCite] = useState<"apa" | "bibtex" | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("rv_lexicon_mode");
      if (savedLang === "en" || savedLang === "vi") {
        setLanguageMode(savedLang);
      }
      if (document.documentElement.classList.contains("dark")) {
        setIsDarkMode(true);
      }
    }
  }, []);

  const handleToggleLanguage = (mode: "vi" | "en") => {
    setLanguageMode(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("rv_lexicon_mode", mode);
    }
  };

  const handleToggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", next);
    }
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = heroQuery.trim();
    if (q) {
      router.push(`/?q=${encodeURIComponent(q)}&lang=${languageMode}`);
    } else {
      router.push(`/?lang=${languageMode}`);
    }
  };

  const activeSpecimen =
    SPECIMEN_TERMS.find((item) => item.id === activeSpecimenId) || SPECIMEN_TERMS[0];

  const handleCopySpecimenCite = (type: "apa" | "bibtex", text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCite(type);
    setTimeout(() => setCopiedCite(null), 2000);
  };

  const isEn = languageMode === "en";

  return (
    <div className={isDarkMode ? "dark h-full" : "h-full"}>
      <div className="h-full overflow-y-auto bg-[#F8FAFC] dark:bg-[#090D16] text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white">
        {/* 1. TOP EDITORIAL MASTHEAD */}
        <header className="sticky top-0 z-40 border-b border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-[#090D16]/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2.5 group"
                title={isEn ? "Open Research Methodology Lexicon" : "Mở Từ điển Thuật ngữ Phương pháp Nghiên cứu"}
              >
                <div className="w-9 h-9 rounded-lg bg-[#1E3A8A] dark:bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-700 transition">
                  <BookOpen size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-mono tracking-wider text-blue-700 dark:text-blue-400 block leading-none mb-0.5">
                    RESEARCH METHODOLOGY LEXICON
                  </span>
                  <span className="font-serif font-bold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
                    {isEn ? "Bilingual Academic Reference" : "Từ điển Phương pháp Nghiên cứu Khoa học"}
                  </span>
                </div>
              </Link>
            </div>

            <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-300">
              <a href="#anatomy" className="hover:text-blue-700 dark:hover:text-blue-400 transition">
                {isEn ? "Term Anatomy" : "Giải phẫu Mục từ"}
              </a>
              <a href="#integrity" className="hover:text-blue-700 dark:hover:text-blue-400 transition">
                {isEn ? "Provenance & Rigor" : "Chuẩn Thẩm định"}
              </a>
              <a href="#atlas" className="hover:text-blue-700 dark:hover:text-blue-400 transition">
                {isEn ? "Domain Atlas" : "Hệ Phân loại"}
              </a>
              <a href="#audiences" className="hover:text-blue-700 dark:hover:text-blue-400 transition">
                {isEn ? "For Researchers" : "Ứng dụng Học thuật"}
              </a>
              <Link href="/hall-of-fame" className="hover:text-amber-600 dark:hover:text-amber-400 transition flex items-center gap-1">
                <Trophy size={13} className="text-amber-500" />
                <span>{isEn ? "Hall of Fame" : "Bảng Vinh danh"}</span>
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-100 dark:bg-slate-800/80 text-xs font-semibold">
                <button
                  onClick={() => handleToggleLanguage("vi")}
                  className={`px-2.5 py-1 rounded-md transition flex items-center gap-1 ${
                    !isEn
                      ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <span>🇻🇳</span>
                  <span className="hidden sm:inline">Anh - Việt</span>
                </button>
                <button
                  onClick={() => handleToggleLanguage("en")}
                  className={`px-2.5 py-1 rounded-md transition flex items-center gap-1 ${
                    isEn
                      ? "bg-blue-600 text-white shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <Globe size={12} />
                  <span className="hidden sm:inline">English</span>
                </button>
              </div>

              <button
                onClick={handleToggleTheme}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title={isDarkMode ? "Chế độ Sáng" : "Chế độ Tối"}
              >
                {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              <Link
                href={`/?lang=${languageMode}`}
                className="px-3.5 py-2 rounded-lg bg-[#1E3A8A] hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-xs"
              >
                <span>{isEn ? "Open Lexicon" : "Vào Từ điển"}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </header>

        {/* 2. HERO SECTION: EDITORIAL AUTHORITY + LIVE SPECIMEN WORKBENCH */}
        <section className="relative border-b border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9]/70 dark:from-[#090D16] dark:via-[#0D1322] dark:to-[#090D16]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Editorial Thesis & Live Search */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/70 text-blue-800 dark:text-blue-300 text-xs font-medium">
                  <ShieldCheck size={14} className="text-blue-600 dark:text-blue-400" />
                  <span>
                    {isEn
                      ? "1,872 Peer-Reviewed Terms · 148 Acronyms · Verified Primary Citations"
                      : "1.872 Thuật ngữ thẩm định · 148 Từ viết tắt · Chuẩn trích dẫn gốc Q1"}
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                  {isEn
                    ? "The definitive methodological reference for empirical & doctoral research."
                    : "Bách khoa thư thuật ngữ phương pháp nghiên cứu chuẩn mực quốc tế."}
                </h1>

                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  {isEn
                    ? "Built for doctoral candidates, principal investigators, and peer reviewers. Every entry integrates formal definitions, mathematical mechanisms, empirical cutoffs, reviewer pitfalls, and verified APA 7th / BibTeX citations."
                    : "Được thiết kế chuyên biệt cho Nghiên cứu sinh Tiến sĩ, Học viên Cao học, Giảng viên và Phản biện tạp chí quốc tế. Mỗi mục từ tích hợp định nghĩa học thuật, cơ chế toán học, ngưỡng kiểm định thực nghiệm, cảnh báo bẫy phản biện Q1 và trích dẫn gốc APA 7th / BibTeX."}
                </p>

                {/* Live Search Bar jumping directly into the Lexicon */}
                <form onSubmit={handleHeroSearch} className="pt-1">
                  <div className="flex flex-col sm:flex-row gap-2.5 p-2 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700/90 shadow-md focus-within:border-blue-600 dark:focus-within:border-blue-500 transition">
                    <div className="flex items-center gap-2.5 flex-1 px-2.5 py-1.5">
                      <Search size={18} className="text-blue-600 dark:text-blue-400 shrink-0" />
                      <input
                        type="text"
                        value={heroQuery}
                        onChange={(e) => setHeroQuery(e.target.value)}
                        placeholder={
                          isEn
                            ? "Search any methodology term, test, or acronym (e.g., Endogeneity, HTMT, DID, PRISMA)..."
                            : "Nhập thuật ngữ tiếng Anh, tiếng Việt hoặc viết tắt (VD: Nội sinh, HTMT, DID, Gioia)..."
                        }
                        className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg bg-[#1E3A8A] hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                    >
                      <span>{isEn ? "Search Lexicon" : "Tra cứu ngay"}</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </form>

                {/* Quick Jump Foundational Terms */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {isEn ? "Jump directly to foundational entries:" : "Tra cứu nhanh các mục từ trụ cột:"}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: "construct-validity", label: "Construct Validity" },
                      { id: "endogeneity", label: "Endogeneity (IV / 2SLS)" },
                      { id: "discriminant-validity-htmt", label: "HTMT < 0.85" },
                      { id: "difference-in-differences", label: "Difference-in-Differences" },
                      { id: "common-method-bias", label: "Common Method Bias" },
                      { id: "gioia-methodology", label: "Gioia Methodology" },
                      { id: "critical-realism", label: "Critical Realism" }
                    ].map((pill) => (
                      <Link
                        key={pill.id}
                        href={`/?term=${pill.id}&lang=${languageMode}`}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-700 dark:hover:text-blue-300 transition shadow-2xs"
                      >
                        {pill.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Key Metrics Bar */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/90 dark:border-slate-800">
                  <div>
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1E3A8A] dark:text-blue-400">
                      1,872
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {isEn ? "Verified Methodology Terms" : "Thuật ngữ Phương pháp luận"}
                    </div>
                  </div>
                  <div>
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                      148
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {isEn ? "Statistical & SEM Acronyms" : "Từ viết tắt Thống kê & SEM"}
                    </div>
                  </div>
                  <div>
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-700 dark:text-amber-400">
                      APA 7th
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {isEn ? "BibTeX & RIS Export Ready" : "Xuất BibTeX & RIS tức thì"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Specimen Card ("Anatomy of a Term") */}
              <div id="anatomy" className="lg:col-span-6">
                <div className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden">
                  {/* Top Bar: Specimen Selector */}
                  <div className="px-4 sm:px-5 py-3 bg-slate-900 dark:bg-slate-950 text-white flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Terminal size={14} className="text-blue-400" />
                      <span className="text-xs font-mono text-slate-300">
                        {isEn ? "INTERACTIVE ENTRY SPECIMEN" : "MÔ PHỎNG CẤU TRÚC MỤC TỪ CHUẨN Q1"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {SPECIMEN_TERMS.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveSpecimenId(item.id)}
                          className={`px-2 py-1 rounded text-[11px] font-medium transition cursor-pointer ${
                            activeSpecimenId === item.id
                              ? "bg-blue-600 text-white font-semibold"
                              : "text-slate-400 hover:text-white hover:bg-slate-800"
                          }`}
                        >
                          {item.term.split(" ")[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Specimen Header */}
                  <div className="p-5 sm:p-6 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800">
                        {isEn ? activeSpecimen.categoryEn : activeSpecimen.categoryVi}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200/70 dark:border-emerald-800/70">
                        <CheckCircle2 size={12} />
                        {isEn ? "Peer-Reviewed & Verified" : "Đã thẩm định học thuật"}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                      {activeSpecimen.term}
                    </h2>
                    {!isEn && (
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mt-0.5">
                        {activeSpecimen.vietnamese}
                      </p>
                    )}

                    {/* Mathematical / Structural Formula Strip */}
                    <div className="mt-3 px-3.5 py-2 rounded-lg bg-slate-900 dark:bg-slate-950 text-blue-200 font-mono text-xs border border-slate-800 flex items-center justify-between gap-2">
                      <span>{activeSpecimen.formula}</span>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {isEn ? "Formal Notation" : "Ký hiệu chuẩn"}
                      </span>
                    </div>
                  </div>

                  {/* Specimen Sub-navigation Tabs */}
                  <div className="px-5 pt-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 text-xs font-semibold bg-white dark:bg-[#111827]">
                    <button
                      onClick={() => setActiveSpecimenTab("overview")}
                      className={`pb-2.5 border-b-2 transition cursor-pointer ${
                        activeSpecimenTab === "overview"
                          ? "border-blue-600 text-blue-700 dark:text-blue-400"
                          : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      {isEn ? "1. Definition & Debates" : "1. Định nghĩa & Tranh luận"}
                    </button>
                    <button
                      onClick={() => setActiveSpecimenTab("benchmarks")}
                      className={`pb-2.5 border-b-2 transition cursor-pointer ${
                        activeSpecimenTab === "benchmarks"
                          ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
                          : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      {isEn ? "2. Cutoffs & Reviewer Pitfalls" : "2. Ngưỡng chuẩn & Bẫy phản biện"}
                    </button>
                    <button
                      onClick={() => setActiveSpecimenTab("citations")}
                      className={`pb-2.5 border-b-2 transition cursor-pointer ${
                        activeSpecimenTab === "citations"
                          ? "border-amber-600 text-amber-700 dark:text-amber-400"
                          : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      {isEn ? "3. APA 7th & BibTeX" : "3. Trích dẫn gốc & BibTeX"}
                    </button>
                  </div>

                  {/* Specimen Tab Content */}
                  <div className="p-5 sm:p-6 space-y-4 min-h-[250px] flex flex-col justify-between">
                    {activeSpecimenTab === "overview" && (
                      <div className="space-y-4">
                        <div>
                          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                            <BookOpen size={13} className="text-blue-600" />
                            <span>{isEn ? "Core Scholarly Definition" : "Định nghĩa Học thuật Cốt lõi"}</span>
                          </div>
                          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                            {isEn ? activeSpecimen.definitionEn : activeSpecimen.definitionVi}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800">
                          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                            <Scale size={13} className="text-indigo-600 dark:text-indigo-400" />
                            <span>{isEn ? "Paradigm & Methodological Debate" : "Tranh luận Hệ hình & Phương pháp luận"}</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {isEn ? activeSpecimen.debateEn : activeSpecimen.debateVi}
                          </p>
                        </div>
                      </div>
                    )}

                    {activeSpecimenTab === "benchmarks" && (
                      <div className="space-y-3.5">
                        <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/70">
                          <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                            <Layers size={13} />
                            <span>{isEn ? "Empirical Benchmarks & Cutoffs" : "Ngưỡng Tham chiếu & Tiêu chuẩn Kiểm định"}</span>
                          </div>
                          <p className="text-xs text-emerald-950 dark:text-emerald-100 leading-relaxed">
                            {isEn ? activeSpecimen.benchmarkEn : activeSpecimen.benchmarkVi}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/70">
                          <div className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-1.5">
                            <AlertTriangle size={13} />
                            <span>{isEn ? "Common Reviewer Rejection Pitfalls" : "Cạm bẫy Phản biện Q1 Thường gặp"}</span>
                          </div>
                          <p className="text-xs text-amber-950 dark:text-amber-100 leading-relaxed">
                            {isEn ? activeSpecimen.pitfallEn : activeSpecimen.pitfallVi}
                          </p>
                        </div>
                      </div>
                    )}

                    {activeSpecimenTab === "citations" && (
                      <div className="space-y-3.5">
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                              <Quote size={12} className="text-blue-600" />
                              APA 7th Edition Reference
                            </span>
                            <button
                              onClick={() => handleCopySpecimenCite("apa", activeSpecimen.apaReference)}
                              className="text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              {copiedCite === "apa" ? <Check size={12} /> : <Copy size={12} />}
                              <span>{copiedCite === "apa" ? (isEn ? "Copied" : "Đã chép") : (isEn ? "Copy APA" : "Chép APA")}</span>
                            </button>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-serif italic leading-relaxed">
                            {activeSpecimen.apaReference}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900 text-slate-200 border border-slate-800">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-mono text-slate-400">BibTeX Record (.bib)</span>
                            <button
                              onClick={() => handleCopySpecimenCite("bibtex", activeSpecimen.bibtex)}
                              className="text-[11px] font-mono text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              {copiedCite === "bibtex" ? <Check size={12} /> : <Copy size={12} />}
                              <span>{copiedCite === "bibtex" ? "Copied" : "Copy BibTeX"}</span>
                            </button>
                          </div>
                          <pre className="text-[11px] font-mono text-slate-300 overflow-x-auto leading-snug">
                            {activeSpecimen.bibtex}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Footer inside Specimen Card */}
                    <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400 truncate max-w-[65%]">
                        {isEn ? "Foundational:" : "Nguồn gốc:"} {activeSpecimen.seminalCitation}
                      </span>
                      <Link
                        href={`/?term=${activeSpecimen.id}&lang=${languageMode}`}
                        className="font-semibold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1 shrink-0"
                      >
                        <span>{isEn ? "Inspect full entry" : "Xem trọn bộ mục từ"}</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ACADEMIC PROVENANCE & CITATION INTEGRITY GUARANTEES */}
        <section id="integrity" className="py-14 lg:py-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <div className="text-xs font-mono text-blue-700 dark:text-blue-400 mb-2">
                {isEn ? "SCHOLARLY PROVENANCE & RIGOR" : "CAM KẾT TÍNH CHÍNH XÁC & NGUỒN GỐC HỌC THUẬT"}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {isEn
                  ? "Why researchers trust this lexicon over generic AI summaries"
                  : "Vì sao giới nghiên cứu tin cậy hệ thống này thay vì bản dịch tự động?"}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {isEn
                  ? "Every methodological definition, statistical cutoff, and bibliographic citation undergoes strict verification against seminal methodological works and Q1 journal standards."
                  : "Trong nghiên cứu khoa học, việc dịch sai một thuật ngữ triết học hay áp dụng nhầm một ngưỡng kiểm định cũ có thể dẫn đến quyết định từ chối bài báo (Desk/Reviewer Rejection). Từ điển được kiểm định nghiêm ngặt trên 4 trụ cột:"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-xl bg-[#F8FAFC] dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 flex items-center justify-center mb-4">
                    <BookMarked size={20} />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-2">
                    {isEn ? "100% Verified Seminal Sources" : "100% Truy nguyên Công trình Gốc"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isEn
                      ? "Every entry traces directly to its founding methodological paper or monograph (e.g., Cronbach & Meehl, 1955; Campbell & Stanley, 1963; Pearl, 2009; Hair et al., 2022) with verified DOIs—zero fabricated references."
                      : "Mỗi khái niệm đều gắn trực tiếp với công trình khai sinh gốc (Cronbach & Meehl, 1955; Shadish, Cook, & Campbell, 2002; Pearl, 2009; Hair et al., 2022; Hayes, 2022) kèm mã DOI xác thực — tuyệt đối không có nguồn trích dẫn bịa đặt."}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800 text-[11px] font-mono text-blue-700 dark:text-blue-400">
                  APA 7th · BibTeX · RIS · EndNote
                </div>
              </div>

              <div className="p-6 rounded-xl bg-[#F8FAFC] dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4">
                    <Layers size={20} />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-2">
                    {isEn ? "Updated Q1 Statistical Cutoffs" : "Cập nhật Ngưỡng Thống kê Thế hệ mới"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isEn
                      ? "Distinguishes classic rules of thumb from modern Q1 standards: tF critical value F ≥ 104.7 (Lee et al., 2022), HTMT one-sided CI (Franke & Sarstedt, 2019), PLSpredict (Shmueli et al., 2019), and PRISMA 2020."
                      : "Phân biệt rõ ngưỡng kinh điển và chuẩn mực Q1 mới nhất: kiểm định tF (F ≥ 104.7 - Lee et al., 2022), khoảng tin cậy một phía HTMT (Franke & Sarstedt, 2019), PLSpredict (Shmueli et al., 2019), R-hat < 1.01 (Vehtari et al., 2021) và PRISMA 2020."}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800 text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                  Empirical Cutoffs & Decision Rules
                </div>
              </div>

              <div className="p-6 rounded-xl bg-[#F8FAFC] dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-4">
                    <AlertTriangle size={20} />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-2">
                    {isEn ? "Explicit Reviewer Pitfall Warnings" : "Cảnh báo Bẫy Sai lầm khi Phản biện"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isEn
                      ? "Highlights methodological errors that trigger desk rejections: overcontrolling mediators in DAGs, misusing Heckman 2-step for general endogeneity (Certo et al., 2016), or relying solely on Harman's single-factor test."
                      : "Chỉ rõ các lỗi phương pháp khiến bài báo bị bác bỏ: kiểm soát nhầm biến trung gian khi ước lượng tác động toàn phần, dùng sai mô hình Heckman cho nội sinh tổng quát (Certo et al., 2016), hay chỉ chạy Harman test cho CMB."}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800 text-[11px] font-mono text-amber-700 dark:text-amber-400">
                  Q1 Desk-Reject Prevention
                </div>
              </div>

              <div className="p-6 rounded-xl bg-[#F8FAFC] dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 flex items-center justify-center mb-4">
                    <Globe size={20} />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-2">
                    {isEn ? "Dual-Edition Language Architecture" : "Chuẩn hóa Dịch thuật Học thuật"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isEn
                      ? "Switch seamlessly between the Bilingual Vietnamese–English Edition (for doctoral dissertations in Vietnam) and the 100% Monolingual Academic English Edition (for international manuscript preparation)."
                      : "Chuyển đổi tức thì giữa Ấn bản Song ngữ Anh – Việt (chuẩn hóa các thuật ngữ dễ dịch sai như Scientific Realism, Abduction, Donor Pool, Coarsened Exact Matching) và Ấn bản Tiếng Anh Học thuật thuần túy."}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800 text-[11px] font-mono text-indigo-700 dark:text-indigo-400">
                  Bilingual VI–EN & Monolingual EN
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. DOMAIN ATLAS: 6 CORE METHODOLOGICAL CLUSTERS */}
        <section id="atlas" className="py-14 lg:py-20 border-b border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#090D16]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <div className="text-xs font-mono text-blue-700 dark:text-blue-400 mb-2">
                  {isEn ? "METHODOLOGICAL TAXONOMY" : "BẢN ĐỒ PHÂN KHU PHƯƠNG PHÁP LUẬN"}
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {isEn
                    ? "Explore the lexicon across major research traditions"
                    : "Khám phá kho thuật ngữ theo từng trường phái nghiên cứu"}
                </h2>
              </div>
              <Link
                href={`/?lang=${languageMode}`}
                className="text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1.5"
              >
                <span>{isEn ? "Browse all 1,872 entries & 148 acronyms" : "Xem toàn bộ 1.872 thuật ngữ & 148 từ viết tắt"}</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DOMAIN_ATLAS.map((cluster) => (
                <div
                  key={cluster.code}
                  className="p-6 rounded-xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-blue-500/70 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        CLUSTER {cluster.code}
                      </span>
                      <Compass size={16} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-1.5">
                      {isEn ? cluster.titleEn : cluster.titleVi}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {isEn ? cluster.descEn : cluster.descVi}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="text-[11px] font-medium text-slate-400 mb-2">
                      {isEn ? "Representative terms:" : "Thuật ngữ tiêu biểu:"}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cluster.terms.map((tItem) => (
                        <Link
                          key={tItem.id}
                          href={`/?term=${tItem.id}&lang=${languageMode}`}
                          className="px-2 py-1 rounded text-xs font-medium bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-blue-700 dark:hover:text-blue-300 border border-slate-200/80 dark:border-slate-700 transition"
                        >
                          {tItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. BUILT FOR RESEARCHERS AT EVERY STAGE */}
        <section id="audiences" className="py-14 lg:py-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <div className="text-xs font-mono text-blue-700 dark:text-blue-400 mb-2">
                {isEn ? "RESEARCH WORKFLOW INTEGRATION" : "ỨNG DỤNG TRONG QUY TRÌNH NGHIÊN CỨU KHOA HỌC"}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {isEn
                  ? "Designed for every stage of scholarly production"
                  : "Đồng hành cùng nhà nghiên cứu ở mọi giai đoạn học thuật"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5 mb-3">
                  <GraduationCap size={20} className="text-blue-700 dark:text-blue-400" />
                  <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                    {isEn ? "Doctoral & Master's Candidates" : "Nghiên cứu sinh & Học viên Cao học"}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {isEn
                    ? "Draft your Methodology chapter with accurate bilingual terminology, justify your sampling and estimation choices, and prepare for dissertation defense questions on model assumptions."
                    : "Chuẩn hóa thuật ngữ khi viết Chương Phương pháp Nghiên cứu của luận án/luận văn; nắm vững cơ sở lý luận để bảo vệ lựa chọn mô hình trước Hội đồng chấm luận án."}
                </p>
                <Link
                  href={`/?term=construct-validity&lang=${languageMode}`}
                  className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>{isEn ? "Explore measurement & validity terms" : "Tra cứu nhóm Độ giá trị & Thang đo"}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className="p-6 rounded-xl bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5 mb-3">
                  <Database size={20} className="text-emerald-700 dark:text-emerald-400" />
                  <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                    {isEn ? "International Journal Authors (Q1/Q2)" : "Tác giả Bài báo Quốc tế Scopus / WoS"}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {isEn
                    ? "Switch to the Monolingual Academic English edition to verify contemporary robustness checks, diagnostic reporting standards, and export clean BibTeX/RIS references into LaTeX or Zotero."
                    : "Chuyển sang chế độ Academic English để rà soát các kiểm định độ vững (robustness checks), chuẩn báo cáo PRISMA 2020 / CONSORT 2025 và xuất trích dẫn BibTeX/RIS trực tiếp vào Zotero, EndNote hoặc Overleaf."}
                </p>
                <Link
                  href="/?term=endogeneity&lang=en"
                  className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>{isEn ? "Launch Academic English Edition" : "Trải nghiệm Ấn bản Tiếng Anh (EN)"}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className="p-6 rounded-xl bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5 mb-3">
                  <GitBranch size={20} className="text-amber-700 dark:text-amber-400" />
                  <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                    {isEn ? "Faculty Advisors & Peer Reviewers" : "Giảng viên Hướng dẫn & Phản biện"}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {isEn
                    ? "Share deep-linked URLs (?term=slug) directly in manuscript review reports or student feedback, and contribute scholarly revisions through the peer-reviewed Wiki governance system."
                    : "Chia sẻ liên kết sâu (?term=slug) của từng thuật ngữ trực tiếp vào phiếu nhận xét khóa luận/luận án hoặc bản phản biện, đồng thời tham gia đóng góp & hiệu đính mở."}
                </p>
                <Link
                  href="/hall-of-fame"
                  className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>{isEn ? "View Scholarly Hall of Fame" : "Xem Bảng Vinh danh Học giả"}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FOOTER & FINAL CALL TO ACTION */}
        <footer className="py-12 bg-slate-900 dark:bg-slate-950 text-slate-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {isEn
                    ? "Ready to explore the complete Research Methodology Lexicon?"
                    : "Sẵn sàng tra cứu toàn bộ Từ điển Phương pháp Nghiên cứu Khoa học?"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {isEn
                    ? "Instant full-text search across 1,872 methodology terms and 148 statistical acronyms—free and open for the scholarly community."
                    : "Tra cứu toàn văn tức thì (Ctrl + K) trên 1.872 thuật ngữ và 148 từ viết tắt — hoàn toàn mở và miễn phí cho cộng đồng học thuật."}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/?lang=${languageMode}`}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition flex items-center gap-2 shadow-sm"
                >
                  <BookOpen size={16} />
                  <span>{isEn ? "Enter Dictionary Workspace" : "Mở Không gian Tra cứu Từ điển"}</span>
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/hall-of-fame"
                  className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium transition flex items-center gap-1.5 border border-slate-700"
                >
                  <Award size={15} className="text-amber-400" />
                  <span>{isEn ? "Scholarly Hall of Fame" : "Bảng Vinh danh Học giả"}</span>
                </Link>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <div>
                © {new Date().getFullYear()} Research Methodology Lexicon ·{" "}
                <a
                  href="https://vnresearch-dictionary.vercel.app"
                  className="text-slate-300 hover:underline"
                >
                  vnresearch-dictionary.vercel.app
                </a>
              </div>
              <div className="flex items-center gap-5">
                <Link href="/" className="hover:text-white transition">
                  {isEn ? "Dictionary (/)" : "Từ điển (/)"}
                </Link>
                <Link href="/home" className="hover:text-white transition">
                  {isEn ? "Overview (/home)" : "Trang chủ (/home)"}
                </Link>
                <Link href="/gioi-thieu" className="hover:text-white transition">
                  {isEn ? "Introduction (/gioi-thieu)" : "Giới thiệu (/gioi-thieu)"}
                </Link>
                <Link href="/hall-of-fame" className="hover:text-white transition">
                  {isEn ? "Hall of Fame" : "Vinh danh"}
                </Link>
                <Link href="/my-contributions" className="hover:text-white transition">
                  {isEn ? "Contributions" : "Hồ sơ Đóng góp"}
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
