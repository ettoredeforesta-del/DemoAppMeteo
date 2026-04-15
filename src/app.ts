/**
 * Weather App - Main Logic
 * Gestisce il recupero dei dati meteo, il rendering dell'UI e l'interazione con l'utente.
 */

import {
  getWeatherDescription,
  getWeatherIcon,
  formatLocalDate,
  createForecastCard,
} from './utils';

// ==================== Type Definitions ====================

/**
 * Risultato della ricerca geolocalizzazione da Open-Meteo Geocoding API
 */
type GeoResult = {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
};

/**
 * Risposta della Open-Meteo Weather API con dati attuali e previsioni
 */
type WeatherResponse = {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
};

// ==================== API Functions ====================

/**
 * Recupera la geolocalizzazione (latitudine, longitudine) di una città
 * @param city - Nome della città da cercare
 * @returns Dati di geolocalizzazione o null se non trovato
 */
async function fetchLocation(city: string): Promise<GeoResult | null> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=it&format=json`;
  const response = await fetch(url);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    return null;
  }

  const result = data.results[0];
  return {
    latitude: result.latitude,
    longitude: result.longitude,
    name: result.name,
    country: result.country,
  };
}

/**
 * Recupera i dati meteo attuali e le previsioni per una località
 * @param latitude - Latitudine della località
 * @param longitude - Longitudine della località
 * @returns Dati meteo attuali e previsioni giornaliere
 * @throws Error se la richiesta API fallisce
 */
async function fetchWeather(latitude: number, longitude: number): Promise<WeatherResponse> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe%2FRome`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Errore durante il recupero dei dati meteo');
  }

  return response.json();
}

// ==================== UI Rendering ====================

/**
 * Renderizza i dati meteo nell'interfaccia utente
 * Crea la sezione meteo attuale e le previsioni giornaliere
 * @param location - Dati di geolocalizzazione (città, paese)
 * @param weather - Dati meteo attuali e previsioni
 */
function renderWeather(location: GeoResult, weather: WeatherResponse): void {
  const resultContainer = document.getElementById('weatherResult');
  if (!resultContainer) return;

  const current = weather.current_weather;
  const currentDescription = getWeatherDescription(current.weathercode);
  const currentIcon = getWeatherIcon(current.weathercode);

  const forecastItems = weather.daily.time
    .map((day, index) =>
      createForecastCard(
        formatLocalDate(day),
        weather.daily.temperature_2m_min[index],
        weather.daily.temperature_2m_max[index],
        getWeatherDescription(weather.daily.weathercode[index]),
        getWeatherIcon(weather.daily.weathercode[index])
      )
    )
    .join('');

  // Create elements safely to prevent XSS
  const currentSection = document.createElement('section');
  currentSection.className = 'current-weather neumorphism';
  currentSection.innerHTML = `
    <header>
      <p class="location-label"></p>
      <div class="current-headline">
        <span class="weather-icon large">${currentIcon}</span>
        <div>
          <h2></h2>
          <p></p>
        </div>
      </div>
    </header>
    <div class="current-details"></div>
  `;

  const locationLabel = currentSection.querySelector('.location-label') as HTMLElement;
  const tempHeading = currentSection.querySelector('h2') as HTMLElement;
  const descPara = currentSection.querySelector('header p:last-of-type') as HTMLElement;
  const details = currentSection.querySelector('.current-details') as HTMLElement;

  locationLabel.textContent = `${location.name}, ${location.country}`;
  tempHeading.textContent = `${Math.round(current.temperature)}°C`;
  descPara.textContent = currentDescription;
  details.textContent = `Vento ${Math.round(current.windspeed)} km/h`;

  const forecastSection = document.createElement('section');
  forecastSection.className = 'forecast-section';
  forecastSection.innerHTML = `
    <h3>Previsioni</h3>
    <div class="forecast-grid">${forecastItems}</div>
  `;

  resultContainer.innerHTML = '';
  resultContainer.appendChild(currentSection);
  resultContainer.appendChild(forecastSection);
  resultContainer.classList.remove('hidden');
}

/**
 * Aggiorna il messaggio di stato nell'interfaccia (caricamento, errori, ecc.)
 * @param message - Testo del messaggio da visualizzare
 * @param isError - Se true, applica lo stile di errore al messaggio
 */
function setStatus(message: string, isError = false): void {
  const status = document.getElementById('statusMessage');
  if (!status) return;

  status.textContent = message;
  status.classList.toggle('error', isError);
  status.classList.toggle('hidden', message.length === 0);
}

// ==================== App Initialization ====================

/**
 * Inizializza l'applicazione meteo
 * Configura gli event listener per il campo di ricerca e il pulsante di ricerca
 * Gestisce la ricerca meteo quando l'utente inserisce una città
 */
export function initializeWeatherApp(): void {
  const cityInput = document.getElementById('cityInput') as HTMLInputElement | null;
  const searchButton = document.getElementById('searchButton');

  if (!cityInput || !searchButton) {
    return;
  }

  /**
   * Funzione di ricerca del meteo
   * Recupera i dati dalla API e renderizza l'interfaccia utente
   */
  async function searchWeather(): Promise<void> {
    const city = (cityInput as HTMLInputElement).value.trim();
    if (!city) {
      setStatus('Inserisci il nome di una città.', true);
      return;
    }

    setStatus('Caricamento in corso...', false);
    const weatherResult = document.getElementById('weatherResult');
    weatherResult?.classList.add('hidden');

    try {
      const location = await fetchLocation(city);
      if (!location) {
        setStatus('Località non trovata. Prova un altro nome.', true);
        return;
      }

      const weather = await fetchWeather(location.latitude, location.longitude);
      renderWeather(location, weather);
      setStatus('Dati meteo aggiornati.', false);
    } catch (error) {
      console.error(error);
      setStatus('Impossibile recuperare i dati. Controlla la connessione.', true);
    }
  }

  searchButton.addEventListener('click', searchWeather);
  cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      searchWeather();
    }
  });
}
