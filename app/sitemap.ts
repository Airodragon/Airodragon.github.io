import type { MetadataRoute } from "next";
import { navigationLinks, siteConfig } from "@/lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return navigationLinks.map((route) => ({
    url: `${siteConfig.url}${route.href}`,
    lastModified: now,
    changeFrequency: route.href === "/" ? "weekly" : "monthly",
    priority: route.href === "/" ? 1 : 0.8
  }));
}
