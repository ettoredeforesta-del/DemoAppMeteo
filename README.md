# Demo App Meteo ☀️🌧️

Una web app moderna e interattiva in **TypeScript** che recupera il meteo attuale e le previsioni giornaliere usando l'API pubblica e gratuita **Open-Meteo**. L'interfaccia è progettata con lo stile **Neumorphism** e presenta icone meteo animate con effetti **neon** per un'esperienza visiva coinvolgente.

---

## 📋 Descrizione del Progetto

**Demo App Meteo** è un'applicazione web single-page (SPA) che consente agli utenti di cercare il meteo per qualsiasi città nel mondo. L'app recupera i dati meteorologici in tempo reale e fornisce un'anteprima delle previsioni per i prossimi giorni.

### ✨ Caratteristiche Principali

- **Ricerca per città**: Inserisci il nome di una città per ottenere il meteo attuale e il forecast
- **Dati meteo in tempo reale**: Temperatura, velocità del vento, descrizione delle condizioni
- **Previsioni multi-giorno**: Temperature min/max e descrizione del meteo per i prossimi giorni
- **Icone meteo animate**: 
  - ☀️ Sole che ruota e pulsa (cielo sereno)
  - ☁️ Nuvole che si muovono orizzontalmente (tempo nuvoloso)
  - 🌧️ Pioggia con effetto caduta verticale (pioggia)
  - ❄️ Fiocchi di neve (neve)
  - ⚡ Lampi di fulmine (temporali)
- **Design elegante**: Interfaccia in stile Neumorphism con effetti neon
- **Gestione degli errori**: Messaggi chiari per città non trovate e problemi di connessione
- **Supporto input**: Ricerca tramite pulsante o pressione del tasto `Enter`
- **Nessuna chiave API richiesta**: L'API Open-Meteo è pubblica e gratuita

---

## 📁 Struttura del Progetto

```
DemoAppMeteo/
├── index.html              # File HTML principale con l'interfaccia
├── package.json            # Dipendenze e script npm
├── tsconfig.json           # Configurazione del compilatore TypeScript
├── vite.config.ts          # Configurazione del build tool Vite
├── vitest.config.ts        # Configurazione del test runner Vitest
├── README.md               # Questo file
├── SECURITY_AUDIT.md       # Documentazione dell'audit di sicurezza
│
└── src/                    # Codice sorgente TypeScript
    ├── main.ts             # Entry point - importa stili e avvia l'app
    ├── app.ts              # Logica principale dell'applicazione
    ├── utils.ts            # Funzioni di utilità e icone SVG
    ├── styles.css          # Stili Neumorphism e animazioni
    ├── app.test.ts         # Test para la logica dell'app
    ├── utils.test.ts       # Test per le funzioni di utilità
    └── vite-env.d.ts       # Dichiarazioni di tipo per Vite
```

---

## 🧭 Navigazione del Codice

### `src/main.ts` - Punto di Ingresso
Il file di entry point che:
- Importa gli stili CSS globali
- Importa e avvia la funzione `initializeWeatherApp()`

### `src/app.ts` - Logica Principale
Contiene la logica completa dell'applicazione:

**Funzioni di API:**
- `fetchLocation(city)` - Recupera latitudine/longitudine da Open-Meteo Geocoding API
- `fetchWeather(lat, lon)` - Recupera i dati meteo da Open-Meteo Weather API

**Funzioni di Rendering:**
- `renderWeather(location, weather)` - Crea e visualizza il meteo attuale e il forecast
- `setStatus(message, isError)` - Aggiorna il messaggio di stato nell'interfaccia

**Inizializzazione:**
- `initializeWeatherApp()` - Configura gli event listener e gestisce le ricerche

**Tipi TypeScript:**
- `GeoResult` - Risultato della ricerca geografica
- `WeatherResponse` - Struttura dei dati meteo dall'API

### `src/utils.ts` - Utilità e Icone
Esporta funzioni di supporto e dati:

**Dati:**
- `weatherDescriptions` - Mappa codici meteo → descrizioni in italiano
- `weatherIcons` - Mappa codici meteo → icone SVG animate

**Funzioni:**
- `getWeatherDescription(code)` - Ottiene la descrizione del meteo
- `getWeatherIcon(code)` - Ottiene l'icona SVG del meteo
- `formatLocalDate(dateString)` - Formatta le date in italiano
- `createForecastCard(day, min, max, desc, icon)` - Genera il markup della previsione

### `index.html` - Interfaccia HTML
Struttura semantica con:
- Header con titolo e descrizione
- Sezione di ricerca con input e pulsante
- Area dei messaggi di stato
- Contenitore per i risultati meteo

### `src/styles.css` - Stili e Animazioni
Stili Neumorphism con:
- **Animazioni icone**: Rotazione sole, movimento nuvole, caduta pioggia, fulmine
- **Effetti neon**: Glow subtile sulle icone meteo
- **Layout responsivo**: Griglia per le previsioni
- **Colori coerenti**: Tonalità realiste delle icone con effetti neon

---

## 🚀 Come Eseguire il Codice

### Prerequisiti
- **Node.js** v16+ e **npm** (scaricabili da [nodejs.org](https://nodejs.org))
- **VS Code** (opzionale ma consigliato)

### Passo 1: Installa le Dipendenze
Apri il terminale nella cartella del progetto e esegui:

```bash
npm install
```

Questo installa:
- **Vite** - Build tool veloce
- **TypeScript** - Compilatore TypeScript
- **Vitest** - Framework per i test
- **jsdom** - DOM virtuale per i test

### Passo 2: Avvia l'App in Sviluppo
Esegui il comando:

```bash
npm run dev
```

Output atteso nel terminale:
```
  VITE v5.4.0  ready in XXX ms

  ➜  Local:   http://localhost:4173/
  ➜  press h + enter to show help
```

### Passo 3: Apri l'App nel Browser
Clicca sul link `http://localhost:4173/` oppure copia l'indirizzo nella barra dell'indirizzo del browser.

### Passo 4: Usa l'App
1. Digita il nome di una città (es. "Milano", "Roma", "Londra")
2. Clicca il pulsante **Cerca** oppure premi **Enter**
3. Visualizza il meteo attuale e il forecast dei prossimi giorni

---

## 🛠️ Script Disponibili

Puoi eseguire questi comandi dalla cartella del progetto:

```bash
# Avvia il server di sviluppo con hot reload
npm run dev

# Compila TypeScript e genera la build di produzione
npm run build

# Visualizza l'anteprima della build di produzione
npm preview

# Esegui i test
npm test
```

---

## 🔄 Flusso di Funzionamento

```
1. Utente inserisce città
    ↓
2. Click "Cerca" o Enter
    ↓
3. fetchLocation(city) → Geocoding API Open-Meteo
    ↓
4. Se trovato: fetchWeather(lat, lon) → Weather API Open-Meteo
    ↓
5. renderWeather() genera HTML e visualizza risultati
    ↓
6. Icone animate si visualizzano
```

---

## 🌐 API Utilizzate

### 1. Open-Meteo Geocoding API
**URL**: `https://geocoding-api.open-meteo.com/v1/search`

Recupera coordinate geografiche di una città.

```typescript
// Parametri
name: string        // Nome della città
count: 1           // Una sola risultato
language: 'it'     // Risultati in italiano
format: 'json'     // Formato JSON
```

### 2. Open-Meteo Weather API
**URL**: `https://api.open-meteo.com/v1/forecast`

Recupera dati meteo attuali e previsioni.

```typescript
// Parametri
latitude: number           // Latitudine della città
longitude: number          // Longitudine della città
current_weather: true      // Dati meteo attuali
daily: string[]           // Previsioni giornaliere
timezone: 'Europe/Rome'   // Fuso orario
```

---

## 🎨 Design e Animazioni

### Stile Neumorphism
L'interfaccia utilizza il design **Neumorphism**:
- **Sfumature soft** per creare profondità
- **Colori neutri** per un aspetto elegante
- **Ombre interne/esterne** per effetti 3D

### Animazioni Icone Meteo
Ogni tipo di meteo ha un'animazione unica:

| Meteo | Animazione | Colore Base |
|-------|-----------|------------|
| ☀️ Sole | Rotazione + pulsazione | Oro (#FFD700) |
| ☁️ Nuvole | Movimento orizzontale | Grigio (#D3D3D3) |
| 🌧️ Pioggia | Gocce che cadono | Blu (#4169E1) |
| ❄️ Neve | Caduta fiocchi | Azzurro (#B0C4DE) |
| ⚡ Temporale | Fulmine lampeggiante | Oro (#FFD700) |

Tutte le icone hanno un **glow neon** che si abbina ai colori realistici.

---

## 🧪 Test

L'app include test per verificare il corretto funzionamento:

```bash
npm test
```

Test disponibili:
- `app.test.ts` - Test della logica dell'app
- `utils.test.ts` - Test delle funzioni di utilità

---

## 🔐 Sicurezza

- ✅ **Nessuna chiave API hardcoded** - L'API Open-Meteo è pubblica
- ✅ **Protezione XSS** - Utilizzo di `textContent` per testi e construction DOM sicuro
- ✅ **Validazione input** - Trim del testo e controllo città non trovata
- ✅ **Gestione errori** - Messaggi di errore chiari senza leak di informazioni sensibili

Vedi [SECURITY_AUDIT.md](SECURITY_AUDIT.md) per i dettagli completi dell'audit di sicurezza.

---

## 📝 Note Importanti

### Formato Date
Le date nelle previsioni sono formattate in **italiano**:
- Esempio: "martedì 15 apr", "mercoledì 16 apr"

### Unità di Misura
- **Temperatura**: Celsius (°C)
- **Vento**: Chilometri all'ora (km/h)

### Codici Meteo
L'app utilizza i codici meteo standard di Open-Meteo (WMO Weather codes). Ciascun codice è mappato a:
- Una descrizione in italiano
- Un'icona SVG animata

---

## 🎯 Possibili Miglioramenti Futuri

- [ ] Selezione delle unità di misura (Celsius/Fahrenheit, km/h/mph)
- [ ] Salvataggio città preferite in localStorage
- [ ] Geolocalizzazione automatica basata su IP
- [ ] Previsioni orarie (non solo giornaliere)
- [ ] Mappe interattive della copertura nuvolosa
- [ ] Theme toggle (dark/light mode)
- [ ] Calcolo dell'indice UV e qualità dell'aria

---

## 📄 License

Questo progetto utilizza **API pubbliche e gratuite**. Per dettagli sulla licenza di Open-Meteo, visita [open-meteo.com](https://open-meteo.com)

---

## 💬 Contatti e Supporto

Per domande o suggerimenti sul codice, consulta i commenti JSDoc all'interno dei file TypeScript.
