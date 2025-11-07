"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import * as gtag from "@/lib/gtag";

type Language = "zh-TW" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  "zh-TW": {
    // Landing Page
    "landing.title": "一鍵匯出 Spotify 播放清單為 CSV",
    "landing.subtitle": "備份歌單 · 轉移 Apple Music / YouTube Music · 分析聽歌習慣",
    "landing.subtitle.en": "Export your Spotify playlists to CSV format with complete metadata",
    "landing.feature1.title": "支援「喜歡的歌曲」",
    "landing.feature1.desc": "所有私人、協作播放清單及「Liked Songs」完整匯出",
    "landing.feature2.title": "完整資訊",
    "landing.feature2.desc": "藝人、專輯、發行日期、時長、熱門度等詳細資料",
    "landing.feature3.title": "隱私保護",
    "landing.feature3.desc": "不儲存任何資料，匯出即時完成",
    "landing.cta": "立即登入 Spotify 匯出",
    "landing.privacy": "匯出即時完成，資料僅在你的瀏覽器處理",
    "landing.free": "免費使用",
    "landing.noAds": "無廣告",
    "landing.openSource": "開源專案",
    "landing.unlimited": "不限次數",
    
    // Header
    "header.title": "Spotify 播放清單匯出工具",
    "header.playlists": "個播放清單可用",
    "header.signOut": "登出",
    
    // Main Page
    "main.error": "錯誤",
    "main.loading": "載入中...",
    
    // Playlist List
    "playlist.search": "搜尋播放清單...",
    "playlist.sortBy": "排序方式",
    "playlist.sortBy.name": "名稱",
    "playlist.sortBy.tracks": "曲目數量",
    "playlist.sortBy.owner": "擁有者",
    "playlist.tracks": "首歌曲",
    "playlist.by": "由",
    "playlist.public": "公開",
    "playlist.private": "私人",
    "playlist.collaborative": "協作",
    "playlist.noPlaylists": "找不到播放清單",
    "playlist.noPlaylistsDesc": "請嘗試調整搜尋條件",
    
    // Export Controls
    "export.selected": "已選擇",
    "export.playlists": "個播放清單",
    "export.selectAll": "全選",
    "export.deselectAll": "取消全選",
    "export.export": "匯出為 CSV",
    "export.selectToExport": "選擇播放清單以匯出",
  },
  "en": {
    // Landing Page
    "landing.title": "Export Spotify Playlists to CSV in One Click",
    "landing.subtitle": "Backup · Migrate to Apple Music / YouTube Music · Analyze Listening Habits",
    "landing.subtitle.en": "Export your Spotify playlists to CSV format with complete metadata",
    "landing.feature1.title": "Including Liked Songs",
    "landing.feature1.desc": "Export all private, collaborative playlists and Liked Songs",
    "landing.feature2.title": "Complete Metadata",
    "landing.feature2.desc": "Artists, albums, release dates, duration, popularity, and more",
    "landing.feature3.title": "Privacy Protected",
    "landing.feature3.desc": "No data storage, exports generated instantly",
    "landing.cta": "Connect to Spotify",
    "landing.privacy": "Exports generated instantly, data processed only in your browser",
    "landing.free": "Free",
    "landing.noAds": "No Ads",
    "landing.openSource": "Open Source",
    "landing.unlimited": "Unlimited",
    
    // Header
    "header.title": "Spotify Playlist Exporter",
    "header.playlists": "playlists available",
    "header.signOut": "Sign Out",
    
    // Main Page
    "main.error": "Error",
    "main.loading": "Loading...",
    
    // Playlist List
    "playlist.search": "Search playlists...",
    "playlist.sortBy": "Sort by",
    "playlist.sortBy.name": "Name",
    "playlist.sortBy.tracks": "Track Count",
    "playlist.sortBy.owner": "Owner",
    "playlist.tracks": "tracks",
    "playlist.by": "by",
    "playlist.public": "Public",
    "playlist.private": "Private",
    "playlist.collaborative": "Collaborative",
    "playlist.noPlaylists": "No playlists found",
    "playlist.noPlaylistsDesc": "Try adjusting your search criteria",
    
    // Export Controls
    "export.selected": "Selected",
    "export.playlists": "playlists",
    "export.selectAll": "Select All",
    "export.deselectAll": "Deselect All",
    "export.export": "Export to CSV",
    "export.selectToExport": "Select playlists to export",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh-TW");

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && (savedLanguage === "zh-TW" || savedLanguage === "en")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    // Update html lang attribute
    document.documentElement.lang = lang;
    // Track language switch in GA
    gtag.trackLanguageSwitch(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

