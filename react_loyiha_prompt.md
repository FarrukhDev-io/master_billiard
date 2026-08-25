# 🎱 PROMPT — Master Billiard Tracker (React + TypeScript + Tailwind)

## 📌 MAQSAD VA G'OYA
Bilyardxonalarda har kuni yuz beradigan odatiy jarayon: mijoz qachon kelgani (`18:15`), qachon ketgani (`19:42`), qancha vaqt o'ynagani va qancha to'lashi kerakligi — barchasi daftar-ruchkada, kalkulyatorda va kallada hisoblanadi. 
Bizning maqsadimiz — ushbu daftar-ruchka ishini to'liq avtomatlashtirish, xodim ishini osonlashtirish va butun jarayonni telefonda 1-2 bosishda hal bo'ladigan sodda, chiroyli va qulay (mobile-first) ilovaga aylantirish.

⚠️ **DIQQAT:** Ilovani ortiqcha murakkablashtirma (no overengineering). Keraksiz kassa turlari yoki murakkab backend shart emas. Asosiy vazifalarni xatosiz, tezkor va ko'zni quvontiradigan darajada chiroyli UI/UX bilan bajarishi kerak.

---

## 🛠 TEXNOLOGIYALAR
- **React 18+ / React 19**, **TypeScript** (JS emas, qat'iy TS)
- **Vite**
- **Tailwind CSS** (barcha stillar toza utilitlar bilan, ortiqcha CSS fayllarsiz)
- **Lucide React** (ixcham va chiroyli ikonalar uchun)
- **LocalStorage Abstraksiyasi** (`src/lib/storage.ts` orqali xavfsiz saqlash, to'g'ridan-to'g'ri komponentlarda `localStorage` chaqirilmasin)
- **Til:** Butun interfeys **sodda o'zbek tilida**

---

## 📋 FUNKSIONAL TALABLAR

### 1. Stollar (Asosiy Ekran)
- **4 ta bilyard stoli** + **1 ta stol tennisi stoli** (grid kartochkalar ko'rinishida).
- Har bir stol holati:
  - **Bo'sh holatda:** Stol nomi, soatlik narxi va katta **"Boshlash"** tugmasi.
  - **Band holatda:** Boshlangan vaqti (`18:15 dan`), jonli soniyama-soniya yuruvchi katta taymer (`00:46:12`), joriy hisoblangan narx va **"Hisoblash"** tugmasi.
- Bo'sh stolga bosilsa → darhol sessiya boshlanadi va timer sanashga o'tadi.

### 2. Hisob-kitob Modali (Mijoz ketganda)
- Band stol ustidagi **"Hisoblash"** bosilganda pastdan qulay oyna (Bottom Sheet) ochiladi:
  - ⏱ Boshlangan vaqt (`18:15`)
  - ⏱ Hozirgi vaqt (`19:42`)
  - ⏳ Haqiqiy o'ynalgan vaqt (`1 soat 27 daqiqa`)
  - 🔢 Yaxlitlangan vaqt (`90 daqiqa` — Sozlamadagi qadam bo'yicha)
  - 💰 **Jami to'lov summasi** (katta va yorqin yozuvda)
- Tugmalar:
  - **"Hisoblash va Bo'shatish"** → Stol bo'shaydi, summa bugungi tushumga qo'shiladi va tarixga chek yoziladi.
  - **"Davom etmoqda"** → Oynani yopish, o'yin davom etaveradi.
  - **"To'lovsiz bekor qilish"** → Adashib bosilganda to'lovsiz to'xtatish.

### 3. Narx hisoblash qoidasi (Pure Functions)
- `Narx = (Yaxlitlangan daqiqalar * Soatlik stavka) / 60`
- Bilyard va Tennis uchun alohida soatlik narx.
- Yaxlitlash qadami (5, 10, 15, 30 daqiqa) sozlamalarda tanlanadi. Masalan, 12 daqiqa o'ynalsa va 10 daqiqalik qadam bo'lsa → 20 daqiqa uchun hisoblanadi.

### 4. Kunlik Tushum va Tarix
- Ekranning yuqorisida ixcham blok: **Bugungi tushum (so'm)**, **Band stollar soni** va **Tugagan o'yinlar soni**.
- Ekranning pastida: Bugun yakunlangan o'yinlar ro'yxati (Stol nomi, vaqt oralig'i, o'ynalgan daqiqasi va olingan summa).

### 5. Sozlamalar
- Bilyard soatlik narxi (masalan: 50 000 so'm).
- Stol tennisi soatlik narxi (masalan: 35 000 so'm).
- Yaxlitlash qadami (5 / 10 / 15 / 30 daqiqa).

### 6. Xavfsizlik va Doimiylik
- Telefon o'chib yonsa yoki sahifa yangilansa (refresh), ishlayotgan stollar vaqt hisobi va bugungi tushum yo'qolmaydi (`startTime` timestamp asosida saqlanadi).

---

## 🎨 UI/UX TALABLARI
- **Mobile-First:** Telefon ekraniga 100% moslangan, bir qo'lda bosh barmoq bilan bosish qulay bo'lgan yirik tugmalar (balandligi 44-48px).
- **Zal muhitiga mos dizayn:** Ko'zni charchatmaydigan qora/slate fon, bilyard uchun yashil movut (felt emerald) tuslari, tennis uchun ko'k aksent.
- **Yorqin va o'qilishi oson:** Xira yoritilgan xonada ham qaysi stol bandligi va taymer uzoqdan yaqqol ko'rinib tursin.

---

## 📁 FAYL TUZILISHI (Tavsiya)
```
src/
  types/
    index.ts          // Table, Session, Settings tiplari
  lib/
    storage.ts        // localStorage abstraksiyasi
    pricing.ts        // Narx va yaxlitlash sof funksiyalari
    format.ts         // Pul va vaqt formatlash (so'm, HH:MM:SS)
  hooks/
    useLiveTimer.ts   // Har soniyada yangilanuvchi sinxron timer
    useSettings.ts    // Sozlamalar boshqaruvi
    useTables.ts      // Stollar, sessiyalar va kassa logikasi
  components/
    Header.tsx        // Jonli soat va sozlamalar tugmasi
    RevenueSummary.tsx // Bugungi kassa va band stollar soni
    TableCard.tsx     // Alohida stol kartochkasi
    TableGrid.tsx     // Stollar joylashuvi
    SessionModal.tsx  // Hisob-kitob oynasi (Bottom sheet)
    SettingsModal.tsx // Narx va yaxlitlash sozlamalari
    SessionLog.tsx    // Bugungi cheklar tarixi
  App.tsx
  main.tsx
```

---

## ✅ QABUL QILISH MEZONLARI
- [x] 4 ta bilyard + 1 ta tennis stoli chiqadi.
- [x] Bo'sh stol ustiga bosilganda o'yin boshlanadi, timer real vaqtda sanaydi.
- [x] Band stol ustiga bosilganda hisob-kitob oynasi ochiladi va to'g'ri narx ko'rsatiladi.
- [x] "Hisoblash va Bo'shatish" bosilganda stol bo'shaydi, tushumga qo'shiladi va chek tarixda chiqadi.
- [x] Sahifa yangilanganda ham ma'lumotlar saqlanib qoladi.
- [x] Dizayn sodda, mobilga mos, zamonaviy va to'liq o'zbek tilida.
