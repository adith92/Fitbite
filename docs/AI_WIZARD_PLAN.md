# Fitbite AI Wizard Plan

Version target: V1.3

## Goal

Build AI-powered pantry wizard inside Fitbite.

## Scope V1.3

- Route UI: `/wizard` (multi-step flow)
- API route: `POST /api/ai/pantry-wizard`
- Integrasi OpenRouter via server-side env
- Fallback lokal jika env belum ada / API gagal

## Wizard Flow

1. User pilih goal program.
2. User input bahan dapur.
3. User isi alergi dan budget.
4. Wizard memanggil API route.
5. User menerima 3 rekomendasi resep + langkah masak + nutrisi estimasi.

## Security Rules

- API key tidak boleh ada di frontend.
- API key tidak boleh di-commit ke repo.
- API key hanya disimpan di Vercel Environment Variables.

## Output Structure

- `source` (`openrouter` atau `fallback`)
- `note`
- `recipes[]`: nama, kalori, protein, reason, ingredients, steps

## Next Steps

- Persistensi histori wizard per user
- Validasi input lebih ketat
- Mode meal plan mingguan
