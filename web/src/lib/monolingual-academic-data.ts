import type { MethodologyTerm, AcademicAcronym } from "./types";

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
    sec_operational_mechanism: "Cơ chế Vận hành & Mô hình Phương pháp luận (Operational Mechanism)",
    sec_benchmarks: "Ngưỡng Thực nghiệm & Tiêu chuẩn Phán quyết (Empirical Benchmarks)",
    sec_pitfalls: "Cạm bẫy Phương pháp luận & Điểm Đỏ Phản biện (Methodological Pitfalls)",
    sec_debates: "Tranh luận Học thuật & Trường phái",
    sec_literature: "Nguồn Trích Dẫn Học Thuật Uy Tín",
    sec_variants: "Các Thành tố Trực thuộc & Biến thể Đo lường",
    sec_related_terms: "Thuật ngữ Liên quan & Xem thêm (Related Concepts)",
    related_terms_hint: "Khám phá các thuật ngữ cùng nhóm phương pháp luận hoặc cơ chế tương đồng",
    jump_tooltip: "Nhấp để chuyển nhanh sang mục từ này",
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
    feedback_success_desc: "Ý kiến của bạn đã được ghi nhận. Ban biên tập sẽ rà soát và cập nhật trong các phiên bản tiếp theo.",
    btn_edit_term: "Sửa mục từ",
    btn_edit_section: "Sửa phần này",
    btn_new_term: "+ Đề xuất từ mới",
    tooltip_edit_term: "Đề xuất chỉnh sửa học thuật cho mục từ này (Cơ chế Wiki)",
    tooltip_new_term: "Đề xuất bổ sung một thuật ngữ phương pháp mới vào từ điển",
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
    sec_operational_mechanism: "Operational Mechanism & Methodological Framework",
    sec_benchmarks: "Empirical Benchmarks & Decision Thresholds",
    sec_pitfalls: "Methodological Pitfalls & Reviewer Red Flags",
    sec_debates: "Paradigm Debates & Epistemological Stance",
    sec_literature: "Seminal Literature & APA 7th References",
    sec_variants: "Sub-dimensions & Measurement Variants",
    sec_related_terms: "Related Methodology Concepts & Cross-References",
    related_terms_hint: "Explore closely related methodological frameworks, estimators, and diagnostic concepts",
    jump_tooltip: "Click to navigate directly to this term",
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
    feedback_success_desc: "Your feedback has been logged. The editorial committee will review it for upcoming lexicon revisions.",
    btn_edit_term: "Edit Term",
    btn_edit_section: "Edit Section",
    btn_new_term: "+ Propose Term",
    tooltip_edit_term: "Propose scholarly revisions for this entry (Wiki peer-review)",
    tooltip_new_term: "Propose a new research methodology term to the lexicon",
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
  "Qualitative & Mixed Methods": "Qualitative & Mixed Methods",
  "Suy luận Nhân quả": "Causal Inference",
  "Dịch tễ học & Kinh tế lượng": "Epidemiology & Econometrics",
  "Trí tuệ Nhân tạo": "Artificial Intelligence",
  "Kinh tế lượng Hiện đại": "Modern Econometrics",
  "Học máy Thực nghiệm": "Empirical Machine Learning",
  "Suy luận Nhân quả Dữ liệu lớn": "High-Dimensional Causal Inference",
  "Phương pháp Nghiên cứu Quản trị": "Management Research Methods",
  "Quan hệ Nhân quả Bất đối xứng": "Asymmetric Causality",
  "Phân tích Dữ liệu Thực nghiệm": "Empirical Data Analysis",
  "Đánh giá Mô hình Cấu trúc": "Structural Model Assessment",
  "Năng lực Dự báo Ngoài mẫu": "Out-of-Sample Predictive Power",
  "PLS-SEM & CB-SEM": "PLS-SEM & CB-SEM",
  "Lựa chọn Mô hình": "Model Selection",
  "Đánh giá Năng lực Dự báo": "Predictive Ability Evaluation",
  "Mô hình Đo lường Phản ánh": "Reflective Measurement Models",
  "Hiệu chỉnh Sai số Đo lường": "Measurement Error Correction",
  "CFA & SEM": "CFA & SEM",
  "Kiểm soát Thiên lệch Phương pháp Chung (CMB)": "Common Method Bias (CMB) Control",
  "Thẩm định Đo lường": "Measurement Validation",
  "Xử lý Biến Nội sinh": "Endogeneity Remedies",
  "Nghiên cứu Marketing & Quản trị": "Marketing & Management Research",
  "Kinh tế lượng Nâng cao": "Advanced Econometrics",
  "Mô hình Phi tuyến tính": "Nonlinear Models",
  "Độ vững Thực nghiệm": "Empirical Robustness",
  "Khoa học Mở & Tái lập": "Open Science & Replicability",
  "Minh bạch Phương pháp Luận": "Methodological Transparency",
  "Kiểm định Giả thuyết Thống kê": "Statistical Hypothesis Testing",
  "Độ mạnh Thực nghiệm": "Empirical Rigor",
  "Kinh tế lượng & Thống kê Y sinh": "Econometrics & Biostatistics",
  "Độ vững Phân tích": "Analytical Robustness",
  "Phân tích Điều kiện & Tiến trình": "Conditional Process Analysis",
  "Mô hình PROCESS Hayes": "Hayes PROCESS Modeling",
  "Phân tích Trung gian & Điều tiết": "Mediation & Moderation Analysis",
  "Học máy & Kinh tế lượng": "Machine Learning & Econometrics",
  "Suy luận Nhân quả Thực nghiệm": "Empirical Causal Inference",
  "Khoa học Dữ liệu": "Data Science",
  "Độ phù hợp Mô hình (Model Fit)": "Model Fit Assessment",
  "CB-SEM & CFA": "CB-SEM & CFA",
  "Tái đặc tả Mô hình": "Model Respecification"
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
    "core_definition": "The degree to which an operational instrument, test, or multi-item scale accurately represents and measures the unobservable theoretical construct it was designed to evaluate (Cronbach & Meehl, 1955), encompassing content, convergent, discriminant, nomological, and consequential facets within Messick's (1995) unified validity framework.",
    "benchmarks": "Convergent Validity: Average Variance Extracted (AVE) >= 0.50, Composite Reliability (CR) between 0.70 and 0.95 (CR > 0.95 indicates semantic item redundancy per Hair et al., 2022), Outer factor loadings >= 0.708 in PLS-SEM (or >= 0.50, ideally >= 0.70 in CB-SEM). Discriminant Validity: Heterotrait-Monotrait ratio (HTMT) < 0.85 (conceptually distinct constructs) or < 0.90 (closely related constructs) with one-sided 95% bootstrap CI upper bound below the threshold (Henseler et al., 2015; Franke & Sarstedt, 2019).",
    "pitfalls": "A common fallacy is confusing Reliability with Validity. An instrument can possess near-perfect reliability (Cronbach's alpha > 0.90) yet completely lack construct validity if it measures the wrong underlying phenomenon.",
    "paradigm_debates": "Quantitative research deconstructs construct validity into convergent, discriminant, and nomological facets through psychometric matrices. Qualitative paradigms substitute statistical validity with Lincoln & Guba's (1985) trustworthiness, authenticity, and credibility criteria.",
    "domain_tags": [
      "Quantitative Methodology",
      "Measurement & Psychometrics",
      "Psychology"
    ]
  },
  "internal-validity": {
    "core_definition": "The extent to which an observed empirical relationship warrants a causal conclusion that the independent variable (IV) directly produced the change in the dependent variable (DV), free from confounding extraneous rival explanations.",
    "benchmarks": "Requires rigorous control of the nine classic threats systematized by Campbell & Stanley (1963) and Shadish, Cook, & Campbell (2002): ambiguous temporal precedence, selection bias, history, maturation, statistical regression to the mean, attrition (experimental mortality), testing effects, instrumentation changes, and additive/interactive threats.",
    "pitfalls": "Asserting causality based exclusively on single-wave cross-sectional survey designs without experimental manipulation, longitudinal panels, or econometric instrumental variable controls.",
    "paradigm_debates": "Laboratory randomized trials maximize internal validity through sterile isolation, but frequently suffer diminished external validity (ecological generalizability to real-world complexities).",
    "domain_tags": [
      "Experimental Design",
      "Econometrics",
      "Causal Inference"
    ]
  },
  "external-validity": {
    "core_definition": "The degree to which empirical research findings can be generalized across diverse populations, settings, times, and operational measures beyond the immediate experimental sample (evaluated across Shadish, Cook, & Campbell's, 2002 UTOS framework: Units, Treatments, Observations, and Settings).",
    "benchmarks": "Demonstrated through multi-site replications, population-representative probabilistic sampling, and boundary-condition robustness checks across heterogeneous UTOS strata.",
    "pitfalls": "Over-generalizing findings derived from convenient student samples (WEIRD populations) to broader business executives or international emerging market contexts.",
    "paradigm_debates": "Statistical generalization (inferring sample-to-population parameters in quantitative surveys) stands fundamentally distinct from analytical generalization (developing overarching theoretical models from qualitative case studies as formulated by Yin, 2018).",
    "domain_tags": [
      "Research Design",
      "Sampling Theory",
      "Methodological Foundations"
    ]
  },
  "endogeneity": {
    "core_definition": "A severe econometric violation occurring when an explanatory variable is correlated with the structural error term in a regression model, biasing coefficient estimates and destroying causal inferences.",
    "benchmarks": "Diagnosed via Durbin-Wu-Hausman endogeneity test (p < 0.05 indicates endogeneity requiring correction). Instrumental variables (2SLS - Theil, 1953; Basmann, 1957; LATE per Imbens & Angrist, 1994) must satisfy Relevance (first-stage F > 10 per Stock & Yogo, 2005, or tF critical value F > 104.7 per Lee et al., 2022) and the Exclusion Restriction (Hansen J / Sargan overidentification test p > 0.05).",
    "pitfalls": "Employing weak instruments that inflate standard errors and bias estimates worse than ordinary least squares (OLS), or assuming panel fixed effects remove time-varying omitted variable bias and simultaneity.",
    "paradigm_debates": "Top-tier economics, finance, and management journals (e.g., SMJ, JAP, JMR) now systematically reject empirical cross-sectional papers lacking formal identification strategies (IV, 2SLS, GMM, or quasi-experimental designs).",
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
    "core_definition": "The degree to which a latent construct is empirically unique and captures phenomena not captured by other measures in the structural model, rigorously assessed via the Heterotrait-Monotrait ratio of correlations (Henseler, Ringle, & Sarstedt, 2015).",
    "benchmarks": "HTMT < 0.85 for conceptually distinct constructs; HTMT < 0.90 for closely related conceptual dimensions. In inferential testing, the upper bound of the one-sided 95% percentile bootstrap confidence interval should fall below 0.85 or 0.90 (Franke & Sarstedt, 2019; Hair et al., 2022). HTMT2 (Roemer et al., 2021) relaxes the tau-equivalence assumption.",
    "pitfalls": "Relying solely on the traditional Fornell-Larcker criterion or cross-loadings, which Monte Carlo simulations (Henseler et al., 2015) demonstrated have low sensitivity in detecting discriminant validity violations when indicator loadings are homogeneous.",
    "paradigm_debates": "Adoption of HTMT is now standard across premier business and social science journals publishing PLS-SEM and composite-based empirical studies.",
    "domain_tags": [
      "PLS-SEM",
      "CB-SEM",
      "Psychometrics & Scales"
    ]
  },
  "convergent-validity-ave": {
    "core_definition": "The extent to which multiple indicators of a specific construct share a high proportion of variance in common, empirically evaluated through Average Variance Extracted (AVE) and standardized outer loadings.",
    "benchmarks": "AVE >= 0.50 (indicating the construct explains at least 50% of the variance of its assigned indicators); standardized outer loadings >= 0.708; Composite Reliability (CR) between 0.70 and 0.95 (Hair et al., 2022).",
    "pitfalls": "Retaining indicators with very low loadings (< 0.40) or mechanically deleting items in the 0.40–0.70 range without checking whether AVE and CR already exceed thresholds and whether removal harms content validity.",
    "paradigm_debates": "Fornell & Larcker (1981) established the 0.50 AVE threshold. Hair et al. (2022) recommend deleting items with loadings between 0.40 and 0.708 only if removal increases AVE or CR above the required threshold without compromising content validity.",
    "domain_tags": [
      "Multivariate Analysis",
      "Structural Equation Modeling",
      "Scale Validation"
    ]
  },
  "reflective-vs-formative": {
    "core_definition": "Reflective models treat indicators as manifestations caused by the latent construct (interchangeable items, high inter-item correlation expected). Formative models treat indicators as composite or causal components that form the construct (non-interchangeable, indicator multicollinearity must be low).",
    "benchmarks": "Reflective: outer loadings >= 0.708, CR (0.70–0.95), AVE >= 0.50, and HTMT < 0.85/0.90. Formative (Hair et al., 2022): convergent validity via redundancy analysis (path beta >= 0.70 per Cheah et al., 2018), indicator VIF < 3.0 (max < 5.0), and statistically significant outer weights (p < 0.05; if non-significant, retain indicator if outer loading >= 0.50 or statistically significant).",
    "pitfalls": "Applying reflective internal consistency metrics (like Cronbach's alpha) to formative constructs, or failing to distinguish composite-formative models from causal-formative models (Henseler, 2017; Rhemtulla et al., 2020).",
    "paradigm_debates": "The ongoing debate over causal-formative indicators versus composite models in structural equation modeling (Bollen & Lennox, 1991; Jarvis et al., 2003; Henseler, 2017).",
    "domain_tags": [
      "Structural Equation Modeling",
      "Measurement Theory",
      "Psychometrics"
    ]
  },
  "multicollinearity-vif": {
    "core_definition": "A statistical phenomenon in multivariate models where two or more independent variables are highly linearly correlated, leading to inflated standard errors, unstable parameter estimates, and distorted statistical inference.",
    "benchmarks": "In PLS-SEM (Hair et al., 2019, 2022): VIF < 3.0 is the ideal threshold, VIF 3.0–5.0 indicates potential collinearity, and VIF >= 5.0 indicates critical collinearity. In Full Collinearity CMB testing (Kock, 2015): VIF <= 3.3. In classical OLS regression: VIF < 10 (O'Brien, 2007).",
    "pitfalls": "Ignoring multicollinearity when interpreting regression weights; high correlation can flip expected coefficients to opposite algebraic signs and inflate standard errors.",
    "paradigm_debates": "Distinguishing essential multicollinearity (true overlap in population constructs) from non-essential multicollinearity caused by uncentered interaction product terms (Aiken & West, 1991).",
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
  },
  "independent-variable-instrumental-variable": {
    "core_definition": "An econometric identification framework distinguishing explanatory independent variables from instrumental variables (Z) that isolate exogenous variation in an endogenous regressor (X) uncorrelated with the structural error term (u).",
    "benchmarks": "Instrument Relevance: First-stage F-statistic > 10 (or Stock-Yogo critical value > 16.38). Instrument Exogeneity (Exclusion Restriction): Tested via Hansen J / Sargan overidentification test (p > 0.05).",
    "pitfalls": "Relying on weak instruments which dramatically inflate standard errors and produce finite-sample estimates more biased than ordinary OLS.",
    "paradigm_debates": "Finding genuinely exogenous and relevant instruments in observational management data is exceptionally challenging, driving adoption of quasi-natural experiments.",
    "domain_tags": [
      "Econometrics",
      "Causal Inference",
      "Identification Strategy"
    ]
  },
  "instrumental-variable-relevance": {
    "core_definition": "The mandatory first-stage econometric condition requiring an instrumental variable (Z) to exhibit a strong, statistically significant partial correlation with the endogenous explanatory variable (X) after conditioning on covariates.",
    "benchmarks": "First-stage F-statistic > 10 (Staiger & Stock, 1997), Stock-Yogo (2005) critical values (> 16.38 for 10% maximal IV size), or Olea & Pflueger (2013) effective F-statistic > 23.1 under heteroskedasticity.",
    "pitfalls": "Proceeding with 2SLS when the first-stage F-statistic is below 10 (weak instrument problem), which invalidates t-tests and shifts 2SLS estimates toward biased OLS values.",
    "paradigm_debates": "Modern econometric standards require reporting weak-instrument-robust Anderson-Rubin (AR) confidence intervals alongside Kleibergen-Paap rk Wald F-statistics.",
    "domain_tags": [
      "Econometrics",
      "Causal Inference",
      "Instrumental Variables"
    ]
  },
  "propensity-score-matching-2033": {
    "core_definition": "A statistical matching technique that conditions on observed baseline covariates by modeling the conditional probability of assignment to treatment (the propensity score), mimicking randomization in observational data.",
    "benchmarks": "Assessed via standardized mean differences (SMD < 0.10 across all matched covariates indicates adequate balance), Variance Ratio (0.5 to 2.0), and common support overlap verification (Rosenbaum & Rubin, 1983).",
    "pitfalls": "Assuming PSM corrects for unobserved omitted variable bias; PSM only balances observed covariates and cannot eliminate unmeasured confounding.",
    "paradigm_debates": "King & Nielsen (2019) critique PSM for potential model dependence and the 'PSM paradox', advocating Coarsened Exact Matching (CEM) or Inverse Probability Weighting (IPW).",
    "domain_tags": [
      "Causal Inference",
      "Observational Studies",
      "Econometrics"
    ]
  },
  "directed-acyclic-graphs": {
    "core_definition": "A visual mathematical graph framework developed by Judea Pearl (1995, 2009) consisting of vertices (nodes representing variables) and directed edges (arrows representing direct causal effects) with no closed feedback loops (acyclic). DAGs encode a priori theoretical assumptions to apply do-calculus and identify minimal sufficient adjustment sets (Backdoor Criterion) while avoiding collider bias.",
    "benchmarks": "Backdoor Criterion satisfaction: The conditioning set Z must block every backdoor path between treatment X and outcome Y while containing no descendant of X. Strictly prohibit conditioning on a Collider (X -> C <- Y) or its descendants.",
    "pitfalls": "Collider Stratification Bias (M-bias): Conditioning on a variable jointly caused by both X and Y (or their ancestors), which inadvertently opens a spurious non-causal path and severely distorts causal effect estimates.",
    "paradigm_debates": "Bridges structural graph theory (Pearl) with the potential outcomes framework (Rubin/Imbens) through Single World Intervention Graphs (SWIGs).",
    "domain_tags": [
      "Causal Inference",
      "Research Design",
      "Epidemiology & Econometrics",
      "Artificial Intelligence"
    ]
  },
  "double-machine-learning": {
    "core_definition": "A pioneering semiparametric econometric framework established by Chernozhukov et al. (2018) that integrates flexible machine learning algorithms (Random Forests, Lasso, Gradient Boosting, Deep Neural Networks) with structural econometric models to estimate causal treatment effects in high-dimensional settings while preserving root-N consistency and valid confidence intervals.",
    "benchmarks": "Two mandatory pillars: (1) Neyman Orthogonality — constructing moment/score functions whose Gateaux derivative with respect to nuisance parameters vanishes at the true parameter values, eliminating regularization bias; (2) K-fold Cross-fitting (e.g., 5-fold sample splitting) to eliminate overfitting bias.",
    "pitfalls": "Naive plug-in ML estimation on the full sample without Neyman-orthogonal scores and cross-fitting, which transmits slow ML convergence rates directly into the causal parameter and invalidates standard errors.",
    "paradigm_debates": "Revolutionizes high-dimensional causal inference by reconciling predictive machine learning with rigorous econometric hypothesis testing.",
    "domain_tags": [
      "Modern Econometrics",
      "Empirical Machine Learning",
      "High-Dimensional Causal Inference"
    ]
  },
  "necessary-condition-analysis": {
    "core_definition": "An asymmetric causal data analysis methodology developed by Jan Dul (2016) that identifies necessary conditions ('No Y without X') rather than additive average effects. Instead of fitting a central regression line through data points, NCA draws a ceiling line above the data to quantify bottleneck constraints that must be satisfied for an outcome to occur.",
    "benchmarks": "Necessity effect size (d = ceiling zone / scope): d < 0.10 (small), 0.10 <= d < 0.30 (medium), 0.30 <= d < 0.50 (large), d >= 0.50 (very large). Requires reporting the Bottleneck Table (CE-FDH or CR-FDH ceiling lines) and permutation test statistical significance (p < 0.05).",
    "pitfalls": "Conflating necessity (NCA: X is required for Y) with sufficiency (QCA/Regression: X produces Y), or claiming that increasing X alone guarantees high Y without satisfying complementary conditions.",
    "paradigm_debates": "Complements PLS-SEM and OLS regression by revealing critical bottleneck constraints that symmetric additive models overlook (Richter et al., 2020).",
    "domain_tags": [
      "Management Research Methods",
      "Asymmetric Causality",
      "Empirical Data Analysis"
    ]
  },
  "pls-predict": {
    "core_definition": "The standard out-of-sample predictive power assessment procedure in PLS-SEM developed by Shmueli et al. (2016, 2019). Unlike R-squared (which only reflects in-sample explanatory power), PLSpredict uses k-fold cross-validation (typically k = 10 folds, 10 repetitions) to evaluate indicator-level prediction errors on holdout samples against a naive Linear Regression Model (LM) benchmark.",
    "benchmarks": "Requires Q2_predict > 0 first. Then compare indicator RMSE (or MAE for highly skewed errors) between PLS-SEM and LM benchmark: (1) High predictive power: all indicators have RMSE_PLS < RMSE_LM; (2) Medium: majority of indicators have RMSE_PLS < RMSE_LM; (3) Low: minority have RMSE_PLS < RMSE_LM; (4) Lack of predictive power: no indicators outperform LM.",
    "pitfalls": "Equating a high in-sample R-squared or blindfolding Q2 with true out-of-sample predictive validity, or using RMSE instead of MAE when prediction errors exhibit extreme skewness.",
    "paradigm_debates": "Shifts structural equation modeling from purely explanatory theory testing toward dual explanatory-predictive evaluation (Shmueli, 2010; Hair et al., 2022).",
    "domain_tags": [
      "PLS-SEM",
      "Structural Model Assessment",
      "Out-of-Sample Predictive Power"
    ]
  },
  "cvpat": {
    "core_definition": "A formal statistical inferential test developed by Liengaard et al. (2021) and Sharma et al. (2023) to evaluate whether a proposed PLS-SEM model achieves statistically superior out-of-sample predictive accuracy compared to an indicator-average (IA) benchmark, a linear model (LM) benchmark, or competing theoretical models.",
    "benchmarks": "Paired t-test on out-of-sample prediction loss differences (squared error loss): A negative average loss difference (PLS loss - Benchmark loss < 0) with one-sided p < 0.05 confirms statistically superior out-of-sample predictive ability.",
    "pitfalls": "Comparing competing models solely via in-sample R-squared or descriptive RMSE differences without testing whether out-of-sample predictive improvements are statistically significant via CVPAT.",
    "paradigm_debates": "Provides the missing inferential hypothesis test for predictive model comparison in variance-based SEM.",
    "domain_tags": [
      "PLS-SEM & CB-SEM",
      "Model Selection",
      "Predictive Ability Evaluation"
    ]
  },
  "consistent-partial-least-squares": {
    "core_definition": "An advanced PLS-SEM algorithm developed by Dijkstra and Henseler (2015) that corrects traditional PLS attenuation/inconsistency bias for common-factor (reflective) constructs. PLSc disattenuates construct correlations using Dijkstra-Henseler's reliability coefficient rho_A, yielding asymptotically consistent factor loadings and path coefficients equivalent to CB-SEM.",
    "benchmarks": "Dijkstra-Henseler's rho_A must fall between 0.707 and 0.95. Global goodness-of-fit evaluated via SRMR < 0.08 and bootstrap exact fit tests where unweighted least squares discrepancy (d_ULS) and geodesic discrepancy (d_G) remain below the 95% (HI95) or 99% (HI99) quantiles.",
    "pitfalls": "Applying PLSc indiscriminately to purely formative constructs (PLSc only corrects reflective common factors) or failing to report global model fit diagnostics when estimating factor models.",
    "paradigm_debates": "Bridges the historical divide between composite-based PLS-SEM and covariance-based CB-SEM by enabling consistent estimation of hybrid factor-composite models.",
    "domain_tags": [
      "PLS-SEM",
      "Reflective Measurement Models",
      "Measurement Error Correction"
    ]
  },
  "unmeasured-latent-method-construct": {
    "core_definition": "A confirmatory factor analytic technique (Podsakoff et al., 2003, 2012; Williams et al., 2010) used to diagnose and control for Common Method Bias (CMB) without requiring an a priori measured marker variable, by modeling an orthogonal latent method factor loading onto all observed indicators.",
    "benchmarks": "Nested chi-square model comparison between baseline CFA, congeneric/equal method loading model, and freely estimated method loading model. Substantive factor loadings must remain statistically significant (p < 0.05) and average variance explained by the method factor should be small (< 25% of total variance).",
    "pitfalls": "Empirical under-identification and Heywood cases (negative error variances) when freely estimating all method loadings without equality or proportionality constraints; Richardson et al. (2009) warn ULMC can remove substantive trait variance.",
    "paradigm_debates": "While widely used when a marker variable was omitted from survey design, methodologists increasingly favor the CFA Marker Technique (Williams et al., 2010) over unconstrained ULMC.",
    "domain_tags": [
      "CFA & SEM",
      "Common Method Bias (CMB) Control",
      "Measurement Validation"
    ]
  },
  "gaussian-copula": {
    "core_definition": "An instrument-free econometric approach developed by Park and Gupta (2012) and popularized in management/marketing by Hult et al. (2018) that addresses regressor endogeneity by directly modeling the joint distribution between a non-normally distributed endogenous regressor and the structural error term via a Gaussian copula control term.",
    "benchmarks": "Mandatory prerequisite: The potentially endogenous regressor must be non-normally distributed (Shapiro-Wilk or Lilliefors test p < 0.05) and exhibit sufficient skewness. A statistically significant Gaussian copula coefficient (p < 0.05, evaluated via bootstrapping) indicates endogeneity and corrects the structural path estimate.",
    "pitfalls": "Applying the Gaussian copula to a normally distributed regressor (which causes mathematical non-identification and extreme collinearity) or simultaneously adding multiple correlated copula terms without checking VIF (< 5).",
    "paradigm_debates": "Provides a powerful identification diagnostic when valid external instrumental variables are unavailable, though Becker et al. (2022) caution that small samples require careful distributional verification.",
    "domain_tags": [
      "Econometrics",
      "PLS-SEM",
      "Endogeneity Remedies",
      "Marketing & Management Research"
    ]
  },
  "control-function-approach": {
    "core_definition": "A two-stage econometric estimation method systematized by Wooldridge (2015) and Petrin & Train (2010) to resolve endogeneity in nonlinear models (Probit, Logit, Poisson, Tobit, interaction models). Instead of plugging fitted values into the second stage (which is inconsistent in nonlinear models), the first-stage residuals are included as an additional conditioning variable (control function) in the second-stage structural equation.",
    "benchmarks": "Direct Hausman-type endogeneity test: The t-statistic / p-value on the first-stage residual in the second-stage equation directly tests the null of exogeneity (p < 0.05 confirms endogeneity). Second-stage standard errors must be bootstrapped (1,000-2,000 replications) to account for the generated regressor problem.",
    "pitfalls": "Reporting unadjusted second-stage OLS/MLE standard errors without bootstrapping, or plugging first-stage fitted values directly into nonlinear models ('forbidden regression' fallacy).",
    "paradigm_debates": "More parsimonious and strictly valid than naive 2SLS in nonlinear and moderated endogenous models when accompanied by valid exclusion restrictions.",
    "domain_tags": [
      "Advanced Econometrics",
      "Nonlinear Models",
      "Causal Inference"
    ]
  },
  "multiverse-analysis": {
    "core_definition": "A comprehensive robustness methodology proposed by Steegen et al. (2016) and Simonsohn, Simmons, & Nelson (2020; Specification Curve Analysis) that neutralizes researcher degrees of freedom ('garden of forking paths') by estimating and reporting the distribution of empirical results across all theoretically defensible combinations of data cleaning, outlier exclusion, operationalization, and covariate specifications.",
    "benchmarks": "Specification Curve plot displaying effect size estimates and 95% CIs across hundreds or thousands of defensible models, accompanied by joint bootstrap/permutation inference testing whether the median effect and share of statistically significant same-signed specifications exceed chance (p < 0.05).",
    "pitfalls": "Inflating the specification space with theoretically nonsensical or misspecified models (e.g., conditioning on colliders), which dilutes valid specifications with noise.",
    "paradigm_debates": "Transforms sensitivity checks from a handful of cherry-picked robustness columns into systematic, transparent mapping of analytical stability.",
    "domain_tags": [
      "Empirical Robustness",
      "Open Science & Replicability",
      "Methodological Transparency"
    ]
  },
  "equivalence-testing": {
    "core_definition": "A formal frequentist hypothesis testing procedure (Schuirmann, 1987; Lakens, 2017) using Two One-Sided Tests (TOST) to statistically demonstrate the absence of a meaningful effect. Unlike standard Null Hypothesis Significance Testing (where p > 0.05 merely fails to reject H0), TOST reverses the burden of proof by testing whether the observed effect falls entirely within pre-specified equivalence bounds [-Delta_L, +Delta_U].",
    "benchmarks": "Specify the Smallest Effect Size of Interest (SESOI, e.g., Cohen's d = +/- 0.20). Statistical equivalence is established when both one-sided tests yield p < 0.05 (equivalently, the 90% confidence interval of the effect lies completely inside [-SESOI, +SESOI]).",
    "pitfalls": "Committing the classic fallacy 'absence of evidence is evidence of absence' (claiming two groups are equal simply because a standard t-test yielded p > 0.05), or setting overly wide post-hoc equivalence bounds to force significance.",
    "paradigm_debates": "Complements Bayesian Bayes Factors (BF01) by providing a rigorous frequentist tool to publish theoretically informative null findings.",
    "domain_tags": [
      "Statistical Hypothesis Testing",
      "Open Science & Replicability",
      "Empirical Rigor"
    ]
  },
  "sensitivity-analysis-unobserved-confounding": {
    "core_definition": "A formal quantitative bias analysis framework (Cinelli & Hazlett, 2020 'Sensemakr'; VanderWeele & Ding, 2017 'E-value') that quantifies exactly how strong an unmeasured confounder would need to be (in terms of partial R-squared or risk ratios with both the treatment and the outcome) to reduce an estimated causal effect to zero or render it statistically non-significant.",
    "benchmarks": "Report the Robustness Value (RV_q, alpha): the minimum partial variance an unobserved confounder must explain in both treatment and outcome to invalidate the conclusion, benchmarked against the explanatory strength (1x, 2x, 3x) of the strongest observed covariate. For risk ratios, report the E-value for both the point estimate and the 95% CI limit.",
    "pitfalls": "Making qualitative hand-waving claims that omitted variable bias is unlikely without quantifying omitted-variable sensitivity bounds relative to observed benchmark covariates.",
    "paradigm_debates": "Standardizes observational causal inference by shifting debate from 'Is there any omitted variable?' to 'Could a plausible confounder be strong enough to overturn this finding?'",
    "domain_tags": [
      "Causal Inference",
      "Econometrics & Biostatistics",
      "Analytical Robustness"
    ]
  },
  "moderated-mediation-index": {
    "core_definition": "A formal statistical index developed by Andrew F. Hayes (2015, 2018) that directly quantifies the linear slope relating a conditional indirect effect (X -> M -> Y) to a moderator variable (W). Rather than testing mediation separately at arbitrary moderator values, the Index of Moderated Mediation provides a single omnibus inferential test of whether the indirect effect varies systematically as a function of W.",
    "benchmarks": "Evaluated via non-parametric bootstrapping with at least 5,000 to 10,000 resamples: Moderated mediation is statistically supported if the 95% bias-corrected (or percentile) bootstrap confidence interval for the Index of Moderated Mediation (omega = a_3 * b for first-stage moderation) does not straddle zero.",
    "pitfalls": "Claiming moderated mediation merely because the indirect effect is significant at +1 SD of W and non-significant at -1 SD of W ('difference in significance is not a significant difference') without testing the Index of Moderated Mediation.",
    "paradigm_debates": "Universally required in top psychology, marketing, and management journals for Hayes PROCESS Models 7, 8, 14, 15, and 58.",
    "domain_tags": [
      "Conditional Process Analysis",
      "Hayes PROCESS Modeling",
      "Mediation & Moderation Analysis"
    ]
  },
  "sample-splitting-cross-validation": {
    "core_definition": "A foundational methodological principle formulated by Athey and Imbens (2016; 'Honest Causal Trees') that guarantees valid statistical inference in data-driven causal discovery by randomly partitioning the sample into two disjoint subsets: a training/splitting subsample used to discover model structure or heterogeneous subgroups, and an independent estimation subsample used exclusively to estimate treatment effects and confidence intervals.",
    "benchmarks": "50/50 honest sample splitting or K-fold cross-fitting to preserve full-sample asymptotic efficiency while guaranteeing nominal 95% confidence interval coverage and eliminating adaptive overfitting bias.",
    "pitfalls": "Data snooping / double-dipping: using the same dataset to both search for high-responding subgroups (or select covariates) and run classical hypothesis tests, which severely inflates Type I false-positive rates.",
    "paradigm_debates": "Forms the statistical backbone of Causal Forests, Double Machine Learning, and pre-analysis plans in modern experimental and observational economics.",
    "domain_tags": [
      "Machine Learning & Econometrics",
      "Empirical Causal Inference",
      "Data Science"
    ]
  },
  "modification-indices-mi": {
    "core_definition": "A Lagrangian Multiplier (LM) diagnostic statistic in Covariance-Based SEM and CFA (Joreskog & Sorbom) that estimates the minimum reduction in the overall model chi-square statistic (with 1 degree of freedom) if a currently fixed or constrained parameter (such as an error covariance or cross-loading) is freely estimated.",
    "benchmarks": "Because MI follows a 1-df Chi-square distribution, MI >= 3.84 corresponds to p < 0.05 and MI >= 6.63 (or > 10.0 in practice) indicates a statistically substantial localized strain, interpreted alongside the Standardized Expected Parameter Change (SEPC).",
    "pitfalls": "Data-driven post-hoc model respecification: freeing error covariances across different constructs or adding unhypothesized paths solely to inflate CFI and lower RMSEA without compelling substantive theoretical justification.",
    "paradigm_debates": "Methodologists (MacCallum et al., 1992; Kline, 2023) emphasize that freeing parameters based purely on large MIs capitalizes on sampling chance and turns confirmatory testing into exploratory fitting, requiring cross-validation on an independent sample.",
    "domain_tags": [
      "Model Fit Assessment",
      "CB-SEM & CFA",
      "Model Respecification"
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
    "purpose": "Variance-based structural equation modeling focusing on causal-predictive analysis and theoretical development, optimal for complex structural models, composite indicators, and exploratory research.",
    "benchmark": "Evaluate R² in-sample explanatory power, f² effect size (0.02 small, 0.15 medium, 0.35 large), HTMT < 0.85/0.90, and out-of-sample predictive power via PLSpredict (Shmueli et al., 2019).",
    "domain": "Psychometrics & SEM"
  },
  "CB-SEM": {
    "full_name": "Covariance-Based Structural Equation Modeling",
    "purpose": "Covariance-based structural equation modeling (Jöreskog, Kline) emphasizing confirmatory theory testing and reproduction of the empirical covariance matrix.",
    "benchmark": "RMSEA < 0.06–0.08, CFI >= 0.95, TLI >= 0.95, SRMR < 0.08. Note: Chi-square p > 0.05 is sensitive to large sample sizes and should be reported alongside incremental and absolute fit indices (Kline, 2023).",
    "domain": "Psychometrics & SEM"
  },
  "SEM": {
    "full_name": "Structural Equation Modeling",
    "purpose": "Second-generation multivariate analysis combining confirmatory factor analysis (CFA) and simultaneous path analysis to estimate latent variables and structural relationships while accounting for measurement error.",
    "benchmark": "Two-step evaluation (Anderson & Gerbing, 1988): Establish measurement model reliability, convergent validity, and discriminant validity prior to testing structural path hypotheses.",
    "domain": "Psychometrics & SEM"
  },
  "AVE": {
    "full_name": "Average Variance Extracted",
    "purpose": "A foundational psychometric metric measuring the grand mean value of the squared loadings of the indicators associated with a latent construct (convergent validity).",
    "benchmark": "AVE >= 0.50, indicating that the latent construct explains at least 50% of the variance of its observed indicators (Fornell & Larcker, 1981; Hair et al., 2018).",
    "domain": "Psychometrics & SEM"
  },
  "HTMT": {
    "full_name": "Heterotrait-Monotrait Ratio of Correlations",
    "purpose": "The ratio of between-trait correlations to within-trait correlations, serving as the premier diagnostic criterion for assessing discriminant validity in variance-based and covariance-based SEM.",
    "benchmark": "HTMT < 0.85 for conceptually distinct constructs, or HTMT < 0.90 for conceptually similar constructs; bootstrap 95% confidence interval must not include 1.0 (Henseler et al., 2015).",
    "domain": "Psychometrics & SEM"
  },
  "CR": {
    "full_name": "Composite Reliability",
    "purpose": "A measure of internal consistency reliability (Jöreskog's rho_c) that weights individual indicators according to their actual factor loadings rather than assuming tau-equivalence.",
    "benchmark": "CR between 0.70 and 0.90 (0.60–0.70 acceptable in exploratory research); values >= 0.95 indicate undesirable indicator redundancy (Hair et al., 2018).",
    "domain": "Psychometrics & SEM"
  },
  "VIF": {
    "full_name": "Variance Inflation Factor",
    "purpose": "A collinearity diagnostic quantifying how much the variance of an estimated regression coefficient or formative indicator weight is inflated due to multicollinearity.",
    "benchmark": "VIF < 3.0 (ideal in PLS-SEM & full collinearity CMB check; Kock, 2015), VIF < 5.0 (acceptable threshold; Hair et al., 2018), VIF >= 10.0 indicates severe multicollinearity.",
    "domain": "Causal Inference & Econometrics"
  },
  "CMB": {
    "full_name": "Common Method Bias",
    "purpose": "Systematic measurement error distorting observed relationships between constructs when independent and dependent variables are captured using the same source or survey instrument at a single point in time.",
    "benchmark": "Requires both ex-ante procedural remedies (temporal/source separation) and ex-post statistical tests: Full Collinearity VIF < 3.3 (Kock, 2015), CFA Marker Variable (Lindell & Whitney, 2001), or ULMC.",
    "domain": "Psychometrics & SEM"
  },
  "CMV": {
    "full_name": "Common Method Variance",
    "purpose": "Spurious systematic variance shared among variables attributable to the common measurement method rather than the underlying theoretical constructs being measured.",
    "benchmark": "Combine procedural design controls with statistical diagnostics such as latent marker variable modeling (Podsakoff et al., 2003, 2012); do not rely solely on Harman's single-factor test (< 50%).",
    "domain": "Psychometrics & SEM"
  },
  "2SLS": {
    "full_name": "Two-Stage Least Squares",
    "purpose": "An econometric instrumental variable (IV) estimator that isolates exogenous variation in an endogenous regressor in Stage 1 to obtain consistent causal estimates in Stage 2.",
    "benchmark": "First-stage F-statistic > 10 (or Stock & Yogo, 2005 critical value > 16.38); Sargan/Hansen J overidentification test p > 0.05; Durbin-Wu-Hausman endogeneity test p < 0.05.",
    "domain": "Causal Inference & Econometrics"
  },
  "GMM": {
    "full_name": "Generalized Method of Moments",
    "purpose": "A semiparametric econometric estimation framework (Arellano-Bond Difference GMM / Blundell-Bond System GMM) addressing dynamic panel endogeneity, unobserved heterogeneity, and simultaneity.",
    "benchmark": "Arellano-Bond serial correlation tests: AR(1) p < 0.05 and AR(2) p > 0.05; Hansen J overidentification test 0.10 <= p < 0.80 (avoid p = 1.000 which signals instrument proliferation; Roodman, 2009).",
    "domain": "Causal Inference & Econometrics"
  },
  "DID": {
    "full_name": "Difference-in-Differences",
    "purpose": "A quasi-experimental causal identification strategy estimating treatment effects by comparing pre-to-post outcome changes between a treated group and an untreated comparison group.",
    "benchmark": "Requires verifying the Parallel Trends Assumption via event-study pre-treatment lead coefficients (statistically indistinguishable from zero) and using heterogeneity-robust estimators for staggered treatment timing.",
    "domain": "Causal Inference & Econometrics"
  },
  "PSM": {
    "full_name": "Propensity Score Matching",
    "purpose": "An observational causal inference technique (Rosenbaum & Rubin, 1983) that pairs treated and untreated units with similar conditional probabilities of receiving treatment given observed baseline covariates.",
    "benchmark": "Post-matching covariate balance requires Standardized Mean Difference (SMD) < 0.10 (or Rubin's B < 25%) and variance ratio Rubin's R between 0.50 and 2.00 across all covariates.",
    "domain": "Causal Inference & Econometrics"
  },
  "RDD": {
    "full_name": "Regression Discontinuity Design",
    "purpose": "A quasi-experimental identification strategy estimating local causal treatment effects by exploiting a deterministic cutoff threshold on a continuous running assignment variable.",
    "benchmark": "Verify absence of manipulation at the cutoff via McCrary (2008) / Cattaneo et al. (2020) density test (p > 0.05), baseline covariate continuity, and MSE-optimal bandwidth robustness checks.",
    "domain": "Causal Inference & Econometrics"
  },
  "ITS": {
    "full_name": "Interrupted Time-Series Design",
    "purpose": "A strong quasi-experimental longitudinal design that evaluates the immediate level change and slope change of an intervention across multiple equally spaced pre- and post-intervention observations.",
    "benchmark": "Requires at least 10–15 time points before and after the intervention, controlling for serial autocorrelation and seasonality via segmented regression with Newey-West or ARIMA errors.",
    "domain": "Experimental Design & Medicine"
  },
  "RCT": {
    "full_name": "Randomized Controlled Trial",
    "purpose": "The gold-standard experimental research design in which eligible participants are randomly assigned to treatment or control conditions to establish unbiased causal efficacy.",
    "benchmark": "Adherence to CONSORT reporting standards: concealed random allocation, baseline equivalence, double-blinding where feasible, and Intention-to-Treat (ITT) primary analysis.",
    "domain": "Experimental Design & Medicine"
  },
  "ITT": {
    "full_name": "Intention-to-Treat Analysis",
    "purpose": "An analytical principle in randomized trials wherein all randomized participants are analyzed in the group to which they were originally assigned, regardless of non-adherence or protocol deviations.",
    "benchmark": "Preserves baseline prognostic balance generated by randomization and guards against attrition/selection bias; reported alongside Per-Protocol (PP) or CACE sensitivity analyses.",
    "domain": "Experimental Design & Medicine"
  },
  "CACE": {
    "full_name": "Complier Average Causal Effect",
    "purpose": "A causal estimand measuring the treatment effect specifically among the latent subpopulation of compliers who adhere to their assigned experimental treatment condition.",
    "benchmark": "Identified via Instrumental Variables (using random assignment as the instrument for actual treatment uptake): CACE = ITT_Y / ITT_D under monotonicity and exclusion restrictions.",
    "domain": "Causal Inference & Econometrics"
  },
  "LATE": {
    "full_name": "Local Average Treatment Effect",
    "purpose": "The causal treatment effect (Imbens & Angrist, 1994) identified by an instrumental variable or fuzzy RDD for the subpopulation of compliers whose treatment status is shifted by the instrument.",
    "benchmark": "Requires four assumptions: Independence, Exclusion Restriction, Instrument Relevance (F > 10), and Monotonicity (no defiers).",
    "domain": "Causal Inference & Econometrics"
  },
  "SUTVA": {
    "full_name": "Stable Unit Treatment Value Assumption",
    "purpose": "A foundational pillar of Rubin's Potential Outcomes Framework requiring that (1) one unit's potential outcomes are unaffected by other units' treatment assignments (no interference/spillover) and (2) there are no hidden variations of treatment.",
    "benchmark": "Violated when network spillovers, peer contagion, or general equilibrium effects exist between treated and control units; mitigated via cluster randomization at the group/market level.",
    "domain": "Causal Inference & Econometrics"
  },
  "DAG": {
    "full_name": "Directed Acyclic Graph",
    "purpose": "A mathematical causal diagram (Pearl, 2009) using nodes and directed arrows without cycles to map structural causal assumptions, confounders, mediators, and colliders.",
    "benchmark": "Apply Pearl's Backdoor Criterion to select a minimal sufficient adjustment set that blocks all non-causal backdoor paths without conditioning on colliders or post-treatment descendants.",
    "domain": "Causal Inference & Econometrics"
  },
  "CTT": {
    "full_name": "Classical Test Theory",
    "purpose": "A foundational psychometric framework (Spearman, Novick) modeling an individual's observed score (X) as the linear sum of their unobservable true score (T) and random error (E): X = T + E.",
    "benchmark": "Assumes E(E) = 0, Cov(T, E) = 0, and uncorrelated errors across parallel administrations; evaluated via Cronbach's alpha (>= 0.70), McDonald's omega, and item-total correlations (> 0.30).",
    "domain": "Psychometrics & SEM"
  },
  "IRT": {
    "full_name": "Item Response Theory",
    "purpose": "A modern latent trait psychometric paradigm modeling the probability of a specific item response as a nonlinear logistic function of person ability (theta) and item parameters.",
    "benchmark": "Requires testing unidimensionality and local independence; estimates item difficulty (b), item discrimination (a), and guessing (c) via 1PL, 2PL, 3PL, or Graded Response Models (GRM).",
    "domain": "Psychometrics & SEM"
  },
  "1PL": {
    "full_name": "One-Parameter Logistic Model (Rasch Model)",
    "purpose": "An Item Response Theory model where the probability of a correct response depends solely on the difference between person ability (theta) and item difficulty (b), holding discrimination constant across items.",
    "benchmark": "Item fit evaluated via Infit MNSQ and Outfit MNSQ within the productive measurement range of 0.70 to 1.30 (or 0.50 to 1.50; Bond & Fox, 2015).",
    "domain": "Psychometrics & SEM"
  },
  "2PL": {
    "full_name": "Two-Parameter Logistic Model",
    "purpose": "An Item Response Theory model (Birnbaum, 1968) that jointly estimates item difficulty (location parameter b) and item discrimination (slope parameter a) for dichotomous or polytomous items.",
    "benchmark": "Item discrimination parameter a > 0.65 indicates moderate discrimination, and a > 1.35 indicates high discrimination (Baker, 2001); item difficulty b typically ranges from -3.0 to +3.0 logits.",
    "domain": "Psychometrics & SEM"
  },
  "3PL": {
    "full_name": "Three-Parameter Logistic Model",
    "purpose": "An Item Response Theory model incorporating item difficulty (b), item discrimination (a), and a lower-asymptote pseudo-guessing parameter (c) to account for lucky guessing on multiple-choice tests.",
    "benchmark": "Pseudo-guessing parameter c typically hovers near 1/k (e.g., c <= 0.20 for 5-option multiple-choice items); requires large sample sizes (N >= 1,000) for stable parameter convergence.",
    "domain": "Psychometrics & SEM"
  },
  "ICC": {
    "full_name": "Item Characteristic Curve / Intraclass Correlation Coefficient",
    "purpose": "In IRT, the nonlinear S-shaped curve mapping the probability of item endorsement across latent trait theta; in multilevel modeling and reliability, the proportion of total variance attributable to between-cluster differences.",
    "benchmark": "In IRT: steeper ICC slope at inflection point b reflects higher discrimination. In Multilevel/HLM: ICC(1) > 0.05–0.10 justifies multilevel modeling; in inter-rater reliability: ICC > 0.75 indicates good agreement.",
    "domain": "Psychometrics & SEM"
  },
  "IIF": {
    "full_name": "Item Information Function",
    "purpose": "An IRT function quantifying the statistical precision (Fisher information) an individual item contributes at each point along the latent trait continuum theta.",
    "benchmark": "For dichotomous items, information peaks at theta = b where I(theta) = a² * P(theta) * [1 - P(theta)]; higher discrimination (a) yields a taller, narrower information peak.",
    "domain": "Psychometrics & SEM"
  },
  "TIF": {
    "full_name": "Test Information Function",
    "purpose": "The additive sum of all individual Item Information Functions across a scale, indicating the overall measurement precision of the instrument at every level of the latent trait theta.",
    "benchmark": "Conditional Standard Error of Measurement is inversely proportional to information: SEM(theta) = 1 / sqrt(TIF(theta)); TIF >= 10 corresponds to SEM <= 0.32 (reliability ~ 0.90).",
    "domain": "Psychometrics & SEM"
  },
  "CVR": {
    "full_name": "Content Validity Ratio",
    "purpose": "Lawshe's (1975) quantitative index assessing expert panel consensus on whether each scale item is 'essential' to measuring the target construct domain.",
    "benchmark": "Minimum critical CVR depends on expert panel size (N): for N = 5 experts, CVR >= 0.99; N = 8, CVR >= 0.75; N = 10, CVR >= 0.62; N = 20, CVR >= 0.42 (Lawshe, 1975).",
    "domain": "Psychometrics & SEM"
  },
  "CVI": {
    "full_name": "Content Validity Index",
    "purpose": "An empirical psychometric index quantifying the proportion of domain experts who rate an item (I-CVI) or overall scale (S-CVI) as content-relevant (typically ratings of 3 or 4 on a 4-point scale).",
    "benchmark": "Item-level I-CVI >= 0.78 for panels of 6–10 experts; Scale-level S-CVI/Ave >= 0.90 and S-CVI/UA >= 0.80 (Lynn, 1986; Polit & Beck, 2006).",
    "domain": "Psychometrics & SEM"
  },
  "VAS": {
    "full_name": "Visual Analog Scale",
    "purpose": "A psychometric measurement instrument consisting of a continuous horizontal or vertical line (typically 100 mm) anchored by two extreme verbal descriptors to capture subjective states or attitudes.",
    "benchmark": "Yields continuous ratio/interval-like data suitable for parametric analysis; Minimal Clinically Important Difference (MCID) is typically 10–15 mm on a 100 mm scale.",
    "domain": "Psychometrics & SEM"
  },
  "EDA": {
    "full_name": "Exploratory Data Analysis",
    "purpose": "John Tukey's (1977) diagnostic data inspection philosophy using visual and numerical summaries to examine distributional shapes, missingness, outliers, and nonlinearity prior to formal hypothesis testing.",
    "benchmark": "Standard diagnostics: Boxplots (IQR outlier rule), Q-Q plots, skewness/kurtosis checks (|skew| < 2, |kurtosis| < 7), and bivariate scatterplot matrices (Schindler, 2022).",
    "domain": "Psychometrics & SEM"
  },
  "EFA": {
    "full_name": "Exploratory Factor Analysis",
    "purpose": "A multivariate interdependence technique used during initial scale development to uncover the underlying latent factor dimensionality of a set of observed indicators without imposing a priori constraints.",
    "benchmark": "KMO >= 0.60 (ideal >= 0.80), Bartlett's Test of Sphericity p < 0.05, total variance explained >= 50–60%, primary factor loadings >= 0.50, and cross-loading differences > 0.20 (Hair et al., 2018).",
    "domain": "Psychometrics & SEM"
  },
  "CFA": {
    "full_name": "Confirmatory Factor Analysis",
    "purpose": "A theory-driven measurement model technique testing whether observed indicators load onto pre-specified latent constructs as hypothesized while evaluating overall covariance fit.",
    "benchmark": "Standardized factor loadings >= 0.708 (acceptable >= 0.50 with p < 0.001), CR >= 0.70, AVE >= 0.50, HTMT < 0.85, CFI/TLI >= 0.95, RMSEA < 0.08, SRMR < 0.08.",
    "domain": "Psychometrics & SEM"
  },
  "PCA": {
    "full_name": "Principal Component Analysis",
    "purpose": "A mathematical dimensionality-reduction technique that transforms correlated variables into a smaller set of orthogonal linear composites (principal components) maximizing total variance explained.",
    "benchmark": "Retain components via Kaiser's eigenvalue > 1.0 rule, Horn's Parallel Analysis, or cumulative variance >= 60%; distinct from common factor analysis (EFA) which models only shared variance.",
    "domain": "Psychometrics & SEM"
  },
  "ANOVA": {
    "full_name": "Analysis of Variance",
    "purpose": "A parametric statistical technique developed by R. A. Fisher to test whether group means differ significantly across three or more categorical independent conditions by partitioning between-group and within-group variance.",
    "benchmark": "Requires normality and homogeneity of variances (Levene's test p > 0.05; otherwise use Welch's ANOVA). Significant omnibus F-test (p < 0.05) is followed by Tukey HSD or Games-Howell post-hoc tests and eta-squared effect size.",
    "domain": "Experimental Design & Medicine"
  },
  "ANCOVA": {
    "full_name": "Analysis of Covariance",
    "purpose": "A general linear model combining ANOVA and linear regression to test group mean differences on a dependent variable while statistically adjusting for continuous baseline covariates.",
    "benchmark": "Mandatory assumptions: (1) Independence of the covariate and treatment effect; (2) Homogeneity of regression slopes (non-significant treatment-by-covariate interaction, p > 0.05).",
    "domain": "Experimental Design & Medicine"
  },
  "MANOVA": {
    "full_name": "Multivariate Analysis of Variance",
    "purpose": "A multivariate extension of ANOVA that simultaneously tests group differences across a vector of two or more correlated dependent variables while controlling family-wise Type I error.",
    "benchmark": "Evaluated via Pillai's Trace (most robust to violations), Wilks' Lambda, Hotelling's Trace, and Roy's Largest Root; covariance matrix homogeneity checked via Box's M test (p > 0.001).",
    "domain": "Psychometrics & SEM"
  },
  "HLM": {
    "full_name": "Hierarchical Linear Modeling",
    "purpose": "Multilevel regression modeling (Raudenbush & Bryk, 2002) designed for nested data structures (e.g., employees nested within firms) to estimate fixed effects, random intercepts, and cross-level interactions.",
    "benchmark": "Justified when Intraclass Correlation Coefficient ICC(1) >= 0.05–0.10; requires appropriate centering (Grand-Mean vs. Group-Mean Centering) and sufficient Level-2 clusters (typically >= 30–50 groups).",
    "domain": "Causal Inference & Econometrics"
  },
  "RMSEA": {
    "full_name": "Root Mean Square Error of Approximation",
    "purpose": "An absolute, parsimony-corrected badness-of-fit index in CB-SEM that measures discrepancy per degree of freedom between the hypothesized model and the population covariance matrix.",
    "benchmark": "RMSEA <= 0.05 indicates close fit, 0.05–0.08 indicates reasonable fit, and >= 0.10 indicates poor fit; report 90% CI and p-close > 0.05 (Hu & Bentler, 1999; Kline, 2023).",
    "domain": "Psychometrics & SEM"
  },
  "CFI": {
    "full_name": "Comparative Fit Index",
    "purpose": "Bentler's (1990) normed incremental fit index in SEM that evaluates the relative improvement in fit of the researcher's hypothesized model compared with a baseline independence (null) model.",
    "benchmark": "CFI >= 0.95 indicates excellent fit, and CFI >= 0.90 indicates acceptable fit (Hu & Bentler, 1999; Hair et al., 2018).",
    "domain": "Psychometrics & SEM"
  },
  "TLI": {
    "full_name": "Tucker-Lewis Index (Non-Normed Fit Index / NNFI)",
    "purpose": "An incremental goodness-of-fit index in CFA/SEM that compares the chi-square per degree of freedom of the hypothesized model to that of the baseline null model, heavily penalizing unnecessary model complexity.",
    "benchmark": "TLI >= 0.95 indicates strong fit, and TLI >= 0.90 indicates acceptable model fit (Hu & Bentler, 1999).",
    "domain": "Psychometrics & SEM"
  },
  "SRMR": {
    "full_name": "Standardized Root Mean Square Residual",
    "purpose": "An absolute fit index in SEM representing the square root of the average squared differences between observed sample correlations and model-implied correlations.",
    "benchmark": "SRMR < 0.08 (or strictly < 0.05) indicates good fit in both CB-SEM and PLS-SEM (Hu & Bentler, 1999; Kline, 2023).",
    "domain": "Psychometrics & SEM"
  },
  "AIC": {
    "full_name": "Akaike Information Criterion",
    "purpose": "An information-theoretic model selection criterion (AIC = -2*ln(L) + 2k) that balances goodness-of-fit (log-likelihood) against model complexity (number of parameters k) to minimize out-of-sample Kullback-Leibler divergence.",
    "benchmark": "When comparing competing non-nested models on the same dataset, the model with the lowest AIC value is preferred; Delta_AIC > 4–10 indicates substantial support for the lower-AIC model.",
    "domain": "Causal Inference & Econometrics"
  },
  "BIC": {
    "full_name": "Bayesian Information Criterion (Schwarz Criterion)",
    "purpose": "A Bayesian model selection criterion (BIC = -2*ln(L) + k*ln(N)) that imposes a stricter penalty for parameter proliferation in large samples than AIC, favoring more parsimonious models.",
    "benchmark": "Lower BIC indicates better fit-parsimony trade-off; Delta_BIC > 6 indicates strong evidence and Delta_BIC > 10 indicates very strong evidence in favor of the lower-BIC model (Raftery, 1995).",
    "domain": "Causal Inference & Econometrics"
  },
  "GoF": {
    "full_name": "Goodness of Fit",
    "purpose": "The overall statistical correspondence between the observed empirical data matrix and the covariance or composite matrix implied by a specified theoretical model.",
    "benchmark": "In CB-SEM: evaluated via Chi-square, RMSEA (< 0.08), CFI/TLI (>= 0.90–0.95), and SRMR (< 0.08). Note: Tenenhaus GoF in PLS-SEM does not reliably distinguish valid from misspecified models (Henseler & Sarstedt, 2013).",
    "domain": "Psychometrics & SEM"
  },
  "MIMIC": {
    "full_name": "Multiple Indicators, Multiple Causes Model",
    "purpose": "A structural equation model in which a latent construct is simultaneously caused by formative indicators and reflected by at least two reflective indicators (or downstream constructs) to achieve statistical identification.",
    "benchmark": "Follows the 2+ emitted paths rule (MacKenzie et al., 2011; Jarvis et al., 2003); used for formative construct identification, redundancy analysis, and testing differential item functioning.",
    "domain": "Psychometrics & SEM"
  },
  "CAQDAS": {
    "full_name": "Computer-Assisted Qualitative Data Analysis Software",
    "purpose": "Specialized qualitative research software platforms that assist researchers in organizing transcripts, hierarchical coding, memo writing, co-occurrence matrix querying, and audit trail management.",
    "benchmark": "Leading international platforms include NVivo, ATLAS.ti, MAXQDA, and Dedoose; software facilitates systematic data management while analytical interpretation remains the researcher's responsibility (Flick, 2014).",
    "domain": "Qualitative & Mixed Methods"
  },
  "TSE": {
    "full_name": "Total Survey Error",
    "purpose": "The overarching survey methodology paradigm (Groves & Lyberg, 2010) categorizing all sources of bias and variance separating a sample survey estimate from the true population parameter.",
    "benchmark": "Decomposes error into two branches: Measurement Side (validity, measurement error, processing error) and Representation Side (coverage, sampling, non-response, and post-survey adjustment error).",
    "domain": "Psychometrics & SEM"
  },
  "IRB": {
    "full_name": "Institutional Review Board",
    "purpose": "An independent ethics committee formally designated to review, approve, and monitor research involving human participants to safeguard their rights, welfare, and dignity.",
    "benchmark": "Enforces Belmont Report principles (Respect for Persons, Beneficence, Justice): verifies informed consent, data anonymization, risk minimization, and protection of vulnerable populations.",
    "domain": "Experimental Design & Medicine"
  },
  "CAT": {
    "full_name": "Computerized Adaptive Testing",
    "purpose": "An IRT-based assessment delivery algorithm that dynamically selects each subsequent test item based on the examinee's previous responses to maximize measurement information around their estimated ability level.",
    "benchmark": "Reduces test length by up to 50% while maintaining uniform measurement precision (SEM <= 0.30) across the entire latent ability spectrum.",
    "domain": "Psychometrics & SEM"
  },
  "IV": {
    "full_name": "Independent Variable / Instrumental Variable",
    "purpose": "In experimental/regression design, the explanatory predictor or manipulated treatment variable; in econometrics, an exogenous third variable (Z) used to identify causal effects under endogeneity.",
    "benchmark": "For Instrumental Variables: First-stage F-statistic > 10 (relevance) and non-significant Hansen J / Sargan test p > 0.05 (exogeneity/exclusion restriction).",
    "domain": "Causal Inference & Econometrics"
  },
  "DV": {
    "full_name": "Dependent Variable",
    "purpose": "The outcome, criterion, or endogenous response variable whose variation the researcher seeks to explain or predict as a function of independent, mediating, and moderating variables.",
    "benchmark": "Must match the statistical estimator to the DV's measurement scale and distribution (OLS for continuous normal, Logit/Probit for binary, Poisson/Negative Binomial for counts, Tobit for censored DVs).",
    "domain": "Causal Inference & Econometrics"
  },
  "MV": {
    "full_name": "Mediating Variable / Moderating Variable",
    "purpose": "Third variables in causal models that either transmit an antecedent's effect to an outcome (Mediator: 'how/why') or alter the strength and direction of a relationship (Moderator: 'when/for whom').",
    "benchmark": "Test mediation via 5,000+ bootstrap confidence intervals of the indirect effect (a*b); test moderation via mean-centered interaction terms (X*W) and Johnson-Neyman floodlight regions (Hayes, 2022).",
    "domain": "Psychometrics & SEM"
  },
  "ATE": {
    "full_name": "Average Treatment Effect",
    "purpose": "The expected causal difference in potential outcomes E[Y(1) - Y(0)] if the entire target population were assigned to the treatment condition versus the control condition.",
    "benchmark": "Unbiasedly estimated under random assignment (RCT) or conditional ignorability/unconfoundedness with full positivity overlap.",
    "domain": "Causal Inference & Econometrics"
  },
  "ATT": {
    "full_name": "Average Treatment Effect on the Treated",
    "purpose": "The expected causal gain E[Y(1) - Y(0) | D = 1] experienced specifically by the subpopulation of units that actually received the treatment or policy intervention.",
    "benchmark": "Primary causal estimand in Difference-in-Differences (DID), Propensity Score Matching (PSM), and Synthetic Control evaluations.",
    "domain": "Causal Inference & Econometrics"
  },
  "ATU": {
    "full_name": "Average Treatment Effect on the Untreated",
    "purpose": "The expected counterfactual causal effect E[Y(1) - Y(0) | D = 0] that would be realized if the currently untreated control population were extended the intervention.",
    "benchmark": "Critical for policy scaling decisions to determine whether expanding a program to non-participants will yield positive net returns.",
    "domain": "Causal Inference & Econometrics"
  },
  "SCM": {
    "full_name": "Synthetic Control Method",
    "purpose": "A data-driven comparative policy evaluation method (Abadie et al., 2010, 2015) that constructs a synthetic counterfactual unit as a convex weighted average of untreated donor pool units.",
    "benchmark": "Donor weights must be non-negative and sum to 1 with minimal pre-intervention RMSPE; statistical significance is evaluated via in-space and in-time placebo permutation tests.",
    "domain": "Causal Inference & Econometrics"
  },
  "DWH": {
    "full_name": "Durbin-Wu-Hausman Test",
    "purpose": "A formal econometric specification test comparing OLS and Instrumental Variable (2SLS) estimates to determine whether explanatory regressors are endogenous.",
    "benchmark": "p < 0.05 rejects the null hypothesis of exogeneity, confirming that OLS is inconsistent and IV/2SLS estimation is required.",
    "domain": "Causal Inference & Econometrics"
  },
  "FE": {
    "full_name": "Fixed Effects Model",
    "purpose": "A panel data econometric estimator that eliminates all time-invariant unobserved heterogeneity across entities (and/or time periods) via within-group demeaning or unit dummy variables.",
    "benchmark": "Preferred over Random Effects when the Hausman specification test (or Mundlak-Chamberlain correlated random effects test) yields p < 0.05; always report cluster-robust standard errors.",
    "domain": "Causal Inference & Econometrics"
  },
  "RE": {
    "full_name": "Random Effects Model",
    "purpose": "A generalized least squares (GLS) panel data estimator assuming unit-specific unobserved effects are strictly uncorrelated with all explanatory variables across all time periods.",
    "benchmark": "Valid only when the Hausman test fails to reject (p > 0.05); enables estimating coefficients of time-invariant explanatory variables.",
    "domain": "Causal Inference & Econometrics"
  },
  "POLS": {
    "full_name": "Pooled Ordinary Least Squares",
    "purpose": "A baseline regression model that pools cross-sectional time-series panel observations without modeling individual-specific intercepts or error components.",
    "benchmark": "Tested via the Breusch-Pagan Lagrange Multiplier (LM) test: if p < 0.05, Pooled OLS is rejected in favor of panel Fixed Effects or Random Effects models.",
    "domain": "Causal Inference & Econometrics"
  },
  "SUR": {
    "full_name": "Seemingly Unrelated Regressions",
    "purpose": "Zellner's (1962) system-of-equations GLS estimator that jointly estimates multiple regression equations whose error terms are contemporaneously correlated across equations.",
    "benchmark": "Asymptotically more efficient than equation-by-equation OLS when the Breusch-Pagan test of error independence rejects (p < 0.05) and equations contain distinct regressors.",
    "domain": "Causal Inference & Econometrics"
  },
  "VAR": {
    "full_name": "Vector Autoregression",
    "purpose": "Christopher Sims's (1980) multivariate time-series framework modeling each endogenous variable as a linear function of its own lags and the lags of all other variables in the system.",
    "benchmark": "Requires stationary I(0) series, optimal lag selection via AIC/BIC/HQIC, eigenvalue stability (all roots inside the unit circle), and interpretation via Impulse Response Functions (IRFs) and FEVD.",
    "domain": "Causal Inference & Econometrics"
  },
  "VECM": {
    "full_name": "Vector Error Correction Model",
    "purpose": "A cointegrated multivariate time-series model (Engle & Granger, 1987; Johansen, 1991) that combines short-run first-difference dynamics with an Error Correction Term (ECT) capturing long-run equilibrium adjustment.",
    "benchmark": "Applies to non-stationary I(1) series that are cointegrated; the Error Correction Term (ECT) coefficient must be negative (-1 < phi < 0) and statistically significant (p < 0.05).",
    "domain": "Causal Inference & Econometrics"
  },
  "ARDL": {
    "full_name": "Autoregressive Distributed Lag",
    "purpose": "Pesaran, Shin, & Smith's (2001) dynamic time-series regression framework capable of testing long-run cointegration (Bounds Test) when regressors are a mixture of stationary I(0) and unit-root I(1) processes.",
    "benchmark": "Long-run cointegration is confirmed if the Bounds Test F-statistic exceeds the upper-bound I(1) critical value at the 5% level, and no series is integrated of order I(2).",
    "domain": "Causal Inference & Econometrics"
  },
  "ADF": {
    "full_name": "Augmented Dickey-Fuller Test",
    "purpose": "A standard econometric unit-root test that includes lagged difference terms of the dependent variable to eliminate autocorrelation when testing whether a time series is non-stationary.",
    "benchmark": "Null hypothesis H0 is the presence of a unit root (non-stationary): p < 0.05 (or test statistic more negative than MacKinnon critical value) rejects H0 and confirms stationarity.",
    "domain": "Causal Inference & Econometrics"
  },
  "KPSS": {
    "full_name": "Kwiatkowski-Phillips-Schmidt-Shin Test",
    "purpose": "A complementary stationarity test in time-series econometrics where the null hypothesis H0 is that the series is trend-stationary or level-stationary (reversing the ADF null).",
    "benchmark": "p > 0.05 fails to reject H0, confirming stationarity; cross-checking ADF (p < 0.05) with KPSS (p > 0.05) provides robust confirmatory evidence of stationarity.",
    "domain": "Causal Inference & Econometrics"
  },
  "PRISMA": {
    "full_name": "Preferred Reporting Items for Systematic Reviews and Meta-Analyses",
    "purpose": "The international evidence-based minimum reporting guideline (PRISMA 2020) designed to ensure transparency, completeness, and reproducibility in systematic reviews and meta-analyses.",
    "benchmark": "Mandates reporting the 27-item PRISMA checklist and the 4-phase flow diagram (Identification, Screening, Eligibility, Included) with explicit exclusion reasons.",
    "domain": "Systematic Reviews & Meta-Analysis"
  },
  "SLR": {
    "full_name": "Systematic Literature Review",
    "purpose": "A structured, reproducible methodology that identifies, screens, appraises, and synthesizes all empirical literature meeting pre-specified inclusion and exclusion criteria.",
    "benchmark": "Requires documented Boolean search strings across multiple databases (Web of Science, Scopus), dual independent screening (Cohen's kappa > 0.70), and formal quality appraisal.",
    "domain": "Systematic Reviews & Meta-Analysis"
  },
  "PROSPERO": {
    "full_name": "International Prospective Register of Systematic Reviews",
    "purpose": "An international open-access database hosted by the University of York's Centre for Reviews and Dissemination for prospectively registering systematic review protocols prior to data extraction.",
    "benchmark": "Prospective registration number (CRD420...) prevents duplication, curbs selective outcome reporting, and is required by top medical, psychology, and social science journals.",
    "domain": "Systematic Reviews & Meta-Analysis"
  },
  "ROBINS-I": {
    "full_name": "Risk Of Bias In Non-randomized Studies - of Interventions",
    "purpose": "A comprehensive Cochrane diagnostic tool evaluating internal validity and risk of bias in non-randomized observational and quasi-experimental studies by comparing them against a target pragmatic trial.",
    "benchmark": "Assesses 7 bias domains (confounding, selection, classification, deviations, missing data, outcome measurement, selective reporting), rated as Low, Moderate, Serious, or Critical risk.",
    "domain": "Systematic Reviews & Meta-Analysis"
  },
  "RoB 2": {
    "full_name": "Cochrane Risk of Bias Tool for Randomized Trials (Version 2)",
    "purpose": "The gold-standard Cochrane diagnostic instrument (Sterne et al., 2019) for evaluating internal validity and risk of bias across randomized controlled trials in systematic reviews.",
    "benchmark": "Assesses 5 mandatory domains: (1) Randomization process, (2) Deviations from intended interventions, (3) Missing outcome data, (4) Measurement of the outcome, and (5) Selection of the reported result; graded as Low risk, Some concerns, or High risk.",
    "domain": "Systematic Reviews & Meta-Analysis"
  },
  "GRADE": {
    "full_name": "Grading of Recommendations Assessment, Development and Evaluation",
    "purpose": "An internationally adopted framework for rating the overall certainty (quality) of a body of evidence and the strength of clinical or policy recommendations in systematic reviews.",
    "benchmark": "Rates evidence certainty as High, Moderate, Low, or Very Low; downgrades for Risk of Bias, Inconsistency (high I²), Indirectness, Imprecision (wide CIs), or Publication Bias.",
    "domain": "Systematic Reviews & Meta-Analysis"
  },
  "PICO": {
    "full_name": "Population, Intervention, Comparison, Outcome",
    "purpose": "A structured question-formulation framework used in evidence-based medicine and quantitative systematic reviews to define eligibility criteria and Boolean search strategies.",
    "benchmark": "All four PICO components (or PICOS adding Study Design) must be explicitly operationalized prior to executing literature searches in PubMed, Scopus, and Web of Science.",
    "domain": "Systematic Reviews & Meta-Analysis"
  },
  "SPIDER": {
    "full_name": "Sample, Phenomenon of Interest, Design, Evaluation, Research type",
    "purpose": "A systematic review question-formulation framework (Cooke et al., 2012) specifically tailored for qualitative and mixed-methods evidence synthesis where experimental PICO terms do not fit.",
    "benchmark": "Preferred by Q1 reviewers over PICO when structuring inclusion/exclusion criteria for qualitative meta-synthesis, ethnography, and interview-based systematic reviews.",
    "domain": "Qualitative & Mixed Methods"
  },
  "CONSORT": {
    "full_name": "Consolidated Standards of Reporting Trials",
    "purpose": "An evidence-based international reporting standard established to ensure complete, transparent reporting of randomized controlled trials across medical, psychological, and behavioral sciences.",
    "benchmark": "Requires completing the 25-item CONSORT checklist and the participant flow diagram tracking Enrollment, Allocation, Follow-up, and Analysis.",
    "domain": "Experimental Design & Medicine"
  },
  "STROBE": {
    "full_name": "Strengthening the Reporting of Observational Studies in Epidemiology",
    "purpose": "International reporting guidelines designed to improve the methodological transparency and completeness of analytical observational studies (cohort, case-control, and cross-sectional designs).",
    "benchmark": "Mandates a 22-item checklist covering study design, sample size rationale, confounder control, missing data handling, and sensitivity analyses.",
    "domain": "Experimental Design & Medicine"
  },
  "COREQ": {
    "full_name": "Consolidated Criteria for Reporting Qualitative Research",
    "purpose": "A 32-item standardized reporting checklist (Tong et al., 2007) for qualitative studies utilizing in-depth interviews and focus groups.",
    "benchmark": "Structured across 3 core domains: (1) Research team and reflexivity, (2) Study design and theoretical framework, and (3) Data analysis and findings (coding tree, saturation, quotations).",
    "domain": "Qualitative & Mixed Methods"
  },
  "SRQR": {
    "full_name": "Standards for Reporting Qualitative Research",
    "purpose": "A comprehensive 21-item synthesis of reporting standards (O'Brien et al., 2014) applicable across the full spectrum of qualitative methodologies.",
    "benchmark": "Emphasizes explicit alignment between the research question, epistemological paradigm, researcher reflexivity, sampling saturation, and trustworthiness verification.",
    "domain": "Qualitative & Mixed Methods"
  },
  "OSF": {
    "full_name": "Open Science Framework",
    "purpose": "An open-source scholarly infrastructure managed by the Center for Open Science that supports study preregistration, Registered Reports, open data, and reproducible code sharing.",
    "benchmark": "Generates immutable, timestamped DOIs for preregistrations and analysis scripts, certifying that confirmatory hypotheses were locked prior to data collection.",
    "domain": "Experimental Design & Medicine"
  },
  "COPE": {
    "full_name": "Committee on Publication Ethics",
    "purpose": "The international governance body establishing ethical standards and procedural flowcharts for editors, publishers, and authors regarding peer review integrity, authorship disputes, plagiarism, and retractions.",
    "benchmark": "Mandatory ethical benchmark adopted by all reputable SSCI/SCIE and Scopus publishers (Elsevier, Wiley, Springer Nature, SAGE, Taylor & Francis).",
    "domain": "Systematic Reviews & Meta-Analysis"
  },
  "CRediT": {
    "full_name": "Contributor Roles Taxonomy",
    "purpose": "A high-level 14-role standardized taxonomy (Conceptualization, Methodology, Formal Analysis, Writing - Original Draft, etc.) providing transparent attribution of individual author contributions.",
    "benchmark": "Required by leading international publishers to ensure accountability and eliminate honorary/gift and ghost authorship.",
    "domain": "Systematic Reviews & Meta-Analysis"
  },
  "MGA": {
    "full_name": "Multi-Group Analysis",
    "purpose": "A structural equation modeling technique testing whether pre-defined data groups (e.g., gender, country, industry) exhibit statistically significant differences in their structural path coefficients.",
    "benchmark": "Mandatory prerequisite: Establish Measurement Invariance (MICOM in PLS-SEM or Configural/Metric invariance in CB-SEM) before testing group differences via permutation test or PLS-MGA (p < 0.05).",
    "domain": "Psychometrics & SEM"
  },
  "IPMA": {
    "full_name": "Importance-Performance Map Analysis",
    "purpose": "A diagnostic PLS-SEM extension that contrasts the total unstandardized structural effect of predecessor constructs (Importance on the x-axis) against their rescaled average latent variable scores (Performance on the y-axis).",
    "benchmark": "Prioritizes managerial interventions on constructs located in the 'High Importance, Low Performance' (lower-right) quadrant (Ringle & Sarstedt, 2016).",
    "domain": "Psychometrics & SEM"
  },
  "FIMIX-PLS": {
    "full_name": "Finite Mixture Partial Least Squares",
    "purpose": "A latent class segmentation procedure in PLS-SEM that uncovers unobserved heterogeneity by simultaneously estimating segment-specific path coefficients and finite mixture probabilities.",
    "benchmark": "Determine the optimal number of latent segments (K) by jointly minimizing AIC3 and MDL5 (or AIC4 and BIC) while ensuring normed entropy criterion EN > 0.50 (Sarstedt et al., 2017).",
    "domain": "Psychometrics & SEM"
  },
  "PLSpredict": {
    "full_name": "Partial Least Squares Prediction Assessment",
    "purpose": "Shmueli et al.'s (2016, 2019) k-fold cross-validation procedure in PLS-SEM designed to evaluate out-of-sample predictive power at the manifest indicator level.",
    "benchmark": "Requires Q²_predict > 0; compare indicator RMSE (or MAE) against a naive linear regression model (LM) benchmark: lower PLS errors across all (high) or a majority (medium) of indicators confirm predictive power.",
    "domain": "Psychometrics & SEM"
  },
  "ULMC": {
    "full_name": "Unmeasured Latent Marker Construct",
    "purpose": "A statistical CFA/SEM remedy for Common Method Bias that models an unmeasured latent method factor loading onto all manifest indicators alongside substantive constructs.",
    "benchmark": "Compare nested models (baseline vs. constrained/unconstrained method factor); CMB is not a pervasive threat if substantive path coefficients remain statistically significant and method variance is < 25%.",
    "domain": "Psychometrics & SEM"
  },
  "QRP": {
    "full_name": "Questionable Research Practices",
    "purpose": "Methodological and analytical practices (such as p-hacking, selective outcome reporting, optional stopping, and ad-hoc outlier deletion) that exploit researcher degrees of freedom and inflate false-positive rates.",
    "benchmark": "Eliminated through study preregistration, Registered Reports, multiverse/specification curve analysis, and open data/code deposition.",
    "domain": "Experimental Design & Medicine"
  },
  "HARK": {
    "full_name": "Hypothesizing After the Results are Known",
    "purpose": "Kerr's (1998) methodological violation wherein post-hoc exploratory findings discovered during data analysis are retroactively presented in a manuscript as if they were a priori confirmatory hypotheses.",
    "benchmark": "Invalidates frequentist Type I error guarantees (p-values); prevented via timestamped pre-analysis plans and transparent separation of confirmatory vs. exploratory analyses.",
    "domain": "Experimental Design & Medicine"
  },
  "FDR": {
    "full_name": "False Discovery Rate",
    "purpose": "Benjamini and Hochberg's (1995) multiple-hypothesis testing correction that controls the expected proportion of false positives (Type I errors) among all rejected null hypotheses.",
    "benchmark": "Typically controlled at q < 0.05 or q < 0.10; offers substantially higher statistical power than conservative family-wise Bonferroni corrections when testing many hypotheses simultaneously.",
    "domain": "Causal Inference & Econometrics"
  },
  "FWER": {
    "full_name": "Family-Wise Error Rate",
    "purpose": "The probability of making at least one Type I (false-positive) error across an entire family of simultaneous statistical hypothesis tests.",
    "benchmark": "Controlled via Bonferroni correction (adjusted alpha = alpha / m) or the uniformly more powerful Holm-Bonferroni step-down procedure (alpha = 0.05).",
    "domain": "Causal Inference & Econometrics"
  },
  "LASSO": {
    "full_name": "Least Absolute Shrinkage and Selection Operator",
    "purpose": "Tibshirani's (1996) L1-penalized regression and machine learning estimator that simultaneously performs continuous parameter shrinkage and automated variable selection by forcing weak coefficients exactly to zero.",
    "benchmark": "Regularization penalty parameter lambda is tuned via k-fold cross-validation (lambda_min or lambda_1se); for causal inference, combine with Double Machine Learning (Post-Double-Selection Lasso).",
    "domain": "Causal Inference & Econometrics"
  },
  "LDA": {
    "full_name": "Latent Dirichlet Allocation",
    "purpose": "Blei, Ng, & Jordan's (2003) generative Bayesian probabilistic topic model that discovers latent thematic structures across large textual corpora by modeling documents as mixtures of topics and topics as mixtures of words.",
    "benchmark": "Select optimal topic number (K) by maximizing semantic Topic Coherence (C_v > 0.50 or UMass coherence), minimizing held-out perplexity, and conducting human qualitative validation of top word loadings.",
    "domain": "Qualitative & Mixed Methods"
  },
  "XAI": {
    "full_name": "Explainable Artificial Intelligence",
    "purpose": "A suite of post-hoc and intrinsic interpretability methods (such as SHAP, LIME, and Partial Dependence Plots) that make complex black-box machine learning predictions transparent and theoretically auditable.",
    "benchmark": "Mandatory in high-stakes econometric, financial, medical, and management ML applications to quantify feature importance, directionality, and nonlinear interaction effects.",
    "domain": "Causal Inference & Econometrics"
  },
  "SHAP": {
    "full_name": "Shapley Additive Explanations",
    "purpose": "Lundberg and Lee's (2017) cooperative game-theoretic XAI framework that assigns each explanatory feature a unique marginal contribution value for individual and global machine learning predictions.",
    "benchmark": "Uniquely satisfies three foundational axioms: Local Accuracy (efficiency), Missingness, and Consistency; enables global beeswarm summary plots and local waterfall explanations.",
    "domain": "Causal Inference & Econometrics"
  },
  "TA": {
    "full_name": "Thematic Analysis",
    "purpose": "A foundational qualitative analytical method (Braun & Clarke, 2006, 2022) for systematically identifying, organizing, and interpreting patterns of meaning (themes) across qualitative datasets.",
    "benchmark": "Follows Braun & Clarke's rigorous 6-phase process: (1) Familiarization, (2) Initial coding, (3) Generating initial themes, (4) Reviewing themes, (5) Defining and naming themes, and (6) Producing the report.",
    "domain": "Qualitative & Mixed Methods"
  },
  "GT": {
    "full_name": "Grounded Theory",
    "purpose": "An inductive/abductive qualitative methodology (Glaser & Strauss, 1967; Corbin & Strauss; Charmaz) aimed at generating a substantive or formal process theory directly grounded in empirical field data.",
    "benchmark": "Requires iterative Theoretical Sampling, the Constant Comparative Method, multi-stage coding (open/initial, axial/focused, selective/theoretical), memo-writing, and Theoretical Saturation.",
    "domain": "Qualitative & Mixed Methods"
  },
  "CDA": {
    "full_name": "Critical Discourse Analysis",
    "purpose": "An interdisciplinary qualitative methodology (Fairclough, Wodak, van Dijk) examining how language and discursive practices enact, reproduce, and challenge macro-level social power, ideology, and inequality.",
    "benchmark": "Operationalized via Fairclough's 3D framework: (1) Micro-level text analysis, (2) Meso-level discursive production/interpretation practices, and (3) Macro-level sociocultural and institutional practice.",
    "domain": "Qualitative & Mixed Methods"
  },
  "NGT": {
    "full_name": "Nominal Group Technique",
    "purpose": "A structured, face-to-face or virtual group consensus methodology (Delbecq & Van de Ven, 1971) that equalizes participation and prevents dominant-individual bias during expert problem identification and prioritization.",
    "benchmark": "Executes 4 strict sequential stages: (1) Silent independent idea generation, (2) Round-robin recording without debate, (3) Structured clarification discussion, and (4) Anonymous independent ranking/voting.",
    "domain": "Qualitative & Mixed Methods"
  },
  "ROC": {
    "full_name": "Receiver Operating Characteristic",
    "purpose": "A graphical diagnostic plot illustrating the classification performance of a binary classifier across all possible decision thresholds by plotting True Positive Rate (Sensitivity) against False Positive Rate (1 - Specificity).",
    "benchmark": "Curves arching closely toward the upper-left corner (100% sensitivity, 100% specificity) indicate superior discriminative ability; the 45-degree diagonal represents random chance (AUC = 0.50).",
    "domain": "Causal Inference & Econometrics"
  },
  "AUC": {
    "full_name": "Area Under the ROC Curve",
    "purpose": "A threshold-independent scalar summary metric of binary classification accuracy representing the probability that a randomly chosen positive instance is ranked higher than a randomly chosen negative instance.",
    "benchmark": "AUC = 0.50 (no discrimination / random guessing); 0.70 <= AUC < 0.80 (acceptable); 0.80 <= AUC < 0.90 (excellent); AUC >= 0.90 (outstanding discrimination; Hosmer & Lemeshow).",
    "domain": "Causal Inference & Econometrics"
  },
  "RMSE": {
    "full_name": "Root Mean Square Error",
    "purpose": "A standard quadratic loss metric measuring the square root of the average squared differences between model-predicted values and observed outcomes, penalizing large prediction errors heavily.",
    "benchmark": "Lower RMSE indicates superior predictive accuracy; used in PLSpredict (comparing RMSE_PLS vs. RMSE_LM) and cross-validation model comparison on identical outcome scales.",
    "domain": "Causal Inference & Econometrics"
  },
  "MAE": {
    "full_name": "Mean Absolute Error",
    "purpose": "A linear prediction error metric measuring the average magnitude of absolute differences between predicted values and observed values without squaring the residuals.",
    "benchmark": "More robust than RMSE when prediction errors exhibit heavy tails or extreme skewness; preferred in PLSpredict when prediction error distributions are highly non-symmetric (Shmueli et al., 2019).",
    "domain": "Causal Inference & Econometrics"
  },
  "WLS": {
    "full_name": "Weighted Least Squares",
    "purpose": "A specialization of Generalized Least Squares that corrects for known heteroskedasticity by weighting each observation inversely proportional to the variance of its error term.",
    "benchmark": "Restores the Gauss-Markov BLUE (Best Linear Unbiased Estimator) efficiency property when the exact functional form of error variance is known or consistently modeled.",
    "domain": "Causal Inference & Econometrics"
  },
  "GLS": {
    "full_name": "Generalized Least Squares",
    "purpose": "Aitken's (1935) regression estimator that generalizes OLS to achieve asymptotic efficiency when error terms exhibit heteroskedasticity and/or serial autocorrelation.",
    "benchmark": "Implemented in practice as Feasible Generalized Least Squares (FGLS) when the error covariance matrix Omega must first be estimated consistently from first-stage OLS residuals.",
    "domain": "Causal Inference & Econometrics"
  },
  "3SLS": {
    "full_name": "Three-Stage Least Squares",
    "purpose": "Zellner and Theil's (1962) full-information system estimator combining Two-Stage Least Squares (2SLS) with Seemingly Unrelated Regressions (SUR) to estimate simultaneous equations with endogenous regressors and cross-equation error correlations.",
    "benchmark": "Asymptotically more efficient than equation-by-equation 2SLS, provided that every equation in the simultaneous system is correctly specified (otherwise misspecification in one equation contaminates the entire system).",
    "domain": "Causal Inference & Econometrics"
  },
  "MLE": {
    "full_name": "Maximum Likelihood Estimation",
    "purpose": "R. A. Fisher's foundational parametric estimation framework that selects parameter values maximizing the log-likelihood function of observing the empirical sample data under a specified probability distribution.",
    "benchmark": "Possesses optimal asymptotic properties — Consistency, Asymptotic Normality, and Asymptotic Efficiency (achieving the Cramér-Rao lower bound) — when distributional assumptions hold and sample size is sufficiently large.",
    "domain": "Causal Inference & Econometrics"
  },
  "QMLE": {
    "full_name": "Quasi-Maximum Likelihood Estimation",
    "purpose": "An estimation framework (White, 1982; Gourieroux et al., 1984) that maximizes a nominal likelihood function (e.g., Poisson or Gaussian) to obtain consistent parameter estimates even when the true underlying distribution is misspecified.",
    "benchmark": "Requires only correct specification of the conditional mean (for linear exponential family models) and mandatory reporting of Huber-White sandwich robust standard errors.",
    "domain": "Causal Inference & Econometrics"
  },
  "LAD": {
    "full_name": "Least Absolute Deviations",
    "purpose": "A robust L1-norm regression estimator (median regression / quantile regression at tau = 0.50) that minimizes the sum of absolute residuals rather than squared residuals.",
    "benchmark": "Highly resistant to extreme y-axis outliers and heavy-tailed error distributions that severely distort standard OLS mean regression.",
    "domain": "Causal Inference & Econometrics"
  },
  "RESET": {
    "full_name": "Ramsey Regression Equation Specification Error Test",
    "purpose": "Ramsey's (1969) general diagnostic test for functional form misspecification (omitted nonlinearities or interaction terms) in linear regression models by testing the joint significance of powers of the fitted values.",
    "benchmark": "p > 0.05 fails to reject the null hypothesis of correct linear functional form; p < 0.05 indicates functional form misspecification (missing polynomial, logarithmic, or interaction terms).",
    "domain": "Causal Inference & Econometrics"
  },
  "CUSUM": {
    "full_name": "Cumulative Sum Control Chart Test",
    "purpose": "Brown, Durbin, & Evans's (1975) time-series diagnostic test evaluating the structural stability of regression or ARDL parameters over time using recursive residuals.",
    "benchmark": "Parameter stability is confirmed if both the CUSUM (mean stability) and CUSUM of Squares (CUSUMSQ, variance stability) plots remain entirely within the 5% critical boundary lines.",
    "domain": "Causal Inference & Econometrics"
  },
  "GARCH": {
    "full_name": "Generalized Autoregressive Conditional Heteroskedasticity",
    "purpose": "Bollerslev's (1986) financial econometrics time-series model that captures volatility clustering by modeling conditional error variance as a function of past squared innovations (ARCH terms) and past conditional variances (GARCH terms).",
    "benchmark": "Requires non-negative variance parameters and stationarity condition alpha + beta < 1 (values close to 1 indicate high volatility persistence); tested via Engle's ARCH-LM test.",
    "domain": "Causal Inference & Econometrics"
  },
  "CEM": {
    "full_name": "Coarsened Exact Matching",
    "purpose": "A monotonic imbalance-bounding matching method (Iacus, King, & Porro, 2012) that temporarily coarsens continuous covariates into substantive strata, performs exact matching on the coarsened bins, and retains original uncoarsened values for analysis.",
    "benchmark": "Directly bounds maximum covariate imbalance ex ante and substantially reduces the multivariate L1 imbalance statistic (L1_post << L1_pre) without iterative propensity model tuning.",
    "domain": "Causal Inference & Econometrics"
  },
  "IPW": {
    "full_name": "Inverse Probability Weighting",
    "purpose": "A causal inference estimator (Horvitz-Thompson / Robins) that reweights observational units by the inverse of their conditional probability of receiving the treatment actually observed, creating a balanced pseudo-population.",
    "benchmark": "Check for extreme weights (use stabilized weights or trim propensity scores outside [0.05, 0.95]); when combined with an outcome regression model, forms the Doubly Robust (AIPW) estimator.",
    "domain": "Causal Inference & Econometrics"
  },
  "ESEM": {
    "full_name": "Exploratory Structural Equation Modeling",
    "purpose": "An overarching psychometric framework (Asparouhov & Muthén, 2009) integrating EFA's flexible cross-loadings (via target or geomin rotation) within the confirmatory SEM architecture.",
    "benchmark": "Prevents artificial inflation of inter-factor correlations caused by forcing small cross-loadings to zero in strict ICM-CFA; evaluated via improved CFI/TLI, lower RMSEA, and theoretically interpretable target loadings.",
    "domain": "Psychometrics & SEM"
  },
  "CLF": {
    "full_name": "Common Latent Factor",
    "purpose": "A confirmatory factor analytic diagnostic used to detect and partial out Common Method Variance by adding a single latent factor connected to all observed indicators.",
    "benchmark": "Compare standardized factor loadings between the CFA model with and without the CLF: differences Delta_lambda < 0.20 across all items indicate negligible common method bias.",
    "domain": "Psychometrics & SEM"
  },
  "DIF": {
    "full_name": "Differential Item Functioning",
    "purpose": "A psychometric bias condition occurring when respondents from different demographic or cultural groups who possess the exact same underlying latent trait level (theta) have systematically different probabilities of endorsing an item.",
    "benchmark": "Diagnosed via Mantel-Haenszel chi-square, IRT Likelihood Ratio test, or logistic regression (testing uniform and non-uniform DIF); ETS Delta scale classifies items into A (negligible), B (moderate), or C (large DIF requiring removal).",
    "domain": "Psychometrics & SEM"
  },
  "PAR": {
    "full_name": "Participatory Action Research",
    "purpose": "A collaborative, emancipatory research methodology (Lewin; Kemmis & McTaggart) in which researchers and community/organizational members co-design inquiry to enact transformative practical change.",
    "benchmark": "Operates through iterative self-reflective spiral cycles: (1) Planning change, (2) Acting and implementing, (3) Observing process and consequences, and (4) Reflecting and replanning.",
    "domain": "Qualitative & Mixed Methods"
  },
  "MMAT": {
    "full_name": "Mixed Methods Appraisal Tool",
    "purpose": "A validated critical appraisal instrument (Hong et al., 2018) designed for systematic reviews that include qualitative, quantitative randomized, quantitative non-randomized, quantitative descriptive, and mixed-methods studies.",
    "benchmark": "Evaluates 5 core methodological quality criteria per study category; discourages computing a single aggregate numerical score in favor of detailed domain-level quality reporting.",
    "domain": "Qualitative & Mixed Methods"
  },
  "CASP": {
    "full_name": "Critical Appraisal Skills Programme",
    "purpose": "A widely used suite of study-design-specific checklists (for RCTs, cohort studies, case-control studies, systematic reviews, and qualitative research) used to evaluate methodological validity and clinical/practical utility.",
    "benchmark": "The 10-question CASP Qualitative Checklist is a premier standard in qualitative evidence synthesis for appraising research design, recruitment, data collection, reflexivity, ethics, and rigor.",
    "domain": "Systematic Reviews & Meta-Analysis"
  },
  "NOS": {
    "full_name": "Newcastle-Ottawa Scale",
    "purpose": "A standard quality assessment tool (Wells et al.) used in systematic reviews and meta-analyses to evaluate the methodological quality of non-randomized cohort and case-control studies.",
    "benchmark": "Uses a 9-star rating system across 3 domains: Selection (up to 4 stars), Comparability (up to 2 stars), and Outcome/Exposure ascertainment (up to 3 stars); scores >= 7 stars indicate high methodological quality.",
    "domain": "Systematic Reviews & Meta-Analysis"
  },
  "JIF": {
    "full_name": "Journal Impact Factor",
    "purpose": "Clarivate Analytics's bibliometric index (Journal Citation Reports / Web of Science) measuring the average frequency with which articles published in a journal during the preceding two years were cited in the current year.",
    "benchmark": "Calculated as Cites_t / Citeable_Items_(t-1 + t-2); used to rank journals into JCR Quartiles (Q1–Q4) within subject categories, though DORA warns against using JIF alone to judge individual article quality.",
    "domain": "Systematic Reviews & Meta-Analysis"
  },
  "SJR": {
    "full_name": "SCImago Journal Rank",
    "purpose": "A prestige-weighted bibliometric indicator derived from the Scopus database that weights citations according to the scientific influence and subject field of the citing journals (eigenfactor/PageRank algorithm).",
    "benchmark": "Categorizes Scopus-indexed journals into field-normalized quartiles: Q1 (top 25%, 75th–99th percentile), Q2 (50th–74th), Q3 (25th–49th), and Q4 (bottom 25%).",
    "domain": "Systematic Reviews & Meta-Analysis"
  },
  "SNIP": {
    "full_name": "Source Normalized Impact per Paper",
    "purpose": "CWTS Leiden's field-normalized bibliometric metric (Scopus) that measures a journal's contextual citation impact by weighting citations relative to the total citation potential of its specific subject field.",
    "benchmark": "SNIP = 1.0 represents the median citation impact of journals in that discipline; SNIP > 1.5–2.0 indicates substantially above-average impact corrected for cross-disciplinary citation density differences.",
    "domain": "Systematic Reviews & Meta-Analysis"
  },
  "GFI": {
    "full_name": "Goodness of Fit Index",
    "purpose": "Jöreskog and Sörbom's classic absolute fit index in CB-SEM measuring the proportion of variance and covariance in the empirical sample covariance matrix accounted for by the model-implied matrix.",
    "benchmark": "Traditional threshold is GFI >= 0.90 (or >= 0.95); however, because GFI is sensitive to sample size, modern guidelines (Hu & Bentler, 1999; Kline, 2023) prefer SRMR and RMSEA.",
    "domain": "Psychometrics & SEM"
  },
  "AGFI": {
    "full_name": "Adjusted Goodness of Fit Index",
    "purpose": "A parsimony-adjusted extension of the Goodness of Fit Index (GFI) in CB-SEM that penalizes model complexity by adjusting for the ratio of degrees of freedom to total available variances/covariances.",
    "benchmark": "AGFI >= 0.85 or >= 0.90 indicates acceptable fit; typically reported alongside CFI, TLI, RMSEA, and SRMR.",
    "domain": "Psychometrics & SEM"
  },
  "NFI": {
    "full_name": "Normed Fit Index",
    "purpose": "Bentler and Bonett's (1980) incremental fit index in SEM that evaluates model fit by comparing the Chi-square value of the hypothesized model to that of the baseline independence model without degrees-of-freedom adjustment.",
    "benchmark": "NFI >= 0.90 (or >= 0.95) indicates good fit; because NFI underestimates fit in small samples and is not penalty-adjusted, TLI (NNFI) and CFI are generally preferred.",
    "domain": "Psychometrics & SEM"
  },
  "NNFI": {
    "full_name": "Non-Normed Fit Index (Tucker-Lewis Index - TLI)",
    "purpose": "An incremental goodness-of-fit index in CFA/SEM (identical to the Tucker-Lewis Index, TLI) that overcomes NFI's small-sample bias by incorporating degrees of freedom to reward model parsimony.",
    "benchmark": "NNFI / TLI >= 0.90 indicates acceptable fit, and >= 0.95 indicates excellent fit (Hu & Bentler, 1999).",
    "domain": "Psychometrics & SEM"
  },
  "IFI": {
    "full_name": "Incremental Fit Index",
    "purpose": "Bollen's (1989) incremental fit index (Delta2) in SEM that adjusts the Normed Fit Index (NFI) for sample size and degrees of freedom.",
    "benchmark": "IFI >= 0.90 indicates acceptable fit, and IFI >= 0.95 indicates strong model fit.",
    "domain": "Psychometrics & SEM"
  },
  "RMR": {
    "full_name": "Root Mean Square Residual",
    "purpose": "An absolute badness-of-fit measure in CFA/SEM representing the square root of the average squared residuals between observed and model-implied unstandardized covariances.",
    "benchmark": "Values closer to 0 indicate better fit; because unstandardized RMR depends on the raw measurement scales of the indicators, reporting the Standardized RMR (SRMR < 0.08) is universally preferred.",
    "domain": "Psychometrics & SEM"
  },
  "RRA": {
    "full_name": "Randomized Response Analysis",
    "purpose": "Warner's (1965) survey questioning technique that uses a randomization device (e.g., coin flip or dice roll) to guarantee respondent anonymity when measuring highly sensitive, stigmatized, or illegal behaviors.",
    "benchmark": "Eliminates social desirability and non-response bias by enabling unbiased population prevalence estimation without revealing any individual respondent's true answer.",
    "domain": "Experimental Design & Medicine"
  },
  "DOR": {
    "full_name": "Diagnostic Odds Ratio",
    "purpose": "A single scalar indicator of diagnostic test performance in medical and psychometric meta-analyses, defined as the ratio of the odds of positivity in subjects with the condition relative to the odds in subjects without the condition.",
    "benchmark": "DOR = [Sensitivity / (1 - Sensitivity)] / [(1 - Specificity) / Specificity]; DOR = 1 indicates no discriminative ability, whereas higher values (e.g., DOR > 20) indicate strong diagnostic accuracy.",
    "domain": "Experimental Design & Medicine"
  },
  "SROC": {
    "full_name": "Summary Receiver Operating Characteristic",
    "purpose": "A bivariate meta-analytic curve synthesizing diagnostic accuracy studies that accounts for varying positivity thresholds across primary studies to plot pooled sensitivity against specificity.",
    "benchmark": "Estimated via Moses-Littenberg, bivariate random-effects (Reitsma), or HSROC models; an Area Under the SROC Curve approaching 1.0 (> 0.85) confirms high pooled diagnostic validity.",
    "domain": "Systematic Reviews & Meta-Analysis"
  },
  "IPD": {
    "full_name": "Individual Participant Data",
    "purpose": "The gold standard of meta-analysis (IPD Meta-Analysis) wherein raw line-by-line participant-level data are obtained from original trials rather than relying on published aggregate summary statistics.",
    "benchmark": "Eliminates ecological fallacy (aggregation bias), standardizes covariate definitions and time-to-event analyses across studies, and enables high-powered individual-level treatment-by-covariate interaction testing.",
    "domain": "Systematic Reviews & Meta-Analysis"
  },
  "NMA": {
    "full_name": "Network Meta-Analysis",
    "purpose": "A quantitative evidence synthesis methodology (mixed treatment comparison) that simultaneously compares three or more interventions by combining direct head-to-head trial evidence with indirect evidence across a connected network of studies.",
    "benchmark": "Requires verifying the Transitivity Assumption and statistical consistency between direct and indirect evidence (node-splitting or design-by-treatment inconsistency test p > 0.05); ranks interventions via SUCRA.",
    "domain": "Systematic Reviews & Meta-Analysis"
  },
  "SUCRA": {
    "full_name": "Surface Under the Cumulative Ranking Curve",
    "purpose": "A Bayesian or frequentist metric in Network Meta-Analysis that summarizes the cumulative ranking probabilities of each competing treatment into a single percentage from 0% to 100%.",
    "benchmark": "SUCRA = 100% indicates an intervention is certain to be the most effective treatment in the network; SUCRA = 0% indicates it is certain to be the least effective; interpret alongside 95% credible/confidence intervals.",
    "domain": "Systematic Reviews & Meta-Analysis"
  },
  "QCA": {
    "full_name": "Qualitative Comparative Analysis",
    "purpose": "Charles Ragin's (1987, 2008) set-theoretic, case-oriented configurational methodology bridging qualitative and quantitative research to identify causal complexity, equifinality, and conjunctural causation.",
    "benchmark": "Evaluated via two foundational set-theoretic parameters: Necessity Consistency (>= 0.90), Sufficiency Consistency (>= 0.80, PRI >= 0.70), and Solution/Unique Coverage.",
    "domain": "Qualitative & Mixed Methods"
  },
  "csQCA": {
    "full_name": "Crisp-Set Qualitative Comparative Analysis",
    "purpose": "The foundational dichotomous variant of Qualitative Comparative Analysis in which causal conditions and outcomes are calibrated into binary set memberships (1 = fully in, 0 = fully out).",
    "benchmark": "Constructs a 2^k Truth Table of binary configurations and applies Boolean minimization (Quine-McCluskey algorithm) with consistency >= 0.80 and zero contradictory configurations.",
    "domain": "Qualitative & Mixed Methods"
  },
  "fsQCA": {
    "full_name": "Fuzzy-Set Qualitative Comparative Analysis",
    "purpose": "Ragin's (2000, 2008) continuous set-theoretic extension of QCA allowing cases to hold partial membership scores anywhere in the interval [0, 1] to capture degrees of set membership alongside qualitative thresholds.",
    "benchmark": "Calibrate data using three qualitative anchors (0.95 full membership, 0.50 crossover point, 0.05 full non-membership); require Necessity Consistency >= 0.90, Sufficiency Consistency >= 0.80, and PRI >= 0.70.",
    "domain": "Qualitative & Mixed Methods"
  },
  "mvQCA": {
    "full_name": "Multi-Value Qualitative Comparative Analysis",
    "purpose": "Cronqvist and Berg-Schlosser's (2009) extension of crisp-set QCA that permits multinomial categorical conditions (e.g., values {0, 1, 2}) to prevent information loss when coding multi-category institutional or policy variables.",
    "benchmark": "Preserves categorical granularity in Truth Table minimization while adhering to standard QCA sufficiency consistency (>= 0.80) and coverage thresholds.",
    "domain": "Qualitative & Mixed Methods"
  },
  "SEM-PLS": {
    "full_name": "Partial Least Squares Structural Equation Modeling",
    "purpose": "Composite-based structural equation modeling (synonymous with PLS-SEM; Wold, Hair, Ringle, Sarstedt) designed to maximize explained variance of endogenous constructs and support out-of-sample prediction.",
    "benchmark": "Recommended when estimating complex structural models with many constructs/indicators, formative measurement models, small-to-medium sample sizes, or when predictive accuracy (PLSpredict) is a primary objective.",
    "domain": "Psychometrics & SEM"
  },
  "MABI": {
    "full_name": "Model of Athlete Brand Image",
    "purpose": "Arai, Ko, and Ross's (2014) multidimensional conceptual scale framework in sport management and marketing that operationalizes athlete brand equity across three higher-order dimensions.",
    "benchmark": "Comprises Athletic Performance (athletic expertise, competition style, sportsmanship, rivalry), Attractive Appearance (physical attractiveness, symbol, body fitness), and Marketable Lifestyle (life story, role model, relationship effort).",
    "domain": "Psychometrics & SEM"
  },
  "SPT": {
    "full_name": "Self-Presentation Theory",
    "purpose": "Erving Goffman's (1959) dramaturgical sociological theory (Impression Management) explaining how individuals strategically regulate information, symbols, and behaviors in frontstage and backstage settings to shape audience perceptions.",
    "benchmark": "Foundational theoretical framework in organizational behavior, consumer psychology, personal branding, and digital social media research.",
    "domain": "Qualitative & Mixed Methods"
  },
  "SPAR-4-SLR": {
    "full_name": "Scientific Procedures and Rationales for Systematic Literature Reviews",
    "purpose": "Paul et al.'s (2021) rigorous methodological protocol designed specifically for business, management, and marketing scholars to conduct transparent, replicable systematic literature reviews.",
    "benchmark": "Structured into 3 sequential stages and 6 substages: (1) Assembling (Identification, Acquisition), (2) Arranging (Organization, Purification), and (3) Assessing (Evaluation, Reporting); widely required in Q1 business review journals (JBR, IJCS).",
    "domain": "Systematic Reviews & Meta-Analysis"
  },
  "CEBs": {
    "full_name": "Consumer Engagement Behaviors",
    "purpose": "Van Doorn et al.'s (2010) behavioral marketing construct capturing customers' behavioral manifestations toward a brand or firm, beyond purchase, resulting from motivational drivers.",
    "benchmark": "Evaluated across five dimensions: valence (positive/negative), form/modality (WOM, co-creation, reviews), scope (temporal/geographic), nature of impact, and customer goals; foundational in digital marketing and brand community research.",
    "domain": "Psychometrics & SEM"
  },
  "OBC": {
    "full_name": "Online Brand Community",
    "purpose": "Muniz and O'Guinn's (2001) specialized, non-geographically bound community structured around a shared social identity of admirers of a brand on digital platforms.",
    "benchmark": "Characterized by three core sociological markers: Consciousness of Kind, Shared Rituals and Traditions, and a Sense of Moral Responsibility; primary empirical context for Netnography (Kozinets, 2019).",
    "domain": "Qualitative & Mixed Methods"
  }
};

const containsVietnameseChars = (s?: string): boolean =>
  Boolean(
    s &&
      /[\u0102\u0103\u00C2\u00E2\u0110\u0111\u00CA\u00EA\u00D4\u00F4\u01A0\u01A1\u01AF\u01B0\u1EA0-\u1EF9]/.test(
        s.normalize("NFC")
      )
  );

const isGenericPlaceholderEn = (s?: string): boolean =>
  Boolean(
    s &&
      /^(Rigorous scholarly definition of|Academic definition of|Scholarly peer-reviewed definition of|Academic purpose and contextual usage of)/i.test(
        s.trim()
      )
  );

/**
 * Lấy định nghĩa mục từ chuẩn hóa theo ngôn ngữ
 */
export function getTermDefinition(term: MethodologyTerm, lang: "vi" | "en"): string {
  if (lang === "en") {
    const mono = MONOLINGUAL_TERMS_EN[term.id];
    if (mono?.core_definition) {
      return mono.core_definition;
    }
    if (
      term.core_definition_en &&
      term.core_definition_en.trim() &&
      !isGenericPlaceholderEn(term.core_definition_en) &&
      !containsVietnameseChars(term.core_definition_en)
    ) {
      return term.core_definition_en.trim();
    }
    if (
      term.core_definition &&
      term.core_definition.trim() &&
      !containsVietnameseChars(term.core_definition)
    ) {
      return term.core_definition.trim();
    }
    const cite = term.seminal_citation || term.apa_reference;
    return cite
      ? `Rigorous methodological concept denoting ${term.term}, grounded in foundational scholarly literature (${cite}).`
      : `An established academic research methodology concept denoting ${term.term}, foundational to rigorous research design and empirical measurement in social and scientific inquiry.`;
  }
  return term.core_definition;
}

/**
 * Lấy cơ chế vận hành theo ngôn ngữ (Không bao giờ rò rỉ tiếng Việt khi ở chế độ EN)
 */
export function getTermOperationalMechanism(term: MethodologyTerm, lang: "vi" | "en"): string | undefined {
  if (lang === "en") {
    if (
      term.operational_mechanism_en &&
      term.operational_mechanism_en.trim() &&
      !containsVietnameseChars(term.operational_mechanism_en)
    ) {
      return term.operational_mechanism_en.trim();
    }
    if (
      term.operational_mechanism &&
      term.operational_mechanism.trim() &&
      !containsVietnameseChars(term.operational_mechanism)
    ) {
      return term.operational_mechanism.trim();
    }
    return undefined;
  }
  return term.operational_mechanism || undefined;
}

/**
 * Lấy ngưỡng tham chiếu theo ngôn ngữ
 */
export function getTermBenchmarks(term: MethodologyTerm, lang: "vi" | "en"): string | undefined {
  if (lang === "en") {
    const mono = MONOLINGUAL_TERMS_EN[term.id];
    if (mono?.benchmarks) return mono.benchmarks;
    if (
      term.benchmarks_en &&
      term.benchmarks_en.trim() &&
      !containsVietnameseChars(term.benchmarks_en)
    ) {
      return term.benchmarks_en.trim();
    }
    if (
      term.benchmarks &&
      term.benchmarks.trim() &&
      !containsVietnameseChars(term.benchmarks)
    ) {
      return term.benchmarks.trim();
    }
    return undefined;
  }
  return term.benchmarks || undefined;
}

/**
 * Lấy cạm bẫy phương pháp theo ngôn ngữ
 */
export function getTermPitfalls(term: MethodologyTerm, lang: "vi" | "en"): string | undefined {
  if (lang === "en") {
    const mono = MONOLINGUAL_TERMS_EN[term.id];
    if (mono?.pitfalls) return mono.pitfalls;
    if (
      term.pitfalls_en &&
      term.pitfalls_en.trim() &&
      !containsVietnameseChars(term.pitfalls_en)
    ) {
      return term.pitfalls_en.trim();
    }
    if (
      term.pitfalls &&
      term.pitfalls.trim() &&
      !containsVietnameseChars(term.pitfalls)
    ) {
      return term.pitfalls.trim();
    }
    return undefined;
  }
  return term.pitfalls || undefined;
}

/**
 * Lấy tranh luận học thuật theo ngôn ngữ
 */
export function getTermDebates(term: MethodologyTerm, lang: "vi" | "en"): string | undefined {
  if (lang === "en") {
    const mono = MONOLINGUAL_TERMS_EN[term.id];
    if (mono?.paradigm_debates) return mono.paradigm_debates;
    if (
      term.paradigm_debates_en &&
      term.paradigm_debates_en.trim() &&
      !containsVietnameseChars(term.paradigm_debates_en)
    ) {
      return term.paradigm_debates_en.trim();
    }
    if (
      term.paradigm_debates &&
      term.paradigm_debates.trim() &&
      !containsVietnameseChars(term.paradigm_debates)
    ) {
      return term.paradigm_debates.trim();
    }
    return undefined;
  }
  return term.paradigm_debates || undefined;
}

/**
 * Lấy domain tags theo ngôn ngữ (Đảm bảo 100% tiếng Anh khi ở chế độ EN)
 */
export function getTermDomainTags(term: MethodologyTerm, lang: "vi" | "en"): string[] {
  const baseTags = term.category
    ? [term.category, ...term.domain_tags.filter((t) => t !== term.category && t !== "Acronym NCKH")]
    : term.domain_tags;
  if (lang === "en") {
    const mono = MONOLINGUAL_TERMS_EN[term.id];
    if (mono?.domain_tags && mono.domain_tags.length > 0) return mono.domain_tags;
    if (
      term.domain_tags_en &&
      term.domain_tags_en.length > 0 &&
      !term.domain_tags_en.some((t) => containsVietnameseChars(t))
    ) {
      return term.domain_tags_en;
    }
    const translated = baseTags
      .map((tag) => DOMAIN_TRANSLATIONS[tag] || (!containsVietnameseChars(tag) ? tag : ""))
      .filter(Boolean);
    return translated.length > 0 ? translated : ["Research Methodology"];
  }
  return baseTags;
}

/**
 * Lấy mục đích từ viết tắt theo ngôn ngữ
 */
export function getAcronymPurpose(
  acronym: AcademicAcronym & { key?: string },
  lang: "vi" | "en",
  acronymKey?: string
): string {
  if (lang === "en") {
    const resolvedKey =
      acronymKey ||
      acronym.key ||
      Object.keys(MONOLINGUAL_ACRONYMS_EN).find(
        (k) => MONOLINGUAL_ACRONYMS_EN[k].full_name.toLowerCase() === acronym.full_name.toLowerCase()
      );
    if (
      resolvedKey &&
      MONOLINGUAL_ACRONYMS_EN[resolvedKey]?.purpose &&
      !isGenericPlaceholderEn(MONOLINGUAL_ACRONYMS_EN[resolvedKey].purpose)
    ) {
      return MONOLINGUAL_ACRONYMS_EN[resolvedKey].purpose;
    }
    if (
      acronym.purpose_en &&
      acronym.purpose_en.trim() &&
      !isGenericPlaceholderEn(acronym.purpose_en) &&
      !containsVietnameseChars(acronym.purpose_en)
    ) {
      return acronym.purpose_en.trim();
    }
    if (resolvedKey && MONOLINGUAL_ACRONYMS_EN[resolvedKey]?.purpose) {
      return MONOLINGUAL_ACRONYMS_EN[resolvedKey].purpose;
    }
    return `Academic acronym representing ${acronym.full_name}, widely referenced in quantitative, psychometric, or methodological research literature.`;
  }
  return acronym.purpose;
}

/**
 * Lấy ngưỡng từ viết tắt theo ngôn ngữ
 */
export function getAcronymBenchmark(
  acronym: AcademicAcronym & { key?: string },
  lang: "vi" | "en",
  acronymKey?: string
): string | undefined {
  if (lang === "en") {
    const resolvedKey =
      acronymKey ||
      acronym.key ||
      Object.keys(MONOLINGUAL_ACRONYMS_EN).find(
        (k) => MONOLINGUAL_ACRONYMS_EN[k].full_name.toLowerCase() === acronym.full_name.toLowerCase()
      );
    if (
      resolvedKey &&
      MONOLINGUAL_ACRONYMS_EN[resolvedKey]?.benchmark &&
      !containsVietnameseChars(MONOLINGUAL_ACRONYMS_EN[resolvedKey].benchmark)
    ) {
      return MONOLINGUAL_ACRONYMS_EN[resolvedKey].benchmark;
    }
    if (
      acronym.benchmark_en &&
      acronym.benchmark_en.trim() &&
      !containsVietnameseChars(acronym.benchmark_en)
    ) {
      return acronym.benchmark_en.trim();
    }
    return undefined;
  }
  return acronym.benchmark;
}

/**
 * Lấy domain từ viết tắt theo ngôn ngữ
 */
export function getAcronymDomain(
  acronym: AcademicAcronym & { key?: string },
  lang: "vi" | "en",
  acronymKey?: string
): string {
  if (lang === "en") {
    const resolvedKey =
      acronymKey ||
      acronym.key ||
      Object.keys(MONOLINGUAL_ACRONYMS_EN).find(
        (k) => MONOLINGUAL_ACRONYMS_EN[k].full_name.toLowerCase() === acronym.full_name.toLowerCase()
      );
    if (resolvedKey && MONOLINGUAL_ACRONYMS_EN[resolvedKey]?.domain) {
      return MONOLINGUAL_ACRONYMS_EN[resolvedKey].domain!;
    }
    return acronym.domain_en || "Academic Acronym";
  }
  return acronym.domain || "Từ viết tắt";
}
