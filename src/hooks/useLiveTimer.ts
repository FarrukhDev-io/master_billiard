import { useState, useEffect } from 'react';

/**
 * Real vaqt rejimida har soniyada vaqtni yangilovchi hook
 * Telefon ekrani o'chib yonganda yoki brauzer tabiga qaytganda (visibilitychange) 
 * darhol yangi Date.now() qiymatini oladi.
 */
export function useLiveTimer(enabled: boolean = true): number {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    if (!enabled) return;

    // Har 1 soniyada joriy timestampni yangilash
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    // Telefon ekrani qayta faollashganda zudlik bilan yangilash
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setNow(Date.now());
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
    };
  }, [enabled]);

  return now;
}
