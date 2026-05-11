# Fitbite Project Index

Version: V1.3.2

## 🔒 Production Release Lock

Release utama saat ini:

```txt
Version     : V1.3.2
Project     : fitbitedemo
Team        : adith92s-projects
Production  : https://fitbitedemo.vercel.app
```

## Project Identity

Fitbite adalah aplikasi healthy food-tech Indonesia yang menggabungkan body check, target nutrisi, pantry ingredient input, AI recipe recommendation, healthy catering order, admin dashboard, dan business report.

## Current Status

- Current version: V1.3.2 - Ingredient Box Wizard and AI Menu Check
- Current phase: Serious AI Pantry Wizard flow
- Next phase: persistensi histori wizard + validasi nutrisi lanjutan

## Main Routes

- `/` (interactive demo)
- `/body-check`
- `/ingredients`
- `/admin`
- `/wizard` (ingredient box wizard)

## API Route

- `POST /api/ai/pantry-wizard`

## Important Files

- `PROJECT_INDEX.md`
- `AI_README.md`
- `README.md`
- `docs/RELEASE_LOG.md`
- `docs/AI_WIZARD_PLAN.md`
- `docs/FITBITE_CHANGELOG.md`
- `app/wizard/page.tsx`
- `app/api/ai/pantry-wizard/route.ts`

## Architecture

- Frontend: Next.js App Router + TypeScript
- AI Adapter: OpenRouter via server route
- Fallback: local recipe response saat env tidak tersedia / provider gagal
- Deploy: Vercel `fitbitedemo`

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
