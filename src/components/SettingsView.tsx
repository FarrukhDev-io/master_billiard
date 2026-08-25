import React, { useState } from 'react';
import type { ClubSettings, RoundingStep } from '../types';
import { formatMoney } from '../lib/format';
import { Check, RotateCcw, Sliders } from 'lucide-react';

interface SettingsViewProps {
  settings: ClubSettings;
  onSave: (updated: Partial<ClubSettings>) => void;
  onReset: () => void;
}

const ROUNDING_OPTIONS: { label: string; value: RoundingStep; desc: string }[] = [
  { label: '1 daq (Aniq hisob)', value: 1, desc: 'Har soniya real vaqtda hisoblanadi' },
  { label: '5 daqiqagacha', value: 5, desc: 'Har 5 daqiqagacha yuqoriga yaxlitlash' },
  { label: '10 daq (standart)', value: 10, desc: 'Har 10 daqiqagacha yuqoriga yaxlitlash' },
  { label: '15 daqiqagacha', value: 15, desc: 'Har 15 daqiqagacha yuqoriga yaxlitlash' },
  { label: '30 daqiqagacha', value: 30, desc: 'Yarim soatlik qadam bilan hisoblash' },
];

/**
 * Alohida Sozlamalar Sahifasi (Settings View)
 */
export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onSave,
  onReset,
}) => {
  const [billiardRate, setBilliardRate] = useState<number>(settings.billiardHourlyRate);
  const [tennisRate, setTennisRate] = useState<number>(settings.tennisHourlyRate);
  const [rounding, setRounding] = useState<RoundingStep>(settings.roundingMinutes);
  const [savedNotice, setSavedNotice] = useState(false);

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
    }, 1500);
  };

  const handleResetToDefaults = () => {
    if (window.confirm("Sozlamalarni standart holatga (Bilyard: 40k, Tennis: 20k) qaytarilsinmi?")) {
      onReset();
      setBilliardRate(40000);
      setTennisRate(20000);
      setRounding(1);
    }
  };

  return (
    <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-800/80 mb-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
          <Sliders className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white leading-tight">Klub Sozlamalari</h2>
          <p className="text-[11px] text-slate-400">Soatlik narxlar va vaqtni yaxlitlash qoidasi</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {/* Bilyard soatlik narxi */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            🎱 Bilyard soatlik narxi (so'm)
          </label>
          <input
            type="number"
            min="0"
            step="1000"
            value={billiardRate}
            onChange={(e) => setBilliardRate(Math.max(0, Number(e.target.value)))}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-white font-mono font-bold text-lg focus:outline-none focus:border-emerald-500"
          />
          <div className="flex gap-1.5 mt-2">
            {[30000, 40000, 50000, 60000].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setBilliardRate(val)}
                className={`text-[11px] py-1 px-2.5 rounded-lg font-medium border transition-colors cursor-pointer ${
                  billiardRate === val
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {formatMoney(val)}
              </button>
            ))}
          </div>
        </div>

        {/* Tennis soatlik narxi */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            🏓 Tennis soatlik narxi (so'm)
          </label>
          <input
            type="number"
            min="0"
            step="1000"
            value={tennisRate}
            onChange={(e) => setTennisRate(Math.max(0, Number(e.target.value)))}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-white font-mono font-bold text-lg focus:outline-none focus:border-sky-500"
          />
          <div className="flex gap-1.5 mt-2">
            {[15000, 20000, 25000, 30000].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setTennisRate(val)}
                className={`text-[11px] py-1 px-2.5 rounded-lg font-medium border transition-colors cursor-pointer ${
                  tennisRate === val
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 font-bold'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {formatMoney(val)}
              </button>
            ))}
          </div>
        </div>

        {/* Yaxlitlash qadami */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            ⏱ Vaqtni yaxlitlash qadami
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ROUNDING_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setRounding(opt.value)}
                className={`p-3 rounded-xl border text-left flex items-start justify-between transition-colors cursor-pointer ${
                  rounding === opt.value
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div>
                  <div className="text-xs">{opt.label}</div>
                  <div className="text-[10px] text-slate-400 font-normal mt-0.5">{opt.desc}</div>
                </div>
                {rounding === opt.value && <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2 mt-0.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Saqlash tugmasi */}
        <div className="pt-2 space-y-2">
          <button
            type="submit"
            className="w-full h-12 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
          >
            {savedNotice ? (
              <>
                <Check className="w-4 h-4" /> Sozlamalar Saqlandi!
              </>
            ) : (
              'Sozlamalarni Saqlash'
            )}
          </button>

          <button
            type="button"
            onClick={handleResetToDefaults}
            className="w-full py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Standart holatga qaytarish (40k / 20k)
          </button>
        </div>
      </form>
    </div>
  );
};
