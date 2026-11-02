import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://vnresearch-dictionary.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/moderation"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
