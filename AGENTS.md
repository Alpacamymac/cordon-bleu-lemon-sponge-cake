# AGENTS.md — 藍帶檸檬海綿蛋糕互動網頁小遊戲 (Le Cordon Bleu Lemon Sponge Cake Challenge)

> **給 AI 開發助手的核心指令 (Core Directive for AI Agents)：**
> 在對本專案進行任何新增、修改或重構之前，請務必完整閱讀本文件。本文件定義了專案的核心目標、視覺風格、狀態機流程、資料結構、檔案命名規範與結局判定邏輯。你的任務是在**不破壞既有遊戲流程與型別安全**的前提下，協助開發者持續擴充與完善這個烘焙模擬遊戲。

---

## 1. 專案目的 (Project Purpose)

本專案為大學期末專題，旨在打造一款結合**法式藍帶廚藝學院（Le Cordon Bleu）烘焙科學**與**多重結局體驗**的互動式網頁小遊戲。

### 核心玩法與教學目標
1. **食譜份量換算陷阱**：開局提供一份標準的「**10人份**藍帶檸檬海綿蛋糕食譜」，但讓玩家自訂想製作的「目標人數（例如 1 人份或 2 人份）」，考驗玩家是否細心在電子秤階段自行將原料等比例換算。
2. **步驟式烘焙小遊戲**：將食譜拆解為直覺的線性互動關卡（精準秤重 ➔ 融化奶油與全蛋打發 ➔ 檸檬汁與粉類過篩拌合 ➔ 模具鋪紙與抹平 ➔ 烤箱預熱與溫控烘烤）。
3. **科學化多重結局與診斷**：根據玩家在各步驟的操作數據（秤重誤差、打發升溫速度、麵粉種類與攪拌次數、烤盤平整度、烤箱預熱與溫度控制），在出爐時揭曉 **6 種主結局畫面**，並提供**「全步驟藍帶主廚科學診斷報告」**，讓玩家理解每個失誤背後的烘焙物理與化學原理。

---

## 2. 技術棧與環境規範 (Tech Stack)

- **核心框架**：React 18+ (Vite)
- **程式語言**：TypeScript (`.ts`, `.tsx`) — 嚴格啟用型別檢查，確保跨步驟傳遞的遊戲狀態不會出錯。
- **樣式工具**：Tailwind CSS（搭配少量必要的自訂 CSS Keyframes 動畫，如攪拌旋轉、蛋糕膨脹、溫度計上升）。
- **圖示與視覺**：`lucide-react` 圖示庫 + **模組化自製 SVG 動態元件**（優先以 SVG 呈現麵糊狀態與 6 種蛋糕結局，並保留替換為 `public/assets/` 實體圖片的彈性）。
- **音效系統**：**Web Audio API 合成音效類別 (`soundEffects.ts`)** 為預設方案（確保零外部音檔依賴也能正常發聲），同時支援擴充讀取 `public/assets/sounds/` 下的 `.mp3` 檔案。

---

## 3. 網頁整體風格與 UI/UX 規範 (Visual & Audio Style)

### 視覺調性：「法式藍帶學院 × 溫馨手作烘焙坊」
- **主色調 (Primary Palette)**：
  - **藍帶海軍藍 (Cordon Bleu Navy)**：`slate-800` / `blue-950`（用於標題、主廚診斷框、專業食譜邊框，營造法式學院權威感）。
  - **檸檬奶油黃 (Lemon Cream)**：`amber-50` / `yellow-100` / `yellow-400`（用於背景、檸檬海綿蛋糕主視覺、高亮提示）。
  - **烘焙焦糖棕 (Baked Caramel)**：`amber-700` / `orange-800`（用於烘烤階段、按鈕邊框與溫暖點綴）。
- **介面佈局原則**：
  - 採用**「無捲動或極少捲動的單一工作台卡片 (Workbench Card)」**設計，畫面中央為當下步驟的互動操作區（如電子秤、攪拌盆、烤箱面板）。
  - 頂部導覽列固定顯示：**目前步驟進度條**、**目標製作人數提示バッジ**、**查看 10 人份原版食譜按鈕（Modal 彈窗）**、**音效靜音開關**、以及**期末 Demo 開發者快速測試選單**。
- **文字與語言**：
  - 所有 UI 介面文字、主廚提示、結局診斷報告與程式碼註解，一律使用**繁體中文 (Traditional Chinese, `zh-TW`)**。
  - 食譜專有名詞可保留中英對照（例如：`無鹽奶油 (Unsalted Butter)`、`泡打粉 (Baking Powder)`）。

---

## 4. 頁面結構與遊戲流程 (Page Structure & State Machine)

本專案**不使用**複雜的多頁面路由（React Router），而是採用**單一狀態機 (`GameStage`)** 控制畫面切換，確保玩家的「目標人數」、「實際秤重數值」與「各步驟操作紀錄」完整保存在頂層狀態中。

### 四大核心階段 (`GameStage`)

1. **`STAGE_1_RECIPE_INTRO`（閱讀食譜與設定人數）**
   - 展示藍帶「10人份檸檬海綿蛋糕」標準食譜卡片與四大完美蛋糕秘訣。
   - 玩家選擇本次要製作的**目標人數 (`targetServings`，預設可選 1、2、5、10 人份)**。
   - 點擊「進入烘焙工作台」開始遊戲。

2. **`STAGE_2_WEIGHING`（電子秤精準測重階段）**
   - 依序或自由切換 7 種標準食材進行秤重：
     1. 奶油 (`170g` / 10人份)
     2. 雞蛋 (`3個 = 150g` / 10人份)
     3. 白糖 (`165g` / 10人份)
     4. 碎檸檬皮 (`1個 ≈ 10g` / 10人份)
     5. 檸檬汁 (`50ml` / 10人份)
     6. 麵粉 (`170g` / 10人份) — **需額外選擇麵粉筋度（低筋/中筋/高筋）**
     7. 泡打粉 (`½茶匙 = 3g` / 10人份)
   - 提供滑桿與微調按鈕（`+0.1` / `+1` / `+10`），支援「歸零 (Tare)」動畫與嗶嗶音效。
   - *關鍵機制*：此階段**不直接告訴玩家換算後的標準答案**（除非開啟 Demo 輔助模式），測試玩家是否記得除以目標人數比例。

3. **`STAGE_3_MIXING_AND_BAKING`（製作與烘烤互動小遊戲階段）**
   採用線性子步驟 (`SubStep`) 自動順下去：
   - **Step 3-1 融化奶油**：控制加熱溫度，將奶油融化至「溫熱液態」（避免過熱焦化或未融化）。
   - **Step 3-2 打發全蛋、糖與檸檬皮**：按住或點擊攪拌器，將混合物打發至「顏色變淡、柔軟細膩」，同時監控**蛋液升溫速度**（升溫太快會觸發乾硬失敗因子）。
   - **Step 3-3 加入檸檬汁、過篩麵粉與泡打粉並拌合**：包含「點擊過篩網」與「切拌麵糊」小遊戲（未過篩或**過度混合**會觸發表面裂開因子）。
   - **Step 3-4 拌入溫熱奶油與倒入樹根蛋糕模具**：鋪上烘焙紙，並透過刮刀滑桿將**烤盤表面抹平**（未抹平會觸發形狀不均因子）。
   - **Step 3-5 烤箱預熱與溫控烘烤**：設定是否**預熱至 180°C**、調整**烘烤溫度**（標準 180°C）與**烘烤時間**（標準 25–30 分鐘）。

4. **`STAGE_4_RESULT`（出爐結局與藍帶主廚科學診斷）**
   - 揭曉對應的**主結局插畫、徽章與故事描述**。
   - 下方列出**「全步驟科學診斷報告 (Detailed Chef Report)」**：逐一比對玩家在「食材比例、麵粉選擇、打發控溫、麵糊拌合、烤盤平整度、烤箱溫控」的表現，標示 ✅ 完美 或 ⚠️ 失誤原因。
   - 提供「重新挑戰」與「切換查看其他結局（期末 Demo 專用）」按鈕。

---

## 5. 檔案命名與目錄結構規範 (File Naming & Directory Structure)

當你需要將單一原型檔案拆分為完整專案，或在現有專案中新增功能時，請嚴格遵守以下目錄結構與命名規則：

```text
src/
├── assets/                   # 靜態圖檔或 SVG 素材 (kebab-case，如 lemon-cake.svg)
├── components/               # UI 元件 (PascalCase)
│   ├── common/               # 共用基礎元件
│   │   ├── TopNavbar.tsx     # 頂部進度列、食譜彈窗開關、音效與 Demo 選單
│   │   ├── RecipeModal.tsx   # 隨時可查看的 10 人份標準食譜彈窗
│   │   └── ChefTipBox.tsx    # 藍帶主廚小叮嚀提示框
│   ├── stages/               # 四大主階段畫面元件
│   │   ├── RecipeIntroStage.tsx
│   │   ├── WeighingStage.tsx
│   │   ├── MixingBakingStage.tsx
│   │   └── ResultStage.tsx
│   ├── minigames/            # Step 3 內部的各個互動小遊戲子元件
│   │   ├── ButterMeltGame.tsx
│   │   ├── EggWhiskGame.tsx
│   │   ├── FlourSiftFoldGame.tsx
│   │   ├── PanLevelingGame.tsx
│   │   └── OvenControlGame.tsx
│   └── illustrations/        # 動態 SVG 視覺元件
│       ├── EndingCakeSvg.tsx # 6 種結局的專屬蛋糕 SVG 插畫
│       └── BowlVisualSvg.tsx # 鋼盆內麵糊顏色與質地動態變化
├── constants/                # 靜態常數與食譜設定檔 (camelCase)
│   ├── recipeData.ts         # 10人份標準食譜數據與誤差容許值
│   └── endingsData.ts        # 6 種結局的標題、描述與科學解析文案
├── types/                    # TypeScript 型別定義檔
│   └── game.types.ts         # 所有 State、Ingredient、Ending 的 interface
├── utils/                    # 純函式邏輯與工具 (camelCase)
│   ├── evaluateEnding.ts     # 核心結局判定與科學診斷計算函式
│   └── soundEffects.ts       # Web Audio API 音效合成器
├── App.tsx                   # 頂層狀態管理與階段切換器
└── main.tsx                  # React 進入點
```

### 命名規則總結
- **React 元件 (`.tsx`)**：一律使用 `PascalCase`（例如 `WeighingStage.tsx`）。
- **工具函式、常數檔 (`.ts`)**：一律使用 `camelCase`（例如 `evaluateEnding.ts`、`recipeData.ts`）。
- **型別與介面 (`interface` / `type`)**：一律使用 `PascalCase`（例如 `IngredientConfig`、`PlayerOperationState`）。
- **常數變數**：全域固定常數使用 `UPPER_SNAKE_CASE`（例如 `STANDARD_RECIPE_SERVINGS = 10`）。

---

## 6. 資料格式與結局判定規範 (Data Schemas & Evaluation Rules)

AI 在新增或修改食譜、小遊戲步驟或結局時，必須遵守以下 TypeScript 結構與判定邏輯：

### 6.1 標準 10 人份食譜基準值 (`STANDARD_RECIPE_SERVINGS = 10`)

| 食材 ID (`id`) | 中文名稱 (`name`) | 10人份基準量 (`baseAmount`) | 單位 (`unit`) | 1人份正確換算值 | 容許誤差範圍 (`tolerance`) |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `butter` | 黃油 / 無鹽奶油 | `170` | `g` | `17g` | `±10%` |
| `eggs` | 雞蛋（3個） | `150` | `g` | `15g` | `±10%` |
| `sugar` | 白糖 | `165` | `g` | `16.5g` | `±10%` |
| `lemonZest` | 碎檸檬皮（1個） | `10` | `g` | `1g` | `±20%` |
| `lemonJuice` | 檸檬汁 | `50` | `ml` | `5ml` | `±15%` |
| `flour` | 低筋麵粉 | `170` | `g` | `17g` | `±10%` |
| `bakingPowder`| 泡打粉（½茶匙） | `3` | `g` | `0.3g` | `±20%` |

### 6.2 六大結局與判定條件 (`EndingId`)

`evaluateEnding.ts` 必須同時回傳 **`primaryEnding`（單一主結局，依下方優先順序判定）** 以及 **`diagnostics`（全步驟診斷陣列，列出所有成功與失誤細節）**：

1. **`piggy`（吃成豬豬 — 最高優先級搞笑結局）**
   - **觸發條件**：玩家選擇的 `targetServings < 10`（例如選 1 人份），但有 3 種以上的主要原料（奶油、雞蛋、白糖、麵粉）實際秤重數值落在「10人份原始數值（`baseAmount ± 20%`）」區間。代表玩家完全沒做加減換算就直接照抄食譜！
2. **`cracked`（表面裂開）**
   - **觸發條件**：以下任一失誤發生且權重最高時：
     - 麵粉秤重超過目標換算值的 `+20%`（**麵粉太多**）
     - 麵粉種類選錯成中筋或高筋麵粉（**麵粉不對**）
     - 拌合麵糊時攪拌次數超標（**麵糊過度混合**）
     - 烤箱溫度設定高於 `195°C`（**烤箱溫度太高**）
3. **`darkEdges`（蛋糕邊緣太黑）**
   - **觸發條件**：
     - 白糖秤重超過目標換算值的 `+20%`（**使用太多糖**）
     - 或 烤箱溫度設定高於 `195°C`（**烤箱溫度太高**）
4. **`denseDry`（蛋糕過於扎實和偏乾）**
   - **觸發條件**：
     - 白糖秤重超過目標換算值的 `+20%`（**太多糖**）
     - 或 打發全蛋時加熱/升溫速度過快（**蛋升溫太快**）
     - 或 烤箱溫度設定低於 `165°C`（**烤箱溫度太低**）
5. **`uneven`（形狀不均）**
   - **觸發條件**：
     - 麵糊倒入樹根蛋糕模具後未抹平（**烤盤不平**）
     - 或 烤箱未預熱至 `180°C` / 烘烤時間偏離 `25–30 分鐘` 太多（**烤箱溫度沒控制好**）
6. **`perfect`（做得超棒 — 藍帶完美檸檬海綿蛋糕）**
   - **觸發條件**：未觸發上述任何失誤條件，所有原料皆依目標人數正確換算（誤差在容許範圍內），且製作與烘烤小遊戲皆在標準綠燈區間完成。

> **💡 複合失誤權重計算規則**：
> 若玩家未觸發 `piggy`，但同時觸發了多個失敗結局（例如「既放太多糖、又沒把烤盤抹平」），請為每個失敗結局計算失誤嚴重度分數（`severityScore`），挑選分數最高者作為畫面中央的 `primaryEnding`，並將其餘失誤完整保留在下方的 `diagnostics` 診斷報告中，確保所有操作都有明確回饋。

---

## 7. AI 修改或新增內容時必須遵守的規則 (Strict Rules for AI)

1. **資料與 UI 邏輯分離 (Separation of Concerns)**：
   - 當新增或修改食譜數值、提示文字或結局文案時，**只應修改 `constants/` 下的資料檔**，不可將長篇文字硬編碼（Hardcode）在 JSX 元件深處。
2. **保留「期末報告 Demo 輔助模式」**：
   - 任何對 UI 或狀態機的修改，都必須保留右上角的「**Demo 輔助選單（包含：一鍵自動填入正確換算克數、一鍵預覽 6 種結局）**」，方便開發者在課堂發表時快速展示所有遊戲分支。
3. **保護音效與互動體驗**：
   - 修改按鈕、滑桿、過篩、攪拌與烤箱計時器時，請保留 `sfx` 音效觸發呼叫，並確保在瀏覽器阻擋自動播放時有 `try / catch` 保護，絕不可因音效錯誤導致畫面崩潰（White Screen of Death）。
4. **禁止擅自引入肥大依賴**：
   - 除非開發者明確要求，否則**禁止自行新增** Redux、Three.js、複雜物理引擎或需要後端伺服器的套件。所有動畫與遊戲機制應優先以 React State + Tailwind CSS + SVG 實作。
5. **漸進式擴充原則 (How to Continue Development)**：
   - 如果開發者要求「新增一個烘焙步驟（例如：製作檸檬糖漿或塗抹檸檬奶醬捲起樹幹蛋糕）」，請務必依循第 8 節的「功能擴充連動改動表」與第 9 節的「標準小遊戲規格範本」循序實作。

---

## 8. 功能擴充連動改動表 (Change Dependency Map)

為避免未來 AI 開發者在新增功能時產生遺漏或型別中斷，進行任何功能擴充前，**必須同時檢視並更新下列指定檔案**：

| 擴充任務類型 | 必須同步更新的檔案清單 (Checklist) | 具體更新內容 |
| :--- | :--- | :--- |
| **新增 1 款烘焙子步驟小遊戲** | 1. `src/types/game.types.ts`<br>2. `src/components/minigames/XxxGame.tsx`<br>3. `src/components/stages/MixingBakingStage.tsx`<br>4. `src/components/common/TopNavbar.tsx`<br>5. `src/utils/evaluateEnding.ts` | 1. 擴充 `SubStep` 列舉與 `PlayerMinigameState` 欄位。<br>2. 依標準範本建立獨立小遊戲元件。<br>3. 在步驟容器中註冊並串聯前進流程。<br>4. 在 `getSubStepText()` 增加步驟標籤與繁中名稱。<br>5. 增加該步驟的科學物理化學診斷與扣分/加權邏輯。 |
| **新增 1 項食材原料** | 1. `src/types/game.types.ts`<br>2. `src/constants/recipeData.ts`<br>3. `src/components/stages/WeighingStage.tsx`<br>4. `src/utils/evaluateEnding.ts` | 1. 擴充 `IngredientId` 與 `PlayerWeighingState`。<br>2. 設定 10 人份基準量、單位、容許誤差百分比與主廚說明。<br>3. 確認電子秤切換清單能正常顯示。<br>4. 加入該食材過量/不足的科學原理解析與結局影響。 |
| **新增第 7 種以上結局** | 1. `src/types/game.types.ts`<br>2. `src/constants/endingsData.ts`<br>3. `src/components/illustrations/EndingCakeSvg.tsx`<br>4. `src/utils/evaluateEnding.ts`<br>5. `src/components/common/TopNavbar.tsx`<br>6. `src/components/stages/ResultStage.tsx` | 1. 擴充 `EndingId` 列舉。<br>2. 撰寫繁體中文標題、副標、徽章、主廚語錄與科學診斷。<br>3. 繪製專屬的高解析向量 SVG 蛋糕圖示。<br>4. 設定觸發門檻與複合嚴重度分數 (`severityScore`)。<br>5. 在頂部 Demo 快速選單與底部預覽列新增跳轉按鈕。 |
| **串接大型語言模型 (LLM)** | 1. `src/types/game.types.ts`<br>2. `src/components/chat/ChefChatBox.tsx`<br>3. `src/services/llmService.ts`<br>4. `src/App.tsx` | 1. 定義對話訊息介面與烘焙上下文資料結構。<br>2. 建立支援即時提問與材料建議的對話抽屜或懸浮卡片。<br>3. 實作 API 呼叫（支援串流輸出與 Prompt 注入當前烘焙狀態）。<br>4. 整合全域狀態，讓 LLM 能讀取當前秤重與烘烤參數。 |

---

## 9. 小遊戲標準元件規格與範本 (Minigame Interface Contract)

所有位於 `src/components/minigames/` 的子遊戲元件，必須嚴格遵守以下標準結構與介面契約：

### 9.1 標準介面定義 (Standard Minigame Props)
```typescript
interface StandardMinigameProps<T> {
  initialValue?: T;
  onComplete: (resultData: T) => void;
}
```

### 9.2 必備四大視覺與結構區塊
1. **頂部標題與說明 (Header)**：明確標示步驟編號、法式專業術語與操作目標（如：`Step 3-X 標題 (Term)`）。
2. **中央互動工作台 (Interactive Stage)**：
   - 採左右分割（桌面版）或上下排列（行動版），一側為動態 SVG / 視覺反饋，另一側為數值滑桿或點擊互動按鈕。
   - 所有數值變化必須有明確的顏色反饋（綠色：理想區間；黃色：偏差；紅色：危險/失誤）。
3. **藍帶主廚科學叮嚀框 (`ChefTipBox`)**：
   - 必須使用共用元件 `<ChefTipBox type="science" | "warning" tip="..." />`，清楚說明該步驟背後的物理化學原理（如蛋白質凝固溫度、乳化條件、梅納反應）。
4. **下一步確認按鈕 (Action Button)**：
   - 固定置於右下方，點擊時觸發 `sfx.playSuccess()`，並回傳操作數值至 `onComplete`。

---

## 10. 素材與視覺擴充規範 (Asset Specifications)

1. **向量 SVG 規範**：
   - 所有動態插畫優先採用向量 SVG 呈現（例如 `EndingCakeSvg.tsx`、`BowlVisualSvg.tsx`）。
   - 架構圖或高解析靜態圖表應具備完整 `viewBox`，字體預設使用 `system-ui, -apple-system, sans-serif`，確保在 2K/4K 螢幕上維持清晰銳利不失真。
2. **實體圖檔替換規範（保留擴充）**：
   - 若未來需將向量蛋糕替換為實體圖片，圖檔一律存放於 `public/assets/images/`。
   - 命名格式：`ending-[endingId].webp`（建議尺寸 1024×1024，WebP 格式壓縮率佳且支援透明通道）。
3. **音效合成與音訊規範**：
   - 預設優先使用 `src/utils/soundEffects.ts` 內建的純原生 Web Audio API 合成音效（零外掛依賴）。
   - 若未來擴充實體音效，檔案一律存放於 `public/assets/sounds/`，命名採 `kebab-case.mp3`，且程式碼內讀取音訊必須完整包覆在 `try / catch` 中，並提供靜音開關。

---

## 11. AI 交付前自檢驗收清單 (Pre-Delivery Verification Checklist)

AI 在完成任何新增或修改並回覆開發者之前，**必須強制依序執行以下自我檢查**：

- [ ] **1. 編譯與型別檢查**：在終端機執行 `npm run build`，確認 `tsc && vite build` 順利通過，零 TypeScript 錯誤或警告。
- [ ] **2. 期末 Demo 模式相容性**：確認頂部導覽列的「Demo 輔助選單」依然存在且功能完整（一鍵填入換算值、一鍵預覽所有結局無崩潰）。
- [ ] **3. 音效播放安全**：確認所有按鈕與滑桿的音效觸發皆有安全容錯，在瀏覽器靜音或尚未與頁面互動時不會拋出 Uncaught Error 導致畫面空白。
- [ ] **4. 語言與詞彙一致性**：所有 UI 文字、結局名稱與診斷文案一律使用標準**繁體中文 (`zh-TW`)**，專有名詞維持正確中英對照。
- [ ] **5. 開局無劇透原則**：確認 Stage 1 食譜閱讀頁面依然維持自然專業的介紹，不得主動劇透或警告份量除算陷阱，保留玩家自主探索的驚喜感。