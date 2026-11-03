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
  Scale,
  Database,
  GitBranch,
  Award,
  Terminal,
  BookMarked,
  Sparkles,
  ExternalLink,
  ChevronRight,
  FileCode2,
  BookmarkCheck,
  Cpu,
  CornerDownRight
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

interface LandingHomePageProps {
  initialStats?: {
    termsCount: number;
    acronymsCount: number;
    totalCount: number;
  };
}

export default function LandingHomePage({ initialStats }: LandingHomePageProps) {
  const router = useRouter();
  const [languageMode, setLanguageMode] = useState<"vi" | "en">("vi");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [heroQuery, setHeroQuery] = useState("");
  const [activeSpecimenId, setActiveSpecimenId] = useState<string>(SPECIMEN_TERMS[0].id);
  const [activeSpecimenTab, setActiveSpecimenTab] = useState<"overview" | "benchmarks" | "citations">("overview");
  const [copiedCite, setCopiedCite] = useState<"apa" | "bibtex" | null>(null);

  // Thống kê động (tự động fetch client nếu không truyền SSR)
  const [stats, setStats] = useState(
    initialStats || {
      termsCount: 1872,
      acronymsCount: 148,
      totalCount: 2020
    }
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("rv_lexicon_mode");
      if (savedLang === "en" || savedLang === "vi") {
        setLanguageMode(savedLang);
      }
      
      const savedTheme = localStorage.getItem("rv_theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialDark = savedTheme === "dark" || (!savedTheme && prefersDark);
      setIsDarkMode(initialDark);
      if (initialDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  useEffect(() => {
    if (!initialStats && typeof window !== "undefined") {
      Promise.all([
        fetch("/data/methodology_terms.json")
          .then((res) => res.json())
          .then((data) => data.terms?.length || 1872)
          .catch(() => 1872),
        fetch("/data/acronyms.json")
          .then((res) => res.json())
          .then((data) => Object.keys(data.acronyms || {}).length || 148)
          .catch(() => 148)
      ]).then(([termsLen, acronymsLen]) => {
        setStats({
          termsCount: termsLen,
          acronymsCount: acronymsLen,
          totalCount: termsLen + acronymsLen
        });
      });
    }
  }, [initialStats]);

  const handleToggleLanguage = (mode: "vi" | "en") => {
    setLanguageMode(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("rv_lexicon_mode", mode);
    }
  };

  const handleToggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (typeof window !== "undefined") {
      localStorage.setItem("rv_theme", nextDark ? "dark" : "light");
      if (nextDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
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
    <div className={isDarkMode ? "dark w-full min-h-screen" : "w-full min-h-screen"}>
      <div className="w-full min-h-screen bg-[#070B14] text-slate-100 selection:bg-blue-600 selection:text-white">
        
        {/* 1. TOP EDITORIAL MASTHEAD (Full-width edge-to-edge) */}
        <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#070B14]/90 backdrop-blur-md px-4 sm:px-8 xl:px-12 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-3 group"
              title={isEn ? "Open Dictionary Workspace" : "Mở Không gian Tra cứu Từ điển"}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-blue-900/30 font-bold text-lg">
                R
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-blue-400 block uppercase">
                  Research Methodology Lexicon
                </span>
                <span className="font-serif font-bold text-base sm:text-lg text-white tracking-tight">
                  {isEn ? "Scholarly Reference System" : "Từ điển Phương pháp Nghiên cứu"}
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-xs font-medium text-slate-300">
            <a href="#workbench" className="hover:text-blue-400 transition flex items-center gap-1.5">
              <Terminal size={14} className="text-blue-400" />
              <span>{isEn ? "Live Specimen Workbench" : "Khung Thực nghiệm Mục từ"}</span>
            </a>
            <a href="#taxonomy" className="hover:text-blue-400 transition flex items-center gap-1.5">
              <Compass size={14} className="text-indigo-400" />
              <span>{isEn ? "Methodological Atlas" : "Hệ Phân loại Nghiên cứu"}</span>
            </a>
            <a href="#rigor" className="hover:text-blue-400 transition flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>{isEn ? "Q1 Reviewer Standards" : "Chuẩn Thẩm định Q1"}</span>
            </a>
            <Link href="/hall-of-fame" className="hover:text-amber-400 transition flex items-center gap-1.5 text-amber-300">
              <Trophy size={14} className="text-amber-400" />
              <span>{isEn ? "Hall of Fame" : "Vinh danh Học giả"}</span>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center rounded-lg border border-slate-800 p-0.5 bg-slate-900/80 text-xs font-semibold">
              <button
                onClick={() => handleToggleLanguage("vi")}
                className={`px-3 py-1 rounded-md transition flex items-center gap-1.5 cursor-pointer ${
                  !isEn ? "bg-blue-600 text-white shadow-xs font-bold" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>🇻🇳</span>
                <span className="hidden sm:inline">Song ngữ</span>
              </button>
              <button
                onClick={() => handleToggleLanguage("en")}
                className={`px-3 py-1 rounded-md transition flex items-center gap-1.5 cursor-pointer ${
                  isEn ? "bg-blue-600 text-white shadow-xs font-bold" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Globe size={13} />
                <span className="hidden sm:inline">English</span>
              </button>
            </div>

            <Link
              href={`/?lang=${languageMode}`}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold transition flex items-center gap-2 shadow-lg shadow-blue-900/40"
            >
              <span>{isEn ? "Open Dictionary (/)" : "Vào Từ điển (/)"}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </header>

        {/* 2. FULL-SCREEN HERO COCKPIT (Edge-to-edge layout) */}
        <section className="relative px-4 sm:px-8 xl:px-12 pt-8 pb-14 border-b border-slate-800/80 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(30,58,138,0.35),rgba(255,255,255,0))]">
          <div className="w-full max-w-[1720px] mx-auto">
            
            {/* Top Stat Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-slate-800/70">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/80 text-blue-300 text-xs font-medium">
                  <ShieldCheck size={14} className="text-blue-400" />
                  <span>
                    {isEn
                      ? `${stats.termsCount.toLocaleString("en-US")} Methodology Terms · ${stats.acronymsCount.toLocaleString("en-US")} Acronyms`
                      : `${stats.termsCount.toLocaleString("vi-VN")} Thuật ngữ Phương pháp luận · ${stats.acronymsCount.toLocaleString("vi-VN")} Từ viết tắt`}
                  </span>
                </span>
                <span className="hidden sm:inline-block text-slate-600">·</span>
                <span className="text-xs text-slate-400">
                  {isEn
                    ? "Updated with Q1 Journal Standards & APA 7th Edition"
                    : "Đã thẩm định theo chuẩn Tạp chí Q1 & Trích dẫn APA 7th"}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>100% Peer-Reviewed</span>
                </span>
                <span>·</span>
                <span className="text-blue-400">BibTeX / RIS Export</span>
              </div>
            </div>

            {/* Split Screen Hero: Search & Context (Left) + Interactive Specimen (Right) */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Mission, Universal Search & Shortcuts (5 cols) */}
              <div className="xl:col-span-5 space-y-6">
                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-white leading-[1.12] tracking-tight">
                    {isEn
                      ? "The definitive reference system for empirical & doctoral research."
                      : "Bách khoa toàn thư thuật ngữ nghiên cứu khoa học chuẩn mực quốc tế."}
                  </h1>
                  <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                    {isEn
                      ? "Engineered for doctoral candidates, quantitative econometricians, and qualitative researchers. Instant access to mathematical mechanisms, empirical cutoffs, reviewer pitfall warnings, and seminal citations."
                      : "Thiết kế chuyên biệt cho Nghiên cứu sinh Tiến sĩ, Học viên Cao học, Giảng viên và Phản biện quốc tế. Tra cứu tức thì cơ chế toán học, ngưỡng kiểm định thực nghiệm, cảnh báo bẫy phản biện Q1 và trích dẫn gốc chuẩn APA 7th / BibTeX."}
                  </p>
                </div>

                {/* Universal Search Console */}
                <form onSubmit={handleHeroSearch} className="pt-1">
                  <div className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-700 shadow-2xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition">
                    <div className="flex items-center gap-3 px-3 py-2">
                      <Search size={20} className="text-blue-400 shrink-0" />
                      <input
                        type="text"
                        value={heroQuery}
                        onChange={(e) => setHeroQuery(e.target.value)}
                        placeholder={
                          isEn
                            ? "Search any term, acronym, or test (e.g., Endogeneity, HTMT, DID, Gioia, PRISMA)..."
                            : "Nhập thuật ngữ tiếng Anh, tiếng Việt hoặc viết tắt (VD: Nội sinh, HTMT, DID, Gioia, VIF)..."
                        }
                        className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-slate-400 focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 px-2">
                      <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                        Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">Ctrl + K</kbd> anywhere
                      </span>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <span>{isEn ? "Search Lexicon" : "Tra cứu ngay"}</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </form>

                {/* Direct High-Frequency Jump Tags */}
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-blue-400" />
                    <span>{isEn ? "Frequent Foundational Lookups" : "Mục từ nền tảng tra cứu nhiều nhất"}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "construct-validity", label: "Construct Validity", tag: "Psychometrics" },
                      { id: "endogeneity", label: "Endogeneity (IV / 2SLS)", tag: "Econometrics" },
                      { id: "discriminant-validity-htmt", label: "HTMT < 0.85", tag: "PLS-SEM" },
                      { id: "difference-in-differences", label: "Difference-in-Differences", tag: "Quasi-Exp" },
                      { id: "common-method-bias", label: "Common Method Bias (CMB)", tag: "Survey" },
                      { id: "gioia-methodology", label: "Gioia Methodology", tag: "Qualitative" },
                      { id: "critical-realism", label: "Critical Realism (Bhaskar)", tag: "Philosophy" },
                      { id: "systematic-literature-review", label: "PRISMA 2020", tag: "Review" }
                    ].map((pill) => (
                      <Link
                        key={pill.id}
                        href={`/?term=${pill.id}&lang=${languageMode}`}
                        className="group px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/90 text-slate-200 border border-slate-800 hover:border-blue-500 hover:bg-blue-950/40 transition flex items-center gap-2 shadow-xs"
                      >
                        <span>{pill.label}</span>
                        <span className="text-[10px] font-mono text-slate-500 group-hover:text-blue-400 transition">
                          {pill.tag}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Metric Summary Counters */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
                  <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-blue-400">
                      {stats.termsCount.toLocaleString(isEn ? "en-US" : "vi-VN")}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {isEn ? "Methodology Terms" : "Thuật ngữ chuyên sâu"}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-400">
                      {stats.acronymsCount.toLocaleString(isEn ? "en-US" : "vi-VN")}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {isEn ? "Statistical Acronyms" : "Từ viết tắt chuẩn"}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-400">
                      100%
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {isEn ? "Seminal APA & BibTeX" : "Trích dẫn gốc Q1"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Density Interactive Specimen Workbench (7 cols) */}
              <div id="workbench" className="xl:col-span-7">
                <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
                  
                  {/* Specimen Header & Mode Switchers */}
                  <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                      <span className="text-xs font-mono font-semibold text-slate-300">
                        INTERACTIVE SPECIMEN WORKBENCH
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
                      {SPECIMEN_TERMS.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveSpecimenId(item.id)}
                          className={`px-3 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
                            activeSpecimenId === item.id
                              ? "bg-blue-600 text-white font-semibold shadow-xs"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {item.term.split(" ")[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Specimen Title Header */}
                  <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-blue-950/80 text-blue-300 border border-blue-800/70">
                        {isEn ? activeSpecimen.categoryEn : activeSpecimen.categoryVi}
                      </span>
                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 size={13} />
                        Verified Peer-Reviewed Provenance
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                        {activeSpecimen.term}
                      </h2>
                      {!isEn && (
                        <span className="text-sm font-medium text-blue-300">
                          {activeSpecimen.vietnamese}
                        </span>
                      )}
                    </div>

                    {/* Mathematical Formula / Structural Logic Banner */}
                    <div className="mt-4 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-blue-300 flex items-center justify-between gap-3 overflow-x-auto">
                      <span>{activeSpecimen.formula}</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider shrink-0 font-sans">
                        Formal Logic
                      </span>
                    </div>
                  </div>

                  {/* Specimen Navigation Tabs */}
                  <div className="px-6 pt-3 border-b border-slate-800 bg-slate-950/60 flex items-center gap-6 text-xs font-semibold">
                    <button
                      onClick={() => setActiveSpecimenTab("overview")}
                      className={`pb-3 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                        activeSpecimenTab === "overview"
                          ? "border-blue-500 text-blue-400"
                          : "border-transparent text-slate-400 hover:text-white"
                      }`}
                    >
                      <BookOpen size={14} />
                      <span>{isEn ? "1. Academic Definition & Debates" : "1. Định nghĩa Học thuật & Tranh luận"}</span>
                    </button>

                    <button
                      onClick={() => setActiveSpecimenTab("benchmarks")}
                      className={`pb-3 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                        activeSpecimenTab === "benchmarks"
                          ? "border-emerald-500 text-emerald-400"
                          : "border-transparent text-slate-400 hover:text-white"
                      }`}
                    >
                      <Layers size={14} />
                      <span>{isEn ? "2. Empirical Cutoffs & Pitfalls" : "2. Ngưỡng Kiểm định & Cạm bẫy Q1"}</span>
                    </button>

                    <button
                      onClick={() => setActiveSpecimenTab("citations")}
                      className={`pb-3 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                        activeSpecimenTab === "citations"
                          ? "border-amber-500 text-amber-400"
                          : "border-transparent text-slate-400 hover:text-white"
                      }`}
                    >
                      <FileCode2 size={14} />
                      <span>{isEn ? "3. Seminal Citation & BibTeX" : "3. Trích dẫn Gốc & BibTeX"}</span>
                    </button>
                  </div>

                  {/* Specimen Tab Body */}
                  <div className="p-6 space-y-4 min-h-[300px]">
                    {activeSpecimenTab === "overview" && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                          <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <BookOpen size={13} />
                            <span>{isEn ? "Scholarly Core Definition" : "Định nghĩa Cốt lõi"}</span>
                          </div>
                          <p className="text-sm text-slate-200 leading-relaxed">
                            {isEn ? activeSpecimen.definitionEn : activeSpecimen.definitionVi}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/40">
                          <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <Scale size={13} />
                            <span>{isEn ? "Methodological & Paradigm Debate" : "Tranh luận Phương pháp luận & Hệ hình"}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {isEn ? activeSpecimen.debateEn : activeSpecimen.debateVi}
                          </p>
                        </div>
                      </div>
                    )}

                    {activeSpecimenTab === "benchmarks" && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
                          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <CheckCircle2 size={13} />
                            <span>{isEn ? "Empirical Evaluation Benchmarks" : "Ngưỡng Thẩm định Thực nghiệm"}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                            {isEn ? activeSpecimen.benchmarkEn : activeSpecimen.benchmarkVi}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40">
                          <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <AlertTriangle size={13} />
                            <span>{isEn ? "Reviewer Pitfall & Rejection Triggers" : "Cạm bẫy Bị Phản biện Bác bỏ (Desk Reject)"}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
                            {isEn ? activeSpecimen.pitfallEn : activeSpecimen.pitfallVi}
                          </p>
                        </div>
                      </div>
                    )}

                    {activeSpecimenTab === "citations" && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                              <Quote size={13} className="text-blue-400" />
                              APA 7th Edition Reference
                            </span>
                            <button
                              onClick={() => handleCopySpecimenCite("apa", activeSpecimen.apaReference)}
                              className="text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                            >
                              {copiedCite === "apa" ? <Check size={13} /> : <Copy size={13} />}
                              <span>{copiedCite === "apa" ? (isEn ? "Copied" : "Đã chép") : (isEn ? "Copy APA" : "Chép APA")}</span>
                            </button>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-300 font-serif italic leading-relaxed">
                            {activeSpecimen.apaReference}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono text-slate-400">BibTeX Citation Record (.bib)</span>
                            <button
                              onClick={() => handleCopySpecimenCite("bibtex", activeSpecimen.bibtex)}
                              className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                            >
                              {copiedCite === "bibtex" ? <Check size={13} /> : <Copy size={13} />}
                              <span>{copiedCite === "bibtex" ? "Copied" : "Copy BibTeX"}</span>
                            </button>
                          </div>
                          <pre className="text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                            {activeSpecimen.bibtex}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Specimen Action Bar */}
                    <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <span className="text-slate-400 font-mono">
                        Primary Source: <span className="text-slate-200">{activeSpecimen.seminalCitation}</span>
                      </span>
                      <Link
                        href={`/?term=${activeSpecimen.id}&lang=${languageMode}`}
                        className="px-4 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 border border-blue-500/40 font-semibold transition flex items-center gap-1.5"
                      >
                        <span>{isEn ? "Examine in Dictionary Workspace" : "Mở toàn cảnh trong Từ điển"}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. METHODOLOGICAL TAXONOMY ATLAS (Full-width grid) */}
        <section id="taxonomy" className="px-4 sm:px-8 xl:px-12 py-16 border-b border-slate-800/80 bg-[#0A0F1D]">
          <div className="w-full max-w-[1720px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-2">
                  Systematic Methodological Classification
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  {isEn ? "Domain Atlas of Research Traditions" : "Bản đồ 6 Phân khu Phương pháp luận Nghiên cứu"}
                </h2>
              </div>
              <Link
                href={`/?lang=${languageMode}`}
                className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5"
              >
                <span>
                  {isEn
                    ? `Explore all ${stats.termsCount.toLocaleString("en-US")} terms & ${stats.acronymsCount.toLocaleString("en-US")} acronyms`
                    : `Khám phá toàn bộ ${stats.termsCount.toLocaleString("vi-VN")} thuật ngữ & ${stats.acronymsCount.toLocaleString("vi-VN")} từ viết tắt`}
                </span>
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DOMAIN_ATLAS.map((cluster) => (
                <div
                  key={cluster.code}
                  className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-slate-800 text-blue-300 border border-slate-700">
                        CLUSTER {cluster.code}
                      </span>
                      <Compass size={18} className="text-blue-400" />
                    </div>
                    <h3 className="font-serif font-bold text-xl text-white mb-2">
                      {isEn ? cluster.titleEn : cluster.titleVi}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                      {isEn ? cluster.descEn : cluster.descVi}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                      {isEn ? "Representative Concepts:" : "Khái niệm tiêu biểu:"}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cluster.terms.map((tItem) => (
                        <Link
                          key={tItem.id}
                          href={`/?term=${tItem.id}&lang=${languageMode}`}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-950 text-slate-300 hover:text-blue-300 hover:bg-blue-950/40 border border-slate-800 transition"
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

        {/* 4. SCHOLARLY INTEGRITY & Q1 STANDARDS (Full-width grid) */}
        <section id="rigor" className="px-4 sm:px-8 xl:px-12 py-16 border-b border-slate-800/80 bg-[#070B14]">
          <div className="w-full max-w-[1720px] mx-auto">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-2">
                Scholarly Rigor & Provenance
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                {isEn ? "Guarantees that set this lexicon apart" : "4 Trụ cột Thẩm định Học thuật Nghiêm cẩn"}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                {isEn
                  ? "Every definition, cutoff, and citation is audited against primary sources to prevent AI hallucinations and textbook inaccuracies."
                  : "Mọi mục từ đều được đối chiếu trực tiếp với bài báo sáng lập gốc nhằm ngăn ngừa các lỗi sai khái niệm, định kiến dịch thuật và nguồn trích dẫn bịa đặt."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800/60 text-blue-400 flex items-center justify-center mb-5">
                    <BookMarked size={22} />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-white mb-2">
                    {isEn ? "100% Verified Seminal Citations" : "100% Truy nguyên Nguồn gốc Gốc"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {isEn
                      ? "Direct attribution to founding works (Cronbach & Meehl, Campbell & Stanley, Pearl, Hair, Hayes) with verified DOIs."
                      : "Gắn liền với công trình khai sinh (Cronbach & Meehl, 1955; Pearl, 2009; Hair et al., 2022; Hayes, 2022) kèm DOI hợp lệ."}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-blue-400">
                  APA 7th · BibTeX · RIS
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-800/60 text-emerald-400 flex items-center justify-center mb-5">
                    <Layers size={22} />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-white mb-2">
                    {isEn ? "Modern Q1 Statistical Cutoffs" : "Cập nhật Tiêu chuẩn Q1 Mới nhất"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {isEn
                      ? "Modern thresholds: Lee et al. (2022) tF F ≥ 104.7, Franke & Sarstedt (2019) HTMT bootstrap CI, and PRISMA 2020."
                      : "Ngưỡng kiểm định hiện đại: tF F ≥ 104.7 (Lee et al., 2022), khoảng tin cậy HTMT, PLSpredict, và PRISMA 2020."}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-emerald-400">
                  Current Empirical Cutoffs
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-800/60 text-amber-400 flex items-center justify-center mb-5">
                    <AlertTriangle size={22} />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-white mb-2">
                    {isEn ? "Reviewer Pitfall Preventions" : "Cảnh báo Lỗi Phản biện Phổ biến"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {isEn
                      ? "Identifies critical design flaws: mediator overcontrolling in DAGs, cross-sectional mediation bias, or weak IV instruments."
                      : "Chỉ rõ các bẫy tử huyệt: kiểm soát nhầm trung gian trong DAGs, thiên lệch trung gian cắt ngang, hay công cụ yếu."}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-amber-400">
                  Desk-Reject Defense
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-800/60 text-indigo-400 flex items-center justify-center mb-5">
                    <Globe size={22} />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-white mb-2">
                    {isEn ? "Bilingual & Monolingual Editions" : "Chuẩn hóa Thuật ngữ Song ngữ"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {isEn
                      ? "Switch seamlessly between the Bilingual Vietnamese–English Edition and the pure Monolingual Academic English Edition."
                      : "Chuyển đổi linh hoạt giữa Ấn bản Song ngữ Anh – Việt và Ấn bản Tiếng Anh Học thuật chuyên biệt cho bài báo quốc tế."}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-indigo-400">
                  Bilingual VI–EN & Monolingual EN
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FULL-WIDTH CALL TO ACTION FOOTER */}
        <footer className="px-4 sm:px-8 xl:px-12 py-12 bg-slate-950 text-slate-400 border-t border-slate-800">
          <div className="w-full max-w-[1720px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {isEn ? "Ready to dive into the full Lexicon?" : "Sẵn sàng tra cứu toàn bộ Từ điển?"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isEn
                  ? `Full-text search across ${stats.termsCount.toLocaleString("en-US")} terms and ${stats.acronymsCount.toLocaleString("en-US")} acronyms.`
                  : `Tra cứu toàn văn trên ${stats.termsCount.toLocaleString("vi-VN")} thuật ngữ và ${stats.acronymsCount.toLocaleString("vi-VN")} từ viết tắt.`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/?lang=${languageMode}`}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition flex items-center gap-2 shadow-lg shadow-blue-900/40"
              >
                <BookOpen size={16} />
                <span>{isEn ? "Enter Dictionary Workspace" : "Mở Không gian Tra cứu"}</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/hall-of-fame"
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-sm font-medium transition flex items-center gap-2"
              >
                <Trophy size={16} className="text-amber-400" />
                <span>{isEn ? "Hall of Fame" : "Bảng Vinh danh"}</span>
              </Link>
            </div>
          </div>

          <div className="w-full max-w-[1720px] mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div>
              © {new Date().getFullYear()} Research Methodology Lexicon ·{" "}
              <a href="https://vnresearch-dictionary.vercel.app" className="text-slate-300 hover:underline">
                vnresearch-dictionary.vercel.app
              </a>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/" className="hover:text-white transition">Từ điển (/)</Link>
              <Link href="/home" className="hover:text-white transition">Trang chủ (/home)</Link>
              <Link href="/gioi-thieu" className="hover:text-white transition">Giới thiệu (/gioi-thieu)</Link>
              <Link href="/hall-of-fame" className="hover:text-white transition">Vinh danh Học giả</Link>
              <Link href="/my-contributions" className="hover:text-white transition">Đóng góp của tôi</Link>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
