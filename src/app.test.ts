import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initializeWeatherApp } from './app';

describe('Weather App Integration', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <main class="app-shell">
        <section class="weather-card neumorphism">
          <div class="weather-header">
            <h1>Demo Meteo</h1>
            <p>Inserisci una città per conoscere il meteo attuale e il forecast.</p>
          </div>
          <div class="search-row">
            <input id="cityInput" type="text" placeholder="Es. Milano" />
            <button id="searchButton" type="button">Cerca</button>
          </div>
          <div id="statusMessage" class="status-message"></div>
          <section id="weatherResult" class="weather-result hidden"></section>
        </section>
      </main>
    `;
  });

  it('should initialize the app without errors', () => {
    expect(() => {
      initializeWeatherApp();
    }).not.toThrow();
  });

  it('should have search button and input field', () => {
    initializeWeatherApp();
    const cityInput = document.getElementById('cityInput') as HTMLInputElement;
    const searchButton = document.getElementById('searchButton');

    expect(cityInput).toBeTruthy();
    expect(searchButton).toBeTruthy();
  });

  it('should show error message when searching for empty city', async () => {
    initializeWeatherApp();
    const searchButton = document.getElementById('searchButton') as HTMLButtonElement;
    const cityInput = document.getElementById('cityInput') as HTMLInputElement;

    cityInput.value = '';
    searchButton.click();

    await new Promise((resolve) => setTimeout(resolve, 100));

    const statusMessage = document.getElementById('statusMessage');
    expect(statusMessage?.textContent).toContain('Inserisci il nome di una città');
  });

  it('should display status message container', () => {
    initializeWeatherApp();
    const statusMessage = document.getElementById('statusMessage');
    expect(statusMessage).toBeTruthy();
  });

  it('should have hidden weather result initially', () => {
    initializeWeatherApp();
    const weatherResult = document.getElementById('weatherResult');
    expect(weatherResult?.classList.contains('hidden')).toBe(true);
  });

  it('should enter keypress listener for search input', async () => {
    initializeWeatherApp();
    const cityInput = document.getElementById('cityInput') as HTMLInputElement;

    cityInput.value = '';
    const event = new KeyboardEvent('keypress', { key: 'Enter' });
    cityInput.dispatchEvent(event);

    await new Promise((resolve) => setTimeout(resolve, 100));

    const statusMessage = document.getElementById('statusMessage');
    expect(statusMessage?.textContent).toContain('Inserisci il nome di una città');
  });
});
