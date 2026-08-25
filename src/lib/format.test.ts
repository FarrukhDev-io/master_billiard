import { describe, it, expect } from 'vitest';
import {
  formatMoney,
  formatDuration,
  formatDurationHuman,
  formatTime,
  getTodayDateKey,
} from './format';

describe('Format functions', () => {
  describe('formatMoney', () => {
    it('formats numbers with spaces as thousands separator', () => {
      expect(formatMoney(0)).toBe("0 so'm");
      expect(formatMoney(50000)).toBe("50 000 so'm");
      expect(formatMoney(1250000)).toBe("1 250 000 so'm");
    });
  });

  describe('formatDuration', () => {
    it('formats seconds into HH:MM:SS format', () => {
      expect(formatDuration(0)).toBe('00:00:00');
      expect(formatDuration(45)).toBe('00:00:45');
      expect(formatDuration(65)).toBe('00:01:05');
      expect(formatDuration(3665)).toBe('01:01:05');
    });
  });

  describe('formatDurationHuman', () => {
    it('formats readable Uzbek duration strings', () => {
      expect(formatDurationHuman(30)).toBe('30 soniya');
      expect(formatDurationHuman(120)).toBe('2 daq');
      expect(formatDurationHuman(3660)).toBe('1 soat 1 daq');
    });
  });

  describe('formatTime', () => {
    it('formats timestamps into HH:mm', () => {
      const date = new Date(2026, 7, 25, 14, 30);
      expect(formatTime(date.getTime())).toBe('14:30');
    });
  });

  describe('getTodayDateKey', () => {
    it('returns YYYY-MM-DD format', () => {
      const testDate = new Date(2026, 7, 25);
      expect(getTodayDateKey(testDate)).toBe('2026-08-25');
    });
  });
});
