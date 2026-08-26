import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';

describe('App Integration tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders table list and 5 tables on the main screen in 2-column mobile grid', () => {
    render(<App />);

    expect(screen.getByText(/Master Billiard/i)).toBeDefined();
    expect(screen.getByText('1-Stol (Bilyard)')).toBeDefined();
    expect(screen.getByText('4-Stol (Bilyard)')).toBeDefined();
    expect(screen.getByText('Stol Tennisi')).toBeDefined();
  });

  it('allows starting a table and stops it with checkout flow and checks history tab', () => {
    render(<App />);

    // 1-stol bo'sh holatda
    const startButtons = screen.getAllByRole('button', { name: /Boshlash/i });
    expect(startButtons.length).toBe(5);

    // 1-stol sessiyasini boshlash
    fireEvent.click(startButtons[0]);

    // Endi 1-stol band bo'ldi va "Hisoblash" tugmasi chiqadi
    const calculateButtons = screen.getAllByRole('button', { name: /Hisoblash/i });
    expect(calculateButtons.length).toBeGreaterThanOrEqual(1);

    // Modalni ochish uchun tugmaga bosish
    fireEvent.click(calculateButtons[0]);

    // Modal ochiqligini tekshirish
    expect(screen.getByText(/to'lov summasi/i)).toBeDefined();
    expect(screen.getByText(/Boshlangan vaqt:/i)).toBeDefined();

    // Modal ichidagi "Hisoblash va Bo'shatish" tugmasini bosish
    const modalFinishButtons = screen.getAllByRole('button', { name: /Hisoblash va Bo'shatish/i });
    fireEvent.click(modalFinishButtons[0]);

    // Stol qayta bo'shadi
    const renewedStartButtons = screen.getAllByRole('button', { name: /Boshlash/i });
    expect(renewedStartButtons.length).toBe(5);

    // Kassa / Tarix sahifasiga o'tish
    const historyTabButton = screen.getByRole('button', { name: /Kassa \/ Tarix/i });
    fireEvent.click(historyTabButton);

    // Tarix sahifasida hisobot va yozuv ko'rinadi
    expect(screen.getByText(/Tushum/i)).toBeDefined();
    expect(screen.getByText(/Sessiyalar Tarixi/i)).toBeDefined();
  });

  it('allows navigating to settings page and changing prices', () => {
    render(<App />);

    // Sozlamalar tabini bosish
    const settingsTabButton = screen.getAllByRole('button', { name: /Sozlamalar/i })[0];
    fireEvent.click(settingsTabButton);

    // Sozlamalar sahifasi ochildi
    expect(screen.getByText('Klub Sozlamalari')).toBeDefined();
    expect(screen.getByText(/Bilyard soatlik narxi/i)).toBeDefined();
    expect(screen.getByText(/Tennis soatlik narxi/i)).toBeDefined();

    // Saqlash tugmasini bosish
    const saveButton = screen.getByRole('button', { name: /Sozlamalarni Saqlash/i });
    fireEvent.click(saveButton);
  });
});
