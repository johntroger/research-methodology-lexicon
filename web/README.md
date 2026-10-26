# Research Methodology Lexicon Web App (Next.js + Firebase)

Ứng dụng Từ điển Phương pháp Nghiên cứu Khoa học song ngữ Anh - Việt trực tuyến, xây dựng trên Next.js 16, React 19, Tailwind CSS và Cloud Firestore.

## 🚀 Tính năng nổi bật
- **Tìm kiếm đa hướng (Bilingual Search)**: Tìm kiếm hai chiều Anh - Việt, có dấu / không dấu, mờ lỗi chính tả (fuzzy matching) qua MiniSearch (< 5ms).
- **Bộ dữ liệu phương pháp luận kinh điển**: Phân tầng 6 lớp (Định nghĩa, Ngưỡng thống kê Benchmark, Cảnh báo phản biện, Bài báo kinh điển).
- **Trích dẫn học thuật 1-Click**:
  - Trích dẫn trong bài (APA In-text)
  - Danh mục tài liệu tham khảo (APA Reference)
  - Mã BibTeX cho Overleaf/LaTeX
  - Xuất file `.ris` cho Zotero, Mendeley, EndNote
- **Công thái học & Học tập chuyên sâu**:
  - Thanh chỉnh cỡ chữ $A^- / A^+$
  - Chế độ đọc tập trung Zen Mode (phím `F`)
  - Chế độ Sáng / Tối (Dark/Light mode)
  - In ấn trực tiếp ra khổ giấy A4 sạch đẹp (`Ctrl + P`)
- **Tích hợp Cloud Firestore & Bookmarking**:
  - Đánh dấu từ yêu thích (⭐) đồng bộ đám mây và localStorage.
  - Tab lọc riêng danh sách từ đã lưu.
  - Góp ý và báo lỗi học thuật gửi thẳng về Firebase Firestore.

## 🛠 Hướng dẫn phát triển cục bộ
```bash
# Cài đặt dependencies
npm install

# Khởi chạy dev server
npm run dev

# Biên dịch kiểm tra production
npm run build
npm run start
```

## ☁️ Cấu hình Firebase
Tạo file `.env.local` theo mẫu `.env.example`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

## 📦 Lệnh đồng bộ cơ sở dữ liệu
```bash
# Đẩy dữ liệu JSON lên Firestore
npx tsx scripts/db-push.ts

# Kéo dữ liệu Firestore về máy
npx tsx scripts/db-pull.ts
```
