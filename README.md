# Fitbite

Version: V1.3

Fitbite adalah aplikasi healthy food-tech untuk Indonesia: body check, target nutrisi (estimasi), input bahan rumah, rekomendasi resep sehat, dan demo order catering dengan preview admin dashboard.

## Fitur Demo Aktif

- Landing demo interaktif Fitbite.
- Program selector: Diet, Cutting, Bulking, Maintain.
- Target calories/protein berubah sesuai program.
- Pantry input mockup.
- Recipe recommendation cards.
- Tombol `Pesan Versi Catering` + toast feedback.
- Preview owner/admin dashboard.
- Route demo: `/body-check`, `/ingredients`, `/admin`.

## Prinsip Produk

- Fokus Indonesia, halal-first, local ingredients, zero-waste.
- Copy user-facing menggunakan Bahasa Indonesia.
- Kalkulasi nutrisi adalah estimasi, bukan diagnosis medis.

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Deploy target: Vercel (`fitbitedemo`)

## Menjalankan Lokal

```bash
npm install
npm run build
npm run dev
```

## Deploy Vercel

- Import repo `adith92/Fitbite`
- Project name: `fitbitedemo`
- Framework: Next.js
- Build command: `npm run build`
- Output: default
- Env vars: tidak wajib untuk demo V1.3

## Dokumen Utama

- `PROJECT_INDEX.md`
- `AI_README.md`
- `docs/PROJECT_CONTEXT_PROMPT.md`
- `docs/PROJECT_PLAN.md`
- `docs/FITBITE_CHANGELOG.md`
- `docs/VERCEL_DEPLOY.md`
- `docs/LEGACY_NOTES.md`
