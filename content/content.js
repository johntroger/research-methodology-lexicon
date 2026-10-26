// Content Script for Research Methodology Lexicon
// Features: Shadow DOM isolation, PDF Normalizer, Multi-tier Router, Audio & APA 7th Copy

(function () {
  'use strict';

  // Prevent double injection
  if (window.__RESEARCH_LEXICON_LOADED__) return;
  window.__RESEARCH_LEXICON_LOADED__ = true;

  // Local storage cached data
  let cachedTerms = [];
  let cachedAcronyms = {};
  let cachedAWL = {};
  let cachedSearchIndex = [];
  let userSettings = {
    trigger_mode: 'pin',
    font_size: 'normal'
  };

  // Shadow DOM host
  let hostElement = null;
  let shadowRoot = null;
  let activePin = null;
  let activeCard = null;
  let currentSelectionText = '';
  let pinDismissTimer = null;

  // Initialize data from extension storage
  function loadData() {
    chrome.storage.local.get(
      ['cached_methodology_terms', 'cached_acronyms', 'cached_awl', 'cached_search_index', 'trigger_mode'],
      (res) => {
        if (res.cached_methodology_terms) cachedTerms = res.cached_methodology_terms;
        if (res.cached_acronyms) cachedAcronyms = res.cached_acronyms;
        if (res.cached_awl) cachedAWL = res.cached_awl;
        if (res.cached_search_index) cachedSearchIndex = res.cached_search_index;
        if (res.trigger_mode) userSettings.trigger_mode = res.trigger_mode;
      }
    );
  }

  loadData();

  // Listen for storage changes in real-time
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.cached_methodology_terms) cachedTerms = changes.cached_methodology_terms.newValue || [];
    if (changes.cached_acronyms) cachedAcronyms = changes.cached_acronyms.newValue || {};
    if (changes.cached_awl) cachedAWL = changes.cached_awl.newValue || {};
    if (changes.cached_search_index) cachedSearchIndex = changes.cached_search_index.newValue || [];
    if (changes.trigger_mode) userSettings.trigger_mode = changes.trigger_mode.newValue;
  });
    if (changes.cached_acronyms) cachedAcronyms = changes.cached_acronyms.newValue || {};
    if (changes.cached_awl) cachedAWL = changes.cached_awl.newValue || {};
    if (changes.trigger_mode) userSettings.trigger_mode = changes.trigger_mode.newValue;
  });

  // Ensure Shadow DOM host is present
  function ensureShadowDOM() {
    if (!hostElement) {
      hostElement = document.createElement('div');
      hostElement.id = 'research-lexicon-host';
      shadowRoot = hostElement.attachShadow({ mode: 'open' });

      // Inject content CSS inside Shadow Root
      const styleLink = document.createElement('link');
      styleLink.rel = 'stylesheet';
      styleLink.href = chrome.runtime.getURL('content/content.css');
      shadowRoot.appendChild(styleLink);

      document.documentElement.appendChild(hostElement);
    }
  }

  // PDF & Text Ligature Normalizer
  function normalizeText(raw) {
    if (!raw) return '';
    let text = raw;

    // 1. Khôi phục ligatures PDF hay gặp
    text = text.replace(/ﬁ/g, 'fi')
               .replace(/ﬂ/g, 'fl')
               .replace(/ﬀ/g, 'ff')
               .replace(/ﬃ/g, 'ffi')
               .replace(/ﬄ/g, 'ffl');

    // 2. Khử dấu ngắt dòng gạch nối ở cuối dòng (multi-\ncollinearity -> multicollinearity)
    text = text.replace(/(\w+)-\s*[\r\n]+\s*(\w+)/g, '$1$2');

    // 3. Chuẩn hóa khoảng trắng và ngắt dòng
    text = text.replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();

    // 4. Loại bỏ các dấu câu bao quanh
    text = text.replace(/^["'“‘(\[{<]+|["'”’)\]}>.,;:?!]+$/g, '').trim();

    return text;
  }

  // Clear pin and card
  function dismissAll() {
    if (pinDismissTimer) {
      clearTimeout(pinDismissTimer);
      pinDismissTimer = null;
    }
    if (activePin) {
      activePin.remove();
      activePin = null;
    }
    if (activeCard) {
      activeCard.remove();
      activeCard = null;
    }
  }

  // Selection detection
  document.addEventListener('mouseup', (e) => {
    // If clicked inside our host, do nothing
    if (hostElement && hostElement.contains(e.target)) return;

    // Check selection
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      // If clicking outside, dismiss
      dismissAll();
      return;
    }

    const rawSelected = selection.toString();
    const cleanText = normalizeText(rawSelected);

    if (!cleanText || cleanText.length < 2) {
      dismissAll();
      return;
    }

    currentSelectionText = cleanText;

    // Check trigger mode
    if (userSettings.trigger_mode === 'alt' && !e.altKey) {
      return;
    }

    // Get selection coordinates
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (!rect || (rect.width === 0 && rect.height === 0)) return;

    // Calculate position taking window scroll into account
    const scrollX = window.scrollX || window.pageXOffset || 0;
    const scrollY = window.scrollY || window.pageYOffset || 0;

    const posX = rect.right + scrollX + 4;
    const posY = rect.top + scrollY - 14;

    ensureShadowDOM();

    if (userSettings.trigger_mode === 'auto' || (userSettings.trigger_mode === 'alt' && e.altKey)) {
      showLexiconCard(cleanText, posX, posY);
    } else {
      // Mode 'pin': Show floating trigger button
      showPinButton(cleanText, posX, posY);
    }
  });

  // Handle escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') dismissAll();
  });

  // Show floating Pin Button
  function showPinButton(text, x, y) {
    dismissAll();

    const pin = document.createElement('div');
    pin.className = 'lexicon-pin-btn';
    pin.title = `Tra cứu thuật ngữ: "${text}"`;
    pin.style.left = `${x}px`;
    pin.style.top = `${y}px`;

    // Graduation cap icon
    pin.innerHTML = `
      <svg viewBox="0 0 24 24">
        <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18C5 19.5 8.13 21.36 12 21.36C15.87 21.36 19 19.5 19 17.18V13.18L12 17L5 13.18Z"/>
      </svg>
    `;

    pin.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      e.preventDefault();
      showLexiconCard(text, x, y);
    });

    shadowRoot.appendChild(pin);
    activePin = pin;

    // Auto dismiss pin after 4.5 seconds if untouched
    pinDismissTimer = setTimeout(() => {
      if (activePin === pin) {
        pin.remove();
        activePin = null;
      }
    }, 4500);
  }

  // Lookup data in multiple tiers
  function lookup(query) {
    const qLower = query.toLowerCase();
    const qUpper = query.toUpperCase();

    // Tier 1: Acronyms (PLS-SEM, AVE, HTMT, VIF, CMB...)
    if (cachedAcronyms[qUpper]) {
      return { type: 'acronym', data: { acronym: qUpper, ...cachedAcronyms[qUpper] } };
    }

    // Tier 2: Methodology Terms (Core Creswell / OECD / Hair)
    const exactTerm = cachedTerms.find(
      (t) => t.term.toLowerCase() === qLower || t.id === qLower || (t.vietnamese && t.vietnamese.toLowerCase() === qLower)
    );
    if (exactTerm) {
      return { type: 'methodology', data: exactTerm };
    }

    // Partial / Stem search in methodology terms
    const partialTerm = cachedTerms.find((t) => {
      const termLower = t.term.toLowerCase();
      return termLower.includes(qLower) || qLower.includes(termLower);
    });
    if (partialTerm && Math.abs(partialTerm.term.length - qLower.length) <= 5) {
      return { type: 'methodology', data: partialTerm };
    }

    // Tier 3: Academic Word List (AWL)
    if (cachedAWL[qLower]) {
      return { type: 'awl', data: { word: query, ...cachedAWL[qLower] } };
    }

    // Tier 3b: Master Search Index (550+ terms from all 18 scanned methodology works)
    const indexMatch = cachedSearchIndex.find(
      (t) => t.term.toLowerCase() === qLower || (t.vietnamese && t.vietnamese.toLowerCase().includes(qLower))
    );
    if (indexMatch) {
      return { type: 'search_index', data: indexMatch };
    }

    // Tier 4: Sentence / Clause (> 4 words) -> Sentence Translation
    if (query.split(/\s+/).length >= 5) {
      return { type: 'sentence', data: { original: query } };
    }

    // Default: Fallback
    return {
      type: 'fallback',
      data: {
        query: query,
        message: 'Khái niệm này chưa có trong bộ dữ liệu hạt nhân. Bạn có thể tra nhanh bản dịch bên dưới.'
      }
    };
  }

  // Render & show Lexicon Card
  function showLexiconCard(text, x, y) {
    dismissAll();

    const result = lookup(text);
    const card = document.createElement('div');
    card.className = 'lexicon-card';

    // Prevent clicks inside card from closing it
    card.addEventListener('mousedown', (e) => e.stopPropagation());

    // Generate HTML based on result type
    card.innerHTML = buildCardHTML(result, text);

    shadowRoot.appendChild(card);
    activeCard = card;

    // Attach interactive buttons inside card
    attachCardListeners(card, result, text);

    // Adjust position so it doesn't overflow screen
    const cardRect = card.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let finalLeft = x;
    let finalTop = y + 20;

    // Right overflow check
    if (finalLeft + cardRect.width > viewportWidth - 20) {
      finalLeft = Math.max(10, viewportWidth - cardRect.width - 20);
    }

    // Bottom overflow check -> flip above if near bottom
    if (finalTop + cardRect.height > window.scrollY + viewportHeight - 20) {
      finalTop = Math.max(10, y - cardRect.height - 10);
    }

    card.style.left = `${finalLeft}px`;
    card.style.top = `${finalTop}px`;
  }

  // Build Card HTML
  function buildCardHTML(result, queryText) {
    if (result.type === 'acronym') {
      const d = result.data;
      return `
        <div class="lexicon-header">
          <div class="lexicon-header-main">
            <div class="lexicon-badge-row">
              <span class="lexicon-badge badge-acronym">Từ viết tắt NCKH</span>
            </div>
            <div class="lexicon-term-row">
              <h3 class="lexicon-term-title">${d.acronym}</h3>
              <button class="lexicon-audio-btn" data-pronounce="${d.full_name}" title="Phát âm tiếng Anh">
                <svg viewBox="0 0 24 24"><path d="M14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23M16.5 12C16.5 10.23 15.5 8.71 14 7.97V16.03C15.5 15.29 16.5 13.77 16.5 12M3 9V15H7L12 20V4L7 9H3Z"/></svg>
              </button>
            </div>
          </div>
          <button class="lexicon-close-btn" title="Đóng">
            <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/></svg>
          </button>
        </div>
        <div class="lexicon-vn-banner">
          <span class="lexicon-vn-primary">${d.vietnamese}</span>
          <div class="lexicon-vn-variants">${d.full_name}</div>
        </div>
        <div class="lexicon-body">
          <div class="lexicon-section">
            <span class="lexicon-section-title">📌 Mục đích & Bản chất:</span>
            <div class="lexicon-section-desc">${d.purpose}</div>
          </div>
          <div class="lexicon-section">
            <span class="lexicon-section-title">📊 Ngưỡng báo cáo chuẩn:</span>
            <div class="lexicon-section-desc box-highlight box-benchmarks">${d.benchmark}</div>
          </div>
        </div>
        <div class="lexicon-footer">
          <span class="lexicon-source-tag">Nguồn: Chuẩn Scopus / Hair et al.</span>
          <button class="lexicon-copy-btn" data-copy="${d.acronym} - ${d.full_name}: ${d.vietnamese}">
            <svg viewBox="0 0 24 24"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/></svg>
            Sao chép
          </button>
        </div>
      `;
    }

    if (result.type === 'methodology') {
      const d = result.data;
      const domainTagsHTML = (d.domain_tags || []).map((t) => `<span class="lexicon-domain-tag">${t}</span>`).join(' ');
      const variantsText = (d.vietnamese_variants || []).join(' • ');

      return `
        <div class="lexicon-header">
          <div class="lexicon-header-main">
            <div class="lexicon-badge-row">
              <span class="lexicon-badge badge-methodology">Thuật ngữ NCKH</span>
              ${domainTagsHTML}
            </div>
            <div class="lexicon-term-row">
              <h3 class="lexicon-term-title">${d.term}</h3>
              <span class="lexicon-ipa">${d.ipa || ''}</span>
              <button class="lexicon-audio-btn" data-pronounce="${d.term}" title="Phát âm">
                <svg viewBox="0 0 24 24"><path d="M14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23M16.5 12C16.5 10.23 15.5 8.71 14 7.97V16.03C15.5 15.29 16.5 13.77 16.5 12M3 9V15H7L12 20V4L7 9H3Z"/></svg>
              </button>
            </div>
          </div>
          <button class="lexicon-close-btn" title="Đóng">
            <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/></svg>
          </button>
        </div>
        <div class="lexicon-vn-banner">
          <span class="lexicon-vn-primary">${d.vietnamese}</span>
          ${variantsText ? `<div class="lexicon-vn-variants">Biến thể dịch tại VN: ${variantsText}</div>` : ''}
        </div>
        <div class="lexicon-body">
          <div class="lexicon-section">
            <span class="lexicon-section-title">📌 Định nghĩa Phương pháp luận:</span>
            <div class="lexicon-section-desc">${d.core_definition}</div>
          </div>
          ${
            d.paradigm_debates
              ? `<div class="lexicon-section">
                   <span class="lexicon-section-title">⚖️ Trường phái & Tranh luận:</span>
                   <div class="lexicon-section-desc">${d.paradigm_debates}</div>
                 </div>`
              : ''
          }
          ${
            d.benchmarks
              ? `<div class="lexicon-section">
                   <span class="lexicon-section-title">📊 Ngưỡng báo cáo trong bài báo:</span>
                   <div class="lexicon-section-desc box-highlight box-benchmarks">${d.benchmarks}</div>
                 </div>`
              : ''
          }
          ${
            d.pitfalls
              ? `<div class="lexicon-section">
                   <span class="lexicon-section-title">⚠️ Cảnh báo phản biện / Bẫy sai lầm:</span>
                   <div class="lexicon-section-desc box-highlight box-pitfalls">${d.pitfalls}</div>
                 </div>`
              : ''
          }
        </div>
        <div class="lexicon-footer">
          <span class="lexicon-source-tag" title="${d.apa_reference}">Nguồn: Creswell (2023)</span>
          <button class="lexicon-copy-btn" data-copy-apa="${d.apa_reference}" title="Sao chép trích dẫn APA 7th">
            <svg viewBox="0 0 24 24"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/></svg>
            Copy APA 7th
          </button>
        </div>
      `;
    }

    if (result.type === 'awl') {
      const d = result.data;
      return `
        <div class="lexicon-header">
          <div class="lexicon-header-main">
            <div class="lexicon-badge-row">
              <span class="lexicon-badge badge-awl">Từ vựng Học thuật AWL</span>
              <span class="lexicon-domain-tag">${d.pos || ''}</span>
            </div>
            <div class="lexicon-term-row">
              <h3 class="lexicon-term-title">${d.word}</h3>
              <span class="lexicon-ipa">${d.ipa || ''}</span>
              <button class="lexicon-audio-btn" data-pronounce="${d.word}" title="Phát âm">
                <svg viewBox="0 0 24 24"><path d="M14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23M16.5 12C16.5 10.23 15.5 8.71 14 7.97V16.03C15.5 15.29 16.5 13.77 16.5 12M3 9V15H7L12 20V4L7 9H3Z"/></svg>
              </button>
            </div>
          </div>
          <button class="lexicon-close-btn" title="Đóng">
            <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/></svg>
          </button>
        </div>
        <div class="lexicon-vn-banner">
          <span class="lexicon-vn-primary">${d.vietnamese}</span>
        </div>
        <div class="lexicon-body">
          <div class="lexicon-section">
            <span class="lexicon-section-title">📖 Giải nghĩa tiếng Anh:</span>
            <div class="lexicon-section-desc">${d.definition}</div>
          </div>
          <div class="lexicon-section">
            <span class="lexicon-section-title">💡 Ví dụ trong bài báo học thuật:</span>
            <div class="lexicon-section-desc" style="font-style: italic; color: #1e3a8a;">"${d.example}"</div>
          </div>
        </div>
        <div class="lexicon-footer">
          <span class="lexicon-source-tag">Academic Word List (Coxhead)</span>
          <button class="lexicon-copy-btn" data-copy="${d.word}: ${d.vietnamese}">
            <svg viewBox="0 0 24 24"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/></svg>
            Sao chép
          </button>
        </div>
      `;
    }

    if (result.type === 'search_index') {
      const d = result.data;
      return `
        <div class="lexicon-header">
          <div class="lexicon-header-main">
            <div class="lexicon-badge-row">
              <span class="lexicon-badge badge-methodology">Thuật ngữ NCKH</span>
              <span class="lexicon-domain-tag">${d.domain || 'Methodology'}</span>
            </div>
            <div class="lexicon-term-row">
              <h3 class="lexicon-term-title">${d.term}</h3>
              <button class="lexicon-audio-btn" data-pronounce="${d.term}" title="Phát âm tiếng Anh">
                <svg viewBox="0 0 24 24"><path d="M14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23M16.5 12C16.5 10.23 15.5 8.71 14 7.97V16.03C15.5 15.29 16.5 13.77 16.5 12M3 9V15H7L12 20V4L7 9H3Z"/></svg>
              </button>
            </div>
          </div>
          <button class="lexicon-close-btn" title="Đóng">
            <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/></svg>
          </button>
        </div>
        <div class="lexicon-vn-banner">
          <span class="lexicon-vn-primary">${d.vietnamese}</span>
        </div>
        <div class="lexicon-footer">
          <span class="lexicon-source-tag">${d.source ? ('Nguồn: ' + d.source) : 'Nguồn: 18 Tài liệu NCKH'}</span>
          <button class="lexicon-copy-btn" data-copy="${d.term}: ${d.vietnamese}">
            <svg viewBox="0 0 24 24"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/></svg>
            Sao chép
          </button>
        </div>
      `;
    }

    if (result.type === 'sentence') {
      return `
        <div class="lexicon-header">
          <div class="lexicon-header-main">
            <div class="lexicon-badge-row">
              <span class="lexicon-badge badge-translation">Dịch đoạn văn</span>
            </div>
            <h3 class="lexicon-term-title" style="font-size: 14px;">Bản dịch ngữ cảnh</h3>
          </div>
          <button class="lexicon-close-btn" title="Đóng">
            <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/></svg>
          </button>
        </div>
        <div class="lexicon-body">
          <div class="lexicon-section">
            <span class="lexicon-section-title">Đoạn văn gốc:</span>
            <div class="lexicon-section-desc" style="font-style: italic; color: #64748b;">"${queryText}"</div>
          </div>
          <div class="lexicon-section">
            <span class="lexicon-section-title">Bản dịch tiếng Việt:</span>
            <div id="lexicon-sentence-translation-result" class="lexicon-section-desc" style="color: #1e3a8a; font-weight: 500;">
              Đang dịch văn bản...
            </div>
          </div>
        </div>
        <div class="lexicon-footer">
          <span class="lexicon-source-tag">Google Cloud Translation</span>
          <button class="lexicon-copy-btn" id="lexicon-copy-sentence-btn">
            <svg viewBox="0 0 24 24"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/></svg>
            Sao chép bản dịch
          </button>
        </div>
      `;
    }

    // Fallback card
    return `
      <div class="lexicon-header">
        <div class="lexicon-header-main">
          <div class="lexicon-badge-row">
            <span class="lexicon-badge badge-translation">Tra cứu nhanh</span>
          </div>
          <div class="lexicon-term-row">
            <h3 class="lexicon-term-title">${queryText}</h3>
            <button class="lexicon-audio-btn" data-pronounce="${queryText}" title="Phát âm">
              <svg viewBox="0 0 24 24"><path d="M14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23M16.5 12C16.5 10.23 15.5 8.71 14 7.97V16.03C15.5 15.29 16.5 13.77 16.5 12M3 9V15H7L12 20V4L7 9H3Z"/></svg>
            </button>
          </div>
        </div>
        <button class="lexicon-close-btn" title="Đóng">
          <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/></svg>
        </button>
      </div>
      <div class="lexicon-body">
        <div class="lexicon-section">
          <span class="lexicon-section-title">Bản dịch tiếng Việt:</span>
          <div id="lexicon-fallback-translation" class="lexicon-section-desc" style="color: #1e3a8a; font-weight: 500;">
            Đang tra cứu từ điển...
          </div>
        </div>
      </div>
      <div class="lexicon-footer">
        <span class="lexicon-source-tag">Tra cứu từ điển</span>
        <button class="lexicon-copy-btn" id="lexicon-copy-fallback-btn">Sao chép</button>
      </div>
    `;
  }

  // Attach interactive listeners inside Card
  function attachCardListeners(card, result, queryText) {
    // Close button
    const closeBtn = card.querySelector('.lexicon-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', dismissAll);
    }

    // Audio pronunciation
    const audioBtns = card.querySelectorAll('.lexicon-audio-btn');
    audioBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const textToSpeak = btn.getAttribute('data-pronounce') || queryText;
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(textToSpeak);
          utterance.lang = 'en-US';
          utterance.rate = 0.9;
          window.speechSynthesis.speak(utterance);
        }
      });
    });

    // Copy buttons
    const copyBtns = card.querySelectorAll('.lexicon-copy-btn');
    copyBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        let textToCopy = btn.getAttribute('data-copy-apa') || btn.getAttribute('data-copy');
        if (!textToCopy && btn.id === 'lexicon-copy-sentence-btn') {
          const el = card.querySelector('#lexicon-sentence-translation-result');
          if (el) textToCopy = el.textContent;
        }
        if (!textToCopy && btn.id === 'lexicon-copy-fallback-btn') {
          const el = card.querySelector('#lexicon-fallback-translation');
          if (el) textToCopy = el.textContent;
        }

        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy.trim()).then(() => {
            const originalText = btn.innerHTML;
            btn.classList.add('copied');
            btn.innerHTML = `✓ Đã sao chép!`;
            setTimeout(() => {
              btn.classList.remove('copied');
              btn.innerHTML = originalText;
            }, 1800);
          });
        }
      });
    });

    // Fetch sentence translation or fallback translation if needed
    if (result.type === 'sentence' || result.type === 'fallback') {
      const targetElemId = result.type === 'sentence' ? '#lexicon-sentence-translation-result' : '#lexicon-fallback-translation';
      const targetElem = card.querySelector(targetElemId);

      // Call Google Translate public API endpoint
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(queryText)}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data && data[0]) {
            const translated = data[0].map((item) => item[0]).join('');
            if (targetElem) targetElem.textContent = translated;
          }
        })
        .catch(() => {
          if (targetElem) targetElem.textContent = 'Không thể kết nối đến máy chủ dịch thuật.';
        });
    }
  }
})();
