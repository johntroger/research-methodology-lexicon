import type { Metadata } from "next";
import LandingHomePage from "@/components/LandingHomePage";
import { getLexiconStats } from "@/lib/data-loader";

export const metadata: Metadata = {
  title: "Giới thiệu | Từ điển Thuật ngữ Phương pháp Nghiên cứu Khoa học",
  description:
    "Giới thiệu tổng quan về Từ điển Thuật ngữ Phương pháp Nghiên cứu Khoa học (Research Methodology Lexicon): Hệ thống thuật ngữ chuẩn Q1, từ viết tắt, công thức toán học, ngưỡng kiểm định thực nghiệm và trích dẫn APA 7th / BibTeX.",
  alternates: {
    canonical: "/gioi-thieu"
  }
};

export default function GioiThieuPage() {
  const stats = getLexiconStats();
  return <LandingHomePage initialStats={stats} />;
}
