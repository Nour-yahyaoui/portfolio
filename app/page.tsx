import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { SITE_URL, DEFAULT_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nour Yahyaoui | Full-Stack Developer, AI & Linux Tools",
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nour Yahyaoui | Full-Stack Developer",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    type: "website",
  },
};

export default function Page() {
  return <HomeClient />;
}
