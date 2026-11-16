import React from 'react';
import { PlayerMinigameState, SubStep } from '../../types/game.types';
import { ButterMeltGame } from '../minigames/ButterMeltGame';
import { EggWhiskGame } from '../minigames/EggWhiskGame';
import { FlourSiftFoldGame } from '../minigames/FlourSiftFoldGame';
import { PanLevelingGame } from '../minigames/PanLevelingGame';
import { OvenControlGame } from '../minigames/OvenControlGame';

interface MixingBakingStageProps {
  currentSubStep: SubStep;
  minigameData: PlayerMinigameState;
  onUpdateSubStep: (step: SubStep) => void;
  onUpdateMinigameData: (updater: (prev: PlayerMinigameState) => PlayerMinigameState) => void;
  onFinishMixingBaking: () => void;
}

export const MixingBakingStage: React.FC<MixingBakingStageProps> = ({
  currentSubStep,
  minigameData,
  onUpdateSubStep,
  onUpdateMinigameData,
  onFinishMixingBaking,
}) => {
  return (
    <div className="max-w-4xl mx-auto py-2">
      {currentSubStep === 'MELT_BUTTER' && (
        <ButterMeltGame
          initialTemp={minigameData.butterTemp}
          onComplete={(butterTemp) => {
            onUpdateMinigameData((prev) => ({
              ...prev,
              butterTemp,
              isButterMelted: butterTemp >= 35,
            }));
            onUpdateSubStep('WHISK_EGGS');
          }}
        />
      )}

      {currentSubStep === 'WHISK_EGGS' && (
        <EggWhiskGame
          onComplete={(eggWhiskProgress, eggTempRiseRate) => {
            onUpdateMinigameData((prev) => ({
              ...prev,
              eggWhiskProgress,
              eggTempRiseRate,
            }));
            onUpdateSubStep('SIFT_FOLD');
          }}
        />
      )}

      {currentSubStep === 'SIFT_FOLD' && (
        <FlourSiftFoldGame
          onComplete={(isFlourSifted, foldCount) => {
            onUpdateMinigameData((prev) => ({
              ...prev,
              isFlourSifted,
              foldCount,
            }));
            onUpdateSubStep('PAN_LEVEL');
          }}
        />
      )}

      {currentSubStep === 'PAN_LEVEL' && (
        <PanLevelingGame
          onComplete={(isParchmentLined, panFlatnessScore) => {
            onUpdateMinigameData((prev) => ({
              ...prev,
              isParchmentLined,
              panFlatnessScore,
            }));
            onUpdateSubStep('OVEN_BAKE');
          }}
        />
      )}

      {currentSubStep === 'OVEN_BAKE' && (
        <OvenControlGame
          onComplete={(isPreheated, ovenTemp, bakeMinutes) => {
            onUpdateMinigameData((prev) => ({
              ...prev,
              isPreheated,
              ovenTemp,
              bakeMinutes,
            }));
            onFinishMixingBaking();
          }}
        />
      )}
    </div>
  );
};
