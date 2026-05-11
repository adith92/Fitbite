"use client";

import { useMemo, useState } from "react";

type IngredientItem = {
  id: string;
  name: string;
  quantity: string;
  unit: string;
};

type RecipeOption = {
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
};

type WizardApiData = {
  source: "openrouter" | "fallback";
  warning?: string;
  corrected_ingredients: string[];
  recipe_options: RecipeOption[];
};

const PROGRAMS = ["Diet", "Cutting", "Bulking", "Maintain", "Healthy Daily"];
const PREFERENCES = ["Halal", "Pedas", "Cepat", "Low oil", "High protein", "No seafood"];
const UNITS = ["gram", "kg", "pcs", "buah", "sdm", "sdt", "ml", "liter", "porsi", "ikat"];

const INGREDIENTS = [
  "nasi putih",
  "nasi merah",
  "ayam",
  "dada ayam",
  "telur",
  "tempe",
  "tahu",
  "brokoli",
  "bayam",
  "kangkung",
  "wortel",
  "buncis",
  "kentang",
  "ubi",
  "ikan dori",
  "ikan tuna",
  "daging sapi rendah lemak",
  "cabai",
  "bawang merah",
  "bawang putih",
  "tomat",
  "timun",
];

const AUTOCORRECT: Record<string, string> = {
  telor: "telur",
  cabe: "cabai",
  nasih: "nasi",
  "nasih merah": "nasi merah",
  "ayam dada": "dada ayam",
  brokolii: "brokoli",
};

function createIngredientRow(): IngredientItem {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: "",
    quantity: "",
    unit: "gram",
  };
}

function normalizeLower(value: string) {
  return value.trim().toLowerCase();
}

export default function WizardPage() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("Maintain");
  const [ingredients, setIngredients] = useState<IngredientItem[]>([createIngredientRow()]);
  const [preferences, setPreferences] = useState<string[]>(["Halal"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<WizardApiData | null>(null);
  const [activeSuggestId, setActiveSuggestId] = useState<string | null>(null);

  const filledRows = useMemo(
    () => ingredients.filter((item) => item.name.trim() && item.quantity.trim()),
    [ingredients],
  );

  const canProceedIngredientStep = filledRows.length > 0;

  const ingredientRowsForSubmit = useMemo(() => {
    return ingredients
      .filter((item) => item.name.trim() && item.quantity.trim())
      .map((item) => ({
        name: item.name.trim(),
        quantity: item.quantity.trim(),
        unit: item.unit,
      }));
  }, [ingredients]);

  function updateIngredient(id: string, key: keyof IngredientItem, value: string) {
    setIngredients((prev) => {
      const next = prev.map((item) => (item.id === id ? { ...item, [key]: value } : item));
      const last = next[next.length - 1];
      const shouldAppend = last.name.trim() && last.quantity.trim();
      if (shouldAppend) {
        return [...next, createIngredientRow()];
      }
      return next;
    });
  }

  function removeIngredient(id: string) {
    setIngredients((prev) => {
      const next = prev.filter((item) => item.id !== id);
      return next.length ? next : [createIngredientRow()];
    });
  }

  function togglePreference(pref: string) {
    setPreferences((prev) => (prev.includes(pref) ? prev.filter((x) => x !== pref) : [...prev, pref]));
  }

  function applyAutocorrect(id: string, corrected: string) {
    updateIngredient(id, "name", corrected);
    setActiveSuggestId(null);
  }

  async function onCekMenu() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/ai/pantry-wizard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal,
          ingredients: ingredientRowsForSubmit,
          preferences: preferences.map((item) => item.toLowerCase()),
        }),
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string; data?: WizardApiData };

      if (!response.ok || !payload.ok || !payload.data) {
        throw new Error(payload.error || "Gagal memproses rekomendasi menu.");
      }

      setResult(payload.data);
      setStep(4);
    } catch {
      setError("Proses cek menu gagal. Coba lagi sebentar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <style>{css}</style>
      <section style={styles.container}>
        <header style={styles.header}>
          <a href="/" style={styles.backLink}>← Kembali</a>
          <h1 style={styles.title}>AI Pantry Wizard</h1>
          <p style={styles.subtitle}>Buat rekomendasi menu sehat dari bahan yang kamu punya di rumah.</p>
        </header>

        <div style={styles.stepBar}>{[1, 2, 3, 4].map((s) => <span key={s} style={{ ...styles.stepDot, opacity: s <= step ? 1 : 0.35 }}>{s}</span>)}</div>

        <section style={styles.card}>
          {step === 1 && (
            <>
              <h2>Pilih Program</h2>
              <div style={styles.chipRow}>
                {PROGRAMS.map((item) => (
                  <button key={item} onClick={() => setGoal(item)} style={{ ...styles.chipBtn, background: goal === item ? "#16a34a" : "#fff", color: goal === item ? "#fff" : "#0f172a" }}>
                    {item}
                  </button>
                ))}
              </div>
              <button style={styles.actionBtn} onClick={() => setStep(2)}>Lanjut</button>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Masukkan Bahan Makanan</h2>
              <p style={styles.muted}>Isi nama, jumlah, dan satuan per bahan.</p>

              <div style={styles.ingredientStack}>
                {ingredients.map((item, index) => {
                  const lower = normalizeLower(item.name);
                  const suggestions = INGREDIENTS.filter((name) => name.includes(lower) && lower.length >= 1).slice(0, 6);
                  const correction = AUTOCORRECT[lower];
                  const canRemove = ingredients.length > 1 && (item.name.trim() || item.quantity.trim());

                  return (
                    <article key={item.id} style={styles.ingredientCard}>
                      <div style={styles.rowHead}>
                        <b>Bahan {index + 1}</b>
                        {canRemove ? (
                          <button style={styles.removeBtn} onClick={() => removeIngredient(item.id)}>Hapus</button>
                        ) : null}
                      </div>
                      <div style={styles.rowGrid}>
                        <div style={styles.fieldWrap}>
                          <input
                            value={item.name}
                            onFocus={() => setActiveSuggestId(item.id)}
                            onBlur={() => setTimeout(() => setActiveSuggestId((id) => (id === item.id ? null : id)), 120)}
                            onChange={(e) => updateIngredient(item.id, "name", e.target.value)}
                            placeholder="Nama bahan"
                            style={styles.input}
                          />
                          {activeSuggestId === item.id && suggestions.length > 0 ? (
                            <div style={styles.suggestBox}>
                              {suggestions.map((s) => (
                                <button key={s} style={styles.suggestBtn} onMouseDown={() => updateIngredient(item.id, "name", s)}>
                                  {s}
                                </button>
                              ))}
                            </div>
                          ) : null}
                          {correction ? (
                            <button style={styles.hintBtn} onClick={() => applyAutocorrect(item.id, correction)}>
                              Mungkin maksudnya: {correction}
                            </button>
                          ) : null}
                        </div>
                        <input value={item.quantity} onChange={(e) => updateIngredient(item.id, "quantity", e.target.value)} placeholder="Jumlah" style={styles.input} inputMode="decimal" />
                        <select value={item.unit} onChange={(e) => updateIngredient(item.id, "unit", e.target.value)} style={styles.input}>
                          {UNITS.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                        </select>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div style={styles.navRow}>
                <button style={styles.ghostBtn} onClick={() => setStep(1)}>Kembali</button>
                <button style={styles.actionBtn} onClick={() => setStep(3)} disabled={!canProceedIngredientStep}>Lanjut</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2>Preferensi</h2>
              <div style={styles.chipRow}>
                {PREFERENCES.map((pref) => (
                  <button key={pref} onClick={() => togglePreference(pref)} style={{ ...styles.chipBtn, background: preferences.includes(pref) ? "#0f172a" : "#fff", color: preferences.includes(pref) ? "#fff" : "#0f172a" }}>
                    {pref}
                  </button>
                ))}
              </div>
              <p style={styles.helper}>Dari bahan yang tersedia</p>
              <div style={styles.navRow}>
                <button style={styles.ghostBtn} onClick={() => setStep(2)}>Kembali</button>
                <button style={styles.actionBtn} onClick={onCekMenu} disabled={loading || ingredientRowsForSubmit.length === 0}>
                  {loading ? "Memproses..." : "Cek Menu"}
                </button>
              </div>
              {error ? <p style={styles.error}>{error}</p> : null}
            </>
          )}

          {step === 4 && result && (
            <>
              <h2>Hasil AI Menu Check</h2>
              {result.source === "fallback" ? <p style={styles.warning}>{result.warning || "Menggunakan fallback lokal."}</p> : null}
              <p style={styles.muted}>Bahan terkoreksi: {result.corrected_ingredients.join(", ")}</p>

              <div style={styles.recipeList}>
                {result.recipe_options.map((recipe) => (
                  <article key={recipe.title} style={styles.recipeCard}>
                    <h3>{recipe.title}</h3>
                    <p style={styles.muted}>{recipe.description}</p>
                    <p><b>Program:</b> {recipe.program_tags.join(", ")}</p>
                    <p><b>Waktu:</b> {recipe.cooking_time_minutes} menit • <b>Tingkat:</b> {recipe.difficulty}</p>
                    <p><b>Bahan utama:</b> {recipe.ingredients_used.join(", ")}</p>
                    <p><b>Tambahan:</b> {recipe.additional_ingredients.join(", ")}</p>
                    <p><b>Nutrisi (estimasi):</b> {recipe.nutrition.calories} kcal | P {recipe.nutrition.protein_g}g | C {recipe.nutrition.carbs_g}g | F {recipe.nutrition.fat_g}g | Fiber {recipe.nutrition.fiber_g}g</p>
                    <p><b>Kontribusi harian:</b> Kalori {recipe.daily_contribution.calories_percent}% • Protein {recipe.daily_contribution.protein_percent}% • Karbo {recipe.daily_contribution.carbs_percent}% • Lemak {recipe.daily_contribution.fat_percent}%</p>
                    <ol>
                      {recipe.steps.map((stepText, idx) => <li key={`${recipe.title}-${idx}`}>{stepText}</li>)}
                    </ol>
                    <p><b>Rekomendasi catering:</b> {recipe.catering_recommendation}</p>
                    <div style={styles.navRow}>
                      <button style={styles.ghostBtn}>Masak</button>
                      <button style={styles.ghostBtn}>Simpan</button>
                      <button style={styles.actionBtn}>Pesan Catering</button>
                    </div>
                  </article>
                ))}
              </div>

              <div style={styles.navRow}>
                <button style={styles.ghostBtn} onClick={() => setStep(2)}>Ubah Bahan</button>
                <a href="/" style={styles.actionBtn}>Kembali ke Home</a>
              </div>
            </>
          )}
        </section>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "linear-gradient(180deg, #ecfeff 0%, #f8fafc 55%, #ffffff 100%)", color: "#0f172a", padding: 18 },
  container: { maxWidth: 980, margin: "0 auto" },
  header: { marginBottom: 14 },
  backLink: { textDecoration: "none", fontWeight: 700, color: "#0369a1" },
  title: { fontSize: 40, margin: "10px 0 4px" },
  subtitle: { color: "#475569", lineHeight: 1.6 },
  stepBar: { display: "flex", gap: 10, marginBottom: 16 },
  stepDot: { width: 34, height: 34, borderRadius: 999, display: "grid", placeItems: "center", background: "#0f172a", color: "#fff", fontWeight: 800 },
  card: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: 20, boxShadow: "0 14px 34px rgba(15,23,42,.08)" },
  chipRow: { display: "flex", flexWrap: "wrap", gap: 10, margin: "12px 0" },
  chipBtn: { border: "1px solid #cbd5e1", borderRadius: 999, padding: "10px 14px", fontWeight: 700, cursor: "pointer" },
  actionBtn: { border: 0, background: "#16a34a", color: "#fff", borderRadius: 12, padding: "10px 16px", fontWeight: 800, cursor: "pointer", textDecoration: "none" },
  ghostBtn: { border: "1px solid #cbd5e1", background: "#fff", color: "#0f172a", borderRadius: 12, padding: "10px 16px", fontWeight: 700, cursor: "pointer" },
  navRow: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 },
  muted: { color: "#64748b" },
  helper: { color: "#64748b", marginTop: 6 },
  error: { color: "#dc2626", fontWeight: 700, marginTop: 10 },
  warning: { color: "#92400e", background: "#fef3c7", borderRadius: 10, padding: "8px 10px", fontWeight: 700 },
  ingredientStack: { display: "grid", gap: 10, marginTop: 10 },
  ingredientCard: { border: "1px solid #e2e8f0", borderRadius: 14, padding: 12, background: "#f8fafc" },
  rowHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  removeBtn: { border: "1px solid #fecaca", background: "#fff", color: "#b91c1c", borderRadius: 10, padding: "6px 10px", fontWeight: 700, cursor: "pointer" },
  rowGrid: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 8 },
  fieldWrap: { position: "relative" },
  input: { width: "100%", border: "1px solid #cbd5e1", borderRadius: 10, padding: "10px 12px", fontSize: 15, background: "#fff" },
  suggestBox: { position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, zIndex: 10, boxShadow: "0 8px 22px rgba(15,23,42,.12)" },
  suggestBtn: { display: "block", width: "100%", textAlign: "left", border: 0, background: "#fff", padding: "8px 10px", cursor: "pointer" },
  hintBtn: { marginTop: 6, border: 0, background: "transparent", color: "#0369a1", fontWeight: 700, cursor: "pointer", padding: 0 },
  recipeList: { display: "grid", gap: 12, marginTop: 12 },
  recipeCard: { border: "1px solid #e2e8f0", borderRadius: 14, padding: 14, background: "#f8fafc" },
};

const css = `
  ol { margin: 8px 0 0; padding-left: 18px; }
  li { margin: 4px 0; line-height: 1.5; }
  @media (max-width: 780px) {
    h1 { font-size: 32px !important; }
    [style*="grid-template-columns: 2fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
  }
`;
