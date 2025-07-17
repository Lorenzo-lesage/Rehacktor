# 🎮 Rehacktor

**Rehacktor** è un'applicazione web che funge da database interattivo di videogiochi, ispirata al celebre sito RAWG.  
Permette agli utenti di chattare, esplorare, cercare e salvare titoli, visualizzando informazioni dettagliate e curate per ogni gioco.

Il progetto è sviluppato con **Vite** e **React**, utilizzando **MUI** per l'interfaccia utente, **React Router** per la navigazione (incluse rotte dinamiche), e **Tailwind CSS** in piccola parte per personalizzazioni rapide.  
Il backend è gestito interamente tramite **Supabase**, mentre il deploy è effettuato su **Vercel**.  
L'interfaccia è **100% responsive**, ottimizzata per mobile.

---

## 🛠 Tecnologie utilizzate

### 🧠 Frontend
- **React** + **Vite**
- **MUI (Material UI)** per i componenti grafici
- **React Router** per la gestione delle rotte e pagine dinamiche
- **Tailwind CSS** (utilizzato parzialmente per custom styling)
- **Axios** per le chiamate API
- **TanStack Query** per la gestione avanzata di fetching, caching e refetch
- **Zod** per validazioni lato client
- **React Context API** per gestione sessione, immagine di background e giochi preferiti
- **react-lazy-load-image-component** per lazy loading delle immagini
- **react-image-lightbox** per la visualizzazione a tutto schermo di immagini e trailer
- **notistack** per notifiche e toast UX
- **react-icons** + **@mui/icons-material** per rappresentare console, negozi, aziende, ecc.
- **Tema Light / Dark** dinamico
- **Favicon personalizzata**

### 🗄 Backend & servizi

- **Supabase**  
  - Autenticazione (inclusa Google OAuth)  
  - Gestione della sessione utente (token, persistenza, refresh automatico)  
  - Database relazionale (salvataggio dei videogiochi preferiti per utente)  
  - Funzionalità in tempo reale (gestione della chat tra utenti)

- **RAWG API**  
  - Recupero dati videogiochi (titolo, descrizione, immagini, generi, piattaforme, valutazioni, ecc.)

- **YouTube Data API / Google API**  
  - Visualizzazione trailer ufficiali nelle pagine di dettaglio gioco

- **Vercel**  
  - Deploy continuo e hosting in produzione

---

## ✨ Funzionalità principali

### 🔍 Esplorazione e ricerca giochi
- Barra di ricerca con query params (ricerca dinamica per nome)
- Sistema di **filtri personalizzati** (relevance, data di rilascio, rating, Metacritic, ordine alfabetico)
- Paginazione tradizionale e **lazy pagination**
- Lazy loading delle immagini

### 🔐 Autenticazione
- Registrazione e login utente
- **Login con Google** via Supabase OAuth
- Gestione della sessione utente tramite Context

### 💬 Chat real-time
- Chat integrata con **Supabase Realtime**
- Disponibile esclusivamente per utenti autenticati

### ⭐ Wishlist personalizzata
- Possibilità di aggiungere/rimuovere giochi ai preferiti
- Visualizzazione dei giochi preferiti nella propria area personale
- Gestione tramite toggle button o pulsanti contestuali

### 📽 Visualizzazione trailer e immagini
- Visualizzazione **trailer video** tramite Google/YouTube API
- Visualizzazione immagini a schermo intero con **lightbox**

### 🌙 Tema e UI moderna
- Modalità **chiaro/scuro** dinamica
- Design responsive, pensato per mobile, tablet e desktop
- Interfaccia coerente e curata con MUI

---

## 📦 Architettura tecnica

L’intera parte di backend è gestita tramite **Supabase**, che si occupa dell’autenticazione (inclusa quella con Google), del database relazionale e delle funzionalità in tempo reale. Solo gli utenti autenticati possono interagire tra loro tramite una **chat real-time**, integrata direttamente nella piattaforma.

Il frontend è stato realizzato con **React**, utilizzando la libreria **MUI** (Material-UI) per i componenti UI e **React Router** per la gestione delle rotte.  
Per le chiamate API si usa **Axios**, gestite in modo efficiente e sincronizzato grazie a **TanStack Query**, che si è dimostrata una scelta superiore rispetto a un custom hook iniziale, per la gestione avanzata della **cache**, **refetch automatico**, e **stati di caricamento** centralizzati.

L’app utilizza le **API di RAWG** per ottenere tutti i dati relativi ai videogiochi (descrizione, immagini, piattaforme, generi, rating, ecc.) e le **API di Google** per integrare i trailer ufficiali nelle schede gioco.

---



