import React from 'react';
import { formatTime } from '../lib/format';
import type { ActiveTab } from './BottomNav';
import { LayoutGrid, Receipt, Settings } from 'lucide-react';

interface HeaderProps {
  currentTime: number;
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  activeCount: number;
  completedCount: number;
}

/**
 * Desktop & Mobile Responsive Header
 * Desktopda navigatsiya tugmalari yuqorida chiqadi, mobilda ixcham ko'rinadi
 */
export const Header: React.FC<HeaderProps> = ({
  currentTime,
  activeTab,
  onChangeTab,
  activeCount,
  completedCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#080c10]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between">
        {/* Chap qism: Logo va Nom */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🎱</span>
          <div>
            <h1 className="font-bold text-sm sm:text-base text-white tracking-tight leading-tight">
              Master Billiard
            </h1>
            <span className="hidden sm:inline-block text-[10px] text-slate-400">Club POS</span>
          </div>
        </div>

        {/* O'rta qism: Desktop Navigatsiya Tablari (md va undan katta ekranlar) */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => onChangeTab('tables')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'tables'
                ? 'bg-emerald-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Stollar</span>
            {activeCount > 0 && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  activeTab === 'tables'
                    ? 'bg-slate-950 text-emerald-400'
                    : 'bg-emerald-500 text-slate-950 animate-pulse'
                }`}
              >
                {activeCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onChangeTab('history')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'history'
                ? 'bg-emerald-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Kassa & Tarix</span>
            {completedCount > 0 && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeTab === 'history'
                    ? 'bg-slate-950 text-emerald-400'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {completedCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onChangeTab('settings')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-emerald-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Sozlamalar</span>
          </button>
        </nav>

        {/* O'ng qism: Jonli soat */}
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs sm:text-sm font-mono font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>
    </header>
  );
};
