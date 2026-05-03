# 🚀 Digital Hypebeast

Website top up game + jasa digital yang sekarang sudah dirombak jadi lebih modern, lebih gampang diedit, dan lebih enak dilanjutkan develop bareng AI 🤖✨

Project ini:

- awalnya pernah dibuat dengan **Emergent.sh** ⚡
- lalu dirapihin, dikembangin, dan diterusin dengan **OpenAI Codex** 💻🤝
- sekarang sudah punya **landing page animatif**, **login terpadu**, **panel admin edit konten**, dan **workflow shared hosting/cPanel** 🌐

---

## 🌟 Highlight Utama

- 🎮 Landing page top up game yang tampil lebih premium
- ✨ Animasi hero dan scroll yang lebih hidup tapi tetap ringan
- 🔐 Login satu pintu untuk admin dan user
- 🛠️ Panel admin untuk edit banyak bagian website
- 💸 Bisa ubah harga topup langsung
- 🖼️ Bisa ganti logo brand, gambar produk, dan avatar testimoni
- ➕ Bisa tambah dan hapus produk
- ➕ Bisa tambah dan hapus varian topup
- 📝 Bisa export dan import `site-content.json`
- 🌍 Siap build ke shared hosting / cPanel

---

## 🤖 Kenapa Enak Buat Developer Lain?

Project ini sengaja dibikin supaya gampang diterusin, terutama kalau kamu suka workflow dengan AI.

- 🧠 Konten utama dipusatkan, jadi nggak perlu bongkar banyak file
- 🤖 Cocok banget buat di-maintain pakai **Codex**
- 🪄 Ubah konten bisa lewat panel admin atau file JSON
- 📚 Changelog dan guide hosting sudah disiapkan
- 🔁 Developer lain bisa langsung lanjut dari repo ini tanpa mulai ulang dari nol

Kalau tim kamu suka kerja cepat dengan AI, ini termasuk project yang enak banget buat diiterasi 🔥

---

## 🧩 Stack yang Dipakai

- ⚛️ React
- 🎨 Tailwind CSS
- 🧱 CRACO
- 🧭 React Router
- 🖼️ Asset lokal SVG dan JSON content

Catatan:

- Backend Python masih ada di repo, tapi untuk flow website saat ini fokus utamanya adalah **frontend statis** 🧊
- Shared hosting biasa tetap aman dipakai karena hasil akhirnya cuma file build frontend 📦

---

## 📁 Struktur Penting

```text
Topup-Game-DIgital/
├── CHANGELOG.md
├── docs/
│   └── SHARED_HOSTING_GUIDE.md
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   └── site-content.json
│   ├── src/
│   │   ├── content/
│   │   │   └── siteContent.js
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
└── backend/
```

---

## 🛠️ Fitur Admin

Panel admin sekarang bisa dipakai untuk:

- 🏷️ ganti nama brand
- 🖼️ upload logo brand
- ✍️ edit hero text
- 📞 edit kontak
- 🔐 ganti username dan password admin frontend
- 🎮 tambah / hapus produk
- 💰 tambah / hapus varian harga
- 🖼️ upload gambar produk
- 💬 tambah / hapus testimoni
- 🙋 upload avatar testimoni
- 📤 export file JSON
- 📥 import file JSON

Route penting:

- `/#/` → landing page
- `/#/login` → halaman login
- `/#/admin` → panel admin
- `/#/user` → portal user

---

## 🔑 Login Admin

Saat ini login admin masih frontend-only, jadi cocok buat kebutuhan statis/demo/operasional ringan 👇

- Username: `adith92`
- Password: `210192`

Catatan penting:

- 🔒 Ini belum setara auth backend sungguhan
- 🛡️ Untuk keamanan yang lebih serius, sebaiknya akses folder admin juga dibatasi dari sisi hosting / cPanel / `.htaccess`

---

## 🚀 Cara Menjalankan Lokal

Masuk ke folder frontend:

```bash
cd /Users/adith92/Documents/Codex/Topup-Game-DIgital/frontend
```

Install dependency:

```bash
npm install --legacy-peer-deps
```

Jalankan local dev server:

```bash
npm start
```

Buka:

```text
http://localhost:3000/#/
```

---

## 🏗️ Build Production

Jalankan:

```bash
cd /Users/adith92/Documents/Codex/Topup-Game-DIgital/frontend
npm run build
```

Hasil build ada di:

```text
frontend/build
```

Ukuran build sekarang kecil dan aman buat shared hosting kecil juga 🚀

---

## 🌐 Deploy ke Shared Hosting / cPanel

Flow singkatnya:

1. ✍️ Edit konten via panel admin atau file JSON
2. 💾 Export `site-content.json` kalau perlu
3. 🧱 Jalankan `npm run build`
4. 📤 Upload isi folder `frontend/build` ke `public_html`
5. 🔄 Refresh website

Panduan lengkapnya ada di:

- [SHARED_HOSTING_GUIDE.md](/Users/adith92/Documents/Codex/Topup-Game-DIgital/docs/SHARED_HOSTING_GUIDE.md)

---

## 📜 Changelog

Riwayat perubahan project ada di:

- [CHANGELOG.md](/Users/adith92/Documents/Codex/Topup-Game-DIgital/CHANGELOG.md)

---

## ❤️ Catatan Akhir

Kalau dilihat dari workflow-nya sekarang, project ini sudah jauh lebih gampang buat:

- dipoles tampilannya 🎨
- diubah kontennya 📝
- diterusin sama developer lain 👨‍💻👩‍💻
- dan dibantu AI kayak **Codex** buat iterasi cepat 🤖⚡

Jadi ya, ini bukan cuma “website topup biasa”, tapi sudah jadi base project yang cukup enak buat dikembangin lanjut 😎
