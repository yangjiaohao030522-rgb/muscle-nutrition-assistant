export type GoalMode = "bulk" | "cut" | "maintain";
export type Activity = "sedentary" | "light" | "moderate" | "high";
export type BulkSpeed = "conservative" | "standard" | "aggressive";
export type MealType = "早餐" | "午餐" | "晚餐" | "加餐" | "训练前" | "训练后" | "其他";

export interface Nutrition { calories: number; protein: number; carbs: number; fat: number }
export interface UserProfile { sex: "male" | "female"; age: number; height: number; weight: number; goal: GoalMode; activity: Activity; trainingDays: number; bulkSpeed: BulkSpeed; proteinPerKg: number; fatPerKg: number }
export interface NutritionGoal extends Nutrition { calculated: Nutrition; isCustom?: boolean }
export interface Food { id: string; name: string; aliases: string[]; category: string; servingUnit: string; defaultServingWeight: number; caloriesPer100g: number; proteinPer100g: number; carbsPer100g: number; fatPer100g: number; custom?: boolean }
export interface MealItem { id: string; foodId: string; foodName: string; amount: number; unit: string; weight: number; estimated: boolean; nutrition: Nutrition }
export interface Meal { id: string; type: MealType; time: string; items: MealItem[]; nutrition: Nutrition; createdAt: string }
export interface DailyRecord { date: string; meals: Meal[] }
export interface Recipe { id: string; name: string; type: "正餐" | "快速加餐"; ingredients: { foodId: string; amount: number; unit: string; weight: number }[]; nutrition: Nutrition; cookTime: number; difficulty: string; tags: string[]; steps: string[] }
export interface WeightRecord { id: string; date: string; weight: number }
export interface AppData { profile?: UserProfile; goal?: NutritionGoal; records: Record<string, DailyRecord>; customFoods: Food[]; favoriteFoods: string[]; favoriteRecipes: string[]; weights: WeightRecord[] }
export interface ParsedFood { food: Food; amount: number; unit: string; weight: number; estimated: boolean; confidence: number }
