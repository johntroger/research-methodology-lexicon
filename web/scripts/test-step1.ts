// Test kịch bản kiểm tra Bước 1: Khung dữ liệu & Data Loader
import { getAllTerms, getAllAcronyms, getSearchIndex, getTermById } from "../src/lib/data-loader";

console.log("=================================================");
console.log("🧪 KIỂM THỬ BƯỚC 1: KHUNG DỮ LIỆU & DATA CONTRACT");
console.log("=================================================");

try {
  // 1. Kiểm tra tải thuật ngữ
  const terms = getAllTerms();
  console.log(`✅ [1/4] Tải thành công ${terms.length} thuật ngữ phương pháp chính.`);
  if (terms.length === 0) {
    throw new Error("Không tải được thuật ngữ nào từ file methodology_terms.json!");
  }

  // 2. Kiểm tra mẫu 1 từ chi tiết (Construct Validity)
  const sampleTerm = getTermById("construct-validity");
  if (!sampleTerm) {
    throw new Error("Không tìm thấy thuật ngữ 'construct-validity'!");
  }
  console.log(`✅ [2/4] Kiểm tra mục từ mẫu: "${sampleTerm.term}" - "${sampleTerm.vietnamese}"`);
  console.log(`   - IPA: ${sampleTerm.ipa}`);
  console.log(`   - Domain tags: ${sampleTerm.domain_tags.join(", ")}`);
  console.log(`   - Số lượng biến thể con (corpus variants): ${sampleTerm.corpus_variants?.length || 0}`);
  console.log(`   - Trích dẫn: ${sampleTerm.apa_intext}`);

  // 3. Kiểm tra danh mục từ viết tắt
  const acronyms = getAllAcronyms();
  const acronymKeys = Object.keys(acronyms);
  console.log(`✅ [3/4] Tải thành công ${acronymKeys.length} từ viết tắt học thuật (Acronyms).`);
  console.log(`   - Ví dụ từ viết tắt: PLS-SEM: ${acronyms["PLS-SEM"]?.full_name}`);
  console.log(`   - HTMT: ${acronyms["HTMT"]?.full_name}`);

  // 4. Kiểm tra sinh Search Index
  const searchIndex = getSearchIndex();
  console.log(`✅ [4/4] Tạo thành công Search Index tổng hợp: ${searchIndex.length} mục.`);

  console.log("=================================================");
  console.log("🎉 BƯỚC 1: KIỂM THỬ THÀNH CÔNG 100%! KHUNG DỮ LIỆU HOẠT ĐỘNG HOÀN HẢO.");
  console.log("=================================================");
  process.exit(0);
} catch (error: any) {
  console.error("❌ LỖI KIỂM THỬ BƯỚC 1:", error.message);
  process.exit(1);
}
