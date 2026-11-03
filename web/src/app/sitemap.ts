import { MetadataRoute } from "next";
import { getAllTerms, getAllAcronyms } from "@/lib/data-loader";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vnresearch-dictionary.vercel.app";
  const now = new Date();

  // 1. Các trang tĩnh cố định
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/home`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/gioi-thieu`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hall-of-fame`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/my-contributions`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // 2. Toàn bộ 1,874 mục từ học thuật (Deep link tra cứu chuẩn SEO)
  const terms = getAllTerms();
  const termRoutes: MetadataRoute.Sitemap = terms.map((term) => ({
    url: `${baseUrl}/?term=${encodeURIComponent(term.id)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: term.is_flagship || term.tier === "flagship" ? 0.9 : 0.7,
  }));

  // 3. Toàn bộ từ viết tắt học thuật (Acronyms)
  const acronyms = getAllAcronyms();
  const acronymRoutes: MetadataRoute.Sitemap = Object.keys(acronyms).map((key) => {
    const slug = `acronym-${key.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
    return {
      url: `${baseUrl}/?term=${encodeURIComponent(slug)}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  return [...staticRoutes, ...termRoutes, ...acronymRoutes];
}
