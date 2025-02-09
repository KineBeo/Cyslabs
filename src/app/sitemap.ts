import type { MetadataRoute } from "next";

const domain = "https://cyslabs.vercel.app/";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: domain,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${domain}/falvicon.ico`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 2,
    },
  ];
}
