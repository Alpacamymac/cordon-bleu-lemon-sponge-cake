import React from 'react';
import { Lightbulb, Atom, AlertTriangle } from 'lucide-react';

interface ChefTipBoxProps {
  tip: string;
  title?: string;
  type?: 'info' | 'warning' | 'science';
}

export const ChefTipBox: React.FC<ChefTipBoxProps> = ({
  tip,
  title = '藍帶主廚科學小叮嚀',
  type = 'info',
}) => {
  const getColors = () => {
    switch (type) {
      case 'warning':
        return {
          bg: 'bg-rose-50 border-rose-300 text-rose-950',
          badge: 'bg-rose-600 text-white',
          icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
        };
      case 'science':
        return {
          bg: 'bg-blue-50 border-blue-300 text-blue-950',
          badge: 'bg-blue-700 text-white',
          icon: <Atom className="w-4 h-4 text-blue-600 animate-spin-slow" />,
        };
      case 'info':
      default:
        return {
          bg: 'bg-amber-50/90 border-amber-300 text-amber-950',
          badge: 'bg-amber-600 text-white',
          icon: <Lightbulb className="w-4 h-4 text-amber-600" />,
        };
    }
  };

  const current = getColors();

  return (
    <div
      className={`rounded-xl border p-3.5 shadow-xs transition-all flex items-start gap-3 ${current.bg}`}
    >
      <div className="shrink-0 mt-0.5">{current.icon}</div>
      <div className="text-xs space-y-1">
        <div className="font-bold tracking-wide flex items-center gap-1.5">
          <span>{title}</span>
        </div>
        <p className="leading-relaxed opacity-90">{tip}</p>
      </div>
    </div>
  );
};
