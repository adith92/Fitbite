# Fitbite Project Index

Version: V1.2.1

File ini adalah indeks utama untuk ChatGPT, Codex, dan developer yang bekerja di repo Fitbite.

## 🔒 Production Release Lock

Release utama yang dijadikan acuan sekarang:

```txt
Version     : V1.2.1
Commit      : 3c24d6a
Project     : fitbitedemo
Team        : adith92s-projects
Vercel      : READY
Production  : https://fitbitedemo.vercel.app
```

Catatan lengkap release ada di:

```txt
docs/RELEASE_LOG.md
```

## Project Identity

Fitbite adalah aplikasi healthy food-tech untuk Indonesia.

Fitur inti:

- Body check.
- Nutrition target.
- Pantry ingredient input.
- AI recipe recommendation.
- Healthy catering order.
- Admin dashboard.
- Telegram/WhatsApp notification (WhatsApp masih plan).
- Business report.

## Current Status

- Current version: V1.2.1 - Repository Indexing and Build Cleanup
- Current phase: production demo ready on Vercel
- Next phase: V1.3 Customer Core

## Main Routes

- `/` -> interactive demo mockup Fitbite
- `/body-check` -> body check overview
- `/ingredients` -> pantry ingredient input overview
- `/admin` -> admin dashboard preview

## Architecture

- Frontend: Next.js App Router + TypeScript
- Styling: CSS sederhana (aman untuk build demo)
- Backend plan: Supabase + PostgreSQL
- Notification MVP: Telegram helper
- Deploy target: Vercel (`fitbitedemo`)

## Important Files

- `PROJECT_INDEX.md`
- `AI_README.md`
- `README.md`
- `docs/RELEASE_LOG.md`
- `docs/PROJECT_CONTEXT_PROMPT.md`
- `docs/PROJECT_PLAN.md`
- `docs/FITBITE_CHANGELOG.md`
- `docs/ROADMAP.md`
- `docs/VERCEL_DEPLOY.md`
- `docs/LEGACY_NOTES.md`
- `app/layout.tsx`
- `app/page.tsx`
- `app/body-check/page.tsx`
- `app/ingredients/page.tsx`
- `app/admin/page.tsx`
- `lib/nutrition.ts`
- `lib/telegram.ts`

## How To Build

```bash
npm install
npm run build
```

## How To Deploy

- Import repo `adith92/Fitbite` ke Vercel
- Project name: `fitbitedemo`
- Framework: Next.js
- Build command: `npm run build`
- Output: default
- Env vars: tidak wajib untuk demo V1.2.1

## Next Task

Lanjut ke V1.3 Customer Core secara bertahap:

- Body data form.
- Nutrition estimator UI.
- Program selector logic.
- Pantry flow dasar.
- Recipe data structure yang lebih realistis.

## Instruction For AI/Codex

- Baca file ini terlebih dahulu.
- Lanjut baca `AI_README.md`, `docs/RELEASE_LOG.md`, dan `docs/PROJECT_CONTEXT_PROMPT.md`.
- Setiap perubahan penting wajib update `docs/FITBITE_CHANGELOG.md`.
- Jangan implement payment gateway, delivery API, atau WhatsApp API di tahap ini.
- Hindari klaim medis; semua nutrisi bersifat estimasi.

## Indexing Note

Repo ini harus dipilih dari ChatGPT GitHub connector melalui Configure Repositories. Jika masih Not indexed, pilih repo `adith92/Fitbite`, tunggu proses indexing, lalu refresh ChatGPT. Semua konteks utama repo tersedia di `PROJECT_INDEX.md`, `AI_README.md`, `docs/RELEASE_LOG.md`, dan `docs/PROJECT_CONTEXT_PROMPT.md`.
