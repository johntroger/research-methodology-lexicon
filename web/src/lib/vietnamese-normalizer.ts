/**
 * BỘ CHUẨN HÓA KÝ TỰ TIẾNG VIỆT & TỪ KHÓA TÌM KIẾM
 * Đảm bảo tìm kiếm tiếng Việt có dấu, không dấu, Telex, VNI và xử lý dấu gạch nối
 */

export function removeVietnameseTones(str: string): string {
  if (!str) return "";
  let result = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  result = result.replace(/[đĐ]/g, (m) => (m === "đ" ? "d" : "D"));
  return result;
}

export function normalizeQuery(query: string): string {
  if (!query) return "";
  // 1. Chuẩn hóa NFC
  let normalized = query.normalize("NFC").trim();
  // 2. Chuyển chữ thường
  normalized = normalized.toLowerCase();
  // 3. Chuẩn hóa khoảng trắng thừa
  normalized = normalized.replace(/\s+/g, " ");
  return normalized;
}

/**
 * Tạo các biến thể tìm kiếm cho từ khóa (bao gồm cả dạng không dấu và thay thế gạch nối)
 */
export function expandQueryVariants(query: string): string[] {
  const clean = normalizeQuery(query);
  if (!clean) return [];

  const variants = new Set<string>();
  variants.add(clean);

  // Biến thể không dấu
  const toneFree = removeVietnameseTones(clean);
  variants.add(toneFree);

  // Biến thể xử lý dấu gạch nối
  if (clean.includes("-")) {
    variants.add(clean.replace(/-/g, " "));
    variants.add(toneFree.replace(/-/g, " "));
  } else if (clean.includes(" ")) {
    variants.add(clean.replace(/\s+/g, "-"));
    variants.add(toneFree.replace(/\s+/g, "-"));
  }

  return Array.from(variants);
}

/**
 * Hàm phân tách từ (Tokenizer) tích hợp vào MiniSearch
 */
export function customTokenizer(text: string): string[] {
  if (!text) return [];
  const normalized = text.normalize("NFC").toLowerCase();
  
  // Tách theo khoảng trắng, dấu gạch ngang, dấu gạch chéo, dấu ngoặc
  const rawTokens = normalized.split(/[\s\-_\/(),;:.+*&]+/);
  const tokens = new Set<string>();

  for (const token of rawTokens) {
    const trimmed = token.trim();
    if (trimmed.length > 0) {
      tokens.add(trimmed);
      // Thêm token không dấu vào chỉ mục
      const toneFree = removeVietnameseTones(trimmed);
      if (toneFree !== trimmed) {
        tokens.add(toneFree);
      }
    }
  }

  return Array.from(tokens);
}
