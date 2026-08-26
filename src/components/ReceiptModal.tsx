import React from 'react';
import type { CompletedSession } from '../types';
import { formatMoney, formatTime, formatDurationHuman, formatDateUz } from '../lib/format';
import { CheckCircle2, Printer, X, Share2 } from 'lucide-react';

interface ReceiptModalProps {
  receipt: CompletedSession | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Tayyor Elektron Chek Oynasi (Receipt Modal)
 * To'lov qabul qilingandan so'ng ekranga tushunarli chek chiqaradi
 */
export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  receipt,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !receipt) return null;

  const isTennis = receipt.tableType === 'tennis';
  const displayName = receipt.tableName.replace(/\s*\(.*?\)/, '');

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = async () => {
    const text = `🎱 MASTER BILLIARD CLUB CHEKI\n` +
      `--------------------------\n` +
      `Stol: ${displayName}\n` +
      `Sana: ${formatDateUz(receipt.endTime)}\n` +
      `Vaqt: ${formatTime(receipt.startTime)} - ${formatTime(receipt.endTime)}\n` +
      `O'ynaldi: ${formatDurationHuman(receipt.durationSeconds)}\n` +
      `Tarif: ${formatMoney(receipt.hourlyRate)}/soat\n` +
      `--------------------------\n` +
      `JAMI TO'LOV: ${formatMoney(receipt.totalPrice)}\n` +
      `Rahmat, yana kutamiz!`;

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      alert("Chek nusxalandi (Telegram yoki SMS orqali yuborishingiz mumkin)!");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-[#0f172a] border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl text-white relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Yopish tugmasi */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 1. Muvaffaqiyatli To'lov Belgisi */}
        <div className="text-center pt-2 pb-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-2.5">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
            To'lov Qabul Qilindi
          </span>
          <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mt-0.5">
            Master Billiard Club
          </h2>
        </div>

        {/* 2. Haqiqiy Chek Qog'ozi (Thermal Slip Style) */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 font-mono shadow-inner text-xs sm:text-sm">
          {/* Stol nomi */}
          <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
            <span className="text-slate-400 font-sans font-semibold">Stol:</span>
            <span className="font-black text-white text-sm sm:text-base flex items-center gap-1.5">
              <span>{isTennis ? '🏓' : '🎱'}</span>
              <span>{displayName}</span>
            </span>
          </div>

          {/* Sana */}
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-sans">Sana:</span>
            <span className="text-slate-200">{formatDateUz(receipt.endTime)}</span>
          </div>

          {/* Vaqt oralig'i */}
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-sans">Oraliq:</span>
            <span className="text-slate-200">
              {formatTime(receipt.startTime)} — {formatTime(receipt.endTime)}
            </span>
          </div>

          {/* Jami o'ynalgan vaqt */}
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-sans">O'ynaldi:</span>
            <span className="text-white font-bold">
              {formatDurationHuman(receipt.durationSeconds)}
            </span>
          </div>

          {/* Tarif */}
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-sans">Tarif:</span>
            <span className="text-slate-300">
              {formatMoney(receipt.hourlyRate)} / soat
            </span>
          </div>

          {/* Katta Jami Summa */}
          <div className="pt-3 border-t border-dashed border-slate-700 flex justify-between items-baseline">
            <span className="text-xs font-black uppercase text-slate-400 font-sans">
              JAMI TO'LOV:
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400 tracking-tight">
              {formatMoney(receipt.totalPrice)}
            </span>
          </div>
        </div>

        {/* 3. Harakat Tugmalari */}
        <div className="mt-5 space-y-2.5">
          <button
            type="button"
            onClick={onClose}
            className="w-full h-12 rounded-2xl font-black text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg shadow-emerald-950/50"
          >
            TAYYOR (YOPISH)
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Chop etish
            </button>
            <button
              type="button"
              onClick={handleCopyText}
              className="flex-1 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              Nusxa olish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
