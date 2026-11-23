import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkCaseStudy } from "@/components/WorkRoom";
import { projects, getProjectBySlug } from "@/lib/projects";
import { getProjectDetail } from "@/lib/projectDetails";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const detail = getProjectDetail(slug);
  if (!project || !detail) return { title: "Project not found" };
  return {
    title: `${project.title} — Case File`,
    description: detail.tagline,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${project.title} | Nour Yahyaoui`,
      description: detail.tagline,
      url: `${SITE_URL}/work/${slug}`,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getProjectBySlug(slug) || !getProjectDetail(slug)) notFound();
  return <WorkCaseStudy slug={slug} />;
}
