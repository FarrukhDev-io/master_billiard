import { useState, useEffect } from 'react';
import { useSettings } from './hooks/useSettings';
import { useTables } from './hooks/useTables';
import { useLiveTimer } from './hooks/useLiveTimer';
import { Header } from './components/Header';
import { RevenueSummary } from './components/RevenueSummary';
import { TableGrid } from './components/TableGrid';
import { SessionLog } from './components/SessionLog';
import { SessionModal } from './components/SessionModal';
import { ReceiptModal } from './components/ReceiptModal';
import { SettingsView } from './components/SettingsView';
import { BottomNav, type ActiveTab } from './components/BottomNav';
import type { Table, CompletedSession } from './types';

/**
 * Master Billiard - 100% Full-Screen Lounge Display with Instant Receipts
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

  // Yakunlangan o'yin cheki holati
  const [lastReceipt, setLastReceipt] = useState<CompletedSession | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // Birinchi bosishda to'liq ekranga (auto full-screen) o'tish
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const handleOpenSessionModal = (table: Table) => {
    setSelectedTable(table);
    setIsSessionModalOpen(true);
  };

  const handleCloseSessionModal = () => {
    setIsSessionModalOpen(false);
    setSelectedTable(null);
  };

  const handleFinishAndShowReceipt = (tableId: string) => {
    const completed = finishSession(tableId);
    if (completed) {
      setLastReceipt(completed);
      setIsReceiptOpen(true);
    }
  };

  const currentModalTable = selectedTable
    ? tables.find((t) => t.id === selectedTable.id) || null
    : null;

  return (
    <div className="min-h-screen lg:h-screen bg-[#080c10] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 pb-20 md:pb-0 lg:overflow-hidden">
      {/* Yuqori Panel */}
      <Header
        currentTime={currentTime}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        activeCount={activeTablesCount}
        completedCount={todaySessions.length}
      />

      {/* Asosiy Ish Maydoni */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto px-2.5 sm:px-4 lg:px-6 py-2 sm:py-3.5 flex flex-col min-h-0">
        {/* 1-SAHIFA: FAQAT STOLLAR (MONITOR BALANDLIGIGA TO'LIQ 100% CHO'ZILADI) */}
        {activeTab === 'tables' && (
          <section aria-label="Klub zali stollari" className="flex-1 w-full flex flex-col min-h-[calc(100vh-120px)] lg:min-h-0 lg:h-full animate-fade-in">
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
          <div className="space-y-4 sm:space-y-6 max-w-4xl w-full mx-auto animate-fade-in py-2 overflow-y-auto">
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
          <section aria-label="Sozlamalar paneli" className="max-w-xl w-full mx-auto animate-fade-in py-2 overflow-y-auto">
            <SettingsView
              settings={settings}
              onSave={updateSettings}
              onReset={resetSettings}
              onClearHistory={clearTodayHistory}
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
        onFinish={handleFinishAndShowReceipt}
        onCancelSession={cancelSession}
      />

      {/* To'lovdan so'ng chiqadigan Tayyor Chek Modali */}
      <ReceiptModal
        receipt={lastReceipt}
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
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
