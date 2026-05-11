# Fitbite Project Index

Version: V1.3

File ini adalah indeks utama untuk developer/AI yang bekerja di repo Fitbite.

## Project Identity

Fitbite adalah aplikasi healthy food-tech untuk Indonesia.

Fitur inti:

- Body check dan target nutrisi.
- Input bahan dapur (pantry).
- AI recipe recommendation.
- Healthy catering order (demo flow).
- Admin dashboard preview.
- Telegram notification helper.
- Business report plan.

## Current Status

Current version: V1.3

Current phase: Deployable interactive demo base.

Next phase: Customer core implementation.

## Main Product Flow

1. User isi data tubuh.
2. App hitung BMI, BMR, TDEE, kalori, dan makro (estimasi).
3. User input bahan yang ada di rumah.
4. App beri rekomendasi resep sehat lokal.
5. User bisa lanjut order catering sehat.
6. Order masuk admin dashboard.
7. Owner menerima notifikasi (Telegram helper).
8. Kitchen dan delivery masih manual untuk MVP awal.
9. Report bisnis dirangkum bertahap.

## Active Structure (Root)

- `app/` -> Next.js App Router pages.
- `lib/` -> helper logic.
- `docs/` -> dokumen produk, roadmap, changelog, deploy.
- `memory/` -> catatan produk Fitbite.
- `package.json` -> root config build.
- `next.config.ts`, `tsconfig.json`, `postcss.config.js`.
- `vercel.json` -> deployment hint aman untuk Vercel.

## Important Files

- `PROJECT_INDEX.md`
- `AI_README.md`
- `README.md`
- `docs/PROJECT_CONTEXT_PROMPT.md`
- `docs/PROJECT_PLAN.md`
- `docs/FITBITE_CHANGELOG.md`
- `docs/ROADMAP.md`
- `docs/VERCEL_DEPLOY.md`
- `docs/LEGACY_NOTES.md`
- `app/page.tsx`
- `app/body-check/page.tsx`
- `app/ingredients/page.tsx`
- `app/admin/page.tsx`
- `lib/nutrition.ts`
- `lib/telegram.ts`

## Versioning Rule

Setiap perubahan berarti wajib dicatat di `docs/FITBITE_CHANGELOG.md`.

Urutan versi utama:

- V1.0 Initial scaffold.
- V1.1 Documentation and project brain.
- V1.2 Interactive demo mockup and deploy preparation.
- V1.3 Deployable demo cleanup dan Vercel-ready base.
- V1.4 Pantry and recipe MVP.
- V1.5 Catering order MVP.
- V1.6 Admin dashboard MVP.
- V1.7 Reports.
- V2.0 AI and automation.

## Rules

- Selalu baca `PROJECT_INDEX.md` dan `AI_README.md` dulu.
- Untuk user-facing copy, gunakan Bahasa Indonesia.
- Hindari klaim medis; kalkulasi nutrisi adalah estimasi.
- Jangan implement payment gateway/delivery API/WhatsApp API di tahap demo ini.
