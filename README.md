# 🍱 Fitbite

Fitbite adalah aplikasi healthy food-tech untuk Indonesia: body check, nutrition target, pantry ingredient input, AI recipe recommendation, dan healthy catering workflow.

## Current Version

V1.3.2 - Ingredient Box Wizard and AI Menu Check

## Main Routes

- `/`
- `/body-check`
- `/ingredients`
- `/admin`
- `/wizard`

## Wizard Highlights

- Input bahan pakai kartu terstruktur: nama, jumlah, satuan.
- Autocomplete lokal + autocorrect typo umum Indonesia.
- Tombol singkat: `Cek Menu`.
- Hasil menampilkan opsi resep, langkah masak, dan nutrisi estimasi.

## API Route

- `POST /api/ai/pantry-wizard`

## How To Run

```bash
npm install
npm run build
npm run dev
```

## How To Deploy

- Vercel project: `fitbitedemo`
- Domain: `https://fitbitedemo.vercel.app`
- Framework: Next.js
- Build command: `npm run build`

## Docs

- `PROJECT_INDEX.md`
- `AI_README.md`
- `docs/RELEASE_LOG.md`
- `docs/AI_WIZARD_PLAN.md`
- `docs/FITBITE_CHANGELOG.md`
