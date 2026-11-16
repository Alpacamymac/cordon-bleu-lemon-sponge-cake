/**
 * 藍帶檸檬海綿蛋糕 - 全域核心型別定義
 */

export type GameStage =
  | 'STAGE_1_RECIPE_INTRO'
  | 'STAGE_2_WEIGHING'
  | 'STAGE_3_MIXING_AND_BAKING'
  | 'STAGE_4_RESULT';

export type SubStep =
  | 'MELT_BUTTER'
  | 'WHISK_EGGS'
  | 'SIFT_FOLD'
  | 'PAN_LEVEL'
  | 'OVEN_BAKE';

export type FlourType = 'low' | 'medium' | 'high';

export type IngredientId =
  | 'butter'
  | 'eggs'
  | 'sugar'
  | 'lemonZest'
  | 'lemonJuice'
  | 'flour'
  | 'bakingPowder';

export interface IngredientConfig {
  id: IngredientId;
  name: string;
  nameEn: string;
  baseAmount: number; // 10人份基準量
  unit: 'g' | 'ml';
  tolerance: number; // 容許誤差百分比 (例如 0.1 代表 ±10%)
  step: number;
  icon: string;
  description: string;
}

export interface PlayerWeighingState {
  butter: number;
  eggs: number;
  sugar: number;
  lemonZest: number;
  lemonJuice: number;
  flour: number;
  flourType: FlourType;
  bakingPowder: number;
}

export interface PlayerMinigameState {
  // Step 3-1: 融化奶油
  butterTemp: number; // 目標溫熱液態 ~45°C (35°C - 55°C 完美，>70°C 焦化/分離)
  isButterMelted: boolean;

  // Step 3-2: 打發全蛋
  eggWhiskProgress: number; // 0 - 100
  eggTempRiseRate: 'slow' | 'ideal' | 'too_fast'; // 升溫過快會導致蛋糕扎實偏乾

  // Step 3-3: 過篩與切拌
  isFlourSifted: boolean;
  foldCount: number; // 切拌次數 (理想 12~18 次，>24 次為過度攪拌)

  // Step 3-4: 烤盤鋪紙與抹平
  isParchmentLined: boolean;
  panFlatnessScore: number; // 0 - 100 (>= 80 視為平整)

  // Step 3-5: 烤箱控制
  isPreheated: boolean; // 是否預熱至 180°C
  ovenTemp: number; // 標準 180°C (175 - 185 為正常)
  bakeMinutes: number; // 標準 25 - 30 分鐘
}

export type EndingId =
  | 'piggy' // 吃成豬豬 (最高優先級：少人份卻放了10人份份量)
  | 'cracked' // 表面裂開 (麵粉過量、高筋、過度攪拌、溫度過高)
  | 'darkEdges' // 蛋糕邊緣太黑 (糖過量、溫度過高)
  | 'denseDry' // 蛋糕過於扎實和偏乾 (蛋升溫太快、糖過量、烤溫過低)
  | 'uneven' // 形狀不均 (烤盤未抹平、烤溫失控/未預熱)
  | 'perfect'; // 藍帶完美檸檬海綿蛋糕

export interface DiagnosticItem {
  category: 'weighing' | 'technique' | 'baking';
  stepTitle: string;
  status: 'perfect' | 'warning' | 'fail';
  summary: string;
  scienceExplanation: string;
}

export interface EndingConfig {
  id: EndingId;
  title: string;
  subtitle: string;
  tag: string;
  badge: string;
  description: string;
  chefQuote: string;
  themeColor: string;
}

export interface EvaluationResult {
  primaryEnding: EndingId;
  severityScores: Record<EndingId, number>;
  diagnostics: DiagnosticItem[];
  allPerfect: boolean;
}
