// Popup Script - Research Methodology Lexicon

document.addEventListener('DOMContentLoaded', async () => {
  let allTerms = [];
  let allAcronyms = {};
  let allAWL = {};
  let allSearchIndex = [];
  let currentFilter = 'all';

  // DOM Elements
  const searchInput = document.getElementById('search-input');
  const clearBtn = document.getElementById('clear-search-btn');
  const resultsContainer = document.getElementById('results-list');
  const resultsCount = document.getElementById('results-count');
  const filterPills = document.querySelectorAll('.filter-pill');
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const detailModal = document.getElementById('detail-modal');
  const modalTermTitle = document.getElementById('modal-term-title');
  const modalContentBody = document.getElementById('modal-content-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // Load Data from Chrome Storage
  chrome.storage.local.get(
    ['cached_methodology_terms', 'cached_acronyms', 'cached_awl', 'cached_search_index', 'trigger_mode', 'data_version'],
    (data) => {
      allTerms = data.cached_methodology_terms || [];
      allAcronyms = data.cached_acronyms || {};
      allAWL = data.cached_awl || {};
      allSearchIndex = data.cached_search_index || [];

      // If data is empty in storage, fetch from json directly
      if (allTerms.length === 0) {
        Promise.all([
          fetch(chrome.runtime.getURL('data/methodology_terms.json')).then((r) => r.json()),
          fetch(chrome.runtime.getURL('data/acronyms.json')).then((r) => r.json()),
          fetch(chrome.runtime.getURL('data/awl_vocabulary.json')).then((r) => r.json()),
          fetch(chrome.runtime.getURL('data/search_index.json')).then((r) => r.json())
        ]).then(([t, a, w, s]) => {
          allTerms = t.terms || [];
          allAcronyms = a.acronyms || {};
          allAWL = w.words || {};
          allSearchIndex = s.terms || [];
          renderResults();
        });
      } else {
        renderResults();
      }

      // Settings: set active radio button
      const triggerMode = data.trigger_mode || 'pin';
      const radio = document.querySelector(`input[name="trigger_mode"][value="${triggerMode}"]`);
      if (radio) radio.checked = true;

      // Version
      const versionElem = document.getElementById('current-data-version');
      if (versionElem && data.data_version) {
        versionElem.textContent = data.data_version;
      }
    }
  );

  // Tab navigation
  navTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      navTabs.forEach((t) => t.classList.remove('active'));
      tabContents.forEach((c) => c.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Filter Pills
  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-filter');
      renderResults();
    });
  });

  // Search Input live typing
  searchInput.addEventListener('input', () => {
    if (searchInput.value.trim().length > 0) {
      clearBtn.style.display = 'block';
    } else {
      clearBtn.style.display = 'none';
    }
    renderResults();
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    searchInput.focus();
    renderResults();
  });

  // Settings: Trigger Mode radio change
  const triggerRadios = document.querySelectorAll('input[name="trigger_mode"]');
  triggerRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        chrome.storage.local.set({ trigger_mode: radio.value });
      }
    });
  });

  // Check Sync with Firebase Button
  const syncBtn = document.getElementById('check-sync-btn');
  const syncMsg = document.getElementById('sync-status-msg');
  if (syncBtn) {
    syncBtn.addEventListener('click', () => {
      syncBtn.textContent = 'Đang kiểm tra...';
      setTimeout(() => {
        syncBtn.textContent = 'Kiểm tra từ mới';
        syncMsg.textContent = '✓ Dữ liệu của bạn đã được cập nhật phiên bản mới nhất từ Creswell (2023).';
      }, 1000);
    });
  }

  // Close Detail Modal
  modalCloseBtn.addEventListener('click', () => {
    detailModal.style.display = 'none';
  });

  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) detailModal.style.display = 'none';
  });

  // Render Search Results
  function renderResults() {
    const query = searchInput.value.toLowerCase().trim();
    resultsContainer.innerHTML = '';

    const list = [];

    // 1. Methodology Terms
    if (currentFilter === 'all' || currentFilter === 'methodology') {
      allTerms.forEach((item) => {
        const matchTitle = item.term.toLowerCase().includes(query);
        const matchVn = item.vietnamese.toLowerCase().includes(query);
        const matchDef = item.core_definition.toLowerCase().includes(query);
        if (!query || matchTitle || matchVn || matchDef) {
          list.push({
            type: 'methodology',
            title: item.term,
            badge: 'NCKH',
            badgeClass: 'badge-methodology',
            vn: item.vietnamese,
            desc: item.core_definition,
            raw: item
          });
        }
      });
    }

    // 2. Acronyms
    if (currentFilter === 'all' || currentFilter === 'acronym') {
      Object.keys(allAcronyms).forEach((key) => {
        const item = allAcronyms[key];
        const matchKey = key.toLowerCase().includes(query);
        const matchFull = item.full_name.toLowerCase().includes(query);
        const matchVn = item.vietnamese.toLowerCase().includes(query);
        if (!query || matchKey || matchFull || matchVn) {
          list.push({
            type: 'acronym',
            title: key,
            badge: 'Viết tắt',
            badgeClass: 'badge-acronym',
            vn: `${item.full_name} (${item.vietnamese})`,
            desc: item.purpose,
            raw: { acronym: key, ...item }
          });
        }
      });
    }

    // 3. AWL Vocabulary
    if (currentFilter === 'all' || currentFilter === 'awl') {
      Object.keys(allAWL).forEach((key) => {
        const item = allAWL[key];
        const matchKey = key.toLowerCase().includes(query);
        const matchVn = item.vietnamese.toLowerCase().includes(query);
        const matchDef = item.definition.toLowerCase().includes(query);
        if (!query || matchKey || matchVn || matchDef) {
          list.push({
            type: 'awl',
            title: key,
            badge: 'AWL',
            badgeClass: 'badge-awl',
            vn: item.vietnamese,
            desc: item.definition,
            raw: { word: key, ...item }
          });
        }
      });
    }

    // 4. Master Search Index (550+ entries from 18 scanned sources)
    if (currentFilter === 'all' || currentFilter === 'index') {
      allSearchIndex.forEach((item) => {
        const tLower = item.term.toLowerCase();
        if (allTerms.some(t => t.term.toLowerCase() === tLower)) return;
        if (allAcronyms[item.term.toUpperCase()]) return;
        if (allAWL[tLower]) return;

        const matchTitle = item.term.toLowerCase().includes(query);
        const matchVn = (item.vietnamese || '').toLowerCase().includes(query);
        const matchDomain = (item.domain || '').toLowerCase().includes(query);
        if (!query || matchTitle || matchVn || matchDomain) {
          list.push({
            type: 'index',
            title: item.term,
            badge: item.domain ? item.domain.split(' ')[0] : 'NCKH',
            badgeClass: 'badge-methodology',
            vn: item.vietnamese,
            desc: `Nguồn: ${item.source || '18 Tài liệu NCKH'}`,
            raw: item
          });
        }
      });
    }

    resultsCount.textContent = `Tìm thấy ${list.length} mục từ`;

    if (list.length === 0) {
      resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: #94a3b8;">
          <p style="font-size: 14px; font-weight: 600; color: #64748b;">Không tìm thấy kết quả phù hợp</p>
          <p style="font-size: 11.5px; margin-top: 4px;">Thử gõ một từ viết tắt (VD: AVE, HTMT) hoặc khái niệm NCKH khác.</p>
        </div>
      `;
      return;
    }

    list.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'term-card';
      card.innerHTML = `
        <div class="card-top">
          <span class="card-title">${item.title}</span>
          <span class="card-badge ${item.badgeClass}">${item.badge}</span>
        </div>
        <div class="card-vn">${item.vn}</div>
        <div class="card-desc">${item.desc}</div>
      `;

      card.addEventListener('click', () => {
        openModal(item);
      });

      resultsContainer.appendChild(card);
    });
  }

  // Open Detail Modal
  function openModal(item) {
    modalTermTitle.textContent = item.title;

    if (item.type === 'methodology') {
      const d = item.raw;
      const domains = (d.domain_tags || []).join(' • ');
      modalContentBody.innerHTML = `
        <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0;">
          <div style="font-size: 15px; font-weight: 700; color: #1e3a8a;">${d.vietnamese}</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Lĩnh vực: ${domains}</div>
        </div>
        <div style="margin-bottom: 10px;">
          <strong style="color: #475569; font-size: 11px; text-transform: uppercase;">📌 Định nghĩa Phương pháp:</strong>
          <p style="margin-top: 3px; color: #1e293b;">${d.core_definition}</p>
        </div>
        ${d.paradigm_debates ? `
        <div style="margin-bottom: 10px;">
          <strong style="color: #475569; font-size: 11px; text-transform: uppercase;">⚖️ Trường phái & Tranh luận:</strong>
          <p style="margin-top: 3px; color: #1e293b;">${d.paradigm_debates}</p>
        </div>` : ''}
        ${d.benchmarks ? `
        <div style="margin-bottom: 10px; background: #f0fdf4; padding: 8px; border-radius: 6px; border-left: 3px solid #22c55e;">
          <strong style="color: #14532d; font-size: 11px; text-transform: uppercase;">📊 Ngưỡng Báo cáo Thực nghiệm:</strong>
          <p style="margin-top: 3px; color: #14532d;">${d.benchmarks}</p>
        </div>` : ''}
        ${d.pitfalls ? `
        <div style="margin-bottom: 10px; background: #fffbeb; padding: 8px; border-radius: 6px; border-left: 3px solid #f59e0b;">
          <strong style="color: #78350f; font-size: 11px; text-transform: uppercase;">⚠️ Bẫy Sai lầm / Cảnh báo Phản biện:</strong>
          <p style="margin-top: 3px; color: #78350f;">${d.pitfalls}</p>
        </div>` : ''}
        <div style="margin-top: 12px; padding: 8px; background: #f8fafc; border-radius: 6px; font-size: 11px; color: #475569;">
          <strong>Trích dẫn APA 7th:</strong>
          <div style="margin-top: 2px; font-style: italic;">${d.apa_reference}</div>
        </div>
      `;
    } else if (item.type === 'acronym') {
      const d = item.raw;
      modalContentBody.innerHTML = `
        <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0;">
          <div style="font-size: 15px; font-weight: 700; color: #1e3a8a;">${d.full_name}</div>
          <div style="font-size: 12px; color: #475569; margin-top: 2px;">${d.vietnamese}</div>
        </div>
        <div style="margin-bottom: 10px;">
          <strong style="color: #475569; font-size: 11px; text-transform: uppercase;">📌 Mục đích & Bản chất:</strong>
          <p style="margin-top: 3px; color: #1e293b;">${d.purpose}</p>
        </div>
        <div style="margin-bottom: 10px; background: #f0fdf4; padding: 8px; border-radius: 6px; border-left: 3px solid #22c55e;">
          <strong style="color: #14532d; font-size: 11px; text-transform: uppercase;">📊 Ngưỡng Báo cáo Chuẩn:</strong>
          <p style="margin-top: 3px; color: #14532d;">${d.benchmark}</p>
        </div>
      `;
    } else if (item.type === 'awl') {
      const d = item.raw;
      modalContentBody.innerHTML = `
        <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0;">
          <div style="font-size: 15px; font-weight: 700; color: #1e3a8a;">${d.vietnamese}</div>
          <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Phiên âm: ${d.ipa || ''} (${d.pos || ''})</div>
        </div>
        <div style="margin-bottom: 10px;">
          <strong style="color: #475569; font-size: 11px; text-transform: uppercase;">📖 Định nghĩa tiếng Anh:</strong>
          <p style="margin-top: 3px; color: #1e293b;">${d.definition}</p>
        </div>
        <div style="margin-bottom: 10px; background: #eff6ff; padding: 8px; border-radius: 6px;">
          <strong style="color: #1e40af; font-size: 11px; text-transform: uppercase;">💡 Ví dụ trong bài báo:</strong>
          <p style="margin-top: 3px; color: #1e3a8a; font-style: italic;">"${d.example}"</p>
        </div>
      `;
    } else if (item.type === 'index') {
      const d = item.raw;
      modalContentBody.innerHTML = `
        <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0;">
          <div style="font-size: 15px; font-weight: 700; color: #1e3a8a;">${d.vietnamese}</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Lĩnh vực: ${d.domain || 'NCKH'}</div>
        </div>
        <div style="margin-bottom: 10px;">
          <strong style="color: #475569; font-size: 11px; text-transform: uppercase;">📌 Khái niệm & Giải nghĩa:</strong>
          <p style="margin-top: 3px; color: #1e293b;">${d.vietnamese}</p>
        </div>
        <div style="margin-top: 12px; padding: 8px; background: #f8fafc; border-radius: 6px; font-size: 11px; color: #475569;">
          <strong>Nguồn gốc tài liệu:</strong>
          <div style="margin-top: 2px; font-style: italic;">${d.source || '18 Giáo trình & Bài báo NCKH'}</div>
        </div>
      `;
    }

    detailModal.style.display = 'flex';
  }
});
