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
 * Haqiqiy Bilyard va Tennis Stoli Dizayni (Authentic Table Look)
 * - Bilyard: Movut yashil, bortlar, burchak luzalari va ichki-tashqi shadowlar
 * - Tennis: Sport ko'k foni, oq o'rta chiziq va setka belgisi
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
      className={`relative rounded-2xl sm:rounded-3xl p-3 sm:p-5 transition-all duration-300 cursor-pointer select-none flex flex-col justify-between active:scale-[0.98] overflow-hidden ${
        isTennis
          ? isBusy
            ? 'bg-gradient-to-b from-[#1e40af] to-[#0f172a] border-2 border-blue-400/80 shadow-[0_10px_30px_rgba(37,99,235,0.35),inset_0_3px_14px_rgba(0,0,0,0.8)] ring-2 ring-blue-500/50'
            : 'bg-gradient-to-b from-[#172554] to-[#0b1329] border-2 border-blue-900/80 hover:border-blue-700 shadow-[0_8px_20px_rgba(0,0,0,0.5),inset_0_3px_14px_rgba(0,0,0,0.85)] hover:shadow-[0_10px_25px_rgba(30,58,138,0.3)]'
          : isBusy
            ? 'bg-gradient-to-b from-[#065f46] to-[#06241b] border-2 border-emerald-400/80 shadow-[0_10px_30px_rgba(16,185,129,0.35),inset_0_3px_14px_rgba(0,0,0,0.8)] ring-2 ring-emerald-500/50'
            : 'bg-gradient-to-b from-[#064e3b] to-[#041f17] border-2 border-emerald-950/90 hover:border-emerald-800 shadow-[0_8px_20px_rgba(0,0,0,0.5),inset_0_3px_14px_rgba(0,0,0,0.85)] hover:shadow-[0_10px_25px_rgba(6,78,59,0.3)]'
      }`}
    >
      {/* Tennis Stoli O'rta Chizig'i (Oq chiziq) */}
      {isTennis && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-white/20 pointer-events-none" />
      )}

      {/* Bilyard Burchak Luzalari (Pockets) */}
      {!isTennis && (
        <>
          <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 rounded-full bg-black/70 border border-emerald-900/60 shadow-inner" />
          <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-black/70 border border-emerald-900/60 shadow-inner" />
          <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 rounded-full bg-black/70 border border-emerald-900/60 shadow-inner" />
          <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-black/70 border border-emerald-900/60 shadow-inner" />
        </>
      )}

      {/* 1. Yuqori qism: Stol Nomi va Holati */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-1 mb-2 sm:mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="text-xl sm:text-2xl drop-shadow-md">
              {isTennis ? '🏓' : '🎱'}
            </span>
            <div className="truncate">
              <h3 className="font-extrabold text-xs sm:text-base lg:text-lg text-white truncate drop-shadow-sm tracking-tight leading-tight">
                {table.name}
              </h3>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-200/80 drop-shadow-xs hidden sm:block">
                {isTennis ? 'Tennis Stoli' : 'Bilyard Movuti'}
              </span>
            </div>
          </div>

          {/* Holat nishoni */}
          <span
            className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-black shadow-md ${
              isBusy
                ? isTennis
                  ? 'bg-blue-400 text-slate-950'
                  : 'bg-emerald-400 text-slate-950'
                : 'bg-black/50 text-slate-300 border border-white/10 backdrop-blur-xs'
            }`}
          >
            {isBusy && (
              <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
            )}
            {isBusy ? 'O\'YINDA' : 'BO\'SH'}
          </span>
        </div>

        {/* 2. Markaz: Jonli Taymer va Pul (Bilyard/Tennis Movutida) */}
        {isBusy && calc && table.currentSession ? (
          <div className="my-2 sm:my-3 py-2.5 sm:py-4 px-2 sm:px-3 rounded-xl sm:rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]">
            {/* Katta o'qiladigan Jonli Taymer */}
            <div className="font-mono text-lg sm:text-2xl lg:text-3xl font-black text-white tracking-widest drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
              {formatDuration(calc.durationSeconds)}
            </div>

            {/* Har soniya yangilanuvchi Pul */}
            <div className="flex items-center justify-between mt-1.5 sm:mt-2.5 pt-1.5 sm:pt-2 border-t border-white/10 text-[11px] sm:text-xs">
              <span className="text-slate-300 font-mono text-[10px] sm:text-xs font-semibold">
                {formatTime(table.currentSession.startTime)} dan
              </span>
              <span
                className={`font-mono font-black text-xs sm:text-base lg:text-lg drop-shadow-md ${
                  isTennis ? 'text-blue-300' : 'text-emerald-300'
                }`}
              >
                {formatMoney(calc.livePrice)}
              </span>
            </div>
          </div>
        ) : (
          <div className="my-2 sm:my-3 py-3 sm:py-6 px-2 rounded-xl sm:rounded-2xl bg-black/35 backdrop-blur-xs border border-white/10 text-center shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)]">
            <span className="text-xs sm:text-base font-extrabold text-white font-mono block drop-shadow-xs">
              {formatMoney(rate)}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-300 font-medium">soatlik stavka</span>
          </div>
        )}
      </div>

      {/* 3. Pastki Harakat Tugmasi */}
      <div className="relative z-10 mt-1 sm:mt-2">
        {isBusy ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenSessionModal(table);
            }}
            className={`w-full h-10 sm:h-12 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 text-white transition-all active:scale-95 cursor-pointer shadow-lg ${
              isTennis
                ? 'bg-blue-500 hover:bg-blue-400 shadow-blue-900/50'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-950/50'
            }`}
          >
            <Receipt className="w-4 h-4" />
            HISOBLASH
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onStart(table.id);
            }}
            className="w-full h-10 sm:h-12 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 bg-black/60 hover:bg-black/80 active:bg-black text-white border border-white/20 transition-all active:scale-95 cursor-pointer shadow-md"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            BOSHLASH
          </button>
        )}
      </div>
    </div>
  );
};
