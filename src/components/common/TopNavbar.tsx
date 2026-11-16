import React, { useState } from 'react';
import { BookOpen, Volume2, VolumeX, Sparkles, ChevronDown, RotateCcw } from 'lucide-react';
import { EndingId, GameStage, SubStep } from '../../types/game.types';
import { sfx } from '../../utils/soundEffects';

interface TopNavbarProps {
  currentStage: GameStage;
  subStep?: SubStep;
  targetServings: number;
  onOpenRecipe: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onAutofillCorrect: () => void;
  onDirectPreviewEnding: (ending: EndingId) => void;
  onResetGame: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentStage,
  subStep,
  targetServings,
  onOpenRecipe,
  isMuted,
  onToggleMute,
  onAutofillCorrect,
  onDirectPreviewEnding,
  onResetGame,
}) => {
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);

  const stages: { id: GameStage; label: string; number: number }[] = [
    { id: 'STAGE_1_RECIPE_INTRO', label: '食譜閱讀', number: 1 },
    { id: 'STAGE_2_WEIGHING', label: '精準秤重', number: 2 },
    { id: 'STAGE_3_MIXING_AND_BAKING', label: '製作烘烤', number: 3 },
    { id: 'STAGE_4_RESULT', label: '主廚診斷', number: 4 },
  ];

  const currentStageIndex = stages.findIndex((s) => s.id === currentStage);

  const getSubStepText = () => {
    if (currentStage !== 'STAGE_3_MIXING_AND_BAKING' || !subStep) return null;
    switch (subStep) {
      case 'MELT_BUTTER':
        return '3-1 融化奶油';
      case 'WHISK_EGGS':
        return '3-2 全蛋打發';
      case 'SIFT_FOLD':
        return '3-3 過篩拌合';
      case 'PAN_LEVEL':
        return '3-4 模具抹平';
      case 'OVEN_BAKE':
        return '3-5 烤箱溫控';
      default:
        return null;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Logo 與標題 */}
        <div
          onClick={onResetGame}
          className="flex items-center gap-2 cursor-pointer group transition-transform active:scale-95"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-lg shadow-sm">
            🍋
          </div>
          <div>
            <div className="text-xs tracking-wider uppercase text-amber-400 font-bold flex items-center gap-1">
              <span>Le Cordon Bleu</span>
              <span className="text-[10px] bg-blue-900 text-blue-200 px-1 py-0.2 rounded">法式藍帶</span>
            </div>
            <h1 className="text-sm md:text-base font-bold font-serif-tc text-slate-100 group-hover:text-amber-300 transition-colors">
              檸檬海綿蛋糕挑戰
            </h1>
          </div>
        </div>

        {/* 階段進度條 */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {stages.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            return (
              <div key={stage.id} className="flex items-center gap-1.5">
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    isCurrent
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm ring-2 ring-amber-300/40'
                      : isCompleted
                      ? 'bg-slate-800 text-amber-200/90'
                      : 'bg-slate-800/50 text-slate-400'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      isCurrent
                        ? 'bg-slate-950 text-amber-300 font-bold'
                        : isCompleted
                        ? 'bg-amber-400/20 text-amber-300'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {isCompleted ? '✓' : stage.number}
                  </span>
                  <span>{stage.label}</span>
                  {isCurrent && getSubStepText() && (
                    <span className="text-[10px] bg-slate-900/80 text-amber-300 px-1.5 py-0.5 rounded-full font-normal">
                      {getSubStepText()}
                    </span>
                  )}
                </div>
                {idx < stages.length - 1 && (
                  <span className={`text-xs ${isCompleted ? 'text-amber-400/60' : 'text-slate-700'}`}>➔</span>
                )}
              </div>
            );
          })}
        </nav>

        {/* 右側操作群 */}
        <div className="flex items-center gap-2">
          {/* 目標人數標籤 */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs">
            <span className="text-slate-400">目標:</span>
            <span className="text-amber-300 font-bold">{targetServings} 人份</span>
          </div>

          {/* 查看食譜按鈕 */}
          <button
            onClick={() => {
              sfx.playBeep(600, 0.05);
              onOpenRecipe();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-blue-900/80 hover:bg-blue-800 border border-blue-700 text-xs text-blue-100 font-medium transition-colors shadow-sm active:scale-95"
            title="隨時查看 10 人份藍帶標準食譜"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">原版食譜</span>
          </button>

          {/* 音效開關按鈕 */}
          <button
            onClick={() => {
              sfx.playBeep(700, 0.05);
              onToggleMute();
            }}
            className={`p-1.5 rounded-md border text-xs transition-colors ${
              isMuted
                ? 'bg-slate-800 text-slate-500 border-slate-700'
                : 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
            }`}
            title={isMuted ? '取消靜音' : '靜音'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* 期末 Demo 快速選單 Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                sfx.playBeep(520, 0.04);
                setDemoMenuOpen(!demoMenuOpen);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-all active:scale-95"
              title="期末報告展示與快速測試"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demo 輔助</span>
              <ChevronDown className="w-3 h-3 transition-transform" />
            </button>

            {demoMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDemoMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-2.5 z-50 text-xs space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 px-1 border-b border-slate-800 pb-1">
                    🎯 期末發表快速切換選單
                  </div>

                  <button
                    onClick={() => {
                      sfx.playSuccess();
                      onAutofillCorrect();
                      setDemoMenuOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-800 text-amber-300 font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span>⚡</span> 一鍵填入 {targetServings} 人份精準換算克數
                  </button>

                  <div className="text-[11px] font-bold text-slate-400 px-1 pt-1 border-t border-slate-800">
                    🍰 一鍵直達 6 大結局診斷：
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      onClick={() => {
                        sfx.playSuccess();
                        onDirectPreviewEnding('perfect');
                        setDemoMenuOpen(false);
                      }}
                      className="px-2 py-1.5 text-left rounded bg-slate-800/80 hover:bg-amber-500/20 text-yellow-300 font-medium"
                    >
                      👑 完美蛋糕
                    </button>
                    <button
                      onClick={() => {
                        sfx.playPiggy();
                        onDirectPreviewEnding('piggy');
                        setDemoMenuOpen(false);
                      }}
                      className="px-2 py-1.5 text-left rounded bg-slate-800/80 hover:bg-pink-500/20 text-pink-300 font-medium"
                    >
                      🐷 吃成豬豬
                    </button>
                    <button
                      onClick={() => {
                        sfx.playFail();
                        onDirectPreviewEnding('cracked');
                        setDemoMenuOpen(false);
                      }}
                      className="px-2 py-1.5 text-left rounded bg-slate-800/80 hover:bg-red-500/20 text-red-300 font-medium"
                    >
                      💥 表面裂開
                    </button>
                    <button
                      onClick={() => {
                        sfx.playFail();
                        onDirectPreviewEnding('darkEdges');
                        setDemoMenuOpen(false);
                      }}
                      className="px-2 py-1.5 text-left rounded bg-slate-800/80 hover:bg-orange-500/20 text-orange-300 font-medium"
                    >
                      🔥 邊緣焦黑
                    </button>
                    <button
                      onClick={() => {
                        sfx.playFail();
                        onDirectPreviewEnding('denseDry');
                        setDemoMenuOpen(false);
                      }}
                      className="px-2 py-1.5 text-left rounded bg-slate-800/80 hover:bg-stone-500/20 text-stone-300 font-medium"
                    >
                      🧱 組織乾硬
                    </button>
                    <button
                      onClick={() => {
                        sfx.playFail();
                        onDirectPreviewEnding('uneven');
                        setDemoMenuOpen(false);
                      }}
                      className="px-2 py-1.5 text-left rounded bg-slate-800/80 hover:bg-yellow-500/20 text-amber-200 font-medium"
                    >
                      📐 形狀歪斜
                    </button>
                  </div>

                  <div className="pt-1 border-t border-slate-800">
                    <button
                      onClick={() => {
                        sfx.playBeep(440, 0.1);
                        onResetGame();
                        setDemoMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded hover:bg-rose-950/60 text-rose-300 flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3 h-3" /> 重設並回到起點
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
