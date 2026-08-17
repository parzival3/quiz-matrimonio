// ============================================================
// Google Apps Script — Quiz Matrimonio Luca & Elisa
// ============================================================
//
// ISTRUZIONI:
// 1. Apri il tuo Google Sheet
// 2. Menu → Estensioni → Apps Script
// 3. Cancella il codice esistente e incolla TUTTO questo file
// 4. Clicca "Salva" (icona dischetto)
// 5. Menu → Esegui → Esegui funzione → setup
//    (la prima volta chiederà di autorizzare: accetta)
// 6. Menu → Deploy → Nuova distribuzione
//    - Tipo: "App web"
//    - Esegui come: "Me"
//    - Chi ha accesso: "Chiunque"
//    - Clicca "Distribuisci"
// 7. Copia l'URL e incollalo in quiz.html (variabile APPS_SCRIPT_URL)
//    e in reveal.html (stessa variabile)
//
// ============================================================

const SHEET_NAME_RISPOSTE = 'Risposte';

/**
 * Esegui questa funzione UNA VOLTA per creare il foglio "Risposte".
 * Menu → Esegui → setup
 */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Crea il foglio Risposte se non esiste
  let sheet = ss.getSheetByName(SHEET_NAME_RISPOSTE);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME_RISPOSTE);
  }

  // Leggi le domande dal primo foglio per creare le intestazioni
  const questionsSheet = ss.getSheets()[0];
  const data = questionsSheet.getDataRange().getValues();

  // La prima riga è l'intestazione, le domande partono dalla riga 2
  const headers = ['Timestamp', 'Nome'];
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] && String(data[i][0]).trim()) {
      headers.push('D' + (i));
    }
  }

  // Scrivi le intestazioni
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#D4849F')
    .setFontColor('#FFFFFF');

  // Formatta
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 180);
  sheet.setColumnWidth(2, 150);

  Logger.log('Setup completato! Foglio "Risposte" creato con ' + headers.length + ' colonne.');
}

/**
 * Riceve le risposte degli invitati via POST.
 */
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME_RISPOSTE);

    if (!sheet) {
      // Auto-setup se il foglio non esiste ancora
      setup();
      sheet = ss.getSheetByName(SHEET_NAME_RISPOSTE);
    }

    const payload = JSON.parse(e.postData.contents);

    const row = [
      payload.timestamp || new Date().toISOString(),
      payload.name || 'Anonimo'
    ];

    // Aggiungi le risposte (A, B, C, o D per ogni domanda)
    if (payload.answers && Array.isArray(payload.answers)) {
      for (const answer of payload.answers) {
        row.push(answer);
      }
    }

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Endpoint GET per verificare che lo script funzioni.
 */
function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME_RISPOSTE);

  let count = 0;
  if (sheet) {
    count = Math.max(0, sheet.getLastRow() - 1); // escludi intestazione
  }

  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      risposte: count,
      message: `Quiz Matrimonio attivo! ${count} risposte ricevute.`
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
