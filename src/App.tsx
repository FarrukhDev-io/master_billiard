import { useState } from 'react';
import { useSettings } from './hooks/useSettings';
import { useTables } from './hooks/useTables';
import { useLiveTimer } from './hooks/useLiveTimer';
import { Header } from './components/Header';
import { RevenueSummary } from './components/RevenueSummary';
import { TableGrid } from './components/TableGrid';
import { SessionLog } from './components/SessionLog';
import { SessionModal } from './components/SessionModal';
import { SettingsView } from './components/SettingsView';
import { BottomNav, type ActiveTab } from './components/BottomNav';
import type { Table } from './types';

/**
 * Master Billiard - Ultra Clean & Minimalist POS
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

  const [activeTab, setActiveTab] = useState<ActiveTab>('tables');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);

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
    <div className="min-h-screen bg-[#080c10] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 pb-20">
      {/* Yuqori Panel */}
      <Header currentTime={currentTime} />

      {/* Asosiy Maydon */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-2.5 sm:px-4 py-2.5 sm:py-3.5 space-y-3">
        {/* 1-SAHIFA: FAQAT STOLLAR (2-USTUNLI MOBIL GRID) */}
        {activeTab === 'tables' && (
          <section aria-label="Stollar ro'yxati">
            <TableGrid
              tables={tables}
              settings={settings}
              currentTime={currentTime}
              onStartSession={startSession}
              onOpenSessionModal={handleOpenSessionModal}
            />
          </section>
        )}

        {/* 2-SAHIFA: KASSA VA TARIX */}
        {activeTab === 'history' && (
          <div className="space-y-3">
            <section aria-label="Hisobot paneli">
              <RevenueSummary
                todayRevenue={todayRevenue}
                activeCount={activeTablesCount}
                totalTables={tables.length}
                completedCount={todaySessions.length}
              />
            </section>

            <section aria-label="Sessiyalar tarixi">
              <SessionLog
                sessions={todaySessions}
                onClearHistory={clearTodayHistory}
              />
            </section>
          </div>
        )}

        {/* 3-SAHIFA: SOZLAMALAR */}
        {activeTab === 'settings' && (
          <section aria-label="Sozlamalar paneli">
            <SettingsView
              settings={settings}
              onSave={updateSettings}
              onReset={resetSettings}
            />
          </section>
        )}
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

      {/* Pastki Navigatsiya Paneli */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        activeCount={activeTablesCount}
        completedCount={todaySessions.length}
      />
    </div>
  );
}

export default App;
