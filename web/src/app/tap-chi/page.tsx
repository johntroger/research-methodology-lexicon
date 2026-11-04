import type { Metadata } from "next";
import JournalSearchPage from "@/components/JournalSearchPage";

export const metadata: Metadata = {
  title: "Tra cứu & Thẩm định Tạp chí Khoa học (Scopus, WoS, HĐGSNN, ABDC) | VNResearch Dictionary",
  description:
    "Cổng thông tin tra cứu và thẩm định tạp chí khoa học: Kiểm tra phân vị Scopus Q1–Q4, danh sách tạp chí bị loại khỏi Scopus (Discontinued), WoS Delisted, Hijacked Journals, xếp hạng ABDC và khung điểm Hội đồng Giáo sư Nhà nước (HĐGSNN). Đồng bộ dữ liệu Zalo Bot tự động.",
  alternates: {
    canonical: "/tap-chi"
  },
  openGraph: {
    title: "Tra cứu & Thẩm định Tạp chí Khoa học (Scopus, WoS, HĐGSNN) | VNResearch Dictionary",
    description:
      "Kiểm tra phân vị Scopus Q1–Q4, cảnh báo tạp chí bị loại khỏi Scopus, Web of Science, tạp chí giả mạo, xếp hạng ABDC và khung điểm HĐGSNN Việt Nam.",
    url: "https://vnresearch-dictionary.vercel.app/tap-chi"
  }
};

export default function TapChiRoute() {
  return <JournalSearchPage />;
}
