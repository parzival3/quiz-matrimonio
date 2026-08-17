# Quiz Matrimonio Luca & Elisa — Setup

## 1. Sistema il Google Sheet

La prima riga del foglio contiene 4 domande compresse in un'unica cella.
Devi separarle in 4 righe distinte, così:

| Domanda | A | B | C | D |
|---------|---|---|---|---|
| Se Luca e Elisa hanno un figlio, come lo chiameranno? | Goku | Rocky Junior | Damigiano | Gohan |
| Qual è il miglior condimento per il cous cous secondo Luca? | Ananas | Kiwi | Carne di manzo | Carne d'orso |
| Cosa farebbe Luca senza preavviso ad una sagra paesana? | Animatore per Bambini | Spinatore di Birra | Grigliatore seriale | Lotta nel fango con spogliarelliste |
| Qual è il farmaco preferito di Elisa? | Oki | Marijuana | Imodium | Chiamare Luca nei momenti più inopportuni |

La riga 1 deve restare come intestazione: `Domanda | A | B | C | D`
Le domande partono dalla riga 2 in poi.

> **Per aggiungere nuove domande** basta aggiungere righe al foglio — il quiz si aggiorna automaticamente!

---

## 2. Installa il Google Apps Script

1. Apri il tuo Google Sheet
2. Menu **Estensioni → Apps Script**
3. Cancella tutto il codice esistente
4. Incolla il contenuto del file `apps-script.gs`
5. Premi **Salva** (icona dischetto)
6. Menu **Esegui → Esegui funzione → `setup`**
   - La prima volta ti chiede di autorizzare: accetta tutto
   - Questo crea il foglio "Risposte" con le intestazioni
7. Menu **Deploy → Nuova distribuzione**
   - Tipo: **App web**
   - Descrizione: "Quiz Matrimonio"
   - Esegui come: **Me**
   - Chi ha accesso: **Chiunque**
   - Clicca **Distribuisci**
8. **Copia l'URL** che ti viene dato

---

## 3. Configura i file HTML

### quiz.html (per gli invitati)
Apri il file e in cima al codice JavaScript trova:
```javascript
const APPS_SCRIPT_URL = '';
```
Incolla l'URL copiato al punto 2.8 tra le virgolette.

### reveal.html (per il gioco degli sposi)
Questo file non necessita di configurazione: legge direttamente dal foglio Google.

---

## 4. Hosting

Hai bisogno di hostare i 2 file HTML da qualche parte. Opzioni gratuite:

### Opzione A: GitHub Pages (consigliata)
1. Crea un repository su github.com (anche privato)
2. Carica `quiz.html` e `reveal.html`
3. Settings → Pages → Deploy from branch → main
4. I file saranno su `https://tuousername.github.io/nome-repo/quiz.html`

### Opzione B: Netlify Drop
1. Vai su [app.netlify.com/drop](https://app.netlify.com/drop)
2. Trascina la cartella con i file
3. Ricevi un URL immediato

### Opzione C: Apri direttamente
Se non vuoi hostare niente, puoi aprire i file direttamente nel browser dal tuo computer (doppio click). La lettura dal Google Sheet funziona comunque. L'unico limite è che non puoi condividere un link/QR agli invitati.

---

## 5. Genera il QR Code

1. Copia l'URL di `quiz.html` dopo l'hosting
2. Vai su [qr.io](https://qr.io) o qualsiasi generatore QR
3. Genera il QR code
4. Stampalo e mettilo sui tavoli o proiettalo durante la festa

---

## Come funziona

```
Invitati scansionano QR
        ↓
   quiz.html (telefono)
   Rispondono alle domande
        ↓
   Google Apps Script
   Salva in foglio "Risposte"
        ↓
   reveal.html (schermo grande)
   Luca & Elisa giocano
   a indovinare le risposte
```

---

## Aggiungere domande

Basta aggiungere una riga al Google Sheet (foglio principale):

| Nuova domanda qui? | Risposta A | Risposta B | Risposta C | Risposta D |

Il quiz si aggiorna automaticamente. Se aggiungi domande DOPO che qualcuno ha già risposto, le risposte vecchie restano valide (le nuove domande semplicemente non avranno voti da quei partecipanti).

Dopo aver aggiunto domande, riesegui la funzione `setup` nell'Apps Script per aggiornare le intestazioni del foglio Risposte.
