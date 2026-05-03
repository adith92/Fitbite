# Shared Hosting Guide

## Gambaran sekarang

- Website utama: landing page top up dan jasa digital
- Login: `/#/login`
- Panel admin: `/#/admin`
- Panel user: `/#/user`
- Konten server-side statis: `frontend/public/site-content.json`
- Draft edit browser lokal: disimpan di `localStorage`

## Struktur edit yang paling penting

- `frontend/src/content/siteContent.js`
  Default konten repo untuk developer
- `frontend/public/site-content.json`
  Konten runtime yang dibaca website saat dibuka
- `frontend/public/images/products`
  Logo/icon produk lokal
- `frontend/public/images/testimonials`
  Avatar/testimoni lokal

## Cara login admin

1. Jalankan website lokal atau buka hasil upload hosting.
2. Masuk ke `/#/login`.
3. Pilih tab `Admin`.
4. Login pakai username dan password dari:

```text
frontend/src/content/siteContent.js
```

5. Setelah masuk, kamu akan diarahkan ke `/#/admin`.

## Cara edit konten lewat panel admin

Di panel admin kamu bisa:

- ubah brand, hero, kontak
- ubah username/password admin frontend
- ubah semua produk, harga, path icon
- ubah layanan
- ubah testimoni
- ubah data JSON lanjutan seperti payment methods, recent activity, fake transactions

## Alur aman edit konten

1. Login admin.
2. Edit konten di panel admin.
3. Klik `Simpan Draft`.
4. Kalau preview sudah sesuai, klik `Export JSON`.
5. File `site-content.json` akan terunduh.
6. Ganti file:

```text
frontend/public/site-content.json
```

7. Build ulang project.

## Cara ganti harga

### Opsi 1: lewat panel admin

1. Login ke `/#/login`
2. Masuk tab `Admin`
3. Di section `Produk, Harga, dan Icon Path`, ubah harga varian
4. Simpan draft
5. Export JSON

### Opsi 2: langsung lewat file

1. Buka:

```text
frontend/public/site-content.json
```

2. Cari produk dan varian yang mau diubah
3. Ubah nilai `price`

## Cara ganti icon atau gambar produk

1. Siapkan file gambar atau SVG baru
2. Simpan ke:

```text
frontend/public/images/products
```

3. Ubah path `image` di:

```text
frontend/public/site-content.json
```

Contoh:

```json
"image": "/images/products/google-play.svg"
```

## Cara preview lokal

1. Masuk ke folder frontend:

```bash
cd /Users/adith92/Documents/Codex/Topup-Game-DIgital/frontend
```

2. Jalankan:

```bash
npm start
```

3. Buka:

```text
http://localhost:3000/#/
```

## Cara build buat cPanel

1. Masuk ke folder frontend:

```bash
cd /Users/adith92/Documents/Codex/Topup-Game-DIgital/frontend
```

2. Jalankan:

```bash
npm run build
```

3. Hasil production ada di:

```text
frontend/build
```

## Cara upload ke cPanel

1. Login ke cPanel
2. Buka `File Manager`
3. Masuk ke `public_html` atau folder domain/subdomain tujuan
4. Hapus file website lama kalau memang mau replace penuh
5. Upload semua isi folder:

```text
frontend/build
```

6. Pastikan file ini ikut ada:

```text
site-content.json
```

7. Refresh website

## Cara update setelah ada perubahan

1. Edit konten via panel admin atau file JSON
2. Kalau edit via panel admin, export JSON dan replace file `frontend/public/site-content.json`
3. Jalankan `npm run build`
4. Upload ulang isi folder `frontend/build` ke cPanel

## Catatan keamanan penting

- Login admin sekarang masih **frontend-only**
- Itu artinya username/password tetap ikut terbawa ke sisi client
- Untuk keamanan lebih serius, lindungi juga akses admin lewat cPanel, htaccess, atau backend asli
- Untuk shared hosting statis biasa, ini adalah jalur paling realistis tanpa bikin server API sendiri
