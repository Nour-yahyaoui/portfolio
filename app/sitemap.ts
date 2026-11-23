import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const roomRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/work`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/history`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/art`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/listening`, lastModified, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/ideas`, lastModified, changeFrequency: "monthly", priority: 0.75 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/work/${project.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: project.featured ? 0.85 : 0.7,
  }));

  return [...roomRoutes, ...projectRoutes];
}
