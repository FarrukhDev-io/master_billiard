import React, { useState } from 'react';
import type { ClubSettings, RoundingStep } from '../types';
import { formatMoney } from '../lib/format';
import { X, Check, RotateCcw } from 'lucide-react';

interface SettingsModalProps {
  settings: ClubSettings;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Partial<ClubSettings>) => void;
  onReset: () => void;
}

const ROUNDING_OPTIONS: { label: string; value: RoundingStep }[] = [
  { label: '5 daq', value: 5 },
  { label: '10 daq (standart)', value: 10 },
  { label: '15 daq', value: 15 },
  { label: '30 daq', value: 30 },
];

/**
 * Oddiy va qulay Sozlamalar modali
 */
export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  isOpen,
  onClose,
  onSave,
  onReset,
}) => {
  const [billiardRate, setBilliardRate] = useState<number>(settings.billiardHourlyRate);
  const [tennisRate, setTennisRate] = useState<number>(settings.tennisHourlyRate);
  const [rounding, setRounding] = useState<RoundingStep>(settings.roundingMinutes);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      billiardHourlyRate: billiardRate,
      tennisHourlyRate: tennisRate,
      roundingMinutes: rounding,
    });
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 350);
  };

  const handleResetToDefaults = () => {
    onReset();
    setBilliardRate(50000);
    setTennisRate(35000);
    setRounding(10);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-slate-900 border-t sm:border border-slate-800 rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl text-white max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-base font-bold text-white">Sozlamalar</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4">
          {/* Bilyard narxi */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              🎱 Bilyard soatlik narxi (so'm)
            </label>
            <input
              type="number"
              min="0"
              step="1000"
              value={billiardRate}
              onChange={(e) => setBilliardRate(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-white font-mono font-bold text-base focus:outline-none focus:border-emerald-500"
            />
            <div className="flex gap-1.5 mt-1.5">
              {[40000, 50000, 60000, 80000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setBilliardRate(val)}
                  className={`text-[10px] py-1 px-2 rounded font-medium border transition-colors cursor-pointer ${
                    billiardRate === val
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {formatMoney(val)}
                </button>
              ))}
            </div>
          </div>

          {/* Tennis narxi */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              🏓 Tennis soatlik narxi (so'm)
            </label>
            <input
              type="number"
              min="0"
              step="1000"
              value={tennisRate}
              onChange={(e) => setTennisRate(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-white font-mono font-bold text-base focus:outline-none focus:border-emerald-500"
            />
            <div className="flex gap-1.5 mt-1.5">
              {[25000, 35000, 40000, 50000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setTennisRate(val)}
                  className={`text-[10px] py-1 px-2 rounded font-medium border transition-colors cursor-pointer ${
                    tennisRate === val
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {formatMoney(val)}
                </button>
              ))}
            </div>
          </div>

          {/* Yaxlitlash */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              ⏱ Yaxlitlash qadami
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {ROUNDING_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setRounding(opt.value)}
                  className={`p-2.5 rounded-lg border text-xs font-medium text-left flex items-center justify-between transition-colors cursor-pointer ${
                    rounding === opt.value
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <span>{opt.label}</span>
                  {rounding === opt.value && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Saqlash tugmasi */}
          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full h-11 rounded-lg font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {savedNotice ? (
                <>
                  <Check className="w-4 h-4" /> Saqlandi!
                </>
              ) : (
                'Saqlash'
              )}
            </button>

            <button
              type="button"
              onClick={handleResetToDefaults}
              className="w-full py-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Boshlang'ich holatga qaytarish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
