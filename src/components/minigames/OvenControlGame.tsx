import React, { useState } from 'react';
import { ArrowRight, Flame, Clock, Power } from 'lucide-react';
import { ChefTipBox } from '../common/ChefTipBox';
import { sfx } from '../../utils/soundEffects';

interface OvenControlGameProps {
  onComplete: (isPreheated: boolean, temp: number, minutes: number) => void;
}

export const OvenControlGame: React.FC<OvenControlGameProps> = ({ onComplete }) => {
  const [isPreheated, setIsPreheated] = useState<boolean>(true);
  const [temp, setTemp] = useState<number>(180);
  const [minutes, setMinutes] = useState<number>(28);

  const isTempIdeal = temp >= 175 && temp <= 185;
  const isTimeIdeal = minutes >= 25 && minutes <= 30;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-1">
        <h3 className="text-xl font-bold font-serif-tc text-slate-900">
          Step 3-5 烤箱預熱與火候溫控 (Oven Baking)
        </h3>
        <p className="text-xs text-slate-500">
          最後關鍵：設定烤箱預熱至 180°C，調節烘烤溫度（標準 180°C）與時間（標準 25~30 分鐘）。
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* 左側：法式專業烤箱面板視覺 */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-900 rounded-3xl border-4 border-slate-700 shadow-2xl relative">
          {/* 烤箱門玻璃視窗 */}
          <div className="w-56 h-40 rounded-2xl bg-slate-950 border-4 border-slate-600 relative overflow-hidden flex items-center justify-center">
            {/* 上下電熱管發光效果 */}
            <div
              className={`absolute top-2 w-48 h-2 rounded-full transition-all duration-300 ${
                temp > 190
                  ? 'bg-rose-500 shadow-[0_0_15px_#f43f5e]'
                  : isPreheated
                  ? 'bg-orange-500 shadow-[0_0_10px_#ea580c]'
                  : 'bg-slate-700'
              }`}
            />
            <div
              className={`absolute bottom-2 w-48 h-2 rounded-full transition-all duration-300 ${
                temp > 190
                  ? 'bg-rose-500 shadow-[0_0_15px_#f43f5e]'
                  : isPreheated
                  ? 'bg-orange-500 shadow-[0_0_10px_#ea580c]'
                  : 'bg-slate-700'
              }`}
            />

            {/* 視窗內溫暖金光與蛋糕剪影 */}
            <div
              className={`w-36 h-20 rounded-xl transition-all duration-500 flex items-center justify-center ${
                isPreheated
                  ? temp > 195
                    ? 'bg-orange-950/80 border border-rose-500/50'
                    : 'bg-amber-500/20 border border-amber-500/30'
                  : 'bg-slate-900'
              }`}
            >
              <span className="text-3xl filter drop-shadow">🍰</span>
            </div>

            {/* 烤箱溫度與計時 LCD 儀表 */}
            <div className="absolute top-2 left-3 text-[10px] font-mono text-emerald-400">
              {temp}°C / {minutes}m
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isPreheated ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'
              }`}
            />
            <span className="text-xs font-mono text-slate-300">
              {isPreheated ? 'PREHEATED: 180°C READY' : 'NO PREHEAT (COLD OVEN)'}
            </span>
          </div>
        </div>

        {/* 右側：烤箱控制旋鈕與開關 */}
        <div className="md:col-span-7 space-y-5">
          {/* 預熱開關 */}
          <button
            onClick={() => {
              sfx.playBeep(isPreheated ? 400 : 900, 0.05);
              setIsPreheated(!isPreheated);
            }}
            className={`w-full p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
              isPreheated
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
                : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}
          >
            <Power
              className={`w-5 h-5 ${
                isPreheated ? 'text-emerald-600' : 'text-slate-400'
              }`}
            />
            <div className="text-xs">
              <div className="font-bold">
                {isPreheated
                  ? '烤箱已提前預熱至 180°C (Preheated)'
                  : '未預熱（冷爐直接烘烤）'}
              </div>
              <div className="text-[10px] opacity-75">點擊切換預熱開關</div>
            </div>
          </button>

          {/* 烘烤溫度調整 */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" />
                烘烤溫度設定 (Temperature)
              </span>
              <span
                className={`font-mono text-sm font-bold ${
                  isTempIdeal ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {temp}°C {isTempIdeal ? '（標準黃金溫控）' : temp > 190 ? '（過熱危險）' : '（溫度過低）'}
              </span>
            </div>
            <input
              type="range"
              min="150"
              max="220"
              step="5"
              value={temp}
              onChange={(e) => {
                sfx.playBeep(parseInt(e.target.value) * 3, 0.02);
                setTemp(parseInt(e.target.value));
              }}
              className="w-full h-3 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>150°C</span>
              <span className="text-emerald-600 font-bold">180°C 標準</span>
              <span>220°C 焦化</span>
            </div>
          </div>

          {/* 烘烤時間設定 */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-500" />
                烘烤時間設定 (Bake Time)
              </span>
              <span
                className={`font-mono text-sm font-bold ${
                  isTimeIdeal ? 'text-emerald-600' : 'text-amber-700'
                }`}
              >
                {minutes} 分鐘 {isTimeIdeal ? '（理想時間）' : ''}
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="45"
              step="1"
              value={minutes}
              onChange={(e) => {
                sfx.playBeep(parseInt(e.target.value) * 20, 0.02);
                setMinutes(parseInt(e.target.value));
              }}
              className="w-full h-3 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>15 分鐘</span>
              <span className="text-emerald-600 font-bold">25~30 分鐘 標準</span>
              <span>45 分鐘</span>
            </div>
          </div>
        </div>
      </div>

      <ChefTipBox
        type="science"
        tip="熱對流物理學：海綿蛋糕的膨脹來自麵糊內部微氣孔中的水分迅速受熱轉化為水蒸氣膨脹。預熱 180°C 能讓外層蛋白質及時凝固定型，支撐起蓬鬆高聳的雲朵結構！"
      />

      <div className="flex justify-end pt-2">
        <button
          onClick={() => {
            sfx.playOvenDing();
            onComplete(isPreheated, temp, minutes);
          }}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm flex items-center gap-2 shadow-xl shadow-orange-500/25 transition-all active:scale-95"
        >
          <span>🔥 送入烤箱烘烤！出爐揭曉</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
