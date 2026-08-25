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
 * Asosiy ilova - 1-sahifada faqat stollar, qolgan ma'lumotlar alohida sahifalarda
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
      <Header
        currentTime={currentTime}
        onOpenSettings={() => setActiveTab('settings')}
      />

      {/* Asosiy Ish Maydoni */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-4 py-3.5 space-y-4">
        {/* 1-SAHIFA: FAQAT STOLLAR */}
        {activeTab === 'tables' && (
          <section className="space-y-3" aria-label="Stollar ro'yxati">
            {/* Qisqa zal holati */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">
                  Zal: {tables.length} ta stol
                </h2>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                {activeTablesCount > 0 ? (
                  <span className="text-amber-400 font-semibold">{activeTablesCount} ta stol band</span>
                ) : (
                  <span className="text-emerald-400 font-semibold">Barcha stollar bo'sh</span>
                )}
              </span>
            </div>

            {/* 5 ta stol kartochkalari */}
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
          <div className="space-y-4 animate-fade-in">
            {/* Kunlik hisobot */}
            <section aria-label="Hisobot paneli">
              <RevenueSummary
                todayRevenue={todayRevenue}
                activeCount={activeTablesCount}
                totalTables={tables.length}
                completedCount={todaySessions.length}
              />
            </section>

            {/* Bugungi yakunlangan o'yinlar cheklari */}
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
          <section className="animate-fade-in" aria-label="Sozlamalar paneli">
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
