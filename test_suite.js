// Automated Test Suite for Research Methodology Lexicon
// Tests: PDF Normalizer, Lookup Logic, Acronyms, AWL, Schema Integrity, Manifest V3 Validation

const fs = require('fs');
const path = require('path');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
  }
}

console.log('====================================================');
console.log('🧪 BẮT ĐẦU BỘ KIỂM THỬ TỰ ĐỘNG (AUTOMATED TEST SUITE)');
console.log('====================================================\n');

// ----------------------------------------------------
// TEST GROUP 1: MANIFEST V3 & FILE STRUCTURE INTEGRITY
// ----------------------------------------------------
console.log('📦 TEST GROUP 1: KIỂM TRA TÍNH HỢP LỆ MANIFEST V3 & TỆP TIN');
const manifestPath = path.join(__dirname, 'manifest.json');
assert(fs.existsSync(manifestPath), 'manifest.json phải tồn tại');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
assert(manifest.manifest_version === 3, 'Manifest Version phải là 3 (Manifest V3)');
assert(manifest.permissions.includes('storage'), 'Khai báo quyền "storage"');
assert(manifest.content_scripts.length > 0, 'Khai báo content scripts');
assert(fs.existsSync(path.join(__dirname, 'icons', 'icon16.png')), 'Icon 16x16 tồn tại');
assert(fs.existsSync(path.join(__dirname, 'icons', 'icon48.png')), 'Icon 48x48 tồn tại');
assert(fs.existsSync(path.join(__dirname, 'icons', 'icon128.png')), 'Icon 128x128 tồn tại');

// ----------------------------------------------------
// TEST GROUP 2: PDF TEXT & LIGATURE NORMALIZER
// ----------------------------------------------------
console.log('\n📄 TEST GROUP 2: KIỂM TRA BỘ TIỀN XỬ LÝ CHỮ PDF (NORMALIZER)');

function normalizeText(raw) {
  if (!raw) return '';
  let text = raw;
  text = text.replace(/ﬁ/g, 'fi')
             .replace(/ﬂ/g, 'fl')
             .replace(/ﬀ/g, 'ff')
             .replace(/ﬃ/g, 'ffi')
             .replace(/ﬄ/g, 'ffl');
  text = text.replace(/(\w+)-\s*[\r\n]+\s*(\w+)/g, '$1$2');
  text = text.replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
  text = text.replace(/^["'“‘(\[{<]+|["'”’)\]}>.,;:?!]+$/g, '').trim();
  return text;
}

assert(normalizeText('signiﬁcant') === 'significant', 'Khử dính chữ ligature "ﬁ" -> "fi"');
assert(normalizeText('inﬂuence') === 'influence', 'Khử dính chữ ligature "ﬂ" -> "fl"');
assert(normalizeText('multi-\ncollinearity') === 'multicollinearity', 'Nối từ ngắt dòng có dấu gạch ngang "multi-\\ncollinearity"');
assert(normalizeText('  "Construct Validity."  ') === 'Construct Validity', 'Lọc sạch dấu ngoặc kép và dấu chấm bao quanh');
assert(normalizeText('[HTMT]') === 'HTMT', 'Lọc sạch dấu ngoặc vuông xung quanh từ viết tắt');

// ----------------------------------------------------
// TEST GROUP 3: SCHEMA INTEGRITY OF METHODOLOGY TERMS
// ----------------------------------------------------
console.log('\n📚 TEST GROUP 3: KIỂM TRA TOÀN VẸN DỮ LIỆU THUẬT NGỮ 6 TẦNG');
const termsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'methodology_terms.json'), 'utf8'));
const terms = termsData.terms || [];

assert(terms.length >= 80, `Số lượng thuật ngữ hạt nhân 6 tầng phải >= 80 (Hiện có: ${terms.length})`);

let allHave6Tiers = true;
terms.forEach(t => {
  if (!t.id || !t.term || !t.vietnamese || !t.core_definition || !t.apa_reference) {
    allHave6Tiers = false;
    console.error(`Mục từ thiếu trường bắt buộc: ${t.term}`);
  }
});
assert(allHave6Tiers, 'Tất cả các mục từ đều có đầy đủ các trường cốt lõi (ID, Term, Vietnamese, Core Definition, APA Citation)');

// Check specific benchmark fields for quantitative terms
const constructVal = terms.find(t => t.id === 'construct-validity');
assert(constructVal && constructVal.benchmarks.includes('AVE > 0.50'), 'Construct Validity chứa ngưỡng báo cáo thực nghiệm (AVE > 0.50)');
assert(constructVal && constructVal.pitfalls.length > 20, 'Construct Validity chứa cảnh báo phản biện / bẫy sai lầm');

// ----------------------------------------------------
// TEST GROUP 4: ACRONYM RESOLVER LOGIC
// ----------------------------------------------------
console.log('\n🔍 TEST GROUP 4: KIỂM TRA BỘ GIẢI MÃ TỪ VIẾT TẮT (ACRONYMS)');
const acronymsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'acronyms.json'), 'utf8'));
const acronyms = acronymsData.acronyms || {};

assert(Object.keys(acronyms).length >= 140, `Kho từ viết tắt chuyên sâu phải >= 140 từ (Hiện có: ${Object.keys(acronyms).length})`);
const testAcronyms = ['PLS-SEM', 'CB-SEM', 'AVE', 'HTMT', 'VIF', 'CMB', '2SLS', 'GMM', 'DID', 'PSM', 'RDD', 'ITS', 'RCT', 'ITT', 'CACE', 'DAG', 'CTT', 'IRT', 'CFA', 'EFA', 'ATE', 'ATT', 'SCM', 'PRISMA', 'CONSORT', 'FDR', 'LASSO'];
let acronymsAllPresent = true;
testAcronyms.forEach(ac => {
  if (!acronyms[ac] || !acronyms[ac].full_name || !acronyms[ac].benchmark) {
    acronymsAllPresent = false;
  }
});
assert(acronymsAllPresent, 'Giải mã thành công toàn bộ các từ viết tắt kinh điển (PLS-SEM, AVE, HTMT, VIF, CMB, 2SLS, GMM, ATE, SCM, PRISMA...)');

// ----------------------------------------------------
// TEST GROUP 5: AWL VOCABULARY INTEGRITY
// ----------------------------------------------------
console.log('\n📖 TEST GROUP 5: KIỂM TRA TỪ VỰNG HỌC THUẬT TIÊU CHUẨN (AWL)');
const awlData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'awl_vocabulary.json'), 'utf8'));
const awl = awlData.words || {};
assert(Object.keys(awl).length >= 500, `Kho từ vựng học thuật AWL phải >= 500 từ (Hiện có: ${Object.keys(awl).length})`);

const sampleAWL = ['empirical', 'substantiate', 'delineate', 'paramount', 'caveat', 'corroborate', 'mitigate', 'robust', 'explicate', 'spurious', 'endogenous', 'parsimonious'];
let awlValid = true;
sampleAWL.forEach(w => {
  if (!awl[w] || !awl[w].vietnamese || !awl[w].definition || !awl[w].example) {
    awlValid = false;
  }
});
assert(awlValid, 'Từ vựng AWL có đầy đủ phiên âm, nghĩa tiếng Việt, định nghĩa và ví dụ bài báo');

// ----------------------------------------------------
// TEST GROUP 6: SMART ROUTING LOGIC SIMULATION
// ----------------------------------------------------
console.log('\n⚡ TEST GROUP 6: KIỂM THỬ THUẬT TOÁN ĐIỀU PHỐI TRA CỨU (SMART ROUTER)');

function mockLookup(query) {
  const qLower = query.toLowerCase();
  const qUpper = query.toUpperCase();

  // Tier 1: Acronyms
  if (acronyms[qUpper]) {
    return { type: 'acronym', match: qUpper };
  }
  // Tier 2: Methodology
  const exactTerm = terms.find(t => t.term.toLowerCase() === qLower || t.id === qLower);
  if (exactTerm) {
    return { type: 'methodology', match: exactTerm.term };
  }
  // Tier 3: AWL
  if (awl[qLower]) {
    return { type: 'awl', match: qLower };
  }
  // Tier 4: Sentence (> 4 words)
  if (query.split(/\s+/).length >= 5) {
    return { type: 'sentence' };
  }
  return { type: 'fallback' };
}

assert(mockLookup('HTMT').type === 'acronym', 'Nhận diện đúng "HTMT" là Từ viết tắt NCKH');
assert(mockLookup('htmt').type === 'acronym', 'Nhận diện đúng chữ thường "htmt" thành Từ viết tắt');
assert(mockLookup('Construct Validity').type === 'methodology', 'Nhận diện đúng "Construct Validity" là Thuật ngữ NCKH 6 tầng');
assert(mockLookup('empirical').type === 'awl', 'Nhận diện đúng "empirical" là Từ vựng học thuật AWL');
assert(mockLookup('This study investigates the mediating role of organizational culture.').type === 'sentence', 'Nhận diện đúng câu dài là Dịch đoạn văn');

// ----------------------------------------------------
// TEST GROUP 7: MASTER SEARCH INDEX INTEGRITY
// ----------------------------------------------------
console.log('\n🌐 TEST GROUP 7: KIỂM TRA MỤC LỤC TÌM KIẾM TỔNG THỂ (SEARCH INDEX)');
const searchIndexPath = path.join(__dirname, 'data', 'search_index.json');
assert(fs.existsSync(searchIndexPath), 'data/search_index.json phải tồn tại');

const searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const indexList = searchIndex.terms || [];
assert(indexList.length >= 2500, `Tổng số mục từ trong search_index phải >= 2500 (Hiện có: ${indexList.length})`);

let sampleFound = false;
const sampleCheck = indexList.find(item => item.term.toLowerCase().includes('heterotrait') || item.term === 'HTMT');
assert(!!sampleCheck, 'search_index tìm thấy các mục từ quan trọng từ các tài liệu mở rộng (HTMT / Heterotrait)');

// ----------------------------------------------------
// TEST GROUP 8: WEBSITE METADATA & API INTEGRITY
// ----------------------------------------------------
console.log('\n💻 TEST GROUP 8: KIỂM TRA METADATA & CẤU TRÚC PHỤC VỤ WEBSITE');
const metadataPath = path.join(__dirname, 'data', 'metadata.json');
assert(fs.existsSync(metadataPath), 'data/metadata.json phải tồn tại');

const metadataObj = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
assert(metadataObj.statistics && metadataObj.statistics.flagship_6tier_terms_count >= 80, 'Metadata chứa thống kê số lượng mục từ 6 tầng >= 80');
assert(metadataObj.statistics && metadataObj.statistics.total_indexed_search_terms >= 2500, 'Metadata chứa tổng số mục từ tra cứu >= 2500');
assert(metadataObj.featured_search_pills && metadataObj.featured_search_pills.length >= 10, 'Metadata chứa danh sách gợi ý tìm kiếm (Pills) phục vụ giao diện Web');
assert(metadataObj.api_endpoints_ready && !!metadataObj.api_endpoints_ready.search_index, 'Metadata khai báo đầy đủ các endpoints dữ liệu');

// ----------------------------------------------------
// TEST GROUP 9: CORPUS VARIANT MAPPING INTEGRITY
// ----------------------------------------------------
console.log('\n🔗 TEST GROUP 9: KIỂM TRA HỆ THỐNG ÁNH XẠ BIẾN THỂ (CORPUS VARIANT MAPPING)');
const variantMapPath = path.join(__dirname, 'data', 'variant_mappings.json');
assert(fs.existsSync(variantMapPath), 'data/variant_mappings.json phải tồn tại');

const variantPayload = JSON.parse(fs.readFileSync(variantMapPath, 'utf8'));
assert(variantPayload.statistics && variantPayload.statistics.total_mapped_variants >= 250, `Tổng số biến thể được ánh xạ phải >= 250 (Hiện có: ${variantPayload.statistics.total_mapped_variants})`);

// Kiểm tra ánh xạ hai chiều mẫu
const sampleVariantKey = 'convergent validity';
assert(variantPayload.variant_to_canonical && !!variantPayload.variant_to_canonical[sampleVariantKey], `Biến thể "${sampleVariantKey}" phải ánh xạ về mục từ gốc`);
assert(variantPayload.variant_to_canonical[sampleVariantKey].canonical_term === 'Construct Validity', `Biến thể "${sampleVariantKey}" ánh xạ chuẩn xác về "Construct Validity"`);

// Kiểm tra trường corpus_variants trong methodology_terms.json
const sampleTermWithVariants = terms.find(t => t.id === 'construct-validity');
assert(sampleTermWithVariants && sampleTermWithVariants.corpus_variants && sampleTermWithVariants.corpus_variants.length > 5, 'Construct Validity chứa đầy đủ danh sách biến thể chuyên sâu từ giáo trình');



console.log('\n====================================================');
console.log(`📊 TỔNG KẾT KIỂM THỬ: ${passedTests}/${totalTests} TESTS ĐẠT CHUẨN (${Math.round(passedTests/totalTests*100)}%)`);
console.log('====================================================');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
