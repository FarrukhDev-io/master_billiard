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
 * Mobile 2-Column & Desktop 3-Column Responsive Grid
 * Mobilda: grid-cols-2
 * Desktopda: grid-cols-3 (Har bir stol katta va keng formatda)
 */
export const TableGrid: React.FC<TableGridProps> = ({
  tables,
  settings,
  currentTime,
  onStartSession,
  onOpenSessionModal,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4 lg:gap-5">
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
