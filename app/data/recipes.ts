import type { Recipe } from "../types";

const r = (id: string, name: string, type: Recipe["type"], nutrition: Recipe["nutrition"], tags: string[], ingredients: Recipe["ingredients"], cookTime = 15): Recipe => ({ id, name, type, nutrition, tags, ingredients, cookTime, difficulty: "简单", steps: ["准备食材，按标注份量称量。", "用少量油或不粘锅烹饪主要蛋白质。", "搭配主食和蔬菜，趁热享用。"] });
export const recipes: Recipe[] = [
  r("r1","鸡胸肉米饭", "正餐", {calories:670,protein:57,carbs:87,fat:10}, ["高蛋白","正餐"], [{foodId:"f2",amount:180,unit:"g",weight:180},{foodId:"f11",amount:250,unit:"g",weight:250},{foodId:"f47",amount:150,unit:"g",weight:150},{foodId:"f57",amount:8,unit:"g",weight:8}],20),
  r("r2","牛肉土豆饭", "正餐", {calories:705,protein:49,carbs:93,fat:17}, ["高蛋白","正餐"], [{foodId:"f4",amount:180,unit:"g",weight:180},{foodId:"f20",amount:250,unit:"g",weight:250},{foodId:"f16",amount:180,unit:"g",weight:180}],25),
  r("r3","虾仁炒饭", "正餐", {calories:620,protein:43,carbs:89,fat:11}, ["高蛋白","正餐"], [{foodId:"f7",amount:180,unit:"g",weight:180},{foodId:"f11",amount:260,unit:"g",weight:260},{foodId:"f0",amount:1,unit:"个",weight:50},{foodId:"f50",amount:100,unit:"g",weight:100}],18),
  r("r4","三文鱼米饭", "正餐", {calories:690,protein:43,carbs:77,fat:24}, ["正餐","优质脂肪"], [{foodId:"f8",amount:180,unit:"g",weight:180},{foodId:"f11",amount:240,unit:"g",weight:240},{foodId:"f47",amount:150,unit:"g",weight:150}],18),
  r("r5","牛肉意面", "正餐", {calories:660,protein:50,carbs:79,fat:15}, ["高蛋白","正餐"], [{foodId:"f4",amount:160,unit:"g",weight:160},{foodId:"f14",amount:250,unit:"g",weight:250},{foodId:"f50",amount:150,unit:"g",weight:150}],20),
  r("r6","鸡蛋牛肉饭", "正餐", {calories:710,protein:48,carbs:85,fat:20}, ["高蛋白","正餐"], [{foodId:"f0",amount:2,unit:"个",weight:100},{foodId:"f4",amount:130,unit:"g",weight:130},{foodId:"f11",amount:250,unit:"g",weight:250}],15),
  r("r7","蛋白粉牛奶香蕉", "快速加餐", {calories:335,protein:34,carbs:43,fat:6}, ["高蛋白","快速加餐"], [{foodId:"f36",amount:1,unit:"勺",weight:30},{foodId:"f27",amount:250,unit:"ml",weight:250},{foodId:"f37",amount:1,unit:"根",weight:120}],3),
  r("r8","希腊酸奶香蕉", "快速加餐", {calories:270,protein:18,carbs:35,fat:9}, ["快速加餐","低脂"], [{foodId:"f31",amount:170,unit:"g",weight:170},{foodId:"f37",amount:1,unit:"根",weight:120}],2),
  r("r9","鸡蛋全麦面包", "快速加餐", {calories:365,protein:22,carbs:34,fat:16}, ["高蛋白","快速加餐"], [{foodId:"f0",amount:2,unit:"个",weight:100},{foodId:"f15",amount:2,unit:"片",weight:60}],8),
  r("r10","牛奶香蕉燕麦", "快速加餐", {calories:390,protein:16,carbs:65,fat:9}, ["高碳水","快速加餐"], [{foodId:"f27",amount:250,unit:"ml",weight:250},{foodId:"f37",amount:1,unit:"根",weight:120},{foodId:"f17",amount:40,unit:"g",weight:40}],3),
  r("r11","金枪鱼三明治", "快速加餐", {calories:410,protein:36,carbs:43,fat:9}, ["高蛋白","快速加餐"], [{foodId:"f9",amount:120,unit:"g",weight:120},{foodId:"f15",amount:3,unit:"片",weight:90},{foodId:"f50",amount:100,unit:"g",weight:100}],5),
  r("r12","鸡胸肉意面", "正餐", {calories:630,protein:58,carbs:74,fat:11}, ["高蛋白","正餐"], [{foodId:"f2",amount:200,unit:"g",weight:200},{foodId:"f14",amount:240,unit:"g",weight:240},{foodId:"f50",amount:150,unit:"g",weight:150}],20)
];
export function scoreRecipe(recipe: Recipe, gap: Recipe["nutrition"]) { const calorieGap = Math.abs(recipe.nutrition.calories - gap.calories) / Math.max(300, gap.calories); const proteinFit = Math.abs(recipe.nutrition.protein - gap.protein) / Math.max(15, gap.protein); const fatPenalty = gap.fat < recipe.nutrition.fat ? (recipe.nutrition.fat-gap.fat)/20 : 0; const overshoot = recipe.nutrition.calories > gap.calories * 1.35 ? 2 : 0; return calorieGap + proteinFit * .7 + fatPenalty + overshoot; }
