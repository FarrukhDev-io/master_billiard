import React, { useState } from 'react';
import type { Table, ClubSettings } from '../types';
import { calculateSessionDetails, getHourlyRate } from '../lib/pricing';
import { formatTime, formatDurationHuman, formatMoney } from '../lib/format';
import { X, Check, Trash2, ArrowLeft } from 'lucide-react';

interface SessionModalProps {
  table: Table | null;
  settings: ClubSettings;
  currentTime: number;
  isOpen: boolean;
  onClose: () => void;
  onFinish: (tableId: string) => void;
  onCancelSession: (tableId: string) => void;
}

/**
 * Ultra-Clean Hisob-Kitob Modali (Ortiqcha so'zlarsiz, sodda va tushunarli)
 */
export const SessionModal: React.FC<SessionModalProps> = ({
  table,
  settings,
  currentTime,
  isOpen,
  onClose,
  onFinish,
  onCancelSession,
}) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  if (!isOpen || !table || !table.currentSession) {
    return null;
  }

  const isTennis = table.type === 'tennis';
  const displayName = table.shortName || table.name.replace(/\s*\(.*?\)/, '');
  const rate = table.currentSession.hourlyRate || getHourlyRate(table.type, settings);
  const calculation = calculateSessionDetails(
    table.currentSession.startTime,
    currentTime,
    rate,
    settings.roundingMinutes
  );

  const handleFinish = () => {
    onFinish(table.id);
    onClose();
  };

  const handleCancel = () => {
    onCancelSession(table.id);
    setShowCancelConfirm(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#0f172a] border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl text-white max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile handle indicator */}
        <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{isTennis ? '🏓' : '🎱'}</span>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
              {displayName}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!showCancelConfirm ? (
          <div className="mt-4 space-y-4">
            {/* Katta To'lov Summasi */}
            <div className="rounded-2xl p-5 text-center bg-slate-950/90 border border-slate-800/90 shadow-inner">
              <span className="text-xs font-semibold text-slate-400 block mb-1">
                To'lov summasi
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 tracking-tight">
                {formatMoney(calculation.totalPrice)}
              </div>
            </div>

            {/* Qisqa va Aniq Tafsilotlar */}
            <div className="bg-slate-950/60 rounded-2xl p-4 space-y-3 text-xs sm:text-sm border border-slate-800/70">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">O'ynalgan vaqt:</span>
                <span className="font-mono text-white font-bold">
                  {formatDurationHuman(calculation.durationSeconds)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Oraliq:</span>
                <span className="font-mono text-slate-200">
                  {formatTime(table.currentSession.startTime)} — {formatTime(currentTime)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-800/70">
                <span className="text-slate-400 font-medium">Stavka:</span>
                <span className="font-mono text-slate-200 font-semibold">
                  {formatMoney(rate)} / soat
                </span>
              </div>
            </div>

            {/* Tugmalar */}
            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={handleFinish}
                className="w-full h-12 sm:h-13 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all active:scale-95 cursor-pointer shadow-lg shadow-emerald-950/50"
              >
                <Check className="w-5 h-5 stroke-[2.5]" />
                TO'LOVNI QABUL QILISH VA BO'SHATISH
              </button>

              <button
                type="button"
                onClick={() => setShowCancelConfirm(true)}
                className="w-full py-2 text-xs text-rose-400 hover:text-rose-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                To'lovsiz bekor qilish
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-rose-950/30 border border-rose-900/50 text-center space-y-3">
            <h3 className="font-bold text-sm sm:text-base text-rose-300">
              Sessiyani to'lovsiz bekor qilasizmi?
            </h3>
            <p className="text-xs text-slate-300">
              Stol bo'shatiladi va kassaga hisoblanmaydi.
            </p>
            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Ortga
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 h-10 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
