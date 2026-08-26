import { foods } from "../data/foods";
import { foodNutrition } from "./nutrition";
import type { Food, ParsedFood } from "../types";

const chineseNumbers: Record<string, number> = { 一:1, 二:2, 两:2, 三:3, 四:4, 五:5, 六:6, 七:7, 八:8, 九:9, 十:10, 半:.5 };
const amountPattern = "(\\d+(?:\\.\\d+)?|[一二两三四五六七八九十半])";
const unitPattern = "(kg|公斤|g|克|ml|毫升|个|颗|根|片|碗|杯|盒|袋|勺|份)";
function numberValue(value?: string) { if (!value) return 1; return Number(value) || chineseNumbers[value] || 1; }
function findFood(part: string, allFoods: Food[]) { const normalized = part.toLowerCase().replace(/\s/g, ""); return allFoods.filter((food) => [food.name, ...food.aliases].some((alias) => normalized.includes(alias.toLowerCase()))).sort((a,b) => b.name.length - a.name.length)[0]; }
/** Local rule parser; it deliberately returns unknown text instead of inventing nutrition. */
export function parseFoodInput(text: string, customFoods: Food[] = []) { const allFoods = [...customFoods, ...foods]; const chunks = text.split(/[，,、;；+\n]/).map(x => x.trim()).filter(Boolean); const parsed: ParsedFood[] = []; const unknown: string[] = [];
  chunks.forEach((chunk) => { const food = findFood(chunk, allFoods); if (!food) { unknown.push(chunk); return; } const match = chunk.match(new RegExp(`${amountPattern}\\s*${unitPattern}`, "i")); const amount = numberValue(match?.[1]); const rawUnit = match?.[2] || food.servingUnit; const unit = rawUnit === "公斤" ? "kg" : rawUnit === "克" ? "g" : rawUnit === "毫升" ? "ml" : rawUnit;
    const isWeight = ["g", "kg", "ml"].includes(unit); const weight = unit === "kg" ? amount * 1000 : isWeight ? amount : amount * food.defaultServingWeight; parsed.push({ food, amount, unit, weight, estimated: !isWeight, confidence: match ? .95 : .65 }); }); return { parsed, unknown }; }
export function parsedToItem(item: ParsedFood) { return { id: crypto.randomUUID(), foodId: item.food.id, foodName: item.food.name, amount: item.amount, unit: item.unit, weight: item.weight, estimated: item.estimated, nutrition: foodNutrition(item.food, item.weight) }; }
