"use client";

import { useMemo, useState } from "react";

const programs = {
  Diet: { calories: 1650, protein: 105, color: "#22c55e", note: "Defisit kalori santai, tetap kenyang." },
  Cutting: { calories: 1850, protein: 145, color: "#14b8a6", note: "Protein tinggi, kalori terkunci." },
  Bulking: { calories: 2750, protein: 155, color: "#f97316", note: "Kalori surplus bersih buat massa otot." },
  Maintain: { calories: 2200, protein: 120, color: "#6366f1", note: "Seimbang untuk makan sehat harian." },
};

const recipes = [
  { name: "Ayam Sambal Matah Brown Rice", kcal: 480, protein: 38, tag: "Cutting", time: "25m", match: 92 },
  { name: "Tumis Tahu Tempe Sayur Hijau", kcal: 430, protein: 26, tag: "Diet", time: "18m", match: 88 },
  { name: "Beef Rice Bowl Clean Bulk", kcal: 720, protein: 48, tag: "Bulking", time: "30m", match: 84 },
];

const orders = ["FB-0001 Cutting Box", "FB-0002 Diet Meal", "FB-0003 Bulk Rice Bowl"];

export default function HomePage() {
  const [program, setProgram] = useState("Cutting");
  const [ingredients, setIngredients] = useState("dada ayam, nasi merah, tempe, kangkung, telur");
  const [ordered, setOrdered] = useState(false);
  const current = programs[program as keyof typeof programs];
  const ingredientCount = useMemo(() => ingredients.split(",").filter(Boolean).length, [ingredients]);

  return (
    <main style={styles.page}>
      <style>{css}</style>
      <section style={styles.shell}>
        <nav style={styles.nav} className="fadeDown">
          <div style={styles.brand}><span style={styles.logo}>FB</span><b>Fitbite</b></div>
          <div style={styles.navLinks}><a href="#demo">Demo</a><a href="#admin">Admin</a><a href="#plan">Plan</a></div>
        </nav>

        <section style={styles.hero}>
          <div className="floatIn" style={styles.heroText}>
            <p style={styles.kicker}>🍱 AI Pantry • Nutrition • Catering</p>
            <h1 style={styles.title}>Makan sehat dari bahan yang ada di rumah.</h1>
            <p style={styles.subtitle}>Fitbite menghitung target badan, membaca bahan dapur, merekomendasikan resep Nusantara sehat, lalu bisa lanjut ke order catering.</p>
            <div style={styles.ctaRow}>
              <a style={styles.primaryBtn} href="#demo">Coba Demo</a>
              <a style={styles.secondaryBtn} href="#admin">Lihat Admin</a>
            </div>
          </div>
          <div className="phoneFloat" style={styles.phone}>
            <div style={styles.phoneTop}>Fitbite Today</div>
            <div style={styles.metricCard}><span>Target</span><b>{current.calories} kcal</b><small>{program}</small></div>
            <div style={styles.progressOuter}><div style={{ ...styles.progressInner, width: "72%", background: current.color }} /></div>
            <div style={styles.recipeMini}>🥗 {recipes[0].name}<br/><small>{recipes[0].kcal} kcal • Protein {recipes[0].protein}g</small></div>
          </div>
        </section>

        <section id="demo" style={styles.grid}>
          <div style={styles.card} className="popCard">
            <h2>1. Pilih Program</h2>
            <p style={styles.muted}>Menu dan resep dikunci sesuai goal user.</p>
            <div style={styles.tabs}>
              {Object.keys(programs).map((p) => (
                <button key={p} onClick={() => setProgram(p)} style={{ ...styles.tab, background: p === program ? current.color : "white", color: p === program ? "white" : "#0f172a" }}>{p}</button>
              ))}
            </div>
            <div style={styles.resultBox}><b>{program}</b><br/>{current.note}<br/><span>{current.calories} kcal • Protein {current.protein}g</span></div>
          </div>

          <div style={styles.card} className="popCard delay1">
            <h2>2. Bahan Rumah</h2>
            <p style={styles.muted}>User input bahan via text dulu. Voice dan photo scan masuk future plan.</p>
            <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} style={styles.textarea} />
            <p style={styles.badge}>🧊 {ingredientCount} bahan terdeteksi</p>
          </div>
        </section>

        <section style={styles.recipeSection}>
          <h2>3. AI Recipe Recommendation Mockup</h2>
          <div style={styles.recipeGrid}>
            {recipes.map((recipe, i) => (
              <article key={recipe.name} style={styles.recipeCard} className="recipeCard">
                <span style={styles.match}>{recipe.match}% match</span>
                <h3>{recipe.name}</h3>
                <p>{recipe.tag} • {recipe.time}</p>
                <div style={styles.macroRow}><b>{recipe.kcal}</b><span>kcal</span><b>{recipe.protein}g</b><span>protein</span></div>
                <button onClick={() => setOrdered(true)} style={styles.orderBtn}>Pesan Versi Catering</button>
              </article>
            ))}
          </div>
          {ordered && <div style={styles.toast} className="toast">📲 Order mockup masuk ke dashboard + Telegram owner</div>}
        </section>

        <section id="admin" style={styles.admin}>
          <div>
            <h2>4. Owner Dashboard Mockup</h2>
            <p style={styles.muted}>Order, member, kitchen queue, delivery manual, dan report dalam satu cockpit.</p>
          </div>
          <div style={styles.adminPanel}>
            {orders.map((order) => <div key={order} style={styles.orderRow}><span>{order}</span><b>Siap Proses</b></div>)}
          </div>
        </section>

        <section id="plan" style={styles.plan}>
          <h2>Future Plan</h2>
          <div style={styles.planGrid}>{["Supabase Auth", "Checkout Manual", "Telegram Bot", "Reports", "AI Recipe JSON", "WhatsApp API", "Payment Gateway", "Delivery API"].map((x) => <span key={x}>{x}</span>)}</div>
        </section>

        <section style={styles.quickRoutes}>
          <h2>Route Demo Cepat</h2>
          <div style={styles.quickRouteGrid}>
            <a href="/body-check">/body-check</a>
            <a href="/ingredients">/ingredients</a>
            <a href="/admin">/admin</a>
            <a href="/wizard">/wizard</a>
          </div>
        </section>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "radial-gradient(circle at top left, #dcfce7, #fffaf0 38%, #f8fafc)", color: "#0f172a", fontFamily: "Arial, sans-serif", overflow: "hidden" },
  shell: { maxWidth: 1120, margin: "0 auto", padding: 24 },
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0" },
  brand: { display: "flex", alignItems: "center", gap: 10, fontSize: 20 },
  logo: { display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: 16, background: "#22c55e", color: "white", fontWeight: 900 },
  navLinks: { display: "flex", gap: 18, fontWeight: 700 },
  hero: { display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 28, alignItems: "center", padding: "54px 0" },
  heroText: { maxWidth: 650 },
  kicker: { display: "inline-block", background: "white", borderRadius: 999, padding: "10px 14px", fontWeight: 800, boxShadow: "0 14px 40px rgba(15,23,42,.08)" },
  title: { fontSize: 68, lineHeight: .95, margin: "18px 0", letterSpacing: -2 },
  subtitle: { fontSize: 19, lineHeight: 1.65, color: "#475569" },
  ctaRow: { display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" },
  primaryBtn: { background: "#22c55e", color: "white", padding: "14px 20px", borderRadius: 18, textDecoration: "none", fontWeight: 900 },
  secondaryBtn: { background: "white", color: "#0f172a", padding: "14px 20px", borderRadius: 18, textDecoration: "none", fontWeight: 900, border: "1px solid #e2e8f0" },
  phone: { background: "#0f172a", color: "white", borderRadius: 36, padding: 22, minHeight: 420, boxShadow: "0 30px 80px rgba(15,23,42,.25)", border: "8px solid white" },
  phoneTop: { fontWeight: 900, marginBottom: 20 },
  metricCard: { background: "white", color: "#0f172a", borderRadius: 24, padding: 20, display: "grid", gap: 6 },
  progressOuter: { margin: "22px 0", height: 14, background: "rgba(255,255,255,.18)", borderRadius: 99, overflow: "hidden" },
  progressInner: { height: "100%", borderRadius: 99, transition: "all .45s ease" },
  recipeMini: { background: "rgba(255,255,255,.1)", borderRadius: 24, padding: 18, lineHeight: 1.6 },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 },
  card: { background: "rgba(255,255,255,.82)", border: "1px solid rgba(15,23,42,.08)", borderRadius: 28, padding: 24, boxShadow: "0 18px 50px rgba(15,23,42,.08)", backdropFilter: "blur(12px)" },
  muted: { color: "#64748b", lineHeight: 1.55 },
  tabs: { display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18 },
  tab: { border: "1px solid #e2e8f0", borderRadius: 999, padding: "10px 14px", fontWeight: 900, cursor: "pointer", transition: "all .2s ease" },
  resultBox: { marginTop: 18, background: "#f8fafc", borderRadius: 22, padding: 18, lineHeight: 1.7 },
  textarea: { width: "100%", minHeight: 120, borderRadius: 20, border: "1px solid #e2e8f0", padding: 16, fontSize: 16 },
  badge: { display: "inline-block", background: "#dcfce7", padding: "8px 12px", borderRadius: 999, fontWeight: 800 },
  recipeSection: { padding: "44px 0" },
  recipeGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 },
  recipeCard: { background: "white", borderRadius: 28, padding: 22, border: "1px solid #e2e8f0", boxShadow: "0 14px 40px rgba(15,23,42,.07)" },
  match: { background: "#dcfce7", borderRadius: 999, padding: "7px 10px", fontWeight: 900, fontSize: 12 },
  macroRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, alignItems: "center", margin: "18px 0" },
  orderBtn: { width: "100%", border: 0, background: "#0f172a", color: "white", borderRadius: 16, padding: 14, fontWeight: 900, cursor: "pointer" },
  toast: { position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "#0f172a", color: "white", borderRadius: 999, padding: "14px 18px", fontWeight: 900, boxShadow: "0 18px 50px rgba(15,23,42,.22)" },
  admin: { display: "grid", gridTemplateColumns: ".8fr 1.2fr", gap: 22, alignItems: "center", background: "#0f172a", color: "white", borderRadius: 34, padding: 28, marginBottom: 34 },
  adminPanel: { display: "grid", gap: 12 },
  orderRow: { background: "rgba(255,255,255,.1)", borderRadius: 18, padding: 16, display: "flex", justifyContent: "space-between" },
  plan: { background: "white", borderRadius: 34, padding: 28, marginBottom: 44 },
  planGrid: { display: "flex", flexWrap: "wrap", gap: 12 },
  quickRoutes: { background: "white", borderRadius: 34, padding: 28, marginBottom: 44 },
  quickRouteGrid: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12, fontWeight: 800 },
};

const css = `
  a { color: inherit; }
  .fadeDown { animation: fadeDown .7s ease both; }
  .floatIn { animation: floatIn .8s ease both; }
  .phoneFloat { animation: phoneFloat 4s ease-in-out infinite; }
  .popCard { animation: popCard .7s ease both; }
  .delay1 { animation-delay: .12s; }
  .recipeCard { transition: transform .25s ease, box-shadow .25s ease; }
  .recipeCard:hover { transform: translateY(-8px) rotate(-.5deg); box-shadow: 0 28px 70px rgba(15,23,42,.14); }
  .toast { animation: toast .35s ease both; }
  @keyframes fadeDown { from { opacity: 0; transform: translateY(-16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes floatIn { from { opacity: 0; transform: translateY(20px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes phoneFloat { 0%, 100% { transform: translateY(0) rotate(1deg); } 50% { transform: translateY(-14px) rotate(-1deg); } }
  @keyframes popCard { from { opacity: 0; transform: scale(.96) translateY(18px); } to { opacity: 1; transform: scale(1) translateY(0); } }
  @keyframes toast { from { opacity: 0; transform: translateX(-50%) translateY(14px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
  @media (max-width: 980px) {
    main section[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 820px) {
    h1 { font-size: 42px !important; }
  }
`;
