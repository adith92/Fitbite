# Fitbite Project Index

Version: V1.3

## 🔒 Production Release Lock

Release utama yang dijadikan acuan saat ini:

```txt
Version     : V1.3
Project     : fitbitedemo
Team        : adith92s-projects
Vercel      : READY
Production  : https://fitbitedemo.vercel.app
```

## Project Identity

Fitbite adalah aplikasi healthy food-tech untuk Indonesia yang menggabungkan body check, nutrition target, pantry ingredient input, AI recipe recommendation, healthy catering order, admin dashboard, dan report bisnis.

## Current Status

- Current version: V1.3 - AI Pantry Wizard and OpenRouter Integration Base
- Current phase: Wizard UI/API aktif dan aman untuk deploy
- Next phase: customer core persistence + user history

## Main Routes

- `/` (interactive demo)
- `/body-check`
- `/ingredients`
- `/admin`
- `/wizard` (multi-step AI Pantry Wizard)

## API Routes

- `POST /api/ai/pantry-wizard`

## Important Files

- `PROJECT_INDEX.md`
- `AI_README.md`
- `README.md`
- `docs/RELEASE_LOG.md`
- `docs/PROJECT_CONTEXT_PROMPT.md`
- `docs/PROJECT_PLAN.md`
- `docs/AI_WIZARD_PLAN.md`
- `docs/FITBITE_CHANGELOG.md`
- `app/wizard/page.tsx`
- `app/api/ai/pantry-wizard/route.ts`

## Architecture

- Frontend: Next.js App Router + TypeScript
- AI Adapter: OpenRouter via server route
- Fallback: local recipe response saat env tidak tersedia
- Deploy: Vercel `fitbitedemo`

## Build and Deploy

```bash
npm install
npm run build
```

Deploy target:

- `https://fitbitedemo.vercel.app`

## AI/Codex Instructions

- Jangan commit API key ke repo.
- Jangan expose API key di frontend.
- Simpan secret hanya di Vercel Environment Variables.
- Semua klaim nutrisi harus berbentuk estimasi.
- Update `docs/FITBITE_CHANGELOG.md` untuk setiap perubahan meaningful.

## Indexing Note

Repo ini harus dipilih dari ChatGPT GitHub connector melalui Configure Repositories. Jika masih Not indexed, pilih repo `adith92/Fitbite`, tunggu proses indexing, lalu refresh ChatGPT. Konteks utama ada di `PROJECT_INDEX.md`, `AI_README.md`, `docs/RELEASE_LOG.md`, dan `docs/PROJECT_CONTEXT_PROMPT.md`.
