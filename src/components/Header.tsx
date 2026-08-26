import React from 'react';
import { formatTime } from '../lib/format';

interface HeaderProps {
  currentTime: number;
}

/**
 * Clean & Minimalist Header (Ortiqcha elementlarsiz)
 */
export const Header: React.FC<HeaderProps> = ({ currentTime }) => {
  return (
    <header className="sticky top-0 z-30 bg-[#080c10]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 h-12 flex items-center justify-between">
        {/* Chap qism: Logo va Nom */}
        <div className="flex items-center gap-1.5">
          <span className="text-lg">🎱</span>
          <h1 className="font-bold text-sm sm:text-base text-white tracking-tight leading-none">
            Master Billiard
          </h1>
        </div>

        {/* O'ng qism: Jonli soat */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>
    </header>
  );
};
