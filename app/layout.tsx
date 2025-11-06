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

export const metadata: Metadata = {
  title: "一鍵匯出 Spotify 播放清單為 CSV | Spotify Playlist Exporter",
  description: "備份歌單、轉移 Apple Music / YouTube Music、分析聽歌習慣。支援「喜歡的歌曲」與所有私人播放清單，完整資訊包含藝人、專輯、發行日期、熱門度。免費、無廣告、不儲存任何資料。Export your Spotify playlists to CSV format with complete track metadata.",
  keywords: [
    "Spotify",
    "播放清單",
    "匯出",
    "CSV",
    "備份歌單",
    "轉移 Apple Music",
    "YouTube Music",
    "喜歡的歌曲",
    "Liked Songs",
    "playlist export",
    "音樂分析",
    "歌單備份",
  ],
  authors: [{ name: "Spotify Playlist Exporter" }],
  openGraph: {
    title: "一鍵匯出 Spotify 播放清單為 CSV",
    description: "備份歌單 · 轉移 Apple Music / YouTube Music · 分析聽歌習慣。免費、無廣告、不儲存任何資料。",
    type: "website",
    locale: "zh_TW",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "一鍵匯出 Spotify 播放清單為 CSV",
    description: "備份歌單 · 轉移 Apple Music / YouTube Music · 分析聽歌習慣",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
