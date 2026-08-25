/**
 * Ma'lumotlarni xavfsiz saqlash va olish uchun Storage abstraksiyasi (Service layer)
 * To'g'ridan-to'g'ri localStorage bilan ishlash o'rniga barcha amallar shu orqali bajariladi.
 * Kelajakda backend API ga osonlik bilan almashtirish mumkin.
 */

import type { Table, CompletedSession, ClubSettings } from '../types';

const STORAGE_KEYS = {
  TABLES: 'mb_tables_v1',
  SESSIONS: 'mb_completed_sessions_v1',
  SETTINGS: 'mb_club_settings_v1',
} as const;

/**
 * Boshlang'ich stollar ro'yxati (4 ta bilyard + 1 ta stol tennisi)
 */
export const DEFAULT_INITIAL_TABLES: Table[] = [
  {
    id: 'table-1',
    name: '1-Stol (Bilyard)',
    shortName: '1-Stol',
    tableNumber: 1,
    type: 'billiard',
    status: 'available',
    currentSession: null,
  },
  {
    id: 'table-2',
    name: '2-Stol (Bilyard)',
    shortName: '2-Stol',
    tableNumber: 2,
    type: 'billiard',
    status: 'available',
    currentSession: null,
  },
  {
    id: 'table-3',
    name: '3-Stol (Bilyard)',
    shortName: '3-Stol',
    tableNumber: 3,
    type: 'billiard',
    status: 'available',
    currentSession: null,
  },
  {
    id: 'table-4',
    name: '4-Stol (Bilyard)',
    shortName: '4-Stol',
    tableNumber: 4,
    type: 'billiard',
    status: 'available',
    currentSession: null,
  },
  {
    id: 'tennis-1',
    name: 'Stol Tennisi',
    shortName: 'Tennis',
    tableNumber: 5,
    type: 'tennis',
    status: 'available',
    currentSession: null,
  },
];

/**
 * Boshlang'ich klub sozlamalari
 */
export const DEFAULT_SETTINGS: ClubSettings = {
  billiardHourlyRate: 50000, // 50 000 so'm / soat
  tennisHourlyRate: 35000,   // 35 000 so'm / soat
  roundingMinutes: 10,       // 10 daqiqagacha yaxlitlash
  currency: "so'm",
};

/**
 * Storage yordamchi xavfsiz metodlari
 */
export const storage = {
  getTables(): Table[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.TABLES);
      if (!raw) return DEFAULT_INITIAL_TABLES;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return DEFAULT_INITIAL_TABLES;
    } catch (e) {
      console.error('Storage getTables error:', e);
      return DEFAULT_INITIAL_TABLES;
    }
  },

  setTables(tables: Table[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TABLES, JSON.stringify(tables));
    } catch (e) {
      console.error('Storage setTables error:', e);
    }
  },

  getSessions(): CompletedSession[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Storage getSessions error:', e);
      return [];
    }
  },

  setSessions(sessions: CompletedSession[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    } catch (e) {
      console.error('Storage setSessions error:', e);
    }
  },

  addSession(session: CompletedSession): CompletedSession[] {
    const existing = this.getSessions();
    const updated = [session, ...existing];
    this.setSessions(updated);
    return updated;
  },

  getSettings(): ClubSettings {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!raw) return DEFAULT_SETTINGS;
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
      };
    } catch (e) {
      console.error('Storage getSettings error:', e);
      return DEFAULT_SETTINGS;
    }
  },

  setSettings(settings: ClubSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Storage setSettings error:', e);
    }
  },

  clearAll(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.TABLES);
      localStorage.removeItem(STORAGE_KEYS.SESSIONS);
      localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    } catch (e) {
      console.error('Storage clearAll error:', e);
    }
  },
};
