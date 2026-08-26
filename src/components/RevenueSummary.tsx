import React from 'react';
import { formatMoney } from '../lib/format';
import { DollarSign, Clock, CheckCircle2 } from 'lucide-react';

interface RevenueSummaryProps {
  todayRevenue: number;
  activeCount: number;
  totalTables: number;
  completedCount: number;
}

/**
 * Kunlik Kassa Statistikasi (Compact 3-Card Row)
 */
export const RevenueSummary: React.FC<RevenueSummaryProps> = ({
  todayRevenue,
  activeCount,
  totalTables,
  completedCount,
}) => {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {/* 1. Bugungi Tushum */}
      <div className="bg-[#0f172a] border border-slate-800/80 rounded-xl p-2.5 sm:p-3.5 flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] sm:text-xs font-medium text-slate-400 truncate">
            Tushum
          </span>
          <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        </div>
        <span className="text-sm sm:text-xl font-bold text-emerald-400 font-mono tracking-tight truncate">
          {formatMoney(todayRevenue)}
        </span>
      </div>

      {/* 2. Band Stollar */}
      <div className="bg-[#0f172a] border border-slate-800/80 rounded-xl p-2.5 sm:p-3.5 flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] sm:text-xs font-medium text-slate-400 truncate">
            Band
          </span>
          <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-sm sm:text-xl font-bold text-amber-400 font-mono">
            {activeCount}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-400">/{totalTables}</span>
        </div>
      </div>

      {/* 3. Tugagan O'yinlar */}
      <div className="bg-[#0f172a] border border-slate-800/80 rounded-xl p-2.5 sm:p-3.5 flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] sm:text-xs font-medium text-slate-400 truncate">
            O'yinlar
          </span>
          <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
        </div>
        <span className="text-sm sm:text-xl font-bold text-sky-400 font-mono">
          {completedCount} ta
        </span>
      </div>
    </div>
  );
};
