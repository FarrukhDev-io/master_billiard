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
 * Haqiqiy Bilyard va Tennis Stoli Dizayni (Hyper-Realistic 3D Lounge Aesthetics)
 * - Yog'och bort va oltin burchak fitinglari
 * - 6 ta metall/teri burchak va yon luzalar
 * - Haqiqiy movut yashil baxmali va tennis setkasi
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
      className={`relative rounded-3xl p-2.5 sm:p-3 lg:p-4 transition-all duration-300 cursor-pointer select-none flex flex-col justify-between active:scale-[0.985] overflow-hidden h-full ${
        isTennis
          ? isBusy
            ? 'bg-gradient-to-b from-[#1e3a5f] via-[#0f2238] to-[#091524] border-[6px] lg:border-[10px] border-[#2b4c7e] shadow-[0_20px_50px_rgba(37,99,235,0.4),inset_0_4px_25px_rgba(0,0,0,0.9)] ring-2 lg:ring-4 ring-blue-500/50'
            : 'bg-gradient-to-b from-[#1a2d42] via-[#0f1d2c] to-[#070e17] border-[6px] lg:border-[10px] border-[#16273b] hover:border-blue-700 shadow-[0_12px_35px_rgba(0,0,0,0.8),inset_0_4px_25px_rgba(0,0,0,0.95)] hover:shadow-[0_20px_45px_rgba(29,53,87,0.5)]'
          : isBusy
            ? 'bg-gradient-to-b from-[#223a2b] via-[#14261b] to-[#0a150e] border-[6px] lg:border-[10px] border-[#2e503b] shadow-[0_20px_50px_rgba(16,185,129,0.4),inset_0_4px_25px_rgba(0,0,0,0.9)] ring-2 lg:ring-4 ring-emerald-500/50'
            : 'bg-gradient-to-b from-[#1c2e23] via-[#101e16] to-[#08120c] border-[6px] lg:border-[10px] border-[#192f22] hover:border-emerald-700 shadow-[0_12px_35px_rgba(0,0,0,0.8),inset_0_4px_25px_rgba(0,0,0,0.95)] hover:shadow-[0_20px_45px_rgba(6,78,59,0.5)]'
      }`}
    >
      {/* 🎱 BILYARD: 6 TA METALL VA TERI LUZALARI (POCKETS) VA OLTI BURCHAK OLTIN BALKLAR */}
      {!isTennis && (
        <>
          {/* 4 ta burchak luzalari (Brass Rim Pockets) */}
          <div className="absolute top-1 left-1 w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-black border-2 border-amber-600/90 shadow-[inset_0_3px_8px_rgba(0,0,0,1)] z-20" />
          <div className="absolute top-1 right-1 w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-black border-2 border-amber-600/90 shadow-[inset_0_3px_8px_rgba(0,0,0,1)] z-20" />
          <div className="absolute bottom-1 left-1 w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-black border-2 border-amber-600/90 shadow-[inset_0_3px_8px_rgba(0,0,0,1)] z-20" />
          <div className="absolute bottom-1 right-1 w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-black border-2 border-amber-600/90 shadow-[inset_0_3px_8px_rgba(0,0,0,1)] z-20" />

          {/* 2 ta o'rta yon luzalari (Side Pockets) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0.5 w-3 h-4 lg:w-4 lg:h-6 rounded-r-full bg-black border-2 border-amber-600/90 shadow-[inset_0_3px_8px_rgba(0,0,0,1)] z-20" />
          <div className="absolute top-1/2 -translate-y-1/2 right-0.5 w-3 h-4 lg:w-4 lg:h-6 rounded-l-full bg-black border-2 border-amber-600/90 shadow-[inset_0_3px_8px_rgba(0,0,0,1)] z-20" />

          {/* Bortdagi Oltin Olmos Nuqtalar (Cushion Diamond Sights) */}
          <div className="absolute top-0.5 left-1/3 w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-xs hidden lg:block" />
          <div className="absolute top-0.5 right-1/3 w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-xs hidden lg:block" />
          <div className="absolute bottom-0.5 left-1/3 w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-xs hidden lg:block" />
          <div className="absolute bottom-0.5 right-1/3 w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-xs hidden lg:block" />
        </>
      )}

      {/* 🏓 TENNIS: SETKA VA MAYDON CHIZIQLARI */}
      {isTennis && (
        <>
          {/* Maydon oq ramkasi */}
          <div className="absolute inset-1.5 border border-white/40 rounded-2xl pointer-events-none" />
          {/* O'rta vertikal oq juftlik chizig'i */}
          <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-[2px] bg-white/45 pointer-events-none" />
          {/* Haqiqiy Gorizontal Setka (Net across table center) */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2.5 lg:h-3.5 bg-slate-950/95 border-y border-white/80 shadow-md flex items-center justify-between px-1 z-20 pointer-events-none">
            <span className="w-1.5 h-3 lg:h-4 bg-slate-400 rounded-xs shadow-xs -ml-1" />
            <span className="w-1.5 h-3 lg:h-4 bg-slate-400 rounded-xs shadow-xs -mr-1" />
          </div>
        </>
      )}

      {/* ICHKI MOVUT MATOSI (FELT CLOTH CONTAINER) */}
      <div
        className={`relative rounded-2xl p-2.5 sm:p-3.5 lg:p-4 flex-1 flex flex-col justify-between overflow-hidden shadow-[inset_0_4px_30px_rgba(0,0,0,0.85)] ${
          isTennis
            ? isBusy
              ? 'bg-gradient-to-b from-[#1d4ed8] via-[#1e3a8a] to-[#0f172a]'
              : 'bg-gradient-to-b from-[#1e3a8a] via-[#172554] to-[#0d172e]'
            : isBusy
              ? 'bg-gradient-to-b from-[#059669] via-[#047857] to-[#022c1e]'
              : 'bg-gradient-to-b from-[#047857] via-[#065f46] to-[#02281a]'
        }`}
      >
        {/* Chiroq yorug'ligi nuri (Overhead Table Lamp Spotlight) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.18),transparent_65%)] pointer-events-none" />

        {/* 1. YUQORI QISM: STOL NOMI VA HOLATI */}
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="text-xl sm:text-2xl lg:text-3xl drop-shadow-md">
                {isTennis ? '🏓' : '🎱'}
              </span>
              <h3 className="font-black text-sm sm:text-base lg:text-xl xl:text-2xl text-white tracking-tight uppercase leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap">
                {displayName}
              </h3>
            </div>

            {/* Holat Nishoni */}
            <span
              className={`shrink-0 inline-flex items-center gap-1 px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-full text-[10px] sm:text-xs font-black shadow-lg ${
                isBusy
                  ? isTennis
                    ? 'bg-blue-300 text-slate-950 ring-2 ring-blue-300/50'
                    : 'bg-emerald-300 text-slate-950 ring-2 ring-emerald-300/50'
                  : 'bg-black/60 text-slate-200 border border-white/25 backdrop-blur-xs'
              }`}
            >
              {isBusy && (
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
              )}
              {isBusy ? 'BAND' : 'BO\'SH'}
            </span>
          </div>
        </div>

        {/* 2. MARKAZ: GIGANT TAYMER VA PUL */}
        <div className="relative z-10 flex-1 flex flex-col justify-center my-2 sm:my-3">
          {isBusy && calc && table.currentSession ? (
            <div className="w-full h-full py-2.5 sm:py-5 lg:py-7 px-2 sm:px-3 rounded-xl lg:rounded-2xl bg-black/75 backdrop-blur-md border border-white/20 text-center shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)] flex flex-col justify-center items-center">
              {/* GIGANT MONOSPACE TAYMER */}
              <div className="font-mono text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-wider sm:tracking-widest drop-shadow-[0_2px_15px_rgba(255,255,255,0.4)]">
                {formatDuration(calc.durationSeconds)}
              </div>

              {/* HAR SONIYA YANGILANUVCHI PUL */}
              <div className="w-full flex items-center justify-between mt-2 sm:mt-4 lg:mt-5 pt-2 border-t border-white/15 px-1">
                <span className="text-slate-300 font-mono text-[10px] sm:text-xs font-semibold">
                  {formatTime(table.currentSession.startTime)} dan
                </span>
                <span
                  className={`font-mono font-black text-xs sm:text-base lg:text-xl xl:text-2xl drop-shadow-md ${
                    isTennis ? 'text-blue-300' : 'text-emerald-300'
                  }`}
                >
                  {formatMoney(calc.livePrice)}
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full h-full py-4 sm:py-8 lg:py-10 px-2 rounded-xl lg:rounded-2xl bg-black/50 backdrop-blur-xs border border-white/15 text-center shadow-[inset_0_4px_16px_rgba(0,0,0,0.7)] flex flex-col justify-center items-center">
              <span className="text-sm sm:text-xl lg:text-3xl font-black text-white font-mono block drop-shadow-md">
                {formatMoney(rate)}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-200/90 font-bold mt-0.5">
                soatlik narx
              </span>
            </div>
          )}
        </div>

        {/* 3. PASTKI HARAKAT TUGMASI */}
        <div className="relative z-10 mt-1">
          {isBusy ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenSessionModal(table);
              }}
              className={`w-full h-10 sm:h-12 lg:h-13 rounded-xl lg:rounded-2xl font-black text-xs sm:text-sm lg:text-base flex items-center justify-center gap-1.5 text-white transition-all active:scale-95 cursor-pointer shadow-xl ${
                isTennis
                  ? 'bg-blue-400 hover:bg-blue-300 text-slate-950 shadow-blue-950/60'
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
              className="w-full h-10 sm:h-12 lg:h-13 rounded-xl lg:rounded-2xl font-black text-xs sm:text-sm lg:text-base flex items-center justify-center gap-1.5 bg-black/75 hover:bg-black/95 active:bg-black text-white border border-white/30 transition-all active:scale-95 cursor-pointer shadow-lg"
            >
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              BOSHLASH
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
