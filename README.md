# Research Methodology Lexicon (Anh - Việt)
### Tiện ích tra cứu thuật ngữ Phương pháp Nghiên cứu Khoa học cho Microsoft Edge & Google Chrome

Tiện ích mở rộng chuyên biệt dành cho giảng viên, nghiên cứu sinh, học viên cao học và sinh viên làm nghiên cứu khoa học. Giúp giải nghĩa chuẩn xác các khái niệm phương pháp luận từ **John W. Creswell (2023)**, **SAGE Publications** và **OECD** tức thì khi đọc tài liệu Word & PDF.

---

## 🚀 HƯỚNG DẪN CÀI ĐẶT TRONG 30 GIÂY

### Dành cho Microsoft Edge (Khuyên dùng nhất cho PDF)
1. Mở trình duyệt **Microsoft Edge**, gõ vào thanh địa chỉ:
   ```
   edge://extensions/
   ```
2. Bật công tắc **"Chế độ dành cho nhà phát triển" (Developer mode)** ở góc dưới bên trái màn hình.
3. Bấm vào nút **"Tải phần mở rộng đã giải nén" (Load unpacked)** ở góc trên.
4. Chọn thư mục dự án này: `C:\Projects\Research Vocabulary`.
5. **Quan trọng để đọc PDF lưu trên máy tính:**
   * Sau khi cài xong, tìm tiện ích **Research Methodology Lexicon**, bấm vào **Chi tiết (Details)**.
   * Tìm và gạt bật công tắc: **"Cho phép truy cập vào các URL của tệp" (Allow access to file URLs)**.

---

### Dành cho Google Chrome
1. Mở trình duyệt **Google Chrome**, gõ vào thanh địa chỉ:
   ```
   chrome://extensions/
   ```
2. Bật công tắc **"Chế độ dành cho nhà phát triển" (Developer mode)** ở góc trên bên phải.
3. Bấm nút **"Tải tiện ích đã giải nén" (Load unpacked)**.
4. Chọn thư mục: `C:\Projects\Research Vocabulary`.
5. Bấm vào nút **Chi tiết (Details)** của tiện ích $\rightarrow$ Bật **"Cho phép truy cập vào các URL của tệp" (Allow access to file URLs)**.

---

## 🎯 CÁCH SỬ DỤNG KHI ĐỌC TÀI LIỆU

### 1. Đọc bài báo PDF hoặc trang web bất kỳ
* Kéo thả file PDF bài báo vào Microsoft Edge hoặc Chrome.
* Dùng chuột **bôi đen** hoặc **nhấp đúp (double-click)** vào một thuật ngữ (ví dụ: *Construct validity, Endogeneity, PLS-SEM, Triangulation, Empirical...*).
* Một biểu tượng kính lúp nhỏ mờ sẽ xuất hiện ngay cạnh con trỏ chuột. Nhấp vào để mở thẻ thông tin học thuật 6 tầng!

### 2. Các tính năng nổi bật trên Thẻ Popup:
* **Định nghĩa phương pháp luận chuẩn xác**: Trích từ giáo trình Creswell (2023).
* **Ngưỡng kiểm định thống kê (Benchmarks)**: AVE > 0.5, HTMT < 0.85, VIF < 3.3, Cronbach's alpha > 0.7...
* **Cảnh báo phản biện (Reviewer Red Flags)**: Bẫy sai lầm tác giả hay mắc phải.
* **Nút 1-Click Copy APA 7th**: Bấm nút để copy ngay trích dẫn chuẩn dán vào luận án.
* **Nút Phát âm tiếng Anh chuẩn (Audio)**: Lắng nghe cách phát âm thuật ngữ.
* **Giải mã từ viết tắt**: Tự động nhận diện `AVE, HTMT, VIF, CMB, PLS-SEM, GMM, 2SLS...`

### 3. Tra cứu trực tiếp trên Thanh công cụ:
* Bấm vào biểu tượng chiếc mũ cử nhân của tiện ích ở góc trên bên phải trình duyệt để mở cửa sổ tra cứu nhanh với thanh tìm kiếm thời gian thực và bộ lọc theo ngành!

---

## 🌐 ỨNG DỤNG WEB TRỰC TUYẾN (NEXT.JS + FIREBASE + VERCEL)

Dự án cung cấp phiên bản **Web Từ điển Phương pháp Nghiên cứu Trực tuyến** độc lập tại thư mục `web/`:
- **Công nghệ**: Next.js 16 (React 19), Tailwind CSS, MiniSearch (in-memory index siêu tốc < 5ms).
- **Cơ sở dữ liệu đám mây**: Google Cloud Firestore (`asia-southeast1`), hỗ trợ lưu đánh dấu cá nhân (⭐ Bookmarks) và gửi góp ý học thuật.
- **Học thuật chuyên sâu**: Xuất trích dẫn APA 7th, BibTeX (Overleaf), file `.ris` (Zotero/Mendeley/EndNote), phát âm Web Speech API, Zen Mode đọc tập trung và in ấn A4.

### Chạy ứng dụng Web cục bộ:
```bash
cd web
npm install
npm run dev
```
Truy cập: `http://localhost:3000`

### Hướng dẫn Triển khai lên Vercel:
1. Đẩy mã nguồn lên GitHub.
2. Tại Vercel Dashboard, chọn **Add New Project** $\rightarrow$ chọn repository này.
3. Trong phần **Project Settings**:
   * **Root Directory**: Nhập `web`
   * **Framework Preset**: `Next.js`
4. Cài đặt biến môi trường (Environment Variables) lấy từ file `web/.env.example` hoặc `web/.env.local`:
   * `NEXT_PUBLIC_FIREBASE_API_KEY`
   * `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   * `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   * `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   * `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   * `NEXT_PUBLIC_FIREBASE_APP_ID`
5. Bấm **Deploy**. Vercel sẽ tự động build và cấp phát tên miền HTTPS production tốc độ cao toàn cầu!
