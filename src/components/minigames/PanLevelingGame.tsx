import React, { useState } from 'react';
import { ArrowRight, Sliders, CheckSquare, Square } from 'lucide-react';
import { ChefTipBox } from '../common/ChefTipBox';
import { sfx } from '../../utils/soundEffects';

interface PanLevelingGameProps {
  onComplete: (isLined: boolean, flatness: number) => void;
}

export const PanLevelingGame: React.FC<PanLevelingGameProps> = ({ onComplete }) => {
  const [isLined, setIsLined] = useState<boolean>(true);
  const [flatness, setFlatness] = useState<number>(50);

  const isFlatEnough = flatness >= 80;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-1">
        <h3 className="text-xl font-bold font-serif-tc text-slate-900">
          Step 3-4 拌入溫熱奶油與模具抹平 (Pan Leveling)
        </h3>
        <p className="text-xs text-slate-500">
          拌入步驟 3-1 的溫熱奶油，倒入已鋪烘焙紙的長條樹根蛋糕模，並用抹刀將頂部徹底撫平。
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* 左側：烤盤長方形模具與表面波紋視覺 */}
        <div className="md:col-span-6 flex flex-col items-center justify-center p-6 bg-slate-100 rounded-2xl border border-slate-300">
          <div className="w-64 h-36 bg-stone-700 rounded-xl p-2.5 shadow-2xl relative border-4 border-stone-800 flex items-center justify-center overflow-hidden">
            {/* 烘焙紙內襯 */}
            {isLined && (
              <div className="absolute inset-1.5 bg-amber-100/90 border border-amber-300 rounded shadow-xs" />
            )}

            {/* 倒入的鵝黃色麵糊層 */}
            <div className="relative z-10 w-full h-full flex flex-col justify-end p-2">
              <div
                className={`w-full transition-all duration-300 rounded ${
                  isFlatEnough ? 'bg-amber-300 h-16 shadow-inner' : 'bg-amber-300 h-16'
                }`}
                style={{
                  clipPath: isFlatEnough
                    ? 'none'
                    : `polygon(0% ${100 - flatness / 2}%, 30% 20%, 70% 80%, 100% 30%, 100% 100%, 0% 100%)`,
                }}
              />
            </div>

            {/* 抹平狀態標籤 */}
            <div className="absolute top-2 right-2 z-20 text-[10px] font-bold px-2 py-0.5 rounded bg-black/60 text-white font-mono">
              平整度：{flatness}%
            </div>
          </div>

          <span className="text-xs font-bold text-slate-600 mt-3">
            {isFlatEnough ? '✨ 表面如絲緞般平整光滑' : '⚠️ 表面高低不平，出爐恐歪斜'}
          </span>
        </div>

        {/* 右側：抹平調整滑桿與鋪紙開關 */}
        <div className="md:col-span-6 space-y-5">
          {/* 烘焙紙 Checkbox */}
          <button
            onClick={() => {
              sfx.playBeep(600, 0.05);
              setIsLined(!isLined);
            }}
            className={`w-full p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
              isLined
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            {isLined ? (
              <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <Square className="w-5 h-5 text-rose-500 shrink-0" />
            )}
            <div className="text-xs">
              <div className="font-bold">
                {isLined ? '模具已鋪設抗沾烘焙紙 (Parchment Paper)' : '未鋪烘焙紙（將嚴重沾黏模具）'}
              </div>
              <div className="text-[10px] opacity-75">點擊可切換是否鋪紙</div>
            </div>
          </button>

          {/* 刮刀抹平滑桿 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-amber-600" />
                抹刀平整度微調 (Smoothing Spatula)
              </span>
              <span className="font-mono text-amber-700">{flatness}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={flatness}
              onChange={(e) => {
                sfx.playPour();
                setFlatness(parseInt(e.target.value));
              }}
              className="w-full h-3 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>凹凸不平 (20%)</span>
              <span className="text-emerald-600 font-bold">80%+ 為標準平整</span>
              <span>極致鏡面 (100%)</span>
            </div>
          </div>
        </div>
      </div>

      <ChefTipBox
        type={isFlatEnough ? 'science' : 'warning'}
        tip={
          isFlatEnough
            ? '藍帶主廚訣竅：麵糊入模後輕震兩下烤盤，震出大氣泡，並用曲柄抹刀輕輕將表面撫平，出爐後蛋糕體便能擁有均勻無暇的幾何平線。'
            : '警告：海綿麵糊具有一定稠度，若入爐前表面凹凸不平，烘烤膨脹時熱對流會偏向低窪處，導致一邊隆起一邊塌陷！'
        }
      />

      <div className="flex justify-end pt-2">
        <button
          onClick={() => {
            sfx.playSuccess();
            onComplete(isLined, flatness);
          }}
          className="px-7 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95"
        >
          <span>抹平完畢，送入烤箱</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
