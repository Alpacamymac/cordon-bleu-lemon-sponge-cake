# 藍帶檸檬海綿蛋糕互動網頁小遊戲 (Le Cordon Bleu Lemon Sponge Cake Challenge) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 打造一款結合「法式藍帶廚藝學院烘焙科學」與「多重結局體驗」的 React + TypeScript + Tailwind CSS 單頁互動網頁小遊戲。

**Architecture:** 單一狀態機 (`GameStage`) 控制四大主階段流轉（Intro ➔ Weighing ➔ Mixing & Baking 5 個子小遊戲 ➔ Result 診斷），頂層管理玩家目標人數與操作數值；以純原生 Web Audio API 合成無外掛依賴音效，以模組化向量 SVG 渲染麵糊與 6 大結局蛋糕。

**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS, Lucide React, Web Audio API

**Spec:** [AGENTS.md](file:///Users/alpaca/Desktop/生成是ai/期末專案/AGENTS.md)

## Global Constraints
- 所有 UI 介面、主廚提示、結局診斷報告與程式碼註解一律使用繁體中文 (`zh-TW`)。
- 嚴格遵守資料與 UI 邏輯分離（食譜數值與文案統一存放於 `constants/`）。
- 嚴格保留頂部導覽列的「期末 Demo 輔助模式」（一鍵填入正確值、一鍵切換預覽 6 種結局）。
- 零外部音效檔與肥大物理引擎依賴（音效由 Web Audio API 即時合成，且必須有 `try / catch` 保護）。
- 開局 Stage 1 不得透露「份量換算陷阱」，讓玩家自行嘗試與探索。

---

### Task 1: 專案基礎腳手架與環境配置 (Scaffolding & Setup)

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `src/index.css`
- Create: `src/main.tsx`
- Create: `src/App.tsx`

**Interfaces:**
- Produces: 可編譯執行的 React 18 + TypeScript + Tailwind CSS 開發與打包環境

- [x] **Step 1: 建立 package.json 並安裝依賴項**
- [x] **Step 2: 建立 Vite、TypeScript 與 PostCSS 設定檔**
- [x] **Step 3: 設定 Tailwind CSS 配置檔與藍帶主題色票、自訂關鍵影格動畫**
- [x] **Step 4: 建立 index.html、src/index.css、src/main.tsx 與基礎 App.tsx**
- [x] **Step 5: 執行 `npm install` 與 `npm run build` 驗證編譯通過**

---

### Task 2: 資料模型、常數資料庫、音效合成與評判核心 (Core Engine)

**Files:**
- Create: `src/types/game.types.ts`
- Create: `src/constants/recipeData.ts`
- Create: `src/constants/endingsData.ts`
- Create: `src/utils/soundEffects.ts`
- Create: `src/utils/evaluateEnding.ts`

**Interfaces:**
- Consumes: None
- Produces: `GameStage`, `SubStep`, `IngredientConfig`, `PlayerWeighingState`, `PlayerMinigameState`, `EndingId`, `STANDARD_RECIPE`, `ENDINGS_CONFIG`, `soundEffects` (SFX manager), `evaluateEnding(weighing, minigames, targetServings)`

- [x] **Step 1: 定義 TypeScript 遊戲型別 (game.types.ts)**
- [x] **Step 2: 建立 10 人份標準食譜常數與容許誤差 (recipeData.ts)**
- [x] **Step 3: 建立 6 種結局文案與科學解析常數 (endingsData.ts)**
- [x] **Step 4: 實作純原生 Web Audio API 音效合成器 (soundEffects.ts)**
- [x] **Step 5: 實作多重結局評判演算法與全步驟科學診斷報告生成 (evaluateEnding.ts)**
- [x] **Step 6: 建立並執行驗證腳本，測試 6 種結局判定正確性**

---

### Task 3: 頂部導覽、共用彈窗與動態 SVG 視覺元件 (Common & Visuals)

**Files:**
- Create: `src/components/common/TopNavbar.tsx`
- Create: `src/components/common/RecipeModal.tsx`
- Create: `src/components/common/ChefTipBox.tsx`
- Create: `src/components/illustrations/EndingCakeSvg.tsx`
- Create: `src/components/illustrations/BowlVisualSvg.tsx`

**Interfaces:**
- Consumes: `game.types.ts`, `recipeData.ts`, `endingsData.ts`, `soundEffects.ts`
- Produces: 頂部狀態與 Demo 快捷列、食譜 Modal、主廚叮嚀框、6 款蛋糕向量繪圖、動態攪拌盆繪圖

- [x] **Step 1: 實作頂部導覽列 TopNavbar（含進度條、人數標籤、原版食譜開關、靜音按鈕、Demo 快捷選單）**
- [x] **Step 2: 實作 10 人份標準食譜 Modal (RecipeModal)**
- [x] **Step 3: 實作藍帶主廚科學提示框 (ChefTipBox)**
- [x] **Step 4: 實作 6 款結局專屬蛋糕 SVG 插畫元件 (EndingCakeSvg)**
- [x] **Step 5: 實作動態鋼盆麵糊狀態 SVG 元件 (BowlVisualSvg)**

---

### Task 4: 實作四大主階段與 5 款互動小遊戲 (Stages & Minigames)

**Files:**
- Create: `src/components/stages/RecipeIntroStage.tsx`
- Create: `src/components/stages/WeighingStage.tsx`
- Create: `src/components/minigames/ButterMeltGame.tsx`
- Create: `src/components/minigames/EggWhiskGame.tsx`
- Create: `src/components/minigames/FlourSiftFoldGame.tsx`
- Create: `src/components/minigames/PanLevelingGame.tsx`
- Create: `src/components/minigames/OvenControlGame.tsx`
- Create: `src/components/stages/MixingBakingStage.tsx`
- Create: `src/components/stages/ResultStage.tsx`

**Interfaces:**
- Consumes: `game.types.ts`, `constants/*`, `utils/*`, `components/common/*`, `components/illustrations/*`
- Produces: 完整 4 大主階段畫面與 5 款子遊戲互動操作

- [x] **Step 1: 實作 Stage 1 食譜閱讀與目標人數選擇 (RecipeIntroStage) — 隱藏換算提示，讓玩家自行摸索**
- [x] **Step 2: 實作 Stage 2 電子秤測重階段 (WeighingStage) — 7 種原料、滑桿、微調按鈕、Tare 歸零、麵粉筋度選擇**
- [x] **Step 3: 實作 5 款製作與烘烤小遊戲 (Step 3-1 ~ Step 3-5)**
- [x] **Step 4: 實作 Stage 3 綜合流程容器 (MixingBakingStage)**
- [x] **Step 5: 實作 Stage 4 出爐結局揭曉與全步驟藍帶科學診斷報告 (ResultStage)**

---

### Task 5: 頂層狀態串接、整合測試與成果驗證 (App Integration & Verification)

**Files:**
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: All stages, common components, logic engines
- Produces: 完整的單頁烘焙挑戰網頁遊戲

- [x] **Step 1: 在 App.tsx 整合全域狀態機與跨階段資料流傳遞**
- [x] **Step 2: 整合 Demo 模式（一鍵填入正確換算值、一鍵跳轉 6 種結局預覽）**
- [x] **Step 3: 執行打包建置 `npm run build` 並驗證無 TypeScript 或樣式錯誤**
- [x] **Step 4: 端對端手動驗證全流程（包含豬豬結局、裂開結局、太黑結局、乾硬結局、歪斜結局、完美結局）**
