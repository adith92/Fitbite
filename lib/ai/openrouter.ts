export type PantryWizardInput = {
  ingredients: string[];
  goal?: string;
  preferences?: string[];
};

export function buildPantryWizardPrompt(input: PantryWizardInput) {
  return [
    "Kamu adalah chef healthy food Indonesia dan nutrition assistant untuk aplikasi Fitbite.",
    "Tugasmu: koreksi bahan, buat ide resep sehat Nusantara, dan berikan estimasi nutrisi.",
    "Aturan penting:",
    "- Jawab hanya JSON valid tanpa markdown.",
    "- Fokus resep Indonesia/Nusantara.",
    "- Halal-first.",
    "- Minimalkan bahan tambahan.",
    "- Jangan buat klaim medis.",
    "- Nutrisi adalah estimasi.",
    "",
    `Bahan user: ${input.ingredients.join(", ")}`,
    `Goal: ${input.goal || "Healthy Daily"}`,
    `Preferensi: ${(input.preferences || []).join(", ") || "Tidak ada"}`,
    "",
    "Format JSON:",
    JSON.stringify({
      corrected_ingredients: ["dada ayam", "telur", "nasi merah"],
      recipe_options: [
        {
          title: "Ayam Brokoli Nasi Merah",
          description: "Menu sehat tinggi protein dengan rasa lokal.",
          program_tags: ["Cutting", "Diet"],
          cooking_time_minutes: 25,
          difficulty: "Mudah",
          ingredients_used: ["dada ayam", "nasi merah"],
          additional_ingredients: ["bawang putih"],
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
            "Potong ayam kecil-kecil.",
            "Tumis bumbu dengan sedikit minyak.",
            "Masukkan ayam sampai matang.",
            "Sajikan dengan nasi merah."
          ],
          catering_recommendation: "Bisa dijadikan Cutting Box."
        }
      ]
    })
  ].join("\n");
}

export async function callOpenRouter(prompt: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || "google/gemini-2.0-flash-exp:free";

  if (!apiKey) {
    return {
      ok: false,
      error: "OPENROUTER_API_KEY is not configured"
    };
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "https://fitbitedemo.vercel.app",
      "X-Title": process.env.OPENROUTER_APP_NAME || "Fitbite"
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.4
    })
  });

  if (!response.ok) {
    return {
      ok: false,
      error: await response.text()
    };
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  if (!content) {
    return {
      ok: false,
      error: "No AI content returned"
    };
  }

  try {
    return {
      ok: true,
      data: JSON.parse(content)
    };
  } catch {
    return {
      ok: true,
      data: {
        raw: content
      }
    };
  }
}
