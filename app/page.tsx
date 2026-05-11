import Link from "next/link";

const programs = ["Diet", "Cutting", "Bulking", "Maintain", "Healthy Daily"];

export default function HomePage() {
  return (
    <main style={{ padding: 32, fontFamily: "Arial, sans-serif", background: "#fffaf0", minHeight: "100vh" }}>
      <section style={{ maxWidth: 980, margin: "0 auto" }}>
        <p style={{ fontWeight: 700 }}>Fitbite</p>
        <h1 style={{ fontSize: 52, lineHeight: 1.05, margin: "24px 0" }}>
          Makan sehat dari bahan yang ada di rumah.
        </h1>
        <p style={{ fontSize: 18, maxWidth: 680 }}>
          Fitbite adalah cookbook sehat, AI pantry recipe suggester, nutrition tracker, dan smart catering order untuk Indonesia.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
          <Link href="/body-check">Mulai Body Check</Link>
          <Link href="/pantry">Cek Bahan Rumah</Link>
          <Link href="/admin">Admin Dashboard</Link>
        </div>
        <h2 style={{ marginTop: 48 }}>Program</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
          {programs.map((program) => (
            <div key={program} style={{ background: "white", borderRadius: 20, padding: 20, border: "1px solid #eee" }}>
              <b>{program}</b>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
