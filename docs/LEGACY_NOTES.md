# Legacy Cleanup Notes

Tanggal: 2026-05-11

Dokumen ini mencatat pembersihan file legacy non-Fitbite agar root project valid untuk Next.js deploy.

## File/Folder Legacy yang Dihapus

- `frontend/` (sisa project topup/digital service lama)
- `backend/` (server Python lama yang tidak dipakai demo Next.js V1.3)
- `tests/`
- `test_reports/`
- `test_result.md`
- `design_guidelines.json`
- `docs/SHARED_HOSTING_GUIDE.md`
- `memory/PRD.md` (berisi PRD project lama Digital Hypebeast)
- `.gitconfig` (file konfigurasi non-esensial di root repo)
- `CHANGELOG.md` (changelog project lama, digantikan oleh `docs/FITBITE_CHANGELOG.md`)

## Catatan

- File konteks utama Fitbite tetap dipertahankan.
- Cleanup difokuskan untuk membuat root menjadi Next.js project yang bersih dan deployable.
