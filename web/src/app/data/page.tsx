import type { Metadata } from "next";
import { fetchDatasetsCatalog } from "@/lib/datasets-catalog";
import OpenDatasetsPage from "@/components/OpenDatasetsPage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kho Dữ liệu Mở cho Nghiên cứu Khoa học (147+ Bộ dữ liệu) | VNResearch Dictionary",
  description:
    "Thư viện tra cứu song ngữ Việt–Anh hơn 147 bộ dữ liệu mở miễn phí cho nghiên cứu Khoa học Xã hội, Kinh tế, Tài chính, Giáo dục, Y tế và Chính sách công. Lọc theo 4 nhóm ngành lớn và 34 chủ đề chuyên sâu.",
  alternates: {
    canonical: "/data",
  },
  openGraph: {
    title: "Kho Dữ liệu Mở cho Nghiên cứu Khoa học | VNResearch Dictionary",
    description:
      "Tra cứu song ngữ Việt–Anh 147+ bộ dữ liệu mở quốc tế theo 4 nhóm ngành và 34 chủ đề chuyên sâu cho bài báo khoa học và luận án.",
    url: "https://vnresearch-dictionary.vercel.app/data",
  },
};

export default async function OpenDataRoute() {
  const initialData = await fetchDatasetsCatalog();
  return <OpenDatasetsPage initialData={initialData} />;
}
