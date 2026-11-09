import type { Metadata } from "next";
import Lobby from "@/components/Lobby";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nour Yahyaoui — choose an edition",
  description:
    "Two editions of the same portfolio: the classic Paper & Ink site, or the new emerald edition — a cold, deep-green experience with an expanded index and an interactive 3D lab.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nour Yahyaoui — choose an edition",
    description:
      "Classic (paper & ink) or the new emerald edition: the same twenty projects, two different lights to read them in.",
    url: SITE_URL,
    type: "website",
  },
};

/**
 * The lobby: one question, two doors. It carries no site header or footer of
 * its own — nothing here should pull you anywhere except into an edition.
 */
export default function Page() {
  return <Lobby />;
}
