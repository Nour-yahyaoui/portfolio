import type { Metadata } from "next";
import TestClient from "./TestClient";

// Internal WebGL demo page — kept for parity with the original app but
// intentionally excluded from search indexing and the sitemap.
export const metadata: Metadata = {
  title: "Demo",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <TestClient />;
}
