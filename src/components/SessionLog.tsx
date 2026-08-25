import React from 'react';
import type { CompletedSession } from '../types';
import { formatMoney, formatTime, formatDurationHuman } from '../lib/format';
import { History, Trash2 } from 'lucide-react';

interface SessionLogProps {
  sessions: CompletedSession[];
  onClearHistory?: () => void;
}

/**
 * Bugungi Sessiyalar Tarixi (Session Log)
 * Daftar ko'rinishidagi yakunlangan o'yinlar ro'yxati
 */
export const SessionLog: React.FC<SessionLogProps> = ({
  sessions,
  onClearHistory,
}) => {
  return (
    <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-4 shadow-xs">
      {/* Sarlavha */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-bold text-white">
            Bugungi Sessiyalar Tarixi {sessions.length > 0 && `(${sessions.length})`}
          </h2>
        </div>

        {sessions.length > 0 && onClearHistory && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Bugungi barcha tarixni tozalashni xohlaysizmi?")) {
                onClearHistory();
              }
            }}
            className="text-slate-400 hover:text-rose-400 text-xs flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Tozalash</span>
          </button>
        )}
      </div>

      {/* Ro'yxat */}
      <div className="mt-2 divide-y divide-slate-800/60 max-h-[300px] overflow-y-auto pr-0.5">
        {sessions.length === 0 ? (
          <div className="py-6 text-center text-slate-500 text-xs">
            Bugun hali yakunlangan sessiyalar yo'q
          </div>
        ) : (
          sessions.map((item, index) => {
            const isTennis = item.tableType === 'tennis';
            const uniqueKey = item.id ? `${item.id}-${index}` : `sess-${item.tableId}-${item.startTime}-${index}`;
            return (
              <div
                key={uniqueKey}
                className="py-2.5 flex items-center justify-between gap-2 hover:bg-slate-950/30 px-1 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base shrink-0">{isTennis ? '🏓' : '🎱'}</span>
                  <div className="truncate">
                    <span className="font-semibold text-xs text-slate-200 block truncate">
                      {item.tableName}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {formatTime(item.startTime)} - {formatTime(item.endTime)} ({formatDurationHuman(item.durationSeconds)})
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-bold font-mono text-xs sm:text-sm text-emerald-400 block">
                    {formatMoney(item.totalPrice)}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {item.roundedMinutes} daq hisobida
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
