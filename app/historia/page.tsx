import type { Metadata } from "next";
import HistoriaClient from "@/components/Historia/HistoriaClient";

export const metadata: Metadata = {
  title: "HISTORIA — Lessons from the people who shaped history",
  description:
    "A personal intellectual archive of historical figures — Amir Timur, Shah Ismail I, Nader Shah, Alp Arslan, and Bayezid I — and the lessons they teach about ambition, determination, leadership, and strategy.",
  alternates: {
    canonical: "/historia",
  },
  openGraph: {
    title: "HISTORIA | Nour Yahyaoui",
    description:
      "A personal intellectual archive of historical figures and the lessons they teach about ambition, determination, leadership, and strategy.",
    url: "/historia",
    type: "website",
  },
};

export default function HistoriaPage() {
  return <HistoriaClient />;
}
