import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Nour Yahyaoui | Full-Stack Developer from Tunisia",
  description:
    "Meet Nour Yahyaoui, a full-stack developer from Tunisia with 3+ years of client experience building secure web products, local AI tooling, and Linux systems.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Nour Yahyaoui | Full-Stack Developer",
    description:
      "Nour Yahyaoui builds secure web products, local AI tooling, and Linux systems from Tunisia.",
    url: "/about",
    type: "profile",
  },
};

export default function Page() {
  return <AboutClient />;
}
