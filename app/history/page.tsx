import type { Metadata } from "next";
import { HistoryRoom } from "@/components/PersonalRooms";

export const metadata: Metadata = {
  title: "History",
  description: "A personal gallery of historical figures Nour Yahyaoui reads about and respects.",
};

export default function Page() {
  return <HistoryRoom />;
}
