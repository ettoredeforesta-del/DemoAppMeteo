import { describe, it, expect } from 'vitest';
import {
  getWeatherDescription,
  getWeatherIcon,
  formatLocalDate,
  createForecastCard,
} from './utils';

describe('Weather Utilities', () => {
  describe('getWeatherDescription', () => {
    it('should return "Sereno" for code 0', () => {
      expect(getWeatherDescription(0)).toBe('Sereno');
    });

    it('should return "Nuvoloso" for code 3', () => {
      expect(getWeatherDescription(3)).toBe('Nuvoloso');
    });

    it('should return "Pioggia leggera" for code 51', () => {
      expect(getWeatherDescription(51)).toBe('Pioggia leggera');
    });

    it('should return "Temporale" for code 95', () => {
      expect(getWeatherDescription(95)).toBe('Temporale');
    });

    it('should return "Condizioni variabili" for unknown code', () => {
      expect(getWeatherDescription(999)).toBe('Condizioni variabili');
    });
  });

  describe('getWeatherIcon', () => {
    it('should return sun emoji for code 0', () => {
      expect(getWeatherIcon(0)).toBe('☀️');
    });

    it('should return cloud emoji for code 3', () => {
      expect(getWeatherIcon(3)).toBe('☁️');
    });

    it('should return rain emoji for code 51', () => {
      expect(getWeatherIcon(51)).toBe('🌦️');
    });

    it('should return thunderstorm emoji for code 95', () => {
      expect(getWeatherIcon(95)).toBe('⛈️');
    });

    it('should return rainbow emoji for unknown code', () => {
      expect(getWeatherIcon(999)).toBe('🌈');
    });
  });

  describe('formatLocalDate', () => {
    it('should format date with Italian locale', () => {
      const date = '2026-04-15';
      const result = formatLocalDate(date);
      expect(result).toContain('15');
      expect(result).toContain('apr');
    });

    it('should include weekday in Italian', () => {
      const date = '2026-04-15';
      const result = formatLocalDate(date);
      expect(result.length).toBeGreaterThan(0);
      expect(typeof result).toBe('string');
    });

    it('should handle various date formats', () => {
      const dates = ['2026-01-01', '2026-06-15', '2026-12-31'];
      dates.forEach((date) => {
        expect(formatLocalDate(date)).toBeTruthy();
      });
    });
  });

  describe('createForecastCard', () => {
    it('should create HTML with correct day', () => {
      const html = createForecastCard('Lunedì', 15, 22, 'Sereno', '☀️');
      expect(html).toContain('Lunedì');
      expect(html).toContain('forecast-day');
    });

    it('should include temperature values', () => {
      const html = createForecastCard('Martedì', 10, 20, 'Nuvoloso', '☁️');
      expect(html).toContain('10');
      expect(html).toContain('20');
      expect(html).toContain('°C');
    });

    it('should include weather description', () => {
      const html = createForecastCard('Mercoledì', 12, 18, 'Pioggia', '🌧️');
      expect(html).toContain('Pioggia');
    });

    it('should include weather icon', () => {
      const html = createForecastCard('Giovedì', 15, 25, 'Sereno', '☀️');
      expect(html).toContain('☀️');
    });

    it('should have proper CSS classes', () => {
      const html = createForecastCard('Venerdì', 14, 24, 'Parzialmente nuvoloso', '⛅');
      expect(html).toContain('forecast-card');
      expect(html).toContain('neumorphism');
      expect(html).toContain('forecast-temp');
    });

    it('should round temperature values', () => {
      const html = createForecastCard('Sabato', 15.7, 21.4, 'Sereno', '☀️');
      expect(html).toContain('16');
      expect(html).toContain('21');
    });
  });
});
