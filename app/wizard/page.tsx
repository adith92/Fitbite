"use client";

import { useMemo, useState } from "react";

type WizardResult = {
  source: "openrouter" | "fallback";
  note: string;
  recipes: Array<{
    name: string;
    calories: number;
    protein: number;
    reason: string;
    ingredients: string[];
    steps: string[];
  }>;
};

const programGoals = ["Diet", "Cutting", "Bulking", "Maintain"];
const budgetOptions = ["Hemat", "Standar", "Premium"];

export default function PantryWizardPage() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("Maintain");
  const [ingredients, setIngredients] = useState("telur, tempe, bayam, nasi merah");
  const [allergies, setAllergies] = useState("tidak ada");
  const [budget, setBudget] = useState("Standar");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<WizardResult | null>(null);

  const ingredientCount = useMemo(
    () => ingredients.split(",").map((x) => x.trim()).filter(Boolean).length,
    [ingredients],
  );

  async function runWizard() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ai/pantry-wizard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, ingredients, allergies, budget }),
      });

      if (!response.ok) {
        throw new Error("Gagal memproses rekomendasi AI.");
      }

      const data = (await response.json()) as WizardResult;
      setResult(data);
      setStep(4);
    } catch {
      setError("Rekomendasi belum bisa diproses. Coba lagi sebentar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <style>{css}</style>
      <section style={styles.container}>
        <header style={styles.header}>
          <a href="/" style={styles.backLink}>← Kembali ke Demo</a>
          <h1 style={styles.title}>AI Pantry Wizard</h1>
          <p style={styles.subtitle}>Rancang menu sehat berbasis bahan rumah dengan rekomendasi AI Fitbite.</p>
        </header>

        <div style={styles.stepBar}>
          {[1, 2, 3, 4].map((s) => (
            <div key={s} style={{ ...styles.stepDot, opacity: s <= step ? 1 : 0.35 }}>{s}</div>
          ))}
        </div>

        <section style={styles.card}>
          {step === 1 && (
            <div>
              <h2>Pilih Goal Program</h2>
              <div style={styles.chipRow}>
                {programGoals.map((item) => (
                  <button
                    key={item}
                    onClick={() => setGoal(item)}
                    style={{ ...styles.chipBtn, background: goal === item ? "#16a34a" : "#ffffff", color: goal === item ? "#fff" : "#0f172a" }}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <button style={styles.nextBtn} onClick={() => setStep(2)}>Lanjut</button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2>Input Bahan Dapur</h2>
              <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} style={styles.textarea} />
              <p style={styles.muted}>Bahan terdeteksi: {ingredientCount}</p>
              <div style={styles.navRow}>
                <button style={styles.ghostBtn} onClick={() => setStep(1)}>Kembali</button>
                <button style={styles.nextBtn} onClick={() => setStep(3)}>Lanjut</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2>Preferensi Tambahan</h2>
              <label style={styles.label}>Alergi / pantangan</label>
              <input value={allergies} onChange={(e) => setAllergies(e.target.value)} style={styles.input} />
              <label style={styles.label}>Budget masak</label>
              <div style={styles.chipRow}>
                {budgetOptions.map((item) => (
                  <button
                    key={item}
                    onClick={() => setBudget(item)}
                    style={{ ...styles.chipBtn, background: budget === item ? "#0f172a" : "#ffffff", color: budget === item ? "#fff" : "#0f172a" }}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div style={styles.navRow}>
                <button style={styles.ghostBtn} onClick={() => setStep(2)}>Kembali</button>
                <button style={styles.nextBtn} onClick={runWizard} disabled={loading}>{loading ? "Memproses..." : "Generate Rekomendasi"}</button>
              </div>
              {error ? <p style={styles.error}>{error}</p> : null}
            </div>
          )}

          {step === 4 && result && (
            <div>
              <h2>Hasil Rekomendasi Pantry Wizard</h2>
              <p style={styles.muted}>{result.note}</p>
              <p style={styles.badge}>Mode: {result.source === "openrouter" ? "AI OpenRouter" : "Fallback Lokal"}</p>
              <div style={styles.recipeList}>
                {result.recipes.map((recipe) => (
                  <article key={recipe.name} style={styles.recipeCard}>
                    <h3>{recipe.name}</h3>
                    <p style={styles.muted}>{recipe.reason}</p>
                    <p><b>{recipe.calories} kcal</b> • Protein <b>{recipe.protein}g</b> (estimasi)</p>
                    <p style={styles.muted}>Bahan: {recipe.ingredients.join(", ")}</p>
                    <ol>
                      {recipe.steps.map((stepItem, idx) => <li key={`${recipe.name}-${idx}`}>{stepItem}</li>)}
                    </ol>
                  </article>
                ))}
              </div>
              <div style={styles.navRow}>
                <button style={styles.ghostBtn} onClick={() => setStep(1)}>Ulang Wizard</button>
                <a href="/" style={styles.nextBtn}>Kembali ke Home</a>
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "linear-gradient(180deg, #ecfeff 0%, #f8fafc 55%, #ffffff 100%)", color: "#0f172a", padding: 20 },
  container: { maxWidth: 920, margin: "0 auto" },
  header: { marginBottom: 18 },
  backLink: { textDecoration: "none", fontWeight: 700, color: "#0369a1" },
  title: { fontSize: 44, margin: "10px 0 4px" },
  subtitle: { color: "#475569", lineHeight: 1.6 },
  stepBar: { display: "flex", gap: 10, margin: "14px 0 20px" },
  stepDot: { width: 34, height: 34, borderRadius: 999, display: "grid", placeItems: "center", background: "#0f172a", color: "white", fontWeight: 800 },
  card: { background: "white", border: "1px solid #e2e8f0", borderRadius: 22, padding: 22, boxShadow: "0 14px 40px rgba(15,23,42,.08)" },
  chipRow: { display: "flex", gap: 10, flexWrap: "wrap", margin: "14px 0" },
  chipBtn: { border: "1px solid #cbd5e1", borderRadius: 999, padding: "10px 14px", fontWeight: 800, cursor: "pointer" },
  textarea: { width: "100%", minHeight: 120, borderRadius: 14, border: "1px solid #cbd5e1", padding: 12, fontSize: 16 },
  input: { width: "100%", borderRadius: 12, border: "1px solid #cbd5e1", padding: 10, marginBottom: 14, fontSize: 15 },
  label: { display: "block", fontWeight: 700, margin: "8px 0" },
  muted: { color: "#64748b" },
  navRow: { display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" },
  nextBtn: { border: 0, background: "#16a34a", color: "white", borderRadius: 12, padding: "10px 16px", fontWeight: 800, textDecoration: "none", cursor: "pointer" },
  ghostBtn: { border: "1px solid #cbd5e1", background: "white", color: "#0f172a", borderRadius: 12, padding: "10px 16px", fontWeight: 700, cursor: "pointer" },
  error: { color: "#dc2626", fontWeight: 700, marginTop: 10 },
  badge: { display: "inline-block", padding: "8px 12px", borderRadius: 999, background: "#dcfce7", fontWeight: 800 },
  recipeList: { display: "grid", gap: 12, marginTop: 14 },
  recipeCard: { border: "1px solid #e2e8f0", borderRadius: 14, padding: 14, background: "#f8fafc" },
};

const css = `
  ol { margin: 8px 0 0; padding-left: 18px; }
  li { margin: 4px 0; line-height: 1.5; }
  @media (max-width: 760px) {
    h1 { font-size: 34px !important; }
  }
`;
