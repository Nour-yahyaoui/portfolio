import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Layout for the classic edition and its pages. The lobby (/) and the emerald
 * edition (/emerald) sit outside this group: they bring their own chrome.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
