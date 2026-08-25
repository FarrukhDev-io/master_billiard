import React, { useState } from 'react';
import type { Table, ClubSettings } from '../types';
import { calculateSessionDetails, getHourlyRate } from '../lib/pricing';
import { formatTime, formatDuration, formatDurationHuman, formatMoney } from '../lib/format';
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
 * Mobilga mos, oddiy va tushunarli hisob-kitob oynasi (Bottom Sheet / Modal)
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      {/* Bottom Sheet Card */}
      <div
        className="w-full max-w-md bg-slate-900 border-t sm:border border-slate-800 rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl text-white max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile handle indicator */}
        <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">{isTennis ? '🏓' : '🎱'}</span>
            <h2 className="text-lg font-bold text-white">{table.name}</h2>
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
            {/* Asosiy to'lov summasi */}
            <div className="rounded-xl p-4 text-center bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">
                Jami to'lov summasi
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400">
                {formatMoney(calculation.totalPrice)}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {calculation.roundedMinutes} daqiqaga hisoblandi ({settings.roundingMinutes} daqiqa yaxlitlash qoidasi)
              </p>
            </div>

            {/* Tafsilotlar */}
            <div className="bg-slate-950/70 rounded-xl p-3.5 space-y-2.5 text-xs border border-slate-800/80">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">⏱ Boshlangan vaqt:</span>
                <span className="font-mono text-slate-200 font-medium">
                  {formatTime(table.currentSession.startTime)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">⏱ Hozirgi vaqt:</span>
                <span className="font-mono text-slate-200 font-medium">
                  {formatTime(currentTime)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">⏳ Haqiqiy o'ynalgan vaqt:</span>
                <span className="font-mono text-white font-bold">
                  {formatDuration(calculation.durationSeconds)} ({formatDurationHuman(calculation.durationSeconds)})
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-slate-300">
                <span className="text-slate-400">🔢 Yaxlitlangan vaqt:</span>
                <span className="font-mono font-semibold text-emerald-300">
                  {calculation.roundedMinutes} daqiqa
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">💵 Soatlik stavka:</span>
                <span className="font-mono font-medium">
                  {formatMoney(rate)} / soat
                </span>
              </div>
            </div>

            {/* Tugmalar */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleFinish}
                className="w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white transition-colors cursor-pointer shadow-md"
              >
                <Check className="w-4 h-4" />
                Hisoblash va Bo'shatish
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full h-10 rounded-xl font-medium text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                Davom etmoqda (Oynani yopish)
              </button>

              <button
                type="button"
                onClick={() => setShowCancelConfirm(true)}
                className="w-full py-1.5 text-[11px] text-rose-400 hover:text-rose-300 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                To'lovsiz bekor qilish
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 text-center space-y-3">
            <h3 className="font-bold text-sm text-rose-300">
              Sessiyani to'lovsiz bekor qilasizmi?
            </h3>
            <p className="text-xs text-slate-300">
              O'yin to'xtatiladi va kassaga hisoblanmaydi.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 h-10 rounded-lg bg-slate-800 text-slate-200 text-xs font-medium flex items-center justify-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Ortga
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 h-10 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Ha, bekor qilish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
