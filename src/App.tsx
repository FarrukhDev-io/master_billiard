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
 * Master Billiard - Full Desktop Dashboard & Mobile-First POS
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
    <div className="min-h-screen bg-[#080c10] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 pb-20 md:pb-8">
      {/* Yuqori Panel (Desktopda navigatsiya bilan) */}
      <Header
        currentTime={currentTime}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        activeCount={activeTablesCount}
        completedCount={todaySessions.length}
      />

      {/* Asosiy Ish Maydoni (Katta ekranda to'liq kenglikdan foydalaniladi) */}
      <main className="flex-1 max-w-[1550px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6">
        {/* 1-SAHIFA: STOLLAR (Desktopda 2 ustunli Dashboard: Chapda Stollar, O'ngda Kassa & Tarix) */}
        {activeTab === 'tables' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-start animate-fade-in">
            {/* Chap Qism: 5 ta Stol (Mobilda 2-ustun, Desktopda 3-ustun) */}
            <div className="lg:col-span-8 xl:col-span-8 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">
                    Klub Zali ({tables.length} ta stol)
                  </h2>
                </div>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  {activeTablesCount > 0 ? (
                    <span className="text-amber-400 font-semibold">{activeTablesCount} ta stol band</span>
                  ) : (
                    <span className="text-emerald-400 font-semibold">Barcha stollar bo'sh</span>
                  )}
                </span>
              </div>

              <TableGrid
                tables={tables}
                settings={settings}
                currentTime={currentTime}
                onStartSession={startSession}
                onOpenSessionModal={handleOpenSessionModal}
              />
            </div>

            {/* O'ng Qism: Desktop Kassa & Jonli Cheklar Paneli (Faqat Desktop lg+ ekranlarda ko'rinadi) */}
            <div className="hidden lg:block lg:col-span-4 xl:col-span-4 space-y-5 sticky top-20">
              {/* Bugungi Kassa */}
              <section aria-label="Hisobot paneli">
                <RevenueSummary
                  todayRevenue={todayRevenue}
                  activeCount={activeTablesCount}
                  totalTables={tables.length}
                  completedCount={todaySessions.length}
                />
              </section>

              {/* Jonli Cheklar Tarixi */}
              <section aria-label="Sessiyalar tarixi">
                <SessionLog
                  sessions={todaySessions}
                  onClearHistory={clearTodayHistory}
                />
              </section>
            </div>
          </div>
        )}

        {/* 2-SAHIFA: KASSA VA TARIX (Mobilda yoki to'liq ko'rinishda) */}
        {activeTab === 'history' && (
          <div className="space-y-5 max-w-4xl mx-auto animate-fade-in">
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
          <section aria-label="Sozlamalar paneli" className="max-w-xl mx-auto animate-fade-in">
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
