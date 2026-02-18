import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url
  };
}
