import React from 'react';
import { LayoutGrid, Receipt, Settings } from 'lucide-react';

export type ActiveTab = 'tables' | 'history' | 'settings';

interface BottomNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  activeCount: number;
  completedCount: number;
}

/**
 * Pastki Navigatsiya Paneli (Faqat Mobil uchun, Desktopda yashiriladi)
 */
export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  activeCount,
  completedCount,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#080c10]/95 backdrop-blur-lg border-t border-slate-800/90 py-1.5 px-4 safe-area-bottom md:hidden">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-1">
        {/* 1. Stollar */}
        <button
          type="button"
          onClick={() => onChangeTab('tables')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all cursor-pointer relative ${
            activeTab === 'tables'
              ? 'text-emerald-400 font-bold bg-emerald-500/10'
              : 'text-slate-400 hover:text-slate-200 active:scale-95'
          }`}
        >
          <div className="relative">
            <LayoutGrid className="w-5 h-5 mb-0.5" />
            {activeCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black flex items-center justify-center animate-pulse">
                {activeCount}
              </span>
            )}
          </div>
          <span className="text-[11px] leading-tight">Stollar</span>
        </button>

        {/* 2. Kassa va Tarix */}
        <button
          type="button"
          onClick={() => onChangeTab('history')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all cursor-pointer relative ${
            activeTab === 'history'
              ? 'text-emerald-400 font-bold bg-emerald-500/10'
              : 'text-slate-400 hover:text-slate-200 active:scale-95'
          }`}
        >
          <div className="relative">
            <Receipt className="w-5 h-5 mb-0.5" />
            {completedCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-slate-700 text-slate-200 text-[10px] font-bold flex items-center justify-center">
                {completedCount}
              </span>
            )}
          </div>
          <span className="text-[11px] leading-tight">Kassa / Tarix</span>
        </button>

        {/* 3. Sozlamalar */}
        <button
          type="button"
          onClick={() => onChangeTab('settings')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'settings'
              ? 'text-emerald-400 font-bold bg-emerald-500/10'
              : 'text-slate-400 hover:text-slate-200 active:scale-95'
          }`}
        >
          <Settings className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] leading-tight">Sozlamalar</span>
        </button>
      </div>
    </nav>
  );
};
