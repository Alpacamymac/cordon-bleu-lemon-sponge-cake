import React, { useState } from 'react';
import { ArrowRight, Thermometer, Zap } from 'lucide-react';
import { BowlVisualSvg } from '../illustrations/BowlVisualSvg';
import { ChefTipBox } from '../common/ChefTipBox';
import { sfx } from '../../utils/soundEffects';

interface EggWhiskGameProps {
  onComplete: (progress: number, heatRate: 'slow' | 'ideal' | 'too_fast') => void;
}

export const EggWhiskGame: React.FC<EggWhiskGameProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [heatRate, setHeatRate] = useState<'slow' | 'ideal' | 'too_fast'>('ideal');
  const [isWhisking, setIsWhisking] = useState<boolean>(false);

  const handleWhiskClick = () => {
    sfx.playWhisk();
    setIsWhisking(true);
    setProgress((prev) => Math.min(100, prev + 12));
    setTimeout(() => setIsWhisking(false), 200);
  };

  const isRibbonStage = progress >= 85;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-1">
        <h3 className="text-xl font-bold font-serif-tc text-slate-900">
          Step 3-2 隔溫水全蛋打發 (Whisking Whole Eggs)
        </h3>
        <p className="text-xs text-slate-500">
          將全蛋、細砂糖與檸檬皮屑混合，隔溫水打發至顏色變淺、柔軟細緻的「緞帶紋路狀（Ribbon Stage）」。
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* 左側：鋼盆打發視覺 */}
        <div className="md:col-span-6 flex flex-col items-center justify-center p-4 bg-amber-50/50 rounded-2xl border border-amber-200/60">
          <BowlVisualSvg
            color={progress < 40 ? '#facc15' : progress < 75 ? '#fef08a' : '#fef9c3'}
            isWhisking={isWhisking}
            bubbleCount={Math.floor(progress / 10)}
            hasZest={true}
          />
          <div className="mt-2 text-center">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                isRibbonStage
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {isRibbonStage
                ? '✨ 完美緞帶狀！滴落紋路維持3秒不消失'
                : `打發進度：${progress}%（繼續點擊攪打）`}
            </span>
          </div>
        </div>

        {/* 右側：打發互動與升溫速度控制 */}
        <div className="md:col-span-6 space-y-5">
          {/* 打發進度條 */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>全蛋打發蓬鬆度 (Aeration)</span>
              <span className="font-mono text-amber-700">{progress}%</span>
            </div>
            <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* 打發點擊按鈕 */}
          <button
            onClick={handleWhiskClick}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-95 text-slate-950 font-black text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span>高速攪打！(連續點擊進行打發)</span>
          </button>

          {/* 溫水浴加熱速度選擇器 */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Thermometer className="w-4 h-4 text-rose-500" />
                溫水浴升溫控制 (Heating Rate)
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'slow', label: '慢速微溫', desc: '升溫過慢' },
                  { id: 'ideal', label: '均勻溫熱 (38~40°C)', desc: '藍帶標準黃金溫控' },
                  { id: 'too_fast', label: '猛火急速升溫', desc: '熱水過燙有熟化風險' },
                ] as const
              ).map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => {
                    sfx.playBeep(mode.id === 'ideal' ? 800 : 400, 0.05);
                    setHeatRate(mode.id);
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                    heatRate === mode.id
                      ? 'bg-blue-950 text-amber-300 border-blue-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold">{mode.label}</div>
                  <div className="text-[10px] opacity-75 mt-0.5">{mode.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ChefTipBox
        type={heatRate === 'too_fast' ? 'warning' : 'science'}
        tip={
          heatRate === 'too_fast'
            ? '警告：若升溫過快（水溫超過 50°C），蛋液中的蛋白質會迅速變性熟化成蛋花，失去包裹微氣室的彈性，出爐後蛋糕將會又乾又硬！'
            : '科學小常識：全蛋表面張力隨溫度升高而降低，在人體體溫（約 38~40°C）時最容易包覆空氣形成細緻堅韌的乳霜泡沫。'
        }
      />

      <div className="flex justify-end pt-2">
        <button
          onClick={() => {
            sfx.playSuccess();
            onComplete(progress, heatRate);
          }}
          disabled={progress < 60}
          className="px-7 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-bold text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95"
        >
          <span>{progress >= 85 ? '打發完成，進入過篩與切拌' : '打發程度稍不足，繼續進行'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
