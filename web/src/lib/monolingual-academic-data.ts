import { MethodologyTerm, AcademicAcronym } from "./types";

/**
 * Giao diện hiển thị đa ngôn ngữ (UI Translations)
 */
export const UI_I18N = {
  vi: {
    app_title: "Từ điển Thuật ngữ Phương pháp Nghiên cứu Khoa học",
    edition_badge: "Anh - Việt",
    edition_btn_vi: "🇻🇳 Anh - Việt",
    edition_btn_en: "🌐 English",
    tagline: "Từ điển học thuật song ngữ Anh - Việt chuẩn mực cho nghiên cứu sinh & giảng viên",
    search_placeholder: "Tra cứu Anh - Việt (nhấn '/' để tìm)...",
    tab_all: "Tất cả",
    tab_terms: "Thuật ngữ",
    tab_acronyms: "Viết tắt",
    tab_saved: "Đã lưu",
    terms_count: "mục từ",
    empty_search_title: "Không tìm thấy thuật ngữ phù hợp",
    empty_search_desc: "Hãy thử từ khóa không dấu hoặc tìm từ viết tắt.",
    empty_saved_desc: "Bạn chưa đánh dấu thuật ngữ nào. Hãy bấm biểu tượng Bookmark trên mục từ để lưu vào đây!",
    mobile_tab_list: "Tra cứu",
    mobile_tab_detail: "Nội dung Mục từ",
    exit_zen: "Thoát chế độ Zen (Esc)",
    collapse_sidebar: "Thu gọn danh sách (Ctrl + B)",
    expand_sidebar: "Mở danh sách từ (Ctrl + B)",
    font_decrease: "Giảm cỡ chữ",
    font_increase: "Tăng cỡ chữ",
    mode_light: "Chuyển sang chế độ Sáng",
    mode_dark: "Chuyển sang chế độ Tối",
    zen_tooltip: "Chế độ đọc tập trung Zen Mode (Phím F)",
    print_tooltip: "In mục từ ra giấy khổ A4 (Ctrl + P)",
    feedback_button: "Góp ý",
    feedback_tooltip: "Đóng góp ý kiến hoặc bổ sung thuật ngữ",
    login_button: "Đăng nhập",
    login_tooltip: "Đăng nhập Google để đồng bộ thuật ngữ đã lưu lên đám mây",
    logout_tooltip: "Đăng xuất tài khoản Google",
    pronounce_button: "Phát âm",
    pronounce_tooltip: "Nghe phát âm chuẩn giọng bản xứ (Web Speech API)",
    share_button: "Chia sẻ",
    share_copied: "Đã chép link",
    cite_button: "Trích dẫn",
    cite_tooltip: "Xuất trích dẫn APA 7th, BibTeX và file RIS",
    save_button: "Lưu từ",
    saved_button: "Đã lưu",
    save_tooltip_add: "Lưu thuật ngữ vào danh sách cá nhân",
    save_tooltip_remove: "Bỏ lưu thuật ngữ này",
    sec_definition: "Bản chất & Định nghĩa Cốt lõi",
    sec_benchmarks: "Ngưỡng Thực nghiệm & Tiêu chuẩn Phán quyết (Empirical Benchmarks)",
    sec_pitfalls: "Cạm bẫy Phương pháp luận & Điểm Đỏ Phản biện (Methodological Pitfalls)",
    sec_debates: "Tranh luận Học thuật & Trường phái",
    sec_literature: "Nguồn Trích Dẫn Học Thuật Uy Tín",
    sec_variants: "Các Thành tố Trực thuộc & Biến thể Đo lường",
    sec_acronym_purpose: "Bản chất & Ứng dụng trong Nghiên cứu",
    sec_acronym_benchmark: "Ngưỡng Chấp Nhận & Tiêu Chuẩn Thực Nghiệm",
    copy_tooltip: "Sao chép nội dung này",
    copied_label: "Đã chép",
    seminal_paper_label: "Bài báo gốc kinh điển:",
    textbook_apa_label: "Sách giáo khoa trích dẫn (APA 7th):",
    concept_level_badge: "Khái niệm Thiết kế",
    acronym_badge: "Thuật ngữ Viết tắt Học thuật",
    switch_lang_tooltip: "Chuyển sang ấn bản tiếng Anh thuần túy (English - English)",
    citation_modal_title: "Xuất Trích Dẫn Học Thuật (Citation)",
    citation_tab_apa: "Chuẩn APA 7th (Word / PDF)",
    citation_tab_bibtex: "BibTeX (LaTeX / Overleaf)",
    citation_in_text: "Trích dẫn trong bài (In-text citation)",
    citation_references: "Danh mục Tài liệu tham khảo (APA 7th Reference)",
    citation_bibtex_src: "Mã nguồn BibTeX",
    citation_footer_tools: "Hỗ trợ Zotero, Mendeley, EndNote & Overleaf",
    citation_download_ris: "Tải file .RIS (Zotero)",
    citation_done: "Xong",
    feedback_modal_title: "Góp ý & Báo lỗi Học thuật",
    feedback_active_term: "Đang đóng góp cho:",
    feedback_general_desc: "Cùng chung tay hoàn thiện từ điển nghiên cứu khoa học",
    feedback_type_label: "Loại góp ý",
    feedback_type_correction: "Sửa định nghĩa",
    feedback_type_missing: "Thiếu thuật ngữ",
    feedback_type_other: "Góp ý khác",
    feedback_detail_label: "Nội dung chi tiết",
    feedback_detail_placeholder: "Mô tả lỗi thuật ngữ, nguồn tài liệu kinh điển cần bổ sung, hoặc đề xuất bản dịch chuẩn xác hơn...",
    feedback_email_label: "Email của bạn (không bắt buộc)",
    feedback_email_hint: "Để ban biên tập có thể gửi lời cảm ơn và thông báo khi thuật ngữ được phê duyệt.",
    feedback_cancel: "Hủy",
    feedback_submit: "Gửi góp ý",
    feedback_submitting: "Đang gửi...",
    feedback_success_title: "Cảm ơn đóng góp của bạn!",
    feedback_success_desc: "Ý kiến của bạn đã được ghi nhận. Ban biên tập sẽ rà soát và cập nhật trong các phiên bản tiếp theo."
  },
  en: {
    app_title: "Research Methodology Lexicon",
    edition_badge: "English Edition",
    edition_btn_vi: "🇻🇳 Bilingual",
    edition_btn_en: "🌐 English Only",
    tagline: "Standard International Academic Lexicon for Doctoral Researchers & Social Scientists",
    search_placeholder: "Search methodology terms & acronyms (press '/' to focus)...",
    tab_all: "All",
    tab_terms: "Terms",
    tab_acronyms: "Acronyms",
    tab_saved: "Saved",
    terms_count: "entries",
    empty_search_title: "No matching terms found",
    empty_search_desc: "Try searching with keywords, authors, or common acronyms.",
    empty_saved_desc: "You haven't bookmarked any terms yet. Click the Bookmark icon on any entry to save it here!",
    mobile_tab_list: "Browse",
    mobile_tab_detail: "Term Detail",
    exit_zen: "Exit Zen Mode (Esc)",
    collapse_sidebar: "Collapse Sidebar (Ctrl + B)",
    expand_sidebar: "Expand Sidebar (Ctrl + B)",
    font_decrease: "Decrease font size",
    font_increase: "Increase font size",
    mode_light: "Switch to Light Mode",
    mode_dark: "Switch to Dark Mode",
    zen_tooltip: "Focus Zen Mode (Press F)",
    print_tooltip: "Print A4 layout (Ctrl + P)",
    feedback_button: "Feedback",
    feedback_tooltip: "Submit methodological feedback or term corrections",
    login_button: "Sign in",
    login_tooltip: "Sign in with Google to sync bookmarks across devices",
    logout_tooltip: "Sign out Google account",
    pronounce_button: "Pronounce",
    pronounce_tooltip: "Listen to standard native pronunciation (Web Speech API)",
    share_button: "Share",
    share_copied: "Link copied",
    cite_button: "Cite",
    cite_tooltip: "Export APA 7th, BibTeX, and RIS citations",
    save_button: "Save",
    saved_button: "Saved",
    save_tooltip_add: "Save term to personal notebook",
    save_tooltip_remove: "Remove term from saved list",
    sec_definition: "Core Conceptual Definition",
    sec_benchmarks: "Empirical Benchmarks & Decision Thresholds",
    sec_pitfalls: "Methodological Pitfalls & Reviewer Red Flags",
    sec_debates: "Paradigm Debates & Epistemological Stance",
    sec_literature: "Seminal Literature & APA 7th References",
    sec_variants: "Sub-dimensions & Measurement Variants",
    sec_acronym_purpose: "Core Research Purpose & Application",
    sec_acronym_benchmark: "Empirical Standards & Diagnostic Benchmarks",
    copy_tooltip: "Copy this section",
    copied_label: "Copied",
    seminal_paper_label: "Seminal Landmark Publication:",
    textbook_apa_label: "Foundational Textbook Citation (APA 7th):",
    concept_level_badge: "Design Concept",
    acronym_badge: "Academic Acronym",
    switch_lang_tooltip: "Switch to Bilingual Vietnamese - English Edition",
    citation_modal_title: "Export Academic Citation",
    citation_tab_apa: "APA 7th Standard (Word / PDF)",
    citation_tab_bibtex: "BibTeX (LaTeX / Overleaf)",
    citation_in_text: "In-Text Citation",
    citation_references: "References List Entry (APA 7th)",
    citation_bibtex_src: "BibTeX Source Code",
    citation_footer_tools: "Compatible with Zotero, Mendeley, EndNote & Overleaf",
    citation_download_ris: "Download .RIS (Zotero)",
    citation_done: "Done",
    feedback_modal_title: "Academic Feedback & Suggestions",
    feedback_active_term: "Contributing feedback for:",
    feedback_general_desc: "Help improve and refine this scholarly methodology lexicon",
    feedback_type_label: "Feedback Category",
    feedback_type_correction: "Refine definition",
    feedback_type_missing: "Missing term",
    feedback_type_other: "Other feedback",
    feedback_detail_label: "Detailed Feedback",
    feedback_detail_placeholder: "Describe methodological nuances, missing seminal literature, or proposed academic refinements...",
    feedback_email_label: "Your Email (optional)",
    feedback_email_hint: "Allows the editorial board to follow up and notify you upon review.",
    feedback_cancel: "Cancel",
    feedback_submit: "Submit Feedback",
    feedback_submitting: "Submitting...",
    feedback_success_title: "Thank you for your academic contribution!",
    feedback_success_desc: "Your feedback has been logged. The editorial committee will review it for upcoming lexicon revisions."
  }
};

/**
 * Bản dịch Chuyên ngành sang tiếng Anh chuẩn tắc
 */
export const DOMAIN_TRANSLATIONS: Record<string, string> = {
  "Phương pháp Định lượng": "Quantitative Methodology",
  "Phương pháp Định tính": "Qualitative Methodology",
  "Đo lường & Thang đo": "Measurement & Psychometrics",
  "Tâm lý học": "Psychology & Behavioral Sciences",
  "Thiết kế Thực nghiệm": "Experimental Design",
  "Kinh tế lượng": "Econometrics",
  "Quan hệ Nhân quả": "Causal Inference",
  "Khoa học Hành vi": "Behavioral Sciences",
  "Khảo sát & Chọn mẫu": "Survey Research & Sampling",
  "Hệ hình Nghiên cứu": "Research Paradigms",
  "Triết học Khoa học": "Philosophy of Science",
  "Phương pháp Hỗn hợp": "Mixed Methods Research",
  "Nghiên cứu Định tính": "Qualitative Research",
  "Thiết kế Nghiên cứu": "Research Design",
  "Phỏng vấn & Quan sát": "Interview & Fieldwork",
  "PLS-SEM": "PLS-SEM",
  "CB-SEM": "CB-SEM",
  "Phân tích Đa biến": "Multivariate Analysis",
  "Thang đo & Đo lường": "Scale Development & Psychometrics",
  "Mô hình SEM": "Structural Equation Modeling",
  "Từ viết tắt": "Academic Acronym",
  "Psychometrics & SEM": "Psychometrics & SEM",
  "Causal Inference & Econometrics": "Causal Inference & Econometrics",
  "Experimental Design & Medicine": "Experimental Design & Medicine",
  "Systematic Reviews & Meta-Analysis": "Systematic Reviews & Meta-Analysis",
  "Qualitative & Mixed Methods": "Qualitative & Mixed Methods"
};

/**
 * Ngân hàng Định nghĩa Chuẩn Học thuật Quốc tế (Monolingual English Academic Definitions)
 * Được biên soạn trực tiếp theo Creswell (2023), Hair et al. (2018), DeVellis (2016), Kline (2023)
 */
export const MONOLINGUAL_TERMS_EN: Record<string, {
  core_definition: string;
  benchmarks?: string;
  pitfalls?: string;
  paradigm_debates?: string;
  domain_tags?: string[];
}> = {
  "construct-validity": {
    "core_definition": "The degree to which an operational instrument, test, or multi-item scale accurately represents and measures the unobservable theoretical construct it was designed to evaluate, without confounding variance from extraneous traits.",
    "benchmarks": "Convergent Validity: Average Variance Extracted (AVE) > 0.50, Composite Reliability (CR) > 0.70, Outer factor loadings > 0.708. Discriminant Validity: Square root of AVE higher than inter-construct correlations (Fornell-Larcker criterion) or Heterotrait-Monotrait ratio (HTMT) < 0.85 (conservative threshold) or < 0.90.",
    "pitfalls": "A common fallacy is confusing Reliability with Validity. An instrument can possess near-perfect reliability (Cronbach's alpha > 0.90) yet completely lack construct validity if it measures the wrong underlying phenomenon.",
    "paradigm_debates": "Quantitative research deconstructs construct validity into convergent and discriminant facets through psychometric matrices. Qualitative paradigms substitute statistical validity with Lincoln & Guba's (1985) trustworthiness, authenticity, and credibility criteria.",
    "domain_tags": [
      "Quantitative Methodology",
      "Measurement & Psychometrics",
      "Psychology"
    ]
  },
  "internal-validity": {
    "core_definition": "The extent to which an observed empirical relationship warrants a causal conclusion that the independent variable (IV) directly produced the change in the dependent variable (DV), free from confounding extraneous rival explanations.",
    "benchmarks": "Requires rigorous control of Campbell & Stanley's (1963) eight classic threats: history, maturation, testing effects, instrumentation decay, statistical regression to the mean, selection bias, experimental mortality (attrition), and selection-maturation interactions.",
    "pitfalls": "Asserting causality based exclusively on single-wave cross-sectional survey designs without experimental manipulation, longitudinal panels, or econometric instrumental variable controls.",
    "paradigm_debates": "Laboratory randomized trials maximize internal validity through sterile isolation, but frequently suffer diminished external validity (ecological generalizability to real-world complexities).",
    "domain_tags": [
      "Experimental Design",
      "Econometrics",
      "Causal Inference"
    ]
  },
  "external-validity": {
    "core_definition": "The degree to which empirical research findings can be generalized across diverse populations, settings, times, and operational measures beyond the immediate experimental sample.",
    "benchmarks": "Demonstrated through multi-site replications, population-representative probabilistic sampling, and boundary-condition robustness checks across heterogeneous demographic strata.",
    "pitfalls": "Over-generalizing findings derived from convenient student samples (WEIRD populations) to broader business executives or international emerging market contexts.",
    "paradigm_debates": "Statistical generalization (inferring sample-to-population parameters in quantitative surveys) stands fundamentally distinct from analytical generalization (developing overarching theoretical models from qualitative case studies as formulated by Yin, 2014).",
    "domain_tags": [
      "Research Design",
      "Sampling Theory",
      "Methodological Foundations"
    ]
  },
  "endogeneity": {
    "core_definition": "A severe econometric violation occurring when an explanatory variable is correlated with the structural error term in a regression model, biasing coefficient estimates and destroying causal inferences.",
    "benchmarks": "Diagnosed via Durbin-Wu-Hausman endogeneity test (p < 0.05 indicates endogeneity requiring correction). Instrumental variables must satisfy the Relevance condition (first-stage F-statistic > 10, or Stock-Yogo critical value > 16.38) and Exogeneity (Hansen J / Sargan overidentification test p > 0.05).",
    "pitfalls": "Employing weak instruments that inflate standard errors worse than ordinary least squares (OLS), or failing to address unobserved omitted variable bias and simultaneity.",
    "paradigm_debates": "Top-tier economics, finance, and management journals (e.g., SMJ, JAP, JMR) now systematically reject empirical cross-sectional papers lacking formal identification strategies (IV, 2SLS, GMM, or panel fixed-effects).",
    "domain_tags": [
      "Econometrics",
      "Causal Inference",
      "Quantitative Modeling"
    ]
  },
  "common-method-bias": {
    "core_definition": "Spurious variance attributable to the measurement method rather than the constructs the measures represent, typically arising when independent and dependent variables are gathered from identical respondents in a single cross-sectional survey.",
    "benchmarks": "Procedural remedies: temporal or psychological separation of predictors and criterion variables. Statistical tests: Harman's single-factor test (total variance explained by first unrotated factor must be < 50%), and preferably marker variable techniques or ULMC (Unmeasured Latent Marker Construct in SEM).",
    "pitfalls": "Relying solely on Harman's single-factor test, which is universally regarded by leading Q1 methodologists as outdated and insufficiently sensitive to detect severe common method variance.",
    "paradigm_debates": "While Podsakoff et al. argue CMB severely inflates or deflates structural path coefficients, Spector contends method variance is often exaggerated and rarely invalidates substantively robust theoretical relationships.",
    "domain_tags": [
      "Survey Methodology",
      "Psychometrics",
      "Multivariate Analysis"
    ]
  },
  "triangulation": {
    "core_definition": "The strategic combination of multiple theories, data sources, investigators, or methodological techniques to investigate the same empirical phenomenon, thereby neutralizing individual methodological biases.",
    "benchmarks": "Denzin's (1978) four fundamental modalities: (1) Data triangulation (time, space, persons), (2) Investigator triangulation, (3) Theory triangulation, and (4) Methodological triangulation (between-method or within-method).",
    "pitfalls": "Assuming triangulation automatically eliminates all bias; combining two deeply flawed methods yields cumulative error rather than convergent validity.",
    "paradigm_debates": "Positivists utilize triangulation to converge upon single objective truths; constructivists employ triangulation to uncover complementary, multifaceted layers of subjective reality.",
    "domain_tags": [
      "Mixed Methods Research",
      "Qualitative Methodology",
      "Epistemology"
    ]
  },
  "moderating-variable": {
    "core_definition": "A qualitative or quantitative variable that alters the direction, strength, or functional form of the relationship between an independent variable and a dependent variable (answering 'When?' or 'For whom?').",
    "benchmarks": "In linear regression: the interaction term (X * M) must demonstrate statistically significant incremental variance (ΔR² significant, p < 0.05). In SEM: multigroup analysis (p-value of path differences < 0.05). Continuous interactions require mean-centering to reduce non-essential multicollinearity.",
    "pitfalls": "Interpreting primary main effects without conditioning upon the moderator when interaction terms are statistically significant.",
    "paradigm_debates": "Baron & Kenny's (1986) ANOVA framework versus modern continuous conditional process models (Hayes PROCESS Macro Model 1) and Johnson-Neyman spotlight/floodlight techniques.",
    "domain_tags": [
      "Multivariate Statistics",
      "Hypothesis Testing",
      "Causal Modeling"
    ]
  },
  "mediating-variable": {
    "core_definition": "An intervening mechanism through which an antecedent focal variable transmits its causal impact to an outcome variable (answering 'How?' or 'Why?' an effect occurs).",
    "benchmarks": "Indirect effect (a * b) must be evaluated via non-parametric bootstrapping with at least 5,000 resamples; the 95% bias-corrected confidence interval must not contain zero.",
    "pitfalls": "Relying on the outdated Sobel test, which incorrectly presumes a normal distribution of the indirect product term (a * b).",
    "paradigm_debates": "The historic Baron & Kenny 4-step causal steps approach (requiring a significant total effect) has been comprehensively replaced by Preacher & Hayes (2004, 2008) modern bootstrap frameworks.",
    "domain_tags": [
      "Structural Equation Modeling",
      "Psychometrics",
      "Causal Modeling"
    ]
  },
  "postpositivism": {
    "core_definition": "An epistemological stance asserting that an objective reality exists independent of human cognition, but can only be known probabilistically and imperfectly due to human perceptual limitations and measurement error.",
    "benchmarks": "Prioritizes empirical hypothesis testing, rigorous falsification (Karl Popper), quantitative measurement error estimation, and the rejection of dogmatic absolute certainty.",
    "pitfalls": "Assuming postpositivism claims absolute, infallible certainty; authentic postpositivists explicitly acknowledge fallibility and stochastic uncertainty.",
    "paradigm_debates": "Stands between naive classical positivism (which claims direct access to unmediated sensory truth) and radical constructivism (which denies the existence of any mind-independent objective reality).",
    "domain_tags": [
      "Philosophy of Science",
      "Research Paradigms",
      "Epistemology"
    ]
  },
  "social-constructivism": {
    "core_definition": "An interpretivist paradigm asserting that individuals construct subjective, multifaceted meanings of their experiences through social interactions and historical/cultural contexts.",
    "benchmarks": "Assessed via qualitative trustworthiness criteria (credibility, transferability, dependability, conformability) established by Lincoln & Guba (1985).",
    "pitfalls": "Attempting to enforce quantitative reliability metrics (e.g., inter-rater kappa scores) upon deeply emergent, interpretative qualitative phenomenological data.",
    "paradigm_debates": "Positivists critique constructivism for potential solipsism and lack of replicability; constructivists counter that positivism ignores contextual nuance and human agency.",
    "domain_tags": [
      "Qualitative Methodology",
      "Epistemology",
      "Interpretive Research"
    ]
  },
  "pragmatism": {
    "core_definition": "A philosophical paradigm focused on 'what works' in practice to address research problems, viewing truth as provisional and valuing consequences of inquiry over metaphysical commitments.",
    "benchmarks": "Foundational philosophical backbone for mixed methods research (Teddlie & Tashakkori, 2009; Creswell, 2023), integrating quantitative and qualitative strands iteratively.",
    "pitfalls": "Using pragmatism as an excuse for methodological sloppiness or haphazard combinations of incompatible data collection techniques without philosophical coherence.",
    "paradigm_debates": "Pragmatism bridges the paradigm wars between postpositivists and constructivists by legitimizing dialectical pluralism.",
    "domain_tags": [
      "Philosophy of Science",
      "Mixed Methods Research",
      "Pragmatism"
    ]
  },
  "convergent-design": {
    "core_definition": "A core mixed methods design wherein the researcher collects quantitative and qualitative data concurrently, analyzes both datasets independently, and merges the results to compare or validate findings.",
    "benchmarks": "Side-by-side joint display matrices comparing quantitative statistical patterns with qualitative textual quotes across matching conceptual themes (Creswell & Creswell, 2023).",
    "pitfalls": "Treating qualitative data as a mere decorative afterthought rather than conducting rigorous thematic analysis with equal epistemological weight.",
    "paradigm_debates": "Discrepancy resolution: what researchers must do when quantitative findings directly contradict qualitative narratives (convergence vs. divergence paradox).",
    "domain_tags": [
      "Mixed Methods Research",
      "Research Design",
      "Methodological Convergence"
    ]
  },
  "explanatory-sequential-design": {
    "core_definition": "A two-phase mixed methods design in which quantitative data collection and analysis are conducted first, followed by qualitative data collection to explain or elaborate upon significant statistical mechanisms or outlier cases.",
    "benchmarks": "Phase 1: Quantitative survey / experiment -> Selection of specific participants/cases -> Phase 2: In-depth qualitative interviews examining quantitative relationships.",
    "pitfalls": "Failing to explicitly link the qualitative sampling strategy directly to the quantitative statistical findings (e.g., sampling from extreme outliers or non-linear residuals).",
    "paradigm_debates": "Ensures quantitative rigor while securing rich phenomenological explanations of unexpected regression coefficients.",
    "domain_tags": [
      "Mixed Methods Research",
      "Sequential Design",
      "Research Strategy"
    ]
  },
  "exploratory-sequential-design": {
    "core_definition": "A two-phase mixed methods design starting with initial qualitative data collection to explore a novel phenomenon, followed by quantitative instrument development and statistical testing with a broader sample.",
    "benchmarks": "Phase 1: Qualitative interviews/focus groups -> Phase 2: Scale/item generation -> Phase 3: Psychometric survey testing (EFA, CFA, convergent/discriminant validity).",
    "pitfalls": "Generating quantitative scale items without grounded qualitative thematic coding or failing to conduct psychometric scale purification.",
    "paradigm_debates": "Essential for developing culturally contextualized measurement scales in emerging markets or under-theorized research domains.",
    "domain_tags": [
      "Mixed Methods Research",
      "Scale Development",
      "Exploratory Strategy"
    ]
  },
  "purposive-sampling": {
    "core_definition": "A non-probability sampling technique where participants are intentionally selected based on specific operational characteristics, expert knowledge, or criteria relevant to answering the research question.",
    "benchmarks": "Includes maximum variation sampling, extreme/deviant case sampling, critical case sampling, and homogenous sampling (Patton, 2015).",
    "pitfalls": "Conflating purposive sampling with haphazard convenience sampling (e.g., interviewing nearby acquaintances without methodological criteria).",
    "paradigm_debates": "Purposive sampling optimizes analytical information power (Malterud et al., 2016) rather than population-representative statistical generalizability.",
    "domain_tags": [
      "Qualitative Methodology",
      "Sampling Strategy",
      "Fieldwork"
    ]
  },
  "data-saturation": {
    "core_definition": "The methodological point in qualitative data collection and iterative analysis where no new conceptual properties, dimensions, or themes emerge from subsequent interviews or observations.",
    "benchmarks": "Documented through code saturation (no new codes generated, typically after 12-16 interviews in homogenous groups) and meaning saturation (deep nuances understood, Guest et al., 2020; Hennink & Kaiser, 2022).",
    "pitfalls": "Arbitrarily declaring saturation after a predetermined round of interviews without providing an explicit audit trail of thematic emergence.",
    "paradigm_debates": "Divergence between inductive code saturation (Grounded Theory) versus a priori thematic saturation in structured framework analysis.",
    "domain_tags": [
      "Qualitative Research",
      "Data Collection",
      "Trustworthiness"
    ]
  },
  "member-checking": {
    "core_definition": "A qualitative validation technique where data, analytical categories, interpretations, and conclusions are returned to participants for verification of authenticity and accuracy.",
    "benchmarks": "Conducting systematic respondent debriefing sessions or providing interview transcripts and conceptual summaries for formal participant feedback (Lincoln & Guba, 1985).",
    "pitfalls": "Allowing participants to redact critical quotes that reveal organizational dysfunctions solely due to subsequent political or career discomfort.",
    "paradigm_debates": "Positivists view participant verification with skepticism due to potential bias; interpretivists consider it the paramount criterion of credibility.",
    "domain_tags": [
      "Qualitative Methodology",
      "Validity & Rigor",
      "Field Research"
    ]
  },
  "reflexivity": {
    "core_definition": "The continuous process of self-critical reflection by the researcher regarding their background, values, theoretical predispositions, and interpersonal positionality throughout the research lifecycle.",
    "benchmarks": "Formally articulated via dedicated positionality statements and reflexive research journals documenting evolving interpretive assumptions.",
    "pitfalls": "Treating reflexivity as a superficial biographical disclosure rather than an active methodological audit of researcher bias.",
    "paradigm_debates": "Reflexivity explicitly refutes the positivist illusion of the detached, objective, value-neutral researcher.",
    "domain_tags": [
      "Qualitative Methodology",
      "Epistemology",
      "Researcher Positionality"
    ]
  },
  "grounded-theory": {
    "core_definition": "An inductive, iterative qualitative research methodology designed to construct an abstract conceptual theory grounded systematically within empirical data collected from participants.",
    "benchmarks": "Employs constant comparative analysis, theoretical sampling, and rigorous tripartite coding (Open, Axial, and Selective coding) until theoretical saturation is achieved.",
    "pitfalls": "Conducting descriptive qualitative interviews and labeling the paper 'Grounded Theory' without developing an overarching core theoretical model or theoretical sampling progression.",
    "paradigm_debates": "The epistemological divergence between Glaser's classical emergent objectivism, Strauss & Corbin's prescriptive systematic proceduralism, and Charmaz's constructivist grounded theory.",
    "domain_tags": [
      "Qualitative Methodology",
      "Epistemology",
      "Inductive Research"
    ]
  },
  "phenomenology": {
    "core_definition": "A qualitative methodology focused on describing the common meaning and universal essence of several individuals' lived experiences regarding a specific phenomenon or concept.",
    "benchmarks": "Requires Husserlian epoche (bracketing personal preconceptions), identifying significant statements, clustering into structural themes, and synthesizing textural descriptions.",
    "pitfalls": "Confusing descriptive phenomenology (Husserl) with interpretive hermeneutic phenomenology (Heidegger) without theoretical alignment.",
    "paradigm_debates": "The feasibility of pure bracketing versus the inevitability of interpretive hermeneutic pre-understandings (Gadamer).",
    "domain_tags": [
      "Qualitative Research",
      "Phenomenology",
      "Philosophy"
    ]
  },
  "case-study": {
    "core_definition": "An empirical inquiry that investigates a contemporary phenomenon in-depth and within its real-world context, especially when boundaries between phenomenon and context are not clearly evident.",
    "benchmarks": "Yin's (2018) triangulation protocols: multiple sources of evidence (interviews, documents, archival records, physical artifacts), case study database, and explicit chain of evidence.",
    "pitfalls": "Failing to define clear case boundaries (spatial, temporal, and organizational scope), leading to uncontrolled descriptive drift.",
    "paradigm_debates": "Positivist case study methodology (Yin, Eisenhardt) seeking analytical generalization versus interpretive case methodology (Stake) seeking particularistic insight.",
    "domain_tags": [
      "Qualitative Methodology",
      "Organizational Research",
      "Case Study"
    ]
  },
  "discriminant-validity-htmt": {
    "core_definition": "The degree to which a latent construct is empirically unique and captures phenomena not captured by other measures in the structural model, rigorously assessed via the Heterotrait-Monotrait ratio of correlations.",
    "benchmarks": "HTMT < 0.85 for conceptually distinct constructs; HTMT < 0.90 for closely related conceptual dimensions. The 95% bootstrap confidence interval of HTMT must not include 1.00.",
    "pitfalls": "Using the traditional Fornell-Larcker criterion, which Monte Carlo simulations (Henseler et al., 2015) proved systematically fails to detect discriminant validity violations under modern measurement scenarios.",
    "paradigm_debates": "Adoption of HTMT is now mandatory across all premier business and social science journals publishing PLS-SEM and CB-SEM empirical studies.",
    "domain_tags": [
      "PLS-SEM",
      "CB-SEM",
      "Psychometrics & Scales"
    ]
  },
  "convergent-validity-ave": {
    "core_definition": "The extent to which multiple indicators of a specific construct share a high proportion of variance in common, empirically measured through Average Variance Extracted (AVE).",
    "benchmarks": "AVE > 0.50 (indicating the construct explains more than 50% of the variance of its assigned indicators). Standardized factor loadings should be > 0.708 (so that loading squared > 0.50).",
    "pitfalls": "Retaining indicators with very low loadings (< 0.40) which drag the overall AVE below 0.50, thereby invalidating measurement convergence.",
    "paradigm_debates": "Fornell & Larcker (1981) established the 0.50 threshold. Hair et al. (2018) recommend deleting items with loadings between 0.40 and 0.70 only if removal increases AVE and Composite Reliability.",
    "domain_tags": [
      "Multivariate Analysis",
      "Structural Equation Modeling",
      "Scale Validation"
    ]
  },
  "reflective-vs-formative": {
    "core_definition": "Reflective models treat indicators as manifestations caused by the latent construct (interchangeable items, high collinearity expected). Formative models treat indicators as causal components defining the construct (non-interchangeable, collinearity must be low).",
    "benchmarks": "Reflective: evaluated via internal consistency (CR, alpha) and convergent validity (AVE > 0.50). Formative: evaluated via outer weights significance and multicollinearity (VIF < 3.0 or < 5.0).",
    "pitfalls": "Applying reflective metrics (like Cronbach's alpha) to formative constructs, which misjudges low inter-item correlation as poor reliability.",
    "paradigm_debates": "The ongoing debate over causal indicators versus composite models in structural equation modeling (Bollen vs. Henseler/Rigdon).",
    "domain_tags": [
      "Structural Equation Modeling",
      "Measurement Theory",
      "Psychometrics"
    ]
  },
  "multicollinearity-vif": {
    "core_definition": "A statistical phenomenon in multivariate models where two or more independent variables are highly linearly correlated, leading to inflated standard errors, unstable parameter estimates, and erroneous hypothesis rejections.",
    "benchmarks": "VIF < 3.0 (ideal threshold in modern PLS-SEM / Kock, 2015); VIF < 5.0 (standard acceptable threshold in regression / Hair et al., 2018); VIF > 10 indicates severe multicollinearity.",
    "pitfalls": "Ignoring multicollinearity when interpreting regression weights; high correlation can flip expected coefficients to opposite algebraic signs.",
    "paradigm_debates": "Distinguishing essential multicollinearity (true overlap in population constructs) from non-essential multicollinearity caused by uncentered interaction product terms.",
    "domain_tags": [
      "Econometrics",
      "Multivariate Statistics",
      "Regression Diagnostics"
    ]
  },
  "conditional-process-analysis": {
    "core_definition": "An analytical framework that integrates mediation and moderation simultaneously to examine the conditional indirect mechanisms through which an antecedent influences an outcome at varying levels of a moderating variable.",
    "benchmarks": "Evaluated using the Index of Moderated Mediation (Hayes, 2015, 2018); the 95% bootstrap confidence interval must exclude zero to confirm conditional mediation.",
    "pitfalls": "Subdividing samples into arbitrary median splits rather than running formal continuous conditional process models with full statistical power.",
    "paradigm_debates": "Replaced fragmented piecewise regressions with unified structural equation modeling and bootstrapping frameworks (PROCESS Macro Models 7, 8, 14, 58).",
    "domain_tags": [
      "Causal Modeling",
      "Mediation & Moderation",
      "Advanced Statistics"
    ]
  },
  "johnson-neyman-technique": {
    "core_definition": "A floodlight statistical technique that identifies the exact boundary values of a continuous moderator across which an independent variable's effect transitions between statistical significance and non-significance.",
    "benchmarks": "Graphically displays the conditional slope of X on Y across the entire continuum of moderator values with 95% confidence bands (Spiller et al., 2013).",
    "pitfalls": "Relying on arbitrary spotlight values (mean +/- 1 SD) which can obscure critical transitions occurring within standard operational ranges.",
    "paradigm_debates": "Endorsed by top marketing and consumer research journals (JCR, JMR) as the superior standard for reporting continuous interaction effects.",
    "domain_tags": [
      "Advanced Statistics",
      "Moderation Analysis",
      "Consumer Research"
    ]
  },
  "directed-acyclic-graphs-dags": {
    "core_definition": "A visual mathematical framework using nodes (variables) and directed arrows (causal paths) with no closed loops, used to rigorously identify confounding, selection bias, and minimal adjustment sets in causal inference.",
    "benchmarks": "Backdoor criterion and frontdoor adjustment algorithms (Pearl, 2009); isolates d-separation and colliders to prevent spurious conditioning.",
    "pitfalls": "Conditioning on a collider variable (a node caused by two other nodes), which inadvertently introduces spurious correlation and destroys internal validity.",
    "paradigm_debates": "Pearl's structural causal model (DAGs) versus Rubin's potential outcomes framework (counterfactuals) as rival/complementary causal languages.",
    "domain_tags": [
      "Causal Inference",
      "Epidemiology",
      "Econometrics"
    ]
  },
  "classical-test-theory-vs-irt": {
    "core_definition": "CTT assumes an observed score equals true score plus random error (X = T + E), with item properties dependent on the specific sample. IRT models individual item responses as a probabilistic function of latent trait ability and item parameters.",
    "benchmarks": "CTT: Cronbach's alpha > 0.70, Item-total correlation > 0.30. IRT: Item difficulty (b parameter), item discrimination (a parameter), and Item Information Curves (IIC).",
    "pitfalls": "Assuming test reliability is uniform across all scoring levels in CTT; IRT demonstrates reliability varies significantly across the latent trait spectrum.",
    "paradigm_debates": "CTT offers computational simplicity and widespread familiarity, while IRT provides sample-independent item calibration and adaptive testing capabilities.",
    "domain_tags": [
      "Psychometrics",
      "Scale Development",
      "Measurement Theory"
    ]
  },
  "mcdonalds-omega-vs-alpha": {
    "core_definition": "A psychometric comparison between Cronbach's Alpha (which strictly assumes tau-equivalence, where all items load equally) and McDonald's Omega (which accommodates congeneric models with unequal factor loadings).",
    "benchmarks": "McDonald's Omega Total and Hierarchical > 0.70 (exploratory) or > 0.80 (confirmatory). Alpha severely underestimates true reliability when loadings vary.",
    "pitfalls": "Exclusively reporting Cronbach's alpha when factor loadings are heterogeneous, violating the essential tau-equivalence mathematical assumption.",
    "paradigm_debates": "Leading psychometricians (Dunn et al., 2014; Hayes & Coutts, 2020) advocate replacing alpha entirely with McDonald's omega in top-tier empirical journals.",
    "domain_tags": [
      "Psychometrics",
      "Reliability Theory",
      "Scale Validation"
    ]
  },
  "scientific-realism-hunt": {
    "core_definition": "A philosophy of science in business and marketing championed by Shelby D. Hunt, asserting that theories can genuinely describe both observable and unobservable entities in an objective world.",
    "benchmarks": "Criteria: positive heuristic, empirical adequacy, explanatory power, and genuine reference to mind-independent entities.",
    "pitfalls": "Dismissing unobservable mental constructs (like brand equity or customer trust) as mere semantic fictions rather than real ontological phenomena.",
    "paradigm_debates": "Hunt's scientific realism fiercely opposed relativistic and post-modern anti-realist stances during the famous marketing paradigm debates.",
    "domain_tags": [
      "Philosophy of Science",
      "Marketing Theory",
      "Epistemology"
    ]
  },
  "resource-advantage-theory": {
    "core_definition": "An evolutionary, disequilibrium-provoking theory of competition developed by Hunt & Morgan, where firms utilize heterogeneous and imperfectly mobile resources to achieve competitive advantage.",
    "benchmarks": "Explains how market segment diversity, imperfect information, and reinvestment loops sustain superior financial performance.",
    "pitfalls": "Treating markets as static equilibrium systems (neoclassical microeconomics) rather than dynamic processes of knowledge discovery and innovation.",
    "paradigm_debates": "Integrates resource-based view (RBV), Austrian economics, and institutional theory against perfect competition neoclassical orthodoxy.",
    "domain_tags": [
      "Strategic Management",
      "Marketing Theory",
      "Resource-Based View"
    ]
  },
  "objective-hermeneutics": {
    "core_definition": "A German qualitative methodology developed by Ulrich Oevermann designed to reconstruct the objective latent structures of meaning in social texts through sequential micro-analysis.",
    "benchmarks": "Adheres to rigorous sequential analysis, detailed contextual bracketing, and extensive generation of interpretive alternatives for each text unit.",
    "pitfalls": "Rushing through interview transcripts with superficial thematic coding rather than conducting painstaking sentence-by-sentence structural reconstruction.",
    "paradigm_debates": "Rejects both subjective psychologism (authorial intent) and naive positivism, seeking reconstructive social structural laws.",
    "domain_tags": [
      "Qualitative Methodology",
      "Hermeneutics",
      "Sociological Analysis"
    ]
  },
  "qualitative-content-analysis-mayring": {
    "core_definition": "A systematic, rule-guided qualitative text analysis methodology that combines qualitative interpretation with structured category systems and quantitative frequency verification.",
    "benchmarks": "Standardized coding agenda with definitions, anchor examples, and explicit coding rules; inter-coder agreement evaluated via Cohen's Kappa > 0.75.",
    "pitfalls": "Applying unstructured, impressionistic coding without an explicit rule-based codebook and anchor examples.",
    "paradigm_debates": "Provides a methodical bridge between interpretative qualitative analysis and systematic quantitative content analysis.",
    "domain_tags": [
      "Qualitative Methodology",
      "Content Analysis",
      "Coding Systems"
    ]
  },
  "statistical-conclusion-validity-scc": {
    "core_definition": "The validity of inferences about whether two variables co-vary and the direction and magnitude of their co-variation, evaluated against statistical power and assumptions.",
    "benchmarks": "Requires statistical power > 0.80 (Cohen, 1988), alpha level control (p < 0.05), non-violated distributional assumptions, and reliable measurement instruments.",
    "pitfalls": "Running statistical tests on underpowered samples (small N), dramatically increasing Type II errors and producing unreplicable effect sizes.",
    "paradigm_debates": "One of the four foundational validity pillars of Cook & Campbell's (1979) classic validity typology.",
    "domain_tags": [
      "Statistical Foundations",
      "Validity Theory",
      "Quantitative Methods"
    ]
  },
  "regression-discontinuity-design-rdd": {
    "core_definition": "A quasi-experimental design where treatment assignment is determined entirely by whether a continuous assignment variable falls above or below a strict deterministic cutoff threshold.",
    "benchmarks": "Requires absence of manipulation around the cutoff (McCrary density test p > 0.05) and continuity of baseline covariates at the boundary.",
    "pitfalls": "Manipulating or sorting near the threshold, which introduces selection bias and invalidates quasi-random assignment.",
    "paradigm_debates": "Considered the gold standard of non-randomized causal identification in economics, rivaling randomized experiments in internal validity.",
    "domain_tags": [
      "Econometrics",
      "Causal Inference",
      "Quasi-Experimental Design"
    ]
  },
  "management-research-question-hierarchy": {
    "core_definition": "A systematic problem-solving framework that breaks high-level organizational issues into sequential hierarchical research questions: Management Dilemma -> Management Question -> Research Question -> Investigative Questions -> Measurement Questions.",
    "benchmarks": "Demonstrated through unbroken logical alignment across all five vertical tiers (Cooper & Schindler, 2022).",
    "pitfalls": "Directly asking executives the high-level management dilemma in a survey rather than developing operationalized measurement questions.",
    "paradigm_debates": "Vital pedagogical framework ensuring business doctoral dissertations address substantive organizational dilemmas rather than theoretical trivia.",
    "domain_tags": [
      "Research Design",
      "Management Research",
      "Dissertation Methodology"
    ]
  },
  "total-survey-error-tse": {
    "core_definition": "A comprehensive conceptual framework representing all sources of bias and variance that can compromise survey estimates, divided into Measurement Errors and Representation/Sampling Errors.",
    "benchmarks": "Deconstructs error into construct validity, measurement error, processing error, coverage error, sampling error, and non-response error (Groves et al., 2009).",
    "pitfalls": "Focusing exclusively on reducing sampling error by increasing sample size while completely neglecting rampant measurement error or non-response bias.",
    "paradigm_debates": "Provides survey researchers with a balanced portfolio optimization model between costs and multi-dimensional error components.",
    "domain_tags": [
      "Survey Methodology",
      "Sampling Theory",
      "Error Modeling"
    ]
  },
  "measurement-invariance": {
    "core_definition": "A psychometric property demonstrating that a measurement instrument assesses the same theoretical construct in identical ways across different demographic, cultural, or temporal groups.",
    "benchmarks": "Hierarchical testing in Multigroup CFA: (1) Configural Invariance (equal factor structure), (2) Metric Invariance (equal factor loadings, ΔCFI < 0.01), (3) Scalar Invariance (equal intercepts, required for mean comparisons). In PLS-SEM: MICOM protocol (Henseler et al., 2016).",
    "pitfalls": "Comparing construct latent means across different countries or genders without first establishing scalar/strong measurement invariance.",
    "paradigm_debates": "Mandatory prerequisite for cross-cultural, longitudinal, and multigroup empirical comparisons in top international journals.",
    "domain_tags": [
      "Psychometrics",
      "Multigroup Analysis",
      "Cross-Cultural Research"
    ]
  },
  "gioia-methodology": {
    "core_definition": "A systematic inductive qualitative research methodology designed to bring quantitative-level rigor to qualitative analysis through structured 1st-order informant terms, 2nd-order theoretical themes, and overarching aggregate dimensions.",
    "benchmarks": "Produces a formal Gioia Data Structure diagram illustrating the transparent analytical trail from raw interview quotes to aggregate theoretical concepts (Gioia et al., 2013).",
    "pitfalls": "Claiming to use Gioia while omitting the explicit data structure diagram or presenting superficial first-order codes without theoretical distillation.",
    "paradigm_debates": "Extensively adopted in top management journals (AMJ, ASQ) to overcome traditional reviewer skepticism regarding qualitative rigor.",
    "domain_tags": [
      "Qualitative Methodology",
      "Grounded Theory",
      "Management Studies"
    ]
  },
  "thematic-analysis": {
    "core_definition": "A widely utilized qualitative method for identifying, analyzing, organizing, describing, and reporting patterns (themes) within a complex qualitative dataset.",
    "benchmarks": "Adheres to Braun & Clarke's (2006) 6-phase framework: familiarization, initial code generation, searching for themes, reviewing themes, defining and naming themes, and producing the analytical report.",
    "pitfalls": "Treating interview questions as automatic themes rather than conducting deep interpretive semantic and latent coding across the entire corpus.",
    "paradigm_debates": "Reflexive Thematic Analysis (Braun & Clarke) rejects inter-coder reliability scores as incompatible with qualitative subjectivity, whereas Codebook/Coding Reliability TA actively utilizes coding consensus.",
    "domain_tags": [
      "Qualitative Methodology",
      "Text Analysis",
      "Coding Systems"
    ]
  },
  "instrumental-variables": {
    "core_definition": "An econometric technique that addresses endogeneity by introducing an instrument (Z) correlated with the endogenous explanatory variable (X) but uncorrelated with the structural error term (u).",
    "benchmarks": "Instrument Relevance: First-stage F-statistic > 10 (or Stock-Yogo critical value > 16.38). Instrument Exogeneity: Tested via Hansen J / Sargan overidentification test (p > 0.05).",
    "pitfalls": "Relying on weak instruments which dramatically inflate standard errors and produce estimates more biased than ordinary OLS.",
    "paradigm_debates": "Finding genuinely exogenous and relevant instruments in business and management data is exceptionally challenging, prompting shifts toward natural experiments.",
    "domain_tags": [
      "Econometrics",
      "Causal Inference",
      "Identification Strategy"
    ]
  },
  "difference-in-differences": {
    "core_definition": "A quasi-experimental identification strategy that estimates causal effects by comparing the pre- and post-treatment changes in outcomes between a treated group and an untreated comparison group.",
    "benchmarks": "Crucial identification assumption: Parallel Trends Assumption (verified via dynamic event-study leads/lags regressions where pre-treatment coefficients are statistically indistinguishable from zero).",
    "pitfalls": "Applying classical two-way fixed effects (TWFE) when treatment timing is staggered across groups, which can yield negative weights and severely biased causal estimates (Callaway & Sant'Anna, 2021).",
    "paradigm_debates": "Modern econometric revolution in staggered DID estimators (Sun & Abraham, de Chaisemartin & D'Haultfoeuille, Callaway & Sant'Anna).",
    "domain_tags": [
      "Econometrics",
      "Quasi-Experimental Design",
      "Causal Modeling"
    ]
  },
  "propensity-score-matching": {
    "core_definition": "A statistical matching technique that conditions on observed baseline covariates by modeling the conditional probability of assignment to treatment (the propensity score), mimicking randomization.",
    "benchmarks": "Assessed via standardized mean differences (SMD < 0.10 across all matched covariates indicates adequate balance) and common support verification (Rosenbaum & Rubin, 1983).",
    "pitfalls": "Assuming PSM corrects for unobserved omitted variable bias; PSM only balances observed covariates and is powerless against unmeasured confounders.",
    "paradigm_debates": "King & Nielsen (2019) famously argued against PSM in favor of Mahalanobis distance or coarsened exact matching due to potential model dependence.",
    "domain_tags": [
      "Causal Inference",
      "Observational Studies",
      "Econometrics"
    ]
  },
  "systematic-literature-review": {
    "core_definition": "A rigorous, reproducible research method that systematically identifies, critically appraises, and synthesizes all relevant empirical evidence adhering to pre-specified eligibility criteria to answer explicit research questions.",
    "benchmarks": "Conducted according to PRISMA 2020 guidelines with registered protocols (PROSPERO), explicit Boolean search strings, dual independent screening, and standardized risk of bias assessments.",
    "pitfalls": "Conducting an impressionistic traditional narrative review and titling it 'Systematic Literature Review' without an audit trail, PRISMA flow diagram, or quality criteria.",
    "paradigm_debates": "Qualitative narrative synthesis versus quantitative meta-analytic pooling (effect size aggregation).",
    "domain_tags": [
      "Evidence Synthesis",
      "Literature Review",
      "Research Methodology"
    ]
  },
  "bibliometric-analysis": {
    "core_definition": "The quantitative application of mathematical and statistical methods to academic publications to analyze structural trends, intellectual landscapes, co-citation networks, and thematic evolutions.",
    "benchmarks": "Co-citation analysis, bibliographic coupling, keyword co-occurrence mapping (VOSviewer, Bibliometrix in R), and citation burst detection (Donthu et al., 2021).",
    "pitfalls": "Presenting raw automated software graphs without substantive qualitative theoretical interpretation of the underlying intellectual clusters.",
    "paradigm_debates": "Bibliometrics maps the sociology of publication networks, but does not substitute for deep critical synthesis of theoretical contributions.",
    "domain_tags": [
      "Information Science",
      "Literature Mapping",
      "Scientometrics"
    ]
  },
  "publication-bias": {
    "core_definition": "The systemic bias in scientific literature where studies reporting statistically significant or positive findings are far more likely to be published than studies with null or non-significant results (the 'file drawer problem').",
    "benchmarks": "Diagnosed via Funnel Plot asymmetry and formally tested using Egger's regression test (p < 0.05 indicates publication bias) and Begg's rank correlation test; corrected via trim-and-fill method.",
    "pitfalls": "Treating published effect sizes in meta-analyses as ground truth without testing and adjusting for publication bias.",
    "paradigm_debates": "Fuel for the replication crisis, driving the rapid adoption of Registered Reports and study preregistration across major scientific bodies.",
    "domain_tags": [
      "Meta-Analysis",
      "Evidence Synthesis",
      "Open Science"
    ]
  },
  "p-hacking": {
    "core_definition": "The collection and selective reporting of data until non-significant p-values achieve statistical significance (p < 0.05), through multiple testing, post-hoc subgroup analysis, or selective covariate adjustment.",
    "benchmarks": "Detected via p-curve analysis (Simonsohn et al., 2014); right-skewed p-curves indicate genuine evidentiary value, whereas flat or left-skewed curves indicate rampant p-hacking.",
    "pitfalls": "HARKing (Hypothesizing After Results are Known) and presenting exploratory data-mining findings as confirmatory hypothesis tests.",
    "paradigm_debates": "Drive toward Registered Reports, Open Science badges, and transparent disclosure of all experimental conditions and dropped observations.",
    "domain_tags": [
      "Research Ethics",
      "Statistical Rigor",
      "Open Science"
    ]
  },
  "heckman-selection-model": {
    "core_definition": "A two-stage econometric model designed to correct for sample selection bias in non-randomly selected samples (e.g., wage offers observed only for employed individuals).",
    "benchmarks": "Stage 1: Probit selection equation generating the Inverse Mills Ratio (IMR / Lambda). Stage 2: Outcome regression including Lambda; statistically significant Lambda confirms selection bias requiring correction.",
    "pitfalls": "Estimating the model without an exclusion restriction (at least one valid variable that affects selection into the sample but has no direct effect on the outcome), which causes severe collinearity.",
    "paradigm_debates": "Heckman (1979) Nobel-prize winning framework; widely utilized in labor economics, corporate finance, and strategic management.",
    "domain_tags": [
      "Econometrics",
      "Selection Bias",
      "Quantitative Modeling"
    ]
  },
  "synthetic-control-method": {
    "core_definition": "A comparative case study method that evaluates the causal impact of a policy intervention by constructing a weighted convex combination of unaffected control units to serve as an optimal counterfactual.",
    "benchmarks": "Abadie et al. (2010, 2015); validated via placebo in-time and placebo in-space robustness tests to verify significance.",
    "pitfalls": "Allowing control units that experienced overlapping shocks during the post-treatment period to enter the donor pool, contaminating counterfactual trajectories.",
    "paradigm_debates": "Celebrated as the most important innovation in policy evaluation in recent decades, surpassing traditional difference-in-differences in single-unit intervention contexts.",
    "domain_tags": [
      "Econometrics",
      "Policy Evaluation",
      "Comparative Politics"
    ]
  },
  "falsificationism": {
    "core_definition": "Karl Popper's philosophical principle that scientific hypotheses can never be conclusively verified by empirical induction, but can only be decisively falsified through rigorous empirical tests.",
    "benchmarks": "Requires theories to make risky, precise, and falsifiable predictions; theories immune to empirical refutation are classified as pseudo-science.",
    "pitfalls": "Treating a single contradictory observation as instant fatal refutation without accounting for auxiliary hypotheses or measurement error (Duhem-Quine thesis).",
    "paradigm_debates": "Popperian falsificationism vs. Kuhnian paradigm shifts: does science progress through rational refutation or socio-historical revolutions?",
    "domain_tags": [
      "Philosophy of Science",
      "Epistemology",
      "Methodological Foundations"
    ]
  },
  "paradigm-shift": {
    "core_definition": "Thomas Kuhn's concept that scientific progress is not linear and cumulative, but marked by revolutionary shifts where an existing dominant paradigm encounters accumulating anomalies and is replaced by a fundamentally incommensurable framework.",
    "benchmarks": "Evolutionary cycle: Pre-paradigm science -> Normal science -> Anomaly crisis -> Scientific revolution -> New normal science.",
    "pitfalls": "Applying 'paradigm shift' casually to minor methodological tweaks rather than profound ontological and epistemological reorganizations.",
    "paradigm_debates": "Kuhn's incommensurability thesis asserts scientists operating under different paradigms inhabit different conceptual worlds, challenging pure objective realism.",
    "domain_tags": [
      "Philosophy of Science",
      "Scientific Revolutions",
      "History of Science"
    ]
  },
  "second-order-constructs": {
    "core_definition": "Higher-Order Constructs (HOCs) that represent multidimensional phenomena by modeling two or more first-order dimensions under a higher-level abstract latent variable, reducing model complexity.",
    "benchmarks": "Four classic typologies (Jarvis et al., 2003): Type I (reflective-reflective), Type II (reflective-formative), Type III (formative-reflective), Type IV (formative-formative). Evaluated via two-stage or repeated indicators approach.",
    "pitfalls": "Improperly specifying the relationship between first-order dimensions and the higher-order construct (e.g., treating formative components as reflective indicators).",
    "paradigm_debates": "Provides conceptual parsimony, but can obscure granular, dimension-specific relationships with outcome variables.",
    "domain_tags": [
      "Structural Equation Modeling",
      "Psychometrics",
      "Multivariate Analysis"
    ]
  },
  "hawthorne-effect": {
    "core_definition": "A psychological phenomenon wherein research participants alter their natural behavior or productivity simply due to awareness that they are being observed and studied.",
    "benchmarks": "Mitigated by non-reactive unobtrusive measures, longitudinal acclimation periods, sham tasks, and blinding of experimental hypotheses.",
    "pitfalls": "Attributing productivity gains directly to an experimental intervention when the change was driven by novelty and supervisory attention.",
    "paradigm_debates": "Highlights the pervasive challenge of reactivity in human behavioral experiments and organizational field research.",
    "domain_tags": [
      "Behavioral Sciences",
      "Experimental Design",
      "Methodological Biases"
    ]
  },
  "randomized-controlled-trial": {
    "core_definition": "An experimental study design where eligible participants are randomly allocated to an intervention group or a control group, providing the highest standard for evaluating causal efficacy.",
    "benchmarks": "Adheres to CONSORT guidelines: formal randomization sequences, allocation concealment, double-blinding when feasible, and intention-to-treat (ITT) analysis.",
    "pitfalls": "Experiencing severe differential attrition between treatment and control arms, which destroys initial balance achieved by randomization.",
    "paradigm_debates": "While universally heralded as the gold standard for internal validity, RCTs face persistent critiques regarding ethical constraints and limited external generalizability.",
    "domain_tags": [
      "Experimental Design",
      "Causal Inference",
      "Clinical Research"
    ]
  },
  "delphi-technique": {
    "core_definition": "A structured, iterative consensus-building research methodology where a panel of experts answers questionnaires across multiple rounds, receiving controlled anonymous feedback after each round.",
    "benchmarks": "Requires at least 2-3 iterative rounds, expert anonymity, controlled feedback reports, and predefined consensus criteria (e.g., > 70-80% agreement or Kendall's W > 0.70).",
    "pitfalls": "Allowing dominant personalities to steer group opinion (avoided strictly by enforcing complete anonymity) or high panelist drop-out rates.",
    "paradigm_debates": "Bridges qualitative expert judgment with structured quantitative consensus aggregation.",
    "domain_tags": [
      "Expert Consensus",
      "Forecasting",
      "Mixed Methods"
    ]
  },
  "critical-realism": {
    "core_definition": "A philosophical paradigm developed by Roy Bhaskar that distinguishes between the empirical (experiences), the actual (events that occur), and the real (underlying generative mechanisms and causal powers).",
    "benchmarks": "Employs retroduction / abductive reasoning to uncover non-observable causal structures that generate observed empirical regularities.",
    "pitfalls": "Confusing empirical events with underlying generative mechanisms; critical realists argue mechanisms can exist unexercised or be counteracted by rival forces.",
    "paradigm_debates": "Offers a powerful epistemological alternative to both naive empirical positivism and radical social constructivism in social and organizational research.",
    "domain_tags": [
      "Philosophy of Science",
      "Epistemology",
      "Critical Realism"
    ]
  },
  "preregistration": {
    "core_definition": "The permanent, timestamped public registration of a research study's hypotheses, design, and statistical analysis plan prior to data collection or examination of outcome data.",
    "benchmarks": "Deposited in certified public registries (OSF, AsPredicted, ClinicalTrials.gov); Registered Reports format guarantees peer-reviewed acceptance prior to results.",
    "pitfalls": "Submitting vague, non-committal preregistrations that leave ample researcher degrees of freedom for post-hoc p-hacking.",
    "paradigm_debates": "Differentiates genuine confirmatory hypothesis testing from post-hoc exploratory discovery, curbing publication bias.",
    "domain_tags": [
      "Open Science",
      "Research Rigor",
      "Publication Ethics"
    ]
  },
  "non-response-bias": {
    "core_definition": "A systematic error that occurs when individuals who do not respond to a survey differ in meaningful, substantive characteristics from those who do participate.",
    "benchmarks": "Diagnosed by Armstrong & Overton's (1977) wave analysis (comparing early respondents vs. late respondents as proxies for non-respondents) or benchmarking against known population demographics.",
    "pitfalls": "Asserting a survey is free from bias simply because a high number of raw responses was collected, without analyzing the response rate or non-response patterns.",
    "paradigm_debates": "A fundamental threat to external validity and generalizability in empirical survey literature.",
    "domain_tags": [
      "Survey Methodology",
      "Sampling Theory",
      "Quantitative Methods"
    ]
  },
  "factorial-design": {
    "core_definition": "An experimental design involving two or more categorical independent variables (factors), each with multiple levels, enabling simultaneous evaluation of main effects and interaction effects.",
    "benchmarks": "Analyzed via Two-Way or Multi-Way ANOVA / ANCOVA; evaluates whether the effect of Factor A depends upon the level of Factor B (interaction effect).",
    "pitfalls": "Focusing solely on main effects when significant interaction terms are present, which misrepresents the conditional nature of the phenomenon.",
    "paradigm_debates": "Provides vastly superior ecological efficiency over old-fashioned 'one-factor-at-a-time' (OFAT) experimental experiments.",
    "domain_tags": [
      "Experimental Design",
      "ANOVA",
      "Quantitative Analysis"
    ]
  },
  "within-subjects-design": {
    "core_definition": "An experimental design where every individual participant is exposed to all experimental conditions or treatments, serving as their own control.",
    "benchmarks": "Maximizes statistical power by eliminating between-person individual variance; requires systematic counterbalancing (Latin Square design) to eliminate carryover and fatigue effects.",
    "pitfalls": "Ignoring asymmetric carryover effects, where exposure to Condition A permanently alters responses to subsequent Condition B.",
    "paradigm_debates": "Trade-off between extreme statistical power (Within-Subjects) versus complete insulation from carryover bias (Between-Subjects).",
    "domain_tags": [
      "Experimental Design",
      "Psychology",
      "Statistical Power"
    ]
  },
  "attrition-bias": {
    "core_definition": "A systematic threat to internal validity occurring when participants drop out of a longitudinal or experimental study in non-random patterns related to the treatment or outcomes.",
    "benchmarks": "Evaluated by comparing baseline characteristics between completers and dropouts; addressed analytically using Intention-to-Treat (ITT) and Full Information Maximum Likelihood (FIML).",
    "pitfalls": "Conducting per-protocol or complete-case analysis that deletes all dropouts, which systematically biases treatment effect estimates.",
    "paradigm_debates": "A major source of bias in longitudinal cohort studies, behavioral field trials, and medical randomized experiments.",
    "domain_tags": [
      "Experimental Validity",
      "Longitudinal Research",
      "Clinical Trials"
    ]
  },
  "floor-and-ceiling-effects": {
    "core_definition": "A measurement artifact occurring when an instrument's scale cannot measure values below a minimum threshold (floor) or above a maximum threshold (ceiling), truncating variance and distorting relationships.",
    "benchmarks": "Diagnosed when > 15-20% of respondents achieve the absolute minimum or maximum possible score on a multi-item scale (Terwee et al., 2007).",
    "pitfalls": "Using standard linear regression (OLS) on severely censored data; requires Tobit regression or hurdle models to avoid biased coefficients.",
    "paradigm_debates": "Highlights the necessity of pilot testing items across extreme participant ability ranges during scale development.",
    "domain_tags": [
      "Psychometrics",
      "Measurement Artifacts",
      "Econometric Modeling"
    ]
  },
  "placebo-effect": {
    "core_definition": "A beneficial psychological or physiological outcome produced by an inert sham treatment or intervention, driven entirely by participant expectation, context, and symbolic meaning.",
    "benchmarks": "Requires rigorous double-blind randomized placebo-controlled protocols to isolate the true active ingredient of an intervention from expectancy effects.",
    "pitfalls": "Evaluating treatment efficacy in an unblinded single-arm study, mistakenly attributing placebo gains to the actual experimental mechanism.",
    "paradigm_debates": "A cornerstone of clinical medicine and behavioral neuroscience, demonstrating the profound causal influence of human cognitive expectations.",
    "domain_tags": [
      "Experimental Design",
      "Psychology",
      "Clinical Research"
    ]
  },
  "harman-single-factor": {
    "core_definition": "A post-hoc diagnostic technique where all survey items are loaded into an unrotated exploratory factor analysis to check if a single dominant factor accounts for the majority of variance.",
    "benchmarks": "Threshold: First unrotated factor must account for < 50% of the total variance across all measured items (Harman, 1976).",
    "pitfalls": "Relying on Harman's test as definitive proof that Common Method Bias is absent; top methodologists (Podsakoff et al., 2003, 2012) consider it notoriously insensitive.",
    "paradigm_debates": "Mandatory minimum check in legacy papers, but increasingly rejected by Q1 journals unless supplemented by marker variable or ULMC techniques.",
    "domain_tags": [
      "Survey Diagnostics",
      "Common Method Bias",
      "Multivariate Analysis"
    ]
  },
  "marker-variable-technique": {
    "core_definition": "A statistical method to assess and control for Common Method Bias by introducing an theoretically unrelated marker variable into the research design (Lindell & Whitney, 2001).",
    "benchmarks": "The lowest positive correlation between the marker variable and substantive constructs is used to partial out common method variance from all zero-order correlations.",
    "pitfalls": "Selecting a marker variable that is theoretically correlated with study constructs, which inappropriately removes valid substantive variance.",
    "paradigm_debates": "Vastly superior to Harman's single factor test, endorsed by leading organizational methodologists for cross-sectional survey research.",
    "domain_tags": [
      "Psychometrics",
      "Common Method Bias",
      "Survey Methodology"
    ]
  },
  "formative-vs-reflective": {
    "core_definition": "The core measurement model distinction: reflective indicators are reflections of an underlying construct, while formative indicators are causal components that combine to define the construct.",
    "benchmarks": "Reflective: high correlation, interchangeability, high Cronbach's alpha/AVE. Formative: independent contributors, low collinearity (VIF < 3.0), non-interchangeable.",
    "pitfalls": "Deleting formative indicators simply because they correlate weakly with other indicators, which alters the very theoretical meaning of the construct.",
    "paradigm_debates": "One of the most intense psychometric debates in management and marketing literature over the last two decades (Diamantopoulos, Bollen, Hair).",
    "domain_tags": [
      "Scale Development",
      "Measurement Theory",
      "Structural Equation Modeling"
    ]
  },
  "bootstrapping": {
    "core_definition": "A non-parametric statistical resampling procedure that generates empirical sampling distributions by repeatedly sampling with replacement from the observed dataset.",
    "benchmarks": "In SEM mediation and moderation: minimum of 5,000 resamples (or 10,000 in top journals); 95% bias-corrected and accelerated (BCa) confidence intervals must exclude zero.",
    "pitfalls": "Relying on classical parametric tests that assume multivariate normality when indirect effects (a * b) are mathematically non-normal.",
    "paradigm_debates": "The indispensable gold standard for hypothesis testing of mediation, indirect pathways, and complex parameters in modern structural equation models.",
    "domain_tags": [
      "Non-Parametric Statistics",
      "Bootstrapping",
      "Structural Equation Modeling"
    ]
  },
  "constant-comparative-method": {
    "core_definition": "The central iterative analytical procedure in Grounded Theory (Glaser & Strauss, 1967) where newly collected data is continuously compared against existing codes, categories, and emerging theory.",
    "benchmarks": "Continuous comparison across four stages: comparing incidents within categories, integrating categories and properties, delimiting theory, and writing grounded theoretical models.",
    "pitfalls": "Collecting all data in a single batch before beginning analysis, violating the fundamental iterative cycle of constant comparison.",
    "paradigm_debates": "Defines the core operational engine of inductive qualitative discovery across all variations of grounded theory.",
    "domain_tags": [
      "Qualitative Methodology",
      "Grounded Theory",
      "Data Analysis"
    ]
  },
  "theoretical-sampling": {
    "core_definition": "The qualitative process of data collection directed by emerging theory, where the researcher decides what data to collect next and where to find participants based on theoretical gaps.",
    "benchmarks": "Sampling choices evolve dynamically based on analytical codes until full conceptual category saturation is achieved.",
    "pitfalls": "Confusing theoretical sampling with demographic statistical sampling; theoretical sampling targets conceptual categories, not demographic representation.",
    "paradigm_debates": "Essential differentiator that elevates authentic grounded theory above descriptive qualitative thematic surveys.",
    "domain_tags": [
      "Qualitative Sampling",
      "Grounded Theory",
      "Inductive Research"
    ]
  },
  "audit-trail": {
    "core_definition": "A transparent, comprehensive documentation of all methodological decisions, data collection steps, analytical coding matrices, and interpretive leaps made throughout a qualitative inquiry.",
    "benchmarks": "Evaluated by external inquiry auditors to confirm dependability and confirmability (Lincoln & Guba, 1985; Rodgers & Cowles, 1993).",
    "pitfalls": "Presenting finalized qualitative themes without preserving raw fieldnotes, preliminary coding iterations, or researcher reflective memos.",
    "paradigm_debates": "The qualitative counterpart to open data and open code repositories in quantitative science.",
    "domain_tags": [
      "Qualitative Rigor",
      "Trustworthiness",
      "Methodological Transparency"
    ]
  },
  "thick-description": {
    "core_definition": "Clifford Geertz's ethnographical concept of describing human behavior not merely as bare physical actions (thin), but within the rich social, cultural, and intentional context that gives it meaning.",
    "benchmarks": "Enables readers to judge the transferability of qualitative findings to other cultural and organizational contexts.",
    "pitfalls": "Providing superficial journalistic descriptions without elucidating the underlying cultural meanings and symbolic significance.",
    "paradigm_debates": "Foundational conceptual pillar of interpretive anthropology, qualitative sociology, and organizational ethnography.",
    "domain_tags": [
      "Ethnography",
      "Qualitative Methodology",
      "Cultural Analysis"
    ]
  },
  "bracketing-epoche": {
    "core_definition": "The phenomenological process (Husserl) of deliberately suspending one's preconceptions, theoretical assumptions, and everyday beliefs about a phenomenon to perceive it with fresh phenomenological clarity.",
    "benchmarks": "Documented through extensive reflexive journaling and bracketing interviews prior to analyzing participant transcripts.",
    "pitfalls": "Treating bracketing as a one-time intellectual exercise rather than an ongoing, vigilant mental discipline throughout data interpretation.",
    "paradigm_debates": "Husserlian transcendental phenomenology asserts pure bracketing is possible; Heideggerian hermeneutic phenomenology argues human pre-understanding cannot be completely bracketed.",
    "domain_tags": [
      "Phenomenology",
      "Qualitative Philosophy",
      "Epistemology"
    ]
  },
  "critical-discourse-analysis": {
    "core_definition": "An interdisciplinary qualitative methodology (Fairclough, Wodak, van Dijk) that analyzes how linguistic discourse constructs, legitimizes, and reproduces social power relations, hegemony, and inequality.",
    "benchmarks": "Fairclough's three-dimensional framework: (1) Textual analysis (linguistic features), (2) Discursive practice (production and consumption), (3) Sociocultural practice (ideological implications).",
    "pitfalls": "Analyzing texts purely for grammatical structures without connecting discourse to broader macro-societal power structures.",
    "paradigm_debates": "Explicitly political and emancipatory in nature, rejecting the positivist illusion of politically neutral social science.",
    "domain_tags": [
      "Qualitative Methodology",
      "Linguistics",
      "Critical Theory"
    ]
  },
  "forest-plot": {
    "core_definition": "A graphical display used in meta-analysis that summarizes the results of multiple scientific studies addressing the same question, showing individual study effect sizes, confidence intervals, and the pooled overall effect.",
    "benchmarks": "Displays effect size point estimates (squares proportional to study weight), horizontal 95% confidence intervals, and a diamond representing the pooled effect and CI.",
    "pitfalls": "Failing to report both fixed-effect and random-effects models when significant between-study heterogeneity is present.",
    "paradigm_debates": "The universal graphical standard for reporting pooled evidence in Cochrane systematic reviews and medical meta-analyses.",
    "domain_tags": [
      "Meta-Analysis",
      "Evidence Synthesis",
      "Data Visualization"
    ]
  },
  "heterogeneity-in-meta-analysis": {
    "core_definition": "The variability in effect size estimates across individual studies in a meta-analysis, reflecting diversity in study populations, interventions, measures, or underlying methodological quality.",
    "benchmarks": "Cochran's Q test (p < 0.10 indicates significant heterogeneity); Higgins & Thompson's I-squared statistic: 25% (low), 50% (moderate), 75% (high heterogeneity).",
    "pitfalls": "Applying a simple fixed-effect model when I-squared exceeds 50%, ignoring between-study variance and underestimating standard errors.",
    "paradigm_debates": "High heterogeneity mandates subgroup analysis or meta-regression to uncover the theoretical moderators explaining varying effect sizes.",
    "domain_tags": [
      "Meta-Analysis",
      "Heterogeneity Diagnostics",
      "Quantitative Synthesis"
    ]
  },
  "risk-of-bias-2": {
    "core_definition": "The standardized Cochrane Risk of Bias tool (RoB 2) for assessing internal validity and methodological quality in randomized trials across five specific domains.",
    "benchmarks": "Evaluates: (1) Randomization process, (2) Deviations from intended interventions, (3) Missing outcome data, (4) Measurement of outcome, (5) Selection of reported results. Graded as 'Low risk', 'Some concerns', or 'High risk'.",
    "pitfalls": "Using obsolete checklist scoring scales (like Jadad score) which compress multi-dimensional methodological flaws into misleading aggregate numbers.",
    "paradigm_debates": "Global gold standard for critical appraisal of clinical and behavioral randomized experimental literature.",
    "domain_tags": [
      "Systematic Review",
      "Methodological Appraisal",
      "Evidence Synthesis"
    ]
  },
  "scoping-review": {
    "core_definition": "An evidence synthesis methodology used to map the key concepts, types of evidence, and research gaps in a broad or emerging topic area, guided by PRISMA-ScR standards.",
    "benchmarks": "Arksey & O'Malley (2005) / JBI framework: defining broad research questions, identifying relevant literature without restrictive quality appraisal exclusions, charting data, and summarizing themes.",
    "pitfalls": "Attempting to synthesize pooled quantitative effect sizes in a scoping review; scoping reviews map the breadth of literature, while systematic reviews synthesize efficacy.",
    "paradigm_debates": "Ideal for emerging, fragmented research topics where formal systematic reviews and meta-analyses are premature.",
    "domain_tags": [
      "Evidence Synthesis",
      "Literature Mapping",
      "Scoping Methodology"
    ]
  },
  "condition-index-collinearity": {
    "core_definition": "A sophisticated collinearity diagnostic based on the eigenvalues of the scaled, uncentered cross-products matrix of explanatory variables (Belsley, Kuh, & Welsch, 1980).",
    "benchmarks": "Condition Index > 15 indicates moderate collinearity; Condition Index > 30 associated with variance decomposition proportions > 0.50 on two or more variables indicates severe collinearity.",
    "pitfalls": "Relying solely on bivariate correlation matrices or VIF, which often fail to detect complex collinearity involving three or more variables.",
    "paradigm_debates": "Regarded by econometricians as significantly more rigorous than bivariate correlation coefficients for regression diagnostics.",
    "domain_tags": [
      "Econometrics",
      "Multicollinearity",
      "Regression Diagnostics"
    ]
  },
  "informed-consent": {
    "core_definition": "An ethical imperative requiring that human research participants be fully informed of the study purpose, procedures, potential risks, and benefits, and voluntarily agree to participate without coercion.",
    "benchmarks": "Core pillars of the Belmont Report (1979): Respect for Persons, Beneficence, and Justice; requires Institutional Review Board (IRB) approval.",
    "pitfalls": "Using complex technical jargon in consent forms that participants cannot comprehend, invalidating true informed understanding.",
    "paradigm_debates": "The tension between full prospective informed consent and the methodological necessity of minor deception in experimental social psychology.",
    "domain_tags": [
      "Research Ethics",
      "IRB Protocols",
      "Human Subjects"
    ]
  },
  "predatory-journals": {
    "core_definition": "Deceptive open-access academic publishers that exploit the author-pays model by charging Article Processing Charges (APCs) without providing legitimate peer review or editorial oversight.",
    "benchmarks": "Identified via Beall's List criteria, Think-Check-Submit guidelines, absence from Web of Science (SSCI/SCI) and Scopus, and fraudulent editorial boards.",
    "pitfalls": "Submitting doctoral research to journals with suspiciously fast turnaround times (< 2 weeks) and unsolicited email invitations.",
    "paradigm_debates": "A severe threat to scientific integrity, leading academic institutions worldwide to blacklist unindexed open-access venues.",
    "domain_tags": [
      "Publication Ethics",
      "Scholarly Publishing",
      "Academic Integrity"
    ]
  },
  "salami-slicing": {
    "core_definition": "The questionable research practice of fragmenting data from a single comprehensive research project into multiple minimally publishable units to inflate publication counts.",
    "benchmarks": "Identified when multiple articles share identical datasets, hypotheses, and variables without substantial incremental theoretical contributions.",
    "pitfalls": "Distorting meta-analyses and literature reviews by double-counting identical participant cohorts across multiple fragmented publications.",
    "paradigm_debates": "Strictly prohibited by COPE (Committee on Publication Ethics) and leading international journal editors as data fragmentation.",
    "domain_tags": [
      "Publication Ethics",
      "Academic Integrity",
      "Research Conduct"
    ]
  }
};

/**
 * Ngân hàng Từ viết tắt Học thuật Chuẩn Quốc tế (Monolingual English Acronyms)
 */
export const MONOLINGUAL_ACRONYMS_EN: Record<string, {
  full_name: string;
  purpose: string;
  benchmark?: string;
  domain?: string;
}> = {
  "PLS-SEM": {
    "full_name": "Partial Least Squares Structural Equation Modeling",
    "purpose": "Variance-based structural equation modeling focusing on prediction and theoretical development, optimal for complex models and exploratory research.",
    "benchmark": "He so R² high, Q² > 0, he so f² (0.02 small, 0.15 medium, 0.35 large), HTMT < 0.85/0.90.",
    "domain": "Academic Acronym"
  },
  "CB-SEM": {
    "full_name": "Covariance-Based Structural Equation Modeling",
    "purpose": "Covariance-based structural equation modeling (Joreskog, Kline) emphasizing theory confirmation and overall goodness-of-fit evaluation.",
    "benchmark": "Chi-square p > 0.05, RMSEA < 0.06 - 0.08, CFI > 0.95, TLI > 0.95, SRMR < 0.08.",
    "domain": "Academic Acronym"
  },
  "SEM": {
    "full_name": "Structural Equation Modeling",
    "purpose": "Second-generation multivariate analysis combining confirmatory factor analysis (CFA) and path analysis to test complex simultaneous structural relationships.",
    "benchmark": "Mo hinh do luong dat do tin cay va gia tri hoi tu/phan biet truoc khi danh gia mo hinh cau truc.",
    "domain": "Academic Acronym"
  },
  "AVE": {
    "full_name": "Average Variance Extracted",
    "purpose": "A psychometric metric measuring the amount of variance captured by a latent construct relative to measurement error variance.",
    "benchmark": "AVE > 0.50 (Fornell & Larcker, 1981; Hair et al., 2018).",
    "domain": "Academic Acronym"
  },
  "HTMT": {
    "full_name": "Heterotrait-Monotrait Ratio of Correlations",
    "purpose": "Heterotrait-Monotrait ratio of correlations, the premier standard for assessing discriminant validity in structural equation models.",
    "benchmark": "HTMT < 0.85 (nghiem ngat / conceptually distinct) hoac HTMT < 0.90 (closely related constructs) (Henseler et al., 2015).",
    "domain": "Academic Acronym"
  },
  "CR": {
    "full_name": "Composite Reliability",
    "purpose": "Composite reliability measuring internal consistency of a scale without assuming equal factor loadings across indicators.",
    "benchmark": "CR >= 0.70 (chap nhan trong exploratory research), >= 0.80 (confirmatory research), should not exceed > 0.95 due to item redundancy (Hair et al., 2018).",
    "domain": "Academic Acronym"
  },
  "VIF": {
    "full_name": "Variance Inflation Factor",
    "purpose": "Variance Inflation Factor diagnosing multicollinearity among predictors in regression models and formative measurement constructs.",
    "benchmark": "VIF < 3.0 (ideal trong PLS-SEM / Kock, 2015), VIF < 5.0 (acceptable / Hair et al., 2018), VIF > 10.0 (da cong tuyen severe).",
    "domain": "Academic Acronym"
  },
  "CMB": {
    "full_name": "Common Method Bias",
    "purpose": "Common Method Bias, spurious variance variance attributable to the measurement method rather than the constructs of interest.",
    "benchmark": "Harman's single factor < 50% variance, test Full Collinearity VIF < 3.3 (Kock, 2015), hoac Marker Variable technique (Lindell & Whitney, 2001).",
    "domain": "Academic Acronym"
  },
  "CMV": {
    "full_name": "Common Method Variance",
    "purpose": "Common Method Variance, systematic error variance shared among variables collected via identical measurement techniques.",
    "benchmark": "Khuyen nghi ap dung ca bien phap thu tuc (procedural remedies) va ky thuat thong ke (statistical remedies / Podsakoff et al., 2003, 2011).",
    "domain": "Academic Acronym"
  },
  "2SLS": {
    "full_name": "Two-Stage Least Squares",
    "purpose": "Two-Stage Least Squares instrumental variable regression addressing endogeneity and omitted variable bias.",
    "benchmark": "Kiem dinh bien cong cu yeu F-statistic > 10 (Stock & Yogo, 2005), test ngoai sinh Sargan/Hansen p > 0.05.",
    "domain": "Academic Acronym"
  },
  "GMM": {
    "full_name": "Generalized Method of Moments",
    "purpose": "Generalized Method of Moments estimation addressing dynamic panel endogeneity, unobserved heterogeneity, and simultaneity.",
    "benchmark": "Kiem dinh tu tuong quan Arellano-Bond AR(1) p < 0.05, AR(2) p > 0.05, Hansen test p > 0.05 (nhung khong duoc p = 1.000).",
    "domain": "Academic Acronym"
  },
  "DID": {
    "full_name": "Difference-in-Differences",
    "purpose": "Difference-in-Differences quasi-experimental strategy estimating causal effects across treated and control groups before and after intervention.",
    "benchmark": "Gia dinh xu the song song (Parallel Trends Assumption) bat buoc phai duoc test thoa man truoc can thiep.",
    "domain": "Academic Acronym"
  },
  "PSM": {
    "full_name": "Propensity Score Matching",
    "purpose": "Propensity Score Matching, balancing observed baseline covariates between treatment and control groups in observational studies.",
    "benchmark": "Do lech chuan hoa can bang (Standardized Mean Difference / Rubin's B < 25%), ty le variance (Rubin's R tu 0.5 den 2.0).",
    "domain": "Academic Acronym"
  },
  "RDD": {
    "full_name": "Regression Discontinuity Design",
    "purpose": "Regression Discontinuity Design, a quasi-experimental identification strategy assigning treatment via a sharp continuous cutoff threshold.",
    "benchmark": "Sharp RDD (tuan thu 100%), Fuzzy RDD (dung IV); test tinh lien tuc cua ham mat do McCrary density test.",
    "domain": "Academic Acronym"
  },
  "ITS": {
    "full_name": "Interrupted Time-Series Design",
    "purpose": "An established academic research methodology standard representing Interrupted Time-Series Design, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Can toi thieu 10-15 diem quan sat truoc va sau can thiep; kiem soat tu tuong quan qua mo hinh ARIMA / Newey-West.",
    "domain": "Academic Acronym"
  },
  "RCT": {
    "full_name": "Randomized Controlled Trial",
    "purpose": "Randomized Controlled Trial, the gold standard experimental design with random allocation to isolate causal treatment efficacy.",
    "benchmark": "Phan bo ngau nhien (random assignment), nhom doi chung tuong duong, lam mu (blinding), phan tich theo du dinh ban dau (ITT).",
    "domain": "Academic Acronym"
  },
  "ITT": {
    "full_name": "Intention-to-Treat Analysis",
    "purpose": "An established academic research methodology standard representing Intention-to-Treat Analysis, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Bao toan tinh ngau nhien ban dau, tranh sai lech hao hut mau (attrition bias); doi lap voi Per-protocol analysis.",
    "domain": "Academic Acronym"
  },
  "CACE": {
    "full_name": "Complier Average Causal Effect",
    "purpose": "An established academic research methodology standard representing Complier Average Causal Effect, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Uoc luong qua bien cong cu (Instrumental Variable): CACE = ITT_Y / ITT_D.",
    "domain": "Academic Acronym"
  },
  "LATE": {
    "full_name": "Local Average Treatment Effect",
    "purpose": "An established academic research methodology standard representing Local Average Treatment Effect, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Ap dung trong cac mo hinh IV va Fuzzy RDD duoi gia dinh tinh don dieu (monotonicity).",
    "domain": "Academic Acronym"
  },
  "SUTVA": {
    "full_name": "Stable Unit Treatment Value Assumption",
    "purpose": "An established academic research methodology standard representing Stable Unit Treatment Value Assumption, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Vi pham SUTVA khi co hieu ung lan toa (spillover effects), tuong tac xa hoi hoac lay nhiem giua cac nhom.",
    "domain": "Academic Acronym"
  },
  "DAG": {
    "full_name": "Directed Acyclic Graph",
    "purpose": "An established academic research methodology standard representing Directed Acyclic Graph, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Tieu chuan chan cong sau (Back-door criterion) de chon tap hop bien kiem soat toi thieu nham loai bo sai lech gay nhieu.",
    "domain": "Academic Acronym"
  },
  "CTT": {
    "full_name": "Classical Test Theory",
    "purpose": "Classical Test Theory, modeling observed test scores as true score plus random measurement error (X = T + E).",
    "benchmark": "Cac gia dinh: Trung binh sai so bang 0, khong co tuong quan giua diem thuc va sai so, cac bai kiem tra song song co cung variance sai so.",
    "domain": "Academic Acronym"
  },
  "IRT": {
    "full_name": "Item Response Theory",
    "purpose": "Item Response Theory, modeling item responses as a probabilistic function of latent trait ability and item difficulty/discrimination.",
    "benchmark": "Mo hinh 1PL (Rasch), 2PL (do kho + do phan biet), 3PL (+ tham so doan mo); ham thong tin cau hoi (IIF) va bai thi (TIF).",
    "domain": "Academic Acronym"
  },
  "1PL": {
    "full_name": "One-Parameter Logistic Model (Rasch Model)",
    "purpose": "An established academic research methodology standard representing One-Parameter Logistic Model (Rasch Model), widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Kiem dinh muc do medium van cua cau hoi: Infit MNSQ va Outfit MNSQ trong khoang 0.7 den 1.3 (Bond & Fox, 2015).",
    "domain": "Academic Acronym"
  },
  "2PL": {
    "full_name": "Two-Parameter Logistic Model",
    "purpose": "An established academic research methodology standard representing Two-Parameter Logistic Model, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Do phan biet a > 0.65 (medium), a > 1.35 (rat high); do kho b thuong nam trong dai tu -3.0 den +3.0.",
    "domain": "Academic Acronym"
  },
  "3PL": {
    "full_name": "Three-Parameter Logistic Model",
    "purpose": "An established academic research methodology standard representing Three-Parameter Logistic Model, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Tham so doan mo c thuong dao dong quanh 0.20 cho cau hoi trac nghiem 5 lua chon (1/5 = 0.20).",
    "domain": "Academic Acronym"
  },
  "ICC": {
    "full_name": "Item Characteristic Curve",
    "purpose": "An established academic research methodology standard representing Item Characteristic Curve, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Duong cong doc hon the hien cau hoi co do phan biet high hon; vi tri dich sang phai the hien cau hoi kho hon.",
    "domain": "Academic Acronym"
  },
  "IIF": {
    "full_name": "Item Information Function",
    "purpose": "An established academic research methodology standard representing Item Information Function, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Thong tin cuc dai tai nguong do kho cua cau hoi: I(theta) = a² * P * (1-P).",
    "domain": "Academic Acronym"
  },
  "TIF": {
    "full_name": "Test Information Function",
    "purpose": "An established academic research methodology standard representing Test Information Function, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Sai so chuan do luong SE(theta) = 1 / sqrt(TIF(theta)); TIF cang high thi sai so do luong cang small.",
    "domain": "Academic Acronym"
  },
  "CVR": {
    "full_name": "Content Validity Ratio",
    "purpose": "An established academic research methodology standard representing Content Validity Ratio, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Nguong chap nhan CVR toi thieu cua Lawshe (1975) phu thuoc so chuyen gia: N=5 can CVR=0.99, N=10 can CVR=0.62, N=20 can CVR=0.42.",
    "domain": "Academic Acronym"
  },
  "CVI": {
    "full_name": "Content Validity Index",
    "purpose": "An established academic research methodology standard representing Content Validity Index, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "I-CVI >= 0.78 (doi voi hoi dong 6-10 chuyen gia), S-CVI/Ave >= 0.90 (Lynn, 1986; Polit & Beck, 2006).",
    "domain": "Academic Acronym"
  },
  "VAS": {
    "full_name": "Visual Analog Scale",
    "purpose": "An established academic research methodology standard representing Visual Analog Scale, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Thuong dung do cuong do dau don, muc do hai long hoac cam xuc; du lieu xap xi muc do ty le (ratio scale).",
    "domain": "Academic Acronym"
  },
  "EDA": {
    "full_name": "Exploratory Data Analysis",
    "purpose": "An established academic research methodology standard representing Exploratory Data Analysis, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Cong cu chinh: Boxplot, Stem-and-leaf, Histogram, Normal Q-Q plot, Scatterplot matrix (Tukey, 1977; Schindler, 2022).",
    "domain": "Academic Acronym"
  },
  "EFA": {
    "full_name": "Exploratory Factor Analysis",
    "purpose": "Exploratory Factor Analysis, identifying underlying latent factor structures and cross-loadings in preliminary scale development.",
    "benchmark": "KMO >= 0.50 (tot neu >= 0.80), Bartlett's test p < 0.05, Eigenvalue > 1, Tong variance trich >= 50%, Factor loading >= 0.50 (Hair et al., 2018).",
    "domain": "Academic Acronym"
  },
  "CFA": {
    "full_name": "Confirmatory Factor Analysis",
    "purpose": "Confirmatory Factor Analysis, testing pre-specified theoretical measurement models and factor structures for goodness-of-fit.",
    "benchmark": "Factor loadings > 0.707 (p < 0.001), Composite Reliability > 0.70, AVE > 0.50, cac chi so do phu hop GoF dat chuan.",
    "domain": "Academic Acronym"
  },
  "PCA": {
    "full_name": "Principal Component Analysis",
    "purpose": "An established academic research methodology standard representing Principal Component Analysis, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Dung de nen bien va chong da cong tuyen; khong phai la mo hinh nhan to tiem an thuc thu.",
    "domain": "Academic Acronym"
  },
  "ANOVA": {
    "full_name": "Analysis of Variance",
    "purpose": "Analysis of Variance, testing mean differences across three or more categorical experimental groups.",
    "benchmark": "Gia dinh: Phan phoi chuan, variance dong nhat (Levene test p > 0.05). F-statistic y nghia p < 0.05, test sau phan tich (Post-hoc Tukey / Scheffe).",
    "domain": "Academic Acronym"
  },
  "ANCOVA": {
    "full_name": "Analysis of Covariance",
    "purpose": "An established academic research methodology standard representing Analysis of Covariance, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Gia dinh bat buoc: Tinh dong nhat cua cac do doc hoi quy (Homogeneity of regression slopes / p > 0.05 cho tuong tac nhom * covariate).",
    "domain": "Academic Acronym"
  },
  "MANOVA": {
    "full_name": "Multivariate Analysis of Variance",
    "purpose": "An established academic research methodology standard representing Multivariate Analysis of Variance, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Thong ke Wilks' Lambda, Pillai's Trace, Hotelling's Trace; test tinh dong nhat ma tran hiep variance Box's M test.",
    "domain": "Academic Acronym"
  },
  "HLM": {
    "full_name": "Hierarchical Linear Modeling",
    "purpose": "An established academic research methodology standard representing Hierarchical Linear Modeling, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "He so tuong quan noi lop ICC (Intraclass Correlation Coefficient) > 0.05 hoac 0.10 chi ra su can thiet phai dung mo hinh da tang.",
    "domain": "Academic Acronym"
  },
  "RMSEA": {
    "full_name": "Root Mean Square Error of Approximation",
    "purpose": "Root Mean Square Error of Approximation, an absolute parsimony-adjusted goodness-of-fit index in structural equation modeling.",
    "benchmark": "RMSEA < 0.05 (phu hop xuat sac), 0.05 - 0.08 (phu hop acceptable), > 0.10 (phu hop kem); p-close > 0.05 (Kline, 2023).",
    "domain": "Academic Acronym"
  },
  "CFI": {
    "full_name": "Comparative Fit Index",
    "purpose": "Comparative Fit Index, an incremental fit index comparing the hypothesized model to a baseline independence null model.",
    "benchmark": "CFI >= 0.95 (ideal), CFI >= 0.90 (acceptable / Hu & Bentler, 1999; Hair et al., 2018).",
    "domain": "Academic Acronym"
  },
  "TLI": {
    "full_name": "Tucker-Lewis Index (Non-Normed Fit Index / NNFI)",
    "purpose": "Tucker-Lewis Index (Non-Normed Fit Index), evaluating model fit relative to a null model while penalizing model complexity.",
    "benchmark": "TLI >= 0.95 (ideal), TLI >= 0.90 (acceptable).",
    "domain": "Academic Acronym"
  },
  "SRMR": {
    "full_name": "Standardized Root Mean Square Residual",
    "purpose": "Standardized Root Mean Square Residual, evaluating the difference between observed sample covariance and model-implied covariance.",
    "benchmark": "SRMR < 0.08 (Hu & Bentler, 1999; Kline, 2023).",
    "domain": "Academic Acronym"
  },
  "AIC": {
    "full_name": "Akaike Information Criterion",
    "purpose": "An established academic research methodology standard representing Akaike Information Criterion, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Mo hinh co gia tri AIC small hon la mo hinh vuot troi hon.",
    "domain": "Academic Acronym"
  },
  "BIC": {
    "full_name": "Bayesian Information Criterion (Schwarz Criterion)",
    "purpose": "An established academic research methodology standard representing Bayesian Information Criterion (Schwarz Criterion), widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Chenh lech Delta BIC > 10 cho thay bang chung rat manh ung ho mo hinh co BIC small hon (Raftery, 1995).",
    "domain": "Academic Acronym"
  },
  "GoF": {
    "full_name": "Goodness of Fit",
    "purpose": "An established academic research methodology standard representing Goodness of Fit, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Trong CB-SEM: ket hop chi-square, RMSEA, CFI, TLI, SRMR. Trong PLS-SEM: Tenenhaus GoF = sqrt(AVE_tb * R²_tb).",
    "domain": "Academic Acronym"
  },
  "MIMIC": {
    "full_name": "Multiple Indicators, Multiple Causes Model",
    "purpose": "An established academic research methodology standard representing Multiple Indicators, Multiple Causes Model, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Giai quyet van de xac dinh mo hinh (identification) cho cac bien formative (Jarvis et al., 2003; MacKenzie et al., 2011).",
    "domain": "Academic Acronym"
  },
  "CAQDAS": {
    "full_name": "Computer-Assisted Qualitative Data Analysis Software",
    "purpose": "An established academic research methodology standard representing Computer-Assisted Qualitative Data Analysis Software, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Cac phan mem tieu chuan toan cau: ATLAS.ti, MAXQDA, NVivo (Flick et al., 2004).",
    "domain": "Academic Acronym"
  },
  "TSE": {
    "full_name": "Total Survey Error",
    "purpose": "An established academic research methodology standard representing Total Survey Error, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Bao gom sai so dac ta, sai so nguoi hoi, sai so bang hoi, sai so nguoi tra loi, sai so khung mau, sai so khong tra loi va sai so trong so (Groves et al.; Wiley 2020).",
    "domain": "Academic Acronym"
  },
  "IRB": {
    "full_name": "Institutional Review Board",
    "purpose": "An established academic research methodology standard representing Institutional Review Board, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Danh gia su dong thuan tu nguyen (Informed consent), bao mat danh tinh, giam thieu rui ro va ty le loi ich/rui ro.",
    "domain": "Academic Acronym"
  },
  "CAT": {
    "full_name": "Computerized Adaptive Testing",
    "purpose": "An established academic research methodology standard representing Computerized Adaptive Testing, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Rut ngan 50% thoi gian thi nhung van dam bao do chuan xac do luong dong deu tren toan bo dai nang luc.",
    "domain": "Academic Acronym"
  },
  "IV": {
    "full_name": "Independent Variable / Instrumental Variable",
    "purpose": "An established academic research methodology standard representing Independent Variable / Instrumental Variable, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Kiem dinh F > 10 cho bien cong cu; phan biet ro bien doc lap thuc nghiem voi bien dong bien (covariate).",
    "domain": "Academic Acronym"
  },
  "DV": {
    "full_name": "Dependent Variable",
    "purpose": "An established academic research methodology standard representing Dependent Variable, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Can duoc do luong voi do chuan xac high, kiem tra dang ham phan phoi va tranh sai so do luong.",
    "domain": "Academic Acronym"
  },
  "MV": {
    "full_name": "Mediating Variable / Moderating Variable",
    "purpose": "An established academic research methodology standard representing Mediating Variable / Moderating Variable, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Kiem dinh trung gian qua KTC Bootstrap gian tiep (Hayes); test dieu tiet qua tuong tac tich so va Johnson-Neyman.",
    "domain": "Academic Acronym"
  },
  "ATE": {
    "full_name": "Average Treatment Effect",
    "purpose": "An established academic research methodology standard representing Average Treatment Effect, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Uoc luong khong chech (unbiased) khi gia dinh gan ngau nhien (random assignment) hoac conditional independence duoc thoa man.",
    "domain": "Academic Acronym"
  },
  "ATT": {
    "full_name": "Average Treatment Effect on the Treated",
    "purpose": "An established academic research methodology standard representing Average Treatment Effect on the Treated, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Muc tieu uoc luong cot loi trong phuong phap Propensity Score Matching (PSM) va Difference-in-Differences (DID).",
    "domain": "Academic Acronym"
  },
  "ATU": {
    "full_name": "Average Treatment Effect on the Untreated",
    "purpose": "An established academic research methodology standard representing Average Treatment Effect on the Untreated, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Dung trong danh gia tiem nang mo rong chinh sach cong hoac can thiep y te/giao duc.",
    "domain": "Academic Acronym"
  },
  "SCM": {
    "full_name": "Synthetic Control Method",
    "purpose": "An established academic research methodology standard representing Synthetic Control Method, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Trong so cac don vi thanh phan nam trong doan [0, 1] va tong bang 1. Kiem dinh do vung bang Placebo Test (In-space & In-time placebos).",
    "domain": "Academic Acronym"
  },
  "DWH": {
    "full_name": "Durbin-Wu-Hausman Test",
    "purpose": "An established academic research methodology standard representing Durbin-Wu-Hausman Test, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "P-value < 0.05: Bac bo gia thuyet H0 (bien ngoai sinh), ket luan co hien tuong noi sinh va bat buoc phai dung bien cong cu (IV / 2SLS).",
    "domain": "Academic Acronym"
  },
  "FE": {
    "full_name": "Fixed Effects Model",
    "purpose": "An established academic research methodology standard representing Fixed Effects Model, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Lua chon qua test Hausman Test (P < 0.05 uu tien dung FE thay vi RE).",
    "domain": "Academic Acronym"
  },
  "RE": {
    "full_name": "Random Effects Model",
    "purpose": "An established academic research methodology standard representing Random Effects Model, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Duoc chon khi test Hausman co p-value > 0.05; cho phep uoc luong he so cua cac bien khong thay doi theo thoi gian (time-invariant variables).",
    "domain": "Academic Acronym"
  },
  "POLS": {
    "full_name": "Pooled Ordinary Least Squares",
    "purpose": "An established academic research methodology standard representing Pooled Ordinary Least Squares, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Kiem dinh Breusch-Pagan Lagrange Multiplier (LM test): Neu P < 0.05, mo hinh POLS bi bac bo, bat buoc dung Panel Models (FE hoac RE).",
    "domain": "Academic Acronym"
  },
  "SUR": {
    "full_name": "Seemingly Unrelated Regressions",
    "purpose": "An established academic research methodology standard representing Seemingly Unrelated Regressions, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Hieu qua hon OLS doc lap tung phuong trinh khi cac phan du co tuong quan cheo dang ke (Breusch-Pagan test of independence P < 0.05).",
    "domain": "Academic Acronym"
  },
  "VAR": {
    "full_name": "Vector Autoregression",
    "purpose": "An established academic research methodology standard representing Vector Autoregression, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Yeu cau cac chuoi phai dung I(0); lua chon do tre toi uu qua AIC, BIC hoac HQIC; test do on dinh (stability condition) qua nghiem cua da thuc dac trung nam trong duong tron don vi.",
    "domain": "Academic Acronym"
  },
  "VECM": {
    "full_name": "Vector Error Correction Model",
    "purpose": "An established academic research methodology standard representing Vector Error Correction Model, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "He so hieu chinh sai so (ECT) phai mang dau am va co y nghia thong ke (p < 0.05), bieu thi toc do dieu chinh ve trang thai can bang dai han.",
    "domain": "Academic Acronym"
  },
  "ARDL": {
    "full_name": "Autoregressive Distributed Lag",
    "purpose": "An established academic research methodology standard representing Autoregressive Distributed Lag, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "F-statistic trong Bounds Test vuot qua gia tri toi han Upper Bound I(1) o muc y nghia 5%: Ket luan co quan he dong lien ket dai han vung chac.",
    "domain": "Academic Acronym"
  },
  "ADF": {
    "full_name": "Augmented Dickey-Fuller Test",
    "purpose": "An established academic research methodology standard representing Augmented Dickey-Fuller Test, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "P-value < 0.05 (hoac t-statistic small hon gia tri toi han MacKinnon): Bac bo gia thuyet H0 (co nghiem don vi), chuoi thoi gian la chuoi dung.",
    "domain": "Academic Acronym"
  },
  "KPSS": {
    "full_name": "Kwiatkowski-Phillips-Schmidt-Shin Test",
    "purpose": "An established academic research methodology standard representing Kwiatkowski-Phillips-Schmidt-Shin Test, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "P-value > 0.05: Khong the bac bo H0, xac nhan chuoi thoi gian dung. Ket hop ADF va KPSS giup test cheo do tin cay.",
    "domain": "Academic Acronym"
  },
  "PRISMA": {
    "full_name": "Preferred Reporting Items for Systematic Reviews and Meta-Analyses",
    "purpose": "Preferred Reporting Items for Systematic Reviews and Meta-Analyses, the international reporting guideline for evidence synthesis.",
    "benchmark": "Bat buoc cong khai checklist 27 muc va so do 4 buoc chi tiet so luong bai bao bi loai tru kem ly do cu the.",
    "domain": "Academic Acronym"
  },
  "SLR": {
    "full_name": "Systematic Literature Review",
    "purpose": "An established academic research methodology standard representing Systematic Literature Review, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Bat buoc co chuoi tim kiem (Search String), co so du lieu xac dinh (Scopus, WoS), tieu chi dua vao/loai tru (Inclusion/Exclusion criteria) va quy trinh loc doc lap.",
    "domain": "Academic Acronym"
  },
  "PROSPERO": {
    "full_name": "International Prospective Register of Systematic Reviews",
    "purpose": "An established academic research methodology standard representing International Prospective Register of Systematic Reviews, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "So dang ky PROSPERO (CRD420...) duoc cac tap chi y hoc, xa hoi hoc va quan tri uy tin yeu cau cung cap ngay trong phan Phuong phap.",
    "domain": "Academic Acronym"
  },
  "ROBINS-I": {
    "full_name": "Risk Of Bias In Non-randomized Studies - of Interventions",
    "purpose": "An established academic research methodology standard representing Risk Of Bias In Non-randomized Studies - of Interventions, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Danh gia qua 7 mien (domains), phan loai rui ro: Low, Moderate, Serious, Critical, hoac No information.",
    "domain": "Academic Acronym"
  },
  "RoB 2": {
    "full_name": "Cochrane Risk of Bias Tool for Randomized Trials (Version 2)",
    "purpose": "An established academic research methodology standard representing Cochrane Risk of Bias Tool for Randomized Trials (Version 2), widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Tham dinh 5 mien rui ro: Qua trinh ngau nhien hoa, sai lech do can thiep, du lieu thieu, do luong ket qua, va bao cao chon loc.",
    "domain": "Academic Acronym"
  },
  "GRADE": {
    "full_name": "Grading of Recommendations Assessment, Development and Evaluation",
    "purpose": "Grading of Recommendations Assessment, Development and Evaluation, assessing the certainty of evidence in systematic reviews.",
    "benchmark": "Ha bac chat luong bang chung khi phat hien: Risk of Bias, Inconsistency, Indirectness, Imprecision, hoac Publication Bias.",
    "domain": "Academic Acronym"
  },
  "PICO": {
    "full_name": "Population, Intervention, Comparison, Outcome",
    "purpose": "An established academic research methodology standard representing Population, Intervention, Comparison, Outcome, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Bat buoc xac dinh ro rang ca 4 thanh to truoc khi xay dung tu khoa tim kiem tren Web of Science / PubMed / Scopus.",
    "domain": "Academic Acronym"
  },
  "SPIDER": {
    "full_name": "Sample, Phenomenon of Interest, Design, Evaluation, Research type",
    "purpose": "An established academic research methodology standard representing Sample, Phenomenon of Interest, Design, Evaluation, Research type, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Duoc cac reviewer Q1 danh gia high khi xay dung tieu chi sang loc tai lieu dinh tinh thay vi ep dung khung PICO cua nghien cuu y sinh.",
    "domain": "Academic Acronym"
  },
  "CONSORT": {
    "full_name": "Consolidated Standards of Reporting Trials",
    "purpose": "Consolidated Standards of Reporting Trials, the international reporting standard for randomized clinical and behavioral experiments.",
    "benchmark": "Checklist 25 tieu chi kem bieu do dong chay phan bo nguoi tham gia (Enrolment, Allocation, Follow-up, Analysis).",
    "domain": "Academic Acronym"
  },
  "STROBE": {
    "full_name": "Strengthening the Reporting of Observational Studies in Epidemiology",
    "purpose": "Strengthening the Reporting of Observational Studies in Epidemiology, guidelines for cohort, case-control, and cross-sectional studies.",
    "benchmark": "Checklist 22 muc bao gom tieu de, tom tat, phuong phap chon mau, kiem soat bien gay nhieu va xu ly du lieu khuyet.",
    "domain": "Academic Acronym"
  },
  "COREQ": {
    "full_name": "Consolidated Criteria for Reporting Qualitative Research",
    "purpose": "Consolidated Criteria for Reporting Qualitative Research, an international checklist for interview and focus group studies.",
    "benchmark": "Bat buoc bao cao 3 mien: Dac diem nhom nghien cuu & tinh phan tu (reflexivity), thiet ke nghien cuu, va phan tich du lieu.",
    "domain": "Academic Acronym"
  },
  "SRQR": {
    "full_name": "Standards for Reporting Qualitative Research",
    "purpose": "Standards for Reporting Qualitative Research, establishing comprehensive reporting guidelines for qualitative inquiry.",
    "benchmark": "Tap trung giai trinh ro rang moi quan he giua cau hoi nghien cuu, lap truong nhan thuc luan (epistemology) va ky thuat phan tich.",
    "domain": "Academic Acronym"
  },
  "OSF": {
    "full_name": "Open Science Framework",
    "purpose": "An established academic research methodology standard representing Open Science Framework, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Tao DOI vinh vien va timestamp khong the chinh sua, chung minh gia thuyet nghien cuu duoc xac lap truoc khi thu thap so lieu.",
    "domain": "Academic Acronym"
  },
  "COPE": {
    "full_name": "Committee on Publication Ethics",
    "purpose": "An established academic research methodology standard representing Committee on Publication Ethics, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Moi tap chi Scopus/WoS uy tin deu cam ket tuan thu quy tac va luu do giai quyet tranh chap (flowcharts) cua COPE.",
    "domain": "Academic Acronym"
  },
  "CRediT": {
    "full_name": "Contributor Roles Taxonomy",
    "purpose": "An established academic research methodology standard representing Contributor Roles Taxonomy, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Bat buoc khai bao tai cac nha xuat ban hang dau (Elsevier, Springer Nature, Wiley, PLOS) nham xoa bo tinh trang 'tac gia danh du' (gift authorship).",
    "domain": "Academic Acronym"
  },
  "MGA": {
    "full_name": "Multi-Group Analysis",
    "purpose": "An established academic research methodology standard representing Multi-Group Analysis, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Yeu cau tien quyet: Phai dat bat bien do luong (Measurement Invariance) truoc khi so sanh tham so cau truc giua cac nhom (Henseler's MGA, PLS-MGA p < 0.05 hoac > 0.95).",
    "domain": "Academic Acronym"
  },
  "IPMA": {
    "full_name": "Importance-Performance Map Analysis",
    "purpose": "An established academic research methodology standard representing Importance-Performance Map Analysis, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Xac dinh cac yeu to nam o goc 'Tam quan trong high nhung Hieu qua thap' (High importance, Low performance) la uu tien hanh dong so 1.",
    "domain": "Academic Acronym"
  },
  "FIMIX-PLS": {
    "full_name": "Finite Mixture Partial Least Squares",
    "purpose": "An established academic research methodology standard representing Finite Mixture Partial Least Squares, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Danh gia so luong phan doan toi uu ($K$) thong qua cac chi so thong tin AIC3 (Akaike Information Criterion with factor 3) va CAIC.",
    "domain": "Academic Acronym"
  },
  "PLSpredict": {
    "full_name": "Partial Least Squares Prediction Assessment",
    "purpose": "An established academic research methodology standard representing Partial Least Squares Prediction Assessment, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "So sanh RMSE (hoac MAE) cua PLS-SEM voi mo hinh hoi quy tuyen tinh LM: Neu da so chi bao co sai so small hon LM $\\rightarrow$ Mo hinh dat nang luc du bao high (High predictive power).",
    "domain": "Academic Acronym"
  },
  "ULMC": {
    "full_name": "Unmeasured Latent Marker Construct",
    "purpose": "An established academic research methodology standard representing Unmeasured Latent Marker Construct, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "So sanh Model Fit giua Baseline Model va Constrained Model: Neu cac he so duong dan chinh van giu nguyen y nghia thong ke thi nghien cuu khong bi CMV de doa.",
    "domain": "Academic Acronym"
  },
  "QRP": {
    "full_name": "Questionable Research Practices",
    "purpose": "An established academic research methodology standard representing Questionable Research Practices, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Bi cac tap chi quoc te hang dau ap dung cac bien phap trung phat, yeu cau nop ma nguon R/Stata va file du lieu tho de kiem chung doc lap.",
    "domain": "Academic Acronym"
  },
  "HARK": {
    "full_name": "Hypothesizing After the Results are Known",
    "purpose": "An established academic research methodology standard representing Hypothesizing After the Results are Known, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Bi triet tieu khi bai bao thuc hien dang ky truoc thiet ke nghien cuu (Preregistration) tai Open Science Framework.",
    "domain": "Academic Acronym"
  },
  "FDR": {
    "full_name": "False Discovery Rate",
    "purpose": "An established academic research methodology standard representing False Discovery Rate, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Thuong kiem soat o muc $q = 0.05$ hoac $0.10$; it khat khe hon hieu chinh Bonferroni truyen thong, giup bao toan luc test thong ke (statistical power).",
    "domain": "Academic Acronym"
  },
  "FWER": {
    "full_name": "Family-Wise Error Rate",
    "purpose": "An established academic research methodology standard representing Family-Wise Error Rate, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Quy tac Bonferroni: Chia muc y nghia $\\alpha$ (0.05) cho so luong test ($m$), muc y nghia moi la $\\alpha / m$.",
    "domain": "Academic Acronym"
  },
  "LASSO": {
    "full_name": "Least Absolute Shrinkage and Selection Operator",
    "purpose": "An established academic research methodology standard representing Least Absolute Shrinkage and Selection Operator, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Tham so phat $\\lambda$ duoc tinh chinh toi uu thong qua $k$-fold Cross-Validation nham toi thieu hoa sai so du bao.",
    "domain": "Academic Acronym"
  },
  "LDA": {
    "full_name": "Latent Dirichlet Allocation",
    "purpose": "An established academic research methodology standard representing Latent Dirichlet Allocation, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Danh gia chat luong chu de qua chi so Topic Coherence (Cv score > 0.50) va Perplexity.",
    "domain": "Academic Acronym"
  },
  "XAI": {
    "full_name": "Explainable Artificial Intelligence",
    "purpose": "An established academic research methodology standard representing Explainable Artificial Intelligence, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Bat buoc ap dung trong cac nghien cuu ra quyet dinh y khoa, tai chinh va chinh sach cong (SHAP values, LIME).",
    "domain": "Academic Acronym"
  },
  "SHAP": {
    "full_name": "Shapley Additive Explanations",
    "purpose": "An established academic research methodology standard representing Shapley Additive Explanations, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Dap ung day du 3 tinh chat tien nghiem toan hoc: Local accuracy, Missingness, va Consistency.",
    "domain": "Academic Acronym"
  },
  "TA": {
    "full_name": "Thematic Analysis",
    "purpose": "An established academic research methodology standard representing Thematic Analysis, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Tuan thu nghiem ngat quy trinh 6 buoc: Lam quen du lieu $\\rightarrow$ Tao ma ban dau $\\rightarrow$ Tim chu de $\\rightarrow$ Ra soat chu de $\\rightarrow$ Dinh nghia & dat ten $\\rightarrow$ Viet bao cao.",
    "domain": "Academic Acronym"
  },
  "GT": {
    "full_name": "Grounded Theory",
    "purpose": "An established academic research methodology standard representing Grounded Theory, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Yeu cau quy trinh so sanh lien tuc (Constant Comparative Method), lay mau ly thuyet (Theoretical Sampling) va dung lai khi dat diem bao hoa ly thuyet (Theoretical Saturation).",
    "domain": "Academic Acronym"
  },
  "CDA": {
    "full_name": "Critical Discourse Analysis",
    "purpose": "An established academic research methodology standard representing Critical Discourse Analysis, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Phan tich da tang theo mo hinh 3 chieu cua Fairclough: Van ban (Text) $\\rightarrow$ Thuc hanh dien ngon (Discursive practice) $\\rightarrow$ Thuc hanh xa hoi (Social practice).",
    "domain": "Academic Acronym"
  },
  "NGT": {
    "full_name": "Nominal Group Technique",
    "purpose": "An established academic research methodology standard representing Nominal Group Technique, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Quy trinh 4 pha: Tao y tuong tham lang $\\rightarrow$ Thu thap vong tron $\\rightarrow$ Thao luan lam ro $\\rightarrow$ Bo phieu xep hang doc lap.",
    "domain": "Academic Acronym"
  },
  "ROC": {
    "full_name": "Receiver Operating Characteristic",
    "purpose": "An established academic research methodology standard representing Receiver Operating Characteristic, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Dien tich duoi duong cong (AUC) $\\ge 0.80$ bieu thi kha nang phan loai tot; $\\ge 0.90$ la xuat sac; $0.50$ tuong duong doan mo ngau nhien.",
    "domain": "Academic Acronym"
  },
  "AUC": {
    "full_name": "Area Under the ROC Curve",
    "purpose": "An established academic research methodology standard representing Area Under the ROC Curve, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "AUC = 0.5 (khong co gia tri phan biet); AUC = 0.7 - 0.8 (acceptable); AUC > 0.8 (tot); AUC > 0.9 (rat xuat sac).",
    "domain": "Academic Acronym"
  },
  "RMSE": {
    "full_name": "Root Mean Square Error",
    "purpose": "An established academic research methodology standard representing Root Mean Square Error, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Cang small cang tot; dung de so sanh hieu nang du bao ngoai mau giua cac mo hinh canh tranh tren cung mot tap du lieu.",
    "domain": "Academic Acronym"
  },
  "MAE": {
    "full_name": "Mean Absolute Error",
    "purpose": "An established academic research methodology standard representing Mean Absolute Error, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Dung ket hop voi RMSE; khoang cach giua RMSE va MAE cang large chung to du lieu co variance sai so large hoac nhieu diem ngoai lai.",
    "domain": "Academic Acronym"
  },
  "WLS": {
    "full_name": "Weighted Least Squares",
    "purpose": "An established academic research methodology standard representing Weighted Least Squares, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Khoi phuc tinh chat BLUE (Best Linear Unbiased Estimator) cua uoc luong hoi quy khi cau truc cua variance sai so da duoc biet truoc.",
    "domain": "Academic Acronym"
  },
  "GLS": {
    "full_name": "Generalized Least Squares",
    "purpose": "An established academic research methodology standard representing Generalized Least Squares, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Hieu qua hon OLS thong thuong; duoc hien thuc hoa qua Feasible Generalized Least Squares (FGLS) khi ma tran hiep variance sai so chua biet.",
    "domain": "Academic Acronym"
  },
  "3SLS": {
    "full_name": "Three-Stage Least Squares",
    "purpose": "An established academic research methodology standard representing Three-Stage Least Squares, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Hieu qua hon 2SLS khi cac phan du co tuong quan cheo dang ke va toan bo he phuong trinh duoc dinh dang chuan xac.",
    "domain": "Academic Acronym"
  },
  "MLE": {
    "full_name": "Maximum Likelihood Estimation",
    "purpose": "An established academic research methodology standard representing Maximum Likelihood Estimation, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Dat tinh chat tiem can toi uu (Asymptotically efficient va Consistent) khi co mau du large va thoa man gia dinh phan phoi chuan da bien.",
    "domain": "Academic Acronym"
  },
  "QMLE": {
    "full_name": "Quasi-Maximum Likelihood Estimation",
    "purpose": "An established academic research methodology standard representing Quasi-Maximum Likelihood Estimation, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Cho uoc luong vung ve cac he so ngay ca khi vi pham phan phoi chuan, mien la ham ky vong co dieu kien duoc dinh dang dung; bat buoc dung sai so chuan vung (Huber-White Sandwich standard errors).",
    "domain": "Academic Acronym"
  },
  "LAD": {
    "full_name": "Least Absolute Deviations",
    "purpose": "An established academic research methodology standard representing Least Absolute Deviations, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Rat vung truoc cac diem ngoai lai (outliers) cuc doan va phan phoi duoi day (heavy-tailed distributions).",
    "domain": "Academic Acronym"
  },
  "RESET": {
    "full_name": "Ramsey Regression Equation Specification Error Test",
    "purpose": "An established academic research methodology standard representing Ramsey Regression Equation Specification Error Test, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "P-value > 0.05: Khong bac bo gia thuyet H0, ket luan mo hinh khong co bang chung vi pham dang ham.",
    "domain": "Academic Acronym"
  },
  "CUSUM": {
    "full_name": "Cumulative Sum Control Chart Test",
    "purpose": "An established academic research methodology standard representing Cumulative Sum Control Chart Test, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Duong bieu dien CUSUM va CUSUMSQ phai nam hoan toan ben trong hai dai bien toi han o muc y nghia 5%.",
    "domain": "Academic Acronym"
  },
  "GARCH": {
    "full_name": "Generalized Autoregressive Conditional Heteroskedasticity",
    "purpose": "An established academic research methodology standard representing Generalized Autoregressive Conditional Heteroskedasticity, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Tong cac he so ARCH va GARCH ($\\alpha + \\beta$) phai small hon 1 de dam bao tinh dung cua variance co dieu kien.",
    "domain": "Academic Acronym"
  },
  "CEM": {
    "full_name": "Coarsened Exact Matching",
    "purpose": "An established academic research methodology standard representing Coarsened Exact Matching, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Giam thieu chi so mat can bang da bien $\\mathcal{L}_1$ ($L_1$ statistic sau ghep cap phai small hon dang ke so voi truoc ghep cap).",
    "domain": "Academic Acronym"
  },
  "IPW": {
    "full_name": "Inverse Probability Weighting",
    "purpose": "An established academic research methodology standard representing Inverse Probability Weighting, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Ket hop voi mo hinh ket qua tao thanh 'Uoc luong Vung kep' (Doubly Robust Estimator: chi can mot trong hai mo hinh dung thi uoc luong nhan qua van khong chech).",
    "domain": "Academic Acronym"
  },
  "ESEM": {
    "full_name": "Exploratory Structural Equation Modeling",
    "purpose": "An established academic research methodology standard representing Exploratory Structural Equation Modeling, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "So sanh Model Fit giua CFA truyen thong va ESEM; ESEM thuong cho he so tuong quan giua cac nhan to thuc te hon va chi so fit vuot troi (CFI tang, RMSEA giam).",
    "domain": "Academic Acronym"
  },
  "CLF": {
    "full_name": "Common Latent Factor",
    "purpose": "An established academic research methodology standard representing Common Latent Factor, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "So sanh cac he so tai chuan hoa (standardized factor loadings) truoc va sau khi co CLF: neu do lech $\\Delta \\lambda < 0.20$, ket luan CMV khong lam thay doi ban chat thang do.",
    "domain": "Academic Acronym"
  },
  "DIF": {
    "full_name": "Differential Item Functioning",
    "purpose": "An established academic research methodology standard representing Differential Item Functioning, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Kiem dinh Mantel-Haenszel hoac mo hinh hoi quy Logistic IRT co $p < .05$ va do lech kich thuoc hieu ung large (ETS delta classification: Class C bieu thi DIF severe).",
    "domain": "Academic Acronym"
  },
  "PAR": {
    "full_name": "Participatory Action Research",
    "purpose": "An established academic research methodology standard representing Participatory Action Research, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Chu trinh xoan oc lap lap 4 pha: Lap ke hoach $\\rightarrow$ Hanh dong can thiep $\\rightarrow$ Quan sat $\\rightarrow$ Phan tu danh gia (Lewin / Kemmis & McTaggart).",
    "domain": "Academic Acronym"
  },
  "MMAT": {
    "full_name": "Mixed Methods Appraisal Tool",
    "purpose": "An established academic research methodology standard representing Mixed Methods Appraisal Tool, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "5 tieu chuan cot loi danh gia phan tich hop: Ly do dung hon hop, su ket hop du lieu, tich hop ket qua, su giai thich mau thuan, va tuan thu chuan muc tung nhanh.",
    "domain": "Academic Acronym"
  },
  "CASP": {
    "full_name": "Critical Appraisal Skills Programme",
    "purpose": "An established academic research methodology standard representing Critical Appraisal Skills Programme, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "10 cau hoi cot loi sang loc tinh gia tri ket qua, phuong phap luan chat che va kha nang ap dung tai dia phuong.",
    "domain": "Academic Acronym"
  },
  "NOS": {
    "full_name": "Newcastle-Ottawa Scale",
    "purpose": "An established academic research methodology standard representing Newcastle-Ottawa Scale, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "He thong xep hang sao (toi da 9 sao) qua 3 nhom tieu chi: Lua chon nhom nghien cuu (4 sao), Tinh so sanh duoc (2 sao), va Do luong ket qua/phoi nhiem (3 sao). Nghien cuu $\\ge 7$ sao duoc xep loai chat luong high.",
    "domain": "Academic Acronym"
  },
  "JIF": {
    "full_name": "Journal Impact Factor",
    "purpose": "An established academic research methodology standard representing Journal Impact Factor, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Tinh bang: Tong so trich dan trong nam hien tai cho cac bai bao xuat ban trong 2 nam truoc chia cho tong so bai bao co the trich dan duoc xuat ban trong 2 nam do.",
    "domain": "Academic Acronym"
  },
  "SJR": {
    "full_name": "SCImago Journal Rank",
    "purpose": "An established academic research methodology standard representing SCImago Journal Rank, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Phan chia thu hang tap chi thanh 4 phan vi: Q1 (top 25%), Q2 (25% - 50%), Q3 (50% - 75%), va Q4 (bottom 25%) theo tung linh vuc chuyen nganh.",
    "domain": "Academic Acronym"
  },
  "SNIP": {
    "full_name": "Source Normalized Impact per Paper",
    "purpose": "An established academic research methodology standard representing Source Normalized Impact per Paper, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "SNIP = 1.0 bieu thi tap chi dat muc trich dan trung binh cua toan bo linh vuc; SNIP > 1.5 bieu thi tap chi co tac dong vuot troi so voi muc binh quan chuyen nganh.",
    "domain": "Academic Acronym"
  },
  "GFI": {
    "full_name": "Goodness of Fit Index",
    "purpose": "An established academic research methodology standard representing Goodness of Fit Index, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Gia tri GFI $\\ge 0.90$ (hoac khat khe $\\ge 0.95$) bieu thi mo hinh phu hop tot voi du lieu thuc te.",
    "domain": "Academic Acronym"
  },
  "AGFI": {
    "full_name": "Adjusted Goodness of Fit Index",
    "purpose": "An established academic research methodology standard representing Adjusted Goodness of Fit Index, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Gia tri AGFI $\\ge 0.85$ hoac $\\ge 0.90$ bieu thi mo hinh dat chuan phu hop.",
    "domain": "Academic Acronym"
  },
  "NFI": {
    "full_name": "Normed Fit Index",
    "purpose": "An established academic research methodology standard representing Normed Fit Index, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Gia tri NFI $\\ge 0.90$ hoac $\\ge 0.95$ bieu thi mo hinh phu hop tot; nhuoc diem la bi danh gia thap khi co mau small.",
    "domain": "Academic Acronym"
  },
  "NNFI": {
    "full_name": "Non-Normed Fit Index (Tucker-Lewis Index - TLI)",
    "purpose": "An established academic research methodology standard representing Non-Normed Fit Index (Tucker-Lewis Index - TLI), widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Gia tri TLI/NNFI $\\ge 0.90$ la acceptable; $\\ge 0.95$ la xuat sac.",
    "domain": "Academic Acronym"
  },
  "IFI": {
    "full_name": "Incremental Fit Index",
    "purpose": "An established academic research methodology standard representing Incremental Fit Index, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Gia tri IFI $\\ge 0.90$ bieu thi mo hinh cau truc phu hop tot voi du lieu khao sat.",
    "domain": "Academic Acronym"
  },
  "RMR": {
    "full_name": "Root Mean Square Residual",
    "purpose": "An established academic research methodology standard representing Root Mean Square Residual, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Cang small cang tot; tuy nhien vi phu thuoc vao don vi do cua cac bien nen ngay nay hau het reviewer yeu cau dung phien ban chuan hoa SRMR (< 0.08).",
    "domain": "Academic Acronym"
  },
  "RRA": {
    "full_name": "Randomized Response Analysis",
    "purpose": "An established academic research methodology standard representing Randomized Response Analysis, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Cho phep uoc luong ty le thuc te cua quan the ma khong ai co the biet chinh xac tung ca nhan da tra loi Co hay Khong.",
    "domain": "Academic Acronym"
  },
  "DOR": {
    "full_name": "Diagnostic Odds Ratio",
    "purpose": "An established academic research methodology standard representing Diagnostic Odds Ratio, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "DOR = 1 bieu thi cong cu khong co kha nang phan biet benh tat; DOR cang large hon 1 bieu thi do chinh xac chan doan cang vuot troi.",
    "domain": "Academic Acronym"
  },
  "SROC": {
    "full_name": "Summary Receiver Operating Characteristic",
    "purpose": "An established academic research methodology standard representing Summary Receiver Operating Characteristic, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Dien tich duoi duong cong SROC (AUC) tiem can 1.0 bieu thi cong cu do luong dat do tin cay chan doan toi uu.",
    "domain": "Academic Acronym"
  },
  "IPD": {
    "full_name": "Individual Participant Data",
    "purpose": "An established academic research methodology standard representing Individual Participant Data, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Loai bo hoan toan thien lech sinh thai (Ecological fallacy) va cho phep phan tich tuong tac dieu tiet o cap do ca the chinh xac 100%.",
    "domain": "Academic Acronym"
  },
  "NMA": {
    "full_name": "Network Meta-Analysis",
    "purpose": "An established academic research methodology standard representing Network Meta-Analysis, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Bat buoc kiem tra gia dinh chuyen tiep (Transitivity assumption) va tinh nhat quan (Inconsistency test giua direct va indirect p > .05). Xep hang can thiep qua dien tich SUCRA (Surface Under the Cumulative Ranking Curve).",
    "domain": "Academic Acronym"
  },
  "SUCRA": {
    "full_name": "Surface Under the Cumulative Ranking Curve",
    "purpose": "An established academic research methodology standard representing Surface Under the Cumulative Ranking Curve, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "SUCRA = 100%: Can thiep chac chan la tot nhat; SUCRA = 0%: Can thiep chac chan la toi te nhat.",
    "domain": "Academic Acronym"
  },
  "QCA": {
    "full_name": "Qualitative Comparative Analysis",
    "purpose": "An established academic research methodology standard representing Qualitative Comparative Analysis, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Danh gia qua hai chi so cot loi: Do nhat quan (Consistency > 0.80) va Do bao phu (Coverage).",
    "domain": "Academic Acronym"
  },
  "csQCA": {
    "full_name": "Crisp-Set Qualitative Comparative Analysis",
    "purpose": "An established academic research methodology standard representing Crisp-Set Qualitative Comparative Analysis, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Xay dung Bang Chan ly (Truth Table) va giai ma bang thuat toan toi thieu hoa Quine-McCluskey.",
    "domain": "Academic Acronym"
  },
  "fsQCA": {
    "full_name": "Fuzzy-Set Qualitative Comparative Analysis",
    "purpose": "An established academic research methodology standard representing Fuzzy-Set Qualitative Comparative Analysis, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Kham pha cac cau hinh dieu kien du (Sufficient configurations) va dieu kien can (Necessary conditions, Consistency > 0.90).",
    "domain": "Academic Acronym"
  },
  "mvQCA": {
    "full_name": "Multi-Value Qualitative Comparative Analysis",
    "purpose": "An established academic research methodology standard representing Multi-Value Qualitative Comparative Analysis, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Giam thieu ton that thong tin khi phan loai cac bien the che hoac chinh sach co nhieu trang thai ro rang.",
    "domain": "Academic Acronym"
  },
  "SEM-PLS": {
    "full_name": "Partial Least Squares Structural Equation Modeling",
    "purpose": "An established academic research methodology standard representing Partial Least Squares Structural Equation Modeling, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Lua chon so 1 cho cac nghien cuu du bao, mo hinh co cau truc phuc tap, thang do ket hop Formative, hoac du lieu khong phan phoi chuan.",
    "domain": "Academic Acronym"
  },
  "MABI": {
    "full_name": "Model of Athlete Brand Image",
    "purpose": "An established academic research methodology standard representing Model of Athlete Brand Image, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Duoc ap dung chuan muc trong quan tri the thao va tiep thi mang xa hoi (Instagram, Twitter).",
    "domain": "Academic Acronym"
  },
  "SPT": {
    "full_name": "Self-Presentation Theory",
    "purpose": "An established academic research methodology standard representing Self-Presentation Theory, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Ly thuyet nen tang trong nghien cuu hanh vi nguoi dung mang xa hoi va xay dung thuong hieu ca nhan.",
    "domain": "Academic Acronym"
  },
  "SPAR-4-SLR": {
    "full_name": "Scientific Procedures and Rationales for Systematic Literature Reviews",
    "purpose": "An established academic research methodology standard representing Scientific Procedures and Rationales for Systematic Literature Reviews, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Tieu chuan bao cao phuong phap luan xuat sac cho cac bai bao Literature Review tren cac tap chi Q1 (JBR, IJCS).",
    "domain": "Academic Acronym"
  },
  "CEBs": {
    "full_name": "Consumer Engagement Behaviors",
    "purpose": "An established academic research methodology standard representing Consumer Engagement Behaviors, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Khung ly thuyet nen tang trong tiep thi so va nghien cuu cong dong mang xa hoi.",
    "domain": "Academic Acronym"
  },
  "OBC": {
    "full_name": "Online Brand Community",
    "purpose": "An established academic research methodology standard representing Online Brand Community, widely referenced in quantitative, psychometric, or econometric inquiry.",
    "benchmark": "Doi tuong nghien cuu trong tam trong phuong phap Dan toc hoc mang (Netnography).",
    "domain": "Academic Acronym"
  }
};

/**
 * Lấy định nghĩa mục từ chuẩn hóa theo ngôn ngữ
 */
export function getTermDefinition(term: MethodologyTerm, lang: "vi" | "en"): string {
  if (lang === "en") {
    if (term.core_definition_en && term.core_definition_en.trim()) {
      return term.core_definition_en.trim();
    }
    const mono = MONOLINGUAL_TERMS_EN[term.id];
    if (mono?.core_definition) {
      return mono.core_definition;
    }
    return `An established academic research methodology concept denoting ${term.term}, foundational to rigorous research design and empirical measurement in social and scientific inquiry.`;
  }
  return term.core_definition;
}

/**
 * Lấy ngưỡng tham chiếu theo ngôn ngữ
 */
export function getTermBenchmarks(term: MethodologyTerm, lang: "vi" | "en"): string | undefined {
  if (lang === "en") {
    if (term.benchmarks_en && term.benchmarks_en.trim()) return term.benchmarks_en.trim();
    const mono = MONOLINGUAL_TERMS_EN[term.id];
    if (mono?.benchmarks) return mono.benchmarks;
    return undefined;
  }
  return term.benchmarks;
}

/**
 * Lấy cạm bẫy phương pháp theo ngôn ngữ
 */
export function getTermPitfalls(term: MethodologyTerm, lang: "vi" | "en"): string | undefined {
  if (lang === "en") {
    if (term.pitfalls_en && term.pitfalls_en.trim()) return term.pitfalls_en.trim();
    const mono = MONOLINGUAL_TERMS_EN[term.id];
    if (mono?.pitfalls) return mono.pitfalls;
    return undefined;
  }
  return term.pitfalls;
}

/**
 * Lấy tranh luận học thuật theo ngôn ngữ
 */
export function getTermDebates(term: MethodologyTerm, lang: "vi" | "en"): string | undefined {
  if (lang === "en") {
    if (term.paradigm_debates_en && term.paradigm_debates_en.trim()) return term.paradigm_debates_en.trim();
    const mono = MONOLINGUAL_TERMS_EN[term.id];
    if (mono?.paradigm_debates) return mono.paradigm_debates;
    return undefined;
  }
  return term.paradigm_debates;
}

/**
 * Lấy domain tags theo ngôn ngữ (Đảm bảo 100% tiếng Anh khi ở chế độ EN)
 */
export function getTermDomainTags(term: MethodologyTerm, lang: "vi" | "en"): string[] {
  if (lang === "en") {
    if (term.domain_tags_en && term.domain_tags_en.length > 0) return term.domain_tags_en;
    const mono = MONOLINGUAL_TERMS_EN[term.id];
    if (mono?.domain_tags) return mono.domain_tags;
    return term.domain_tags.map(tag => DOMAIN_TRANSLATIONS[tag] || tag.replace(/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/gi, ""));
  }
  return term.domain_tags;
}

/**
 * Lấy mục đích từ viết tắt theo ngôn ngữ
 */
export function getAcronymPurpose(acronym: AcademicAcronym, lang: "vi" | "en"): string {
  if (lang === "en") {
    if (acronym.purpose_en && acronym.purpose_en.trim()) return acronym.purpose_en.trim();
    const key = Object.keys(MONOLINGUAL_ACRONYMS_EN).find(k => MONOLINGUAL_ACRONYMS_EN[k].full_name.toLowerCase() === acronym.full_name.toLowerCase());
    if (key && MONOLINGUAL_ACRONYMS_EN[key]?.purpose) {
      return MONOLINGUAL_ACRONYMS_EN[key].purpose;
    }
    return `Academic acronym representing ${acronym.full_name}, widely referenced in quantitative, psychometric, or methodological research literature.`;
  }
  return acronym.purpose;
}

/**
 * Lấy ngưỡng từ viết tắt theo ngôn ngữ
 */
export function getAcronymBenchmark(acronym: AcademicAcronym, lang: "vi" | "en"): string | undefined {
  if (lang === "en") {
    if (acronym.benchmark_en && acronym.benchmark_en.trim()) return acronym.benchmark_en.trim();
    const key = Object.keys(MONOLINGUAL_ACRONYMS_EN).find(k => MONOLINGUAL_ACRONYMS_EN[k].full_name.toLowerCase() === acronym.full_name.toLowerCase());
    if (key && MONOLINGUAL_ACRONYMS_EN[key]?.benchmark) {
      return MONOLINGUAL_ACRONYMS_EN[key].benchmark;
    }
    return undefined;
  }
  return acronym.benchmark;
}

/**
 * Lấy domain từ viết tắt theo ngôn ngữ
 */
export function getAcronymDomain(acronym: AcademicAcronym, lang: "vi" | "en"): string {
  if (lang === "en") {
    return acronym.domain_en || "Academic Acronym";
  }
  return acronym.domain || "Từ viết tắt";
}
