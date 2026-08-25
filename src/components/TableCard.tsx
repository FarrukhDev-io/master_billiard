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
 * Stollar Kartochkasi (Table Card)
 * Bo'sh (Available) va Band (Busy & Active) holatlari
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

  const currentRate = isBusy && table.currentSession?.hourlyRate
    ? table.currentSession.hourlyRate
    : getHourlyRate(table.type, settings);

  const calculation = isBusy && table.currentSession
    ? calculateSessionDetails(
        table.currentSession.startTime,
        currentTime,
        currentRate,
        settings.roundingMinutes
      )
    : null;

  const handleCardClick = () => {
    if (isBusy) {
      onOpenSessionModal(table);
    } else {
      onStart(table.id);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`rounded-2xl p-4 transition-all border cursor-pointer select-none flex flex-col justify-between active:scale-[0.985] ${
        isBusy
          ? isTennis
            ? 'bg-gradient-to-b from-sky-950/60 to-[#0f172a] border-sky-500/80 shadow-md shadow-sky-950/40 ring-1 ring-sky-500/40'
            : 'bg-gradient-to-b from-emerald-950/60 to-[#0f172a] border-emerald-500/80 shadow-md shadow-emerald-950/40 ring-1 ring-emerald-500/40'
          : 'bg-[#0f172a] border-slate-800 hover:border-slate-700 shadow-xs'
      }`}
    >
      {/* Yuqori qism: Stol nomi va holati */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl leading-none">{isTennis ? '🏓' : '🎱'}</span>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white leading-tight">
                {table.name}
              </h3>
              <span className="text-[11px] text-slate-400">
                {isTennis ? 'Stol tennisi' : 'Bilyard'}
              </span>
            </div>
          </div>

          {/* Holat nishoni */}
          {isBusy ? (
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide ${
                isTennis
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                  isTennis ? 'bg-sky-400' : 'bg-emerald-400'
                }`}
              />
              Band
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700/60">
              Bo'sh
            </span>
          )}
        </div>

        {/* Markaziy qism */}
        {isBusy && calculation && table.currentSession ? (
          <div className="my-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center">
            {/* Katta o'qiladigan taymer */}
            <div className="font-mono text-2xl sm:text-[28px] font-black text-white tracking-wider">
              {formatDuration(calculation.durationSeconds)}
            </div>

            {/* Summa va boshlangan vaqt */}
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-xs">
              <span className="text-slate-400">
                {formatTime(table.currentSession.startTime)} dan
              </span>
              <span
                className={`font-mono font-bold text-sm sm:text-base ${
                  isTennis ? 'text-sky-300' : 'text-emerald-400'
                }`}
              >
                {formatMoney(calculation.totalPrice)}
              </span>
            </div>
          </div>
        ) : (
          <div className="my-2 py-4 px-3 rounded-xl bg-slate-950/40 border border-slate-800/50 text-center">
            <span className="text-xs text-slate-400 block mb-0.5">Soatlik narx</span>
            <span className="text-base font-bold text-slate-200 font-mono">
              {formatMoney(currentRate)} / soat
            </span>
          </div>
        )}
      </div>

      {/* Pastki harakat tugmasi (44px balandlik) */}
      <div className="mt-2 pt-2 border-t border-slate-800/60">
        {isBusy ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenSessionModal(table);
            }}
            className={`w-full h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 text-white shadow-sm transition-all active:scale-95 cursor-pointer ${
              isTennis
                ? 'bg-sky-600 hover:bg-sky-500'
                : 'bg-emerald-600 hover:bg-emerald-500'
            }`}
          >
            <Receipt className="w-4 h-4" />
            Hisoblash
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onStart(table.id);
            }}
            className="w-full h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-200 border border-slate-700 transition-all active:scale-95 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Boshlash
          </button>
        )}
      </div>
    </div>
  );
};
