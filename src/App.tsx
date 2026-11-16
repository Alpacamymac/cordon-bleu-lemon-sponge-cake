import React, { useState } from 'react';
import {
  EndingId,
  EvaluationResult,
  FlourType,
  GameStage,
  IngredientId,
  PlayerMinigameState,
  PlayerWeighingState,
  SubStep,
} from './types/game.types';
import { INGREDIENTS_CONFIG, INGREDIENT_ORDER, STANDARD_RECIPE_SERVINGS } from './constants/recipeData';
import { evaluateEnding } from './utils/evaluateEnding';
import { sfx } from './utils/soundEffects';
import { TopNavbar } from './components/common/TopNavbar';
import { RecipeModal } from './components/common/RecipeModal';
import { RecipeIntroStage } from './components/stages/RecipeIntroStage';
import { WeighingStage } from './components/stages/WeighingStage';
import { MixingBakingStage } from './components/stages/MixingBakingStage';
import { ResultStage } from './components/stages/ResultStage';

const initialWeighingState: PlayerWeighingState = {
  butter: 0,
  eggs: 0,
  sugar: 0,
  lemonZest: 0,
  lemonJuice: 0,
  flour: 0,
  flourType: 'low',
  bakingPowder: 0,
};

const initialMinigameState: PlayerMinigameState = {
  butterTemp: 45,
  isButterMelted: true,
  eggWhiskProgress: 90,
  eggTempRiseRate: 'ideal',
  isFlourSifted: true,
  foldCount: 14,
  isParchmentLined: true,
  panFlatnessScore: 90,
  isPreheated: true,
  ovenTemp: 180,
  bakeMinutes: 28,
};

export default function App() {
  const [currentStage, setCurrentStage] = useState<GameStage>('STAGE_1_RECIPE_INTRO');
  const [currentSubStep, setCurrentSubStep] = useState<SubStep>('MELT_BUTTER');
  const [targetServings, setTargetServings] = useState<number>(1);
  const [weighingData, setWeighingData] = useState<PlayerWeighingState>(initialWeighingState);
  const [minigameData, setMinigameData] = useState<PlayerMinigameState>(initialMinigameState);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [demoOverrideEnding, setDemoOverrideEnding] = useState<EndingId | null>(null);

  // 1. 秤重操作處理
  const handleUpdateWeight = (id: IngredientId, amount: number) => {
    setWeighingData((prev) => ({
      ...prev,
      [id]: amount,
    }));
  };

  const handleUpdateFlourType = (flourType: FlourType) => {
    setWeighingData((prev) => ({
      ...prev,
      flourType,
    }));
  };

  // 2. Demo 模式：一鍵自動填入當前人數的正確換算克數
  const handleAutofillCorrect = () => {
    const ratio = targetServings / STANDARD_RECIPE_SERVINGS;
    const filled: PlayerWeighingState = {
      butter: Math.round(INGREDIENTS_CONFIG.butter.baseAmount * ratio * 10) / 10,
      eggs: Math.round(INGREDIENTS_CONFIG.eggs.baseAmount * ratio * 10) / 10,
      sugar: Math.round(INGREDIENTS_CONFIG.sugar.baseAmount * ratio * 10) / 10,
      lemonZest: Math.round(INGREDIENTS_CONFIG.lemonZest.baseAmount * ratio * 10) / 10,
      lemonJuice: Math.round(INGREDIENTS_CONFIG.lemonJuice.baseAmount * ratio * 10) / 10,
      flour: Math.round(INGREDIENTS_CONFIG.flour.baseAmount * ratio * 10) / 10,
      flourType: 'low',
      bakingPowder: Math.round(INGREDIENTS_CONFIG.bakingPowder.baseAmount * ratio * 10) / 10,
    };
    setWeighingData(filled);
  };

  // 3. Demo 模式：一鍵跳轉預覽 6 種結局
  const handleDirectPreviewEnding = (ending: EndingId) => {
    setDemoOverrideEnding(ending);
    setCurrentStage('STAGE_4_RESULT');
  };

  // 4. 重設遊戲
  const handleResetGame = () => {
    setCurrentStage('STAGE_1_RECIPE_INTRO');
    setCurrentSubStep('MELT_BUTTER');
    setWeighingData(initialWeighingState);
    setMinigameData(initialMinigameState);
    setDemoOverrideEnding(null);
  };

  // 5. 計算結局判定結果
  const computedEvaluation = evaluateEnding(weighingData, minigameData, targetServings);

  // 若使用者點擊了 Demo 結局切換，套用對應的預設模擬結果
  const activeEvaluation: EvaluationResult = demoOverrideEnding
    ? demoOverrideEnding === computedEvaluation.primaryEnding
      ? computedEvaluation
      : getMockEvaluationForEnding(demoOverrideEnding, targetServings)
    : computedEvaluation;

  return (
    <div className="min-h-screen bg-amber-50/60 text-slate-800 flex flex-col font-sans">
      {/* 頂部固定導覽列 */}
      <TopNavbar
        currentStage={currentStage}
        subStep={currentSubStep}
        targetServings={targetServings}
        onOpenRecipe={() => setIsRecipeModalOpen(true)}
        isMuted={isMuted}
        onToggleMute={() => {
          const nextMute = !isMuted;
          setIsMuted(nextMute);
          sfx.setMuted(nextMute);
        }}
        onAutofillCorrect={handleAutofillCorrect}
        onDirectPreviewEnding={handleDirectPreviewEnding}
        onResetGame={handleResetGame}
      />

      {/* 主工作台畫布卡片 (Workbench Container) */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 flex flex-col justify-center">
        {currentStage === 'STAGE_1_RECIPE_INTRO' && (
          <RecipeIntroStage
            targetServings={targetServings}
            onSelectServings={(s) => setTargetServings(s)}
            onStartGame={() => setCurrentStage('STAGE_2_WEIGHING')}
          />
        )}

        {currentStage === 'STAGE_2_WEIGHING' && (
          <WeighingStage
            weighingData={weighingData}
            targetServings={targetServings}
            onUpdateWeight={handleUpdateWeight}
            onUpdateFlourType={handleUpdateFlourType}
            onCompleteWeighing={() => {
              setCurrentStage('STAGE_3_MIXING_AND_BAKING');
              setCurrentSubStep('MELT_BUTTER');
            }}
          />
        )}

        {currentStage === 'STAGE_3_MIXING_AND_BAKING' && (
          <MixingBakingStage
            currentSubStep={currentSubStep}
            minigameData={minigameData}
            onUpdateSubStep={setCurrentSubStep}
            onUpdateMinigameData={setMinigameData}
            onFinishMixingBaking={() => {
              setDemoOverrideEnding(null);
              setCurrentStage('STAGE_4_RESULT');
            }}
          />
        )}

        {currentStage === 'STAGE_4_RESULT' && (
          <ResultStage
            evaluation={activeEvaluation}
            targetServings={targetServings}
            onRestart={handleResetGame}
            onSelectEndingPreview={(ending) => setDemoOverrideEnding(ending)}
          />
        )}
      </main>

      {/* 頁尾版權與法式學院宣告 */}
      <footer className="py-3 text-center text-xs text-slate-400 border-t border-amber-200/40">
        法國巴黎藍帶廚藝學院 (Le Cordon Bleu) 烘焙科學模擬遊戲 ‧ 期末專案作品
      </footer>

      {/* 10 人份標準食譜彈窗 */}
      <RecipeModal
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
      />
    </div>
  );
}

// 輔助函式：為 Demo 模式生成標準預覽資料
function getMockEvaluationForEnding(ending: EndingId, targetServings: number): EvaluationResult {
  switch (ending) {
    case 'piggy':
      return evaluateEnding(
        {
          butter: 170,
          eggs: 150,
          sugar: 165,
          lemonZest: 10,
          lemonJuice: 50,
          flour: 170,
          flourType: 'low',
          bakingPowder: 3,
        },
        initialMinigameState,
        1
      );
    case 'cracked':
      return evaluateEnding(
        {
          ...initialWeighingState,
          flourType: 'high',
          flour: 40,
        },
        {
          ...initialMinigameState,
          foldCount: 30,
        },
        targetServings
      );
    case 'darkEdges':
      return evaluateEnding(
        {
          ...initialWeighingState,
          sugar: 60,
        },
        {
          ...initialMinigameState,
          ovenTemp: 210,
        },
        targetServings
      );
    case 'denseDry':
      return evaluateEnding(
        initialWeighingState,
        {
          ...initialMinigameState,
          eggTempRiseRate: 'too_fast',
          ovenTemp: 155,
        },
        targetServings
      );
    case 'uneven':
      return evaluateEnding(
        initialWeighingState,
        {
          ...initialMinigameState,
          panFlatnessScore: 40,
          isPreheated: false,
        },
        targetServings
      );
    case 'perfect':
    default: {
      const ratio = targetServings / STANDARD_RECIPE_SERVINGS;
      return evaluateEnding(
        {
          butter: INGREDIENTS_CONFIG.butter.baseAmount * ratio,
          eggs: INGREDIENTS_CONFIG.eggs.baseAmount * ratio,
          sugar: INGREDIENTS_CONFIG.sugar.baseAmount * ratio,
          lemonZest: INGREDIENTS_CONFIG.lemonZest.baseAmount * ratio,
          lemonJuice: INGREDIENTS_CONFIG.lemonJuice.baseAmount * ratio,
          flour: INGREDIENTS_CONFIG.flour.baseAmount * ratio,
          flourType: 'low',
          bakingPowder: INGREDIENTS_CONFIG.bakingPowder.baseAmount * ratio,
        },
        initialMinigameState,
        targetServings
      );
    }
  }
}
