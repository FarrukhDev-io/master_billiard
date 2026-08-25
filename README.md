# 🎱 Master Billiard & Tennis Club Tracker

> **Bilyard va Stol Tennisi klublari uchun zamonaviy, tezkor va sodda mobil boshqaruv hamda hisob-kitob ilovasi (Mobile POS & PWA).**

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready%20%26%20Offline-emerald.svg)](https://vite-pwa-org.netlify.app/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff.svg)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Tests-22%20Passed-emerald.svg)](https://vitest.dev/)

---

## 📌 Loyihaning asosiy maqsadi

Bilyardxonalarda an'anaviy ravishda daftar-ruchka, kalkulyator va kallada hisob-kitob qilinadi (*"1-stol 18:15 da kirdi, 19:42 da chiqdi, 1 soat 27 daqiqa bo'ldi, 10 daqiqagacha yaxlitlasak 90 daqiqa..."*).

**Master Billiard** ushbu barcha jarayonni telefonda 1 bosishda to'liq avtomatlashtiradi:
- ⏱ **1 bosishda start:** Nechada boshlangani saqlanadi va soniyama-soniya jonli timer yuradi;
- 💰 **Avtomatik aniq narx:** Belgilangan soatlik stavka (Bilyard: 40 000 so'm, Tennis: 20 000 so'm) va yaxlitlash qadami bo'yicha to'lov summasi real vaqtda har soniya hisoblanadi;
- 🧾 **1 bosishda kassa:** Stol bo'shatilganda summa bugungi umumiy tushumga qo'shiladi va cheklar tarixiga yoziladi;
- 📲 **PWA & Offline:** Internet bo'lmaganda ham ishlaydi, telefon bosh ekraniga ilova sifatida o'rnatiladi.

---

## ✨ Imkoniyatlar

- 🎱 **1-Sahifa:** Faqat 5 ta stol (4 ta Bilyard + 1 ta Stol Tennisi)
- 🟢 **Har soniya yangilanuvchi jonli pul va taymer**
- 📊 **2-Sahifa:** Bugungi kassa va yakunlangan cheklar tarixi
- ⚙️ **3-Sahifa:** Sozlamalar (40k/20k narxlar va yaxlitlash qoidasi)
- 📲 **PWA (Progressive Web App):** Telefon brauzeridan to'g'ridan-to'g'ri *"Bosh ekranga qo'shish (Install App)"* qilib ilova sifatida o'rnatish
- 🎨 **Modern Dark Lounge dizayni** (Velvet Emerald & Electric Cyan aksentlari)
- 🧪 **22 ta to'liq avtomatlashtirilgan testlar**

---

## 📲 Telefonga o'rnatish (PWA Install)

1. Brauzerda ilovani oching (masalan, Chrome yoki Safari);
2. Brauzer menyusidan **"Bosh ekranga qo'shish" (Add to Home screen / Install App)** tugmasini bosing;
3. Ilova telefonga xuddi Play Market/App Store dasturidek alohida piktogramma bilan o'rnatiladi va to'liq ekranda (full-screen) ishlaydi.

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

# Production PWA build tayyorlash
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
│   ├── BottomNav.tsx     # Pastki 3-sahifali navigatsiya
│   ├── RevenueSummary.tsx # Bugungi tushum va faol stollar
│   ├── TableCard.tsx     # Alohida stol kartochkasi
│   ├── TableGrid.tsx     # Stollar to'plami (Grid)
│   ├── SessionModal.tsx  # Hisob-kitob va chek oynasi
│   ├── SettingsView.tsx  # Sozlamalar sahifasi
│   └── SessionLog.tsx    # Bugungi cheklar ro'yxati
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

---

## 👨‍💻 Muallif

- **Farrukh** — [GitHub Profili](https://github.com/FarrukhDev-io)
