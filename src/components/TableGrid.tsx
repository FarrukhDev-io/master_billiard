import React from 'react';
import type { Table, ClubSettings } from '../types';
import { TableCard } from './TableCard';

interface TableGridProps {
  tables: Table[];
  settings: ClubSettings;
  currentTime: number;
  onStartSession: (tableId: string) => void;
  onOpenSessionModal: (table: Table) => void;
}

/**
 * Mobile 2-Column & Desktop Hall Monitor 5-Column Full-Height Grid
 * - Mobilda: 2 ustunli ixcham mobil layout (grid-cols-2)
 * - Planshetda: 3 ustunli (sm:grid-cols-3)
 * - Katta Zal Monitorida: 5 ta gigant stollar butun ekranni to'liq egallaydi (lg:grid-cols-5 h-full)
 */
export const TableGrid: React.FC<TableGridProps> = ({
  tables,
  settings,
  currentTime,
  onStartSession,
  onOpenSessionModal,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-4 xl:gap-6 h-full items-stretch">
      {tables.map((table) => (
        <TableCard
          key={table.id}
          table={table}
          settings={settings}
          currentTime={currentTime}
          onStart={onStartSession}
          onOpenSessionModal={onOpenSessionModal}
        />
      ))}
    </div>
  );
};
