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
 * Mobile-First 2-Column Responsive Stollar To'plami
 */
export const TableGrid: React.FC<TableGridProps> = ({
  tables,
  settings,
  currentTime,
  onStartSession,
  onOpenSessionModal,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
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
