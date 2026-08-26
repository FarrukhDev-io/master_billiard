import React from 'react';
import type { Table, ClubSettings } from '../types';
import { calculateSessionDetails, getHourlyRate } from '../lib/pricing';
import { formatDuration, formatMoney, formatTime } from '../lib/format';
import { Play, Receipt } from 'lucide-react';

interface TableCardProps {
  table: Table;
  settings: ClubSettings;
  currentTime: number;
  onStart: (tableId: string) => void;
  onOpenSessionModal: (table: Table) => void;
}

/**
 * Mobile 2-Column & Desktop 5-Column Responsive Table Card
 */
export const TableCard: React.FC<TableCardProps> = ({
  table,
  settings,
  currentTime,
  onStart,
  onOpenSessionModal,
}) => {
  const isBusy = table.status === 'busy' && !!table.currentSession;
  const isTennis = table.type === 'tennis';

  const rate = isBusy && table.currentSession?.hourlyRate
    ? table.currentSession.hourlyRate
    : getHourlyRate(table.type, settings);

  const calc = isBusy && table.currentSession
    ? calculateSessionDetails(
        table.currentSession.startTime,
        currentTime,
        rate,
        settings.roundingMinutes
      )
    : null;

  const handleClick = () => {
    if (isBusy) {
      onOpenSessionModal(table);
    } else {
      onStart(table.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 border transition-all duration-200 cursor-pointer select-none flex flex-col justify-between active:scale-[0.98] ${
        isBusy
          ? isTennis
            ? 'bg-gradient-to-b from-sky-950/40 to-[#0f172a] border-sky-500/70 shadow-lg shadow-sky-950/20 ring-1 ring-sky-500/30'
            : 'bg-gradient-to-b from-emerald-950/40 to-[#0f172a] border-emerald-500/70 shadow-lg shadow-emerald-950/20 ring-1 ring-emerald-500/30'
          : 'bg-[#0f172a] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60 shadow-xs'
      }`}
    >
      {/* 1. Sarlavha va Holat */}
      <div>
        <div className="flex items-center justify-between gap-1 mb-2 sm:mb-3">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-base sm:text-xl shrink-0">{isTennis ? '🏓' : '🎱'}</span>
            <h3 className="font-bold text-xs sm:text-sm lg:text-base text-white truncate leading-tight">
              {table.name}
            </h3>
          </div>

          {/* Minimal Holat Nuqtasi */}
          <span
            className={`shrink-0 inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-bold ${
              isBusy
                ? isTennis
                  ? 'bg-sky-500/20 text-sky-300'
                  : 'bg-emerald-500/20 text-emerald-300'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            {isBusy && (
              <span
                className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                  isTennis ? 'bg-sky-400' : 'bg-emerald-400'
                }`}
              />
            )}
            {isBusy ? 'Band' : 'Bo\'sh'}
          </span>
        </div>

        {/* 2. Markaz: Taymer yoki Narx */}
        {isBusy && calc && table.currentSession ? (
          <div className="my-1.5 sm:my-2 py-2 sm:py-3 px-2 sm:px-3 rounded-lg sm:rounded-xl bg-slate-950/80 border border-slate-800/80 text-center">
            {/* Taymer */}
            <div className="font-mono text-base sm:text-2xl font-black text-white tracking-tight">
              {formatDuration(calc.durationSeconds)}
            </div>

            {/* Pul va Vaqt */}
            <div className="flex items-center justify-between mt-1 sm:mt-2 pt-1 sm:pt-1.5 border-t border-slate-800/80 text-[11px] sm:text-xs">
              <span className="text-slate-400 font-mono text-[10px] sm:text-xs">
                {formatTime(table.currentSession.startTime)}
              </span>
              <span
                className={`font-mono font-black text-xs sm:text-sm lg:text-base ${
                  isTennis ? 'text-sky-300' : 'text-emerald-400'
                }`}
              >
                {formatMoney(calc.livePrice)}
              </span>
            </div>
          </div>
        ) : (
          <div className="my-1.5 sm:my-2 py-3 sm:py-5 px-2 rounded-lg sm:rounded-xl bg-slate-950/40 border border-slate-850 text-center">
            <span className="text-xs sm:text-base font-bold text-slate-200 font-mono block">
              {formatMoney(rate)}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400">/ soat</span>
          </div>
        )}
      </div>

      {/* 3. Harakat Tugmasi */}
      <div className="mt-1.5 sm:mt-2">
        {isBusy ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenSessionModal(table);
            }}
            className={`w-full h-9 sm:h-11 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 text-white transition-all active:scale-95 cursor-pointer shadow-sm ${
              isTennis
                ? 'bg-sky-600 hover:bg-sky-500'
                : 'bg-emerald-600 hover:bg-emerald-500'
            }`}
          >
            <Receipt className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Hisoblash
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onStart(table.id);
            }}
            className="w-full h-9 sm:h-11 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-200 border border-slate-700 transition-all active:scale-95 cursor-pointer"
          >
            <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
            Boshlash
          </button>
        )}
      </div>
    </div>
  );
};
