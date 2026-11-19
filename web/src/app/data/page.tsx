import type { Metadata } from "next";
import { fetchDatasetsCatalog } from "@/lib/datasets-catalog";
import OpenDatasetsPage from "@/components/OpenDatasetsPage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kho Dữ liệu Mở cho Nghiên cứu Khoa học (195+ Bộ dữ liệu Q1) | VNResearch Dictionary",
  description:
    "Thư viện tra cứu song ngữ Việt–Anh gần 200 bộ dữ liệu mở miễn phí cho nghiên cứu Quản trị, Marketing, Hành vi tiêu dùng, Chuỗi cung ứng, Kinh tế, Tài chính, Xã hội và Việt Nam – ASEAN. Bộ lọc tối ưu theo 6 nhóm ngành và gần 40 chủ đề chuyên sâu.",
  alternates: {
    canonical: "/data",
  },
  openGraph: {
    title: "Kho Dữ liệu Mở cho Nghiên cứu Khoa học (195+ Bộ dữ liệu) | VNResearch Dictionary",
    description:
      "Tra cứu song ngữ Việt–Anh gần 200 bộ dữ liệu mở chuẩn Q1 về Business, Management, Marketing, Economics, Social Science & Vietnam/ASEAN.",
    url: "https://vnresearch-dictionary.vercel.app/data",
  },
};

export default async function OpenDataRoute() {
  const initialData = await fetchDatasetsCatalog();
  return <OpenDatasetsPage initialData={initialData} />;
}
