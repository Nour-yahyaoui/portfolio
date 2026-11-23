import type { Metadata } from "next";
import Showroom from "@/components/Showroom";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nour Yahyaoui — a personal showroom",
  description:
    "A personal showroom by Nour Yahyaoui: software, history, art, music, philosophy, and science, each in its own room.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Nour Yahyaoui — a personal showroom",
    description:
      "A personal map of things made, histories remembered, and songs kept nearby.",
    url: SITE_URL,
    type: "website",
  },
};

export default function Page() {
  return <Showroom />;
}
