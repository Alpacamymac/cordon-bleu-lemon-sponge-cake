import React, { useState } from 'react';
import { Flame, Check, AlertTriangle, ArrowRight } from 'lucide-react';
import { ChefTipBox } from '../common/ChefTipBox';
import { sfx } from '../../utils/soundEffects';

interface ButterMeltGameProps {
  initialTemp?: number;
  onComplete: (butterTemp: number) => void;
}

export const ButterMeltGame: React.FC<ButterMeltGameProps> = ({
  initialTemp = 20,
  onComplete,
}) => {
  const [temp, setTemp] = useState<number>(initialTemp);

  const handleHeat = (delta: number) => {
    sfx.playPour();
    setTemp((prev) => Math.min(95, Math.max(15, prev + delta)));
  };

  // 狀態評估
  const isSolid = temp < 32;
  const isIdeal = temp >= 35 && temp <= 55;
  const isTooHot = temp > 65;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-1">
        <h3 className="text-xl font-bold font-serif-tc text-slate-900">
          Step 3-1 溫水融化無鹽奶油 (Melt Butter)
        </h3>
        <p className="text-xs text-slate-500">
          隔水融化無鹽奶油，控制在最佳溫熱液態（約 40°C ~ 50°C），切忌高溫焦化或油水分離。
        </p>
      </div>

      {/* 視覺加熱台 */}
      <div className="bg-gradient-to-b from-amber-50 to-orange-50/50 rounded-3xl p-6 border-2 border-amber-200/80 shadow-md flex flex-col md:flex-row items-center justify-around gap-6">
        {/* 奶油小瓷碗視覺 */}
        <div className="flex flex-col items-center">
          <div className="w-40 h-28 rounded-full bg-white border-4 border-amber-200 shadow-lg flex items-center justify-center relative overflow-hidden">
            {/* 碗內融化液面 */}
            <div
              className={`w-full absolute bottom-0 transition-all duration-300 ${
                isTooHot
                  ? 'bg-amber-700 h-20 opacity-90'
                  : isIdeal
                  ? 'bg-amber-400 h-16'
                  : isSolid
                  ? 'bg-amber-200 h-8'
                  : 'bg-amber-300 h-12'
              }`}
            />
            {/* 固體奶油塊 (溫度低時出現) */}
            {temp < 40 && (
              <div
                className="w-12 h-10 bg-yellow-200 border border-amber-400 rounded-md shadow-md z-10 transition-transform"
                style={{ transform: `scale(${Math.max(0.2, (40 - temp) / 25)})` }}
              />
            )}
            {/* 冒煙特效 */}
            {isTooHot && (
              <div className="absolute top-2 text-xs font-bold text-rose-600 animate-bounce z-20">
                💨 焦化過熱！
              </div>
            )}
          </div>
          <span className="text-xs font-bold text-slate-600 mt-2">
            {isSolid ? '🧊 冰涼固態' : isIdeal ? '✨ 完美溫熱金黃液態' : isTooHot ? '🔥 滾燙油水分離' : '🧈 正在融化中'}
          </span>
        </div>

        {/* 溫度計與溫度控制 */}
        <div className="w-full md:w-64 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-500" /> 當前奶油溫度
            </span>
            <span
              className={`text-2xl font-mono font-black ${
                isIdeal ? 'text-emerald-600' : isTooHot ? 'text-rose-600' : 'text-amber-600'
              }`}
            >
              {temp}°C
            </span>
          </div>

          {/* 溫度進度條 */}
          <div className="relative w-full h-4 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
            {/* 綠色理想區間 (35-55°C) 標記 */}
            <div className="absolute left-[36%] w-[21%] h-full bg-emerald-400/40 z-0" />
            <div
              className={`h-full transition-all duration-200 ${
                isIdeal ? 'bg-emerald-500' : isTooHot ? 'bg-rose-500' : 'bg-amber-500'
              }`}
              style={{ width: `${Math.min(100, (temp / 90) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>20°C 固態</span>
            <span className="text-emerald-600 font-bold">40~50°C 最佳</span>
            <span>80°C 焦化</span>
          </div>

          {/* 加熱與冷卻按鈕 */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleHeat(-5)}
              className="py-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-900 text-xs font-bold transition-all active:scale-95"
            >
              ❄️ 降溫冷卻 (-5°C)
            </button>
            <button
              onClick={() => handleHeat(8)}
              className="py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all active:scale-95 shadow-sm"
            >
              🔥 溫水加熱 (+8°C)
            </button>
          </div>
        </div>
      </div>

      <ChefTipBox
        type="science"
        tip="融化奶油最佳溫度約為 40°C~50°C。若溫度低於 35°C 倒入麵糊會直接冷卻結塊沈底；若高於 65°C 則會燙熟打發好的全蛋微氣室，造成嚴重消泡！"
      />

      <div className="flex justify-end pt-2">
        <button
          onClick={() => {
            sfx.playSuccess();
            onComplete(temp);
          }}
          className="px-7 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95"
        >
          <span>確認奶油溫度，進入下一步</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
