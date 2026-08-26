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
 * Mobile-First 2-Column & Desktop 5-Column Responsive Stollar To'plami
 * Mobile: grid-cols-2
 * Tablet: sm:grid-cols-3
 * Desktop: lg:grid-cols-5 (Barcha 5 ta stol bitta chiroyli qatorda)
 */
export const TableGrid: React.FC<TableGridProps> = ({
  tables,
  settings,
  currentTime,
  onStartSession,
  onOpenSessionModal,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5 lg:gap-4">
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
