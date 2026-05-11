# Fitbite Project Index

Version: V1.4

## 🔒 Production Release Lock

Release utama saat ini:

```txt
Version     : V1.4
Project     : fitbitedemo
Team        : adith92s-projects
Production  : https://fitbitedemo.vercel.app
```

## Project Identity

Fitbite adalah aplikasi healthy food-tech Indonesia yang menggabungkan body check, target nutrisi, pantry ingredient input, AI recipe recommendation, healthy catering order, admin dashboard, dan business report.

## Current Status

- Current version: V1.4 - Pantry and Recipe MVP
- Current phase: Rapikan UX hasil resep dan mode langkah masak
- Next phase: QUEUE-FB-4 Nutrition Database MVP

## Main Routes

- `/` (interactive demo)
- `/body-check`
- `/ingredients`
- `/admin`
- `/wizard` (ingredient box wizard)

## API Routes

- `GET /api/ai/health`
- `POST /api/ai/pantry-wizard`

## Important Files

- `PROJECT_INDEX.md`
- `AI_README.md`
- `README.md`
- `docs/RELEASE_LOG.md`
- `docs/FITBITE_CHANGELOG.md`
- `app/api/ai/health/route.ts`
- `app/api/ai/pantry-wizard/route.ts`
- `app/wizard/page.tsx`

## Build and Deploy

```bash
npm install
npm run build
```

## AI/Codex Rules

- Jangan commit API key ke repo.
- Jangan expose API key di frontend.
- Simpan secret hanya di Vercel Environment Variables.
- Copy user-facing pakai Bahasa Indonesia.
- Nutrisi adalah estimasi, bukan diagnosis medis.
