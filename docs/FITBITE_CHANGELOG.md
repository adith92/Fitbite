# Fitbite Changelog

Semua perubahan penting project Fitbite dicatat di file ini.

## Versioning Rule

- V1.0 = versi awal
- V1.1 = update dokumentasi dan project brain
- V1.2 = interactive demo mockup and deploy preparation
- V1.3 = customer core
- V1.4 = pantry and recipe MVP
- V1.5 = catering order MVP
- V1.6 = admin dashboard MVP
- V1.7 = reports
- V2.0 = AI and automation

---

## V1.2 - Interactive Demo Mockup and Deploy Preparation

Tanggal: 2026-05-11

Added:

- Membuat demo mockup interaktif di `app/page.tsx`.
- Menambahkan hero animated mockup.
- Menambahkan program selector untuk Diet, Cutting, Bulking, Maintain.
- Menambahkan pantry ingredient input mockup.
- Menambahkan recipe cards mockup.
- Menambahkan action button Pesan Versi Catering.
- Menambahkan toast mockup untuk order masuk dashboard dan Telegram.
- Menambahkan admin dashboard preview.
- Menambahkan future plan chips.

Changed:

- Landing page dari halaman sederhana menjadi interactive demo page.

Deploy Note:

- Repo sudah dipush ke `main`.
- Vercel project `Fitbite` belum terlihat di daftar project Vercel yang tersedia.
- Tool Vercel meminta deploy via CLI `vercel deploy` atau Git Integration.
- Setelah repo di-import ke Vercel, push ke `main` bisa trigger deployment otomatis.

Pending:

- Import `adith92/Fitbite` ke Vercel.
- Pastikan build pertama berhasil.
- Bersihkan sisa file lama dari repo sebelumnya jika mengganggu build.

---

## V1.1 - Documentation and Project Brain

Tanggal: 2026-05-11

Added:

- README dirapikan sebagai ringkasan utama project.
- Menambahkan rencana architecture.
- Menambahkan aturan versioning.
- Menambahkan roadmap versi.
- Menambahkan rencana file prompt/context untuk AI dan developer.
- Menambahkan catatan bahwa perubahan berikutnya wajib dicatat di changelog.

Changed:

- Project identity diperjelas menjadi Fitbite.
- Fokus project diperjelas menjadi healthy food-tech app Indonesia.

Pending:

- Beberapa file lama dari repo sebelumnya masih perlu dibersihkan di V1.2.
- Styling system perlu dirapikan di V1.2.
- Base deploy Vercel perlu dites di V1.2.

---

## V1.0 - Initial Scaffold

Tanggal: 2026-05-11

Added:

- Setup awal repo Fitbite.
- Menambahkan package Next.js root.
- Menambahkan route awal `/`.
- Menambahkan route `/body-check`.
- Menambahkan route `/ingredients`.
- Menambahkan route `/admin`.
- Menambahkan helper kalkulator nutrisi awal.
- Menambahkan helper template pesan Telegram.
- Menambahkan docs awal: NOTES, ROADMAP, dan VERCEL_DEPLOY.

Known Issues:

- Repo masih punya sisa file lama dari project sebelumnya.
- Beberapa file styling belum masuk karena perlu dirapikan bertahap.
- Belum ada Supabase integration real.
- Belum ada order flow real.
