import { NextResponse } from "next/server";

type PantryWizardPayload = {
  goal?: string;
  ingredients?: string;
  allergies?: string;
  budget?: string;
};

type PantryRecipe = {
  name: string;
  calories: number;
  protein: number;
  reason: string;
  ingredients: string[];
  steps: string[];
};

type PantryResult = {
  source: "openrouter" | "fallback";
  note: string;
  recipes: PantryRecipe[];
};

const fallbackRecipes: PantryRecipe[] = [
  {
    name: "Tumis Tempe Kangkung Protein Ringan",
    calories: 420,
    protein: 24,
    reason: "Cocok untuk jaga kalori tetap terkendali dengan bahan lokal halal.",
    ingredients: ["tempe", "kangkung", "bawang putih", "cabai", "kecap rendah gula"],
    steps: [
      "Tumis bawang putih dan cabai sampai harum.",
      "Masukkan tempe potong dadu, tumis 3-4 menit.",
      "Masukkan kangkung, aduk cepat sampai layu.",
      "Tambahkan sedikit kecap rendah gula lalu sajikan.",
    ],
  },
  {
    name: "Ayam Bumbu Kuning + Nasi Merah",
    calories: 520,
    protein: 36,
    reason: "Protein lebih tinggi, cocok untuk fase cutting/maintain.",
    ingredients: ["dada ayam", "kunyit", "bawang merah", "bawang putih", "nasi merah"],
    steps: [
      "Haluskan bumbu kuning dan marinasi ayam.",
      "Masak ayam hingga matang merata.",
      "Sajikan dengan nasi merah dan lalapan.",
    ],
  },
  {
    name: "Tahu Telur Orak-Arik Sayur",
    calories: 390,
    protein: 22,
    reason: "Budget-friendly dan tetap tinggi nutrisi harian.",
    ingredients: ["tahu", "telur", "wortel", "daun bawang", "lada"],
    steps: [
      "Hancurkan tahu, lalu tumis bersama wortel.",
      "Tuang telur kocok, aduk hingga set.",
      "Tambahkan daun bawang dan lada lalu angkat.",
    ],
  },
];

function buildFallback(payload: PantryWizardPayload): PantryResult {
  const goal = payload.goal || "Maintain";
  const budget = payload.budget || "standar";

  return {
    source: "fallback",
    note: `Mode fallback aktif. Rekomendasi estimasi untuk goal ${goal} dengan budget ${budget}.`,
    recipes: fallbackRecipes,
  };
}

function extractJson(raw: string): PantryResult | null {
  const trimmed = raw.trim();
  const first = trimmed.indexOf("{");
  const last = trimmed.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first) return null;

  const slice = trimmed.slice(first, last + 1);
  try {
    const parsed = JSON.parse(slice) as PantryResult;
    if (!parsed?.recipes || !Array.isArray(parsed.recipes)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as PantryWizardPayload;

    const provider = process.env.AI_PROVIDER;
    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL;
    const siteUrl = process.env.OPENROUTER_SITE_URL || "https://fitbitedemo.vercel.app";
    const appName = process.env.OPENROUTER_APP_NAME || "Fitbite";

    if (provider !== "openrouter" || !apiKey || !model) {
      return NextResponse.json(buildFallback(payload));
    }

    const prompt = `Kamu adalah asisten nutrisi Fitbite untuk user Indonesia. Buat 3 rekomendasi resep halal-first dan bahan lokal. Semua angka nutrisi adalah estimasi, bukan klaim medis.

Goal: ${payload.goal || "Maintain"}
Bahan tersedia: ${payload.ingredients || "tidak disebutkan"}
Alergi: ${payload.allergies || "tidak ada"}
Budget: ${payload.budget || "standar"}

Balas HANYA JSON valid dengan format:
{
  "source": "openrouter",
  "note": "string",
  "recipes": [
    {
      "name": "string",
      "calories": number,
      "protein": number,
      "reason": "string",
      "ingredients": ["string"],
      "steps": ["string"]
    }
  ]
}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": siteUrl,
        "X-Title": appName,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: "Kamu ahli menu sehat Fitbite. Jawab ringkas dan terstruktur." },
          { role: "user", content: prompt },
        ],
        temperature: 0.5,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(buildFallback(payload));
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json(buildFallback(payload));
    }

    const parsed = extractJson(content);
    if (!parsed) {
      return NextResponse.json(buildFallback(payload));
    }

    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(buildFallback({}));
  }
}
