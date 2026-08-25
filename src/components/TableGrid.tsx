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
 * Oddiy va responsive stollar to'plami
 */
export const TableGrid: React.FC<TableGridProps> = ({
  tables,
  settings,
  currentTime,
  onStartSession,
  onOpenSessionModal,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
