import React from 'react';
import { X, Award, Sparkles } from 'lucide-react';
import { FOUR_CHEF_SECRETS, INGREDIENTS_CONFIG, INGREDIENT_ORDER, STANDARD_RECIPE_SERVINGS } from '../../constants/recipeData';
import { sfx } from '../../utils/soundEffects';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border-4 border-amber-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-amber-300/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xl shadow">
              👨‍🍳
            </div>
            <div>
              <div className="text-xs uppercase text-amber-300 font-semibold tracking-wider flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> 法式藍帶經典食譜手冊
              </div>
              <h2 className="text-lg font-bold font-serif-tc text-white">
                藍帶檸檬海綿蛋糕（{STANDARD_RECIPE_SERVINGS} 人份標準配方）
              </h2>
            </div>
          </div>
          <button
            onClick={() => {
              sfx.playBeep(450, 0.05);
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 bg-amber-50/30 text-slate-800">
          {/* 原版食材清單卡片 */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              標準 10 人份原料基準清單 (Standard Ingredients for 10)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {INGREDIENT_ORDER.map((id) => {
                const item = INGREDIENTS_CONFIG[id];
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-amber-200/80 shadow-xs hover:border-amber-400 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="font-bold text-sm text-slate-800">{item.name}</div>
                        <div className="text-[11px] text-slate-400">{item.nameEn}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-extrabold text-amber-700 font-mono">
                        {item.baseAmount}
                      </span>
                      <span className="text-xs text-slate-500 ml-0.5">{item.unit}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 藍帶主廚 4 大完美秘訣 */}
          <div className="bg-amber-100/70 border border-amber-300 rounded-xl p-4">
            <h4 className="text-sm font-bold text-amber-900 flex items-center gap-1.5 mb-2.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              藍帶烘焙科學：四大完美海綿蛋糕秘訣
            </h4>
            <div className="space-y-2 text-xs text-amber-950 leading-relaxed">
              {FOUR_CHEF_SECRETS.map((secret, i) => (
                <div key={i} className="flex gap-2">
                  <span className="font-bold text-amber-700 shrink-0">{i + 1}.</span>
                  <div>
                    <span className="font-bold text-slate-900">{secret.title}：</span>
                    <span>{secret.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => {
              sfx.playBeep(450, 0.05);
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-all shadow-sm active:scale-95"
          >
            我記住了，關閉手冊
          </button>
        </div>
      </div>
    </div>
  );
};
