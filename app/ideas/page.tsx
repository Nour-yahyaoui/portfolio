import type { Metadata } from "next";
import { IdeasRoom } from "@/components/PersonalRooms";

export const metadata: Metadata = {
  title: "Ideas — Philosophy & Science",
  description: "A concise shelf of the philosophy and science thinkers Nour Yahyaoui is interested in.",
};

export default function Page() {
  return <IdeasRoom />;
}
