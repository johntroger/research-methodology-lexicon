// Background Service Worker for Research Methodology Lexicon
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('[Research Lexicon] Extension installed/updated:', details.reason);

  // Initialize default user settings if not present
  const defaults = {
    trigger_mode: 'pin', // 'pin' (floating icon), 'auto' (instant popup), 'alt' (hold Alt key)
    show_pronunciation: true,
    font_size: 'normal',
    data_version: '1.0.0',
    last_sync_time: new Date().toISOString()
  };

  chrome.storage.local.get(Object.keys(defaults), async (current) => {
    const toSet = {};
    for (const key of Object.keys(defaults)) {
      if (current[key] === undefined) {
        toSet[key] = defaults[key];
      }
    }
    if (Object.keys(toSet).length > 0) {
      await chrome.storage.local.set(toSet);
    }
  });

  // Preload and cache local dictionaries into storage for ultra-fast access
  try {
    const termsUrl = chrome.runtime.getURL('data/methodology_terms.json');
    const acronymsUrl = chrome.runtime.getURL('data/acronyms.json');
    const awlUrl = chrome.runtime.getURL('data/awl_vocabulary.json');
    const searchIndexUrl = chrome.runtime.getURL('data/search_index.json');

    const [termsRes, acronymsRes, awlRes, searchIndexRes] = await Promise.all([
      fetch(termsUrl),
      fetch(acronymsUrl),
      fetch(awlUrl),
      fetch(searchIndexUrl)
    ]);

    const [termsData, acronymsData, awlData, searchIndexData] = await Promise.all([
      termsRes.json(),
      acronymsRes.json(),
      awlRes.json(),
      searchIndexRes.json()
    ]);

    await chrome.storage.local.set({
      cached_methodology_terms: termsData.terms || [],
      cached_acronyms: acronymsData.acronyms || {},
      cached_awl: awlData.words || {},
      cached_search_index: searchIndexData.terms || []
    });

    console.log('[Research Lexicon] Successfully initialized local dictionary cache.');
  } catch (err) {
    console.error('[Research Lexicon] Error preloading dictionary data:', err);
  }
});
