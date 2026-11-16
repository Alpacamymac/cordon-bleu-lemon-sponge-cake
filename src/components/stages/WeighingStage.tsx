import React, { useState } from 'react';
import { Scale, ArrowRight, RotateCcw, Check, Sparkles } from 'lucide-react';
import { FlourType, IngredientId, PlayerWeighingState } from '../../types/game.types';
import { INGREDIENTS_CONFIG, INGREDIENT_ORDER } from '../../constants/recipeData';
import { sfx } from '../../utils/soundEffects';

interface WeighingStageProps {
  weighingData: PlayerWeighingState;
  targetServings: number;
  onUpdateWeight: (id: IngredientId, amount: number) => void;
  onUpdateFlourType: (flourType: FlourType) => void;
  onCompleteWeighing: () => void;
}

export const WeighingStage: React.FC<WeighingStageProps> = ({
  weighingData,
  targetServings,
  onUpdateWeight,
  onUpdateFlourType,
  onCompleteWeighing,
}) => {
  const [currentId, setCurrentId] = useState<IngredientId>('butter');
  const [isTareFlashing, setIsTareFlashing] = useState(false);

  const currentConfig = INGREDIENTS_CONFIG[currentId];
  const currentVal = weighingData[currentId];

  const handleAdd = (delta: number) => {
    sfx.playBeep(800 + Math.min(delta * 20, 400), 0.04);
    const next = Math.max(0, Math.round((currentVal + delta) * 10) / 10);
    onUpdateWeight(currentId, next);
  };

  const handleSetExact = (val: number) => {
    sfx.playBeep(700, 0.03);
    onUpdateWeight(currentId, Math.max(0, Math.round(val * 10) / 10));
  };

  const handleTare = () => {
    sfx.playTare();
    setIsTareFlashing(true);
    onUpdateWeight(currentId, 0);
    setTimeout(() => setIsTareFlashing(false), 300);
  };

  // 檢查是否所有材料皆已秤重大於 0
  const allWeighed = INGREDIENT_ORDER.every((id) => weighingData[id] > 0);

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-fadeIn py-2">
      {/* 頂部食材快速切換 Tab 標籤列 */}
      <div className="bg-white rounded-2xl p-2.5 shadow-sm border border-amber-200/80 flex items-center gap-1.5 overflow-x-auto">
        {INGREDIENT_ORDER.map((id) => {
          const item = INGREDIENTS_CONFIG[id];
          const isSelected = currentId === id;
          const isWeighed = weighingData[id] > 0;
          return (
            <button
              key={id}
              onClick={() => {
                sfx.playBeep(650, 0.04);
                setCurrentId(id);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isSelected
                  ? 'bg-blue-950 text-amber-300 shadow-md scale-102 ring-2 ring-amber-400/50'
                  : isWeighed
                  ? 'bg-amber-100/70 text-slate-800 hover:bg-amber-200/80'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
              {isWeighed && (
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 主工作台：電子秤與測量操作區 */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-amber-200/80 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* 左側：電子秤實體動態卡片 (佔 5 欄) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-100 to-slate-200 rounded-3xl border-2 border-slate-300 shadow-inner relative">
          {/* 原料圖示與名稱標籤 */}
          <div className="text-center mb-3">
            <div className="text-4xl mb-1 filter drop-shadow-sm">{currentConfig.icon}</div>
            <div className="text-base font-bold text-slate-800">{currentConfig.name}</div>
            <div className="text-xs text-slate-500">{currentConfig.nameEn}</div>
          </div>

          {/* 秤盤 Platter */}
          <div className="w-48 h-12 rounded-full bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 border-2 border-slate-400 shadow-md flex items-center justify-center relative mb-4">
            <div className="text-xs font-bold text-slate-500 tracking-wider uppercase">
              PRECISION SCALE
            </div>
            {/* 秤盤上的物品堆疊陰影 */}
            {currentVal > 0 && (
              <div
                className="absolute -top-4 w-16 h-8 rounded-full bg-amber-400/80 blur-xs transition-transform"
                style={{ transform: `scale(${Math.min(1.8, 0.8 + currentVal / 100)})` }}
              />
            )}
          </div>

          {/* 數位 LCD 顯示螢幕 */}
          <div className="w-full bg-slate-900 rounded-2xl p-4 border-4 border-slate-700 shadow-2xl flex flex-col items-center justify-center">
            <div className="w-full flex justify-between text-[10px] font-mono text-emerald-400/70 mb-1">
              <span>LE CORDON BLEU LAB</span>
              <span>{isTareFlashing ? 'TARE...' : 'STABLE'}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-4xl md:text-5xl font-mono font-black tracking-wider transition-colors ${
                  isTareFlashing
                    ? 'text-amber-300 animate-pulse'
                    : currentVal > 0
                    ? 'text-emerald-400'
                    : 'text-slate-500'
                }`}
              >
                {currentVal.toFixed(1)}
              </span>
              <span className="text-lg font-mono text-emerald-400 font-bold">
                {currentConfig.unit}
              </span>
            </div>
          </div>

          {/* 歸零按鈕 Tare */}
          <div className="mt-4 flex gap-2 w-full">
            <button
              onClick={handleTare}
              className="flex-1 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-200 text-xs font-bold transition-all shadow flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>歸零 (TARE)</span>
            </button>
            <button
              onClick={() => {
                sfx.playBeep(300, 0.05);
                onUpdateWeight(currentId, 0);
              }}
              className="px-3 py-2 rounded-xl bg-rose-900/40 hover:bg-rose-900/60 active:scale-95 text-rose-300 text-xs font-bold transition-all border border-rose-800/40"
            >
              清空
            </button>
          </div>
        </div>

        {/* 右側：精準控制操作盤 (佔 7 欄) */}
        <div className="md:col-span-7 space-y-5">
          {/* 材料描述 */}
          <div className="bg-amber-50/80 rounded-2xl p-3.5 border border-amber-200/80">
            <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>食材角色解析</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{currentConfig.description}</p>
          </div>

          {/* 麵粉筋度特殊選擇 (若當前為麵粉) */}
          {currentId === 'flour' && (
            <div className="bg-blue-50/90 rounded-2xl p-4 border border-blue-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-950">麵粉筋度選擇 (Flour Type)</span>
                <span className="text-[11px] text-blue-700 font-medium">
                  {weighingData.flourType === 'low'
                    ? '已選：低筋麵粉（推薦）'
                    : weighingData.flourType === 'medium'
                    ? '已選：中筋麵粉'
                    : '已選：高筋麵粉'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { type: 'low', label: '低筋麵粉', desc: '蛋白質 7-9%' },
                    { type: 'medium', label: '中筋麵粉', desc: '蛋白質 10-12%' },
                    { type: 'high', label: '高筋麵粉', desc: '蛋白質 13%+' },
                  ] as const
                ).map((f) => (
                  <button
                    key={f.type}
                    onClick={() => {
                      sfx.playBeep(550, 0.05);
                      onUpdateFlourType(f.type);
                    }}
                    className={`p-2 rounded-xl text-left border transition-all ${
                      weighingData.flourType === f.type
                        ? 'bg-blue-900 text-white border-blue-950 shadow-md scale-102'
                        : 'bg-white text-slate-700 border-blue-200 hover:bg-blue-100/50'
                    }`}
                  >
                    <div className="text-xs font-bold">{f.label}</div>
                    <div className="text-[10px] opacity-75">{f.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 連續滑桿調節 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span>快速滑桿調節 (Slider)</span>
              <span className="font-mono text-amber-700 text-sm">{currentVal.toFixed(1)} {currentConfig.unit}</span>
            </div>
            <input
              type="range"
              min="0"
              max={currentConfig.baseAmount * 1.5}
              step={currentConfig.step}
              value={currentVal}
              onChange={(e) => handleSetExact(parseFloat(e.target.value) || 0)}
              className="w-full h-3 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>

          {/* 微調按鈕群組 (+0.1, +1, +10) */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700">精準微調加減按鈕</span>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => handleAdd(-1)}
                disabled={currentVal <= 0}
                className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-xs font-bold transition-all disabled:opacity-40"
              >
                -1 {currentConfig.unit}
              </button>
              <button
                onClick={() => handleAdd(0.1)}
                className="py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 active:scale-95 text-amber-900 text-xs font-bold transition-all"
              >
                +0.1 {currentConfig.unit}
              </button>
              <button
                onClick={() => handleAdd(1)}
                className="py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 active:scale-95 text-amber-900 text-xs font-bold transition-all"
              >
                +1 {currentConfig.unit}
              </button>
              <button
                onClick={() => handleAdd(10)}
                className="py-2.5 rounded-xl bg-amber-200 hover:bg-amber-300 active:scale-95 text-amber-950 text-xs font-bold transition-all shadow-xs"
              >
                +10 {currentConfig.unit}
              </button>
            </div>
          </div>

          {/* 下一步按鈕 */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                sfx.playSuccess();
                onCompleteWeighing();
              }}
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all transform active:scale-95"
            >
              <span>{allWeighed ? '原料秤重完畢，進入攪拌烘烤' : '跳過未秤原料，直接開始製作'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
