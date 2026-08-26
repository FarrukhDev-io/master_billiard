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
 * Master Billiard - Mobile & Desktop Responsive POS
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
    <div className="min-h-screen bg-[#080c10] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 pb-20 md:pb-10">
      {/* Yuqori Panel (Desktopda navigatsiya tugmalari bilan) */}
      <Header
        currentTime={currentTime}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        activeCount={activeTablesCount}
        completedCount={todaySessions.length}
      />

      {/* Asosiy Maydon */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-2.5 sm:px-6 py-3 sm:py-6 space-y-4 sm:space-y-6">
        {/* 1-SAHIFA: FAQAT STOLLAR (Mobilda 2 ustun, Desktopda 5 ustun) */}
        {activeTab === 'tables' && (
          <section aria-label="Stollar ro'yxati" className="animate-fade-in">
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
          <div className="space-y-4 sm:space-y-6 animate-fade-in max-w-4xl mx-auto">
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
          <section aria-label="Sozlamalar paneli" className="animate-fade-in max-w-xl mx-auto">
            <SettingsView
              settings={settings}
              onSave={updateSettings}
              onReset={resetSettings}
            />
          </section>
        )}
      </main>

      {/* Sessiya hisob-kitob modali (Bottom Sheet / Desktop Centered Modal) */}
      <SessionModal
        table={currentModalTable}
        settings={settings}
        currentTime={currentTime}
        isOpen={isSessionModalOpen}
        onClose={handleCloseSessionModal}
        onFinish={finishSession}
        onCancelSession={cancelSession}
      />

      {/* Pastki Navigatsiya Paneli (Faqat mobilda ko'rinadi) */}
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
