import type { Metadata } from "next";
import HomeClient from "./classic/HomeClient";
import { DEFAULT_DESCRIPTION } from "@/lib/site";
export const metadata: Metadata = { title: "Nour Yahyaoui — Full-Stack Developer", description: DEFAULT_DESCRIPTION, alternates: { canonical: "/" } };
export default function Page() { return <HomeClient />; }
