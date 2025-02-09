import type { MetadataRoute } from "next";

const domain = "https://cyslabs.vercel.app/";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: "/private/",
      },
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "Bingbot",
        allow: ["/"],
        crawlDelay: 1, // Rate limiting for Bing bot
      },
    ],
    sitemap: `${domain}/sitemap.xml`,
    host: domain,
  };
}
