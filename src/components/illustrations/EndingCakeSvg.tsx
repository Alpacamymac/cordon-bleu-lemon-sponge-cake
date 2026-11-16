import React from 'react';
import { EndingId } from '../../types/game.types';

interface EndingCakeSvgProps {
  ending: EndingId;
  className?: string;
}

export const EndingCakeSvg: React.FC<EndingCakeSvgProps> = ({ ending, className = 'w-64 h-52' }) => {
  switch (ending) {
    case 'perfect':
      return (
        <svg viewBox="0 0 300 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="goldCake" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="40%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="plateGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* 銀色法式托盤 */}
          <ellipse cx="150" cy="205" rx="130" ry="24" fill="#94a3b8" opacity="0.3" />
          <ellipse cx="150" cy="200" rx="125" ry="20" fill="url(#plateGrad)" stroke="#94a3b8" strokeWidth="2" />
          <ellipse cx="150" cy="198" rx="100" ry="14" fill="#f8fafc" />

          {/* 完美膨脹黃金海綿蛋糕體 */}
          <path
            d="M 65 185 C 65 195, 235 195, 235 185 L 235 120 C 235 75, 65 75, 65 120 Z"
            fill="url(#goldCake)"
            stroke="#b45309"
            strokeWidth="2.5"
          />
          {/* 頂部圓潤弧度 */}
          <ellipse cx="150" cy="115" rx="85" ry="32" fill="#fef08a" opacity="0.8" />
          <path
            d="M 70 120 C 95 85, 205 85, 230 120"
            fill="none"
            stroke="#fde047"
            strokeWidth="3"
            opacity="0.9"
          />

          {/* 檸檬糖霜淋面 */}
          <path
            d="M 80 122 Q 95 142 110 122 Q 130 148 150 122 Q 170 145 190 122 Q 205 138 220 122"
            fill="none"
            stroke="#ffffff"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* 裝飾：新鮮檸檬切片 */}
          <g transform="translate(140, 80) rotate(-15)">
            <ellipse cx="0" cy="0" rx="20" ry="12" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
            <ellipse cx="0" cy="0" rx="16" ry="9" fill="#fef08a" />
            {/* 檸檬瓣 */}
            <path d="M -12 0 L 12 0 M 0 -7 L 0 7" stroke="#ca8a04" strokeWidth="1" />
          </g>

          {/* 薄荷葉 */}
          <path d="M 160 76 Q 178 70 178 82 Q 165 85 160 76 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />

          {/* 閃耀星星 Sparkles */}
          <text x="50" y="70" fontSize="18" fill="#eab308" filter="url(#glow)">✨</text>
          <text x="235" y="80" fontSize="22" fill="#eab308" filter="url(#glow)">✨</text>
          <text x="140" y="45" fontSize="16" fill="#eab308" filter="url(#glow)">⭐</text>
        </svg>
      );

    case 'piggy':
      return (
        <svg viewBox="0 0 300 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pigPink" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
            <linearGradient id="hugeCake" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          {/* 超載變形的大托盤 */}
          <ellipse cx="150" cy="210" rx="140" ry="20" fill="#cbd5e1" stroke="#64748b" strokeWidth="3" />

          {/* 超巨大 10 人份山丘蛋糕體 */}
          <path
            d="M 40 200 C 30 110, 270 110, 260 200 Z"
            fill="url(#hugeCake)"
            stroke="#92400e"
            strokeWidth="3"
          />

          {/* 趴在蛋糕上的可愛豬豬 */}
          <g transform="translate(150, 130)">
            {/* 豬肚子/身體 */}
            <ellipse cx="0" cy="15" rx="55" ry="42" fill="url(#pigPink)" stroke="#db2777" strokeWidth="2.5" />

            {/* 豬耳朵 */}
            <polygon points="-42,-15 -25,-35 -15,-18" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
            <polygon points="42,-15 25,-35 15,-18" fill="#f472b6" stroke="#db2777" strokeWidth="2" />

            {/* 豬眼睛 (瞇瞇眼滿足笑) */}
            <path d="M -22 -2 Q -15 -8 -8 -2" fill="none" stroke="#831843" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 8 -2 Q 15 -8 22 -2" fill="none" stroke="#831843" strokeWidth="2.5" strokeLinecap="round" />

            {/* 豬鼻子 */}
            <ellipse cx="0" cy="10" rx="18" ry="12" fill="#f43f5e" stroke="#be123c" strokeWidth="2" />
            <circle cx="-6" cy="10" r="3" fill="#881337" />
            <circle cx="6" cy="10" r="3" fill="#881337" />

            {/* 臉頰腮紅 */}
            <ellipse cx="-30" cy="8" rx="7" ry="5" fill="#fb7185" opacity="0.6" />
            <ellipse cx="30" cy="8" rx="7" ry="5" fill="#fb7185" opacity="0.6" />

            {/* 小廚師帽 */}
            <path d="M -15 -32 C -22 -45, 22 -45, 15 -32 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          </g>

          {/* 四周掉滿的蛋糕屑與飽足符號 */}
          <circle cx="50" cy="195" r="4" fill="#b45309" />
          <circle cx="65" cy="202" r="3" fill="#d97706" />
          <circle cx="240" cy="198" r="5" fill="#b45309" />
          <text x="210" y="70" fontSize="22">💤</text>
          <text x="225" y="50" fontSize="26">🍔</text>
        </svg>
      );

    case 'cracked':
      return (
        <svg viewBox="0 0 300 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="crackedCake" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          <ellipse cx="150" cy="205" rx="125" ry="20" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />

          {/* 蛋糕主體 */}
          <path
            d="M 65 190 C 65 200, 235 200, 235 190 L 235 125 C 235 70, 65 70, 65 125 Z"
            fill="url(#crackedCake)"
            stroke="#78350f"
            strokeWidth="2.5"
          />

          {/* 頂部撕裂開口 */}
          <path
            d="M 80 115 Q 120 125 150 115 Q 180 105 220 115"
            fill="none"
            stroke="#78350f"
            strokeWidth="2"
          />
          {/* 大峽谷裂痕 (Jagged crack) */}
          <polygon
            points="140,85 148,105 142,120 156,140 146,160 158,168 140,155 146,135 138,110"
            fill="#451a03"
            stroke="#290e02"
            strokeWidth="1.5"
          />

          {/* 裂縫中噴出的猛烈高溫蒸氣 */}
          <path
            d="M 148 80 Q 140 50 155 35 Q 148 20 160 10"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="3.5"
            strokeDasharray="4 4"
            opacity="0.8"
          />
          <path
            d="M 142 80 Q 130 55 138 40"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="2.5"
            strokeDasharray="3 3"
            opacity="0.8"
          />

          {/* 裂紋細枝 */}
          <path d="M 148 105 L 175 95 M 142 120 L 115 128" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
          <text x="210" y="80" fontSize="22">💥</text>
        </svg>
      );

    case 'darkEdges':
      return (
        <svg viewBox="0 0 300 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="burntGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1c1917" />
              <stop offset="25%" stopColor="#78350f" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="75%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#1c1917" />
            </linearGradient>
          </defs>
          <ellipse cx="150" cy="205" rx="125" ry="20" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />

          {/* 焦黑邊緣蛋糕主體 */}
          <path
            d="M 65 190 C 65 200, 235 200, 235 190 L 235 120 C 235 75, 65 75, 65 120 Z"
            fill="url(#burntGrad)"
            stroke="#1c1917"
            strokeWidth="3"
          />
          {/* 頂部邊緣完全焦黑 */}
          <ellipse cx="150" cy="115" rx="85" ry="30" fill="#292524" />
          <ellipse cx="150" cy="115" rx="60" ry="20" fill="#ca8a04" opacity="0.9" />

          {/* 焦黑碳化物斑點 */}
          <circle cx="80" cy="140" r="5" fill="#0c0a09" />
          <circle cx="95" cy="165" r="4" fill="#0c0a09" />
          <circle cx="220" cy="145" r="6" fill="#0c0a09" />
          <circle cx="205" cy="170" r="4" fill="#0c0a09" />

          {/* 冒黑煙 Smoke */}
          <path
            d="M 75 110 Q 65 80 80 60 Q 70 40 85 20"
            fill="none"
            stroke="#57534e"
            strokeWidth="3"
            opacity="0.7"
          />
          <path
            d="M 225 110 Q 235 80 220 60 Q 230 40 215 20"
            fill="none"
            stroke="#57534e"
            strokeWidth="3"
            opacity="0.7"
          />
          <text x="140" y="60" fontSize="24">🔥</text>
        </svg>
      );

    case 'denseDry':
      return (
        <svg viewBox="0 0 300 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="150" cy="205" rx="125" ry="20" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />

          {/* 扁平未膨起、磚塊狀的蛋糕體 */}
          <path
            d="M 70 195 L 230 195 L 230 160 L 70 160 Z"
            fill="#ca8a04"
            stroke="#854d0e"
            strokeWidth="2.5"
          />
          <polygon points="70,160 230,160 220,145 80,145" fill="#a16207" stroke="#854d0e" strokeWidth="2" />

          {/* 乾硬橫向龜裂與掉屑 */}
          <line x1="90" y1="175" x2="140" y2="175" stroke="#713f12" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="160" y1="180" x2="210" y2="180" stroke="#713f12" strokeWidth="2" strokeDasharray="4 2" />

          <text x="135" y="115" fontSize="26">🧱</text>
          <text x="180" y="130" fontSize="18">💨</text>
          <rect x="65" y="200" width="8" height="6" fill="#854d0e" rx="1" />
          <rect x="225" y="202" width="6" height="5" fill="#854d0e" rx="1" />
        </svg>
      );

    case 'uneven':
      return (
        <svg viewBox="0 0 300 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="150" cy="205" rx="125" ry="20" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />

          {/* 東倒西歪、一邊高一邊塌的斜蛋糕 */}
          <path
            d="M 65 190 C 65 195, 235 195, 235 190 L 235 155 C 190 145, 130 90, 65 100 Z"
            fill="#eab308"
            stroke="#a16207"
            strokeWidth="2.5"
          />
          {/* 歪斜的頂部 */}
          <path
            d="M 65 100 Q 140 120 235 155"
            fill="none"
            stroke="#ca8a04"
            strokeWidth="3"
          />

          {/* 坍塌流下來的麵糊感 */}
          <path d="M 200 160 Q 215 180 230 165" fill="#ca8a04" opacity="0.6" />

          {/* 傾斜量角器與問號 */}
          <text x="90" y="80" fontSize="22">📐</text>
          <text x="210" y="110" fontSize="22">❓</text>
        </svg>
      );

    default:
      return null;
  }
};
