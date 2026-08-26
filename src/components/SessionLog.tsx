import React from 'react';
import type { CompletedSession } from '../types';
import { formatMoney, formatTime, formatDurationHuman } from '../lib/format';
import { History, Trash2 } from 'lucide-react';

interface SessionLogProps {
  sessions: CompletedSession[];
  onClearHistory?: () => void;
}

/**
 * Bugungi Cheklar Tarixi (Session Log)
 */
export const SessionLog: React.FC<SessionLogProps> = ({
  sessions,
  onClearHistory,
}) => {
  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl">
      {/* Sarlavha */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-tight">
            Bugungi Cheklar {sessions.length > 0 && `(${sessions.length})`}
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
      <div className="mt-3 divide-y divide-slate-800/80 max-h-[400px] overflow-y-auto pr-1">
        {sessions.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-xs sm:text-sm">
            Bugun hali tugagan o'yinlar yo'q
          </div>
        ) : (
          sessions.map((item, index) => {
            const isTennis = item.tableType === 'tennis';
            const uniqueKey = item.id ? `${item.id}-${index}` : `sess-${item.tableId}-${item.startTime}-${index}`;
            const displayName = item.tableName.replace(/\s*\(.*?\)/, '');
            return (
              <div
                key={uniqueKey}
                className="py-3 flex items-center justify-between gap-3 hover:bg-slate-950/40 px-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xl shrink-0">{isTennis ? '🏓' : '🎱'}</span>
                  <div className="truncate">
                    <span className="font-extrabold text-xs sm:text-sm text-white block truncate">
                      {displayName}
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-400 font-mono">
                      {formatTime(item.startTime)} — {formatTime(item.endTime)} ({formatDurationHuman(item.durationSeconds)})
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-black font-mono text-sm sm:text-base text-emerald-400 block">
                    {formatMoney(item.totalPrice)}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {item.roundedMinutes} daqiqa hisobida
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
