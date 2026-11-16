import React, { useState } from 'react';
import { ArrowRight, Sparkles, AlertTriangle, RefreshCw } from 'lucide-react';
import { BowlVisualSvg } from '../illustrations/BowlVisualSvg';
import { ChefTipBox } from '../common/ChefTipBox';
import { sfx } from '../../utils/soundEffects';

interface FlourSiftFoldGameProps {
  onComplete: (isSifted: boolean, foldCount: number) => void;
}

export const FlourSiftFoldGame: React.FC<FlourSiftFoldGameProps> = ({ onComplete }) => {
  const [siftProgress, setSiftProgress] = useState<number>(0);
  const [foldCount, setFoldCount] = useState<number>(0);
  const [isFolding, setIsFolding] = useState<boolean>(false);

  // 過篩動作
  const handleSift = () => {
    sfx.playSift();
    setSiftProgress((prev) => Math.min(100, prev + 25));
  };

  // J 字切拌動作
  const handleFold = () => {
    sfx.playPour();
    setIsFolding(true);
    setFoldCount((prev) => prev + 1);
    setTimeout(() => setIsFolding(false), 250);
  };

  const isSiftedComplete = siftProgress >= 100;
  const isOvermixed = foldCount > 24;
  const isIdealFolds = foldCount >= 10 && foldCount <= 18;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-1">
        <h3 className="text-xl font-bold font-serif-tc text-slate-900">
          Step 3-3 檸檬汁、過篩麵粉與 J 字切拌 (Sift & Fold)
        </h3>
        <p className="text-xs text-slate-500">
          加入檸檬汁，並將低筋麵粉與泡打粉仔細過篩，採用法式刮刀輕柔「J 字切拌」，切忌過度攪拌導致出筋！
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* 左側：鋼盆切拌與落粉視覺 */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-amber-50/50 rounded-2xl border border-amber-200/60">
          <BowlVisualSvg
            color="#fef08a"
            isWhisking={isFolding}
            showFlourSift={siftProgress > 0 && siftProgress < 100}
            bubbleCount={Math.max(2, 8 - Math.floor(foldCount / 4))}
            hasZest={true}
          />
          <div className="mt-2 text-center text-xs space-y-1">
            <div className="font-bold text-slate-700">
              過篩狀態：{isSiftedComplete ? '✅ 已完全過篩' : `${siftProgress}%（請點擊篩網）`}
            </div>
            <div
              className={`font-mono font-bold px-2.5 py-0.5 rounded-full inline-block ${
                isOvermixed
                  ? 'bg-rose-100 text-rose-700'
                  : isIdealFolds
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              已切拌：{foldCount} 次 {isOvermixed && '⚠️ 嚴重過度攪拌！'}
              {isIdealFolds && '✨ 最佳均勻狀態'}
            </div>
          </div>
        </div>

        {/* 右側：過篩與切拌雙步驟操作 */}
        <div className="md:col-span-7 space-y-5">
          {/* Phase 1: 點擊過篩 */}
          <div className="space-y-2 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span>1. 網篩過篩粉類 (Sifting)</span>
              <span className="font-mono text-amber-700">{siftProgress}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-200"
                style={{ width: `${siftProgress}%` }}
              />
            </div>
            <button
              onClick={handleSift}
              disabled={isSiftedComplete}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                isSiftedComplete
                  ? 'bg-emerald-100 text-emerald-800 cursor-default'
                  : 'bg-amber-100 hover:bg-amber-200 active:scale-95 text-amber-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSiftedComplete ? '已過篩完成 ✓' : '輕拍篩網落粉 (Tap Sifter)'}</span>
            </button>
          </div>

          {/* Phase 2: 刮刀切拌 (J-Fold) */}
          <div className="space-y-2 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span>2. 橡皮刮刀切拌 (Gentle Folding)</span>
              <span className="text-[11px] text-slate-500">標準理想次數：12~16 次</span>
            </div>

            <button
              onClick={handleFold}
              className={`w-full py-3.5 rounded-xl text-xs font-black transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 ${
                isOvermixed
                  ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isFolding ? 'animate-spin' : ''}`} />
              <span>進行一次 J 字切拌 (點擊 +1 次)</span>
            </button>
          </div>
        </div>
      </div>

      <ChefTipBox
        type={isOvermixed ? 'warning' : 'science'}
        tip={
          isOvermixed
            ? '警告：切拌超過 24 次會使麵粉中的麵筋網絡過度緊繃，烘烤時麵糊將無法均勻向上延展，表面必定撕裂爆開！'
            : '藍帶切拌心法：右手持刮刀從盆中央垂直切入，沿著盆底劃「J」字型翻上來，左手同時將鋼盆逆時針轉動 60 度，均勻又防消泡。'
        }
      />

      <div className="flex justify-end pt-2">
        <button
          onClick={() => {
            sfx.playSuccess();
            onComplete(isSiftedComplete, foldCount);
          }}
          disabled={foldCount < 6}
          className="px-7 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-bold text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95"
        >
          <span>拌合完成，倒入模具抹平</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
