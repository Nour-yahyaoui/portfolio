import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Nour Yahyaoui | Hire a Full-Stack Developer",
  description:
    "Get in touch with Nour Yahyaoui for freelance full-stack development work — React, Next.js, Node.js, PostgreSQL and React Native projects.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Nour Yahyaoui",
    description:
      "Get in touch with Nour Yahyaoui for freelance full-stack development work — React, Next.js, Node.js, PostgreSQL and React Native projects.",
    url: "/contact",
    type: "website",
  },
};

export default function Page() {
  return <ContactClient />;
}
