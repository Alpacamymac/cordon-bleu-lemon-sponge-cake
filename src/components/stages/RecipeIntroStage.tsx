import React from 'react';
import { ChefHat, Users, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { FOUR_CHEF_SECRETS, INGREDIENTS_CONFIG, INGREDIENT_ORDER, STANDARD_RECIPE_SERVINGS } from '../../constants/recipeData';
import { sfx } from '../../utils/soundEffects';

interface RecipeIntroStageProps {
  targetServings: number;
  onSelectServings: (servings: number) => void;
  onStartGame: () => void;
}

export const RecipeIntroStage: React.FC<RecipeIntroStageProps> = ({
  targetServings,
  onSelectServings,
  onStartGame,
}) => {
  const servingOptions = [1, 2, 5, 10];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn py-2">
      {/* 藍帶主廚歡迎旗幟卡片 */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-amber-300/30 relative overflow-hidden">
        {/* 背景光暈效果 */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>法國巴黎藍帶廚藝學院 (Le Cordon Bleu Paris) 烘焙工坊</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold font-serif-tc text-white tracking-tight">
              法式經典檸檬海綿蛋糕挑戰
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              歡迎來到藍帶主廚的甜點工作台！法式海綿蛋糕（Génoise au citron）以全蛋打發的高雅膨脹科學聞名。
              請仔細閱讀主廚標準食譜，準備好親自進入工坊大展身手！
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="text-5xl mb-1">🍋</div>
            <span className="text-xs font-bold text-amber-300 tracking-wider">CHEF CHALLENGE</span>
          </div>
        </div>
      </div>

      {/* 核心工作台：10 人份標準食譜卡片 */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-amber-200/80 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-amber-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif-tc text-slate-900">
                主廚標準食譜配方 ({STANDARD_RECIPE_SERVINGS} 人份)
              </h2>
              <p className="text-xs text-slate-400">Standard Ingredients for 10 Portions</p>
            </div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold border border-slate-200">
            基準：10 人份
          </span>
        </div>

        {/* 食材網格 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {INGREDIENT_ORDER.map((id) => {
            const item = INGREDIENTS_CONFIG[id];
            return (
              <div
                key={id}
                className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/60 hover:border-amber-300 transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="text-xs font-mono text-slate-400">{item.unit}</span>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">{item.name}</div>
                  <div className="text-lg font-extrabold text-slate-900 font-mono">
                    {item.baseAmount}
                    <span className="text-xs font-normal text-slate-500 ml-0.5">{item.unit}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 烘焙四大完美秘訣 */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
            <ChefHat className="w-4 h-4 text-amber-600" /> 主廚烘焙工藝原則
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
            {FOUR_CHEF_SECRETS.map((secret, idx) => (
              <div key={idx} className="flex gap-1.5 items-start">
                <span className="text-amber-600 font-bold">•</span>
                <span>
                  <strong className="text-slate-800">{secret.title}：</strong>
                  {secret.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 設定目標人數與進入按鈕 (自然設定，不刻意提醒換算陷阱) */}
        <div className="pt-4 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 whitespace-nowrap">
              <Users className="w-4 h-4 text-blue-900" />
              <span>你想製作幾人份？</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 w-full sm:w-auto justify-center">
              {servingOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    sfx.playBeep(480 + opt * 30, 0.05);
                    onSelectServings(opt);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    targetServings === opt
                      ? 'bg-blue-950 text-amber-300 shadow-sm scale-105'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  {opt} 人份
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              sfx.playSuccess();
              onStartGame();
            }}
            className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all transform active:scale-95"
          >
            <span>進入烘焙工作台</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
