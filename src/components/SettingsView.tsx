import React, { useState } from 'react';
import type { ClubSettings, RoundingStep } from '../types';
import { formatMoney } from '../lib/format';
import { Check, Trash2, Clock, ShieldCheck } from 'lucide-react';

interface SettingsViewProps {
  settings: ClubSettings;
  onSave: (updated: Partial<ClubSettings>) => void;
  onReset: () => void;
  onClearHistory?: () => void;
}

const ROUNDING_OPTIONS: { label: string; value: RoundingStep; desc: string }[] = [
  { label: '1 daq (Aniq)', value: 1, desc: 'Sekundma-sekund aniq hisob' },
  { label: '5 daqiqagacha', value: 5, desc: 'Har 5 daqiqaga yaxlitlash' },
  { label: '10 daqiqa (Standart)', value: 10, desc: 'Har 10 daqiqaga yaxlitlash' },
  { label: '15 daqiqagacha', value: 15, desc: 'Har 15 daqiqaga yaxlitlash' },
  { label: '30 daqiqagacha', value: 30, desc: 'Yarim soatlik qadam bilan' },
];

/**
 * Super Clean & Minimalist Sozlamalar
 */
export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onSave,
  onClearHistory,
}) => {
  const [rounding, setRounding] = useState<RoundingStep>(settings.roundingMinutes);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSelectRounding = (val: RoundingStep) => {
    setRounding(val);
    onSave({ roundingMinutes: val });
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
    }, 1200);
  };

  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl max-w-xl mx-auto text-white space-y-6">
      {/* 1. Doimiy Klub Narxlari (O'zgarmas stavkalar) */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-black text-white uppercase tracking-tight">
            Klub Tariflari (O'zgarmas)
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-950/80 border border-emerald-950/80 rounded-2xl p-4 text-center">
            <span className="text-2xl block mb-1">🎱</span>
            <span className="text-xs text-slate-400 font-bold block">Bilyard</span>
            <span className="text-base sm:text-xl font-black font-mono text-emerald-400">
              {formatMoney(settings.billiardHourlyRate)}
            </span>
            <span className="text-[10px] text-slate-500 block">/ soat</span>
          </div>

          <div className="bg-slate-950/80 border border-blue-950/80 rounded-2xl p-4 text-center">
            <span className="text-2xl block mb-1">🏓</span>
            <span className="text-xs text-slate-400 font-bold block">Tennis</span>
            <span className="text-base sm:text-xl font-black font-mono text-blue-400">
              {formatMoney(settings.tennisHourlyRate)}
            </span>
            <span className="text-[10px] text-slate-500 block">/ soat</span>
          </div>
        </div>
      </div>

      {/* 2. Yaxlitlash Qoidasi */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-black text-white uppercase tracking-tight">
              Vaqtni Yaxlitlash Qoidasi
            </h3>
          </div>
          {savedNotice && (
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 animate-fade-in">
              <Check className="w-3.5 h-3.5" /> Saqlandi
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ROUNDING_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleSelectRounding(opt.value)}
              className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                rounding === opt.value
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-black shadow-md'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="text-xs sm:text-sm font-bold">{opt.label}</div>
                <div className="text-[10px] text-slate-400 font-normal">{opt.desc}</div>
              </div>
              {rounding === opt.value && <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Kassani Tozalash (Yangi kunni boshlash) */}
      {onClearHistory && (
        <div className="pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Bugungi barcha kassa va cheklar tarixini tozalab yangi kunni boshlamoqchimisiz?")) {
                onClearHistory();
              }
            }}
            className="w-full h-11 rounded-2xl text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 border border-rose-900/40 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            Bugungi kassa tarixini tozalash
          </button>
        </div>
      )}
    </div>
  );
};
