/**
 * Narx va vaqt hisob-kitoblari uchun sof (pure) funksiyalar
 * Hech qanday side-effect'siz va oson testlanadigan logikalar
 */

import type { ClubSettings, TableType, SessionCalculation } from '../types';
import { formatDuration, formatMoney } from './format';

/**
 * Berilgan soniyani belgilangan qadam (5, 10, 15, 30 daqiqa) bo'yicha yuqoriga yaxlitlaydi
 * @param durationSeconds Sessiya davomiyligi (soniyalarda)
 * @param roundingStep Yaxlitlash qadami (daqiqalarda)
 * @returns Yaxlitlangan daqiqalar soni
 */
export function roundUpToMinutes(durationSeconds: number, roundingStep: number): number {
  if (durationSeconds <= 0) {
    return 0;
  }
  const totalMinutes = durationSeconds / 60;
  const step = Math.max(1, roundingStep);
  return Math.ceil(totalMinutes / step) * step;
}

/**
 * Stol turiga qarab soatlik narxni aniqlaydi
 * @param tableType 'billiard' yoki 'tennis'
 * @param settings Klub sozlamalari
 * @returns Soatlik narx (so'm)
 */
export function getHourlyRate(tableType: TableType, settings: ClubSettings): number {
  return tableType === 'tennis' 
    ? settings.tennisHourlyRate 
    : settings.billiardHourlyRate;
}

/**
 * Sessiya uchun umumiy to'lov miqdorini hisoblaydi
 * Formula: (Yaxlitlangan daqiqa * Soatlik narx) / 60
 * @param durationSeconds Sessiya davomiyligi (soniya)
 * @param hourlyRate Soatlik narx (so'm)
 * @param roundingStep Yaxlitlash qadami (daqiqa)
 * @returns { roundedMinutes, price }
 */
export function calculatePrice(
  durationSeconds: number,
  hourlyRate: number,
  roundingStep: number
): { roundedMinutes: number; price: number } {
  if (durationSeconds <= 0) {
    return { roundedMinutes: 0, price: 0 };
  }

  const roundedMinutes = roundUpToMinutes(durationSeconds, roundingStep);
  // Narx = (daqiqalar * soatlik narx) / 60
  const rawPrice = (roundedMinutes * hourlyRate) / 60;
  // 100 so'mgacha yaxlitlab toza summaga keltirish
  const price = Math.round(rawPrice);

  return {
    roundedMinutes,
    price,
  };
}

/**
 * Boshlanish va tugash vaqti bo'yicha to'liq sessiya hisob-kitobini qaytaradi
 * @param startTime Boshlangan vaqt (timestamp ms)
 * @param endTime Tugagan vaqt (timestamp ms)
 * @param hourlyRate Soatlik stavka
 * @param roundingStep Yaxlitlash qadami
 * @returns To'liq hisoblangan SessionCalculation obyekti
 */
export function calculateSessionDetails(
  startTime: number,
  endTime: number,
  hourlyRate: number,
  roundingStep: number
): SessionCalculation {
  const durationSeconds = Math.max(0, Math.floor((endTime - startTime) / 1000));
  const { roundedMinutes, price } = calculatePrice(durationSeconds, hourlyRate, roundingStep);

  return {
    durationSeconds,
    durationFormatted: formatDuration(durationSeconds),
    roundedMinutes,
    totalPrice: price,
    totalPriceFormatted: formatMoney(price),
    hourlyRate,
  };
}
