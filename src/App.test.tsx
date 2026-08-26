import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';

describe('App Integration tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders table list and 5 tables on the main screen in responsive grid', () => {
    render(<App />);

    expect(screen.getByText(/Master Billiard/i)).toBeDefined();
    expect(screen.getByText('1-Stol')).toBeDefined();
    expect(screen.getByText('4-Stol')).toBeDefined();
    expect(screen.getByText('Tennis')).toBeDefined();
  });

  it('allows starting a table and stops it with checkout flow and checks history tab', () => {
    render(<App />);

    // 1-stol bo'sh holatda
    const startButtons = screen.getAllByRole('button', { name: /BOSHLASH/i });
    expect(startButtons.length).toBe(5);

    // 1-stol sessiyasini boshlash
    fireEvent.click(startButtons[0]);

    // Endi 1-stol band bo'ldi va "HISOBLASH" tugmasi chiqadi
    const calculateButtons = screen.getAllByRole('button', { name: /HISOBLASH/i });
    expect(calculateButtons.length).toBeGreaterThanOrEqual(1);

    // Modalni ochish uchun tugmaga bosish
    fireEvent.click(calculateButtons[0]);

    // Modal ochiqligini tekshirish
    expect(screen.getByText(/To'lov summasi/i)).toBeDefined();
    expect(screen.getByText(/O'ynalgan vaqt:/i)).toBeDefined();

    // Modal ichidagi to'lovni qabul qilish tugmasini bosish
    const modalFinishButtons = screen.getAllByRole('button', { name: /TO'LOVNI QABUL QILISH VA BO'SHATISH/i });
    fireEvent.click(modalFinishButtons[0]);

    // Stol qayta bo'shadi
    const renewedStartButtons = screen.getAllByRole('button', { name: /BOSHLASH/i });
    expect(renewedStartButtons.length).toBe(5);

    // Kassa / Tarix sahifasiga o'tish
    const historyTabButton = screen.getAllByRole('button', { name: /Kassa & Tarix/i })[0];
    fireEvent.click(historyTabButton);

    // Tarix sahifasida hisobot va yozuv ko'rinadi
    expect(screen.getByText(/Tushum/i)).toBeDefined();
    expect(screen.getByText(/Bugungi Cheklar/i)).toBeDefined();
  });

  it('allows navigating to settings page and changing prices', () => {
    render(<App />);

    // Sozlamalar tabini bosish
    const settingsTabButton = screen.getAllByRole('button', { name: /Sozlamalar/i })[0];
    fireEvent.click(settingsTabButton);

    // Sozlamalar sahifasi ochildi
    expect(screen.getAllByText('Sozlamalar').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Bilyard soatlik narxi/i)).toBeDefined();
    expect(screen.getByText(/Tennis soatlik narxi/i)).toBeDefined();

    // Saqlash tugmasini bosish
    const saveButton = screen.getByRole('button', { name: /SOZLAMALARNI SAQLASH/i });
    fireEvent.click(saveButton);
  });
});
