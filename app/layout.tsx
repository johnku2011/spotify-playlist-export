import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://spotify-playlist-export-eight.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "免費 Spotify 播放清單匯出 CSV 工具 | 備份歌單轉 Apple Music",
    template: "%s | Spotify Playlist Exporter",
  },
  description: "最好用的 Spotify 匯出工具！支援匯出喜歡的歌曲、私人播放清單到 CSV/Excel，3 步驟完成備份。免費無廣告，可轉移 Apple Music、YouTube Music，含完整曲目資訊（藝人、專輯、發行日期）。不儲存資料，開源安全。Free Spotify playlist export to CSV with complete metadata.",
  keywords: [
    "spotify 播放清單 匯出 csv",
    "spotify 匯出喜歡的歌曲",
    "spotify 歌單 轉 apple music",
    "spotify playlist export csv",
    "把 spotify 歌單轉 excel",
    "spotify 備份播放清單",
    "免費 spotify 匯出工具",
    "spotify export playlist free",
    "spotify 播放清單 匯出 excel",
    "spotify 喜歡的歌曲 csv",
    "export spotify to csv",
    "spotify playlist backup",
    "spotify 匯出所有播放清單",
    "free spotify playlist exporter",
    "spotify 歌單 分析 csv",
    "spotify export to excel",
    "spotify 私人播放清單 匯出",
    "Spotify",
    "CSV",
    "Excel",
    "備份",
    "轉移",
    "Apple Music",
    "YouTube Music",
    "喜歡的歌曲",
    "Liked Songs",
    "音樂分析",
  ],
  authors: [{ name: "Spotify Playlist Exporter", url: SITE_URL }],
  creator: "Spotify Playlist Exporter",
  openGraph: {
    title: "免費 Spotify 播放清單匯出 CSV 工具 | 備份歌單轉 Apple Music",
    description: "支援匯出喜歡的歌曲、私人播放清單到 CSV/Excel，免費無廣告，可轉移 Apple Music、YouTube Music。3 步驟完成備份，不儲存任何資料。",
    type: "website",
    url: SITE_URL,
    locale: "zh_TW",
    alternateLocale: ["en_US"],
    siteName: "Spotify Playlist Exporter",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Spotify Playlist Exporter - 免費 Spotify 播放清單匯出 CSV 工具",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "免費 Spotify 播放清單匯出 CSV 工具",
    description: "支援匯出喜歡的歌曲、私人播放清單到 CSV/Excel，免費無廣告，可轉移 Apple Music",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Spotify Playlist Exporter",
  url: SITE_URL,
  description:
    "免費 Spotify 播放清單匯出 CSV 工具。支援匯出喜歡的歌曲、私人播放清單到 CSV/Excel，可轉移 Apple Music、YouTube Music。",
  applicationCategory: "MusicApplication",
  operatingSystem: "Web",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Export Spotify playlists to CSV",
    "Export Liked Songs",
    "Complete track metadata (artist, album, release date, duration, popularity)",
    "Migrate to Apple Music or YouTube Music",
    "No data storage, privacy-first",
  ],
  inLanguage: ["zh-TW", "en"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="zh-TW" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
        />
        {/* Google Analytics 4 */}
        {GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
