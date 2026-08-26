import type { Activity, BulkSpeed, Nutrition, NutritionGoal, UserProfile } from "../types";

const activityFactor: Record<Activity, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, high: 1.725 };
const bulkSurplus: Record<BulkSpeed, number> = { conservative: .05, standard: .1, aggressive: .15 };
export const blankNutrition = (): Nutrition => ({ calories: 0, protein: 0, carbs: 0, fat: 0 });
/** Supports decimal precision and negative precision (for example, -1 rounds 2478 to 2480). */
export const round = (n: number, digits = 0) =>
  digits >= 0
    ? Number(n.toFixed(digits))
    : Math.round(n / 10 ** -digits) * 10 ** -digits;
export const addNutrition = (...items: Nutrition[]): Nutrition => items.reduce((sum, item) => ({ calories: sum.calories + item.calories, protein: sum.protein + item.protein, carbs: sum.carbs + item.carbs, fat: sum.fat + item.fat }), blankNutrition());
export const foodNutrition = (food: { caloriesPer100g: number; proteinPer100g: number; carbsPer100g: number; fatPer100g: number }, weight: number): Nutrition => ({ calories: round(food.caloriesPer100g * weight / 100), protein: round(food.proteinPer100g * weight / 100, 1), carbs: round(food.carbsPer100g * weight / 100, 1), fat: round(food.fatPer100g * weight / 100, 1) });

/** Mifflin-St Jeor: a simple, non-medical estimate used for the starting target. */
export function calculateGoal(profile: UserProfile): NutritionGoal {
  const bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + (profile.sex === "male" ? 5 : -161);
  const tdee = bmr * activityFactor[profile.activity];
  const calories = round(tdee * (profile.goal === "bulk" ? 1 + bulkSurplus[profile.bulkSpeed] : profile.goal === "cut" ? .85 : 1), -1);
  const protein = round(profile.weight * profile.proteinPerKg);
  const fat = round(profile.weight * profile.fatPerKg);
  const carbs = Math.max(0, round((calories - protein * 4 - fat * 9) / 4));
  const calculated = { calories, protein, carbs, fat };
  return { ...calculated, calculated };
}
export const remaining = (goal: Nutrition, eaten: Nutrition): Nutrition => ({ calories: Math.max(0, round(goal.calories - eaten.calories)), protein: Math.max(0, round(goal.protein - eaten.protein, 1)), carbs: Math.max(0, round(goal.carbs - eaten.carbs, 1)), fat: Math.max(0, round(goal.fat - eaten.fat, 1)) });
export const overage = (goal: Nutrition, eaten: Nutrition): Nutrition => ({ calories: Math.max(0, round(eaten.calories - goal.calories)), protein: Math.max(0, round(eaten.protein - goal.protein, 1)), carbs: Math.max(0, round(eaten.carbs - goal.carbs, 1)), fat: Math.max(0, round(eaten.fat - goal.fat, 1)) });
export const fmt = (value: number, unit = "g") => `${Number.isInteger(value) ? value : value.toFixed(1)}${unit}`;
export function mealTypeForNow(hour = new Date().getHours()): import("../types").MealType { if (hour >= 6 && hour <= 10) return "早餐"; if (hour >= 11 && hour <= 14) return "午餐"; if (hour >= 17 && hour <= 21) return "晚餐"; return "加餐"; }
