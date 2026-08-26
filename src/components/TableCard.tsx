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
 * Haqiqiy Bilyard va Tennis Stoli Dizayni (Full Height & Authentic Luxury Lounge)
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

  const displayName = table.shortName || table.name.replace(/\s*\(.*?\)/, '');

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
      className={`relative rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-5 transition-all duration-300 cursor-pointer select-none flex flex-col justify-between active:scale-[0.985] overflow-hidden h-full ${
        isTennis
          ? isBusy
            ? 'bg-gradient-to-b from-[#1e40af] via-[#172554] to-[#0b1329] border-4 lg:border-[6px] border-blue-400 shadow-[0_20px_50px_rgba(37,99,235,0.45),inset_0_4px_25px_rgba(0,0,0,0.85)] ring-2 lg:ring-4 ring-blue-500/50'
            : 'bg-gradient-to-b from-[#1d3557] via-[#14213d] to-[#0a1128] border-4 lg:border-[6px] border-[#0f1d38] hover:border-blue-600 shadow-[0_12px_30px_rgba(0,0,0,0.7),inset_0_4px_25px_rgba(0,0,0,0.9)] hover:shadow-[0_20px_45px_rgba(29,53,87,0.5)]'
          : isBusy
            ? 'bg-gradient-to-b from-[#065f46] via-[#043828] to-[#021811] border-4 lg:border-[6px] border-emerald-400 shadow-[0_20px_50px_rgba(16,185,129,0.45),inset_0_4px_25px_rgba(0,0,0,0.85)] ring-2 lg:ring-4 ring-emerald-500/50'
            : 'bg-gradient-to-b from-[#064e3b] via-[#042f22] to-[#021811] border-4 lg:border-[6px] border-[#0a2718] hover:border-emerald-600 shadow-[0_12px_30px_rgba(0,0,0,0.7),inset_0_4px_25px_rgba(0,0,0,0.9)] hover:shadow-[0_20px_45px_rgba(6,78,59,0.5)]'
      }`}
    >
      {/* Tennis Stoli Oq Chiziqlari (Perimeter va Markaz) */}
      {isTennis && (
        <>
          <div className="absolute inset-2 border border-white/20 rounded-xl pointer-events-none" />
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] lg:h-[3px] bg-white/30 pointer-events-none" />
        </>
      )}

      {/* Bilyard 6 ta Luzalari (Pockets) */}
      {!isTennis && (
        <>
          {/* 4 ta burchak luzalari */}
          <div className="absolute top-2 left-2 w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-black/90 border border-emerald-950 shadow-inner" />
          <div className="absolute top-2 right-2 w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-black/90 border border-emerald-950 shadow-inner" />
          <div className="absolute bottom-2 left-2 w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-black/90 border border-emerald-950 shadow-inner" />
          <div className="absolute bottom-2 right-2 w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-black/90 border border-emerald-950 shadow-inner" />
          {/* 2 ta o'rta luzalari */}
          <div className="absolute top-1/2 -translate-y-1/2 left-1.5 w-3.5 h-3.5 lg:w-5 lg:h-5 rounded-full bg-black/90 border border-emerald-950 shadow-inner" />
          <div className="absolute top-1/2 -translate-y-1/2 right-1.5 w-3.5 h-3.5 lg:w-5 lg:h-5 rounded-full bg-black/90 border border-emerald-950 shadow-inner" />
        </>
      )}

      {/* 1. YUQORI QISM: STOL NOMI VA HOLATI */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-1.5 mb-1 sm:mb-2">
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
            <span className="text-xl sm:text-2xl lg:text-3xl drop-shadow-md">
              {isTennis ? '🏓' : '🎱'}
            </span>
            <h3 className="font-black text-sm sm:text-lg lg:text-2xl text-white tracking-tight uppercase leading-tight drop-shadow-md whitespace-nowrap">
              {displayName}
            </h3>
          </div>

          {/* Holat Nishoni */}
          <span
            className={`shrink-0 inline-flex items-center gap-1 px-2 lg:px-3 py-0.5 lg:py-1 rounded-full text-[10px] sm:text-xs lg:text-sm font-black shadow-lg ${
              isBusy
                ? isTennis
                  ? 'bg-blue-300 text-slate-950 ring-2 ring-blue-300/50'
                  : 'bg-emerald-300 text-slate-950 ring-2 ring-emerald-300/50'
                : 'bg-black/60 text-slate-200 border border-white/20 backdrop-blur-xs'
            }`}
          >
            {isBusy && (
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-slate-950 animate-ping" />
            )}
            {isBusy ? 'BAND' : 'BO\'SH'}
          </span>
        </div>
      </div>

      {/* 2. MARKAZ: MOVUT VA GIGANT TAYMER / PUL */}
      <div className="relative z-10 flex-1 flex flex-col justify-center my-2 sm:my-3">
        {isBusy && calc && table.currentSession ? (
          <div className="w-full h-full py-3 sm:py-6 lg:py-8 px-2 sm:px-4 rounded-xl lg:rounded-2xl bg-black/70 backdrop-blur-md border border-white/20 text-center shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)] flex flex-col justify-center items-center">
            {/* GIGANT TAYMER */}
            <div className="font-mono text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-widest drop-shadow-[0_2px_15px_rgba(255,255,255,0.4)]">
              {formatDuration(calc.durationSeconds)}
            </div>

            {/* HAR SONIYA YANGILANUVCHI PUL */}
            <div className="w-full flex items-center justify-between mt-2 sm:mt-4 lg:mt-6 pt-2 lg:pt-3 border-t border-white/15 px-1 sm:px-2">
              <span className="text-slate-300 font-mono text-[10px] sm:text-xs lg:text-sm font-semibold">
                {formatTime(table.currentSession.startTime)} dan
              </span>
              <span
                className={`font-mono font-black text-xs sm:text-base lg:text-2xl drop-shadow-md ${
                  isTennis ? 'text-blue-300' : 'text-emerald-300'
                }`}
              >
                {formatMoney(calc.livePrice)}
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full h-full py-4 sm:py-8 lg:py-12 px-2 rounded-xl lg:rounded-2xl bg-black/45 backdrop-blur-xs border border-white/15 text-center shadow-[inset_0_4px_16px_rgba(0,0,0,0.7)] flex flex-col justify-center items-center">
            <span className="text-sm sm:text-xl lg:text-3xl font-black text-white font-mono block drop-shadow-md">
              {formatMoney(rate)}
            </span>
            <span className="text-[10px] sm:text-xs lg:text-sm text-slate-300 font-bold mt-1">
              soatlik narx
            </span>
          </div>
        )}
      </div>

      {/* 3. PASTKI HARAKAT TUGMASI */}
      <div className="relative z-10 mt-1 sm:mt-2">
        {isBusy ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenSessionModal(table);
            }}
            className={`w-full h-10 sm:h-12 lg:h-14 rounded-xl lg:rounded-2xl font-black text-xs sm:text-sm lg:text-base flex items-center justify-center gap-2 text-white transition-all active:scale-95 cursor-pointer shadow-xl ${
              isTennis
                ? 'bg-blue-500 hover:bg-blue-400 text-slate-950 shadow-blue-900/60'
                : 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-emerald-950/60'
            }`}
          >
            <Receipt className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            HISOBLASH
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onStart(table.id);
            }}
            className="w-full h-10 sm:h-12 lg:h-14 rounded-xl lg:rounded-2xl font-black text-xs sm:text-sm lg:text-base flex items-center justify-center gap-2 bg-black/70 hover:bg-black/90 active:bg-black text-white border border-white/25 transition-all active:scale-95 cursor-pointer shadow-lg"
          >
            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
            BOSHLASH
          </button>
        )}
      </div>
    </div>
  );
};
