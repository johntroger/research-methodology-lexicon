import type { Metadata } from "next";
import LandingHomePage from "@/components/LandingHomePage";

export const metadata: Metadata = {
  title: "Giới thiệu | Từ điển Thuật ngữ Phương pháp Nghiên cứu Khoa học",
  description:
    "Giới thiệu tổng quan về Từ điển Thuật ngữ Phương pháp Nghiên cứu Khoa học (Research Methodology Lexicon): 1.872 thuật ngữ chuẩn Q1, 148 từ viết tắt, công thức toán học, ngưỡng kiểm định thực nghiệm và trích dẫn APA 7th / BibTeX.",
  alternates: {
    canonical: "/gioi-thieu"
  }
};

export default function GioiThieuPage() {
  return <LandingHomePage />;
}
