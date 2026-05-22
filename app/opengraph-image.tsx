import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Spotify Playlist Exporter - 免費 Spotify 播放清單匯出 CSV 工具";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #16a34a 0%, #15803d 50%, #14532d 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Logo + Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "44px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 24 24" fill="#16a34a">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </div>
          <span
            style={{ fontSize: "28px", fontWeight: "bold", color: "white" }}
          >
            Spotify Playlist Exporter
          </span>
        </div>

        {/* Main title */}
        <h1
          style={{
            fontSize: "56px",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            margin: "0 0 20px 0",
            lineHeight: 1.2,
          }}
        >
          一鍵匯出 Spotify 播放清單
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "26px",
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            margin: "0 0 48px 0",
          }}
        >
          備份歌單 · 轉移 Apple Music · 分析聽歌習慣
        </p>

        {/* Tags */}
        <div style={{ display: "flex", gap: "16px" }}>
          {["免費使用", "無廣告", "開源安全", "不限次數"].map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "100px",
                padding: "10px 24px",
                fontSize: "20px",
                color: "white",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
