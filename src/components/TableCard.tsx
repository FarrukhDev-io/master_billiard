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
 * Katta Zal Monitori & Mobil Ekran Uchun Katta va Aniq Stol Kartochkasi
 * - Katta ekranda butun balandlikni egallaydi
 * - Yozuvlar va taymerlar uzoqdan ham juda aniq va katta ko'rinadi
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
      className={`relative rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-5 xl:p-6 transition-all duration-300 cursor-pointer select-none flex flex-col justify-between active:scale-[0.985] overflow-hidden h-full min-h-[175px] sm:min-h-[220px] lg:min-h-[380px] xl:min-h-[460px] ${
        isTennis
          ? isBusy
            ? 'bg-gradient-to-b from-[#1d4ed8] via-[#1e3a8a] to-[#0f172a] border-2 sm:border-4 border-blue-400 shadow-[0_15px_35px_rgba(37,99,235,0.4),inset_0_4px_20px_rgba(0,0,0,0.85)] ring-2 lg:ring-4 ring-blue-500/40'
            : 'bg-gradient-to-b from-[#1e3a8a] to-[#0a1128] border-2 sm:border-4 border-blue-950 hover:border-blue-700 shadow-[0_10px_25px_rgba(0,0,0,0.6),inset_0_4px_20px_rgba(0,0,0,0.9)] hover:shadow-[0_15px_35px_rgba(30,58,138,0.4)]'
          : isBusy
            ? 'bg-gradient-to-b from-[#047857] via-[#065f46] to-[#032017] border-2 sm:border-4 border-emerald-400 shadow-[0_15px_35px_rgba(16,185,129,0.4),inset_0_4px_20px_rgba(0,0,0,0.85)] ring-2 lg:ring-4 ring-emerald-500/40'
            : 'bg-gradient-to-b from-[#065f46] to-[#03241b] border-2 sm:border-4 border-emerald-950 hover:border-emerald-700 shadow-[0_10px_25px_rgba(0,0,0,0.6),inset_0_4px_20px_rgba(0,0,0,0.9)] hover:shadow-[0_15px_35px_rgba(6,78,59,0.4)]'
      }`}
    >
      {/* Tennis Stoli O'rta Oq Chizig'i */}
      {isTennis && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] lg:h-[3px] bg-white/25 pointer-events-none" />
      )}

      {/* Bilyard Burchak Luzalari (Katta 3D Pockets) */}
      {!isTennis && (
        <>
          <div className="absolute top-2 left-2 w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-black/80 border border-emerald-900 shadow-inner" />
          <div className="absolute top-2 right-2 w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-black/80 border border-emerald-900 shadow-inner" />
          <div className="absolute bottom-2 left-2 w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-black/80 border border-emerald-900 shadow-inner" />
          <div className="absolute bottom-2 right-2 w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-black/80 border border-emerald-900 shadow-inner" />
        </>
      )}

      {/* 1. YUQORI QISM: STOL NOMI VA HOLATI */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-1.5 mb-2 sm:mb-4">
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
            <span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl drop-shadow-md">
              {isTennis ? '🏓' : '🎱'}
            </span>
            <div className="truncate">
              <h3 className="font-black text-xs sm:text-base lg:text-xl xl:text-2xl text-white truncate drop-shadow-md tracking-tight uppercase leading-tight">
                {table.name}
              </h3>
              <span className="text-[10px] sm:text-xs lg:text-sm font-bold text-slate-200/80 drop-shadow-xs hidden sm:block">
                {isTennis ? 'Tennis Zali' : 'Bilyard Movuti'}
              </span>
            </div>
          </div>

          {/* Holat Nishoni */}
          <span
            className={`shrink-0 inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs lg:text-sm font-black shadow-lg ${
              isBusy
                ? isTennis
                  ? 'bg-blue-300 text-slate-950 ring-2 ring-blue-300/50'
                  : 'bg-emerald-300 text-slate-950 ring-2 ring-emerald-300/50'
                : 'bg-black/60 text-slate-200 border border-white/20 backdrop-blur-xs'
            }`}
          >
            {isBusy && (
              <span className="w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 rounded-full bg-slate-950 animate-ping" />
            )}
            {isBusy ? 'O\'YINDA' : 'BO\'SH'}
          </span>
        </div>
      </div>

      {/* 2. MARKAZ: KATTA MOVUT BLOKI VA GIGANT TAYMER / PUL */}
      <div className="relative z-10 flex-1 flex flex-col justify-center my-1 sm:my-3">
        {isBusy && calc && table.currentSession ? (
          <div className="w-full py-2.5 sm:py-5 lg:py-8 px-2 sm:px-4 rounded-xl sm:rounded-2xl bg-black/65 backdrop-blur-md border border-white/20 text-center shadow-[inset_0_4px_16px_rgba(0,0,0,0.7)] flex flex-col justify-center items-center">
            {/* GIGANT TAYMER (ZALNING HAR QANDAY BURCHAGIDAN KO'RINADI) */}
            <div className="font-mono text-lg sm:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black text-white tracking-wider sm:tracking-widest drop-shadow-[0_2px_14px_rgba(255,255,255,0.4)]">
              {formatDuration(calc.durationSeconds)}
            </div>

            {/* HAR SONIYA YANGILANUVCHI KATTA PUL */}
            <div className="w-full flex items-center justify-between mt-2 sm:mt-4 lg:mt-6 pt-1.5 sm:pt-3 border-t border-white/15 px-1 sm:px-2">
              <span className="text-slate-300 font-mono text-[10px] sm:text-xs lg:text-sm xl:text-base font-semibold">
                {formatTime(table.currentSession.startTime)} dan
              </span>
              <span
                className={`font-mono font-black text-xs sm:text-lg lg:text-2xl xl:text-3xl drop-shadow-lg ${
                  isTennis ? 'text-blue-300' : 'text-emerald-300'
                }`}
              >
                {formatMoney(calc.livePrice)}
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full py-3 sm:py-8 lg:py-12 px-2 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-xs border border-white/15 text-center shadow-[inset_0_4px_12px_rgba(0,0,0,0.6)] flex flex-col justify-center items-center">
            <span className="text-xs sm:text-xl lg:text-2xl xl:text-3xl font-black text-white font-mono block drop-shadow-md">
              {formatMoney(rate)}
            </span>
            <span className="text-[10px] sm:text-xs lg:text-sm text-slate-300 font-bold mt-1">
              soatlik stavka
            </span>
          </div>
        )}
      </div>

      {/* 3. PASTKI QISM: KATTA VA QULAY HARAKAT TUGMASI */}
      <div className="relative z-10 mt-1 sm:mt-2">
        {isBusy ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenSessionModal(table);
            }}
            className={`w-full h-10 sm:h-12 lg:h-14 xl:h-16 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm lg:text-base xl:text-lg flex items-center justify-center gap-2 text-white transition-all active:scale-95 cursor-pointer shadow-xl ${
              isTennis
                ? 'bg-blue-500 hover:bg-blue-400 text-slate-950 shadow-blue-900/60'
                : 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-emerald-950/60'
            }`}
          >
            <Receipt className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 stroke-[2.5]" />
            HISOBLASH
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onStart(table.id);
            }}
            className="w-full h-10 sm:h-12 lg:h-14 xl:h-16 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm lg:text-base xl:text-lg flex items-center justify-center gap-2 bg-black/65 hover:bg-black/85 active:bg-black text-white border border-white/25 transition-all active:scale-95 cursor-pointer shadow-lg"
          >
            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 fill-current" />
            BOSHLASH
          </button>
        )}
      </div>
    </div>
  );
};
