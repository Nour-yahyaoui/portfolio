import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import {
  SITE_URL,
  SITE_NAME,
  AUTHOR_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  personJsonLd,
  websiteJsonLd,
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nour Yahyaoui | Full-Stack Developer",
    template: "%s | Nour Yahyaoui",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  category: "technology",
  applicationName: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/port.png",
        width: 1200,
        height: 1200,
        alt: AUTHOR_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: ["/port.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Paste the content value from Google Search Console's
  // "HTML tag" verification option here (skip this if you're instead
  // uploading the googleXXXXXXXX.html file to /public — see README).
  verification: {
    // google: "PASTE_YOUR_GOOGLE_SITE_VERIFICATION_CODE_HERE",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#12110f" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Runs before first paint (beforeInteractive): picks the stored theme, else
// the system preference, and sets [data-theme] so there is no flash of the
// wrong theme. Per global-ui-reformat — never do this in useEffect.
const THEME_INIT_SCRIPT = `try{var m=localStorage.getItem('theme');var s=(m==='dark'||m==='light')?m:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',s);}catch(e){document.documentElement.setAttribute('data-theme','light');}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-paper text-ink">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd()),
          }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>
          <Header />
          <div id="main">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
