# Rehacktor

**Rehacktor** è un'applicazione web che funge da database interattivo di videogiochi, ispirata al celebre sito RAWG.  
Permette agli utenti di chattare, esplorare, cercare e salvare titoli, visualizzando informazioni dettagliate e curate per ogni gioco.

Il progetto è sviluppato con **Vite** e **React**, utilizzando **MUI** per l'interfaccia utente, **React Router** per la navigazione (incluse rotte dinamiche), e **Tailwind CSS** in piccola parte per personalizzazioni rapide.  
Il backend è gestito interamente tramite **Supabase**, mentre il deploy è effettuato su **Vercel**.  
L'interfaccia è **100% responsive**, ottimizzata per mobile, tablet e desktop.

---

## Tecnologie utilizzate

### Frontend
- **React** + **Vite**
- **MUI (Material UI)** per i componenti grafici
- **React Router** per la gestione delle rotte e pagine dinamiche
- **Tailwind CSS** (utilizzato parzialmente per custom styling)
- **Axios** per le chiamate API
- **TanStack Query** per la gestione avanzata di fetching, caching e refetch
- **Zod** per validazioni lato client
- **React Context API** per gestione sessione, immagine di background e giochi preferiti
- **react-lazy-load-image-component** per lazy loading delle immagini delle card
- **react-image-lightbox** per la visualizzazione a tutto schermo di immagini e trailer nella sezione dettagli gioco
- **notistack** per notifiche e toast UX
- **framer-motion** per animazioni
- **react-icons** + **@mui/icons-material** mappati per rappresentare console, negozi, aziende, ecc.
- **Tema Light / Dark** dinamico
- **Favicon personalizzata**

### Backend & servizi

- **Supabase**  
  - Autenticazione (inclusa Google OAuth)  
  - Gestione della sessione utente (token, persistenza, refresh automatico)  
  - Database relazionale (salvataggio dei videogiochi preferiti per utente)  
  - Realtime (chat tra utenti)

- **RAWG API**  
  - Recupero dati videogiochi (titolo, descrizione, immagini, generi, piattaforme, valutazioni, ecc.)

- **YouTube Data API / Google API**  
  - Visualizzazione trailer ufficiali nelle pagine di dettaglio gioco

- **Vercel**  
  - Deploy continuo e hosting in produzione

---

## Funzionalità principali

### Esplorazione e ricerca giochi
- Barra di ricerca con query params (ricerca dinamica per nome)
- Sistema di **filtri personalizzati** (relevance, data di rilascio, rating, Metacritic, ordine alfabetico)
- Paginazione tradizionale e lazy loading pagination
- Lazy loading delle immagini

### Autenticazione
- Registrazione e login utente
- **Login con Google** via Supabase OAuth
- Gestione della sessione utente tramite Context

### Chat real-time
- Chat integrata con **Supabase Realtime**
- Disponibile esclusivamente per utenti autenticati

### Wishlist personalizzata
- Possibilità di aggiungere/rimuovere giochi ai preferiti
- Visualizzazione dei giochi preferiti nella propria area personale
- Gestione tramite toggle button o pulsanti contestuali

### Trailer e immagini
- Visualizzazione **trailer video** tramite Google/YouTube API
- Visualizzazione immagini e video a schermo intero con **lightbox**

### Tema e UI moderna
- Modalità **chiaro/scuro** dinamica
- Design responsive, pensato per mobile, tablet e desktop
- Interfaccia coerente e curata con MUI

---

## Architettura tecnica

L’intera parte di backend è gestita tramite Supabase, che si occupa dell’autenticazione (inclusa quella con Google), del database relazionale (wishlist) e delle funzionalità in tempo reale (chatbox). Solo gli utenti autenticati possono interagire tra loro tramite una chat real-time, integrata direttamente nella piattaforma.

Il frontend è stato realizzato con **React**, utilizzando la libreria **MUI** (Material-UI) per i componenti UI e **React Router** per la gestione delle rotte.  
Per le chiamate API si usa **Axios**, gestite in modo efficiente e sincronizzato grazie a **TanStack Query**, che si è dimostrata una scelta superiore rispetto a un custom hook iniziale, per la gestione avanzata della **cache**, **refetch automatico**, e **stati di caricamento** centralizzati.

L’app utilizza le **API di RAWG** per ottenere tutti i dati relativi ai videogiochi (descrizione, immagini, piattaforme, generi, rating, ecc.) e le **API di Google** per integrare i trailer ufficiali nelle schede gioco.

---

## Custom Hooks

L’applicazione utilizza diversi custom hook React per separare la logica dai componenti e rendere il codice più modulare e manutenibile. Tra i principali:

- `useAvatarUrl(path)` – Effettua il download dell’avatar dell’utente da Supabase Storage e restituisce un URL locale sicuro.
- `useBackground()` – Legge e gestisce dinamicamente l’immagine di sfondo della pagina di dettaglio gioco tramite Context API.
- `useGameScreenshots(gameId)` – Recupera gli screenshot di un videogioco tramite TanStack Query con caching e refetch.
- `useUserProfile(session)` – Recupera il profilo utente dal database Supabase, abilitato solo se l’utente è loggato.
- `useHeaderVisible()` – Determina la visibilità dell’header in base allo scroll usando la logica di useScrollTrigger di MUI.

---

## State Management
La gestione dello stato globale dell’applicazione è affidata principalmente alla **React Context API**, scelta per la sua semplicità e scalabilità nel propagare dati accessibili da ogni parte dell’interfaccia.

I principali Context implementati sono:

### SessionContext

Gestisce la sessione utente e il profilo associato (`session` e `userProfile`).
La sessione viene fornita da Supabase, che si occupa di autenticazione, persistenza e refresh automatico.
Nel frontend, la sessione viene salvata nel context per un accesso rapido e centralizzato.
Il profilo utente viene recuperato tramite una custom hook (`useUserProfile`) che effettua il fetch dal database solo se l’utente è loggato.
Il caricamento di sessione e profilo è gestito con stati di loading e uno skeleton di caricamento per migliorare l’UX.

### BackgroundContext

Controlla dinamicamente l’immagine di sfondo nelle pagine di dettaglio gioco.
Implementato tramite uno stato React (`useState`) che mantiene l’URL dell’immagine di background e permette di aggiornarlo in modo reattivo tramite il metodo `setBackgroundImage`, esposto nel context.
Questo consente a qualsiasi componente di modificare il background visualizzato in modo sincronizzato e semplice.

### FavoritesContext (Wishlist)

Mantiene lo stato locale della wishlist dell’utente, ovvero i giochi preferiti.
I dati sono persistiti nel database Supabase nella tabella favorites, ma il context permette un’interazione immediata e fluida con l’interfaccia utente.
Fornisce funzioni per aggiungere e rimuovere giochi dai preferiti, sincronizzando il database in background.
È anche implementata una subscription in tempo reale con **Supabase Realtime** per aggiornare automaticamente la lista preferiti se modificata da altre sessioni o dispositivi.

---

## API Layer: RAWG + YouTube
L’applicazione integra un layer API centralizzato, responsabile della comunicazione con:

- **RAWG Video Games Database API**
- **YouTube Data API** (utilizzata come fallback per il recupero dei trailer ufficiali)

Tutte le chiamate sono gestite tramite **Axios** e incapsulate in funzioni modulari, pensate per essere facilmente riutilizzabili nel frontend tramite **TanStack Query**. Questo approccio consente una gestione avanzata di:

- Cache locale per velocizzare il caricamento
- Refetch automatico per dati sempre aggiornati
- Paginazione efficiente per gestire grandi volumi di dati
- Gestione centralizzata degli errori

Grazie a questa struttura, l’esperienza di navigazione dell’utente risulta più completa, fluida e reattiva, permettendo di esplorare con facilità un vasto catalogo di videogiochi con dati sempre aggiornati e trailer sempre disponibili.
Ogni sezione dell’app è facilmente raggiungibile tramite una **sidebar interattiva**, che guida l’utente tra wishlist, novità, classifiche, genere ecc.

## Funzionalità coperte

- `fetchGenres`: Ottiene la lista dei generi disponibili  
- `fetchGamesByGenre(genre, page, ordering)`: Giochi filtrati per genere  
- `searchGames(gameName, page, ordering)`: Ricerca giochi per nome  
- `fetchGameDetails(id)`: Dettagli completi del gioco  
- `fetchGameScreenshots(gameId)`: Screenshot ufficiali  
- `fetchGameMovies(gameId, gameName)`: Trailer (RAWG o fallback YouTube)  
- `fetchTopGamesOfWeek()` / `fetchTopGamesOfMonth()`: Migliori giochi della settimana o mese  
- `fetchNewAndTrendingGames()`: Nuove uscite e titoli popolari  
- `fetchComingSoonGames()`: Giochi in uscita  
- `fetchGamesFromYearStart()`: Giochi usciti da inizio anno  
- `fetchGamesOfLastYear()`: Best of dell’anno precedente  
- `fetchAllGames()`: Giochi generici paginati  
- `fetchTopAllTimeGames()`: Top 250 giochi di sempre  
- `fetchSimilarGamesFallback(game)`: Giochi simili, basati su genere/tag  
- `fetchPlatforms()` / `fetchStores()`: Recupera tutte le piattaforme e store  
- `fetchTagsPaginated()`: Tag con paginazione  
- `fetchPublishersPaginated()` / `fetchDevelopersPaginated()`: Publisher e sviluppatori  
- `fetchCreatorsPaginated()` / `fetchCreatorRoles()`: Creators filtrati per ruolo  
- `fetchCreatorDetails(id)`: Dettagli di un singolo creator
- 
## Dettagli tecnici

- Le date sono formattate in formato ISO `yyyy-mm-dd` tramite una utility locale.
- Le chiamate YouTube usano un fallback sicuro tramite `apiConfig.endpoints.youtubeSearch()`.
- Tutte le chiamate supportano paginazione, gestione errori e parametri dinamici (es. `ordering`, `page`, `page_size`, `tags`, `genres`).
- Le richieste multiple (es. `fetchTopAllTimeGames`) sono gestite tramite batching asincrono con slicing finale per ottimizzare le performance.

