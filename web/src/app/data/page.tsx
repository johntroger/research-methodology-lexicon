import type { Metadata } from "next";
import { fetchDatasetsCatalog } from "@/lib/datasets-catalog";
import OpenDatasetsPage from "@/components/OpenDatasetsPage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kho Dữ liệu Mở cho Nghiên cứu Khoa học (225+ Bộ dữ liệu Q1) | VNResearch Dictionary",
  description:
    "Thư viện tra cứu song ngữ Việt–Anh hơn 225 bộ dữ liệu mở miễn phí cho nghiên cứu Quản trị, Marketing, Hành vi tiêu dùng, Chuỗi cung ứng, Kinh tế, Tài chính, Xã hội và dữ liệu chuyên sâu Việt Nam – ASEAN (TVSEP, VARHS, VHLSS, PGI, PII, PCI, UIT-ViSFD).",
  alternates: {
    canonical: "/data",
  },
  openGraph: {
    title: "Kho Dữ liệu Mở cho Nghiên cứu Khoa học (225+ Bộ dữ liệu) | VNResearch Dictionary",
    description:
      "Tra cứu song ngữ Việt–Anh hơn 225 bộ dữ liệu mở chuẩn Q1 về Business, Management, Marketing, Economics, Social Science & chuyên sâu Việt Nam/ASEAN.",
    url: "https://vnresearch-dictionary.vercel.app/data",
  },
};

export default async function OpenDataRoute() {
  const initialData = await fetchDatasetsCatalog();
  return <OpenDatasetsPage initialData={initialData} />;
}
