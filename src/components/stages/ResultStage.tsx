import React from 'react';
import { RotateCcw, Award, CheckCircle2, AlertTriangle, XCircle, Sparkles, HelpCircle } from 'lucide-react';
import { EndingId, EvaluationResult } from '../../types/game.types';
import { ENDINGS_CONFIG } from '../../constants/endingsData';
import { EndingCakeSvg } from '../illustrations/EndingCakeSvg';
import { sfx } from '../../utils/soundEffects';

interface ResultStageProps {
  evaluation: EvaluationResult;
  targetServings: number;
  onRestart: () => void;
  onSelectEndingPreview: (ending: EndingId) => void;
}

export const ResultStage: React.FC<ResultStageProps> = ({
  evaluation,
  targetServings,
  onRestart,
  onSelectEndingPreview,
}) => {
  const endingConfig = ENDINGS_CONFIG[evaluation.primaryEnding];

  const getStatusIcon = (status: 'perfect' | 'warning' | 'fail') => {
    switch (status) {
      case 'perfect':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />;
      case 'fail':
        return <XCircle className="w-4 h-4 text-rose-500 shrink-0" />;
    }
  };

  const getStatusBadge = (status: 'perfect' | 'warning' | 'fail') => {
    switch (status) {
      case 'perfect':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
            ✅ 完美工藝
          </span>
        );
      case 'warning':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
            ⚠️ 稍有偏差
          </span>
        );
      case 'fail':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
            ❌ 科學失誤
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn py-2">
      {/* 結局核心卡片 */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-2 border-amber-200 overflow-hidden relative">
        <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
          {/* 左側：結局文案與評價 */}
          <div className="space-y-3 flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-slate-900 text-amber-300 shadow-sm">
                {endingConfig.badge}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900">
                {endingConfig.tag}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-slate-500 bg-slate-100">
                目標人數: {targetServings} 人份
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black font-serif-tc text-slate-900 tracking-tight">
              {endingConfig.title}
            </h2>

            <p className="text-xs md:text-sm font-semibold text-amber-700">
              {endingConfig.subtitle}
            </p>

            <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-xl">
              {endingConfig.description}
            </p>

            {/* 主廚毒舌或讚美短語 */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs italic text-slate-700 font-serif-tc">
              {endingConfig.chefQuote}
            </div>
          </div>

          {/* 右側：專屬蛋糕動態 SVG */}
          <div className="shrink-0 flex flex-col items-center justify-center p-2">
            <EndingCakeSvg ending={evaluation.primaryEnding} className="w-64 h-52 filter drop-shadow-md" />
          </div>
        </div>

        {/* 重新挑戰與操作按鈕 */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>下滑查閱全步驟藍帶主廚科學診斷報告 ⬇️</span>
          </div>

          <button
            onClick={() => {
              sfx.playSuccess();
              onRestart();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重新挑戰烘焙</span>
          </button>
        </div>
      </div>

      {/* 全步驟藍帶主廚科學診斷報告卡片 */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-amber-200/80 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-950 text-amber-300 flex items-center justify-center font-bold text-sm">
              📋
            </div>
            <div>
              <h3 className="text-base font-bold font-serif-tc text-slate-900">
                全步驟藍帶科學診斷報告 (Chef Diagnostic Report)
              </h3>
              <p className="text-[11px] text-slate-400">
                逐一步驟解析食材物理化學反應與操作細節
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
            共 {evaluation.diagnostics.length} 項指標評估
          </span>
        </div>

        {/* 診斷項目列表 */}
        <div className="space-y-3">
          {evaluation.diagnostics.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border transition-colors flex items-start gap-3 ${
                item.status === 'perfect'
                  ? 'bg-emerald-50/40 border-emerald-200/70 hover:border-emerald-300'
                  : item.status === 'warning'
                  ? 'bg-amber-50/50 border-amber-200 hover:border-amber-300'
                  : 'bg-rose-50/50 border-rose-200 hover:border-rose-300'
              }`}
            >
              <div className="mt-0.5">{getStatusIcon(item.status)}</div>

              <div className="flex-1 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900">{item.stepTitle}</div>
                  <div>{getStatusBadge(item.status)}</div>
                </div>

                <div className="font-medium text-slate-700">{item.summary}</div>

                <div className="text-[11px] text-slate-500 bg-white/70 p-2 rounded-lg border border-black/5 leading-relaxed">
                  <span className="font-bold text-slate-700">🔬 藍帶烘焙原理：</span>
                  <span>{item.scienceExplanation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部 Demo 結局快速預覽列 */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-lg border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <HelpCircle className="w-4 h-4" />
            <span>期末發表專用：快速切換預覽其他 5 種結局</span>
          </div>
          <span className="text-[10px] text-slate-400">點擊即時更換展示</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {(
            [
              { id: 'perfect', label: '👑 完美蛋糕' },
              { id: 'piggy', label: '🐷 吃成豬豬' },
              { id: 'cracked', label: '💥 表面裂開' },
              { id: 'darkEdges', label: '🔥 邊緣焦黑' },
              { id: 'denseDry', label: '🧱 組織乾硬' },
              { id: 'uneven', label: '📐 形狀歪斜' },
            ] as const
          ).map((e) => (
            <button
              key={e.id}
              onClick={() => {
                if (e.id === 'piggy') sfx.playPiggy();
                else if (e.id === 'perfect') sfx.playSuccess();
                else sfx.playFail();
                onSelectEndingPreview(e.id);
              }}
              className={`p-2 rounded-xl text-center text-xs font-bold transition-all ${
                evaluation.primaryEnding === e.id
                  ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-white/50 scale-102'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {e.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
