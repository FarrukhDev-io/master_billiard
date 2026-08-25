import { useState } from 'react';
import { useSettings } from './hooks/useSettings';
import { useTables } from './hooks/useTables';
import { useLiveTimer } from './hooks/useLiveTimer';
import { Header } from './components/Header';
import { RevenueSummary } from './components/RevenueSummary';
import { TableGrid } from './components/TableGrid';
import { SessionLog } from './components/SessionLog';
import { SessionModal } from './components/SessionModal';
import { SettingsModal } from './components/SettingsModal';
import type { Table } from './types';

/**
 * Asosiy ilova - Simple UI, Mobile-first & Full Responsive
 */
export function App() {
  const { settings, updateSettings, resetSettings } = useSettings();
  const {
    tables,
    todaySessions,
    todayRevenue,
    activeTablesCount,
    startSession,
    finishSession,
    cancelSession,
    clearTodayHistory,
  } = useTables(settings);

  const currentTime = useLiveTimer(true);

  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handleOpenSessionModal = (table: Table) => {
    setSelectedTable(table);
    setIsSessionModalOpen(true);
  };

  const handleCloseSessionModal = () => {
    setIsSessionModalOpen(false);
    setSelectedTable(null);
  };

  const currentModalTable = selectedTable
    ? tables.find((t) => t.id === selectedTable.id) || null
    : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 pb-10">
      {/* Yuqori Panel */}
      <Header
        currentTime={currentTime}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />

      {/* Asosiy Ish Maydoni */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-4 py-4 space-y-4 sm:space-y-5">
        {/* 1. Kunlik Tushum va Statistika */}
        <section aria-label="Hisobot paneli">
          <RevenueSummary
            todayRevenue={todayRevenue}
            activeCount={activeTablesCount}
            totalTables={tables.length}
            completedCount={todaySessions.length}
          />
        </section>

        {/* 2. Stollar Ro'yxati */}
        <section className="space-y-2.5" aria-label="Stollar ro'yxati">
          <div className="flex items-center justify-between px-0.5">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
              Stollar ({tables.length} ta)
            </h2>
            <span className="text-[11px] text-slate-500">
              Boshlash uchun stolni bosing
            </span>
          </div>

          <TableGrid
            tables={tables}
            settings={settings}
            currentTime={currentTime}
            onStartSession={startSession}
            onOpenSessionModal={handleOpenSessionModal}
          />
        </section>

        {/* 3. Bugungi Sessiyalar Tarixi */}
        <section aria-label="Sessiyalar tarixi">
          <SessionLog
            sessions={todaySessions}
            onClearHistory={clearTodayHistory}
          />
        </section>
      </main>

      {/* Sessiya hisob-kitob modali (Bottom Sheet) */}
      <SessionModal
        table={currentModalTable}
        settings={settings}
        currentTime={currentTime}
        isOpen={isSessionModalOpen}
        onClose={handleCloseSessionModal}
        onFinish={finishSession}
        onCancelSession={cancelSession}
      />

      {/* Sozlamalar modali */}
      <SettingsModal
        settings={settings}
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onSave={updateSettings}
        onReset={resetSettings}
      />
    </div>
  );
}

export default App;
