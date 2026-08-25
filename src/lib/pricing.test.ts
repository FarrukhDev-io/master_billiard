import { describe, it, expect } from 'vitest';
import { roundUpToMinutes, getHourlyRate, calculatePrice, calculateSessionDetails } from './pricing';
import type { ClubSettings } from '../types';

describe('Pricing calculations', () => {
  const mockSettings: ClubSettings = {
    billiardHourlyRate: 60000,
    tennisHourlyRate: 40000,
    roundingMinutes: 10,
    currency: "so'm",
  };

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
      expect(getHourlyRate('billiard', mockSettings)).toBe(60000);
      expect(getHourlyRate('tennis', mockSettings)).toBe(40000);
    });
  });

  describe('calculatePrice', () => {
    it('returns 0 price for 0 duration', () => {
      const res = calculatePrice(0, 60000, 10);
      expect(res.roundedMinutes).toBe(0);
      expect(res.price).toBe(0);
    });

    it('calculates price correctly with 10 min rounding (12 minutes played at 60k/h)', () => {
      // 12 min = 720 seconds -> rounds up to 20 min -> (20 * 60,000) / 60 = 20,000 so'm
      const res = calculatePrice(720, 60000, 10);
      expect(res.roundedMinutes).toBe(20);
      expect(res.price).toBe(20000);
    });

    it('calculates price correctly with 5 min rounding (12 minutes played at 60k/h)', () => {
      // 12 min = 720 seconds -> rounds up to 15 min -> (15 * 60,000) / 60 = 15,000 so'm
      const res = calculatePrice(720, 60000, 5);
      expect(res.roundedMinutes).toBe(15);
      expect(res.price).toBe(15000);
    });

    it('calculates 1 hour exactly', () => {
      // 3600 seconds -> 60 min -> 60,000 so'm
      const res = calculatePrice(3600, 60000, 10);
      expect(res.roundedMinutes).toBe(60);
      expect(res.price).toBe(60000);
    });
  });

  describe('calculateSessionDetails', () => {
    it('computes full details accurately', () => {
      const start = 1000000;
      const end = start + 3600 * 1000; // 1 hour
      const details = calculateSessionDetails(start, end, 60000, 10);

      expect(details.durationSeconds).toBe(3600);
      expect(details.durationFormatted).toBe('01:00:00');
      expect(details.roundedMinutes).toBe(60);
      expect(details.totalPrice).toBe(60000);
      expect(details.totalPriceFormatted).toBe("60 000 so'm");
    });
  });
});
