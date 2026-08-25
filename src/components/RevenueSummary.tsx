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
 * Kunlik Kassa Bloki (Revenue Summary)
 * 3 ta metrika: Bugungi tushum, Band stollar, Tugagan o'yinlar
 */
export const RevenueSummary: React.FC<RevenueSummaryProps> = ({
  todayRevenue,
  activeCount,
  totalTables,
  completedCount,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
      {/* 1. Bugungi Tushum */}
      <div className="bg-[#0f172a] border border-slate-800/80 rounded-xl p-3.5 flex items-center justify-between shadow-xs">
        <div>
          <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
            Bugungi tushum
          </span>
          <span className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono tracking-tight">
            {formatMoney(todayRevenue)}
          </span>
        </div>
        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
          <DollarSign className="w-4.5 h-4.5" />
        </div>
      </div>

      {/* 2. Band Stollar */}
      <div className="bg-[#0f172a] border border-slate-800/80 rounded-xl p-3.5 flex items-center justify-between shadow-xs">
        <div>
          <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
            Band stollar
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-bold text-amber-400 font-mono">
              {activeCount}
            </span>
            <span className="text-xs text-slate-400">/ {totalTables} ta</span>
          </div>
        </div>
        <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
          <Clock className="w-4.5 h-4.5" />
        </div>
      </div>

      {/* 3. Tugagan O'yinlar */}
      <div className="bg-[#0f172a] border border-slate-800/80 rounded-xl p-3.5 flex items-center justify-between shadow-xs">
        <div>
          <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
            Tugagan o'yinlar
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-bold text-sky-400 font-mono">
              {completedCount}
            </span>
            <span className="text-xs text-slate-400">ta sessiya</span>
          </div>
        </div>
        <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4.5 h-4.5" />
        </div>
      </div>
    </div>
  );
};
