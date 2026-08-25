/**
 * Narx va vaqt hisob-kitoblari uchun sof (pure) funksiyalar
 */

import type { ClubSettings, TableType, SessionCalculation } from '../types';
import { formatDuration, formatMoney } from './format';

/**
 * Berilgan soniyani belgilangan qadam (1, 5, 10, 15, 30 daqiqa) bo'yicha yuqoriga yaxlitlaydi
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
 * Soniyama-soniya real vaqtda yig'ilayotgan aniq pulni hisoblaydi
 * @param durationSeconds O'tgan soniyalar
 * @param hourlyRate Soatlik narx (so'm)
 * @returns Aniq hisoblangan pul summasi
 */
export function calculateLivePrice(durationSeconds: number, hourlyRate: number): number {
  if (durationSeconds <= 0) return 0;
  return Math.round((durationSeconds * hourlyRate) / 3600);
}

/**
 * Sessiya uchun umumiy to'lov miqdorini hisoblaydi
 * @param durationSeconds Sessiya davomiyligi (soniya)
 * @param hourlyRate Soatlik narx (so'm)
 * @param roundingStep Yaxlitlash qadami (daqiqa)
 * @returns { roundedMinutes, price, livePrice }
 */
export function calculatePrice(
  durationSeconds: number,
  hourlyRate: number,
  roundingStep: number
): { roundedMinutes: number; price: number; livePrice: number } {
  if (durationSeconds <= 0) {
    return { roundedMinutes: 0, price: 0, livePrice: 0 };
  }

  const livePrice = calculateLivePrice(durationSeconds, hourlyRate);

  if (roundingStep <= 1) {
    // 1 daqiqa yoki sekundma-sekund hisob
    const roundedMinutes = Math.max(1, Math.ceil(durationSeconds / 60));
    return {
      roundedMinutes,
      price: livePrice,
      livePrice,
    };
  }

  const roundedMinutes = roundUpToMinutes(durationSeconds, roundingStep);
  const rawPrice = (roundedMinutes * hourlyRate) / 60;
  const price = Math.round(rawPrice);

  return {
    roundedMinutes,
    price,
    livePrice,
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
  const { roundedMinutes, price, livePrice } = calculatePrice(durationSeconds, hourlyRate, roundingStep);

  return {
    durationSeconds,
    durationFormatted: formatDuration(durationSeconds),
    roundedMinutes,
    livePrice,
    totalPrice: price,
    totalPriceFormatted: formatMoney(price),
    hourlyRate,
  };
}
