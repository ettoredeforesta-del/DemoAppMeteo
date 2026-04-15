/**
 * Weather App - Utility Functions and Data
 * Contiene le funzioni di utilità per la gestione dei codici meteo,
 * la formattazione delle date e la creazione dei componenti UI.
 */

// ==================== Weather Data ====================

/**
 * Mappa dei codici meteo Open-Meteo alle descrizioni localizzate in italiano
 */
export const weatherDescriptions: Record<number, string> = {
  0: 'Sereno',
  1: 'Parzialmente nuvoloso',
  2: 'Parzialmente nuvoloso',
  3: 'Nuvoloso',
  45: 'Nebbia',
  48: 'Nebbia ghiacciata',
  51: 'Pioggia leggera',
  53: 'Pioggia moderata',
  55: 'Pioggia intensa',
  61: 'Pioggia leggera',
  63: 'Pioggia moderata',
  65: 'Pioggia forte',
  71: 'Neve leggera',
  73: 'Neve moderata',
  75: 'Bufera di neve',
  80: 'Rovesci leggeri',
  81: 'Rovesci',
  82: 'Forti rovesci',
  95: 'Temporale',
  96: 'Temporale con grandine',
  99: 'Temporale con gran ghiaccio',
};

// ==================== Weather Icons (SVG) ====================

/**
 * Icona del sole - Cielo sereno
 */
const clearIcon = `
<svg class="icon-sun" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="12" fill="#FFD700" />
  <g stroke="#FFA500" stroke-width="4" stroke-linecap="round">
    <line x1="32" y1="4" x2="32" y2="14" />
    <line x1="32" y1="50" x2="32" y2="60" />
    <line x1="4" y1="32" x2="14" y2="32" />
    <line x1="50" y1="32" x2="60" y2="32" />
    <line x1="14" y1="14" x2="20" y2="20" />
    <line x1="44" y1="44" x2="50" y2="50" />
    <line x1="14" y1="50" x2="20" y2="44" />
    <line x1="44" y1="20" x2="50" y2="14" />
  </g>
</svg>`;

/**
 * Icona nuvoloso parziale - Parzialmente nuvoloso
 */
const partlyCloudyIcon = `
<svg class="icon-cloudy" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <circle cx="20" cy="24" r="8" fill="#FFC700" />
  <path d="M18 38h28a10 10 0 000-20 12 12 0 00-22-4 8 8 0 00-14 4 10 10 0 000 20z" fill="#D3D3D3" />
</svg>`;

/**
 * Icona nuvoloso - Completamente nuvoloso
 */
const cloudyIcon = `
<svg class="icon-cloud" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 40h32a12 12 0 000-24 16 16 0 00-30-4 10 10 0 000 24z" fill="#C0C0C0" />
  <ellipse cx="40" cy="38" rx="14" ry="8" fill="#D9D9D9" />
</svg>`;

/**
 * Icona nebbia - Nebbia e visibilità ridotta
 */
const fogIcon = `
<svg class="icon-fog" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 38h36a12 12 0 000-24 14 14 0 00-25-4 10 10 0 000 24z" fill="#B0B0B0" />
  <path class="fog-line" d="M14 44h36" stroke="#A9A9A9" stroke-width="4" stroke-linecap="round" />
  <path class="fog-line" d="M14 52h36" stroke="#A9A9A9" stroke-width="4" stroke-linecap="round" />
</svg>`;

/**
 * Icona pioggia - Pioggia leggera e moderata
 */
const rainIcon = `
<svg class="icon-rain" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 34h34a10 10 0 000-20 12 12 0 00-22-4 8 8 0 00-14 4 10 10 0 000 20z" fill="#A9A9A9" />
  <path class="raindrop" d="M24 42l-4 8" stroke="#4169E1" stroke-width="4" stroke-linecap="round" />
  <path class="raindrop" d="M32 42l-4 10" stroke="#4169E1" stroke-width="4" stroke-linecap="round" />
  <path class="raindrop" d="M42 42l-4 8" stroke="#4169E1" stroke-width="4" stroke-linecap="round" />
</svg>`;

/**
 * Icona pioggia forte - Pioggia intensa e rovesci
 */
const heavyRainIcon = `
<svg class="icon-rain-heavy" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 32h36a11 11 0 000-22 15 15 0 00-27-5 10 10 0 00-14 5 11 11 0 000 22z" fill="#808080" />
  <path class="raindrop" d="M24 42l-4 10" stroke="#1E90FF" stroke-width="4" stroke-linecap="round" />
  <path class="raindrop" d="M34 42l-4 12" stroke="#1E90FF" stroke-width="4" stroke-linecap="round" />
  <path class="raindrop" d="M46 42l-4 10" stroke="#1E90FF" stroke-width="4" stroke-linecap="round" />
</svg>`;

/**
 * Icona neve - Neve e bufera di neve
 */
const snowIcon = `
<svg class="icon-snow" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 34h32a10 10 0 000-20 12 12 0 00-22-4 8 8 0 00-14 4 10 10 0 000 20z" fill="#B0C4DE" />
  <g stroke="#4682B4" stroke-width="3" stroke-linecap="round">
    <line x1="32" y1="42" x2="32" y2="54" />
    <line x1="28" y1="48" x2="36" y2="48" />
    <line x1="26" y1="44" x2="38" y2="52" />
    <line x1="26" y1="52" x2="38" y2="44" />
  </g>
</svg>`;

/**
 * Icona temporale - Temporale con fulmine
 */
const thunderstormIcon = `
<svg class="icon-thunder" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 32h34a11 11 0 000-22 15 15 0 00-27-5 10 10 0 00-14 5 11 11 0 000 22z" fill="#696969" />
  <polygon points="30,42 24,56 34,56 28,70 42,50 34,50" fill="#FFD700" />
</svg>`;

/**
 * Icona temporale con grandine - Temporale con fulmine e grandine
 */
const thunderstormHailIcon = `
<svg class="icon-thunder-hail" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 32h34a11 11 0 000-22 15 15 0 00-27-5 10 10 0 00-14 5 11 11 0 000 22z" fill="#696969" />
  <polygon points="30,42 24,56 34,56 28,70 42,50 34,50" fill="#FFD700" />
  <circle cx="24" cy="58" r="3" fill="#87CEEB" />
  <circle cx="34" cy="62" r="3" fill="#87CEEB" />
  <circle cx="44" cy="58" r="3" fill="#87CEEB" />
</svg>`;

/**
 * Icona predefinita - Utilizzata quando il codice meteo non è riconosciuto
 */
const defaultIcon = `
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="20" fill="#9FA0A0" />
  <path d="M20 32h24" stroke="#7F7F7F" stroke-width="4" stroke-linecap="round" />
</svg>`;

/**
 * Mappa dei codici meteo Open-Meteo alle icone SVG corrispondenti
 */
export const weatherIcons: Record<number, string> = {
  0: clearIcon,
  1: partlyCloudyIcon,
  2: partlyCloudyIcon,
  3: cloudyIcon,
  45: fogIcon,
  48: fogIcon,
  51: rainIcon,
  53: rainIcon,
  55: heavyRainIcon,
  61: rainIcon,
  63: rainIcon,
  65: heavyRainIcon,
  71: snowIcon,
  73: snowIcon,
  75: snowIcon,
  80: rainIcon,
  81: rainIcon,
  82: heavyRainIcon,
  95: thunderstormIcon,
  96: thunderstormHailIcon,
  99: thunderstormHailIcon,
};

// ==================== Utility Functions ====================

/**
 * Recupera la descrizione testuale del meteo in italiano per un codice meteo
 * @param code - Codice meteo Open-Meteo
 * @returns Descrizione localizzata o 'Condizioni variabili' se non trovata
 */
export function getWeatherDescription(code: number): string {
  return weatherDescriptions[code] ?? 'Condizioni variabili';
}

/**
 * Recupera l'icona SVG del meteo per un codice meteo
 * @param code - Codice meteo Open-Meteo
 * @returns SVG dell'icona corrispondente o icona predefinita se non trovata
 */
export function getWeatherIcon(code: number): string {
  return weatherIcons[code] ?? defaultIcon;
}

/**
 * Formatta una stringa di data nel formato localizzato italiano
 * Esempio: '2026-04-15' -> 'martedì 15 apr'
 * @param dateString - Data in formato ISO (YYYY-MM-DD)
 * @returns Data formattata come 'giorno mese' in italiano
 */
export function formatLocalDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'short' });
}

/**
 * Crea il markup HTML di una carta di previsione meteo
 * @param day - Giorno della settimana formattato
 * @param min - Temperatura minima giornaliera
 * @param max - Temperatura massima giornaliera
 * @param description - Descrizione dello status del meteo
 * @param icon - SVG dell'icona del meteo
 * @returns Markup HTML della carta di previsione
 */
export function createForecastCard(day: string, min: number, max: number, description: string, icon: string): string {
  return `
    <article class="forecast-card neumorphism">
      <span class="forecast-day">${day}</span>
      <div class="forecast-headline">
        <span class="weather-icon">${icon}</span>
        <strong>${description}</strong>
      </div>
      <div class="forecast-temp">
        <span>min ${Math.round(min)}°C</span>
        <span>max ${Math.round(max)}°C</span>
      </div>
    </article>
  `;
}
