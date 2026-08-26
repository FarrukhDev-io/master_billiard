import React, { useState, useEffect } from 'react';
import { formatTime } from '../lib/format';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import type { ActiveTab } from './BottomNav';
import { LayoutGrid, Receipt, Settings, Maximize, Minimize, WifiOff } from 'lucide-react';

interface HeaderProps {
  currentTime: number;
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  activeCount: number;
  completedCount: number;
}

/**
 * Responsive Header with Fullscreen, Navigation and Offline Indicator
 */
export const Header: React.FC<HeaderProps> = ({
  currentTime,
  activeTab,
  onChangeTab,
  activeCount,
  completedCount,
}) => {
  const isOnline = useOnlineStatus();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#080c10]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-13 sm:h-14 flex items-center justify-between">
        {/* Chap: Logo va Offline belgisi */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl drop-shadow-sm">🎱</span>
            <div>
              <h1 className="font-extrabold text-sm sm:text-base text-white tracking-tight leading-tight">
                Master Billiard
              </h1>
              <span className="hidden sm:inline-block text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">
                Club POS
              </span>
            </div>
          </div>

          {/* Tarmoqsiz (Offline) holat ko'rsatkichi */}
          {!isOnline && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] sm:text-xs font-bold animate-pulse">
              <WifiOff className="w-3 h-3" />
              <span>Offline</span>
            </div>
          )}
        </div>

        {/* O'rta: Desktop Tablar */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => onChangeTab('tables')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'tables'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Stollar (Zal)</span>
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
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
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
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Sozlamalar</span>
          </button>
        </nav>

        {/* O'ng: Fullscreen Tugmasi va Jonli Soat */}
        <div className="flex items-center gap-2">
          {/* Fullscreen Tugmasi */}
          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? "To'liq ekrandan chiqish" : "To'liq ekranga o'tish"}
            className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            {isFullscreen ? (
              <Minimize className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Maximize className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Jonli Soat */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs sm:text-sm font-mono font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{formatTime(currentTime)}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
