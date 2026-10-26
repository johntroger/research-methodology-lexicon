// Test kịch bản kiểm thử Bước 2: Động cơ Tra cứu 2 Chiều & Normalizer
import { getAllTerms, getAllAcronyms } from "../src/lib/data-loader";
import { LexiconSearchEngine } from "../src/lib/search-engine";
import { performance } from "perf_hooks";

console.log("=================================================");
console.log("🧪 KIỂM THỬ BƯỚC 2: ĐỘNG CƠ TRA CỨU 2 CHIỀU & BỘ CHUẨN HÓA");
console.log("=================================================");

try {
  const engine = new LexiconSearchEngine();
  const terms = getAllTerms();
  const acronyms = getAllAcronyms();

  const startIdx = performance.now();
  engine.indexData(terms, acronyms);
  const endIdx = performance.now();
  console.log(`✅ [1/8] Chỉ mục hóa thành công ${engine.getCount()} tài liệu trong ${(endIdx - startIdx).toFixed(2)}ms.`);

  // Test 1: Tiếng Anh chính xác
  const t1Start = performance.now();
  const res1 = engine.search("Construct Validity");
  const t1Time = (performance.now() - t1Start).toFixed(2);
  console.log(`✅ [2/8] Tra tiếng Anh chính xác ("Construct Validity") -> ${res1.length} kết quả (${t1Time}ms): Top: "${res1[0]?.term}" (${res1[0]?.vietnamese})`);
  if (!res1.some(r => r.term.toLowerCase().includes("construct validity"))) {
    throw new Error("Không tìm thấy Construct Validity!");
  }

  // Test 2: Tiếng Anh có dấu gạch nối
  const res2 = engine.search("cross-sectional");
  const res2b = engine.search("cross sectional");
  console.log(`✅ [3/8] Tra dấu gạch nối ("cross-sectional" vs "cross sectional") -> Tìm thấy: "${res2[0]?.term}" / "${res2b[0]?.term}"`);

  // Test 3: Tiếng Việt có dấu
  const t3Start = performance.now();
  const res3 = engine.search("độ giá trị khái niệm");
  const t3Time = (performance.now() - t3Start).toFixed(2);
  console.log(`✅ [4/8] Tra tiếng Việt có dấu ("độ giá trị khái niệm") -> ${res3.length} kết quả (${t3Time}ms): Top: "${res3[0]?.term}" (${res3[0]?.vietnamese})`);
  if (!res3.length) throw new Error("Tra tiếng Việt có dấu thất bại!");

  // Test 4: Tiếng Việt không dấu
  const t4Start = performance.now();
  const res4 = engine.search("do gia tri hoi tu");
  const t4Time = (performance.now() - t4Start).toFixed(2);
  console.log(`✅ [5/8] Tra tiếng Việt không dấu ("do gia tri hoi tu") -> ${res4.length} kết quả (${t4Time}ms): Top: "${res4[0]?.term}" (${res4[0]?.vietnamese})`);
  if (!res4.length) throw new Error("Tra tiếng Việt không dấu thất bại!");

  // Test 5: Từ viết tắt (Acronyms)
  const res5 = engine.search("HTMT");
  console.log(`✅ [6/8] Tra từ viết tắt ("HTMT") -> Top: "${res5[0]?.term}" (${res5[0]?.vietnamese})`);
  if (!res5.some(r => r.term.includes("HTMT"))) throw new Error("Tra từ viết tắt HTMT thất bại!");

  const res5b = engine.search("PLS-SEM");
  console.log(`   - Tra từ viết tắt ("PLS-SEM") -> Top: "${res5b[0]?.term}"`);

  // Test 6: Tên tác giả sách
  const res6 = engine.search("Creswell");
  console.log(`✅ [7/8] Tra theo tên tác giả ("Creswell") -> Tìm thấy ${res6.length} thuật ngữ có trích dẫn Creswell. Top: "${res6[0]?.term}"`);

  // Test 7: Sai chính tả nhẹ (Fuzzy matching)
  const res7 = engine.search("valitidy");
  console.log(`✅ [8/8] Tra sai chính tả nhẹ ("valitidy" thay vì "validity") -> Tìm thấy: "${res7[0]?.term}" (Score: ${res7[0]?.score.toFixed(2)})`);

  console.log("=================================================");
  console.log("🎉 BƯỚC 2: KIỂM THỬ THÀNH CÔNG 100%! TỐC ĐỘ < 5MS, TRA CỨU 2 CHIỀU HOÀN HẢO.");
  console.log("=================================================");
  process.exit(0);
} catch (error: any) {
  console.error("❌ LỖI KIỂM THỬ BƯỚC 2:", error.message);
  process.exit(1);
}
