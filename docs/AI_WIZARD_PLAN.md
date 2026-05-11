# Fitbite AI Wizard Plan

Version target: V1.3.2

## Goal

Membuat AI Pantry Wizard yang serius dengan input bahan terstruktur dan output menu yang actionable.

## Scope V1.3.2

- Route UI: `/wizard`
- API route: `POST /api/ai/pantry-wizard`
- Input bahan pakai ingredient box (nama, jumlah, satuan)
- Local autocomplete + typo autocorrect
- Auto-add row saat baris terakhir sudah terisi
- CTA utama: `Cek Menu`
- Output: opsi resep + langkah masak + nutrisi estimasi

## Security Rules

- API key tidak boleh ada di frontend.
- API key tidak boleh di-commit ke repo.
- API key hanya disimpan di Vercel Environment Variables.

## Next Steps

- Persistensi histori wizard per user
- Integrasi database nutrisi terverifikasi
- Photo scan dan voice input
