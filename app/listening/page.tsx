import type { Metadata } from "next";
import { ListeningRoom } from "@/components/PersonalRooms";

export const metadata: Metadata = {
  title: "Listening Room",
  description: "Songs Nour Yahyaoui loves, transcribed from his listening screenshots. No audio files are hosted.",
};

export default function Page() {
  return <ListeningRoom />;
}
