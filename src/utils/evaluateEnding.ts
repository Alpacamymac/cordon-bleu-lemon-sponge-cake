import {
  DiagnosticItem,
  EndingId,
  EvaluationResult,
  PlayerMinigameState,
  PlayerWeighingState,
} from '../types/game.types';
import { INGREDIENTS_CONFIG, STANDARD_RECIPE_SERVINGS } from '../constants/recipeData';

export function evaluateEnding(
  weighing: PlayerWeighingState,
  minigames: PlayerMinigameState,
  targetServings: number
): EvaluationResult {
  const diagnostics: DiagnosticItem[] = [];
  const severityScores: Record<EndingId, number> = {
    piggy: 0,
    cracked: 0,
    darkEdges: 0,
    denseDry: 0,
    uneven: 0,
    perfect: 0,
  };

  // 比例乘數 (相對於 10 人份)
  const ratio = targetServings / STANDARD_RECIPE_SERVINGS;

  // 1. 檢查最高優先級：豬豬搞笑結局 (targetServings < 10 且 3 種以上主料照抄 10 人份量 ±20%)
  if (targetServings < STANDARD_RECIPE_SERVINGS) {
    const mainKeys: (keyof Pick<PlayerWeighingState, 'butter' | 'eggs' | 'sugar' | 'flour'>)[] = [
      'butter',
      'eggs',
      'sugar',
      'flour',
    ];
    let copyTenCount = 0;
    mainKeys.forEach((key) => {
      const base = INGREDIENTS_CONFIG[key].baseAmount;
      const actual = weighing[key];
      if (actual >= base * 0.8 && actual <= base * 1.25) {
        copyTenCount++;
      }
    });

    if (copyTenCount >= 3) {
      severityScores.piggy = 100;
      diagnostics.push({
        category: 'weighing',
        stepTitle: '份量換算 (Servings Conversion)',
        status: 'fail',
        summary: `選擇製作 ${targetServings} 人份，卻直接秤了 10 人份的巨大份量！`,
        scienceExplanation:
          '烘焙食譜具有嚴格的比例性。若只做少人份卻完全沒按比例將原料除以 10，模具將無法承載過量麵糊，導致熱量暴增並觸發大胃王豬豬結局！',
      });
      return {
        primaryEnding: 'piggy',
        severityScores,
        diagnostics,
        allPerfect: false,
      };
    }
  }

  // 2. 逐項食材精準度診斷
  let hasWeighingError = false;

  // 奶油
  const targetButter = INGREDIENTS_CONFIG.butter.baseAmount * ratio;
  const butterErrorRatio = Math.abs(weighing.butter - targetButter) / (targetButter || 1);
  if (butterErrorRatio <= INGREDIENTS_CONFIG.butter.tolerance) {
    diagnostics.push({
      category: 'weighing',
      stepTitle: '無鹽奶油秤重',
      status: 'perfect',
      summary: `秤得 ${weighing.butter.toFixed(1)}g（完美在標準 ${targetButter.toFixed(1)}g 容許範圍內）`,
      scienceExplanation: '適當的油脂包覆麵筋，讓海綿蛋糕組織兼具柔軟度與濕潤度。',
    });
  } else {
    hasWeighingError = true;
    const isOver = weighing.butter > targetButter;
    diagnostics.push({
      category: 'weighing',
      stepTitle: '無鹽奶油秤重',
      status: 'warning',
      summary: `秤得 ${weighing.butter.toFixed(1)}g，偏離目標 ${targetButter.toFixed(1)}g 達 ${(butterErrorRatio * 100).toFixed(0)}%`,
      scienceExplanation: isOver
        ? '油脂過多會加重麵糊負擔，削弱全蛋充氣結構，導致中心容易沉底與塌陷。'
        : '油脂不足會使海綿蛋糕缺少乳化保護層，口感乾硬易掉屑。',
    });
    if (isOver) severityScores.uneven += 15;
    else severityScores.denseDry += 15;
  }

  // 雞蛋
  const targetEggs = INGREDIENTS_CONFIG.eggs.baseAmount * ratio;
  const eggsErrorRatio = Math.abs(weighing.eggs - targetEggs) / (targetEggs || 1);
  if (eggsErrorRatio <= INGREDIENTS_CONFIG.eggs.tolerance) {
    diagnostics.push({
      category: 'weighing',
      stepTitle: '全蛋秤重',
      status: 'perfect',
      summary: `秤得 ${weighing.eggs.toFixed(1)}g（完美在標準 ${targetEggs.toFixed(1)}g 容許範圍內）`,
      scienceExplanation: '全蛋是法式海綿蛋糕膨脹的核心氣室來源。',
    });
  } else {
    hasWeighingError = true;
    const isOver = weighing.eggs > targetEggs;
    diagnostics.push({
      category: 'weighing',
      stepTitle: '全蛋秤重',
      status: 'warning',
      summary: `秤得 ${weighing.eggs.toFixed(1)}g，偏離目標 ${targetEggs.toFixed(1)}g`,
      scienceExplanation: isOver
        ? '蛋液過多造成水分比例失衡，蛋糕出爐後冷卻易嚴重回縮。'
        : '蛋液過少無法形成足夠微細氣泡，失去膨鬆骨架。',
    });
    if (isOver) severityScores.uneven += 15;
    else severityScores.denseDry += 20;
  }

  // 白糖 (影響 darkEdges 與 denseDry)
  const targetSugar = INGREDIENTS_CONFIG.sugar.baseAmount * ratio;
  const sugarErrorRatio = (weighing.sugar - targetSugar) / (targetSugar || 1);
  if (Math.abs(sugarErrorRatio) <= INGREDIENTS_CONFIG.sugar.tolerance) {
    diagnostics.push({
      category: 'weighing',
      stepTitle: '細白砂糖秤重',
      status: 'perfect',
      summary: `秤得 ${weighing.sugar.toFixed(1)}g（完美標準 ${targetSugar.toFixed(1)}g）`,
      scienceExplanation: '糖能延緩蛋白質過度凝固，並在烘烤時賦予溫潤的金黃焦糖色。',
    });
  } else if (sugarErrorRatio > 0.2) {
    hasWeighingError = true;
    severityScores.darkEdges += 35;
    severityScores.denseDry += 25;
    diagnostics.push({
      category: 'weighing',
      stepTitle: '細白砂糖秤重',
      status: 'fail',
      summary: `秤得 ${weighing.sugar.toFixed(1)}g（嚴重超標 +${(sugarErrorRatio * 100).toFixed(0)}%）`,
      scienceExplanation:
        '白糖屬於吸濕性融化原料，過多糖分會加速梅納反應與焦糖化，使蛋糕外緣迅速焦黑，內部沉重過密！',
    });
  } else {
    hasWeighingError = true;
    diagnostics.push({
      category: 'weighing',
      stepTitle: '細白砂糖秤重',
      status: 'warning',
      summary: `秤得 ${weighing.sugar.toFixed(1)}g（偏離目標）`,
      scienceExplanation: '糖量不對會使全蛋打發氣泡持久度下降，烘烤後易老化發乾。',
    });
    severityScores.denseDry += 15;
  }

  // 麵粉種類與克數 (影響 cracked)
  const targetFlour = INGREDIENTS_CONFIG.flour.baseAmount * ratio;
  const flourErrorRatio = (weighing.flour - targetFlour) / (targetFlour || 1);

  if (weighing.flourType !== 'low') {
    severityScores.cracked += 40;
    diagnostics.push({
      category: 'weighing',
      stepTitle: '麵粉種類選擇',
      status: 'fail',
      summary: `選擇了「${weighing.flourType === 'medium' ? '中筋麵粉' : '高筋麵粉'}」而非低筋麵粉`,
      scienceExplanation:
        '中高筋麵粉蛋白質含量高達 11%~14%，拌合後產生強韌麵筋網絡，烘烤膨脹時表面張力過大而裂開！',
    });
  } else {
    diagnostics.push({
      category: 'weighing',
      stepTitle: '麵粉種類選擇',
      status: 'perfect',
      summary: '選用標準法式低筋麵粉（Cake Flour）',
      scienceExplanation: '蛋白質含量低，形成柔軟不拉扯的細緻孔洞。',
    });
  }

  if (Math.abs(flourErrorRatio) <= INGREDIENTS_CONFIG.flour.tolerance) {
    diagnostics.push({
      category: 'weighing',
      stepTitle: '低筋麵粉秤重',
      status: 'perfect',
      summary: `秤得 ${weighing.flour.toFixed(1)}g（完美標準 ${targetFlour.toFixed(1)}g）`,
      scienceExplanation: '粉量適中，麵糊稠度達到黃金浮力平衡。',
    });
  } else if (flourErrorRatio > 0.2) {
    hasWeighingError = true;
    severityScores.cracked += 30;
    diagnostics.push({
      category: 'weighing',
      stepTitle: '低筋麵粉秤重',
      status: 'fail',
      summary: `秤得 ${weighing.flour.toFixed(1)}g（麵粉超標 +${(flourErrorRatio * 100).toFixed(0)}%）`,
      scienceExplanation: '過多粉類吸光游離水分，麵糊太稠重，頂部形成硬殼後受熱炸裂。',
    });
  } else {
    hasWeighingError = true;
    diagnostics.push({
      category: 'weighing',
      stepTitle: '低筋麵粉秤重',
      status: 'warning',
      summary: `秤得 ${weighing.flour.toFixed(1)}g（粉量偏離標準）`,
      scienceExplanation: '粉量不足容易讓蛋糕無法支撐高度而塌陷。',
    });
    severityScores.uneven += 15;
  }

  // 泡打粉、檸檬汁、碎檸檬皮
  const targetBp = INGREDIENTS_CONFIG.bakingPowder.baseAmount * ratio;
  if (Math.abs(weighing.bakingPowder - targetBp) / (targetBp || 1) <= 0.2) {
    diagnostics.push({
      category: 'weighing',
      stepTitle: '泡打粉秤重',
      status: 'perfect',
      summary: `秤得 ${weighing.bakingPowder.toFixed(1)}g（標準）`,
      scienceExplanation: '化學膨脹劑適量釋放微小碳酸氣泡。',
    });
  }

  // 3. 小遊戲子步驟診斷 (Step 3-1 ~ Step 3-5)

  // Step 3-1: 融化奶油
  if (minigames.butterTemp >= 35 && minigames.butterTemp <= 55) {
    diagnostics.push({
      category: 'technique',
      stepTitle: 'Step 3-1 融化奶油',
      status: 'perfect',
      summary: `溫度 ${minigames.butterTemp.toFixed(0)}°C（最佳溫熱液態）`,
      scienceExplanation: '35~55°C 的液態奶油能與麵糊完美乳化，不破壞全蛋微氣泡。',
    });
  } else if (minigames.butterTemp > 65) {
    severityScores.denseDry += 30;
    diagnostics.push({
      category: 'technique',
      stepTitle: 'Step 3-1 融化奶油',
      status: 'fail',
      summary: `溫度高達 ${minigames.butterTemp.toFixed(0)}°C（過熱油水分離）`,
      scienceExplanation: '過熱的滾燙奶油倒入麵糊時會瞬間燙熟雞蛋蛋白，造成嚴重消泡與組織乾硬！',
    });
  } else {
    severityScores.uneven += 20;
    diagnostics.push({
      category: 'technique',
      stepTitle: 'Step 3-1 融化奶油',
      status: 'warning',
      summary: `溫度僅 ${minigames.butterTemp.toFixed(0)}°C（未充分融化均勻）`,
      scienceExplanation: '未完全液化的奶油密度過大，會沉入烤模底部造成底層過油、上層過乾。',
    });
  }

  // Step 3-2: 全蛋打發升溫速度
  if (minigames.eggTempRiseRate === 'ideal' && minigames.eggWhiskProgress >= 80) {
    diagnostics.push({
      category: 'technique',
      stepTitle: 'Step 3-2 全蛋打發',
      status: 'perfect',
      summary: '細膩打發至鵝黃色乳霜緞帶狀，升溫平穩',
      scienceExplanation: '隔溫水緩慢升溫至人體體溫（約 38~40°C），蛋液表面張力最小，打發氣孔最堅固細緻。',
    });
  } else if (minigames.eggTempRiseRate === 'too_fast') {
    severityScores.denseDry += 40;
    diagnostics.push({
      category: 'technique',
      stepTitle: 'Step 3-2 全蛋打發升溫速度',
      status: 'fail',
      summary: '隔水加熱升溫過快，蛋液微凝結',
      scienceExplanation: '蛋黃與蛋白中的蛋白質若太快升溫，會發生變性凝固，失去包裹空氣的能力，蛋糕變得扎實乾硬。',
    });
  } else {
    severityScores.denseDry += 20;
    diagnostics.push({
      category: 'technique',
      stepTitle: 'Step 3-2 全蛋打發',
      status: 'warning',
      summary: '打發程度未達標準緞帶狀',
      scienceExplanation: '打發不足無法鎖住足夠空氣體積，烘烤膨脹高度受限。',
    });
  }

  // Step 3-3: 過篩與切拌 (過度混合會導致 cracked)
  if (!minigames.isFlourSifted) {
    severityScores.cracked += 25;
    diagnostics.push({
      category: 'technique',
      stepTitle: 'Step 3-3 麵粉過篩',
      status: 'fail',
      summary: '未完整過篩，麵粉結塊',
      scienceExplanation: '結塊麵粉無法均勻分散，遇熱後形成堅硬白色粉粒並使局部膨脹受阻。',
    });
  } else {
    diagnostics.push({
      category: 'technique',
      stepTitle: 'Step 3-3 麵粉過篩',
      status: 'perfect',
      summary: '粉類完全過篩，質地蓬鬆均勻',
      scienceExplanation: '過篩讓麵粉顆粒間充盈空氣，能更迅速被蛋糊包裹。',
    });
  }

  if (minigames.foldCount >= 10 && minigames.foldCount <= 18) {
    diagnostics.push({
      category: 'technique',
      stepTitle: 'Step 3-3 麵糊切拌',
      status: 'perfect',
      summary: `切拌 ${minigames.foldCount} 次（手法適中，無過度出筋）`,
      scienceExplanation: '溫柔的 J 字切拌在混勻粉類的同時，最大限度保留了氣室。',
    });
  } else if (minigames.foldCount > 24) {
    severityScores.cracked += 35;
    diagnostics.push({
      category: 'technique',
      stepTitle: 'Step 3-3 麵糊切拌',
      status: 'fail',
      summary: `切拌達 ${minigames.foldCount} 次（嚴重過度攪拌）`,
      scienceExplanation: '過度攪拌激發麵粉中的麥穀蛋白與醇溶蛋白鏈結出強烈麵筋，且造成大量消泡，表面必定裂開！',
    });
  } else {
    severityScores.uneven += 20;
    diagnostics.push({
      category: 'technique',
      stepTitle: 'Step 3-3 麵糊切拌',
      status: 'warning',
      summary: `切拌僅 ${minigames.foldCount} 次（拌合不完全）`,
      scienceExplanation: '殘留沉底麵粉，出爐後蛋糕容易產生孔洞分佈不均。',
    });
  }

  // Step 3-4: 烤盤抹平程度 (影響 uneven)
  if (minigames.panFlatnessScore >= 80 && minigames.isParchmentLined) {
    diagnostics.push({
      category: 'technique',
      stepTitle: 'Step 3-4 烤模抹平',
      status: 'perfect',
      summary: `平整度達 ${minigames.panFlatnessScore.toFixed(0)}% 且鋪平烘焙紙`,
      scienceExplanation: '平坦的表面確保烤箱熱風平均覆蓋，各角落以相同速率膨起。',
    });
  } else {
    severityScores.uneven += 35;
    diagnostics.push({
      category: 'technique',
      stepTitle: 'Step 3-4 烤模抹平',
      status: 'fail',
      summary: `平整度僅 ${minigames.panFlatnessScore.toFixed(0)}%（未用刮刀抹平）`,
      scienceExplanation: '麵糊黏稠度高，未手動抹平前進烤箱會造成受熱受風不對稱，形成歪斜起伏。',
    });
  }

  // Step 3-5: 烤箱溫控與預熱 (影響 cracked, darkEdges, denseDry, uneven)
  if (!minigames.isPreheated) {
    severityScores.uneven += 30;
    diagnostics.push({
      category: 'baking',
      stepTitle: 'Step 3-5 烤箱預熱',
      status: 'fail',
      summary: '未預熱至 180°C 即入爐烘烤',
      scienceExplanation: '低溫入爐導致膨脹遲緩，油脂從麵糊中滲漏沉底，失去海綿蛋糕挺拔結構。',
    });
  } else {
    diagnostics.push({
      category: 'baking',
      stepTitle: 'Step 3-5 烤箱預熱',
      status: 'perfect',
      summary: '精準預熱至標準 180°C',
      scienceExplanation: '瞬間給予麵糊高溫定型，形成初期完美膨脹力。',
    });
  }

  if (minigames.ovenTemp > 195) {
    severityScores.cracked += 30;
    severityScores.darkEdges += 40;
    diagnostics.push({
      category: 'baking',
      stepTitle: 'Step 3-5 烤箱溫度',
      status: 'fail',
      summary: `溫度設定高達 ${minigames.ovenTemp}°C（嚴重過熱）`,
      scienceExplanation: '過高溫度讓外皮在幾分鐘內迅速熟化固化，而內部蒸氣持續膨脹，衝破外殼裂開並將外緣烤焦！',
    });
  } else if (minigames.ovenTemp < 165) {
    severityScores.denseDry += 35;
    diagnostics.push({
      category: 'baking',
      stepTitle: 'Step 3-5 烤箱溫度',
      status: 'fail',
      summary: `溫度設定僅 ${minigames.ovenTemp}°C（溫度過低）`,
      scienceExplanation: '溫度過低導致內部水分在長時間烘烤中過度蒸發，中心未熟透但組織乾硬如石。',
    });
  } else {
    diagnostics.push({
      category: 'baking',
      stepTitle: 'Step 3-5 烤箱溫度',
      status: 'perfect',
      summary: `溫度 ${minigames.ovenTemp}°C（完美標準）`,
      scienceExplanation: '熱對流均勻傳遞，梅納反應與蒸氣膨脹節奏達到平衡。',
    });
  }

  // 烘烤時間
  if (minigames.bakeMinutes < 22) {
    severityScores.uneven += 25;
    diagnostics.push({
      category: 'baking',
      stepTitle: 'Step 3-5 烘烤時間',
      status: 'fail',
      summary: `時間僅 ${minigames.bakeMinutes} 分鐘（烘烤不足）`,
      scienceExplanation: '蛋糕中心麵筋支架尚未定型，出爐後接觸冷空氣瞬間腰陷。',
    });
  } else if (minigames.bakeMinutes > 34) {
    severityScores.darkEdges += 25;
    severityScores.denseDry += 20;
    diagnostics.push({
      category: 'baking',
      stepTitle: 'Step 3-5 烘烤時間',
      status: 'fail',
      summary: `時間達 ${minigames.bakeMinutes} 分鐘（時間過長）`,
      scienceExplanation: '過度烘烤吸乾所有蛋糕水分，邊緣焦化且口感乾澀。',
    });
  } else {
    diagnostics.push({
      category: 'baking',
      stepTitle: 'Step 3-5 烘烤時間',
      status: 'perfect',
      summary: `時間 ${minigames.bakeMinutes} 分鐘（標準 25~30 分）`,
      scienceExplanation: '水分與蓬鬆度維持在黃金比例。',
    });
  }

  // 4. 決策單一主結局 primaryEnding
  const candidateFailures: EndingId[] = ['cracked', 'darkEdges', 'denseDry', 'uneven'];
  let maxScore = 0;
  let highestEnding: EndingId = 'perfect';

  candidateFailures.forEach((endId) => {
    const score = severityScores[endId];
    if (score > maxScore) {
      maxScore = score;
      highestEnding = endId;
    }
  });

  // 若最大分數小於門檻 (例如 <= 25) 且無重大秤重失誤，視為完美結局
  const isPerfect = maxScore <= 20 && !hasWeighingError;
  const primaryEnding = isPerfect ? 'perfect' : highestEnding;

  return {
    primaryEnding,
    severityScores,
    diagnostics,
    allPerfect: isPerfect,
  };
}
