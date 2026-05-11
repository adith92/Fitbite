# 🍱 Fitbite

**Fitbite** adalah aplikasi **healthy food-tech** untuk Indonesia.

Aplikasi ini dirancang untuk membantu orang makan lebih sehat dengan cara yang gampang dipahami: mulai dari cek kebutuhan badan, masukkan bahan makanan yang ada di rumah, dapat rekomendasi resep sehat, sampai pesan versi catering sehat kalau tidak sempat masak. 🥗📲

---

## 🌟 Versi Saat Ini

```txt
V1.2.1 - Repository Indexing and Build Cleanup
```

Status project saat ini:

```txt
✅ Demo mockup interaktif sudah ada
✅ Struktur Next.js sudah disiapkan
✅ Repo sudah punya index/context untuk ChatGPT dan Codex
✅ Siap diarahkan ke deploy Vercel
⚠️ Fitur backend asli belum aktif
⚠️ Supabase, payment, delivery API, dan AI asli masuk tahap berikutnya
```

---

## 🧠 Penjelasan Super Sederhana

Bayangin Fitbite itu seperti gabungan dari:

```txt
+-----------------------+
|  Kalkulator Diet      |
+-----------------------+
           +
+-----------------------+
|  Buku Resep Sehat     |
+-----------------------+
           +
+-----------------------+
|  Asisten Bahan Dapur  |
+-----------------------+
           +
+-----------------------+
|  Order Catering       |
+-----------------------+
           +
+-----------------------+
|  Dashboard Owner      |
+-----------------------+
```

Jadi user tidak cuma lihat menu makanan. User dibantu dari awal:

```txt
Data badan → Target kalori → Bahan di rumah → Resep sehat → Order catering → Dashboard admin
```

---

## 🎯 Tujuan Utama Fitbite

Fitbite dibuat supaya orang Indonesia bisa:

- 🥗 Makan lebih sehat tanpa bingung mulai dari mana
- 🔥 Tahu kebutuhan kalori dan protein harian
- 🧊 Memakai bahan makanan yang sudah ada di rumah
- 🍛 Dapat ide resep sehat rasa lokal/Nusantara
- 🕌 Mendukung pendekatan halal-first
- 🛒 Bisa order bahan tambahan atau catering sehat
- 📲 Owner catering bisa pantau order dari dashboard
- 📊 Bisnis catering punya laporan yang rapi

---

## 🧭 Alur Utama Aplikasi

```txt
┌────────────────────────────┐
│  1. User buka Fitbite       │
└──────────────┬─────────────┘
               ↓
┌────────────────────────────┐
│  2. Isi data tubuh          │
│  berat, tinggi, umur, dll   │
└──────────────┬─────────────┘
               ↓
┌────────────────────────────┐
│  3. App hitung kebutuhan    │
│  kalori dan macro           │
└──────────────┬─────────────┘
               ↓
┌────────────────────────────┐
│  4. User input bahan rumah  │
│  pantry / kulkas / freezer  │
└──────────────┬─────────────┘
               ↓
┌────────────────────────────┐
│  5. AI rekomendasi resep    │
│  sehat dan minim waste      │
└──────────────┬─────────────┘
               ↓
┌────────────────────────────┐
│  6. User pilih aksi         │
│  masak / order / catering   │
└──────────────┬─────────────┘
               ↓
┌────────────────────────────┐
│  7. Order masuk dashboard   │
│  admin + notifikasi owner   │
└────────────────────────────┘
```

---

## ✨ Fitur yang Direncanakan

### 👤 Untuk Customer

| Fitur | Penjelasan Awam |
|---|---|
| 🔐 Login/Register | User punya akun sendiri |
| ⚖️ Body Check | User isi berat, tinggi, umur, gender, aktivitas |
| 🔥 Kalori Harian | App hitung kebutuhan energi user |
| 🥩 Macro Target | App hitung protein, karbo, dan lemak |
| 🎯 Pilih Program | Diet, Cutting, Bulking, Maintain, Healthy Daily |
| 🧊 Input Bahan Rumah | User masukkan bahan yang ada di rumah |
| 🤖 Rekomendasi Resep | AI memberi ide resep sehat |
| 🍛 Resep Nusantara | Fokus rasa lokal Indonesia |
| 📊 Nutrition Facts | Kalori, protein, karbo, lemak per resep |
| 🍳 Masak Sekarang | User ikuti instruksi masak |
| 🛒 Order Bahan | User bisa beli bahan tambahan |
| 🍱 Pesan Catering | User pesan versi catering sehat |
| 🧾 Checkout | User isi alamat dan pesanan |
| 💳 Upload Bukti Bayar | Payment manual dulu |
| 🚚 Status Order | User lihat proses pesanannya |

### 🧑‍🍳 Untuk Admin / Owner Catering

| Fitur | Fungsi |
|---|---|
| 📊 Dashboard Owner | Lihat ringkasan bisnis |
| 🧾 Order Management | Pantau order masuk |
| 💳 Konfirmasi Pembayaran | Cek bukti transfer |
| 👥 Member Management | Lihat data pelanggan |
| 🍱 Menu Management | Tambah/edit menu catering |
| 🎯 Program Management | Mapping menu ke Diet/Cutting/Bulking |
| 🧑‍🍳 Kitchen Queue | Dapur tahu harus masak apa |
| 🚚 Delivery Queue | Pengiriman manual via ojol/logistik |
| 📲 Telegram Notification | Order baru masuk ke owner |
| 💬 WhatsApp Notification | Future plan |
| 📈 Report Dashboard | Laporan omzet, menu, member, delivery |

---

## 🧩 Program Makanan

Fitbite punya beberapa tipe program:

```txt
┌───────────────┬──────────────────────────────────┐
│ Program       │ Cocok Untuk                      │
├───────────────┼──────────────────────────────────┤
│ Diet          │ Turun berat badan santai         │
│ Cutting       │ Turun lemak, jaga otot           │
│ Bulking       │ Naik massa otot / berat badan    │
│ Maintain      │ Menjaga berat badan              │
│ Healthy Daily │ Makan sehat harian tanpa ribet   │
└───────────────┴──────────────────────────────────┘
```

Contoh logika menu:

```txt
User pilih Cutting
↓
App tampilkan menu tinggi protein dan kalori terkontrol

User pilih Bulking
↓
App tampilkan menu kalori lebih tinggi dan protein cukup

User pilih Diet
↓
App tampilkan menu defisit kalori yang tetap mengenyangkan
```

---

## 🏗️ Arsitektur Project

### Stack Utama

```txt
Frontend      : Next.js
Language      : TypeScript
Deploy        : Vercel
Backend Plan  : Supabase
Database Plan : PostgreSQL
Auth Plan     : Supabase Auth
Storage Plan  : Supabase Storage
Notif MVP     : Telegram Bot
Notif Future  : WhatsApp Cloud API
Payment MVP   : Manual transfer
Delivery MVP  : Manual ojol/logistik
```

### Diagram Arsitektur

```txt
                    ┌─────────────────────┐
                    │       User App       │
                    │  Next.js / Vercel    │
                    └──────────┬──────────┘
                               │
                               ↓
                    ┌─────────────────────┐
                    │    Fitbite Logic     │
                    │ body check / recipe  │
                    └──────────┬──────────┘
                               │
       ┌───────────────────────┼───────────────────────┐
       ↓                       ↓                       ↓
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│  Supabase    │       │  AI Recipe   │       │  Telegram    │
│  Database    │       │  Generator   │       │  Notification│
└──────────────┘       └──────────────┘       └──────────────┘
       ↓
┌─────────────────────┐
│   Admin Dashboard    │
│ order / member/report│
└─────────────────────┘
```

---

## 📁 Struktur File Penting

```txt
Fitbite/
├── README.md                       # Penjelasan utama project
├── PROJECT_INDEX.md                # Index utama untuk ChatGPT/Codex
├── AI_README.md                    # Instruksi khusus AI/dev
├── package.json                    # Config dependency Next.js
├── next.config.ts                  # Config Next.js
├── tsconfig.json                   # Config TypeScript
├── app/
│   ├── page.tsx                    # Demo mockup interaktif
│   ├── layout.tsx                  # Layout utama Next.js
│   ├── body-check/page.tsx         # Halaman body check
│   ├── ingredients/page.tsx        # Halaman input bahan
│   └── admin/page.tsx              # Halaman admin preview
├── lib/
│   ├── nutrition.ts                # Helper hitung nutrisi
│   └── telegram.ts                 # Helper pesan Telegram
└── docs/
    ├── PROJECT_CONTEXT_PROMPT.md   # Prompt/context AI
    ├── PROJECT_PLAN.md             # Rencana fitur dan MVP
    ├── FITBITE_CHANGELOG.md        # Changelog resmi Fitbite
    ├── ROADMAP.md                  # Roadmap pengembangan
    └── VERCEL_DEPLOY.md            # Panduan deploy Vercel
```

---

## 🛣️ Roadmap Versi

```txt
V1.0   Initial Scaffold
V1.1   Documentation and Project Brain
V1.2   Interactive Demo Mockup
V1.2.1 Repository Indexing and Build Cleanup
V1.3   Customer Core
V1.4   Pantry and Recipe MVP
V1.5   Catering Order MVP
V1.6   Admin Dashboard MVP
V1.7   Reports
V2.0   AI and Automation
```

---

## 🚀 Cara Menjalankan Lokal

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Start production:

```bash
npm run start
```

Buka di browser:

```txt
http://localhost:3000
```

---

## 🌐 Deploy ke Vercel

Target project:

```txt
fitbitedemo
```

Target domain:

```txt
fitbitedemo.vercel.app
```

Setting Vercel:

```txt
Framework     : Next.js
Build Command : npm run build
Output        : default
Root          : repository root
```

Langkah manual:

```txt
1. Buka Vercel
2. Add New Project
3. Import repo adith92/Fitbite
4. Project name: fitbitedemo
5. Deploy
```

---

## 🔐 Environment Variables

Untuk demo awal, app tidak wajib butuh env.

Nanti saat backend aktif:

```txt
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_ADMIN_CHAT_ID=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
```

---

## 📲 Notifikasi Order

MVP awal:

```txt
Order baru → Telegram owner
```

Future plan:

```txt
Order baru → WhatsApp owner
Pembayaran masuk → WhatsApp/Telegram
Order siap kirim → WhatsApp customer
```

---

## 📊 Dashboard Report Plan

Laporan yang direncanakan:

- 💰 Sales report
- 🍱 Menu terlaris
- 🎯 Program terlaris
- 👥 Member aktif
- 🧑‍🍳 Kitchen queue report
- 🚚 Delivery report
- 📤 Export CSV

---

## 🤖 Untuk ChatGPT / Codex

Kalau project ini dibuka oleh AI assistant, baca file berikut secara berurutan:

```txt
1. PROJECT_INDEX.md
2. AI_README.md
3. docs/PROJECT_CONTEXT_PROMPT.md
4. docs/PROJECT_PLAN.md
5. docs/FITBITE_CHANGELOG.md
6. README.md
```

Instruksi utama:

```txt
Jangan langsung bikin fitur besar.
Bangun bertahap.
Pastikan build jalan.
Update changelog setiap perubahan penting.
Ikuti versioning V1.0, V1.1, V1.2, dst.
```

---

## 📝 Versioning Rule

Setiap perubahan besar wajib dicatat di:

```txt
docs/FITBITE_CHANGELOG.md
```

Contoh:

```txt
V1.2.1 → repo cleanup dan indexing
V1.3   → customer core
V1.4   → pantry recipe MVP
```

---

## ⚠️ Catatan Penting

Fitbite bukan aplikasi medis.

Semua hitungan kalori, BMI, protein, dan nutrisi adalah estimasi untuk membantu user memahami pola makan. Untuk kondisi kesehatan khusus, user tetap perlu konsultasi dengan tenaga medis atau ahli gizi. 🩺

---

## ❤️ Kesimpulan

Fitbite bukan cuma app resep.

Fitbite adalah pondasi untuk:

```txt
Healthy lifestyle app
+ AI recipe assistant
+ Catering order system
+ Admin dashboard
+ Business report
```

Tujuan akhirnya: bikin makan sehat jadi lebih gampang, lebih lokal, lebih hemat, dan lebih rapi untuk customer maupun owner catering. 🚀
