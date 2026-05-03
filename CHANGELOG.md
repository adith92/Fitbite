# Changelog

## 2026-05-04

### Added

- Halaman login gabungan untuk `Admin` dan `User`
- Route hash-based untuk `/#/login`, `/#/admin`, dan `/#/user`
- Panel admin frontend untuk edit konten utama website
- Export dan import `site-content.json` untuk workflow shared hosting/cPanel
- Draft konten lokal via `localStorage` untuk preview cepat tanpa sentuh file dulu
- User dashboard sederhana untuk role user
- Progress bar scroll, hero showcase, dan motion visual yang lebih premium
- File panduan shared hosting yang lebih lengkap

### Changed

- Login admin dan user digabung ke satu pintu login
- Struktur konten dipusatkan ke `frontend/src/content/siteContent.js`
- Runtime konten dipisah ke `frontend/public/site-content.json`
- Landing page sekarang baca konten dari sumber default, file JSON hosting, atau draft lokal
- Icon/logo produk lokal diperbaiki agar lebih sesuai: Mobile Legends, Free Fire, PUBG Mobile, Google Play, Steam Wallet
- `frontend/public/index.html` dirapikan untuk kebutuhan deploy statis
- `homepage` di `frontend/package.json` tetap aman untuk root maupun subfolder hosting

### Notes

- Login admin saat ini masih frontend-only, jadi aman untuk demo/statis tapi belum setara auth backend sungguhan
- Build production terakhir berhasil
