import { NextResponse } from "next/server";
import { buildPantryWizardPrompt, callOpenRouter } from "@/lib/ai/openrouter";
import { estimateDailyContribution, estimateNutritionFromIngredients, type IngredientEntry } from "@/lib/nutrition-db";

type IngredientObject = {
  name?: string;
  quantity?: string;
  unit?: string;
};

type PantryWizardPayload = {
  goal?: string;
  preferences?: string[];
  ingredients?: string | string[] | IngredientObject[];
};

type PantryResponse = {
  source: "openrouter" | "fallback";
  warning?: string;
  corrected_ingredients: string[];
  recipe_options: Array<{
    title: string;
    description: string;
    program_tags: string[];
    cooking_time_minutes: number;
    difficulty: string;
    ingredients_used: string[];
    additional_ingredients: string[];
    nutrition: {
      calories: number;
      protein_g: number;
      carbs_g: number;
      fat_g: number;
      fiber_g: number;
    };
    daily_contribution: {
      calories_percent: number;
      protein_percent: number;
      carbs_percent: number;
      fat_percent: number;
    };
    steps: string[];
    catering_recommendation: string;
  }>;
};

function normalizeIngredients(input: PantryWizardPayload["ingredients"]): string[] {
  if (!input) return [];

  if (typeof input === "string") {
    return input
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (Array.isArray(input) && input.every((item) => typeof item === "string")) {
    return (input as string[]).map((item) => item.trim()).filter(Boolean);
  }

  if (Array.isArray(input)) {
    return (input as IngredientObject[])
      .map((item) => {
        const name = (item.name || "").trim();
        const quantity = (item.quantity || "").trim();
        const unit = (item.unit || "").trim();
        if (!name) return "";
        if (quantity && unit) return `${name} ${quantity} ${unit}`;
        if (quantity) return `${name} ${quantity}`;
        return name;
      })
      .filter(Boolean);
  }

  return [];
}

function parseStructuredIngredients(input: PantryWizardPayload["ingredients"]): IngredientEntry[] {
  if (!input) return [];
  if (!Array.isArray(input)) return [];

  if (input.every((item) => typeof item === "string")) {
    return (input as string[])
      .map((raw) => {
        const text = raw.trim();
        const matched = text.match(/^(.*?)(?:\s+(\d+(?:[.,]\d+)?))?(?:\s+([a-zA-Z]+))?$/);
        const name = matched?.[1]?.trim() || text;
        const qty = matched?.[2] ? Number(matched[2].replace(",", ".")) : undefined;
        const unit = matched?.[3]?.trim().toLowerCase();
        return { name, quantity: Number.isFinite(qty) ? qty : undefined, unit };
      })
      .filter((x) => x.name);
  }

  return (input as IngredientObject[])
    .map((item) => ({
      name: (item.name || "").trim(),
      quantity: item.quantity ? Number(item.quantity) : undefined,
      unit: (item.unit || "").trim().toLowerCase() || undefined,
    }))
    .filter((x) => x.name);
}

function fallbackResult(ingredients: string[], goal: string): PantryResponse {
  const correctedMap: Record<string, string> = {
    telor: "telur",
    cabe: "cabai",
    nasih: "nasi",
    "nasih merah": "nasi merah",
    "ayam dada": "dada ayam",
    brokolii: "brokoli",
  };

  const correctedIngredients = ingredients.map((item) => {
    const lower = item.toLowerCase().trim();
    return correctedMap[lower] || lower;
  });

  const structured = parseStructuredIngredients(correctedIngredients);
  const totalNutrition = estimateNutritionFromIngredients(structured);
  const secondNutrition = {
    calories: Math.round(totalNutrition.calories * 0.85),
    protein_g: Number((totalNutrition.protein_g * 0.82).toFixed(1)),
    carbs_g: Number((totalNutrition.carbs_g * 0.9).toFixed(1)),
    fat_g: Number((totalNutrition.fat_g * 0.8).toFixed(1)),
    fiber_g: Number((totalNutrition.fiber_g * 0.9).toFixed(1)),
  };

  return {
    source: "fallback",
    warning: "Mode fallback aktif. API AI tidak tersedia, hasil menggunakan template lokal.",
    corrected_ingredients: correctedIngredients,
    recipe_options: [
      {
        title: "Ayam Tumis Nasi Merah Fitbite",
        description: "Menu halal-first tinggi protein untuk kebutuhan harian sehat.",
        program_tags: [goal, "Healthy Daily"],
        cooking_time_minutes: 25,
        difficulty: "Mudah",
        ingredients_used: correctedIngredients.slice(0, 4),
        additional_ingredients: ["bawang putih", "garam", "lada"],
        nutrition: totalNutrition,
        daily_contribution: estimateDailyContribution(totalNutrition),
        steps: [
          "Siapkan bahan dan cuci sayur sampai bersih.",
          "Tumis bawang putih, lalu masukkan protein utama.",
          "Masukkan sayur dan bumbui secukupnya.",
          "Sajikan bersama nasi merah hangat.",
        ],
        catering_recommendation: "Bisa dijadikan menu Catering Cutting atau Maintain.",
      },
      {
        title: "Tempe Bayam Protein Bowl",
        description: "Pilihan hemat, tetap bergizi, cocok untuk meal prep.",
        program_tags: [goal, "Diet"],
        cooking_time_minutes: 20,
        difficulty: "Mudah",
        ingredients_used: correctedIngredients.slice(0, 3),
        additional_ingredients: ["cabai", "kecap rendah gula"],
        nutrition: secondNutrition,
        daily_contribution: estimateDailyContribution(secondNutrition),
        steps: [
          "Potong tempe kotak kecil, lalu tumis hingga kecokelatan.",
          "Masukkan bayam dan sedikit air, aduk cepat.",
          "Tambahkan bumbu secukupnya, lalu sajikan.",
        ],
        catering_recommendation: "Cocok jadi paket catering hemat harian.",
      },
    ],
  };
}

function applyEstimatedNutrition(data: PantryResponse, entries: IngredientEntry[]) {
  if (!entries.length || !data.recipe_options.length) return data;

  const base = estimateNutritionFromIngredients(entries);
  return {
    ...data,
    recipe_options: data.recipe_options.map((recipe, idx) => {
      const factor = idx === 0 ? 1 : 0.85;
      const estimated = {
        calories: Math.round(base.calories * factor),
        protein_g: Number((base.protein_g * factor).toFixed(1)),
        carbs_g: Number((base.carbs_g * factor).toFixed(1)),
        fat_g: Number((base.fat_g * factor).toFixed(1)),
        fiber_g: Number((base.fiber_g * factor).toFixed(1)),
      };

      return {
        ...recipe,
        nutrition: estimated,
        daily_contribution: estimateDailyContribution(estimated),
      };
    }),
  };
}

function parseAiResult(aiData: unknown): PantryResponse | null {
  if (!aiData || typeof aiData !== "object") return null;
  const maybe = aiData as Partial<PantryResponse>;
  if (!Array.isArray(maybe.corrected_ingredients)) return null;
  if (!Array.isArray(maybe.recipe_options)) return null;

  return {
    source: "openrouter",
    corrected_ingredients: maybe.corrected_ingredients,
    recipe_options: maybe.recipe_options,
  } as PantryResponse;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PantryWizardPayload;
    const goal = body.goal?.trim() || "Healthy Daily";
    const ingredients = normalizeIngredients(body.ingredients);
    const structuredIngredients = parseStructuredIngredients(body.ingredients);
    const preferences = Array.isArray(body.preferences) ? body.preferences.map(String) : [];

    if (!ingredients.length) {
      return NextResponse.json({ ok: false, error: "ingredients is required" }, { status: 400 });
    }

    const provider = process.env.AI_PROVIDER;
    if (provider !== "openrouter") {
      return NextResponse.json({ ok: true, data: fallbackResult(ingredients, goal) });
    }

    const prompt = buildPantryWizardPrompt({ ingredients, goal, preferences });
    const aiResult = await callOpenRouter(prompt);

    if (!aiResult.ok) {
      return NextResponse.json({ ok: true, data: fallbackResult(ingredients, goal) });
    }

    const parsed = parseAiResult(aiResult.data);
    if (!parsed) {
      return NextResponse.json({ ok: true, data: fallbackResult(ingredients, goal) });
    }

    return NextResponse.json({ ok: true, data: applyEstimatedNutrition(parsed, structuredIngredients) });
  } catch {
    return NextResponse.json({ ok: true, data: fallbackResult([], "Healthy Daily") });
  }
}
