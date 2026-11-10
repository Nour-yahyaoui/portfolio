"use client";

import dynamic from "next/dynamic";

/**
 * The voyage is heavy (a three.js scene plus post-processing) and always below
 * the fold, so it loads after the page is interactive. While the chunk is in
 * flight this placeholder reserves the height the flight will occupy, so
 * nothing underneath jumps when it arrives.
 */
const Voyage = dynamic(() => import("./Voyage"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="bg-[#04130f]"
      style={{ height: "760vh" }}
    />
  ),
});

export default function VoyageLoader() {
  return <Voyage />;
}
