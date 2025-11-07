"use client";

import { useLanguage } from "../contexts/LanguageContext";
import Link from "next/link";

export default function TutorialPage() {
  const { t } = useLanguage();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "如何匯出 Spotify 播放清單到 CSV？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "只需 3 步驟：1. 點擊「立即登入 Spotify 匯出」並授權登入 2. 選擇要匯出的播放清單（可多選） 3. 點擊「匯出為 CSV」下載檔案。完全免費，不需要安裝任何軟體。"
        }
      },
      {
        "@type": "Question",
        "name": "可以匯出「喜歡的歌曲」嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "可以！我們的工具完整支援匯出 Spotify「喜歡的歌曲」（Liked Songs），它會顯示在播放清單列表的最上方，選擇後即可匯出。"
        }
      },
      {
        "@type": "Question",
        "name": "匯出的 CSV 可以轉移到 Apple Music 嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "可以！匯出的 CSV 包含完整的歌曲資訊（歌名、藝人、專輯），您可以使用第三方工具（如 SongShift、TuneMyMusic）將 CSV 資料匯入 Apple Music 或 YouTube Music。"
        }
      },
      {
        "@type": "Question",
        "name": "這個工具是免費的嗎？需要付費嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "完全免費！無廣告、無次數限制、無隱藏費用。這是一個開源專案，所有功能永久免費使用。"
        }
      },
      {
        "@type": "Question",
        "name": "我的資料安全嗎？會被儲存嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "絕對安全！我們不儲存任何您的資料。所有匯出處理都在您的瀏覽器中即時完成，資料不會傳送到我們的伺服器。我們只使用 Spotify 官方 OAuth 授權，不會取得您的帳號密碼。"
        }
      },
      {
        "@type": "Question",
        "name": "匯出的 CSV 包含哪些資訊？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CSV 包含完整的曲目資訊：播放清單名稱、擁有者、歌曲名稱、藝人、專輯、發行日期、時長、熱門度、是否為清晰內容、加入日期、Spotify URI 等 14 個欄位。"
        }
      },
      {
        "@type": "Question",
        "name": "可以一次匯出所有播放清單嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "可以！在播放清單列表頁面，點擊「全選」按鈕即可選擇所有播放清單，然後點擊「匯出為 CSV」就能一次下載所有歌單資料。"
        }
      },
      {
        "@type": "Question",
        "name": "匯出後的 CSV 可以用 Excel 開啟嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "可以！CSV 格式與 Excel 完全相容，您可以直接用 Microsoft Excel、Google Sheets、Numbers 或任何試算表軟體開啟和編輯。"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        {/* Header */}
        <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-4"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回首頁
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
              Spotify 播放清單匯出教學
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              3 步驟快速備份你的 Spotify 歌單到 CSV / Excel
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-12">
          {/* Quick Start */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              快速開始：3 步驟完成匯出
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-400 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                      登入 Spotify 帳號
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-3">
                      點擊首頁的「立即登入 Spotify 匯出」按鈕，使用您的 Spotify 帳號授權登入。我們使用 Spotify 官方 OAuth 2.0，不會取得您的密碼。
                    </p>
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm text-zinc-600 dark:text-zinc-400">
                      💡 <strong>提示：</strong>授權過程完全安全，我們只會讀取您的播放清單資訊，不會進行任何修改。
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                      選擇要匯出的播放清單
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-3">
                      登入後會看到所有播放清單（包含「喜歡的歌曲」）。點擊播放清單卡片選擇，或使用「全選」按鈕一次選擇全部。
                    </p>
                    <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>支援多選：可以同時選擇多個播放清單一起匯出</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>搜尋功能：可以快速找到特定的播放清單</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>排序選項：可按名稱或曲目數量排序</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-400 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                      點擊「匯出為 CSV」下載
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-3">
                      選擇完成後，點擊頁面底部的「匯出為 CSV」按鈕。CSV 檔案會自動下載到您的電腦，可以用 Excel、Google Sheets 等軟體開啟。
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm text-green-800 dark:text-green-200">
                      ✅ <strong>完成！</strong>您的播放清單資料已成功匯出，可以用於備份、分析或轉移到其他音樂平台。
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
              常見使用情境
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  備份重要歌單
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  定期匯出播放清單，避免因帳號問題或歌曲下架而遺失精心整理的歌單。CSV 檔案可永久保存在您的電腦或雲端。
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  轉移到 Apple Music
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  想換到 Apple Music 或 YouTube Music？匯出 CSV 後，使用 SongShift、TuneMyMusic 等第三方工具即可快速轉移歌單。
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  分析聽歌習慣
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  用 Excel 或 Python 分析您的音樂品味：最常聽的藝人、專輯發行年份分布、歌曲時長統計等，深入了解自己的聽歌偏好。
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  製作歌單清單
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  將播放清單轉成表格格式，方便分享給朋友、製作實體歌單清單，或用於活動、派對的音樂規劃。
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
              常見問題 FAQ
            </h2>
            
            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq, index) => (
                <details
                  key={index}
                  className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden group"
                >
                  <summary className="px-6 py-4 cursor-pointer list-none flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 pr-4">
                      {faq.name}
                    </h3>
                    <svg
                      className="w-5 h-5 text-zinc-500 transform group-open:rotate-180 transition-transform flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {faq.acceptedAnswer.text}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 dark:from-green-900 dark:via-green-800 dark:to-black rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              準備好匯出你的播放清單了嗎？
            </h2>
            <p className="text-green-50 mb-6 text-lg">
              完全免費、無廣告、3 步驟完成
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-green-600 font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-all hover:shadow-lg hover:scale-105 active:scale-95"
            >
              立即開始匯出
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                首頁
              </Link>
              <a
                href="https://github.com/johnku2011/spotify-playlist-export"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                GitHub
              </a>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-600">
              © 2025 Spotify Playlist Exporter. 開源專案，MIT License.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

