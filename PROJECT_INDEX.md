# Fitbite Project Index

Version: V1.1

This file is the main index for ChatGPT, Codex, and developers working on Fitbite.

## Project Identity

Fitbite is a healthy food-tech app for Indonesia.

It combines:

- Body check and nutrition target.
- Pantry ingredient input.
- AI recipe recommendation.
- Healthy catering order.
- Admin dashboard.
- Telegram notification.
- Business reports.

## Current Status

Current version: V1.1

Current phase: Documentation and Project Brain.

Next phase: V1.2 Clean Repo and Deploy Base.

## Main Product Flow

1. User fills body data.
2. App calculates BMI, BMR, TDEE, calories, and macros.
3. User inputs ingredients available at home.
4. App recommends healthy Indonesian recipes.
5. User can cook, order extra ingredients, or order healthy catering.
6. Order goes to admin dashboard.
7. Owner receives Telegram notification.
8. Kitchen and delivery are handled manually first.
9. Reports summarize sales, menu, member, kitchen, and delivery data.

## Important Files

- README.md: project overview.
- PROJECT_INDEX.md: this index file.
- docs/PROJECT_CONTEXT_PROMPT.md: AI/developer context prompt.
- docs/PROJECT_PLAN.md: product and MVP plan.
- docs/FITBITE_CHANGELOG.md: official Fitbite changelog.
- docs/ROADMAP.md: phased roadmap.
- docs/NOTES.md: project notes.
- docs/VERCEL_DEPLOY.md: deploy guide.
- package.json: root Next.js package config.
- app/page.tsx: main landing page.
- app/body-check/page.tsx: body check page.
- app/ingredients/page.tsx: ingredient input page.
- app/admin/page.tsx: admin dashboard page.
- lib/nutrition.ts: nutrition calculation helper.
- lib/telegram.ts: Telegram order message helper.

## Architecture

Frontend:

- Next.js.
- TypeScript.
- App Router.
- Vercel deploy.

Backend planned:

- Supabase.
- PostgreSQL.
- Supabase Auth.
- Supabase Storage.

Notification planned:

- Telegram Bot for MVP.
- WhatsApp Cloud API later.

Payment and delivery:

- Manual transfer first.
- Manual ojol/logistic first.
- Gateway and delivery API later.

## Versioning Rule

Every meaningful change must update docs/FITBITE_CHANGELOG.md.

Version sequence:

- V1.0 Initial Scaffold.
- V1.1 Documentation and Project Brain.
- V1.2 Clean Repo and Deploy Base.
- V1.3 Customer Core.
- V1.4 Pantry and Recipe MVP.
- V1.5 Catering Order MVP.
- V1.6 Admin Dashboard MVP.
- V1.7 Reports.
- V2.0 AI and Automation.

## Next Recommended Work

V1.2 tasks:

1. Audit all current repo files.
2. Remove or isolate legacy files from the old project.
3. Fix Next.js layout and styles.
4. Ensure npm install works.
5. Ensure npm run build works.
6. Deploy to Vercel.
7. Update docs/FITBITE_CHANGELOG.md to V1.2.

## AI Instruction

When working on this repo:

- Read PROJECT_INDEX.md first.
- Read docs/PROJECT_CONTEXT_PROMPT.md second.
- Read docs/FITBITE_CHANGELOG.md before changing code.
- Update changelog after meaningful changes.
- Keep changes small and incremental.
- Do not jump to V2.0 automation before MVP flows work.
