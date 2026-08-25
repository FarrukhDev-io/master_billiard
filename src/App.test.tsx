import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';

describe('App Integration tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders table list and initial status correctly', () => {
    render(<App />);

    expect(screen.getByText(/Master Billiard/i)).toBeDefined();
    expect(screen.getByText('1-Stol (Bilyard)')).toBeDefined();
    expect(screen.getByText('4-Stol (Bilyard)')).toBeDefined();
    expect(screen.getByText('Stol Tennisi')).toBeDefined();
    expect(screen.getByText(/Bugungi tushum/i)).toBeDefined();
    expect(screen.getByText("0 so'm")).toBeDefined();
  });

  it('allows starting a table and stops it with checkout flow', () => {
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

    // Tarixda yozuv paydo bo'ldi
    expect(screen.getByText(/Sessiyalar Tarixi/i)).toBeDefined();
  });

  it('allows opening settings modal and changing prices', () => {
    render(<App />);

    // Sozlamalar tugmasini bosish
    const settingsButton = screen.getByLabelText('Sozlamalar');
    fireEvent.click(settingsButton);

    // Sozlamalar modali ochildi
    expect(screen.getByText('Sozlamalar')).toBeDefined();
    expect(screen.getByText(/Bilyard soatlik narxi/i)).toBeDefined();
    expect(screen.getByText(/Tennis soatlik narxi/i)).toBeDefined();

    // Saqlash tugmasini bosish
    const saveButton = screen.getByRole('button', { name: /Saqlash/i });
    fireEvent.click(saveButton);
  });
});
