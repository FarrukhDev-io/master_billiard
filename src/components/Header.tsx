import React from 'react';
import { formatTime } from '../lib/format';
import { Settings } from 'lucide-react';

interface HeaderProps {
  currentTime: number;
  onOpenSettings: () => void;
}

/**
 * Yuqori Panel (Sticky Header — 56px)
 * Chapda: 🎱 Master Billiard + PRO nishoni
 * O'ngda: Jonli soat vidjeti + Sozlamalar tugmasi
 */
export const Header: React.FC<HeaderProps> = ({
  currentTime,
  onOpenSettings,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#080c10]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-4 h-14 flex items-center justify-between">
        {/* Chap qism: Logo va Nom */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600/90 flex items-center justify-center text-base shadow-sm">
            🎱
          </div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-bold text-base text-white tracking-tight leading-none">
              Master Billiard
            </h1>
            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 leading-none">
              PRO
            </span>
          </div>
        </div>

        {/* O'ng qism: Soat va Sozlamalar */}
        <div className="flex items-center gap-2">
          {/* Jonli soat */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{formatTime(currentTime)}</span>
          </div>

          {/* Sozlamalar tugmasi */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 active:scale-95 border border-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Sozlamalar"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
