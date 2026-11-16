import { EndingConfig, EndingId } from '../types/game.types';

export const ENDINGS_CONFIG: Record<EndingId, EndingConfig> = {
  piggy: {
    id: 'piggy',
    title: '吃成豬豬！小廚師的大胃王派對',
    subtitle: '明明只做少少幾人份，卻直接照抄 10 人份巨量原料！',
    tag: '份量暴走 / 搞笑結局',
    badge: '🐷 大胃王特級主廚',
    description:
      '你端出了一座宛如小山丘般巨大的怪獸級海綿蛋糕！整整 10 人份的熱量與飽足感，讓品嚐的人肚子圓滾滾，直接變成可愛的小豬豬躺平休息。下次秤重前，記得先拿出計算機換算目標人數呀！',
    chefQuote: '「藍帶第一課：秤重不是考抄寫，是考乘除法！1人份放10人份的料，難怪烤盤差點炸開！」',
    themeColor: 'from-pink-500 to-rose-400',
  },
  cracked: {
    id: 'cracked',
    title: '大峽谷爆裂！表面撕裂火山蛋糕',
    subtitle: '筋度過強、麵粉超標或過度攪拌，導致表面承受不住膨脹而炸開。',
    tag: '麵筋失控 / 結構失敗',
    badge: '💥 地震裂痕探索者',
    description:
      '剛出爐的蛋糕頂部裂開了一條深不見底的鴻溝！外觀雖然充滿戲劇性，但切開後口感偏硬，失去了法式海綿蛋糕該有的細膩毛孔。',
    chefQuote: '「選錯麵粉筋度或攪拌過頭會產生過多麵筋網；當內部蒸氣無法溫柔穿透，只能把頂部無情撕裂！」',
    themeColor: 'from-amber-600 to-red-500',
  },
  darkEdges: {
    id: 'darkEdges',
    title: '黑森林邊界！外圈焦黑苦澀蛋糕',
    subtitle: '白糖放太多引發過度梅納與焦糖化，或是烤箱溫度飆太高。',
    tag: '溫度超標 / 焦糖過度',
    badge: '🔥 炭烤邊緣藝術家',
    description:
      '蛋糕四周呈現深深的焦褐色，甚至帶有一點苦味！雖然中心依稀有檸檬香，但外圈的過度烘烤掩蓋了精緻的奶油香氣。',
    chefQuote: '「糖是維持保濕的好朋友，但也是焦糖化反應的燃料！糖太多或溫度破表，邊緣就會瞬間燒成黑炭。」',
    themeColor: 'from-stone-700 to-amber-900',
  },
  denseDry: {
    id: 'denseDry',
    title: '檸檬水泥磚！又硬又乾的壓模海綿',
    subtitle: '全蛋打發升溫太快熟化消泡、糖份過多或烤箱溫度過低烤乾水分。',
    tag: '消泡失誤 / 組織乾硬',
    badge: '🧱 堅如磐石烘焙師',
    description:
      '切下去彷彿在切一塊厚實扎實的粿或水泥磚！蛋糕幾乎沒有蓬鬆氣孔，咬起來乾口黏牙，完全感受不到輕盈的雲朵口感。',
    chefQuote: '「全蛋打發是靠均勻微溫延展蛋白質薄膜；若升溫太猛，蛋白質直接凝固硬化，再也包不住任何空氣！」',
    themeColor: 'from-yellow-700 to-stone-600',
  },
  uneven: {
    id: 'uneven',
    title: '比薩斜塔！高低起伏的失衡蛋糕',
    subtitle: '入模時未用刮刀抹平，或是烤箱未預熱均勻受熱不一。',
    tag: '平整失誤 / 歪斜受熱',
    badge: '📐 幾何抽象派大師',
    description:
      '這塊蛋糕一邊高聳入雲、一邊低窪塌陷！切片擺盤時全部東倒西歪，兩邊的熟度甚至截然不同，一邊過熟一邊軟黏。',
    chefQuote: '「法式甜點講究嚴謹的對稱與幾何美學！麵糊進烤箱前不撫平，烤箱熱對流就會順著斜坡造成不均勻膨脹。」',
    themeColor: 'from-orange-500 to-amber-600',
  },
  perfect: {
    id: 'perfect',
    title: '藍帶最高榮譽！極致法式檸檬海綿蛋糕',
    subtitle: '精準換算原料、細膩控溫打發、黃金比例出爐的經典傳世之作！',
    tag: '完美榮譽 / 藍帶勳章',
    badge: '👑 法式藍帶金獎主廚',
    description:
      '金黃均勻的外皮泛著柔和光澤，切開時散發撲鼻的清甜檸檬精油與醇厚乳香！組織如雲朵般輕盈彈潤、濕潤細緻，入口即化，酸甜平衡達到極致巔峰！',
    chefQuote: '「Félicitations! 你的科學秤重、溫柔切拌與精準火候，完美展現了藍帶廚藝學院的精神與驕傲！」',
    themeColor: 'from-amber-400 via-yellow-300 to-yellow-500',
  },
};
