import type { Metadata } from "next";
import { ArtRoom } from "@/components/PersonalRooms";

export const metadata: Metadata = {
  title: "Art & Archive",
  description: "A parchment-and-ink art room built around a personal collection of historical portraits and miniatures.",
};

export default function Page() {
  return <ArtRoom />;
}
