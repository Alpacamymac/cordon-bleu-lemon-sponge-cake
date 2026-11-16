import React from 'react';

interface BowlVisualSvgProps {
  color?: string; // 麵糊顏色 (如 '#fef08a', '#facc15')
  isWhisking?: boolean;
  showFlourSift?: boolean;
  bubbleCount?: number;
  className?: string;
  hasZest?: boolean;
}

export const BowlVisualSvg: React.FC<BowlVisualSvgProps> = ({
  color = '#fef08a',
  isWhisking = false,
  showFlourSift = false,
  bubbleCount = 5,
  className = 'w-56 h-44',
  hasZest = true,
}) => {
  return (
    <svg viewBox="0 0 240 180" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* 不鏽鋼攪拌盆漸層 */}
        <linearGradient id="metalBowl" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="25%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#f8fafc" />
          <stop offset="75%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>

        {/* 麵糊液體漸層 */}
        <radialGradient id="batterGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="40%" stopColor={color} />
          <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.8" />
        </radialGradient>
      </defs>

      {/* 陰影 */}
      <ellipse cx="120" cy="168" rx="85" ry="10" fill="#000000" opacity="0.15" />

      {/* 不鏽鋼打蛋盆底部與盆壁 */}
      <path
        d="M 25 60 C 25 155, 215 155, 215 60 Z"
        fill="url(#metalBowl)"
        stroke="#475569"
        strokeWidth="2.5"
      />
      {/* 鋼盆邊緣反光卷邊 */}
      <ellipse cx="120" cy="60" rx="95" ry="16" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
      <ellipse cx="120" cy="62" rx="90" ry="13" fill="#64748b" opacity="0.3" />

      {/* 盆內麵糊海 */}
      <ellipse
        cx="120"
        cy="76"
        rx="80"
        ry="20"
        fill="url(#batterGrad)"
        className={isWhisking ? 'animate-pulse' : ''}
      />
      {/* 麵糊漩渦線 (攪拌時動態旋轉) */}
      {isWhisking && (
        <g className="animate-spin origin-[120px_76px]">
          <path
            d="M 100 76 Q 120 68 140 76 Q 120 84 100 76"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>
      )}

      {/* 檸檬碎皮綠黃斑點 */}
      {hasZest && (
        <g opacity="0.85">
          <circle cx="85" cy="74" r="1.5" fill="#65a30d" />
          <circle cx="110" cy="78" r="1.5" fill="#ca8a04" />
          <circle cx="135" cy="72" r="1.5" fill="#65a30d" />
          <circle cx="150" cy="79" r="1.5" fill="#ca8a04" />
          <circle cx="95" cy="81" r="1.2" fill="#65a30d" />
        </g>
      )}

      {/* 打發細緻微氣泡 */}
      {Array.from({ length: bubbleCount }).map((_, i) => (
        <circle
          key={i}
          cx={75 + (i * 22) % 90}
          cy={70 + ((i * 13) % 12)}
          r={2 + (i % 2)}
          fill="#ffffff"
          opacity="0.75"
        />
      ))}

      {/* 過篩落粉效果 (白色微粒緩緩落下) */}
      {showFlourSift && (
        <g className="animate-bounce" opacity="0.9">
          <circle cx="95" cy="35" r="2" fill="#ffffff" />
          <circle cx="115" cy="42" r="2.5" fill="#ffffff" />
          <circle cx="130" cy="30" r="1.8" fill="#ffffff" />
          <circle cx="145" cy="46" r="2.2" fill="#ffffff" />
          <circle cx="105" cy="50" r="2" fill="#ffffff" />
        </g>
      )}

      {/* 打蛋器或刮刀插在盆中 */}
      {isWhisking ? (
        <g className="animate-whisk origin-[120px_75px]">
          {/* 打蛋器手柄 */}
          <line x1="120" y1="75" x2="165" y2="15" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
          {/* 鋼線鋼圈 */}
          <ellipse cx="125" cy="68" rx="14" ry="20" fill="none" stroke="#64748b" strokeWidth="2" />
        </g>
      ) : (
        <g opacity="0.85">
          {/* 靜置時的刮刀 */}
          <line x1="140" y1="75" x2="175" y2="25" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
          <polygon points="135,70 145,80 130,85" fill="#dc2626" />
        </g>
      )}
    </svg>
  );
};
