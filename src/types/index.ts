/**
 * Stollar va sessiyalar uchun TypeScript type va interface ta'riflari
 */

export type TableType = 'billiard' | 'tennis';

export type TableStatus = 'available' | 'busy';

export interface ActiveSession {
  sessionId: string;
  startTime: number; // Unix timestamp in milliseconds
  hourlyRate: number; // Snapshot of hourly rate when session started (or updated)
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

export type RoundingStep = 5 | 10 | 15 | 30;

export interface ClubSettings {
  billiardHourlyRate: number; // Soatlik narx (bilyard)
  tennisHourlyRate: number;   // Soatlik narx (stol tennisi)
  roundingMinutes: RoundingStep; // Yaxlitlash qadami (daqiqa)
  currency: string;           // "so'm"
}

export interface SessionCalculation {
  durationSeconds: number;
  durationFormatted: string;
  roundedMinutes: number;
  totalPrice: number;
  totalPriceFormatted: string;
  hourlyRate: number;
}
