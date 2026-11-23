import type { Metadata } from "next";
import { WorkRoom } from "@/components/WorkRoom";

export const metadata: Metadata = {
  title: "The Workshop",
  description: "A concise index of Nour Yahyaoui's projects, with full case files for goals, implementation, decisions, and skills.",
};

export default function Page() {
  return <WorkRoom />;
}
