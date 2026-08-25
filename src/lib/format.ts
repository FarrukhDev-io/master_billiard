/**
 * Vaqt, sana va pul birliklarini o'zbek tilida chiroyli formatlash funksiyalari
 */

/**
 * Pul miqdorini probelli ko'rinishda formatlaydi (masalan: 50 000 so'm)
 * @param amount Pul miqdori
 * @param currency Valyuta belgisi
 * @returns Formatlangan pul satri
 */
export function formatMoney(amount: number, currency: string = "so'm"): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return `0 ${currency}`;
  }
  const formattedNumber = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${formattedNumber} ${currency}`;
}

/**
 * Soniyalarni HH:MM:SS formatiga o'tkazadi (masalan: 01:24:05 yoki 00:08:32)
 * Timer uchun qulay va aniq
 * @param totalSeconds Umumiy soniyalar soni
 * @returns "00:00:00" ko'rinishidagi satr
 */
export function formatDuration(totalSeconds: number): string {
  if (!totalSeconds || totalSeconds < 0) {
    return '00:00:00';
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Soniyalarni inson uchun tushunarli o'zbekcha formatga o'tkazadi
 * Masalan: "1 soat 15 daq" yoki "25 daqiqa"
 * @param totalSeconds Umumiy soniyalar soni
 * @returns O'zbekcha formatdagi matn
 */
export function formatDurationHuman(totalSeconds: number): string {
  if (!totalSeconds || totalSeconds < 0) {
    return '0 daqiqa';
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const parts: string[] = [];
  if (hours > 0) {
    parts.push(`${hours} soat`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} daq`);
  }
  if (hours === 0 && minutes === 0) {
    parts.push(`${seconds} soniya`);
  }

  return parts.join(' ');
}

/**
 * Timestamp (ms) ni "HH:mm" formatiga o'tkazadi (masalan: 14:30)
 * @param timestamp Millisekundlardagi vaqt
 * @returns "14:30"
 */
export function formatTime(timestamp: number): string {
  if (!timestamp) return '--:--';
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Timestamp (ms) ni to'liq sana va vaqt formatiga o'tkazadi
 * Masalan: "25-avgust, 14:30"
 */
export function formatDateTime(timestamp: number): string {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const day = date.getDate();
  const months = [
    'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
    'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'
  ];
  const monthName = months[date.getMonth()];
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}-${monthName}, ${hours}:${minutes}`;
}

/**
 * Bugungi kunning YYYY-MM-DD kalitini qaytaradi
 * @param date Ixtiyoriy sana obyekti
 * @returns "2026-08-25"
 */
export function getTodayDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
