# AI README for Fitbite

Mulai dari file ini jika kamu AI assistant yang bekerja di repo Fitbite.

## Read Order

1. PROJECT_INDEX.md
2. docs/PROJECT_CONTEXT_PROMPT.md
3. docs/PROJECT_PLAN.md
4. docs/FITBITE_CHANGELOG.md
5. README.md

## Current Version

V1.3.3

## Current Mission

Stabilkan status AI aktif/fallback di production dan pastikan flow pantry wizard tetap aman.

## Rules

- Jangan commit API key ke GitHub.
- Jangan taruh API key di client/frontend.
- Simpan API key hanya di Vercel env vars.
- Setiap perubahan penting wajib update changelog.
- Jangan implement payment gateway/delivery API/WhatsApp API pada fase ini.
- Hindari klaim medis; nutrisi bersifat estimasi.
