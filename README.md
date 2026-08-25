# 🎱 Master Billiard & Tennis Club Tracker

> **Bilyard va Stol Tennisi klublari uchun zamonaviy, tezkor va sodda mobil boshqaruv hamda hisob-kitob ilovasi (Mobile POS).**

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff.svg)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Tests-22%20Passed-emerald.svg)](https://vitest.dev/)

---

## 📌 Loyihaning asosiy maqsadi

Bilyardxonalarda an'anaviy ravishda daftar-ruchka, kalkulyator va kallada hisob-kitob qilinadi (*"1-stol 18:15 da kirdi, 19:42 da chiqdi, 1 soat 27 daqiqa bo'ldi, 10 daqiqagacha yaxlitlasak 90 daqiqa..."*).

**Master Billiard** ushbu barcha jarayonni telefonda 1 bosishda to'liq avtomatlashtiradi:
- ⏱ **1 bosishda start:** Nechada boshlangani saqlanadi va soniyama-soniya jonli timer yuradi;
- 💰 **Avtomatik aniq narx:** Belgilangan soatlik stavka va yaxlitlash qadami (5/10/15/30 daqiqa) bo'yicha to'lov summasi bir zumda hisoblanadi;
- 🧾 **1 bosishda kassa:** Stol bo'shatilganda summa bugungi umumiy tushumga qo'shiladi va cheklar tarixiga yoziladi;
- 🔄 **Xavfsiz doimiylik:** Telefon o'chib qolsa ham vaqt va ma'lumotlar yo'qolmaydi (`localStorage` abstraksiyasi).

---

## ✨ Imkoniyatlar

- 🎱 **4 ta Bilyard + 1 ta Stol Tennisi stollari**
- 🟢 **Jonli sinxron taymerlar** (har soniyada yangilanadi)
- 📊 **Bugungi kassa va tushum statistikasi**
- 📱 **Mobile-first Bottom Sheet** hisob-kitob oynasi
- ⚙️ **Klub narxlari va yaxlitlash qoidasini sozlash**
- 📜 **Bugungi tugagan o'yinlar cheklari daftari**
- 🎨 **Modern Dark Lounge dizayni** (Velvet Emerald & Electric Cyan aksentlari)
- 🧪 **22 ta to'liq avtomatlashtirilgan testlar**

---

## 🚀 O'rnatish va Ishga tushirish

```bash
# Repozitoriyani klonlash
git clone https://github.com/FarrukhDev-io/master_billiard.git

# Loyiha papkasiga o'tish
cd master_billiard

# Bog'liqliklarni o'rnatish
npm install

# Lokal serverni ishga tushirish
npm run dev

# Testlarni yurgizish
npm test

# Production build tayyorlash
npm run build
```

---

## 📁 Arxitektura

```
src/
├── types/
│   └── index.ts          # TypeScript modellari
├── lib/
│   ├── storage.ts        # Xavfsiz saqlash abstraksiyasi
│   ├── pricing.ts        # Sof narx va yaxlitlash funksiyalari
│   └── format.ts         # Pul, vaqt va sana formatlagichlari
├── hooks/
│   ├── useLiveTimer.ts   # Jonli vaqt yangilovchi hook
│   ├── useSettings.ts    # Narxlar va sozlamalar hooki
│   └── useTables.ts      # Stollar holati va kassa logikasi
├── components/
│   ├── Header.tsx        # Yuqori panel va jonli soat
│   ├── RevenueSummary.tsx # Bugungi tushum va faol stollar
│   ├── TableCard.tsx     # Alohida stol kartochkasi
│   ├── TableGrid.tsx     # Stollar to'plami (Grid)
│   ├── SessionModal.tsx  # Hisob-kitob va chek oynasi
│   ├── SettingsModal.tsx # Narx va qoidalar sozlamalari
│   └── SessionLog.tsx    # Bugungi cheklar ro'yxati
├── App.tsx
└── main.tsx
```

---

## 👨‍💻 Muallif

- **Farrukh** — [GitHub Profili](https://github.com/FarrukhDev-io)
