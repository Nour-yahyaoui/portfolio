import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects | Nour Yahyaoui - Full-Stack Developer Portfolio",
  description:
    "Explore VexOS Desktop, nour-code, and other products and open-source projects by Nour Yahyaoui across web, local AI, Linux, and developer tooling.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Nour Yahyaoui",
    description:
      "Explore VexOS Desktop, nour-code, and other products and open-source projects by Nour Yahyaoui across web, local AI, Linux, and developer tooling.",
    url: "/projects",
    type: "website",
  },
};

export default function Page() {
  // ItemList structured data helps search engines understand this is a
  // curated list of creative works (each project) authored by Nour Yahyaoui.
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: project.liveDemo || project.code || undefined,
        creator: {
          "@type": "Person",
          name: "Nour Yahyaoui",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <ProjectsClient />
    </>
  );
}
