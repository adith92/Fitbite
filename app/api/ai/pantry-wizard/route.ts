import { NextResponse } from "next/server";
import { buildPantryWizardPrompt, callOpenRouter } from "@/lib/ai/openrouter";

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
        nutrition: {
          calories: 510,
          protein_g: 38,
          carbs_g: 46,
          fat_g: 14,
          fiber_g: 6,
        },
        daily_contribution: {
          calories_percent: 27,
          protein_percent: 31,
          carbs_percent: 21,
          fat_percent: 19,
        },
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
        nutrition: {
          calories: 430,
          protein_g: 26,
          carbs_g: 42,
          fat_g: 12,
          fiber_g: 8,
        },
        daily_contribution: {
          calories_percent: 23,
          protein_percent: 22,
          carbs_percent: 20,
          fat_percent: 16,
        },
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

    return NextResponse.json({ ok: true, data: parsed });
  } catch {
    return NextResponse.json({ ok: true, data: fallbackResult([], "Healthy Daily") });
  }
}
