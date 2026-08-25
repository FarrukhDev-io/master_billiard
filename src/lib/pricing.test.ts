import { describe, it, expect } from 'vitest';
import { roundUpToMinutes, getHourlyRate, calculatePrice, calculateLivePrice, calculateSessionDetails } from './pricing';
import type { ClubSettings } from '../types';

describe('Pricing calculations', () => {
  const mockSettings: ClubSettings = {
    billiardHourlyRate: 40000,
    tennisHourlyRate: 20000,
    roundingMinutes: 1,
    currency: "so'm",
  };

  describe('calculateLivePrice', () => {
    it('calculates live price second by second', () => {
      // 40 000 so'm / soat = ~11.11 so'm / sek
      // 3600 sek (1 soat) -> 40 000 so'm
      expect(calculateLivePrice(3600, 40000)).toBe(40000);
      // 1800 sek (30 daq) -> 20 000 so'm
      expect(calculateLivePrice(1800, 40000)).toBe(20000);
      // 90 sek (1.5 daq) -> 1000 so'm
      expect(calculateLivePrice(90, 40000)).toBe(1000);
      expect(calculateLivePrice(0, 40000)).toBe(0);
    });
  });

  describe('roundUpToMinutes', () => {
    it('returns 0 for 0 or negative seconds', () => {
      expect(roundUpToMinutes(0, 10)).toBe(0);
      expect(roundUpToMinutes(-10, 10)).toBe(0);
    });

    it('rounds up 1 second to the rounding step', () => {
      expect(roundUpToMinutes(1, 10)).toBe(10);
      expect(roundUpToMinutes(1, 5)).toBe(5);
      expect(roundUpToMinutes(1, 15)).toBe(15);
    });

    it('rounds exact boundary correctly', () => {
      // 10 minutes = 600 seconds
      expect(roundUpToMinutes(600, 10)).toBe(10);
      // 10 minutes 1 second = 601 seconds -> 20 minutes
      expect(roundUpToMinutes(601, 10)).toBe(20);
      // 25 minutes = 1500 seconds with 15 min step -> 30 minutes
      expect(roundUpToMinutes(1500, 15)).toBe(30);
    });
  });

  describe('getHourlyRate', () => {
    it('returns correct rate for table types', () => {
      expect(getHourlyRate('billiard', mockSettings)).toBe(40000);
      expect(getHourlyRate('tennis', mockSettings)).toBe(20000);
    });
  });

  describe('calculatePrice', () => {
    it('returns 0 price for 0 duration', () => {
      const res = calculatePrice(0, 40000, 10);
      expect(res.roundedMinutes).toBe(0);
      expect(res.price).toBe(0);
    });

    it('calculates price correctly with 10 min rounding (12 minutes played at 40k/h)', () => {
      // 12 min = 720 seconds -> rounds up to 20 min -> (20 * 40,000) / 60 = 13,333 so'm
      const res = calculatePrice(720, 40000, 10);
      expect(res.roundedMinutes).toBe(20);
      expect(res.price).toBe(13333);
    });

    it('calculates price correctly with 1 min exact setting (12 minutes played at 40k/h)', () => {
      const res = calculatePrice(720, 40000, 1);
      expect(res.roundedMinutes).toBe(12);
      expect(res.price).toBe(8000);
    });
  });

  describe('calculateSessionDetails', () => {
    it('computes full details accurately', () => {
      const start = 1000000;
      const end = start + 3600 * 1000; // 1 hour
      const details = calculateSessionDetails(start, end, 40000, 10);

      expect(details.durationSeconds).toBe(3600);
      expect(details.durationFormatted).toBe('01:00:00');
      expect(details.roundedMinutes).toBe(60);
      expect(details.totalPrice).toBe(40000);
      expect(details.totalPriceFormatted).toBe("40 000 so'm");
      expect(details.livePrice).toBe(40000);
    });
  });
});
