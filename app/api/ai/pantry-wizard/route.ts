import { NextResponse } from "next/server";
import { buildPantryWizardPrompt, callOpenRouter } from "@/lib/ai/openrouter";

function normalizeIngredients(value: unknown) {
  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }

  return [];
}

function fallbackResult(ingredients: string[], goal: string) {
  const corrected = ingredients.map((item) => {
    const lower = item.toLowerCase();
    if (lower === "telor") return "telur";
    if (lower === "cabe") return "cabai";
    if (lower === "nasih merah") return "nasi merah";
    return lower;
  });

  return {
    source: "fallback",
    corrected_ingredients: corrected,
    recipe_options: [
      {
        title: "Nasi Merah Ayam Telur Fitbite",
        description: "Menu mockup sehat tinggi protein dari bahan yang tersedia.",
        program_tags: [goal || "Healthy Daily", "Maintain"],
        cooking_time_minutes: 25,
        difficulty: "Mudah",
        ingredients_used: corrected.slice(0, 5),
        additional_ingredients: ["bawang putih", "garam", "lada"],
        nutrition: {
          calories: 520,
          protein_g: 42,
          carbs_g: 48,
          fat_g: 15,
          fiber_g: 7
        },
        daily_contribution: {
          calories_percent: 28,
          protein_percent: 32,
          carbs_percent: 22,
          fat_percent: 20
        },
        steps: [
          "Siapkan semua bahan dan cuci sayuran.",
          "Bumbui ayam dengan bawang putih, garam, dan lada.",
          "Masak ayam sampai matang dengan sedikit minyak.",
          "Rebus telur sampai matang.",
          "Sajikan bersama nasi merah dan sayuran."
        ],
        catering_recommendation: "Cocok dijadikan menu catering Cutting atau Healthy Daily."
      }
    ]
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const ingredients = normalizeIngredients(body.ingredients);
    const goal = typeof body.goal === "string" ? body.goal : "Healthy Daily";
    const preferences = Array.isArray(body.preferences) ? body.preferences.map(String) : [];

    if (!ingredients.length) {
      return NextResponse.json({ ok: false, error: "ingredients is required" }, { status: 400 });
    }

    const prompt = buildPantryWizardPrompt({ ingredients, goal, preferences });
    const aiResult = await callOpenRouter(prompt);

    if (!aiResult.ok) {
      return NextResponse.json({ ok: true, data: fallbackResult(ingredients, goal), warning: aiResult.error });
    }

    return NextResponse.json({ ok: true, data: aiResult.data });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
