export type NutritionValue = {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
};

export type IngredientEntry = {
  name: string;
  quantity?: number;
  unit?: string;
};

const NUTRITION_PER_100G: Record<string, NutritionValue> = {
  "nasi putih": { calories: 130, protein_g: 2.7, carbs_g: 28.2, fat_g: 0.3, fiber_g: 0.4 },
  "nasi merah": { calories: 111, protein_g: 2.6, carbs_g: 23, fat_g: 0.9, fiber_g: 1.8 },
  ayam: { calories: 165, protein_g: 31, carbs_g: 0, fat_g: 3.6, fiber_g: 0 },
  "dada ayam": { calories: 165, protein_g: 31, carbs_g: 0, fat_g: 3.6, fiber_g: 0 },
  telur: { calories: 155, protein_g: 13, carbs_g: 1.1, fat_g: 11, fiber_g: 0 },
  tempe: { calories: 192, protein_g: 20.3, carbs_g: 7.6, fat_g: 10.8, fiber_g: 1.4 },
  tahu: { calories: 76, protein_g: 8, carbs_g: 1.9, fat_g: 4.8, fiber_g: 0.3 },
  brokoli: { calories: 34, protein_g: 2.8, carbs_g: 6.6, fat_g: 0.4, fiber_g: 2.6 },
  bayam: { calories: 23, protein_g: 2.9, carbs_g: 3.6, fat_g: 0.4, fiber_g: 2.2 },
  kangkung: { calories: 19, protein_g: 3.4, carbs_g: 3.1, fat_g: 0.2, fiber_g: 2 },
  wortel: { calories: 41, protein_g: 0.9, carbs_g: 9.6, fat_g: 0.2, fiber_g: 2.8 },
  buncis: { calories: 31, protein_g: 1.8, carbs_g: 7, fat_g: 0.1, fiber_g: 3.4 },
  kentang: { calories: 77, protein_g: 2, carbs_g: 17, fat_g: 0.1, fiber_g: 2.2 },
  ubi: { calories: 86, protein_g: 1.6, carbs_g: 20.1, fat_g: 0.1, fiber_g: 3 },
  "ikan dori": { calories: 90, protein_g: 18, carbs_g: 0, fat_g: 1.5, fiber_g: 0 },
  "ikan tuna": { calories: 132, protein_g: 29, carbs_g: 0, fat_g: 1.3, fiber_g: 0 },
  "daging sapi rendah lemak": { calories: 170, protein_g: 26, carbs_g: 0, fat_g: 7, fiber_g: 0 },
  tomat: { calories: 18, protein_g: 0.9, carbs_g: 3.9, fat_g: 0.2, fiber_g: 1.2 },
  timun: { calories: 15, protein_g: 0.7, carbs_g: 3.6, fat_g: 0.1, fiber_g: 0.5 },
};

const DEFAULT_WEIGHT_PER_PIECE_GRAM: Record<string, number> = {
  telur: 55,
  tomat: 90,
  timun: 120,
  kentang: 150,
  ubi: 130,
  tempe: 50,
  tahu: 80,
  ayam: 80,
  "dada ayam": 100,
};

function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

function resolveNutritionKey(name: string): string | null {
  const normalized = normalizeName(name);
  if (NUTRITION_PER_100G[normalized]) return normalized;
  const found = Object.keys(NUTRITION_PER_100G).find((key) => normalized.includes(key));
  return found || null;
}

function toGram(quantity: number, unit: string | undefined, normalizedName: string) {
  const u = (unit || "gram").toLowerCase().trim();
  if (u === "gram") return quantity;
  if (u === "kg") return quantity * 1000;
  if (u === "ml") return quantity;
  if (u === "liter") return quantity * 1000;
  if (u === "sdm") return quantity * 15;
  if (u === "sdt") return quantity * 5;
  if (u === "porsi") return quantity * 150;
  if (u === "ikat") return quantity * 80;
  if (u === "pcs" || u === "buah") {
    const weight = DEFAULT_WEIGHT_PER_PIECE_GRAM[normalizedName] || 100;
    return quantity * weight;
  }
  return quantity;
}

function roundNutrition(value: NutritionValue): NutritionValue {
  return {
    calories: Math.round(value.calories),
    protein_g: Number(value.protein_g.toFixed(1)),
    carbs_g: Number(value.carbs_g.toFixed(1)),
    fat_g: Number(value.fat_g.toFixed(1)),
    fiber_g: Number(value.fiber_g.toFixed(1)),
  };
}

export function estimateNutritionFromIngredients(entries: IngredientEntry[]): NutritionValue {
  const total: NutritionValue = { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0, fiber_g: 0 };

  for (const entry of entries) {
    const key = resolveNutritionKey(entry.name);
    if (!key) continue;
    const nutrition = NUTRITION_PER_100G[key];
    const qty = entry.quantity && Number.isFinite(entry.quantity) ? entry.quantity : 100;
    const grams = toGram(qty, entry.unit, key);
    const ratio = grams / 100;

    total.calories += nutrition.calories * ratio;
    total.protein_g += nutrition.protein_g * ratio;
    total.carbs_g += nutrition.carbs_g * ratio;
    total.fat_g += nutrition.fat_g * ratio;
    total.fiber_g += nutrition.fiber_g * ratio;
  }

  return roundNutrition(total);
}

export function estimateDailyContribution(nutrition: NutritionValue) {
  const target = {
    calories: 2000,
    protein_g: 100,
    carbs_g: 275,
    fat_g: 67,
  };

  return {
    calories_percent: Math.min(100, Math.round((nutrition.calories / target.calories) * 100)),
    protein_percent: Math.min(100, Math.round((nutrition.protein_g / target.protein_g) * 100)),
    carbs_percent: Math.min(100, Math.round((nutrition.carbs_g / target.carbs_g) * 100)),
    fat_percent: Math.min(100, Math.round((nutrition.fat_g / target.fat_g) * 100)),
  };
}
