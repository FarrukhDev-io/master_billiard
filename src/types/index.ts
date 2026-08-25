/**
 * Stollar va sessiyalar uchun TypeScript type va interface ta'riflari
 */

export type TableType = 'billiard' | 'tennis';

export type TableStatus = 'available' | 'busy';

export interface ActiveSession {
  sessionId: string;
  startTime: number; // Unix timestamp in milliseconds
  hourlyRate: number; // Snapshot of hourly rate when session started
}

export interface Table {
  id: string;
  name: string;
  shortName: string;
  tableNumber: number;
  type: TableType;
  status: TableStatus;
  currentSession: ActiveSession | null;
}

export interface CompletedSession {
  id: string;
  tableId: string;
  tableName: string;
  tableType: TableType;
  startTime: number; // ms
  endTime: number; // ms
  durationSeconds: number;
  roundedMinutes: number;
  hourlyRate: number;
  totalPrice: number;
  dateKey: string; // "YYYY-MM-DD" for filtering today's sessions
}

export type RoundingStep = 1 | 5 | 10 | 15 | 30;

export interface ClubSettings {
  billiardHourlyRate: number; // Bilyard soatlik narxi (40 000 so'm)
  tennisHourlyRate: number;   // Stol tennisi soatlik narxi (20 000 so'm)
  roundingMinutes: RoundingStep; // Yaxlitlash qadami (1 = sekundma-sekund aniq hisob)
  currency: string;           // "so'm"
}

export interface SessionCalculation {
  durationSeconds: number;
  durationFormatted: string;
  roundedMinutes: number;
  livePrice: number; // Har soniyada o'suvchi aniq pul
  totalPrice: number;
  totalPriceFormatted: string;
  hourlyRate: number;
}
