import React, { useState } from 'react';
import type { ClubSettings, RoundingStep } from '../types';
import { formatMoney } from '../lib/format';
import { Check, RotateCcw, Sliders } from 'lucide-react';

interface SettingsViewProps {
  settings: ClubSettings;
  onSave: (updated: Partial<ClubSettings>) => void;
  onReset: () => void;
}

const ROUNDING_OPTIONS: { label: string; value: RoundingStep }[] = [
  { label: '1 daq (Aniq)', value: 1 },
  { label: '5 daqiqa', value: 5 },
  { label: '10 daqiqa (Standart)', value: 10 },
  { label: '15 daqiqa', value: 15 },
  { label: '30 daqiqa', value: 30 },
];

/**
 * Oddiy va Qulay Sozlamalar Sahifasi
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
    if (window.confirm("Boshlang'ich narxlar (Bilyard: 40k, Tennis: 20k) tiklansinmi?")) {
      onReset();
      setBilliardRate(40000);
      setTennisRate(20000);
      setRounding(1);
    }
  };

  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl max-w-xl mx-auto text-white">
      {/* Sarlavha */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800 mb-5">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
          <Sliders className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-black text-white uppercase tracking-tight">
          Sozlamalar
        </h2>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* Bilyard soatlik narxi */}
        <div>
          <label className="block text-xs sm:text-sm font-bold text-slate-300 mb-2">
            🎱 Bilyard soatlik narxi (so'm)
          </label>
          <input
            type="number"
            min="0"
            step="1000"
            value={billiardRate}
            onChange={(e) => setBilliardRate(Math.max(0, Number(e.target.value)))}
            className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3.5 text-white font-mono font-black text-xl sm:text-2xl focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <div className="flex gap-2 mt-2">
            {[30000, 40000, 50000, 60000].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setBilliardRate(val)}
                className={`text-xs py-1.5 px-3 rounded-xl font-bold border transition-all cursor-pointer ${
                  billiardRate === val
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                }`}
              >
                {formatMoney(val)}
              </button>
            ))}
          </div>
        </div>

        {/* Tennis soatlik narxi */}
        <div>
          <label className="block text-xs sm:text-sm font-bold text-slate-300 mb-2">
            🏓 Tennis soatlik narxi (so'm)
          </label>
          <input
            type="number"
            min="0"
            step="1000"
            value={tennisRate}
            onChange={(e) => setTennisRate(Math.max(0, Number(e.target.value)))}
            className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3.5 text-white font-mono font-black text-xl sm:text-2xl focus:outline-none focus:border-sky-500 transition-colors"
          />
          <div className="flex gap-2 mt-2">
            {[15000, 20000, 25000, 30000].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setTennisRate(val)}
                className={`text-xs py-1.5 px-3 rounded-xl font-bold border transition-all cursor-pointer ${
                  tennisRate === val
                    ? 'bg-sky-500 text-slate-950 border-sky-400 font-black'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                }`}
              >
                {formatMoney(val)}
              </button>
            ))}
          </div>
        </div>

        {/* Yaxlitlash qadami */}
        <div>
          <label className="block text-xs sm:text-sm font-bold text-slate-300 mb-2">
            ⏱ Yaxlitlash qoidasi
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ROUNDING_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setRounding(opt.value)}
                className={`p-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-between transition-all cursor-pointer ${
                  rounding === opt.value
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{opt.label}</span>
                {rounding === opt.value && <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-1.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Saqlash tugmasi */}
        <div className="pt-2 space-y-2.5">
          <button
            type="submit"
            className="w-full h-12 sm:h-13 rounded-2xl font-black text-sm sm:text-base bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg shadow-emerald-950/50"
          >
            {savedNotice ? (
              <>
                <Check className="w-5 h-5 stroke-[2.5]" /> Saqlandi!
              </>
            ) : (
              'SOZLAMALARNI SAQLASH'
            )}
          </button>

          <button
            type="button"
            onClick={handleResetToDefaults}
            className="w-full py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Standart narxlarni tiklash (40k / 20k)
          </button>
        </div>
      </form>
    </div>
  );
};
