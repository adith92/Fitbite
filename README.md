# 🍱 Fitbite

Fitbite adalah aplikasi healthy food-tech untuk Indonesia: body check, nutrition target, pantry ingredient input, AI recipe recommendation, dan healthy catering workflow.

## Current Version

V1.4 - Pantry and Recipe MVP

## Main Routes

- `/`
- `/body-check`
- `/ingredients`
- `/admin`
- `/wizard`

## API Routes

- `GET /api/ai/health`
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

## Notes

- Wizard memakai ingredient cards terstruktur: nama bahan, jumlah, dan satuan.
- Status AI di wizard membedakan: AI aktif, missing env, provider error, dan fallback local.
- Hasil recipe punya mode langkah masak bertahap + ringkasan nutrisi estimasi.
- Nutrisi adalah estimasi, bukan saran medis.
