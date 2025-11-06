# Spotify 播放清單匯出工具

> 繁體中文 | **[English](README.md)**

一個現代化的網頁應用程式，讓你可以將 Spotify 播放清單匯出為 CSV 格式，包含完整的曲目資訊。使用 Next.js 16、React 19 和 NextAuth.js 建構。

## 功能特色

- 🎵 **完整播放清單存取** - 匯出所有私人和協作播放清單，包括「喜歡的歌曲」
- 📊 **豐富的曲目資訊** - 藝人、專輯、發行日期、時長、熱門度等
- ✅ **選擇性匯出** - 選擇特定播放清單或一次匯出全部
- 🔍 **搜尋與排序** - 輕鬆尋找和整理播放清單
- 🎨 **現代化介面** - 精美的響應式設計，自動偵測深色/淺色主題
- 🔒 **安全驗證** - OAuth 2.0 驗證，自動更新權杖
- ⚡ **快速且可靠** - 處理大型播放清單，具備重試邏輯和速率限制

## CSV 輸出格式

匯出的 CSV 包含以下欄位：

| 欄位 | 說明 |
|------|------|
| `playlist_id` | Spotify 播放清單 ID（喜歡的歌曲為 `liked-songs`） |
| `playlist_name` | 播放清單名稱 |
| `playlist_owner` | 擁有者的顯示名稱 |
| `playlist_public` | 公開/私人狀態 |
| `track_name` | 歌曲標題 |
| `artists` | 藝人（以 ";" 分隔） |
| `album_name` | 專輯標題 |
| `album_release_date` | 發行日期 |
| `duration_ms` | 時長（毫秒） |
| `duration_min` | 時長（MM:SS 格式） |
| `explicit` | 清晰內容標記 |
| `popularity` | Spotify 熱門度分數（0-100） |
| `added_at` | 曲目加入播放清單的日期 |
| `track_uri` | Spotify 曲目 URI |

## 系統需求

- Node.js 18+ 已安裝
- pnpm 套件管理器
- Spotify 開發者帳號

## 設定步驟

### 1. 建立 Spotify 應用程式

1. 前往 [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. 點選「Create App」
3. 填寫詳細資訊：
   - **App name**：Spotify Playlist Exporter
   - **App description**：Export playlists to CSV
   - **Redirect URI**：
     - 本機開發：`http://localhost:3000/api/auth/callback/spotify`
     - 正式環境：`https://your-app.vercel.app/api/auth/callback/spotify`
   - **API/SDKs**：Web API
4. 儲存你的應用程式
5. 複製你的 **Client ID** 和 **Client Secret**

### 2. 複製專案並安裝套件

```bash
# 複製儲存庫
git clone <your-repo-url>
cd spotify-playlist-export

# 安裝相依套件
pnpm install
```

### 3. 設定環境變數

在根目錄建立 `.env.local` 檔案：

```bash
# 複製範例檔案
cp .env.example .env.local
```

編輯 `.env.local` 並加入你的憑證：

```env
# Spotify API 憑證
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here

# NextAuth 設定
# 使用以下指令產生：openssl rand -base64 32
NEXTAUTH_SECRET=your_generated_secret_here

# NextAuth URL
NEXTAUTH_URL=http://localhost:3000
```

產生安全的 `NEXTAUTH_SECRET`：

```bash
openssl rand -base64 32
```

### 4. 執行開發伺服器

在本機使用 HTTPS 執行應用程式（建議用於 Spotify OAuth）：

```bash
pnpm dev
```

如果遇到 HTTPS 設定問題，可以不使用 SSL 執行：

```bash
pnpm dev:no-ssl
```

應用程式將在 `https://localhost:3000`（或 `dev:no-ssl` 時為 `http://localhost:3000`）上執行。

### 5. 部署到 Vercel

1. **連結你的 Git 儲存庫**到 Vercel。
2. 在 Vercel 專案設定中**新增環境變數**：
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `NEXTAUTH_SECRET`（為正式環境產生新的）
   - `NEXTAUTH_URL`（例如：`https://your-app.vercel.app`）
   - `AUTH_TRUST_HOST`（設定為 `true`）
3. 確保 Spotify Developer Dashboard 中的 **Redirect URI** 與你的 Vercel 部署網址一致：`https://your-app.vercel.app/api/auth/callback/spotify`
4. 開始部署！

## 貢獻

歡迎貢獻！請隨時開啟 issue 或提交 pull request。

## 授權

本專案採用 MIT 授權條款。詳見 [LICENSE](LICENSE) 檔案。

