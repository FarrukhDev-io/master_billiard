import { useState, useCallback, useMemo } from 'react';
import type { Table, CompletedSession, ClubSettings, SessionCalculation } from '../types';
import { storage } from '../lib/storage';
import { getHourlyRate, calculateSessionDetails } from '../lib/pricing';
import { getTodayDateKey } from '../lib/format';

/**
 * Stollar holati, sessiyalarni boshlash/tugatish va hisob-kitoblar uchun asosiy hook
 */
export function useTables(settings: ClubSettings) {
  const [tables, setTablesState] = useState<Table[]>(() => storage.getTables());
  const [sessions, setSessionsState] = useState<CompletedSession[]>(() => storage.getSessions());

  // Stol sessiyasini boshlash
  const startSession = useCallback((tableId: string) => {
    setTablesState((prevTables) => {
      const updated = prevTables.map((t) => {
        if (t.id === tableId && t.status === 'available') {
          const rate = getHourlyRate(t.type, settings);
          const uniqueSessionId = `sess_${t.id}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
          return {
            ...t,
            status: 'busy' as const,
            currentSession: {
              sessionId: uniqueSessionId,
              startTime: Date.now(),
              hourlyRate: rate,
            },
          };
        }
        return t;
      });
      storage.setTables(updated);
      return updated;
    });
  }, [settings]);

  // Stol sessiyasini to'xtatish va hisoblab bo'shatish
  const finishSession = useCallback((tableId: string): CompletedSession | null => {
    let completedSessionResult: CompletedSession | null = null;
    const currentNow = Date.now();

    setTablesState((prevTables) => {
      const targetTable = prevTables.find((t) => t.id === tableId);
      if (!targetTable || targetTable.status !== 'busy' || !targetTable.currentSession) {
        return prevTables;
      }

      const active = targetTable.currentSession;
      const rate = active.hourlyRate || getHourlyRate(targetTable.type, settings);
      const details = calculateSessionDetails(
        active.startTime,
        currentNow,
        rate,
        settings.roundingMinutes
      );

      const uniqueCompletedId = `comp_${targetTable.id}_${currentNow}_${Math.random().toString(36).substring(2, 8)}`;

      const completed: CompletedSession = {
        id: uniqueCompletedId,
        tableId: targetTable.id,
        tableName: targetTable.name,
        tableType: targetTable.type,
        startTime: active.startTime,
        endTime: currentNow,
        durationSeconds: details.durationSeconds,
        roundedMinutes: details.roundedMinutes,
        hourlyRate: rate,
        totalPrice: details.totalPrice,
        dateKey: getTodayDateKey(),
      };

      completedSessionResult = completed;

      // Sessiyalar tarixiga qo'shish
      setSessionsState((prevSessions) => {
        const nextSessions = [completed, ...prevSessions];
        storage.setSessions(nextSessions);
        return nextSessions;
      });

      // Stolni bo'shatish
      const nextTables = prevTables.map((t) => {
        if (t.id === tableId) {
          return {
            ...t,
            status: 'available' as const,
            currentSession: null,
          };
        }
        return t;
      });

      storage.setTables(nextTables);
      return nextTables;
    });

    return completedSessionResult;
  }, [settings]);

  // Sessiyani bekor qilish (adashib bosilganda to'lovsiz bo'shatish)
  const cancelSession = useCallback((tableId: string) => {
    setTablesState((prevTables) => {
      const updated = prevTables.map((t) => {
        if (t.id === tableId) {
          return {
            ...t,
            status: 'available' as const,
            currentSession: null,
          };
        }
        return t;
      });
      storage.setTables(updated);
      return updated;
    });
  }, []);

  // Joriy sessiyaning real vaqtdagi hisob-kitobini olish
  const getTableCurrentCalculation = useCallback(
    (table: Table, currentTime: number): SessionCalculation | null => {
      if (table.status !== 'busy' || !table.currentSession) {
        return null;
      }
      const rate = table.currentSession.hourlyRate || getHourlyRate(table.type, settings);
      return calculateSessionDetails(
        table.currentSession.startTime,
        currentTime,
        rate,
        settings.roundingMinutes
      );
    },
    [settings]
  );

  // Bugungi tugagan sessiyalar
  const todayDateKey = getTodayDateKey();
  const todaySessions = useMemo(() => {
    return sessions.filter((s) => s.dateKey === todayDateKey);
  }, [sessions, todayDateKey]);

  // Bugungi umumiy tushum
  const todayRevenue = useMemo(() => {
    return todaySessions.reduce((sum, s) => sum + s.totalPrice, 0);
  }, [todaySessions]);

  // Faol (band) stollar soni
  const activeTablesCount = useMemo(() => {
    return tables.filter((t) => t.status === 'busy').length;
  }, [tables]);

  // Tarixni tozalash (agar kerak bo'lsa)
  const clearTodayHistory = useCallback(() => {
    setSessionsState((prev) => {
      const filtered = prev.filter((s) => s.dateKey !== todayDateKey);
      storage.setSessions(filtered);
      return filtered;
    });
  }, [todayDateKey]);

  return {
    tables,
    sessions,
    todaySessions,
    todayRevenue,
    activeTablesCount,
    startSession,
    finishSession,
    cancelSession,
    getTableCurrentCalculation,
    clearTodayHistory,
  };
}
