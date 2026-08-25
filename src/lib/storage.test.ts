import { describe, it, expect, beforeEach } from 'vitest';
import { storage, DEFAULT_INITIAL_TABLES, DEFAULT_SETTINGS } from './storage';
import type { CompletedSession } from '../types';

describe('Storage service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns default tables if localStorage is empty', () => {
    const tables = storage.getTables();
    expect(tables).toHaveLength(5);
    expect(tables[0].name).toBe('1-Stol (Bilyard)');
    expect(tables[4].name).toBe('Stol Tennisi');
  });

  it('saves and retrieves updated tables', () => {
    const customTables = [...DEFAULT_INITIAL_TABLES];
    customTables[0] = {
      ...customTables[0],
      status: 'busy',
      currentSession: {
        sessionId: 'sess-123',
        startTime: 123456789,
        hourlyRate: 50000,
      },
    };

    storage.setTables(customTables);
    const retrieved = storage.getTables();
    expect(retrieved[0].status).toBe('busy');
    expect(retrieved[0].currentSession?.sessionId).toBe('sess-123');
  });

  it('handles corrupted JSON gracefully in getTables', () => {
    localStorage.setItem('mb_tables_v1', 'invalid-json-data');
    const tables = storage.getTables();
    expect(tables).toEqual(DEFAULT_INITIAL_TABLES);
  });

  it('adds and retrieves completed sessions', () => {
    const session: CompletedSession = {
      id: 'sess-1',
      tableId: 'table-1',
      tableName: '1-Stol (Bilyard)',
      tableType: 'billiard',
      startTime: 10000,
      endTime: 70000,
      durationSeconds: 60,
      roundedMinutes: 10,
      hourlyRate: 50000,
      totalPrice: 8333,
      dateKey: '2026-08-25',
    };

    storage.addSession(session);
    const retrieved = storage.getSessions();
    expect(retrieved).toHaveLength(1);
    expect(retrieved[0].id).toBe('sess-1');
  });

  it('gets and sets settings', () => {
    const initial = storage.getSettings();
    expect(initial).toEqual(DEFAULT_SETTINGS);

    storage.setSettings({
      ...DEFAULT_SETTINGS,
      billiardHourlyRate: 70000,
    });

    const updated = storage.getSettings();
    expect(updated.billiardHourlyRate).toBe(70000);
  });
});
