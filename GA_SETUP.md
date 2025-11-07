# Google Analytics 4 (GA4) 設定說明

## 取得 GA4 Measurement ID

1. 前往 [Google Analytics](https://analytics.google.com)
2. 建立新的 GA4 資源（Property）
3. 在「管理」→「資料串流」中找到你的 Measurement ID
4. 格式為：`G-XXXXXXXXXX`

## 本地開發設定

在 `.env.local` 檔案中添加：

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Vercel 部署設定

在 Vercel 專案設定中新增環境變數：

- **Key**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- **Value**: `G-XXXXXXXXXX`（你的實際 Measurement ID）

## 已實作的 GA4 事件追蹤

### 1. 自動頁面瀏覽追蹤
- 所有頁面瀏覽都會自動記錄

### 2. 使用者互動事件

| 事件名稱 | 觸發時機 | 類別 | 說明 |
|---------|---------|------|------|
| `click_connect_spotify` | 點擊「登入 Spotify」按鈕 | engagement | 追蹤登入轉換率 |
| `download_csv` | 成功下載 CSV 檔案 | conversion | 追蹤匯出成功次數及選擇的播放清單數量 |
| `switch_language` | 切換語言 | engagement | 追蹤語言偏好 |
| `view_tutorial` | 瀏覽教學頁面 | engagement | 追蹤使用者學習意願 |
| `select_playlist` | 選擇播放清單 | engagement | 追蹤使用者行為 |
| `search_playlist` | 搜尋播放清單 | engagement | 追蹤搜尋使用率 |

### 3. 轉換追蹤

**主要轉換目標：`download_csv` 事件**

- **event_category**: `conversion`
- **event_label**: `CSV Export`
- **value**: 選擇的播放清單數量

建議在 GA4 中將此事件標記為「關鍵事件」（Key Event）以追蹤轉換率。

## 在 GA4 中查看數據

1. **即時報表**：管理 → 即時，查看當前使用者活動
2. **事件報表**：報表 → 參與 → 事件，查看所有追蹤事件
3. **轉換報表**：報表 → 參與 → 轉換，查看轉換事件

## 設定 GA4 轉換目標

1. 在 GA4 中，前往「管理」→「事件」
2. 找到 `download_csv` 事件
3. 點擊「標記為轉換」
4. 現在可以在「轉換」報表中追蹤 CSV 下載數

## 測試 GA4 是否正常運作

1. 在本地開發環境或 Vercel 上開啟網站
2. 打開瀏覽器的開發者工具（F12）
3. 切換到「Network」分頁
4. 過濾 `google-analytics.com` 或 `gtag`
5. 執行操作（如點擊登入按鈕）
6. 應該會看到向 GA 發送的請求
7. 前往 GA4 的「即時」報表確認事件是否記錄

## 隱私權注意事項

- GA4 追蹤碼僅在環境變數設定後才會載入
- 符合 GDPR/CCPA 規範
- 不追蹤個人身份資訊（PII）
- 建議在隱私權政策中說明使用 Google Analytics

## 進階：自訂維度與指標

若要追蹤更多自訂資料，可在 `lib/gtag.ts` 中新增事件函數：

```typescript
export const trackCustomEvent = (eventName: string, params: Record<string, any>) => {
  event({
    action: eventName,
    category: 'custom',
    ...params,
  });
};
```

## 疑難排解

**問題：GA4 沒有收到資料**

- 確認 `NEXT_PUBLIC_GA_MEASUREMENT_ID` 環境變數已設定
- 檢查瀏覽器是否封鎖了 Google Analytics（廣告封鎖器）
- 在開發者工具的 Console 中檢查是否有 JavaScript 錯誤
- 等待 24-48 小時，GA4 資料有時需要時間處理

**問題：事件沒有顯示在報表中**

- 事件可能需要幾小時才會出現在標準報表
- 使用「即時」報表可立即查看事件
- 檢查事件名稱是否正確（區分大小寫）

