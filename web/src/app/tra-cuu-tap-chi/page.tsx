import type { Metadata } from "next";
import JournalSearchPage from "@/components/JournalSearchPage";

export const metadata: Metadata = {
  title: "Tra cứu Tạp chí Khoa học | Scopus, WoS, HĐGSNN & Zalo Bot",
  description:
    "Công cụ tra cứu và thẩm định tạp chí khoa học quốc tế và Việt Nam. Kiểm tra Scopus Q1-Q4, ABDC, HĐGSNN và nhận cảnh báo tạp chí bị loại.",
  alternates: {
    canonical: "/tra-cuu-tap-chi"
  }
};

export default function TraCuuTapChiRoute() {
  return <JournalSearchPage />;
}
