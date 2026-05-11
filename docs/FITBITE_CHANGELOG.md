# Fitbite Changelog

Semua perubahan penting project Fitbite dicatat di file ini.

## Versioning Rule

- V1.0 = versi awal
- V1.1 = update dokumentasi dan project brain
- V1.2 = interactive demo mockup and deploy preparation
- V1.2.1 = repository indexing and build cleanup
- V1.3 = customer core
- V1.4 = pantry and recipe MVP
- V1.5 = catering order MVP
- V1.6 = admin dashboard MVP
- V1.7 = reports
- V2.0 = AI and automation

---

## V1.3.3 - Fix OpenRouter Production AI Fallback

Tanggal: 2026-05-11

Added:

- Menambahkan endpoint `GET /api/ai/health`.
- Menampilkan badge status AI di halaman `/wizard`.

Changed:

- Wizard sekarang bisa membedakan status: AI aktif, missing env, provider error, fallback local.
- Update release docs ke milestone QUEUE-FB-1.

Fixed:

- Fallback local tetap aman saat OpenRouter gagal atau env belum lengkap.

Pending:

- Lanjut ke QUEUE-FB-2: Ingredient Box Wizard refinement.

---

## V1.3.2 - Ingredient Box Wizard and AI Menu Check

Tanggal: 2026-05-11

Added:

- Structured ingredient input cards dengan nama, quantity, dan unit.
- Local autocomplete dan typo correction untuk bahan Indonesia.
- Auto-add ingredient box baru saat baris terakhir sudah terisi.
- Route `/wizard` terhubung ke `/api/ai/pantry-wizard`.
- Tombol singkat `Cek Menu`.

Changed:

- Payload pantry wizard sekarang mendukung structured ingredients.
- Landing page menambahkan CTA `Buka AI Wizard`.

Fixed:

- Fallback recipe tetap berjalan saat OpenRouter env kosong atau provider gagal.

Pending:

- Tingkatkan akurasi nutrisi dengan database nutrisi terverifikasi.
- Tambah photo scan dan voice input di fase berikutnya.

---

## V1.3 - AI Pantry Wizard and OpenRouter Integration Base

Tanggal: 2026-05-11

Added:

- Menambahkan API route `POST /api/ai/pantry-wizard` di `app/api/ai/pantry-wizard/route.ts`.
- Menambahkan halaman multi-step wizard di `app/wizard/page.tsx`.
- Menambahkan `docs/AI_WIZARD_PLAN.md` dan `docs/RELEASE_LOG.md`.
- Menambahkan shortcut route `/wizard` pada landing page demo.

Changed:

- Memperbarui `README.md`, `PROJECT_INDEX.md`, dan `AI_README.md` ke konteks V1.3.
- Menyelaraskan alur dokumen agar fokus ke AI wizard readiness dan deployment.

Fixed:

- Menyediakan fallback lokal ketika env AI belum tersedia atau request OpenRouter gagal.
- Integrasi API key dipastikan server-side only (tanpa expose ke frontend).
- Build tetap kompatibel dan siap deploy Vercel.

Pending:

- Validasi hasil AI dengan dataset resep yang lebih kaya.
- Tambahkan persistensi histori wizard per user.

---

## V1.2.1 - Repository Indexing and Build Cleanup

Tanggal: 2026-05-11

Added:

- Menambahkan section `Indexing Note` di `PROJECT_INDEX.md` untuk panduan ChatGPT GitHub connector saat status `Not indexed`.
- Menambahkan penjelasan build/deploy yang lebih eksplisit untuk indexing context AI.

Changed:

- Menyelaraskan dokumen inti ke status V1.2.1: `PROJECT_INDEX.md`, `AI_README.md`, `README.md`, dan `docs/VERCEL_DEPLOY.md`.
- Menegaskan root structure sebagai Next.js App Router yang fokus ke Fitbite.

Fixed:

- Validasi install dependency (`npm install`) berhasil.
- Validasi production build (`npm run build`) berhasil untuk route `/`, `/body-check`, `/ingredients`, dan `/admin`.
- Repo context menjadi lebih ringkas dan mudah dipindai untuk proses indexing ChatGPT/Codex.

Pending:

- Tunggu proses indexing selesai di ChatGPT connector setelah repo dipilih melalui Configure Repositories.
- Import/deploy ke Vercel project `fitbitedemo` dan verifikasi domain `fitbitedemo.vercel.app`.

---

## V1.3 - Deployable Demo Cleanup and Vercel Ready

Tanggal: 2026-05-11

Added:

- Menambahkan `app/globals.css` dan import ke `app/layout.tsx`.
- Menambahkan `docs/LEGACY_NOTES.md` untuk catatan cleanup file legacy.
- Menambahkan `vercel.json` minimal dengan framework `nextjs`.
- Menambahkan quick links route demo (`/body-check`, `/ingredients`, `/admin`) di landing page.

Changed:

- Menyederhanakan `app/layout.tsx` agar mengikuti pola App Router standar Next.js.
- Merapikan dokumentasi utama: `PROJECT_INDEX.md`, `AI_README.md`, dan `README.md` ke status V1.3.
- Menyesuaikan CSS responsif landing demo agar lebih aman di layar mobile.

Fixed:

- Build root Next.js sudah clean dan sukses dengan `npm run build`.
- Route `/`, `/body-check`, `/ingredients`, dan `/admin` berhasil diprerender static.
- Membersihkan root dari file/folder project lama yang mengganggu fokus Fitbite.

Pending:

- Import repo ke Vercel dengan nama project `fitbitedemo`.
- Lanjut fase V1.4: pantry dan recipe MVP dengan data yang lebih realistis.

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
