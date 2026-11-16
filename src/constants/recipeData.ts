import { IngredientConfig, IngredientId } from '../types/game.types';

export const STANDARD_RECIPE_SERVINGS = 10;

export const INGREDIENTS_CONFIG: Record<IngredientId, IngredientConfig> = {
  butter: {
    id: 'butter',
    name: '無鹽奶油',
    nameEn: 'Unsalted Butter',
    baseAmount: 170,
    unit: 'g',
    tolerance: 0.1, // ±10%
    step: 1,
    icon: '🧈',
    description: '提供濃郁奶香與蛋糕內部柔軟保濕質地。',
  },
  eggs: {
    id: 'eggs',
    name: '全蛋（3顆）',
    nameEn: 'Whole Eggs',
    baseAmount: 150,
    unit: 'g',
    tolerance: 0.1, // ±10%
    step: 1,
    icon: '🥚',
    description: '法式海綿蛋糕的充氣核心，提供結構支撐與細緻氣孔。',
  },
  sugar: {
    id: 'sugar',
    name: '細白砂糖',
    nameEn: 'Caster Sugar',
    baseAmount: 165,
    unit: 'g',
    tolerance: 0.1, // ±10%
    step: 1,
    icon: '🧂',
    description: '穩定全蛋打發氣泡結構，賦予蛋糕濕潤度與烘烤焦糖化香氣。',
  },
  lemonZest: {
    id: 'lemonZest',
    name: '碎檸檬皮（1顆）',
    nameEn: 'Lemon Zest',
    baseAmount: 10,
    unit: 'g',
    tolerance: 0.2, // ±20%
    step: 0.5,
    icon: '🍋',
    description: '檸檬精油揮發層，與白糖揉合可大幅激發天然果香。',
  },
  lemonJuice: {
    id: 'lemonJuice',
    name: '新鮮檸檬汁',
    nameEn: 'Lemon Juice',
    baseAmount: 50,
    unit: 'ml',
    tolerance: 0.15, // ±15%
    step: 1,
    icon: '🧪',
    description: '酸性物質，平衡甜味並微調蛋白質凝固速度。',
  },
  flour: {
    id: 'flour',
    name: '低筋麵粉',
    nameEn: 'Cake Flour',
    baseAmount: 170,
    unit: 'g',
    tolerance: 0.1, // ±10%
    step: 1,
    icon: '🌾',
    description: '蛋白質含量約 7-9%，支撐蛋糕蓬鬆柔軟骨架，避免過度筋性。',
  },
  bakingPowder: {
    id: 'bakingPowder',
    name: '泡打粉（½茶匙）',
    nameEn: 'Baking Powder',
    baseAmount: 3,
    unit: 'g',
    tolerance: 0.2, // ±20%
    step: 0.1,
    icon: '🥄',
    description: '化學膨脹劑，遇熱釋放二氧化碳輔助麵糊受熱膨脹。',
  },
};

export const INGREDIENT_ORDER: IngredientId[] = [
  'butter',
  'eggs',
  'sugar',
  'lemonZest',
  'lemonJuice',
  'flour',
  'bakingPowder',
];

export const FOUR_CHEF_SECRETS = [
  {
    title: '全蛋打發溫度',
    desc: '全蛋打發時隔溫水升溫需均勻細膩，若升溫過快蛋液過熟，出爐將過於乾硬。',
  },
  {
    title: '麵粉筋度與過篩',
    desc: '務必選用低筋麵粉並仔細過篩，避免結塊；切拌手法需輕柔，防止產生過多麵筋導致表面爆裂。',
  },
  {
    title: '溫熱奶油拌合',
    desc: '融化奶油溫度約 40~50°C 最佳，太冰無法乳化沈底，太燙會使打發氣泡瞬間消泡。',
  },
  {
    title: '精準烤箱溫控',
    desc: '必須確實預熱至 180°C。溫度過高邊緣焦黑爆裂，溫度過低中心無法完全烤熟。',
  },
];
