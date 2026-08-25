import { useState, useCallback } from 'react';
import type { ClubSettings } from '../types';
import { storage, DEFAULT_SETTINGS } from '../lib/storage';

/**
 * Klub sozlamalarini (soatlik narxlar va yaxlitlash qadami) boshqaruvchi hook
 */
export function useSettings() {
  const [settings, setSettingsState] = useState<ClubSettings>(() => storage.getSettings());

  const updateSettings = useCallback((updated: Partial<ClubSettings>) => {
    setSettingsState((prev) => {
      const next = {
        ...prev,
        ...updated,
      };
      storage.setSettings(next);
      return next;
    });
  }, []);

  const resetSettings = useCallback(() => {
    storage.setSettings(DEFAULT_SETTINGS);
    setSettingsState(DEFAULT_SETTINGS);
  }, []);

  return {
    settings,
    updateSettings,
    resetSettings,
  };
}
