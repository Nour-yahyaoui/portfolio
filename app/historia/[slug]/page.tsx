import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterDetailClient } from "@/components/Historia/ChapterDetailClient";
import { getHistoriaChapter, historiaChapters } from "@/lib/historia";
import type { HistoriaChapterSlug } from "@/lib/historia";

export async function generateStaticParams() {
  return historiaChapters.map((chapter) => ({
    slug: chapter.slug,
  }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: HistoriaChapterSlug }> }): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getHistoriaChapter(slug);
  if (!chapter) {
    return { title: "Chapter not found | HISTORIA" };
  }
  return {
    title: `${chapter.title} | HISTORIA — Nour Yahyaoui`,
    description: chapter.introduction,
    alternates: {
      canonical: `/historia/${chapter.slug}`,
    },
    openGraph: {
      title: `${chapter.title} | HISTORIA`,
      description: chapter.introduction,
      url: `/historia/${chapter.slug}`,
      type: "profile",
      images: [{ url: chapter.portrait, alt: chapter.title }],
    },
  };
}

export default async function HistoriaChapterPage({
  params,
}: { params: Promise<{ slug: HistoriaChapterSlug }> }) {
  const { slug } = await params;
  const chapter = getHistoriaChapter(slug);
  if (!chapter) notFound();

  return (
    <ChapterDetailClient
      chapterSlug={chapter.slug}
      portraitSrc={chapter.portrait}
      chapterTitle={chapter.title}
    />
  );
}
