import type { Metadata } from "next";
import { ChapterGrid } from "@/components/Historia/ChapterGrid";

export const metadata: Metadata = {
  title: "Chapters | HISTORIA — Nour Yahyaoui",
  description:
    "Explore the five historical chapters of HISTORIA: Amir Timur, Shah Ismail I, Nader Shah, Alp Arslan, and Bayezid I.",
  alternates: {
    canonical: "/historia/chapters",
  },
  openGraph: {
    title: "Chapters | HISTORIA",
    description:
      "Explore the five historical chapters of HISTORIA.",
    url: "/historia/chapters",
    type: "website",
  },
};

export default function ChaptersPage() {
  return <ChapterGrid />;
}
